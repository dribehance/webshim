jQuery.webshims.register("form-datalist",function(c,d,l,f,m){d.propTypes.element=function(f){d.createPropDefault(f,"attr");if(!f.prop)f.prop={get:function(){var d=f.attr.get.call(this);d&&(d=c("#"+d)[0])&&f.propNodeName&&!c.nodeName(d,f.propNodeName)&&(d=null);return d||null},writeable:!1}};(function(){if(!Modernizr.input.list){var i=0,k={submit:1,button:1,reset:1,hidden:1,range:1,date:1},s=c.browser.msie&&7>parseInt(c.browser.version,10),n={},p=function(c){if(!c)return[];if(n[c])return n[c];var e;
try{e=JSON.parse(localStorage.getItem("storedDatalistOptions"+c))}catch(b){}n[c]=e||[];return e||[]},t={_create:function(a){if(!k[c.prop(a.input,"type")]){var e=a.datalist,b=c.data(a.input,"datalistWidget");if(e&&b&&b.datalist!==e)b.datalist=e,b.id=a.id,c(b.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",c.proxy(b,"_resetListCached")),b._resetListCached();else if(e){if(!(b&&b.datalist===e)){i++;var g=this;this.hideList=c.proxy(g,"hideList");this.timedHide=function(){clearTimeout(g.hideTimer);
g.hideTimer=setTimeout(g.hideList,9)};this.datalist=e;this.id=a.id;this.hasViewableData=!0;this._autocomplete=c.attr(a.input,"autocomplete");c.data(a.input,"datalistWidget",this);this.shadowList=c('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=a.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget",function(b){var a=c("li:not(.hidden-item)",g.shadowList),e="mousedown"==b.type||"click"==b.type;
g.markItem(a.index(b.currentTarget),e,a);"click"==b.type&&g.hideList();return"mousedown"!=b.type}).bind("focusout",this.timedHide);a.input.setAttribute("autocomplete","off");c(a.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",function(){if(!g.triggeredByDatalist)g.changedValue=!1,g.showHideOptions()}).bind("keydown.datalistWidget",function(b){var a=b.keyCode;if(40==a&&!g.showList())return g.markItem(g.index+1,!0),!1;if(g.isListVisible){if(38==a)return g.markItem(g.index-1,!0),!1;
if(!b.shiftKey&&(33==a||36==a))return g.markItem(0,!0),!1;if(!b.shiftKey&&(34==a||35==a))return b=c("li:not(.hidden-item)",g.shadowList),g.markItem(b.length-1,!0,b),!1;if(13==a||27==a)return 13==a&&g.changeValue(c("li.active-item:not(.hidden-item)",g.shadowList)),g.hideList(),!1}}).bind("focus.datalistWidget",function(){c(this).hasClass("list-focus")&&g.showList()}).bind("mousedown.datalistWidget",function(){(this==f.activeElement||c(this).is(":focus"))&&g.showList()}).bind("blur.datalistWidget",
this.timedHide);c(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",c.proxy(this,"_resetListCached"));this._resetListCached();a.input.form&&a.input.id&&c(a.input.form).bind("submit.datalistWidget"+a.input.id,function(){var b=c.prop(a.input,"value"),e=(a.input.name||a.input.id)+c.prop(a.input,"type");if(!g.storedOptions)g.storedOptions=p(e);if(b&&-1==g.storedOptions.indexOf(b)&&(g.storedOptions.push(b),b=g.storedOptions,e)){b=b||[];try{localStorage.setItem("storedDatalistOptions"+
e,JSON.stringify(b))}catch(d){}}});c(l).bind("unload",function(){g.destroy()})}}else b&&b.destroy()}},destroy:function(){var a=c.attr(this.input,"autocomplete");c(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();c(f).unbind(".datalist"+this.id);this.input.form&&this.input.id&&c(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");a===m?this.input.removeAttribute("autocomplete"):c(this.input).attr("autocomplete",
a)},_resetListCached:function(c){var e=this,b;this.needsUpdate=!0;this.lastUpdatedValue=!1;this.lastUnfoundValue="";this.updateTimer||(l.QUnit||(b=c&&f.activeElement==e.input)?e.updateListOptions(b):d.ready("WINDOWLOAD",function(){e.updateTimer=setTimeout(function(){e.updateListOptions();e=null;i=1},200+100*i)}))},updateListOptions:function(a){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:c.curCSS(this.input,"fontSize"),fontFamily:c.curCSS(this.input,
"fontFamily")});var e=[],b=[],g=[],h,d,q,f;for(d=c.prop(this.datalist,"options"),q=0,f=d.length;q<f;q++){h=d[q];if(h.disabled)return;h={value:c(h).val()||"",text:c.trim(c.attr(h,"label")||h.textContent||h.innerText||c.text([h])||""),className:h.className||"",style:c.attr(h,"style")||""};h.text?h.text!=h.value&&(h.className+=" different-label-value"):h.text=h.value;b[q]=h.value;g[q]=h}if(!this.storedOptions)this.storedOptions=p((this.input.name||this.input.id)+c.prop(this.input,"type"));this.storedOptions.forEach(function(c){-1==
b.indexOf(c)&&g.push({value:c,text:c,className:"stored-suggest",style:""})});for(q=0,f=g.length;q<f;q++)d=g[q],e[q]='<li class="'+d.className+'" style="'+d.style+'" tabindex="-1" role="listitem"><span class="option-label">'+d.text+'</span> <span class="option-value">'+d.value+"</span></li>";this.arrayOptions=g;this.shadowList.html('<ul role="list" class="'+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom">'+e.join("\n")+"</ul>");c.fn.bgIframe&&s&&this.shadowList.bgIframe();(a||this.isListVisible)&&
this.showHideOptions()},showHideOptions:function(a){var e=c.prop(this.input,"value").toLowerCase();if(!(e===this.lastUpdatedValue||this.lastUnfoundValue&&0===e.indexOf(this.lastUnfoundValue))){this.lastUpdatedValue=e;var b=!1,g=c("li",this.shadowList);e?this.arrayOptions.forEach(function(a,d){if(!("lowerText"in a))a.lowerText=a.text!=a.value?a.text.toLowerCase()+a.value.toLowerCase():a.text.toLowerCase();-1!==a.lowerText.indexOf(e)?(c(g[d]).removeClass("hidden-item"),b=!0):c(g[d]).addClass("hidden-item")}):
g.length&&(g.removeClass("hidden-item"),b=!0);this.hasViewableData=b;!a&&b&&this.showList();if(!b)this.lastUnfoundValue=e,this.hideList()}},setPos:function(){var a=d.getRelOffset(this.shadowList,this.input);a.top+=c(this.input).outerHeight();a.width=c(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);this.shadowList.css(a);return a},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();
this.showHideOptions(!0);if(!this.hasViewableData)return!1;this.isListVisible=!0;var a=this,d;a.setPos();s&&(a.shadowList.css("height","auto"),250<a.shadowList.height()&&a.shadowList.css("height",220));a.shadowList.addClass("datalist-visible");c(f).unbind(".datalist"+a.id).bind("mousedown.datalist"+a.id+" focusin.datalist"+a.id,function(b){b.target===a.input||a.shadowList[0]===b.target||c.contains(a.shadowList[0],b.target)?(clearTimeout(a.hideTimer),setTimeout(function(){clearTimeout(a.hideTimer)},
9)):a.timedHide()});c(l).unbind(".datalist"+a.id).bind("resize.datalist"+a.id+"orientationchange.datalist "+a.id+" emchange.datalist"+a.id,function(){clearTimeout(d);d=setTimeout(function(){a.setPos()},9)});clearTimeout(d);return!0},hideList:function(){if(!this.isListVisible)return!1;var a=this,e=function(){a.changedValue&&c(a.input).trigger("change");a.changedValue=!1};a.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");a.index=
-1;a.isListVisible=!1;if(a.changedValue){a.triggeredByDatalist=!0;d.triggerInlineForm&&d.triggerInlineForm(a.input,"input");if(a.input==f.activeElement||c(a.input).is(":focus"))c(a.input).one("blur",e);else e();a.triggeredByDatalist=!1}c(f).unbind(".datalist"+a.id);c(l).unbind(".datalist"+a.id);return!0},scrollIntoView:function(a){var d=c("> ul",this.shadowList),b=a.position();b.top-=(parseInt(d.css("paddingTop"),10)||0)+(parseInt(d.css("marginTop"),10)||0)+(parseInt(d.css("borderTopWidth"),10)||
0);0>b.top?this.shadowList.scrollTop(this.shadowList.scrollTop()+b.top-2):(b.top+=a.outerHeight(),a=this.shadowList.height(),b.top>a&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(b.top-a)+2))},changeValue:function(a){if(a[0]){var a=c("span.option-value",a).text(),d=c.prop(this.input,"value");if(a!=d)c(this.input).prop("value",a).triggerHandler("updateInput"),this.changedValue=!0}},markItem:function(a,d,b){b=b||c("li:not(.hidden-item)",this.shadowList);if(b.length)0>a?a=b.length-1:a>=b.length&&
(a=0),b.removeClass("active-item"),this.shadowList.addClass("list-item-active"),b=b.filter(":eq("+a+")").addClass("active-item"),d&&(this.changeValue(b),this.scrollIntoView(b)),this.index=a}};(function(){d.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var a=c("select",this);a[0]?a=a[0].options:(a=c("option",this).get(),a.length&&d.warn("you should wrap you option-elements for a datalist in a select element to support IE and other old browsers."));return a}}});d.defineNodeNameProperties("input",
{selectedOption:{prop:{writeable:!1,get:function(){var a=c.prop(this,"list"),d=null,b;if(!a)return d;b=c.attr(this,"value");if(!b)return d;a=c.prop(a,"options");if(!a.length)return d;c.each(a,function(a,h){if(b==c.prop(h,"value"))return d=h,!1});return d}}},autocomplete:{attr:{get:function(){var a=c.data(this,"datalistWidget");return a?a._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(a){var d=c.data(this,"datalistWidget");d?(d._autocomplete=a,
"off"==a&&d.hideList()):"autocomplete"in this?this.autocomplete=a:this.setAttribute("autocomplete",a)}}},list:{attr:{get:function(){var c=d.contentAttr(this,"list");return null==c?m:c},set:function(a){d.contentAttr(this,"list",a);d.objectCreate(t,m,{input:this,id:a,datalist:c.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"}});if(c.event.customEvent)c.event.customEvent.updateDatalist=!0,c.event.customEvent.updateInput=!0;d.addReady(function(c,d){d.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").triggerHandler("updateDatalist")})})()}})()});
jQuery.webshims.register("form-extend",function(c,d,l,f,m,i){l=l.Modernizr;m=l.inputtypes;if(l.formvalidation&&!d.bugs.bustedValidity){var k=d.inputTypes,s={};d.addInputType=function(b,c){k[b]=c};d.addValidityRule=function(b,c){s[b]=c};d.addValidityRule("typeMismatch",function(b,c,a,d){if(""===c)return!1;d=d.typeMismatch;if(!("type"in a))a.type=(b[0].getAttribute("type")||"").toLowerCase();k[a.type]&&k[a.type].mismatch&&(d=k[a.type].mismatch(c,b));return d});var n=i.overrideMessages,p=!m.number||
!m.time||!m.range||n,t="customError,typeMismatch,rangeUnderflow,rangeOverflow,stepMismatch,tooLong,patternMismatch,valueMissing,valid".split(","),i=n?["value","checked"]:["value"],a=[],e=function(b,a){if(b){var d=(b.getAttribute&&b.getAttribute("type")||b.type||"").toLowerCase();if(n||k[d])n&&!a&&"radio"==d&&b.name?c(f.getElementsByName(b.name)).each(function(){c.prop(this,"validity")}):c.prop(b,"validity")}},b={};["input","textarea","select"].forEach(function(a){var g=d.defineNodeNameProperty(a,
"setCustomValidity",{prop:{value:function(b){var b=b+"",h="input"==a?c(this).getNativeElement()[0]:this;g.prop._supvalue.call(h,b);d.bugs.validationMessage&&d.data(h,"customvalidationMessage",b);p&&(d.data(h,"hasCustomError",!!b),e(h))}}});b[a]=g.prop._supvalue});if(p||n)i.push("min"),i.push("max"),i.push("step"),a.push("input");n&&(i.push("required"),i.push("pattern"),a.push("select"),a.push("textarea"));if(p){var g;a.forEach(function(a){var h=d.defineNodeNameProperty(a,"validity",{prop:{get:function(){if(!g){var e=
"input"==a?c(this).getNativeElement()[0]:this,v=h.prop._supget.call(e);if(!v)return v;var o={};t.forEach(function(b){o[b]=v[b]});if(!c.prop(e,"willValidate"))return o;g=!0;var j=c(e),w={type:(e.getAttribute&&e.getAttribute("type")||"").toLowerCase(),nodeName:(e.nodeName||"").toLowerCase()},f=j.val(),i=!!d.data(e,"hasCustomError"),u;g=!1;o.customError=i;if(o.valid&&o.customError)o.valid=!1;else if(!o.valid){var r=!0;c.each(o,function(b,c){if(c)return r=!1});if(r)o.valid=!0}c.each(s,function(c,g){o[c]=
g(j,f,w,o);if(o[c]&&(o.valid||!u)&&(n||k[w.type]&&k[w.type].mismatch))b[a].call(e,d.createValidationMessage(e,c)),o.valid=!1,u=!0});o.valid?(b[a].call(e,""),d.data(e,"hasCustomError",!1)):n&&!u&&!i&&c.each(o,function(c,j){if("valid"!==c&&j)return b[a].call(e,d.createValidationMessage(e,c)),!1});return o}},writeable:!1}})});i.forEach(function(b){d.onNodeNamesPropertyModify(a,b,function(){e(this)})});if(f.addEventListener){var h;f.addEventListener("change",function(b){clearTimeout(h);e(b.target)},!0);
f.addEventListener("input",function(b){clearTimeout(h);h=setTimeout(function(){e(b.target)},290)},!0)}var u=a.join(",");d.addReady(function(b,a){c(u,b).add(a.filter(u)).each(function(){c.prop(this,"validity")})});n&&d.ready("DOM form-message",function(){d.activeLang({register:"form-core",callback:function(){c("input, select, textarea").getNativeElement().each(function(){if(!d.data(this,"hasCustomError")){var a=this,g=c.prop(a,"validity")||{valid:!0},h;g.valid||(h=(a.nodeName||"").toLowerCase(),c.each(g,
function(c,o){if("valid"!==c&&o)return b[h].call(a,d.createValidationMessage(a,c)),!1}))}})}})})}d.defineNodeNameProperty("input","type",{prop:{get:function(){var b=(this.getAttribute("type")||"").toLowerCase();return d.inputTypes[b]?b:this.type}}});l.input.list&&!(c("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&d.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var b=this.options||[];if(!b.length){var a=c("select",this);if(a[0]&&
a[0].options&&a[0].options.length)b=a[0].options}return b}}})}});
jQuery.webshims.register("form-number-date-api",function(c,d){if(!d.getStep)d.getStep=function(b,a){var d=c.attr(b,"step");if("any"===d)return d;a=a||k(b);if(!f[a]||!f[a].step)return d;d=e.number.asNumber(d);return(!isNaN(d)&&0<d?d:f[a].step)*f[a].stepScaleFactor};if(!d.addMinMaxNumberToCache)d.addMinMaxNumberToCache=function(b,c,a){b+"AsNumber"in a||(a[b+"AsNumber"]=f[a.type].asNumber(c.attr(b)),isNaN(a[b+"AsNumber"])&&b+"Default"in f[a.type]&&(a[b+"AsNumber"]=f[a.type][b+"Default"]))};var l=parseInt("NaN",
10),f=d.inputTypes,m=function(b){return"number"==typeof b||b&&b==1*b},i=function(b){return c('<input type="'+b+'" />').prop("type")===b},k=function(b){return(b.getAttribute("type")||"").toLowerCase()},s=d.addMinMaxNumberToCache,n=function(b,c){for(var b=""+b,c=c-b.length,a=0;a<c;a++)b="0"+b;return b},p=d.bugs.valueAsNumberSet||d.bugs.bustedValidity;d.addValidityRule("stepMismatch",function(b,c,a,e){if(""===c)return!1;if(!("type"in a))a.type=k(b[0]);if("date"==a.type)return!1;e=(e||{}).stepMismatch;
if(f[a.type]&&f[a.type].step){if(!("step"in a))a.step=d.getStep(b[0],a.type);if("any"==a.step)return!1;if(!("valueAsNumber"in a))a.valueAsNumber=f[a.type].asNumber(c);if(isNaN(a.valueAsNumber))return!1;s("min",b,a);b=a.minAsNumber;isNaN(b)&&(b=f[a.type].stepBase||0);e=Math.abs((a.valueAsNumber-b)%a.step);e=!(1.0E-7>=e||1.0E-7>=Math.abs(e-a.step))}return e});[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(b){d.addValidityRule(b.name,function(c,
a,d,e){e=(e||{})[b.name]||!1;if(""===a)return e;if(!("type"in d))d.type=k(c[0]);if(f[d.type]&&f[d.type].asNumber){if(!("valueAsNumber"in d))d.valueAsNumber=f[d.type].asNumber(a);if(isNaN(d.valueAsNumber))return!1;s(b.attr,c,d);if(isNaN(d[b.attr+"AsNumber"]))return e;e=d[b.attr+"AsNumber"]*b.factor<d.valueAsNumber*b.factor-1.0E-7}return e})});d.reflectProperties(["input"],["max","min","step"]);var t=d.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var b=k(this),b=f[b]&&f[b].asNumber?
f[b].asNumber(c.prop(this,"value")):t.prop._supget&&t.prop._supget.apply(this,arguments);null==b&&(b=l);return b},set:function(b){var a=k(this);f[a]&&f[a].numberToString?isNaN(b)?c.prop(this,"value",""):(a=f[a].numberToString(b),!1!==a?c.prop(this,"value",a):d.warn("INVALID_STATE_ERR: DOM Exception 11")):t.prop._supset&&t.prop._supset.apply(this,arguments)}}}),a=d.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var b=k(this);return f[b]&&f[b].asDate&&!f[b].noAsDate?f[b].asDate(c.prop(this,
"value")):a.prop._supget&&a.prop._supget.call(this)||null},set:function(b){var e=k(this);if(f[e]&&f[e].dateToString&&!f[e].noAsDate){if(null===b)return c.prop(this,"value",""),"";e=f[e].dateToString(b);if(!1!==e)return c.prop(this,"value",e),e;d.warn("INVALID_STATE_ERR: DOM Exception 11")}else return a.prop._supset&&a.prop._supset.apply(this,arguments)||null}}}),e={number:{mismatch:function(b){return!m(b)},step:1,stepScaleFactor:1,asNumber:function(b){return m(b)?1*b:l},numberToString:function(b){return m(b)?
b:!1}},range:{minDefault:0,maxDefault:100},date:{mismatch:function(b){if(!b||!b.split||!/\d$/.test(b))return!0;var a=b.split(/\u002D/);if(3!==a.length)return!0;var d=!1;c.each(a,function(b,c){if(!(m(c)||c&&c=="0"+1*c))return d=!0,!1});if(d)return d;if(4!==a[0].length||2!=a[1].length||12<a[1]||2!=a[2].length||33<a[2])d=!0;return b!==this.dateToString(this.asDate(b,!0))},step:1,stepScaleFactor:864E5,asDate:function(b,c){return!c&&this.mismatch(b)?null:new Date(this.asNumber(b,!0))},asNumber:function(b,
c){var a=l;if(c||!this.mismatch(b))b=b.split(/\u002D/),a=Date.UTC(b[0],b[1]-1,b[2]);return a},numberToString:function(b){return m(b)?this.dateToString(new Date(1*b)):!1},dateToString:function(b){return b&&b.getFullYear?b.getUTCFullYear()+"-"+n(b.getUTCMonth()+1,2)+"-"+n(b.getUTCDate(),2):!1}},time:{mismatch:function(b,a){if(!b||!b.split||!/\d$/.test(b))return!0;b=b.split(/\u003A/);if(2>b.length||3<b.length)return!0;var d=!1,e;b[2]&&(b[2]=b[2].split(/\u002E/),e=parseInt(b[2][1],10),b[2]=b[2][0]);c.each(b,
function(b,c){if(!(m(c)||c&&c=="0"+1*c)||2!==c.length)return d=!0,!1});if(d||23<b[0]||0>b[0]||59<b[1]||0>b[1]||b[2]&&(59<b[2]||0>b[2])||e&&isNaN(e))return!0;e&&(100>e?e*=100:10>e&&(e*=10));return!0===a?[b,e]:!1},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(b){b=new Date(this.asNumber(b));return isNaN(b)?null:b},asNumber:function(b){var c=l,b=this.mismatch(b,!0);!0!==b&&(c=Date.UTC("1970",0,1,b[0][0],b[0][1],b[0][2]||0),b[1]&&(c+=b[1]));return c},dateToString:function(b){if(b&&b.getUTCHours){var c=
n(b.getUTCHours(),2)+":"+n(b.getUTCMinutes(),2),a=b.getSeconds();"0"!=a&&(c+=":"+n(a,2));a=b.getUTCMilliseconds();"0"!=a&&(c+="."+n(a,3));return c}return!1}},"datetime-local":{mismatch:function(c,a){if(!c||!c.split||2!==(c+"special").split(/\u0054/).length)return!0;c=c.split(/\u0054/);return e.date.mismatch(c[0])||e.time.mismatch(c[1],a)},noAsDate:!0,asDate:function(c){c=new Date(this.asNumber(c));return isNaN(c)?null:c},asNumber:function(c){var a=l,d=this.mismatch(c,!0);!0!==d&&(c=c.split(/\u0054/)[0].split(/\u002D/),
a=Date.UTC(c[0],c[1]-1,c[2],d[0][0],d[0][1],d[0][2]||0),d[1]&&(a+=d[1]));return a},dateToString:function(c,a){return e.date.dateToString(c)+"T"+e.time.dateToString(c,a)}}};if(p||!i("range")||!i("time")||!i("datetime-local"))e.range=c.extend({},e.number,e.range),e.time=c.extend({},e.date,e.time),e["datetime-local"]=c.extend({},e.date,e.time,e["datetime-local"]);(p||!i("number"))&&d.addInputType("number",e.number);(p||!i("range"))&&d.addInputType("range",e.range);(p||!i("date"))&&d.addInputType("date",
e.date);(p||!i("time"))&&d.addInputType("time",e.time);(p||!i("datetime-local"))&&d.addInputType("datetime-local",e["datetime-local"])});
jQuery.webshims.register("form-number-date-ui",function(c,d,l,f,m,i){var k=d.triggerInlineForm,s=Modernizr.inputtypes,n=function(){var c={"padding-box":"innerWidth","border-box":"outerWidth","content-box":"width"},b=Modernizr.prefixed&&Modernizr.prefixed("boxSizing");return function(a,d){var e,f,g;f="width";b&&(f=c[a.css(b)]||f);e=a[f]();f="width"==f;if(e){var r=parseInt(d.css("marginLeft"),10)||0,i=d.outerWidth();(g=parseInt(a.css("marginRight"),10)||0)&&a.css("marginRight",0);r<=-1*i?(d.css("marginRight",
Math.floor(Math.abs(i+r)+g)),a.css("paddingRight",(parseInt(a.css("paddingRight"),10)||0)+Math.abs(r)),f&&a.css("width",Math.floor(e+r))):(d.css("marginRight",g),a.css("width",Math.floor(e-r-i)))}}}(),p={dateFormat:"yy-mm-dd"},t=c([]),a,e=function(b,a){c("input",b).add(a.filter("input")).each(function(){var b=c.prop(this,"type");if(e[b]&&!d.data(this,"shadowData"))e[b](c(this))})},b=function(b,a){if(i.lazyDate){var d=c.data(b[0],"setDateLazyTimer");d&&clearTimeout(d);c.data(b[0],"setDateLazyTimer",
setTimeout(function(){b.datepicker("setDate",a);c.removeData(b[0],"setDateLazyTimer");b=null},0))}else b.datepicker("setDate",a)};if(i.lazyDate===m)try{i.lazyDate=c.browser.msie&&9>d.browserVersion||500>c(l).width()&&500>c(l).height()}catch(g){}var h={tabindex:1,tabIndex:1,title:1,"aria-required":1,"aria-invalid":1};if(!i.copyAttrs)i.copyAttrs={};d.extendUNDEFProp(i.copyAttrs,h);e.common=function(b,e,j){Modernizr.formvalidation&&b.bind("firstinvalid",function(c){(d.fromSubmit||!a)&&b.unbind("invalid.replacedwidgetbubble").bind("invalid.replacedwidgetbubble",
function(a){!c.isInvalidUIPrevented()&&!a.isDefaultPrevented()&&(d.validityAlert.showFor(c.target),c.preventDefault(),a.preventDefault());b.unbind("invalid.replacedwidgetbubble")})});var f,g,k=c("input, span.ui-slider-handle",e),l=b[0].attributes;for(f in i.copyAttrs)if((g=l[f])&&g.specified)h[f]&&k[0]?k.attr(f,g.nodeValue):e[0].setAttribute(f,g.nodeValue);g=b.attr("id");f=i.calculateWidth?{css:{marginRight:b.css("marginRight"),marginLeft:b.css("marginLeft")},outerWidth:b.outerWidth()}:{};f.label=
g?c('label[for="'+g+'"]',b[0].form):t;g=d.getID(f.label);e.addClass(b[0].className);d.addShadowDom(b,e,{data:j||{},shadowFocusElement:c("input.input-datetime-local-date, span.ui-slider-handle",e)[0],shadowChilds:k});b.after(e).hide();b[0].form&&c(b[0].form).bind("reset",function(c){c.originalEvent&&!c.isDefaultPrevented()&&setTimeout(function(){b.prop("value",b.prop("value"))},0)});1==e.length&&!c("*",e)[0]&&(e.attr("aria-labelledby",g),f.label.bind("click",function(){e.focus();return!1}));return f};
Modernizr.formvalidation&&["input","form"].forEach(function(c){var b=d.defineNodeNameProperty(c,"checkValidity",{prop:{value:function(){a=!0;var c=b.prop._supvalue.apply(this,arguments);a=!1;return c}}})});if(!s["datetime-local"]||i.replaceUI){var u=[0.595,0.395],q=[0.565,0.425],x=!c.browser.msie||6<d.browserVersion?0:0.45,y=function(b,a,e,g){var h,k,l=function(){r.dpDiv.unbind("mousedown.webshimsmousedownhandler");k=h=!1},r=a.bind("focusin",function(){l();r.dpDiv.unbind("mousedown.webshimsmousedownhandler").bind("mousedown.webshimsmousedownhandler",
function(){h=!0})}).bind("focusout blur",function(c){h&&(k=!0,c.stopImmediatePropagation())}).datepicker(c.extend({onClose:function(){k&&f.activeElement!==a[0]?(l(),a.trigger("focusout"),a.triggerHandler("blur")):l()}},p,i.datepicker,b.data("datepicker"))).bind("change",e).data("datepicker");r.dpDiv.addClass("input-date-datepicker-control");g&&d.triggerDomUpdate(g[0]);["disabled","min","max","value","step"].forEach(function(c){var a=b.prop(c);""!==a&&("disabled"!=c||!a)&&b.prop(c,a)});return r};e["datetime-local"]=
function(b){if(c.fn.datepicker){var a=c('<span role="group" class="input-datetime-local"><input type="text" class="input-datetime-local-date" /><input type="time" class="input-datetime-local-time" /></span>'),d=this.common(b,a,e["datetime-local"].attrs),f=c("input.input-datetime-local-date",a),g=y(b,f,function(d){var j=f.prop("value")||"",g="";if(i.lazyDate){var z=c.data(f[0],"setDateLazyTimer");z&&(clearTimeout(z),c.removeData(f[0],"setDateLazyTimer"))}if(j){g=c("input.input-datetime-local-time",
a).prop("value")||"00:00";try{j=(j=c.datepicker.parseDate(f.datepicker("option","dateFormat"),j))?c.datepicker.formatDate("yy-mm-dd",j):f.prop("value")}catch(h){j=f.prop("value")}}e["datetime-local"].blockAttr=!0;b.prop("value",!j&&!g?"":j+"T"+g);e["datetime-local"].blockAttr=!1;d.stopImmediatePropagation();k(b[0],"input");k(b[0],"change")},a);c("input.input-datetime-local-time",a).bind("change",function(a){var d=c.prop(this,"value"),j=["",""];if(d){j=b.prop("value").split("T");if(2>j.length||!j[0])j[0]=
c.datepicker.formatDate("yy-mm-dd",new Date);if(j[1]=d)try{f.prop("value",c.datepicker.formatDate(f.datepicker("option","dateFormat"),c.datepicker.parseDate("yy-mm-dd",j[0])))}catch(o){}}j=!j[0]&&!j[1]?"":j.join("T");e["datetime-local"].blockAttr=!0;b.prop("value",j);e["datetime-local"].blockAttr=!1;a.stopImmediatePropagation();k(b[0],"input");k(b[0],"change")});a.attr("aria-labelledby",d.label.attr("id"));d.label.bind("click",function(){f.focus();return!1});if(d.css&&(a.css(d.css),d.outerWidth)){a.outerWidth(d.outerWidth);
var d=a.width(),h=g.trigger[0]?u:q;f.outerWidth(Math.floor(d*h[0]-x),!0);c("input.input-datetime-local-time",a).outerWidth(Math.floor(d*h[1]-x),!0);g.trigger[0]&&n(f,g.trigger)}}};e["datetime-local"].attrs={disabled:function(b,a,d){c("input.input-datetime-local-date",a).prop("disabled",!!d);c("input.input-datetime-local-time",a).prop("disabled",!!d)},step:function(b,a,d){c("input.input-datetime-local-time",a).attr("step",d)},min:function(b,a,d){if(d){d=d.split?d.split("T"):[];try{d=c.datepicker.parseDate("yy-mm-dd",
d[0])}catch(e){d=!1}}d||(d=null);c("input.input-datetime-local-date",a).datepicker("option","minDate",d)},max:function(b,a,d){if(d){d=d.split?d.split("T"):[];try{d=c.datepicker.parseDate("yy-mm-dd",d[0])}catch(e){d=!1}}d||(d=null);c("input.input-datetime-local-date",a).datepicker("option","maxDate",d)},value:function(a,d,j){var f;if(j){j=j.split?j.split("T"):[];try{f=c.datepicker.parseDate("yy-mm-dd",j[0])}catch(g){f=!1}}f?(e["datetime-local"].blockAttr||b(c("input.input-datetime-local-date",d),f),
c("input.input-datetime-local-time",d).prop("value",j[1]||"00:00")):(c("input.input-datetime-local-date",d).prop("value",j[0]||""),c("input.input-datetime-local-time",d).prop("value",j[1]||""))}};e.date=function(b){if(c.fn.datepicker){var a=c('<input class="input-date" type="text" />'),d=this.common(b,a,e.date.attrs),f=y(b,a,function(d){e.date.blockAttr=!0;var f;if(i.lazyDate){var j=c.data(a[0],"setDateLazyTimer");j&&(clearTimeout(j),c.removeData(a[0],"setDateLazyTimer"))}try{f=(f=c.datepicker.parseDate(a.datepicker("option",
"dateFormat"),a.prop("value")))?c.datepicker.formatDate("yy-mm-dd",f):a.prop("value")}catch(g){f=a.prop("value")}b.prop("value",f);e.date.blockAttr=!1;d.stopImmediatePropagation();k(b[0],"input");k(b[0],"change")});d.css&&(a.css(d.css),d.outerWidth&&a.outerWidth(d.outerWidth),f.trigger[0]&&n(a,f.trigger))}};e.date.attrs={disabled:function(b,a,d){c.prop(a,"disabled",!!d)},min:function(b,a,d){try{d=c.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&c(a).datepicker("option","minDate",d)},max:function(b,
a,d){try{d=c.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&c(a).datepicker("option","maxDate",d)},value:function(a,d,f){if(!e.date.blockAttr){try{var g=c.datepicker.parseDate("yy-mm-dd",f)}catch(i){g=!1}g?b(c(d),g):c.prop(d,"value",f)}}}}if(!s.range||i.replaceUI)e.range=function(b){if(c.fn.slider){var a=c('<span class="input-range"><span class="ui-slider-handle" role="slider" tabindex="0" /></span>'),d=this.common(b,a,e.range.attrs);c("span",a).attr("aria-labelledby",d.label.attr("id"));d.label.bind("click",
function(){c("span",a).focus();return!1});d.css&&(a.css(d.css),d.outerWidth&&a.outerWidth(d.outerWidth));a.slider(c.extend({},i.slider,b.data("slider"),{slide:function(c,a){if(c.originalEvent)e.range.blockAttr=!0,b.prop("value",a.value),e.range.blockAttr=!1,k(b[0],"input"),k(b[0],"change")}}));["disabled","min","max","step","value"].forEach(function(a){var d=b.attr(a),e;"value"==a&&!d&&(e=b.getShadowElement())&&(d=(c(e).slider("option","max")-c(e).slider("option","min"))/2);null!=d&&b.attr(a,d)})}},
e.range.attrs={disabled:function(a,b,d){d=!!d;c(b).slider("option","disabled",d);c("span",b).attr({"aria-disabled":d+"",tabindex:d?"-1":"0"})},min:function(b,a,d){d=d?1*d||0:0;c(a).slider("option","min",d);c("span",a).attr({"aria-valuemin":d})},max:function(a,b,d){d=d||0===d?1*d||100:100;c(b).slider("option","max",d);c("span",b).attr({"aria-valuemax":d})},value:function(b,a,d){d=c(b).prop("valueAsNumber");isNaN(d)||(e.range.blockAttr||c(a).slider("option","value",d),c("span",a).attr({"aria-valuenow":d,
"aria-valuetext":d}))},step:function(a,b,d){d=d&&c.trim(d)?1*d||1:1;c(b).slider("option","step",d)}};if(!d.bugs.valueAsNumberSet&&(i.replaceUI||!Modernizr.inputtypes.date||!Modernizr.inputtypes["datetime-local"]||!Modernizr.inputtypes.range))l=function(){d.data(this,"hasShadow")&&c.prop(this,"value",c.prop(this,"value"))},d.onNodeNamesPropertyModify("input","valueAsNumber",l),d.onNodeNamesPropertyModify("input","valueAsDate",l);c.each(["disabled","min","max","value","step"],function(b,a){d.onNodeNamesPropertyModify("input",
a,function(b){var c=d.data(this,"shadowData");if(c&&c.data&&c.data[a]&&c.nativeElement===this)c.data[a](this,c.shadowElement,b)})});if(!i.availabeLangs)i.availabeLangs="af ar ar-DZ az bg bs ca cs da de el en-AU en-GB en-NZ eo es et eu fa fi fo fr fr-CH gl he hr hu hy id is it ja ko kz lt lv ml ms nl no pl pt-BR rm ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");l=function(){c.datepicker&&(d.activeLang({langObj:c.datepicker.regional,module:"form-number-date-ui",callback:function(a){c("input.hasDatepicker").filter(".input-date, .input-datetime-local-date").datepicker("option",
c.extend(p,a,i.datepicker))}}),c(f).unbind("jquery-uiReady.langchange input-widgetsReady.langchange"))};c(f).bind("jquery-uiReady.langchange input-widgetsReady.langchange",l);l();(function(){var a=function(){var b={};return function(a){return a in b?b[a]:b[a]=c('<input type="'+a+'" />')[0].type===a}}();if(!a("number")||!a("time")){var b=d.cfg["forms-ext"],e=d.inputTypes,g=function(a,b,f){f=f||{};if(!("type"in f))f.type=c.prop(a,"type");if(!("step"in f))f.step=d.getStep(a,f.type);if(!("valueAsNumber"in
f))f.valueAsNumber=e[f.type].asNumber(c.prop(a,"value"));var g="any"==f.step?e[f.type].step*e[f.type].stepScaleFactor:f.step;d.addMinMaxNumberToCache("min",c(a),f);d.addMinMaxNumberToCache("max",c(a),f);if(isNaN(f.valueAsNumber))f.valueAsNumber=e[f.type].stepBase||0;if("any"!==f.step&&(a=Math.round(1E7*((f.valueAsNumber-(f.minAsnumber||0))%f.step))/1E7)&&Math.abs(a)!=f.step)f.valueAsNumber-=a;a=f.valueAsNumber+g*b;return a=!isNaN(f.minAsNumber)&&a<f.minAsNumber?f.valueAsNumber*b<f.minAsNumber?f.minAsNumber:
isNaN(f.maxAsNumber)?f.valueAsNumber:f.maxAsNumber:!isNaN(f.maxAsNumber)&&a>f.maxAsNumber?f.valueAsNumber*b>f.maxAsNumber?f.maxAsNumber:isNaN(f.minAsNumber)?f.valueAsNumber:f.minAsNumber:Math.round(1E7*a)/1E7};d.modules["form-number-date-ui"].getNextStep=g;var i=function(a,b,d){if(!a.disabled&&!a.readOnly&&!c(d).hasClass("step-controls")&&(c.prop(a,"value",e[b].numberToString(g(a,c(d).hasClass("step-up")?1:-1,{type:b}))),c(a).unbind("blur.stepeventshim"),k(a,"input"),f.activeElement)){if(f.activeElement!==
a)try{a.focus()}catch(i){}setTimeout(function(){if(f.activeElement!==a)try{a.focus()}catch(b){}c(a).one("blur.stepeventshim",function(){k(a,"change")})},0)}};if(b.stepArrows){var h={set:function(){var a=d.data(this,"step-controls");if(a)a[this.disabled||this.readonly?"addClass":"removeClass"]("disabled-step-control")}};d.onNodeNamesPropertyModify("input","disabled",h);d.onNodeNamesPropertyModify("input","readonly",c.extend({},h))}var l={38:1,40:-1};d.addReady(function(f,h){b.stepArrows&&c("input",
f).add(h.filter("input")).each(function(){var f=c.prop(this,"type");if(e[f]&&e[f].asNumber&&b.stepArrows&&!(!0!==b.stepArrows&&!b.stepArrows[f]||a(f)||c(h).hasClass("has-step-controls"))){var h=this,m=c('<span class="step-controls" unselectable="on"><span class="step-up" /><span class="step-down" /></span>').insertAfter(h).bind("selectstart dragstart",function(){return!1}).bind("mousedown mousepress",function(a){i(h,f,a.target);return!1}).bind("mousepressstart mousepressend",function(a){c(a.target)["mousepressstart"==
a.type?"addClass":"removeClass"]("mousepress-ui")}),p=function(a,b){if(!h.disabled&&!h.readOnly)return c.prop(h,"value",e[f].numberToString(g(h,b,{type:f}))),k(h,"input"),!1},q=c(h).addClass("has-step-controls").attr({readonly:h.readOnly,disabled:h.disabled,autocomplete:"off",role:"spinbutton"}).bind(c.browser.msie?"keydown":"keypress",function(a){if(!h.disabled&&!h.readOnly&&l[a.keyCode])return c.prop(h,"value",e[f].numberToString(g(h,l[a.keyCode],{type:f}))),k(h,"input"),!1});c.fn.mwheelIntent?
q.add(m).bind("mwheelIntent",p):q.bind("focus",function(){q.add(m).unbind(".mwhellwebshims").bind("mousewheel.mwhellwebshims",p)}).bind("blur",function(){c(h).add(m).unbind(".mwhellwebshims")});d.data(h,"step-controls",m);b.calculateWidth&&(n(q,m),m.css("marginTop",(q.outerHeight()-m.outerHeight())/2))}})})}})();d.addReady(function(a,b){c(f).bind("jquery-uiReady.initinputui input-widgetsReady.initinputui",function(){(c.datepicker||c.fn.slider)&&e(a,b);c.datepicker&&c.fn.slider?c(f).unbind(".initinputui"):
d.modules["input-widgets"].src||d.warn('jQuery UI Widget factory is already included, but not datepicker or slider. configure src of $.webshims.modules["input-widgets"].src')})})});
