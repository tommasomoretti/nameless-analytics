# NAMELESS ANALYTICS

---

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/), [Google Firestore](https://cloud.google.com/firestore) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free real-time digital analytics suite that respects user privacy.

Table of contents:
- Main features
  - [Client-side tracking](#client-side-tracking)
  - [Server-side tracking](#server-side-tracking)
  - [Streaming protocol](#streaming-protocol)
  - [Batch data loader](#batch-data-loader)
  - [Data visualization](#data-visualization)
  - [Reporting queries](#reporting-queries)
  - [Utility functions](#utility-functions)
  - [AI helper](#ai-helper)
- [How it works](#how-it-works)
  - [Standard request payload](#standard-request-payload)
- Get started
  - [Basic requirements](#basic-requirements)
  - [How to set up](#how-to-set-up)
  - [Want to see a live demo?](#want-to-see-a-live-demo)



# Main features
## Client-side tracking
Highly customizable Client-Side Tracker Tag that sends requests to Server-Side Client Tag and supports various field types (string, integer, double, and JSON). Main features:
- Fully integrated with Google Consent Mode: track events only when analytics_storage is granted or track all events regardless of analytics_storage value
- Single Page Application tracking
- Flexible e-commerce data structure that supports custom JSON objects or GA4 standards
- Cross-domain tracking for stitching users and sessions across multiple websites
- Custom acquisition URL parameters, there's no need to use UTM parameters exclusively
- Load libraries from CDN or from a custom location
- Event logging in JavaScript console

Read more about [Nameless Analytics Client-side tracker tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/) and [Nameless Analytics Client-side config variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/)


## Server-side tracking
Highly customizable Server-Side Client Tag that claims requests from Client-Side Tracker Tag. Main features:
- Creates users and sessions id and stores HttpOnly, Secure and SameSite = Strict cookies
- Writes user and session data into Google Firestore in real time
- Enriches and writes event data into Google BigQuery in real time. No sampling or pre processing, only raw data
- Event logging in Google Tag Manager Server-Side debug view

Read more about [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/)


## Streaming protocol
Enhance data tracked from the website with custom requests made from a server or other sources.

Read more about [Nameless Analytics Streaming Protocol](https://github.com/tommasomoretti/nameless-analytics-streaming-protocol/)


## Batch data loader
Load data effortlessly from a structured CSV into BigQuery main table.

Read more about [Nameless Analytics Batch Data Loader](https://github.com/tommasomoretti/nameless-analytics-batch-data-loader/)


## Data visualization
No pre-built interface, use any BI tool that connects with BigQuery such as Google Looker, Google Looker Studio, Microsoft Power BI, Tableau, Apache Superset, Grafana, Redash, Retool, Mode Analytics, etc... to create reports that truly fit the needs.

Read more about [Nameless Analytics Google Looker Studio dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)


## Reporting queries
prebuilt reporting Google BigQuery table functions for users, sessions, pages, transactions and products, shopping behaviour, consents and GTM performances.

Read more about [Nameless Analytics Main table and Reporting queries examples](https://github.com/tommasomoretti/nameless-analytics-tables/) in Google BigQuery


## Utility functions
Javascript functions from nameless_analytics.js library that helps to retrieve cookie values, get the last Google Consent Mode values, get user agent details, Format timestamp, and calculate channel grouping.

Read more about [Nameless Analytics Utility Functions](https://github.com/tommasomoretti/nameless-analytics-utility-functions/)


## AI helper
Get help from a custom OpenAI GPT that knows everything about Nameless Analytics.

Ask anything to [Nameless Analytics helper](https://chatgpt.com/g/g-lI7lqrZx2-nameless-analytics-helper/)



# How it works
Here is a basic schema of how Nameless Analytics works:

<img width="2000" alt="Nameless Analytics - Schema" src="https://github.com/user-attachments/assets/06b560f9-8bd8-469f-b2d1-769e0f1b2ec4" />

Tracking begins on the client side, where a configurable GTM tag sends event data to a server-side GTM container. A custom client tag processes these requests, generates user and session identifiers, manages secure HttpOnly cookies, and logs all activity within GTM’s native debugging tools.

Event data is written in real time to Google Firestore, providing a low-latency persistence layer. From there, a streaming protocol enriches the data with additional context (such as user agent parsing, channel grouping, or geolocation) before replicating it into BigQuery. This pipeline guarantees full data fidelity without sampling or pre-aggregation. Additionally, historical data imports can be handled via a batch loader that supports structured CSV uploads directly into BigQuery.

Once in BigQuery, the data is immediately available for analysis using any BI tool of choice, including Looker Studio, Power BI, or Tableau. The platform’s modular, open-source design ensures full transparency and control, enabling organizations to tailor every step of their analytics workflow to their technical, privacy, and business requirements.

Please note: Nameless Analytics is free, but Google Cloud resources may be paid.


## Standard request payload
This is the request payload with only standard parameters and no customization at all. 

```json
{
  "event_date": "2025-06-12",
  "event_datetime": "2025-06-12T13:26:05.138000",
  "event_timestamp": 1749734765138,
  "event_origin": "Website",
  "processing_event_timestamp": 1749734765882,
  "content_length": 1395,
  "client_id": "bm0nQaxTjBSf5Ag",
  "user_data": {
    "user_campaign_id": null,
    "user_country": "IT",
    "user_device_type": "desktop",
    "user_channel_grouping": "gtm_debugger",
    "user_source": "tagassistant.google.com",
    "user_first_session_timestamp": 1749632541988,
    "user_date": "2025-06-11",
    "user_campaign": null,
    "user_language": "it-IT",
    "user_last_session_timestamp": 1749734755749
  },
  "session_id": "bm0nQaxTjBSf5Ag_sJ3UilMZloKTSEb",
  "session_data": {
    "session_date": "2025-06-12",
    "session_number": 4,
    "cross_domain_session": "No",
    "session_channel_grouping": "direct",
    "session_source": "direct",
    "session_campaign": null,
    "session_campaign_id": null,
    "session_device_type": "desktop",
    "session_country": "IT",
    "session_language": "it-IT",
    "session_hostname": "tommasomoretti.com",
    "session_browser_name": "Chrome",
    "session_landing_page_category": null,
    "session_landing_page_location": "/",
    "session_landing_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_exit_page_location": "/",
    "session_exit_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_end_timestamp": 1749734765138,
    "session_start_timestamp": 1749734755749
  },
  "event_name": "page_view",
  "event_id": "bm0nQaxTjBSf5Ag_sJ3UilMZloKTSEb-zN0WfbrVyWS5zYN_LHBTER67z2lV3Ac",
  "event_data": {
    "event_type": "page_view",
    "channel_grouping": "direct",
    "source": "direct",
    "campaign": null,
    "campaign_id": null,
    "campaign_term": null,
    "campaign_content": null,
    "page_id": "bm0nQaxTjBSf5Ag_sJ3UilMZloKTSEb-zN0WfbrVyWS5zYN",
    "page_title": "Tommaso Moretti | Freelance digital data analyst",
    "page_hostname_protocol": "https",
    "page_hostname": "tommasomoretti.com",
    "page_location": "/",
    "page_fragment": null,
    "page_query": null,
    "page_extension": null,
    "page_referrer": null,
    "page_language": "it",
    "page_status_code": 200,
    "cs_container_id": "GTM-PW7349P",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "browser_name": "Chrome",
    "browser_language": "it-IT",
    "browser_version": "137.0.0.0",
    "device_type": "desktop",
    "device_vendor": "Apple",
    "device_model": "Macintosh",
    "os_name": "Mac OS",
    "os_version": "10.15.7",
    "screen_size": "1920x1080",
    "viewport_size": "1920x934",
    "country": "IT",
    "city": "venice",
    "ss_hostname": "gtm.tommasomoretti.com",
    "ss_container_id": "GTM-KQG9ZNG"
  },
  "consent_data": {
    "respect_consent_mode": "Yes",
    "consent_type": "Update",
    "ad_user_data": "Denied",
    "ad_personalization": "Denied",
    "ad_storage": "Denied",
    "analytics_storage": "Granted",
    "functionality_storage": "Denied",
    "personalization_storage": "Denied",
    "security_storage": "Denied"
  }
}
```

| **Parameter name**         | **Sub-parameter**             | **Type** | **Added from** | **Field description**           |
|----------------------------|-------------------------------|----------|----------------|---------------------------------|
| event_date                 |                               | String   | Client-Side    | Event date                      |
| event_datetime             |                               | String   | Server-side    | Event date and time             |
| event_timestamp            |                               | Integer  | Client-Side    | Event timestamp                 |
| event_origin               |                               | String   | Client-Side    | Event origin                    |
| processing_event_timestamp |                               | Integer  | Server-Side    | Event processing timestamp      |
| content_length             |                               | Integer  | Client-Side    | Content length                  |
| client_id                  |                               | String   | Server-Side    | Unique client identifier        |
| user_data                  | user_campaign_id              | String   | Server-Side    | User campaign ID                |
|                            | user_country                  | String   | Server-Side    | User country                    |
|                            | user_device_type              | String   | Server-Side    | User device type                |
|                            | user_channel_grouping         | String   | Server-Side    | User channel grouping           |
|                            | user_source                   | String   | Server-Side    | User traffic source             |
|                            | user_first_session_timestamp  | String   | Server-Side    | User first session timestamp    |
|                            | user_date                     | String   | Server-Side    | User first session date         |
|                            | user_campaign                 | String   | Server-Side    | User campaign                   |
|                            | user_language                 | String   | Server-Side    | User language                   |
|                            | user_last_session_timestamp   | Integer  | Server-Side    | User last session timestamp     |
| session_id                 |                               | String   | Server-Side    | Unique session identifier       |
| session_data               | session_date                  | String   | Server-Side    | Session date                    |
|                            | session_number                | String   | Server-Side    | Session sequence number         |
|                            | cross_domain_session          | String   | Server-Side    | Cross-domain session indicator  |
|                            | session_channel_grouping      | String   | Server-Side    | Session channel grouping        |
|                            | session_source                | String   | Server-Side    | Session source                  |
|                            | session_campaign              | String   | Server-Side    | Session campaign                |
|                            | session_campaign_id           | String   | Server-Side    | Session campaign ID             |
|                            | session_device_type           | String   | Server-Side    | Session device type             |
|                            | session_country               | String   | Server-Side    | Session country                 |
|                            | session_language              | String   | Server-Side    | Session language                |
|                            | session_hostname              | String   | Server-Side    | Session hostname                |
|                            | session_landing_page_category | String   | Server-Side    | Landing page category           |
|                            | session_landing_page_location | String   | Server-Side    | Landing page path               |
|                            | session_landing_page_title    | String   | Server-Side    | Landing page title              |
|                            | session_exit_page_location    | String   | Server-Side    | Exit page path                  |
|                            | session_exit_page_title       | String   | Server-Side    | Exit page title                 |
|                            | session_end_timestamp         | Integer  | Server-Side    | Session end timestamp           |
|                            | session_start_timestamp       | Integer  | Server-Side    | Session start timestamp         |
| event_name                 |                               | String   | Client-Side    | Event name                      |
| event_id                   |                               | String   | Client-Side    | Unique event identifier         |
| event_data                 | event_type                    | String   | Client-Side    | Event type                      |
|                            | channel_grouping              | String   | Client-Side    | Channel grouping                |
|                            | source                        | String   | Client-Side    | Traffic source                  |
|                            | campaign                      | String   | Client-Side    | Campaign                        |
|                            | campaign_id                   | String   | Client-Side    | Campaign ID                     |
|                            | campaign_term                 | String   | Client-Side    | Campaign term                   |
|                            | campaign_content              | String   | Client-Side    | Campaign content                |
|                            | page_id                       | String   | Client-Side    | Unique page identifier          |
|                            | page_title                    | String   | Client-Side    | Page title                      |
|                            | page_hostname_protocol        | String   | Client-Side    | Page hostname protocol          |
|                            | page_hostname                 | String   | Client-Side    | Page hostname                   |
|                            | page_location                 | String   | Client-Side    | Page path                       |
|                            | page_fragment                 | String   | Client-Side    | URL fragment                    |
|                            | page_query                    | String   | Client-Side    | URL query                       |
|                            | page_extension                | String   | Client-Side    | Resource extension              |
|                            | page_referrer                 | String   | Client-Side    | Page referrer                   |
|                            | page_language                 | String   | Client-Side    | Page language                   |
|                            | cs_container_id               | String   | Client-Side    | Client-Side container ID        |
|                            | user_agent                    | String   | Client-Side    | User agent                      |
|                            | browser_name                  | String   | Client-Side    | Browser name                    |
|                            | browser_language              | String   | Client-Side    | Browser language                |
|                            | browser_version               | String   | Client-Side    | Browser version                 |
|                            | device_type                   | String   | Client-Side    | Device type                     |
|                            | device_vendor                 | String   | Client-Side    | Device vendor                   |
|                            | device_model                  | String   | Client-Side    | Device model                    |
|                            | os_name                       | String   | Client-Side    | Operating system                |
|                            | os_version                    | String   | Client-Side    | OS version                      |
|                            | screen_size                   | String   | Client-Side    | Screen resolution               |
|                            | viewport_size                 | String   | Client-Side    | Viewport size                   |
|                            | country                       | String   | Server-Side    | Country (geo from event)        |
|                            | city                          | String   | Server-Side    | City (geo from event)           |
|                            | ss_hostname                   | String   | Server-Side    | Server-Side container hostname  |
|                            | ss_container_id               | String   | Server-Side    | Server-Side container ID        |
| consent_data               | respect_consent_mode          | String   | Client-Side    | Respect consent mode            |
|                            | consent_type                  | String   | Client-Side    | Consent type                    |
|                            | ad_user_data                  | String   | Client-Side    | Ads user data consent           |
|                            | ad_personalization            | String   | Client-Side    | Ads personalization consent     |
|                            | ad_storage                    | String   | Client-Side    | Ads storage consent             |
|                            | analytics_storage             | String   | Client-Side    | Analytics storage consent       |
|                            | functionality_storage         | String   | Client-Side    | Functionality storage consent   |
|                            | personalization_storage       | String   | Client-Side    | Personalization storage consent |
|                            | security_storage              | String   | Client-Side    | Security storage consent        |



# Get started
## Basic requirements
- Google Consent Mode installed on a website
- A Client-Side Google Tag Manager container installed on a website
- A Server-Side Google Tag Manager container hosted on App Engine or Cloud Run mapped to a custom domain name
- A Google Firestore database
- A Google BigQuery dataset


## How to set up
1. [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent?hl=en&consentmode=advanced)
2. [Client-Side Google Tag Manager](https://support.google.com/tagmanager/answer/14842164)
3. [Server-Side Google Tag Manager](https://developers.google.com/tag-platform/tag-manager/server-side) with [Google App Engine](https://developers.google.com/tag-platform/tag-manager/server-side/app-engine-setup) or [Google Cloud Run](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
4. [Nameless Analytics Client-side tracker tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/) and [Nameless Analytics Client-side config variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/)
5. [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/)
6. [Nameless Analytics Batch Data Loader](https://github.com/tommasomoretti/nameless-analytics-batch-data-loader/)
7. [Nameless Analytics Streaming Protocol](https://github.com/tommasomoretti/nameless-analytics-streaming-protocol/)
8. [Nameless Analytics Main table and Reporting queries examples](https://github.com/tommasomoretti/nameless-analytics-tables/) in Google BigQuery
9. [Nameless Analytics Utility Functions](https://github.com/tommasomoretti/nameless-analytics-utility-functions/)
10. [Nameless Analytics AI helper](https://chatgpt.com/g/g-lI7lqrZx2-nameless-analytics-helper/)
11. [Nameless Analytics Google Looker Studio dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)


## Want to see a live demo?

Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com) and open the developer console.

---


**Reach me at:** [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
