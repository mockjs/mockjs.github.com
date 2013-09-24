/*! mockjs 24-09-2013 */
(function(a){var b={version:"0.1.1",_mocked:{}},c=function(){var b={};return b.extend=function(){var c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length;for(1===i&&(g=this,h=0);i>h;h++)if(c=arguments[h])for(d in c)e=g[d],f=c[d],g!==f&&f!==a&&(b.isArray(f)||b.isObject(f)?(b.isArray(f)&&(clone=e&&b.isArray(e)?e:[]),b.isObject(f)&&(clone=e&&b.isObject(e)?e:{}),g[d]=b.extend(clone,f)):g[d]=f);return g},b.each=function(a,b,c){var d,e;if("number"===this.type(a))for(d=0;a>d;d++)b(d,d);else if(a.length===+a.length)for(d=0;d<a.length&&b.call(c,a[d],d,a)!==!1;d++);else for(e in a)if(b.call(c,a[e],e,a)===!1)break},b.type=function(b){return null===b||b===a?String(b):Object.prototype.toString.call(b).match(/\[object (\w+)\]/)[1].toLowerCase()},b.each("String Object Array".split(" "),function(a){b["is"+a]=function(c){return b.type(c)===a.toLowerCase()}}),b.isObjectOrArray=function(a){return b.isObject(a)||b.isArray(a)},b.isNumeric=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},b.heredoc=function(a){return a.toString().replace(/^[^\/]+\/\*!?/,"").replace(/\*\/[^\/]+$/,"").replace(/^[\s\xA0]+/,"").replace(/[\s\xA0]+$/,"")},b.noop=function(){},b}(),d=function(){var b={extend:c.extend};return b.extend({"boolean":function(b,c,d){return d!==a?(b="undefined"==typeof b||isNaN(b)?1:parseInt(b,10),c="undefined"==typeof c||isNaN(c)?1:parseInt(c,10),Math.random()>1/(b+c)*b?!d:d):Math.random()>=.5},bool:function(a,b,c){return this.boolean(a,b,c)},natural:function(a,b){return a="undefined"!=typeof a?parseInt(a,10):0,b="undefined"!=typeof b?parseInt(b,10):9007199254740992,Math.round(Math.random()*(b-a))+a},integer:function(a,b){return a="undefined"!=typeof a?parseInt(a,10):-9007199254740992,b="undefined"!=typeof b?parseInt(b,10):9007199254740992,Math.round(Math.random()*(b-a))+a},"int":function(a,b){return this.integer(a,b)},"float":function(b,c,d,e){d=d===a?0:d,d=Math.max(Math.min(d,17),0),e=e===a?17:e,e=Math.max(Math.min(e,17),0);for(var f=this.integer(b,c)+".",g=0,h=this.natural(d,e);h>g;g++)f+=this.character("number");return parseFloat(f,10)},character:function(a){var c={lower:"abcdefghijklmnopqrstuvwxyz",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",number:"0123456789",symbol:"!@#$%^&*()[]"};return c.alpha=c.lower+c.upper,c.undefined=c.lower+c.upper+c.number+c.symbol,a=c[(""+a).toLowerCase()]||a,a.charAt(b.natural(0,a.length-1))},"char":function(a){return this.character(a)},string:function(c,d,e){var f;3===arguments.length&&(f=b.natural(d,e)),2===arguments.length&&("string"==typeof arguments[0]?f=d:(f=b.natural(c,d),c=a)),1===arguments.length&&(f=c,c=a),0===arguments.length&&(f=b.natural(3,7));for(var g="",h=0;f>h;h++)g+=b.character(c);return g},str:function(a,b,c){return this.string(a,b,c)},range:function(a,b,c){arguments.length<=1&&(b=a||0,a=0),c=arguments[2]||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=0,f=new Array(d);d>e;)f[e++]=a,a+=c;return f}}),b.extend({patternLetters:{yyyy:"getFullYear",yy:function(a){return(""+a.getFullYear()).slice(2)},y:"yy",MM:function(a){var b=a.getMonth()+1;return 10>b?"0"+b:b},M:function(a){return a.getMonth()+1},dd:function(a){var b=a.getDate();return 10>b?"0"+b:b},d:"getDate",HH:function(a){var b=a.getHours();return 10>b?"0"+b:b},H:"getHours",hh:function(a){var b=a.getHours()%12;return 10>b?"0"+b:b},h:function(a){return a.getHours()%12},mm:function(a){var b=a.getMinutes();return 10>b?"0"+b:b},m:"getMinutes",ss:function(a){var b=a.getSeconds();return 10>b?"0"+b:b},s:"getSeconds",SS:function(a){var b=a.getMilliseconds();return 10>b&&"00"+b||100>b&&"0"+b||b},S:"getMilliseconds",A:function(a){return a.getHours()<12?"AM":"PM"},a:function(a){return a.getHours()<12?"am":"pm"}}}),b.extend({rformat:new RegExp(function(){var a=[];for(var c in b.patternLetters)a.push(c);return"("+a.join("|")+")"}(),"g"),format:function(a,c){var d=b.patternLetters,e=b.rformat;return c.replace(e,function(b,c){return"function"==typeof d[c]?d[c](a):d[c]in d?arguments.callee(b,d[c]):a[d[c]]()})},randomDate:function(b,c){return b=b===a?new Date(0):b,c=c===a?new Date:c,new Date(Math.random()*(c.getTime()-b.getTime()))},date:function(a){return a=a||"yyyy-MM-dd",this.format(this.randomDate(),a)},time:function(a){return a=a||"HH:mm:ss",this.format(this.randomDate(),a)},datetime:function(a){return a=a||"yyyy-MM-dd HH:mm:ss",this.format(this.randomDate(),a)}}),b.extend({ad_size:["300x250","250x250","240x400","336x280","180x150","720x300","468x60","234x60","88x31","120x90","120x60","120x240","125x125","728x90","160x600","120x600","300x600"],screen_size:["320x200","320x240","640x480","800x480","800x480","1024x600","1024x768","1280x800","1440x900","1920x1200","2560x1600"],video_size:["720x480","768x576","1280x720","1920x1080"],image:function(b,c,d,e,f){return 4===arguments.length&&(f=e,e=a),3===arguments.length&&(f=d,d=a),b||(b=this.pick(this.ad_size)),c&&~c.indexOf("#")&&(c=c.slice(1)),d&&~d.indexOf("#")&&(d=d.slice(1)),"http://dummyimage.com/"+b+(c?"/"+c:"")+(d?"/"+d:"")+(e?"."+e:"")+(f?"&text="+f:"")},img:function(){return this.image.apply(this,arguments)}}),b.extend({brandColors:{"4ormat":"#fb0a2a","500px":"#02adea","About.me (blue)":"#00405d","About.me (yellow)":"#ffcc33",Addvocate:"#ff6138",Adobe:"#ff0000",Aim:"#fcd20b",Amazon:"#e47911",Android:"#a4c639","Angie's List":"#7fbb00",AOL:"#0060a3",Atlassian:"#003366",Behance:"#053eff","Big Cartel":"#97b538",bitly:"#ee6123",Blogger:"#fc4f08",Boeing:"#0039a6","Booking.com":"#003580",Carbonmade:"#613854",Cheddar:"#ff7243","Code School":"#3d4944",Delicious:"#205cc0",Dell:"#3287c1",Designmoo:"#e54a4f",Deviantart:"#4e6252","Designer News":"#2d72da",Devour:"#fd0001",DEWALT:"#febd17","Disqus (blue)":"#59a3fc","Disqus (orange)":"#db7132",Dribbble:"#ea4c89",Dropbox:"#3d9ae8",Drupal:"#0c76ab",Dunked:"#2a323a",eBay:"#89c507",Ember:"#f05e1b",Engadget:"#00bdf6",Envato:"#528036",Etsy:"#eb6d20",Evernote:"#5ba525","Fab.com":"#dd0017",Facebook:"#3b5998",Firefox:"#e66000","Flickr (blue)":"#0063dc","Flickr (pink)":"#ff0084",Forrst:"#5b9a68",Foursquare:"#25a0ca",Garmin:"#007cc3",GetGlue:"#2d75a2",Gimmebar:"#f70078",GitHub:"#171515","Google Blue":"#0140ca","Google Green":"#16a61e","Google Red":"#dd1812","Google Yellow":"#fcca03","Google+":"#dd4b39",Grooveshark:"#f77f00",Groupon:"#82b548","Hacker News":"#ff6600",HelloWallet:"#0085ca","Heroku (light)":"#c7c5e6","Heroku (dark)":"#6567a5",HootSuite:"#003366",Houzz:"#73ba37",HTML5:"#ec6231",IKEA:"#ffcc33",IMDb:"#f3ce13",Instagram:"#3f729b",Intel:"#0071c5",Intuit:"#365ebf",Kickstarter:"#76cc1e",kippt:"#e03500",Kodery:"#00af81",LastFM:"#c3000d",LinkedIn:"#0e76a8",Livestream:"#cf0005",Lumo:"#576396",Mixpanel:"#a086d3",Meetup:"#e51937",Nokia:"#183693",NVIDIA:"#76b900",Opera:"#cc0f16",Path:"#e41f11","PayPal (dark)":"#1e477a","PayPal (light)":"#3b7bbf",Pinboard:"#0000e6",Pinterest:"#c8232c",PlayStation:"#665cbe",Pocket:"#ee4056",Prezi:"#318bff",Pusha:"#0f71b4",Quora:"#a82400","QUOTE.fm":"#66ceff",Rdio:"#008fd5",Readability:"#9c0000","Red Hat":"#cc0000",Resource:"#7eb400",Rockpack:"#0ba6ab",Roon:"#62b0d9",RSS:"#ee802f",Salesforce:"#1798c1",Samsung:"#0c4da2",Shopify:"#96bf48",Skype:"#00aff0",Snagajob:"#f47a20",Softonic:"#008ace",SoundCloud:"#ff7700","Space Box":"#f86960",Spotify:"#81b71a",Sprint:"#fee100",Squarespace:"#121212",StackOverflow:"#ef8236",Staples:"#cc0000","Status Chart":"#d7584f",Stripe:"#008cdd",StudyBlue:"#00afe1",StumbleUpon:"#f74425","T-Mobile":"#ea0a8e",Technorati:"#40a800","The Next Web":"#ef4423",Treehouse:"#5cb868",Trulia:"#5eab1f",Tumblr:"#34526f","Twitch.tv":"#6441a5",Twitter:"#00acee",TYPO3:"#ff8700",Ubuntu:"#dd4814",Ustream:"#3388ff",Verizon:"#ef1d1d",Vimeo:"#86c9ef",Vine:"#00a478",Virb:"#06afd8","Virgin Media":"#cc0000",Wooga:"#5b009c","WordPress (blue)":"#21759b","WordPress (orange)":"#d54e21","WordPress (grey)":"#464646",Wunderlist:"#2b88d9",XBOX:"#9bc848",XING:"#126567","Yahoo!":"#720e9e",Yandex:"#ffcc00",Yelp:"#c41200",YouTube:"#c4302b",Zalongo:"#5498dc",Zendesk:"#78a300",Zerply:"#9dcc7a",Zootool:"#5e8b1d"},brands:function(){var a=[];for(var b in this.brandColors)a.push(b);return a},dataImageHolder:function(a){return"holder.js/"+a},dataImage:function(b,c){var d="undefined"!=typeof document&&document.createElement("canvas"),e=d&&d.getContext&&d.getContext("2d");if(!d||!e)return"";b||(b=this.pick(this.ad_size)),c=c!==a?c:b,b=b.split("x");var f=parseInt(b[0],10),g=parseInt(b[1],10),h=this.brandColors[this.pick(this.brands())],i="#FFF",j=14,k="sans-serif";return d.width=f,d.height=g,e.textAlign="center",e.textBaseline="middle",e.fillStyle=h,e.fillRect(0,0,f,g),e.fillStyle=i,e.font="bold "+j+"px "+k,e.fillText(c,f/2,g/2,f),d.toDataURL("image/png")}}),b.extend({color:function(){var a=Math.floor(16777215*Math.random()).toString(16);return a="#"+("000000"+a).slice(-6)}}),b.extend({capitalize:function(a){return a.charAt(0).toUpperCase()+a.substr(1)},upper:function(a){return a.toUpperCase()},lower:function(a){return a.toLowerCase()},pick:function(a){return a[this.natural(0,a.length-1)]},shuffle:function(a){for(var b=a.slice(0),c=[],d=0,e=b.length,f=0;e>f;f++)d=this.natural(0,b.length-1),c.push(b[d]),b.splice(d,1);return c}}),b.extend({paragraph:function(a,c){var d;0===arguments.length&&(d=b.natural(3,7)),1===arguments.length&&(d=c=a),2===arguments.length&&(a=parseInt(a,10),c=parseInt(c,10),d=b.natural(a,c));for(var e=[],f=0;d>f;f++)e.push(b.sentence());return e.join(" ")},sentence:function(a,c){var d;0===arguments.length&&(d=b.natural(12,18)),1===arguments.length&&(d=c=a),2===arguments.length&&(a=parseInt(a,10),c=parseInt(c,10),d=b.natural(a,c));for(var e=[],f=0;d>f;f++)e.push(b.word());return b.capitalize(e.join(" "))+"."},word:function(a,c){var d;0===arguments.length&&(d=b.natural(3,10)),1===arguments.length&&(d=c=a),2===arguments.length&&(a=parseInt(a,10),c=parseInt(c,10),d=b.natural(a,c));for(var e="",f=0;d>f;f++)e+=b.character("lower");return e},title:function(a,c){var d,e=[];0===arguments.length&&(d=b.natural(3,7)),1===arguments.length&&(d=c=a),2===arguments.length&&(a=parseInt(a,10),c=parseInt(c,10),d=b.natural(a,c));for(var f=0;d>f;f++)e.push(this.capitalize(this.word()));return e.join(" ")}}),b.extend({first:function(){var a=["James","John","Robert","Michael","William","David","Richard","Charles","Joseph","Thomas","Christopher","Daniel","Paul","Mark","Donald","George","Kenneth","Steven","Edward","Brian","Ronald","Anthony","Kevin","Jason","Matthew","Gary","Timothy","Jose","Larry","Jeffrey","Frank","Scott","Eric"].concat(["Mary","Patricia","Linda","Barbara","Elizabeth","Jennifer","Maria","Susan","Margaret","Dorothy","Lisa","Nancy","Karen","Betty","Helen","Sandra","Donna","Carol","Ruth","Sharon","Michelle","Laura","Sarah","Kimberly","Deborah","Jessica","Shirley","Cynthia","Angela","Melissa","Brenda","Amy","Anna"]);return this.pick(a)},last:function(){var a=["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young","Allen"];return this.pick(a)},name:function(a){return this.first()+" "+(a?this.first()+" ":"")+this.last()}}),b.extend({url:function(){return"http://"+this.domain()+"/"+this.word()},domain:function(a){return this.word()+"."+(a||this.tld())},email:function(a){return this.character("lower")+"."+this.last().toLowerCase()+"@"+this.last().toLowerCase()+"."+this.tld()},ip:function(){return this.natural(0,255)+"."+this.natural(0,255)+"."+this.natural(0,255)+"."+this.natural(0,255)},tlds:["com","org","edu","gov","co.uk","net","io"],tld:function(){return this.pick(this.tlds)}}),b.extend({areas:["东北","华北","华东","华中","华南","西南","西北"],area:function(){return this.pick(this.areas)},regions:["110000 北京市","120000 天津市","130000 河北省","140000 山西省","150000 内蒙古自治区","210000 辽宁省","220000 吉林省","230000 黑龙江省","310000 上海市","320000 江苏省","330000 浙江省","340000 安徽省","350000 福建省","360000 江西省","370000 山东省","410000 河南省","420000 湖北省","430000 湖南省","440000 广东省","450000 广西壮族自治区","460000 海南省","500000 重庆市","510000 四川省","520000 贵州省","530000 云南省","540000 西藏自治区","610000 陕西省","620000 甘肃省","630000 青海省","640000 宁夏回族自治区","650000 新疆维吾尔自治区","650000 新疆维吾尔自治区","710000 台湾省","810000 香港特别行政区","820000 澳门特别行政区"],region:function(){return this.pick(this.regions).split(" ")[1]},address:function(){},city:function(){},phone:function(){},areacode:function(){},street:function(){},street_suffixes:function(){},street_suffix:function(){},states:function(){},state:function(){},zip:function(a){for(var b="",c=0;(a||6)>c;c++)b+=this.natural(0,9);return b}}),b.extend({todo:function(){return"todo"}}),b.extend({d4:function(){return this.natural(1,4)},d6:function(){return this.natural(1,6)},d8:function(){return this.natural(1,8)},d12:function(){return this.natural(1,12)},d20:function(){return this.natural(1,20)},d100:function(){return this.natural(1,100)},guid:function(){var a="ABCDEF1234567890",b=this.string(a,8)+"-"+this.string(a,4)+"-"+this.string(a,4)+"-"+this.string(a,4)+"-"+this.string(a,12);return b},id:function(){var a,b=0,c=["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],d=["1","0","X","9","8","7","6","5","4","3","2"];a=this.pick(this.regions).split(" ")[0]+this.date("yyyyMMdd")+this.string("number",3);for(var e=0;e<a.length;e++)b+=a[e]*c[e];return a+=d[b%11]}}),b}(),e=/(.+)\|(?:\+(\d+)|(\d+-?\d*)?(?:\.(\d+-?\d*))?)/,f=/(\d+)-?(\d+)?/,g=/\\*@([^@#%&()\?\s\/\.]+)(?:\((.+?)\))?/g;b.extend=c.extend,b.mock=function(a,c){return 1===arguments.length?h.gen(a):(b._mocked[a]={rurl:a,template:c},b)};var h={extend:c.extend};h.gen=function(a,b,g){var i,j=(b=b||"").match(e),k=j&&j[3]&&j[3].match(f),l=k&&parseInt(k[1],10),m=k&&parseInt(k[2],10),n=k?!k[2]&&parseInt(k[1],10)||d.integer(l,m):1,o=j&&j[4]&&j[4].match(f),p=o&&parseInt(o[1],10),q=o&&parseInt(o[2],10),r=o?!o[2]&&parseInt(o[1],10)||d.integer(p,q):0,s=j&&j[4],t=c.type(a);return h[t]?i=h[t]({type:t,template:a,name:b,obj:g,parameters:j,range:k,min:l,max:m,count:n,decimal:o,dmin:p,dmax:q,dcount:r,point:s}):a},h.extend({array:function(a){var b,c,e=[];if(a.parameters)if(1===a.count&&a.template.length>1)e=d.pick(h.gen(a.template));else for(b=0;b<a.count;b++){c=0;do e.push(h.gen(a.template[c++]));while(c<a.template.length)}else for(b=0;b<a.template.length;b++)e.push(h.gen(a.template[b]));return e},object:function(a){var b,d,f={};for(b in a.template)f[b.replace(e,"$1")]=h.gen(a.template[b],b,f),d=b.match(e),d&&d[2]&&"number"===c.type(a.template[b])&&(a.template[b]+=parseInt(d[2],10));return f},number:function(a){var b,c,e;if(a.point){for(a.template+="",c=a.template.split("."),c[0]=a.range?a.count:c[0],c[1]=(c[1]||"").slice(0,a.dcount),e=0;c[1].length<a.dcount;e++)c[1]+=d.character("number");b=parseFloat(c.join("."),10)}else b=a.range&&!a.parameters[2]?a.count:a.template;return b},"boolean":function(a){var b;return b=a.parameters?d.bool(a.min,a.max,a.template):a.template},string:function(a){var b,e,f,i,j="";if(a.template.length){for(b=0;b<a.count;b++)j+=a.template;for(e=j.match(g)||[],b=0;b<e.length;b++)if(f=e[b],/^\\/.test(f))e.splice(b--,1);else{if(i=h.placeholder(f,a.obj),1===e.length&&f===j){if(c.isNumeric(i)){j=parseFloat(i,10);break}if(/^(true|false)$/.test(i)){j="true"===i?!0:"false"===i?!1:i;break}}j=j.replace(f,i)}}else j=a.range?d.string(a.count):a.template;return j}}),h.extend({_all:function(){var a={};for(var b in d)a[b.toLowerCase()]=b;return a},placeholder:function(b,e){g.exec("");var f=g.exec(b),i=f&&f[1],j=i&&i.toLowerCase(),k=this._all()[j],l=f&&f[2]?f[2].split(/,\s*/):[];if(e&&i in e)return e[i];if(!(i in d||j in d||k in d))return b;for(var m=0;m<l.length;m++)g.exec(""),g.test(l[m])&&(l[m]=h.placeholder(l[m],e));var n=d[i]||d[j]||d[k];switch(c.type(n)){case"array":return d.pick(n);case"function":var o=n.apply(d,l);return o===a&&(o=""),o}}}),b.mockjax=function(a){function c(){return{open:a.noop,send:a.noop,getAllResponseHeaders:a.noop,readyState:4,status:200}}function d(a){return function(){return b.mock(a.template)}}function e(e){for(var f in b._mocked){var g=b._mocked[f];if(("string"!==a.type(g.rurl)||g.rurl===e.url)&&("regexp"!==a.type(g.rurl)||g.rurl.test(e.url))){e.dataFilter=d(g),e.converters["text json"]=d(g),e.xhr=c;break}}}return a.ajaxPrefilter("*",e),a.ajaxPrefilter("json",e),a.ajaxPrefilter("jsonp",e),b},"undefined"!=typeof jQuery&&b.mockjax(jQuery),"undefined"!=typeof KISSY&&KISSY.add&&(b.mockjax=function(a){var c=a.io,d={readyState:4,responseText:"",responseXML:null,state:2,status:200,statusText:"success",timeoutTimer:null};a.io=function(e){for(var f in b._mocked){var g=b._mocked[f];if(("string"!==a.type(g.rurl)||g.rurl===e.url)&&("regexp"!==a.type(g.rurl)||g.rurl.test(e.url))){console.log("[mock]",e.url,">",g.rurl);var h=b.mock(g.template);return console.log("[mock]",h),e.success&&e.success(h,"success",d),e.complete&&e.complete(h,"success",d),a}}return c.apply(this,arguments)}}),b.Util=c,b.Random=d,b.heredoc=c.heredoc,"object"==typeof module&&module.exports?module.exports=b:"function"==typeof define&&define.amd?define(function(){return b}):"function"==typeof define&&define.cmd&&define(function(){return b}),this.Mock=b,this.Random=d,"undefined"!=typeof KISSY&&c.each(["mock","components/mock/index","mock/dist/mock"],function(a){KISSY.add(a,function(a){return b.mockjax(a),b},{requires:["ajax"]})}),function(a){var e={version:"0.0.1"};this.Mock||(module.exports=e),b.tpl=function(a,b,c,d){return e.mock(a,b,c,d)},b.parse=function(a){return Handlebars.parse(a)},e.mock=function(a,b,d,e){return d=d?c.extend({},d,Handlebars.helpers):Handlebars.helpers,e=e?c.extend({},e,Handlebars.partials):Handlebars.partials,f.gen(a,null,b,d,e)};var f={debug:e.debug||!1,extend:c.extend};f.gen=function(a,b,d,g,h){if(c.isString(a)){var i=Handlebars.parse(a);d=f.parseOptions(a,d);var j=f.gen(i,b,d,g,h);return j}if(b=b||[{}],d=d||{},this[a.type]!==c.noop){d.__path=d.__path||[],(e.debug||f.debug)&&(console.log(),console.group("["+a.type+"]",JSON.stringify(a)),console.log("[options]",d.__path.length,JSON.stringify(d)));var k=d.__path.length;return this[a.type](a,b,d,g,h),d.__path.splice(k),(e.debug||f.debug)&&console.groupEnd(),b[b.length-1]}},f.parseOptions=function(a,b){var d,e,f,g=/<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g,h=a.match(g),i={};for(d=0;h&&d<h.length;d++)g.lastIndex=0,e=g.exec(h[d]),e&&(f=new Function("return "+e[1]),f=f(),c.extend(i,f));return c.extend(i,b)},f.val=function(g,h,i,j){if(g!==h.__path[h.__path.length-1])throw new Error(g+"!=="+h.__path);if((e.debug||f.debug)&&console.log("[options]",g,h.__path),j!==a&&(j=b.mock(j)),h){var k=b.mock(h);if(c.isString(k))return k;if(g in k)return k[g]}return c.isArray(i[0])?{}:j!==a?j:g||d.word()},f.program=function(a,b,c,d,e){for(var f=0;f<a.statements.length;f++)this.gen(a.statements[f],b,c,d,e)},f.mustache=function(a,b,d,e,f){var g,h=b[0],i=b.length;if("array"===c.type(h)&&(h.push({}),h=h[h.length-1],b.unshift(h)),a.isHelper||e&&e[a.id.string]){if(0===a.params.length);else for(g=0;g<a.params.length;g++)this.gen(a.params[g],b,d,e,f);a.hash&&this.gen(a.hash,b,d,e,f)}else this.gen(a.id,b,d,e,f);b.length>i&&b.splice(0,b.length-i)},f.block=function(a,b,e,f,h){var i,j,k,l,m,n=a.mustache.id.parts,o=b[0],p=b.length;if(a.inverse,a.mustache.isHelper||f&&f[a.mustache.id.string])m=n[0],l=(g[m]||g.custom).apply(this,arguments),o=b[0];else for(i=0;i<n.length;i++)e.__path.push(n[i]),k=n[i],l=this.val(k,e,b,{}),o[k]=c.isArray(l)&&[]||l,m=c.type(o[k]),("object"===m||"array"===m)&&(o=o[k],b.unshift(o));if(a.program)if("array"===c.type(o))for(j=l.length||d.integer(3,7),i=0;j>i;i++)o.push("undefined"!=typeof l[i]?l[i]:{}),e.__path.push("[]"),b.unshift(o[o.length-1]),this.gen(a.program,b,e,f,h),e.__path.pop(),b.shift();else this.gen(a.program,b,e,f,h);b.length>p&&b.splice(0,b.length-p)},f.hash=function(a,b,c,d,e){var f,g,h,i=a.pairs;for(g=0;g<i.length;g++)for(f=i[g],h=1;h<f.length;h++)this.gen(f[h],b,c,d,e)},f.ID=function(a,b,d){var e,f,g,h,i,j,k,l,m,n=a.parts,o=b[a.depth],p=b.length;if(c.isArray(o)&&(o=b[a.depth+1]),n.length)for(e=0,f=n.length;f>e;e++)d.__path.push(n[e]),g=n[e],h=n[e-1],m=d[h],i=e===f-1?o[g]:{},j=this.val(g,d,b,i),k=c.type(o[g]),l=c.type(j),"undefined"===k?o[g]=f-1>e&&"object"!==l&&"array"!==l?{}:c.isArray(j)&&[]||j:f-1>e&&"object"!==k&&"array"!==k&&(o[g]=c.isArray(j)&&[]||{}),k=c.type(o[g]),("object"===k||"array"===k)&&(o=o[g],b.unshift(o));else;b.length>p&&b.splice(0,b.length-p)},f.partial=function(a,b,c,d,e){var g=a.partialName.name,h=e&&e[g],i=b.length;h&&f.gen(h,b,c,d,e),b.length>i&&b.splice(0,b.length-i)},f.content=c.noop,f.PARTIAL_NAME=c.noop,f.DATA=c.noop,f.STRING=c.noop,f.INTEGER=c.noop,f.BOOLEAN=c.noop,f.comment=c.noop;var g={};g.each=function(a,b,d){var e,f,g,h,i,j,k,l=b[0];for(i=a.mustache.params[0].parts,e=0,f=i.length;f>e;e++)d.__path.push(i[e]),g=i[e],j=e===f-1?[]:{},h=this.val(g,d,b,j),l[g]=c.isArray(h)&&[]||h,k=c.type(l[g]),("object"===k||"array"===k)&&(l=l[g],b.unshift(l));return h},g["if"]=g.unless=function(a,b,d){var e,f,g,h,i,j,k=a.mustache.params,l=b[0];for(e=0;e<k.length;e++)for(parts=k[e].parts,f=0;f<parts.length;f++)0===e&&d.__path.push(parts[f]),g=parts[f],i=f===parts.length-1?"@BOOL(2,1,true)":{},h=this.val(g,d,b,i),f===parts.length-1&&(h="true"===h?!0:"false"===h?!1:h),l[g]=c.isArray(h)?[]:h,j=c.type(l[g]),("object"===j||"array"===j)&&(l=l[g],b.unshift(l));return h},g["with"]=function(a,b,c){var d,e,f,g,h,i=b[0];for(g=a.mustache.params[0].parts,d=0;d<g.length;d++)c.__path.push(g[d]),e=g[d],h={},f=this.val(e,c,b,h),i=i[e]=f,b.unshift(i);return f},g.log=function(){},g.custom=function(a,b,d){var e,f,g,h,i,j,k,l=b[0];if(0!==a.mustache.params.length){for(i=a.mustache.params[0].parts,e=0,f=i.length;f>e;e++)d.__path.push(i[e]),g=i[e],j=e===f-1?[]:{},h=this.val(g,d,b,j),l[g]=c.isArray(h)&&[]||h,k=c.type(l[g]),("object"===k||"array"===k)&&(l=l[g],b.unshift(l));return h}}}.call(this),function(a){if("undefined"!=typeof KISSY){var e,f={debug:!1};KISSY.use("xtemplate",function(a,b){e=b}),this.Mock||(module.exports=f),b.xtpl=function(a,b,c,d){return f.mock(a,b,c,d)},b.xparse=function(a){return e.compiler.parse(a)},f.mock=function(a,b,d,f){return d=d?c.extend({},d,e.RunTime.commands):e.RunTime.commands,f=f?c.extend({},f,e.RunTime.subTpls):e.RunTime.subTpls,this.gen(a,null,b,d,f,{})},f.parse=function(a){return e.compiler.parse(a)},f.gen=function(a,b,d,e,g,h){if("string"==typeof a){f.debug&&console.log("[tpl    ]\n",a);var i=this.parse(a);d=this.parseOptions(a,d);var j=this.gen(i,b,d,e,g,h);return j}if(b=b||[{}],d=d||{},this[a.type]!==c.noop){d.__path=d.__path||[],f.debug&&(console.log(),console.group("["+a.type+"]",JSON.stringify(a)),console.log("[context]","[before]",b.length,JSON.stringify(b)),console.log("[options]","[before]",d.__path.length,JSON.stringify(d)),console.log("[other  ]","[before]",JSON.stringify(h)));var k=d.__path.length;return this[a.type](a,b,d,e,g,h),f.debug&&console.log("[__path ]","[after ]",d.__path),(!h.hold||"function"==typeof h.hold&&!h.hold(a,d,b))&&d.__path.splice(k),f.debug&&(console.log("[context]","[after ]",b.length,JSON.stringify(b)),console.groupEnd()),b[b.length-1]}},f.parseOptions=function(a,b){var d,e,f,g=/<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g,h=a.match(g),i={};for(d=0;h&&d<h.length;d++)g.lastIndex=0,e=g.exec(h[d]),e&&(f=new Function("return "+e[1]),f=f(),c.extend(i,f));return c.extend(i,b)},f.parseVal=function(a,b){function d(a,b){if("object"==typeof b&&a in b)return[b[a]];for(var c=[],d=0;d<b.length;d++)c.push.apply(c,f(a,[b[d]]));return c}function e(a,b){if("object"==typeof b&&a in b)return[b[a]];var c=[];for(var d in b)c.push.apply(c,f(a,[b[d]]));return c}function f(a,b){for(var f=[],g=0;g<b.length;g++)"object"==typeof b[g]&&(a in b[g]?f.push(b[g][a]):f.push.apply(f,c.isArray(b[g])?d(a,b[g]):e(a,b[g])));return f}function g(a,b){for(var c="string"==typeof a?a.split("."):a.slice(0),d=[b];c.length;)d=f(c.shift(),d);return d}return g(a,b)},f.val=function(d,e,g,h){if(d!==e.__path[e.__path.length-1])throw new Error(d+"!=="+e.__path);if(h!==a&&(h=b.mock(h)),e){var i=b.mock(e);if(c.isString(i))return i;var j=f.parseVal(e.__path,i);if(j.length>0)return j[0];if(d in i)return i[d]}return c.isArray(g[0])?{}:h!==a?h:d},f.program=function(a,b,c,d,e,f){for(var g=0;g<a.statements.length;g++)this.gen(a.statements[g],b,c,d,e,f);for(var h=0;a.inverse&&h<a.inverse.length;h++)this.gen(a.inverse[h],b,c,d,e,f)},f.block=function(b,e,f,g,h,i){var j=e.length;this.gen(b.tpl,e,f,g,h,c.extend({},i,{def:{},hold:!0}));var k,l,m,n=e[0];if("array"===c.type(n))for(k=this.val(f.__path[f.__path.length-1],f,e),m=k&&k.length||d.integer(3,7),l=0;m>l;l++)n.push(k&&k[l]!==a?k[l]:{}),f.__path.push(l),e.unshift(n[n.length-1]),this.gen(b.program,e,f,g,h,i),f.__path.pop(),e.shift();else this.gen(b.program,e,f,g,h,i);(!i.hold||"function"==typeof i.hold&&!i.hold(b,f,e))&&e.splice(0,e.length-j)},f.tpl=function(a,b,d,e,f,g){if(a.params&&a.params.length){g=c.extend({},g,{def:{each:[],"if":"@BOOL(2,1,true)",unless:"@BOOL(2,1,false)","with":{}}[a.path.string],hold:{each:!0,"if":function(a,b,c,d,e){return"object"==typeof e},unless:function(a,b,c,d,e){return"object"==typeof e},"with":!0,include:!1}[a.path.string]});for(var h,i=0;i<a.params.length;i++)h="include"===a.path.string?f&&f[a.params[i].value]:a.params[i],h&&this.gen(h,b,d,e,f,g);a.hash&&this.gen(a.hash,b,d,e,f,g)}else this.gen(a.path,b,d,e,f,g)},f.tplExpression=function(a,b,c,d,e,f){this.gen(a.expression,b,c,d,e,f)},f.content=c.noop,f.unaryExpression=c.noop,f.multiplicativeExpression=f.additiveExpression=function(b,e,f,g,h,i){this.gen(b.op1,e,f,g,h,c.extend({},i,{def:function(){return"number"===b.op2.type?b.op2.value.indexOf(".")>-1?d.float(-Math.pow(10,10),Math.pow(10,10),1,Math.pow(10,6)):d.integer():a}()})),this.gen(b.op2,e,f,g,h,c.extend({},i,{def:function(){return"number"===b.op1.type?b.op1.value.indexOf(".")>-1?d.float(-Math.pow(10,10),Math.pow(10,10),1,Math.pow(10,6)):d.integer():a}()}))},f.relationalExpression=function(a,b,c,d,e,f){this.gen(a.op1,b,c,d,e,f),this.gen(a.op2,b,c,d,e,f)},f.equalityExpression=c.noop,f.conditionalAndExpression=c.noop,f.conditionalOrExpression=c.noop,f.string=c.noop,f.number=c.noop,f.boolean=c.noop,f.hash=function(a,b,c,d,e,f){var g,h=a.value;for(g in h)this.gen(h[g],b,c,d,e,f)},f.id=function(b,d,e,g,h,i){function j(a,b,d,e,f){var g=c.type(a[e]),h=c.type(f);return f="true"===f?!0:"false"===f?!1:f,"undefined"===g?a[e]=d-1>b&&!c.isObjectOrArray(f)?{}:c.isArray(f)&&[]||f:d-1>b&&"object"!==g&&"array"!==g?a[e]=c.isArray(f)&&[]||{}:"object"!==g&&"array"!==g&&"object"!==h&&"array"!==h&&(a[e]=f),a[e]}var k,l,m,n,o,p=d.length,q=b.parts,r=d[b.depth];for(c.isArray(r)&&(r=d[b.depth+1]),k=0,l=q.length;l>k;k++)(0!==k||"this"!==q[k])&&(/^(xindex|xcount|xkey)$/.test(q[k])||0===k&&1===l&&q[k]in g||(e.__path.push(q[k]),m=q[k],n=k===l-1?i.def!==a?i.def:d[0][m]:{},o=this.val(m,e,d,n),f.debug&&(console.log("[def    ]",JSON.stringify(n)),console.log("[val    ]",JSON.stringify(o))),o=j(r,k,l,m,o),c.isObjectOrArray(r[m])&&d.unshift(r=r[m])));(!i.hold||"function"==typeof i.hold&&!i.hold(b,e,d,m,o))&&d.splice(0,d.length-p)}}}.call(this)}).call(this);
//# sourceMappingURL=dist/mock-min.map