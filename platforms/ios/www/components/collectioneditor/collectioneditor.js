define(["components/paperdialoghelper","paper-checkbox","paper-dialog","paper-input","paper-fab"],function(){function e(){Dashboard.showLoadingMsg();var e=$(this).parents("paper-dialog")[0],o=$("#selectCollectionToAddTo",e).val();return o?l(e,o):t(e),!1}function t(e){var t=ApiClient.getUrl("Collections",{Name:$("#txtNewCollectionName",e).val(),IsLocked:!$("#chkEnableInternetMetadata",e).checked(),Ids:$(".fldSelectedItemIds",e).val()||""});ApiClient.ajax({type:"POST",url:t,dataType:"json"}).then(function(t){Dashboard.hideLoadingMsg();var l=t.Id;PaperDialogHelper.close(e),o(l)})}function o(e){var t=getParameterByName("context");ApiClient.getItem(Dashboard.getCurrentUserId(),e).then(function(e){Dashboard.navigate(LibraryBrowser.getHref(e,t))})}function l(e,t){var o=ApiClient.getUrl("Collections/"+t+"/Items",{Ids:$(".fldSelectedItemIds",e).val()||""});ApiClient.ajax({type:"POST",url:o}).then(function(){Dashboard.hideLoadingMsg(),PaperDialogHelper.close(e),Dashboard.alert(Globalize.translate("MessageItemsAdded"))})}function a(){$(this).remove(),Dashboard.hideLoadingMsg()}function n(e){Dashboard.showLoadingMsg();var t=$("#selectCollectionToAddTo",e);$(".newCollectionInfo",e).hide();var o={Recursive:!0,IncludeItemTypes:"BoxSet",SortBy:"SortName"};ApiClient.getItems(Dashboard.getCurrentUserId(),o).then(function(e){var o="";o+='<option value="">'+Globalize.translate("OptionNewCollection")+"</option>",o+=e.Items.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"}),t.html(o).val("").trigger("change"),Dashboard.hideLoadingMsg()})}function i(){var e="";return e+='<form class="newCollectionForm" style="max-width:100%;">',e+="<br />",e+='<div class="fldSelectCollection">',e+="<br />",e+='<label for="selectCollectionToAddTo">'+Globalize.translate("LabelSelectCollection")+"</label>",e+='<select id="selectCollectionToAddTo" data-mini="true"></select>',e+="</div>",e+='<div class="newCollectionInfo">',e+="<div>",e+='<paper-input type="text" id="txtNewCollectionName" required="required" label="'+Globalize.translate("LabelName")+'"></paper-input>',e+='<div class="fieldDescription">'+Globalize.translate("NewCollectionNameExample")+"</div>",e+="</div>",e+="<br />",e+="<br />",e+="<div>",e+='<paper-checkbox id="chkEnableInternetMetadata">'+Globalize.translate("OptionSearchForInternetMetadata")+"</paper-checkbox>",e+="</div>",e+="</div>",e+="<br />",e+="<div>",e+='<button type="submit" class="clearButton" data-role="none"><paper-button raised class="submit block">'+Globalize.translate("ButtonOk")+"</paper-button></button>",e+="</div>",e+='<input type="hidden" class="fldSelectedItemIds" />',e+="</form>"}function r(t,o){$("#selectCollectionToAddTo",t).on("change",function(){this.value?($(".newCollectionInfo",t).hide(),$("#txtNewCollectionName",t).removeAttr("required")):($(".newCollectionInfo",t).show(),$("#txtNewCollectionName",t).attr("required","required"))}),$(".newCollectionForm",t).off("submit",e).on("submit",e),$(".fldSelectedItemIds",t).val(o.join(",")),o.length?($(".fldSelectCollection",t).show(),n(t)):($(".fldSelectCollection",t).hide(),$("#selectCollectionToAddTo",t).html("").val("").trigger("change"))}function d(){var e=this;e.show=function(e){e=e||[];var t=PaperDialogHelper.createDialog({size:"small"}),o="";o+='<h2 class="dialogHeader">',o+='<paper-fab icon="arrow-back" mini class="btnCloseDialog"></paper-fab>';var l=Globalize.translate(e.length?"HeaderAddToCollection":"HeaderNewCollection");o+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+l+"</div>",o+="</h2>",o+='<div class="editorContent" style="max-width:800px;margin:auto;">',o+=i(),o+="</div>",t.innerHTML=o,document.body.appendChild(t);var n=t.querySelector(".editorContent");r(n,e),$(t).on("iron-overlay-closed",a),PaperDialogHelper.openWithHash(t,"collectioneditor"),$(".btnCloseDialog",t).on("click",function(){PaperDialogHelper.close(t)})}}return d});