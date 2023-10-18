// Send hits

function sendData(full_endpoint, secret_key, payload, tracker, data) {
  payload.user_agent = navigator.userAgent;
  payload.browser = detectBrowser();
  payload.device = detectDevice();
  payload.platform = detectOS();
  
  if(data.enable_logs){console.log('👉 Request payload: ', payload);}
  if(data.enable_logs){console.log('🟢 Analytics consent granted. Sending request...');}

  fetch(full_endpoint, {
    // headers: new Headers({
    //   'Authorization': 'Bearer ' + btoa('secret_key'),
    //   'Content-Type': 'application/json'
    // }),
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(payload)
  })
  .then((response) => response.json())
  .then((response_json) => {
    setRequestInfo(full_endpoint, payload, tracker);
    if(data.enable_logs){console.log(response_json.response)}
    if (response_json.status_code === 200)
      return data.gtmOnSuccess()
    else return data.gtmOnFailure()
  })
  .catch((error) => {
    if(data.enable_logs){console.log(error)}
    return data.gtmOnFailure()
  })
}


function detectBrowser(){
  let userAgent = navigator.userAgent;
  let browserName;

  if(userAgent.match(/chrome|chromium|crios/i)){
      browserName = "chrome";
    }else if(userAgent.match(/firefox|fxios/i)){
      browserName = "firefox";
    }  else if(userAgent.match(/safari/i)){
      browserName = "safari";
    }else if(userAgent.match(/opr\//i)){
      browserName = "opera";
    } else if(userAgent.match(/edg/i)){
      browserName = "edge";
    } else{
      browserName="unknown";
    }
  return browserName;
}


function detectDevice(){
  let userAgent = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return "Tablet";
  }
  else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return "Mobile";
  }
  return "Desktop";
}


function detectOS(){
  return null
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------
  
// User data
function setUserInfo(){
  info = [];
  if (localStorage.getItem("user_info") === null){
    sessionStorage.removeItem('session_info');
    sessionStorage.removeItem('event_info');
    var client_id = Math.floor(Math.random() * Math.pow(10, 10));
    var user_info = {
      client_id: client_id,
      user_source: document.referrer || window.location.protocol + "//" + window.location.host,
      total_sessions: 0
    }
    localStorage.setItem("user_info", JSON.stringify(user_info));
    setSessionInfo(user_info);
    info.push(JSON.parse(localStorage.getItem("user_info")));
    info.push(JSON.parse(sessionStorage.getItem("session_info")));
    return info
  } else {
    var user_info = JSON.parse(localStorage.getItem("user_info"))
    setSessionInfo(user_info);
    info.push(JSON.parse(localStorage.getItem("user_info")));
    info.push(JSON.parse(sessionStorage.getItem("session_info")));
    return info
  }
}

// Session data
function setSessionInfo(user_info){
  if (sessionStorage.getItem("session_info") === null){
    sessionStorage.removeItem('event_info');
    var session_id = user_info.client_id + "_" + Date.now()
    var session_info = {
      session_id: session_id,
      session_source: document.referrer || window.location.protocol + "//" + window.location.host,
      total_requests: 0
    }
    sessionStorage.setItem("session_info", JSON.stringify(session_info));
    user_info.total_sessions = user_info.total_sessions + 1
    localStorage.setItem("user_info", JSON.stringify(user_info));
  }
}

// Event data
function setRequestInfo(full_endpoint, payload, tracker){
  var actual_event_info = JSON.parse(sessionStorage.getItem("event_info"));
  var event_sent = {
    endpoint_name: full_endpoint,
    event_info: payload
  }
  if (actual_event_info == null){
    var event_info = {}
    event_info[tracker] = [];
    event_info[tracker].push(event_sent);
    sessionStorage.setItem("event_info", JSON.stringify(event_info));
    var session_info = JSON.parse(sessionStorage.getItem("session_info"));
    session_info.total_requests = session_info.total_requests + 1 
    sessionStorage.setItem("session_info", JSON.stringify(session_info));
  } else {
    if(actual_event_info[tracker] == undefined){
        actual_event_info[tracker] = []
        actual_event_info[tracker].push(event_sent) 
    } else {
        actual_event_info[tracker].push(event_sent);
    }
    sessionStorage.setItem("event_info", JSON.stringify(actual_event_info));
    var session_info = JSON.parse(sessionStorage.getItem("session_info"));
    session_info.total_requests = session_info.total_requests + 1 
    sessionStorage.setItem("session_info", JSON.stringify(session_info));
  }
}
