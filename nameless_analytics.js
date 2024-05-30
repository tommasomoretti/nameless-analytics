async function send_data(full_endpoint, payload, data) {
    const timestamp = payload.event_timestamp;
    const user_agent = parse_user_agent();

    payload.event_date = format_datetime(timestamp).split("T")[0];
    Object.assign(payload.event_data, {
        browser_name: user_agent.browser.name,
        browser_language: user_agent.browser.language,
        browser_version: user_agent.browser.version,
        device_type: user_agent.device.type || "desktop",
        device_vendor: user_agent.device.vendor,
        device_model: user_agent.device.model,
        os_name: user_agent.os.name,
        os_version: user_agent.os.version,
        screen_size: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
    });

    if (data.config_variable.enable_logs) {
        console.log('SENDING REQUEST...');
    }

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
            if (data.config_variable.enable_logs) {
                console.log('  Event name: ' + response_json.data.event_name);
                console.log('  Payload data: ', response_json.data);
                console.log('  ' + response_json.response);
            }
            data.gtmOnSuccess();
        } else {
            if (data.config_variable.enable_logs) {
                console.log('  ' + response_json.response);
            }
            data.gtmOnFailure();
        }
    } catch (error) {
        if (data.config_variable.enable_logs) {
            console.log(error);
        }
        data.gtmOnFailure();
    }
}

function format_datetime(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString();
}

function parse_user_agent() {
    const uap = new UAParser();
    const uap_res = uap.getResult();
    uap_res.browser.language = navigator.language;
    return uap_res;
}

function get_channel_grouping(referrer_hostname, source, campaign) {
    const organic_search_source = /google|bing|yahoo|baidu|yandex|duckduckgo|ask|aol|ecosia/;
    const organic_social_source = /facebook|messenger|instagram|tiktok|t\.co|twitter|linkedin|pinterest|youtube|whatsapp|wechat/;
    const email_source = /email/;

    if (!source) return 'internal_traffic';
    if (source === 'direct' && !campaign) return 'direct';
    if (source === 'tagassistant.google.com') return 'gtm_debugger';
    if (organic_search_source.test(source)) return campaign ? 'paid_search' : 'organic_search';
    if (organic_social_source.test(source)) return campaign ? 'paid_social' : 'organic_social';
    if (email_source.test(source) && campaign) return 'email';
    if (referrer_hostname) return campaign ? 'affiliate' : 'referral';
    
    return 'undefined';
}

function set_cross_domain_listener(full_endpoint, cross_domain_domains) {
    const saved_full_endpoint = full_endpoint;
    const saved_cross_domain_domains = cross_domain_domains;

    const listener = async function(event) {
        const target = event.target.closest('a');
        if (!target) return;

        const link_url = new URL(target.href);
        const domain_matches = saved_cross_domain_domains.some(domain => link_url.hostname.includes(domain));

        if (domain_matches && get_analytics_storage_value(window.dataLayer)) {
            event.preventDefault();
            console.log('Cross-domain:');
            const decorated_url = await send_data_for_cross_domain(saved_full_endpoint, { event_name: 'get_user_data' }, target.href);
            console.log('  Redirect to: ', decorated_url);
            if (decorated_url) {
                target.href = decorated_url;
                window.open(decorated_url, target.getAttribute("target") || '_self');
            }
        } else {
            console.log('Cross-domain not needed or not consented');
        }
    };

    document.addEventListener('click', listener);
}

function get_analytics_storage_value(dataLayer) {
    for (let i = dataLayer.length - 1; i >= 0; i--) {
        const item = dataLayer[i];
        if (item[0] === "consent" && (item[1] === "default" || item[1] === "update")) {
            const consent_data = item[2];
            if (consent_data && consent_data.analytics_storage !== undefined) {
                return consent_data.analytics_storage === 'granted';
            }
        }
    }
    return false;
}

async function send_data_for_cross_domain(saved_full_endpoint, payload, linkUrl) {
    try {
        const response = await fetch(saved_full_endpoint, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            keepalive: true,
            body: JSON.stringify(payload)
        });
        const response_json = await response.json();

        if (response_json.status_code === 200) {
            const session_id = response_json.data.session_id;
            console.log('  Current session id: ' + session_id);
            const url = new URL(linkUrl);
            url.searchParams.set('na_id', session_id);
            return url.toString();
        } else {
            return "";
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        return "";
    }
}
