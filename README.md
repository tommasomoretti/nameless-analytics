<img src="https://github.com/user-attachments/assets/93640f49-d8fb-45cf-925e-6b7075f83927#gh-light-mode-only" alt="Light Mode" />
<img src="https://github.com/user-attachments/assets/71380a65-3419-41f4-ba29-2b74c7e6a66b#gh-dark-mode-only" alt="Dark Mode" />

---

# Nameless Analytics

An open-source web analytics platform for power users, based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/), [Google Firestore](https://cloud.google.com/firestore) and [Google BigQuery](https://cloud.google.com/bigquery).

Collect, analyze, and activate your website data with a free real-time digital analytics suite that respects user privacy.

### Navigation
- [Quick Start](#quick-start)
- [Core Capabilities & Logic](#core-capabilities--logic)
- [Container Templates](#container-templates)
- [Reporting & Visualization](#reporting--visualization)
- [Support & AI](#support--ai)
- [External Resources](#external-resources)

</br>

## Core Capabilities & Logic

### Data Flow
The system consists of a highly customizable client-side tracker that captures interactions and sends event data to a server-side GTM container. User and session IDs are managed using secure cookies (`HttpOnly`, `Secure`, `SameSite=Strict`). Data is stored in **Firestore** (sessions) and **BigQuery** (events) in real-time.

<img src="https://github.com/user-attachments/assets/ea15a5f1-b456-4d85-a116-42e54c4073cd" alt="Nameless Analytics schema"/>

### 1. Client-Side Packaging
The [Client-side Tracker Tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/) and [Configuration Variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/) act as the system's brain in the browser.
- **Google Consent Mode**: Fully integrated. Tracks events only when `analytics_storage` is granted, or follows a "Basic" implementation.
- **Technical Logic**: Automated delay until consent, SPA support, and custom acquisition parameter handling.
- **Cross-domain Tracking**: Stitch users across domains without third-party cookies using a pre-flight ID request and URL decoration (`na_id`).

### 2. Server-Side Processing
The [Server-side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/) acts as the ingestion gateway.
- **Security & Privacy**: Automatically creates and manages `HttpOnly` cookies. No client-side access to IDs reduces XSS risks.
- **Bot Protection**: Automatically rejects requests (403) from known automation tools (Puppeteer, Selenium, headless browsers).
- **Integrity**: Prevents "orphan events" by ensuring a `page_view` is always the first event in a session.
- **Priority**: Strict parameter hierarchy (Server Overrides > Tag Metadata > Config Variable > dataLayer).

### 3. Identity & Cookies
- **User ID**: Supports random `client_id` (anonymous) and custom `user_id` (CRM-based) for cross-device stitching.
- **Cookie Logic**: `nameless_analytics_user` (400 days) and `nameless_analytics_session` (30 mins). All cookies are `Secure`, `HttpOnly`, and `SameSite=Strict`.

<details><summary>Technical Cookie Details</summary>

| Default cookie name        | Default exp. | Description                                                            |
|----------------------------|--------------|------------------------------------------------------------------------|
| nameless_analytics_user    | 400 days     | 15-character random string (persistent ID)                             |
| nameless_analytics_session | 30 minutes   | User ID + Session ID + Page ID                                         |

</details>

</br>

## Quick Start

### 1. Setup Infrastructure (GCP)
1. **BigQuery**: Create a dataset (e.g., `nameless_analytics`).
2. **Firestore**: Enable in **Native Mode**.
3. **IAM**: Grant your GTM SS Service Account `BigQuery Data Editor`, `BigQuery Job User`, and `Cloud Datastore User`.

### 2. Server-Side (GTM Server)
1. **Client Tag**: Install the [Server-side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/).
2. **Config**: Set Project ID, Dataset ID, and table name (`events_raw`).
3. **Import**: [Server-side GTM Template](gtm-containers/gtm-server-side-container-template.json).

### 3. Client-Side (GTM Web)
1. **Setup**: Create the [Configuration Variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/) and [Tracker Tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/).
2. **Trigger**: Set `page_view` to fire on *Initialization - All Pages*.
3. **Import**: [Client-side GTM Template](gtm-containers/gtm-client-side-container-template.json).

</br>

## Reporting & Visualization

### Reporting Tables
Deploy prebuilt [BigQuery table functions](reporting-tables/readme.md/) to transform raw events into analytical views for:
- [Users](reporting-tables/users.sql), [Sessions](reporting-tables/sessions.sql), [Pages](reporting-tables/pages.sql), and [Events](reporting-tables/events.sql).
- [Ecommerce Transactions](reporting-tables/ec_transactions.sql) and [Products](reporting-tables/ec_products.sql).
- [GTM Performance](reporting-tables/gtm_performances.sql) and [Consents](reporting-tables/consents.sql).

### Data Visualization
Connect any BI tool (Tableau, Power BI, Superset) to BigQuery or use our [Google Looker Studio dashboard example](https://lookerstudio.google.com/u/0/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/p_ebkun2sknd).

</br>

## Support & AI
Get expert help for implementation, technical documentation, and advanced SQL queries.
- **[OpenAI GPT](https://chatgpt.com/g/g-6860ef949f94819194c3bc2c08e2f395-nameless-analytics-q-a)**: Specialized GPT trained on the platform docs.
- **Gemini Gem**: *Coming soon*

</br>

## External Resources
- [Live Demo](https://namelessanalytics.com) (Open the dev console).
- [Contributing Guidelines](#contributing)
- [MIT License](LICENSE)

---
Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
