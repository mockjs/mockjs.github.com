/*
Copyright 2014, KISSY v1.43
MIT Licensed
build time: May 22 12:22
*/
KISSY.add("editor/plugin/image",["./button","editor","./bubble","./dialog-loader","./contextmenu"],function(e,c){function f(b){this.config=b||{}}c("./button");var j=c("editor");c("./bubble");var n=c("./dialog-loader");c("./contextmenu");var k=e.UA,o=KISSY.NodeList,h=e.all,g=function(b){b=h(b);if("img"===b.nodeName()&&!/(^|\s+)ke_/.test(b[0].className))return b};e.augment(f,{pluginRenderUI:function(b){function c(a){n.useDialog(b,"image",f.config,a)}var f=this,i=b.get("prefixCls");b.addButton("image",
{tooltip:"\u63d2\u5165\u56fe\u7247",listeners:{click:function(){c(null)}},mode:j.Mode.WYSIWYG_MODE});var l=[{content:"\u56fe\u7247\u5c5e\u6027",fn:function(){var a=g(this.get("editorSelectedEl"));a&&(this.hide(),c(h(a)))}},{content:"\u63d2\u5165\u65b0\u884c",fn:function(){this.hide();var a=b.get("document")[0],d=new o(a.createElement("p"));k.ie||d._4eAppendBogus(void 0);a=new j.Range(a);a.setStartAfter(this.get("editorSelectedEl"));a.select();b.insertElement(d);a.moveToElementEditablePosition(d,1);a.select()}}],m=[];e.each(l,function(a){m.push({content:a.content})});
b.addContextMenu("image",g,{width:120,children:m,listeners:{click:function(a){var b=this,c=a.target.get("content");e.each(l,function(a){a.content===c&&a.fn.call(b)})}}});b.docReady(function(){b.get("document").on("dblclick",function(a){a.halt();a=h(a.target);g(a)&&c(a)})});b.addBubble("image",g,{listeners:{afterRenderUI:function(){var a=this,d=a.get("contentEl");d.html(e.substitute('<a class="{prefixCls}editor-bubble-url" target="_blank" href="#">\u5728\u65b0\u7a97\u53e3\u67e5\u770b</a>  |  <a class="{prefixCls}editor-bubble-link {prefixCls}editor-bubble-change" href="#">\u7f16\u8f91</a>  |  <a class="{prefixCls}editor-bubble-link {prefixCls}editor-bubble-remove" href="#">\u5220\u9664</a>',
{prefixCls:i}));var f=d.one("."+i+"editor-bubble-url"),g=d.one("."+i+"editor-bubble-change"),h=d.one("."+i+"editor-bubble-remove");j.Utils.preventFocus(d);g.on("click",function(b){c(a.get("editorSelectedEl"));b.halt()});h.on("click",function(c){if(k.webkit){var d=b.getSelection().getRanges();d&&d[0]&&(d[0].collapse(),d[0].select())}a.get("editorSelectedEl").remove();a.hide();b.notifySelectionChange();c.halt()});a.on("show",function(){var b=a.get("editorSelectedEl");b&&(b=b.attr("_ke_saved_src")||
b.attr("src"),f.attr("href",b))})}}})}});return f});
