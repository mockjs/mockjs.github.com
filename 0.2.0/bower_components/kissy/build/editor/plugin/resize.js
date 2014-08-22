/*
Copyright 2014, KISSY v1.44
MIT Licensed
build time: May 22 12:25
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 editor/plugin/resize
*/

KISSY.add("editor/plugin/resize", ["dd"], function(S, require) {
  var DD = require("dd");
  var Node = S.Node;
  function Resize(config) {
    this.config = config || {}
  }
  S.augment(Resize, {pluginRenderUI:function(editor) {
    var Draggable = DD.Draggable, statusBarEl = editor.get("statusBarEl"), cfg = this.config, direction = cfg.direction || ["x", "y"];
    var cursor = "se-resize";
    if(direction.length === 1) {
      if(direction[0] === "x") {
        cursor = "e-resize"
      }else {
        cursor = "s-resize"
      }
    }
    var resizer = (new Node('<div class="' + editor.get("prefixCls") + 'editor-resizer" style="cursor: ' + cursor + '"></div>')).appendTo(statusBarEl);
    editor.on("maximizeWindow", function() {
      resizer.css("display", "none")
    });
    editor.on("restoreWindow", function() {
      resizer.css("display", "")
    });
    var d = new Draggable({node:resizer, groups:false}), height = 0, width = 0, dragStartMousePos, heightEl = editor.get("el"), widthEl = editor.get("el");
    d.on("dragstart", function() {
      height = heightEl.height();
      width = widthEl.width();
      editor.fire("resizeStart");
      dragStartMousePos = d.get("dragStartMousePos")
    });
    d.on("drag", function(ev) {
      var diffX = ev.pageX - dragStartMousePos.left, diffY = ev.pageY - dragStartMousePos.top;
      if(S.inArray("y", direction)) {
        editor.set("height", height + diffY)
      }
      if(S.inArray("x", direction)) {
        editor.set("width", width + diffX)
      }
      editor.fire("resize")
    });
    editor.on("destroy", function() {
      d.destroy();
      resizer.remove()
    })
  }});
  return Resize
});

