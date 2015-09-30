var headers = {};
var yii_debug_auth = localStorage['yii_debug_auth'] || 'abc';
var toggle_xhprof = 0;

chrome.webRequest.onHeadersReceived.addListener(function(details) {
	var header = new HttpHeader(details.responseHeaders);
	if(header.get('yii-web')) {
		headers[details.url.split('#')[0]] = header;
	}
},{urls: ["<all_urls>"]},["responseHeaders"]);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	if( message.action ) {
		switch(message.action) {
			case 'get-header':
			return sendResponse(headers[message.url]);
			case 'set-auth':
			yii_debug_auth = message.auth;
			localStorage['yii_debug_auth'] = yii_debug_auth;
			return sendResponse(yii_debug_auth);
			case 'get-auth':
			return sendResponse(yii_debug_auth);
			case 'toggle-xhprof':
			toggle_xhprof = 1 - toggle_xhprof;
			return sendResponse(toggle_xhprof);
			default: return sendResponse(null);
		}
	}
	else return sendResponse(null);
});

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
        
		var header = new HttpHeader(details.requestHeaders);
		header.set('yii-debug-auth',yii_debug_auth);
		header.set('xhprof-enabled',toggle_xhprof + '');
		console.log(header.headers);
        return {requestHeaders: header.headers};
}, 
{
    urls: ["<all_urls>"],
    types: [ "main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
}, 
["blocking", "requestHeaders"]);

function HttpHeader(headers) {
	this.headers = headers;
}

HttpHeader.prototype.get = function(name) {
	for(var i in this.headers) {
		if(this.headers[i].name.toLowerCase() == name.toLowerCase()) {
			return this.headers[i].value;
		}
	}
	return null;
}

HttpHeader.prototype.set = function(k,v) {
	for(var i in this.headers) {
		if(this.headers[i].name.toLowerCase() == k.toLowerCase()) {
			this.headers[i].value = v;
			return true;
		}
	}
	this.headers.push({name:k,value:v});
}