# GTM Implementation Guide & Technical Specification

This document details the architectural logic and expert features of Nameless Analytics within Google Tag Manager.

## Architecture Overview
Nameless Analytics follows a "Privacy-First, Data-Owned" flow:
1. **GTM Web**: Captures user interactions.
2. **NA Variable**: Validates settings and handles Consent/Cross-domain logic.
3. **NA Tracker Tag**: Packages data into a structured JSON payload.
4. **GTM Server**: Claims the request, validates the source, persists session state in **Firestore**, and streams data to **BigQuery**.
5. **BigQuery**: Raw data is processed via **SQL Table Functions** for reporting.

## The Configuration Variable Logic
The `{{Nameless Analytics - Tracker configuration variable}}` is the central brain of the client-side implementation.
- **Endpoint**: All requests are routed to your GTM Server-side URL (must be HTTPS and single-origin for cookie security).
- **Consent Mode**: If enabled, the tracker integrates with Google Consent Mode. It waits for `analytics_storage='granted'` before firing. If consent is denied, no hits are sent unless you choose the "Basic" implementation (advanced setting).
- **Cookie Security**: Cookies (`na_u`, `na_s`) are managed by the server with `HttpOnly`, `Secure`, and `SameSite=Lax` (or `Strict`) attributes. This prevents XSS access to user identifiers.

## Expert Features & Security

### 🛡️ Bot Protection (Server-side)
The Server-side Client Tag automatically rejects requests (returns `403`) from known automation tools and headless browsers using User-Agent inspection.
- **Blocked signatures**: `curl`, `puppeteer`, `selenium`, `playwright`, `headless`, `crawler`, etc.

### 🧩 Orphan Event Prevention
To maintain data integrity (specifically for Session & Page IDs), a request is rejected if it lacks an active session state. 
- **Rule**: A `page_view` *must* be the first hit of any page session.
- **Handling**: If GTM fires an event (e.g., a click) before the `page_view` tag has finished initializing the state, the server returns a 403 error with the message: `🔴 Website orphan event. Trigger a page_view event first...`.

### 🔄 Data Transformation & Priority
Nameless Analytics follows a strict parameter priority to ensure server-side configurations always override client-side ones:
1. **Server-side Overrides** (Highest priority - configured in the SS Client Tag).
2. **Tracker Tag Metadata** (Specific parameters set in the GTM Tag).
3. **Shared Config Variable** (Shared settings across multiple tags).
4. **dataLayer Payload** (Automatic extraction).

## Cross-domain Tracking Logic
The system allows stitching users across different top-level domains without third-party cookies:
1. **Request**: When a user clicks a link to an authorized domain, the tracker makes a pre-flight `get_user_data` request to the server.
2. **Response**: The server returns the encrypted user/session IDs.
3. **Decoration**: The tracker appends the `na_id` parameter to the destination URL.
4. **Capture**: On the destination site, the tracker reads the URL parameter and hydrates the session state.

---
[← Back to README](README.md) | [View practical examples →](EXAMPLES.md)
