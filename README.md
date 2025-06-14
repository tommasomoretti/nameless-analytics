![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

---

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free real-time digital analytics suite that respects user privacy.

Start from here:
- [How it works](#how-it-works)
- Main features
  - [Client-side tracking](#client-side-tracking)
  - [Server-side tracking](#server-side-tracking)
  - [Measurement protocol](#measurement-protocol)
  - [Batch data import](#batch-data-import)
  - [Data vizualization](#data-vizualization)
  - [Reporting queries](#reporting-queries)
  - [Utility functions](#utility-functions)
  - [AI helper](#ai-helper)
- [Standard request payload](#standard-request-payload)
- Get started
  - [Basic requirements](#basic-requirements)
  - [How to set up](#how-to-set-up)
  - [Do you want to see a live demo?](#do-you-want-to-see-a-live-demo)



## How it works
Here is a basic schema of how Nameless Analytics works:

<img width="1383" alt="Screenshot 2025-04-21 alle 10 52 59" src="https://github.com/user-attachments/assets/46624132-83c6-4efd-86d3-c3a24d691604" />

Please note that Nameless Analytics is free, but Google Cloud resources may be paid.



## Main features
### Client-side tracking
Highly customizable Client-Side Tracker Tag that sends requests to Server-Side Client Tag and supports various field types (string, integer, double, and JSON). Main features:
- Fully integrated with Google Consent Mode: track events only when `analytics_storage` is granted or track all events regardless of `analytics_storage` value
- Single Page Application tracking
- Flexible e-commerce data structure that supports custom JSON objects or GA4 standards
- Cross-domain tracking for stitching users and sessions across multiple websites
- Custom acquisition URL parameters, there's no need to use UTM parameters exclusively
- Load libraries from CDN or from a custom location
- Event logging in JavaScript console

Read more about [Nameless Analytics Client-side tracker tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag) and [Nameless Analytics Client-side config variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable)


### Server-side tracking
Highly customizable Server-Side Client Tag that claims requests from Client-Side Tracker Tag. Main features:
- Creates users and sessions id and stores HttpOnly, Secure and SameSite = Strict cookies
- Writes user and session data into Google Firestore in real time
- Enriches and writes event data into Google BigQuery in real time. No sampling or pre processing, only raw data
- Event logging in Google Tag Manager Server-Side debug view

Read more about [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag)


### Measurement protocol
Enhance data tracked from the website with custom requests made from a server or other sources

Read more about [Nameless Analytics Measurement Protocol](https://github.com/tommasomoretti/nameless-analytics-measurement-protocol)


### Batch data import
Load data effortlessly from a structured CSV into BigQuery main table

Read more about [Nameless Analytics Data Loader](https://github.com/tommasomoretti/nameless-analytics-data-loader)


### Data vizualization
No pre-built interface, use any BI tool that connects with BigQuery such as Google Looker, Google Looker Studio, Microsoft Power BI, Tableau, Apache Superset, Grafana, Redash, Retool, Mode Analytics, etc... to create reports that truly fit the needs.

Read more about [Nameless Analytics Google Looker Studio dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)


### Reporting queries
Lorem ipsum

Read more about [Nameless Analytics Main table and Reporting queries examples](https://github.com/tommasomoretti/nameless-analytics-tables) in Google BigQuery


### Utility functions
Lorem ipsum

Read more about [Nameless Analytics Utility Functions](https://github.com/tommasomoretti/nameless-analytics-utility-functions)


### AI helper
Get help from a custom OpenAI GPT that knows everything about Nameless Analytics.

Ask anything to [Nameless Analytics helper](https://chatgpt.com/g/g-lI7lqrZx2-nameless-analytics-helper)



## Standard request payload
This is the request payload with only standard parameters and no customization at all. 

```json
{
  "event_name": "page_view",
  "event_id": "bm0nQaxTjBSf5Ag_sJ3UilMZloKTSEb-zN0WfbrVyWS5zYN_LHBTER67z2lV3Ac",
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

| **Parameter name**         | **Sub-parameter**             | **Type** | **Added**   | **Field description**                    |
|----------------------------|-------------------------------|----------|-------------|------------------------------------------|
| event_date                 |                               | String   | Client-side | Data dell'evento                         |
| event_datetime             |                               | String   | Client-side | Data e ora dell'evento                   |
| event_timestamp            |                               | Integer  | Client-side | Timestamp dell'evento                    |
| event_origin               |                               | String   | Client-side | Origine dell'evento                      |
| content_length             |                               | Integer  | Client-side | Lunghezza del contenuto                  |
| event_id                   |                               | String   | Client-side | Identificativo univoco dell’evento       |
| event_name                 |                               | String   | Client-side | Nome dell’evento                         |
| processing_event_timestamp |                               | Integer  | Server-side | Timestamp di elaborazione dell’evento    |
| client_id                  |                               | String   | Server-side | Identificativo client                    |
| session_id                 |                               | String   | Server-side | Identificativo sessione                  |
| event_data                 | event_type                    | String   | Client-side | Tipo di evento                           |
|                            | channel_grouping              | String   | Client-side | Raggruppamento canale                    |
|                            | source                        | String   | Client-side | Fonte di traffico                        |
|                            | campaign                      | String   | Client-side | Campagna                                 |
|                            | campaign_id                   | String   | Client-side | ID campagna                              |
|                            | campaign_term                 | String   | Client-side | Termine campagna                         |
|                            | campaign_content              | String   | Client-side | Contenuto campagna                       |
|                            | page_id                       | String   | Client-side | Identificativo univoco della pagina      |
|                            | page_title                    | String   | Client-side | Titolo della pagina                      |
|                            | page_hostname_protocol        | String   | Client-side | Protocollo dell’hostname pagina          |
|                            | page_hostname                 | String   | Client-side | Hostname della pagina                    |
|                            | page_location                 | String   | Client-side | Percorso della pagina                    |
|                            | page_fragment                 | String   | Client-side | Frammento URL                            |
|                            | page_query                    | String   | Client-side | Query URL                                |
|                            | page_extension                | String   | Client-side | Estensione della risorsa                 |
|                            | page_referrer                 | String   | Client-side | Referrer della pagina                    |
|                            | page_language                 | String   | Client-side | Lingua della pagina                      |
|                            | cs_container_id               | String   | Client-side | ID contenitore CS                        |
|                            | user_agent                    | String   | Client-side | User agent                               |
|                            | browser_name                  | String   | Client-side | Nome del browser                         |
|                            | browser_language              | String   | Client-side | Lingua del browser                       |
|                            | browser_version               | String   | Client-side | Versione del browser                     |
|                            | device_type                   | String   | Client-side | Tipo di dispositivo                      |
|                            | device_vendor                 | String   | Client-side | Produttore del dispositivo               |
|                            | device_model                  | String   | Client-side | Modello del dispositivo                  |
|                            | os_name                       | String   | Client-side | Sistema operativo                        |
|                            | os_version                    | String   | Client-side | Versione del sistema operativo           |
|                            | screen_size                   | String   | Client-side | Risoluzione dello schermo                |
|                            | viewport_size                 | String   | Client-side | Dimensione del viewport                  |
|                            | country                       | String   | Server-side | Paese (geo da evento)                    |
|                            | city                          | String   | Server-side | Città (geo da evento)                    |
|                            | ss_hostname                   | String   | Server-side | Hostname del server-side container       |
|                            | ss_container_id               | String   | Server-side | ID del server-side container             |
| user_data                  | user_campaign_id              | String   | Server-side | ID campagna utente                       |
|                            | user_country                  | String   | Server-side | Paese dell’utente                        |
|                            | user_device_type              | String   | Server-side | Tipo di dispositivo utente               |
|                            | user_channel_grouping         | String   | Server-side | Raggruppamento canale utente             |
|                            | user_source                   | String   | Server-side | Fonte di traffico utente                 |
|                            | user_first_session_timestamp  | String   | Server-side | Timestamp della prima sessione           |
|                            | user_date                     | String   | Server-side | Data della prima sessione                |
|                            | user_campaign                 | String   | Server-side | Campagna dell’utente                     |
|                            | user_language                 | String   | Server-side | Lingua dell’utente                       |
|                            | user_last_session_timestamp   | Integer  | Server-side | Timestamp dell’ultima sessione           |
| session_data               | session_date                  | String   | Server-side | Data della sessione                      |
|                            | session_number                | String   | Server-side | Numero progressivo della sessione        |
|                            | cross_domain_session          | String   | Server-side | Indicatore di sessione cross-domain      |
|                            | session_channel_grouping      | String   | Server-side | Raggruppamento canale della sessione     |
|                            | session_source                | String   | Server-side | Fonte della sessione                     |
|                            | session_campaign              | String   | Server-side | Campagna della sessione                  |
|                            | session_campaign_id           | String   | Server-side | ID campagna della sessione               |
|                            | session_device_type           | String   | Server-side | Tipo di dispositivo della sessione       |
|                            | session_country               | String   | Server-side | Paese della sessione                     |
|                            | session_language              | String   | Server-side | Lingua della sessione                    |
|                            | session_hostname              | String   | Server-side | Hostname della sessione                  |
|                            | session_landing_page_category | String   | Server-side | Categoria della pagina di atterraggio    |
|                            | session_landing_page_location | String   | Server-side | Percorso della pagina di atterraggio     |
|                            | session_landing_page_title    | String   | Server-side | Titolo della pagina di atterraggio       |
|                            | session_exit_page_location    | String   | Server-side | Percorso della pagina di uscita          |
|                            | session_exit_page_title       | String   | Server-side | Titolo della pagina di uscita            |
|                            | session_end_timestamp         | Integer  | Server-side | Timestamp di fine sessione               |
|                            | session_start_timestamp       | Integer  | Server-side | Timestamp di inizio sessione             |
| consent_data               | respect_consent_mode          | String   | Client-side | Rispetto della modalità di consenso      |
|                            | consent_type                  | String   | Client-side | Tipo di consenso                         |
|                            | ad_user_data                  | String   | Client-side | Consenso dati utente per annunci         |
|                            | ad_personalization            | String   | Client-side | Consenso personalizzazione annunci       |
|                            | ad_storage                    | String   | Client-side | Consenso archiviazione annunci           |
|                            | analytics_storage             | String   | Client-side | Consenso archiviazione analitica         |
|                            | functionality_storage         | String   | Client-side | Consenso archiviazione funzionalità      |
|                            | personalization_storage       | String   | Client-side | Consenso archiviazione personalizzazione |
|                            | security_storage              | String   | Client-side | Consenso archiviazione sicurezza         |



## Get started
### Basic requirements
- Google Consent Mode installed on a website
- A Client-Side Google Tag Manager container installed on a website
- A Server-Side Google Tag Manager container hosted on App Engine or Cloud Run mapped to a custom domain name
- A Google Firestore database
- A Google BigQuery dataset


### How to set up
1. [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent?hl=en&consentmode=advanced)
2. [Client-Side Google Tag Manager](https://support.google.com/tagmanager/answer/14842164)
3. [Server-Side Google Tag Manager](https://developers.google.com/tag-platform/tag-manager/server-side) with [Google App Engine](https://developers.google.com/tag-platform/tag-manager/server-side/app-engine-setup) or [Google Cloud Run](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
4. [Nameless Analytics Client-side tracker tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag) and [Nameless Analytics Client-side config variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable)
5. [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag)
8. [Nameless Analytics Utility Functions](https://github.com/tommasomoretti/nameless-analytics-utility-functions)
8. [Nameless Analytics Measurement Protocol](https://github.com/tommasomoretti/nameless-analytics-measurement-protocol)
7. [Nameless Analytics Data Loader](https://github.com/tommasomoretti/nameless-analytics-data-loader)
6. [Nameless Analytics Main table and Reporting queries examples](https://github.com/tommasomoretti/nameless-analytics-tables) in Google BigQuery
9. [Nameless Analytics Google Looker Studio dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)


### Do you want to see a live demo?

Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com) and open the developer console.

---


**Reach me at:** [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
