![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

An open source analytics platform for power users based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) and [Google BigQuery](https://cloud.google.com/bigquery). 

Collect, analyze and activate your website data with a real-time analytics suite that respects users privacy, for free.



## Main features
- **1° party data storage**\
Event data is saved in your own Google BigQuery dataset. Cookies are released in a first-party context, in a secure and inaccessible mode to third parties.

- **Privacy-focused**\
By default, no PII data are tracked. You can choose to track every event or automatically respects user consent.

- **Real-time**\
Data ingestion into Google BigQuery is nearly instantaneous and events are available within a couple of seconds.

- **Lightweight and blazing fast**\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

- **Client-side tracking**\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.

- **Server-side tracking**\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus libero ipsum, vestibulum egestas orci ullamcorper eget.



## Basic requirements
- A Client-side Google Tag Manager container installed on a website
- A Server-side Google Tag Manager container hosted on app engine or cloud run (Stape.io to be tested)
- A Google BigQuery dataset with write permissions

See [Get started section](https://github.com/tommasomoretti/nameless-analytics/blob/main/README.md#get-started) for details about how to setup server-side Google Tag Manager, the BigQuery main table and the whole environment.



## How it works
Here a basic schema and explanation of how Nameless Analytics works.

![nameless_analytics_schema](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/50ef3f09-88ea-44c5-857a-a9da92d0b7ea)


### Client Side
If the respect_consent_mode is enabled, when a page is loaded, the first tag that fires checks the analytics_consent status.
- If consent is granted, the tag loads the required libraries and sends the hit to the server-side Google Tag Manager endpoint, with the event name and event parameters configured in the tag.
<img width="1263" alt="Nameless Analytics client-side logs" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/bca94adf-cdf5-4bf3-bb41-e69461ba9b38">

- If consent is denied, the tag waits until consent is granted. If consent is granted (in the context of the same page), all pending tags will be fired.
<img width="1265" alt="Screenshot 2024-06-26 alle 15 35 47" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/f5c8174c-3acb-44f4-8a84-33c03c794af8">

If the respect_consent_mode is disabled, the tag fires regardless of the user's consent.


### Server Side
When the server-side Tag Manager client tag receives the request, it checks if any cookies are present.
- If no nameless_analytics_* cookies are present in the request, the client tag generates two values (one for nameless_analytics_user cookie and one for nameless_analytics_session cookie), adds these values to the hit and sets two cookies with the response.
- If the nameless_analytics_user cookie is set but nameless_analytics_session cookie is not, the client tag generates one values (for nameless_analytics_session cookie), adds that value to the hit and set one cookies with the response.
- If both cookies are present, the tag does not create any new cookies but adds their values to the hit.

After that the hit will be logged in a BigQuery event-date partitioned table.

<img width="1512" alt="Nameless Analytics server-side logs" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/776e0527-0b20-46d0-90d1-cac8064e6b10">


### Cross Domain
If cross-domain tracking is enabled and respect_consent_mode is enable, the client-side tag will set a listener on every link click after the consent is granted. With subsequent hits, the tag will enable or disable cross-domain functionality, as per the user's consent.  

If cross-domain tracking is enabled and respect_consent_mode is disabled, the client-side tag will set a listener on every link click regardless of the user's consent.

- When a user clicks on a cross-domain link, the listener sends a get_user_data request to the server. The server responds with the two cookie values, the listener decorates the URL with a parameter named na_id and the user is redirected to the destination website.
- When the user lands on the destination website, the first tag that fires checks if there is an na_id parameter in the URL. If it is present, the hit will contain a cross_domain_id parameter, and the server-side Client Tag will add it to the request and set the cookies with that values.

If cross-domain tracking is disabled, the client-side tag will not set any listener.

When you enable cross-domain and analytics_consent is granted and you click on an authorized link:

<img width="1264" alt="Screenshot 2024-06-25 alle 13 44 37" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7f966853-9e95-4638-b831-03f6c9506267">

When cross-domain is enabled and analytics_consent is granted and you click on not autorized link:

<img width="1263" alt="Screenshot 2024-06-25 alle 13 45 43" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/207ce2cf-5a09-4e5f-a0c0-1450e4065631">

When cross-domain is enabled and analytics_consent is granted and you click on internal link:

<img width="1262" alt="Screenshot 2024-06-25 alle 13 48 01" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/e5152e8f-c757-4718-8e94-5dd28df19564">

When cross-domain is enabled and analytics_consent is not granted and you click on any link, no link decoration happens but it cross-domain logs values in console, like above. 

<img width="1263" alt="Screenshot 2024-06-26 alle 15 41 31" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/1ee8a621-cf00-47b9-9c3a-dff38ac77e2a">
<img width="1264" alt="Screenshot 2024-06-26 alle 15 42 51" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/2d59516f-c8dc-4c20-8e41-8f2fc505b0e7">
<img width="1264" alt="Screenshot 2024-06-26 alle 15 43 42" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/e32d530a-bdb5-479c-9da9-7ec669a03cf5">

When cross-domain is disabled none of the things above happens. 



## Get started
Read how to setup 
1. [Server-side Tag Manager](https://developers.google.com/tag-platform/tag-manager/server-side) with [Google App Engine](https://developers.google.com/tag-platform/tag-manager/server-side/app-engine-setup) or [Google Cloud Run](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
2. [Nameless Analytics client side tag](https://github.com/tommasomoretti/nameless-analytics-client-tag)
3. [Nameless Analytics server side tag](https://github.com/tommasomoretti/nameless-analytics-server-tag)
4. [Nameless Analytics main table and reporting queries](https://github.com/tommasomoretti/nameless-analytics-reporting-queries) in Google Big Query
5. [Google Looker Studio Dashboard example](https://lookerstudio.google.com/reporting/d4a86b2c-417d-4d4d-9ac5-281dca9d1abe/page/HPxxD)

### Do you want to see a live demo? 
Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) and open the developer console.

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
