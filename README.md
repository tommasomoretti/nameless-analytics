![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

---

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free real-time digital analytics suite that respects user privacy.

Start from here:
- Main features
  - [Data governance](#data-governance)
  - [Performances](#performances)
  - [Event tracking](#event-tracking)
- [How it works](#how-it-works)
- Get Started
  - [Basic requirements](#basic-requirements)
  - [How to set up](#how-to-set-up)
  - [Do you want to see a live demo?](#do-you-want-to-see-a-live-demo)
 


## Main features
### Data governance
- **Cloud hosted data**
  
  All data is stored in its raw form in a Google BigQuery dataset, exactly as sent from the browser, via the Measurement Protocol or inserted through the Data Loader script.
  
- **Raw data**
  
  No sampling or pre processing, only raw data. Use standard tables or make custom tables in Google BigQuery, without any limitations.

  No pre-built interface, use any BI tool that connects with BigQuery such as Google Looker, Google Looker Studio, Microsoft Power BI, Tableau, Apache Superset, Grafana, Redash, Retool, Mode Analytics, etc... to create reports that truly fit the needs.

  
- **First-party data context**
  
  Cookies are served from GTM Server-side in a first-party context.

- **Privacy by design**

  Fully integrated with Google Consent Mode with two tracking modes:
  - Respect user consents: track events only when `analytics_storage` is granted.
  - Do not respect user consents: track all events regardless of `analytics_storage` value with or without redacted `user_id`, `client_id`, and `session_id` when `analytics_storage` is denied.

  By default, no PII data are tracked.
  

### Performances
- **Real-time**
  
  Data ingestion into Google BigQuery is nearly instantaneous, and events are available within a couple of seconds.

- **Lightweight and fast**
  
  The main JavaScript library only weighs a few kB and is served via CloudFlare CDN. All hits are sent via HTTP POST requests.


### Event tracking

- **Client-side tracking**
  
  Highly customizable Client-Side Tracker Tag that supports various field types (string, integer, double, and JSON) and accepts custom acquisition URL parameters (it's not mandatory to use UTM parameters). Easily track single-page application page views by customizing the tracker settings.

- **Server-side tracking**
  
  All data are written directly to Google BigQuery by the Server-Side Client Tag, which processes requests from the Client-Side Tracker Tag, enriches the content, and stores browser cookies.

- **E-commerce event tracking**
  
  Flexible e-commerce data structure that supports GA4 standards or custom objects.

- **Cross-domain tracking**
  
  Track users and sessions across multiple websites.

- **Measurement protocol tracking**
  
  Enhance data tracked from the website with custom requests made from a server or other sources.

- **Offline data import**
  
  Load data from a structured CSV into the main table effortlessly.

- **Event logging**
  
  Simplified debugging with event details from the JavaScript console and from Server-Side Google Tag Manager debug view.



## How it works
Here is a basic schema of how Nameless Analytics works:

![schema](https://github.com/user-attachments/assets/1f7b5f1e-e282-43cf-8f30-737554c8e3d9)

N.B.: Nameless Analytics is free, but you have to pay for the Google Cloud resources that you'll use.


## Get Started
### Basic requirements
- Google Consent Mode installed on a website
- A Client-Side Google Tag Manager container installed on a website
- A Server-Side Google Tag Manager container hosted on App Engine or Cloud Run mapped to a custom domain name
- A Google BigQuery project


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
