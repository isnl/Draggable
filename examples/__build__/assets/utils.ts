declare const window: any;

export function addCssByLink(url: string) {
	let doc = document;
	let link = doc.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', url);

	let heads = doc.getElementsByTagName('head');
	if (heads.length) heads[0].appendChild(link);
	else doc.documentElement.appendChild(link);
}

export function loadJs(url: string, callback: Function) {
	let script: any = document.createElement('script');
	script.type = 'text/javascript';
	if (typeof callback != 'undefined') {
		if (script.readyState) {
			script.onreadystatechange = function() {
				if (script.readyState == 'loaded' || script.readyState == 'complete') {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function() {
				callback();
			};
		}
	}
	script.src = url;
	document.body.appendChild(script);
}

export function getBrowser() {
	let ua = window.navigator.userAgent;
	let isIE = window['ActiveXObject'] != undefined && ua.indexOf('MSIE') != -1;
	let isFirefox = ua.indexOf('Firefox') != -1;
	let isOpera = window['opr'] != undefined;
	let isChrome = ua.indexOf('Chrome') && window['chrome'];
	let isSafari = ua.indexOf('Safari') != -1 && ua.indexOf('Version') != -1;
	if (isIE) {
		return 'IE';
	} else if (isFirefox) {
		return 'Firefox';
	} else if (isOpera) {
		return 'Opera';
	} else if (isChrome) {
		return 'Chrome';
	} else if (isSafari) {
		return 'Safari';
	} else {
		return 'Unkown';
	}
}

export function IsPC() {
	return ![ 'Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod' ].some(
		(item) => navigator.userAgent.indexOf(item) > 0
	);
}
