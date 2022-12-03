import * as co from "./lib/constants.js"


(function() {
    async function main() {
        var tabs = await browser.tabs.query({"url": co.CONNECTED_URL_PATTERN})
        if (tabs.length > 0) {
            var target_tab = tabs[0];
            await browser.tabs.update(target_tab.id, {"active": true, "url": co.START_LOGIN_URL})
        } else {
            await browser.tabs.create({
                "url": co.START_LOGIN_URL
            });
        }
    }

    document.addEventListener("click", function(e) {
        if (e.target.id == "start_sync") {
            main();
        };
    });

}());