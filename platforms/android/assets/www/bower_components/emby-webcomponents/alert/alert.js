define(["dialogHelper","layoutManager","dialogText","html!./../prompt/icons.html","css!./../prompt/style.css","paper-button","paper-input"],function(t,e,n){return function(i){"string"==typeof i&&(i={title:"",text:i});var o={removeOnClose:!0},a=!1,r=!1,p=!1;e.tv?(o.size="fullscreen",a=!0,r=!0,p=!0):(o.modal=!1,o.entryAnimationDuration=160,o.exitAnimationDuration=200);var l=t.createDialog(o);l.classList.add("promptDialog");var s="";s+='<div class="promptDialogContent">',a&&(s+='<paper-icon-button tabindex="-1" icon="dialog:arrow-back" class="btnPromptExit"></paper-icon-button>'),i.title?(s+="<h2>",s+=i.title,s+="</h2>"):p||(s+="<br/>");var c=i.html||i.text;c&&(s+=i.title?'<p style="margin-top:2em;">':"<p>",s+=c,s+="</p>");var u="error"==i.type?"Ok":"GotIt";return r?s+='<paper-button raised class="btnSubmit"><iron-icon icon="dialog:check"></iron-icon><span>'+n.get(u)+"</span></paper-button>":(s+='<div class="buttons" style="text-align:right;">',s+='<paper-button class="btnSubmit">'+n.get(u)+"</paper-button>",s+="</div>"),s+="</div>",l.innerHTML=s,document.body.appendChild(l),l.querySelector(".btnSubmit").addEventListener("click",function(){t.close(l)}),t.open(l)}});