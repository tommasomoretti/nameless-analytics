![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

An open source analytics platform for power users based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) (both client-side and server-side) and [Google BigQuery](https://cloud.google.com/bigquery). 

Collect, analyze and activate your website data with a flexible analytics suite that lets you respect user privacy, for free.



## Main features
- **1° party data storage**\
Event data is saved in a own Google Cloud project. Cookies are released in a first-party context, in a secure and inaccessible mode to third parties.

- **Privacy-focused**\
By default, no PII data is tracked, but you can add it, if your users consent. You can choose if track every event or automatically respects user consent.

- **Real-time**\
Data insertion into Google BigQuery is nearly instantaneous and events are available within a couple of seconds.

- **Light-weight**\ 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

- **Client-side tracking**\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

- **Server-side tracking**\ 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

## Basic requirements
- Google client-side Tag Manager installed on a website
- Google server-side Tag Manager hosting on app engine or cloud run (Stape.io da testare)
- Google BigQuery dataset with write permissions

See [Get started section](https://github.com/tommasomoretti/nameless-analytics/blob/main/README.md#get-started) for details about how to setup server-side Google Tag Manager, the BigQuery main table and the whole environment.


## How it works

![nameless_analytics_schema](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/6a065dfe-1511-4d2c-ad27-ec6d0be8b248)

Do you want to see a live demo? Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) and open the developer console.

<img width="1263" alt="Nameless Analytics client-side logs" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/bca94adf-cdf5-4bf3-bb41-e69461ba9b38">

In server-side Google Tag Manager you will see something like this:

<img width="1512" alt="Nameless Analytics server-side logs" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/776e0527-0b20-46d0-90d1-cac8064e6b10">


## Get started
Read how to setup 
1. [Google App Engine for server-side Tag Manager](https://developers.google.com/tag-platform/tag-manager/server-side/app-engine-setup)
2. [Google Cloud Run for server-dise Tag Manager](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
3. [GTM client side tag](https://github.com/tommasomoretti/nameless-analytics-client-tag)
4. [GTM server side tag](https://github.com/tommasomoretti/nameless-analytics-server-tag)
5. [Google Big Query main table]()

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
