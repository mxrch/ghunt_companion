(function() {
    
    function checkCookies(cookies) {
    LSID = false;
    APISID = false;
    logged_in = false;
    for (let cookie of cookies) {
        if (cookie.name == "LSID") {
            LSID = true;
        } else if (cookie.name == "APISID") {
            APISID = true;
        }
        }
        if (LSID && APISID) {
            logged_in = true;
        }

        return logged_in
    }

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

        console.log("tjr vivant lol");
        return true;
}

    function encodeCookies(cookies) {
        var encoded = btoa(JSON.stringify(cookies));
        return encoded
}

    async function main(choice) {
        var status_label = document.getElementsByClassName("status_text")[0];
        
        var cookies = await browser.cookies.getAll({});

        logged_in = checkCookies(cookies);

        if (logged_in) {
            console.log("Logged-in !");
            encoded_cookies = encodeCookies(cookies);

            if (choice == "base64") {

                navigator.clipboard.writeText(encoded_cookies).then(function() {
                    status_label.innerHTML = "Cookies copied to the clipboard !";
                }, function(err) {
                    status_label.innerHTML = 'Could not copy text :( error => ' + err;
                });
            } else if (choice == "server") {
                status_label.innerHTML = "Feeding GHunt with cookies...";
                success = await sendCookies(encoded_cookies);
                if (success) {
                    status_label.innerHTML = "Finished !"
                } else {
                    status_label.innerHTML = "Can't contact GHunt on 127.0.0.1:60067 ...";
                }
                
            }

        } else {
            status_label.innerHTML = "Please log in into your Google account.";
            var tab = await browser.tabs.create({
                "url": "https://accounts.google.com"
            });
        };
      
    }

    document.addEventListener("click", function(e) {
        if (e.target.id == "method_base64") {
            main("base64");
        } else if (e.target.id == "method_server") {
            main("server");
        };
    });

}());