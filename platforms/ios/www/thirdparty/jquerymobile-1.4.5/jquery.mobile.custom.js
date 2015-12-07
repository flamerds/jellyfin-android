!function(e,t,a){a(e.jQuery,e,t)}(this,document,function(e,t,a,i){e.mobile={},function(e){function t(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}e.extend(e.mobile,{behaviors:{},getClosestBaseUrl:function(a){var i=t(a,"ui-page"),r=i?i.getAttribute("data-url"):null,n=e.mobile.path.documentBase.hrefNoHash;return r&&e.mobile.path.isPath(r)||(r=n),e.mobile.path.makeUrlAbsolute(r,n)}}),e.fn.extend({enhanceWithin:function(){var t,a={},i=this;e.each(e.mobile.widgets,function(t,r){if(r.initSelector){var n=i[0].querySelectorAll(r.initSelector);n.length>0&&(a[r.prototype.widgetName]=e(n))}});for(t in a)a[t][t]();return this}})}(e,this),function(e){{var a;e(t)}e.event.special.navigate=a={bound:!1,popstate:function(a){var i=a.state||{};setTimeout(function(){a.historyState&&e.extend(i,a.historyState),t.dispatchEvent(new CustomEvent("navigate",{detail:{state:i,originalEvent:a}}))},0)}},t.addEventListener("popstate",a.popstate)}(e),e.mobile.widgets={},e(a).on("create",function(t){e(t.target).enhanceWithin()}),function(e,a){var i,r;e.mobile.path=i={uiStateKey:"&ui-state",urlParseRE:/^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,getLocation:function(e){var t=this.parseUrl(e||location.href),a=e?t:location,i=t.hash;return i="#"===i?"":i,a.protocol+t.doubleSlash+a.host+(""!==a.protocol&&"/"!==a.pathname.substring(0,1)?"/":"")+a.pathname+a.search+i},getDocumentUrl:function(t){return t?e.extend({},i.documentUrl):i.documentUrl.href},parseLocation:function(){return this.parseUrl(this.getLocation())},parseUrl:function(t){if("object"===e.type(t))return t;var a=i.urlParseRE.exec(t||"")||[];return{href:a[0]||"",hrefNoHash:a[1]||"",hrefNoSearch:a[2]||"",domain:a[3]||"",protocol:a[4]||"",doubleSlash:a[5]||"",authority:a[6]||"",username:a[8]||"",password:a[9]||"",host:a[10]||"",hostname:a[11]||"",port:a[12]||"",pathname:a[13]||"",directory:a[14]||"",filename:a[15]||"",search:a[16]||"",hash:a[17]||""}},makePathAbsolute:function(e,t){var a,i,r,n;if(e&&"/"===e.charAt(0))return e;for(e=e||"",t=t?t.replace(/^\/|(\/[^\/]*|[^\/]+)$/g,""):"",a=t?t.split("/"):[],i=e.split("/"),r=0;r<i.length;r++)switch(n=i[r]){case".":break;case"..":a.length&&a.pop();break;default:a.push(n)}return"/"+a.join("/")},isSameDomain:function(e,t){return i.parseUrl(e).domain.toLowerCase()===i.parseUrl(t).domain.toLowerCase()},isRelativeUrl:function(e){return""===i.parseUrl(e).protocol},isAbsoluteUrl:function(e){return""!==i.parseUrl(e).protocol},makeUrlAbsolute:function(e,t){if(!i.isRelativeUrl(e))return e;t===a&&(t=this.documentBase);var r=i.parseUrl(e),n=i.parseUrl(t),o=r.protocol||n.protocol,s=r.protocol?r.doubleSlash:r.doubleSlash||n.doubleSlash,h=r.authority||n.authority,l=""!==r.pathname,c=i.makePathAbsolute(r.pathname||n.filename,n.pathname),u=r.search||!l&&n.search||"",d=r.hash;return o+s+h+c+u+d},convertUrlToDataUrl:function(e){var a=e,r=i.parseUrl(e);return i.isEmbeddedPage(r)?a=r.hash.replace(/^#/,"").replace(/\?.*$/,""):i.isSameDomain(r,this.documentBase)&&(a=r.hrefNoHash.replace(this.documentBase.domain,"")),t.decodeURIComponent(a)},get:function(e){return e===a&&(e=i.parseLocation().hash),i.stripHash(e).replace(/[^\/]*\.[^\/*]+$/,"")},set:function(e){location.hash=e},isPath:function(e){return/\//.test(e)},clean:function(e){return e.replace(this.documentBase.domain,"")},stripHash:function(e){return e.replace(/^#/,"")},stripQueryParams:function(e){return e.replace(/\?.*$/,"")},cleanHash:function(e){return i.stripHash(e.replace(/\?.*$/,""))},isHashValid:function(e){return/^#[^#]+$/.test(e)},isExternal:function(e){var t=i.parseUrl(e);return!(!t.protocol||t.domain.toLowerCase()===this.documentUrl.domain.toLowerCase())},hasProtocol:function(e){return/^(:?\w+:)/.test(e)},isEmbeddedPage:function(e){var t=i.parseUrl(e);return""!==t.protocol?!this.isPath(t.hash)&&t.hash&&(t.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&t.hrefNoHash===this.documentBase.hrefNoHash):/^#/.test(t.href)},squash:function(e,t){var a,r,n,o,s,h=this.isPath(e),l=this.parseUrl(e),c=l.hash,u="";return t||(h?t=i.getLocation():(s=i.getDocumentUrl(!0),t=i.isPath(s.hash)?i.squash(s.href):s.href)),r=h?i.stripHash(e):e,r=i.isPath(l.hash)?i.stripHash(l.hash):r,o=r.indexOf(this.uiStateKey),o>-1&&(u=r.slice(o),r=r.slice(0,o)),a=i.makeUrlAbsolute(r,t),n=this.parseUrl(a).search,h?((i.isPath(c)||0===c.replace("#","").indexOf(this.uiStateKey))&&(c=""),u&&-1===c.indexOf(this.uiStateKey)&&(c+=u),-1===c.indexOf("#")&&""!==c&&(c="#"+c),a=i.parseUrl(a),a=a.protocol+a.doubleSlash+a.host+a.pathname+n+c):a+=a.indexOf("#")>-1?u:"#"+u,a},isPreservableHash:function(e){return 0===e.replace("#","").indexOf(this.uiStateKey)},hashToSelector:function(e){var t="#"===e.substring(0,1);return t&&(e=e.substring(1)),(t?"#":"")+e.replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g,"\\$1")},isFirstPageUrl:function(t){var r=i.parseUrl(i.makeUrlAbsolute(t,this.documentBase)),n=r.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&r.hrefNoHash===this.documentBase.hrefNoHash,o=e.mobile.firstPage,s=o&&o[0]?o[0].id:a;return n&&(!r.hash||"#"===r.hash||s&&r.hash.replace(/^#/,"")===s)}},i.documentUrl=i.parseLocation(),r=e("head").find("base"),i.documentBase=r.length?i.parseUrl(i.makeUrlAbsolute(r.attr("href"),i.documentUrl.href)):i.documentUrl,i.documentBaseDiffers=i.documentUrl.hrefNoHash!==i.documentBase.hrefNoHash,i.getDocumentBase=function(t){return t?e.extend({},i.documentBase):i.documentBase.href},e.extend(e.mobile,{getDocumentUrl:i.getDocumentUrl,getDocumentBase:i.getDocumentBase})}(e),function(e,t){e.mobile.History=function(e,t){this.stack=e||[],this.activeIndex=t||0},e.extend(e.mobile.History.prototype,{getActive:function(){return this.stack[this.activeIndex]},getLast:function(){return this.stack[this.previousIndex]},getNext:function(){return this.stack[this.activeIndex+1]},getPrev:function(){return this.stack[this.activeIndex-1]},add:function(e,t){t=t||{},this.getNext()&&this.clearForward(),t.hash&&-1===t.hash.indexOf("#")&&(t.hash="#"+t.hash),t.url=e,this.stack.push(t),this.activeIndex=this.stack.length-1},clearForward:function(){this.stack=this.stack.slice(0,this.activeIndex+1)},find:function(e,t,a){t=t||this.stack;var i,r,n,o=t.length;for(r=0;o>r;r++)if(i=t[r],(decodeURIComponent(e)===decodeURIComponent(i.url)||decodeURIComponent(e)===decodeURIComponent(i.hash))&&(n=r,a))return n;return n},closest:function(e){var a,i=this.activeIndex;return a=this.find(e,this.stack.slice(0,i)),a===t&&(a=this.find(e,this.stack.slice(i),!0),a=a===t?a:a+i),a},direct:function(a){var i=this.closest(a.url),r=this.activeIndex;i!==t&&(this.activeIndex=i,this.previousIndex=r),r>i?(a.present||a.back||e.noop)(this.getActive(),"back"):i>r?(a.present||a.forward||e.noop)(this.getActive(),"forward"):i===t&&a.missing&&a.missing(this.getActive())}})}(e),function(e){var i=e.mobile.path,r=location.href;e.mobile.Navigator=function(a){this.history=a,this.ignoreInitialHashChange=!0,t.addEventListener("popstate",e.proxy(this.popstate,this))},e.extend(e.mobile.Navigator.prototype,{squash:function(r,n){var o,s,h=i.isPath(r)?i.stripHash(r):r;return s=i.squash(r),o=e.extend({hash:h,url:s},n),t.history.replaceState(o,o.title||a.title,s),o},hash:function(e,t){var a,r,n,o;return a=i.parseUrl(e),r=i.parseLocation(),r.pathname+r.search===a.pathname+a.search?n=a.hash?a.hash:a.pathname+a.search:i.isPath(e)?(o=i.parseUrl(t),n=o.pathname+o.search+(i.isPreservableHash(o.hash)?o.hash.replace("#",""):"")):n=e,n},go:function(r,n,o){var s,h,l;h=i.squash(r),l=this.hash(r,h),o&&l!==i.stripHash(i.parseLocation().hash)&&(this.preventNextHashChange=o),this.preventHashAssignPopState=!0,t.location.hash=l,this.preventHashAssignPopState=!1,s=e.extend({url:h,hash:l,title:a.title},n),this.squash(r,s),o||(this.ignorePopState=!0,t.dispatchEvent(new CustomEvent("popstate",{detail:{originalEvent:{type:"popstate",state:null}}}))),this.history.add(s.url,s)},popstate:function(t){var a,n;if(this.preventHashAssignPopState)return this.preventHashAssignPopState=!1,void t.stopImmediatePropagation();if(this.ignorePopState)return void(this.ignorePopState=!1);var o=t.state||(t.detail?t.detail.originalEvent.state:t.state);return!o&&1===this.history.stack.length&&this.ignoreInitialHashChange&&(this.ignoreInitialHashChange=!1,location.href===r)?void t.preventDefault():(a=i.parseLocation().hash,!o&&a?(n=this.squash(a),this.history.add(n.url,n),void(t.historyState=n)):void this.history.direct({url:(o||{}).url||a,present:function(a,i){t.historyState=e.extend({},a),t.historyState.direction=i}}))}})}(e),function(e){e.mobile.navigate=function(t,a,i){e.mobile.navigate.navigator.go(t,a,i)},e.mobile.navigate.history=new e.mobile.History,e.mobile.navigate.navigator=new e.mobile.Navigator(e.mobile.navigate.history);var t=e.mobile.path.parseLocation();e.mobile.navigate.history.add(t.href,{hash:t.hash})}(e),function(e,i){function r(t){var a=this;t.hasPage||(t.hasPage=!0,t.dispatchEvent(new CustomEvent("pagecreate",{bubbles:!0})),a.element=e(t),a.options={theme:t.getAttribute("data-theme")||"a"},a._enhance=function(){var e="data-",t=a.element[0];t.setAttribute("data-role","page"),t.setAttribute("tabindex","0"),t.classList.add("ui-page"),t.classList.add("ui-page-theme-"+a.options.theme);for(var r=t.querySelectorAll("div[data-role='content']"),n=0,o=r.length;o>n;n++){var s=r[n],h=s.getAttribute(e+"theme")||i;a.options.contentTheme=h||a.options.contentTheme||a.options.dialog&&a.options.theme||"dialog"===a.element.data("role")&&a.options.theme,s.classList.add("ui-content"),a.options.contentTheme&&s.classList.add("ui-body-"+a.options.contentTheme),s.setAttribute("role","main"),s.classList.add("ui-content")}},a._enhance(),a.element.enhanceWithin(),t.dispatchEvent(new CustomEvent("pageinit",{bubbles:!0})))}function n(n){var s=this;s.element=n,s.initSelector=!1,t.addEventListener("navigate",function(t){var a;if(!t.defaultPrevented){var i=t.detail.originalEvent;if(!i||!i.defaultPrevented){var r=t.detail;a=i.type.indexOf("hashchange")>-1?r.state.hash:r.state.url,a||(a=e.mobile.path.parseLocation().hash),a&&"#"!==a&&0!==a.indexOf("#"+e.mobile.path.uiStateKey)||(a=location.href),s._handleNavigate(a,r.state)}}}),s.back=function(){s.go(-1)},s.forward=function(){s.go(1)},s.go=function(e){t.history.go(e)},s._handleDestination=function(t){return"string"===e.type(t)&&(t=e.mobile.path.stripHash(t)),t&&(t=e.mobile.path.isPath(t)?t:e.mobile.path.makeUrlAbsolute("#"+t,e.mobile.path.documentBase)),t||e.mobile.firstPage},s._handleNavigate=function(t,a){var i=e.mobile.path.stripHash(t),r={changeHash:!1,fromHashChange:!0,reverse:"back"===a.direction};e.extend(r,a,{transition:"none"}),e.mobile.changePage(s._handleDestination(i),r)},s._enhance=function(e){new r(e[0])},s._include=function(e,t,a){t.appendTo(s.element),s._enhance(t,a.role)},s._find=function(t){var a,i=t,r=s._createDataUrl(t),n=e.mobile.firstPage;return a=s.element[0].querySelector("[data-url='"+e.mobile.path.hashToSelector(r)+"']"),a||!r||e.mobile.path.isPath(r)||(a=s.element[0].querySelector(e.mobile.path.hashToSelector("#"+r)),a&&e(a).attr("data-url",r).data("url",r)),!a&&e.mobile.path.isFirstPageUrl(i)&&n&&n.parent().length&&(a=n),a?e(a):e()},s._parse=function(t,i){var r,n=a.createElement("div");return n.innerHTML=t,r=n.querySelector("div[data-role='page']"),r||(r=e("<div data-role='page'>"+(t.split(/<\/?body[^>]*>/gim)[1]||"")+"</div>")[0]),r.setAttribute("data-url",s._createDataUrl(i)),r.setAttribute("data-external-page",!0),r},s._setLoadedTitle=function(e,t){if(!e.data("title")){var a=t.match(/<title[^>]*>([^<]*)/)&&RegExp.$1;a&&e.data("title",a)}},s._createDataUrl=function(t){return e.mobile.path.convertUrlToDataUrl(t)},s._triggerWithDeprecated=function(e,t,a){(a||this.element)[0].dispatchEvent(new CustomEvent("page"+e,{bubbles:!0,detail:{data:t}}))},s._loadSuccess=function(t,a,i){var r=t,n=s;return function(s,h){h&&"boolean"==typeof h||(e.mobile.filterHtml&&(s=e.mobile.filterHtml(s)),-1==t.toLowerCase().indexOf("/configurationpage?")&&(o[t.split("?")[0]]=s));var l=n._parse(s,r),c=e(l);n._setLoadedTitle(c,s);var u=l.getAttribute("data-require");u=u?u.split(","):null,l.classList.contains("type-interior")&&(u=u||[],u.push("jqmpopup"),u.push("jqmlistview"),u.push("jqmcollapsible"),u.push("jqmcontrolgroup"),u.push("jqmcheckbox"),u.push("scripts/notifications")),require(u,function(){n._include(l,c,a),i.resolve(t,a,c)})}},s._loadDefaults={type:"get",data:i,reloadPage:!1,reload:!1,role:i},s.load=function(t,a){var i=a&&a.deferred||e.Deferred(),r=e.extend({},s._loadDefaults,a),n=e.mobile.path.makeUrlAbsolute(t,s._findBaseWithDefault()),h=s._find(n);if(0===h.length&&e.mobile.path.isEmbeddedPage(n)&&!e.mobile.path.isFirstPageUrl(n))return i.reject(n,r),i.promise();if(h.length&&!r.reload)return s._enhance(h,r.role),i.resolve(n,r,h),i.promise();var l=s._loadSuccess(n,r,i),c=o[n.split("?")[0]];if(c)return l(c,!0),i.promise();var u=new XMLHttpRequest;return u.open("GET",n,!0),u.onload=function(){l(this.response)},u.send(),i.promise()},s._triggerCssTransitionEvents=function(t,a,i){i=i||"",a&&s._triggerWithDeprecated(i+"hide",{nextPage:t,toPage:t,prevPage:a,samePage:t[0]===a[0]},a),!i&&browserInfo.msie?setTimeout(function(){s._triggerWithDeprecated(i+"show",{prevPage:a||e(""),toPage:t},t)},50):s._triggerWithDeprecated(i+"show",{prevPage:a||e(""),toPage:t},t)},s._cssTransition=function(e,t){if(s._triggerCssTransitionEvents(e,t,"before"),t){t[0].style.display="none";for(var a=s.element[0].childNodes,i=0,r=a.length;r>i;i++){var n=a[i];n.getAttribute&&"page"==n.getAttribute("data-role")&&(n.style.display="none")}}var o=e[0];o.style.display="block",s._triggerCssTransitionEvents(e,t)},s.change=function(t,a){var i=e.extend({},e.mobile.changePage.defaults,a),r={};i.fromPage=i.fromPage||s.activePage,r.prevPage=s.activePage,e.extend(r,{toPage:t,options:i}),"string"===e.type(t)?(r.absUrl=e.mobile.path.makeUrlAbsolute(t,s._findBaseWithDefault()),i.target=t,i.deferred=e.Deferred(),s.load(t,i),i.deferred.then(e.proxy(function(e,t,a){t.absUrl=r.absUrl,s.transition(a,r,t)},s))):(r.absUrl=i.absUrl,s.transition(t,r,i))},s.transition=function(t,i,n){var o,h,l,c,u,d,p,m,g,f;return i.prevPage=n.fromPage,t[0]!==e.mobile.firstPage[0]||n.dataUrl||(n.dataUrl=e.mobile.path.documentUrl.hrefNoHash),o=n.fromPage,h=n.dataUrl&&e.mobile.path.convertUrlToDataUrl(n.dataUrl)||t.data("url"),l=h,c=h,u=e.mobile.navigate.history.getActive(),d=0,p=a.title,o&&o[0]===t[0]?(s._triggerWithDeprecated("transition",i),s._triggerWithDeprecated("change",i),void(n.fromHashChange&&e.mobile.navigate.history.direct({url:h}))):(new r(t[0]),n.fromHashChange&&(d="back"===n.direction?-1:1),m=!1,g=u?t.data("title"):p,g&&p===a.title&&(p=g),t.data("title")||t.data("title",p),!d&&m&&(e.mobile.navigate.history.getActive().pageUrl=l),h&&!n.fromHashChange&&(!e.mobile.path.isPath(h)&&h.indexOf("#")<0&&(h="#"+h),f={title:p,pageUrl:l,role:n.role},e.mobile.navigate(encodeURI(h),f,!0)),a.title=p,e.mobile.activePage=t,s.activePage=t,n.reverse=n.reverse||0>d,void s._cssTransition(t,o,{transition:n.transition,reverse:n.reverse}))},s._findBaseWithDefault=function(){var t=s.activePage&&e.mobile.getClosestBaseUrl(s.activePage[0]);return t||e.mobile.path.documentBase.hrefNoHash}}var o={};e.mobile.pageContainerBuilder=n}(e),function(e,t){function i(e,t){for(;e.tagName!=t;)if(e=e.parentNode,!e)return null;return e}var r=e.mobile.path.documentUrl;e.mobile.changePage=function(t,a){e.mobile.pageContainer.change(t,a)},e.mobile.changePage.defaults={reverse:!1,changeHash:!0,fromHashChange:!1,role:t,duplicateCachedPage:t,pageContainer:t,dataUrl:t,fromPage:t},e.mobile._registerInternalEvents=function(){function n(e){e.parentNode.removeChild(e)}function o(e){var t=a.querySelectorAll("div[data-role='page']");t.length<5;for(var i=0,r=t.length;r>i;i++){var o=t[i];o!=e&&n(o)}}a.addEventListener("click",function(a){var n=i(a.target,"A"),o=e(n);if(n&&!(a.which>1)){if("back"==n.getAttribute("data-rel"))return e.mobile.pageContainer.back(),!1;var s=e.mobile.getClosestBaseUrl(n),h=e.mobile.path.makeUrlAbsolute(n.getAttribute("href")||"#",s);if(!(-1===h.search("#")||e.mobile.path.isExternal(h)&&e.mobile.path.isAbsoluteUrl(h))){if(h=h.replace(/[^#]*#/,""),!h)return void a.preventDefault();h=e.mobile.path.isPath(h)?e.mobile.path.makeUrlAbsolute(h,s):e.mobile.path.makeUrlAbsolute("#"+h,r.hrefNoHash)}if("external"!=n.getAttribute("rel")&&"false"!=n.getAttribute("data-ajax")&&!n.getAttribute("target")&&!e.mobile.path.isExternal(h)){var l="reverse"===o.data("direction"),c=n.getAttribute("data-rel")||t;e.mobile.changePage(h,{reverse:l,role:c,link:o}),a.preventDefault()}}}),a.addEventListener("pagehide",function(e){var t=e.detail.data,a=t.toPage?t.toPage[0]:null;a&&(a.getAttribute("data-dom-cache")?o(a):-1!=(a.getAttribute("data-url")||"").toLowerCase().indexOf("/configurationpage")&&o(a))})}}(e),e.mobile.initializePage=function(){var e=$.mobile.path,t=a.querySelector("div[data-role='page']"),r=e.stripHash(e.stripQueryParams(e.parseLocation().hash)),n=$.mobile.path.parseLocation(),o=r?a.getElementById(r):i;t&&(t.getAttribute("data-url")||t.setAttribute("data-url",t.getAttribute("id")||e.convertUrlToDataUrl(n.pathname+n.search))),$.mobile.firstPage=$(t),$.mobile.pageContainer=new $.mobile.pageContainerBuilder($.mobile.firstPage.parent().addClass("ui-mobile-viewport")),$.mobile._registerInternalEvents(),$.mobile.path.isHashValid(location.hash)&&($(o).is("[data-role='page']")||$.mobile.path.isPath(r))?($.mobile.navigate.history.stack=[],$.mobile.navigate($.mobile.path.isPath(location.hash)?location.hash:location.href)):($.mobile.navigate.navigator.squash(e.parseLocation().href),$.mobile.changePage($.mobile.firstPage,{reverse:!0,changeHash:!1,fromHashChange:!0}))},e.fn.selectmenu=function(){return this}});