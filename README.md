<img src="https://github.com/user-attachments/assets/93640f49-d8fb-45cf-925e-6b7075f83927#gh-light-mode-only" alt="Light Mode" />
<img src="https://github.com/user-attachments/assets/71380a65-3419-41f4-ba29-2b74c7e6a66b#gh-dark-mode-only" alt="Dark Mode" />

---

# Nameless Analytics

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/), [Google Firestore](https://cloud.google.com/firestore) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free real-time digital analytics suite that respects user privacy.

Main features:
* [Client-side tracking](#client-side-tracking)
* [Server-side tracking](#server-side-tracking)
* [First party data storage](#first-party-data-storage)
* [Reporting tables](#reporting-tables)
* [Data visualization](#data-visualization)
* [AI QnA](#ai-qna)

Technical Architecture
* [Data Flow](#technical-architecture-and-data-flow)
  * [JavaScript libraries](#javascript-libraries)
  * [Cookies](#cookies)

Get started: 
* [Basic requirements](#basic-requirements)
* [How to set up](#how-to-set-up)
* [Want to see a live demo?](#want-to-see-a-live-demo) 
* [Contributing](#contributing)
* [License](#license) 

</br>



## Main features
### Client-side tracking

Highly customizable Client-side Tracker Tag that sends requests to Nameless Analytics Server-side Client Tag and supports various field types (string, integer, double, and JSON). 

Main features:
- Fully integrated with Google Consent Mode: tracks events only when analytics_storage is granted, or tracks all events regardless of the analytics_storage value.
- Single Page Application tracking.
- JSON ecommerce data structure that supports custom objects or complies with GA4 standards.
- Cross-domain tracking for stitching users and sessions across multiple websites.
- Custom acquisition URL parameters; there's no need to use UTM parameters exclusively.
- Libraries can be loaded from a CDN or a custom location.
- Events are fully logged in the JavaScript console.

Read more about [Nameless Analytics Client-side Tracker Tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/) and [Nameless Analytics Client-side Tracker Configuration Variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/)


### Server-side tracking

Highly customizable Server-side Client Tag that claims requests from Nameless Analytics Client-side Tracker Tag or other servers.

Main features:
- Creates user and session IDs and stores HttpOnly, Secure, and SameSite=Strict cookies.
- User and session data are written into Google Firestore in real time.
- Event data are enriched and written into Google BigQuery in real time.
- Events are fully logged in Google Tag Manager Server-Side preview mode.

Read more about [Nameless Analytics Server-side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/)


### First party data storage

Data are stored in Google Cloud Platform using Google Firestore database and Google BigQuery dataset. No preprocessing or sampling is applied, raw data only.

Read more about [Nameless Analytics default tables](https://github.com/tommasomoretti/nameless-analytics-reporting-tables/#tables)


### Reporting tables

Prebuilt Google BigQuery reporting table functions for users, sessions, pages, events, transactions/products, shopping behavior, user consents, and GTM performance.

Read more about [Nameless Analytics reporting table functions](https://github.com/tommasomoretti/nameless-analytics-reporting-tables/#table-functions) in Google BigQuery


### Data visualization

Use any BI tool that connects with BigQuery such as Google Looker, Google Looker Studio, Microsoft Power BI, Tableau, Apache Superset, Grafana, Redash, Retool, Mode Analytics, etc... to create reports that truly fit the needs.

Read more about [Nameless Analytics Google Looker Studio dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)


### AI QnA

Get help from a custom OpenAI GPT that knows everything about Nameless Analytics.

Ask anything to [Nameless Analytics Q&A](https://chatgpt.com/g/g-6860ef949f94819194c3bc2c08e2f395-nameless-analytics-q-a)

</br>



## Technical architecture and data flow

The system mainly consists of a highly customizable client-side tracker that captures user interactions and sends event data to a server-side GTM container, where user and session IDs are managed using secure cookies (HttpOnly, Secure, SameSite=Strict). The data is enriched and stored in Firestore (for user and session data) and in BigQuery (for detailed events), without sampling or preprocessing.

<img src="https://github.com/user-attachments/assets/ea15a5f1-b456-4d85-a116-42e54c4073cd" alt="Nameless Analytics schema"/>

</br>

The data flow in Nameless Analytics starts from the Nameless Analytics Client-side Tracker Tag, which can be configured to track all hits or only those where consent has been granted. It can send standard events like page_view as well as custom events, supporting Single Page Applications, ecommerce data in JSON format and cross-domain tracking.

Events are sent to the Nameless Analytics Server-side Client Tag, which handles user and session identification, enriches the data and saves it in real-time to both Firestore and BigQuery.

Data is stored across two Google Cloud systems: Firestore holds user and session data with real-time updates, while BigQuery stores detailed event data and ecommerce information. Tables are organized and indexed to enable fast and complex analyses.

Nameless Analytics provides predefined SQL functions to simplify queries on users, sessions, pages, ecommerce transactions, consents, and GTM performance, facilitating integration with BI tools such as Google Looker Studio or Power BI for customized visualizations and reports.


### JavaScript libraries 

Nameless Analytics uses two libraries:
* [Nameless Analytics](https://cdn.jsdelivr.net/gh/tommasomoretti/nameless-analytics-client-side-tracker-tag@main/nameless-analytics.min.js): used to send queued requests, calculate channel grouping based on source and campaign name, set up cross-domain tracking, read consent from Google Consent Mode, and read cookie values
* [UA parser](https://cdn.jsdelivr.net/npm/ua-parser-js/src/ua-parser.min.js): used as a dependency to parse user agent information


### Cookies

Nameless Analytics uses cookies to manage users and sessions. They are set or updated with every request response and configured with specific security attributes that ensure their proper functioning and privacy protection:

* HttpOnly: This attribute prevents cookies from being accessed via JavaScript in the browser. This reduces the risk of malicious scripts reading or modifying cookies, protecting sensitive data such as user and session identifiers.
* Secure: The cookie is sent only over secure HTTPS connections. This prevents interception of cookies on unsecured networks or man-in-the-middle attacks, enhancing the security of data transmission.
* SameSite=Strict: This attribute restricts the cookie to be sent only with requests originating from the same domain. Essentially, it prevents the cookie from being sent in cross-site contexts, blocking tracking attempts or attacks based on third-party requests (CSRF).

Together, these three attributes ensure that cookies are used securely, respecting user privacy and limiting misuse or unauthorized use of identifiers. 


<details><summary>How cookies are set</summary>

</br>

When the server-side Google Tag Manager Client Tag receives a request, it checks for existing cookies.
- If user and session cookies are missing from the request, the Nameless Analytics Server-side Client Tag creates a user cookie and a session cookie.
- If the user cookie is present but the session cookie is not, the Nameless Analytics Server-side Client Tag extends the user cookie expiration and creates a new session cookie.
- If the client and session cookies already exist, the Nameless Analytics Server-side Client Tag extends the expiration for both cookies.

  
#### Standard cookie values

| Default cookie name        | Example value                                   | Default exp. | Description                                                        |
|----------------------------|-------------------------------------------------|--------------|--------------------------------------------------------------------|
| nameless_analytics_user    | Lxt3Tvvy28gGcbp                                 | 400 days     | 15-character random string                                         |
| nameless_analytics_session | Lxt3Tvvy28gGcbp_vpdXoWImLJZCoba-Np15ZLKO7SAk1WF | 30 minutes   | nameless_analytics_user + 15-character random string + current page_id |

Cookie names and session default expiration can be customized in Nameless Analytics Server-side Client Tag [advanced settings section](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/#advanced-settings).

Please note: 
  - the user cookie contains the client_id.
  - the session cookie contains the client_id, the session_id and the page_id of the last event. The actual session_id is the cookie value without the page_id.
</details>


### User ID

The user ID is a unique identifier for a user, set at session level. It can be a random alphanumeric string or a number.

</br>



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
4. [Nameless Analytics Client-side Tracker Tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/) and [Nameless Analytics Client-side Tracker Configuration Variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/)
5. [Nameless Analytics Server-side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/)
6. [Nameless Analytics Tables and Reporting queries examples](https://github.com/tommasomoretti/nameless-analytics-reporting-tables) in Google BigQuery
7. [Nameless Analytics AI Q&A](https://chatgpt.com/g/g-6860ef949f94819194c3bc2c08e2f395-nameless-analytics-q-a)
8. [Nameless Analytics Google Looker Studio dashboard example](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_ebkun2sknd)


### Want to see a live demo?

Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com) and open the developer console.


### Contributing

Contributions are welcome! Whether it's reporting a bug, suggesting a feature, or submitting a pull request, your help is appreciated. Please feel free to open an issue or reach out directly.


### License

This project is licensed under the MIT License. See the LICENSE file for details (coming soon).

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
