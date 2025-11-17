<img src="https://github.com/user-attachments/assets/93640f49-d8fb-45cf-925e-6b7075f83927#gh-light-mode-only" alt="Light Mode" />
<img src="https://github.com/user-attachments/assets/71380a65-3419-41f4-ba29-2b74c7e6a66b#gh-dark-mode-only" alt="Dark Mode" />

---

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/), [Google Firestore](https://cloud.google.com/firestore) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free real-time digital analytics suite that respects user privacy.

Table of contents:
- Main features
  - [Client-side tracking](#client-side-tracking)
  - [Server-side tracking](#server-side-tracking)
  - [First party data storage](#first-party-data-storage)
  - [Reporting queries](#reporting-queries)
  - [Data visualization](#data-visualization)
  - [AI Q&A](#ai_qna)
- [Technical Architecture and Data Flow](#technical-architecture-and-data-flow)
- Get started
  - [Basic requirements](#basic-requirements)
  - [How to set up](#how-to-set-up)
  - [Want to see a live demo?](#want-to-see-a-live-demo) 

</br>

# Main features
## Client-side tracking
Highly customizable Client-Side Tracker Tag that sends requests to Server-Side Client Tag and supports various field types (string, integer, double, and JSON). 

Main features:
- Fully integrated with Google Consent Mode: tracks events only when analytics_storage is granted or tracks all events regardless of analytics_storage value
- Single Page Application tracking
- JSON e-commerce data structure that supports custom objects or complies with GA4 standards
- Cross-domain tracking for stitching users and sessions across multiple websites
- Custom acquisition URL parameters, there's no need to use UTM parameters exclusively
- Libraries ca be loaded from CDN or from custom location
- Events are fully logged in JavaScript console

Read more about [Nameless Analytics Client-side tracker tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/) and [Nameless Analytics Client-side config variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/)


## Server-side tracking
Highly customizable Server-Side Client Tag that claims requests from Client-Side Tracker Tag or other servers.

Main features:
- Creates users and sessions id and stores HttpOnly, Secure and SameSite = Strict cookies
- User and session data are write into Google Firestore in real time
- Event data are enriched and written into Google BigQuery in real time
- Events are fully logged in Google Tag Manager Server-Side preview mode

Read more about [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/)


## First party data storage
Data are stored in Google Cloud Platform using Google Firestore database and Google BigQuery dataset. No preprocessing or sampling is applied, only raw data.

Read more about [Nameless Analytics tables](https://github.com/tommasomoretti/nameless-analytics-reporting-tables/#tables)

Prebuilt reporting Google BigQuery table functions for users, sessions, pages, transactions and products, shopping behaviour, consents and GTM performances.

Read more about [Nameless Analytics reporting table functions](https://github.com/tommasomoretti/nameless-analytics-reporting-tables/#table-functions) in Google BigQuery


## Data visualization
Use any BI tool that connects with BigQuery such as Google Looker, Google Looker Studio, Microsoft Power BI, Tableau, Apache Superset, Grafana, Redash, Retool, Mode Analytics, etc... to create reports that truly fit the needs.

Read more about [Nameless Analytics Google Looker Studio dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)


## AI Q&A
Get help from a custom OpenAI GPT that knows everything about Nameless Analytics.

Ask anything to [Nameless Analytics QnA](https://chatgpt.com/g/g-6860ef949f94819194c3bc2c08e2f395-nameless-analytics-qna)

</br>

# Technical architecture and data flow
The system mainly consists of a highly customizable client-side tracker that captures user interactions and sends event data to a server-side GTM container, where user and session IDs are managed using secure cookies (HttpOnly, Secure, SameSite=Strict). The data is enriched and stored in Firestore (for user and session data) and in BigQuery (for detailed events), without sampling or preprocessing.

<img src="https://github.com/user-attachments/assets/ea15a5f1-b456-4d85-a116-42e54c4073cd" alt="Nameless Analytics schema"/>

</br>

The data flow in Nameless Analytics starts from the GTM Client-Side Tracker Tag, which can be configured to track all hits or only those where consent has been granted. It can send standard events like page_view as well as custom events, supporting Single Page Applications, ecommerce data in JSON format and cross-domain tracking.

Events are sent to the GTM Server-Side Client Tag, which handles user and session identification, enriches the data and saves it in real-time to both Firestore and BigQuery.

Data is stored across two Google Cloud systems: Firestore holds user and session data with real-time updates, while BigQuery stores detailed event data and ecommerce information. Tables are organized and indexed to enable fast and complex analyses.

Nameless Analytics provides predefined SQL functions to simplify queries on users, sessions, pages, ecommerce transactions, consents, and GTM performance, facilitating integration with BI tools such as Google Looker Studio or Power BI for customized visualizations and reports.

Additionally, the Nameless Analytics Server-Side Client Tag supports requests from other server-side sources.

The platform also offers JavaScript utilities to retrieve cookies, browser details, consent status, and to format timestamps.

</br>

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
4. [Nameless Analytics Client-side tracker tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/) and [Nameless Analytics Client-side tracker configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/)
5. [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/)
6. [Nameless Analytics Tables and Reporting queries examples](https://github.com/tommasomoretti/nameless-analytics-reporting-tables) in Google BigQuery
7. [Nameless Analytics ML queries examples](https://github.com/tommasomoretti/nameless-analytics-ml-queries) in Google BigQuery
8. [Nameless Analytics AI Q&A](https://chatgpt.com/g/g-6860ef949f94819194c3bc2c08e2f395-nameless-analytics-q-a)
9. [Nameless Analytics Google Looker Studio dashboard example](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_ebkun2sknd)


## Want to see a live demo?

Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com) and open the developer console.


#

**Reach me at:** [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
