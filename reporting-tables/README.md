<img src="https://github.com/user-attachments/assets/93640f49-d8fb-45cf-925e-6b7075f83927#gh-light-mode-only" alt="Light Mode" />
<img src="https://github.com/user-attachments/assets/71380a65-3419-41f4-ba29-2b74c7e6a66b#gh-dark-mode-only" alt="Dark Mode" />

---

# Reporting tables

Nameless Analytics reporting tables are a set of tables in BigQuery where user, session, and event data are stored.

For an overview of how Nameless Analytics works [start from here](../).

Tables and table functions:
* Tables
  * [Create tables](#create-tables)
  * [Events raw table](#events-raw-table)
  * [Dates table](#dates-table)
* Table functions
  * [Create table functions](#create-table-functions)
  * [Events](#events)
  * [Users](#users)
  * [Sessions](#sessions)
  * [Pages](#pages)
  * [Transactions](#transactions)
  * [Products](#products)
  * [Shopping stages open funnel](#shopping-stages-open-funnel)
  * [Shopping stages closed funnel](#shopping-stages-closed-funnel)
  * [GTM performances](#gtm-performances)
  * [Consents](#consents)

</br>



## Tables
### Create tables
<details><summary>To create the tables use this DML statement.</summary>
  
```sql
# NAMELESS ANALYTICS

# Project settings
declare project_name string default 'project_name';  -- Change this
declare dataset_name string default 'dataset_name'; -- Change this
declare dataset_location string default 'dataset_location'; -- Change this

# Tables
declare main_table_name string default 'events_raw';
declare dates_table_name string default 'calendar_dates';

# Paths
declare main_dataset_path string default CONCAT('`', project_name, '.', dataset_name, '`');
declare main_table_path string default CONCAT('`', project_name, '.', dataset_name, '.', main_table_name,'`');
declare dates_table_path string default CONCAT('`', project_name, '.', dataset_name, '.', dates_table_name,'`');


# -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


# Enable BigQuery advanced runtime (for more info https://cloud.google.com/bigquery/docs/advanced-runtime)
# Enables a more advanced query execution engine that automatically improves performance and efficiency for complex analytical queries
declare enable_bigquery_advanced_runtime string default format(
  """
    ALTER PROJECT `%s`
    SET OPTIONS (
      `region-%s.query_runtime` = 'advanced' # default null
    );
  """
, project_name, dataset_location);


# Main dataset (for more info https://cloud.google.com/bigquery/docs/datasets#sql)
declare main_dataset_sql string default format(
  """
    create schema if not exists %s
    options (
      # default_kms_key_name = 'KMS_KEY_NAME',
      # default_partition_expiration_days = PARTITION_EXPIRATION,
      # default_table_expiration_days = TABLE_EXPIRATION,
      # max_time_travel_hours = HOURS, # default 168 hours => 7 days 
      # storage_billing_model = BILLING_MODEL # Phytical or logical (default)  
      description = 'Nameless Analytics',
      location = '%s'
    );
  """
, main_dataset_path, dataset_location);


# Main table
declare main_table_sql string default format(
  """
    create table if not exists %s (
      client_id STRING NOT NULL OPTIONS (description = 'Client ID'),
      user_date DATE NOT NULL OPTIONS (description = 'User date'),
      user_data ARRAY<
        STRUCT<
          name STRING OPTIONS (description = 'User data parameter name'),
          value STRUCT<
            string STRING OPTIONS (description = 'User data parameter string value'),
            int INT64 OPTIONS (description = 'User data parameter int number value'),
            float FLOAT64 OPTIONS (description = 'User data parameter float number value'),
            json JSON OPTIONS (description = 'User data parameter JSON value')
          > OPTIONS (description = 'User data parameter value name')
        >
      > OPTIONS (description = 'User data'),

      session_id STRING NOT NULL OPTIONS (description = 'Session ID'),
      session_date DATE NOT NULL OPTIONS (description = 'Session date'),
      session_data ARRAY<
        STRUCT<
          name STRING OPTIONS (description = 'Session data parameter name'),
          value STRUCT<
            string STRING OPTIONS (description = 'Session data parameter string value'),
            int INT64 OPTIONS (description = 'Session data parameter int number value'),
            float FLOAT64 OPTIONS (description = 'Session data parameter float number value'),
            json JSON OPTIONS (description = 'Session data parameter JSON value')
          > OPTIONS (description = 'Session data parameter value name')
        >
      > OPTIONS (description = 'Session data'),  

      page_id STRING NOT NULL OPTIONS (description = 'Page ID'),
      page_date DATE NOT NULL OPTIONS (description = 'Page date'),
      page_data ARRAY<
        STRUCT<
          name STRING OPTIONS (description = 'Page data parameter name'),
          value STRUCT<
            string STRING OPTIONS (description = 'Page data parameter string value'),
            int INT64 OPTIONS (description = 'Page data parameter int number value'),
            float FLOAT64 OPTIONS (description = 'Page data parameter float number value'),
            json JSON OPTIONS (description = 'Page data parameter JSON value')
          > OPTIONS (description = 'Page data parameter value name')
        >
      > OPTIONS (description = 'Page data'),

      event_name STRING NOT NULL OPTIONS (description = 'Event name'),
      event_id STRING NOT NULL OPTIONS (description = 'Event ID'),
      event_date DATE NOT NULL OPTIONS (description = 'Event date'),
      event_timestamp int NOT NULL OPTIONS (description = 'Event timestamp'),
      event_origin STRING NOT NULL OPTIONS (description = 'Event origin'),
      event_data ARRAY<
        STRUCT<
          name STRING OPTIONS (description = 'Event data parameter name'),
          value STRUCT<
            string STRING OPTIONS (description = 'Event data parameter string value'),
            int INT64 OPTIONS (description = 'Event data parameter int number value'),
            float FLOAT64 OPTIONS (description = 'Event data parameter float number value'),
            json JSON OPTIONS (description = 'Event data parameter JSON value')
          > OPTIONS (description = 'Event data parameter value name')
        >
      > OPTIONS (description = 'Event data'),

      ecommerce JSON OPTIONS (description = 'Ecommerce object'),

      datalayer JSON OPTIONS (description = 'Current dataLayer value'),

      consent_data ARRAY<
        STRUCT<
          name STRING OPTIONS (description = 'Consent data parameter name'),
          value STRUCT<
            string STRING OPTIONS (description = 'Consent data parameter string value')
          > OPTIONS (description = 'Consent data parameter value name')
        >
      > OPTIONS (description = 'Consent data'),

      gtm_data ARRAY<
        STRUCT<
          name STRING OPTIONS (description = 'GTM execution parameter name'),
          value STRUCT<
            string STRING OPTIONS (description = 'GTM execution parameter string value'),
            int INT64 OPTIONS (description = 'Event data parameter int number value')
          > OPTIONS (description = 'GTM execution parameter value name')
        >
      > OPTIONS (description = 'GTM execution data')

    )

    PARTITION BY event_date
    CLUSTER BY user_date, session_date, page_date, event_name
    OPTIONS(
      description = 'Nameless Analytics | Main table',
      require_partition_filter = FALSE
    );
  """
, main_table_path);


# Dates table
declare dates_table_sql string default FORMAT(
  """
    create table if not exists %s (
      date DATE NOT NULL OPTIONS(description = "The date value"),
      year INT64 OPTIONS(description = "Year extracted from the date"),
      quarter INT64 OPTIONS(description = "Quarter of the year (1-4) extracted from the date"),
      month_number INT64 OPTIONS(description = "Month number of the year (1-12) extracted from the date"),
      month_name STRING OPTIONS(description = "Full name of the month (e.g., January) extracted from the date"),
      week_number_sunday INT64 OPTIONS(description = "Week number of the year, starting on Sunday"),
      week_number_monday INT64 OPTIONS(description = "Week number of the year, starting on Monday"),  
      day_number INT64 OPTIONS(description = "Day number of the month (1-31)"),
      day_name STRING OPTIONS(description = "Full name of the day of the week (e.g., Monday)"),
      day_of_week_number INT64 OPTIONS(description = "Day of the week number (1 for Monday, 7 for Sunday)"),
      is_weekend BOOL OPTIONS(description = "True if the day is Saturday or Sunday")
    ) 
    
    PARTITION BY DATE_TRUNC(date, year)
    CLUSTER BY month_name, day_name
    OPTIONS (description = 'Nameless Analytics | Dates utility table')
    
    AS (
      SELECT 
        date,
        EXTRACT(YEAR FROM date) AS year,
        EXTRACT(QUARTER FROM date) AS quarter,
        EXTRACT(MONTH FROM date) AS month_number,
        FORMAT_DATE('%%B', date) AS month_name,
        EXTRACT(WEEK(SUNDAY) FROM date) AS week_number_sunday,
        EXTRACT(WEEK(MONDAY) FROM date) AS week_number_monday,
        EXTRACT(DAY FROM date) AS day_number,
        FORMAT_DATE('%%A', date) AS day_name,
        EXTRACT(DAYOFWEEK FROM date) AS day_of_week_number, 
        IF(EXTRACT(DAYOFWEEK FROM date) IN (1, 7), TRUE, FALSE) AS is_weekend
      FROM UNNEST(GENERATE_DATE_ARRAY('1970-01-01', '2050-12-31', INTERVAL 1 DAY)) AS date
    );
  """
, dates_table_path);


# -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


# Create tables 
execute immediate enable_bigquery_advanced_runtime;
execute immediate main_dataset_sql;
execute immediate main_table_sql;
execute immediate dates_table_sql;
```
</details>


### Events raw table
This main table is partitioned by `event_date` and clustered by `user_date`, `session_date`, `page_date`, and `event_name`.

| Field name      | Type    | Mode     | Description                                |
|-----------------|---------|----------|--------------------------------------------|
| client_id       | STRING  | REQUIRED | Client ID.                                 |
| user_date       | DATE    | REQUIRED | User date.                                 |
| user_data       | RECORD  | REPEATED | User data.                                 |
| session_id      | STRING  | REQUIRED | Session ID.                                |
| session_date    | DATE    | REQUIRED | Session date.                              |
| session_data    | RECORD  | REPEATED | Session data.                              |
| page_id         | STRING  | REQUIRED | Page ID.                                   |
| page_date       | DATE    | REQUIRED | Page date.                                 |
| page_data       | RECORD  | REPEATED | Page data.                                 |
| event_name      | STRING  | REQUIRED | Event name.                                |
| event_id        | STRING  | REQUIRED | Event ID.                                  |
| event_date      | DATE    | REQUIRED | Date of the request.                       |
| event_timestamp | INTEGER | REQUIRED | Insertion timestamp of the event.          |
| event_origin    | STRING  | REQUIRED | "Website" if the hit comes from a browser. |
| event_data      | RECORD  | REPEATED | Event data.                                |
| ecommerce       | JSON    | NULLABLE | Ecommerce object.                          |
| datalayer       | JSON    | NULLABLE | Current `dataLayer` value.                 |
| consent_data    | RECORD  | REPEATED | Consent data.                              |
| gtm_data        | RECORD  | REPEATED | GTM performance and execution data.        |
 
### Dates table
This table is partitioned by `date` and clustered by `month_name` and `day_name`.

| Field name         | Type    | Mode     | Description                                                     |
|--------------------|---------|----------|---------------------------------------------------------------- |
| date               | DATE    | REQUIRED | The date value.                                                 |
| year               | INTEGER | NULLABLE | Year extracted from the date.                                   |
| quarter            | INTEGER | NULLABLE | Quarter of the year (1-4) extracted from the date.              |
| month_number       | INTEGER | NULLABLE | Month number of the year (1-12) extracted from the date.        |
| month_name         | STRING  | NULLABLE | Full name of the month (e.g., January) extracted from the date. |
| week_number_sunday | INTEGER | NULLABLE | Week number of the year, starting on Sunday.                    |
| week_number_monday | INTEGER | NULLABLE | Week number of the year, starting on Monday.                    |
| day_number         | INTEGER | NULLABLE | Day number of the month (1-31).                                 |
| day_name           | STRING  | NULLABLE | Full name of the day of the week (e.g., Monday).                |
| day_of_week_number | INTEGER | NULLABLE | Day of the week number (1 for Monday, 7 for Sunday).            |
| is_weekend         | BOOLEAN | NULLABLE | True if the day is a Saturday or Sunday.                        |

</br>



## Table functions
Table functions are predefined SQL queries that simplify data analysis by transforming raw event data into structured, easy-to-use formats for common reporting needs.

Unlike other systems, Nameless Analytics reporting functions are designed to work directly on the `events_raw` table as the single source of truth. By leveraging BigQuery **Window Functions**. This approach ensures that reports always reflect the most up-to-date state of the data without the need for complex ETL processes or intermediate staging tables.

### Create table functions
<details><summary>To create the table functions use this DML statement.</summary>

```sql
# Run the SQL scripts in this directory to create the table functions.
```
</details>


### Events
Flattens raw event data and extracts custom parameters, making it easier to analyze specific interaction metrics.
[View source Code](events.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| **USER DATA** | | |
| `user_date` | DATE | Date of the user's first visit |
| `user_id` | STRING | Persistent user identifier (if provided) |
| `client_id` | STRING | Unique identifier for the browser/device |
| `user_type` | STRING | "new_user" or "returning_user" |
| `new_user` | STRING | Client ID if it's a new user, else null |
| `returning_user` | STRING | Client ID if it's a returning user, else null |
| `user_first_session_timestamp` | INTEGER | Timestamp of the first session |
| `user_last_session_timestamp` | INTEGER | Timestamp of the most recent session |
| `days_from_first_to_last_visit` | INTEGER | Days between first and last visit |
| `days_from_first_visit` | INTEGER | Days since first visit |
| `days_from_last_visit` | INTEGER | Days since last visit |
| `user_channel_grouping` | STRING | Acquisition channel grouping |
| `user_source` | STRING | Acquisition source |
| `user_tld_source` | STRING | Top Level Domain of the source |
| `user_campaign` | STRING | Acquisition campaign name |
| `user_campaign_id` | STRING | Acquisition campaign ID |
| `user_campaign_click_id` | STRING | Acquisition campaign click ID (e.g. gclid) |
| `user_campaign_term` | STRING | Acquisition campaign term |
| `user_campaign_content` | STRING | Acquisition campaign content |
| `user_device_type` | STRING | Device type (mobile, desktop, tablet) |
| `user_country` | STRING | User's country |
| `user_language` | STRING | User's language |
| **SESSION DATA** | | |
| `session_date` | DATE | Date of the session |
| `session_id` | STRING | Unique identifier for the session |
| `session_number` | INTEGER | Incremental session count for the user |
| `cross_domain_session` | STRING | Flag for cross-domain sessions |
| `session_start_timestamp` | INTEGER | Session start timestamp |
| `session_end_timestamp` | INTEGER | Session end timestamp |
| `session_duration_sec` | INTEGER | Session duration in seconds |
| `new_session` | INTEGER | 1 if new session, else 0 |
| `returning_session` | INTEGER | 1 if returning session, else 0 |
| `session_channel_grouping` | STRING | Session channel grouping |
| `session_source` | STRING | Session source |
| `session_tld_source` | STRING | Session TLD source |
| `session_campaign` | STRING | Session campaign name |
| `session_campaign_id` | STRING | Session campaign ID |
| `session_campaign_click_id` | STRING | Session campaign click ID |
| `session_campaign_term` | STRING | Session campaign term |
| `session_campaign_content` | STRING | Session campaign content |
| `session_device_type` | STRING | Session device type |
| `session_country` | STRING | Session country |
| `session_language` | STRING | Session language |
| `session_browser_name` | STRING | Browser name |
| `session_hostname` | STRING | Hostname of the session |
| `session_landing_page_category` | STRING | Category of the landing page |
| `session_landing_page_location` | STRING | Landing page URL |
| `session_landing_page_title` | STRING | Landing page title |
| `session_exit_page_category` | STRING | Category of the exit page |
| `session_exit_page_location` | STRING | Exit page URL |
| `session_exit_page_title` | STRING | Exit page title |
| **PAGE DATA** | | |
| `page_date` | DATE | Date of the page view |
| `page_id` | STRING | Unique page view ID |
| `page_view_number` | INTEGER | Sequential page view number per session |
| `page_load_timestamp` | INTEGER | Timestamp when page loaded |
| `page_unload_timestamp` | INTEGER | Timestamp when page unloaded |
| `page_category` | STRING | Page category |
| `page_title` | STRING | Page title |
| `page_language` | STRING | Page language |
| `page_hostname_protocol` | STRING | Protocol (http/https) |
| `page_hostname` | STRING | Hostname |
| `page_location` | STRING | Full URL |
| `page_fragment` | STRING | URL fragment (#) |
| `page_query` | STRING | URL query string (?) |
| `page_extension` | STRING | URL file extension |
| `page_referrer` | STRING | HTTP Referrer |
| `page_status_code` | INTEGER | HTTP Status code |
| `time_on_page` | INTEGER | Time spent on page in seconds |
| **EVENT DATA** | | |
| `event_date` | DATE | Date of the event |
| `event_timestamp` | INTEGER | Microsecond timestamp |
| `event_name` | STRING | Event name |
| `event_id` | STRING | Unique event ID |
| `event_number` | INTEGER | Sequential event number per session |
| `event_type` | STRING | Type of event |
| `channel_grouping` | STRING | Event channel grouping |
| `source` | STRING | Event source |
| `tld_source` | STRING | Event TLD source |
| `campaign` | STRING | Event campaign |
| `campaign_id` | STRING | Event campaign ID |
| `campaign_click_id` | STRING | Event campaign click ID |
| `campaign_term` | STRING | Event campaign term |
| `campaign_content` | STRING | Event campaign content |
| `browser_name` | STRING | Browser name |
| `browser_version` | STRING | Browser version |
| `browser_language` | STRING | Browser language |
| `viewport_size` | STRING | Viewport dimensions |
| `user_agent` | STRING | User Agent string |
| `device_type` | STRING | Device type at event level |
| `device_model` | STRING | Device model |
| `device_vendor` | STRING | Device vendor |
| `os_name` | STRING | OS name |
| `os_version` | STRING | OS version |
| `screen_size` | STRING | Screen resolution |
| `country` | STRING | Event country |
| `city` | STRING | Event city |
| `cross_domain_id` | STRING | Cross domain ID parameter |
| `time_to_dom_interactive` | INTEGER | Performance metric (ms) |
| `page_render_time` | INTEGER | Performance metric (ms) |
| `time_to_dom_complete` | INTEGER | Performance metric (ms) |
| `total_page_load_time` | INTEGER | Performance metric (ms) |
| `search_term` | STRING | Search query (for search events) |
| **ECOMMERCE & CONSENT** | | |
| `ecommerce` | JSON | Ecommerce object |
| `datalayer` | JSON | DataLayer state |
| `consent_type` | STRING | Consent update type |
| `respect_consent_mode` | STRING | Flag for consent mode respect |
| `ad_user_data` | STRING | Consent status |
| `ad_personalization` | STRING | Consent status |
| `ad_storage` | STRING | Consent status |
| `analytics_storage` | STRING | Consent status |
| `functionality_storage` | STRING | Consent status |
| `personalization_storage` | STRING | Consent status |
| `security_storage` | STRING | Consent status |
| **REQUEST DATA** | | |
| `event_origin` | STRING | Origin of the event |
| `cs_hostname` | STRING | Client-side hostname |
| `cs_container_id` | STRING | Client-side GTM container ID |
| `cs_tag_name` | STRING | Client-side tag name |
| `cs_tag_id` | INTEGER | Client-side tag ID |
| `ss_hostname` | STRING | Server-side hostname |
| `ss_container_id` | STRING | Server-side GTM container ID |
| `ss_tag_name` | STRING | Server-side tag name |
| `ss_tag_id` | INTEGER | Server-side tag ID |
| `processing_event_timestamp` | INTEGER | Server-side processing timestamp |
| `content_length` | INTEGER | Payload size |
| **RAW ARRAYS** | | |
| `user_data` | ARRAY | Raw user data array |
| `session_data` | ARRAY | Raw session data array |
| `page_data` | ARRAY | Raw page data array |
| `event_data` | ARRAY | Raw event data array |
| `gtm_data` | ARRAY | Raw GTM data array |

</details>


### Users
Aggregates data at the user level, calculating lifecycle metrics like total sessions, first/last seen dates, and lifetime values.
[View source Code](users.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| **USER DATA** | | |
| `user_date` | DATE | Date of the user's first visit |
| `client_id` | STRING | Unique identifier for the user |
| `user_channel_grouping` | STRING | Acquisition channel grouping |
| `user_source` | STRING | Acquisition source |
| `user_tld_source` | STRING | Acquisition TLD source |
| `user_campaign` | STRING | Acquisition campaign |
| `user_campaign_click_id` | STRING | Acquisition campaign click ID |
| `user_campaign_term` | STRING | Acquisition campaign term |
| `user_campaign_content` | STRING | Acquisition campaign content |
| `user_device_type` | STRING | Device type used |
| `user_country` | STRING | User's country |
| `user_language` | STRING | User's language |
| `user_type` | STRING | "new_user" or "returning_user" |
| `new_user_client_id` | STRING | Client ID if new user |
| `returning_user_client_id` | STRING | Client ID if returning user |
| `days_from_first_to_last_visit` | INTEGER | Total lifecycle duration in days |
| `days_from_first_visit` | INTEGER | Days since first visit |
| `days_from_last_visit` | INTEGER | Days since last visit |
| **ACTIVITY & ECOMMERCE** | | |
| `is_customer` | STRING | "Customer" or "Not customer" |
| `customer_type` | STRING | "Not customer", "New customer", "Returning customer" |
| `customers` | INTEGER | 1 if the user is a customer |
| `new_customers` | INTEGER | 1 if the user became a customer in this period |
| `returning_customers` | INTEGER | 1 if the user was already a customer |
| `sessions` | INTEGER | Total number of sessions |
| `session_duration_sec` | FLOAT | Average session duration |
| `page_view` | INTEGER | Total page views |
| `days_from_first_purchase` | INTEGER | Days since first purchase |
| `days_from_last_purchase` | INTEGER | Days since last purchase |
| `purchase` | INTEGER | Total purchases count |
| `refund` | INTEGER | Total refunds count |
| `item_quantity_purchased` | INTEGER | Total items purchased |
| `item_quantity_refunded` | INTEGER | Total items refunded |
| `purchase_revenue` | FLOAT | Total revenue generated |
| `refund_revenue` | FLOAT | Total revenue refunded |
| `revenue_net_refund` | FLOAT | Revenue minus refunds |
| `avg_purchase_value` | FLOAT | Average order value |
| `avg_refund_value` | FLOAT | Average refund value |

</details>


### Sessions
Groups events into individual sessions, calculating duration, bounce rates, and landing/exit pages.
[View source Code](sessions.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| **SESSION DATA** | | |
| `session_date` | DATE | Date of the session |
| `session_id` | STRING | Unique identifier for the session |
| `session_number` | INTEGER | Incremental session count for the user |
| `session_start_timestamp` | TIMESTAMP | Session start timestamp |
| `session_end_timestamp` | TIMESTAMP | Session end timestamp |
| `session_duration_sec` | INTEGER | Session duration in seconds |
| `is_bounced_session` | INTEGER | 1 if session bounced, else 0 |
| `new_session` | INTEGER | 1 if new session, else 0 |
| `returning_session` | INTEGER | 1 if returning session, else 0 |
| `cross_domain_session` | STRING | Flag for cross-domain sessions |
| **ATTRIBUTION** | | |
| `session_channel_grouping` | STRING | Session channel grouping |
| `session_source` | STRING | Session source |
| `session_tld_source` | STRING | Session TLD source |
| `session_campaign` | STRING | Session campaign name |
| `session_campaign_id` | STRING | Session campaign ID |
| `session_campaign_click_id` | STRING | Session campaign click ID |
| `session_campaign_term` | STRING | Session campaign term |
| `session_campaign_content` | STRING | Session campaign content |
| `session_referral_path` | STRING | Referral path |
| **BEHAVIOR** | | |
| `session_landing_page_category` | STRING | Landing page category |
| `session_landing_page_location` | STRING | Landing page URL |
| `session_landing_page_title` | STRING | Landing page title |
| `session_exit_page_category` | STRING | Exit page category |
| `session_exit_page_location` | STRING | Exit page URL |
| `session_exit_page_title` | STRING | Exit page title |
| `page_view` | INTEGER | Total pages viewed in session |
| `events` | INTEGER | Total events in session |
| **TECH & GEO** | | |
| `session_hostname` | STRING | Hostname |
| `session_device_type` | STRING | Device type |
| `session_country` | STRING | Country |
| `session_language` | STRING | Language |
| `session_browser_name` | STRING | Browser name |
| **ECOMMERCE** | | |
| `purchase` | INTEGER | Purchase count |
| `refund` | INTEGER | Refund count |
| `item_quantity_purchased` | INTEGER | Item quantity purchased |
| `item_quantity_refunded` | INTEGER | Item quantity refunded |
| `session_purchase_revenue` | FLOAT | Revenue from purchases |
| `session_refund_revenue` | FLOAT | Revenue lost to refunds |
| `revenue_net_refund` | FLOAT | Net revenue |

</details>


### Pages
Focuses on page-level performance, aggregating views, time on page, and navigation paths.
[View source Code](pages.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| **PAGE INFO** | | |
| `page_date` | DATE | Date of the page activity |
| `page_id` | STRING | Unique page view ID |
| `page_hostname` | STRING | Hostname |
| `page_category` | STRING | Category of the page |
| `page_title` | STRING | Title of the page |
| `page_location` | STRING | Full URL location |
| **METRICS** | | |
| `page_views` | INTEGER | Total views |
| `unique_page_views` | INTEGER | Unique views (1 per session) |
| `users` | INTEGER | Distinct users who viewed the page |
| `sessions` | INTEGER | Distinct sessions including this page |
| `time_on_page_total` | INTEGER | Total time spent on page (seconds) |
| `time_on_page_avg` | FLOAT | Average time spent on page |
| `time_on_page_per_session` | FLOAT | Average time on page per session |
| **FLOW** | | |
| `entrances` | INTEGER | Count of sessions starting here |
| `exits` | INTEGER | Count of sessions ending here |
| `entrance_rate` | FLOAT | % of sessions starting here |
| `exit_rate` | FLOAT | % of views that were the last in session |

</details>


### Transactions
Extracts and structures ecommerce transaction data, including revenue, tax, and shipping details.
[View source Code](ec_transactions.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| **USER DATA** | | |
| `user_date` | DATE | Date of user's first visit |
| `client_id` | STRING | Unique user identifier |
| `user_id` | STRING | Persistent user ID |
| `user_channel_grouping` | STRING | User acquisition channel |
| `user_source` | STRING | User acquisition source |
| `user_tld_source` | STRING | User acquisition TLD |
| `user_campaign` | STRING | User acquisition campaign |
| `user_device_type` | STRING | User device type |
| `user_country` | STRING | User country |
| `user_language` | STRING | User language |
| `user_type` | STRING | 'new_user' or 'returning_user' |
| `new_user` | STRING | Client ID if new |
| `returning_user` | STRING | Client ID if returning |
| **SESSION DATA** | | |
| `session_number` | INTEGER | Session sequence number |
| `session_id` | STRING | Session identifier |
| `session_start_timestamp` | INTEGER | Session start time |
| `session_channel_grouping` | STRING | Session channel |
| `session_source` | STRING | Session source |
| `session_tld_source` | STRING | Session TLD |
| `session_campaign` | STRING | Session campaign |
| `cross_domain_session` | STRING | Cross domain flag |
| `session_device_type` | STRING | Session device type |
| `session_country` | STRING | Session country |
| `session_language` | STRING | Session language |
| `session_browser_name` | STRING | Browser name |
| **EVENT DATA** | | |
| `event_date` | DATE | Date of transaction |
| `event_name` | STRING | Event name (purchase/refund) |
| `event_timestamp` | DATETIME | Timestamp of transaction |
| **ECOMMERCE DATA** | | |
| `transaction_id` | STRING | Unique transaction ID |
| `purchase` | INTEGER | 1 if purchase event |
| `refund` | INTEGER | 1 if refund event |
| `transaction_currency` | STRING | Currency code |
| `transaction_coupon` | STRING | Coupon code |
| `purchase_revenue` | FLOAT | Total revenue (if purchase) |
| `purchase_shipping` | FLOAT | Shipping cost (if purchase) |
| `purchase_tax` | FLOAT | Tax amount (if purchase) |
| `refund_revenue` | FLOAT | Total refunded (if refund) |
| `refund_shipping` | FLOAT | Shipping refunded |
| `refund_tax` | FLOAT | Tax refunded |
| `purchase_net_refund` | INTEGER | Purchase count minus refund count |
| `revenue_net_refund` | FLOAT | Revenue minus refunds |
| `shipping_net_refund` | FLOAT | Shipping minus refunds |
| `tax_net_refund` | FLOAT | Tax minus refunds |

</details>


### Products
Provides a granular view of product performance, including views, add-to-carts, and purchases per SKU.
[View source Code](ec_products.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| **USER DATA** | | |
| `user_date` | DATE | Date of user's first visit |
| `client_id` | STRING | Unique user identifier |
| `user_id` | STRING | Persistent user ID |
| `user_channel_grouping` | STRING | User acquisition channel |
| `user_source` | STRING | User acquisition source |
| `user_tld_source` | STRING | User acquisition TLD |
| `user_campaign` | STRING | User acquisition campaign |
| `user_device_type` | STRING | User device type |
| `user_country` | STRING | User country |
| `user_language` | STRING | User language |
| `user_type` | STRING | 'new_user' or 'returning_user' |
| `new_user` | STRING | Client ID if new |
| `returning_user` | STRING | Client ID if returning |
| **SESSION DATA** | | |
| `session_number` | INTEGER | Session sequence number |
| `session_id` | STRING | Session identifier |
| `session_start_timestamp` | INTEGER | Session start time |
| `session_channel_grouping` | STRING | Session channel |
| `session_source` | STRING | Session source |
| `session_tld_source` | STRING | Session TLD |
| `session_campaign` | STRING | Session campaign |
| `cross_domain_session` | STRING | Cross domain flag |
| `session_device_type` | STRING | Session device type |
| `session_country` | STRING | Session country |
| `session_language` | STRING | Session language |
| `session_browser_name` | STRING | Browser name |
| **EVENT DATA** | | |
| `event_date` | DATE | Event date |
| `event_name` | STRING | Event name |
| `event_timestamp` | DATETIME | Event timestamp |
| **PRODUCT DATA** | | |
| `item_id` | STRING | Product ID |
| `item_name` | STRING | Product Name |
| `item_sku` | STRING | SKU |
| `item_brand` | STRING | Brand |
| `item_variant` | STRING | Variant |
| `item_category` | STRING | Category Level 1 |
| `item_category2` | STRING | Category Level 2 |
| `item_category3` | STRING | Category Level 3 |
| `item_category4` | STRING | Category Level 4 |
| `item_category5` | STRING | Category Level 5 |
| `item_list_id` | STRING | List ID |
| `item_list_name` | STRING | List Name |
| `item_list_index` | INTEGER | List Position |
| `item_price` | FLOAT | Item Price |
| `item_quantity` | INTEGER | Quantity |
| `item_revenue` | FLOAT | Revenue from item |
| `view_item` | INTEGER | Count of views |
| `add_to_cart` | INTEGER | Count of adds |
| `remove_from_cart` | INTEGER | Count of removals |
| `purchase` | INTEGER | Count of purchases |
| `refund` | INTEGER | Count of refunds |

</details>


### Shopping stages open funnel
Calculates drop-off rates across the entire shopping journey, regardless of where the user started.
[View source Code](ec_shopping_stages_open_funnel.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| `step_name` | STRING | Name of the funnel step |
| `step_index` | INTEGER | Order index of the step |
| `status` | STRING | "New funnel entries" or "Continuing funnel entries" |
| `client_id` | STRING | User identifier at this step |
| `client_id_next_step` | STRING | Identifier if user reached next step |
| `session_id` | STRING | Session identifier |
| `user_type` | STRING | User type |
| `session_source` | STRING | Session source |
| `session_channel_grouping` | STRING | Session channel grouping |
| `session_device_type` | STRING | Device type |
| `session_country` | STRING | Country |

</details>


### Shopping stages closed funnel
Analyzes the shopping journey for users who follow a specific, linear sequence of steps.
[View source Code](ec_shopping_stages_closed_funnel.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| `step_name` | STRING | Name of the funnel step |
| `step_index` | INTEGER | Order index of the step |
| `client_id` | STRING | User identifier at this step |
| `client_id_next_step` | STRING | Identifier if user reached next step |
| `session_id` | STRING | Session identifier |
| `user_type` | STRING | User type |
| `session_source` | STRING | Session source |
| `session_channel_grouping` | STRING | Session channel grouping |
| `session_device_type` | STRING | Device type |
| `session_country` | STRING | Country |

</details>


### GTM performances
Provides metrics on GTM container execution times and tag performance to help optimize site speed.
[View source Code](gtm_performances.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| `event_date` | DATE | Event date |
| `event_timestamp` | INTEGER | Timestamp |
| `event_name` | STRING | Event name |
| `container_id` | STRING | GTM Container ID |
| `container_version` | STRING | Container Version |
| `tag_name` | STRING | Tag Name |
| `tag_id` | STRING | Tag ID |
| `tag_status` | STRING | Status (success/failure) |
| `execution_time_ms` | INTEGER | Time taken to execute (ms) |
| `tag_execution_timestamp_ms` | INTEGER | Execution start time (ms) |
| `client_id` | STRING | User identifier |
| `session_id` | STRING | Session identifier |
| `page_location` | STRING | URL where tag fired |

</details>


### Consents
Tracks changes in user consent status over time, ensuring compliance and data transparency.
[View source Code](consents.sql)

<details><summary>Output Fields Summary</summary>

| Field name | Type | Description |
| :--- | :--- | :--- |
| `event_date` | DATE | Event date |
| `event_timestamp` | INTEGER | Timestamp |
| `event_name` | STRING | Event name |
| `consent_type` | STRING | Update type (default/update) |
| `respect_consent_mode` | STRING | Consent mode enabled flag |
| `ad_storage` | STRING | Ad storage consent |
| `analytics_storage` | STRING | Analytics storage consent |
| `ad_user_data` | STRING | Ad user data consent |
| `ad_personalization` | STRING | Ad personalization consent |
| `functionality_storage` | STRING | Functional cookies |
| `personalization_storage` | STRING | Personalization cookies |
| `security_storage` | STRING | Security cookies |
| `client_id` | STRING | User identifier |
| `session_id` | STRING | Session identifier |

</details>

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
