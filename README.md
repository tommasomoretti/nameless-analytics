# Nameless Analytics

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/), [Google Firestore](https://cloud.google.com/firestore) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free real-time digital analytics suite that respects user privacy.

## Start from here
- [What is Nameless Analytics](#what-is-nameless-analytics)
- [Technical Architecture](#technical-architecture)
  - [High-Level Data Flow](#high-level-data-flow)
  - [Client-Side Collection](#client-side-collection)
  - [Server-Side Processing](#server-side-processing)
  - [Storage](#storage)
  - [Reporting](#reporting)
  - [Support & AI](#support--ai)
- [Quick Start](#quick-start)
  - [Repository structure](#repository-structure)
  - [Project configuration](#project-configuration)
- [External Resources](#external-resources)

</br>



## What is Nameless Analytics
Nameless Analytics is an open-source, first-party data collection infrastructure designed for organizations and analysts that demand complete control over their digital analytics. It's built upon a transparent pipeline that is built entirely on your own Google Cloud Platform environment.

At a high level, the platform solves three critical challenges in modern analytics:

1.  **Total Data Ownership**: Unlike commercial tools where data resides on third-party servers, Nameless Analytics pipelines every interaction directly to your BigQuery warehouse. You own the raw data, the retention policies and the reporting.
2.  **Data Quality**: By leveraging a server-side, first-party architecture, the platform bypasses common client-side restrictions (such as ad blockers and ITP), ensuring granular, unsampled data collection that is far more accurate than standard client-side tags.
3.  **Real-Time Activation**: Stream identical event payloads to external APIs, CRMs, or marketing automation tools the instant an event occurs, enabling true real-time personalization.

</br>



## Technical Architecture
The platform is built on a modern, decoupled architecture that separates data capture, processing, and storage to ensure maximum flexibility and performance.

### High-Level Data Flow
The following diagram illustrates the real-time data flow from the user's browser, through the server-side processing layer, to the final storage and visualization destinations:

<img src="https://github.com/user-attachments/assets/ea15a5f1-b456-4d85-a116-42e54c4073cd" alt="Nameless Analytics schema"/>

</br>


### Client-Side Collection
The **Client-Side Tracker** (GTM Web) is the system's intelligent agent in the browser. It abstracts complex logic to ensure reliable data capture under any condition.

**Technical Capabilities:**
- **Sequential Execution Queue**: Implements specific logic to handle high-frequency events (e.g., rapid clicks), ensuring requests are dispatched in strict FIFO order to preserve the narrative of the session.
- **Smart Consent Management**: Fully integrated with Google Consent Mode. It can automatically queue events (`analytics_storage` pending) and release them only when consent is granted, preventing data loss.
- **SPA & History Management**: Native support for Single Page Applications, automatically detecting history changes to trigger virtual page views.
- **Cross-domain Architecture**: Stitches sessions across different top-level domains using a pre-flight ID request and URL decoration (`na_id`) to pass identifiers securely.

#### Request payload data
The request data is sent via a POST request in JSON format. It is structured into:
* User data: data related to users.
* Session data: data related to sessions.
* Page data: data related to pages.
* Event data: data related to events.
* dataLayer data.
* Ecommerce data.

<details><summary>Request payload example with only standard parameters and no customization at all</summary>

</br>

```json
{
  "user_date": "2025-12-05",
  "client_id": "lZc919IBsqlhHks",
  "user_data": {
    "user_campaign_id": null,
    "user_country": "IT",
    "user_device_type": "desktop",
    "user_channel_grouping": "gtm_debugger",
    "user_source": "tagassistant.google.com",
    "user_first_session_timestamp": 1764955391487,
    "user_campaign_content": null,
    "user_campaign": null,
    "user_campaign_click_id": null,
    "user_tld_source": "google.com",
    "user_language": "it-IT",
    "user_campaign_term": null,
    "user_last_session_timestamp": 1765022517600
  },
  "session_date": "2025-12-06",
  "session_id": "lZc919IBsqlhHks_1KMIqneQ7dsDJU",
  "session_data": {
    "session_number": 2,
    "cross_domain_session": "No",
    "session_channel_grouping": "gtm_debugger",
    "session_source": "tagassistant.google.com",
    "session_tld_source": "google.com",
    "session_campaign": null,
    "session_campaign_id": null,
    "session_campaign_click_id": null,
    "session_campaign_term": null,
    "session_campaign_content": null,
    "session_device_type": "desktop",
    "session_country": "IT",
    "session_language": "it-IT",
    "session_hostname": "tommasomoretti.com",
    "session_browser_name": "Chrome",
    "session_landing_page_category": "Homepage",
    "session_landing_page_location": "/",
    "session_landing_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_exit_page_category": "Homepage",
    "session_exit_page_location": "/",
    "session_exit_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_start_timestamp": 1765022517600,
    "session_end_timestamp": 1765023618088
  },
  "page_date": "2025-12-06",
  "page_id": "lZc919IBsqlhHks_1KMIqneQ7dsDJU-WVTWEorF69ZEk3y",
  "page_data": {
    "page_title": "Tommaso Moretti | Freelance digital data analyst",
    "page_hostname_protocol": "https",
    "page_hostname": "tommasomoretti.com",
    "page_location": "/",
    "page_fragment": null,
    "page_query": "gtm_debug=1765021707758",
    "page_extension": null,
    "page_referrer": "https://tagassistant.google.com/",
    "page_timestamp": 1765023618088,
    "page_category": "Homepage",
    "page_language": "it"
  },
  "event_date": "2025-12-06",
  "event_timestamp": 1765023618088,
  "event_id": "lZc919IBsqlhHks_1KMIqneQ7dsDJU-WVTWEorF69ZEk3y_XIkjlUOkXKn99IV",
  "event_name": "page_view",
  "event_origin": "Website",
  "event_data": {
    "event_type": "page_view",
    "channel_grouping": "gtm_debugger",
    "source": "tagassistant.google.com",
    "campaign": null,
    "campaign_id": null,
    "campaign_click_id": null,
    "campaign_term": null,
    "campaign_content": null,
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/142.0.0.0 Safari/537.36",
    "browser_name": "Chrome",
    "browser_language": "it-IT",
    "browser_version": "142.0.0.0",
    "device_type": "desktop",
    "device_vendor": "Apple",
    "device_model": "Macintosh",
    "os_name": "Mac OS",
    "os_version": "10.15.7",
    "screen_size": "1512x982",
    "viewport_size": "1512x823",
    "country": "IT",
    "city": "venice",
    "tld_source": "google.com"
  },
  "consent_data": {
    "consent_type": "Update",
    "respect_consent_mode": "Yes",
    "ad_user_data": "Denied",
    "ad_personalization": "Denied",
    "ad_storage": "Denied",
    "analytics_storage": "Granted",
    "functionality_storage": "Denied",
    "personalization_storage": "Granted",
    "security_storage": "Denied"
  },
  "gtm_data": {
    "cs_hostname": "tommasomoretti.com",
    "cs_container_id": "GTM-PW7349P",
    "cs_tag_name": null,
    "cs_tag_id": 277,
    "ss_hostname": "gtm.tommasomoretti.com",
    "ss_container_id": "GTM-KQG9ZNG",
    "ss_tag_name": "NA",
    "ss_tag_id": null,
    "processing_event_timestamp": 1765023618275,
    "content_length": 1605
  }
}
```
</details>

<details><summary>Standard payload details</summary>

</br>

| **Parameter name** | **Sub-parameter**             | **Type** | **Added**   | **Field description**                    |
|--------------------|-------------------------------|----------|-------------|------------------------------------------|
| user_date          |                               | String   | Server-Side | User data collection date                |
| client_id          |                               | String   | Server-Side | Unique client identifier                 |
| user_data          | user_campaign_id              | String   | Server-Side | User campaign ID                         |
|                    | user_country                  | String   | Server-Side | User country                             |
|                    | user_device_type              | String   | Server-Side | User device type                         |
|                    | user_channel_grouping         | String   | Server-Side | User channel grouping                    |
|                    | user_source                   | String   | Server-Side | User source                              |
|                    | user_first_session_timestamp  | Integer  | Server-Side | Timestamp of user's first session        |
|                    | user_campaign_content         | String   | Server-Side | User campaign content                    |
|                    | user_campaign                 | String   | Server-Side | User campaign name                       |
|                    | user_campaign_click_id        | String   | Server-Side | User campaign click identifier           |
|                    | user_tld_source               | String   | Server-Side | User top-level domain source             |
|                    | user_language                 | String   | Server-Side | User language                            |
|                    | user_campaign_term            | String   | Server-Side | User campaign term                       |
|                    | user_last_session_timestamp   | Integer  | Server-Side | Timestamp of user's last session         |
| session_date       |                               | String   | Server-Side | Session date                             |
| session_id         |                               | String   | Server-Side | Unique session identifier                |
| session_data       | session_number                | Integer  | Server-Side | Session number for the user              |
|                    | cross_domain_session          | String   | Server-Side | Indicates if the session is cross-domain |
|                    | session_channel_grouping      | String   | Server-Side | Channel grouping for the session         |
|                    | session_source                | String   | Server-Side | Session source                           |
|                    | session_tld_source            | String   | Server-Side | Session top-level domain source          |
|                    | session_campaign              | String   | Server-Side | Session campaign name                    |
|                    | session_campaign_id           | String   | Server-Side | Session campaign ID                      |
|                    | session_campaign_click_id     | String   | Server-Side | Session campaign click ID                |
|                    | session_campaign_term         | String   | Server-Side | Session campaign term                    |
|                    | session_campaign_content      | String   | Server-Side | Session campaign content                 |
|                    | session_device_type           | String   | Server-Side | Device type used in session              |
|                    | session_country               | String   | Server-Side | Session country                          |
|                    | session_language              | String   | Server-Side | Session language                         |
|                    | session_hostname              | String   | Server-Side | Website hostname for session             |
|                    | session_browser_name          | String   | Server-Side | Browser name used in session             |
|                    | session_landing_page_category | String   | Server-Side | Landing page category                    |
|                    | session_landing_page_location | String   | Server-Side | Landing page path                        |
|                    | session_landing_page_title    | String   | Server-Side | Landing page title                       |
|                    | session_exit_page_category    | String   | Server-Side | Exit page category                       |
|                    | session_exit_page_location    | String   | Server-Side | Exit page path                           |
|                    | session_exit_page_title       | String   | Server-Side | Exit page title                          |
|                    | session_start_timestamp       | Integer  | Server-Side | Session start timestamp                  |
|                    | session_end_timestamp         | Integer  | Server-Side | Session end timestamp                    |
| page_date          |                               | String   | Client-Side | Page data date                           |
| page_id            |                               | String   | Client-Side | Unique page identifier                   |
| page_data          | page_title                    | String   | Client-Side | Page title                               |
|                    | page_hostname_protocol        | String   | Client-Side | Page hostname protocol (http/https)      |
|                    | page_hostname                 | String   | Client-Side | Page hostname                            |
|                    | page_location                 | String   | Client-Side | Page path                                |
|                    | page_fragment                 | String   | Client-Side | URL fragment                             |
|                    | page_query                    | String   | Client-Side | URL query string                         |
|                    | page_extension                | String   | Client-Side | Page file extension                      |
|                    | page_referrer                 | String   | Client-Side | Referrer URL                             |
|                    | page_timestamp                | Integer  | Client-Side | Page view timestamp                      |
|                    | page_category                 | String   | Client-Side | Page category                            |
|                    | page_language                 | String   | Client-Side | Page language                            |
| event_date         |                               | String   | Client-Side | Event date                               |
| event_timestamp    |                               | Integer  | Client-Side | Event timestamp                          |
| event_id           |                               | String   | Client-Side | Unique event identifier                  |
| event_name         |                               | String   | Client-Side | Event name                               |
| event_origin       |                               | String   | Client-Side | Event origin (e.g., Website)             |
| event_data         | event_type                    | String   | Client-Side | Event type                               |
|                    | channel_grouping              | String   | Client-Side | Channel grouping for the event           |
|                    | source                        | String   | Client-Side | Event traffic source                     |
|                    | campaign                      | String   | Client-Side | Event campaign                           |
|                    | campaign_id                   | String   | Client-Side | Event campaign ID                        |
|                    | campaign_click_id             | String   | Client-Side | Event campaign click ID                  |
|                    | campaign_term                 | String   | Client-Side | Event campaign term                      |
|                    | campaign_content              | String   | Client-Side | Event campaign content                   |
|                    | user_agent                    | String   | Client-Side | Browser user agent string                |
|                    | browser_name                  | String   | Client-Side | Browser name                             |
|                    | browser_language              | String   | Client-Side | Browser language                         |
|                    | browser_version               | String   | Client-Side | Browser version                          |
|                    | device_type                   | String   | Client-Side | Device type                              |
|                    | device_vendor                 | String   | Client-Side | Device manufacturer                      |
|                    | device_model                  | String   | Client-Side | Device model                             |
|                    | os_name                       | String   | Client-Side | Operating system name                    |
|                    | os_version                    | String   | Client-Side | Operating system version                 |
|                    | screen_size                   | String   | Client-Side | Screen resolution                        |
|                    | viewport_size                 | String   | Client-Side | Browser viewport size                    |
|                    | country                       | String   | Server-Side | Event geolocation country                |
|                    | city                          | String   | Server-Side | Event geolocation city                   |
|                    | tld_source                    | String   | Client-Side | Event top-level domain source            |
| consent_data       | consent_type                  | String   | Client-Side | Consent update type                      |
|                    | respect_consent_mode          | String   | Client-Side | Whether Consent Mode is respected        |
|                    | ad_user_data                  | String   | Client-Side | Ad user data consent                     |
|                    | ad_personalization            | String   | Client-Side | Ad personalization consent               |
|                    | ad_storage                    | String   | Client-Side | Ad storage consent                       |
|                    | analytics_storage             | String   | Client-Side | Analytics storage consent                |
|                    | functionality_storage         | String   | Client-Side | Functionality storage consent            |
|                    | personalization_storage       | String   | Client-Side | Personalization storage consent          |
|                    | security_storage              | String   | Client-Side | Security storage consent                 |
| gtm_data           | cs_hostname                   | String   | Client-Side | Client-side container hostname           |
|                    | cs_container_id               | String   | Client-Side | Client-side container ID                 |
|                    | cs_tag_name                   | String   | Client-Side | Client-side tag name                     |
|                    | cs_tag_id                     | Integer  | Client-Side | Client-side tag ID                       |
|                    | ss_hostname                   | String   | Server-Side | Server-side container hostname           |
|                    | ss_container_id               | String   | Server-Side | Server-side container ID                 |
|                    | ss_tag_name                   | String   | Server-Side | Server-side tag name                     |
|                    | ss_tag_id                     | String   | Server-Side | Server-side tag ID                       |
|                    | processing_event_timestamp    | Integer  | Server-Side | Event processing timestamp               |
|                    | content_length                | Integer  | Server-Side | Request content length                   |
</details>

<details><summary>Request payload additional data parameters</summary>

#### Add dataLayer data
When the "Add current dataLayer state" option in the Nameless Analytics Client-side Tracker Configuration Variable is enabled, a `dataLayer` parameter will be added to the standard payload: 

| **Parameter name** | **Sub-parameter** | **Type** | **Added**   | **Field description** |
|--------------------|-------------------|----------|-------------|-----------------------|
| dataLayer          |                   | JSON     | Client-Side | DataLayer data        |

#### Ecommerce data
When "Add ecommerce data" in the Nameless Analytics Client-side Tracker Tag is enabled, an `ecommerce` parameter will be added to the standard payload:

| **Parameter name** | **Sub-parameter** | **Type** | **Added**   | **Field description** |
|--------------------|-------------------|----------|-------------|-----------------------|
| ecommerce          |                   | JSON     | Client-Side | Ecommerce data        |

#### Cross-domain data
When "Enable cross-domain tracking" in the Nameless Analytics Client-side Tracker Configuration Variable is enabled, the `is_cross_domain_session` and `cross_domain_id` parameters will be added to the standard payload:

| **Parameter name** | **Sub-parameter**       | **Type** | **Added**   | **Field description**   |
|--------------------|-------------------------|----------|-------------|-------------------------|
| event_data         | cross_domain_id         | JSON     | Client-Side | Cross domain id         |
| session_data       | is_cross_domain_session | String   | Server-Side | Is cross domain session |
</details>

</br>


### Server-Side Processing
The **Server-Side Client Tag** serves as the security gateway and data orchestrator. It sits between the public internet and your cloud infrastructure, sanitizing every request.

**Technical Capabilities:**
- **Security & Validation**: Validates request origins and authorized domains (CORS) before processing to prevent unauthorized usage.
- **Bot Protection**: Actively detects and blocks automated traffic (e.g., Puppeteer, Selenium, headless browsers) returning a `403 Forbidden` status to keep your data clean.
- **Data Integrity & Priority**: Enforces a strict parameter hierarchy (Server Overrides > Tag Metadata > Config Variable > dataLayer) and prevents "orphan events" by ensuring a session always starts with a `page_view`.
- **Geolocation Enrichment**: Automatically maps the incoming request IP address to geographic location data (Country, City), allowing for regional analysis without the need to persist the sensitive IP address.
- **Real-time streaming everywhere**: The system supports **Real-time Forwarding**, allowing you to POST identical event payloads to external HTTP endpoints (webhooks, conversion APIs) immediately after processing.

#### Cookie Management
The server manages identity via secure, server-set cookies, making them inaccessible to client-side scripts (preventing XSS/hijacking).

| Cookie Name | Expiry | Description |
| :--- | :--- | :--- |
| **nameless_analytics_user** | 400 days | Persistent ID for user-level analysis. |
| **nameless_analytics_session** | 30 minutes | Session state identifier (Refreshed on activity). |


### Storage
The platform utilizes a dual-storage approach, leveraging **Firestore** for real-time state and **BigQuery** for analytical scale.

**Firestore**

Nameless Analytics replaces client-side storage dependency with a server-side real-time User and Session data storage built on Google Firestore.
- **User data**: Stores the latest user profile state, including first/last session timestamps, original acquisition source, and persistent device metadata.
- **Session data**: Stores the latest session state, including real-time counters (total events, page views), landing/exit page details, and session-specific attribution.

<details><summary>Firestore document structure example</summary>

</br>

<img alt="Nameless Analytics - Firestore collection schema" src="https://github.com/user-attachments/assets/7193c73d-6717-439b-91e0-e0157fa53770" />

</details>

</br>

**BigQuery**

Nameless Analytics provides a scalable **Analytical Data Warehouse** built on Google BigQuery for high-volume event storage and automated data modeling. Every valid event is streamed in real-time to the `events_raw` table.

- **User data**: Stores the current user profile state at event occurs, including first/last session timestamps, original acquisition source, and persistent device metadata.
- **Session data**: Stores the current session state at event occurs, including real-time counters (total events, page views), landing/exit page details, and session-specific attribution.
- **Page data**: Stores the current page state at event occurs, including page name, timestamp, and page-specific attributes.
- **Event data**: Stores the current event state at event occurs, including event name, timestamp, and event-specific attributes.
- **dataLayer data**: Stores the current dataLayer state at event occurs, including dataLayer name, timestamp, and dataLayer-specific attributes.
- **Ecommerce data**: Stores the current ecommerce state at event occurs, including ecommerce metrics, timestamp, and ecommerce-specific attributes.
- **Consent data**: Stores the current consent state at event occurs, including consent status, timestamp, and consent-specific attributes.
- **GTM Performance data**: Stores the current GTM performance state at event occurs, including GTM performance metrics, timestamp, and GTM performance-specific attributes.

<details><summary>BigQuery schema example</summary>

</br>

<img alt="Nameless Analytics - BigQuery event_raw schema" src="https://github.com/user-attachments/assets/d23e3959-ab7a-453c-88db-a4bc2c7b32f4" />


</details>


### Reporting

A suite of SQL Table Functions transforms raw data into business-ready views for [Users](reporting-tables/users.sql), [Sessions](reporting-tables/sessions.sql), [Pages](reporting-tables/pages.sql), [Events](reporting-tables/events.sql), [Consents](reporting-tables/consents.sql), [GTM Performance](reporting-tables/gtm_performances.sql), and specialized Ecommerce views like [Transactions](reporting-tables/ec_transactions.sql), [Products](reporting-tables/ec_products.sql), and Funnels ([Open](reporting-tables/ec_shopping_stages_open_funnel.sql) / [Closed](reporting-tables/ec_shopping_stages_closed_funnel.sql)).

The final output is a comprehensive **Looker Studio Dashboard** connected directly to your BigQuery data. It demonstrates the platform's potential with a pre-built template covering all key metrics.

#### Example dashboard structure & reports

**1. Overview**
- [**Executive Summary**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_ebkun2sknd): High-level KPIs including total users, sessions, revenue, and conversion rates, along with sparkline trends for immediate health checks.

**2. Acquisition**
- [**Traffic Sources**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_rmpwib9hod): Breakdown of traffic by source, medium, and channel grouping. Powered by [sessions.sql](reporting-tables/sessions.sql).
- [**Device Performance**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_cmywmb9hod): Analysis of user volume and revenue split across devices. Logic defined in [sessions.sql](reporting-tables/sessions.sql).
- [**Geographic Distribution**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_enanrb9hod): Map and table views showing user sessions and revenue by Country (using server-side enrichment).

**3. Behaviour**
- [**Page Performance**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_oqvpz41sgd): Detailed metrics for individual pages. Powered by [pages.sql](reporting-tables/pages.sql).
- [**Landing Pages**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_it3ayf1hod): Effectiveness of entry points. Logic in [sessions.sql](reporting-tables/sessions.sql).
- [**Exit Pages**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_ep50zf1hod): Identification of high-drop-off pages. Logic in [sessions.sql](reporting-tables/sessions.sql).
- [**Event Tracking**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_y779jg1hod): Granular view of tracked interaction events. Powered by [events.sql](reporting-tables/events.sql).

**4. Ecommerce**
- [**Customer Analysis**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_jc2z2lhwgd): Customer loyalty and frequency. Based on [users.sql](reporting-tables/users.sql).
- [**Sales Performance**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_zlu0hdkugd): Revenue trends over time. Powered by [ec_transactions.sql](reporting-tables/ec_transactions.sql).
- [**Product Performance**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_x89r79gvgd): Item-level reporting. Powered by [ec_products.sql](reporting-tables/ec_products.sql).
- [**Shopping Funnel**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_o8lq2jfvgd): Conversion funnel analysis. Based on [Open](reporting-tables/ec_shopping_stages_open_funnel.sql) and [Closed](reporting-tables/ec_shopping_stages_closed_funnel.sql) funnel logic.

**5. Compliance (Consent)**
- [**Consent Overview**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_sba934crpd): Stats on opt-in rates. Powered by [consents.sql](reporting-tables/consents.sql).
- [**Consent Details**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_nn21ghetpd): Granular consent types over time. Logic in [consents.sql](reporting-tables/consents.sql).

**6. Debugging & Tech**
- [**Web Hits Latency**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_zlobch0knd): Pipeline latency monitoring. Using [gtm_performances.sql](reporting-tables/gtm_performances.sql).
- [**Server-to-Server Hits**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_yiouuvwgod): Dedicated view for non-browser events sent via Measurement Protocol.
- [**Raw Data Inspector**](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_unnkswttkd): Full table view of individual raw events for granular troubleshooting and verification.


### Support & AI
Get expert help for implementation, technical documentation, and advanced SQL queries.
- **[OpenAI GPT](https://chatgpt.com/g/g-6860ef949f94819194c3bc2c08e2f395-nameless-analytics-q-a)**: Specialized GPT trained on the platform docs.
- **[Gemini Gem]()**: *Coming soon*

</br>



## Quick Start

### Repository structure
- Main repository: [nameless-analytics](#nameless-analytics)
- Client-side tracker tag: [nameless-analytics-client-side-tracker-tag](#client-side-collection)
- Client-side tracker configuration variable: [nameless-analytics-client-side-tracker-configuration-variable](#client-side-collection)
- Server-side client tag: [nameless-analytics-server-side-client-tag](#server-side-processing)
- Reporting tables: [reporting-tables](#reporting)
- GTM default containers: [gtm-containers](#project-configuration)


### Project configuration
Before starting the setup, ensure you have:
- A Google Cloud Project with an active billing account.
- A Google Tag Manager (Web) container.
- A Google Tag Manager (Server-side) container.

#### Google Cloud Setup
1. Google Cloud BigQuery: Create tables and table functions in BigQuery using the provided [SQL scripts](reporting-tables/)
2. Google Cloud Firestore: Enable in **Native Mode**
3. Google Cloud IAM: Grant your GTM SS Service Account `BigQuery Data Editor`, `BigQuery Job User`, and `Cloud Datastore User`

#### Google Tag Manager Setup
1. Import: [Client-side GTM Template](gtm-containers/gtm-client-side-container-template.json)
2. Import: [Server-side GTM Template](gtm-containers/gtm-server-side-container-template.json)

</br>



## External Resources
- [Live Demo](https://namelessanalytics.com) (Open the dev console).
- [Contributing Guidelines](CONTRIBUTING.md)
- [MIT License](LICENSE)

---
Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
