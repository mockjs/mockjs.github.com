/*! mockjs 02-09-2013 */
/*! src/mock-prefix.js */
(function(undefined) {
    var Mock = {
        version: "0.1.1",
        _mocked: {}
    };
    /*! src/util.js */
    var Util = function() {
        var Util = {};
        Util.extend = function extend() {
            var target = arguments[0] || {}, i = 1, length = arguments.length, options, name, src, copy;
            if (length === 1) {
                target = this;
                i = 0;
            }
            for (;i < length; i++) {
                options = arguments[i];
                if (!options) continue;
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) continue;
                    if (copy === undefined) continue;
                    if (Util.isArray(copy) || Util.isObject(copy)) {
                        if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : [];
                        if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {};
                        target[name] = Util.extend(clone, copy);
                    } else {
                        target[name] = copy;
                    }
                }
            }
            return target;
        };
        Util.each = function each(obj, iterator, context) {
            var i, key;
            if (this.type(obj) === "number") {
                for (i = 0; i < obj; i++) {
                    iterator(i, i);
                }
            } else if (obj.length === +obj.length) {
                for (i = 0; i < obj.length; i++) {
                    if (iterator.call(context, obj[i], i, obj) === false) break;
                }
            } else {
                for (key in obj) {
                    if (iterator.call(context, obj[key], key, obj) === false) break;
                }
            }
        };
        Util.type = function type(obj) {
            return obj === null || obj === undefined ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
        };
        Util.each("String Object Array".split(" "), function(value) {
            Util["is" + value] = function(obj) {
                return Util.type(obj) === value.toLowerCase();
            };
        });
        Util.isObjectOrArray = function(value) {
            return Util.isObject(value) || Util.isArray(value);
        };
        Util.isNumeric = function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        };
        Util.heredoc = function heredoc(fn) {
            return fn.toString().replace(/^[^\/]+\/\*!?/, "").replace(/\*\/[^\/]+$/, "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
        };
        Util.noop = function() {};
        return Util;
    }();
    /*! src/random.js */
    var Random = function() {
        var Random = {
            extend: Util.extend
        };
        Random.extend({
            "boolean": function(min, max, cur) {
                if (cur !== undefined) {
                    min = typeof min !== "undefined" && !isNaN(min) ? parseInt(min, 10) : 1;
                    max = typeof max !== "undefined" && !isNaN(max) ? parseInt(max, 10) : 1;
                    return Math.random() > 1 / (min + max) * min ? !cur : cur;
                }
                return Math.random() >= .5;
            },
            bool: function(min, max, cur) {
                return this.boolean(min, max, cur);
            },
            natural: function(min, max) {
                min = typeof min !== "undefined" ? parseInt(min, 10) : 0;
                max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
                return Math.round(Math.random() * (max - min)) + min;
            },
            integer: function(min, max) {
                min = typeof min !== "undefined" ? parseInt(min, 10) : -9007199254740992;
                max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
                return Math.round(Math.random() * (max - min)) + min;
            },
            "int": function(min, max) {
                return this.integer(min, max);
            },
            "float": function(min, max, dmin, dmax) {
                dmin = dmin === undefined ? 0 : dmin;
                dmin = Math.max(Math.min(dmin, 17), 0);
                dmax = dmax === undefined ? 17 : dmax;
                dmax = Math.max(Math.min(dmax, 17), 0);
                var ret = this.integer(min, max) + ".";
                for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
                    ret += this.character("number");
                }
                return parseFloat(ret, 10);
            },
            character: function(pool) {
                var pools = {
                    lower: "abcdefghijklmnopqrstuvwxyz",
                    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    number: "0123456789",
                    symbol: "!@#$%^&*()[]"
                };
                pools.alpha = pools.lower + pools.upper;
                pools["undefined"] = pools.lower + pools.upper + pools.number + pools.symbol;
                pool = pools[("" + pool).toLowerCase()] || pool;
                return pool.charAt(Random.natural(0, pool.length - 1));
            },
            "char": function(pool) {
                return this.character(pool);
            },
            string: function(pool, min, max) {
                var length;
                if (arguments.length === 3) {
                    length = Random.natural(min, max);
                }
                if (arguments.length === 2) {
                    if (typeof arguments[0] === "string") {
                        length = min;
                    } else {
                        length = Random.natural(pool, min);
                        pool = undefined;
                    }
                }
                if (arguments.length === 1) {
                    length = pool;
                    pool = undefined;
                }
                if (arguments.length === 0) {
                    length = Random.natural(3, 7);
                }
                var text = "";
                for (var i = 0; i < length; i++) {
                    text += Random.character(pool);
                }
                return text;
            },
            str: function(pool, min, max) {
                return this.string(pool, min, max);
            },
            range: function(start, stop, step) {
                if (arguments.length <= 1) {
                    stop = start || 0;
                    start = 0;
                }
                step = arguments[2] || 1;
                var len = Math.max(Math.ceil((stop - start) / step), 0);
                var idx = 0;
                var range = new Array(len);
                while (idx < len) {
                    range[idx++] = start;
                    start += step;
                }
                return range;
            }
        });
        Random.extend({
            patternLetters: {
                yyyy: "getFullYear",
                yy: function(date) {
                    return ("" + date.getFullYear()).slice(2);
                },
                y: "yy",
                MM: function(date) {
                    var m = date.getMonth() + 1;
                    return m < 10 ? "0" + m : m;
                },
                M: function(date) {
                    return date.getMonth() + 1;
                },
                dd: function(date) {
                    var d = date.getDate();
                    return d < 10 ? "0" + d : d;
                },
                d: "getDate",
                HH: function(date) {
                    var h = date.getHours();
                    return h < 10 ? "0" + h : h;
                },
                H: "getHours",
                hh: function(date) {
                    var h = date.getHours() % 12;
                    return h < 10 ? "0" + h : h;
                },
                h: function(date) {
                    return date.getHours() % 12;
                },
                mm: function(date) {
                    var m = date.getMinutes();
                    return m < 10 ? "0" + m : m;
                },
                m: "getMinutes",
                ss: function(date) {
                    var s = date.getSeconds();
                    return s < 10 ? "0" + s : s;
                },
                s: "getSeconds",
                SS: function(date) {
                    var ms = date.getMilliseconds();
                    return ms < 10 && "00" + ms || ms < 100 && "0" + ms || ms;
                },
                S: "getMilliseconds",
                A: function(date) {
                    return date.getHours() < 12 ? "AM" : "PM";
                },
                a: function(date) {
                    return date.getHours() < 12 ? "am" : "pm";
                }
            }
        });
        Random.extend({
            rformat: new RegExp(function() {
                var re = [];
                for (var i in Random.patternLetters) re.push(i);
                return "(" + re.join("|") + ")";
            }(), "g"),
            format: function(date, format) {
                var patternLetters = Random.patternLetters, rformat = Random.rformat;
                return format.replace(rformat, function($0, flag) {
                    return typeof patternLetters[flag] === "function" ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? arguments.callee($0, patternLetters[flag]) : date[patternLetters[flag]]();
                });
            },
            randomDate: function(min, max) {
                min = min === undefined ? new Date(0) : min;
                max = max === undefined ? new Date() : max;
                return new Date(Math.random() * (max.getTime() - min.getTime()));
            },
            date: function(format) {
                format = format || "yyyy-MM-dd";
                return this.format(this.randomDate(), format);
            },
            time: function(format) {
                format = format || "HH:mm:ss";
                return this.format(this.randomDate(), format);
            },
            datetime: function(format) {
                format = format || "yyyy-MM-dd HH:mm:ss";
                return this.format(this.randomDate(), format);
            }
        });
        Random.extend({
            ad_size: [ "300x250", "250x250", "240x400", "336x280", "180x150", "720x300", "468x60", "234x60", "88x31", "120x90", "120x60", "120x240", "125x125", "728x90", "160x600", "120x600", "300x600" ],
            screen_size: [ "320x200", "320x240", "640x480", "800x480", "800x480", "1024x600", "1024x768", "1280x800", "1440x900", "1920x1200", "2560x1600" ],
            video_size: [ "720x480", "768x576", "1280x720", "1920x1080" ],
            img: function(size, background, foreground, format, text) {
                if (arguments.length === 4) {
                    text = format;
                    format = undefined;
                }
                if (arguments.length === 3) text = foreground;
                if (!size) size = this.pick(this.ad_size);
                if (background && ~background.indexOf("#")) background = background.slice(1);
                if (foreground && ~foreground.indexOf("#")) foreground = foreground.slice(1);
                return "http://dummyimage.com/" + size + (background ? "/" + background : "") + (foreground ? "/" + foreground : "") + (format ? "." + format : "") + (text ? "&text=" + text : "");
            }
        });
        Random.extend({
            color: function() {
                var colour = Math.floor(Math.random() * (16 * 16 * 16 * 16 * 16 * 16 - 1)).toString(16);
                colour = "#" + ("000000" + colour).slice(-6);
                return colour;
            }
        });
        Random.extend({
            capitalize: function(word) {
                return word.charAt(0).toUpperCase() + word.substr(1);
            },
            upper: function(str) {
                return str.toUpperCase();
            },
            lower: function(str) {
                return str.toLowerCase();
            },
            pick: function(arr) {
                return arr[this.natural(0, arr.length - 1)];
            },
            shuffle: function(arr) {
                var old = arr.slice(0), result = [], index = 0, length = old.length;
                for (var i = 0; i < length; i++) {
                    index = this.natural(0, old.length - 1);
                    result.push(old[index]);
                    old.splice(index, 1);
                }
                return result;
            }
        });
        Random.extend({
            paragraph: function(min, max) {
                var len;
                if (arguments.length === 0) len = Random.natural(3, 7);
                if (arguments.length === 1) len = max = min;
                if (arguments.length === 2) {
                    min = parseInt(min, 10);
                    max = parseInt(max, 10);
                    len = Random.natural(min, max);
                }
                var arr = [];
                for (var i = 0; i < len; i++) {
                    arr.push(Random.sentence());
                }
                return arr.join(" ");
            },
            sentence: function(min, max) {
                var len;
                if (arguments.length === 0) len = Random.natural(12, 18);
                if (arguments.length === 1) len = max = min;
                if (arguments.length === 2) {
                    min = parseInt(min, 10);
                    max = parseInt(max, 10);
                    len = Random.natural(min, max);
                }
                var arr = [];
                for (var i = 0; i < len; i++) {
                    arr.push(Random.word());
                }
                return Random.capitalize(arr.join(" ")) + ".";
            },
            word: function(min, max) {
                var len;
                if (arguments.length === 0) len = Random.natural(3, 10);
                if (arguments.length === 1) len = max = min;
                if (arguments.length === 2) {
                    min = parseInt(min, 10);
                    max = parseInt(max, 10);
                    len = Random.natural(min, max);
                }
                var result = "";
                for (var i = 0; i < len; i++) {
                    result += Random.character("lower");
                }
                return result;
            },
            title: function(min, max) {
                var len, result = [];
                if (arguments.length === 0) len = Random.natural(3, 7);
                if (arguments.length === 1) len = max = min;
                if (arguments.length === 2) {
                    min = parseInt(min, 10);
                    max = parseInt(max, 10);
                    len = Random.natural(min, max);
                }
                for (var i = 0; i < len; i++) {
                    result.push(this.capitalize(this.word()));
                }
                return result.join(" ");
            }
        });
        Random.extend({
            first: function() {
                var names = [ "James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric" ].concat([ "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna" ]);
                return this.pick(names);
                return this.capitalize(this.word());
            },
            last: function() {
                var names = [ "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen" ];
                return this.pick(names);
                return this.capitalize(this.word());
            },
            name: function(middle) {
                return this.first() + " " + (middle ? this.first() + " " : "") + this.last();
            }
        });
        Random.extend({
            url: function() {
                return "http://" + this.domain() + "/" + this.word();
            },
            domain: function(tld) {
                return this.word() + "." + (tld || this.tld());
            },
            email: function(domain) {
                return this.character("lower") + "." + this.last().toLowerCase() + "@" + this.last().toLowerCase() + "." + this.tld();
                return this.word() + "@" + (domain || this.domain());
            },
            ip: function() {
                return this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255);
            },
            tlds: [ "com", "org", "edu", "gov", "co.uk", "net", "io" ],
            tld: function() {
                return this.pick(this.tlds);
            }
        });
        Random.extend({
            areas: [ "东北", "华北", "华东", "华中", "华南", "西南", "西北" ],
            area: function() {
                return this.pick(this.areas);
            },
            regions: [ "110000 北京市", "120000 天津市", "130000 河北省", "140000 山西省", "150000 内蒙古自治区", "210000 辽宁省", "220000 吉林省", "230000 黑龙江省", "310000 上海市", "320000 江苏省", "330000 浙江省", "340000 安徽省", "350000 福建省", "360000 江西省", "370000 山东省", "410000 河南省", "420000 湖北省", "430000 湖南省", "440000 广东省", "450000 广西壮族自治区", "460000 海南省", "500000 重庆市", "510000 四川省", "520000 贵州省", "530000 云南省", "540000 西藏自治区", "610000 陕西省", "620000 甘肃省", "630000 青海省", "640000 宁夏回族自治区", "650000 新疆维吾尔自治区", "650000 新疆维吾尔自治区", "710000 台湾省", "810000 香港特别行政区", "820000 澳门特别行政区" ],
            region: function() {
                return this.pick(this.regions).split(" ")[1];
            },
            address: function() {},
            city: function() {},
            phone: function() {},
            areacode: function() {},
            street: function() {},
            street_suffixes: function() {},
            street_suffix: function() {},
            states: function() {},
            state: function() {},
            zip: function(len) {
                var zip = "";
                for (var i = 0; i < (len || 6); i++) zip += this.natural(0, 9);
                return zip;
            }
        });
        Random.extend({
            todo: function() {
                return "todo";
            }
        });
        Random.extend({
            d4: function() {
                return this.natural(1, 4);
            },
            d6: function() {
                return this.natural(1, 6);
            },
            d8: function() {
                return this.natural(1, 8);
            },
            d12: function() {
                return this.natural(1, 12);
            },
            d20: function() {
                return this.natural(1, 20);
            },
            d100: function() {
                return this.natural(1, 100);
            },
            guid: function() {
                var pool = "ABCDEF1234567890", guid = this.string(pool, 8) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 12);
                return guid;
            },
            id: function() {
                var id, sum = 0, rank = [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2" ], last = [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ];
                id = this.pick(this.regions).split(" ")[0] + this.date("yyyyMMdd") + this.string("number", 3);
                for (var i = 0; i < id.length; i++) {
                    sum += id[i] * rank[i];
                }
                id += last[sum % 11];
                return id;
            }
        });
        return Random;
    }();
    /*! src/mock.js */
    var rkey = /(.+)\|(?:\+(\d+)|(\d+-?\d*)?(?:\.(\d+-?\d*))?)/, rrange = /(\d+)-?(\d+)?/, rplaceholder = /\\*@([^@#%&()\?\s\/\.]+)(?:\((.+?)\))?/g;
    Mock.extend = Util.extend;
    Mock.mock = function(rurl, template) {
        if (arguments.length === 1) return Handle.gen(rurl);
        Mock._mocked[rurl] = {
            rurl: rurl,
            template: template
        };
        return Mock;
    };
    var Handle = {
        extend: Util.extend
    };
    Handle.gen = function(template, name, obj) {
        var parameters = (name = name || "").match(rkey), range = parameters && parameters[3] && parameters[3].match(rrange), min = range && parseInt(range[1], 10), max = range && parseInt(range[2], 10), count = range ? !range[2] && parseInt(range[1], 10) || Random.integer(min, max) : 1, decimal = parameters && parameters[4] && parameters[4].match(rrange), dmin = decimal && parseInt(decimal[1], 10), dmax = decimal && parseInt(decimal[2], 10), dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random.integer(dmin, dmax) : 0, point = parameters && parameters[4], type = Util.type(template), result;
        if (Handle[type]) {
            result = Handle[type]({
                type: type,
                template: template,
                name: name,
                obj: obj,
                parameters: parameters,
                range: range,
                min: min,
                max: max,
                count: count,
                decimal: decimal,
                dmin: dmin,
                dmax: dmax,
                dcount: dcount,
                point: point
            });
            return result;
        }
        return template;
    };
    Handle.extend({
        array: function(options) {
            var result = [], i, j;
            if (!options.parameters) {
                for (i = 0; i < options.template.length; i++) {
                    result.push(Handle.gen(options.template[i]));
                }
            } else {
                if (options.count === 1 && options.template.length > 1) {
                    result = Random.pick(options.template);
                } else {
                    for (i = 0; i < options.count; i++) {
                        j = 0;
                        do {
                            result.push(Handle.gen(options.template[j++]));
                        } while (j < options.template.length);
                    }
                }
            }
            return result;
        },
        object: function(options) {
            var result = {}, key, inc;
            for (key in options.template) {
                result[key.replace(rkey, "$1")] = Handle.gen(options.template[key], key, result);
                inc = key.match(rkey);
                if (inc && inc[2] && Util.type(options.template[key]) === "number") {
                    options.template[key] += parseInt(inc[2], 10);
                }
            }
            return result;
        },
        number: function(options) {
            var result, parts, i;
            if (options.point) {
                options.template += "";
                parts = options.template.split(".");
                parts[0] = options.range ? options.count : parts[0];
                parts[1] = (parts[1] || "").slice(0, options.dcount);
                for (i = 0; parts[1].length < options.dcount; i++) {
                    parts[1] += Random.character("number");
                }
                result = parseFloat(parts.join("."), 10);
            } else {
                result = options.range && !options.parameters[2] ? options.count : options.template;
            }
            return result;
        },
        "boolean": function(options) {
            var result;
            result = options.parameters ? Random.bool(options.min, options.max, options.template) : options.template;
            return result;
        },
        string: function(options) {
            var result = "", i, placeholders, ph, phed;
            if (options.template.length) {
                for (i = 0; i < options.count; i++) {
                    result += options.template;
                }
                placeholders = result.match(rplaceholder) || [];
                for (i = 0; i < placeholders.length; i++) {
                    ph = placeholders[i];
                    if (/^\\/.test(ph)) {
                        placeholders.splice(i--, 1);
                        continue;
                    }
                    phed = Handle.placeholder(ph, options.obj);
                    if (placeholders.length === 1 && ph === result) {
                        if (Util.isNumeric(phed)) {
                            result = parseFloat(phed, 10);
                            break;
                        }
                        if (/^(true|false)$/.test(phed)) {
                            result = phed === "true" ? true : false;
                            break;
                        }
                    }
                    result = result.replace(ph, phed);
                }
            } else {
                result = options.range ? Random.string(options.count) : options.template;
            }
            return result;
        }
    });
    Handle.extend({
        placeholder: function(placeholder, obj) {
            rplaceholder.exec("");
            var parts = rplaceholder.exec(placeholder), key = parts && parts[1], lkey = key && key.toLowerCase(), params = parts && parts[2] ? parts[2].split(/,\s*/) : [];
            if (obj && key in obj) return obj[key];
            if (!(key in Random) && !(lkey in Random)) return placeholder;
            for (var i = 0; i < params.length; i++) {
                rplaceholder.exec("");
                if (rplaceholder.test(params[i])) {
                    params[i] = Handle.placeholder(params[i], obj);
                }
            }
            var handle = Random[key] || Random[lkey];
            switch (Util.type(handle)) {
              case "array":
                return Random.pick(handle);

              case "function":
                var re = handle.apply(Random, params);
                if (re === undefined) re = "";
                return re;
            }
        }
    });
    /*! src/mockjax.js */
    Mock.mockjax = function mockjax(jQuery) {
        function mockxhr() {
            return {
                open: jQuery.noop,
                send: jQuery.noop,
                getAllResponseHeaders: jQuery.noop,
                readyState: 4,
                status: 200
            };
        }
        function convert(mock) {
            return function() {
                return Mock.mock(mock.template);
            };
        }
        function prefilter(options) {
            for (var surl in Mock._mocked) {
                var mock = Mock._mocked[surl];
                if (jQuery.type(mock.rurl) === "string") {
                    if (mock.rurl !== options.url) continue;
                }
                if (jQuery.type(mock.rurl) === "regexp") {
                    if (!mock.rurl.test(options.url)) continue;
                }
                options.dataFilter = convert(mock);
                options.converters["text json"] = convert(mock);
                options.xhr = mockxhr;
                break;
            }
        }
        jQuery.ajaxPrefilter("*", prefilter);
        jQuery.ajaxPrefilter("json", prefilter);
        jQuery.ajaxPrefilter("jsonp", prefilter);
        return Mock;
    };
    if (typeof jQuery != "undefined") Mock.mockjax(jQuery);
    if (typeof KISSY != "undefined" && KISSY.add) {
        Mock.mockjax = function mockjax(KISSY) {
            var _original_ajax = KISSY.io;
            var xhr = {
                readyState: 4,
                responseText: "",
                responseXML: null,
                state: 2,
                status: 200,
                statusText: "success",
                timeoutTimer: null
            };
            KISSY.io = function(options) {
                for (var surl in Mock._mocked) {
                    var mock = Mock._mocked[surl];
                    if (KISSY.type(mock.rurl) === "string") {
                        if (mock.rurl !== options.url) continue;
                    }
                    if (KISSY.type(mock.rurl) === "regexp") {
                        if (!mock.rurl.test(options.url)) continue;
                    }
                    console.log("[mock]", options.url, ">", mock.rurl);
                    var data = Mock.mock(mock.template);
                    console.log("[mock]", data);
                    if (options.success) options.success(data, "success", xhr);
                    if (options.complete) options.complete(data, "success", xhr);
                    return KISSY;
                }
                return _original_ajax.apply(this, arguments);
            };
        };
    }
    /*! src/expose.js */
    Mock.Util = Util;
    Mock.Random = Random;
    Mock.heredoc = Util.heredoc;
    if (typeof module === "object" && module.exports) {
        module.exports = Mock;
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return Mock;
        });
    }
    this.Mock = Mock;
    this.Random = Random;
    if (typeof KISSY != "undefined") {
        Util.each([ "mock", "components/mock/index", "mock/dist/mock" ], function register(name) {
            KISSY.add(name, function(S) {
                Mock.mockjax(S);
                return Mock;
            }, {
                requires: [ "ajax" ]
            });
        });
    }
    /*! src/mock4tpl.js */
    (function(undefined) {
        var Mock4Tpl = {
            version: "0.0.1"
        };
        if (!this.Mock) module.exports = Mock4Tpl;
        Mock.tpl = function(input, options, helpers, partials) {
            return Mock4Tpl.mock(input, options, helpers, partials);
        };
        Mock.parse = function(input) {
            return Handlebars.parse(input);
        };
        Mock4Tpl.mock = function(input, options, helpers, partials) {
            helpers = helpers ? Util.extend({}, helpers, Handlebars.helpers) : Handlebars.helpers;
            partials = partials ? Util.extend({}, partials, Handlebars.partials) : Handlebars.partials;
            return Handle.gen(input, null, options, helpers, partials);
        };
        var Handle = {
            debug: Mock4Tpl.debug || false,
            extend: Util.extend
        };
        Handle.gen = function(node, context, options, helpers, partials) {
            if (Util.isString(node)) {
                var ast = Handlebars.parse(node);
                options = Handle.parseOptions(node, options);
                var data = Handle.gen(ast, context, options, helpers, partials);
                return data;
            }
            context = context || [ {} ];
            options = options || {};
            if (this[node.type] === Util.noop) return;
            options.__path = options.__path || [];
            if (Mock4Tpl.debug || Handle.debug) {
                console.log();
                console.group("[" + node.type + "]", JSON.stringify(node));
                console.log("[options]", options.__path.length, JSON.stringify(options));
            }
            var preLength = options.__path.length;
            this[node.type](node, context, options, helpers, partials);
            options.__path.splice(preLength);
            if (Mock4Tpl.debug || Handle.debug) {
                console.groupEnd();
            }
            return context[context.length - 1];
        };
        Handle.parseOptions = function(input, options) {
            var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
            var comments = input.match(rComment), ret = {}, i, ma, option;
            for (i = 0; comments && i < comments.length; i++) {
                rComment.lastIndex = 0;
                ma = rComment.exec(comments[i]);
                if (ma) {
                    option = new Function("return " + ma[1]);
                    option = option();
                    Util.extend(ret, option);
                }
            }
            return Util.extend(ret, options);
        };
        Handle.val = function(name, options, context, def) {
            if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
            if (Mock4Tpl.debug || Handle.debug) console.log("[options]", name, options.__path);
            if (def !== undefined) def = Mock.mock(def);
            if (options) {
                var mocked = Mock.mock(options);
                if (Util.isString(mocked)) return mocked;
                if (name in mocked) {
                    return mocked[name];
                }
            }
            if (Util.isArray(context[0])) return {};
            return def !== undefined ? def : name || Random.word();
        };
        Handle.program = function(node, context, options, helpers, partials) {
            for (var i = 0; i < node.statements.length; i++) {
                this.gen(node.statements[i], context, options, helpers, partials);
            }
        };
        Handle.mustache = function(node, context, options, helpers, partials) {
            var i, currentContext = context[0], contextLength = context.length;
            if (Util.type(currentContext) === "array") {
                currentContext.push({});
                currentContext = currentContext[currentContext.length - 1];
                context.unshift(currentContext);
            }
            if (node.isHelper || helpers && helpers[node.id.string]) {
                if (node.params.length === 0) {} else {
                    for (i = 0; i < node.params.length; i++) {
                        this.gen(node.params[i], context, options, helpers, partials);
                    }
                }
                if (node.hash) this.gen(node.hash, context, options, helpers, partials);
            } else {
                this.gen(node.id, context, options, helpers, partials);
            }
            if (context.length > contextLength) context.splice(0, context.length - contextLength);
        };
        Handle.block = function(node, context, options, helpers, partials) {
            var parts = node.mustache.id.parts, i, len, cur, val, type, currentContext = context[0], contextLength = context.length;
            if (node.inverse) {}
            if (node.mustache.isHelper || helpers && helpers[node.mustache.id.string]) {
                type = parts[0];
                val = (Helpers[type] || Helpers.custom).apply(this, arguments);
                currentContext = context[0];
            } else {
                for (i = 0; i < parts.length; i++) {
                    options.__path.push(parts[i]);
                    cur = parts[i];
                    val = this.val(cur, options, context, {});
                    currentContext[cur] = Util.isArray(val) && [] || val;
                    type = Util.type(currentContext[cur]);
                    if (type === "object" || type === "array") {
                        currentContext = currentContext[cur];
                        context.unshift(currentContext);
                    }
                }
            }
            if (node.program) {
                if (Util.type(currentContext) === "array") {
                    len = val.length || Random.integer(3, 7);
                    for (i = 0; i < len; i++) {
                        currentContext.push(typeof val[i] !== "undefined" ? val[i] : {});
                        options.__path.push("[]");
                        context.unshift(currentContext[currentContext.length - 1]);
                        this.gen(node.program, context, options, helpers, partials);
                        options.__path.pop();
                        context.shift();
                    }
                } else this.gen(node.program, context, options, helpers, partials);
            }
            if (context.length > contextLength) context.splice(0, context.length - contextLength);
        };
        Handle.hash = function(node, context, options, helpers, partials) {
            var pairs = node.pairs, pair, i, j;
            for (i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                for (j = 1; j < pair.length; j++) {
                    this.gen(pair[j], context, options, helpers, partials);
                }
            }
        };
        Handle.ID = function(node, context, options) {
            var parts = node.parts, i, len, cur, prev, def, val, type, valType, preOptions, currentContext = context[node.depth], contextLength = context.length;
            if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
            if (!parts.length) {} else {
                for (i = 0, len = parts.length; i < len; i++) {
                    options.__path.push(parts[i]);
                    cur = parts[i];
                    prev = parts[i - 1];
                    preOptions = options[prev];
                    def = i === len - 1 ? currentContext[cur] : {};
                    val = this.val(cur, options, context, def);
                    type = Util.type(currentContext[cur]);
                    valType = Util.type(val);
                    if (type === "undefined") {
                        if (i < len - 1 && valType !== "object" && valType !== "array") {
                            currentContext[cur] = {};
                        } else {
                            currentContext[cur] = Util.isArray(val) && [] || val;
                        }
                    } else {
                        if (i < len - 1 && type !== "object" && type !== "array") {
                            currentContext[cur] = Util.isArray(val) && [] || {};
                        }
                    }
                    type = Util.type(currentContext[cur]);
                    if (type === "object" || type === "array") {
                        currentContext = currentContext[cur];
                        context.unshift(currentContext);
                    }
                }
            }
            if (context.length > contextLength) context.splice(0, context.length - contextLength);
        };
        Handle.partial = function(node, context, options, helpers, partials) {
            var name = node.partialName.name, partial = partials && partials[name], contextLength = context.length;
            if (partial) Handle.gen(partial, context, options, helpers, partials);
            if (context.length > contextLength) context.splice(0, context.length - contextLength);
        };
        Handle.content = Util.noop;
        Handle.PARTIAL_NAME = Util.noop;
        Handle.DATA = Util.noop;
        Handle.STRING = Util.noop;
        Handle.INTEGER = Util.noop;
        Handle.BOOLEAN = Util.noop;
        Handle.comment = Util.noop;
        var Helpers = {};
        Helpers.each = function(node, context, options) {
            var i, len, cur, val, parts, def, type, currentContext = context[0];
            parts = node.mustache.params[0].parts;
            for (i = 0, len = parts.length; i < len; i++) {
                options.__path.push(parts[i]);
                cur = parts[i];
                def = i === len - 1 ? [] : {};
                val = this.val(cur, options, context, def);
                currentContext[cur] = Util.isArray(val) && [] || val;
                type = Util.type(currentContext[cur]);
                if (type === "object" || type === "array") {
                    currentContext = currentContext[cur];
                    context.unshift(currentContext);
                }
            }
            return val;
        };
        Helpers["if"] = Helpers.unless = function(node, context, options) {
            var params = node.mustache.params, i, j, cur, val, def, type, currentContext = context[0];
            for (i = 0; i < params.length; i++) {
                parts = params[i].parts;
                for (j = 0; j < parts.length; j++) {
                    if (i === 0) options.__path.push(parts[j]);
                    cur = parts[j];
                    def = j === parts.length - 1 ? "@BOOL(2,1,true)" : {};
                    val = this.val(cur, options, context, def);
                    if (j === parts.length - 1) {
                        val = val === "true" ? true : val === "false" ? false : val;
                    }
                    currentContext[cur] = Util.isArray(val) ? [] : val;
                    type = Util.type(currentContext[cur]);
                    if (type === "object" || type === "array") {
                        currentContext = currentContext[cur];
                        context.unshift(currentContext);
                    }
                }
            }
            return val;
        };
        Helpers["with"] = function(node, context, options) {
            var i, cur, val, parts, def, currentContext = context[0];
            parts = node.mustache.params[0].parts;
            for (i = 0; i < parts.length; i++) {
                options.__path.push(parts[i]);
                cur = parts[i];
                def = {};
                val = this.val(cur, options, context, def);
                currentContext = currentContext[cur] = val;
                context.unshift(currentContext);
            }
            return val;
        };
        Helpers.log = function() {};
        Helpers.custom = function(node, context, options) {
            var i, len, cur, val, parts, def, type, currentContext = context[0];
            if (node.mustache.params.length === 0) {
                return;
                options.__path.push(node.mustache.id.string);
                cur = node.mustache.id.string;
                def = "@BOOL(2,1,true)";
                val = this.val(cur, options, context, def);
                currentContext[cur] = Util.isArray(val) && [] || val;
                type = Util.type(currentContext[cur]);
                if (type === "object" || type === "array") {
                    currentContext = currentContext[cur];
                    context.unshift(currentContext);
                }
            } else {
                parts = node.mustache.params[0].parts;
                for (i = 0, len = parts.length; i < len; i++) {
                    options.__path.push(parts[i]);
                    cur = parts[i];
                    def = i === len - 1 ? [] : {};
                    val = this.val(cur, options, context, def);
                    currentContext[cur] = Util.isArray(val) && [] || val;
                    type = Util.type(currentContext[cur]);
                    if (type === "object" || type === "array") {
                        currentContext = currentContext[cur];
                        context.unshift(currentContext);
                    }
                }
            }
            return val;
        };
    }).call(this);
    /*! src/mock4xtpl.js */
    (function(undefined) {
        if (typeof KISSY === "undefined") return;
        var Mock4XTpl = {
            debug: false
        };
        var XTemplate;
        KISSY.use("xtemplate", function(S, T) {
            XTemplate = T;
        });
        if (!this.Mock) module.exports = Mock4XTpl;
        Mock.xtpl = function(input, options, helpers, partials) {
            return Mock4XTpl.mock(input, options, helpers, partials);
        };
        Mock.xparse = function(input) {
            return XTemplate.compiler.parse(input);
        };
        Mock4XTpl.mock = function(input, options, helpers, partials) {
            helpers = helpers ? Util.extend({}, helpers, XTemplate.RunTime.commands) : XTemplate.RunTime.commands;
            partials = partials ? Util.extend({}, partials, XTemplate.RunTime.subTpls) : XTemplate.RunTime.subTpls;
            return this.gen(input, null, options, helpers, partials, {});
        };
        Mock4XTpl.parse = function(input) {
            return XTemplate.compiler.parse(input);
        };
        Mock4XTpl.gen = function(node, context, options, helpers, partials, other) {
            if (typeof node === "string") {
                if (Mock4XTpl.debug) {
                    console.log("[tpl    ]\n", node);
                }
                var ast = this.parse(node);
                options = this.parseOptions(node, options);
                var data = this.gen(ast, context, options, helpers, partials, other);
                return data;
            }
            context = context || [ {} ];
            options = options || {};
            if (this[node.type] === Util.noop) return;
            options.__path = options.__path || [];
            if (Mock4XTpl.debug) {
                console.log();
                console.group("[" + node.type + "]", JSON.stringify(node));
                console.log("[context]", "[before]", context.length, JSON.stringify(context));
                console.log("[options]", "[before]", options.__path.length, JSON.stringify(options));
                console.log("[other  ]", "[before]", JSON.stringify(other));
            }
            var preLength = options.__path.length;
            this[node.type](node, context, options, helpers, partials, other);
            if (Mock4XTpl.debug) {
                console.log("[__path ]", "[after ]", options.__path);
            }
            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
                options.__path.splice(preLength);
            }
            if (Mock4XTpl.debug) {
                console.log("[context]", "[after ]", context.length, JSON.stringify(context));
                console.groupEnd();
            }
            return context[context.length - 1];
        };
        Mock4XTpl.parseOptions = function(input, options) {
            var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
            var comments = input.match(rComment), ret = {}, i, ma, option;
            for (i = 0; comments && i < comments.length; i++) {
                rComment.lastIndex = 0;
                ma = rComment.exec(comments[i]);
                if (ma) {
                    option = new Function("return " + ma[1]);
                    option = option();
                    Util.extend(ret, option);
                }
            }
            return Util.extend(ret, options);
        };
        Mock4XTpl.parseVal = function(expr, object) {
            function queryArray(prop, context) {
                if (typeof context === "object" && prop in context) return [ context[prop] ];
                var ret = [];
                for (var i = 0; i < context.length; i++) {
                    ret.push.apply(ret, query(prop, [ context[i] ]));
                }
                return ret;
            }
            function queryObject(prop, context) {
                if (typeof context === "object" && prop in context) return [ context[prop] ];
                var ret = [];
                for (var key in context) {
                    ret.push.apply(ret, query(prop, [ context[key] ]));
                }
                return ret;
            }
            function query(prop, set) {
                var ret = [];
                for (var i = 0; i < set.length; i++) {
                    if (typeof set[i] !== "object") continue;
                    if (prop in set[i]) ret.push(set[i][prop]); else {
                        ret.push.apply(ret, Util.isArray(set[i]) ? queryArray(prop, set[i]) : queryObject(prop, set[i]));
                    }
                }
                return ret;
            }
            function parse(expr, context) {
                var parts = typeof expr === "string" ? expr.split(".") : expr.slice(0), set = [ context ];
                while (parts.length) {
                    set = query(parts.shift(), set);
                }
                return set;
            }
            return parse(expr, object);
        };
        Mock4XTpl.val = function(name, options, context, def) {
            if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
            if (def !== undefined) def = Mock.mock(def);
            if (options) {
                var mocked = Mock.mock(options);
                if (Util.isString(mocked)) return mocked;
                var ret = Mock4XTpl.parseVal(options.__path, mocked);
                if (ret.length > 0) return ret[0];
                if (name in mocked) {
                    return mocked[name];
                }
            }
            if (Util.isArray(context[0])) return {};
            return def !== undefined ? def : name;
        };
        Mock4XTpl.program = function(node, context, options, helpers, partials, other) {
            for (var i = 0; i < node.statements.length; i++) {
                this.gen(node.statements[i], context, options, helpers, partials, other);
            }
            for (var j = 0; node.inverse && j < node.inverse.length; j++) {
                this.gen(node.inverse[j], context, options, helpers, partials, other);
            }
        };
        Mock4XTpl.block = function(node, context, options, helpers, partials, other) {
            var contextLength = context.length;
            this.gen(node.tpl, context, options, helpers, partials, Util.extend({}, other, {
                def: {},
                hold: true
            }));
            var currentContext = context[0], mocked, i, len;
            if (Util.type(currentContext) === "array") {
                mocked = this.val(options.__path[options.__path.length - 1], options, context);
                len = mocked && mocked.length || Random.integer(3, 7);
                for (i = 0; i < len; i++) {
                    currentContext.push(mocked && mocked[i] !== undefined ? mocked[i] : {});
                    options.__path.push(i);
                    context.unshift(currentContext[currentContext.length - 1]);
                    this.gen(node.program, context, options, helpers, partials, other);
                    options.__path.pop();
                    context.shift();
                }
            } else this.gen(node.program, context, options, helpers, partials, other);
            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
                context.splice(0, context.length - contextLength);
            }
        };
        Mock4XTpl.tpl = function(node, context, options, helpers, partials, other) {
            if (node.params && node.params.length) {
                other = Util.extend({}, other, {
                    def: {
                        each: [],
                        "if": "@BOOL(2,1,true)",
                        unless: "@BOOL(2,1,false)",
                        "with": {}
                    }[node.path.string],
                    hold: {
                        each: true,
                        "if": function(_, __, ___, name, value) {
                            return typeof value === "object";
                        },
                        unless: function(_, __, ___, name, value) {
                            return typeof value === "object";
                        },
                        "with": true,
                        include: false
                    }[node.path.string]
                });
                for (var i = 0, input; i < node.params.length; i++) {
                    if (node.path.string === "include") {
                        input = partials && partials[node.params[i].value];
                    } else input = node.params[i];
                    if (input) this.gen(input, context, options, helpers, partials, other);
                }
                if (node.hash) {
                    this.gen(node.hash, context, options, helpers, partials, other);
                }
            } else {
                this.gen(node.path, context, options, helpers, partials, other);
            }
        };
        Mock4XTpl.tplExpression = function(node, context, options, helpers, partials, other) {
            this.gen(node.expression, context, options, helpers, partials, other);
        };
        Mock4XTpl.content = Util.noop;
        Mock4XTpl.unaryExpression = Util.noop;
        Mock4XTpl.multiplicativeExpression = Mock4XTpl.additiveExpression = function(node, context, options, helpers, partials, other) {
            this.gen(node.op1, context, options, helpers, partials, Util.extend({}, other, {
                def: function() {
                    return node.op2.type === "number" ? node.op2.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
                }()
            }));
            this.gen(node.op2, context, options, helpers, partials, Util.extend({}, other, {
                def: function() {
                    return node.op1.type === "number" ? node.op1.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
                }()
            }));
        };
        Mock4XTpl.relationalExpression = function(node, context, options, helpers, partials, other) {
            this.gen(node.op1, context, options, helpers, partials, other);
            this.gen(node.op2, context, options, helpers, partials, other);
        };
        Mock4XTpl.equalityExpression = Util.noop;
        Mock4XTpl.conditionalAndExpression = Util.noop;
        Mock4XTpl.conditionalOrExpression = Util.noop;
        Mock4XTpl.string = Util.noop;
        Mock4XTpl.number = Util.noop;
        Mock4XTpl.boolean = Util.noop;
        Mock4XTpl.hash = function(node, context, options, helpers, partials, other) {
            var pairs = node.value, key;
            for (key in pairs) {
                this.gen(pairs[key], context, options, helpers, partials, other);
            }
        };
        Mock4XTpl.id = function(node, context, options, helpers, partials, other) {
            var contextLength = context.length;
            var parts = node.parts, currentContext = context[node.depth], i, len, cur, def, val;
            function fix(currentContext, index, length, name, val) {
                var type = Util.type(currentContext[name]), valType = Util.type(val);
                val = val === "true" ? true : val === "false" ? false : val;
                if (type === "undefined") {
                    if (index < length - 1 && !Util.isObjectOrArray(val)) {
                        currentContext[name] = {};
                    } else {
                        currentContext[name] = Util.isArray(val) && [] || val;
                    }
                } else {
                    if (index < length - 1 && type !== "object" && type !== "array") {
                        currentContext[name] = Util.isArray(val) && [] || {};
                    } else {
                        if (type !== "object" && type !== "array" && valType !== "object" && valType !== "array") {
                            currentContext[name] = val;
                        }
                    }
                }
                return currentContext[name];
            }
            if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
            for (i = 0, len = parts.length; i < len; i++) {
                if (i === 0 && parts[i] === "this") continue;
                if (/^(xindex|xcount|xkey)$/.test(parts[i])) continue;
                if (i === 0 && len === 1 && parts[i] in helpers) continue;
                options.__path.push(parts[i]);
                cur = parts[i];
                def = i === len - 1 ? other.def !== undefined ? other.def : context[0][cur] : {};
                val = this.val(cur, options, context, def);
                if (Mock4XTpl.debug) {
                    console.log("[def    ]", JSON.stringify(def));
                    console.log("[val    ]", JSON.stringify(val));
                }
                val = fix(currentContext, i, len, cur, val);
                if (Util.isObjectOrArray(currentContext[cur])) {
                    context.unshift(currentContext = currentContext[cur]);
                }
            }
            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context, cur, val)) {
                context.splice(0, context.length - contextLength);
            }
        };
    }).call(this);
}).call(this);