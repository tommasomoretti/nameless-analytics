# GTM Implementation: Practical Examples

This document provides a set of "recipes" for common tracking scenarios using Nameless Analytics.

## 1. Standard & Virtual Page Views
The `page_view` event is mandatory. It initializes the `page_id` which is then used to group all subsequent events on the same page.

### Standard Tag Setup
| Field | Value |
| :--- | :--- |
| **Name** | `NA - Page view` |
| **Event Type** | `Standard` |
| **Event Name** | `page_view` |
| **Trigger** | `Initialization - All Pages` |

### Virtual Page Views (SPA)
For SPAs (React, Vue, Next.js), use the same tag configuration but change the trigger:
- **Trigger**: `History Change` or a Custom Event like `virtual_pageview`.

---

## 2. Event Tracking
Any custom parameter added to a tag is automatically sent in the `event_data` JSON object in BigQuery.

### Performance: Page Load Time
Capture Core Web Vitals to monitor UX quality.
- **Event Name**: `page_load_time` (Standard)
- **Parameters**:
  - `time_to_dom_interactive`: `{{CJSV - Time to dom}}`
  - `page_render_time`: `{{CJSV - Page render}}`
- **Trigger**: `Window Loaded` (`gtm.load`).

### Quality: JavaScript Errors
Automatic monitoring of client-side crashes.
- **Event Name**: `javascript_errors` (Custom)
- **Parameters**: `error_line`, `error_message`, `error_url`.
- **Trigger**: Built-in `JavaScript Error` trigger.

---

## 3. E-commerce Implementation
Designed to be compatible with the GA4 DataLayer schema.

### Universal Ecommerce Tag
- **Event Name**: `{{Event}}`
- **Setting**: Enable **"Add ecommerce data from dataLayer"**.
- **Trigger**: Custom Event (Regex):
  `^view_item|add_to_cart|begin_checkout|purchase|view_item_list|select_item|view_promotion|select_promotion|add_to_wishlist|remove_from_cart|view_cart|add_shipping_info|add_payment_info|refund$`

### Querying Ecommerce Data
Data is stored as a JSON object in the `ecommerce` column. In BigQuery, use the `transactions()` table function from the [Reporting Tables folder](../reporting-tables/) to flatten this data.

---

## 4. Custom Interactions
Always use `snake_case` for event and parameter names to ensure compatibility with BigQuery functions.
- **Example**: Track a CTA click.
  - **Event Name**: `cta_click`
  - **Param**: `button_location` : `header`

---
[← Back to README](README.md) | [Read full technical specs →](IMPLEMENTATION.md)
