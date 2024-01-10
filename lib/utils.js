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

export async function checkSession(response) {
    if (!response) {
        response = await fetch(co.ENDPOINT_URL, {"redirect": "manual"});
    };

    var raw_cookies = await browser.cookies.getAll({"domain":"google.com"});
    var ghunt_cookies = Object.fromEntries(raw_cookies.map(x => [x.name, x.value]));

    if ((response.statusCode == 200 || response.ok)) {
        console.log("Connected ! Putting data in storage...");
        await browser.storage.local.set({"ghunt": {
            "cookies": ghunt_cookies,
            "ready": true
        }});
        return {"is_connected": true, "ghunt_cookies": ghunt_cookies};
    };
    return {"is_connected": false};
}