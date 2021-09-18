(function() {

    async function sendCookies(cookies) {
        exit = false;
        res = await fetch("http://127.0.0.1:60067/ghunt_ping").then(function(res) {
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

    function encodeCookies(cookies) {
        var encoded = btoa(JSON.stringify(cookies));
        return encoded
}

    async function main(choice) {
        var status_label = document.getElementsByClassName("status_text")[0];
        
        var cookies = await browser.cookies.getAll({"domain":"google.com"});

        wanted = ["SID", "SSID", "APISID", "SAPISID", "HSID", "LSID", "__Secure-3PSID"]

        cookies = cookies.filter(function(obj) {return wanted.includes(obj.name)})
        cookies = Object.fromEntries(cookies.map(x => [x.name, x.value]))

        if (Object.keys(cookies).length >= wanted.length) {
            console.log("Logged-in !");
            encoded_cookies = encodeCookies(cookies);

            if (choice == "server") {
                status_label.innerHTML = "Feeding GHunt with cookies...";
                success = await sendCookies(encoded_cookies);
                if (success) {
                    status_label.innerHTML = "Finished !"
                } else {
                    status_label.innerHTML = "Can't contact GHunt on 127.0.0.1:60067 ...";
                }
                
            } else if (choice == "base64") {

                navigator.clipboard.writeText(encoded_cookies).then(function() {
                    status_label.innerHTML = "Cookies copied to the clipboard !";
                }, function(err) {
                    status_label.innerHTML = 'Could not copy text :( error => ' + err;
                });
            } 

        } else {
            status_label.innerHTML = "Please log in into your Google account.";
            var tab = await browser.tabs.create({
                "url": "https://accounts.google.com"
            });
        };
      
    }

    document.addEventListener("click", function(e) {
        if (e.target.id == "method_server") {
            main("server");
        } else if (e.target.id == "method_base64") {
            main("base64");
        };
    });

}());