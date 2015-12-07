define(["components/paperdialoghelper","paper-dialog","paper-input","paper-fab"],function(){function e(e){var t=getParameterByName("context");ApiClient.getItem(Dashboard.getCurrentUserId(),e).then(function(e){Dashboard.navigate(LibraryBrowser.getHref(e,t))})}function t(){Dashboard.showLoadingMsg();var e=$(this).parents("paper-dialog")[0],t=$("#selectPlaylistToAddTo",e).val();return t?(d=t,l(e,t)):a(e),!1}function a(t){var a=ApiClient.getUrl("Playlists",{Name:$("#txtNewPlaylistName",t).val(),Ids:$(".fldSelectedItemIds",t).val()||"",userId:Dashboard.getCurrentUserId()});ApiClient.ajax({type:"POST",url:a,dataType:"json"}).then(function(a){Dashboard.hideLoadingMsg();var l=a.Id;PaperDialogHelper.close(t),e(l)})}function l(e,t){var a=ApiClient.getUrl("Playlists/"+t+"/Items",{Ids:$(".fldSelectedItemIds",e).val()||"",userId:Dashboard.getCurrentUserId()});ApiClient.ajax({type:"POST",url:a}).then(function(){Dashboard.hideLoadingMsg(),PaperDialogHelper.close(e),Dashboard.alert(Globalize.translate("MessageAddedToPlaylistSuccess"))})}function i(){$(this).remove(),Dashboard.hideLoadingMsg()}function r(e){var t=$("#selectPlaylistToAddTo",e);if(!t.length)return void $("#txtNewPlaylistName",e).val("").focus();Dashboard.showLoadingMsg(),$(".newPlaylistInfo",e).hide();var a={Recursive:!0,IncludeItemTypes:"Playlist",SortBy:"SortName"};ApiClient.getItems(Dashboard.getCurrentUserId(),a).then(function(e){var a="";a+='<option value="">'+Globalize.translate("OptionNewPlaylist")+"</option>",a+=e.Items.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"}),t.html(a).val(d||"").trigger("change"),Dashboard.hideLoadingMsg()})}function o(){var e="";return e+='<form style="max-width:100%;">',e+="<br />",e+='<div class="fldSelectPlaylist">',e+="<br />",e+='<label for="selectPlaylistToAddTo">'+Globalize.translate("LabelSelectPlaylist")+"</label>",e+='<select id="selectPlaylistToAddTo" data-mini="true"></select>',e+="</div>",e+='<div class="newPlaylistInfo">',e+="<div>",e+='<paper-input type="text" id="txtNewPlaylistName" required="required" label="'+Globalize.translate("LabelName")+'"></paper-input>',e+="</div>",e+="<br />",e+="</div>",e+="<br />",e+="<div>",e+='<button type="submit" class="clearButton" data-role="none"><paper-button raised class="submit block">'+Globalize.translate("ButtonOk")+"</paper-button></button>",e+="</div>",e+='<input type="hidden" class="fldSelectedItemIds" />',e+="</form>"}function n(e,a){$("#selectPlaylistToAddTo",e).on("change",function(){this.value?($(".newPlaylistInfo",e).hide(),$("input",e).removeAttr("required")):($(".newPlaylistInfo",e).show(),$("input",e).attr("required","required"))}).trigger("change"),r(e),$("form",e).on("submit",t),$(".fldSelectedItemIds",e).val(a.join(",")),a.length?($(".fldSelectPlaylist",e).show(),r(e)):($(".fldSelectPlaylist",e).hide(),$("#selectPlaylistToAddTo",e).html("").val("").trigger("change"))}function s(){var e=this;e.show=function(e){e=e||[];var t=PaperDialogHelper.createDialog({size:"small"}),a="";a+='<h2 class="dialogHeader">',a+='<paper-fab icon="arrow-back" mini class="btnCloseDialog"></paper-fab>';var l=Globalize.translate("HeaderAddToPlaylist");a+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+l+"</div>",a+="</h2>",a+='<div class="editorContent" style="max-width:800px;margin:auto;">',a+=o(),a+="</div>",t.innerHTML=a,document.body.appendChild(t);var r=t.querySelector(".editorContent");n(r,e),$(t).on("iron-overlay-closed",i),PaperDialogHelper.openWithHash(t,"playlisteditor"),$(".btnCloseDialog",t).on("click",function(){PaperDialogHelper.close(t)})}}var d="";return s});