jQuery.webshims.register("dom-extend",function(d,f,n,h,m){var y=f.modules,s=/\s*,\s*/,l={},o={},j={},k={},i={},p=d.fn.val,C=function(b,a,c,e,g){return g?p.call(d(b)):p.call(d(b),c)};d.fn.val=function(b){var a=this[0];arguments.length&&null==b&&(b="");if(!arguments.length)return!a||1!==a.nodeType?p.call(this):d.prop(a,"value",b,"val",!0);if(d.isArray(b))return p.apply(this,arguments);var c=d.isFunction(b);return this.each(function(e){a=this;1===a.nodeType&&(c?(e=b.call(a,e,d.prop(a,"value",m,"val",
!0)),null==e&&(e=""),d.prop(a,"value",e,"val")):d.prop(a,"value",b,"val"))})};var u="_webshimsLib"+Math.round(1E3*Math.random()),z=function(b,a,c){b=b.jquery?b[0]:b;if(!b)return c||{};var e=d.data(b,u);c!==m&&(e||(e=d.data(b,u,{})),a&&(e[a]=c));return a?e&&e[a]:e};[{name:"getNativeElement",prop:"nativeElement"},{name:"getShadowElement",prop:"shadowElement"},{name:"getShadowFocusElement",prop:"shadowFocusElement"}].forEach(function(b){d.fn[b.name]=function(){return this.map(function(){var a=z(this,
"shadowData");return a&&a[b.prop]||this})}});["removeAttr","prop","attr"].forEach(function(b){l[b]=d[b];d[b]=function(a,c,e,g,q){var v="val"==g,t=!v?l[b]:C;if(!a||!o[c]||1!==a.nodeType||!v&&g&&"attr"==b&&d.attrFn[c])return t(a,c,e,g,q);var B=(a.nodeName||"").toLowerCase(),w=j[B],x="attr"==b&&(!1===e||null===e)?"removeAttr":b,f,k,p;w||(w=j["*"]);w&&(w=w[c]);w&&(f=w[x]);if(f){if("value"==c)k=f.isVal,f.isVal=v;if("removeAttr"===x)return f.value.call(a);if(e===m)return f.get?f.get.call(a):f.value;f.set&&
("attr"==b&&!0===e&&(e=c),p=f.set.call(a,e));if("value"==c)f.isVal=k}else p=t(a,c,e,g,q);if((e!==m||"removeAttr"===x)&&i[B]&&i[B][c]){var h;h="removeAttr"==x?!1:"prop"==x?!!e:!0;i[B][c].forEach(function(c){if(!c.only||(c.only="prop"==b)||"attr"==c.only&&"prop"!=b)c.call(a,e,h,v?"val":x,b)})}return p};k[b]=function(a,c,e){j[a]||(j[a]={});j[a][c]||(j[a][c]={});var g=j[a][c][b],q=function(a,d,g){return d&&d[a]?d[a]:g&&g[a]?g[a]:"prop"==b&&"value"==c?function(a){return e.isVal?C(this,c,a,!1,0===arguments.length):
l[b](this,c,a)}:"prop"==b&&"value"==a&&e.value.apply?function(a){var d=l[b](this,c);d&&d.apply&&(d=d.apply(this,arguments));return d}:function(a){return l[b](this,c,a)}};j[a][c][b]=e;if(e.value===m){if(!e.set)e.set=e.writeable?q("set",e,g):f.cfg.useStrict&&"prop"==c?function(){throw c+" is readonly on "+a;}:d.noop;if(!e.get)e.get=q("get",e,g)}["value","get","set"].forEach(function(a){e[a]&&(e["_sup"+a]=q(a,g))})}});var D=!d.browser.msie||8<parseInt(d.browser.version,10),E=function(){var b=f.getPrototypeOf(h.createElement("foobar")),
a=Object.prototype.hasOwnProperty;return function(c,d,g){var q=h.createElement(c),v=f.getPrototypeOf(q);if(D&&v&&b!==v&&(!q[d]||!a.call(q,d))){var t=q[d];g._supvalue=function(){return t&&t.apply?t.apply(this,arguments):t};v[d]=g.value}else g._supvalue=function(){var a=z(this,"propValue");return a&&a[d]&&a[d].apply?a[d].apply(this,arguments):a&&a[d]},r.extendValue(c,d,g.value);g.value._supvalue=g._supvalue}}(),r=function(){var b={};f.addReady(function(a,c){var e={},t=function(b){e[b]||(e[b]=d(a.getElementsByTagName(b)),
c[0]&&d.nodeName(c[0],b)&&(e[b]=e[b].add(c)))};d.each(b,function(a,b){t(a);!b||!b.forEach?f.warn("Error: with "+a+"-property. methods: "+b):b.forEach(function(b){e[a].each(b)})});e=null});var a,c=d([]),e=function(c,e){b[c]?b[c].push(e):b[c]=[e];d.isDOMReady&&(a||d(h.getElementsByTagName(c))).each(e)};return{createTmpCache:function(b){d.isDOMReady&&(a=a||d(h.getElementsByTagName(b)));return a||c},flushTmpCache:function(){a=null},content:function(a,b){e(a,function(){var a=d.attr(this,b);null!=a&&d.attr(this,
b,a)})},createElement:function(a,b){e(a,b)},extendValue:function(a,b,c){e(a,function(){d(this).each(function(){z(this,"propValue",{})[b]=this[b];this[b]=c})})}}}(),A=function(b,a){if(b.defaultValue===m)b.defaultValue="";if(!b.removeAttr)b.removeAttr={value:function(){b[a||"prop"].set.call(this,b.defaultValue);b.removeAttr._supvalue.call(this)}};if(!b.attr)b.attr={}};d.extend(f,{getID:function(){var b=(new Date).getTime();return function(a){var a=d(a),c=a.attr("id");c||(b++,c="ID-"+b,a.attr("id",c));
return c}}(),extendUNDEFProp:function(b,a){d.each(a,function(a,d){a in b||(b[a]=d)})},createPropDefault:A,data:z,moveToFirstEvent:function(){var b=d._data?"_data":"data";return function(a,c,e){if((a=(d[b](a,"events")||{})[c])&&1<a.length)c=a.pop(),e||(e="bind"),"bind"==e&&a.delegateCount?a.splice(a.delegateCount,0,c):a.unshift(c)}}(),addShadowDom:function(){var b,a,c,e,g={init:!1,start:function(){if(!this.init)this.init=!0,this.height=d(h).height(),this.width=d(h).width(),setInterval(function(){var a=
d(h).height(),b=d(h).width();if(a!=g.height||b!=g.width)g.height=a,g.width=b,e({type:"docresize"})},400)}};e=function(e){clearTimeout(b);b=setTimeout(function(){if("resize"==e.type&&e.target==n){var b=d(n).width(),f=d(n).width();if(f==a&&b==c)return;a=f;c=b;g.height=d(h).height();g.width=d(h).width()}d.event.trigger("updateshadowdom")},20)};d(h).bind("emchange resize fontresize",e);d(n).bind("resize",e);d.event.customEvent.updateshadowdom=!0;return function(a,b,c){c=c||{};a.jquery&&(a=a[0]);b.jquery&&
(b=b[0]);var e=d.data(a,u)||d.data(a,u,{}),f=d.data(b,u)||d.data(b,u,{}),j={};if(c.shadowFocusElement){if(c.shadowFocusElement){if(c.shadowFocusElement.jquery)c.shadowFocusElement=c.shadowFocusElement[0];j=d.data(c.shadowFocusElement,u)||d.data(c.shadowFocusElement,u,j)}}else c.shadowFocusElement=b;e.hasShadow=b;j.nativeElement=f.nativeElement=a;j.shadowData=f.shadowData=e.shadowData={nativeElement:a,shadowElement:b,shadowFocusElement:c.shadowFocusElement};c.shadowChilds&&c.shadowChilds.each(function(){z(this,
"shadowData",f.shadowData)});if(c.data)j.shadowData.data=f.shadowData.data=e.shadowData.data=c.data;c=null;g.start()}}(),propTypes:{standard:function(b){A(b);if(!b.prop)b.prop={set:function(a){b.attr.set.call(this,""+a)},get:function(){return b.attr.get.call(this)||b.defaultValue}}},"boolean":function(b){A(b);if(!b.prop)b.prop={set:function(a){a?b.attr.set.call(this,""):b.removeAttr.value.call(this)},get:function(){return null!=b.attr.get.call(this)}}},src:function(){var b=h.createElement("a");b.style.display=
"none";return function(a,c){A(a);if(!a.prop)a.prop={set:function(b){a.attr.set.call(this,b)},get:function(){var a=this.getAttribute(c),g;if(null==a)return"";b.setAttribute("href",a+"");if(!d.support.hrefNormalized){try{d(b).insertAfterTo(this),g=b.getAttribute("href",4)}catch(f){g=b.getAttribute("href",4)}d(b).detach()}return g||b.href}}}}(),enumarated:function(b){A(b);if(!b.prop)b.prop={set:function(a){b.attr.set.call(this,a)},get:function(){var a=(b.attr.get.call(this)||"").toLowerCase();if(!a||
-1==b.limitedTo.indexOf(a))a=b.defaultValue;return a}}}},reflectProperties:function(b,a){"string"==typeof a&&(a=a.split(s));a.forEach(function(a){f.defineNodeNamesProperty(b,a,{prop:{set:function(b){d.attr(this,a,b)},get:function(){return d.attr(this,a)||""}}})})},defineNodeNameProperty:function(b,a,c){o[a]=!0;if(c.reflect)f.propTypes[c.propType||"standard"](c,a);["prop","attr","removeAttr"].forEach(function(e){var g=c[e];g&&(g="prop"===e?d.extend({writeable:!0},g):d.extend({},g,{writeable:!0}),k[e](b,
a,g),"*"!=b&&f.cfg.extendNative&&"prop"==e&&g.value&&d.isFunction(g.value)&&E(b,a,g),c[e]=g)});c.initAttr&&r.content(b,a);return c},defineNodeNameProperties:function(b,a,c,d){for(var g in a)!d&&a[g].initAttr&&r.createTmpCache(b),c&&(a[g][c]?f.log("override: "+b+"["+g+"] for "+c):(a[g][c]={},["value","set","get"].forEach(function(b){b in a[g]&&(a[g][c][b]=a[g][b],delete a[g][b])}))),a[g]=f.defineNodeNameProperty(b,g,a[g]);d||r.flushTmpCache();return a},createElement:function(b,a,c){var e;d.isFunction(a)&&
(a={after:a});r.createTmpCache(b);a.before&&r.createElement(b,a.before);c&&(e=f.defineNodeNameProperties(b,c,!1,!0));a.after&&r.createElement(b,a.after);r.flushTmpCache();return e},onNodeNamesPropertyModify:function(b,a,c,e){"string"==typeof b&&(b=b.split(s));d.isFunction(c)&&(c={set:c});b.forEach(function(b){i[b]||(i[b]={});"string"==typeof a&&(a=a.split(s));c.initAttr&&r.createTmpCache(b);a.forEach(function(a){i[b][a]||(i[b][a]=[],o[a]=!0);if(c.set){if(e)c.set.only=e;i[b][a].push(c.set)}c.initAttr&&
r.content(b,a)});r.flushTmpCache()})},defineNodeNamesBooleanProperty:function(b,a,c){c||(c={});if(d.isFunction(c))c.set=c;f.defineNodeNamesProperty(b,a,{attr:{set:function(b){this.setAttribute(a,b);c.set&&c.set.call(this,!0)},get:function(){return null==this.getAttribute(a)?m:a}},removeAttr:{value:function(){this.removeAttribute(a);c.set&&c.set.call(this,!1)}},reflect:!0,propType:"boolean",initAttr:c.initAttr||!1})},contentAttr:function(b,a,c){if(b.nodeName){if(c===m)return b=b.attributes[a]||{},
c=b.specified?b.value:null,null==c?m:c;"boolean"==typeof c?c?b.setAttribute(a,a):b.removeAttribute(a):b.setAttribute(a,c)}},activeLang:function(){var b=[],a={},c,e,g=/:\/\/|^\.*\//,j=function(a,b,c){return b&&c&&-1!==d.inArray(b,c.availabeLangs||[])?(a.loading=!0,c=c.langSrc,g.test(c)||(c=f.cfg.basePath+c),f.loader.loadScript(c+b+".js",function(){a.langObj[b]?(a.loading=!1,i(a,!0)):d(function(){a.langObj[b]&&i(a,!0);a.loading=!1})}),!0):!1},k=function(b){a[b]&&a[b].forEach(function(a){a.callback()})},
i=function(a,b){if(a.activeLang!=c&&a.activeLang!==e){var d=y[a.module].options;if(a.langObj[c]||e&&a.langObj[e])a.activeLang=c,a.callback(a.langObj[c]||a.langObj[e],c),k(a.module);else if(!b&&!j(a,c,d)&&!j(a,e,d)&&a.langObj[""]&&""!==a.activeLang)a.activeLang="",a.callback(a.langObj[""],c),k(a.module)}};return function(g){if("string"==typeof g&&g!==c)c=g,e=c.split("-")[0],c==e&&(e=!1),d.each(b,function(a,b){i(b)});else if("object"==typeof g)if(g.register)a[g.register]||(a[g.register]=[]),a[g.register].push(g),
g.callback();else{if(!g.activeLang)g.activeLang="";b.push(g);i(g)}return c}}()});d.each({defineNodeNamesProperty:"defineNodeNameProperty",defineNodeNamesProperties:"defineNodeNameProperties",createElements:"createElement"},function(b,a){f[b]=function(b,d,g,j){"string"==typeof b&&(b=b.split(s));var i={};b.forEach(function(b){i[b]=f[a](b,d,g,j)});return i}});f.isReady("webshimLocalization",!0)});
(function(d,f){var n=d.webshims.browserVersion;if(!(d.browser.mozilla&&5<n)&&(!d.browser.msie||12>n&&7<n)){var h={article:"article",aside:"complementary",section:"region",nav:"navigation",address:"contentinfo"},m=function(d,f){d.getAttribute("role")||d.setAttribute("role",f)};d.webshims.addReady(function(n,s){d.each(h,function(f,j){for(var p=d(f,n).add(s.filter(f)),h=0,l=p.length;h<l;h++)m(p[h],j)});if(n===f){var l=f.getElementsByTagName("header")[0],o=f.getElementsByTagName("footer"),j=o.length;
l&&!d(l).closest("section, article")[0]&&m(l,"banner");j&&(l=o[j-1],d(l).closest("section, article")[0]||m(l,"contentinfo"))}})}})(jQuery,document);
jQuery.webshims.register("details",function(d,f,n,h,m,y){var s=function(f){var k=d(f).parent("details");if(k[0]&&k.children(":first").get(0)===f)return k},l=function(f,k){var f=d(f),k=d(k),i=d.data(k[0],"summaryElement");d.data(f[0],"detailsElement",k);if(!i||f[0]!==i[0])i&&(i.hasClass("fallback-summary")?i.remove():i.unbind(".summaryPolyfill").removeData("detailsElement").removeAttr("role").removeAttr("tabindex").removeAttr("aria-expanded").removeClass("summary-button").find("span.details-open-indicator").remove()),d.data(k[0],
"summaryElement",f),k.prop("open",k.prop("open"))};f.createElement("summary",function(){var j=s(this);if(j&&!d.data(this,"detailsElement")){var k,i,h=d.attr(this,"tabIndex")||"0";l(this,j);d(this).bind("focus.summaryPolyfill",function(){d(this).addClass("summary-has-focus")}).bind("blur.summaryPolyfill",function(){d(this).removeClass("summary-has-focus")}).bind("mouseenter.summaryPolyfill",function(){d(this).addClass("summary-has-hover")}).bind("mouseleave.summaryPolyfill",function(){d(this).removeClass("summary-has-hover")}).bind("click.summaryPolyfill",
function(f){var j=s(this);if(j){if(!i&&f.originalEvent)return i=!0,f.stopImmediatePropagation(),f.preventDefault(),d(this).trigger("click"),i=!1;clearTimeout(k);k=setTimeout(function(){f.isDefaultPrevented()||j.prop("open",!j.prop("open"))},0)}}).bind("keydown.summaryPolyfill",function(f){if((13==f.keyCode||32==f.keyCode)&&!f.isDefaultPrevented())i=!0,f.preventDefault(),d(this).trigger("click"),i=!1}).attr({tabindex:h,role:"button"}).prepend('<span class="details-open-indicator" />');f.moveToFirstEvent(this,
"click")}});var o;f.defineNodeNamesBooleanProperty("details","open",function(f){var k=d(d.data(this,"summaryElement"));if(k){var i=f?"removeClass":"addClass",h=d(this);if(!o&&y.animate){h.stop().css({width:"",height:""});var l={width:h.width(),height:h.height()}}k.attr("aria-expanded",""+f);h[i]("closed-details-summary").children().not(k[0])[i]("closed-details-child");!o&&y.animate&&(f={width:h.width(),height:h.height()},h.css(l).animate(f,{complete:function(){d(this).css({width:"",height:""})}}))}});
f.createElement("details",function(){o=!0;var f=d.data(this,"summaryElement");f||(f=d("> summary:first-child",this),f[0]?l(f,this):(d(this).prependPolyfill('<summary class="fallback-summary">'+y.text+"</summary>"),d.data(this,"summaryElement")));d.prop(this,"open",d.prop(this,"open"));o=!1})});
