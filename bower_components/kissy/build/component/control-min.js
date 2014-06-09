/*
Copyright 2014, KISSY v1.43
MIT Licensed
build time: May 22 12:16
*/
KISSY.add("component/control/process",["base","promise"],function(e,b){function g(b){b.fire("beforeSyncUI");b.syncUI();b.__callPluginsMethod("pluginSyncUI");b.fire("afterSyncUI")}var n=b("base"),m=b("promise").Defer,h=n.prototype.__getHook,c=e.noop,i=n.extend({bindInternal:c,syncInternal:c,initializer:function(){this._renderedDefer=new m},renderUI:c,syncUI:c,bindUI:c,onRendered:function(b){return this._renderedDefer.promise.then(b)},create:function(){this.get("created")||(this.fire("beforeCreateDom"),
this.createInternal(),this.__callPluginsMethod("pluginCreateDom"),this.fire("afterCreateDom"),this.setInternal("created",!0));return this},createInternal:function(){this.createDom()},render:function(){this.get("rendered")||(this.create(),this.fire("beforeRenderUI"),this.renderUI(),this.__callPluginsMethod("pluginRenderUI"),this.fire("afterRenderUI"),this.fire("beforeBindUI"),i.superclass.bindInternal.call(this),this.bindUI(),this.__callPluginsMethod("pluginBindUI"),this.fire("afterBindUI"),i.superclass.syncInternal.call(this),
g(this),this.setInternal("rendered",!0));return this},sync:function(){g(this)},plug:function(b){var c=this.get("plugins");this.callSuper(b);b=c[c.length-1];this.get("rendered")?(b.pluginCreateDom&&b.pluginCreateDom(this),b.pluginRenderUI&&b.pluginCreateDom(this),b.pluginBindUI&&b.pluginBindUI(this),b.pluginSyncUI&&b.pluginSyncUI(this)):this.get("created")&&b.pluginCreateDom&&b.pluginCreateDom(this);return this}},{__hooks__:{createDom:h("__createDom"),renderUI:h("__renderUI"),bindUI:h("__bindUI"),
syncUI:h("__syncUI")},name:"ComponentProcess",ATTRS:{rendered:{value:!1,setter:function(b){b&&this._renderedDefer.resolve(this)}},created:{value:!1}}});return i});
KISSY.add("component/control/render-xtpl",[],function(){return function(e){var b,g=this;b=this.config.utils;var n=b.runBlockCommand,m=b.renderOutput,h=b.getProperty,c=b.runInlineCommand,i=b.getPropertyOrRunCommand;b='<div id="';var j=i(g,e,{},"id",0,1);b+=m(j,!0);b+='"\n class="';var j={},l=[];l.push("");j.params=l;c=c(g,e,j,"getBaseCssClasses",2);b+=m(c,!0);b+="\n";c={};j=[];l=h(g,e,"elCls",0,3);j.push(l);c.params=j;c.fn=function(b){var a;a="\n ";b=i(g,b,{},".",0,4);a+=m(b,!0);return a+"  \n"};b+=
n(g,e,c,"each",3);b+='\n"\n\n';c={};j=[];l=h(g,e,"elAttrs",0,8);j.push(l);c.params=j;c.fn=function(b){var a;a=" \n ";var d=i(g,b,{},"xindex",0,9);a+=m(d,!0);a+='="';b=i(g,b,{},".",0,9);a+=m(b,!0);return a+'"\n'};b+=n(g,e,c,"each",8);b+='\n\nstyle="\n';c={};j=[];h=h(g,e,"elStyle",0,13);j.push(h);c.params=j;c.fn=function(b){var a;a=" \n ";var d=i(g,b,{},"xindex",0,14);a+=m(d,!0);a+=":";b=i(g,b,{},".",0,14);a+=m(b,!0);return a+";\n"};b+=n(g,e,c,"each",13);return b+'\n">'}});
KISSY.add("component/control/render",["node","xtemplate/runtime","./process","./render-xtpl","component/manager"],function(e,b){function g(k){"number"===typeof k&&(k+="px");return k}function n(k){k||(k=[""]);"string"===typeof k&&(k=k.split(/\s+/));return k}function m(k,a,b){for(var d="",f=0,c=b.length,a=k+a;f<c;f++)k=(k=b[f])?"-"+k:k,d+=" "+a+k;return d}function h(a){var b;a.target===this.control&&(b=this[q+a.type.slice(5).slice(0,-6)],b.call(this,a.newVal,a))}function c(a,b){return this.config.view.getBaseCssClasses(b.params[0])}
function i(a,b){return this.config.view.getBaseCssClass(b.params[0])}var j=b("node"),l=b("xtemplate/runtime"),o=b("./process"),a=b("./render-xtpl"),d=b("component/manager"),q="_onSet",r=e.trim,s=j.all,t=e.UA,u=e.Env.host.document;return o.extend({isRender:!0,createInternal:function(){var a=this.control.get("srcNode");a?this.decorateDom(a):this.callSuper()},beforeCreateDom:function(a){var b=this.control,d,c,f,e=b.get("elAttrs"),j=b.get("elCls"),h;d=b.getAttrs();h=b.get("elStyle");var m=b.get("elCls");
for(c in d)f=d[c],f.view&&(a[c]=b.get(c));d=a.width;c=a.height;f=a.visible;a=a.zIndex;d&&(h.width=g(d));c&&(h.height=g(c));a&&(h["z-index"]=a);f||m.push(this.getBaseCssClasses("hidden"));if(h=b.get("disabled"))j.push(this.getBaseCssClasses("disabled")),e["aria-disabled"]="true";b.get("highlighted")&&j.push(this.getBaseCssClasses("hover"));b.get("focusable")&&(9>t.ieMode&&(e.hideFocus="true"),e.tabindex=h?"-1":"0")},createDom:function(){this.beforeCreateDom(this.renderData={},this.childrenElSelectors=
{},this.renderCommands={getBaseCssClasses:c,getBaseCssClass:i});var b=this.control,p;p=this.renderTpl(a)+this.renderTpl(this.get("contentTpl"))+"</div>";b.setInternal("el",this.$el=s(p));this.el=this.$el[0];this.fillChildrenElsBySelectors()},decorateDom:function(a){var b=this.control;a.attr("id")||a.attr("id",b.get("id"));var d=this.constructor.HTML_PARSER,c,f;for(c in d)f=d[c],"function"===typeof f?(f=f.call(this,a),void 0!==f&&b.setInternal(c,f)):"string"===typeof f?b.setInternal(c,a.one(f)):e.isArray(f)&&
f[0]&&b.setInternal(c,a.all(f[0]));b.setInternal("el",this.$el=a);this.el=a[0]},renderUI:function(){var a=this.control,b=this.$el;if(!a.get("srcNode")){var d=a.get("render");(a=a.get("elBefore"))?b.insertBefore(a,void 0):d?b.appendTo(d,void 0):b.appendTo(u.body,void 0)}},bindUI:function(){var a=this.control,b=a.getAttrs(),d,c;for(d in b){c=b[d];var f=e.ucfirst(d),g=this[q+f];if(c.view&&g)a.on("after"+f+"Change",h,this)}},destructor:function(){this.$el&&this.$el.remove()},$:function(a){return this.$el.all(a)},
fillChildrenElsBySelectors:function(a){var b=this.$el,d=this.control,c,f,a=a||this.childrenElSelectors;for(c in a)f=a[c],"function"===typeof f?d.setInternal(c,f(b)):d.setInternal(c,this.$(e.substitute(f,this.renderData))),delete a[c]},renderTpl:function(a,b,d){b=b||this.renderData;d=d||this.renderCommands;return(new (this.get("xtemplate"))(a,{control:this.control,view:this,commands:d})).render(b)},getComponentConstructorByNode:function(a,b){var c=b[0].className;return c?(c=c.replace(RegExp("\\b"+
a,"ig"),""),d.getConstructorByXClass(c)):null},getComponentCssClasses:function(){if(this.componentCssClasses)return this.componentCssClasses;for(var a=this.control.constructor,b,d=[];a&&!a.prototype.hasOwnProperty("isControl");)(b=a.xclass)&&d.push(b),a=a.superclass&&a.superclass.constructor;return this.componentCssClasses=d},getBaseCssClasses:function(a){for(var a=n(a),b=this.getComponentCssClasses(),d=0,c=this.get("control"),f="",e=b.length,c=c.get("prefixCls");d<e;d++)f+=m(c,b[d],a);return r(f)},
getBaseCssClass:function(a){return r(m(this.control.get("prefixCls"),this.getComponentCssClasses()[0],n(a)))},getKeyEventTarget:function(){return this.$el},_onSetWidth:function(a){this.$el.width(a)},_onSetHeight:function(a){this.$el.height(a)},_onSetContent:function(a){var b=this.$el;b.html(a);this.get("allowTextSelection")||b.unselectable()},_onSetVisible:function(a){var b=this.$el,d=this.getBaseCssClasses("hidden");a?b.removeClass(d):b.addClass(d)},_onSetHighlighted:function(a){var b=this.getBaseCssClasses("hover");
this.$el[a?"addClass":"removeClass"](b)},_onSetDisabled:function(a){var b=this.control,d=this.getBaseCssClasses("disabled");this.$el[a?"addClass":"removeClass"](d).attr("aria-disabled",a);b.get("focusable")&&this.getKeyEventTarget().attr("tabindex",a?-1:0)},_onSetActive:function(a){var b=this.getBaseCssClasses("active");this.$el[a?"addClass":"removeClass"](b).attr("aria-pressed",!!a)},_onSetFocused:function(a){var b=this.$el,d=this.getBaseCssClasses("focused");b[a?"addClass":"removeClass"](d)},_onSetZIndex:function(a){this.$el.css("z-index",
a)}},{__hooks__:{decorateDom:o.prototype.__getHook("__decorateDom"),beforeCreateDom:o.prototype.__getHook("__beforeCreateDom")},extend:function p(a,b,d){var c,g={};c=o.extend.apply(this,arguments);c.HTML_PARSER=c.HTML_PARSER||{};e.isArray(a)&&(e.each(a.concat(c),function(a){a&&e.each(a.HTML_PARSER,function(a,b){g[b]=a})}),c.HTML_PARSER=g);e.mix(c.HTML_PARSER,this.HTML_PARSER,!1);c.extend=p;return c},ATTRS:{control:{setter:function(a){this.control=a}},xtemplate:{value:l},contentTpl:{value:function(a){return a.get("content")||
""}}},HTML_PARSER:{id:function(a){return(a=a[0].id)?a:void 0},content:function(a){return a.html()},disabled:function(a){return a.hasClass(this.getBaseCssClass("disabled"))}},name:"render"})});
KISSY.add("component/control",["node","./control/process","component/manager","./control/render"],function(e,b){function g(){var a,b=this;do a=b.ATTRS,b=b.superclass;while(!a||!a.xrender);return a.xrender.value}var n=b("node"),m=b("./control/process"),h=b("component/manager"),c=b("./control/render"),i=e.UA.ieMode,j=e.Features,l=n.Gesture,o=j.isTouchGestureSupported();j.isTouchEventSupported();c=m.extend({isControl:!0,createDom:function(){var a=this.get("xrender"),b=this.get("view"),c=this.get("id");
b?b.set("control",this):this.set("view",this.view=b=new a({control:this}));b.create();a=b.getKeyEventTarget();this.get("allowTextSelection")||a.unselectable();h.addComponent(c,this)},renderUI:function(){this.view.render()},bindUI:function(){var a=this.view.getKeyEventTarget();if(this.get("focusable"))a.on("focus",this.handleFocus,this).on("blur",this.handleBlur,this).on("keydown",this.handleKeydown,this);if(this.get("handleMouseEvents")){a=this.$el;a.on("mouseenter",this.handleMouseEnter,this).on("mouseleave",
this.handleMouseLeave,this).on("contextmenu",this.handleContextMenu,this);a.on(l.start,this.handleMouseDown,this).on(l.end,this.handleMouseUp,this).on(l.tap,this.handleClick,this);if(l.cancel)a.on(l.cancel,this.handleMouseUp,this);if(9>i)a.on("dblclick",this.handleDblClick,this)}},sync:function(){this.fire("beforeSyncUI");this.syncUI();this.view.sync();this.__callPluginsMethod("pluginSyncUI");this.fire("afterSyncUI")},createComponent:function(a,b){return h.createComponent(a,b||this)},_onSetFocused:function(a){var b=
this.view.getKeyEventTarget()[0];a?b.focus():b.ownerDocument.activeElement===b&&b.ownerDocument.body.focus()},_onSetX:function(a){this.$el.offset({left:a})},_onSetY:function(a){this.$el.offset({top:a})},_onSetVisible:function(a){this.fire(a?"show":"hide")},show:function(){this.render();this.set("visible",!0);return this},hide:function(){this.set("visible",!1);return this},focus:function(){this.get("focusable")&&this.set("focused",!0)},blur:function(){this.get("focusable")&&this.set("focused",!1)},
move:function(a,b){this.set({x:a,y:b})},handleDblClick:function(a){this.get("disabled")||this.handleDblClickInternal(a)},handleDblClickInternal:function(a){this.handleClickInternal(a)},handleMouseEnter:function(a){this.get("disabled")||this.handleMouseEnterInternal(a)},handleMouseEnterInternal:function(a){this.set("highlighted",!!a)},handleMouseLeave:function(a){this.get("disabled")||this.handleMouseLeaveInternal(a)},handleMouseLeaveInternal:function(a){this.set("active",!1);this.set("highlighted",
!a)},handleMouseDown:function(a){this.get("disabled")||this.handleMouseDownInternal(a)},handleMouseDownInternal:function(a){var b;if(1===a.which||o)this.get("activeable")&&this.set("active",!0),this.get("focusable")&&this.focus(),!this.get("allowTextSelection")&&-1!==a.type.indexOf("mouse")&&(b=(b=a.target.nodeName)&&b.toLowerCase(),"input"!==b&&"textarea"!==b&&"button"!==b&&a.preventDefault())},handleMouseUp:function(a){this.get("disabled")||this.handleMouseUpInternal(a)},handleMouseUpInternal:function(a){this.get("active")&&
(1===a.which||o)&&this.set("active",!1)},handleContextMenu:function(a){this.get("disabled")||this.handleContextMenuInternal(a)},handleContextMenuInternal:function(){},handleFocus:function(){this.get("disabled")||this.handleFocusInternal()},handleFocusInternal:function(){this.focus();this.fire("focus")},handleBlur:function(){this.get("disabled")||this.handleBlurInternal()},handleBlurInternal:function(){this.blur();this.fire("blur")},handleKeydown:function(a){if(!this.get("disabled")&&this.handleKeyDownInternal(a))return a.halt(),
!0},handleKeyDownInternal:function(a){if(a.keyCode===n.KeyCode.ENTER)return this.handleClickInternal(a)},handleClick:function(a){this.get("disabled")||this.handleClickInternal(a)},handleClickInternal:function(){this.get("focusable")&&this.focus()},destructor:function(){h.removeComponent(this.get("id"));this.view?this.view.destroy():this.get("srcNode")&&this.get("srcNode").remove()}},{name:"control",ATTRS:{id:{view:1,valueFn:function(){return e.guid("ks-component")}},content:{view:1,value:""},width:{view:1},
height:{view:1},elCls:{view:1,value:[],setter:function(a){"string"===typeof a&&(a=a.split(/\s+/));return a||[]}},elStyle:{view:1,value:{}},elAttrs:{view:1,value:{}},elBefore:{},el:{setter:function(a){this.$el=a;this.el=a[0]}},x:{},y:{},xy:{setter:function(a){var b=e.makeArray(a);b.length&&(void 0!==b[0]&&this.set("x",b[0]),void 0!==b[1]&&this.set("y",b[1]));return a},getter:function(){return[this.get("x"),this.get("y")]}},zIndex:{view:1},render:{},visible:{sync:0,value:!0,view:1},srcNode:{setter:function(a){return n.all(a)}},
handleMouseEvents:{value:!0},focusable:{value:!0,view:1},allowTextSelection:{value:!1},activeable:{value:!0},focused:{view:1},active:{view:1,value:!1},highlighted:{view:1,value:!1},prefixCls:{view:1,value:e.config("component/prefixCls")||"ks-"},prefixXClass:{},parent:{setter:function(a,b){(b=this.get("parent"))&&this.removeTarget(b);a&&this.addTarget(a)}},disabled:{view:1,value:!1},xrender:{value:c},view:{setter:function(a){this.view=a}}}});c.getDefaultRender=g;c.extend=function d(b,c,j){var i=e.makeArray(arguments),
l,k=i[i.length-1];if(l=k.xclass)k.name=l;i=m.extend.apply(this,i);l&&h.setConstructorByXClass(l,i);i.extend=d;i.getDefaultRender=g;return i};return c});
