define([],function(){function t(t,n,r){for(;r?t.getAttribute(n)!=r:!t.getAttribute(n);)if(t=t.parentNode,!t||!t.getAttribute)return null;return t}function n(t,n){for(;t.tagName!=n;)if(t=t.parentNode,!t)return null;return t}function r(t,n){for(;!t.classList||!t.classList.contains(n);)if(t=t.parentNode,!t)return null;return t}return{parentWithAttribute:t,parentWithClass:r,parentWithTag:n}});