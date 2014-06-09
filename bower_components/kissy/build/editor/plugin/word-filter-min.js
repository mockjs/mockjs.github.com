/*
Copyright 2014, KISSY v1.43
MIT Licensed
build time: May 22 12:27
*/
KISSY.add("editor/plugin/word-filter",["html-parser"],function(r,R){function I(c){for(var c=c.toUpperCase(),d=J.length,b=0,f=0;f<d;++f)for(var e=J[f],g=e[1].length;c.substr(0,g)===e[1];c=c.substr(g))b+=e[0];return b}function K(c){for(var c=c.toUpperCase(),d=L.length,b=1,f=1;0<c.length;f*=d)b+=L.indexOf(c.charAt(c.length-1))*f,c=c.substr(0,c.length-1);return b}function z(c,d){d?c.setAttribute("style",d):c.removeAttribute("style")}function C(c){c=c.childNodes||[];return 1===c.length&&c[0]||null}function M(c,
d){for(var b=c.childNodes||[],f=[],e,g=0;g<b.length;g++)e=b[g],e.nodeName&&(e.nodeName===d&&(f.push(e),b.splice(g--,1)),f=f.concat(M(e,d)));return f}function D(c,d){for(var b=c.parentNode;b&&(!b.nodeName||!b.nodeName.match(d));)b=b.parentNode;return b}function E(c,d){var b,f,e=c.childNodes||[];for(f=0;f<e.length;f++)if(b=e[f],d(b)||b.nodeName&&(b=E(b,d)))return b;return null}function s(c,d,b,f){var e="",g;if("string"===typeof b)e+=d+":"+b+";";else{if("object"===typeof d)for(g in d)e+=g+":"+d[g]+";";
else e+=d;f=b}d=c.getAttribute("style");d=(f?[e,d]:[d,e]).join(";");z(c,d.replace(/^;|;(?=;)/,""))}var t=R("html-parser"),N=r.all,x=r.UA,h=t.DTD,O=new t.Filter,S=/^([.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i,T=/^(?:\b0[^\s]*\s*){1,4}$/,B={ol:{decimal:/\d+/,"lower-roman":/^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,"upper-roman":/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,"lower-alpha":/^[a-z]+$/,"upper-alpha":/^[A-Z]+$/},ul:{disc:/[l\u00B7\u2002]/,
circle:/[\u006F\u00D8]/,square:/[\u006E\u25C6]/}},J=[[1E3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],L="ABCDEFGHIJKLMNOPQRSTUVWXYZ",F=function(){var c;return function(d){c||(c=N('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>').prependTo("body"));return!/%$/.test(d)?(c.css("width",d),c[0].clientWidth):d}}(),y=0,v=null,A,p={flattenList:function(c,d){var d="number"===typeof d?
d:1,b;switch(c.getAttribute("type")){case "a":b="lower-alpha";break;case "1":b="decimal"}for(var f=c.childNodes||[],e,g=0;g<f.length;g++)if(e=f[g],e.nodeName in h.$listItem){var a=e.childNodes||[];a[a.length-1].nodeName in h.$list&&(c.insertAfter(e),--a.length||c.removeChild(f[g--]));e.setTagName("ke:li");c.getAttribute("start")&&!g&&c.setAttribute("value",c.getAttribute("start"));p.stylesFilter([["tab-stops",null,function(a){(a=a.split(" ")[1].match(S))&&(v=F(a[0]))}],1===d?["mso-list",null,function(a){a=
a.split(" ");a=Number(a[0].match(/\d+/));a!==A&&e.setAttribute("ke:reset",1);A=a}]:null])(e.getAttribute("style"));e.setAttribute("ke:indent",d);e.setAttribute("ke:listtype",c.nodeName);e.setAttribute("ke:list-style-type",b)}else if(e.nodeName in h.$list){arguments.callee.apply(this,[e,d+1]);f=f.slice(0,g).concat(e.childNodes).concat(f.slice(g+1));c.empty();for(var a=0,i=f.length;a<i;a++)c.appendChild(f[a])}c.nodeName=c.tagName=null;c.setAttribute("ke:list",1)},assembleList:function(c){for(var d=
c.childNodes||[],b,f,e,g,a,i=[],w,q,j,k,n,u,o=0;o<d.length;o++)if(b=d[o],"ke:li"===b.nodeName)if(b.setTagName("li"),j=(j=b.getAttribute("ke:listsymbol"))&&j.match(/^(?:[(]?)([^\s]+?)([.)]?)$/),k=n=u=null,b.getAttribute("ke:ignored"))d.splice(o--,1);else{b.getAttribute("ke:reset")&&(a=e=g=null);f=Number(b.getAttribute("ke:indent"));f!==e&&(q=w=null);if(j){if(q&&B[q][w].test(j[1]))k=q,n=w;else for(var l in B)for(var h in B[l])if(B[l][h].test(j[1]))if("ol"===l&&/alpha|roman/.test(h)){if(w=/roman/.test(h)?
I(j[1]):K(j[1]),!u||w<u)u=w,k=l,n=h}else{k=l;n=h;break}k||(k=j[2]?"ol":"ul")}else k=b.getAttribute("ke:listtype")||"ol",n=b.getAttribute("ke:list-style-type");q=k;w=n||("ol"===k?"decimal":"disc");n&&n!==("ol"===k?"decimal":"disc")&&s(b,"list-style-type",n);if("ol"===k&&j){switch(n){case "decimal":u=Number(j[1]);break;case "lower-roman":case "upper-roman":u=I(j[1]);break;case "lower-alpha":case "upper-alpha":u=K(j[1])}b.setAttribute("value",u)}if(a){if(f>e)i.push(a=new t.Tag(k)),a.appendChild(b),g.appendChild(a);
else{if(f<e){e-=f;for(var m;e--&&(m=a.parentNode);)a=m.parentNode}a.appendChild(b)}d.splice(o--,1)}else i.push(a=new t.Tag(k)),a.appendChild(b),c.replaceChild(a,d[o]);g=b;e=f}else if(a&&(3!==b.nodeType||r.trim(b.nodeValue)))a=e=g=null;for(o=0;o<i.length;o++)if(c=i[o],d=c.childNodes||[],f=void 0,a=d.length,l=f=void 0,b=/list-style-type:(.*?)(?:;|$)/,h=p.stylesFilter,!b.exec(c.getAttribute("style"))){for(m=0;m<a;m++)if(f=d[m],f.getAttribute("value")&&Number(f.getAttribute("value"))===m+1&&f.removeAttribute("value"),
f=b.exec(f.getAttribute("style")))if(f[1]===l||!l)l=f[1];else{l=null;break}if(l){for(m=0;m<a;m++)if(b=d[m].getAttribute("style"))b=h([["list-style-type"]])(b),z(d[m],b);s(c,"list-style-type",l)}}},falsyFilter:function(){return!1},stylesFilter:function(c,d){return function(b,f){var e=[];(b||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,i,b){i=i.toLowerCase();"font-family"===i&&(b=b.replace(/['']/g,""));for(var q,j,g,h=0;h<c.length;h++)if(c[h]&&(a=c[h][0],q=c[h][1],
j=c[h][2],g=c[h][3],i.match(a)&&(!q||b.match(q)))){i=g||i;d&&(j=j||b);"function"===typeof j&&(j=j(b,f,i));j&&j.push&&(i=j[0],j=j[1]);"string"===typeof j&&e.push([i,j]);return}d||e.push([i,b])});for(var g=0;g<e.length;g++)e[g]=e[g].join(":");return e.length?e.join(";")+";":!1}},applyStyleFilter:null},P=function(c,d){var b=new t.Tag("ke:listbullet");b.setAttribute("ke:listsymbol",c[0]);b.appendChild(new t.Text(d));return b},G=function(c){if(/mso-list\s*:\s*Ignore/i.test(c.getAttribute("style")))return!0},
H=function(c){var d;return(d=C(c))&&/^(:?\s|&nbsp;)+$/.test(d.nodeValue)},Q=function(c){var d;if((d=M(c,"ke:listbullet"))&&d.length&&(d=d[0])){c.setTagName("ke:li");if(c.getAttribute("style")){var b=p.stylesFilter([["text-indent"],["line-height"],[/^margin(:?-left)?$/,null,function(b){b=b.split(" ");b=F(b[3]||b[1]||b[0]);!y&&null!==v&&b>v&&(y=b-v);v=b;y&&c.setAttribute("ke:indent",y&&Math.ceil(b/y)+1||1)}],[/^mso-list$/,null,function(b){var b=b.split(" "),d=Number(b[0].match(/\d+/)),b=Number(b[1].match(/\d+/));
1===b&&(d!==A&&c.setAttribute("ke:reset",1),A=d);c.setAttribute("ke:indent",b)}]])(c.getAttribute("style"),c);z(c,b)}c.getAttribute("ke:indent")||(v=0,c.setAttribute("ke:indent",1));r.each(d.attributes,function(b){c.setAttribute(b.name,b.value)});return!0}A=v=y=null;return!1},U=function(){var c=N('<div style="position:absolute;left:-9999px;top:-9999px;"></div>').prependTo("body");return function(d,b,f){c.css(d,b);for(var d={},b=f.length,e=0;e<b;e++)d[f[e]]=c.css(f[e]);return d}}(),V=function(c){var d=
{},b;for(b in h)-1===b.indexOf("$")&&h[b][c]&&(d[b]=1);return d}("ol");(function(){var c=r.merge(h.$block,h.$listItem,h.$tableContent),d=p.falsyFilter,b=p.stylesFilter,f=p.flattenList,e=p.assembleList,g=function(a){a=F(a);return isNaN(a)?a:a+"px"};O.addRules({tagNames:[[/meta|link|script/,""]],root:function(a){a.filterChildren();e(a)},tags:{"^":function(a){var b;x.gecko&&(b=p.applyStyleFilter)&&b(a)},$:function(a){var i=a.nodeName||"";i in c&&a.getAttribute("style")&&z(a,b([[/^(:?width|height)$/,
null,g]])(a.getAttribute("style")));if(i.match(/h\d/)){if(a.filterChildren(),Q(a))return}else if(i in h.$inline)a.filterChildren(),H(a)&&a.setTagName(null);else if(-1!==i.indexOf(":")&&-1===i.indexOf("ke")){a.filterChildren();if("v:imagedata"===i){(i=a.getAttribute("o:href"))&&a.setAttribute("src",i);a.setTagName("img");return}a.setTagName(null)}i in V&&(a.filterChildren(),e(a))},style:function(a){if(x.gecko){var a=(a=C(a).nodeValue.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/))&&a[1],b={};a&&
(a.replace(/[\n\r]/g,"").replace(/(.+?)\{(.+?)\}/g,function(a,c,d){for(var c=c.split(","),a=c.length,e=0;e<a;e++)r.trim(c[e]).replace(/^(\w+)(\.[\w-]+)?$/g,function(a,c,e){c=c||"*";e=e.substring(1,e.length);e.match(/MsoNormal/)||(b[c]||(b[c]={}),e?b[c][e]=d:b[c]=d)})}),p.applyStyleFilter=function(a){var c=b["*"]?"*":a.nodeName,d=a.getAttribute("class");c in b&&(c=b[c],"object"===typeof c&&(c=c[d]),c&&s(a,c,!0))})}return!1},p:function(a){if(/MsoListParagraph/.exec(a.getAttribute("class"))){var b=E(a,
function(a){return 3===a.nodeType&&!H(a.parentNode)});(b=b&&b.parentNode)&&!b.getAttribute("style")&&b.setAttribute("style","mso-list: Ignore;")}a.filterChildren();Q(a)},div:function(a){var b=C(a);if(b&&"table"===b.nodeName){r.each(a.attributes,function(a){b.setAttribute(a.name,a.value)});a.getAttribute("style")&&s(b,a.getAttribute("style"));var c=new t.Tag("div");s(c,"clear","both");a.appendChild(c);a.setTagName(null)}},td:function(a){D(a,"thead")&&a.setTagName("th")},ol:f,ul:f,dl:f,font:function(a){if(G(a.parentNode))a.setTagName(null);
else{a.filterChildren();var b=a.getAttribute("style"),c=a.parentNode;if("font"===c.name)r.each(a.attributes,function(a){c.setAttribute(a.name,a.value)}),b&&s(c,b),a.setTagName(null);else{b=b||"";a.getAttribute("color")&&("#000000"!==a.getAttribute("color")&&(b+="color:"+a.getAttribute("color")+";"),a.removeAttribute("color"));a.getAttribute("face")&&(b+="font-family:"+a.getAttribute("face")+";",a.removeAttribute("face"));var d=a.getAttribute("size");d&&(b+="font-size:"+(3<d?"large":3>d?"small":"medium")+
";",a.removeAttribute("size"));a.setTagName("span");s(a,b)}}},span:function(a){if(G(a.parentNode))return!1;a.filterChildren();if(H(a))return a.setTagName(null),null;if(G(a)){var c=E(a,function(a){return a.nodeValue||"img"===a.nodeName}),d=(c=c&&(c.nodeValue||"l."))&&c.match(/^(?:[(]?)([^\s]+?)([.)]?)$/);if(d)return c=P(d,c),(a=D(a,"span"))&&/ mso-hide:\s*all|display:\s*none /.test(a.getAttribute("style"))&&c.setAttribute("ke:ignored",1),c}(c=a.getAttribute("style"))&&z(a,b([[/^line-height$/],[/^font-family$/],
[/^font-size$/],[/^color$/],[/^background-color$/]])(c,a))},a:function(a){var b;!(b=a.getAttribute("href"))&&a.getAttribute("name")?a.setTagName(null):x.webkit&&b&&b.match(/file:\/\/\/[\S]+#/i)&&a.setAttribute("href",b.replace(/file:\/\/\/[^#]+/i,""))},"ke:listbullet":function(a){D(a,/h\d/)&&a.setTagName(null)}},attributeNames:[[/^onmouse(:?out|over)/,""],[/^onload$/,""],[/(?:v|o):\w+/,""],[/^lang/,""]],attributes:{style:b([[/^list-style-type$/],[/^margin$|^margin-(?!bottom|top)/,null,function(a,
b,c){if(b.nodeName in{p:1,div:1}){if("margin"===c)a=U(c,a,["margin-left"])["margin-left"];else if("margin-left"!==c)return null;if(a&&!T.test(a))return["margin-left",a]}return null}],[/^clear$/],[/^border.*|margin.*|vertical-align|float$/,null,function(a,b){if("img"===b.nodeName)return a}],[/^width|height$/,null,function(a,b){if(b.nodeName in{table:1,td:1,th:1,img:1})return a}]],1),width:function(a,b){if(b.nodeName in h.$tableContent)return!1},border:function(a,b){if(b.nodeName in h.$tableContent)return!1},
"class":d,bgcolor:d,valign:function(a,b){s(b,"vertical-align",a);return!1}},comment:x.ie?function(a,b){var c=a.match(/<img.*?>/),d=a.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);return d?(d=(c=d[1]||c&&"l.")&&c.match(/>(?:[(]?)([^\s]+?)([.)]?)</),P(d,c)):x.gecko&&c?(c=(new t.Parser(c[0])).parse().childNodes[0],(d=(d=(d=b.previousSibling)&&d.toHtml().match(/<v:imagedata[^>]*o:href=[''](.*?)['']/))&&d[1])&&c.setAttribute("src",d),c):!1}:d})})();return{toDataFormat:function(c,d){x.gecko&&(c=c.replace(/(<\!--\[if[^<]*?\])--\>([\S\s]*?)<\!--(\[endif\]--\>)/gi,
"$1$2$3"));return c=d.htmlDataProcessor.toDataFormat(c,O)}}});
