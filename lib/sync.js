import * as utils from "../lib/utils.js"
import * as co from "../lib/constants.js"


async function main(choice) {
    var current_tab = await browser.tabs.getCurrent();
    if (choice == "close") {
        await browser.tabs.remove(current_tab.id);
    }

    var status_label = document.getElementsByClassName("status_text")[0];

    var storage = await browser.storage.local.get("ghunt");
    if ("ghunt" in storage && storage.ghunt.ready) {
        var encoded_cookies = utils.encodeCookies(storage.ghunt.cookies);
        var finished = false;

        if (choice == "server") {
            status_label.innerHTML = "Feeding GHunt with cookies...";
            let success = await utils.sendCookies(encoded_cookies);
            if (success) {
                finished = true;
                status_label.innerHTML = "Finished !";
            } else {
                status_label.innerHTML = "Can't contact GHunt on 127.0.0.1:60067 ...";
            };
            
        } else if (choice == "base64") {
            await navigator.clipboard.writeText(encoded_cookies).then(function() {
                finished = true;
                status_label.innerHTML = "Cookies copied to the clipboard !";
            }, function(err) {
                status_label.innerHTML = 'Could not copy text :( error => ' + err;
            });
        };

        if (finished) {
            await browser.storage.local.remove("ghunt");
            console.log("Terminating, I removed stored data !");

            var table = document.getElementById("methods_list");
            table.innerHTML = '<tr><th><p>👋 You can close this tab now ! </p></th><th><button id="method_close" class="btn btn-primary">Close</button></th></tr>';
        };

    } else {
        status_label.innerHTML = "Please log in into your Google account.";
        var tabs = await browser.tabs.query({"url": co.CONNECTED_URL_PATTERN})
        if (tabs.length > 0) {
            var target_tab = tabs[0];
            await browser.tabs.update(target_tab.id, {"active": true, "url": co.START_LOGIN_URL})
        } else {
            await browser.tabs.create({
                "url": co.START_LOGIN_URL
            });
            await browser.tabs.remove(current_tab.id);
        }
    }
}

document.addEventListener("click", function(e) {
    if (e.target.id == "method_server") {
        main("server");
    } else if (e.target.id == "method_base64") {
        main("base64");
    } else if (e.target.id == "method_close") {
        main("close");
    }
});