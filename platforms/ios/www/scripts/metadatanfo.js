!function(e,a){function t(a,t,o){var n='<option value="" selected="selected"></option>';n+=o.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"}).join(""),e("#selectUser",a).html(n).val(t.UserId||""),e("#selectReleaseDateFormat",a).val(t.ReleaseDateFormat),e("#chkSaveImagePaths",a).checked(t.SaveImagePathsInNfo).checkboxradio("refresh"),e("#chkEnablePathSubstitution",a).checked(t.EnablePathSubstitution).checkboxradio("refresh"),e("#chkEnableExtraThumbs",a).checked(t.EnableExtraThumbsDuplication).checkboxradio("refresh"),Dashboard.hideLoadingMsg()}function o(){Dashboard.showLoadingMsg();var a=this;return ApiClient.getNamedConfiguration(n).then(function(t){t.UserId=e("#selectUser",a).val()||null,t.ReleaseDateFormat=e("#selectReleaseDateFormat",a).val(),t.SaveImagePathsInNfo=e("#chkSaveImagePaths",a).checked(),t.EnablePathSubstitution=e("#chkEnablePathSubstitution",a).checked(),t.EnableExtraThumbsDuplication=e("#chkEnableExtraThumbs",a).checked(),ApiClient.updateNamedConfiguration(n,t).then(Dashboard.processServerConfigurationUpdateResult)}),!1}var n="xbmcmetadata";e(a).on("pageinit","#metadataNfoPage",function(){e(".metadataNfoForm").off("submit",o).on("submit",o)}).on("pageshow","#metadataNfoPage",function(){Dashboard.showLoadingMsg();var e=this,a=ApiClient.getUsers(),o=ApiClient.getNamedConfiguration(n);Promise.all([a,o]).then(function(a){t(e,a[0],a[0])})})}(jQuery,document,window);