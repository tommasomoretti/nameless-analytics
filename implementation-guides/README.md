# Nameless Analytics | GTM Technical Specification & Implementation

This repository is the central hub for implementing Nameless Analytics via Google Tag Manager (Web and Server-side). It contains the official container templates, technical specifications, and practical configuration examples.

---

## 🚀 Getting Started with Templates

To jumpstart your implementation, download and import these official container templates:

### 1. [GTM Web] Client-side Container
Contains the Configuration Variable, the Tracker Tag, and base triggers.
👉 **[Download Template (JSON)](gtm-client-side-container-template.json)**

### 2. [GTM Server] Server-side Container
Contains the SS Client Tag configured for Firestore and BigQuery streaming.
👉 **[Download Template (JSON)](gtm-server-side-container-template.json)**

---

## 📚 Documentation

Detailed documentation is divided into two main sections:

### 🏗️ [Technical Specification & Logic](IMPLEMENTATION.md)
*Deep dive into the architecture and expert features:*
- Data Flow & Logic
- Cookie Security (`HttpOnly`, `SameSite`)
- Bot Protection & Security
- Orphan Event Prevention
- Cross-domain Tracking Architecture

### 🛠️ [Implementation Examples](EXAMPLES.md)
*Practical "how-to" for setting up tags and triggers:*
- Standard & Virtual Page Views
- Event Tracking (Performance & Quality)
- Full E-commerce Implementation
- Custom Interaction Tracking

---

## 🔗 Project Ecosystem

Nameless Analytics is a modular system. This repo works in tandem with:
- **[Client-side Tracker Variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/)**: The configuration UI.
- **[Client-side Tracker Tag](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-tag/)**: The data packaging engine.
- **[Server-side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/)**: The ingestion and security gateway.
- **[Reporting Tables (BigQuery)](../reporting-tables/)**: Data transformation and SQL functions.

---

### Support & Community
Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)

License: [MIT](LICENSE)
