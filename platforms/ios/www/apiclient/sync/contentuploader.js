!function(e){function r(e){function r(e,r){return e.filter(function(e){return e?0==r.FilesUploaded.filter(function(r){return n(e)==r.Id}).length:!1})}function n(e){return CryptoJS.SHA1(e+"1").toString()}function o(e,r,n,i,a){var l=e.length;return r>=l?void a.resolve():void t(e[r],i).then(function(){o(e,r+1,n,i,a)},function(){o(e,r+1,n,i,a)})}function t(e,r){var o=DeferredBuilder.Deferred();return require(["fileupload","cryptojs-sha1"],function(){var t="camera image "+(new Date).getTime(),i=r.getUrl("Devices/CameraUploads",{DeviceId:r.deviceId(),Name:t,Album:"Camera Roll",Id:n(e),api_key:r.accessToken()});Logger.log("Uploading file to "+i),(new MediaBrowser.FileUpload).upload(e,t,i).then(function(){Logger.log("File upload succeeded"),o.resolve()},function(){Logger.log("File upload failed"),o.reject()})}),o.promise()}var i=this;i.uploadImages=function(n){var t=DeferredBuilder.Deferred();return LocalAssetManager.getCameraPhotos().then(function(i){if(!i.length)return void t.resolve();var a=e.getApiClient(n.Id);a.getContentUploadHistory().then(function(e){i=r(i,e),Logger.log("Found "+i.length+" files to upload"),o(i,0,n,a,t)},function(){t.reject()})},function(){t.reject()}),t.promise()}}e.MediaBrowser||(e.MediaBrowser={}),e.MediaBrowser.ContentUploader=r}(this);