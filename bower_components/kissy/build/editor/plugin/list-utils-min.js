/*
Copyright 2014, KISSY v1.43
MIT Licensed
build time: May 22 12:24
*/
KISSY.add("editor/plugin/list-utils",[],function(o){var p={ol:1,ul:1},n=o.Node,f=o.DOM,r=f.NodeType,s=o.UA,q={listToArray:function(b,m,g,i,k){if(!p[b.nodeName()])return[];i||(i=0);g||(g=[]);for(var j=0,d=b[0].childNodes.length;j<d;j++){var h=new n(b[0].childNodes[j]);if("li"===h.nodeName()){var c={parent:b,indent:i,element:h,contents:[]};k?c.grandparent=k:(c.grandparent=b.parent(),c.grandparent&&"li"===c.grandparent.nodeName()&&(c.grandparent=c.grandparent.parent()));m&&h._4eSetMarker(m,"listarray_index",
g.length,void 0);g.push(c);for(var l=0,a=h[0].childNodes.length,e;l<a;l++)e=new n(h[0].childNodes[l]),e[0].nodeType===f.NodeType.ELEMENT_NODE&&p[e.nodeName()]?q.listToArray(e,m,g,i+1,c.grandparent):c.contents.push(e)}}return g},arrayToList:function(b,m,g,i){g||(g=0);if(!b||b.length<g+1)return null;for(var k=b[g].parent[0].ownerDocument,j=k.createDocumentFragment(),d=null,h,c=g,l=Math.max(b[g].indent,0),a=null;;){var e=b[c];if(e.indent===l){if(!d||b[c].parent.nodeName()!==d.nodeName())d=b[c].parent.clone(!1),
j.appendChild(d[0]);a=d[0].appendChild(e.element.clone(!1)[0]);for(h=0;h<e.contents.length;h++)a.appendChild(e.contents[h].clone(!0)[0]);c++}else if(e.indent===Math.max(l,0)+1)c=q.arrayToList(b,null,c,i),a.appendChild(c.listNode),c=c.nextIndex;else if(-1===e.indent&&!g&&e.grandparent){p[e.grandparent.nodeName()]?a=e.element.clone(!1)[0]:"td"!==e.grandparent.nodeName()?(a=k.createElement(i),e.element._4eCopyAttributes(new n(a))):a=k.createDocumentFragment();for(h=0;h<e.contents.length;h++)d=e.contents[h].clone(!0),
a.nodeType===r.DOCUMENT_FRAGMENT_NODE&&e.element._4eCopyAttributes(new n(d)),a.appendChild(d[0]);a.nodeType===r.DOCUMENT_FRAGMENT_NODE&&c!==b.length-1&&(a.lastChild&&a.lastChild.nodeType===f.NodeType.ELEMENT_NODE&&"_moz"===a.lastChild.getAttribute("type")&&f._4eRemove(a.lastChild),f._4eAppendBogus(a));a.nodeType===f.NodeType.ELEMENT_NODE&&f.nodeName(a)===i&&a.firstChild&&(f._4eTrim(a),d=a.firstChild,d.nodeType===f.NodeType.ELEMENT_NODE&&f._4eIsBlockBoundary(d)&&(d=k.createDocumentFragment(),f._4eMoveChildren(a,
d),a=d));d=f.nodeName(a);!s.ie&&("div"===d||"p"===d)&&f._4eAppendBogus(a);j.appendChild(a);d=null;c++}else return null;if(b.length<=c||Math.max(b[c].indent,0)<l)break}if(m)for(b=new n(j.firstChild);b&&b[0];)b[0].nodeType===f.NodeType.ELEMENT_NODE&&b._4eClearMarkers(m,!0),b=b._4eNextSourceNode();return{listNode:j,nextIndex:c}}};return q});
