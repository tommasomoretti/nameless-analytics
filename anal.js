// Send hits

function sendData(full_endpoint, secret_key, payload, data) {
  var date = new Date(payload.event_timestamp);
 
  payload.date = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
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
