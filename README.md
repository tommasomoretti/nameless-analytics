![nameless_analytics_schema](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/ea414fc8-3243-487e-8be5-d6cb1ac8772c)![nameless_analytics_schema](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/fa490c69-dd83-46fa-94e5-4c88f9a1307e)![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

An open source analytics platform for power users based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) and [Google BigQuery](https://cloud.google.com/bigquery). 

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
- Client-side Google Tag Manager installed on a website
- Server-side Google Tag Manager hosted on app engine or cloud run (Stape.io da testare)
- Google BigQuery dataset with write permissions

See [Get started section](https://github.com/tommasomoretti/nameless-analytics/blob/main/README.md#get-started) for details about how to setup server-side Google Tag Manager, the BigQuery main table and the whole environment.


## How it works
Here is a basic schema and explanation of how Nameless Analytics works.



### Client Side
If the respect_consent_mode is enabled, when a is loaded, the first tag that fires checks the analytics_consent status.
- If consent is granted, the tag fires, loads the required libraries and sends the hit to the server-side Google Tag Manager endpoint, with the event name and event parameters configured in the tag.
- If consent is denied, the tag waits until consent is granted.

If the respect_consent_mode is disabled, the tag fires regardless of the user's consent.

### Server Side
When the server-side Tag Manager client tag receives the request, it checks if any cookies are present.
- If no nameless_analytics_* cookies are present in the request, the client tag generates two values (one for nameless_analytics_user cookie and one for nameless_analytics_session cookie), adds these values to the hit and sets two cookies with the response.
- If the nameless_analytics_user cookie is set but nameless_analytics_session cookie is not, the client tag generates one values (for nameless_analytics_session cookie), adds that value to the hit and set one cookies with the response.
- If both cookies are present, the tag does not create any new cookies but adds their values to the hit.

After that the hit will be logged in a BigQuery event-date partitioned table.

### Cross Domain
If cross-domain tracking is enabled and respect_consent_mode is enable, the client-side tag will set a listener on every link click after the consent is granted. with subsequent hits, the tag will enable or disable cross-domain functionality, as per the user's consent.  

If cross-domain tracking is enabled and respect_consent_mode is disabled, the client-side tag will set a listener on every link click regardless of the user's consent.

- When a user clicks on a cross-domain link, the listener sends a get_user_data request to the server. The server responds with the two cookie values, the listener decorates the URL with a parameter named na_id, and the user is redirected to the destination website.
- When the user lands on the destination website, the first tag that fires checks if there is an na_id parameter in the URL. If it is present, the hit will contain a cross_domain_id parameter, and the server-side Client Tag will set the cookie with that value.

If cross-domain tracking is disabled, the client-side tag will not set any listener.


## Do you want to see a live demo? 
Visit [namelessanalytics.com](https://namelessanalytics.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) or [tommasomoretti.com](https://tommasomoretti.com?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) and open the developer console.

<img width="1263" alt="Nameless Analytics client-side logs" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/bca94adf-cdf5-4bf3-bb41-e69461ba9b38">

In server-side Google Tag Manager you will see something like this:

<img width="1512" alt="Nameless Analytics server-side logs" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/776e0527-0b20-46d0-90d1-cac8064e6b10">


## Get started
Read how to setup 
1. Server-side Tag Manager with [Google App Engine](https://developers.google.com/tag-platform/tag-manager/server-side/app-engine-setup) or [Google Cloud Run](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
2. [Nameless Analytics client side tag](https://github.com/tommasomoretti/nameless-analytics-client-tag)
3. [Nameless Analytics server side tag](https://github.com/tommasomoretti/nameless-analytics-server-tag)
4. [Nameless Analytics main table]() in Google Big Query

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
