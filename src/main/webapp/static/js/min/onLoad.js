(function(){for(var b=0,a=["ms","moz","webkit","o"],d=0;d<a.length&&!window.requestAnimationFrame;++d)window.requestAnimationFrame=window[a[d]+"RequestAnimationFrame"],window.cancelRequestAnimationFrame=window[a[d]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,c){var d=(new Date).getTime(),f=Math.max(0,16-(d-b)),e=window.setTimeout(function(){a(d+f)},f);b=d+f;return e});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})})();
var reapplyStylingToServerGeneratedContent=function(b){$("#"+b).find(".simpleMultipleButtonInteractableMessageButton a").addClass("button-transparent-border button")},bounceAnd=function(b){return function(a){b(a)}};function updateStatus(b){$("#status").text(b)}var noActiveBackstage="none",flash=function(b){b.fadeOut(100).fadeIn(100)};function updateActiveMenu(b){$(".activeBackstageTab").removeClass("activeBackstageTab active");$(b).addClass("activeBackstageTab active")}
var WorkQueue=function(){var b=!0,a=[],d=!1,g=function(){var c=a.pop();c?(d=d||c(),g()):d&&(blit(),d=!1)},c=void 0;return{pause:function(){c&&(window.clearTimeout(c),c=void 0);b=!1;Progress.call("afterWorkQueuePause")},gracefullyResume:function(){c&&(window.clearTimeout(c),c=void 0);c=setTimeout(function(){b=!0;g()},1E3);Progress.call("beforeWorkQueueResume")},enqueue:function(c){b?c()&&blit():a.push(function(){return c()})}}}(),Pan={pan:function(b,a){takeControlOfViewbox();TweenController.panViewboxRelative(viewboxWidth/
boardWidth*b,viewboxHeight/boardHeight*a)},translate:function(b,a){takeControlOfViewbox();TweenController.translateViewboxRelative(viewboxWidth/boardWidth*b,viewboxHeight/boardHeight*a)}},Zoom=function(){var b=function(a){var b=3*boardContent.width,g=3*boardContent.height,c=.1*boardWidth,v=.1*boardHeight,f=void 0,e=void 0,h=void 0,k=void 0;"width"in a&&(f=a.width,f>b&&(f=b),f<c&&(f=c));"height"in a&&(e=a.height,e>g&&(e=g),e<v&&(e=v));"x"in a&&(h=a.x,f!=a.width&&(h+=(a.width-f)/2));"y"in a&&e&&(k=
a.y,e!=a.height&&(k+=(a.height-e)/2));return{width:f,height:e,x:h,y:k}};return{scale:function(a,d){takeControlOfViewbox();var g=viewboxWidth*a,c=viewboxHeight*a;d||(c=b({height:c,width:g}),g=c.width,c=c.height);TweenController.scaleAndTranslateViewbox((viewboxWidth-g)/2+viewboxX,(viewboxHeight-c)/2+viewboxY,g,c)},zoom:function(a,d,g){takeControlOfViewbox();var c=viewboxWidth*a;a*=viewboxHeight;d||(d=b({height:a,width:c}),c=d.width,a=d.height);c-=viewboxWidth;d=a-viewboxHeight;TweenController.zoomAndPanViewboxRelative(c/
2*-1,d/2*-1,c,d,g)},out:function(){Zoom.zoom(1.2)},"in":function(){Zoom.zoom(1/1.2)},constrainRequestedViewbox:b}}(),TweenController=function(){var b=_.throttle(function(c,b,f,e,h,k){isNaN(c)||isNaN(b)||isNaN(f)||isNaN(e)?h&&h():(d&&d.stop(),d=!1,viewboxX=c,viewboxY=b,viewboxWidth=f,viewboxHeight=e,k||(requestedViewboxX=viewboxX,requestedViewboxY=viewboxY,requestedViewboxWidth=viewboxWidth,requestedViewboxHeight=viewboxHeight),clearBoard(),blit(),h&&h(),a(c,b,f,e),Progress.call("onViewboxChanged"))},
10,{trailing:!0,leading:!0}),a=_.throttle(function(c,b,a,e){Conversations.isAuthor()&&UserSettings.getIsInteractive()&&(c=[c,b,a,e,Date.now(),Conversations.getCurrentSlideJid(),"autoZooming"in Progress.onBoardContentChanged],0>=a||0>=e||_.some(c,function(c){return"undefined"==typeof c||isNaN(c)})||sendStanza({author:UserSettings.getUsername(),timestamp:Date.now(),type:"command",command:"/TEACHER_VIEW_MOVED",parameters:c.map(function(c){return c.toString()})}))},300),d,g=function(c,b,f,e,h,k,x){if(isNaN(c)||
isNaN(b)||isNaN(f)||isNaN(e))h&&h();else{var y=viewboxX,g=viewboxY,w=viewboxWidth,u=viewboxHeight,n=c-y,p=b-g,m=f-w,q=e-u;d&&(d.stop(),d=!1);d=(new TWEEN.Tween({x:0,y:0,w:0,h:0})).to({x:n,y:p,w:m,h:q},300).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){viewboxX=y+this.x;viewboxY=g+this.y;viewboxWidth=w+this.w;viewboxHeight=u+this.h}).onComplete(function(){d=!1;k||(requestedViewboxX=viewboxX,requestedViewboxY=viewboxY,requestedViewboxWidth=viewboxWidth,requestedViewboxHeight=viewboxHeight);
h&&h();Progress.call("onViewboxChanged")}).start();var l=function(c){d&&(requestAnimationFrame(l),TWEEN.update(),clearBoard(),blit())};requestAnimationFrame(l);"Conversations"in window&&Conversations.isAuthor()&&!x&&!k&&void 0!=c&&void 0!=b&&0<f&&0<e&&(0!=n||0!=p||0!=m||0!=q)&&a(c,b,f,e)}};return{panViewbox:function(c,b,a,e){return g(c,b,viewboxWidth,viewboxHeight,a,e)},translateViewbox:function(c,a,d,e){return b(c,a,viewboxWidth,viewboxHeight,d,e)},zoomAndPanViewbox:function(c,b,a,d,h,k,x){return g(c,
b,a,d,h,k,x)},scaleAndTranslateViewbox:function(c,a,d,e,h,k){return b(c,a,d,e,h,k)},panViewboxRelative:function(c,b,a,d){return g(c+viewboxX,b+viewboxY,viewboxWidth,viewboxHeight,a,d)},translateViewboxRelative:function(c,a,d,e){return b(c+viewboxX,a+viewboxY,viewboxWidth,viewboxHeight,d,e)},zoomAndPanViewboxRelative:function(b,a,d,e,h,k){return g(b+viewboxX,a+viewboxY,d+viewboxWidth,e+viewboxHeight,h,k)},scaleAndTranslateViewboxRelative:function(a,d,f,e,h,k){return b(a+viewboxX,d+viewboxY,f+viewboxWidth,
e+viewboxHeight,h,k)}}}(),Extend=function(){return{up:function(){TweenController.panViewboxRelative(0,-Math.floor(.6*viewboxHeight))},down:function(){TweenController.panViewboxRelative(0,Math.floor(.6*viewboxHeight))},left:function(){TweenController.panViewboxRelative(-Math.floor(.6*viewboxWidth),0)},right:function(){TweenController.panViewboxRelative(Math.floor(.6*viewboxWidth),0)},shift:TweenController.panViewboxRelative,center:function(b,a,d){TweenController.panViewboxRelative(b-viewboxWidth/2-
viewboxX,a-viewboxHeight/2-viewboxY,d)}}}(),subcategoryMapping={metaToolbar:".metaConversationGroup",roomToolbar:".inConversationGroup",optsToolbar:".applicationGroup"},categoryMapping=_.fromPairs(_.flatMap({metaToolbar:"integrations print recycleBin help",optsToolbar:"settings healthCheck",roomToolbar:"grades blacklist submissions attachments participants groups quizzes contentFilter"},function(b,a){return _.map(b.split(" "),function(b){return[b,a]})})),active="activeBackstageTab active";
function showBackstage(b){$("html").css("overflow-y","auto");$("#masterFooter").hide();window.currentBackstage=b;$(".backstage").hide();"HealthCheckViewer"in window&&HealthCheckViewer.pause();$(".backstageTabHeaderGroup").hide();$(".backstageTabHeader").removeClass(active);$(".backstageCategory").removeClass("active");$(".backstageCategory").removeClass(active);$(".modeSpecificTool").removeClass(active);$(".backstage").removeClass(active);var a=$("#"+b+"Popup"),d=categoryMapping[b];$(subcategoryMapping[d]).show();
$("#backstageContainer").css("overflow-y","scroll").show();$("#hideBackstage").show();a.show();$("#applicationMenuPopup").addClass("active");$("#applicationMenuButton").addClass(active);$(".modeSpecificTool."+b).addClass(active);$("#"+d).addClass("active");$(".backstage-menu").addClass("active");$("#"+b).addClass(active);Conversations.inConversation()?($("#backstageTabHeaders").show(),$("#applicationMenuButton").show(),$("#roomToolbar").show()):($("#backstageTabHeaders").hide(),$("#applicationMenuButton").hide(),
$("#roomToolbar").hide());$(".dedicatedClose").click(hideBackstage);$("#masterLayout").css({opacity:Conversations.getCurrentConversationJid()?.3:0});Progress.call("onBackstageShow",[b])}
function hideBackstage(){$("html").css("overflow-y","hidden");$("#masterFooter").show();window.currentBackstage=noActiveBackstage;$(".backstage-menu").removeClass("active");$(".backstage").hide();$(".backstageTabHeader").removeClass(active);$(".backstage").removeClass(active);$("#applicationMenuButton").removeClass(active);$("#applicationMenuPopup").removeClass("active");$("#backstageTabHeaders").hide();$("#backstageContainer").hide();$("#hideBackstage").hide();$("#notices").show();$(".modeSpecificTool").removeClass(active);
hideSpinner();$("#masterLayout").css({opacity:1});"HealthCheckViewer"in window&&HealthCheckViewer.pause();Progress.call("onBackstageHide")}function showSpinner(){$("#loadingSlidePopup").show()}function hideSpinner(){$("#loadingSlidePopup").hide()}function toggleSubOptions(b){return function(){$(b).find(".backstageTabHeader").eq(0).click()}}
$(function(){var b=$("#heading"),a=progress().max(8);a.element.prependTo($("#progress"));a.value(0);b.text(sprintf("Logged in as %s",UserSettings.getUsername()));setupStatus();board=$("#board");boardContext=board[0].getContext("2d");b.text("Set up board");a.value(1);$("input.toolbar").addClass("commandModeInactive").addClass(commandMode?"commandModeActive":"commandModeInactive");$("#slideContainer button").addClass("commandModeInactive").addClass(commandMode?"commandModeActive":"commandModeInactive");
$("#up").click(bounceAnd(Extend.up));$("#down").click(bounceAnd(Extend.down));$("#left").click(bounceAnd(Extend.left));$("#right").click(bounceAnd(Extend.right));$("#in").click(bounceAnd(function(){Zoom["in"]()}));$("#out").click(bounceAnd(function(){Zoom.out()}));$("#drawMode").click(function(){Modes.currentMode!=Modes.draw&&Modes.draw.activate()});$("#selectMode").click(function(){Modes.currentMode!=Modes.select&&Modes.select.activate()});$("#insertText").click(function(){Modes.currentMode!=Modes.text&&
Modes.text.activate()});$("#panMode").click(function(){Modes.currentMode!=Modes.pan&&Modes.pan.activate()});$("#insertMode").click(function(){Modes.currentMode!=Modes.image&&(Modes.currentMode.deactivate(),Modes.image.activate())});$("#imageMode").click(function(){Modes.currentMode!=Modes.image&&Modes.image.activate()});$("#videoMode").click(function(){Modes.currentMode!=Modes.video&&Modes.video.activate()});$("#zoomMode").click(function(){Modes.currentMode!=Modes.zoom&&Modes.zoom.activate()});$("#feedbackMode").click(function(){Modes.currentMode!=
Modes.feedback&&Modes.feedback.activate()});$("#implicitlyExpanding").click(function(){implicitlyExpanding=$(this).is(":checked")});implicitlyExpanding&&$("#implicitlyExpanding").attr("checked",implicitlyExpanding);$("#showGrid").click(function(){showGrid=$(this).is(":checked");blit()});showGrid&&$("#showGrid").attr("checked",showGrid);a.value(2);$("#zoomToFull").click(bounceAnd(function(){zoomToFit()}));$("#zoomToPage").click(bounceAnd(function(){zoomToPage()}));$("#zoomToOriginal").click(bounceAnd(function(){zoomToOriginal()}));
window.currentBackstage=noActiveBackstage;$("#hideBackstage").click(bounceAnd(hideBackstage));$("#applicationMenuButton").click(function(){window.currentBackstage!=noActiveBackstage?hideBackstage():(showBackstage("integrations"),updateActiveMenu($("#menuIntegrations")))});loadSlidesAtNativeZoom="true"==UserSettings.getUserPref("loadSlidesAtNativeZoom");b=$("#loadSlidesAtNativeZoom");loadSlidesAtNativeZoom&&b.attr("checked",!0);b.click(bounceAnd(function(){loadSlidesAtNativeZoom=$(this).is(":checked");
UserSettings.setUserPref("loadSlidesAtNativeZoom",loadSlidesAtNativeZoom);receiveHistory(boardContent)}));b=function(b,a){var c=$("<div />");$("<div />",{text:sprintf("Choose your preferred %s",b)}).appendTo(c);a.map(function(a){return $("<div />").text(sprintf("%s px",a)).addClass("preferenceChoice").css({width:px(a),height:px(a)}).click(bounceAnd(function(){console.log("Setting user pref",b,a);UserSettings.setUserPref(b,a);var c=Modes.currentMode;Modes.none.activate();c.activate();Progress.call("onLayoutUpdated")})).appendTo(c)});
return c};$("#preferencesContainerRight").append(b("subModeSize",[30,60])).append(b("thumbnailSize",[60,100,200]));$("#preferences").click(function(){showBackstage("preferences");$("#toggleHighQualityInk");$("#toggleHighQualityInk").attr("disabled","disabled")});$("input[name=renderQuality]").change(function(){var a=$("input[name=renderQuality]:checked").val();pressureSimilarityThreshold=parseInt(a);blit()});a.value(3);$("#submissionsButton").on("click",function(){showBackstage("submissions");Submissions.reRender();
updateActiveMenu($("#menuSubmissions"))});$("#gradesButton").on("click",function(){showBackstage("grades");Grades.reRender();updateActiveMenu($("#menuGrades"))});$("#quizzesButton").on("click",function(){showBackstage("quizzes");Quizzes.reRender();updateActiveMenu($("#menuPolls"))});$("#submitScreenshotButton").on("click",function(){"Submissions"in window&&Submissions.sendSubmission()});"Conversations"in window&&($("#enableSync").on("click",Conversations.enableSyncMove),$("#disableSync").on("click",
Conversations.disableSyncMove));_.each(subcategoryMapping,function(a,b){$("#"+b).click(toggleSubOptions(a))});a.value(7);Progress.stanzaReceived.boardOnLoad=actOnReceivedStanza;Modes.select.activate();$("#progress").hide();a.value(8);$("#updatePens").click(function(){showBackstage("customizeBrush");updateActiveMenu(this)});var d=!0,g=!0,c=!0;$("#menuPrint").click(function(){showBackstage("print");updateActiveMenu(this);var a=Conversations.getCurrentConversationJid(),b=$("#rangeAll"),e=$("#rangeSpecified"),
f=$("#rangeThisSlide"),t=$("#rangeSpecifiedInput"),w=$("#printButton"),u=$("#printPrivateNotes"),n=$("#printPageCount"),p=$("#printConversationTitle"),m=Conversations.getCurrentSlide().index+1,q=function(){_.forEach([e,b,f],function(a){a.prop("checked",!1)});t.prop("disabled",!0)};u.prop("checked",d);p.prop("checked",g);n.prop("checked",c);q();f.prop("checked",!0);t.val(m);var l=function(){w.attr("target","blank").attr("href",sprintf("clientSidePrintConversation?conversationJid=%s&pageRange=%s&includePrivateContent=%s&includeConversationTitle=%s&includePageCount=%s",
a,m,d,g,c))};l();b.unbind("click");b.on("click",function(){q();$(this).prop("checked",!0);m="all";l()});e.unbind("click");e.on("click",function(){q();$(this).prop("checked",!0);t.prop("disabled",!1);m=t.val();l()});t.unbind("change");t.on("change",function(){m=$(this).val();l()});f.unbind("click");f.on("click",function(){q();$(this).prop("checked",!0);m=Conversations.getCurrentSlide().index+1;l()});u.unbind("change");u.on("change",function(){d=$(this).prop("checked");l()});p.unbind("change");p.on("change",
function(){g=$(this).prop("checked");l()});n.unbind("change");n.on("change",function(){c=$(this).prop("checked");l()})});$("#menuGroups").click(function(){showBackstage("groups");updateActiveMenu(this)});$("#menuGrades").click(function(){showBackstage("grades");updateActiveMenu(this);Grades.reRender()});$("#menuSubmissions").click(function(){showBackstage("submissions");updateActiveMenu(this);Submissions.reRender()});$("#menuPolls").click(function(){showBackstage("quizzes");updateActiveMenu(this);
Quizzes.reRender()});$("#menuBlacklist").click(function(){showBackstage("blacklist");updateActiveMenu(this);Blacklist.reRender()});$("#menuSettings").click(function(){showBackstage("settings");updateActiveMenu(this)});$("#menuIntegrations").click(function(){showBackstage("integrations");updateActiveMenu(this)});$("#menuHelp").click(function(){showBackstage("help");updateActiveMenu(this)});$("#menuHealthCheck").click(function(){showBackstage("healthCheck");updateActiveMenu(this);"HealthCheckViewer"in
window&&HealthCheckViewer.resume()});$("#conversations").click(function(){window.location.href="/conversationSearch"});var v=$("#pasteDialogTemplate").clone();$("#pasteDialogTemplate").remove();var f=function(a){var b="dataTransfer"in a?a.dataTransfer:a.clipboardData;if("types"in b){var c=a.offsetX||10,d=a.offsetY||10,e=b.types,f=_.map(e,function(a){return{key:a,value:b.getData(a)}}),g=function(a,c,d){a=_.find(a,c);void 0!=a&&null!=a&&d(a,b.getData(a))};if(1<_.size(e)){var g=sprintf("pasteEventHandler_%s",
_.uniqueId()),n=v.clone().attr("id",g),p=n.find(".dialogOptions"),m=p.find(".dialogOption").clone();p.empty();var q=$.jAlert({title:"Data to paste",content:n[0].outerHTML,closeOnClick:!0,closeOnEsc:!0,blurBackground:!0}),l=[{key:function(a){return"text/html"==a},name:"rich text and images",faClass:"fa-file-code-o",onClick:function(a){var b=_.find(f,function(b){return b.key==a}).value,e=$(b),h=0,b=_.join(_.map(e,function(a){return a.outerHTML}),"");_.forEach(e.find("img"),function(a){try{Modes.image.handleDroppedSrc(a.src,
c,d+h),h+=Math.max(a.height,50)}catch(b){errorAlert("Error dropping image","The source server you're draggin the image from does not want to allow dragging the image directly.  You may need to download the image first and then upload it.  "+b)}});1<e.text().trim().length&&Modes.text.handleDrop(b,c,d+h)}},{key:function(a){return"text/plain"==a},name:"plain text",faClass:"fa-file-text-o",onClick:function(a){var b=_.find(f,function(b){return b.key==a}).value;Modes.text.handleDrop(b,c,d)}},{key:function(a){return"Files"==
a},name:"files or images",faClass:"fa-file-o",onClick:function(a){Modes.image.handleDrop(b,c,d)}},{key:function(a){return 0==a.indexOf("image/")},name:"images",faClass:"fa-file-image-o",onClick:function(a){Modes.image.handleDrop(b,c,d)}}];$("#"+g).find(".dialogOptions").html(_.map(_.filter(e,function(a){return _.some(l,function(b){return b.key(a)})}),function(a){var b=_.find(l,function(b){return b.key(a)}),c=m.clone(),d=c.find("button");d.addClass(b.faClass);d.on("click",function(){b.onClick(a);q.closeAlert()});
d.find(".icon-txt").text(b.name);return c}))}else{var r=!1;g(e,function(a){return"Files"==a},function(a,e){r||(Modes.image.handleDrop(b,c,d),r=!0)});g(e,function(a){return 0==a.indexOf("image")},function(a,e){r||(Modes.image.handleDrop(b,c,d),r=!0)});g(e,function(a){return"text/html"==a},function(a,b){if(!r){var e=$(b),h=0;b=_.join(_.map(e,function(a){return a.outerHTML}),"");_.forEach(e.find("img"),function(a){try{Modes.image.handleDroppedSrc(a.src,c,d+h),h+=Math.max(a.height,50)}catch(b){errorAlert("Error dropping image",
"The source server you're draggin the image from does not want to allow dragging the image directly.  You may need to download the image first and then upload it.  "+b)}});1<e.text().trim().length&&Modes.text.handleDrop(b,c,d+h);r=!0}});g(e,function(a){return 0==a.indexOf("text")},function(a,b){r||(Modes.text.handleDrop(b,c,d),r=!0)});r||console.log("unknown type",b)}a.preventDefault();return!1}return!0};window.addEventListener("paste",function(a){return"originalEvent"in a?f(a.originalEvent):f(a)});
$("#board").on("drop",function(a){return"originalEvent"in a?f(a.originalEvent):!1});(new Clipboard(".deeplink",{text:function(a){return $(a.nextElementSibling).find("a")[0].href}})).on("success",function(a){console.log(a);alert("Link copied to clipboard")}).on("error",function(a){console.error("Action:",a.action);console.error("Trigger:",a.trigger)});var e=function(a){a.preventDefault();return!1};$(document).on("drop",e);window.onbeforepaste=e;_.forEach(["dragover","dragleave","dragenter"],function(a){window["on"+
a]=e;$(window).on(a,e);$("#board")[0]["on"+a]=e;$("#board").on(a,e)})});
