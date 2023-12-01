// Send hits

function sendData(full_endpoint, secret_key, payload, data) {
  payload.date = formatDatetime(payload.timestamp).split(" ")[0];
  payload.date_time = formatDatetime(payload.timestamp);
  payload.user_agent = navigator.userAgent;
  payload.device_brand = getDeviceBrand();
  payload.device_type = getDeviceType();
  payload.os = getOS();
  payload.os_version = getOSVersion();
  payload.browser = getBrowser();
  
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

//----------------------------------------------------------------------------------------------------------------------------------------------------

function formatDatetime(timestamp) {
  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mese è basato su zero
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}000 UTC`;

  return formattedDate;
}


function getDeviceBrand() {
    const userAgent = navigator.userAgent;

    let deviceModel = "Modello sconosciuto";

    // iPhone
    if (userAgent.indexOf("iPhone") !== -1) {
        deviceModel = userAgent.match(/iPhone\s*([\w\s]+)/);
        deviceModel = deviceModel ? "iPhone " + deviceModel[1].trim() : deviceModel;
    }

    // iPad
    if (userAgent.indexOf("iPad") !== -1) {
        deviceModel = userAgent.match(/iPad\s*([\w\s]+)/);
        deviceModel = deviceModel ? "iPad " + deviceModel[1].trim() : deviceModel;
    }

    // Android
    if (userAgent.indexOf("Android") !== -1) {
        deviceModel = userAgent.match(/Android\s*([\w\s]+)/);
        deviceModel = deviceModel ? "Android " + deviceModel[1].trim() : deviceModel;
    }

    // Altri dispositivi (es. Windows Phone, BlackBerry)
    if (userAgent.indexOf("Windows Phone") !== -1 || userAgent.indexOf("BlackBerry") !== -1) {
        deviceModel = userAgent.match(/[^\/]+\/([^;\)]+)/);
        deviceModel = deviceModel ? deviceModel[1].trim() : deviceModel;
    }

    return deviceModel;
}


function getDeviceType() {
  const isMobile = /iPhone|iPad|iPod|Android|IEMobile|BlackBerry|Opera Mini/i.test(navigator.userAgent);
  const isTablet = /iPad|Android|Tablet/i.test(navigator.userAgent);

  if (isTablet) {
    return "Tablet";
  } else if (isMobile) {
    return "Mobile";
  } else {
    return "Desktop";
  }
}


function getOS() {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf("Windows NT 10.0") !== -1) {
        return "Windows 10";
    } else if (userAgent.indexOf("Windows NT 6.3") !== -1) {
        return "Windows 8.1";
    } else if (userAgent.indexOf("Windows NT 6.2") !== -1) {
        return "Windows 8";
    } else if (userAgent.indexOf("Windows NT 6.1") !== -1) {
        return "Windows 7";
    } else if (userAgent.indexOf("Windows NT 6.0") !== -1) {
        return "Windows Vista";
    } else if (userAgent.indexOf("Windows NT 5.1") !== -1) {
        return "Windows XP";
    } else if (userAgent.indexOf("Mac OS X") !== -1) {
        return "Mac OS X";
    } else if (userAgent.indexOf("Linux") !== -1) {
        return "Linux";
    } else if (userAgent.indexOf("Android") !== -1) {
        return "Android";
    } else if (userAgent.indexOf("iOS") !== -1) {
        return "iOS";
    } else {
        return "Sistema operativo sconosciuto";
    }
}


function getOSVersion() {
    const userAgent = navigator.userAgent;

    let osVersion = "Versione sconosciuta";

    // Windows
    if (userAgent.indexOf("Windows NT") !== -1) {
        osVersion = userAgent.match(/Windows NT (\d+\.\d+)/);
        osVersion = osVersion ? "Windows " + osVersion[1] : osVersion;
    }

    // Mac OS X
    if (userAgent.indexOf("Mac OS X") !== -1) {
        osVersion = userAgent.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
        osVersion = osVersion ? "macOS " + osVersion[1].replace(/_/g, ".") : osVersion;
    }

    // Linux
    if (userAgent.indexOf("Linux") !== -1) {
        osVersion = "Linux";
    }

    // Android
    if (userAgent.indexOf("Android") !== -1) {
        osVersion = userAgent.match(/Android (\d+[._]\d+[._]?\d*)/);
        osVersion = osVersion ? "Android " + osVersion[1] : osVersion;
    }

    // iOS
    if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) {
        osVersion = userAgent.match(/OS (\d+[._]\d+[._]?\d*)/);
        osVersion = osVersion ? "iOS " + osVersion[1].replace(/_/g, ".") : osVersion;
    }

    return osVersion;
}


function getBrowser() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Firefox") !== -1) {
    return "Mozilla Firefox";
  } else if (userAgent.indexOf("Chrome") !== -1) {
    return "Google Chrome";
  } else if (userAgent.indexOf("Safari") !== -1) {
    return "Apple Safari";
  } else if (userAgent.indexOf("Edge") !== -1) {
    return "Microsoft Edge";
  } else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
    return "Opera";
  } else if (userAgent.indexOf("Trident") !== -1) {
    return "Internet Explorer";
  } else {
    return "Browser sconosciuto";
  }
}
