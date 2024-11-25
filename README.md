![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free[^1] real-time digital analytics suite that respects user privacy.

Start from here:
- [Main features](#main-features)
  - [Privacy](#%EF%B8%8F-privacy)
  - [Performances](#%EF%B8%8F-performances)
  - [Event tracking](#-event-tracking)
  - [Send events from (almost) everywhere and log 'em all](#-send-events-from-almost-everywhere-and-log-em-all)
- [Get Started](#get-started)
  - [Basic requirements](#basic-requirements)
  - [How to set up](#how-to-set-up)
  - [Do you want to see a live demo?](#do-you-want-to-see-a-live-demo)
 


## Main features
Here is a basic schema of how Nameless Analytics works:

![Nameless Analytics schema](https://github.com/user-attachments/assets/1489c365-ce6e-4109-97e2-91b0debdc91e)


### 🕵🏻‍♂️ Privacy

- **First-party data context**\
  Cookies are released from GTM Server-side in a first-party context, and event data are saved in your own Google BigQuery dataset.

- **Privacy by design**\
  Choose between three consent tracking modes:
  - **Limited Tracking Mode** (when `respect_consent_mode` is enabled): Track events only when `analytics_storage` is granted.
  - **Full Tracking Mode** (when `respect_consent_mode` is disabled): Track all events regardless of `analytics_storage` value.
  - **Anonymous Tracking Mode** (when `respect_consent_mode` is disabled): Track all events with redacted `user_id`, `client_id`, and `session_id` when `analytics_storage` is denied.

  By default, no PII data are tracked.


### ⚡️ Performances

- **Real-time**\
  Data ingestion into Google BigQuery is nearly instantaneous, and events are available within a couple of seconds.

- **Lightweight and fast**\
  The main JavaScript library only weighs a few kB and is served via CloudFlare CDN. All hits are sent via HTTP POST requests.


### ⚙ Event tracking

- **Client-side tracking**\
  Highly customizable Client-Side Tracker Tag that supports various field types (string, integer, double, and JSON) and accepts custom acquisition URL parameters (it's not mandatory to use UTM parameters).

- **Server-side tracking**\
  All data are written directly to Google BigQuery by the Server-Side Client Tag, which processes requests from the Client-Side Tracker Tag, enriches the content, and stores browser cookies.

- **E-commerce event tracking**\
  Flexible e-commerce data structure that supports ga4 or custom objects.

- **Cross-domain tracking** (🚧 beta feature)\
  Track users and sessions across multiple websites.

- **Single Page App tracking**\
  Easily track single-page application page views by customizing the tracker settings.


### 🚀 Send events from (almost) everywhere and log 'em all

- **Measurement protocol**\
  Enhance data tracked from the website with custom requests made from a server or other sources.

- **Event logging**\
  Simplified debugging with event details from the JavaScript console and from Server-Side Google Tag Manager debug view.



## Get Started
### Basic requirements
- Google Consent Mode installed on a website
- A Client-Side Google Tag Manager container installed on a website
- A Server-Side Google Tag Manager container hosted on App Engine or Cloud Run
- A Google BigQuery project


### How to set up
1. [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent?hl=en&consentmode=advanced)
2. [Client-Side Google Tag Manager](https://support.google.com/tagmanager/answer/14842164)
3. [Server-Side Google Tag Manager](https://developers.google.com/tag-platform/tag-manager/server-side) with [Google App Engine](https://developers.google.com/tag-platform/tag-manager/server-side/app-engine-setup) or [Google Cloud Run](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
4. [Nameless Analytics Client-side tracker tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag) and [Nameless Analytics Client-side config variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable)
5. [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag)
6. [Nameless Analytics main table and reporting queries examples](https://github.com/tommasomoretti/nameless-analytics-queries) in Google BigQuery
7. [Google Looker Studio Dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)
8. [Measurement Protocol and Utility functions](https://github.com/tommasomoretti/nameless-analytics-measurement-protocol-and-utility-functions)


### Do you want to see a live demo?

Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) and open the developer console.

---


**Reach me at:** [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)

[^1]: Nameless Analytics is free, but you have to pay for the Google Cloud resources that you'll use.
