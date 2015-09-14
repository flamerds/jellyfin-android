﻿(function(globalScope){function mediaSync(){var self=this;self.sync=function(apiClient,serverInfo){var deferred=DeferredBuilder.Deferred();reportOfflineActions(apiClient).done(function(){syncData(apiClient,serverInfo,false).done(function(){getNewMedia(apiClient).done(function(){syncData(apiClient,serverInfo,false).done(function(){deferred.resolve();}).fail(getOnFail(deferred));}).fail(getOnFail(deferred));}).fail(getOnFail(deferred));}).fail(getOnFail(deferred));return deferred.promise();};function reportOfflineActions(apiClient,serverInfo){Logger.log('Begin reportOfflineActions');var deferred=DeferredBuilder.Deferred();require(['localassetmanager'],function(){LocalAssetManager.getOfflineActions(serverInfo.Id).done(function(actions){if(!actions.length){deferred.resolve();return;}
apiClient.reportOfflineActions(actions).done(function(){deferred.resolve();}).fail(function(){deferred.reject();});}).fail(function(){deferred.reject();});});return deferred.promise();}
function syncData(apiClient,serverInfo,syncUserItemAccess){Logger.log('Begin syncData');var deferred=DeferredBuilder.Deferred();require(['localassetmanager'],function(){LocalAssetManager.getServerItemIds(serverInfo.Id).done(function(localIds){var request={TargetId:apiClient.deviceId(),LocalItemIds:localIds,OfflineUserIds:(serverInfo.Users||[]).map(function(u){return u.Id;})};apiClient.syncData(request).done(function(result){afterSyncData(apiClient,serverInfo,syncUserItemAccess,result,deferred);}).fail(function(){deferred.reject();});}).fail(function(){deferred.reject();});});return deferred.promise();}
function afterSyncData(apiClient,serverInfo,syncUserItemAccess,syncDataResult,deferred){Logger.log('Begin afterSyncData');removeLocalItems(syncDataResult,serverInfo.Id).done(function(result){if(syncUserItemAccess){syncUserItemAccess().done(function(){deferred.resolve();}).fail(function(){deferred.reject();});}
else{deferred.resolve();}}).fail(function(){deferred.reject();});deferred.resolve();}
function syncUserItemAccess(){Logger.log('Begin syncUserItemAccess');var deferred=DeferredBuilder.Deferred();deferred.resolve();return deferred.promise();}
function removeLocalItems(syncDataResult,serverId){Logger.log('Begin removeLocalItems');var deferred=DeferredBuilder.Deferred();removeNextLocalItem(syncDataResult.ItemIdsToRemove,0,serverId,deferred);return deferred.promise();}
function removeNextLocalItem(itemIdsToRemove,index,serverId,deferred){var length=itemIdsToRemove.length;if(index>=length){deferred.resolve();return;}
removeLocalItem(itemIdsToRemove[index],serverId).done(function(){removeNextLocalItem(itemIdsToRemove,index+1,serverId,deferred);}).fail(function(){removeNextLocalItem(itemIdsToRemove,index+1,serverId,deferred);});}
function removeLocalItem(itemId,serverId){Logger.log('Begin removeLocalItem');var deferred=DeferredBuilder.Deferred();deferred.resolve();return deferred.promise();}
function getNewMedia(apiClient){Logger.log('Begin getNewMedia');var deferred=DeferredBuilder.Deferred();deferred.resolve();return deferred.promise();}
function getOnFail(deferred){return function(){deferred.reject();};}}
if(!globalScope.MediaBrowser){globalScope.MediaBrowser={};}
globalScope.MediaBrowser.MediaSync=mediaSync;})(this);