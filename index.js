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
	        desc = Object.getOwnPropertyDescriptor(proto, prop);
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
	        if (!discard.hasOwnProperty(name) && source.hasOwnProperty(name)) {
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
	        if (source.hasOwnProperty(name) && !dest.hasOwnProperty(name)) {
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
	Object.setPrototypeOf || (Object.setPrototypeOf = defaults);
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
	        this.initialize.apply(this, arguments);
	    }
	    Mixable.prototype.initialize = function () { };
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
	            tools_1.log.error("[Class Defininition] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
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
	                __extends(_Subclass, _super);
	                function _Subclass() {
	                    _super.apply(this, arguments);
	                }
	                return _Subclass;
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
	    mergeSequence: function (a, b) {
	        return function () {
	            return tools_1.defaults(a.call(this), b.call(this));
	        };
	    },
	    overwrite: function (a, b) {
	        return b;
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
	        var sourceProp = Object.getOwnPropertyDescriptor(source, name_1), destProp = tools_1.getPropertyDescriptor(target, name_1), value = destProp && destProp.value;
	        if (value != null) {
	            var rule = rules[name_1];
	            if (rule) {
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
	exports.mergeProps = mergeProps;


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
	var tools_1 = __webpack_require__(1);
	var eventsource_1 = __webpack_require__(4);
	exports.EventMap = eventsource_1.EventMap;
	var _eventsApi = __webpack_require__(4);
	var mixins = Mixins.mixins, define = Mixins.define, extendable = Mixins.extendable, EventHandler = _eventsApi.EventHandler, strings = _eventsApi.strings, on = _eventsApi.on, off = _eventsApi.off, once = _eventsApi.once, trigger5 = _eventsApi.trigger5, trigger2 = _eventsApi.trigger2, trigger3 = _eventsApi.trigger3;
	var eventSplitter = /\s+/;
	var _idCount = 0;
	function uniqueId() {
	    return 'l' + _idCount++;
	}
	var Messenger = (function () {
	    function Messenger() {
	        this._events = void 0;
	        this._listeningTo = void 0;
	        this.cid = uniqueId();
	        this.initialize.apply(this, arguments);
	    }
	    Messenger.prototype.initialize = function () { };
	    Messenger.define = function (protoProps, staticProps) {
	        var spec = tools_1.omit(protoProps || {}, 'localEvents');
	        if (protoProps) {
	            var localEvents = protoProps.localEvents, _localEvents = protoProps._localEvents;
	            if (localEvents || _localEvents) {
	                var eventsMap = new eventsource_1.EventMap(this.prototype._localEvents);
	                localEvents && eventsMap.addEventsMap(localEvents);
	                _localEvents && eventsMap.merge(_localEvents);
	                spec._localEvents = eventsMap;
	            }
	        }
	        return Mixins.Mixable.define.call(this, spec, staticProps);
	    };
	    Messenger.prototype.on = function (events, callback, context) {
	        if (typeof events === 'string')
	            strings(on, this, events, callback, context);
	        else
	            for (var name_1 in events)
	                strings(on, this, name_1, events[name_1], context || callback);
	        return this;
	    };
	    Messenger.prototype.once = function (events, callback, context) {
	        if (typeof events === 'string')
	            strings(once, this, events, callback, context);
	        else
	            for (var name_2 in events)
	                strings(once, this, name_2, events[name_2], context || callback);
	        return this;
	    };
	    Messenger.prototype.off = function (events, callback, context) {
	        if (!events)
	            off(this, void 0, callback, context);
	        else if (typeof events === 'string')
	            strings(off, this, events, callback, context);
	        else
	            for (var name_3 in events)
	                strings(off, this, name_3, events[name_3], context || callback);
	        return this;
	    };
	    Messenger.prototype.trigger = function (name, a, b, c, d, e) {
	        if (d !== void 0 || e !== void 0)
	            trigger5(this, name, a, b, c, d, e);
	        if (c !== void 0)
	            trigger3(this, name, a, b, c);
	        else
	            trigger2(this, name, a, b);
	        return this;
	    };
	    Messenger.prototype.listenTo = function (source, a, b) {
	        addReference(this, source);
	        source.on(a, !b && typeof a === 'object' ? this : b, this);
	        return this;
	    };
	    Messenger.prototype.listenToOnce = function (source, a, b) {
	        addReference(this, source);
	        source.once(a, !b && typeof a === 'object' ? this : b, this);
	        return this;
	    };
	    Messenger.prototype.stopListening = function (a_source, a, b) {
	        var _listeningTo = this._listeningTo;
	        if (_listeningTo) {
	            var removeAll = !(a || b), second = !b && typeof a === 'object' ? this : b;
	            if (a_source) {
	                var source = _listeningTo[a_source.cid];
	                if (source) {
	                    if (removeAll)
	                        delete _listeningTo[a_source.cid];
	                    source.off(a, second, this);
	                }
	            }
	            else {
	                for (var cid in _listeningTo)
	                    _listeningTo[cid].off(a, second, this);
	                if (removeAll)
	                    (this._listeningTo = void 0);
	            }
	        }
	        return this;
	    };
	    Messenger.prototype.dispose = function () {
	        if (this._disposed)
	            return;
	        this.stopListening();
	        this.off();
	        this._disposed = true;
	    };
	    Messenger = __decorate([
	        extendable
	    ], Messenger);
	    return Messenger;
	}());
	exports.Messenger = Messenger;
	var slice = Array.prototype.slice;
	exports.Events = tools_1.omit(Messenger.prototype, 'constructor', 'initialize');
	function addReference(listener, source) {
	    var listeningTo = listener._listeningTo || (listener._listeningTo = Object.create(null)), cid = source.cid || (source.cid = uniqueId());
	    listeningTo[cid] = source;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tools_1 = __webpack_require__(1);
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
	        for (var _i = 0, _a = names.split(eventSplitter); _i < _a.length; _i++) {
	            var name_1 = _a[_i];
	            this.addEvent(name_1, getBubblingHandler(name_1));
	        }
	    };
	    EventMap.prototype.addEvent = function (names, callback) {
	        var handlers = this.handlers;
	        for (var _i = 0, _a = names.split(eventSplitter); _i < _a.length; _i++) {
	            var name_2 = _a[_i];
	            handlers.push(new EventDescriptor(name_2, callback));
	        }
	    };
	    EventMap.prototype.subscribe = function (target, source) {
	        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
	            var event_1 = _a[_i];
	            on(source, event_1.name, event_1.callback, target);
	        }
	    };
	    EventMap.prototype.unsubscribe = function (target, source) {
	        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
	            var event_2 = _a[_i];
	            off(source, event_2.name, event_2.callback, target);
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
	var _bubblingHandlers = {};
	function getBubblingHandler(event) {
	    return _bubblingHandlers[event] || (_bubblingHandlers[event] = function (a, b, c, d, e) {
	        if (d !== void 0 || e !== void 0)
	            trigger5(this, event, a, b, c, d, e);
	        if (c !== void 0)
	            trigger3(this, event, a, b, c);
	        else
	            trigger2(this, event, a, b);
	    });
	}
	var EventHandler = (function () {
	    function EventHandler(callback, context, next) {
	        if (next === void 0) { next = null; }
	        this.callback = callback;
	        this.context = context;
	        this.next = next;
	    }
	    return EventHandler;
	}());
	exports.EventHandler = EventHandler;
	function listOff(_events, name, callback, context) {
	    var head = _events[name];
	    var filteredHead, prev;
	    for (var ev = head; ev; ev = ev.next) {
	        if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
	            (context && context !== ev.context)) {
	            prev = ev;
	            filteredHead || (filteredHead = ev);
	        }
	        else {
	            if (prev)
	                prev.next = ev.next;
	        }
	    }
	    if (head !== filteredHead)
	        _events[name] = filteredHead;
	}
	function listSend2(head, a, b) {
	    for (var ev = head; ev; ev = ev.next)
	        ev.callback.call(ev.context, a, b);
	}
	function listSend3(head, a, b, c) {
	    for (var ev = head; ev; ev = ev.next)
	        ev.callback.call(ev.context, a, b, c);
	}
	function listSend4(head, a, b, c, d) {
	    for (var ev = head; ev; ev = ev.next)
	        ev.callback.call(ev.context, a, b, c, d);
	}
	function listSend5(head, a, b, c, d, e) {
	    for (var ev = head; ev; ev = ev.next)
	        ev.callback.call(ev.context, a, b, c, d, e);
	}
	function listSend6(head, a, b, c, d, e, f) {
	    for (var ev = head; ev; ev = ev.next)
	        ev.callback.call(ev.context, a, b, c, d, e, f);
	}
	function on(source, name, callback, context) {
	    if (callback) {
	        var _events = source._events || (source._events = Object.create(null));
	        _events[name] = new EventHandler(callback, context, _events[name]);
	    }
	}
	exports.on = on;
	function once(source, name, callback, context) {
	    if (callback) {
	        var once_1 = tools_1.once(function () {
	            off(source, name, once_1);
	            callback.apply(this, arguments);
	        });
	        once_1._callback = callback;
	        on(source, name, once_1, context);
	    }
	}
	exports.once = once;
	function off(source, name, callback, context) {
	    var _events = source._events;
	    if (_events) {
	        if (callback || context) {
	            if (name) {
	                listOff(_events, name, callback, context);
	            }
	            else {
	                for (var name_3 in _events) {
	                    listOff(_events, name_3, callback, context);
	                }
	            }
	        }
	        else if (name) {
	            _events[name] = void 0;
	        }
	        else {
	            source._events = void 0;
	        }
	    }
	}
	exports.off = off;
	var eventSplitter = /\s+/;
	function strings(api, source, events, callback, context) {
	    if (eventSplitter.test(events)) {
	        var names = events.split(eventSplitter);
	        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
	            var name_4 = names_1[_i];
	            api(source, name_4, callback, context);
	        }
	    }
	    else
	        api(source, events, callback, context);
	}
	exports.strings = strings;
	function trigger2(self, name, a, b) {
	    var _events = self._events;
	    if (_events) {
	        var queue = _events[name], all = _events.all;
	        listSend2(queue, a, b);
	        listSend3(all, name, a, b);
	    }
	}
	exports.trigger2 = trigger2;
	;
	function trigger3(self, name, a, b, c) {
	    var _events = self._events;
	    if (_events) {
	        var queue = _events[name], all = _events.all;
	        listSend3(queue, a, b, c);
	        listSend4(all, name, a, b, c);
	    }
	}
	exports.trigger3 = trigger3;
	;
	function trigger5(self, name, a, b, c, d, e) {
	    var _events = self._events;
	    if (_events) {
	        var queue = _events[name], all = _events.all;
	        listSend5(queue, a, b, c, d, e);
	        listSend6(all, name, a, b, c, d, e);
	    }
	}
	exports.trigger5 = trigger5;
	;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map