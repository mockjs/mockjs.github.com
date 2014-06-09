/*
Copyright 2014, KISSY v1.43
MIT Licensed
build time: May 22 12:31
*/
KISSY.add("xtemplate/compiler/parser",[],function(l,a){var c={},b=KISSY,e=function(a){this.rules=[];b.mix(this,a);this.resetInput(this.input)};e.prototype={constructor:function(a){this.rules=[];b.mix(this,a);this.resetInput(this.input)},resetInput:function(a){b.mix(this,{input:a,matched:"",stateStack:[e.STATIC.INITIAL],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},genShortId:function(a){a+="__gen";a in this||(this[a]=-1);var a=this[a]+=1,d="";do d=String.fromCharCode(97+
a%26)+d,a=Math.floor(a/26)-1;while(0<=a);return d},getCurrentRules:function(){var a=this.stateStack[this.stateStack.length-1],d=[],a=this.mapState(a);b.each(this.rules,function(i){var c=i.state||i[3];c?b.inArray(a,c)&&d.push(i):a===e.STATIC.INITIAL&&d.push(i)});return d},pushState:function(a){this.stateStack.push(a)},popState:function(){return this.stateStack.pop()},getStateStack:function(){return this.stateStack},showDebugInfo:function(){var a=e.STATIC.DEBUG_CONTEXT_LIMIT,d=this.matched,c=this.match,
b=this.input,d=d.slice(0,d.length-c.length),d=(d.length>a?"...":"")+d.slice(-a).replace(/\n/," "),c=c+b,c=c.slice(0,a)+(c.length>a?"...":"");return d+c+"\n"+Array(d.length+1).join("-")+"^"},mapSymbol:function(a){var c=this.symbolMap;return!c?a:c[a]||(c[a]=this.genShortId("symbol"))},mapReverseSymbol:function(a){var c=this.symbolMap,e,b=this.reverseSymbolMap;if(!b&&c)for(e in b=this.reverseSymbolMap={},c)b[c[e]]=e;return b?b[a]:a},mapState:function(a){var c=this.stateMap;return!c?a:c[a]||(c[a]=this.genShortId("state"))},
lex:function(){var c=this.input,d,i,m,g=this.getCurrentRules();this.match=this.text="";if(!c)return this.mapSymbol(e.STATIC.END_TAG);for(d=0;d<g.length;d++){i=g[d];var n=i.token||i[0];m=i.action||i[2]||a;if(i=c.match(i.regexp||i[1])){if(d=i[0].match(/\n.*/g))this.lineNumber+=d.length;b.mix(this,{firstLine:this.lastLine,lastLine:this.lineNumber+1,firstColumn:this.lastColumn,lastColumn:d?d[d.length-1].length-1:this.lastColumn+i[0].length});d=this.match=i[0];this.matches=i;this.text=d;this.matched+=
d;m=m&&m.call(this);m=m===a?n:this.mapSymbol(m);this.input=c=c.slice(d.length);return m?m:this.lex()}}return a}};e.STATIC={INITIAL:"I",DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"};var g=new e({rules:[[0,/^[\s\S]*?(?={{)/,function(){var a=this.text,c,e=0;if(c=a.match(/\\+$/))e=c[0].length;e%2?(this.pushState("et"),a=a.slice(0,-1)):this.pushState("t");e&&(a=a.replace(/\\+$/g,function(a){return Array(a.length/2+1).join("\\")}));this.text=a;return"CONTENT"}],["b",/^[\s\S]+/,0],["b",/^[\s\S]{2,}?(?:(?={{)|$)/,
function(){this.popState()},["et"]],["c",/^{{(?:#|@|\^)/,0,["t"]],["d",/^{{\//,0,["t"]],["e",/^{{\s*else\s*}}/,function(){this.popState()},["t"]],[0,/^{{![\s\S]*?}}/,function(){this.popState()},["t"]],["b",/^{{%([\s\S]*?)%}}/,function(){this.text=this.matches[1]||"";this.popState()},["t"]],["f",/^{{{?/,0,["t"]],["g",/^\s+/,0,["t"]],["h",/^}}}?/,function(){this.popState()},["t"]],["i",/^\(/,0,["t"]],["j",/^\)/,0,["t"]],["k",/^\|\|/,0,["t"]],["l",/^&&/,0,["t"]],["m",/^===/,0,["t"]],["n",/^!==/,0,["t"]],
["o",/^>=/,0,["t"]],["p",/^<=/,0,["t"]],["q",/^>/,0,["t"]],["r",/^</,0,["t"]],["s",/^\+/,0,["t"]],["t",/^-/,0,["t"]],["u",/^\*/,0,["t"]],["v",/^\//,0,["t"]],["w",/^%/,0,["t"]],["x",/^!/,0,["t"]],["y",/^"(\\[\s\S]|[^\\"])*"/,function(){this.text=this.text.slice(1,-1).replace(/\\"/g,'"')},["t"]],["y",/^'(\\[\s\S]|[^\\'])*'/,function(){this.text=this.text.slice(1,-1).replace(/\\'/g,"'")},["t"]],["z",/^true/,0,["t"]],["z",/^false/,0,["t"]],["aa",/^\d+(?:\.\d+)?(?:e-?\d+)?/i,0,["t"]],["ab",/^=/,0,["t"]],
["ac",/^\.(?=})/,0,["t"]],["ac",/^\.\./,function(){this.pushState("ws")},["t"]],["ad",/^\//,function(){this.popState()},["ws"]],["ad",/^\./,0,["t"]],["ae",/^\[/,0,["t"]],["af",/^\]/,0,["t"]],["ac",/^[a-zA-Z0-9_$]+/,0,["t"]],["ag",/^./,0,["t"]]]});c.lexer=g;g.symbolMap={$EOF:"a",CONTENT:"b",OPEN_BLOCK:"c",OPEN_CLOSE_BLOCK:"d",INVERSE:"e",OPEN_TPL:"f",SPACE:"g",CLOSE:"h",LPAREN:"i",RPAREN:"j",OR:"k",AND:"l",LOGIC_EQUALS:"m",LOGIC_NOT_EQUALS:"n",GE:"o",LE:"p",GT:"q",LT:"r",PLUS:"s",MINUS:"t",MULTIPLY:"u",
DIVIDE:"v",MODULUS:"w",NOT:"x",STRING:"y",BOOLEAN:"z",NUMBER:"aa",EQUALS:"ab",ID:"ac",SEP:"ad",REF_START:"ae",REF_END:"af",INVALID:"ag",$START:"ah",program:"ai",statements:"aj",statement:"ak",openBlock:"al",closeBlock:"am",tpl:"an",inBlockTpl:"ao",path:"ap",inTpl:"aq",Expression:"ar",params:"as",hash:"at",param:"au",ConditionalOrExpression:"av",ConditionalAndExpression:"aw",EqualityExpression:"ax",RelationalExpression:"ay",AdditiveExpression:"az",MultiplicativeExpression:"ba",UnaryExpression:"bb",
PrimaryExpression:"bc",hashSegments:"bd",hashSegment:"be",pathSegments:"bf"};c.productions=[["ah",["ai"]],["ai",["aj","e","aj"],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1,this.$3)}],["ai",["aj"],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1)}],["aj",["ak"],function(){return[this.$1]}],["aj",["aj","ak"],function(){this.$1.push(this.$2)}],["ak",["al","ai","am"],function(){return new this.yy.BlockNode(this.lexer.lineNumber,this.$1,this.$2,this.$3)}],
["ak",["an"]],["ak",["b"],function(){return new this.yy.ContentNode(this.lexer.lineNumber,this.$1)}],["ao",["ap"],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1)}],["ao",["aq"]],["al",["c","ao","h"],function(){"^"===this.$1.charAt(this.$1.length-1)&&(this.$2.isInverted=1);return this.$2}],["am",["d","ap","h"],function(){return this.$2}],["an",["f","aq","h"],function(){3===this.$1.length&&(this.$2.escaped=!1);return this.$2}],["an",["f","ar","h"],function(){var a=new this.yy.TplExpressionNode(this.lexer.lineNumber,
this.$2);3===this.$1.length&&(a.escaped=!1);return a}],["aq",["ap","g","as","g","at"],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,this.$3,this.$5)}],["aq",["ap","g","as"],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,this.$3)}],["aq",["ap","g","at"],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,null,this.$3)}],["as",["as","g","au"],function(){this.$1.push(this.$3)}],["as",["au"],function(){return[this.$1]}],["au",["ar"]],["ar",["av"]],
["av",["aw"]],["av",["av","k","aw"],function(){return new this.yy.ConditionalOrExpression(this.$1,this.$3)}],["aw",["ax"]],["aw",["aw","l","ax"],function(){return new this.yy.ConditionalAndExpression(this.$1,this.$3)}],["ax",["ay"]],["ax",["ax","m","ay"],function(){return new this.yy.EqualityExpression(this.$1,"===",this.$3)}],["ax",["ax","n","ay"],function(){return new this.yy.EqualityExpression(this.$1,"!==",this.$3)}],["ay",["az"]],["ay",["ay","r","az"],function(){return new this.yy.RelationalExpression(this.$1,
"<",this.$3)}],["ay",["ay","q","az"],function(){return new this.yy.RelationalExpression(this.$1,">",this.$3)}],["ay",["ay","p","az"],function(){return new this.yy.RelationalExpression(this.$1,"<=",this.$3)}],["ay",["ay","o","az"],function(){return new this.yy.RelationalExpression(this.$1,">=",this.$3)}],["az",["ba"]],["az",["az","s","ba"],function(){return new this.yy.AdditiveExpression(this.$1,"+",this.$3)}],["az",["az","t","ba"],function(){return new this.yy.AdditiveExpression(this.$1,"-",this.$3)}],
["ba",["bb"]],["ba",["ba","u","bb"],function(){return new this.yy.MultiplicativeExpression(this.$1,"*",this.$3)}],["ba",["ba","v","bb"],function(){return new this.yy.MultiplicativeExpression(this.$1,"/",this.$3)}],["ba",["ba","w","bb"],function(){return new this.yy.MultiplicativeExpression(this.$1,"%",this.$3)}],["bb",["x","bb"],function(){return new this.yy.UnaryExpression(this.$1,this.$2)}],["bb",["t","bb"],function(){return new this.yy.UnaryExpression(this.$1,this.$2)}],["bb",["bc"]],["bc",["y"],
function(){return new this.yy.StringNode(this.lexer.lineNumber,this.$1)}],["bc",["aa"],function(){return new this.yy.NumberNode(this.lexer.lineNumber,this.$1)}],["bc",["z"],function(){return new this.yy.BooleanNode(this.lexer.lineNumber,this.$1)}],["bc",["ap"]],["bc",["i","ar","j"],function(){return this.$2}],["at",["bd"],function(){return new this.yy.HashNode(this.lexer.lineNumber,this.$1)}],["bd",["bd","g","be"],function(){this.$1.push(this.$3)}],["bd",["be"],function(){return[this.$1]}],["be",
["ac","ab","ar"],function(){return[this.$1,this.$3]}],["ap",["bf"],function(){return new this.yy.IdNode(this.lexer.lineNumber,this.$1)}],["bf",["bf","ad","ac"],function(){this.$1.push(this.$3)}],["bf",["bf","ae","ar","af"],function(){this.$1.push(this.$3)}],["bf",["bf","ad","aa"],function(){this.$1.push(this.$3)}],["bf",["ac"],function(){return[this.$1]}]];c.table={gotos:{"0":{ai:4,aj:5,ak:6,al:7,an:8},2:{ao:10,aq:11,ap:12,bf:13},3:{aq:20,ar:21,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,ap:30,
bf:13},5:{ak:32,al:7,an:8},7:{ai:33,aj:5,ak:6,al:7,an:8},14:{ar:38,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},15:{bb:40,bc:29,ap:39,bf:13},16:{bb:41,bc:29,ap:39,bf:13},31:{aj:57,ak:6,al:7,an:8},33:{am:59},35:{as:61,au:62,ar:63,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,at:64,bd:65,be:66,ap:39,bf:13},37:{ar:69,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},44:{aw:71,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},45:{ax:72,ay:25,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},
46:{ay:73,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},47:{ay:74,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},48:{az:75,ba:27,bb:28,bc:29,ap:39,bf:13},49:{az:76,ba:27,bb:28,bc:29,ap:39,bf:13},50:{az:77,ba:27,bb:28,bc:29,ap:39,bf:13},51:{az:78,ba:27,bb:28,bc:29,ap:39,bf:13},52:{ba:79,bb:28,bc:29,ap:39,bf:13},53:{ba:80,bb:28,bc:29,ap:39,bf:13},54:{bb:81,bc:29,ap:39,bf:13},55:{bb:82,bc:29,ap:39,bf:13},56:{bb:83,bc:29,ap:39,bf:13},57:{ak:32,al:7,an:8},58:{ap:84,bf:13},85:{ar:90,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,
bc:29,ap:39,bf:13},86:{au:91,ar:63,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,at:92,bd:65,be:66,ap:39,bf:13},87:{be:94}},action:{"0":{b:[1,a,1],c:[1,a,2],f:[1,a,3]},1:{a:[2,7],e:[2,7],c:[2,7],f:[2,7],b:[2,7],d:[2,7]},2:{ac:[1,a,9]},3:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},4:{a:[0]},5:{a:[2,2],d:[2,2],b:[1,a,1],c:[1,a,2],e:[1,a,31],f:[1,a,3]},6:{a:[2,3],e:[2,3],c:[2,3],f:[2,3],b:[2,3],d:[2,3]},7:{b:[1,a,1],c:[1,a,2],f:[1,a,3]},8:{a:[2,6],e:[2,6],c:[2,6],
f:[2,6],b:[2,6],d:[2,6]},9:{h:[2,56],g:[2,56],ad:[2,56],ae:[2,56],k:[2,56],l:[2,56],m:[2,56],n:[2,56],o:[2,56],p:[2,56],q:[2,56],r:[2,56],s:[2,56],t:[2,56],u:[2,56],v:[2,56],w:[2,56],j:[2,56],af:[2,56]},10:{h:[1,a,34]},11:{h:[2,9]},12:{h:[2,8],g:[1,a,35]},13:{h:[2,52],g:[2,52],k:[2,52],l:[2,52],m:[2,52],n:[2,52],o:[2,52],p:[2,52],q:[2,52],r:[2,52],s:[2,52],t:[2,52],u:[2,52],v:[2,52],w:[2,52],j:[2,52],af:[2,52],ad:[1,a,36],ae:[1,a,37]},14:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,
a,19],ac:[1,a,9]},15:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},16:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},17:{h:[2,43],k:[2,43],l:[2,43],m:[2,43],n:[2,43],o:[2,43],p:[2,43],q:[2,43],r:[2,43],s:[2,43],t:[2,43],u:[2,43],v:[2,43],w:[2,43],j:[2,43],g:[2,43],af:[2,43]},18:{h:[2,45],k:[2,45],l:[2,45],m:[2,45],n:[2,45],o:[2,45],p:[2,45],q:[2,45],r:[2,45],s:[2,45],t:[2,45],u:[2,45],v:[2,45],w:[2,45],j:[2,45],g:[2,45],af:[2,45]},
19:{h:[2,44],k:[2,44],l:[2,44],m:[2,44],n:[2,44],o:[2,44],p:[2,44],q:[2,44],r:[2,44],s:[2,44],t:[2,44],u:[2,44],v:[2,44],w:[2,44],j:[2,44],g:[2,44],af:[2,44]},20:{h:[1,a,42]},21:{h:[1,a,43]},22:{h:[2,20],j:[2,20],g:[2,20],af:[2,20],k:[1,a,44]},23:{h:[2,21],k:[2,21],j:[2,21],g:[2,21],af:[2,21],l:[1,a,45]},24:{h:[2,23],k:[2,23],l:[2,23],j:[2,23],g:[2,23],af:[2,23],m:[1,a,46],n:[1,a,47]},25:{h:[2,25],k:[2,25],l:[2,25],m:[2,25],n:[2,25],j:[2,25],g:[2,25],af:[2,25],o:[1,a,48],p:[1,a,49],q:[1,a,50],r:[1,
a,51]},26:{h:[2,28],k:[2,28],l:[2,28],m:[2,28],n:[2,28],o:[2,28],p:[2,28],q:[2,28],r:[2,28],j:[2,28],g:[2,28],af:[2,28],s:[1,a,52],t:[1,a,53]},27:{h:[2,33],k:[2,33],l:[2,33],m:[2,33],n:[2,33],o:[2,33],p:[2,33],q:[2,33],r:[2,33],s:[2,33],t:[2,33],j:[2,33],g:[2,33],af:[2,33],u:[1,a,54],v:[1,a,55],w:[1,a,56]},28:{h:[2,36],k:[2,36],l:[2,36],m:[2,36],n:[2,36],o:[2,36],p:[2,36],q:[2,36],r:[2,36],s:[2,36],t:[2,36],u:[2,36],v:[2,36],w:[2,36],j:[2,36],g:[2,36],af:[2,36]},29:{h:[2,42],k:[2,42],l:[2,42],m:[2,
42],n:[2,42],o:[2,42],p:[2,42],q:[2,42],r:[2,42],s:[2,42],t:[2,42],u:[2,42],v:[2,42],w:[2,42],j:[2,42],g:[2,42],af:[2,42]},30:{h:[2,46],k:[2,46],l:[2,46],m:[2,46],n:[2,46],o:[2,46],p:[2,46],q:[2,46],r:[2,46],s:[2,46],t:[2,46],u:[2,46],v:[2,46],w:[2,46],g:[1,a,35]},31:{b:[1,a,1],c:[1,a,2],f:[1,a,3]},32:{a:[2,4],e:[2,4],c:[2,4],f:[2,4],b:[2,4],d:[2,4]},33:{d:[1,a,58]},34:{c:[2,10],f:[2,10],b:[2,10]},35:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,60]},36:{aa:[1,a,67],
ac:[1,a,68]},37:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},38:{j:[1,a,70]},39:{j:[2,46],k:[2,46],l:[2,46],m:[2,46],n:[2,46],o:[2,46],p:[2,46],q:[2,46],r:[2,46],s:[2,46],t:[2,46],u:[2,46],v:[2,46],w:[2,46],h:[2,46],g:[2,46],af:[2,46]},40:{h:[2,41],k:[2,41],l:[2,41],m:[2,41],n:[2,41],o:[2,41],p:[2,41],q:[2,41],r:[2,41],s:[2,41],t:[2,41],u:[2,41],v:[2,41],w:[2,41],j:[2,41],g:[2,41],af:[2,41]},41:{h:[2,40],k:[2,40],l:[2,40],m:[2,40],n:[2,40],o:[2,40],p:[2,40],q:[2,
40],r:[2,40],s:[2,40],t:[2,40],u:[2,40],v:[2,40],w:[2,40],j:[2,40],g:[2,40],af:[2,40]},42:{a:[2,12],e:[2,12],c:[2,12],f:[2,12],b:[2,12],d:[2,12]},43:{a:[2,13],e:[2,13],c:[2,13],f:[2,13],b:[2,13],d:[2,13]},44:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},45:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},46:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},47:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],
z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},48:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},49:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},50:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},51:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},52:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},53:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,
a,18],aa:[1,a,19],ac:[1,a,9]},54:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},55:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},56:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},57:{a:[2,1],d:[2,1],b:[1,a,1],c:[1,a,2],f:[1,a,3]},58:{ac:[1,a,9]},59:{a:[2,5],e:[2,5],c:[2,5],f:[2,5],b:[2,5],d:[2,5]},60:{h:[2,56],g:[2,56],k:[2,56],l:[2,56],m:[2,56],n:[2,56],o:[2,56],p:[2,56],q:[2,56],r:[2,56],s:[2,56],
t:[2,56],u:[2,56],v:[2,56],w:[2,56],ad:[2,56],ae:[2,56],ab:[1,a,85]},61:{h:[2,15],g:[1,a,86]},62:{h:[2,18],g:[2,18]},63:{h:[2,19],g:[2,19]},64:{h:[2,16]},65:{h:[2,48],g:[1,a,87]},66:{h:[2,50],g:[2,50]},67:{h:[2,55],g:[2,55],ad:[2,55],ae:[2,55],k:[2,55],l:[2,55],m:[2,55],n:[2,55],o:[2,55],p:[2,55],q:[2,55],r:[2,55],s:[2,55],t:[2,55],u:[2,55],v:[2,55],w:[2,55],j:[2,55],af:[2,55]},68:{h:[2,53],g:[2,53],ad:[2,53],ae:[2,53],k:[2,53],l:[2,53],m:[2,53],n:[2,53],o:[2,53],p:[2,53],q:[2,53],r:[2,53],s:[2,53],
t:[2,53],u:[2,53],v:[2,53],w:[2,53],j:[2,53],af:[2,53]},69:{af:[1,a,88]},70:{h:[2,47],k:[2,47],l:[2,47],m:[2,47],n:[2,47],o:[2,47],p:[2,47],q:[2,47],r:[2,47],s:[2,47],t:[2,47],u:[2,47],v:[2,47],w:[2,47],j:[2,47],g:[2,47],af:[2,47]},71:{h:[2,22],k:[2,22],j:[2,22],g:[2,22],af:[2,22],l:[1,a,45]},72:{h:[2,24],k:[2,24],l:[2,24],j:[2,24],g:[2,24],af:[2,24],m:[1,a,46],n:[1,a,47]},73:{h:[2,26],k:[2,26],l:[2,26],m:[2,26],n:[2,26],j:[2,26],g:[2,26],af:[2,26],o:[1,a,48],p:[1,a,49],q:[1,a,50],r:[1,a,51]},74:{h:[2,
27],k:[2,27],l:[2,27],m:[2,27],n:[2,27],j:[2,27],g:[2,27],af:[2,27],o:[1,a,48],p:[1,a,49],q:[1,a,50],r:[1,a,51]},75:{h:[2,32],k:[2,32],l:[2,32],m:[2,32],n:[2,32],o:[2,32],p:[2,32],q:[2,32],r:[2,32],j:[2,32],g:[2,32],af:[2,32],s:[1,a,52],t:[1,a,53]},76:{h:[2,31],k:[2,31],l:[2,31],m:[2,31],n:[2,31],o:[2,31],p:[2,31],q:[2,31],r:[2,31],j:[2,31],g:[2,31],af:[2,31],s:[1,a,52],t:[1,a,53]},77:{h:[2,30],k:[2,30],l:[2,30],m:[2,30],n:[2,30],o:[2,30],p:[2,30],q:[2,30],r:[2,30],j:[2,30],g:[2,30],af:[2,30],s:[1,
a,52],t:[1,a,53]},78:{h:[2,29],k:[2,29],l:[2,29],m:[2,29],n:[2,29],o:[2,29],p:[2,29],q:[2,29],r:[2,29],j:[2,29],g:[2,29],af:[2,29],s:[1,a,52],t:[1,a,53]},79:{h:[2,34],k:[2,34],l:[2,34],m:[2,34],n:[2,34],o:[2,34],p:[2,34],q:[2,34],r:[2,34],s:[2,34],t:[2,34],j:[2,34],g:[2,34],af:[2,34],u:[1,a,54],v:[1,a,55],w:[1,a,56]},80:{h:[2,35],k:[2,35],l:[2,35],m:[2,35],n:[2,35],o:[2,35],p:[2,35],q:[2,35],r:[2,35],s:[2,35],t:[2,35],j:[2,35],g:[2,35],af:[2,35],u:[1,a,54],v:[1,a,55],w:[1,a,56]},81:{h:[2,37],k:[2,
37],l:[2,37],m:[2,37],n:[2,37],o:[2,37],p:[2,37],q:[2,37],r:[2,37],s:[2,37],t:[2,37],u:[2,37],v:[2,37],w:[2,37],j:[2,37],g:[2,37],af:[2,37]},82:{h:[2,38],k:[2,38],l:[2,38],m:[2,38],n:[2,38],o:[2,38],p:[2,38],q:[2,38],r:[2,38],s:[2,38],t:[2,38],u:[2,38],v:[2,38],w:[2,38],j:[2,38],g:[2,38],af:[2,38]},83:{h:[2,39],k:[2,39],l:[2,39],m:[2,39],n:[2,39],o:[2,39],p:[2,39],q:[2,39],r:[2,39],s:[2,39],t:[2,39],u:[2,39],v:[2,39],w:[2,39],j:[2,39],g:[2,39],af:[2,39]},84:{h:[1,a,89]},85:{i:[1,a,14],t:[1,a,15],
x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,9]},86:{i:[1,a,14],t:[1,a,15],x:[1,a,16],y:[1,a,17],z:[1,a,18],aa:[1,a,19],ac:[1,a,60]},87:{ac:[1,a,93]},88:{h:[2,54],g:[2,54],ad:[2,54],ae:[2,54],k:[2,54],l:[2,54],m:[2,54],n:[2,54],o:[2,54],p:[2,54],q:[2,54],r:[2,54],s:[2,54],t:[2,54],u:[2,54],v:[2,54],w:[2,54],j:[2,54],af:[2,54]},89:{a:[2,11],e:[2,11],c:[2,11],f:[2,11],b:[2,11],d:[2,11]},90:{h:[2,51],g:[2,51]},91:{h:[2,17],g:[2,17]},92:{h:[2,14]},93:{ab:[1,a,85]},94:{h:[2,49],g:[2,49]}}};c.parse=
function(c){var e=this.lexer,b,g,o=this.table,n=o.gotos,o=o.action,l=this.productions,p=[null],k=[0];for(e.resetInput(c);;){c=k[k.length-1];b||(b=e.lex());if(!b)return!1;g=o[c]&&o[c][b];if(!g){b=[];if(o[c])for(var q in o[c])b.push(this.lexer.mapReverseSymbol(q));e.showDebugInfo();b.join(", ");return!1}switch(g[0]){case 1:k.push(b);p.push(e.text);k.push(g[2]);b=null;break;case 2:var h=l[g[1]],c=h.symbol||h[0];g=h.action||h[2];var f=(h.rhs||h[1]).length,j=0,r,h=p[p.length-f];r=a;for(this.$$=h;j<f;j++)this["$"+
(f-j)]=p[p.length-1-j];g&&(r=g.call(this));h=r!==a?r:this.$$;f&&(k=k.slice(0,-2*f),p=p.slice(0,-1*f));k.push(c);p.push(h);k.push(n[k[k.length-2]][k[k.length-1]]);break;case 0:return h}}return a};return c});
KISSY.add("xtemplate/compiler/ast",[],function(l){var a={ProgramNode:function(a,b,e){this.lineNumber=a;this.statements=b;this.inverse=e}};a.ProgramNode.prototype.type="program";a.BlockNode=function(a,b,e,g){l.equals(b.path.parts,g.parts);this.lineNumber=a;this.tpl=b;this.program=e};a.BlockNode.prototype.type="block";a.TplNode=function(a,b,e,g){this.lineNumber=a;this.path=b;this.params=e;this.hash=g;this.escaped=!0;this.isInverted=!1};a.TplNode.prototype.type="tpl";a.TplExpressionNode=function(a,b){this.lineNumber=
a;this.expression=b;this.escaped=!0};a.TplExpressionNode.prototype.type="tplExpression";a.ContentNode=function(a,b){this.lineNumber=a;this.value=b};a.ContentNode.prototype.type="content";a.UnaryExpression=function(a,b){this.value=b;this.unaryType=a};a.UnaryExpression.prototype.type="unaryExpression";a.MultiplicativeExpression=function(a,b,e){this.op1=a;this.opType=b;this.op2=e};a.MultiplicativeExpression.prototype.type="multiplicativeExpression";a.AdditiveExpression=function(a,b,e){this.op1=a;this.opType=
b;this.op2=e};a.AdditiveExpression.prototype.type="additiveExpression";a.RelationalExpression=function(a,b,e){this.op1=a;this.opType=b;this.op2=e};a.RelationalExpression.prototype.type="relationalExpression";a.EqualityExpression=function(a,b,e){this.op1=a;this.opType=b;this.op2=e};a.EqualityExpression.prototype.type="equalityExpression";a.ConditionalAndExpression=function(a,b){this.op1=a;this.op2=b};a.ConditionalAndExpression.prototype.type="conditionalAndExpression";a.ConditionalOrExpression=function(a,
b){this.op1=a;this.op2=b};a.ConditionalOrExpression.prototype.type="conditionalOrExpression";a.StringNode=function(a,b){this.lineNumber=a;this.value=b};a.StringNode.prototype.type="string";a.NumberNode=function(a,b){this.lineNumber=a;this.value=b};a.NumberNode.prototype.type="number";a.BooleanNode=function(a,b){this.lineNumber=a;this.value=b};a.BooleanNode.prototype.type="boolean";a.HashNode=function(a,b){var e={};this.lineNumber=a;l.each(b,function(a){e[a[0]]=a[1]});this.value=e};a.HashNode.prototype.type=
"hash";a.IdNode=function(a,b){var e=[],g=0;this.lineNumber=a;l.each(b,function(a){".."===a?g++:e.push(a)});this.parts=e;this.string=e.join(".");this.depth=g};a.IdNode.prototype.type="id";return a});
KISSY.add("xtemplate/compiler",["xtemplate/runtime","./compiler/parser","./compiler/ast"],function(l,a){function c(a,h){a=h?b(a,!1):a.replace(/\\/g,"\\\\").replace(/'/g,"\\'");return a=a.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function b(a,h){return a.replace(h?i:m,function(a){a.length%2&&(a="\\"+a);return a})}function e(a,h){o.apply(a,h)}function g(a){return a[a.length-1]}var s=a("xtemplate/runtime"),d=a("./compiler/parser");d.yy=a("./compiler/ast");var i=/\\*"/g,m=/\\*'/g,
o=[].push,n=0,t=0,p={genFunction:function(a,h){var f=[];h||f.push("function(scope) {");f.push('var buffer = ""'+(h?",":";"));if(h){f.push("config = this.config,engine = this,moduleWrap, utils = config.utils;");f.push('if (typeof module !== "undefined" && module.kissy) {moduleWrap = module;}');var j="",b,c=s.utils;for(b in c)j+=b+"Util = utils."+b+",";j&&f.push("var "+j.slice(0,j.length-1)+";")}if(a){j=0;for(b=a.length;j<b;j++)e(f,this[a[j].type](a[j]))}f.push("return buffer;");return!h?(f.push("}"),
f):{params:["scope","S","undefined"],source:f}},genIdOrInlineCommand:function(a,h){var f=[],j=a.depth,b,c=a.parts,d="id"+n++;if(0===j){var g=h&&this.genConfig(h);g&&(b=g[0],e(f,g[1]))}c=this.getIdStringFromIdParts(f,c);j||l.startsWith(c,"this.")?f.push("var "+d+' = getPropertyUtil(engine,scope,"'+c+'",'+j+","+a.lineNumber+");"):b?("include"===c&&f.push('if(moduleWrap) {require("'+h.params[0].value+'");'+b+".params[0] = moduleWrap.resolveByName("+b+".params[0]);}"),f.push("var "+d+" = runInlineCommandUtil(engine,scope,"+
b+',"'+c+'",'+a.lineNumber+");")):f.push("var "+d+" = getPropertyOrRunCommandUtil(engine,scope,"+(b||"{}")+',"'+c+'",'+j+","+a.lineNumber+");");return[d,f]},genOpExpression:function(a,h){var f=[],b,c,d=this[a.op1.type](a.op1),i=this[a.op2.type](a.op2);b=d[0];c=i[0];if(b&&c)return e(f,d[1]),e(f,i[1]),f.push(b+h+c),["",f];if(!b&&!c)return e(f,d[1].slice(0,-1)),e(f,i[1].slice(0,-1)),f.push("("+g(d[1])+")"+h+"("+g(i[1])+")"),["",f];if(b&&!c)return e(f,d[1]),e(f,i[1].slice(0,-1)),f.push(b+h+"("+g(i[1])+
")"),["",f];if(!b&&c)return e(f,d[1].slice(0,-1)),e(f,i[1]),f.push("("+g(d[1])+")"+h+c),["",f]},genConfig:function(a){var h=[],b,c,d=this;if(a){c=a.params;a=a.hash;if(c||a)b="config"+n++,h.push("var "+b+" = {};");if(c){var i="params"+n++;h.push("var "+i+" = [];");l.each(c,function(a){a=d[a.type](a);a[0]?(e(h,a[1]),h.push(i+".push("+a[0]+");")):(e(h,a[1].slice(0,-1)),h.push(i+".push("+g(a[1])+");"))});h.push(b+".params="+i+";")}if(a){var k="hash"+n++;h.push("var "+k+" = {};");l.each(a.value,function(a,
b){var q=d[a.type](a);q[0]?(e(h,q[1]),h.push(k+'["'+b+'"] = '+q[0]+";")):(e(h,q[1].slice(0,-1)),h.push(k+'["'+b+'"] = '+g(q[1])+";"))});h.push(b+".hash="+k+";")}}return[b,h]},conditionalOrExpression:function(a){return this.genOpExpression(a,"||")},conditionalAndExpression:function(a){return this.genOpExpression(a,"&&")},relationalExpression:function(a){return this.genOpExpression(a,a.opType)},equalityExpression:function(a){return this.genOpExpression(a,a.opType)},additiveExpression:function(a){return this.genOpExpression(a,
a.opType)},multiplicativeExpression:function(a){return this.genOpExpression(a,a.opType)},unaryExpression:function(a){var b=[],f,c=a.unaryType,a=this[a.value.type](a.value);o.apply(b,a[1]);(f=a[0])?b.push(f+"="+c+f+";"):b[b.length-1]=""+c+g(b);return[f,b]},string:function(a){return["",["'"+c(a.value,!0)+"'"]]},number:function(a){return["",[a.value]]},"boolean":function(a){return["",[a.value]]},id:function(a){var b=[],f=a.depth,c=a.parts,e="id"+n++,c=this.getIdStringFromIdParts(b,c);b.push("var "+e+
' = getPropertyUtil(engine,scope,"'+c+'",'+f+","+a.lineNumber+");");return[e,b]},block:function(a){var b=a.program,c=[],j=a.tpl,d=this.genConfig(j),a=d[0],g=j.path,i=g.string;e(c,d[1]);a||(a=l.guid("config"),c.push("var "+a+" = {};"));c.push(a+".fn="+this.genFunction(b.statements).join("\n")+";");b.inverse&&(b=this.genFunction(b.inverse).join("\n"),c.push(a+".inverse="+b+";"));j.isInverted&&(b="inverse"+n++,c.push("var "+b+"="+a+".fn;"),c.push(a+".fn = "+a+".inverse;"),c.push(a+".inverse = "+b+";"));
if(!j.hash&&!j.params){j=g.parts;for(b=0;b<j.length;b++)if("string"!==typeof j[b]){i=this.getIdStringFromIdParts(c,j);break}}c.push("buffer += runBlockCommandUtil(engine, scope, "+a+', "'+i+'", '+g.lineNumber+");");return c},content:function(a){return["buffer += '"+c(a.value,!1)+"';"]},tpl:function(a){var b=[],c=this.genIdOrInlineCommand(a.path,a);e(b,c[1]);b.push("buffer += renderOutputUtil("+c[0]+","+a.escaped+");");return b},tplExpression:function(a){var b=[],c=a.escaped,d;d=a.expression;a=a.expression.type;
d="id"===a?this.genIdOrInlineCommand(d):this[a](d);d[0]?(e(b,d[1]),d=d[0]):(e(b,d[1].slice(0,-1)),d=g(d[1]));b.push("buffer += renderOutputUtil("+d+","+c+");");return b},getIdStringFromIdParts:function(a,b){var c="",d,g,i,k=!0;for(d=0;d<b.length;d++)g=b[d],i=g.type,k||(c+="."),i?(g=this[i](g),g[0]&&(e(a,g[1]),c+='"+'+g[0]+'+"',k=!0)):(c+=g,k=!1);return c}},k;return k={parse:function(a){return d.parse(a)},compileToStr:function(a){a=this.compile(a);return"function("+a.params.join(",")+"){\n"+a.source.join("\n")+
"}"},compile:function(a){a=this.parse(a);n=0;return p.genFunction(a.statements,!0)},compileToFn:function(a,b){var c=k.compile(a),b=b||{},d="sourceURL="+(b.name?b.name:"xtemplate"+t++)+".js";return Function.apply(null,[].concat(c.params).concat(c.source.join("\n")+"\n//@ "+d+"\n//# "+d))}}});
