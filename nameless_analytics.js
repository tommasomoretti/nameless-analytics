// Send hits

function sendData(full_endpoint, payload, data) {
  const timestamp = payload.event_timestamp
  payload.event_date = formatDatetime(timestamp).split("T")[0]
  payload.event_data.browser_name = parseUserAgent().browser.name,
  payload.event_data.browser_language = parseUserAgent().browser.language,
  payload.event_data.browser_version = parseUserAgent().browser.version,
  payload.event_data.device_type = parseUserAgent().device.type || "desktop",
  payload.event_data.device_vendor = parseUserAgent().device.vendor,
  payload.event_data.device_model = parseUserAgent().device.model,
  payload.event_data.os_name = parseUserAgent().os.name,
  payload.event_data.os_version = parseUserAgent().os.version,
  payload.event_data.screen_size = window.screen.width + "x" + window.screen.height
  payload.event_data.wiewport_size = window.innerWidth + "x" + window.innerHeight

  if(data.config_variable.enable_logs){console.log('SENDING REQUEST...')} 
  
  fetch(full_endpoint, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    keepalive: true,
    body: JSON.stringify(payload)
  })
  .then((response) => response.json())
  .then((response_json) => {
    if (response_json.status_code === 200){
      if(data.config_variable.enable_logs){console.log('  Event name: ' + response_json.data.event_name)}
      if(data.config_variable.enable_logs){console.log('  Payload data: ', response_json.data)}
      if(data.config_variable.enable_logs){console.log('  ' + response_json.response)}
      return data.gtmOnSuccess()
    } else {
      if(data.config_variable.enable_logs){console.log('  ' + response_json.response)}
      return data.gtmOnFailure()
    }
  })
  .catch((error) => {
    if(data.config_variable.enable_logs){console.log(error)}
    return data.gtmOnFailure()
  })
}

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Format timestamp into date 
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

// Parse user agent
function parseUserAgent() {
  var uap = new UAParser()
  var uap_res = uap.getResult()
  
  uap_res.browser.language = navigator.language  
  return uap_res
}

//----------------------------------------------------------------------------------------------------------------------------------------------------


// Channel grouping
function getChannelGrouping(referrer_hostname, source, campaign) {
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

// Cross-domain
function set_cross_domain_listener(full_endpoint, cross_domain_domain) {
  document.addEventListener('click', async function(event) {
    const target = event.target;
    if (target.tagName === 'A' && new URL(target.href).hostname.includes(cross_domain_domain)) {
      event.preventDefault();
      const decorated_url = await send_request(full_endpoint, { event_name: 'get_user_data' }, target.href);
      
      if (decorated_url) {
        target.href = decorated_url;
        const newWindow = window.open(decorated_url, '_blank');
        if (newWindow) {
          newWindow.opener = null;
        }
      }
    }
  });
}

async function send_request(full_endpoint, payload, linkUrl) {
  try {
    const response = await fetch(full_endpoint, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      keepalive: true,
      body: JSON.stringify(payload)
    });

    const response_json = await response.json();

    if (response_json.status_code === 200) {
      const session_id = response_json.data.session_id;
      console.log('Session id: ' + session_id);

      const url = new URL(linkUrl);
      url.searchParams.set('na_id', session_id);

      console.log(url.toString());
      return url.toString();
    } else {
      console.log('DC');
      return "";
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    return "";
  }
}
