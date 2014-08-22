/*
Copyright 2014, KISSY v1.44
MIT Licensed
build time: May 22 12:27
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/xiami-music
*/

KISSY.add("editor/plugin/xiami-music", ["editor", "./flash-common/base-class", "./flash-common/utils", "./fake-objects", "./button"], function(S, require) {
  var Editor = require("editor");
  var FlashBaseClass = require("./flash-common/base-class");
  var flashUtils = require("./flash-common/utils");
  var fakeObjects = require("./fake-objects");
  require("./button");
  var CLS_XIAMI = "ke_xiami", TYPE_XIAMI = "xiami-music";
  function XiamiMusic() {
    XiamiMusic.superclass.constructor.apply(this, arguments)
  }
  S.extend(XiamiMusic, FlashBaseClass, {_updateTip:function(tipUrlEl, selectedFlash) {
    var self = this, editor = self.get("editor"), r = editor.restoreRealElement(selectedFlash);
    if(r) {
      tipUrlEl.html(selectedFlash.attr("title"));
      tipUrlEl.attr("href", self._getFlashUrl(r))
    }
  }});
  function XiamiMusicPlugin(config) {
    this.config = config || {}
  }
  S.augment(XiamiMusicPlugin, {pluginRenderUI:function(editor) {
    fakeObjects.init(editor);
    var dataProcessor = editor.htmlDataProcessor, dataFilter = dataProcessor && dataProcessor.dataFilter;
    function checkXiami(url) {
      return/xiami\.com/i.test(url)
    }
    if(dataFilter) {
      dataFilter.addRules({tags:{object:function(element) {
        var title = element.getAttribute("title"), i, c, classId = element.getAttribute("classid");
        var childNodes = element.childNodes;
        if(!classId) {
          for(i = 0;i < childNodes.length;i++) {
            c = childNodes[i];
            if(c.nodeName === "embed") {
              if(!flashUtils.isFlashEmbed(c)) {
                return null
              }
              if(checkXiami(c.attributes.src)) {
                return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true, {title:title})
              }
            }
          }
          return null
        }
        for(i = 0;i < childNodes.length;i++) {
          c = childNodes[i];
          if(c.nodeName === "param" && c.getAttribute("name").toLowerCase() === "movie") {
            if(checkXiami(c.getAttribute("value") || c.getAttribute("VALUE"))) {
              return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true, {title:title})
            }
          }
        }
      }, embed:function(element) {
        if(flashUtils.isFlashEmbed(element) && checkXiami(element.getAttribute("src"))) {
          return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true, {title:element.getAttribute("title")})
        }
      }}}, 4)
    }
    var xiamiMusic = new XiamiMusic({editor:editor, cls:CLS_XIAMI, type:TYPE_XIAMI, bubbleId:"xiami", pluginConfig:this.config, contextMenuId:"xiami", contextMenuHandlers:{"\u867e\u7c73\u5c5e\u6027":function() {
      var selectedEl = this.get("editorSelectedEl");
      if(selectedEl) {
        xiamiMusic.show(selectedEl)
      }
    }}});
    editor.addButton("xiamiMusic", {tooltip:"\u63d2\u5165\u867e\u7c73\u97f3\u4e50", listeners:{click:function() {
      xiamiMusic.show()
    }}, mode:Editor.Mode.WYSIWYG_MODE})
  }});
  return XiamiMusicPlugin
});

