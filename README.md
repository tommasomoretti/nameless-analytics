![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

An open source web analytics platform for power users based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) and [Google BigQuery](https://cloud.google.com/bigquery). 

Collect, analyze and activate your website data with a free* real-time web analytics suite that respects users privacy.



## TL;DR
### 🕵🏻‍♂️ - Privacy focused
- **First-party data context**\
Cookies are released from GTM Server-side, in a first-party context and events data are saved in your own Google BigQuery dataset.

- **Privacy by design**\
Choose between three consent tracking modes:
  - Limited Tracking Mode when respect_consent_mode is enabled: track events only when analytics_storage is granted,
  - Full Tracking Mode when respect_consent_mode is disabled: track all events regardless analytics_storage value
  - Anonymous Tracking Mode respect_consent_mode is disabled: track all events with redacted user_id, client_id and session_id when analytics_storage is denied
By default, no PII data are tracked.


### ⚡️ - Performance features
- **Real-time**\
Data ingestion into Google BigQuery is nearly instantaneous and events are available within a couple of seconds.

- **Lightweight and fast**\
The main JavaScript library only weighs a few kB and it's served via CloudFlare CDN. All hits are sent via HTTP POST requests.


### ⚙ - Event tracking features
- **Client-side tracking with custom events**\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

- **Server-side tracking**\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

- **Customizable acquisition parameters (source, medium and campaigns url parameters)**\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

- **Ecommerce event tracking**\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

- **Cross-domain tracking (🚧 beta feature)**\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

- **Single Page App tracking**\
Track single page application page views easily, you can customize the tracker depending on your needs.


### 🚀 - Send events from (almost) everywhere and log them all
- **Measurement Protocol**\
Enhance data tracked from website with custom requests made from a server or other sources.  
- **Event logging**\
Simplified debugging with event details from the Javascript console and from server-side Google Tag Manager debug view.



## Basic requirements
- Google Consent Mode installed on a website
- A client-side Google Tag Manager container installed on a website
- A server-side Google Tag Manager container hosted on App Engine or Cloud Run (Stape.io to be tested)
- A Google BigQuery project

See [Get started section](https://github.com/tommasomoretti/nameless-analytics/blob/main/README.md#get-started) for details about how to setup server-side Google Tag Manager, the BigQuery main table and the whole environment.



## Get started
Read how to setup 
1. [Install Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent?hl=en&consentmode=advanced)
2. [Server-side Google Tag Manager](https://developers.google.com/tag-platform/tag-manager/server-side) with [Google App Engine](https://developers.google.com/tag-platform/tag-manager/server-side/app-engine-setup) or [Google Cloud Run](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
3. [Nameless Analytics Client-side Tracker Tag](https://github.com/tommasomoretti/nameless-analytics-client-tag)
4. [Nameless Analytics Server-side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-tag)
5. [Nameless Analytics main table and reporting queries examples](https://github.com/tommasomoretti/nameless-analytics-queries) in Google Big Query
6. [Google Looker Studio Dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)
7. [Measurement protocol and utility functions](https://github.com/tommasomoretti/nameless-analytics-measurement-protocol-and-utility-functions)


### Do you want to see a live demo? 
Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) and open the developer console.

---

\* Nameless Analytics is free, but you have to pay the Google Cloud resources that you'll use.

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
