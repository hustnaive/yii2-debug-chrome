if(document.cookie.indexOf('YII_DEBUG_TAG') >= 0) {
	var tag = getCookie('YII_DEBUG_TAG');
	if(!document.location.pathname.startsWith('/debug/default')) {
		showToolBar(tag);
	}
}

function getCookie(name){
    var result = null;
	//对cookie信息进行相应的处理，方便搜索
	var myCookie = document.cookie+";"; 
	var searchName = name+"=";
	var startOfCookie = myCookie.indexOf(searchName);
	var endOfCookie;
	if(startOfCookie != -1){
		startOfCookie += searchName.length;
		endOfCookie = myCookie.indexOf(";",startOfCookie);
		result = (myCookie.substring(startOfCookie,endOfCookie));
	}
	return result;
}

function getDoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}

function getToolBar() {
	return getDoc(function(){/*
<div id="yii-debug-toolbar" data-url="/debug/default/toolbar?tag=" style="display:none"></div>
<style>#yii-debug-toolbar {
    padding: 0;
    font: 11px Verdana, Arial, sans-serif;
    text-align: left;
    min-height: 40px;
    overflow: auto;
    background: rgb(246,246,246);
    background: -moz-linear-gradient(top,  rgba(237,237,237,1) 0%, rgba(246,246,246,1) 53%, rgba(255,255,255,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(237,237,237,1)), color-stop(53%,rgba(246,246,246,1)), color-stop(100%,rgba(255,255,255,1)));
    background: -webkit-linear-gradient(top,  rgba(237,237,237,1) 0%,rgba(246,246,246,1) 53%,rgba(255,255,255,1) 100%);
    background: -o-linear-gradient(top,  rgba(237,237,237,1) 0%,rgba(246,246,246,1) 53%,rgba(255,255,255,1) 100%);
    background: -ms-linear-gradient(top,  rgba(237,237,237,1) 0%,rgba(246,246,246,1) 53%,rgba(255,255,255,1) 100%);
    background: linear-gradient(to bottom,  rgba(237,237,237,1) 0%,rgba(246,246,246,1) 53%,rgba(255,255,255,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ededed', endColorstr='#ffffff',GradientType=0 );
    background: rgb(246,246,246) url(data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAoCAYAAAA/tpB3AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94BBQwuINct3v0AAAAjSURBVAjXY3j79u1/JgYGBgYkgpGRkYEYMSpKUGLK+/fvGQAaDAb6F86IsAAAAABJRU5ErkJggg==);
    direction: ltr;
}

.yii-debug-toolbar-top {
    margin: 0 0 20px 0;
    border-bottom: 1px solid #e4e4e4;
}

.yii-debug-toolbar-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    z-index: 1000000;
    border-top: 1px solid #ccc;
}

.yii-debug-toolbar-block {
    float: left;
    margin: 0;
    border-right: 1px solid #e4e4e4;
    padding: 4px 8px;
    line-height: 32px;
    white-space: nowrap;
}

.yii-debug-toolbar-block a {
    text-decoration: none;
    color: black;
}

.yii-debug-toolbar-block span {
}

.yii-debug-toolbar-block img {
    vertical-align: middle;
}

#yii-debug-toolbar .label {
    display: inline-block;
    padding: 2px 4px;
    font-size: 11.844px;
    font-weight: normal;
    line-height: 14px;
    color: #ffffff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    white-space: nowrap;
    vertical-align: baseline;
    background-color: #999999;
}

#yii-debug-toolbar .label {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}

#yii-debug-toolbar .label:empty {
    display: none;
}

#yii-debug-toolbar a.label:hover,
#yii-debug-toolbar a.label:focus {
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
}

#yii-debug-toolbar .label-important {
    background-color: #b94a48;
}

#yii-debug-toolbar .label-important[href] {
    background-color: #953b39;
}

#yii-debug-toolbar .label-warning,
#yii-debug-toolbar .badge-warning {
    background-color: #f89406;
}

#yii-debug-toolbar .label-warning[href] {
    background-color: #c67605;
}

#yii-debug-toolbar .label-success {
    background-color: #468847;
}

#yii-debug-toolbar .label-success[href] {
    background-color: #356635;
}

#yii-debug-toolbar .label-info {
    background-color: #3a87ad;
}

#yii-debug-toolbar .label-info[href] {
    background-color: #2d6987;
}

#yii-debug-toolbar .label-inverse,
#yii-debug-toolbar .badge-inverse {
    background-color: #333333;
}

#yii-debug-toolbar .label-inverse[href],
#yii-debug-toolbar .badge-inverse[href] {
    background-color: #1a1a1a;
}

.yii-debug-toolbar-toggler {
    cursor: pointer;
    position: absolute;
    right: 10px;
    bottom: 4px;
    width: 15px;
    height: 30px;
    font-size: 25px;
    font-weight: 100;
    line-height: 28px;
    color: #ffffff;
    text-align: center;
    background: #666666;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    opacity: 0.5;
    filter: alpha(opacity=50);
}

.yii-debug-toolbar-toggler:hover,
.yii-debug-toolbar-toggler:focus {
    color: #ffffff;
    text-decoration: none;
    opacity: 0.9;
    filter: alpha(opacity=90);
}

#yii-debug-toolbar-min {
    display: none;
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    z-index: 1000000;
    font: 11px Verdana, Arial, sans-serif;
    text-align: left;
    width: 63px;
    height: 38px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    -webkit-border-top-left-radius: 6px;
    -moz-border-top-left-radius: 6px;
    border-top-left-radius: 6px;
    background: rgb(237,237,237);
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2VkZWRlZCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUzJSIgc3RvcC1jb2xvcj0iI2Y2ZjZmNiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
    background: -moz-linear-gradient(top,  rgba(237,237,237,1) 0%, rgba(246,246,246,1) 53%, rgba(255,255,255,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(237,237,237,1)), color-stop(53%,rgba(246,246,246,1)), color-stop(100%,rgba(255,255,255,1)));
    background: -webkit-linear-gradient(top,  rgba(237,237,237,1) 0%,rgba(246,246,246,1) 53%,rgba(255,255,255,1) 100%);
    background: -o-linear-gradient(top,  rgba(237,237,237,1) 0%,rgba(246,246,246,1) 53%,rgba(255,255,255,1) 100%);
    background: -ms-linear-gradient(top,  rgba(237,237,237,1) 0%,rgba(246,246,246,1) 53%,rgba(255,255,255,1) 100%);
    background: linear-gradient(to bottom,  rgba(237,237,237,1) 0%,rgba(246,246,246,1) 53%,rgba(255,255,255,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ededed', endColorstr='#ffffff',GradientType=0 );
}

#yii-debug-toolbar-logo {
    position: fixed;
    right: 31px;
    bottom: 4px;
}
</style>
 */});
}

function showToolBar(tag) {
	var toolar = document.createElement("div");
	toolar.innerHTML = getToolBar();
	document.body.appendChild(toolar);
	
	var ajax = function (url, settings) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        settings = settings || {};
        xhr.open(settings.method || 'GET', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Accept', 'text/html');
        xhr.onreadystatechange = function (state) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 && settings.success) {
                    settings.success(xhr);
                } else if (xhr.status != 200 && settings.error) {
                    settings.error(xhr);
                }
            }
        };
        xhr.send(settings.data || '');
    };

    var e = document.getElementById('yii-debug-toolbar');
    if (e) {
        e.style.display = 'block';
        var url = e.getAttribute('data-url')+tag;
        ajax(url, {
            success: function (xhr) {
                var div = document.createElement('div');
                div.innerHTML = xhr.responseText;
                e.parentNode.replaceChild(div, e);
                if (window.localStorage) {
                    var pref = localStorage.getItem('yii-debug-toolbar');
                    if (pref == 'minimized') {
                        document.getElementById('yii-debug-toolbar').style.display = 'none';
                        document.getElementById('yii-debug-toolbar-min').style.display = 'block';
                    }
                }
            },
            error: function (xhr) {
                e.innerHTML = xhr.responseText;
            }
        });
    }
}