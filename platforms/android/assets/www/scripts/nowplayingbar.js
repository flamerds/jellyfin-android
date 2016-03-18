define(["jQuery"],function(e){function t(){var e="";return e+='<div class="nowPlayingBar hide">',e+='<div class="nowPlayingBarPositionContainer">',e+='<paper-slider pin step=".1" min="0" max="100" value="0" class="nowPlayingBarPositionSlider"></paper-slider>',e+="</div>",e+='<div class="nowPlayingBarInfoContainer">',e+='<div class="nowPlayingImage"></div>',e+='<div class="nowPlayingBarText"></div>',e+="</div>",e+='<div class="nowPlayingBarCenter">',e+='<paper-icon-button icon="skip-previous" class="previousTrackButton mediaButton"></paper-icon-button>',e+='<paper-icon-button icon="play-arrow" class="mediaButton unpauseButton"></paper-icon-button>',e+='<paper-icon-button icon="pause" class="mediaButton pauseButton"></paper-icon-button>',e+='<paper-icon-button icon="stop" class="stopButton mediaButton"></paper-icon-button>',e+='<paper-icon-button icon="skip-next" class="nextTrackButton mediaButton"></paper-icon-button>',e+='<div class="nowPlayingBarCurrentTime"></div>',e+="</div>",e+='<div class="nowPlayingBarRight">',e+='<paper-icon-button icon="volume-up" class="muteButton mediaButton"></paper-icon-button>',e+='<paper-icon-button icon="volume-off" class="unmuteButton mediaButton"></paper-icon-button>',e+='<paper-slider pin step="1" min="0" max="100" value="0" class="nowPlayingBarVolumeSlider" style="width:100px;vertical-align:middle;display:inline-block;"></paper-slider>',e+='<paper-icon-button icon="repeat" class="mediaButton toggleRepeatButton"></paper-icon-button>',e+='<div class="nowPlayingBarUserDataButtons">',e+="</div>",e+='<paper-icon-button icon="play-arrow" class="mediaButton unpauseButton"></paper-icon-button>',e+='<paper-icon-button icon="pause" class="mediaButton pauseButton"></paper-icon-button>',e+='<paper-icon-button icon="tablet-android" class="mediaButton remoteControlButton"></paper-icon-button>',e+='<paper-icon-button icon="queue-music" class="mediaButton playlistButton"></paper-icon-button>',e+="</div>",e+="</div>"}function n(e){return E||(E=e.offsetHeight),E+"px"}function a(e){if(!e.classList.contains("hide")){var t=function(){e.classList.add("hide")};return!browserInfo.animate||browserInfo.mobile?void t():void requestAnimationFrame(function(){var a=[{height:n(e),offset:0},{height:"0",display:"none",offset:1}],i={duration:200,iterations:1,fill:"both",easing:"ease-out"};e.animate(a,i).onfinish=t})}}function i(e){e.classList.contains("hide")&&(e.classList.remove("hide"),browserInfo.animate&&!browserInfo.mobile&&requestAnimationFrame(function(){var t=[{height:"0",offset:0},{height:n(e),offset:1}],a={duration:200,iterations:1,fill:"both",easing:"ease-out"};e.animate(t,a)}))}function o(t){I=t.querySelector(".nowPlayingBarCurrentTime"),T=t.querySelector(".nowPlayingImage"),k=t.querySelector(".nowPlayingBarText"),C=t.querySelector(".nowPlayingBarUserDataButtons"),L=e(".unmuteButton",t).on("click",function(){w&&w.unMute()}),M=e(".muteButton",t).on("click",function(){w&&w.mute()}),e(".stopButton",t).on("click",function(){w&&w.stop()}),N=e(".pauseButton",t).on("click",function(){w&&w.pause()}),S=e(".unpauseButton",t).on("click",function(){w&&w.unpause()}),e(".nextTrackButton",t).on("click",function(){w&&w.nextTrack()}),e(".previousTrackButton",t).on("click",function(){w&&w.previousTrack()}),t.querySelector(".remoteControlButton").addEventListener("click",function(){r()}),t.querySelector(".playlistButton").addEventListener("click",function(){r("playlist")}),A=e(".toggleRepeatButton",t).on("click",function(){if(w){var e=D||{};switch((e.PlayState||{}).RepeatMode){case"RepeatAll":w.setRepeatMode("RepeatOne");break;case"RepeatOne":w.setRepeatMode("RepeatNone");break;default:w.setRepeatMode("RepeatAll")}}})[0],setTimeout(function(){R=e(".nowPlayingBarVolumeSlider",t).on("change",function(){w&&w.setVolume(this.value)})[0],x=e(".nowPlayingBarPositionSlider",t).on("change",function(){if(w&&D){var e=parseFloat(this.value),t=e/100*D.NowPlayingItem.RunTimeTicks;w.seek(Math.floor(t))}})[0],x._setPinValue=function(e){var t=D;if(!t||!t.NowPlayingItem||!t.NowPlayingItem.RunTimeTicks)return void(this.pinValue="--:--");var n=t.NowPlayingItem.RunTimeTicks;n/=100,n*=e,this.pinValue=Dashboard.getDisplayTime(n)}},300)}function r(t){t?e.mobile.changePage("nowplaying.html",{dataUrl:"nowplaying.html#"+t}):Dashboard.navigate("nowplaying.html")}function s(){return new Promise(function(e){return U?void e(U):void require(["jQuery","css!css/nowplayingbar.css","paper-slider"],function(n){return(U=document.querySelector(".nowPlayingBar"))?void e(U):(U=n(t()).appendTo(document.body)[0],!browserInfo.safari&&AppInfo.isNativeApp||!browserInfo.mobile||U.classList.add("noMediaProgress"),o(U),void e(U))})})}function l(e){e.removeClass("hide")}function u(e){e.addClass("hide")}function c(e,t){return t.NowPlayingItem?U?void p(e,t):void s().then(function(){p(e,t)}):void f()}function p(e,t){if(y(),"positionchange"==e.type){var n=(new Date).getTime();if(700>n-V)return;V=n}D=t;var a=MediaController.getPlayerInfo(),i=t.PlayState||{};i.IsPaused?(u(N),l(S)):(l(N),u(S)),d(t,a);var o=t.NowPlayingItem||{};if(x&&!x.dragging){if(o.RunTimeTicks){var r=i.PositionTicks/o.RunTimeTicks;r*=100,x.value=r}else x.value=0;x.disabled=!i.CanSeek}var s=Dashboard.getDisplayTime(i.PositionTicks);o.RunTimeTicks&&(s+=" / "+Dashboard.getDisplayTime(o.RunTimeTicks)),I.innerHTML=s,m(t)}function d(e,t){t=t||MediaController.getPlayerInfo();var n=e.PlayState||{},a=t.supportedCommands,i=!0,o=!0,r=!0;-1==a.indexOf("Mute")&&(i=!1),-1==a.indexOf("Unmute")&&(o=!1),n.IsMuted?i=!1:o=!1,-1==a.indexOf("SetRepeatMode")?A.classList.add("hide"):A.classList.remove("hide"),"RepeatAll"==n.RepeatMode?(A.icon="repeat",A.classList.add("repeatActive")):"RepeatOne"==n.RepeatMode?(A.icon="repeat-one",A.classList.add("repeatActive")):(A.icon="repeat",A.classList.remove("repeatActive")),-1==a.indexOf("SetVolume")&&(r=!1),t.isLocalPlayer&&AppInfo.hasPhysicalVolumeButtons&&(i=!1,o=!1,r=!1),i?l(M):u(M),o?l(L):u(L),R&&(r?R.classList.remove("hide"):R.classList.add("hide"),R.dragging||(R.value=n.VolumeLevel||0))}function m(e){var t=MediaController.getNowPlayingNameHtml(e.NowPlayingItem)||"";-1!=t.indexOf("<br/>")?k.classList.add("nowPlayingDoubleText"):k.classList.remove("nowPlayingDoubleText"),e.NowPlayingItem.Id&&(t='<a style="color:inherit;text-decoration:none;" href="'+LibraryBrowser.getHref(e.NowPlayingItem)+'">'+t+"</a>"),k.innerHTML=t;var n,a=80,i=e.NowPlayingItem;n=i.PrimaryImageTag?ApiClient.getScaledImageUrl(i.PrimaryImageItemId,{type:"Primary",height:a,tag:i.PrimaryImageTag}):i.BackdropImageTag?ApiClient.getScaledImageUrl(i.BackdropItemId,{type:"Backdrop",height:a,tag:i.BackdropImageTag,index:0}):i.ThumbImageTag?ApiClient.getScaledImageUrl(i.ThumbImageItemId,{type:"Thumb",height:a,tag:i.ThumbImageTag}):"TvChannel"==i.Type||"Recording"==i.Type?"css/images/items/detail/tv.png":"Audio"==i.MediaType?"css/images/items/detail/audio.png":"css/images/items/detail/video.png",n!=q&&(q=n,ImageLoader.lazyImage(T,n),i.Id?ApiClient.getItem(Dashboard.getCurrentUserId(),i.Id).then(function(e){C.innerHTML=LibraryBrowser.getUserDataIconsHtml(e,!1)}):C.innerHTML="")}function g(e,t){var n=this;n.beginPlayerUpdates(),h.call(n,e,t)}function y(){s().then(i)}function f(){var e=document.getElementsByClassName("nowPlayingBar")[0];e&&a(e)}function v(e){var t=this;t.endPlayerUpdates(),f()}function h(e,t){var n=this;n.isDefaultPlayer&&t.NowPlayingItem&&"Video"==t.NowPlayingItem.MediaType||c(e,t)}function P(){w&&(Events.off(w,"playbackstart",g),Events.off(w,"playbackstop",v),Events.off(w,"volumechange",b),Events.off(w,"playstatechange",h),Events.off(w,"positionchange",h),w.endPlayerUpdates(),w=null,f())}function b(){var e=this;Promise.all([e.getPlayerState(),s()]).then(function(t){var n=t[0];e.isDefaultPlayer&&n.NowPlayingItem&&"Video"==n.NowPlayingItem.MediaType||d(n)})}function B(e){P(),w=e,e.getPlayerState().then(function(t){t.NowPlayingItem&&e.beginPlayerUpdates(),h.call(e,{type:"init"},t)}),Events.on(e,"playbackstart",g),Events.on(e,"playbackstop",v),Events.on(e,"volumechange",b),Events.on(e,"playstatechange",h),Events.on(e,"positionchange",h)}var w,I,T,k,C,L,M,R,S,N,x,A,D,E,U,q,V=0;Events.on(MediaController,"playerchange",function(){B(MediaController.getCurrentPlayer())}),B(MediaController.getCurrentPlayer())});