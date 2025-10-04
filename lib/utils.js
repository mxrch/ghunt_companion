import * as co from "./constants.js"


export async function sendCookies(cookies) {
    var exit = false;
    var res = await fetch("http://127.0.0.1:60067/ghunt_ping").then(function(res) {
    if (!res.text == "ghunt_pong") {
        exit = true;
    }
    }, function(e) {
        exit = true;
    });
    if (exit) {
        return false;
    }

    exit = false;
    res = await fetch("http://127.0.0.1:60067/ghunt_feed", {
    method: "POST",
    body: cookies
    }).then(function(res) {
    if (!res.text == "ghunt_received_ok") {
        exit = true;
    }
    }, function(e) {
        exit = true;
    });
    if (exit) {
        return false;
    }

    return true;
}

export function encodeCookies(cookies) {
    let oauth_token = cookies["oauth_token"]
    delete cookies["oauth_token"]
    cookies = {"cookies": cookies, "oauth_token": oauth_token}
    let encoded = btoa(JSON.stringify(cookies));
    return encoded;
}

export async function checkSession(details) {
    console.log("Got details :", details);
    
    if (!details) {
        console.log("No details provided to checkSession, aborting.");
        return {"is_connected": false};
    };

    var target_tab = await browser.tabs.get(details.tabId);
    console.log("Got tab :", target_tab);
    if (!target_tab) {
        console.log("No tab found with connected url pattern, aborting checkSession.");
        return {"is_connected": false};
    }

    var raw_cookies = await browser.cookies.getAll({"domain":"google.com", "storeId": details.cookieStoreId});

    var wanted = ["SID", "SSID", "APISID", "SAPISID", "HSID", "LSID", "__Secure-3PSID", "oauth_token"];

    var ghunt_cookies = raw_cookies.filter(function(obj) {return wanted.includes(obj.name)});
    ghunt_cookies = Object.fromEntries(ghunt_cookies.map(x => [x.name, x.value]));

    console.log("Length check :", Object.keys(ghunt_cookies).length, "/", wanted.length);

    if (Object.keys(ghunt_cookies).length >= wanted.length) {
        console.log("Connected ! Putting data in storage...");
        await browser.storage.local.set({"ghunt": {
            "cookies": ghunt_cookies,
            "ready": true
        }});
        return {"tab": target_tab, "is_connected": true, "ghunt_cookies": ghunt_cookies};
    };
    return {"is_connected": false};
}