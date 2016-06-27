define(["datetime","globalize","embyRouter","material-icons","css!./mediainfo.css"],function(e,t,i){function a(t,i){var a,n,r="",s=[];if(t.ChannelName&&s.push(i.interactive&&t.ChannelId?'<a class="lnkChannel" data-id="'+t.ChannelId+'" data-serverid="'+t.ServerId+'" href="#">'+t.ChannelName+"</a>":t.ChannelName),t.StartDate)try{n=e.parseISO8601Date(t.StartDate),a=n.toLocaleDateString(),a+=", "+e.getDisplayTime(n),t.EndDate&&(n=e.parseISO8601Date(t.EndDate),a+=" - "+e.getDisplayTime(n)),s.push(a)}catch(c){}return t.ChannelNumber&&s.push("CH "+t.ChannelNumber),t.SeriesTimerId?s.push({html:'<i class="md-icon mediaInfoItem timerIcon">fiber-smart-record</i>'}):t.TimerId&&s.push({html:'<i class="md-icon mediaInfoItem timerIcon">fiber-manual-record</i>'}),r+=s.map(function(e){return o(e)}).join("")}function n(i,a){var n="",s=[];a=a||{};var u,d,m,l="MusicAlbum"==i.Type||"MusicArtist"==i.MediaType||"Playlist"==i.MediaType||"MusicGenre"==i.MediaType;if(l){var p=i.SongCount||i.ChildCount;p&&s.push(t.translate("sharedcomponents#TrackCount",p)),i.RunTimeTicks&&s.push(e.getDisplayRunningTime(i.RunTimeTicks))}else if("PhotoAlbum"==i.Type||"BoxSet"==i.Type){var p=i.ChildCount;p&&s.push(t.translate("sharedcomponents#ItemCount",p))}if(("Episode"==i.Type||"Photo"==i.MediaType)&&i.PremiereDate)try{d=e.parseISO8601Date(i.PremiereDate),u=d.toLocaleDateString(),s.push(u)}catch(f){}if(i.StartDate&&"Program"!=i.Type)try{d=e.parseISO8601Date(i.StartDate),u=d.toLocaleDateString(),s.push(u),"Recording"!=i.Type&&(u=e.getDisplayTime(d),s.push(u))}catch(f){}if(i.ProductionYear&&"Series"==i.Type)if("Continuing"==i.Status)s.push(t.translate("sharedcomponents#ValueSeriesYearToPresent",i.ProductionYear));else if(i.ProductionYear){if(u=i.ProductionYear,i.EndDate)try{var h=e.parseISO8601Date(i.EndDate).getFullYear();h!=i.ProductionYear&&(u+="-"+e.parseISO8601Date(i.EndDate).getFullYear())}catch(f){}s.push(u)}if("Program"==i.Type)if(i.IsLive?s.push({html:'<div class="mediaInfoProgramAttribute mediaInfoItem">'+t.translate("sharedcomponents#AttributeLive")+"</div>"}):i.IsPremiere?s.push({html:'<div class="mediaInfoProgramAttribute mediaInfoItem">'+t.translate("sharedcomponents#AttributePremiere")+"</div>"}):i.IsSeries&&!i.IsRepeat&&s.push({html:'<div class="mediaInfoProgramAttribute mediaInfoItem">'+t.translate("sharedcomponents#AttributeNew")+"</div>"}),i.PremiereDate)try{d=e.parseISO8601Date(i.PremiereDate),u=t.translate("sharedcomponents#OriginalAirDateValue",d.toLocaleDateString()),s.push(u)}catch(f){}else i.ProductionYear&&(u=t.translate("sharedcomponents#ReleaseYearValue",i.ProductionYear),s.push(u));if("Series"!=i.Type&&"Episode"!=i.Type&&"Person"!=i.Type&&"Photo"!=i.MediaType&&"Program"!=i.Type)if(i.ProductionYear)s.push(i.ProductionYear);else if(i.PremiereDate)try{u=e.parseISO8601Date(i.PremiereDate).getFullYear(),s.push(u)}catch(f){}if(i.RunTimeTicks&&"Series"!=i.Type&&"Program"!=i.Type&&!l&&a.runtime!==!1&&("Audio"==i.Type?s.push(e.getDisplayRunningTime(i.RunTimeTicks)):(m=i.RunTimeTicks/6e8,m=m||1,s.push(Math.round(m)+" mins"))),i.OfficialRating&&"Season"!==i.Type&&"Episode"!==i.Type&&s.push({text:i.OfficialRating,cssClass:"mediaInfoOfficialRating"}),i.Video3DFormat&&s.push("3D"),"Photo"==i.MediaType&&i.Width&&i.Height&&s.push(i.Width+"x"+i.Height),n+=s.map(function(e){return o(e)}).join(""),n+=c(i),i.HasSubtitles&&a.subtitles!==!1&&(n+='<i class="md-icon mediaInfoItem closedCaptionIcon">closed_caption</i>'),i.CriticRating&&a.criticRating!==!1&&(n+=i.CriticRating>=60?'<div class="mediaInfoItem criticRating criticRatingFresh">'+i.CriticRating+"</div>":'<div class="mediaInfoItem criticRating criticRatingRotten">'+i.CriticRating+"</div>"),a.endsAt!==!1){var g=r(i);g&&(n+=o(g,"endsAt"))}return n}function r(i){if("Video"==i.MediaType&&i.RunTimeTicks&&!i.StartDate){var a=(new Date).getTime()+i.RunTimeTicks/1e4;a=new Date(a);var n=e.getDisplayTime(a);return t.translate("sharedcomponents#EndsAtValue",n)}return null}function s(i,a,n){var r=(new Date).getTime()+(i-(a||0))/1e4;r=new Date(r);var s=e.getDisplayTime(r);return n===!1?s:t.translate("sharedcomponents#EndsAtValue",s)}function o(e,t){t=t?t+" mediaInfoItem":"mediaInfoItem";var i=e;if("string"!=typeof e&&"number"!=typeof e){if(e.html)return e.html;i=e.text,t+=" "+e.cssClass}return'<div class="'+t+'">'+i+"</div>"}function c(e){var t="",i=e.CommunityRating;return i&&(t+='<div class="starRatingContainer mediaInfoItem">',t+='<i class="md-icon">star</i>',t+=i,t+="</div>"),t}function u(e,t){var i=setInterval(function(){return document.body.contains(e)?void(e.innerHTML=r(t)):void clearInterval(i)},6e4)}function d(e,t,i){var a=f(t,i);e.innerHTML=a,l(e,t,i)}function m(e,t,i){var a=h(t,i);e.innerHTML=a,l(e,t,i)}function l(e,t,i){if(i.endsAt!==!1){var a=e.querySelector(".endsAt");a&&u(a,t)}var n=e.querySelector(".lnkChannel");n&&n.addEventListener("click",p)}function p(e){var t=this.getAttribute("data-id"),a=this.getAttribute("data-serverid");return i.showItem(t,a),e.preventDefault(),!1}function f(e,t){return t=t||{},null==t.interactive&&(t.interactive=!1),"Program"==e.Type?a(e,t):n(e,t)}function h(e,t){return t=t||{},null==t.interactive&&(t.interactive=!1),"Program"==e.Type?n(e,t):""}return{getMediaInfoHtml:f,fill:d,getEndsAt:r,getEndsAtFromPosition:s,getPrimaryMediaInfoHtml:f,getSecondaryMediaInfoHtml:h,fillPrimaryMediaInfo:d,fillSecondaryMediaInfo:m}});