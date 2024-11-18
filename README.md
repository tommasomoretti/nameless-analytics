![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free* real-time web analytics suite that respects user privacy.

Here is a basic schema of how Nameless Analytics works:

![Nameless Analytics schema](https://github.com/user-attachments/assets/1489c365-ce6e-4109-97e2-91b0debdc91e)

## TL;DR

### 🕵🏻‍♂️ Privacy-Focused

- **First-Party Data Context**\
  Cookies are released from GTM Server-side in a first-party context, and event data are saved in your own Google BigQuery dataset.

- **Privacy by Design**\
  Choose between three consent tracking modes:
  - **Limited Tracking Mode** (when `respect_consent_mode` is enabled): Track events when `analytics_storage` is granted.
  - **Full Tracking Mode** (when `respect_consent_mode` is disabled): Track all events regardless of `analytics_storage` value.
  - **Anonymous Tracking Mode** (when `respect_consent_mode` is disabled): Track all events with redacted `user_id`, `client_id`, and `session_id` when `analytics_storage` is denied.

  By default, no PII data are tracked.

### ⚡️ Performance Features

- **Real-Time**\
  Data ingestion into Google BigQuery is nearly instantaneous, and events are available within a couple of seconds.

- **Lightweight and Fast**\
  The main JavaScript library only weighs a few kB and is served via CloudFlare CDN. All hits are sent via HTTP POST requests.

### ⚙ Event Tracking Features

- **Client-Side Tracking**\
  Highly customizable Client-Side Tracker Tag that supports various field types (string, integer, double, and JSON) and accepts custom acquisition URL parameters (it's not mandatory to use UTM parameters).

- **Server-Side Tracking**\
  All data are written directly to Google BigQuery by the Server-Side Client Tag, which processes requests from the Client-Side Tracker Tag, enriches the content, and stores browser cookies.

- **E-commerce Event Tracking**\
  Flexible e-commerce data structure that supports custom formats or GA4 e-commerce data structure.

- **Cross-Domain Tracking** (🚧 beta feature)\
  Track users and sessions across multiple websites.

- **Single Page App Tracking**\
  Easily track single-page application page views by customizing the tracker settings.

### 🚀 Send Events from (almost) everywhere and log 'em all

- **Measurement Protocol**\
  Enhance data tracked from the website with custom requests made from a server or other sources.

- **Event Logging**\
  Simplified debugging with event details from the JavaScript console and from Server-Side Google Tag Manager debug view.

## Get Started

**Basic Requirements:**

- Google Consent Mode installed on a website
- A Client-Side Google Tag Manager container installed on a website
- A Server-Side Google Tag Manager container hosted on App Engine or Cloud Run (Stape.io to be tested)
- A Google BigQuery project

**How to Set Up:**

1. [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent?hl=en&consentmode=advanced)
2. [Client-Side Google Tag Manager](https://support.google.com/tagmanager/answer/14842164)
3. [Server-Side Google Tag Manager](https://developers.google.com/tag-platform/tag-manager/server-side) with [Google App Engine](https://developers.google.com/tag-platform/tag-manager/server-side/app-engine-setup) or [Google Cloud Run](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
4. [Nameless Analytics Client-Side Tracker Tag](https://github.com/tommasomoretti/nameless-analytics-client-tag)
5. [Nameless Analytics Server-Side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-tag)
6. [Nameless Analytics main table and reporting queries examples](https://github.com/tommasomoretti/nameless-analytics-queries) in Google BigQuery
7. [Google Looker Studio Dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)
8. [Measurement Protocol and Utility Functions](https://github.com/tommasomoretti/nameless-analytics-measurement-protocol-and-utility-functions)

### Do You Want to See a Live Demo?

Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) and open the developer console.

---

\* Nameless Analytics is free, but you have to pay for the Google Cloud resources that you'll use.

---

**Reach me at:** [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
