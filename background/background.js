import * as utils from "../lib/utils.js"
import * as co from "../lib/constants.js"


// Main functions

async function isConnected(details) {
    console.log("Connected url pattern detected, checking...");
    var auth_data = await utils.checkSession(details);
    if (auth_data.is_connected) {
        await browser.tabs.update(auth_data.tab.id, {"active": true, "url": "../"+co.CONNECTED_LOCAL_PAGE});
    };
}

async function customizeLogin(details) {
    console.log("Form detected, customizing Google login...");
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    let data = [];
    filter.ondata = event => {
        data.push(event.data);
    };

    filter.onstop = event => {
        let str = "";
        for (let buffer of data) {
            str += decoder.decode(buffer, {stream: true});
        }
        str += decoder.decode(); // end-of-stream

        // Injecting cool things
        try {
            let logo_match = /<div id=\"logo\".*?<svg .*?<\/svg><\/div><\/div>/i.exec(str)[0];
            let parser = new DOMParser();
            let node = parser.parseFromString(logo_match, 'text/html');
            node.getElementById("logo").getElementsByTagName("svg")[0].parentElement.innerHTML = "<img src=\"https://files.catbox.moe/171jq5.png\" style=\"width: 70px; margin-top: -10px;\">";
            let new_substr = node.documentElement.innerHTML;
            str = str.replace(logo_match, new_substr);

            let sub_match = /id=\"headingSubtext\".*?<span .*?>Use your Google Account<\/span>/i.exec(str)[0];
            str = str.replace(sub_match, sub_match.replace("Use your Google Account", "🦖 Connect your Google Account"));
        } catch (error) {
            console.log("GHunt error while customizing login :", error);
        };

        filter.write(encoder.encode(str));
        filter.close();
    };
};

// Registering listeners

browser.webRequest.onBeforeRequest.addListener(
    customizeLogin,
    {urls: [co.LOGIN_FORM_URL, co.MULTI_LOGIN_FORM_URL], types: ["main_frame"]},
    ["blocking"]
);

browser.webRequest.onCompleted.addListener(
    isConnected,
    {urls: [co.CONNECTED_URL_PATTERN]}
);