var headers = {};

chrome.webRequest.onHeadersReceived.addListener(function(details) {
	var header = new HttpHeader(details.responseHeaders);
	if(header.get('yii_web')) {
		headers[details.url] = header;
	}
},{urls: ["<all_urls>"]},["responseHeaders"]);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	if( message.action ) {
		switch(message.action) {
			case 'get-header':
			return sendResponse(headers[message.url]);
			default: return sendResponse(null);
		}
	}
	else return sendResponse(null);
});

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