/*
Copyright 2014, KISSY v1.43
MIT Licensed
build time: May 22 12:18
*/
KISSY.add("dd/ddm",["node","base"],function(g,c){function j(e){var a,b;if(e.touches&&1<e.touches.length)p._end();else{if(a=this.__activeToDrag)a._move(e);else if(b=this.get("activeDrag"))b._move(e),this.__needDropCheck&&f(this,e,b);(a=a||b)&&a.get("preventDefaultOnMove")&&e.preventDefault()}}function f(e,a,b){var i=e.get("validDrops"),m=b.get("mode"),c=0,d=0,f=h(b.get("node")),o=q(f);g.each(i,function(e){if(!e.get("disabled")){var i;if(i=e.getNodeFromTarget(a,b.get("dragNode")[0],b.get("node")[0]))if("point"===
m)k(h(i),b.mousePos)&&(i=q(h(i)),c?i<d&&(c=e,d=i):(c=e,d=i));else if("intersect"===m)i=q(r(f,h(i))),i>d&&(d=i,c=e);else if("strict"===m&&(i=q(r(f,h(i))),i===o))return c=e,!1}});if((i=e.get("activeDrop"))&&i!==c)i._handleOut(a),b._handleOut(a);e.setInternal("activeDrop",c);c&&(i!==c?c._handleEnter(a):c._handleOver(a))}function d(e){var a=e.get("activeDrag").get("activeHandler"),b="auto";a&&(b=a.css("cursor"));"auto"===b&&(b=e.get("dragCursor"));e._shim.css({cursor:b,display:"block"});v&&w.call(e)}
function l(e){var a=e.get("drops");e.setInternal("validDrops",[]);a.length&&g.each(a,function(e){e._active()})}function b(e){var a=e.get("drops");e.setInternal("validDrops",[]);a.length&&g.each(a,function(e){e._deActive()})}function h(e){var a=e.offset();return{left:a.left,right:a.left+(e.__ddCachedWidth||e.outerWidth()),top:a.top,bottom:a.top+(e.__ddCachedHeight||e.outerHeight())}}function k(e,a){return e.left<=a.left&&e.right>=a.left&&e.top<=a.top&&e.bottom>=a.top}function q(a){return a.top>=a.bottom||
a.left>=a.right?0:(a.right-a.left)*(a.bottom-a.top)}function r(a,b){var i=Math.max(a.top,b.top),c=Math.min(a.right,b.right),m=Math.min(a.bottom,b.bottom);return{left:Math.max(a.left,b.left),right:c,top:i,bottom:m}}function n(a){a&&(a.__ddCachedWidth=a.outerWidth(),a.__ddCachedHeight=a.outerHeight())}var s=c("node"),t=c("base"),a=g.UA,i=s.all,m=g.Env.host,o=m.document,u=i(o),B=i(m),v=6===a.ie,s=s.Gesture,x=s.move,y=s.end,t=t.extend({__activeToDrag:0,_regDrop:function(a){this.get("drops").push(a)},
_unRegDrop:function(a){var b=this.get("drops"),a=g.indexOf(a,b);-1!==a&&b.splice(a,1)},_regToDrag:function(a){this.__activeToDrag=a;u.on(y,this._end,this);u.on(x,z,this);o.body.setCapture&&o.body.setCapture()},_start:function(){var a=this.__activeToDrag;a&&(this.setInternal("activeDrag",a),this.__activeToDrag=0,a.get("shim")&&A(this),this.__needDropCheck=0,a.get("groups")&&(l(this),this.get("validDrops").length&&(n(a.get("node")),this.__needDropCheck=1)))},_addValidDrop:function(a){this.get("validDrops").push(a)},
_end:function(a){var i=this.__activeToDrag,c=this.get("activeDrag"),m=this.get("activeDrop");a&&(i&&i._move(a),c&&c._move(a));u.detach(x,z,this);u.detach(y,this._end,this);o.body.releaseCapture&&o.body.releaseCapture();i&&(i._end(a),this.__activeToDrag=0);this._shim&&this._shim.hide();c&&(c._end(a),b(this),m&&m._end(a),this.setInternal("activeDrag",null),this.setInternal("activeDrop",null))}},{ATTRS:{dragCursor:{value:"move"},clickPixelThresh:{value:3},bufferTime:{value:1},activeDrag:{},activeDrop:{},
drops:{value:[]},validDrops:{value:[]}}}),z=a.ie?g.throttle(j,30):j,A=function(a){a._shim=i('<div style="background-color:red;position:'+(v?"absolute":"fixed")+";left:0;width:100%;height:100%;top:0;cursor:"+p.get("dragCursor")+';z-index:999999;"></div>').prependTo(o.body||o.documentElement).css("opacity",0);A=d;if(v)B.on("resize scroll",w,a);d(a)},w=g.throttle(function(){var a;(a=this.get("activeDrag"))&&a.get("shim")&&this._shim.css({width:u.width(),height:u.height()})},30),p=new t;p.inRegion=k;
p.region=h;p.area=q;p.cacheWH=n;p.PREFIX_CLS="ks-dd-";return p});
KISSY.add("dd/draggable",["node","./ddm","base"],function(g,c){function j(){return!1}var f=c("node"),d=c("./ddm"),l=c("base"),b=f.all,h=g.each,k=g.Features,q=g.UA.ie,r=d.PREFIX_CLS,n=g.Env.host.document,s,t=function(a){var b=a.target;this._checkDragStartValid(a)&&this._checkHandler(b)&&this._prepare(a)};return l.extend({initializer:function(){this.addTarget(d);this._allowMove=this.get("move")},_onSetNode:function(a){this.setInternal("dragNode",a);this.bindDragEvent()},bindDragEvent:function(){this.get("node").on(f.Gesture.start,
t,this).on("dragstart",this._fixDragStart)},detachDragEvent:function(a){a=this;a.get("node").detach(f.Gesture.start,t,a).detach("dragstart",a._fixDragStart)},_bufferTimer:null,_onSetDisabledChange:function(a){this.get("dragNode")[a?"addClass":"removeClass"](r+"-disabled")},_fixDragStart:function(a){a.preventDefault()},_checkHandler:function(a){var b=this,c=b.get("handlers"),k=0;h(c,function(c){if(c[0]===a||c.contains(a))return k=1,b.setInternal("activeHandler",c),!1});return k},_checkDragStartValid:function(a){return this.get("primaryButtonOnly")&&
1!==a.which||this.get("disabled")?0:1},_prepare:function(a){if(a){var b=this;q&&(s=n.body.onselectstart,n.body.onselectstart=j);b.get("halt")&&a.stopPropagation();k.isTouchEventSupported()||a.preventDefault();var c=a.pageX,h=a.pageY;b.setInternal("startMousePos",b.mousePos={left:c,top:h});if(b._allowMove){var f=b.get("node").offset();b.setInternal("startNodePos",f);b.setInternal("deltaPos",{left:c-f.left,top:h-f.top})}d._regToDrag(b);if(c=b.get("bufferTime"))b._bufferTimer=setTimeout(function(){b._start(a)},
1E3*c)}},_clearBufferTimer:function(){this._bufferTimer&&(clearTimeout(this._bufferTimer),this._bufferTimer=0)},_move:function(a){var b=a.pageX,c=a.pageY;if(!this.get("dragging")){var k=this.get("startMousePos"),h=0,d=this.get("clickPixelThresh");if(Math.abs(b-k.left)>=d||Math.abs(c-k.top)>=d)this._start(a),h=1;if(!h)return}this.mousePos={left:b,top:c};a={drag:this,left:b,top:c,pageX:b,pageY:c,domEvent:a};if(k=this._allowMove)h=this.get("deltaPos"),b-=h.left,c-=h.top,a.left=b,a.top=c,this.setInternal("actualPos",
{left:b,top:c}),this.fire("dragalign",a);c=1;!1===this.fire("drag",a)&&(c=0);c&&k&&this.get("node").offset(this.get("actualPos"))},stopDrag:function(){d._end()},_end:function(a){var a=a||{},b;this._clearBufferTimer();q&&(n.body.onselectstart=s);this.get("dragging")&&(this.get("node").removeClass(r+"drag-over"),(b=d.get("activeDrop"))?this.fire("dragdrophit",{drag:this,drop:b}):this.fire("dragdropmiss",{drag:this}),this.setInternal("dragging",0),this.fire("dragend",{drag:this,pageX:a.pageX,pageY:a.pageY}))},
_handleOut:function(){this.get("node").removeClass(r+"drag-over");this.fire("dragexit",{drag:this,drop:d.get("activeDrop")})},_handleEnter:function(a){this.get("node").addClass(r+"drag-over");this.fire("dragenter",a)},_handleOver:function(a){this.fire("dragover",a)},_start:function(a){this._clearBufferTimer();this.setInternal("dragging",1);this.setInternal("dragStartMousePos",{left:a.pageX,top:a.pageY});d._start();this.fire("dragstart",{drag:this,pageX:a.pageX,pageY:a.pageY})},destructor:function(){this.detachDragEvent();
this.detach()}},{name:"Draggable",ATTRS:{node:{setter:function(a){if(!(a instanceof f))return b(a)}},clickPixelThresh:{valueFn:function(){return d.get("clickPixelThresh")}},bufferTime:{valueFn:function(){return d.get("bufferTime")}},dragNode:{},shim:{value:!1},handlers:{value:[],getter:function(a){var c=this;a.length||(a[0]=c.get("node"));h(a,function(k,h){"function"===typeof k&&(k=k.call(c));"string"===typeof k&&(k=c.get("node").one(k));k.nodeType&&(k=b(k));a[h]=k});c.setInternal("handlers",a);return a}},
activeHandler:{},dragging:{value:!1,setter:function(a){this.get("dragNode")[a?"addClass":"removeClass"](r+"dragging")}},mode:{value:"point"},disabled:{value:!1},move:{value:!1},primaryButtonOnly:{value:!0},halt:{value:!0},groups:{value:!0},startMousePos:{},dragStartMousePos:{},startNodePos:{},deltaPos:{},actualPos:{},preventDefaultOnMove:{value:!0}},inheritedStatics:{DropMode:{POINT:"point",INTERSECT:"intersect",STRICT:"strict"}}})});
KISSY.add("dd/draggable-delegate",["node","./ddm","./draggable"],function(g,c){var j=c("node"),f=c("./ddm"),d=c("./draggable"),l=f.PREFIX_CLS,b=j.all,h=function(c){var h,d;if(this._checkDragStartValid(c)){h=this.get("handlers");var f=b(c.target);(h=h.length?this._getHandler(f):f)&&(d=this._getNode(h));d&&(this.setInternal("activeHandler",h),this.setInternal("node",d),this.setInternal("dragNode",d),this._prepare(c))}};return d.extend({_onSetNode:function(){},_onSetContainer:function(){this.bindDragEvent()},
_onSetDisabledChange:function(b){this.get("container")[b?"addClass":"removeClass"](l+"-disabled")},bindDragEvent:function(){this.get("container").on(j.Gesture.start,h,this).on("dragstart",this._fixDragStart)},detachDragEvent:function(){this.get("container").detach(j.Gesture.start,h,this).detach("dragstart",this._fixDragStart)},_getHandler:function(b){for(var c=this.get("container"),h=this.get("handlers");b&&b[0]!==c[0];){for(var d=0;d<h.length;d++)if(b.test(h[d]))return b;b=b.parent()}return null},
_getNode:function(b){return b.closest(this.get("selector"),this.get("container"))}},{ATTRS:{container:{setter:function(c){return b(c)}},selector:{},handlers:{value:[],getter:0}}})});
KISSY.add("dd/droppable",["node","./ddm","base"],function(g,c){var j=c("node"),f=c("./ddm"),d=c("base"),l=f.PREFIX_CLS;return d.extend({initializer:function(){this.addTarget(f);f._regDrop(this)},getNodeFromTarget:function(b,c,d){var b=this.get("node"),f=b[0];return f===c||f===d?null:b},_active:function(){var b=f.get("activeDrag"),c=this.get("node"),d=this.get("groups"),b=b.get("groups");a:if(!0===b)d=1;else{for(var g in d)if(b[g]){d=1;break a}d=0}d?(f._addValidDrop(this),c&&(c.addClass(l+"drop-active-valid"),
f.cacheWH(c))):c&&c.addClass(l+"drop-active-invalid")},_deActive:function(){var b=this.get("node");b&&b.removeClass(l+"drop-active-valid").removeClass(l+"drop-active-invalid")},__getCustomEvt:function(b){return g.mix({drag:f.get("activeDrag"),drop:this},b)},_handleOut:function(){var b=this.__getCustomEvt();this.get("node").removeClass(l+"drop-over");this.fire("dropexit",b)},_handleEnter:function(b){b=this.__getCustomEvt(b);b.drag._handleEnter(b);this.get("node").addClass(l+"drop-over");this.fire("dropenter",
b)},_handleOver:function(b){b=this.__getCustomEvt(b);b.drag._handleOver(b);this.fire("dropover",b)},_end:function(){var b=this.__getCustomEvt();this.get("node").removeClass(l+"drop-over");this.fire("drophit",b)},destructor:function(){f._unRegDrop(this)}},{name:"Droppable",ATTRS:{node:{setter:function(b){if(b)return j.one(b)}},groups:{value:{}},disabled:{}}})});
KISSY.add("dd/droppable-delegate",["node","./ddm","./droppable"],function(g,c){function j(){var b=this.get("container"),c=[],f=this.get("selector");b.all(f).each(function(b){d.cacheWH(b);c.push(b)});this.__allNodes=c}var f=c("node"),d=c("./ddm"),l=c("./droppable").extend({initializer:function(){d.on("dragstart",j,this)},getNodeFromTarget:function(b,c,f){var l={left:b.pageX,top:b.pageY},b=this.__allNodes,j=0,n=Number.MAX_VALUE;b&&g.each(b,function(b){var g=b[0];g===f||g===c||(g=d.region(b),d.inRegion(g,
l)&&(g=d.area(g),g<n&&(n=g,j=b)))});j&&(this.setInternal("lastNode",this.get("node")),this.setInternal("node",j));return j},_handleOut:function(){this.callSuper();this.setInternal("node",0);this.setInternal("lastNode",0)},_handleOver:function(b){var c=this.get("node"),d=l.superclass._handleOut,f=this.callSuper,g=l.superclass._handleEnter,j=this.get("lastNode");j[0]!==c[0]?(this.setInternal("node",j),d.apply(this,arguments),this.setInternal("node",c),g.call(this,b)):f.call(this,b)},_end:function(b){this.callSuper(b);
this.setInternal("node",0)}},{ATTRS:{lastNode:{},selector:{},container:{setter:function(b){return f.one(b)}}}});return l});KISSY.add("dd",["dd/ddm","dd/draggable","dd/draggable-delegate","dd/droppable-delegate","dd/droppable"],function(g,c){var j=c("dd/ddm"),f=c("dd/draggable"),d=c("dd/draggable-delegate"),l=c("dd/droppable-delegate"),b=c("dd/droppable"),j={Draggable:f,DDM:j,Droppable:b,DroppableDelegate:l,DraggableDelegate:d};return KISSY.DD=j});
