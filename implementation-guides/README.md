<img src="https://github.com/user-attachments/assets/93640f49-d8fb-45cf-925e-6b7075f83927#gh-light-mode-only" alt="Light Mode" />
<img src="https://github.com/user-attachments/assets/71380a65-3419-41f4-ba29-2b74c7e6a66b#gh-dark-mode-only" alt="Dark Mode" />

---

# Implementation & Technical Specification

Official GTM container templates and detailed technical documentation for Nameless Analytics.

---

## 🚀 Container Templates
To jumpstart your implementation, download and import these pre-configured templates:
- **[Client-side GTM Container](gtm-client-side-container-template.json)**: Includes the Configuration Variable, Tracker Tag, and base triggers.
- **[Server-side GTM Container](gtm-server-side-container-template.json)**: Pre-configured for Firestore persistence and BigQuery streaming.

---

## 🏗️ Technical Architecture & Logic

### The Configuration Variable
The `{{Nameless Analytics - Tracker configuration variable}}` is the central brain of the client-side implementation:
- **Endpoint**: All requests are routed to your GTM Server-side URL (must be HTTPS and single-origin for cookie security).
- **Consent Mode**: Automated delay until `analytics_storage='granted'` before firing.
- **Cookie Security**: Identifiers (`na_u`, `na_s`) are managed by the server with `HttpOnly`, `Secure`, and `SameSite` attributes to prevent XSS.

### Expert Features
- **🛡️ Bot Protection**: The Server-side Tag automatically rejects requests (403) from known automation tools (Puppeteer, Selenium, etc.) via User-Agent inspection.
- **🧩 Orphan Event Prevention**: To maintain data integrity, a `page_view` *must* be the first hit of any session. The server rejects events triggered before state initialization.
- **🔄 Data Transformation**: Strict priority (Server Overrides > Tag Metadata > Config Variable > dataLayer).

### Cross-domain Tracking
Stitching users across top-level domains without third-party cookies:
1. Tracker makes a pre-flight `get_user_data` request to the server.
2. Server returns IDs; tracker appends the `na_id` parameter to the destination URL.
3. Destination site captures the parameter and hydrates the session state.

---

## 🛠️ Implementation Recipes

### Standard & Virtual Page Views
- **Event Name**: `page_view` (Standard)
- **Trigger**: `Initialization - All Pages`. 
- **For SPAs**: Use `History Change` or a `virtual_pageview` custom event.

### E-commerce
Fully compatible with the standard GA4 DataLayer schema.
- **Event Name**: `{{Event}}`
- **Setting**: Enable **"Add ecommerce data from dataLayer"**.
- **Trigger**: Custom Event (Regex) matching all standard GA4 ecommerce events (`purchase`, `add_to_cart`, etc.).

### Advanced Tracking
- **JS Errors**: Use the built-in `JavaScript Error` trigger with custom event name `javascript_errors`.
- **Core Web Vitals**: Map performance metrics (LCP, FID, CLS) to custom event parameters.

---
[← Back to Overview](../)
