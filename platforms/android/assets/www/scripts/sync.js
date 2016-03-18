define(["jQuery"],function(e){function t(t,n,a,l,r){if(!n)throw new Error("userId cannot be null");if(!a)throw new Error("syncOptions cannot be null");if(!l)throw new Error("form cannot be null");var o=e("#selectSyncTarget",l).val();if(!o)return void require(["toast"],function(e){e(Globalize.translate("MessagePleaseSelectDeviceToSyncTo"))});var s={userId:n,TargetId:o,ParentId:a.ParentId,Category:a.Category};i(s,l),a.items&&a.items.length&&(s.ItemIds=(a.items||[]).map(function(e){return e.Id||e}).join(",")),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/Jobs"),data:JSON.stringify(s),contentType:"application/json",dataType:"json"}).then(function(){r.close(t),require(["toast"],function(e){e(Globalize.translate("MessageSyncJobCreated"))})})}function i(t,i){var n=e("#txtBitrate",i).val()||null;n&&(n=1e6*parseFloat(n)),t.Name=e("#txtSyncJobName",i).val(),t.Quality=e("#selectQuality",i).val()||null,t.Profile=e("#selectProfile",i).val()||null,t.Bitrate=n,t.ItemLimit=e("#txtItemLimit",i).val()||null,t.SyncNewContent=e("#chkSyncNewContent",i).checked(),t.UnwatchedOnly=e("#chkUnwatchedOnly",i).checked()}function n(e){return new Promise(function(t){require(["paper-checkbox","paper-input","emby-collapsible"],function(){a(e),t()})})}function a(t){var i=t.elem,n=t.dialogOptions,a=n.Targets,l="";(t.showName||-1!=n.Options.indexOf("Name"))&&(l+="<div>",l+='<paper-input type="text" id="txtSyncJobName" class="txtSyncJobName" required="required" label="'+Globalize.translate("LabelSyncJobName")+'"></paper-input>',l+="</div>",l+="<br/>"),l+="<div>",t.readOnlySyncTarget?l+='<paper-input type="text" id="selectSyncTarget" readonly label="'+Globalize.translate("LabelSyncTo")+'"></paper-input>':(l+='<label for="selectSyncTarget" class="selectLabel">'+Globalize.translate("LabelSyncTo")+"</label>",l+='<select id="selectSyncTarget" required="required" data-mini="true">',l+=a.map(function(e){var t=e.Id==AppInfo.deviceId,i=t?' selected="selected"':"";return"<option"+i+' value="'+e.Id+'">'+e.Name+"</option>"}).join(""),l+="</select>",a.length||(l+='<div class="fieldDescription">'+Globalize.translate("LabelSyncNoTargetsHelp")+"</div>",l+='<div class="fieldDescription"><a href="https://github.com/MediaBrowser/Wiki/wiki/Sync" target="_blank">'+Globalize.translate("ButtonLearnMore")+"</a></div>")),l+="</div>",l+='<div class="fldProfile" style="display:none;">',l+="<br/>",l+='<label for="selectProfile" class="selectLabel">'+Globalize.translate("LabelProfile")+"</label>",l+='<select id="selectProfile" data-mini="true">',l+="</select>",l+='<div class="fieldDescription profileDescription"></div>',l+="</div>",l+='<div class="fldQuality" style="display:none;">',l+="<br/>",l+='<label for="selectQuality" class="selectLabel">'+Globalize.translate("LabelQuality")+"</label>",l+='<select id="selectQuality" data-mini="true" required="required">',l+="</select>",l+='<div class="fieldDescription qualityDescription"></div>',l+="</div>",l+='<div class="fldBitrate" style="display:none;">',l+="<br/>",l+="<div>",l+='<paper-input type="number" step=".1" min=".1" id="txtBitrate" label="'+Globalize.translate("LabelBitrateMbps")+'"></paper-input>',l+="</div>",l+="</div>",-1!=n.Options.indexOf("UnwatchedOnly")&&(l+="<br/>",l+="<div>",l+='<paper-checkbox id="chkUnwatchedOnly">'+Globalize.translate("OptionSyncUnwatchedVideosOnly")+"</paper-checkbox>",l+='<div class="fieldDescription paperCheckboxFieldDescription">'+Globalize.translate("OptionSyncUnwatchedVideosOnlyHelp")+"</div>",l+="</div>"),(-1!=n.Options.indexOf("SyncNewContent")||-1!=n.Options.indexOf("ItemLimit"))&&(l+="<br/>",l+='<emby-collapsible title="'+Globalize.translate("HeaderAdvanced")+'">',l+='<div style="padding:0 0 1em;">',-1!=n.Options.indexOf("SyncNewContent")&&(l+="<br/>",l+="<div>",l+='<paper-checkbox id="chkSyncNewContent" checked>'+Globalize.translate("OptionAutomaticallySyncNewContent")+"</paper-checkbox>",l+='<div class="fieldDescription paperCheckboxFieldDescription">'+Globalize.translate("OptionAutomaticallySyncNewContentHelp")+"</div>",l+="</div>"),-1!=n.Options.indexOf("ItemLimit")&&(l+="<div>",l+='<paper-input type="number" step="1" min="1" id="txtItemLimit" label="'+Globalize.translate("LabelItemLimit")+'"></paper-input>',l+='<div class="fieldDescription">'+Globalize.translate("LabelItemLimitHelp")+"</div>",l+="</div>"),l+="</emby-collapsible>",l+="</div>"),e(i).html(l),e("#selectSyncTarget",i).on("change",function(){u(i,this.value,t.dialogOptionsFn)}).trigger("change"),e("#selectProfile",i).on("change",function(){c(i,this.value)}).trigger("change"),e("#selectQuality",i).on("change",function(){d(i,this.value)}).trigger("change")}function l(e){requirejs(["registrationservices"],function(){RegistrationServices.validateFeature("sync").then(function(){r(e)})})}function r(i){require(["paperdialoghelper","paper-fab"],function(a){var l=Dashboard.getCurrentUserId(),r={UserId:l,ItemIds:(i.items||[]).map(function(e){return e.Id||e}).join(","),ParentId:i.ParentId,Category:i.Category};ApiClient.getJSON(ApiClient.getUrl("Sync/Options",r)).then(function(s){f=s;var c=a.createDialog({size:"small",removeOnClose:!0,autoFocus:!1});c.classList.add("ui-body-a"),c.classList.add("background-theme-a"),c.classList.add("popupEditor");var d="";d+='<div class="dialogHeader">',d+='<paper-icon-button icon="arrow-back" class="btnCancel" tabindex="-1"></paper-icon-button>',d+='<div class="dialogHeaderTitle">',d+=Globalize.translate("SyncMedia"),d+="</div>",d+='<a href="https://github.com/MediaBrowser/Wiki/wiki/Sync" target="_blank" class="clearLink" style="margin-top:0;display:inline-block;vertical-align:middle;margin-left:auto;"><paper-button class="mini"><iron-icon icon="info"></iron-icon><span>'+Globalize.translate("ButtonHelp")+"</span></paper-button></a>",d+="</div>",d+='<form class="formSubmitSyncRequest" style="margin: auto;">',d+='<div class="formFields"></div>',d+="<p>",d+='<button type="submit" data-role="none" class="clearButton"><paper-button raised class="submit block"><iron-icon icon="sync"></iron-icon><span>'+Globalize.translate("ButtonSync")+"</span></paper-button></button>",d+="</p>",d+="</form>",c.innerHTML=d,document.body.appendChild(c),a.open(c),e("form",c).on("submit",function(){return t(c,l,i,this,a),!1}),e(".btnCancel",c).on("click",function(){a.close(c)}),n({elem:e(".formFields",c),dialogOptions:s,dialogOptionsFn:o(r)})})})}function o(e){return function(t){return e.TargetId=t,ApiClient.getJSON(ApiClient.getUrl("Sync/Options",e))}}function s(t,i){i?(e(".fldQuality",t).show(),e("#selectQuality",t).attr("required","required")):(e(".fldQuality",t).hide(),e("#selectQuality",t).removeAttr("required"))}function c(t,i){var n=f||{},a=(n.ProfileOptions||[]).filter(function(e){return e.Id==i})[0];a?(e(".profileDescription",t).html(a.Description||""),s(t,n.QualityOptions.length>0&&a.EnableQualityOptions&&-1!=n.Options.indexOf("Quality"))):(e(".profileDescription",t).html(""),s(t,n.QualityOptions.length>0&&-1!=n.Options.indexOf("Quality")))}function d(t,i){var n=f||{},a=(n.QualityOptions||[]).filter(function(e){return e.Id==i})[0];e(".qualityDescription",t).html(a?a.Description||"":""),"custom"==i?(e(".fldBitrate",t).show(),e("#txtBitrate",t).attr("required","required")):(e(".fldBitrate",t).hide(),e("#txtBitrate",t).removeAttr("required").val(""))}function p(t,i){f=i,i.ProfileOptions.length&&-1!=i.Options.indexOf("Profile")?(e(".fldProfile",t).show(),e("#selectProfile",t).attr("required","required")):(e(".fldProfile",t).hide(),e("#selectProfile",t).removeAttr("required")),s(i.QualityOptions.length>0),e("#selectProfile",t).html(i.ProfileOptions.map(function(e){var t=e.IsDefault?' selected="selected"':"";return'<option value="'+e.Id+'"'+t+">"+e.Name+"</option>"}).join("")).trigger("change"),e("#selectQuality",t).html(i.QualityOptions.map(function(e){var t=e.IsDefault?' selected="selected"':"";return'<option value="'+e.Id+'"'+t+">"+e.Name+"</option>"}).join("")).trigger("change")}function u(e,t,i){i(t).then(function(t){p(e,t)})}var f;return{showMenu:l,renderForm:n,setJobValues:i}});