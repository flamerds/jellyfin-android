!function(e){function t(e){if(AppInfo.isNativeApp&&browserInfo.safari)switch(e){case 0:return d;case 1:return"resume";case 2:return"nextup";case 3:return"latestmovies";case 4:return"latestepisodes";case 5:return"latesttvrecordings";default:return""}switch(e){case 0:return d;case 1:return"resume";case 2:return"latestmedia";case 3:return"latesttvrecordings";default:return""}}function r(e,r,a,s){var i=r.Id,o=a.CustomPrefs["home"+s]||t(s);"folders"==o&&(o=d);var n="0"!=a.CustomPrefs.enableLibraryTileNames,l=e.querySelector(".section"+s);return"latestmedia"==o?Sections.loadRecentlyAdded(l,r):"latestmovies"==o?Sections.loadLatestMovies(l,r):"latestepisodes"==o?Sections.loadLatestEpisodes(l,r):"librarytiles"==o?Sections.loadLibraryTiles(l,r,"backdrop",s,!1,n):"smalllibrarytiles"==o?Sections.loadLibraryTiles(l,r,"homePageSmallBackdrop",s,!1,n):"smalllibrarytiles-automobile"==o?Sections.loadLibraryTiles(l,r,"homePageSmallBackdrop",s,!0,n):"librarytiles-automobile"==o?Sections.loadLibraryTiles(l,r,"backdrop",s,!0,n):"librarybuttons"==o?Sections.loadlibraryButtons(l,i,s):"resume"==o?Sections.loadResume(l,i):"nextup"==o?Sections.loadNextUp(l,i):"latesttvrecordings"==o?Sections.loadLatestLiveTvRecordings(l,i):"latestchannelmedia"==o?Sections.loadLatestChannelMedia(l,i):(l.innerHTML="",new Promise(function(e){e()}))}function a(e,t,a){var s,i,o=6,n=e.querySelector(".sections");if(!n.innerHTML.length){var l="";for(s=0,i=o;i>s;s++)l+='<div class="homePageSection section'+s+'"></div>';n.innerHTML=l}var u=[];for(s=0,i=o;i>s;s++)u.push(r(e,t,a,s));return Promise.all(u)}function s(e,t){c("home",t).then(function(e){e.CustomPrefs[g]=b,ApiClient.updateDisplayPreferences("home",e,t,AppSettings.displayPreferencesKey())})}function i(t,r){if(r.CustomPrefs[g]==b)e(".welcomeMessage",t).hide();else{Dashboard.hideLoadingMsg();var a=e(".welcomeMessage",t).show();r.CustomPrefs[g]?(e(".tourHeader",a).html(Globalize.translate("HeaderWelcomeBack")),e(".tourButtonText",a).html(Globalize.translate("ButtonTakeTheTourToSeeWhatsNew"))):(e(".tourHeader",a).html(Globalize.translate("HeaderWelcomeToProjectWebClient")),e(".tourButtonText",a).html(Globalize.translate("ButtonTakeTheTour")))}}function o(t,r){require(["slideshow"],function(){var a=[{imageUrl:"css/images/tour/web/tourcontent.jpg",title:Globalize.translate("WebClientTourContent")},{imageUrl:"css/images/tour/web/tourmovies.jpg",title:Globalize.translate("WebClientTourMovies")},{imageUrl:"css/images/tour/web/tourmouseover.jpg",title:Globalize.translate("WebClientTourMouseOver")},{imageUrl:"css/images/tour/web/tourtaphold.jpg",title:Globalize.translate("WebClientTourTapHold")},{imageUrl:"css/images/tour/web/tourmysync.png",title:Globalize.translate("WebClientTourMySync")},{imageUrl:"css/images/tour/web/toureditor.png",title:Globalize.translate("WebClientTourMetadataManager")},{imageUrl:"css/images/tour/web/tourplaylist.png",title:Globalize.translate("WebClientTourPlaylists")},{imageUrl:"css/images/tour/web/tourcollections.jpg",title:Globalize.translate("WebClientTourCollections")},{imageUrl:"css/images/tour/web/tourusersettings1.png",title:Globalize.translate("WebClientTourUserPreferences1")},{imageUrl:"css/images/tour/web/tourusersettings2.png",title:Globalize.translate("WebClientTourUserPreferences2")},{imageUrl:"css/images/tour/web/tourusersettings3.png",title:Globalize.translate("WebClientTourUserPreferences3")},{imageUrl:"css/images/tour/web/tourusersettings4.png",title:Globalize.translate("WebClientTourUserPreferences4")},{imageUrl:"css/images/tour/web/tourmobile1.jpg",title:Globalize.translate("WebClientTourMobile1")},{imageUrl:"css/images/tour/web/tourmobile2.png",title:Globalize.translate("WebClientTourMobile2")},{imageUrl:"css/images/tour/enjoy.jpg",title:Globalize.translate("MessageEnjoyYourStay")}];require(["slideshow"],function(i){var o=new i({slides:a,interactive:!0,loop:!1});o.show(),s(t,r),e(".welcomeMessage",t).hide()})})}function n(e,t){if(LibraryBrowser.needsRefresh(t)&&window.ApiClient){var r=Dashboard.getCurrentUserId();Dashboard.showLoadingMsg(),c("home",r).then(function(r){Dashboard.getCurrentUser().then(function(s){a(t,s,r).then(function(){AppInfo.isNativeApp||i(e,r),Dashboard.hideLoadingMsg(),LibraryBrowser.setLastRefreshed(t)})})})}}function l(e,t){var r=e.querySelector(".pageTabContent[data-index='"+t+"']"),a=[],s="HomePage",i="";switch(t){case 0:a.push("scripts/sections"),i="renderHomeTab";break;case 1:a.push("scripts/homenextup"),i="renderNextUp";break;case 2:a.push("scripts/favorites"),i="renderFavorites";break;case 3:a.push("scripts/homeupcoming"),i="renderUpcoming"}require(a,function(){window[s][i](e,r)})}function u(t,r){if(r.NowPlayingItem&&"Video"==r.NowPlayingItem.MediaType){var a=e(e.mobile.activePage)[0],s=a.querySelector("neon-animated-pages");s.dispatchEvent(new CustomEvent("tabchange",{}))}}function c(e,t){return ApiClient.getDisplayPreferences(e,t,AppSettings.displayPreferencesKey())}var d="smalllibrarytiles",b="14",g="homePageTour";pageIdOn("pageinit","indexPage",function(){var e=this,t=e.querySelector("paper-tabs"),r=e.querySelector("neon-animated-pages");LibraryBrowser.configurePaperLibraryTabs(e,t,r,"index.html"),r.addEventListener("tabchange",function(t){l(e,parseInt(t.target.selected))}),e.querySelector(".btnTakeTour").addEventListener("click",function(){o(e,Dashboard.getCurrentUserId())}),AppInfo.enableHomeTabs?(e.classList.remove("noSecondaryNavPage"),e.querySelector(".libraryViewNav").classList.remove("hide")):(e.classList.add("noSecondaryNavPage"),e.querySelector(".libraryViewNav").classList.add("hide"))}),pageIdOn("pageshow","indexPage",function(){Events.on(MediaController,"playbackstop",u)}),pageIdOn("pagebeforehide","indexPage",function(){Events.off(MediaController,"playbackstop",u)}),window.HomePage={renderHomeTab:n}}(jQuery,document);