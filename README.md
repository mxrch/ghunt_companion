# GHunt Companion
Load all needed cookies to use GHunt peacefully, fast.

The development of this extension has followed Firefox guidelines to use the Promise-based WebExtension/BrowserExt API being standardized by the [W3 Browser Extensions](https://www.w3.org/community/browserext/) group, and is using [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) to provide a **cross-browser compatibility** with no changes.\
Therefore, this repository has a **single branch for all browsers**.

## Usage
You can choose between these 2 methods to configure GHunt through the Companion extension :
- Method 1 (fastest) => It gets the needed cookies, and send it to GHunt (who should be in listening on port 60067).
- Method 2 => It gets the needed cookies, encodes them in base64 and puts them into your clipboard.

## Screenshot
![Screenshot](https://files.catbox.moe/qup8d7.png)

## Installation

[![Firefox](https://files.catbox.moe/5g2ld5.png)](https://addons.mozilla.org/fr/firefox/addon/ghunt-companion/)&nbsp;&nbsp;&nbsp;[![Chrome](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png)](https://chrome.google.com/webstore/detail/ghunt-companion/dpdcofblfbmmnikcbmmiakkclocadjab)

*For Opera users, addons reviewers [seems dead](https://forums.opera.com/topic/16609/very-long-extension-moderation-process/229) so you should use the Chrome Web Store.*
