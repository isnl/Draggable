"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addCssByLink(url) {
    var doc = document;
    var link = doc.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', url);
    var heads = doc.getElementsByTagName('head');
    if (heads.length)
        heads[0].appendChild(link);
    else
        doc.documentElement.appendChild(link);
}
exports.addCssByLink = addCssByLink;
function loadJs(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (typeof callback != 'undefined') {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        }
        else {
            script.onload = function () {
                callback();
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}
exports.loadJs = loadJs;
function getBrowser() {
    var ua = window.navigator.userAgent;
    var isIE = window['ActiveXObject'] != undefined && ua.indexOf('MSIE') != -1;
    var isFirefox = ua.indexOf('Firefox') != -1;
    var isOpera = window['opr'] != undefined;
    var isChrome = ua.indexOf('Chrome') && window['chrome'];
    var isSafari = ua.indexOf('Safari') != -1 && ua.indexOf('Version') != -1;
    if (isIE) {
        return 'IE';
    }
    else if (isFirefox) {
        return 'Firefox';
    }
    else if (isOpera) {
        return 'Opera';
    }
    else if (isChrome) {
        return 'Chrome';
    }
    else if (isSafari) {
        return 'Safari';
    }
    else {
        return 'Unkown';
    }
}
exports.getBrowser = getBrowser;
function IsPC() {
    return !['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'].some(function (item) { return navigator.userAgent.indexOf(item) > 0; });
}
exports.IsPC = IsPC;
