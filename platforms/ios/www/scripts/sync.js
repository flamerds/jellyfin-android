define(["apphost","jQuery","paper-icon-button-light"],function(e,t){function i(e,i,l,a,o){if(!i)throw new Error("userId cannot be null");if(!l)throw new Error("syncOptions cannot be null");if(!a)throw new Error("form cannot be null");var r=t("#selectSyncTarget",a).val();if(!r)return void require(["toast"],function(e){e(Globalize.translate("MessagePleaseSelectDeviceToSyncTo"))});var s={userId:i,TargetId:r,ParentId:l.ParentId,Category:l.Category};n(s,a),l.items&&l.items.length&&(s.ItemIds=(l.items||[]).map(function(e){return e.Id||e}).join(",")),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/Jobs"),data:JSON.stringify(s),contentType:"application/json",dataType:"json"}).then(function(){o.close(e),require(["toast"],function(e){e(Globalize.translate("MessageSyncJobCreated"))})})}function n(e,i){var n=t("#txtBitrate",i).val()||null;n&&(n=1e6*parseFloat(n)),e.Name=t("#txtSyncJobName",i).val(),e.Quality=t("#selectQuality",i).val()||null,e.Profile=t("#selectProfile",i).val()||null,e.Bitrate=n,e.ItemLimit=t("#txtItemLimit",i).val()||null,e.SyncNewContent=t("#chkSyncNewContent",i).checked(),e.UnwatchedOnly=t("#chkUnwatchedOnly",i).checked()}function l(t){return new Promise(function(i){require(["emby-checkbox","emby-input","emby-collapsible"],function(){e.appInfo().then(function(e){a(t,e,i)})})})}function a(e,i,n){var l=e.elem,a=e.dialogOptions,o=a.Targets,r="";(e.showName||-1!=a.Options.indexOf("Name"))&&(r+='<div class="inputContainer">',r+='<input is="emby-input" type="text" id="txtSyncJobName" class="txtSyncJobName" required="required" label="'+Globalize.translate("LabelSyncJobName")+'"/>',r+="</div>",r+="<br/>"),r+="<div>",e.readOnlySyncTarget?(r+='<div class="inputContainer">',r+='<input is="emby-input" type="text" id="selectSyncTarget" readonly label="'+Globalize.translate("LabelSyncTo")+'"/>',r+="</div>"):(r+='<label for="selectSyncTarget" class="selectLabel">'+Globalize.translate("LabelSyncTo")+"</label>",r+='<select id="selectSyncTarget" required="required" data-mini="true">',r+=o.map(function(e){var t=e.Id==i.deviceId,n=t?' selected="selected"':"";return"<option"+n+' value="'+e.Id+'">'+e.Name+"</option>"}).join(""),r+="</select>",o.length||(r+='<div class="fieldDescription">'+Globalize.translate("LabelSyncNoTargetsHelp")+"</div>",r+='<div class="fieldDescription"><a href="https://github.com/MediaBrowser/Wiki/wiki/Sync" target="_blank">'+Globalize.translate("ButtonLearnMore")+"</a></div>")),r+="</div>",r+='<div class="fldProfile" style="display:none;">',r+="<br/>",r+='<label for="selectProfile" class="selectLabel">'+Globalize.translate("LabelProfile")+"</label>",r+='<select id="selectProfile" data-mini="true">',r+="</select>",r+='<div class="fieldDescription profileDescription"></div>',r+="</div>",r+='<div class="fldQuality" style="display:none;">',r+="<br/>",r+='<label for="selectQuality" class="selectLabel">'+Globalize.translate("LabelQuality")+"</label>",r+='<select id="selectQuality" data-mini="true" required="required">',r+="</select>",r+='<div class="fieldDescription qualityDescription"></div>',r+="</div>",r+='<div class="fldBitrate" style="display:none;">',r+="<br/>",r+='<div class="inputContainer">',r+='<input is="emby-input" type="number" step=".1" min=".1" id="txtBitrate" label="'+Globalize.translate("LabelBitrateMbps")+'"/>',r+="</div>",r+="</div>",-1!=a.Options.indexOf("UnwatchedOnly")&&(r+="<br/>",r+='<div class="checkboxContainer">',r+="<label>",r+='<input is="emby-checkbox" type="checkbox" id="chkUnwatchedOnly"/>',r+="<span>"+Globalize.translate("OptionSyncUnwatchedVideosOnly")+"</span>",r+="</label>",r+='<div class="fieldDescription checkboxFieldDescription">'+Globalize.translate("OptionSyncUnwatchedVideosOnlyHelp")+"</div>",r+="</div>"),(-1!=a.Options.indexOf("SyncNewContent")||-1!=a.Options.indexOf("ItemLimit"))&&(r+='<emby-collapsible title="'+Globalize.translate("HeaderAdvanced")+'">',r+='<div style="padding:0 0 1em;">',-1!=a.Options.indexOf("SyncNewContent")&&(r+="<br/>",r+='<div class="checkboxContainer">',r+="<label>",r+='<input is="emby-checkbox" type="checkbox" id="chkSyncNewContent"/>',r+="<span>"+Globalize.translate("OptionAutomaticallySyncNewContent")+"</span>",r+="</label>",r+='<div class="fieldDescription checkboxFieldDescription">'+Globalize.translate("OptionAutomaticallySyncNewContentHelp")+"</div>",r+="</div>"),-1!=a.Options.indexOf("ItemLimit")&&(r+='<div class="inputContainer">',r+='<input is="emby-input" type="number" step="1" min="1" id="txtItemLimit" label="'+Globalize.translate("LabelItemLimit")+'"/>',r+='<div class="fieldDescription">'+Globalize.translate("LabelItemLimitHelp")+"</div>",r+="</div>"),r+="</div>",r+="</emby-collapsible>",r+="<br/>"),t(l).html(r),t("#selectSyncTarget",l).on("change",function(){b(l,this.value,e.dialogOptionsFn).then(n)}).trigger("change"),t("#selectProfile",l).on("change",function(){d(l,this.value)}).trigger("change"),t("#selectQuality",l).on("change",function(){u(l,this.value)}).trigger("change")}function o(e){requirejs(["registrationservices"],function(){RegistrationServices.validateFeature("sync").then(function(){r(e)})})}function r(e){require(["dialogHelper"],function(n){var a=Dashboard.getCurrentUserId(),o={UserId:a,ItemIds:(e.items||[]).map(function(e){return e.Id||e}).join(","),ParentId:e.ParentId,Category:e.Category};ApiClient.getJSON(ApiClient.getUrl("Sync/Options",o)).then(function(r){y=r;var c=n.createDialog({size:"small",removeOnClose:!0,autoFocus:!1});c.classList.add("ui-body-a"),c.classList.add("background-theme-a"),c.classList.add("popupEditor");var d="";d+='<div class="dialogHeader" style="margin:0 0 2em;">',d+='<button is="paper-icon-button-light" class="btnCancel autoSize" tabindex="-1"><i class="md-icon">arrow_back</i></button>',d+='<div class="dialogHeaderTitle">',d+=Globalize.translate("SyncMedia"),d+="</div>",d+='<a href="https://github.com/MediaBrowser/Wiki/wiki/Sync" target="_blank" class="clearLink" style="margin-top:0;display:inline-block;vertical-align:middle;margin-left:auto;"><button is="emby-button" type="button" class="mini"><i class="md-icon">info</i><span>'+Globalize.translate("ButtonHelp")+"</span></button></a>",d+="</div>",d+='<form class="formSubmitSyncRequest" style="margin: auto;">',d+='<div class="formFields"></div>',d+="<p>",d+='<button is="emby-button" type="submit" class="raised submit block"><i class="md-icon">sync</i><span>'+Globalize.translate("ButtonSync")+"</span></button>",d+="</p>",d+="</form>",c.innerHTML=d,document.body.appendChild(c),n.open(c),t("form",c).on("submit",function(){return i(c,a,e,this,n),!1}),t(".btnCancel",c).on("click",function(){n.close(c)}),l({elem:t(".formFields",c),dialogOptions:r,dialogOptionsFn:s(o)})})})}function s(e){return function(t){return e.TargetId=t,ApiClient.getJSON(ApiClient.getUrl("Sync/Options",e))}}function c(e,i){i?(t(".fldQuality",e).show(),t("#selectQuality",e).attr("required","required")):(t(".fldQuality",e).hide(),t("#selectQuality",e).removeAttr("required"))}function d(e,i){var n=y||{},l=(n.ProfileOptions||[]).filter(function(e){return e.Id==i})[0],a=n.QualityOptions||[];l?(t(".profileDescription",e).html(l.Description||""),c(e,a.length>0&&l.EnableQualityOptions&&-1!=n.Options.indexOf("Quality"))):(t(".profileDescription",e).html(""),c(e,a.length>0&&-1!=n.Options.indexOf("Quality")))}function u(e,i){var n=y||{},l=(n.QualityOptions||[]).filter(function(e){return e.Id==i})[0];t(".qualityDescription",e).html(l?l.Description||"":""),"custom"==i?(t(".fldBitrate",e).show(),t("#txtBitrate",e).attr("required","required")):(t(".fldBitrate",e).hide(),t("#txtBitrate",e).removeAttr("required").val(""))}function p(e,i){y=i,i.ProfileOptions.length&&-1!=i.Options.indexOf("Profile")?(t(".fldProfile",e).show(),t("#selectProfile",e).attr("required","required")):(t(".fldProfile",e).hide(),t("#selectProfile",e).removeAttr("required")),c(i.QualityOptions.length>0),t("#selectProfile",e).html(i.ProfileOptions.map(function(e){var t=e.IsDefault?' selected="selected"':"";return'<option value="'+e.Id+'"'+t+">"+e.Name+"</option>"}).join("")).trigger("change"),t("#selectQuality",e).html(i.QualityOptions.map(function(e){var t=e.IsDefault?' selected="selected"':"";return'<option value="'+e.Id+'"'+t+">"+e.Name+"</option>"}).join("")).trigger("change")}function b(e,t,i){return i(t).then(function(t){return p(e,t)})}var y;return{showMenu:o,renderForm:l,setJobValues:n}});