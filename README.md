# GHunt Companion
Load all needed cookies to use GHunt peacefully, fast.

The development of this extension has followed Firefox guidelines to use the Promise-based WebExtension/BrowserExt API being standardized by the [W3 Browser Extensions](https://www.w3.org/community/browserext/) group, and is using [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) to provide a **cross-browser compatibility** with no changes.\
Therefore, this repository has a **single branch for all browsers**.

## Usage
You can choose between these 2 methods to configure GHunt through the Companion extension :
- Method 1 (fastest) => It gets the needed cookies, and send it to GHunt (who should be in listening on port 60067).
- Method 2 => It gets the needed cookies, encodes them in base64 and puts them into your clipboard.

## Screenshot
![Screenshot](https://files.catbox.moe/z3zm6a.png)

## Installation

[![Firefox](https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/addons/files/2015/11/get-the-addon.png)](https://addons.mozilla.org/fr/firefox/addon/ghunt-companion/)&nbsp;&nbsp;&nbsp;[![Chrome](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png)](https://chrome.google.com/webstore/detail/ghunt-companion/dpdcofblfbmmnikcbmmiakkclocadjab)&nbsp;&nbsp;&nbsp;[![Edge](https://user-images.githubusercontent.com/11660256/111323589-4f4c7c00-866a-11eb-80ff-da7de777d7c0.png)](https://microsoftedge.microsoft.com/addons/detail/ghunt-companion/jhgmpcigklnbjglpipnbnjhdncoihhdj)

*For Opera users, addons reviewers [seems dead](https://forums.opera.com/topic/16609/very-long-extension-moderation-process/255) so you should use the Chrome Web Store.*
