(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tools"] = factory();
	else
		root["tools"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var tools = __webpack_require__(1);
	exports.tools = tools;
	__export(__webpack_require__(2));
	__export(__webpack_require__(3));
	var eventsApi = __webpack_require__(4);
	exports.eventsApi = eventsApi;
	var mixins_2 = __webpack_require__(2);
	Object.extend = function (protoProps, staticProps) { return mixins_2.Mixable.extend(protoProps, staticProps); };
	Object.assign || (Object.assign = tools.assign);
	Object.log = tools.log;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var Log = (function () {
	    function Log() {
	        this.stops = {};
	        this.throws = {};
	        this.logger = typeof console !== 'undefined' ? console : null;
	        this.reset();
	    }
	    Log.prototype.doLogging = function (type, args) {
	        var logger = this.logger, logMethod = logger && logger[type];
	        if (logMethod)
	            logMethod.apply(logger, args);
	        if (this.stops[type])
	            debugger;
	        if (this.throws[type])
	            throw new Error("[" + type + "] " + args[0]);
	        this.counts[type]++;
	    };
	    Log.prototype.reset = function () {
	        this.level = 2;
	        this.counts = { error: 0, warn: 0, info: 0, debug: 0 };
	        this.stops = {};
	        return this;
	    };
	    Log.prototype.developer = function (trueDeveloper) {
	        this.level = 3;
	        this.stops = { error: true, warn: Boolean(trueDeveloper) };
	        return this;
	    };
	    Log.prototype.error = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (this.level > 0)
	            this.doLogging('error', args);
	    };
	    Log.prototype.warn = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (this.level > 1)
	            this.doLogging('warn', args);
	    };
	    Log.prototype.info = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (this.level > 2)
	            this.doLogging('info', args);
	    };
	    Log.prototype.debug = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (this.level > 3)
	            this.doLogging('debug', args);
	    };
	    Object.defineProperty(Log.prototype, "state", {
	        get: function () {
	            return ("\nObject.log - Object+ Logging and Debugging Utility\n--------------------------------------------------\nObject.log.counts: Number of logged events by type\n    { errors : " + this.counts.error + ", warns : " + this.counts.warn + ", info : " + this.counts.info + ", debug : " + this.counts.debug + " }\n\nObject.log.level == " + this.level + " : Ignore events which are above specified level \n    - 0 - logging is off;\n    - 1 - Object.log.error(...) only;\n    - 2 - .error() and .warn();\n    - 3 - .error(), .warn(), and .info();\n    - 4 - all of above plus .debug().\n\nObject.log.stops: Stops in debugger for some certain event types\n     { error : " + (this.stops.error || false) + ", warn  : " + (this.stops.warn || false) + ", info  : " + (this.stops.info || false) + ", debug : " + (this.stops.debug || false) + " } \n\nObject.log.throws: Throws expection on some certain event types\n     { error : " + (this.throws.error || false) + ", warn  : " + (this.throws.warn || false) + ", info  : " + (this.throws.info || false) + ", debug : " + (this.throws.debug || false) + " }\n");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Log;
	}());
	exports.Log = Log;
	exports.log = new Log();
	function isValidJSON(value) {
	    if (value === null) {
	        return true;
	    }
	    switch (typeof value) {
	        case 'number':
	        case 'string':
	        case 'boolean':
	            return true;
	        case 'object':
	            var proto = Object.getPrototypeOf(value);
	            if (proto === Object.prototype || proto === Array.prototype) {
	                return every(value, isValidJSON);
	            }
	    }
	    return false;
	}
	exports.isValidJSON = isValidJSON;
	function getBaseClass(Class) {
	    return Object.getPrototypeOf(Class.prototype).constructor;
	}
	exports.getBaseClass = getBaseClass;
	function getChangedStatics(Ctor) {
	    var names = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        names[_i - 1] = arguments[_i];
	    }
	    var Base = getBaseClass(Ctor), props = {};
	    for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
	        var name_1 = names_1[_a];
	        var value = Ctor[name_1];
	        if (value !== void 0 && value !== Base[name_1]) {
	            props[name_1] = value;
	        }
	    }
	    return props;
	}
	exports.getChangedStatics = getChangedStatics;
	function isEmpty(obj) {
	    if (obj) {
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                return false;
	            }
	        }
	    }
	    return true;
	}
	exports.isEmpty = isEmpty;
	function someArray(arr, fun) {
	    var result;
	    for (var i = 0; i < arr.length; i++) {
	        if (result = fun(arr[i], i)) {
	            return result;
	        }
	    }
	}
	function someObject(obj, fun) {
	    var result;
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            if (result = fun(obj[key], key)) {
	                return result;
	            }
	        }
	    }
	}
	function some(obj, fun) {
	    if (Object.getPrototypeOf(obj) === ArrayProto) {
	        return someArray(obj, fun);
	    }
	    else {
	        return someObject(obj, fun);
	    }
	}
	exports.some = some;
	function every(obj, predicate) {
	    return !some(obj, function (x) { return !predicate(x); });
	}
	exports.every = every;
	function getPropertyDescriptor(obj, prop) {
	    var desc;
	    for (var proto = obj; !desc && proto; proto = Object.getPrototypeOf(proto)) {
	        desc = Object.getOwnPropertyDescriptor(obj, prop);
	    }
	    return desc;
	}
	exports.getPropertyDescriptor = getPropertyDescriptor;
	function omit(source) {
	    var dest = {}, discard = {};
	    for (var i = 1; i < arguments.length; i++) {
	        discard[arguments[i]] = true;
	    }
	    for (var name in source) {
	        if (!discard[name] && source.hasOwnProperty(name)) {
	            dest[name] = source[name];
	        }
	    }
	    return dest;
	}
	exports.omit = omit;
	function transform(dest, source, fun) {
	    for (var name in source) {
	        if (source.hasOwnProperty(name)) {
	            var value = fun(source[name], name);
	            value === void 0 || (dest[name] = value);
	        }
	    }
	    return dest;
	}
	exports.transform = transform;
	function fastAssign(dest, source) {
	    for (var name in source) {
	        dest[name] = source[name];
	    }
	    return dest;
	}
	exports.fastAssign = fastAssign;
	function fastDefaults(dest, source) {
	    for (var name in source) {
	        if (dest[name] === void 0) {
	            dest[name] = source[name];
	        }
	    }
	    return dest;
	}
	exports.fastDefaults = fastDefaults;
	function assign(dest, source) {
	    for (var name in source) {
	        if (source.hasOwnProperty(name)) {
	            dest[name] = source[name];
	        }
	    }
	    if (arguments.length > 2) {
	        for (var i = 2; i < arguments.length; i++) {
	            var other = arguments[i];
	            other && assign(dest, other);
	        }
	    }
	    return dest;
	}
	exports.assign = assign;
	function defaults(dest, source) {
	    for (var name in source) {
	        if (source.hasOwnProperty(name) && dest[name] === void 0) {
	            dest[name] = source[name];
	        }
	    }
	    if (arguments.length > 2) {
	        for (var i = 2; i < arguments.length; i++) {
	            var other = arguments[i];
	            other && defaults(dest, other);
	        }
	    }
	    return dest;
	}
	exports.defaults = defaults;
	function keys(o) {
	    return o ? Object.keys(o) : [];
	}
	exports.keys = keys;
	function once(func) {
	    var memo, first = true;
	    return function () {
	        if (first) {
	            first = false;
	            memo = func.apply(this, arguments);
	            func = null;
	        }
	        return memo;
	    };
	}
	exports.once = once;
	var ArrayProto = Array.prototype, DateProto = Date.prototype, ObjectProto = Object.prototype;
	function notEqual(a, b) {
	    if (a === b)
	        return false;
	    if (a && b && typeof a == 'object' && typeof b == 'object') {
	        var protoA = Object.getPrototypeOf(a);
	        if (protoA !== Object.getPrototypeOf(b))
	            return true;
	        switch (protoA) {
	            case DateProto: return +a !== +b;
	            case ArrayProto: return arraysNotEqual(a, b);
	            case ObjectProto:
	            case null:
	                return objectsNotEqual(a, b);
	        }
	    }
	    return true;
	}
	exports.notEqual = notEqual;
	function objectsNotEqual(a, b) {
	    var keysA = Object.keys(a);
	    if (keysA.length !== Object.keys(b).length)
	        return true;
	    for (var i = 0; i < keysA.length; i++) {
	        var key = keysA[i];
	        if (!b.hasOwnProperty(key) || notEqual(a[key], b[key])) {
	            return true;
	        }
	    }
	    return false;
	}
	function arraysNotEqual(a, b) {
	    if (a.length !== b.length)
	        return true;
	    for (var i = 0; i < a.length; i++) {
	        if (notEqual(a[i], b[i]))
	            return true;
	    }
	    return false;
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tools_1 = __webpack_require__(1);
	var Mixable = (function () {
	    function Mixable() {
	    }
	    Mixable.create = function (a, b) {
	        return new this(a, b);
	    };
	    Mixable.mixins = function () {
	        var mixins = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            mixins[_i - 0] = arguments[_i];
	        }
	        var proto = this.prototype, mergeRules = this._mixinRules || {}, _appliedMixins = this._appliedMixins = (this._appliedMixins || []).slice();
	        for (var _a = 0, mixins_1 = mixins; _a < mixins_1.length; _a++) {
	            var mixin = mixins_1[_a];
	            if (mixin instanceof Array) {
	                return Mixable.mixins.apply(this, mixin);
	            }
	            if (_appliedMixins.indexOf(mixin) >= 0)
	                continue;
	            _appliedMixins.push(mixin);
	            if (typeof mixin === 'function') {
	                tools_1.defaults(this, mixin);
	                mergeProps(proto, mixin.prototype, mergeRules);
	            }
	            else {
	                mergeProps(proto, mixin, mergeRules);
	            }
	        }
	        return this;
	    };
	    Mixable.mixTo = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
	            var Ctor = args_1[_a];
	            Mixable.mixins.call(Ctor, this);
	        }
	        return this;
	    };
	    Mixable.mixinRules = function (mixinRules) {
	        var Base = Object.getPrototypeOf(this.prototype).constructor;
	        if (Base._mixinRules) {
	            mergeProps(mixinRules, Base._mixinRules);
	        }
	        this._mixinRules = mixinRules;
	        return this;
	    };
	    Mixable.define = function (definition, staticProps) {
	        if (definition === void 0) { definition = {}; }
	        if (!this.define) {
	            tools_1.log.error("[Class.define] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
	            return this;
	        }
	        this.predefine();
	        var proto = this.prototype;
	        var protoProps = tools_1.omit(definition, 'properties', 'mixins', 'mixinRules'), _a = definition.properties, properties = _a === void 0 ? {} : _a, mixins = definition.mixins, mixinRules = definition.mixinRules;
	        tools_1.assign(proto, protoProps);
	        tools_1.assign(this, staticProps);
	        properties && Object.defineProperties(proto, tools_1.transform({}, properties, toPropertyDescriptor));
	        mixinRules && this.mixinRules(mixinRules);
	        mixins && this.mixins(mixins);
	        return this;
	    };
	    Mixable.extend = function (spec, statics) {
	        var Subclass;
	        if (spec && spec.hasOwnProperty('constructor')) {
	            Subclass = spec.constructor;
	            __extends(Subclass, this);
	        }
	        else {
	            Subclass = (function (_super) {
	                __extends(Subclass, _super);
	                function Subclass() {
	                    _super.apply(this, arguments);
	                }
	                return Subclass;
	            }(this));
	        }
	        return spec ? Subclass.define(spec, statics) : Subclass.predefine();
	    };
	    Mixable.predefine = function () {
	        var BaseClass = tools_1.getBaseClass(this);
	        if (BaseClass.create === this.create) {
	            this.create = Mixable.create;
	        }
	        this.__super__ = BaseClass.prototype;
	        return this;
	    };
	    Mixable._mixinRules = { properties: 'merge' };
	    return Mixable;
	}());
	exports.Mixable = Mixable;
	function toPropertyDescriptor(x) {
	    if (x) {
	        return typeof x === 'function' ? { get: x } : x;
	    }
	}
	function mixinRules(rules) {
	    return createDecorator('mixinRules', rules);
	}
	exports.mixinRules = mixinRules;
	function mixins() {
	    var list = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        list[_i - 0] = arguments[_i];
	    }
	    return createDecorator('mixins', list);
	}
	exports.mixins = mixins;
	function extendable(Type) {
	    Mixable.mixTo(Type);
	}
	exports.extendable = extendable;
	function predefine(Constructor) {
	    Constructor.predefine();
	}
	exports.predefine = predefine;
	function define(spec) {
	    if (typeof spec === 'function') {
	        spec.define({});
	    }
	    else {
	        return createDecorator('define', spec);
	    }
	}
	exports.define = define;
	function createDecorator(name, spec) {
	    return function (Ctor) {
	        if (Ctor[name]) {
	            Ctor[name](spec);
	        }
	        else {
	            Mixable[name].call(Ctor, spec);
	        }
	    };
	}
	function mergeObjects(a, b, rules) {
	    var x = tools_1.assign({}, a);
	    return mergeProps(x, b, rules);
	}
	var mergeFunctions = {
	    pipe: function (a, b) {
	        return function (x) {
	            return a.call(this, b.call(this, x));
	        };
	    },
	    sequence: function (a, b) {
	        return function () {
	            a.apply(this, arguments);
	            b.apply(this, arguments);
	        };
	    },
	    reverse: function (a, b) {
	        return function () {
	            b.apply(this, arguments);
	            a.apply(this, arguments);
	        };
	    },
	    every: function (a, b) {
	        return function () {
	            return a.apply(this, arguments) && b.apply(this, arguments);
	        };
	    },
	    some: function (a, b) {
	        return function () {
	            return a.apply(this, arguments) || b.apply(this, arguments);
	        };
	    }
	};
	function mergeProps(target, source, rules) {
	    if (rules === void 0) { rules = {}; }
	    for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
	        var name_1 = _a[_i];
	        if (name_1 === 'constructor')
	            continue;
	        var sourceProp = Object.getOwnPropertyDescriptor(source, name_1), destProp = tools_1.getPropertyDescriptor(target, name_1);
	        if (destProp) {
	            var rule = rules[name_1], value = destProp.value;
	            if (rule && value) {
	                target[name_1] = typeof rule === 'object' ?
	                    mergeObjects(value, sourceProp.value, rule) : (rule === 'merge' ?
	                    mergeObjects(value, sourceProp.value) :
	                    mergeFunctions[rule](value, sourceProp.value));
	            }
	        }
	        else {
	            Object.defineProperty(target, name_1, sourceProp);
	        }
	    }
	    return target;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var Mixins = __webpack_require__(2);
	var tools = __webpack_require__(1);
	var _eventsApi = __webpack_require__(4);
	var events_api_1 = __webpack_require__(4);
	exports.EventMap = events_api_1.EventMap;
	var mixins = Mixins.mixins, define = Mixins.define, extendable = Mixins.extendable, omit = tools.omit, once = tools.once, isEmpty = tools.isEmpty, keys = tools.keys, EventHandler = _eventsApi.EventHandler, trigger0 = _eventsApi.trigger0, trigger1 = _eventsApi.trigger1, trigger2 = _eventsApi.trigger2, trigger3 = _eventsApi.trigger3;
	var eventSplitter = /\s+/;
	var _idCount = 0;
	function uniqueId() {
	    return 'l' + _idCount++;
	}
	var Messenger = (function () {
	    function Messenger() {
	        this._events = void 0;
	        this._listeners = void 0;
	        this._listeningTo = void 0;
	        this.cid = uniqueId();
	        this.initialize.apply(this, arguments);
	    }
	    Messenger.define = function (protoProps, staticProps) {
	        var spec = omit(protoProps || {}, 'localEvents');
	        if (protoProps) {
	            var localEvents = protoProps.localEvents, _localEvents = protoProps._localEvents;
	            if (localEvents || _localEvents) {
	                var eventsMap = new events_api_1.EventMap(this.prototype._localEvents);
	                localEvents && eventsMap.addEventsMap(localEvents);
	                _localEvents && eventsMap.merge(_localEvents);
	                spec._localEvents = eventsMap;
	            }
	        }
	        return Mixins.Mixable.define.call(this, spec, staticProps);
	    };
	    Messenger.prototype.initialize = function () { };
	    Messenger.prototype.on = function (name, callback, context) {
	        return internalOn(this, name, callback, context);
	    };
	    Messenger.prototype.off = function (name, callback, context) {
	        if (!this._events)
	            return this;
	        this._events = eventsApi(offApi, this._events, name, callback, new OffOptions(context, this._listeners));
	        return this;
	    };
	    Messenger.prototype.stopListening = function (obj, name, callback) {
	        var listeningTo = this._listeningTo;
	        if (!listeningTo)
	            return this;
	        var ids = obj ? [obj.cid] : keys(listeningTo);
	        for (var i = 0; i < ids.length; i++) {
	            var listening = listeningTo[ids[i]];
	            if (!listening)
	                break;
	            listening.obj.off(name, callback, this);
	        }
	        if (isEmpty(listeningTo))
	            this._listeningTo = void 0;
	        return this;
	    };
	    Messenger.prototype.listenTo = function (obj, name, callback) {
	        if (!obj)
	            return this;
	        var id = obj.cid || (obj.cid = uniqueId()), listeningTo = this._listeningTo || (this._listeningTo = {});
	        var listening = listeningTo[id];
	        if (!listening) {
	            var thisId = this.cid || (this.cid = uniqueId());
	            listening = listeningTo[id] = new ListeningTo(obj, id, thisId, listeningTo);
	        }
	        internalOn(obj, name, callback, this, listening);
	        return this;
	    };
	    Messenger.prototype.once = function (name, callback, context) {
	        var events = eventsApi(onceMap, {}, name, callback, this.off.bind(this));
	        return this.on(events, void 0, context);
	    };
	    Messenger.prototype.listenToOnce = function (obj, name, callback) {
	        var events = eventsApi(onceMap, {}, name, callback, this.stopListening.bind(this, obj));
	        return this.listenTo(obj, events);
	    };
	    Messenger.prototype.trigger = function (name, a, b, c) {
	        if (!this._events)
	            return this;
	        switch (arguments.length) {
	            case 1:
	                trigger0(this, name);
	                break;
	            case 2:
	                trigger1(this, name, a);
	                break;
	            case 3:
	                trigger2(this, name, a, b);
	                break;
	            case 4:
	                trigger3(this, name, a, b, c);
	                break;
	            default:
	                var allArgs = Array(arguments.length);
	                for (var i = 0; i < allArgs.length; i++) {
	                    allArgs[i] = arguments[i];
	                }
	                var _events = this._events;
	                var queue = _events[name];
	                if (queue)
	                    _fireEventAll(queue, allArgs.splice(0, 1));
	                if (queue = _events.all)
	                    _fireEventAll(queue, allArgs);
	        }
	        return this;
	    };
	    Messenger.prototype.dispose = function () {
	        this.stopListening();
	        this.off();
	    };
	    Messenger = __decorate([
	        extendable
	    ], Messenger);
	    return Messenger;
	}());
	exports.Messenger = Messenger;
	var slice = Array.prototype.slice;
	exports.Events = omit(Messenger.prototype, 'constructor', 'initialize');
	function eventsApi(iteratee, events, name, callback, opts) {
	    var i = 0, names;
	    if (name && typeof name === 'object') {
	        if (callback !== void 0 && 'context' in opts && opts.context === void 0)
	            opts.context = callback;
	        for (names = keys(name); i < names.length; i++) {
	            events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	        }
	    }
	    else if (name && eventSplitter.test(name)) {
	        for (names = name.split(eventSplitter); i < names.length; i++) {
	            events = iteratee(events, names[i], callback, opts);
	        }
	    }
	    else {
	        events = iteratee(events, name, callback, opts);
	    }
	    return events;
	}
	;
	var ListeningTo = (function () {
	    function ListeningTo(obj, objId, id, listeningTo) {
	        this.obj = obj;
	        this.objId = objId;
	        this.id = id;
	        this.listeningTo = listeningTo;
	        this.count = 0;
	    }
	    return ListeningTo;
	}());
	function internalOn(obj, name, callback, context, listening) {
	    obj._events = eventsApi(onApi, obj._events || {}, name, callback, new EventHandler(context, obj, listening));
	    if (listening) {
	        var listeners = obj._listeners || (obj._listeners = {});
	        listeners[listening.id] = listening;
	    }
	    return obj;
	}
	;
	function onApi(events, name, callback, options) {
	    if (callback) {
	        var handlers = events[name], toAdd = [options.clone(callback)];
	        events[name] = handlers ? handlers.concat(toAdd) : toAdd;
	    }
	    return events;
	}
	;
	var OffOptions = (function () {
	    function OffOptions(context, listeners) {
	        this.context = context;
	        this.listeners = listeners;
	    }
	    return OffOptions;
	}());
	function offApi(events, name, callback, options) {
	    if (!events)
	        return;
	    var i = 0, listening;
	    var context = options.context, listeners = options.listeners;
	    if (!name && !callback && !context) {
	        var ids = keys(listeners);
	        for (; i < ids.length; i++) {
	            listening = listeners[ids[i]];
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	        }
	        return {};
	    }
	    var names = name ? [name] : keys(events);
	    for (; i < names.length; i++) {
	        name = names[i];
	        var handlers = events[name];
	        if (!handlers)
	            break;
	        var remaining = [];
	        for (var j = 0; j < handlers.length; j++) {
	            var handler = handlers[j];
	            if (callback && callback !== handler.callback &&
	                callback !== handler.callback._callback ||
	                context && context !== handler.context) {
	                remaining.push(handler);
	            }
	            else {
	                listening = handler.listening;
	                if (listening && --listening.count === 0) {
	                    delete listeners[listening.id];
	                    delete listening.listeningTo[listening.objId];
	                }
	            }
	        }
	        if (remaining.length) {
	            events[name] = remaining;
	        }
	        else {
	            delete events[name];
	        }
	    }
	    return events;
	}
	;
	function onceMap(map, name, callback, offer) {
	    if (callback) {
	        var _once_1 = map[name] = once(function () {
	            offer(name, _once_1);
	            callback.apply(this, arguments);
	        });
	        _once_1._callback = callback;
	    }
	    return map;
	}
	;
	function _fireEventAll(events, a) {
	    for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
	        var ev = events_1[_i];
	        ev.callback.call(ev.ctx, a);
	    }
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	exports.eventSplitter = /\s+/;
	var EventHandler = (function () {
	    function EventHandler(context, ctx, listening, callback) {
	        this.context = context;
	        this.ctx = ctx;
	        this.listening = listening;
	        this.callback = callback;
	    }
	    EventHandler.prototype.clone = function (callback) {
	        var _a = this, context = _a.context, listening = _a.listening;
	        if (listening)
	            listening.count++;
	        return new EventHandler(context, context || this.ctx, listening, callback);
	    };
	    return EventHandler;
	}());
	exports.EventHandler = EventHandler;
	var EventMap = (function () {
	    function EventMap(map) {
	        this.handlers = [];
	        if (map) {
	            if (map instanceof EventMap) {
	                this.handlers = map.handlers.slice();
	            }
	            else {
	                map && this.addEventsMap(map);
	            }
	        }
	    }
	    EventMap.prototype.merge = function (map) {
	        this.handlers = this.handlers.concat(map.handlers);
	    };
	    EventMap.prototype.addEventsMap = function (map) {
	        for (var names in map) {
	            this.addEvent(names, map[names]);
	        }
	    };
	    EventMap.prototype.bubbleEvents = function (names) {
	        for (var _i = 0, _a = names.split(exports.eventSplitter); _i < _a.length; _i++) {
	            var name_1 = _a[_i];
	            this.addEvent(name_1, getBubblingHandler(name_1));
	        }
	    };
	    EventMap.prototype.addEvent = function (names, callback) {
	        var handlers = this.handlers;
	        for (var _i = 0, _a = names.split(exports.eventSplitter); _i < _a.length; _i++) {
	            var name_2 = _a[_i];
	            handlers.push(new EventDescriptor(name_2, callback));
	        }
	    };
	    EventMap.prototype.subscribe = function (target, source) {
	        var _events = source._events || (source._events = {});
	        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
	            var event_1 = _a[_i];
	            _on(_events, event_1.name, event_1.callback, target);
	        }
	    };
	    EventMap.prototype.unsubscribe = function (target, source) {
	        var _events = source._events;
	        if (_events) {
	            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
	                var event_2 = _a[_i];
	                _off(_events, event_2.name, event_2.callback, target);
	            }
	        }
	    };
	    return EventMap;
	}());
	exports.EventMap = EventMap;
	var EventDescriptor = (function () {
	    function EventDescriptor(name, callback) {
	        this.name = name;
	        if (callback === true) {
	            this.callback = getBubblingHandler(name);
	        }
	        else if (typeof callback === 'string') {
	            this.callback =
	                function localCallback() {
	                    var handler = this[callback];
	                    handler && handler.apply(this, arguments);
	                };
	        }
	        else {
	            this.callback = callback;
	        }
	    }
	    return EventDescriptor;
	}());
	function on(self, name, callback, context) {
	    var _events = self._events || (self._events = {});
	    _on(_events, name, callback, context);
	}
	exports.on = on;
	function off(self, name, callback, context) {
	    var _events = self._events;
	    _events && _off(_events, name, callback, context);
	}
	exports.off = off;
	function trigger0(self, name) {
	    var _events = self._events;
	    if (_events) {
	        var queue = _events[name], all = _events.all;
	        if (queue)
	            _fireEvent0(queue);
	        if (all)
	            _fireEvent1(all, name);
	    }
	}
	exports.trigger0 = trigger0;
	;
	function trigger1(self, name, a) {
	    var _events = self._events;
	    if (_events) {
	        var queue = _events[name], all = _events.all;
	        if (queue)
	            _fireEvent1(queue, a);
	        if (all)
	            _fireEvent2(all, name, a);
	    }
	}
	exports.trigger1 = trigger1;
	;
	function trigger2(self, name, a, b) {
	    var _events = self._events;
	    if (_events) {
	        var queue = _events[name], all = _events.all;
	        if (queue)
	            _fireEvent2(queue, a, b);
	        if (all)
	            _fireEvent3(all, name, a, b);
	    }
	}
	exports.trigger2 = trigger2;
	;
	function trigger3(self, name, a, b, c) {
	    var _events = self._events;
	    if (_events) {
	        var queue = _events[name], all = _events.all;
	        if (queue)
	            _fireEvent3(queue, a, b, c);
	        if (all)
	            _fireEvent4(all, name, a, b, c);
	    }
	}
	exports.trigger3 = trigger3;
	;
	function _fireEvent0(events) {
	    for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
	        var ev = events_1[_i];
	        ev.callback.call(ev.ctx);
	    }
	}
	function _fireEvent1(events, a) {
	    for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
	        var ev = events_2[_i];
	        ev.callback.call(ev.ctx, a);
	    }
	}
	function _fireEvent2(events, a, b) {
	    for (var _i = 0, events_3 = events; _i < events_3.length; _i++) {
	        var ev = events_3[_i];
	        ev.callback.call(ev.ctx, a, b);
	    }
	}
	function _fireEvent3(events, a, b, c) {
	    for (var _i = 0, events_4 = events; _i < events_4.length; _i++) {
	        var ev = events_4[_i];
	        ev.callback.call(ev.ctx, a, b, c);
	    }
	}
	function _fireEvent4(events, a, b, c, d) {
	    for (var _i = 0, events_5 = events; _i < events_5.length; _i++) {
	        var ev = events_5[_i];
	        ev.callback.call(ev.ctx, a, b, c, d);
	    }
	}
	function _on(_events, name, callback, context, ctx) {
	    var events = _events[name], handler = new EventHandler(context, ctx || context, null, callback);
	    if (events) {
	        events.push(handler);
	    }
	    else {
	        _events[name] = [handler];
	    }
	}
	;
	function _off(_events, name, callback, context) {
	    var events = _events[name];
	    if (events) {
	        var retain = [];
	        for (var _i = 0, events_6 = events; _i < events_6.length; _i++) {
	            var ev = events_6[_i];
	            if ((callback && callback !== ev.callback) || context !== ev.context) {
	                retain.push(ev);
	            }
	        }
	        _events[name] = retain.length ? retain : void 0;
	    }
	}
	;
	var _bubblingHandlers = {};
	function getBubblingHandler(event) {
	    return _bubblingHandlers[event] || (_bubblingHandlers[event] = function (a, b, c) {
	        switch (arguments.length) {
	            case 0:
	                trigger0(this, event);
	                break;
	            case 1:
	                trigger1(this, event, a);
	                break;
	            case 2:
	                trigger2(this, event, a, b);
	                break;
	            case 3:
	                trigger3(this, event, a, b, c);
	                break;
	            default:
	                var args = [event, a, b, c];
	                for (var i = 3; i < arguments.length; i++) {
	                    args.push(arguments[i]);
	                }
	                this.trigger.apply(this, args);
	        }
	    });
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map