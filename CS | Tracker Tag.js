const log = require('logToConsole');
const getTimestampMillis = require('getTimestampMillis');
const queryPermission = require('queryPermission');
const injectScript = require('injectScript');
const callInWindow = require('callInWindow');
const copyFromWindow = require('copyFromWindow');
const getUrl = require('getUrl');
const readTitle = require('readTitle');
const getReferrerUrl = require('getReferrerUrl');
const isConsentGranted = require('isConsentGranted');
const addConsentListener = require('addConsentListener');
const Object = require('Object');


const timestamp = getTimestampMillis();
const script_url = 'https://rawcdn.githack.com/tommasomoretti/cs-http-tag/728e15dbf445f90770c1fa8098f2284a3b0788e6/anal.js' + '?min=1';


// Inject script
if (queryPermission('inject_script', script_url)) {
  injectScript(
    script_url,
    () => { // Injection success
      if(data.enable_logs){log('CLIENT-SIDE GTM TAG: TAG CONFIGURATION');}
      const domain = data.domain_name;
      if(data.enable_logs){log('👉 Endpoint domain:', domain);}

      const endpoint = data.endpoint_name;
      if(data.enable_logs){log('👉 Endpoint path:', endpoint);}
      const full_endpoint = 'https://' + domain + "/" + endpoint;

      const payload = {};
      payload.event_name = data.event_name;

      // User info and session info
      var info;
      if(queryPermission('access_globals', 'execute', 'setUserInfo')) {
        info = callInWindow('setUserInfo');
      }


      // User info
      const user_info = info[0];
      const user_params = data.user_params;
      if(data.add_user_data && user_params != undefined){
        for (let i = 0; i < user_params.length; i++) {
          const name = user_params[i].param_name;
          const value = user_params[i].param_value;
          user_info[name] = value;
        }
      }


      // Session info
      const session_info = info[1];
      const session_params = data.session_params;
      if(data.add_session_data && session_params != undefined){
        for (let i = 0; i < session_params.length; i++) {
          const name = session_params[i].param_name;
          const value = session_params[i].param_value;
          session_info[name] = value;
        }
      }


      // Page info
      const page_info = {
        page_title: readTitle(),
        page_location: getUrl(),
        page_protocol: getUrl('protocol'),
        page_host: getUrl('host'),
        page_port: (getUrl('port')) ? getUrl('port') : null,
        page_path: getUrl('path'),
        page_fragment: (getUrl('fragment')) ? getUrl('fragment') : null,
        page_query: (getUrl('query')) ? getUrl('query') : null,
        page_extension: (getUrl('extension')) ? getUrl('extension') : null,
        page_referrer: getReferrerUrl(),
      };
      const page_params = data.session_params;
      if(data.add_page_data && page_params != undefined){
        for (let i = 0; i < page_params.length; i++) {
          const name = page_params[i].param_name;
          const value = page_params[i].param_value;
          page_info[name] = value;
        }
      }


      // Event info
      const event_info = {
        event_timestamp: timestamp,
        event_number: session_info.total_requests
      };
      const event_params = data.event_params;

      if (event_params != undefined) {
        for (let i = 0; i < event_params.length; i++) {
          const name = event_params[i].param_name;
          const value = event_params[i].param_value;
          event_info[name] = value;
        }
      }
      Object.delete(info[1], "total_requests");

      // Build the payload
      payload.user_data = user_info;
      payload.session_data = session_info;
      payload.page_data = page_info;
      payload.event_data = event_info;

      // Send request
      if(data.enable_logs){log('EVENT DATA');}
      if(data.enable_logs){log('👉 Event name: ', payload.event_name);}
      if(data.enable_logs){log('👉 Request payload: ', payload);}
      send_request(full_endpoint, payload);
    },
    () => { // External script not loaded
      if(data.enable_logs){log('🔴 Error: External script not loaded.');}
      data.gtmOnFailure();
    }, script_url // cache the external js
  );
} else { // Incorrect script path
  if(data.enable_logs){log('🔴 Error: Incorrect script path.');}
  data.gtmOnFailure();
}


// Send request
function send_request(endpoint, payload){
  if(queryPermission('access_globals', 'execute', 'sendData')) {
    if (!isConsentGranted("analytics_storage")) {
      let wasCalled = false;
      if(data.enable_logs){log('🟠 Waiting for granted Analytics consent...');}

      addConsentListener("analytics_storage", (consentType, granted) => {
        if (wasCalled || !granted) return;
        wasCalled = true;
        if(data.enable_logs){log('🟢 Analytics consent granted. Sending request...');}
        callInWindow('sendData', endpoint, data.secret_key, payload, data);
        // data.gtmOnSuccess();
      });
    } else if(isConsentGranted("analytics_storage")) {
      if(data.enable_logs){log('🟢 Analytics consent granted. Sending request...');}
      callInWindow('sendData', endpoint, data.secret_key, payload, data);
      // data.gtmOnSuccess();
    }
  }
}
