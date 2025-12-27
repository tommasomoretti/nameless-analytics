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
* [Support & Resources](#support--resources)

Technical Architecture:
* [Data Flow](#data-flow)
* [JavaScript libraries](#javascript-libraries)
* [Cookies](#cookies)
* [User ID](#user-id)
* [Bot Detection and User-Agent filtering](#bot-detection-and-user-agent-filtering)

Get started: 
* [Quick Start (Master Guide)](#quick-start-master-guide)
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

Read more about [Nameless Analytics default tables](reporting-tables/#tables)


### Reporting tables

Prebuilt Google BigQuery reporting table functions for users, sessions, pages, events, transactions/products, shopping behavior, user consents, and GTM performance.

Read more about [Nameless Analytics reporting table functions](reporting-tables/#table-functions) in Google BigQuery


### Data visualization

Use any BI tool that connects with BigQuery such as Google Looker, Google Looker Studio, Microsoft Power BI, Tableau, Apache Superset, Grafana, Redash, Retool, Mode Analytics, etc... to create reports that truly fit the needs.

Read more about [Nameless Analytics Google Looker Studio dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_ebkun2sknd)


### Support & Resources

Get expert help for implementation, technical documentation, and advanced SQL queries.

- **[Implementation Guides](implementation-guides/)**: Official container templates, architecture logic, and practical recipes.
- **[OpenAI GPT](https://chatgpt.com/g/g-6860ef949f94819194c3bc2c08e2f395-nameless-analytics-q-a)**: A specialized GPT trained on Nameless Analytics documentation.
- **[Gemini Gem]()**: *Coming soon*

</br>



## Technical architecture 
### Data flow

The system mainly consists of a highly customizable client-side tracker that captures user interactions and sends event data to a server-side GTM container, where user and session IDs are managed using secure cookies (HttpOnly, Secure, SameSite=Strict). The data is enriched and stored in Firestore (for user and session data) and in BigQuery (for detailed events), without sampling or preprocessing.

<img src="https://github.com/user-attachments/assets/ea15a5f1-b456-4d85-a116-42e54c4073cd" alt="Nameless Analytics schema"/>

</br>

The data flow in Nameless Analytics starts from the Nameless Analytics Client-side Tracker Tag, which can be configured to track all events or only those where consent has been granted. It can send standard events like page views (or virtual page views) as well as custom events, supporting Single Page Applications, ecommerce data in pure JSON format and cross-domain tracking.

Events are sent to the Nameless Analytics Server-side Client Tag, which handles user and session identification, enriches the data and saves it in real-time to both Firestore and BigQuery.

Data is stored across two Google Cloud systems: Firestore holds user and session data with real-time updates, while BigQuery stores detailed event data and ecommerce information. Tables are organized and indexed to enable fast and complex analyses.

Nameless Analytics provides predefined SQL functions to simplify queries on users, sessions, pages, ecommerce transactions, consents, and GTM performance, facilitating integration with BI tools such as Google Looker Studio or Power BI for customized visualizations and reports.


### JavaScript libraries 

Nameless Analytics uses two libraries:
* [Nameless Analytics](https://cdn.jsdelivr.net/gh/tommasomoretti/nameless-analytics-client-side-tracker-tag@main/nameless-analytics.js): used to send queued requests, calculate channel grouping based on source and campaign name, set up cross-domain tracking, read consent from Google Consent Mode, and read cookie values
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

| Default cookie name        | Example value                                   | Default exp. | Description                                                            |
|----------------------------|-------------------------------------------------|--------------|------------------------------------------------------------------------|
| nameless_analytics_user    | Lxt3Tvvy28gGcbp                                 | 400 days     | 15-character random string                                             |
| nameless_analytics_session | Lxt3Tvvy28gGcbp_vpdXoWImLJZCoba-Np15ZLKO7SAk1WF | 30 minutes   | nameless_analytics_user + 15-character random string + current page_id |

Cookie names and session default expiration can be customized in Nameless Analytics Server-side Client Tag [advanced settings section](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/#advanced-settings).

Please note: 
  - the user cookie contains the client_id.
  - the session cookie contains the client_id, the session_id and the page_id of the last event. The actual session_id is the cookie value without the page_id.
</details>
 
 
### User ID
 
Nameless Analytics supports both anonymous tracking (via `client_id` stored in `HttpOnly` cookies) and identified tracking (via `user_id`). 
- **Anonymous**: Every unique browser gets a random 15-character ID.
- **Identified**: You can pass a custom internal ID (e.g. from your CRM) to the `user_id` field. This ID is then persisted across sessions and devices in Firestore, allowing for cross-device user stitching in BigQuery.


### Bot Detection and User-Agent filtering
The Nameless Analytics Server-side Client Tag automatically protects data quality by rejecting requests from bots, scrapers, or automation tools. Requests are denied with a **403 Forbidden** error if:
* The `User-Agent` header is empty.
* The `User-Agent` contains known crawling or automation strings, such as: `curl`, `wget`, `python-requests`, `bot`, `crawler`, `headless`, `selenium`, `puppeteer`, `playwright`.


</br>



## Quick Start (Master Guide)

Follow this step-by-step guide to deploy Nameless Analytics in the correct order.

### 1. Basic Requirements
Before starting, ensure you have:
- A **Google Cloud Project** with billing enabled.
- A **first-party domain** (or subdomain) for your Server-Side GTM.
- **Google Consent Mode** implementation ready on your website.

### 2. Setup Infrastructure (GCP)
1. **BigQuery**: Create a new dataset (e.g., `nameless_analytics`) in your project.
2. **Firestore**: Enable Firestore in **Native Mode**. This is used for real-time session management.
3. **IAM Permissions**: The Service Account running your GTM Server-Side must have the following roles:
   - `BigQuery Data Editor` (to write events)
   - `BigQuery Job User` (to run queries)
   - `Cloud Datastore User` (to access Firestore)

### 3. Server-Side Configuration (GTM Server-side)
1. **Container Setup**: Ensure your GTM Server-Side container is mapped to your [custom domain](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide#custom-domain).
2. **Client Tag**: Install the [Nameless Analytics Server-side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/).
3. **Settings**: Enter your GCP Project ID, BigQuery Dataset ID, and the raw events table name (`events_raw` by default).
4. **Container Import**: You can download a pre-configured [Server-side GTM container template here](gtm-implementation/).

### 4. Client-Side Configuration (GTM Client-side)
1. **Configuration Variable**: Create a [Nameless Analytics Configuration Variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/) and enter your GTM Server-side endpoint.
2. **Tracker Tag**: Install the [Nameless Analytics Client-side Tracker Tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/).
3. **Triggering**: Set up a `page_view` tag to fire on all pages. 
   - *Crucial*: A `page_view` must always be the first event sent to initialize the `page_id`.
4. **Container Import**: You can download a pre-configured [Client-side GTM container template here](gtm-implementation/).

### 5. Reporting & Activation
1. **Tables & Functions**: Deploy the [BigQuery Table Functions](reporting-tables/) to transform raw data into analytical views (Users, Sessions, e-commerce, etc.).
2. **Visualization**: Use the [Looker Studio dashboard example](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_ebkun2sknd) or connect any BI tool to BigQuery.
3. **AI Support**: Use the [Nameless Analytics AI](https://chatgpt.com/g/g-6860ef949f94819194c3bc2c08e2f395-nameless-analytics-q-a) for help with documentation, implementation, or advanced SQL queries.


### Want to see a live demo?

Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com) and open the developer console.


### Contributing

Contributions are welcome! Whether it's reporting a bug, suggesting a feature, or submitting a pull request, your help is appreciated. Please feel free to open an issue or reach out directly.


### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
