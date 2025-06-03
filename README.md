![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

---

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free real-time digital analytics suite that respects user privacy.

Start from here:
- Main features
  - [Client-side tracking](#client-side-tracking)
  - [Server-side tracking](#server-side-tracking)
  - [Measurement protocol](#measurement-protocol)
  - [Batch data import](#batch-data-import)
  - [Data vizualization](#data-vizualization)
  - [Utility functions](#utility-functions)
- [How it works](#how-it-works)
- Get started
  - [Basic requirements](#basic-requirements)
  - [How to set up](#how-to-set-up)
  - [Do you want to see a live demo?](#do-you-want-to-see-a-live-demo)
 


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

### Server-side tracking
Highly customizable Client-Side Tracker Tag that claims requests from Client-Side Tracker Tag. Main features:
- Creates users and sessions id and stores HttpOnly, Secure and SameSite = Strict cookies
- Writes user and session data into Google Firestore in real time
- Enriches and writes event data into Google BigQuery in real time. No sampling or pre processing, only raw data
- Event logging in debug view

### Measurement protocol
Enhance data tracked from the website with custom requests made from a server or other sources

### Batch data import
  Load data effortlessly from a structured CSV into BigQuery main table

### Data vizualization
No pre-built interface, use any BI tool that connects with BigQuery such as Google Looker, Google Looker Studio, Microsoft Power BI, Tableau, Apache Superset, Grafana, Redash, Retool, Mode Analytics, etc... to create reports that truly fit the needs.

### Utility functions
Lorem ipsum



## How it works
Here is a basic schema of how Nameless Analytics works:

<img width="1383" alt="Screenshot 2025-04-21 alle 10 52 59" src="https://github.com/user-attachments/assets/46624132-83c6-4efd-86d3-c3a24d691604" />

Please note that Nameless Analytics is free, but Google Cloud resources may be paid.



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
