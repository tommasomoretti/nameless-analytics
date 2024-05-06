// Send hits

function sendData(full_endpoint, payload, data) {
  const timestamp = payload.event_data.event_timestamp
  payload.event_date = formatDatetime(timestamp).split("T")[0]
  
  ua_info = parseUa()
  payload.session_data.browser_name = ua_info.browser.name
  payload.session_data.browser_version = ua_info.browser.version
  payload.session_data.browser_language = navigator.language || navigator.userLanguage 
  payload.session_data.device_type = ua_info.device.type || "desktop"
  payload.session_data.device_vendor = ua_info.device.vendor
  payload.session_data.device_model = ua_info.device.model
  payload.session_data.os_name = ua_info.os.name
  payload.session_data.os_version = ua_info.os.version
  payload.event_data.screen_size = window.screen.width + "x" + window.screen.height
  payload.event_data.wiewport_size = window.innerWidth + "x" + window.innerHeight
  
  if(data.config_variable.enable_logs){console.log('  Event data')}
  if(data.config_variable.enable_logs){console.log('    👉 Event name: ' + payload.event_name)}
  if(data.config_variable.enable_logs){console.log('    👉 Request payload: ', payload)}
  
  fetch(full_endpoint, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(payload)
  })
  .then((response) => response.json())
  .then((response_json) => {
    if(data.config_variable.enable_logs){console.log('  Request response')}
    if(data.config_variable.enable_logs){console.log('    ' + response_json.response)}
    if (response_json.status_code === 200)
      return data.gtmOnSuccess()
    else return data.gtmOnFailure()
  })
  .catch((error) => {
    if(data.config_variable.enable_logs){console.log('Request response')}
    if(data.config_variable.enable_logs){console.log(error)}
    return data.gtmOnFailure()
  })
}

//----------------------------------------------------------------------------------------------------------------------------------------------------

function formatDatetime(timestamp) {
  const date = new Date(timestamp)

  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0')

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}000`

  return formattedDate
}

//----------------------------------------------------------------------------------------------------------------------------------------------------

function parseUa() {
  var uap = new UAParser()
  var uap_res = uap.getResult()
  return uap_res
}

//----------------------------------------------------------------------------------------------------------------------------------------------------

function getChannelGroup(referrer_hostname, source, campaign) {
  const organic_search_source = new RegExp('google|bing|yahoo|baidu|yandex|duckduckgo|ask|aol|ecosia')
  const organic_social_source = new RegExp('facebook|messenger|instagram|tiktok|t\.co|twitter|linkedin|pinterest|youtube|whatsapp|wechat')
  const email_source = new RegExp('email')
    
  if (source == null) {
    return 'internal_traffic'
  } else if (source == 'direct' && campaign == null) {
    return 'direct'
  } else if (source == 'tagassistant.google.com'){
    return 'gtm_debugger'
  } else if (organic_search_source.test(source) && campaign == null) {
    return 'organic_search'
  } else if (organic_social_source.test(source) && campaign == null) {
    return 'organic_social'
  } else if (organic_search_source.test(source) && campaign !== null) {
    return 'paid_search'
  } else if (organic_social_source.test(source) && campaign != null) {
    return 'paid_social'
  } else if (email_source.test(source) && campaign != null) {
    return 'email'
  } else if (referrer_hostname != null && campaign == null) {
    return 'referral'
  } else if (referrer_hostname != null && campaign != null) {
    return 'affiliate'
  } else {
    return 'undefined'
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------

window.addEventListener('unload', function (event) {  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_closed'
  });
}, true);
