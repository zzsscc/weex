// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global Vue */

/* weex initialized here, please do not move this line */
var router = __webpack_require__(1);
var App = __webpack_require__(11);
/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router: router }, App));
router.push('/');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vueRouter = __webpack_require__(2);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _HelloWorld = __webpack_require__(3);

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

var _Play = __webpack_require__(8);

var _Play2 = _interopRequireDefault(_Play);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line
Vue.use(_vueRouter2.default);

var router = new _vueRouter2.default({
  // saveScrollPosition: true,
  // scrollBehavior: () => ({
  //   x: 0, y: 0
  // }),
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: _HelloWorld2.default
  }, {
    path: '/play/:id',
    name: 'Play',
    component: _Play2.default,
    props: true, // 通过props传值，在页面上通过props和this.$route.params都可以取到值
    // // 此路由独享的前置守卫
    // beforeEnter: (to, from, next) => {
    //   // console.log(to, from)
    //   next()
    // },
    meta: { requiresAuth: true // 路由元数据
    } }]
});

// // 全局前置守卫
// router.beforeEach((to, from, next) => {
//   // console.log(to, from, next)
//   next()
// })

// // 全局后置守卫，没有next
// router.afterEach((to, from) => {
//   // ...
// })

module.exports = router;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn("[vue-router] " + message);
  }
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config === 'undefined' ? 'undefined' : _typeof(config)) {
    case 'undefined':
      return;
    case 'object':
      return config;
    case 'function':
      return config(route);
    case 'boolean':
      return config ? route.params : undefined;
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "props in \"" + route.path + "\" is a " + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + ", " + "expecting an object, function or boolean.");
      }
  }
}

function extend(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to;
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery;
}

function parseQuery(query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route);
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res;
  } else {
    return value;
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;if (query === void 0) query = {};
  var hash = ref.hash;if (hash === void 0) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {};

  // handle null value #1566
  if (!a || !b) {
    return a === b;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if ((typeof aVal === 'undefined' ? 'undefined' : _typeof(aVal)) === 'object' && (typeof bVal === 'undefined' ? 'undefined' : _typeof(bVal)) === 'object') {
      return isObjectEqual(aVal, bVal);
    }
    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }
  return true;
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function handler(e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) {
    return;
  }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) {
    return;
  }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) {
      return;
    }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}

function findAnchor(children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child;
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }
  install.installed = true;

  _Vue = Vue;

  var isDef = function isDef(v) {
    return v !== undefined;
  };

  var registerInstance = function registerInstance(vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (_typeof(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (isarray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true });
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, "missing param for " + routeMsg + ": " + e.message);
    }
    return '';
  }
}

/*  */

function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(typeof route.component !== 'string', "route config \"component\" for path: " + String(path || name) + " cannot be a " + "string id. Use an actual component instead.");
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) {
        return (/^\/?$/.test(child.path)
        );
      })) {
        warn(false, "Named Route '" + route.name + "' has a default child route. " + "When navigating to this named route (:to=\"{name: '" + route.name + "'\"), " + "the default child route will not be rendered. Remove the name from " + "this route and use the name of the default child route for named " + "links instead.");
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(false, "Duplicate named routes definition: " + "{ name: \"" + name + "\", path: \"" + record.path + "\" }");
    }
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], "Duplicate param keys in route with path: \"" + path + "\"");
      keys[key.name] = true;
    });
  }
  return regex;
}

function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, '');
  }
  if (path[0] === '/') {
    return path;
  }
  if (parent == null) {
    return path;
  }
  return cleanPath(parent.path + "/" + path);
}

/*  */

function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next;
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;

  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}

function assign(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}

/*  */

function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, "Route with name '" + name + "' does not exist");
      }
      if (!record) {
        return _createRoute(null, location);
      }
      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (_typeof(location.params) !== 'object') {
        location.params = {};
      }

      if (currentRoute && _typeof(currentRoute.params) === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
        return _createRoute(record, location, redirectedFrom);
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    }
    // no match
    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || (typeof redirect === 'undefined' ? 'undefined' : _typeof(redirect)) !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, "redirect failed: named route \"" + name + "\" not found.");
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\"");
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }
    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }
    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}

/*  */

var positionStore = Object.create(null);

function setupScroll() {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return;
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition(shouldScroll, position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();
  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

function scrollToPosition(shouldScroll, position) {
  var isObject = (typeof shouldScroll === 'undefined' ? 'undefined' : _typeof(shouldScroll)) === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && _typeof(shouldScroll.offset) === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}

/*  */

function runQueue(queue, fn, cb) {
  var step = function step(index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var hasSymbol = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === 'Module';
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once(fn) {
  var called = false;
  return function () {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }if (called) {
      return;
    }
    called = true;
    return fn.apply(this, args);
  };
}

/*  */

var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;

  var current = this.current;
  var abort = function abort(err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (isSameRoute(route, current) &&
  // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;

  var queue = [].concat(
  // in-component leave guards
  extractLeaveGuards(deactivated),
  // global before hooks
  this.router.beforeHooks,
  // in-component update hooks
  extractUpdateHooks(updated),
  // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }),
  // async components
  resolveAsyncComponents(activated));

  this.pending = route;
  var iterator = function iterator(hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if ((typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function isValid() {
      return this$1.current === route;
    };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return;
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash;
}

/*  */

var HashHistory = function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return;
    }
    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return;
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true;
  }
  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {
    // noop
  };

  return AbstractHistory;
}(History);

/*  */

var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, "invalid mode: " + mode);
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app /* Vue component instance */) {
  var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` " + "before creating root instance.");

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return;
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function setupHashListener() {
      history.setupListeners();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
  if (!route) {
    return [];
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  var location = normalizeLocation(to, current || this.history.current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

exports.default = VueRouter;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(4)
)

/* script */
__vue_exports__ = __webpack_require__(5)

/* template */
var __vue_template__ = __webpack_require__(7)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/zhanshichao/Documents/project/weex/src/components/HelloWorld.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-56c14db0"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  "weex-toast": {
    "width": 80
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weexVueRender = __webpack_require__(6);

var _weexVueRender2 = _interopRequireDefault(_weexVueRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'HelloWorld',
  data: function data() {
    return {
      link: '/play/12'
    };
  },
  created: function created() {
    // console.log(this)
    // console.log(weex)
    var navigator = _weexVueRender2.default.requireModule('navigator');
    // console.log(navigator)
    // console.log(weex.config.env)
    // console.log(weex.support('@component/slider'))
    var modal = _weexVueRender2.default.requireModule('modal');
    modal.toast({
      message: 'This is a toast',
      duration: 3
    });
  },

  methods: {
    jump: function jump(path) {
      // const navigator = weex.requireModule('navigator')
      // alert(path)
      // alert(navigator)
      // navigator
      //   ? navigator.push({
      //     url: path,
      //     animated: 'true'
      //   })
      //   :
      this.$router.push(path); // 使用vue-router
    }
  }
}; //
//
//
//
//
//
//

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

console.log('START WEEX VUE RENDER: 0.12.27, Build 2017-12-11 16:41.');

'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}
__$styleInject("/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n \n.weex-root,\n.weex-root * {\n  color: initial;\n  cursor: initial;\n  direction: initial;\n  font: initial;\n  font-family: initial;\n  font-size: initial;\n  font-style: initial;\n  font-variant: initial;\n  font-weight: initial;\n  line-height: initial;\n  text-align: initial;\n  text-indent: initial;\n  visibility: initial;\n  white-space: initial;\n  word-spacing: initial;\n  font-family: BlinkMacSystemFont, 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\n.weex-root,\n.weex-root *,\n.weex-root *::before,\n.weex-root *::after {\n  box-sizing: border-box;\n  -webkit-text-size-adjust: none;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  text-size-adjust: none;\n}\n\n.weex-root a,\n.weex-root button,\n.weex-root [role=\"button\"],\n.weex-root input,\n.weex-root label,\n.weex-root select,\n.weex-root textarea {\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n}\n\n.weex-root p,\n.weex-root ol,\n.weex-root ul,\n.weex-root dl {\n  margin: 0;\n  padding: 0;\n}\n\n.weex-root li {\n  list-style: none;\n}\n\n.weex-root figure {\n  margin: 0;\n}\n\n.weex-root textarea {\n  resize: none;\n}\n\n/* show no scroll bar. */\n::-webkit-scrollbar {\n  display: none;\n}\n", undefined);

__$styleInject("/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n \n.weex-root * {\n  border-width: 0;\n  border-color: inherit;\n  border-style: solid;\n}\n\n.weex-flex-ct {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.weex-ct {\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-box-orient: vertical;\n  -moz-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -webkit-flex-grow: 0;\n  -moz-box-flex: 0;\n  -ms-flex-grow: 0;\n  flex-grow: 0;\n  -webkit-flex-basis: auto;\n  -ms-flex-preferred-size: auto;\n  flex-basis: auto;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n  -moz-box-align: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n  -webkit-align-content: flex-start;\n  -ms-flex-line-pack: start;\n  align-content: flex-start;\n  border: 0 solid black;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n.weex-ct.horizontal {\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  -moz-box-orient: horizontal;\n  -moz-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n\n.weex-el {\n  display: block;\n  box-sizing: border-box;\n  position: relative;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -webkit-flex-grow: 0;\n  -moz-box-flex: 0;\n  -ms-flex-grow: 0;\n  flex-grow: 0;\n  -webkit-flex-basis: auto;\n  -ms-flex-preferred-size: auto;\n  flex-basis: auto;\n  border: 0 solid black;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n.weex-ios-sticky {\n  position: -webkit-sticky !important;\n  position: sticky !important;\n  z-index: 9999;\n  top: 0;\n}\n\n.weex-fixed {\n  position: fixed;\n  z-index: 1;\n}\n\n.weex-sticky {\n  position: fixed;\n  top: 0;\n  z-index: 9999;\n}\n", undefined);

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable */

var isInitialized = false;

// major events supported:
//   panstart
//   panmove
//   panend
//   swipe
//   longpress
// extra events supported:
//   dualtouchstart
//   dualtouch
//   dualtouchend
//   tap
//   doubletap
//   pressend

var doc = window.document;
var docEl = doc.documentElement;
var slice = Array.prototype.slice;
var gestures = {};
var lastTap = null;

/**
 * find the closest common ancestor
 * if there's no one, return null
 *
 * @param  {Element} el1 first element
 * @param  {Element} el2 second element
 * @return {Element}     common ancestor
 */
function getCommonAncestor(el1, el2) {
  var el = el1;
  while (el) {
    if (el.contains(el2) || el == el2) {
      return el;
    }
    el = el.parentNode;
  }
  return null;
}

/**
 * fire a HTMLEvent
 *
 * @param  {Element} element which element to fire a event on
 * @param  {string}  type    type of event
 * @param  {object}  extra   extra data for the event object
 */
function fireEvent(element, type, extra) {
  var event = doc.createEvent('HTMLEvents');
  event.initEvent(type, true, true);

  if ((typeof extra === 'undefined' ? 'undefined' : _typeof(extra)) === 'object') {
    for (var p in extra) {
      event[p] = extra[p];
    }
  }

  /**
   * A flag to distinguish with other events with the same name generated
   * by another library in the same page.
   */
  event._for = 'weex';

  element.dispatchEvent(event);
}

/**
 * calc the transform
 * assume 4 points ABCD on the coordinate system
 * > rotate：angle rotating from AB to CD
 * > scale：scale ratio from AB to CD
 * > translate：translate shift from A to C
 *
 * @param  {number} x1 abscissa of A
 * @param  {number} y1 ordinate of A
 * @param  {number} x2 abscissa of B
 * @param  {number} y2 ordinate of B
 * @param  {number} x3 abscissa of C
 * @param  {number} y3 ordinate of C
 * @param  {number} x4 abscissa of D
 * @param  {number} y4 ordinate of D
 * @return {object}    transform object like
 *   {rotate, scale, translate[2], matrix[3][3]}
 */
function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
  var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1);
  var scale = Math.sqrt((Math.pow(y4 - y3, 2) + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)));
  var translate = [x3 - scale * x1 * Math.cos(rotate) + scale * y1 * Math.sin(rotate), y3 - scale * y1 * Math.cos(rotate) - scale * x1 * Math.sin(rotate)];

  return {
    rotate: rotate,
    scale: scale,
    translate: translate,
    matrix: [[scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]], [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]], [0, 0, 1]]
  };
}

/**
 * take over the touchstart events. Add new touches to the gestures.
 * If there is no previous records, then bind touchmove, tochend
 * and touchcancel events.
 * new touches initialized with state 'tapping', and within 500 milliseconds
 * if the state is still tapping, then trigger gesture 'press'.
 * If there are two touche points, then the 'dualtouchstart' is triggerd. The
 * node of the touch gesture is their cloest common ancestor.
 *
 * @event
 * @param  {event} event
 */
function touchstartHandler(event) {

  if (Object.keys(gestures).length === 0) {
    docEl.addEventListener('touchmove', touchmoveHandler, false);
    docEl.addEventListener('touchend', touchendHandler, false);
    docEl.addEventListener('touchcancel', touchcancelHandler, false);
  }

  // record every touch
  for (var i = 0; i < event.changedTouches.length; i++) {
    var touch = event.changedTouches[i];
    var touchRecord = {};

    for (var p in touch) {
      touchRecord[p] = touch[p];
    }

    var gesture = {
      startTouch: touchRecord,
      startTime: Date.now(),
      status: 'tapping',
      element: event.srcElement || event.target,
      pressingHandler: setTimeout(function (element, touch) {
        return function () {
          if (gesture.status === 'tapping') {
            gesture.status = 'pressing';

            fireEvent(element, 'longpress', {
              // add touch data for weex
              touch: touch,
              touches: event.touches,
              changedTouches: event.changedTouches,
              touchEvent: event
            });
          }

          clearTimeout(gesture.pressingHandler);
          gesture.pressingHandler = null;
        };
      }(event.srcElement || event.target, event.changedTouches[i]), 500)
    };
    gestures[touch.identifier] = gesture;
  }

  if (Object.keys(gestures).length == 2) {
    var elements = [];

    for (var p in gestures) {
      elements.push(gestures[p].element);
    }

    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchstart', {
      touches: slice.call(event.touches),
      touchEvent: event
    });
  }
}

/**
 * take over touchmove events, and handle pan and dual related gestures.
 *
 * 1. traverse every touch point：
 * > if 'tapping' and the shift is over 10 pixles, then it's a 'panning'.
 * 2. if there are two touch points, then calc the tranform and trigger
 *   'dualtouch'.
 *
 * @event
 * @param  {event} event
 */
function touchmoveHandler(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var touch = event.changedTouches[i];
    var gesture = gestures[touch.identifier];

    if (!gesture) {
      return;
    }

    if (!gesture.lastTouch) {
      gesture.lastTouch = gesture.startTouch;
    }
    if (!gesture.lastTime) {
      gesture.lastTime = gesture.startTime;
    }
    if (!gesture.velocityX) {
      gesture.velocityX = 0;
    }
    if (!gesture.velocityY) {
      gesture.velocityY = 0;
    }
    if (!gesture.duration) {
      gesture.duration = 0;
    }

    var time = Date.now() - gesture.lastTime;
    var vx = (touch.clientX - gesture.lastTouch.clientX) / time;
    var vy = (touch.clientY - gesture.lastTouch.clientY) / time;

    var RECORD_DURATION = 70;
    if (time > RECORD_DURATION) {
      time = RECORD_DURATION;
    }
    if (gesture.duration + time > RECORD_DURATION) {
      gesture.duration = RECORD_DURATION - time;
    }

    gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time) / (gesture.duration + time);
    gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time) / (gesture.duration + time);
    gesture.duration += time;

    gesture.lastTouch = {};

    for (var p in touch) {
      gesture.lastTouch[p] = touch[p];
    }
    gesture.lastTime = Date.now();

    var displacementX = touch.clientX - gesture.startTouch.clientX;
    var displacementY = touch.clientY - gesture.startTouch.clientY;
    var distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));
    var isVertical = !(Math.abs(displacementX) > Math.abs(displacementY));
    var direction = isVertical ? displacementY >= 0 ? 'down' : 'up' : displacementX >= 0 ? 'right' : 'left';

    // magic number 10: moving 10px means pan, not tap
    if ((gesture.status === 'tapping' || gesture.status === 'pressing') && distance > 10) {
      gesture.status = 'panning';
      gesture.isVertical = isVertical;
      gesture.direction = direction;

      fireEvent(gesture.element, 'panstart', {
        touch: touch,
        touches: event.touches,
        changedTouches: event.changedTouches,
        touchEvent: event,
        isVertical: gesture.isVertical,
        direction: direction
      });
    }

    if (gesture.status === 'panning') {
      gesture.panTime = Date.now();

      fireEvent(gesture.element, 'panmove', {
        displacementX: displacementX,
        displacementY: displacementY,
        touch: touch,
        touches: event.touches,
        changedTouches: event.changedTouches,
        touchEvent: event,
        isVertical: gesture.isVertical,
        direction: direction
      });
    }
  }

  if (Object.keys(gestures).length == 2) {
    var position = [];
    var current = [];
    var elements = [];
    var transform;

    for (var i = 0; i < event.touches.length; i++) {
      var touch = event.touches[i];
      var gesture = gestures[touch.identifier];
      position.push([gesture.startTouch.clientX, gesture.startTouch.clientY]);
      current.push([touch.clientX, touch.clientY]);
    }

    for (var p in gestures) {
      elements.push(gestures[p].element);
    }

    transform = calc(position[0][0], position[0][1], position[1][0], position[1][1], current[0][0], current[0][1], current[1][0], current[1][1]);
    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouch', {
      transform: transform,
      touches: event.touches,
      touchEvent: event
    });
  }
}

/**
 * handle touchend event
 *
 * 1. if there are tow touch points, then trigger 'dualtouchend'如
 *
 * 2. traverse every touch piont：
 * > if tapping, then trigger 'tap'.
 * If there is a tap 300 milliseconds before, then it's a 'doubletap'.
 * > if padding, then decide to trigger 'panend' or 'swipe'
 * > if pressing, then trigger 'pressend'.
 *
 * 3. remove listeners.
 *
 * @event
 * @param  {event} event
 */
function touchendHandler(event) {

  if (Object.keys(gestures).length == 2) {
    var elements = [];
    for (var p in gestures) {
      elements.push(gestures[p].element);
    }
    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
      touches: slice.call(event.touches),
      touchEvent: event
    });
  }

  for (var i = 0; i < event.changedTouches.length; i++) {
    var touch = event.changedTouches[i];
    var id = touch.identifier;
    var gesture = gestures[id];

    if (!gesture) {
      continue;
    }

    if (gesture.pressingHandler) {
      clearTimeout(gesture.pressingHandler);
      gesture.pressingHandler = null;
    }

    if (gesture.status === 'tapping') {
      gesture.timestamp = Date.now();
      // fire click, not tap.
      fireEvent(gesture.element, 'tap', {
        touch: touch,
        touchEvent: event
      });

      if (lastTap && gesture.timestamp - lastTap.timestamp < 300) {
        fireEvent(gesture.element, 'doubletap', {
          touch: touch,
          touchEvent: event
        });
      }

      lastTap = gesture;
    }

    if (gesture.status === 'panning') {
      var now = Date.now();
      var duration = now - gesture.startTime;
      var displacementX = touch.clientX - gesture.startTouch.clientX;
      var displacementY = touch.clientY - gesture.startTouch.clientY;

      var velocity = Math.sqrt(gesture.velocityY * gesture.velocityY + gesture.velocityX * gesture.velocityX);
      var isSwipe = velocity > 0.5 && now - gesture.lastTime < 100;
      var extra = {
        duration: duration,
        isSwipe: isSwipe,
        velocityX: gesture.velocityX,
        velocityY: gesture.velocityY,
        displacementX: displacementX,
        displacementY: displacementY,
        touch: touch,
        touches: event.touches,
        changedTouches: event.changedTouches,
        touchEvent: event,
        isVertical: gesture.isVertical,
        direction: gesture.direction
      };

      fireEvent(gesture.element, 'panend', extra);
      if (isSwipe) {
        fireEvent(gesture.element, 'swipe', extra);
      }
    }

    if (gesture.status === 'pressing') {
      fireEvent(gesture.element, 'pressend', {
        touch: touch,
        touchEvent: event
      });
    }

    delete gestures[id];
  }

  if (Object.keys(gestures).length === 0) {
    docEl.removeEventListener('touchmove', touchmoveHandler, false);
    docEl.removeEventListener('touchend', touchendHandler, false);
    docEl.removeEventListener('touchcancel', touchcancelHandler, false);
  }
}

/**
 * handle touchcancel
 *
 * 1. if there are two touch points, then trigger 'dualtouchend'
 *
 * 2. traverse everty touch point:
 * > if pannnig, then trigger 'panend'
 * > if pressing, then trigger 'pressend'
 *
 * 3. remove listeners
 *
 * @event
 * @param  {event} event
 */
function touchcancelHandler(event) {

  if (Object.keys(gestures).length == 2) {
    var elements = [];
    for (var p in gestures) {
      elements.push(gestures[p].element);
    }
    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
      touches: slice.call(event.touches),
      touchEvent: event
    });
  }

  for (var i = 0; i < event.changedTouches.length; i++) {
    var touch = event.changedTouches[i];
    var id = touch.identifier;
    var gesture = gestures[id];

    if (!gesture) {
      continue;
    }

    if (gesture.pressingHandler) {
      clearTimeout(gesture.pressingHandler);
      gesture.pressingHandler = null;
    }

    if (gesture.status === 'panning') {
      fireEvent(gesture.element, 'panend', {
        touch: touch,
        touches: event.touches,
        changedTouches: event.changedTouches,
        touchEvent: event
      });
    }
    if (gesture.status === 'pressing') {
      fireEvent(gesture.element, 'pressend', {
        touch: touch,
        touchEvent: event
      });
    }
    delete gestures[id];
  }

  if (Object.keys(gestures).length === 0) {
    docEl.removeEventListener('touchmove', touchmoveHandler, false);
    docEl.removeEventListener('touchend', touchendHandler, false);
    docEl.removeEventListener('touchcancel', touchcancelHandler, false);
  }
}

if (!isInitialized) {
  docEl.addEventListener('touchstart', touchstartHandler, false);
  isInitialized = true;
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable */

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from

/* istanbul ignore if */
if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }();
}

function unwrapExports(x) {
  return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
  if (typeof __g == 'number') {
    __g = global;
  } // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.5.1' };
  if (typeof __e == 'number') {
    __e = core;
  } // eslint-disable-line no-undef
});

var _isObject = function _isObject(it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

var isObject = _isObject;
var _anObject = function _anObject(it) {
  if (!isObject(it)) {
    throw TypeError(it + ' is not an object!');
  }
  return it;
};

var _fails = function _fails(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

var isObject$1 = _isObject;
var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = isObject$1(document$1) && isObject$1(document$1.createElement);
var _domCreate = function _domCreate(it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject$2 = _isObject;
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function _toPrimitive(it, S) {
  if (!isObject$2(it)) {
    return it;
  }
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))) {
    return val;
  }
  if (typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it))) {
    return val;
  }
  if (!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))) {
    return val;
  }
  throw TypeError("Can't convert object to primitive value");
};

var anObject = _anObject;
var IE8_DOM_DEFINE = _ie8DomDefine;
var toPrimitive = _toPrimitive;
var dP$1 = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) {
    try {
      return dP$1(O, P, Attributes);
    } catch (e) {/* empty */}
  }
  if ('get' in Attributes || 'set' in Attributes) {
    throw TypeError('Accessors not supported!');
  }
  if ('value' in Attributes) {
    O[P] = Attributes.value;
  }
  return O;
};

var _objectDp = {
  f: f
};

var _propertyDesc = function _propertyDesc(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var dP = _objectDp;
var createDesc = _propertyDesc;
var _hide = _descriptors ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function _has(it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function _uid(key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
  var global = _global;
  var hide = _hide;
  var has = _has;
  var SRC = _uid('src');
  var TO_STRING = 'toString';
  var $toString = Function[TO_STRING];
  var TPL = ('' + $toString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return $toString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) {
      has(val, 'name') || hide(val, 'name', key);
    }
    if (O[key] === val) {
      return;
    }
    if (isFunction) {
      has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    }
    if (O === global) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      hide(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      hide(O, key, val);
    }
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
});

var _aFunction = function _aFunction(it) {
  if (typeof it != 'function') {
    throw TypeError(it + ' is not a function!');
  }
  return it;
};

// optional / simple context binding
var aFunction = _aFunction;
var _ctx = function _ctx(fn, that, length) {
  aFunction(fn);
  if (that === undefined) {
    return fn;
  }
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

var global$1 = _global;
var core = _core;
var hide = _hide;
var redefine = _redefine;
var ctx = _ctx;
var PROTOTYPE = 'prototype';

var $export$1 = function $export$1(type, name, source) {
  var IS_FORCED = type & $export$1.F;
  var IS_GLOBAL = type & $export$1.G;
  var IS_STATIC = type & $export$1.S;
  var IS_PROTO = type & $export$1.P;
  var IS_BIND = type & $export$1.B;
  var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) {
    source = name;
  }
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global$1) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) {
      redefine(target, key, out, type & $export$1.U);
    }
    // export
    if (exports[key] != out) {
      hide(exports, key, exp);
    }
    if (IS_PROTO && expProto[key] != out) {
      expProto[key] = out;
    }
  }
};
global$1.core = core;
// type bitmap
$export$1.F = 1; // forced
$export$1.G = 2; // global
$export$1.S = 4; // static
$export$1.P = 8; // proto
$export$1.B = 16; // bind
$export$1.W = 32; // wrap
$export$1.U = 64; // safe
$export$1.R = 128; // real proto method for `library`
var _export = $export$1;

var toString$1 = {}.toString;

var _cof = function _cof(it) {
  return toString$1.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _cof;
// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function _defined(it) {
  if (it == undefined) {
    throw TypeError("Can't call method on  " + it);
  }
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject$1 = _iobject;
var defined = _defined;
var _toIobject = function _toIobject(it) {
  return IObject$1(defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function _toInteger(it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var toInteger = _toInteger;
var min = Math.min;
var _toLength = function _toLength(it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var toInteger$1 = _toInteger;
var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function _toAbsoluteIndex(index, length) {
  index = toInteger$1(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes
var toIObject$1 = _toIobject;
var toLength = _toLength;
var toAbsoluteIndex = _toAbsoluteIndex;
var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject$1($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) {
      while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) {
          return true;
        }
        // Array#indexOf ignores holes, Array#includes - not
      }
    } else {
      for (; length > index; index++) {
        if (IS_INCLUDES || index in O) {
          if (O[index] === el) {
            return IS_INCLUDES || index || 0;
          }
        }
      }
    }return !IS_INCLUDES && -1;
  };
};

var global$2 = _global;
var SHARED = '__core-js_shared__';
var store = global$2[SHARED] || (global$2[SHARED] = {});
var _shared = function _shared(key) {
  return store[key] || (store[key] = {});
};

var shared = _shared('keys');
var uid = _uid;
var _sharedKey = function _sharedKey(key) {
  return shared[key] || (shared[key] = uid(key));
};

var has = _has;
var toIObject = _toIobject;
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function _objectKeysInternal(object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO) {
      has(O, key) && result.push(key);
    }
  }
  // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = _objectKeysInternal;
var enumBugKeys = _enumBugKeys;

var _objectKeys = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
  f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
  f: f$2
};

// 7.1.13 ToObject(argument)
var defined$1 = _defined;
var _toObject = function _toObject(it) {
  return Object(defined$1(it));
};

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = _objectKeys;
var gOPS = _objectGops;
var pIE = _objectPie;
var toObject = _toObject;
var IObject = _iobject;
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  var arguments$1 = arguments;
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments$1[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) {
        T[key] = S[key];
      }
    }
  }return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)
var $export = _export;

$export($export.S + $export.F, 'Object', { assign: _objectAssign });

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable */

// https://gist.github.com/WebReflection/5593554

/* istanbul ignore if */
if (!Object.setPrototypeOf) {
  Object.setPrototypeOf = function (Object, magic) {
    var set;
    function setPrototypeOf(O, proto) {
      set.call(O, proto);
      return O;
    }
    try {
      // this works already in Firefox and Safari
      set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set;
      set.call({}, null);
    } catch (e) {
      if (
      // IE < 11 cannot be shimmed
      Object.prototype !== {}[magic] ||
      // neither can any browser that actually
      // implemented __proto__ correctly
      // (all but old V8 will return here)
      { __proto__: null }.__proto__ === void 0
      // this case means null objects cannot be passed
      // through setPrototypeOf in a reliable way
      // which means here a **Sham** is needed instead
      ) {
          return;
        }
      // nodejs 0.8 and 0.10 are (buggy and..) fine here
      // probably Chrome or some old Mobile stock browser
      set = function set(proto) {
        this[magic] = proto;
      };
      // please note that this will **not** work
      // in those browsers that do not inherit
      // __proto__ by mistake from Object.prototype
      // in these cases we should probably throw an error
      // or at least be informed about the issue
      setPrototypeOf.polyfill = setPrototypeOf(setPrototypeOf({}, null), Object.prototype) instanceof Object;
      // setPrototypeOf.polyfill === true means it works as meant
      // setPrototypeOf.polyfill === false means it's not 100% reliable
      // setPrototypeOf.polyfill === undefined
      // or
      // setPrototypeOf.polyfill ==  null means it's not a polyfill
      // which means it works as expected
      // we can even delete Object.prototype.__proto__;
    }
    return setPrototypeOf;
  }(Object, '__proto__');
}

var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');
  var uid = _uid;
  var _Symbol = _global.Symbol;
  var USE_SYMBOL = typeof _Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
  };

  $exports.store = store;
});

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof$1 = _cof;
var TAG = _wks('toStringTag');
// ES3 wrong here
var ARG = cof$1(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

var _classof = function _classof(it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? cof$1(O)
  // ES3 arguments fallback
  : (B = cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

// 19.1.3.6 Object.prototype.toString()
var classof = _classof;
var test = {};
test[_wks('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  _redefine(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

var toInteger$2 = _toInteger;
var defined$2 = _defined;
// true  -> String#at
// false -> String#codePointAt
var _stringAt = function _stringAt(TO_STRING) {
  return function (that, pos) {
    var s = String(defined$2(that));
    var i = toInteger$2(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) {
      return TO_STRING ? '' : undefined;
    }
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = false;

var _iterators = {};

var dP$2 = _objectDp;
var anObject$2 = _anObject;
var getKeys$1 = _objectKeys;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$2(O);
  var keys = getKeys$1(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) {
    dP$2.f(O, P = keys[i++], Properties[P]);
  }
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject$1 = _anObject;
var dPs = _objectDps;
var enumBugKeys$1 = _enumBugKeys;
var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function Empty() {/* empty */};
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = enumBugKeys$1.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE$1][enumBugKeys$1[i]];
  }
  return _createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = anObject$1(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else {
    result = _createDict();
  }
  return Properties === undefined ? result : dPs(result, Properties);
};

var def = _objectDp.f;
var has$2 = _has;
var TAG$1 = _wks('toStringTag');

var _setToStringTag = function _setToStringTag(it, tag, stat) {
  if (it && !has$2(it = stat ? it : it.prototype, TAG$1)) {
    def(it, TAG$1, { configurable: true, value: tag });
  }
};

var create$1 = _objectCreate;
var descriptor = _propertyDesc;
var setToStringTag$1 = _setToStringTag;
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () {
  return this;
});

var _iterCreate = function _iterCreate(Constructor, NAME, next) {
  Constructor.prototype = create$1(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag$1(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has$3 = _has;
var toObject$1 = _toObject;
var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = toObject$1(O);
  if (has$3(O, IE_PROTO$2)) {
    return O[IE_PROTO$2];
  }
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

var LIBRARY = _library;
var $export$2 = _export;
var redefine$1 = _redefine;
var hide$1 = _hide;
var has$1 = _has;
var Iterators = _iterators;
var $iterCreate = _iterCreate;
var setToStringTag = _setToStringTag;
var getPrototypeOf = _objectGpo;
var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) {
      return proto[kind];
    }
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has$1(IteratorPrototype, ITERATOR)) {
        hide$1(IteratorPrototype, ITERATOR, returnThis);
      }
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide$1(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) {
      for (key in methods) {
        if (!(key in proto)) {
          redefine$1(proto, key, methods[key]);
        }
      }
    } else {
      $export$2($export$2.P + $export$2.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) {
    return { value: undefined, done: true };
  }
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) {
  _hide(ArrayProto, UNSCOPABLES, {});
}
var _addToUnscopables = function _addToUnscopables(key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

var _iterStep = function _iterStep(done, value) {
  return { value: value, done: !!done };
};

var addToUnscopables = _addToUnscopables;
var step = _iterStep;
var Iterators$2 = _iterators;
var toIObject$2 = _toIobject;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = toIObject$2(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') {
    return step(0, index);
  }
  if (kind == 'values') {
    return step(0, O[index]);
  }
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators$2.Arguments = Iterators$2.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var $iterators = es6_array_iterator;
var getKeys$2 = _objectKeys;
var redefine$2 = _redefine;
var global$3 = _global;
var hide$2 = _hide;
var Iterators$1 = _iterators;
var wks = _wks;
var ITERATOR$1 = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators$1.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys$2(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global$3[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR$1]) {
      hide$2(proto, ITERATOR$1, ArrayValues);
    }
    if (!proto[TO_STRING_TAG]) {
      hide$2(proto, TO_STRING_TAG, NAME);
    }
    Iterators$1[NAME] = ArrayValues;
    if (explicit) {
      for (key in $iterators) {
        if (!proto[key]) {
          redefine$2(proto, key, $iterators[key], true);
        }
      }
    }
  }
}

var _anInstance = function _anInstance(it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

// call something on iterator step with safe closing on error
var anObject$3 = _anObject;
var _iterCall = function _iterCall(iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject$3(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) {
      anObject$3(ret.call(iterator));
    }
    throw e;
  }
};

// check on default Array iterator
var Iterators$3 = _iterators;
var ITERATOR$2 = _wks('iterator');
var ArrayProto$1 = Array.prototype;

var _isArrayIter = function _isArrayIter(it) {
  return it !== undefined && (Iterators$3.Array === it || ArrayProto$1[ITERATOR$2] === it);
};

var classof$2 = _classof;
var ITERATOR$3 = _wks('iterator');
var Iterators$4 = _iterators;
var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) {
    return it[ITERATOR$3] || it['@@iterator'] || Iterators$4[classof$2(it)];
  }
};

var _forOf = createCommonjsModule(function (module) {
  var ctx = _ctx;
  var call = _iterCall;
  var isArrayIter = _isArrayIter;
  var anObject = _anObject;
  var toLength = _toLength;
  var getIterFn = core_getIteratorMethod;
  var BREAK = {};
  var RETURN = {};
  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () {
      return iterable;
    } : getIterFn(iterable);
    var f = ctx(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function') {
      throw TypeError(iterable + ' is not iterable!');
    }
    // fast case for arrays with default iterator
    if (isArrayIter(iterFn)) {
      for (length = toLength(iterable.length); length > index; index++) {
        result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
        if (result === BREAK || result === RETURN) {
          return result;
        }
      }
    } else {
      for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
        result = call(iterator, f, step.value, entries);
        if (result === BREAK || result === RETURN) {
          return result;
        }
      }
    }
  };
  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject$4 = _anObject;
var aFunction$2 = _aFunction;
var SPECIES = _wks('species');
var _speciesConstructor = function _speciesConstructor(O, D) {
  var C = anObject$4(O).constructor;
  var S;
  return C === undefined || (S = anObject$4(C)[SPECIES]) == undefined ? D : aFunction$2(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function _invoke(fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0:
      return un ? fn() : fn.call(that);
    case 1:
      return un ? fn(args[0]) : fn.call(that, args[0]);
    case 2:
      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
    case 3:
      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
    case 4:
      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
  }return fn.apply(that, args);
};

var ctx$2 = _ctx;
var invoke = _invoke;
var html = _html;
var cel = _domCreate;
var global$5 = _global;
var process$1 = global$5.process;
var setTask = global$5.setImmediate;
var clearTask = global$5.clearImmediate;
var MessageChannel = global$5.MessageChannel;
var Dispatch = global$5.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer;
var channel;
var port;
var run = function run() {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function listener(event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var arguments$1 = arguments;

    var args = [];
    var i = 1;
    while (arguments.length > i) {
      args.push(arguments$1[i++]);
    }
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process$1) == 'process') {
    defer = function defer(id) {
      process$1.nextTick(ctx$2(run, id, 1));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(ctx$2(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx$2(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global$5.addEventListener && typeof postMessage == 'function' && !global$5.importScripts) {
    defer = function defer(id) {
      global$5.postMessage(id + '', '*');
    };
    global$5.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function defer(id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function defer(id) {
      setTimeout(ctx$2(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};

var global$6 = _global;
var macrotask = _task.set;
var Observer = global$6.MutationObserver || global$6.WebKitMutationObserver;
var process$2 = global$6.process;
var Promise$1 = global$6.Promise;
var isNode$1 = _cof(process$2) == 'process';

var _microtask = function _microtask() {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode$1 && (parent = process$2.domain)) {
      parent.exit();
    }
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) {
          notify();
        } else {
          last = undefined;
        }
        throw e;
      }
    }last = undefined;
    if (parent) {
      parent.enter();
    }
  };

  // Node.js
  if (isNode$1) {
    notify = function notify() {
      process$2.nextTick(flush);
    };
    // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function notify() {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    var promise = Promise$1.resolve();
    notify = function notify() {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$6, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) {
      last.next = task;
    }
    if (!head) {
      head = task;
      notify();
    }last = task;
  };
};

// 25.4.1.5 NewPromiseCapability(C)
var aFunction$3 = _aFunction;

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) {
      throw TypeError('Bad Promise constructor');
    }
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$3(resolve);
  this.reject = aFunction$3(reject);
}

var f$3 = function f$3(C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
  f: f$3
};

var _perform = function _perform(exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

var anObject$5 = _anObject;
var isObject$4 = _isObject;
var newPromiseCapability$1 = _newPromiseCapability;

var _promiseResolve = function _promiseResolve(C, x) {
  anObject$5(C);
  if (isObject$4(x) && x.constructor === C) {
    return x;
  }
  var promiseCapability = newPromiseCapability$1.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var redefine$3 = _redefine;
var _redefineAll = function _redefineAll(target, src, safe) {
  for (var key in src) {
    redefine$3(target, key, src[key], safe);
  }
  return target;
};

var global$7 = _global;
var dP$3 = _objectDp;
var DESCRIPTORS = _descriptors;
var SPECIES$1 = _wks('species');

var _setSpecies = function _setSpecies(KEY) {
  var C = global$7[KEY];
  if (DESCRIPTORS && C && !C[SPECIES$1]) {
    dP$3.f(C, SPECIES$1, {
      configurable: true,
      get: function get() {
        return this;
      }
    });
  }
};

var ITERATOR$4 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$4]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

var _iterDetect = function _iterDetect(exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) {
    return false;
  }
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$4]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR$4] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

var LIBRARY$1 = _library;
var global$4 = _global;
var ctx$1 = _ctx;
var classof$1 = _classof;
var $export$3 = _export;
var isObject$3 = _isObject;
var aFunction$1 = _aFunction;
var anInstance = _anInstance;
var forOf = _forOf;
var speciesConstructor = _speciesConstructor;
var task = _task.set;
var microtask = _microtask();
var newPromiseCapabilityModule = _newPromiseCapability;
var perform = _perform;
var promiseResolve = _promiseResolve;
var PROMISE = 'Promise';
var TypeError$1 = global$4.TypeError;
var process = global$4.process;
var $Promise = global$4[PROMISE];
var isNode = classof$1(process) == 'process';
var empty = function empty() {/* empty */};
var Internal;
var newGenericPromiseCapability;
var OwnPromiseCapability;
var Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) {/* empty */}
}();

// helpers
var isThenable = function isThenable(it) {
  var then;
  return isObject$3(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function notify(promise, isReject) {
  if (promise._n) {
    return;
  }
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) {
              onHandleUnhandled(promise);
            }
            promise._h = 1;
          }
          if (handler === true) {
            result = value;
          } else {
            if (domain) {
              domain.enter();
            }
            result = handler(value);
            if (domain) {
              domain.exit();
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else {
            resolve(result);
          }
        } else {
          reject(value);
        }
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) {
      onUnhandled(promise);
    }
  });
};
var onUnhandled = function onUnhandled(promise) {
  task.call(global$4, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global$4.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global$4.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }promise._a = undefined;
    if (unhandled && result.e) {
      throw result.v;
    }
  });
};
var isUnhandled = function isUnhandled(promise) {
  if (promise._h == 1) {
    return false;
  }
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) {
      return false;
    }
  }return true;
};
var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(global$4, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global$4.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) {
    return;
  }
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) {
    promise._a = promise._c.slice();
  }
  notify(promise, true);
};
var $resolve = function $resolve(value) {
  var promise = this;
  var then;
  if (promise._d) {
    return;
  }
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) {
      throw TypeError$1("Promise can't be resolved itself");
    }
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx$1($resolve, wrapper, 1), ctx$1($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction$1(executor);
    Internal.call(this);
    try {
      executor(ctx$1($resolve, this, 1), ctx$1($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions
    this._a = undefined; // <- checked in isUnhandled reactions
    this._s = 0; // <- state
    this._d = false; // <- done
    this._v = undefined; // <- value
    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false; // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) {
        this._a.push(reaction);
      }
      if (this._s) {
        notify(this, false);
      }
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx$1($resolve, promise, 1);
    this.reject = ctx$1($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

$export$3($export$3.G + $export$3.W + $export$3.F * !USE_NATIVE, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
$export$3($export$3.S + $export$3.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export$3($export$3.S + $export$3.F * (LIBRARY$1 || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY$1 && this === Wrapper ? $Promise : this, x);
  }
});
$export$3($export$3.S + $export$3.F * !(USE_NATIVE && _iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) {
            return;
          }
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) {
      reject(result.v);
    }
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) {
      reject(result.v);
    }
    return capability.promise;
  }
});

var lib$2 = window.lib || (window.lib = {});

/**
 * Version class.
 * @class lib.env~Version
 * @param {String} v - version number.
 */
function Version(v) {
  Object.defineProperty(this, 'val', {
    value: v.toString(),
    enumerable: true
  });

  /**
   * larger than
   * @method gt
   * @param {String} v - version
   * @return {Boolean} result
   * @instance
   * @memberof Version
   */
  this.gt = function (v) {
    return Version.compare(this, v) > 0;
  };

  /**
   * larger than or equal to.
   * @method gte
   * @param {String} v - version
   * @return {Boolean} result
   * @instance
   * @memberof Version
   */
  this.gte = function (v) {
    return Version.compare(this, v) >= 0;
  };

  /**
   * less than.
   * @method lt
   * @param {String} v - version
   * @return {Boolean} result
   * @instance
   * @memberof Version
   */
  this.lt = function (v) {
    return Version.compare(this, v) < 0;
  };

  /**
   * less than or equal to.
   * @method lte
   * @param {String} v - version
   * @return {Boolean} result
   * @instance
   * @memberof Version
   */
  this.lte = function (v) {
    return Version.compare(this, v) <= 0;
  };

  /**
   * equal to.
   * @method eq
   * @param {String} v - version
   * @return {Boolean} equal to
   * @instance
   * @memberof Version
   */
  this.eq = function (v) {
    return Version.compare(this, v) === 0;
  };
}

/**
 * version number string.
 * @method toString
 * @return {String} current version number string.
 * @instance
 * @memberof Version
 */
Version.prototype.toString = function () {
  return this.val;
};

/**
 * return current version number.
 * @method valueOf
 * @return {Boolean} version number
 * @instance
 * @memberof Version
 */
Version.prototype.valueOf = function () {
  var v = this.val.split('.');
  var r = [];
  for (var i = 0; i < v.length; i++) {
    var n = parseInt(v[i], 10);
    if (isNaN(n)) {
      n = 0;
    }
    var s = n.toString();
    if (s.length < 5) {
      s = Array(6 - s.length).join('0') + s;
    }
    r.push(s);
    if (r.length === 1) {
      r.push('.');
    }
  }
  return parseFloat(r.join(''));
};

/**
 * compare two versions.
 * @method compare
 * @param {String} v1 - version1
 * @param {String} v2 - version2
 * @return {Number} 0 for equality，-1 for less than，1 for larger than.
 * @memberof Version
 */
Version.compare = function (v1, v2) {
  v1 = v1.toString().split('.');
  v2 = v2.toString().split('.');
  for (var i = 0; i < v1.length || i < v2.length; i++) {
    var n1 = parseInt(v1[i], 10);
    var n2 = parseInt(v2[i], 10);
    if (window.isNaN(n1)) {
      n1 = 0;
    }
    if (window.isNaN(n2)) {
      n2 = 0;
    }
    if (n1 < n2) {
      return -1;
    } else if (n1 > n2) {
      return 1;
    }
  }
  return 0;
};

/**
 * 解析和操作版本号
 * @method version
 * @param {string} v - 需要解析的版本号
 * @return {lib.env~Version} Verson实例
 * @memberof lib
 */
lib$2.version = function (v) {
  return new Version(v);
};

var lib$3 = window.lib || (window.lib = {});
var env$1 = lib$3.env || (lib$3.env = {});

var search = window.location.search.replace(/^\?/, '');
env$1.params = {};
if (search) {
  var params = search.split('&');
  for (var i$1 = 0; i$1 < params.length; i$1++) {
    params[i$1] = params[i$1].split('=');
    try {
      env$1.params[params[i$1][0]] = decodeURIComponent(params[i$1][1]);
    } catch (e) {
      env$1.params[params[i$1][0]] = params[i$1][1];
    }
  }
}

var lib$1 = window.lib || (window.lib = {});
var env = lib$1.env || (lib$1.env = {});

var ua = window.navigator.userAgent;
var match;

/**
 * os
 */

match = ua.match(/Windows\sPhone\s(?:OS\s)?([\d.]+)/);
if (match) {
  /**
   * @type {Object}
   * @memberof lib.env
   * @property {String} name - os name, e.g. Android/AndroidPad/iPhone/iPod/iPad/Windows Phone/unknown, etc.
   * @property {lib.env~Version} version - os version.
   * @property {Boolean} isWindowsPhone
   * @property {Boolean} isIPhone - is iPhone/iTouch
   * @property {Boolean} isIPad
   * @property {Boolean} isIOS
   * @property {Boolean} isAndroid
   * @property {Boolean} isAndroidPad
   */
  env.os = {
    name: 'Windows Phone',
    isWindowsPhone: true,
    version: match[1]
  };
} else if (!!ua.match(/Safari/) && (match = ua.match(/Android[\s/]([\d.]+)/))) {
  env.os = {
    version: match[1]
  };

  if (ua.match(/Mobile\s+Safari/)) {
    env.os.name = 'Android';
    env.os.isAndroid = true;
  } else {
    env.os.name = 'AndroidPad';
    env.os.isAndroidPad = true;
  }
} else if (match = ua.match(/(iPhone|iPad|iPod)/)) {
  var name = match[1];

  match = ua.match(/OS ([\d_.]+) like Mac OS X/);

  env.os = {
    name: name,
    isIPhone: name === 'iPhone' || name === 'iPod',
    isIPad: name === 'iPad',
    isIOS: true,
    version: match && match[1].split('_').join('.') || ''
  };
} else {
  env.os = {
    name: 'unknown',
    version: '0.0.0'
  };
}

if (lib$1.version) {
  env.os.version = lib$1.version(env.os.version);
}

/**
 * browser
 */

match = ua.match(/(?:UCWEB|UCBrowser\/)([\d.]+)/);

if (match) {
  /**
   * @type {Object}
   * @memberof env
   * @property {String} name - browser name，e.g. UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown, etc.
   * @property {env~Version} version - browser version.
   * @property {Boolean} isUC
   * @property {Boolean} isQQ
   * @property {Boolean} isIE
   * @property {Boolean} isIEMobile
   * @property {Boolean} isIELikeWebkit
   * @property {Boolean} isChrome
   * @property {Boolean} isAndroid
   * @property {Boolean} isSafari
   * @property {Boolean} isWebview
   */
  env.browser = {
    name: 'UC',
    isUC: true,
    version: match[1]
  };
} else if (match = ua.match(/MQQBrowser\/([\d.]+)/)) {
  env.browser = {
    name: 'QQ',
    isQQ: true,
    version: match[1]
  };
} else if (match = ua.match(/Firefox\/([\d.]+)/)) {
  env.browser = {
    name: 'Firefox',
    isFirefox: true,
    version: match[1]
  };
} else if ((match = ua.match(/MSIE\s([\d.]+)/)) || (match = ua.match(/IEMobile\/([\d.]+)/))) {
  env.browser = {
    version: match[1]
  };

  if (ua.match(/IEMobile/)) {
    env.browser.name = 'IEMobile';
    env.browser.isIEMobile = true;
  } else {
    env.browser.name = 'IE';
    env.browser.isIE = true;
  }

  if (ua.match(/Android|iPhone/)) {
    env.browser.isIELikeWebkit = true;
  }
} else if (match = ua.match(/(?:Chrome|CriOS)\/([\d.]+)/)) {
  env.browser = {
    name: 'Chrome',
    isChrome: true,
    version: match[1]
  };

  if (ua.match(/Version\/[\d+.]+\s*Chrome/)) {
    env.browser.name = 'Chrome Webview';
    env.browser.isWebview = true;
  }
} else if (!!ua.match(/Safari/) && (match = ua.match(/Android[\s/]([\d.]+)/))) {
  env.browser = {
    name: 'Android',
    isAndroid: true,
    version: match[1]
  };
} else if (ua.match(/iPhone|iPad|iPod/)) {
  if (ua.match(/Safari/)) {
    match = ua.match(/Version\/([\d.]+)/);
    env.browser = {
      name: 'Safari',
      isSafari: true,
      version: match && match[1] || ''
    };
  } else {
    match = ua.match(/OS ([\d_.]+) like Mac OS X/);
    env.browser = {
      name: 'iOS Webview',
      isWebview: true,
      version: match && match[1].replace(/_/g, '.') || ''
    };
  }
} else {
  env.browser = {
    name: 'unknown',
    version: '0.0.0'
  };
}

if (lib$1.version) {
  env.browser.version = lib$1.version(env.browser.version);
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// 

var toString$2 = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */
var OBJECT_STRING = '[object Object]';
function isPlainObject(obj) {
  return toString$2.call(obj) === OBJECT_STRING;
}

var ARRAY_STRING = '[object Array]';
function isArray(arr) {
  return toString$2.call(arr) === ARRAY_STRING;
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// 
/**
 * Mix properties into target object.
 * the rightest object's value has the highest priority.
 */
function extend(to) {
  var args = [],
      len = arguments.length - 1;
  while (len-- > 0) {
    args[len] = arguments[len + 1];
  }if (!args || args.length <= 0) {
    return to;
  }
  args.forEach(function (from) {
    if ((typeof from === 'undefined' ? 'undefined' : _typeof(from)) !== 'object') {
      return;
    }
    for (var key in from) {
      to[key] = from[key];
    }
  });
  return to;
}
/**
 * Mix truthy or '' property values into target object.
 * mostly for merging styles. (that's why '' is falsy but still should be counted in.)
 * the rightest object's value has the highest priority.
 */
function extendTruthy(to) {
  var args = [],
      len = arguments.length - 1;
  while (len-- > 0) {
    args[len] = arguments[len + 1];
  }if (!args || args.length <= 0) {
    return to;
  }
  args.forEach(function (from) {
    if ((typeof from === 'undefined' ? 'undefined' : _typeof(from)) !== 'object') {
      return;
    }
    var i;
    for (var key in from) {
      if (((i = from[key]) || i === '' || i === 0) && i !== 'undefined') {
        to[key] = i;
      }
    }
  });
  return to;
}
/**
 * Mix specified properties into target object.
 */
function extendKeys(to, from, keys) {
  if (from === void 0) from = {};

  (keys || []).forEach(function (key) {
    from && (to[key] = from[key]);
  });
  return to;
}
/**
 * Extract specified properties from src to target object.
 */
function extractKeys(to, from, keys) {
  if (from === void 0) from = {};

  if (!from) {
    return to;
  }
  (keys || []).forEach(function (key) {
    from && (to[key] = from[key]);
    from && delete from[key];
  });
  return to;
}
/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */
function bind(fn, ctx) {
  return function (a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  };
}
/**
 * Only call the func the last time before it's not that frequently called.
 */
function debounce(func, wait) {
  var timerId;
  function later() {
    timerId = null;
    func.apply(null);
  }
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(later, wait);
  };
}
/**
 * Only call the func the first time before a series frequently function calls happen.
 */
function depress(func, wait) {
  var timerId;

  function later() {
    timerId = null;
  }
  return function () {
    if (!timerId) {
      func.apply();
    }
    clearTimeout(timerId);
    timerId = setTimeout(later, wait);
  };
}
/**
 * Only call the func every time after a wait milliseconds if it's too frequently called.
 */
function throttle(func, wait, callLastTime) {
  var last = 0;
  var lastTimer = null;
  var lastTimeDuration = wait + (wait > 25 ? wait : 25); // plus half wait time.
  return function () {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }var context = this;
    var time = new Date().getTime();
    if (time - last > wait) {
      if (callLastTime) {
        lastTimer && clearTimeout(lastTimer);
        lastTimer = setTimeout(function () {
          lastTimer = null;
          func.apply(context, args);
        }, lastTimeDuration);
      }
      func.apply(context, args);
      last = time;
    }
  };
}
// direction: 'l' | 'r', default is 'r'
// num: how many times to loop, should be a positive integer
function loopArray(arr, num, direction) {
  if (!isArray(arr)) {
    return;
  }
  var isLeft = (direction + '').toLowerCase() === 'l';
  var len = arr.length;
  num = num % len;
  if (num < 0) {
    num = -num;
    isLeft = !isLeft;
  }
  if (num === 0) {
    return arr;
  }
  var lp, rp;
  if (isLeft) {
    lp = arr.slice(0, num);
    rp = arr.slice(num);
  } else {
    lp = arr.slice(0, len - num);
    rp = arr.slice(len - num);
  }
  return rp.concat(lp);
}
/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delmited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c.toUpperCase();
  });
});
function camelizeKeys(obj) {
  var res = {};
  for (var key in obj) {
    res[camelize(key)] = obj[key];
  }
  return res;
}
/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
});
function hyphenateKeys(obj) {
  var res = {};
  for (var key in obj) {
    res[hyphenate(key)] = obj[key];
  }
  return res;
}
var vendorsReg = /webkit-|moz-|o-|ms-/;
function hyphenateStyleKeys(obj) {
  var res = {};
  for (var key in obj) {
    var hk = hyphenate(key).replace(vendorsReg, function ($0) {
      return '-' + $0;
    });
    res[hk] = obj[key];
  }
  return res;
}
function camelToKebab(name) {
  if (!name) {
    return '';
  }
  return name.replace(/([A-Z])/g, function (g, g1) {
    return "-" + g1.toLowerCase();
  });
}
function appendCss(css, cssId, replace) {
  var style = document.getElementById(cssId);
  if (style && replace) {
    style.parentNode.removeChild(style);
    style = null;
  }
  if (!style) {
    style = document.createElement('style');
    style.type = 'text/css';
    cssId && (style.id = cssId);
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  style.appendChild(document.createTextNode(css));
}
function nextFrame(callback) {
  var runner = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (cb) {
    return setTimeout(cb, 16);
  };
  runner(callback);
}
function toCSSText(object) {
  if (!object) {
    return;
  }
  var obj = hyphenateStyleKeys(object);
  var cssText = '';
  for (var key in obj) {
    cssText += key + ":" + obj[key] + ";";
  }
  return cssText;
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// 

/**
 * viewport priority:
 *
 * 1. meta weex-viewport (developer custom)
 * 2. setViewport(config) := config.width (private code) @deprecated
 * 3. 750 (buid time)
 *
 */
var isInited = false;
var DEFAULT_VIEWPORT_WIDTH = 750;

/**
 * get viewport width from weex-viewport meta.
 */
var envViewportWidth = parseInt(750);
var width = !isNaN(envViewportWidth) && envViewportWidth > 0 ? envViewportWidth : DEFAULT_VIEWPORT_WIDTH;

var wxViewportMeta = document.querySelector('meta[name="weex-viewport"]');
var metaWidth = wxViewportMeta && parseInt(wxViewportMeta.getAttribute('content'));
if (metaWidth && !isNaN(metaWidth) && metaWidth > 0) {
  width = metaWidth;
}

var dpr = 0;
var screenWidth = 0;
var screenHeight = 0;

var info = {
  dpr: dpr,
  scale: 0,
  rem: 0,
  deviceWidth: 0,
  deviceHeight: 0
};

/**
 * set root font-size for rem units. If already been set, just skip this.
 */
function setRootFont(width) {
  var doc = window.document;
  var rem = width / 10;
  if (!doc.documentElement) {
    return;
  }
  var rootFontSize = doc.documentElement.style.fontSize;
  if (!rootFontSize) {
    doc.documentElement.style.fontSize = rem + 'px';
    info.rem = rem;
  }
}

function setMetaViewport(width) {
  if (!wxViewportMeta) {
    wxViewportMeta = document.createElement('meta');
    wxViewportMeta.setAttribute('name', 'weex-viewport');
  } else {
    var metaWidth = parseInt(wxViewportMeta.getAttribute('content'));
    if (metaWidth === width) {
      return;
    }
  }
  wxViewportMeta.setAttribute('content', width + '');
}

/**
 * export viewport info.
 */
function init$2(viewportWidth) {
  if (viewportWidth === void 0) viewportWidth = width;

  if (!isInited) {
    isInited = true;

    var doc = window.document;
    if (!doc) {
      console.error('[vue-render] window.document is undfined.');
      return;
    }
    if (!doc.documentElement) {
      console.error('[vue-render] document.documentElement is undfined.');
      return;
    }

    dpr = info.dpr = window.devicePixelRatio;
    screenWidth = doc.documentElement.clientWidth;
    screenHeight = doc.documentElement.clientHeight;

    var resetDeviceHeight = function resetDeviceHeight() {
      screenHeight = doc.documentElement.clientHeight;
      var env = window.weex && window.weex.config.env;
      info.deviceHeight = env.deviceHeight = screenHeight * dpr;
    };

    // set root font for rem.
    setRootFont(screenWidth);
    setMetaViewport(viewportWidth);

    window.addEventListener('resize', resetDeviceHeight);

    /**
     * why not to use window.screen.width to get screenWidth ? Because in some
     * old webkit browser on android system it get the device pixel width, which
     * is the screenWidth multiply by the device pixel ratio.
     * e.g. ip6 -> get 375 for virtual screen width.
     */
    var scale = screenWidth / viewportWidth;
    /**
     * 1. if set initial/maximum/mimimum-scale some how the page will have a bounce
     * effect when user drag the page towards horizontal axis.
     * 2. Due to compatibility reasons, not to use viewport meta anymore. Just bring
     * a parameter scale into the style value processing.
     */

    // const contents = [
    //   `width=${viewportWidth}`,
    //   `initial-scale=${scale}`,
    //   `maximum-scale=${scale}`,
    //   `minimum-scale=${scale}`,
    //   `user-scalable=no`
    // ]

    // let meta = doc.querySelector('meta[name="viewport"]')
    // if (!meta) {
    //   meta = doc.createElement('meta')
    //   meta.setAttribute('name', 'viewport')
    //   document.querySelector('head').appendChild(meta)
    // }
    // meta.setAttribute('content', contents.join(','))

    extend(info, {
      scale: scale,
      deviceWidth: screenWidth * dpr,
      deviceHeight: screenHeight * dpr
    });
  }

  return info;
}

/**
 * reset viewport width and scale.
 * @return new scale.
 */

function getViewportInfo() {
  return info;
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function extend$1(to) {
  var args = [],
      len = arguments.length - 1;
  while (len-- > 0) {
    args[len] = arguments[len + 1];
  }if (!args || args.length <= 0) {
    return to;
  }
  args.forEach(function (from) {
    if ((typeof from === 'undefined' ? 'undefined' : _typeof(from)) !== 'object') {
      return;
    }
    for (var key in from) {
      to[key] = from[key];
    }
  });
  return to;
}

// if support passive event listeners.
var _supportsPassive = false;
try {
  document.createElement('div').addEventListener('test', function (_) {}, {
    get passive() {
      _supportsPassive = true;
    }
  });
} catch (e) {
  // do nothing.
}
function supportsPassive() {
  return _supportsPassive;
}

/**
 * Create Event.
 * @param {DOMString} type
 * @param {Object} props
 */
function createEvent(target, type, props) {
  var event = new Event(type, { bubbles: false });

  extend$1(event, props);
  //  phantomjs don't support customer event
  if (window.navigator.userAgent.toLowerCase().indexOf('phantomjs') !== -1) {
    return event;
  }
  try {
    Object.defineProperty(event, 'target', {
      enumerable: true,
      value: target
    });
  } catch (err) {
    return extend$1({}, event, { target: target });
  }
  return event;
}

/**
 * Create a bubbable Event.
 * @param {DOMString} type
 * @param {Object} props
 */
function createBubblesEvent(target, type, props) {
  var event = new Event(type, { bubbles: true });
  extend$1(event, props);
  //  phantomjs don't support customer event
  if (window.navigator.userAgent.toLowerCase().indexOf('phantomjs') !== -1) {
    return event;
  }
  try {
    Object.defineProperty(event, 'target', {
      enumerable: true,
      value: target
    });
  } catch (err) {
    return extend$1({}, event, { target: target });
  }
  return event;
}

/**
 * Create Custom Event.
 * @param {DOMString} type
 * @param {Object} props
 */
function createCustomEvent(target, type, props) {
  // compatibility: http://caniuse.com/#search=customevent
  // const event = new CustomEvent(type)
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(type, false, true, {});
  // event.preventDefault()
  // event.stopPropagation()

  extend$1(event, props);

  // event.target is readonly
  try {
    Object.defineProperty(event, 'target', {
      enumerable: true,
      value: target || null
    });
  } catch (err) {
    return extend$1({}, event, { target: target || null });
  }

  return event;
}

/**
 * dispatch a event on a dom element.
 * @param  {HTMLElement} dom
 * @param  {Event} event
 */
function dispatchEvent(dom, event) {
  dom.dispatchEvent(event);
}

function mapFormEvents(context) {
  var eventMap = {};['input', 'change', 'focus', 'blur'].forEach(function (type) {
    eventMap[type] = function (event) {
      if (context.$el) {
        event.value = context.$el.value;
      }
      context.$emit(type, event);
    };
  });
  return eventMap;
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var config = {
  scrollableTypes: ['scroller', 'list', 'waterfall'],
  gestureEvents: ['panstart', 'panmove', 'panend', 'swipe', 'longpress', 'tap']
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function getParentScroller(vm) {
  if (!vm) {
    return null;
  }
  if (vm._parentScroller) {
    return vm._parentScroller;
  }
  function _getParentScroller(parent) {
    if (!parent) {
      return;
    }
    if (config.scrollableTypes.indexOf(parent.weexType) > -1) {
      vm._parentScroller = parent;
      return parent;
    }
    return _getParentScroller(parent.$parent);
  }
  return _getParentScroller(vm.$parent);
}

function horizontalBalance(rect, ctRect) {
  return rect.left < ctRect.right && rect.right > ctRect.left;
}

function verticalBalance(rect, ctRect) {
  return rect.top < ctRect.bottom && rect.bottom > ctRect.top;
}

/**
 * return a data array with two boolean value, which are:
 * 1. visible in current ct's viewport.
 * 2. visible with offset in current ct's viewport.
 */
function hasIntersection(rect, ctRect, dir, offset) {
  dir = dir || 'up';
  var isHorizontal = dir === 'left' || dir === 'right';
  var isVertical = dir === 'up' || dir === 'down';
  if (isHorizontal && !verticalBalance(rect, ctRect)) {
    return [false, false];
  }
  if (isVertical && !horizontalBalance(rect, ctRect)) {
    return [false, false];
  }
  offset = parseInt(offset || 0) * weex.config.env.scale;
  switch (dir) {
    case 'up':
      return [rect.top < ctRect.bottom && rect.bottom > ctRect.top, rect.top < ctRect.bottom + offset && rect.bottom > ctRect.top - offset];
    case 'down':
      return [rect.bottom > ctRect.top && rect.top < ctRect.bottom, rect.bottom > ctRect.top - offset && rect.top < ctRect.bottom + offset];
    case 'left':
      return [rect.left < ctRect.right && rect.right > ctRect.left, rect.left < ctRect.right + offset && rect.right > ctRect.left - offset];
    case 'right':
      return [rect.right > ctRect.left && rect.left < ctRect.right, rect.right > ctRect.left - offset && rect.left < ctRect.right + offset];
  }
}

/**
 * isElementVisible
 * @param  {HTMLElement}  el    a dom element.
 * @param  {HTMLElement}  container  optional, the container of this el.
 */
function isElementVisible(el, container, dir, offset) {
  if (!el.getBoundingClientRect) {
    return false;
  }
  var bodyRect = {
    top: 0,
    left: 0,
    bottom: window.innerHeight,
    right: window.innerWidth
  };
  var ctRect = container === window || container === document.body ? bodyRect : container ? container.getBoundingClientRect() : bodyRect;
  return hasIntersection(el.getBoundingClientRect(), ctRect, dir, offset);
}

// to trigger the appear/disappear event.
function triggerEvent(elm, handlers, evt, dir) {
  var listener = handlers[evt];
  if (listener && listener.fn) {
    listener = listener.fn;
  }
  if (listener) {
    listener(createEvent(elm, evt, {
      direction: dir
    }));
  }
}

/**
 * get all event listeners. including bound handlers in all parent vnodes.
 */
function getEventHandlers(context) {
  var vnode = context.$vnode;
  var handlers = {};
  var attachedVnodes = [];
  while (vnode) {
    attachedVnodes.push(vnode);
    vnode = vnode.parent;
  }
  attachedVnodes.forEach(function (vnode) {
    var parentListeners = vnode.componentOptions && vnode.componentOptions.listeners;
    var dataOn = vnode.data && vnode.data.on;
    extend(handlers, parentListeners, dataOn);
  });
  return handlers;
}

function getAppearOffset(el) {
  return el && el.getAttribute('appear-offset');
}

function checkHandlers(handlers) {
  return [!!(handlers.appear || handlers.disappear), !!(handlers.offsetAppear || handlers.offsetDisappear)];
}

/**
 * Watch element's visibility to tell whether should trigger a appear/disappear
 * event in scroll handler.
 */
function watchAppear(context, fireNow) {
  var el = context && context.$el;
  if (!el || el.nodeType !== 1) {
    return;
  }
  var appearOffset = getAppearOffset(el);

  var handlers = getEventHandlers(context);
  var checkResults = checkHandlers(handlers);
  // no appear or offsetAppear handler was bound.
  if (!checkResults[0] && !checkResults[1]) {
    return;
  }

  var isWindow = false;
  var container = window;
  var scroller = getParentScroller(context);
  if (scroller && scroller.$el) {
    container = scroller.$el;
  } else {
    isWindow = true;
  }

  if (fireNow) {
    var visibleData = isElementVisible(el, container, null, appearOffset);
    detectAppear(context, visibleData, null);
  }

  // add current vm to the container's appear watch list.
  if (!container._watchAppearList) {
    container._watchAppearList = [];
  }
  container._watchAppearList.push(context);

  /**
   * Code below will only exec once for binding scroll handler for parent container.
   */
  if (container._scrollWatched) {
    return;
  }
  container._scrollWatched = true;
  var scrollHandler = throttle(function (event) {
    /**
     * detect scrolling direction.
     * direction only support up & down yet.
     * TODO: direction support left & right.
     */
    var scrollTop = isWindow ? window.pageYOffset : container.scrollTop;
    var preTop = container._lastScrollTop;
    container._lastScrollTop = scrollTop;
    var dir = (scrollTop < preTop ? 'down' : scrollTop > preTop ? 'up' : container._prevDirection) || null;
    container._prevDirection = dir;
    var watchAppearList = container._watchAppearList || [];
    var len = watchAppearList.length;
    for (var i = 0; i < len; i++) {
      var vm = watchAppearList[i];
      var el = vm.$el;
      var appearOffset = getAppearOffset(el);
      var visibleData = isElementVisible(el, container, dir, appearOffset);
      detectAppear(vm, visibleData, dir);
    }
  }, 25, true);
  container.addEventListener('scroll', scrollHandler, false);
  /**
   * In case the users use the body's overflow to scroll. Then the scroll
   * event would not be handled on the window object but on the body.
   */
  if (isWindow) {
    document.body.addEventListener('scroll', scrollHandler, false);
  }
}

/**
 * trigger a disappear event.
 */
function triggerDisappear(context) {
  return detectAppear(context, [false, false]);
}

/**
 * decide whether to trigger a appear/disappear event.
 * @param {VueComponent} context
 * @param {boolean} visible
 * @param {string} dir
 */
function detectAppear(context, visibleData, dir, appearOffset) {
  if (dir === void 0) dir = null;

  var el = context && context.$el;
  var visible = visibleData[0];
  var offsetVisible = visibleData[1];
  if (!el) {
    return;
  }
  var handlers = getEventHandlers(context);
  /**
   * No matter it's binding appear/disappear or both of them. Always
   * should test it's visibility and change the context/._visible.
   * If neithor of them was bound, then just ignore it.
   */
  /**
   * if the component hasn't appeared for once yet, then it shouldn't trigger
   * a disappear event at all.
   */
  if (context._appearedOnce || visible) {
    if (context._visible !== visible) {
      if (!context._appearedOnce) {
        context._appearedOnce = true;
      }
      context._visible = visible;
      triggerEvent(el, handlers, visible ? 'appear' : 'disappear', dir);
    }
  }
  if (context._offsetAppearedOnce || offsetVisible) {
    if (context._offsetVisible !== offsetVisible) {
      if (!context._offsetAppearedOnce) {
        context._offsetAppearedOnce = true;
      }
      context._offsetVisible = offsetVisible;
      triggerEvent(el, handlers, offsetVisible ? 'offsetAppear' : 'offsetDisappear', dir);
    }
  }
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// 

function preLoadImg(src, loadCallback, errorCallback) {
  var img = new Image();
  img.onload = loadCallback ? loadCallback.bind(img) : null;
  img.onerror = errorCallback ? errorCallback.bind(img) : null;
  img.src = src;
}

function applySrc(item, src, placeholderSrc) {
  if (!src) {
    return;
  }
  function finallCb() {
    delete item._src_loading;
  }
  if (item._src_loading === src) {
    return;
  }
  /**
   * 1. apply src immediately in case javscript blocks the image loading
   *  before next tick.
   */
  item.style.backgroundImage = "url(" + (src || '') + ")";
  item.removeAttribute('img-src');
  /**
   * 2. then load the img src with Image constructor (but would not post
   *  a request again), just to trigger the load event.
   */
  item._src_loading = src;
  preLoadImg(src, function (evt) {
    item.style.backgroundImage = "url(" + (src || '') + ")";
    var ref = this;
    var naturalWidth = ref.width;
    var naturalHeight = ref.height;
    var params = {
      success: true,
      size: { naturalWidth: naturalWidth, naturalHeight: naturalHeight }
    };
    dispatchEvent(item, createEvent(item, 'load', params));
    finallCb();
  }, function (evt) {
    var params = {
      success: false,
      size: { naturalWidth: 0, naturalHeight: 0 }
    };
    dispatchEvent(item, createEvent(item, 'load', params));
    if (placeholderSrc) {
      preLoadImg(placeholderSrc, function () {
        item.style.backgroundImage = "url(" + (placeholderSrc || '') + ")";
      });
    }
    finallCb();
  });
}

function getCtScroller(el) {
  if (!el) {
    return;
  }
  var scroller = el._ptScroller;
  if (!scroller) {
    var pt = el.parentElement;
    while (pt && pt !== document.body) {
      if ((pt.className + '' || '').match(/weex-list|weex-scroller|weex-waterfall/)) {
        scroller = pt;
        break;
      }
      pt = pt.parentElement;
    }
    scroller = pt;
    el._ptScroller = pt;
  }
  return scroller;
}

function fireLazyload(el, ignoreVisibility) {
  if (Array.isArray(el)) {
    return el.forEach(function (ct) {
      return fireLazyload(ct);
    });
  }
  el = el || document.body;
  if (!el) {
    return;
  }
  var imgs = (el || document.body).querySelectorAll('[img-src]');
  if (el.getAttribute('img-src')) {
    imgs = [el];
  }
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    if (typeof ignoreVisibility === 'boolean' && ignoreVisibility) {
      applySrc(img, img.getAttribute('img-src'), img.getAttribute('img-placeholder'));
    } else if (isElementVisible(img, getCtScroller(el))[0]) {
      applySrc(img, img.getAttribute('img-src'), img.getAttribute('img-placeholder'));
    }
  }
}

/**
 * cache a throttle lazyload function for every container element
 * once for different wait times separate.
 *   the architecture of this cache:
 *      cache: {
 *        el.id: {
 *          wait: throttledFunction () { ... }
 *        }
 *      }
 */
var cache = {};
var _uid$2 = 1;
function getThrottleLazyload(wait, el) {
  if (wait === void 0) wait = 16;
  if (el === void 0) el = document.body;

  var id = +(el && el.dataset.throttleId);
  if (isNaN(id) || id <= 0) {
    id = _uid$2++;
    el && el.setAttribute('data-throttle-id', id + '');
  }

  !cache[id] && (cache[id] = {});
  var throttled = cache[id][wait] || (cache[id][wait] = throttle(fireLazyload.bind(this, el), parseFloat(wait),
  // true for callLastTime.
  // to trigger once more time after the last throttled function called with a little more delay.
  true));
  return throttled;
}

var capitalizeString_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = capitalizeString;
  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  module.exports = exports["default"];
});

var prefixProperty_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prefixProperty;

  var _capitalizeString = capitalizeString_1;

  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function prefixProperty(prefixProperties, property, style) {
    if (prefixProperties.hasOwnProperty(property)) {
      var requiredPrefixes = prefixProperties[property];
      for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
        style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
      }
    }
  }
  module.exports = exports['default'];
});

var prefixValue_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prefixValue;
  function prefixValue(plugins, property, value, style, metaData) {
    for (var i = 0, len = plugins.length; i < len; ++i) {
      var processedValue = plugins[i](property, value, style, metaData);

      // we can stop processing if a value is returned
      // as all plugin criteria are unique
      if (processedValue) {
        return processedValue;
      }
    }
  }
  module.exports = exports["default"];
});

var addNewValuesOnly_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addNewValuesOnly;
  function addIfNew(list, value) {
    if (list.indexOf(value) === -1) {
      list.push(value);
    }
  }

  function addNewValuesOnly(list, values) {
    if (Array.isArray(values)) {
      for (var i = 0, len = values.length; i < len; ++i) {
        addIfNew(list, values[i]);
      }
    } else {
      addIfNew(list, values);
    }
  }
  module.exports = exports["default"];
});

var isObject_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isObject;
  function isObject(value) {
    return value instanceof Object && !Array.isArray(value);
  }
  module.exports = exports["default"];
});

var createPrefixer_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createPrefixer;

  var _prefixProperty = prefixProperty_1;

  var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

  var _prefixValue = prefixValue_1;

  var _prefixValue2 = _interopRequireDefault(_prefixValue);

  var _addNewValuesOnly = addNewValuesOnly_1;

  var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

  var _isObject = isObject_1;

  var _isObject2 = _interopRequireDefault(_isObject);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function createPrefixer(_ref) {
    var prefixMap = _ref.prefixMap,
        plugins = _ref.plugins;

    function prefixAll(style) {
      for (var property in style) {
        var value = style[property];

        // handle nested objects
        if ((0, _isObject2.default)(value)) {
          style[property] = prefixAll(value);
          // handle array values
        } else if (Array.isArray(value)) {
          var combinedValue = [];

          for (var i = 0, len = value.length; i < len; ++i) {
            var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
            (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
          }

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (combinedValue.length > 0) {
            style[property] = combinedValue;
          }
        } else {
          var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (_processedValue) {
            style[property] = _processedValue;
          }

          (0, _prefixProperty2.default)(prefixMap, property, style);
        }
      }

      return style;
    }

    return prefixAll;
  }
  module.exports = exports['default'];
});

var staticData = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var w = ["Webkit"];
  var m = ["Moz"];
  var ms = ["ms"];
  var wm = ["Webkit", "Moz"];
  var wms = ["Webkit", "ms"];
  var wmms = ["Webkit", "Moz", "ms"];

  exports.default = {
    plugins: [],
    prefixMap: { "appearance": wm, "userSelect": wmms, "textEmphasisPosition": w, "textEmphasis": w, "textEmphasisStyle": w, "textEmphasisColor": w, "boxDecorationBreak": w, "clipPath": w, "maskImage": w, "maskMode": w, "maskRepeat": w, "maskPosition": w, "maskClip": w, "maskOrigin": w, "maskSize": w, "maskComposite": w, "mask": w, "maskBorderSource": w, "maskBorderMode": w, "maskBorderSlice": w, "maskBorderWidth": w, "maskBorderOutset": w, "maskBorderRepeat": w, "maskBorder": w, "maskType": w, "textDecorationStyle": w, "textDecorationSkip": w, "textDecorationLine": w, "textDecorationColor": w, "filter": w, "fontFeatureSettings": w, "breakAfter": wmms, "breakBefore": wmms, "breakInside": wmms, "columnCount": wm, "columnFill": wm, "columnGap": wm, "columnRule": wm, "columnRuleColor": wm, "columnRuleStyle": wm, "columnRuleWidth": wm, "columns": wm, "columnSpan": wm, "columnWidth": wm, "writingMode": wms, "flex": w, "flexBasis": w, "flexDirection": w, "flexGrow": w, "flexFlow": w, "flexShrink": w, "flexWrap": w, "alignContent": w, "alignItems": w, "alignSelf": w, "justifyContent": w, "order": w, "transform": w, "transformOrigin": w, "transformOriginX": w, "transformOriginY": w, "backfaceVisibility": w, "perspective": w, "perspectiveOrigin": w, "transformStyle": w, "transformOriginZ": w, "animation": w, "animationDelay": w, "animationDirection": w, "animationFillMode": w, "animationDuration": w, "animationIterationCount": w, "animationName": w, "animationPlayState": w, "animationTimingFunction": w, "backdropFilter": w, "fontKerning": w, "scrollSnapType": wms, "scrollSnapPointsX": wms, "scrollSnapPointsY": wms, "scrollSnapDestination": wms, "scrollSnapCoordinate": wms, "shapeImageThreshold": w, "shapeImageMargin": w, "shapeImageOutside": w, "hyphens": wmms, "flowInto": wms, "flowFrom": wms, "regionFragment": wms, "textAlignLast": m, "tabSize": m, "wrapFlow": ms, "wrapThrough": ms, "wrapMargin": ms, "gridTemplateColumns": ms, "gridTemplateRows": ms, "gridTemplateAreas": ms, "gridTemplate": ms, "gridAutoColumns": ms, "gridAutoRows": ms, "gridAutoFlow": ms, "grid": ms, "gridRowStart": ms, "gridColumnStart": ms, "gridRowEnd": ms, "gridRow": ms, "gridColumn": ms, "gridColumnEnd": ms, "gridColumnGap": ms, "gridRowGap": ms, "gridArea": ms, "gridGap": ms, "textSizeAdjust": wms, "borderImage": w, "borderImageOutset": w, "borderImageRepeat": w, "borderImageSlice": w, "borderImageSource": w, "borderImageWidth": w, "transitionDelay": w, "transitionDuration": w, "transitionProperty": w, "transitionTimingFunction": w }
  };
  module.exports = exports["default"];
});

var cursor_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cursor;
  var prefixes = ['-webkit-', '-moz-', ''];

  var values = {
    'zoom-in': true,
    'zoom-out': true,
    grab: true,
    grabbing: true
  };

  function cursor(property, value) {
    if (property === 'cursor' && values.hasOwnProperty(value)) {
      return prefixes.map(function (prefix) {
        return prefix + value;
      });
    }
  }
  module.exports = exports['default'];
});

var isPrefixedValue_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isPrefixedValue;
  var regex = /-webkit-|-moz-|-ms-/;

  function isPrefixedValue(value) {
    return typeof value === 'string' && regex.test(value);
  }
  module.exports = exports['default'];
});

var crossFade_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = crossFade;

  var _isPrefixedValue = isPrefixedValue_1;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  // http://caniuse.com/#search=cross-fade
  var prefixes = ['-webkit-', ''];
  function crossFade(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
      return prefixes.map(function (prefix) {
        return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
      });
    }
  }
  module.exports = exports['default'];
});

var filter_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = filter;

  var _isPrefixedValue = isPrefixedValue_1;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  // http://caniuse.com/#feat=css-filter-function
  var prefixes = ['-webkit-', ''];
  function filter(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
      return prefixes.map(function (prefix) {
        return value.replace(/filter\(/g, prefix + 'filter(');
      });
    }
  }
  module.exports = exports['default'];
});

var flex_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flex;
  var values = {
    flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
    'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
  };

  function flex(property, value) {
    if (property === 'display' && values.hasOwnProperty(value)) {
      return values[value];
    }
  }
  module.exports = exports['default'];
});

var flexboxOld_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flexboxOld;
  var alternativeValues = {
    'space-around': 'justify',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    'wrap-reverse': 'multiple',
    wrap: 'multiple'
  };

  var alternativeProps = {
    alignItems: 'WebkitBoxAlign',
    justifyContent: 'WebkitBoxPack',
    flexWrap: 'WebkitBoxLines'
  };

  function flexboxOld(property, value, style) {
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical';
      } else {
        style.WebkitBoxOrient = 'horizontal';
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse';
      } else {
        style.WebkitBoxDirection = 'normal';
      }
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }
  module.exports = exports['default'];
});

var gradient_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = gradient;

  var _isPrefixedValue = isPrefixedValue_1;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var prefixes = ['-webkit-', '-moz-', ''];

  var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

  function gradient(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
      return prefixes.map(function (prefix) {
        return prefix + value;
      });
    }
  }
  module.exports = exports['default'];
});

var imageSet_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = imageSet;

  var _isPrefixedValue = isPrefixedValue_1;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  // http://caniuse.com/#feat=css-image-set
  var prefixes = ['-webkit-', ''];
  function imageSet(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
      return prefixes.map(function (prefix) {
        return value.replace(/image-set\(/g, prefix + 'image-set(');
      });
    }
  }
  module.exports = exports['default'];
});

var position_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = position;
  function position(property, value) {
    if (property === 'position' && value === 'sticky') {
      return ['-webkit-sticky', 'sticky'];
    }
  }
  module.exports = exports['default'];
});

var sizing_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sizing;
  var prefixes = ['-webkit-', '-moz-', ''];

  var properties = {
    maxHeight: true,
    maxWidth: true,
    width: true,
    height: true,
    columnWidth: true,
    minWidth: true,
    minHeight: true
  };
  var values = {
    'min-content': true,
    'max-content': true,
    'fill-available': true,
    'fit-content': true,
    'contain-floats': true
  };

  function sizing(property, value) {
    if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
      return prefixes.map(function (prefix) {
        return prefix + value;
      });
    }
  }
  module.exports = exports['default'];
});

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache$1 = {};

function hyphenateStyleName(string) {
  return string in cache$1 ? cache$1[string] : cache$1[string] = string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
}

var index$2 = hyphenateStyleName;

var hyphenateProperty_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = hyphenateProperty;

  var _hyphenateStyleName = index$2;

  var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function hyphenateProperty(property) {
    return (0, _hyphenateStyleName2.default)(property);
  }
  module.exports = exports['default'];
});

var transition_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = transition;

  var _hyphenateProperty = hyphenateProperty_1;

  var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

  var _isPrefixedValue = isPrefixedValue_1;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  var _capitalizeString = capitalizeString_1;

  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var properties = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true,
    MozTransition: true,
    MozTransitionProperty: true
  };

  var prefixMapping = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    ms: '-ms-'
  };

  function prefixValue(value, propertyPrefixMap) {
    if ((0, _isPrefixedValue2.default)(value)) {
      return value;
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    for (var i = 0, len = multipleValues.length; i < len; ++i) {
      var singleValue = multipleValues[i];
      var values = [singleValue];
      for (var property in propertyPrefixMap) {
        var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

        if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
          var prefixes = propertyPrefixMap[property];
          for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
            // join all prefixes and create a new value
            values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
          }
        }
      }

      multipleValues[i] = values.join(',');
    }

    return multipleValues.join(',');
  }

  function transition(property, value, style, propertyPrefixMap) {
    // also check for already prefixed transitions
    if (typeof value === 'string' && properties.hasOwnProperty(property)) {
      var outputValue = prefixValue(value, propertyPrefixMap);
      // if the property is already prefixed
      var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
        return !/-moz-|-ms-/.test(val);
      }).join(',');

      if (property.indexOf('Webkit') > -1) {
        return webkitOutput;
      }

      var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
        return !/-webkit-|-ms-/.test(val);
      }).join(',');

      if (property.indexOf('Moz') > -1) {
        return mozOutput;
      }

      style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
      style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
      return outputValue;
    }
  }
  module.exports = exports['default'];
});

var index$1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createPrefixer = createPrefixer_1;

  var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

  var _staticData = staticData;

  var _staticData2 = _interopRequireDefault(_staticData);

  var _cursor = cursor_1;

  var _cursor2 = _interopRequireDefault(_cursor);

  var _crossFade = crossFade_1;

  var _crossFade2 = _interopRequireDefault(_crossFade);

  var _filter = filter_1;

  var _filter2 = _interopRequireDefault(_filter);

  var _flex = flex_1;

  var _flex2 = _interopRequireDefault(_flex);

  var _flexboxOld = flexboxOld_1;

  var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

  var _gradient = gradient_1;

  var _gradient2 = _interopRequireDefault(_gradient);

  var _imageSet = imageSet_1;

  var _imageSet2 = _interopRequireDefault(_imageSet);

  var _position = position_1;

  var _position2 = _interopRequireDefault(_position);

  var _sizing = sizing_1;

  var _sizing2 = _interopRequireDefault(_sizing);

  var _transition = transition_1;

  var _transition2 = _interopRequireDefault(_transition);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

  exports.default = (0, _createPrefixer2.default)({
    prefixMap: _staticData2.default.prefixMap,
    plugins: plugins
  });
  module.exports = exports['default'];
});

var addPrefix = unwrapExports(index$1);

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// 

var noUnitsNumberKeys = ['flex', 'opacity', 'zIndex', 'fontWeight', 'lines'];

// whether to support using 0.5px to paint 1px width border.
var _supportHairlines;
function supportHairlines() {
  if (typeof _supportHairlines === 'undefined') {
    var dpr = window.devicePixelRatio;
    if (dpr && dpr >= 2 && document.documentElement) {
      var docElm = document.documentElement;
      var testElm = document.createElement('div');
      var fakeBody = document.createElement('body');
      var beforeNode = docElm.firstElementChild || docElm.firstChild;
      testElm.style.border = '0.5px solid transparent';
      fakeBody.appendChild(testElm);
      docElm.insertBefore(fakeBody, beforeNode);
      _supportHairlines = testElm.offsetHeight === 1;
      docElm.removeChild(fakeBody);
    } else {
      _supportHairlines = false;
    }
  }
  return _supportHairlines;
}

/**
 * remove comments from a cssText.
 */
function trimComment(cssText) {
  return cssText.replace(/(?:\/\*)[\s\S]*?\*\//g, '');
}

var support$1 = null;

function supportSticky() {
  if (support$1 !== null) {
    return support$1;
  }
  var element = window.document.createElement('div');
  var elementStyle = element.style;
  elementStyle.cssText = 'position:-webkit-sticky;position:sticky;';
  support$1 = elementStyle.position.indexOf('sticky') !== -1;
  return support$1;
}

var regPercentage = /^[+-]?\d+(\.\d+)?%$/;
function isPercentage(val) {
  return regPercentage.test(val);
}

var regUnitsNum = /^([+-]?\d+(?:\.\d+)?)([p,w]x)?$/; // support units: px, wx.
function normalizeUnitsNum(val) {
  var match = val.match(regUnitsNum);
  if (!match) {
    return '';
  }
  var unit = 'px'; // px by default.
  if (match[2]) {
    unit = match[2];
  }
  return parseScale(parseFloat(match[1]), unit);
}

function getUnitScaleMap() {
  var ref = getViewportInfo();
  var scale = ref.scale;
  return {
    px: scale,
    wx: 1 // use px straight, not adaptable to screens.
  };
}

function limitScale(val, limit) {
  limit = limit || 1;
  var sign = val === 0 ? 0 : val > 0 ? 1 : -1;
  var newVal = Math.abs(val) > limit ? val : sign * limit;
  // support 1px device width.
  if (newVal === 1 && val < 1 && supportHairlines()) {
    newVal = 0.5;
  }
  return newVal;
}

function parseScale(val, unit) {
  var unitScaleMap = getUnitScaleMap();
  return limitScale(val * unitScaleMap[unit]) + 'px';
}

function normalizeString(styleKey, styleVal) {
  if (isPercentage(styleVal)) {
    return styleVal;
  }

  /**
   * 1. test if is a regular scale css. e.g. `width: 100px;`
   *  this should be a standalone number value with or without unit, otherwise
   *  it shouldn't be changed.
   */
  var unitsNum = normalizeUnitsNum(styleVal);
  if (unitsNum) {
    return unitsNum;
  }

  /**
   * 2. if a string contains multiple px values, than they should be all normalized.
   *  values should have wx or px units, otherwise they should be left unchanged.
   *  e.g.
   *    transform: translate(10px, 6px, 0)
   *    border: 2px solid red
   */
  var numReg = /([+-]?[\d.]+)([p,w]x)/ig;
  if (numReg.test(styleVal)) {
    var unitScaleMap = getUnitScaleMap();
    var val = styleVal.replace(numReg, function (m, $0, $1) {
      var res = parseFloat($0) * unitScaleMap[$1];
      return limitScale(res) + 'px';
    });
    return val;
  }

  // otherwise
  return styleVal;
}

function autoPrefix(style) {
  var prefixed = addPrefix(style);
  // flex only added WebkitFlex. Should add WebkitBoxFlex also.
  var flex = prefixed.flex;
  if (flex) {
    prefixed.WebkitBoxFlex = flex;
    prefixed.MozBoxFlex = flex;
    prefixed.MsFlex = flex;
  }
  return prefixed;
}

function normalizeNumber(styleKey, styleVal) {
  var ref = getViewportInfo();
  var scale = ref.scale;
  return styleVal * scale + 'px';
}

/**
 * normalize style to adapte to current viewport by multiply current scale.
 * @param  {object} style: should be camelCase.
 */
function normalizeStyle(style) {
  var res = {};
  for (var key in style) {
    var val = style[key];
    if (noUnitsNumberKeys.indexOf(key) > -1) {
      res[key] = val;
      continue;
    }
    switch (typeof val === 'undefined' ? 'undefined' : _typeof(val)) {
      case 'string':
        res[key] = normalizeString(key, val);
        break;
      case 'number':
        res[key] = normalizeNumber(key, val);
        break;
      default:
        res[key] = val;
        break;
    }
  }
  return res;
}

/**
 * get transformObj
 */
function getTransformObj(elm) {
  var styleObj = {};
  if (!elm) {
    return styleObj;
  }
  var transformStr = elm.style.webkitTransform || elm.style.mozTransform || elm.style.transform;
  if (transformStr && transformStr.match(/(?: *(?:translate|rotate|scale)[^(]*\([^(]+\))+/i)) {
    styleObj = transformStr.trim().replace(/, +/g, ',').split(' ').reduce(function (pre, str) {
      ['translate', 'scale', 'rotate'].forEach(function (name) {
        if (new RegExp(name, 'i').test(str)) {
          pre[name] = str;
        }
      });
      return pre;
    }, {});
  }
  return styleObj;
}

/**
 * translate a transform string from a transformObj.
 */
function getTransformStr(obj) {
  return Object.keys(obj).reduce(function (pre, key) {
    return pre + obj[key] + ' ';
  }, '');
}

/**
 * add transform style to element.
 * @param {HTMLElement} elm
 * @param {object} style: transform object, format is like this:
 *   {
 *     translate: 'translate3d(2px, 2px, 2px)',
 *     scale: 'scale(0.2)',
 *     rotate: 'rotate(30deg)'
 *   }
 * @param {boolean} replace: whether to replace all transform properties.
 */
function addTransform(elm, style, replace) {
  if (!style) {
    return;
  }
  var styleObj = {};
  if (!replace) {
    styleObj = getTransformObj(elm);
  }
  for (var key in style) {
    var val = style[key];
    if (val) {
      styleObj[key] = val;
    }
  }
  var resStr = getTransformStr(styleObj);
  elm.style.webkitTransform = resStr;
  elm.style.mozTransform = resStr;
  elm.style.transform = resStr;
}

/**
 * add translate X to the element.
 */
function addTranslateX(elm, toAdd) {
  if (!toAdd) {
    return;
  }
  var styleObj = getTransformObj(elm);
  if (!styleObj.translate) {
    styleObj.translate = 'translate3d(0px, 0px, 0px)';
  }
  styleObj.translate = styleObj.translate.replace(/[+-\d.]+[pw]x/, function ($0) {
    return parseFloat($0) + toAdd + 'px';
  });
  var resStr = getTransformStr(styleObj);
  elm.style.webkitTransform = resStr;
  elm.style.mozTransform = resStr;
  elm.style.transform = resStr;
}

/**
 * copy a transform behaviour from one element to another.
 * key could be: 'translate' | 'scale' | 'rotate'
 */
function copyTransform(from, to, key) {
  var str;
  if (!key) {
    str = from.style.webkitTransform || from.style.mozTransform || from.style.transform;
  } else {
    var fromObj = getTransformObj(from);
    if (!fromObj[key]) {
      return;
    }
    var toObj = getTransformObj(to);
    toObj[key] = fromObj[key];
    str = getTransformStr(toObj);
  }
  to.style.webkitTransform = str;
  to.style.mozTransform = str;
  to.style.transform = str;
}

/**
 * get color's r, g, b value.
 * @param {string} color support all kinds of value of color.
 */
function getRgb(color) {
  var haxReg = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/;
  var rgbReg = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  var span = document.createElement('span');
  var body = document.body;
  span.style.cssText = "color: " + color + "; width: 0px; height: 0px;";
  body && body.appendChild(span);
  color = window.getComputedStyle(span).color + '';
  body && body.removeChild(span);

  var match;
  match = color.match(haxReg);
  if (match) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16)
    };
  }
  match = color.match(rgbReg);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3])
    };
  }
}

/**
 * get style sheet with owner node's id
 * @param {string} id owner node id.
 */
function getStyleSheetById(id) {
  if (!id) {
    return;
  }
  var styleSheets = document.styleSheets;
  var len = styleSheets.length;
  for (var i = 0; i < len; i++) {
    var styleSheet = styleSheets[i];
    if (styleSheet.ownerNode.id === id) {
      return styleSheet;
    }
  }
}

function getChildrenTotalWidth(children) {
  var len = children.length;
  var total = 0;
  for (var i = 0; i < len; i++) {
    total += children[i].getBoundingClientRect().width;
  }
  return total;
}
/**
 * get total content width of the element.
 * @param {HTMLElement} elm
 */
function getRangeWidth(elm) {
  var children = elm.children;
  if (!children) {
    return elm.getBoundingClientRect().width;
  }
  if (!Range) {
    return getChildrenTotalWidth(children);
  }
  var range = document.createRange();
  if (!range.selectNodeContents) {
    return getChildrenTotalWidth(children);
  }
  range.selectNodeContents(elm);
  return range.getBoundingClientRect().width;
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var utils = Object.freeze({
  extend: extend,
  extendTruthy: extendTruthy,
  extendKeys: extendKeys,
  extractKeys: extractKeys,
  bind: bind,
  debounce: debounce,
  depress: depress,
  throttle: throttle,
  loopArray: loopArray,
  cached: cached,
  camelize: camelize,
  camelizeKeys: camelizeKeys,
  capitalize: capitalize,
  hyphenate: hyphenate,
  hyphenateKeys: hyphenateKeys,
  hyphenateStyleKeys: hyphenateStyleKeys,
  camelToKebab: camelToKebab,
  appendCss: appendCss,
  nextFrame: nextFrame,
  toCSSText: toCSSText,
  supportsPassive: supportsPassive,
  createEvent: createEvent,
  createBubblesEvent: createBubblesEvent,
  createCustomEvent: createCustomEvent,
  dispatchEvent: dispatchEvent,
  mapFormEvents: mapFormEvents,
  getParentScroller: getParentScroller,
  hasIntersection: hasIntersection,
  isElementVisible: isElementVisible,
  getEventHandlers: getEventHandlers,
  watchAppear: watchAppear,
  triggerDisappear: triggerDisappear,
  detectAppear: detectAppear,
  applySrc: applySrc,
  fireLazyload: fireLazyload,
  getThrottleLazyload: getThrottleLazyload,
  supportHairlines: supportHairlines,
  trimComment: trimComment,
  supportSticky: supportSticky,
  isPercentage: isPercentage,
  normalizeUnitsNum: normalizeUnitsNum,
  normalizeString: normalizeString,
  autoPrefix: autoPrefix,
  normalizeNumber: normalizeNumber,
  normalizeStyle: normalizeStyle,
  getTransformObj: getTransformObj,
  getTransformStr: getTransformStr,
  addTransform: addTransform,
  addTranslateX: addTranslateX,
  copyTransform: copyTransform,
  getRgb: getRgb,
  getStyleSheetById: getStyleSheetById,
  getRangeWidth: getRangeWidth,
  isPlainObject: isPlainObject,
  isArray: isArray
});

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/**
 * get WXEnvironment info.
 * @param  {object} viewportInfo: info about viewport.
 * @param  {object} envInfo: info parsed from lib.env.
 */
function initEnv(viewportInfo, envInfo) {
  var browserName = envInfo.browser ? envInfo.browser.name : navigator.appName;
  var browserVersion = envInfo.browser ? envInfo.browser.version.val : null;
  var osName = envInfo.os.name;
  if (osName.match(/(iPhone|iPad|iPod)/i)) {
    osName = 'iOS';
  } else if (osName.match(/Android/i)) {
    osName = 'android';
  }
  var osVersion = envInfo.os.version.val;
  var env = {
    platform: 'Web',
    weexVersion: '0.12.27',
    userAgent: navigator.userAgent,
    appName: browserName,
    appVersion: browserVersion,
    osName: osName,
    osVersion: osVersion,
    deviceModel: envInfo.os.name || null
  };
  /**
   * viewportInfo: scale, deviceWidth, deviceHeight. dpr
   */
  return extend(env, viewportInfo);
}

// const viewportInfo = initViewport()

// 750 by default currently
// const scale = viewportInfo.scale

// const units = {
//   REM: 12 * scale,
//   VW: viewportInfo.deviceWidth / 100,
//   VH: viewportInfo.deviceHeight / 100,
//   VMIN: Math.min(viewportInfo.deviceWidth, viewportInfo.deviceHeight) / 100,
//   VMAX: Math.max(viewportInfo.deviceWidth, viewportInfo.deviceHeight) / 100,
//   CM: 96 / 2.54 * scale,
//   MM: 96 / 25.4 * scale,
//   Q: 96 / 25.4 / 4 * scale,
//   IN: 96 * scale,
//   PT: 96 / 72 * scale,
//   PC: 96 / 6 * scale,
//   PX: scale
// }

// Object.freeze(units)
// Object.freeze(env)

// window.CSS_UNIT = units
window.WXEnvironment = initEnv(init$2(), window.lib.env);

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* global Vue */

var weexModules = {};
var _roots = [];

var weex$4 = {
  __vue__: null,
  utils: utils,
  // units: window.CSS_UNIT,
  config: {
    env: window.WXEnvironment,
    bundleUrl: location.href
  },

  _components: {},
  _modules: weexModules,

  _meta: {
    mounted: {},
    updated: {},
    destroyed: {},
    requiredModules: {},
    apiCalled: {},
    perf: {}
  },

  document: {
    body: {}
  },

  requireModule: function requireModule(moduleName) {
    var metaMod = weex$4._meta.requiredModules;
    if (!metaMod[moduleName]) {
      metaMod[moduleName] = 0;
    }
    metaMod[moduleName]++;
    return weexModules[moduleName];
  },

  registerModule: function registerModule() {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }return (ref = this).registerApiModule.apply(ref, args);
    var ref;
  },

  support: function support(feature) {
    if (feature === void 0) feature = '';

    var match = (feature + '').match(/@(component|module)\/(\w+)(.\w+)?/);
    if (match) {
      var type = match[1];
      var mod = match[2];
      var method = match[3];
      method = method && method.replace(/^\./, '');
      switch (type) {
        case 'component':
          return typeof this._components[mod] !== 'undefined';
        case 'module':
          var module = weexModules[mod];
          return module && method ? !!module[method] : !!module;
      }
    } else {
      console.warn("[vue-render] invalid argument for weex.support: " + feature);
      return null;
    }
  },

  /**
   * Register a new vue instance in this weex instance. Put its root element into weex.document.body.children, so
   * that user can use weex.document.body to walk through all dom structures in all vue instances in the page.
   */
  registerVueInstance: function registerVueInstance(instance) {
    if (!instance instanceof Vue) {
      return;
    }
    var root = instance.$root;
    if (!root || !root.$el) {
      return;
    }
    this.document.body.children.push(root.$el);
  },

  // @deprecated
  require: function require() {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }console.log("[Vue Render] \"weex.require\" is deprecated, please use \"weex.requireModule\" instead.");
    return (ref = this).requireModule.apply(ref, args);
    var ref;
  },

  // @deprecated
  // TODO: rename to registerModule
  registerApiModule: function registerApiModule(name, module, meta) {
    if (!weexModules[name]) {
      weexModules[name] = {};
    }
    if (!!meta && meta.mountType === 'full') {
      weexModules[name] = module;
    }
    var loop = function loop(key) {
      if (module.hasOwnProperty(key)) {
        weexModules[name][key] = function () {
          var called = weex$4._meta.apiCalled;
          if (!called[name]) {
            called[name] = {};
          }
          var calledMod = called[name];
          if (!calledMod[key]) {
            calledMod[key] = 0;
          }
          calledMod[key]++;
          return module[key].apply(weex$4, arguments);
        };
      }
    };

    for (var key in module) {
      loop(key);
    }
  },

  registerComponent: function registerComponent(name, component) {
    if (!this.__vue__) {
      return console.log('[Vue Render] Vue is not found. Please import Vue.js before register a component.');
    }
    this._components[name] = 0;
    if (component._css) {
      var css = component._css.replace(/\b[+-]?[\d.]+rem;?\b/g, function (m) {
        return parseFloat(m) * 75 * weex$4.config.env.scale + 'px';
      });
      appendCss(css, "weex-cmp-" + name);
      delete component._css;
    }
    this.__vue__.component(name, component);
  },

  // @deprecated
  getRoot: function getRoot() {},

  // @deprecated
  sender: {
    performCallback: function performCallback(callback, data, keepAlive) {
      if (typeof callback === 'function') {
        return callback(data);
      }
      return null;
    }
  },

  // @deprecated
  install: function install(module) {
    module.init(this);
  }
};

Object.defineProperty(weex$4.document.body, 'children', {
  get: function get() {
    return _roots;
  }
});['on', 'once', 'off', 'emit'].forEach(function (method) {
  weex$4[method] = function () {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }if (!this._vue) {
      this._vue = new this.__vue__();
    }
    return (ref = this._vue)["$" + method].apply(ref, args);
    var ref;
  };
});

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// 
/**
 * @fileOverview: perf data recorder.
 */

var perf = window._weex_perf = {
  time: {}
};

var tmp = {};

function getNow() {
  var performance = window.performance;
  return performance && performance.now ? performance.now() : new Date().getTime();
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* istanbul ignore next */

var pseudoId = 0;
/**
 * get scoped class style map from stylesheets in <head>.
 */
function getHeadStyleMap() {
  var needToRemoveStyleSheetNodes = [];
  var styleSheetsArr = Array.from(document.styleSheets || []).filter(function (styleSheet) {
    return styleSheet.ownerNode.getAttribute('weex-scanned') !== '1';
  });

  var res = Array.from(styleSheetsArr).reduce(function (pre, styleSheet) {
    styleSheet.ownerNode.setAttribute('weex-scanned', 1);
    /**
     * why not using styleSheet.rules || styleSheet.cssRules to get css rules ?
     * because weex's components defined non-standard style attributes, which is
     * auto ignored when access rule.cssText.
     * another reason not to use cssRules directy:
     * @issue: https://stackoverflow.com/questions/21642277/security-error-the-operation-is-insecure-in-firefox-document-stylesheets
     */
    if (
    // css in a link. just ignore this. probably a link stylesheet.
    styleSheet.ownerNode.tagName.toLowerCase() === 'link' || !styleSheet.ownerNode.textContent
    // pseudo class styleSheet node is generated by weex. just ignore it.
    || styleSheet.ownerNode.id.match(/weex-pseudo-\d+/)) {
      return pre;
    }
    /**
     * start to analyze it's content.
     */
    var strArr = trimComment(styleSheet.ownerNode.textContent.trim()).split(/}/);
    var len = strArr.length;
    var rules = [];
    for (var i = 0; i < len; i++) {
      var str = strArr[i];
      if (!str || str.match(/^\s*$/)) {
        continue;
      }
      /**
       * should match these cases:
       * .a[data-v-xxx] { color: red; }
       * .a[data-v-xxx]:active { color: green; }
       * .a[data-v-xxx], .b[data-v-xxx] { color: red; }
       *
       * should not match these cases:
       * .a { color: red; }
       * etc.
       */
      var match = str.match(/((?:,?\s*\.[\w-]+\[data-v-\w+\](?::\w+)?)+)\s*({[^}]+)/);
      if (!match) {
        // not the vue static class styles map. so acquire no rules for this styleSheet.
        // just jump through this styleSheet and go to analyzing next.
        return pre;
      }
      var clsNms = match[1].split(',').map(function (n) {
        return n.trim();
      });
      var cssText = match[2].replace(/[{}]/g, '').trim();
      var clsNmsIdx = 0;
      var clsNmsLen = clsNms.length;
      while (clsNmsIdx < clsNmsLen) {
        rules.push({
          selectorText: clsNms[clsNmsIdx],
          cssText: cssText
        });
        clsNmsIdx++;
      }
    }
    Array.from(rules).forEach(function (rule) {
      var selector = rule.selectorText || '';
      var isPseudo = false;
      if (selector.match(/:(?:active|focus|enabled|disabled)/)) {
        isPseudo = true;
      }
      var styleObj = trimComment(rule.cssText).split(';').reduce(function (styleObj, statement) {
        statement = statement.trim();
        if (statement && statement.indexOf('/*') <= -1) {
          var resArr = statement.split(':').map(function (part) {
            return part.trim();
          });
          styleObj[resArr[0]] = resArr[1];
        }
        return styleObj;
      }, {});
      if (isPseudo) {
        var txt = Object.keys(styleObj).reduce(function (pre, cur) {
          return pre + cur + ":" + styleObj[cur] + "!important;";
        }, '');
        appendCss(selector + "{" + txt + "}", "weex-pseudo-" + pseudoId++);
      }
      var objMap = !isPseudo ? pre : pre.pseudo;
      var res = objMap[selector];
      if (!res) {
        objMap[selector] = styleObj;
      } else {
        extend(objMap[selector], styleObj);
      }
    });
    /**
     * remove this styleSheet node since it's in the styleMap already. And this style
     * should only be fetched and used from styleMap to generate the final combined
     * component style, not from the stylesheet itself.
     */
    needToRemoveStyleSheetNodes.push(styleSheet.ownerNode);
    return pre;
  }, { pseudo: {} });
  if (!window._no_remove_style_sheets) {
    needToRemoveStyleSheetNodes.forEach(function (node) {
      node.parentNode.removeChild(node);
    });
  } else {}
  return res;
}

// export function getScopeIds (context) {
//   const arr = []
//   let ctx = context
//   let scopeId
//   while (ctx) {
//     scopeId = ctx.$options._scopeId
//     scopeId && arr.push(scopeId)
//     ctx = ctx.$options.parent
//   }
//   return arr
// }

function getScopeId(vnode) {
  return vnode.context.$options._scopeId;
}

/**
 * get style in <style scoped> tags for this component.
 */
function getScopeStyle(vnode, classNames) {
  var scopeId = getScopeId(vnode);
  var style = {};
  var styleMap = weex._styleMap || {};
  var clsNmsIdx = 0;
  var clsNmsLen = classNames.length;
  while (clsNmsIdx < clsNmsLen) {
    var cls = "." + classNames[clsNmsIdx] + "[" + scopeId + "]";
    var map = styleMap[cls];
    map && extendTruthy(style, map);
    clsNmsIdx++;
  }
  return camelizeKeys(style);
}

function getStyle(vnode, extract) {
  var data = vnode.data || {};
  var staticClassNames = typeof data.staticClass === 'string' ? data.staticClass.split(' ') : data.staticClass || [];
  var classNames = typeof data.class === 'string' ? data.class.split(' ') : data.class || [];
  var clsNms = staticClassNames.concat(classNames);
  var style = normalizeStyle(getScopeStyle(vnode, clsNms));
  /**
   * cache static style and bind style.
   * cached staticStyle (including style and staticStyle) has already been normalized
   * in $processStyle. So there's no need to normalize it again.
   */
  if (!data.cached) {
    // cache staticStyle once in the beginning.
    data.cached = extendTruthy({}, data.staticStyle);
  }
  // cache binding style every time since the binding style is variable.
  extendTruthy(data.cached, data.style);
  extend(style, data.cached);
  data.staticStyle = style;
  if (extract) {
    delete data.staticStyle;
    delete data.style;
  }
  return style;
}

/**
 * get style merged with static styles, binding styles, and scoped class styles,
 * with keys in camelcase.
 */
function getComponentStyle(context, extract) {
  if (!context.$vnode) {
    return {};
  }
  var style = {};
  var vnode = context.$vnode;
  while (vnode) {
    extend(style, getStyle(vnode, extract));
    vnode = vnode.parent;
  }
  var prefixedStyle = autoPrefix(style);
  /**
   * when prefixed value is a array, it should be applied to element
   * during the next tick.
   * e.g.
   *  background-image:  linear-gradient(to top,#f5fefd,#ffffff);
   *  will generate:
   *  {
   *    backgroundImage: [
   *      "-webkit-linear-gradient(to top,#f5fefd,#ffffff)",
   *      "-moz-linear-gradient(to top,#f5fefd,#ffffff)",
   *      "linear-gradient(to top,#f5fefd,#ffffff)"]
   *  }
   */
  var loop = function loop(k) {
    if (Array.isArray(prefixedStyle[k])) {
      var vals = prefixedStyle[k];
      context.$nextTick(function () {
        var el = context.$el;
        if (el) {
          for (var i = 0; i < vals.length; i++) {
            el.style[k] = vals[i];
          }
        }
      });
      if (k !== 'position') {
        /**
         * Should not delete prefixedStyle[k] directly. Otherwise will
         * trigger issue: https://issues.apache.org/jira/projects/WEEX/issues/WEEX-97
         */
        prefixedStyle[k] = style[k];
      }
    }
  };

  for (var k in prefixedStyle) {
    loop(k);
  } /**
     * If position is 'sticky', then add it to the stickyChildren of the parent scroller.
     */
  var pos = prefixedStyle.position;
  var reg = /sticky$/;
  if (pos === 'fixed') {
    context.$nextTick(function () {
      var el = context.$el;
      if (el) {
        el.classList.add('weex-fixed');
      }
    });
  } else if (isArray(pos) && pos[0].match(reg) || (pos + '').match(reg)) {
    delete prefixedStyle.position;
    // use native sticky.
    if (supportSticky()) {
      context.$nextTick(function () {
        var el = context.$el;
        if (el) {
          el.classList.add('weex-ios-sticky');
        }
      });
    }
    // use re-implementation of sticky.
    else if (!context._stickyAdded) {
        var uid = context._uid;
        var scroller = getParentScroller(context);
        if (scroller) {
          context._stickyAdded = true;
          if (!scroller._stickyChildren) {
            scroller._stickyChildren = {};
          }
          scroller._stickyChildren[uid] = context;
        }
        context.$nextTick(function () {
          var el = context.$el;
          if (el) {
            context._initOffsetTop = el.offsetTop;
          }
        });
      }
  }

  return prefixedStyle;
}

function extractComponentStyle(context) {
  return getComponentStyle(context, true);
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * remove text nodes in the nodes array.
 * @param  {Array} nodes
 * @return {Array} nodes without text nodes.
 */
function trimTextVNodes(vnodes) {
  if (isArray(vnodes)) {
    return vnodes.filter(function (vnode) {
      return !!vnode.tag;
    });
  }
  return vnodes;
}

/**
 * get listeners from on config and v-on binding.
 * v-on binding has a priority over on config.
 * @param {vnode} vnode
 * @param {String} evt: event name.
 */
function getListeners(vnode, evt) {
  var handlers = [];
  while (vnode) {
    if (vnode.data && vnode.data.on) {
      var handler = vnode.data.on[evt];
      handler && handlers.push(handler);
    }
    if (vnode.componentOptions && vnode.componentOptions.listeners) {
      var handler$1 = vnode.componentOptions.listeners[evt];
      handler$1 && handlers.push(handler$1);
    }
    vnode = vnode.parent;
  }
  return handlers;
}

/**
 * Instead of vue's invoker, this function should check if the binding function
 * has a _weex_hook flag. If there is one, the handler should not be triggered.
 * @param {Array | Function} fns
 */
function applyFns(fns) {
  var args = [],
      len$1 = arguments.length - 1;
  while (len$1-- > 0) {
    args[len$1] = arguments[len$1 + 1];
  }if (Array.isArray(fns)) {
    var cloned = fns.slice();
    var len = cloned.length;
    for (var i = 0; i < len; i++) {
      var fn = cloned[i];
      if (fn._weex_hook) {
        continue;
      }
      fn.apply(null, args);
    }
  } else {
    if (!fns._weex_hook) {
      fns.apply(null, args);
    }
  }
}

/**
 * emit native events to enable v-on.
 * @param {VComponent} context: which one to emit a event on.
 * @param {array | object} events: extra events. You can pass in multiple arguments here.
 */
function createEventMap(context) {
  var events = [],
      len$1 = arguments.length - 1;
  while (len$1-- > 0) {
    events[len$1] = arguments[len$1 + 1];
  }var eventMap = {};
  /**
   * Bind some original type event to your specified type event handler.
   * e.g. bind 'tap' event to 'click' event listener: bindFunc('tap')('click').
   * Or bind certian event with your specified handler: bindFunc('click', someFunction)
   */
  var bindFunc = function bindFunc(originalType) {
    return function (listenTo) {
      var handler;
      var evtName = originalType || listenTo;
      if (typeof listenTo === 'function') {
        handler = listenTo;
      } else if (typeof listenTo === 'string') {
        handler = function handler(e) {
          /**
           * use '_triggered' to control actural bubbling (allow original bubbling).
           */
          if (e._triggered) {
            return;
          }
          /**
           * trigger the closest parent which has bound event handlers.
           */
          var vm = context;
          while (vm) {
            var ons = getListeners(vm._vnode || vm.$vnode, listenTo);
            var len = ons.length;
            if (len > 0) {
              var idx = 0;
              while (idx < len) {
                var on = ons[idx];
                applyFns(on.fns, e);
                idx++;
              }
              // once a parent node (or self node) has triggered the handler, then
              // it stops bubbling immediately, and a '_triggered' object is set.
              e._triggered = {
                el: vm.$el
              };
              return;
            }
            vm = vm.$parent;
          }
        };
        // flag to distinguish from user-binding listeners.
        handler._weex_hook = true;
      }
      if (!eventMap[evtName]) {
        eventMap[evtName] = [];
      }
      eventMap[evtName].push(handler);
    };
  };

  /**
   * component's extra event bindings. This is mostly for the needs of component's
   * own special behaviours. These handlers will be processed after the user's
   * corresponding event handlers.
   */
  if (events) {
    var len = events.length;
    for (var i = 0; i < len; i++) {
      var extra = events[i];
      if (isArray(extra)) {
        extra.forEach(bindFunc());
      } else if ((typeof extra === 'undefined' ? 'undefined' : _typeof(extra)) === 'object') {
        for (var key in extra) {
          bindFunc(key)(extra[key]);
        }
      }
    }
  }

  return eventMap;
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var core$1 = Object.freeze({
  getHeadStyleMap: getHeadStyleMap,
  getScopeId: getScopeId,
  getScopeStyle: getScopeStyle,
  getComponentStyle: getComponentStyle,
  extractComponentStyle: extractComponentStyle,
  trimTextVNodes: trimTextVNodes,
  applyFns: applyFns,
  createEventMap: createEventMap
});

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var lazyloadWatched = false;
function watchLazyload() {
  lazyloadWatched = true;['scroll',
  // 'transitionend',
  // 'webkitTransitionEnd',
  // 'animationend',
  // 'webkitAnimationEnd',
  'resize'].forEach(function (evt) {
    window.addEventListener(evt, getThrottleLazyload(25, document.body));
  });
  /**
   * In case the users use the body's overflow to scroll. Then the scroll
   * event would not be triggered on the window object but on the body.
   */
  document.body.addEventListener('scroll', getThrottleLazyload(25, document.body));
}

var warned = false;
var notePage = 'https://gist.github.com/MrRaindrop/5a805a067146609e5cfd4d64d775d693#file-weex-vue-render-config-for-vue-loader-js';
function warnProcessStyle() {
  if (!warned) {
    warned = true;
    var page = window._process_style_note_page || notePage;
    console.warn("[vue-render]: you should add vue-loader config with $processStyle to enable inline styles's " + "normalization. see " + page + " If you already did this, please ignore this message.");
  }
}

var idCnt = 0;

var base$1 = {
  beforeCreate: function beforeCreate() {
    if (!lazyloadWatched) {
      watchLazyload();
    }
  },

  updated: function updated() {
    if (this._rootId) {
      var el = this.$el;
      if (el.nodeType === 1 && el.className.indexOf('weex-root') <= -1) {
        el.classList.add('weex-root');
        el.setAttribute('data-wx-root-id', this._rootId);
      }
    }

    var tagName = this.$options && this.$options._componentTag;
    var metaUp = weex._meta.updated;
    if (!metaUp[tagName]) {
      metaUp[tagName] = 0;
    }
    metaUp[tagName]++;
    /**
     * since the updating of component may affect the layout, the lazyloading should
     * be fired.
     */
    this._fireLazyload();
  },

  mounted: function mounted() {
    var tagName = this.$options && this.$options._componentTag;
    if (typeof weex._components[tagName] !== 'undefined') {
      weex._components[tagName]++;
    }
    var metaMt = weex._meta.mounted;
    if (!metaMt[tagName]) {
      metaMt[tagName] = 0;
    }
    metaMt[tagName]++;
    if (this === this.$root) {
      var rootId = "wx-root-" + idCnt++;
      if (!weex._root) {
        weex._root = {};
      }
      weex._root[rootId] = this;
      this._rootId = rootId;
      var el = this.$el;
      if (el.nodeType !== 1) {
        return;
      }
      el.classList.add('weex-root');
      el.setAttribute('data-wx-root-id', rootId);
      this._fireLazyload(el);
    }

    // give warning for not using $processStyle in vue-loader config.
    if (!warned && !window._style_processing_added) {
      warnProcessStyle();
    }

    // bind attrs to $el.
    var i, j;
    if (this.$el && (i = j = this.$vnode) && (i = i.data) && (j = j.componentOptions)) {
      this.$el.attrs = extend({}, i.attrs, j.propsData);
    }
    watchAppear(this, true);
  },

  destroyed: function destroyed() {
    /**
     * if the destroyed element is above another panel with images inside, and the images
     * moved into the viewport, then the lazyloading should be triggered.
     */
    if (this._rootId) {
      delete weex._root[this._rootId];
      delete this._rootId;
    }
    var tagName = this.$options && this.$options._componentTag;
    if (typeof weex._components[tagName] !== 'undefined') {
      weex._components[tagName]--;
    }
    var metaDs = weex._meta.destroyed;
    if (!metaDs[tagName]) {
      metaDs[tagName] = 0;
    }
    metaDs[tagName]++;

    this._fireLazyload();
    triggerDisappear(this);
  },

  methods: {
    _fireLazyload: function _fireLazyload(el) {
      getThrottleLazyload(25, el || document.body)();
    }
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/**
 * get a beforeCreate hook, which has a mark to identify the hook function itself.
 */
function getIdentifiedBeforeCreate() {
  var disposed = {}; // disposed components. Already scanned.
  function beforeCreate() {
    /**
     * get static class style map from document's styleSheets.
     * Weex.on will create a Vue instance. In this case we'll ignore it, since
     * it's not sure whether the scoped style has already attached to head or not.
     */
    var tagName = this.$options && this.$options._componentTag;
    /**
     * For vue-loader ^11.3.x, there's no injectStyle function. The styleSheet
     * is already injected into the head. Just scan it.
     */
    // async component.
    if (this.$vnode && this.$vnode.data && this.$vnode.data.tag === 'component' || this === this.$root && this.$options && !this._firstScanned) {
      this._firstScanned = true;
      extend(weex._styleMap, getHeadStyleMap());
    }
    /**
     * For vue-loader ^12.0, the injectStyle function is hooked. We should scan
     * style map after the injectStyle hook called.
     */
    if ((this === this.$root && this.$options || tagName && typeof weex._components[tagName] === 'undefined' && !disposed[tagName]) && !this._secondScanned) {
      disposed[tagName] = 1;
      this._secondScanned = true;
      var hooks = this.$options.beforeCreate;
      var len = hooks.length;
      var thisHookIdx = 0; // index of this hook in the hooks array.
      for (; thisHookIdx < len; thisHookIdx++) {
        if (hooks[thisHookIdx]._styleMixin) {
          break;
        }
      }
      if (thisHookIdx !== len - 1) {
        var func = hooks[len - 1];
        hooks[len - 1] = function () {
          // call the original injectStyle hook.
          func.call(this);
          // scan the new appended styleSheet.
          extend(weex._styleMap, getHeadStyleMap());
          hooks[len - 1] = func;
        };
      }
    }
  }
  beforeCreate._styleMixin = true;
  return beforeCreate;
}

var style = {
  beforeCreate: getIdentifiedBeforeCreate(),

  methods: {
    $processStyle: function $processStyle(style) {
      window._style_processing_added = true;
      if (!style) {
        return;
      }
      return normalizeStyle(camelizeKeys(style));
    },

    _getParentRect: function _getParentRect() {
      var parentElm = this.$options._parentElm;
      return parentElm && parentElm.getBoundingClientRect();
    }
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// 

// input and textare has some common api and event
var findEnterKeyType = function findEnterKeyType(key) {
  var keys = ['default', 'go', 'next', 'search', 'send'];
  if (keys.indexOf(key) > -1) {
    return key;
  }
  return 'done';
};

var inputCommon = {
  methods: {
    focus: function focus() {
      this.$el && this.$el.focus();
    },
    blur: function blur() {
      this.$el && this.$el.blur();
    },

    setSelectionRange: function setSelectionRange(start, end) {
      try {
        this.$el.setSelectionRange(start, end);
      } catch (e) {}
    },

    getSelectionRange: function getSelectionRange(callback) {
      try {
        var selection = window.getSelection();
        var str = selection.toString();
        var selectionStart = this.$el.value.indexOf(str);
        var selectionEnd = selectionStart === -1 ? selectionStart : selectionStart + str.length;
        callback && callback({
          selectionStart: selectionStart,
          selectionEnd: selectionEnd
        });
      } catch (e) {
        callback && callback(new Error('[vue-render] getSelection is not supported.'));
      }
    },

    getEditSelectionRange: function getEditSelectionRange(callback) {
      return this.getSelectionRange(callback);
    },

    // support enter key event
    createKeyboardEvent: function createKeyboardEvent(events) {
      var customKeyType = this.returnKeyType;
      var self = this;
      if (this._events['return']) {
        var keyboardEvents = {
          'keyup': function keyup(ev) {
            var code = ev.keyCode;
            var key = ev.key;
            if (code === 13) {
              if (!key || key.toLowerCase() === 'tab') {
                ev.key = 'next';
              }
              var rightKeyType = findEnterKeyType(customKeyType);
              ev.returnKeyType = rightKeyType;
              ev.value = ev.target.value;
              self.$emit('return', ev);
            }
          }
        };
        events = extend(events, keyboardEvents);
      }
      return events;
    }
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var sticky = {
  destroyed: function destroyed() {
    if (!this._stickyAdded) {
      return;
    }
    var scroller = getParentScroller(this);
    if (!scroller) {
      return;
    }
    delete scroller._stickyChildren[this._uid];
  },

  methods: {
    _addSticky: function _addSticky() {
      var el = this.$el;
      if (!el || el.nodeType === 1) {
        return;
      }
      el.classList.add('sticky');
      if (!this._placeholder) {
        this._placeholder = el.cloneNode(true);
      }
      this._placeholder.style.display = 'block';
      this._placeholder.style.width = this.$el.offsetWidth + 'px';
      this._placeholder.style.height = this.$el.offsetHeight + 'px';
      el.parentNode.insertBefore(this._placeholder, this.$el);
    },

    _removeSticky: function _removeSticky() {
      var el = this.$el;
      if (!el || el.nodeType === 1) {
        return;
      }
      el.classList.remove('sticky');
      if (this._placeholder) {
        this._placeholder.parentNode.removeChild(this._placeholder);
      }
      this._placeholder = null;
    }
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
window.global = window;
window.weex = weex$4;

weex$4._styleMap = {};['getComponentStyle', 'extractComponentStyle', 'createEventMap', 'trimTextVNodes'].forEach(function (method) {
  weex$4[method] = core$1[method].bind(weex$4);
});

weex$4.mixins = {
  inputCommon: inputCommon
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function setVue(vue) {
  if (!vue) {
    throw new Error('[Vue Render] Vue not found. Please make sure vue 2.x runtime is imported.');
  }
  global.weex.__vue__ = vue;
  console.log("[Vue Render] install Vue " + vue.version + ".");
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var gestureEvents = config.gestureEvents;
var nativeEvents = ['click', 'touchstart', 'touchmove', 'touchend'];
var needPassive = ['touchmove'];

var events = gestureEvents.concat(nativeEvents);

/**
 * if el is a `<a>` element.
 * @param {HTMLElement} el
 */
function isANode(el) {
  return el.tagName.toLowerCase() === 'a';
}

function isInANode(el) {
  var parent = el.parentElement;
  while (parent && parent !== document.body) {
    if (parent.tagName === 'A') {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
}

/**
 * get listeners from on config and v-on binding.
 * v-on binding has a priority over on config.
 * @param {vnode} vnode
 * @param {String} evt: event name.
 */
function getListeners$1(vnode, evt) {
  var handlers = [];
  while (vnode) {
    if (vnode.data && vnode.data.on) {
      var handler = vnode.data.on[evt];
      handler && handlers.push(handler);
    }
    if (vnode.componentOptions && vnode.componentOptions.listeners) {
      var handler$1 = vnode.componentOptions.listeners[evt];
      handler$1 && handlers.push(handler$1);
    }
    vnode = vnode.parent;
  }
  return handlers;
}

var _inited$1 = false;
function _init(doc) {
  if (_inited$1) {
    return;
  }
  if (!doc) {
    return;
  }
  _inited$1 = true;
  var _sp = supportsPassive();
  events.forEach(function (evt) {
    /**
     * use capture for click handling, therefore there's a chance to handle
     * it before any other listeners binding on document or document.body.
     */
    var option = evt === 'click' ? true : needPassive.indexOf(evt) > -1 && _sp ? { passive: true } : false;
    doc.addEventListener(evt, function (e) {
      var el = e.target;
      var vm = el.__vue__;
      while (!vm && el && el !== document.body) {
        el = el.parentElement;
        vm = el && el.__vue__;
      }
      if (!vm) {
        // not a vue component.
        return;
      }
      var disposed = false;
      var evtName = e.type;

      if (evtName === 'tap' && e._for !== 'weex') {
        return;
      }

      while (vm) {
        var vnode = vm._vnode || vm.$vnode;
        var elm = vm.$el;
        var ons = getListeners$1(vnode, evtName === 'tap' ? 'click' : evtName);
        var len = ons && ons.length;

        if (len > 0) {
          if (evtName !== 'click') {
            for (var i = 0; i < len; i++) {
              var handler = ons[i];
              var newEvt = evtName === 'tap' ? createEvent(el, 'click') : e;
              newEvt._triggered = { target: elm };
              applyFns(handler.fns, newEvt);
            }
          }
          e._triggered = { target: elm };
          disposed = true;
        }

        if (isANode(elm) && (evtName === 'click' || evtName === 'tap')) {
          var href = elm.getAttribute('href');
          var voidHrefReg = /^\s*javascript\s*:\s*void\s*(?:\(\s*0\s*\)|0)\s*;?\s*$/;
          var prevent = elm.getAttribute('prevent');
          if (window._should_intercept_a_jump && window._should_intercept_a_jump(elm)) {
            // e._triggered should not be true since we left the intercepter to handle the event.
            e._triggered = false;
            disposed = true;
          } else if (href.match(voidHrefReg) || prevent === '' || prevent === 'true') {
            e._triggered = false;
            e.preventDefault();
          } else {
            e._triggered = { target: elm };
            disposed = true; // handled by default behavior for clicking on a element.
          }
        }

        /**
         * If the click handler is binding on a element inside a <a> element,
         * then should prevent default.
         */
        if (disposed && evtName === 'click' && isInANode(elm)) {
          e._triggered = { target: elm };
          e.preventDefault();
          return;
        }

        if (disposed) {
          return;
        }
        vm = vm.$parent;
      }
    }, option);
  });
}

function init$3() {
  _init(document);
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/**
 * init weex.
 * @param  {Vue$2} Vue: Vue Constructor.
 * @param  {object} options: extend weex plugins.
 *         - components.
 *         - modules.
 */
var _inited = false;
function init$1(Vue /*, options = {}*/) {
  if (_inited) {
    return;
  }
  _inited = true;

  setVue(Vue);

  Vue.prototype.$getConfig = function () {
    console.warn('[Vue Render] "this.$getConfig" is deprecated, please use "weex.config" instead.');
    return weex.config;
  };

  var htmlRegex = /^html:/i;
  Vue.config.isReservedTag = function (tag) {
    return htmlRegex.test(tag);
  };
  Vue.config.parsePlatformTagName = function (tag) {
    return tag.replace(htmlRegex, '');
  };

  function isWeexTag(tag) {
    return typeof weex._components[tag] !== 'undefined';
  }
  var oldGetTagNamespace = Vue.config.getTagNamespace;
  Vue.config.getTagNamespace = function (tag) {
    if (isWeexTag(tag)) {
      return;
    }
    return oldGetTagNamespace(tag);
  };

  Vue.mixin(base$1);
  Vue.mixin(style);
  Vue.mixin(sticky);

  init$3();
}

// auto init in dist mode.
if (typeof window !== 'undefined' && window.Vue) {
  init$1(window.Vue);
}

weex.init = init$1;

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// import { validateStyles } from '../validator'

var _css = "\n.weex-a {\n  text-decoration: none;\n}\n";

function getA(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var trimTextVNodes = weex.trimTextVNodes;

  return {
    name: 'weex-a',
    props: {
      href: String
    },
    render: function render(createElement) {
      /* istanbul ignore next */
      // if ("production" === 'development') {
      //   validateStyles('a', this.$vnode.data && this.$vnode.data.staticStyle)
      // }
      return createElement('html:a', {
        attrs: {
          'weex-type': 'a',
          href: this.href
        },
        staticClass: 'weex-a weex-ct',
        staticStyle: extractComponentStyle(this)
      }, trimTextVNodes(this.$slots.default));
    },
    _css: _css
  };
}

var a = {
  init: function init(weex) {
    weex.registerComponent('a', getA(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var _css$1 = "\nbody > .weex-div {\n  min-height: 100%;\n}\n";

function getDiv(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var trimTextVNodes = weex.trimTextVNodes;

  return {
    name: 'weex-div',
    render: function render(createElement) {
      return createElement('html:div', {
        attrs: { 'weex-type': 'div' },
        staticClass: 'weex-div weex-ct',
        staticStyle: extractComponentStyle(this)
      }, trimTextVNodes(this.$slots.default));
    },
    _css: _css$1
  };
}

var div = {
  init: function init(weex) {
    var div = getDiv(weex);
    weex.registerComponent('div', div);
    weex.registerComponent('container', div);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var extractComponentStyle$1;
var createEventMap$1;
var extend$2;
var isArray$1;

var IMG_NAME_BITS = 15;

var _css$2 = "\n.weex-image, .weex-img {\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n}\n";
/**
 * 1. get sprite style if spritePosition is set.
 * 2. else get resize (stetch|cover|contain) related styles.
 */
function getCustomStyle(context, mergedStyle) {
  var spritePosition = context.spritePosition;
  if (spritePosition && !isArray$1(spritePosition)) {
    spritePosition = (spritePosition + '').split(',').map(function (val) {
      return val.replace(/[[\]]/g, '').replace(/^\s*(\S[\s\S]*?)\s*$/g, function ($0, $1) {
        return parseInt($1);
      });
    });
  }
  if (spritePosition) {
    var posX = -spritePosition[0];
    var posY = -spritePosition[1];
    var scale = weex.config.env.scale;
    var sizeScale = parseFloat(context.spriteWidth) / parseFloat(mergedStyle.width) * weex.config.env.scale;
    return {
      'background-position': posX * scale + "px " + posY * scale + "px",
      'background-size': sizeScale * 100 + "%"
    };
  }
  var stretch = '100% 100%';
  var resize = context.resize || stretch;
  var bgSize = ['cover', 'contain', stretch].indexOf(resize) > -1 ? resize : stretch;
  // compatibility: http://caniuse.com/#search=background-size
  return { 'background-size': bgSize };
}

function preProcessSrc(context, url, mergedStyle) {
  // somehow the merged style in _prerender hook is gone.
  // just return the original src.
  if (!mergedStyle || !mergedStyle.width || !mergedStyle.height) {
    return url;
  }
  var width = mergedStyle.width;
  var height = mergedStyle.height;
  return context.processImgSrc && context.processImgSrc(url, {
    width: parseFloat(width),
    height: parseFloat(height),
    quality: context.quality,
    sharpen: context.sharpen,
    original: context.original
  }) || url;
}

function download(url, callback) {
  function success() {
    callback && callback({
      success: true
    });
  }
  function fail(err) {
    callback && callback({
      success: false,
      errorDesc: err + ''
    });
  }
  try {
    var isDataUrl = false;
    var parts;
    var name;
    if (url.match(/data:image\/[^;]+;base64,/)) {
      isDataUrl = true;
      parts = url.split(',');
    }
    if (!isDataUrl) {
      name = url.replace(/\?[^?]+/, '').replace(/#[^#]+/, '').match(/([^/]+)$/);
    } else {
      name = parts[1].substr(0, IMG_NAME_BITS);
    }
    var aEl = document.createElement('a');
    aEl.href = url;
    /**
     * Not all browser support this 'download' attribute. In these browsers it'll jump
     * to the photo url page and user have to longpress the photo to save it.
     */
    aEl.download = name;
    var clickEvt = new Event('click', { bubbles: false });
    aEl.dispatchEvent(clickEvt);
    success();
  } catch (err) {
    fail(err);
  }
}

var image = {
  name: 'weex-image',
  props: {
    src: String,
    placeholder: String,
    resize: String,
    quality: String,
    sharpen: String,
    original: [String, Boolean],
    spriteSrc: String,
    spritePosition: [String, Array],
    spriteWidth: [String, Number]
  },

  updated: function updated() {
    this._fireLazyload();
  },

  mounted: function mounted() {
    this._fireLazyload();
  },

  methods: {
    save: function save(callback) {
      download(this.src, callback);
    }
  },

  render: function render(createElement) {
    var style = extractComponentStyle$1(this);
    var customStyle = getCustomStyle(this, style);
    return createElement('figure', {
      attrs: {
        'weex-type': 'image',
        'img-src': this.spriteSrc || preProcessSrc(this, this.src, style),
        'img-placeholder': preProcessSrc(this, this.placeholder, style),
        'sprite-src': this.spriteSrc,
        'sprite-position': this.spritePosition,
        'sprite-width': this.spriteWidth
      },
      on: createEventMap$1(this, ['load', 'error']),
      staticClass: 'weex-image weex-el',
      staticStyle: extend$2(style, customStyle)
    });
  },
  _css: _css$2
};

var image$1 = {
  init: function init(weex) {
    extractComponentStyle$1 = weex.extractComponentStyle;
    createEventMap$1 = weex.createEventMap;
    extend$2 = weex.utils.extend;
    isArray$1 = weex.utils.isArray;

    weex.registerComponent('image', image);
    weex.registerComponent('img', image);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileOverview Input component.
 * Support v-model only if vue version is larger than 2.2.0
 */
var extractComponentStyle$2;
var mapFormEvents$1;
var appendCss$1;

var ID_PREFIX_PLACEHOLDER_COLOR = 'wipt_plc_';
var ID_PREFIX_INPUT = 'wipt_';
var idCount = 0;

var _css$3 = "\n.weex-input, .weex-textarea {\n  font-size: 0.426667rem;\n}\n.weex-input:focus, .weex-textarea:focus {\n  outline: none;\n}\n";

function setPlaceholderColor(inputVm, placeholderColor) {
  if (!placeholderColor) {
    return;
  }
  var vendors = ['::-webkit-input-placeholder', ':-moz-placeholder', '::-moz-placeholder', ':-ms-input-placeholder', ':placeholder-shown'];
  var id = inputVm._id;
  appendCss$1(vendors.map(function (vendor, idx) {
    return "#" + ID_PREFIX_INPUT + id + vendors[idx] + "{color:" + placeholderColor + ";}";
  }).join(''), "" + ID_PREFIX_PLACEHOLDER_COLOR + id, true);
}

function processStyle(vm) {
  var styles = extractComponentStyle$2(vm);
  var phColor = styles.placeholderColor;
  if (phColor) {
    setPlaceholderColor(vm, phColor);
  }
  return styles;
}

function getInput(weex) {
  var ref = weex.mixins;
  var inputCommon = ref.inputCommon;

  return {
    name: 'weex-input',
    mixins: [inputCommon],
    props: {
      type: {
        type: String,
        default: 'text',
        validator: function validator(value) {
          return ['email', 'number', 'password', 'search', 'tel', 'text', 'url', 'date', 'datetime', 'time'].indexOf(value) !== -1;
        }
      },
      value: String,
      placeholder: String,
      disabled: {
        type: [String, Boolean],
        default: false
      },
      autofocus: {
        type: [String, Boolean],
        default: false
      },
      maxlength: [String, Number],
      returnKeyType: String
    },

    render: function render(createElement) {
      if (!this._id) {
        this._id = idCount++;
      }
      var events = mapFormEvents$1(this);
      return createElement('html:input', {
        attrs: {
          'weex-type': 'input',
          id: "" + ID_PREFIX_INPUT + this._id,
          type: this.type,
          value: this.value,
          disabled: this.disabled !== 'false' && this.disabled !== false,
          autofocus: this.autofocus !== 'false' && this.autofocus !== false,
          placeholder: this.placeholder,
          maxlength: this.maxlength,
          'returnKeyType': this.returnKeyType
        },
        domProps: {
          value: this.value
        },
        on: this.createKeyboardEvent(events),
        staticClass: 'weex-input weex-el',
        staticStyle: processStyle(this)
      });
    },
    _css: _css$3
  };
}

var input = {
  init: function init(weex) {
    extractComponentStyle$2 = weex.extractComponentStyle;
    mapFormEvents$1 = weex.utils.mapFormEvents;
    appendCss$1 = weex.utils.appendCss;

    weex.registerComponent('input', getInput(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var _css$4 = "\n.weex-switch {\n  border: 0.013333rem solid #dfdfdf;\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  box-sizing: content-box;\n  background-clip: content-box;\n  color: #64bd63;\n  width: 1.333333rem;\n  height: 0.8rem;\n  background-color: white;\n  border-color: #dfdfdf;\n  box-shadow: #dfdfdf 0 0 0 0 inset;\n  border-radius: 0.8rem;\n  -webkit-transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;\n  -moz-transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;\n  transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;\n}\n\n.weex-switch-checked {\n  background-color: #64bd63;\n  border-color: #64bd63;\n  box-shadow: #64bd63 0 0 0 0.533333rem inset;\n}\n\n.weex-switch-checked.weex-switch-disabled {\n  background-color: #A0CCA0;\n  box-shadow: #A0CCA0 0 0 0 0.533333rem inset;\n}\n\n.weex-switch-disabled {\n  background-color: #EEEEEE;\n}\n\n.weex-switch-inner {\n  width: 0.8rem;\n  height: 0.8rem;\n  background: #fff;\n  border-radius: 100%;\n  box-shadow: 0 0.013333rem 0.04rem rgba(0, 0, 0, 0.4);\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-transition: background-color 0.4s, left 0.2s;\n  -moz-transition: background-color 0.4s, left 0.2s;\n  transition: background-color 0.4s, left 0.2s;\n}\n\n.weex-switch-checked > .weex-switch-inner {\n  left: 0.533333rem;\n}\n";

function getSwitch(weex) {
  var extractComponentStyle = weex.extractComponentStyle;

  return {
    name: 'weex-switch',
    props: {
      checked: {
        type: [Boolean, String],
        default: false
      },
      disabled: {
        type: [Boolean, String],
        default: false
      }
    },
    data: function data() {
      return {
        isChecked: this.checked !== 'false' && this.checked !== false,
        isDisabled: this.disabled !== 'false' && this.disabled !== false
      };
    },
    computed: {
      wrapperClass: function wrapperClass() {
        var classArray = ['weex-switch'];
        this.isChecked && classArray.push('weex-switch-checked');
        this.isDisabled && classArray.push('weex-switch-disabled');
        return classArray.join(' ');
      }
    },
    methods: {
      toggle: function toggle() {
        // TODO: handle the events
        if (!this.isDisabled) {
          this.isChecked = !this.isChecked;
          this.$emit('change', { value: this.isChecked });
        }
      }
    },

    mounted: function mounted() {
      var this$1 = this;

      var el = this.$el;
      if (el && el.nodeType === 1) {
        if (!this._removeClickHandler) {
          var handler = function handler(evt) {
            this$1.toggle();
          };
          this._removeClickHandler = el.removeEventListener.bind(el, 'click', handler);
          el.addEventListener('click', handler);
        }
      }
    },

    beforeDestroy: function beforeDestroy() {
      var rm = this._removeClickHandler;
      if (rm) {
        rm();
        delete this._removeClickHandler;
      }
    },

    render: function render(createElement) {
      /* istanbul ignore next */
      // if ("production" === 'development') {
      //   validateStyles('switch', this.$vnode.data && this.$vnode.data.staticStyle)
      // }
      return createElement('span', {
        attrs: { 'weex-type': 'switch' },
        staticClass: this.wrapperClass,
        staticStyle: extractComponentStyle(this)
      }, [createElement('small', { staticClass: 'weex-switch-inner' })]);
    },
    _css: _css$4
  };
}

var _switch = {
  init: function init(weex) {
    weex.registerComponent('switch', getSwitch(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var DEFAULT_OFFSET_ACCURACY = 10;
var DEFAULT_LOADMORE_OFFSET = 0;

function getThrottledScroll(context) {
  var scale = weex.config.env.scale;
  if (!context._throttleScroll) {
    var wrapper = context.$refs.wrapper;
    var inner = context.$refs.inner;
    var preOffset = (context.scrollDirection === 'horizontal' ? wrapper.scrollLeft : wrapper.scrollTop) || 0;
    context._throttleScroll = weex.utils.throttle(function (evt) {
      var offset = context.scrollDirection === 'horizontal' ? wrapper.scrollLeft : wrapper.scrollTop;
      var indent = parseInt(context.offsetAccuracy) * scale;
      function triggerScroll() {
        var rect = inner.getBoundingClientRect();
        evt.contentSize = { width: rect.width, height: rect.height };
        evt.contentOffset = {
          x: wrapper.scrollLeft,
          /**
           * positive direciton for y-axis is down.
           * so should use negative operation on scrollTop.
           *
           *  (0,0)---------------> x
           *       |
           *       |
           *       |
           *       |
           *       v y
           *
           */
          y: -wrapper.scrollTop
        };
        context.$emit('scroll', evt);
      }
      if (Math.abs(offset - preOffset) >= indent) {
        triggerScroll();
        preOffset = offset;
      }
    }, 16, true);
  }
  return context._throttleScroll;
}

var scrollable$1 = {
  props: {
    loadmoreoffset: {
      type: [String, Number],
      default: DEFAULT_LOADMORE_OFFSET,
      validator: function validator(value) {
        var val = parseInt(value);
        return !isNaN(val) && val >= DEFAULT_LOADMORE_OFFSET;
      }
    },

    offsetAccuracy: {
      type: [Number, String],
      default: DEFAULT_OFFSET_ACCURACY,
      validator: function validator$1(value) {
        var val = parseInt(value);
        return !isNaN(val) && val >= DEFAULT_OFFSET_ACCURACY;
      }
    }
  },

  created: function created() {
    // should call resetLoadmore() to enable loadmore event.
    this._loadmoreReset = true;
  },

  methods: {
    updateLayout: function updateLayout() {
      var wrapper = this.$refs.wrapper;
      if (wrapper) {
        var rect = wrapper.getBoundingClientRect();
        this._wrapperWidth = rect.width;
        this._wrapperHeight = rect.height;
      }
      var inner = this.$refs.inner;
      var children = inner && inner.children;
      if (inner) {
        var rect$1 = inner.getBoundingClientRect();
        this._innerWidth = rect$1.width;
        this._innerHeight = rect$1.height;
      }
      var loadingEl = this._loading && this._loading.$el;
      var refreshEl = this._refresh && this._refresh.$el;
      if (loadingEl) {
        this._innerHeight -= loadingEl.getBoundingClientRect().height;
      }
      if (refreshEl) {
        this._innerHeight -= refreshEl.getBoundingClientRect().height;
      }
      // inner width is always the viewport width somehow in horizontal
      // scoller, therefore the inner width should be reclaculated.
      if (this.scrollDirection === 'horizontal' && children) {
        this._innerWidth = weex.utils.getRangeWidth(inner);
      }
    },

    resetLoadmore: function resetLoadmore() {
      this._loadmoreReset = true;
    },

    /**
     * process sticky children in scrollable components.
     * current only support list and vertical scroller.
     */
    processSticky: function processSticky() {
      /**
       * current browser support 'sticky' or '-webkit-sticky', so there's no need
       * to do further more.
       */
      if (weex.utils.supportSticky()) {
        return;
      }
      // current only support list and vertical scroller.
      if (this.scrollDirection === 'horizontal') {
        return;
      }
      var stickyChildren = this._stickyChildren;
      var len = stickyChildren && stickyChildren.length || 0;
      if (len <= 0) {
        return;
      }

      var container = this.$el;
      if (!container) {
        return;
      }
      var scrollTop = container.scrollTop;

      var stickyChild;
      for (var i = 0; i < len; i++) {
        stickyChild = stickyChildren[i];
        if (stickyChild._initOffsetTop < scrollTop) {
          stickyChild._addSticky();
        } else {
          stickyChild._removeSticky();
        }
      }
    },

    handleScroll: function handleScroll(event) {
      weex.utils.getThrottleLazyload(25, this.$el, 'scroll')();
      getThrottledScroll(this)(event);

      this.processSticky();

      // fire loadmore event.
      var inner = this.$refs.inner;
      if (inner) {
        var innerLength = this.scrollDirection === 'horizontal' ? this._innerWidth : this._innerHeight;
        if (!this._innerLength) {
          this._innerLength = innerLength;
        }
        if (this._innerLength !== innerLength) {
          this._innerLength = innerLength;
          this._loadmoreReset = true;
        }
        if (this._loadmoreReset && this.reachBottom(this.loadmoreoffset)) {
          this._loadmoreReset = false;
          this.$emit('loadmore', event);
        }
      }
    },

    reachTop: function reachTop() {
      var wrapper = this.$refs.wrapper;
      return !!wrapper && wrapper.scrollTop <= 0;
    },

    reachBottom: function reachBottom(offset) {
      var wrapper = this.$refs.wrapper;
      var inner = this.$refs.inner;
      offset = parseInt(offset || 0) * weex.config.env.scale;

      if (wrapper && inner) {
        var key = this.scrollDirection === 'horizontal' ? 'width' : 'height';
        var innerLength = this["_inner" + key[0].toUpperCase() + key.substr(1)];
        var wrapperLength = this["_wrapper" + key[0].toUpperCase() + key.substr(1)];
        var scrollOffset = this.scrollDirection === 'horizontal' ? wrapper.scrollLeft : wrapper.scrollTop;
        return scrollOffset >= innerLength - wrapperLength - offset;
      }
      return false;
    },

    handleTouchStart: function handleTouchStart(event) {
      if (this._loading || this._refresh) {
        var touch = event.changedTouches[0];
        this._touchParams = {
          reachTop: this.reachTop(),
          reachBottom: this.reachBottom(),
          startTouchEvent: touch,
          startX: touch.pageX,
          startY: touch.pageY,
          timeStamp: event.timeStamp
        };
      }
    },

    handleTouchMove: function handleTouchMove(event) {
      if (!this._touchParams || !this._refresh && !this._loading) {
        return;
      }
      var inner = this.$refs.inner;
      var ref = this._touchParams;
      var startY = ref.startY;
      var reachTop = ref.reachTop;
      var reachBottom = ref.reachBottom;
      if (inner) {
        var touch = event.changedTouches[0];
        var offsetY = touch.pageY - startY;
        var dir = offsetY > 0 ? 'down' : 'up';
        this._touchParams.offsetY = offsetY;
        if (this._refresh && dir === 'down' && reachTop) {
          this._refresh.pullingDown(offsetY);
        } else if (this._loading && dir === 'up' && reachBottom) {
          this._loading.pullingUp(-offsetY);
        }
      }
    },

    handleTouchEnd: function handleTouchEnd(event) {
      if (!this._touchParams || !this._refresh && !this._loading) {
        return;
      }
      var inner = this.$refs.inner;
      var ref = this._touchParams;
      var startY = ref.startY;
      var reachTop = ref.reachTop;
      var reachBottom = ref.reachBottom;
      if (inner) {
        var touch = event.changedTouches[0];
        var offsetY = touch.pageY - startY;
        var dir = offsetY > 0 ? 'down' : 'up';
        this._touchParams.offsetY = offsetY;
        if (this._refresh && dir === 'down' && reachTop) {
          this._refresh.pullingEnd();
        } else if (this._loading && dir === 'up' && reachBottom) {
          this._loading.pullingEnd();
        }
      }
      delete this._touchParams;
    }
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var listMixin = {
  methods: {
    handleListScroll: function handleListScroll(event) {
      this.handleScroll(event);

      if (weex.utils.supportSticky()) {
        return;
      }

      var scrollTop = this.$el.scrollTop;
      var h = this.$children.filter(function (vm) {
        return vm.$refs.header;
      });

      if (h.length <= 0) {
        return;
      }

      for (var i = 0; i < h.length; i++) {
        if (h[i].initTop < scrollTop) {
          h[i].addSticky();
        } else {
          h[i].removeSticky();
        }
      }
    }
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function getList(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var createEventMap = weex.createEventMap;

  return {
    name: 'weex-list',
    mixins: [scrollable$1, listMixin],
    computed: {
      wrapperClass: function wrapperClass() {
        var classArray = ['weex-list', 'weex-list-wrapper', 'weex-ct'];
        this._refresh && classArray.push('with-refresh');
        this._loading && classArray.push('with-loading');
        return classArray.join(' ');
      }
    },

    methods: {
      createChildren: function createChildren(h) {
        var slots = this.$slots.default || [];
        this._cells = slots.filter(function (vnode) {
          if (!vnode.tag || !vnode.componentOptions) {
            return false;
          }
          return true;
        });
        return [h('article', {
          ref: 'inner',
          staticClass: 'weex-list-inner weex-ct'
        }, this._cells)];
      }
    },

    render: function render(createElement) {
      var this$1 = this;

      this.weexType = 'list';

      this.$nextTick(function () {
        this$1.updateLayout();
      });

      return createElement('main', {
        ref: 'wrapper',
        attrs: { 'weex-type': 'list' },
        staticClass: this.wrapperClass,
        on: createEventMap(this, {
          scroll: this.handleListScroll,
          touchstart: this.handleTouchStart,
          touchmove: this.handleTouchMove,
          touchend: this.handleTouchEnd
        }),
        staticStyle: extractComponentStyle(this)
      }, this.createChildren(createElement));
    }
  };
}

var list$$1 = {
  init: function init(weex) {
    weex.registerComponent('list', getList(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function getScroller(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var createEventMap = weex.createEventMap;

  return {
    name: 'weex-scroller',
    mixins: [scrollable$1, listMixin],
    props: {
      scrollDirection: {
        type: [String],
        default: 'vertical',
        validator: function validator(value) {
          return ['horizontal', 'vertical'].indexOf(value) !== -1;
        }
      },
      scrollable: {
        type: [Boolean],
        default: true
      }
    },
    computed: {
      wrapperClass: function wrapperClass() {
        var classArray = ['weex-scroller', 'weex-scroller-wrapper', 'weex-ct'];
        if (this.scrollDirection === 'horizontal') {
          classArray.push('weex-scroller-horizontal');
        } else {
          classArray.push('weex-scroller-vertical');
        }
        if (!this.scrollable) {
          classArray.push('weex-scroller-disabled');
        }
        return classArray.join(' ');
      }
    },

    methods: {
      createChildren: function createChildren(h) {
        var slots = this.$slots.default || [];
        this._cells = slots.filter(function (vnode) {
          if (!vnode.tag || !vnode.componentOptions) {
            return false;
          }
          return true;
        });
        return [h('article', {
          ref: 'inner',
          staticClass: 'weex-scroller-inner weex-ct'
        }, this._cells)];
      }
    },

    render: function render(createElement) {
      var this$1 = this;

      this.weexType = 'scroller';

      /* istanbul ignore next */
      // if ("production" === 'development') {
      //   validateStyles('scroller', this.$vnode.data && this.$vnode.data.staticStyle)
      // }

      this._cells = this.$slots.default || [];
      this.$nextTick(function () {
        this$1.updateLayout();
      });

      return createElement('main', {
        ref: 'wrapper',
        attrs: { 'weex-type': 'scroller' },
        on: createEventMap(this, {
          scroll: this.handleScroll,
          touchstart: this.handleTouchStart,
          touchmove: this.handleTouchMove,
          touchend: this.handleTouchEnd
        }),
        staticClass: this.wrapperClass,
        staticStyle: extractComponentStyle(this)
      }, this.createChildren(createElement));
    }
  };
}

var scroller = {
  init: function init(weex) {
    weex.registerComponent('scroller', getScroller(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND,  either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview waterfall
 * NOTE: only support full screen width waterfall.
 */

var NORMAL_GAP_SIZE = 32;
var DEFAULT_COLUMN_COUNT = 1;

function getWaterfall(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var createEventMap = weex.createEventMap;

  return {
    name: 'weex-waterfall',
    mixins: [scrollable$1],
    props: {
      /**
       * specified gap size.
       * value can be number or 'normal'. 'normal' (32px) by default.
       */
      columnGap: {
        type: [String, Number],
        default: 'normal',
        validator: function validator(val) {
          if (!val || val === 'normal') {
            return true;
          }
          val = parseInt(val);
          return !isNaN(val) && val > 0;
        }
      },
      /**
       * the maximum column counts.
       * value can be number or 'auto'. 1 by default.
       */
      columnCount: {
        type: [String, Number],
        default: DEFAULT_COLUMN_COUNT,
        validator: function validator$1(val) {
          val = parseInt(val);
          return !isNaN(val) && val > 0;
        }
      },
      /**
       * the mimimum column width.
       * value can be number or 'auto'. 'auto' by default.
       */
      columnWidth: {
        type: [String, Number],
        default: 'auto',
        validator: function validator$2(val) {
          if (!val || val === 'auto') {
            return true;
          }
          val = parseInt(val);
          return !isNaN(val) && val > 0;
        }
      }
    },

    mounted: function mounted() {
      this._nextTick();
    },

    updated: function updated() {
      this.$nextTick(this._nextTick());
    },

    methods: {
      _createChildren: function _createChildren(h, rootStyle) {
        var this$1 = this;

        var slots = this.$slots.default || [];
        this._headers = [];
        this._footers = [];
        this._others = [];
        var len = slots.length;

        for (var i = 0; i < len; i++) {
          var vnode = slots[i];
          var tag = vnode.componentOptions && vnode.componentOptions.tag;
          if (tag === 'refresh' || tag === 'loading') {
            continue;
          }
          if (tag === 'cell') {
            break;
          }
          if (tag === 'header') {
            this$1._headers.push(vnode);
          }
        }

        for (var i$1 = len - 1; i$1 >= 0; i$1--) {
          var vnode$1 = slots[i$1];
          var tag$1 = vnode$1.componentOptions && vnode$1.componentOptions.tag;
          if (tag$1 === 'refresh' || tag$1 === 'loading') {
            continue;
          }
          if (tag$1 === 'cell') {
            break;
          }
          if (tag$1 === 'header') {
            this$1._footers.push(vnode$1);
          }
        }

        this._cells = slots.filter(function (vnode) {
          if (!vnode.tag || !vnode.componentOptions) {
            return false;
          }
          var tag = vnode.componentOptions.tag;
          if (tag === 'refresh' || tag === 'loading') {
            this$1["_" + tag] = vnode;
            return false;
          }
          if (tag !== 'cell') {
            this$1._others.push(vnode);
            return false;
          }
          return true;
        });

        this._reCalc(rootStyle);
        this._genColumns(h);
        var children = [];
        this._refresh && children.push(this._refresh);
        children = children.concat(this._headers);
        // .concat(this._others)
        children.push(h('html:div', {
          ref: 'columns',
          staticClass: 'weex-waterfall-inner-columns weex-ct'
        }, this._columns));
        children.push(h('html:div', {
          ref: 'footers',
          staticClass: 'weex-waterfall-footers weex-ct'
        }, this._footers));
        this._loading && children.push(this._loading);
        return [h('article', {
          ref: 'inner',
          staticClass: 'weex-waterfall-inner weex-ct'
        }, children)];
      },

      _reCalc: function _reCalc(rootStyle) {
        /**
         * NOTE: columnGap and columnWidth can't both be auto.
         * NOTE: the formula:
         *  totalWidth = n * w + (n - 1) * gap
         * 1. if columnCount = n then calc w
         * 2. if columnWidth = w then calc n
         * 3. if columnWidth = w and columnCount = n then calc totalWidth
         *    3.1 if totalWidth < ctWidth then increase columnWidth
         *    3.2 if totalWidth > ctWidth then decrease columnCount
         */
        var width, gap, cnt, ctWidth;
        var scale = weex.config.env.scale;
        var el = this.$el;
        function getCtWidth(width, style) {
          var padding = style.padding ? parseInt(style.padding) * 2 : parseInt(style.paddingLeft || 0) + parseInt(style.paddingRight || 0);
          return width - padding;
        }
        if (el && el.nodeType === 1) {
          // already mounted
          var cstyle = window.getComputedStyle(el);
          ctWidth = getCtWidth(el.getBoundingClientRect().width, cstyle);
        } else {
          // not mounted.
          // only support full screen width for waterfall component.
          ctWidth = getCtWidth(document.documentElement.clientWidth, rootStyle);
        }

        gap = this.columnGap;
        if (gap && gap !== 'normal') {
          gap = parseInt(gap);
        } else {
          gap = NORMAL_GAP_SIZE;
        }
        gap = gap * scale;

        width = this.columnWidth;
        cnt = this.columnCount;
        if (width && width !== 'auto') {
          width = parseInt(width) * scale;
        }
        if (cnt && cnt !== 'auto') {
          cnt = parseInt(cnt);
        }

        // 0. if !columnCount && !columnWidth
        if (cnt === 'auto' && width === 'auto') {}
        // 1. if columnCount = n then calc w.
        else if (cnt !== 'auto' && width === 'auto') {
            width = (ctWidth - (cnt - 1) * gap) / cnt;
          }
          // 2. if columnWidth = w then calc n.
          else if (cnt === 'auto' && width !== 'auto') {
              cnt = (ctWidth + gap) / (width + gap);
            }
            // 3. if columnWidth = w and columnCount = n then calc totalWidth
            else if (cnt !== 'auto' && width !== 'auto') {
                var totalWidth;
                var adjustCountAndWidth = function adjustCountAndWidth() {
                  totalWidth = cnt * width + (cnt - 1) * gap;
                  if (totalWidth < ctWidth) {
                    width += (ctWidth - totalWidth) / cnt;
                  } else if (totalWidth > ctWidth && cnt > 1) {
                    cnt--;
                    adjustCountAndWidth();
                  } else if (totalWidth > ctWidth) {
                    // cnt === 1
                    width = ctWidth;
                  }
                };
                adjustCountAndWidth();
              }
        this._columnCount = cnt;
        this._columnWidth = width;
        this._columnGap = gap;
      },

      _genColumns: function _genColumns(createElement) {
        var this$1 = this;

        this._columns = [];
        var cells = this._cells;
        var columnCnt = this._columnCount;
        var len = cells.length;
        var columnCells = this._columnCells = Array(columnCnt).join('.').split('.').map(function () {
          return [];
        });
        // spread cells to the columns using simpole polling algorithm.
        for (var i = 0; i < len; i++) {
          (cells[i].data.attrs || (cells[i].data.attrs = {}))['data-cell'] = i;
          columnCells[i % columnCnt].push(cells[i]);
        }
        for (var i$1 = 0; i$1 < columnCnt; i$1++) {
          this$1._columns.push(createElement('html:div', {
            ref: "column" + i$1,
            attrs: {
              'data-column': i$1
            },
            staticClass: 'weex-ct',
            staticStyle: {
              width: this$1._columnWidth + 'px',
              marginLeft: i$1 === 0 ? 0 : this$1._columnGap + 'px'
            }
          }, columnCells[i$1]));
        }
      },

      _nextTick: function _nextTick() {
        this._reLayoutChildren();
      },

      _reLayoutChildren: function _reLayoutChildren() {
        var this$1 = this;

        /**
         * treat the shortest column bottom as the match standard.
         * whichever cell exceeded it would be rearranged.
         * 1. m = shortest column bottom.
         * 2. get all cell ids who is below m.
         * 3. calculate which cell should be in which column.
         */
        var columnCnt = this._columnCount;
        var columnDoms = [];
        var columnAppendFragments = [];
        var columnBottoms = [];
        var minBottom = Number.MAX_SAFE_INTEGER;
        var minBottomColumnIndex = 0;

        // 1. find the shortest column bottom.
        for (var i = 0; i < columnCnt; i++) {
          var columnDom = this$1._columns[i].elm;
          var lastChild = columnDom.lastElementChild;
          var bottom = lastChild ? lastChild.getBoundingClientRect().bottom : 0;
          columnDoms.push(columnDom);
          columnBottoms[i] = bottom;
          columnAppendFragments.push(document.createDocumentFragment());
          if (bottom < minBottom) {
            minBottom = bottom;
            minBottomColumnIndex = i;
          }
        }

        // 2. get all cell ids who is below m.
        var belowCellIds = [];
        var belowCells = {};
        for (var i$1 = 0; i$1 < columnCnt; i$1++) {
          if (i$1 === minBottomColumnIndex) {
            continue;
          }
          var columnDom$1 = columnDoms[i$1];
          var cellsInColumn = columnDom$1.querySelectorAll('section.weex-cell');
          var len = cellsInColumn.length;
          for (var j = len - 1; j >= 0; j--) {
            var cellDom = cellsInColumn[j];
            var cellRect = cellDom.getBoundingClientRect();
            if (cellRect.top > minBottom) {
              var id = ~~cellDom.getAttribute('data-cell');
              belowCellIds.push(id);
              belowCells[id] = { elm: cellDom, height: cellRect.height };
              columnBottoms[i$1] -= cellRect.height;
            }
          }
        }

        // 3. calculate which cell should be in which column and rearrange them
        //  in the dom tree.
        belowCellIds.sort(function (a, b) {
          return a > b;
        });
        var cellIdsLen = belowCellIds.length;
        function addToShortestColumn(belowCell) {
          // find shortest bottom.
          minBottom = Math.min.apply(Math, columnBottoms);
          minBottomColumnIndex = columnBottoms.indexOf(minBottom);
          var cellElm = belowCell.elm;
          var cellHeight = belowCell.height;
          columnAppendFragments[minBottomColumnIndex].appendChild(cellElm);
          columnBottoms[minBottomColumnIndex] += cellHeight;
        }
        for (var i$2 = 0; i$2 < cellIdsLen; i$2++) {
          addToShortestColumn(belowCells[belowCellIds[i$2]]);
        }
        for (var i$3 = 0; i$3 < columnCnt; i$3++) {
          columnDoms[i$3].appendChild(columnAppendFragments[i$3]);
        }
      }
    },

    render: function render(createElement) {
      var this$1 = this;

      this.weexType = 'waterfall';
      this._cells = this.$slots.default || [];
      this.$nextTick(function () {
        this$1.updateLayout();
      });
      var mergedStyle = extractComponentStyle(this);
      return createElement('main', {
        ref: 'wrapper',
        attrs: { 'weex-type': 'waterfall' },
        on: createEventMap(this, {
          scroll: this.handleScroll,
          touchstart: this.handleTouchStart,
          touchmove: this.handleTouchMove,
          touchend: this.handleTouchEnd
        }),
        staticClass: 'weex-waterfall weex-waterfall-wrapper weex-ct',
        staticStyle: mergedStyle
      }, this._createChildren(createElement, mergedStyle));
    }
  };
}

var waterfall = {
  init: function init(weex) {
    weex.registerComponent('waterfall', getWaterfall(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function getCell(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  return {
    name: 'weex-cell',
    render: function render(createElement) {
      return createElement('section', {
        attrs: { 'weex-type': 'cell' },
        staticClass: 'weex-cell weex-ct',
        staticStyle: extractComponentStyle(this)
      }, this.$slots.default);
    }
  };
}

var cell = {
  init: function init(weex) {
    weex.registerComponent('cell', getCell(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function getHeader(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var ref = weex.utils;
  var supportSticky = ref.supportSticky;

  return {
    data: function data() {
      return {
        sticky: false,
        initTop: 0,
        placeholder: null,
        supportSticky: supportSticky()
      };
    },

    mounted: function mounted() {
      this.initTop = this.$el.offsetTop;
      this.placeholder = window.document.createElement('header');
    },

    updated: function updated() {
      if (!this.sticky) {
        this.initTop = this.$el.offsetTop;
      }
    },

    methods: {
      addSticky: function addSticky() {
        this.sticky = true;
        this.placeholder.style.display = 'block';
        this.placeholder.style.width = this.$el.offsetWidth + 'px';
        this.placeholder.style.height = this.$el.offsetHeight + 'px';
        this.$el.parentNode.insertBefore(this.placeholder, this.$el);
      },

      removeSticky: function removeSticky() {
        this.sticky = false;
        try {
          this.$el.parentNode.removeChild(this.placeholder);
        } catch (e) {}
      }
    },

    render: function render(createElement) {
      /* istanbul ignore next */
      // if ("production" === 'development') {
      //   validateStyles('header', this.$vnode.data && this.$vnode.data.staticStyle)
      // }
      return createElement('html:header', {
        attrs: { 'weex-type': 'header' },
        ref: 'header',
        staticClass: 'weex-header weex-ct',
        class: { 'weex-sticky': this.sticky, 'weex-ios-sticky': this.supportSticky },
        staticStyle: extractComponentStyle(this)
      }, this.$slots.default);
    }
  };
}

var header = {
  init: function init(weex) {
    weex.registerComponent('header', getHeader(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function getLoading() {
  var extractComponentStyle = weex.extractComponentStyle;

  return {
    name: 'weex-loading',
    props: {
      display: {
        type: String,
        default: 'show',
        validator: function validator(value) {
          return ['show', 'hide'].indexOf(value) !== -1;
        }
      }
    },
    data: function data() {
      return {
        height: -1,
        viewHeight: 0
      };
    },
    mounted: function mounted() {
      this.viewHeight = this.$el.offsetHeight;
      if (this.display === 'hide') {
        this.height = 0;
      } else {
        this.height = this.viewHeight;
      }
    },
    watch: {
      height: function height(val) {
        this.$el.style.height = val + "px";
      },
      display: function display(val) {
        if (val === 'hide') {
          this.height = 0;
        } else {
          this.height = this.viewHeight;
        }
      }
    },
    methods: {
      pulling: function pulling(offsetY) {
        if (offsetY === void 0) offsetY = 0;

        this.height = offsetY;
      },
      pullingUp: function pullingUp(offsetY) {
        this.$el.style.transition = "height 0s";
        this.pulling(offsetY);
      },
      pullingEnd: function pullingEnd() {
        this.$el.style.transition = "height .2s";
        if (this.height >= this.viewHeight) {
          this.pulling(this.viewHeight);
          this.$emit('loading');
        } else {
          this.pulling(0);
        }
      },
      getChildren: function getChildren() {
        var children = this.$slots.default || [];
        if (this.display === 'show') {
          return children;
        }
        return children.filter(function (vnode) {
          return vnode.componentOptions && vnode.componentOptions.tag !== 'loading-indicator';
        });
      }
    },
    render: function render(createElement) {
      this.$parent._loading = this;
      return createElement('aside', {
        ref: 'loading',
        attrs: { 'weex-type': 'loading' },
        staticClass: 'weex-loading weex-ct',
        staticStyle: extractComponentStyle(this)
      }, this.getChildren());
    }
  };
}

var loading = {
  init: function init(weex) {
    weex.registerComponent('loading', getLoading(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function getRefresh(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var ref = weex.utils;
  var createEvent = ref.createEvent;

  return {
    name: 'weex-refresh',
    props: {
      display: {
        type: String,
        default: 'show',
        validator: function validator(value) {
          return ['show', 'hide'].indexOf(value) !== -1;
        }
      }
    },
    data: function data() {
      return {
        lastDy: 0,
        viewHeight: 0,
        height: -1
      };
    },
    mounted: function mounted() {
      this.viewHeight = this.$el.offsetHeight;
      if (this.display === 'hide') {
        this.height = 0;
      } else {
        this.height = this.viewHeight;
      }
    },
    watch: {
      height: function height(val) {
        this.$el.style.height = val + "px";
      },
      display: function display(val) {
        if (val === 'hide') {
          this.height = 0;
        } else {
          this.height = this.viewHeight;
        }
      }
    },
    methods: {
      pulling: function pulling(offsetY) {
        if (offsetY === void 0) offsetY = 0;

        this.height = offsetY;
        this.$emit('pullingdown', createEvent(this, 'pullingdown', {
          dy: offsetY - this.lastDy,
          pullingDistance: offsetY,
          viewHeight: this.viewHeight
        }));
        this.lastDy = offsetY;
      },
      pullingDown: function pullingDown(offsetY) {
        this.$el.style.transition = "height 0s";
        this.pulling(offsetY);
      },
      pullingEnd: function pullingEnd() {
        this.$el.style.transition = "height .2s";
        if (this.height >= this.viewHeight) {
          this.pulling(this.viewHeight);
          this.$emit('refresh');
        } else {
          this.pulling(0);
        }
      },
      getChildren: function getChildren() {
        var children = this.$slots.default || [];
        if (this.display === 'show') {
          return children;
        }
        return children.filter(function (vnode) {
          return vnode.componentOptions && vnode.componentOptions.tag !== 'loading-indicator';
        });
      }
    },
    render: function render(createElement) {
      this.$parent._refresh = this;
      return createElement('aside', {
        ref: 'refresh',
        attrs: { 'weex-type': 'refresh' },
        staticClass: 'weex-refresh weex-ct',
        staticStyle: extractComponentStyle(this)
      }, this.getChildren());
    }
  };
}

var refresh = {
  init: function init(weex) {
    weex.registerComponent('refresh', getRefresh(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var extractComponentStyle$3;
var getRgb$1;
var loopArray$1;
var getStyleSheetById$1;

var _css$5 = "\n.weex-refresh-indicator,\n.weex-loading-indicator {\n  width: 1rem !important;\n  height: 1rem !important;\n  -webkit-box-align: center;\n  -moz-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  overflow: visible;\n  background: none;\n}\n.weex-refresh-indicator:before,\n.weex-loading-indicator:before {\n  display: block;\n  content: '';\n  font-size: 0.16rem;\n  width: 0.5em;\n  height: 0.5em;\n  left: 0;\n  top: 0;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-animation: weex-spinner 1.1s infinite ease;\n  -moz-animation: weex-spinner 1.1s infinite ease;\n  animation: weex-spinner 1.1s infinite ease;\n}\n\n@-webkit-keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -1.3em 0em 0em #ffffff, 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.5), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  11.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.7), 0.9em -0.9em 0 0em #ffffff, 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.5), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7), 1.25em 0em 0 0em #ffffff, 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5), 1.25em 0em 0 0em rgba(255, 255, 255, 0.7), 0.875em 0.875em 0 0em #ffffff, 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.5), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.7), 0em 1.25em 0 0em #ffffff, -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  61.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.5), 0em 1.25em 0 0em rgba(255, 255, 255, 0.7), -0.9em 0.9em 0 0em #ffffff, -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.5), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.7), -1.3em 0em 0 0em #ffffff, -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.5), -1.3em 0em 0 0em rgba(255, 255, 255, 0.7), -0.9em -0.9em 0 0em #ffffff;\n  }\n}\n\n@keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -1.3em 0em 0em #ffffff, 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.5), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  11.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.7), 0.9em -0.9em 0 0em #ffffff, 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.5), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7), 1.25em 0em 0 0em #ffffff, 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5), 1.25em 0em 0 0em rgba(255, 255, 255, 0.7), 0.875em 0.875em 0 0em #ffffff, 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.5), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.7), 0em 1.25em 0 0em #ffffff, -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  61.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.5), 0em 1.25em 0 0em rgba(255, 255, 255, 0.7), -0.9em 0.9em 0 0em #ffffff, -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.5), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.7), -1.3em 0em 0 0em #ffffff, -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.5), -1.3em 0em 0 0em rgba(255, 255, 255, 0.7), -0.9em -0.9em 0 0em #ffffff;\n  }\n}\n";

function getStyleSheet(spinnerVm) {
  if (spinnerVm._styleSheet) {
    return;
  }
  spinnerVm._styleSheet = getStyleSheetById$1('weex-cmp-loading-indicator');
}

function setKeyframeColor(spinnerVm, val) {
  getStyleSheet(spinnerVm);
  var keyframeRules = computeKeyFrameRules(val);
  var rules = spinnerVm._styleSheet.rules || spinnerVm._styleSheet.cssRules;
  for (var i = 0, l = rules.length; i < l; i++) {
    var item = rules.item(i);
    if ((item.type === CSSRule.KEYFRAMES_RULE || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE) && item.name === 'weex-spinner') {
      var cssRules = item.cssRules;
      for (var j = 0, m = cssRules.length; j < m; j++) {
        var keyframe = cssRules[j];
        if (keyframe.type === CSSRule.KEYFRAME_RULE || keyframe.type === CSSRule.WEBKIT_KEYFRAME_RULE) {
          keyframe.style.boxShadow = keyframeRules[j];
        }
      }
    }
  }
}

function computeKeyFrameRules(rgb) {
  if (!rgb) {
    return;
  }
  var scaleArr = ['0em -1.3em 0em 0em', '0.9em -0.9em 0 0em', '1.25em 0em 0 0em', '0.875em 0.875em 0 0em', '0em 1.25em 0 0em', '-0.9em 0.9em 0 0em', '-1.3em 0em 0 0em', '-0.9em -0.9em 0 0em'];
  var colorArr = ['1', '0.2', '0.2', '0.2', '0.2', '0.2', '0.5', '0.7'].map(function (e) {
    return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + e + ')';
  });
  var rules = [];
  var loop = function loop(i) {
    var tmpColorArr = loopArray$1(colorArr, i, 'r');
    rules.push(scaleArr.map(function (scaleStr, i) {
      return scaleStr + ' ' + tmpColorArr[i];
    }).join(', '));
  };

  for (var i = 0; i < scaleArr.length; i++) {
    loop(i);
  }return rules;
}

function processStyle$1(vm) {
  var style = extractComponentStyle$3(vm);
  var color = style.color;
  var rgb = color && getRgb$1(color);
  if (rgb) {
    setKeyframeColor(vm, rgb);
  }
  return style;
}

var loadingIndicator = {
  name: 'weex-loading-indicator',
  render: function render(createElement) {
    this.weexType = 'loading-indicator';
    return createElement('mark', {
      attrs: { 'weex-type': 'loading-indicator' },
      staticClass: 'weex-loading-indicator weex-ct',
      staticStyle: processStyle$1(this)
    });
  },
  _css: _css$5
};

var loadingIndicator$1 = {
  init: function init(weex) {
    extractComponentStyle$3 = weex.extractComponentStyle;
    getRgb$1 = weex.utils.getRgb;
    loopArray$1 = weex.utils.loopArray;
    getStyleSheetById$1 = weex.utils.getStyleSheetById;
    weex.registerComponent('loading-indicator', loadingIndicator);
  }
};

__$styleInject("/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\nbody > .weex-list,\nbody > .weex-scroller,\nbody > .weex-waterfall {\n  max-height: 100%;\n}\n\n.weex-list-wrapper,\n.weex-scroller-wrapper,\n.weex-waterfall-wrapper {\n  -webkit-overflow-scrolling: touch;\n}\n\n.weex-list-wrapper,\n.weex-waterfall-wrapper {\n  overflow-y: scroll !important;\n  overflow-x: hidden !important;\n}\n\n.weex-list-inner,\n.weex-scroller-inner,\n.weex-waterfall-inner {\n  -webkit-overflow-scrolling: touch;\n}\n\n.weex-waterfall-inner-columns {\n  -webkit-flex-direction: row;\n  -moz-box-orient: horizontal;\n  -moz-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n}\n\n.weex-scroller-wrapper.weex-scroller-vertical {\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n\n.weex-scroller-wrapper.weex-scroller-horizontal {\n  overflow-x: scroll;\n  overflow-y: hidden;\n}\n\n.weex-scroller-wrapper.weex-scroller-disabled {\n  overflow-x: hidden;\n  overflow-y: hidden;\n}\n\n.weex-scroller-horizontal .weex-scroller-inner {\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  -moz-box-orient: horizontal;\n  -moz-box-direction: normal;\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  height: 100%;\n}\n\n.weex-cell {\n  width: 100%;\n}\n\n.weex-refresh,\n.weex-loading {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -moz-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -moz-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  overflow: hidden;\n}\n", undefined);

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var modules = [list$$1, scroller, waterfall, cell, header, loading, refresh, loadingIndicator$1];

var scrollable = {
  init: function init(weex) {
    modules.forEach(function (mod) {
      weex.install(mod);
    });
  }
};

__$styleInject("/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n \n.weex-slider-wrapper {\n  overflow-x: hidden;\n  overflow-y: visible;\n}\n\n.weex-slider-inner {\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n  -webkit-flex-direction: row;\n  -moz-box-orient: horizontal;\n  -moz-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n}\n\n.weex-slider-cell {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  background: transparent !important;\n  overflow: hidden;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -moz-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -moz-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.neighbor-cell {\n  overflow: visible !important;\n}", undefined);

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var TRANSITION_TIME = 400;
var NEIGHBOR_SCALE_TIME = 100;
var MAIN_SLIDE_OPACITY = 1;
var THROTTLE_SCROLL_TIME = 25;
var INTERVAL_MINIMUM = 200;

var slideMixin = {
  created: function created() {
    this._clones = [];
    this.innerOffset = 0;
    this._indicator = null;
  },

  beforeUpdate: function beforeUpdate() {
    this._getWrapperSize();
  },

  updated: function updated() {
    var children = this.$children;
    var len = children && children.length;
    var frameCount = this.frameCount;
    if (frameCount !== this._prevFrameCount) {
      var inner = this.$refs.inner;
      if (inner) {
        inner.style.webkitTransform = "translate3d(" + 0 + "px, 0, 0)";
        inner.style.mozTransform = "translate3d(" + 0 + "px, 0, 0)";
        inner.style.transform = "translate3d(" + 0 + "px, 0, 0)";
      }
    }
    if (children && len > 0) {
      for (var i = 0; i < len; i++) {
        var vm = children[i];
        if (vm.$options._componentTag === 'indicator' || vm.$vnode.data.ref === 'indicator') {
          vm._watcher.get();
          break;
        }
      }
    }
    weex.utils.fireLazyload(this.$el, true);
    if (this._preIndex !== this.currentIndex) {
      this._slideTo(this.currentIndex);
    }
  },

  mounted: function mounted() {
    this._getWrapperSize();
    this._slideTo(this.currentIndex);
    weex.utils.fireLazyload(this.$el, true);
  },

  methods: {
    _getWrapperSize: function _getWrapperSize() {
      var wrapper = this.$refs.wrapper;
      if (wrapper) {
        var rect = wrapper.getBoundingClientRect();
        this._wrapperWidth = rect.width;
        this._wrapperHeight = rect.height;
      }
    },

    _formatChildren: function _formatChildren(createElement) {
      var this$1 = this;

      var children = this.$slots.default || [];
      var indicatorVnode;
      var cells = children.filter(function (vnode) {
        if (!vnode.tag) {
          return false;
        }
        if (vnode.componentOptions && vnode.componentOptions.tag === 'indicator') {
          indicatorVnode = vnode;
          return false;
        }
        return true;
      }).map(function (vnode) {
        return createElement('li', {
          ref: 'cells',
          staticClass: "weex-slider-cell weex-ct" + (this$1.isNeighbor ? ' neighbor-cell' : '')
        }, [vnode]);
      });
      if (indicatorVnode) {
        indicatorVnode.data.attrs = indicatorVnode.data.attrs || {};
        indicatorVnode.data.attrs.count = cells.length;
        indicatorVnode.data.attrs.active = this.currentIndex;
        this._indicator = indicatorVnode;
      }
      return cells;
    },

    _renderSlides: function _renderSlides(createElement) {
      this._cells = this._formatChildren(createElement);
      this.frameCount = this._cells.length;
      return createElement('nav', {
        ref: 'wrapper',
        attrs: { 'weex-type': this.isNeighbor ? 'slider-neighbor' : 'slider' },
        on: weex.createEventMap(this, ['scroll', 'scrollstart', 'scrollend'], {
          touchstart: this._handleTouchStart,
          touchmove: weex.utils.throttle(weex.utils.bind(this._handleTouchMove, this), 25),
          touchend: this._handleTouchEnd,
          touchcancel: this._handleTouchCancel
        }),
        staticClass: 'weex-slider weex-slider-wrapper weex-ct',
        staticStyle: weex.extractComponentStyle(this)
      }, [createElement('ul', {
        ref: 'inner',
        staticClass: 'weex-slider-inner weex-ct'
      }, this._cells), this._indicator]);
    },

    // get standard index
    _normalizeIndex: function _normalizeIndex(index) {
      var newIndex = (index + this.frameCount) % this.frameCount;
      return Math.min(Math.max(newIndex, 0), this.frameCount - 1);
    },

    _startAutoPlay: function _startAutoPlay() {
      if (!this.autoPlay || this.autoPlay === 'false') {
        return;
      }
      if (this._autoPlayTimer) {
        clearTimeout(this._autoPlayTimer);
        this._autoPlayTimer = null;
      }
      var interval = parseInt(this.interval - TRANSITION_TIME - NEIGHBOR_SCALE_TIME);
      interval = interval > INTERVAL_MINIMUM ? interval : INTERVAL_MINIMUM;
      this._autoPlayTimer = setTimeout(weex.utils.bind(this._next, this), interval);
    },

    _stopAutoPlay: function _stopAutoPlay() {
      if (this._autoPlayTimer) {
        clearTimeout(this._autoPlayTimer);
        this._autoPlayTimer = null;
      }
    },

    _slideTo: function _slideTo(index, isTouchScroll) {
      var this$1 = this;

      if (this.frameCount <= 0) {
        return;
      }
      if (!this.infinite || this.infinite === 'false') {
        if (index === -1 || index > this.frameCount - 1) {
          this._slideTo(this.currentIndex);
          return;
        }
      }

      if (!this._preIndex && this._preIndex !== 0) {
        if (this._showNodes && this._showNodes[0]) {
          this._preIndex = this._showNodes[0].index;
        } else {
          this._preIndex = this.currentIndex;
        }
      }

      if (this._sliding) {
        return;
      }
      this._sliding = true;

      var newIndex = this._normalizeIndex(index);
      var inner = this.$refs.inner;
      var step = this._step = this.frameCount <= 1 ? 0 : this._preIndex - index;

      if (inner) {
        this._prepareNodes();
        var translate = weex.utils.getTransformObj(inner).translate;
        var match = translate && translate.match(/translate[^(]+\(([+-\d.]+)/);
        var innerX = match && match[1] || 0;
        var dist = innerX - this.innerOffset;
        this.innerOffset += step * this._wrapperWidth;
        // transform the whole slides group.
        inner.style.webkitTransition = "-webkit-transform " + TRANSITION_TIME / 1000 + "s ease-in-out";
        inner.style.mozTransition = "transform " + TRANSITION_TIME / 1000 + "s ease-in-out";
        inner.style.transition = "transform " + TRANSITION_TIME / 1000 + "s ease-in-out";
        inner.style.webkitTransform = "translate3d(" + this.innerOffset + "px, 0, 0)";
        inner.style.mozTransform = "translate3d(" + this.innerOffset + "px, 0, 0)";
        inner.style.transform = "translate3d(" + this.innerOffset + "px, 0, 0)";

        // emit scroll events.
        if (!isTouchScroll) {
          this._emitScrollEvent('scrollstart');
        }
        setTimeout(function () {
          this$1._throttleEmitScroll(dist, function () {
            this$1._emitScrollEvent('scrollend');
          });
        }, THROTTLE_SCROLL_TIME);

        this._loopShowNodes(step);

        setTimeout(function () {
          if (this$1.isNeighbor) {
            this$1._setNeighbors();
          }

          setTimeout(function () {
            inner.style.webkitTransition = '';
            inner.style.mozTransition = '';
            inner.style.transition = '';
            for (var i = this$1._showStartIdx; i <= this$1._showEndIdx; i++) {
              var node = this$1._showNodes[i];
              if (!node) {
                continue;
              }
              var elm = node.firstElementChild;
              elm.style.webkitTransition = '';
              elm.style.mozTransition = '';
              elm.style.transition = '';
            }
            // clean cloned nodes and rearrange slide cells.
            this$1._rearrangeNodes(newIndex);
          }, NEIGHBOR_SCALE_TIME);
        }, TRANSITION_TIME);
      }

      if (newIndex !== this._preIndex) {
        this.$emit('change', weex.utils.createEvent(this.$el, 'change', {
          index: newIndex
        }));
      }
    },

    _clearNodesOffset: function _clearNodesOffset() {
      var this$1 = this;

      var end = this._showEndIdx;
      for (var i = this._showStartIdx; i <= end; i++) {
        var node = this$1._showNodes[i];
        node = node && node.firstElementChild;
        if (!node) {
          continue;
        }
        weex.utils.addTransform(this$1._showNodes[i].firstElementChild, {
          translate: 'translate3d(0px, 0px, 0px)'
        });
      }
    },

    _loopShowNodes: function _loopShowNodes(step) {
      var this$1 = this;

      if (!step || this.frameCount <= 1) {
        return;
      }
      var sign = step > 0 ? 1 : -1;
      var i = step <= 0 ? this._showStartIdx : this._showEndIdx;
      var end = step <= 0 ? this._showEndIdx : this._showStartIdx;
      for (; i !== end - sign; i -= sign) {
        var nextIdx = i + step;
        this$1._showNodes[nextIdx] = this$1._showNodes[i];
        this$1._showNodes[nextIdx]._showIndex = nextIdx;
        delete this$1._showNodes[i];
      }
      this._showStartIdx += step;
      this._showEndIdx += step;
    },

    _prepareNodes: function _prepareNodes() {
      // test if the next slide towards the direction exists.
      // e.g. currentIndex 0 -> 1: should prepare 4 slides: -1, 0, 1, 2
      // if not, translate a node to here, or just clone it.
      var step = this._step;
      var prevCount = this._prevFrameCount;
      var curCount = this.frameCount;
      // frameCount updated in runtime, should init again.
      if (prevCount !== curCount) {
        this._prevFrameCount = curCount;
        this._inited = false;
      }
      if (!this._inited) {
        this._initNodes();
        this._inited = true;
        this._showNodes = {};
      }
      if (curCount <= 1) {
        this._showStartIdx = this._showEndIdx = 0;
        var node = this._cells[0].elm;
        node.style.opacity = 1;
        node.style.zIndex = 99;
        node.index = 0;
        this._showNodes[0] = node;
        node._inShow = true;
        node._showIndex = 0;
        return;
      }
      var showCount = this._showCount = Math.abs(step) + 3;
      this._showStartIdx = step <= 0 ? -1 : 2 - showCount;
      this._showEndIdx = step <= 0 ? showCount - 2 : 1;
      this._clearNodesOffset();
      this._positionNodes(this._showStartIdx, this._showEndIdx, step);
    },

    _initNodes: function _initNodes() {
      var total = this.frameCount;
      var cells = this._cells;
      for (var i = 0; i < total; i++) {
        var node = cells[i].elm;
        node.index = i;
        node._inShow = false;
        node.style.zIndex = 0;
        node.style.opacity = 0;
      }
    },

    _positionNodes: function _positionNodes(begin, end, step, anim) {
      var this$1 = this;

      var cells = this._cells;
      var start = step <= 0 ? begin : end;
      var stop = step <= 0 ? end : begin;
      var sign = step <= 0 ? -1 : 1;
      var cellIndex = this._preIndex + sign;
      for (var i = start; i !== stop - sign; i = i - sign) {
        var node = cells[this$1._normalizeIndex(cellIndex)].elm;
        cellIndex = cellIndex - sign;
        this$1._positionNode(node, i);
      }
    },

    /**
     * index: position index in the showing cells' view.
     */
    _positionNode: function _positionNode(node, index) {
      var holder = this._showNodes[index];
      if (node._inShow && holder !== node) {
        if (holder) {
          this._removeClone(holder);
        }
        node = this._getClone(node.index);
      } else if (node._inShow) {
        return;
      }

      node._inShow = true;
      var translateX = index * this._wrapperWidth - this.innerOffset;
      weex.utils.addTransform(node, {
        translate: "translate3d(" + translateX + "px, 0px, 0px)"
      });
      node.style.zIndex = 99 - Math.abs(index);
      node.style.opacity = 1;
      node._showIndex = index;
      this._showNodes[index] = node;
    },

    _getClone: function _getClone(index) {
      var arr = this._clones[index];
      if (!arr) {
        this._clones[index] = arr = [];
      }
      if (arr.length <= 0) {
        var origNode = this._cells[index].elm;
        var clone = origNode.cloneNode(true);
        clone._isClone = true;
        clone._inShow = origNode._inShow;
        clone.index = origNode.index;
        clone.style.opacity = 0;
        clone.style.zIndex = 0;
        var ct = this.$refs.inner;
        ct.appendChild(clone);
        arr.push(clone);
      }
      return arr.pop();
    },

    _removeClone: function _removeClone(node) {
      var idx = node.index;
      this._hideNode(node);
      var arr = this._clones[idx];
      arr.push(node);
    },

    _hideNode: function _hideNode(node) {
      node._inShow = false;
      node.style.opacity = 0;
      node.style.zIndex = 0;
    },

    /**
     * hide nodes from begin to end in showArray.
     * if it is clone node, just move the clone node to the buffer.
     */
    _clearNodes: function _clearNodes(begin, end) {
      var this$1 = this;

      for (var i = begin; i <= end; i++) {
        var node = this$1._showNodes[i];
        if (!node) {
          return;
        }
        if (node._isClone) {
          this$1._removeClone(node);
        } else if (!node._inShow) {
          this$1._hideNode(node);
        }
        delete this$1._showNodes[i];
      }
    },

    /**
     * copy node style props (opacity and zIndex) and transform status from
     * one element to another.
     */
    _copyStyle: function _copyStyle(from, to, styles, transformExtra) {
      if (styles === void 0) styles = ['opacity', 'zIndex'];
      if (transformExtra === void 0) transformExtra = {};

      weex.utils.extendKeys(to.style, from.style, styles);
      var transObj = weex.utils.getTransformObj(from);
      for (var k in transformExtra) {
        transObj[k] = transformExtra[k];
      }
      weex.utils.addTransform(to, transObj);
      var fromInner = from.firstElementChild;
      var toInner = to.firstElementChild;
      toInner.style.opacity = fromInner.style.opacity;
      weex.utils.copyTransform(fromInner, toInner);
    },

    /**
     * replace a clone node with the original node if it's not in use.
     */
    _replaceClone: function _replaceClone(clone, pos) {
      var this$1 = this;

      var origNode = this._cells[clone.index].elm;
      if (origNode._inShow) {
        return;
      }
      var origShowIndex = origNode._showIndex;
      var styleProps = ['opacity', 'zIndex'];
      var cl;
      if (Math.abs(origShowIndex) <= 1) {
        // leave a clone to replace the origNode in the show zone(-1 ~ 1).
        cl = this._getClone(origNode.index);
        this._copyStyle(origNode, cl);
        this._showNodes[origShowIndex] = cl;
      }
      origNode._inShow = true;
      var transObj = weex.utils.getTransformObj(clone);
      transObj.translate = transObj.translate.replace(/[+-\d.]+[pw]x/, function ($0) {
        return pos * this$1._wrapperWidth - this$1.innerOffset + 'px';
      });
      this._copyStyle(clone, origNode, styleProps, transObj);
      this._removeClone(clone);
      if (!cl) {
        delete this._showNodes[origShowIndex];
      }
      this._showNodes[pos] = origNode;
      origNode._showIndex = pos;
    },

    _rearrangeNodes: function _rearrangeNodes(newIndex) {
      var this$1 = this;

      if (this.frameCount <= 1) {
        this._sliding = false;
        this.currentIndex = 0;
        return;
      }

      // clear autoPlay timer (and restart after updated hook).
      this._startAutoPlay();

      /**
       * clean nodes. replace current node with non-cloned node.
       * set current index to the new index.
       */
      var shows = this._showNodes;
      for (var i = this._showStartIdx; i <= this._showEndIdx; i++) {
        shows[i]._inShow = false;
      }
      for (var i$1 = -1; i$1 <= 1; i$1++) {
        var node = shows[i$1];
        if (!node._isClone) {
          node._inShow = true;
        } else {
          this$1._replaceClone(node, i$1);
        }
      }

      this._clearNodes(this._showStartIdx, -2);
      this._showStartIdx = -1;
      this._clearNodes(2, this._showEndIdx);
      this._showEndIdx = 1;
      this._sliding = false;

      // set current index to the new index.
      this.currentIndex = newIndex;
      this._preIndex = newIndex;
    },

    /**
     * according to the attrs: neighborScale, neighborAlpha, neighborSpace.
     * 1. apply the main cell transform effects.
     * 2. set the previous cell and the next cell's positon, scale and alpha.
     * 3. set other cells' scale and alpha.
     */
    _setNeighbors: function _setNeighbors() {
      var this$1 = this;

      for (var i = this._showStartIdx; i <= this._showEndIdx; i++) {
        var elm = this$1._showNodes[i].firstElementChild;
        elm.style.webkitTransition = "all " + NEIGHBOR_SCALE_TIME / 1000 + "s ease";
        elm.style.mozTransition = "all " + NEIGHBOR_SCALE_TIME / 1000 + "s ease";
        elm.style.transition = "all " + NEIGHBOR_SCALE_TIME / 1000 + "s ease";
        var transObj = {
          scale: "scale(" + (i === 0 ? this$1.currentItemScale : this$1.neighborScale) + ")"
        };
        var translateX = void 0;
        if (!this$1._neighborWidth) {
          this$1._neighborWidth = parseFloat(elm.style.width) || elm.getBoundingClientRect().width;
        }
        // calculate position offsets according to neighbor scales.
        if (Math.abs(i) === 1) {
          var dist = ((this$1._wrapperWidth - this$1._neighborWidth * this$1.neighborScale) / 2 + this$1.neighborSpace * weex.config.env.scale) / this$1.neighborScale;
          translateX = -i * dist;
        } else {
          // clear position offsets.
          translateX = 0;
        }
        transObj.translate = "translate3d(" + translateX + "px, 0px, 0px)";
        weex.utils.addTransform(elm, transObj);
        elm.style.opacity = i === 0 ? MAIN_SLIDE_OPACITY : this$1.neighborAlpha;
      }
    },

    _next: function _next() {
      var next = this.currentIndex + 1;
      if (this.frameCount <= 1) {
        next--;
      }
      this._slideTo(next);
    },

    _prev: function _prev() {
      var prev = this.currentIndex - 1;
      if (this.frameCount <= 1) {
        prev++;
      }
      this._slideTo(prev);
    },

    _handleTouchStart: function _handleTouchStart(event) {
      var touch = event.changedTouches[0];
      this._stopAutoPlay();
      var inner = this.$refs.inner;
      this._touchParams = {
        originalTransform: inner.style.webkitTransform || inner.style.mozTransform || inner.style.transform,
        startTouchEvent: touch,
        startX: touch.pageX,
        startY: touch.pageY,
        timeStamp: event.timeStamp
      };
    },

    _handleTouchMove: function _handleTouchMove(event) {
      var tp = this._touchParams;
      if (!tp) {
        return;
      }
      if (this._sliding) {
        return;
      }
      var ref = this._touchParams;
      var startX = ref.startX;
      var startY = ref.startY;
      var touch = event.changedTouches[0];
      var offsetX = touch.pageX - startX;
      var offsetY = touch.pageY - startY;
      tp.offsetX = offsetX;
      tp.offsetY = offsetY;
      var isV = tp.isVertical;
      if (typeof isV === 'undefined') {
        isV = tp.isVertical = Math.abs(offsetX) < Math.abs(offsetY);
        if (!isV) {
          this._emitScrollEvent('scrollstart');
        }
      }
      // vertical scroll. just ignore it.
      if (isV) {
        return;
      }
      // horizontal scroll. trigger scroll event.
      event.preventDefault();
      var inner = this.$refs.inner;
      if (inner && offsetX) {
        if (!this._nodesOffsetCleared) {
          this._nodesOffsetCleared = true;
          this._clearNodesOffset();
        }
        this._emitScrollEvent('scroll', {
          offsetXRatio: offsetX / this._wrapperWidth
        });
        inner.style.webkitTransform = "translate3d(" + (this.innerOffset + offsetX) + "px, 0, 0)";
        inner.style.mozTransform = "translate3d(" + (this.innerOffset + offsetX) + "px, 0, 0)";
        inner.style.transform = "translate3d(" + (this.innerOffset + offsetX) + "px, 0, 0)";
      }
    },

    _handleTouchEnd: function _handleTouchEnd(event) {
      this._startAutoPlay();
      var tp = this._touchParams;
      if (!tp) {
        return;
      }
      var isV = tp.isVertical;
      if (typeof isV === 'undefined') {
        return;
      }
      var inner = this.$refs.inner;
      var offsetX = tp.offsetX;
      if (inner) {
        this._nodesOffsetCleared = false;
        // TODO: test the velocity if it's less than 0.2.
        var reset = Math.abs(offsetX / this._wrapperWidth) < 0.2;
        var direction = offsetX > 0 ? 1 : -1;
        var newIndex = reset ? this.currentIndex : this.currentIndex - direction;
        this._slideTo(newIndex, true);
      }
      delete this._touchParams;
    },

    _handleTouchCancel: function _handleTouchCancel(event) {
      return this._handleTouchEnd(event);
    },

    _emitScrollEvent: function _emitScrollEvent(type, data) {
      if (data === void 0) data = {};

      this.$emit(type, weex.utils.createEvent(this.$el, type, data));
    },

    _throttleEmitScroll: function _throttleEmitScroll(offset, callback) {
      var this$1 = this;

      var i = 0;
      var throttleTime = THROTTLE_SCROLL_TIME;
      var cnt = parseInt(TRANSITION_TIME / throttleTime) - 1;
      var sign = offset > 0 ? 1 : -1;
      var r = Math.abs(offset / this._wrapperWidth);
      var throttledScroll = function throttledScroll() {
        if (++i > cnt) {
          return callback && callback.call(this$1);
        }
        var ratio = this$1._step === 0 ? sign * r * (1 - i / cnt) : sign * (r + (1 - r) * i / cnt);
        this$1._emitScrollEvent('scroll', {
          offsetXRatio: ratio
        });
        setTimeout(throttledScroll, THROTTLE_SCROLL_TIME);
      };
      throttledScroll();
    }
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// import { validateStyles } from '../../validator'
// import indicator from './indicator'
var slider$1 = {
  mixins: [slideMixin],
  props: {
    index: {
      type: [String, Number],
      default: 0
    },
    'auto-play': {
      type: [String, Boolean],
      default: false
    },
    interval: {
      type: [String, Number],
      default: 3000
    },
    infinite: {
      type: [String, Boolean],
      default: true
    }
  },

  watch: {
    index: function index() {
      this.currentIndex = this._normalizeIndex(this.index);
    }
  },

  data: function data() {
    return {
      frameCount: 0,
      currentIndex: this.index
    };
  },

  beforeCreate: function beforeCreate() {
    this.weexType = 'slider';
  },

  render: function render(createElement) {
    /* istanbul ignore next */
    // if ("production" === 'development') {
    //   validateStyles('slider', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    return this._renderSlides(createElement);
  }
};

var slider$2 = {
  init: function init(weex) {
    weex.registerComponent('slider', slider$1);
    weex.registerComponent('cycleslider', slider$1);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var DEFAULT_NEIGHBOR_SPACE = 20;
var DEFAULT_NEIGHBOR_ALPHA = 0.6;
var DEFAULT_NEIGHBOR_SCALE = 0.8;
var DEFAULT_CURRENT_ITEM_SCALE = 0.9;

var sliderNeighbor = {
  mixins: [slideMixin],
  props: {
    index: {
      type: [String, Number],
      default: 0
    },
    autoPlay: {
      type: [String, Boolean],
      default: false
    },
    interval: {
      type: [String, Number],
      default: 3000
    },
    infinite: {
      type: [String, Boolean],
      default: true
    },
    neighborSpace: {
      type: [String, Number],
      validator: function validator(val) {
        val = parseFloat(val);
        return !isNaN(val) && val > 0;
      },
      default: DEFAULT_NEIGHBOR_SPACE
    },
    neighborAlpha: {
      type: [String, Number],
      validator: function validator(val) {
        val = parseFloat(val);
        return !isNaN(val) && val >= 0 && val <= 1;
      },
      default: DEFAULT_NEIGHBOR_ALPHA
    },
    neighborScale: {
      type: [String, Number],
      validator: function validator(val) {
        val = parseFloat(val);
        return !isNaN(val) && val >= 0 && val <= 1;
      },
      default: DEFAULT_NEIGHBOR_SCALE
    },
    currentItemScale: {
      type: [String, Number],
      validator: function validator(val) {
        val = parseFloat(val);
        return !isNaN(val) && val >= 0 && val <= 1;
      },
      default: DEFAULT_CURRENT_ITEM_SCALE
    }
  },

  watch: {
    index: function index() {
      this.currentIndex = this._normalizeIndex(this.index);
    }
  },

  data: function data() {
    return {
      currentIndex: this.index,
      frameCount: 0
    };
  },

  beforeCreate: function beforeCreate() {
    this.isNeighbor = true;
    this.weexType = 'slider-neighbor';
  },

  render: function render(createElement) {
    return this._renderSlides(createElement);
  }
};

var neighbor = {
  init: function init(weex) {
    weex.registerComponent('slider-neighbor', sliderNeighbor);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var _css$6 = "\n.weex-indicator {\n  position: absolute;\n  z-index: 10;\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  -moz-box-orient: horizontal;\n  -moz-box-direction: normal;\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  margin: 0;\n  padding: 0;\n}\n\n.weex-indicator-item {\n  display: inline-block;\n  position: relative;\n  border-radius: 50%;\n  width: 0.266667rem;\n  height: 0.266667rem;\n  background-color: #BBBBBB;\n}\n.weex-indicator-item + .weex-indicator-item {\n  margin-left: 0.133333rem;\n}\n\n.weex-indicator-item-active {\n  background-color: blue;\n}\n";

var extractComponentStyle$4;
var extend$3;
var extendKeys$1;

function getIndicatorItemStyle(spec, isActive) {
  var style = {};
  style['background-color'] = spec[isActive ? 'itemSelectedColor' : 'itemColor'];
  style['width'] = style['height'] = spec['itemSize'];
  return style;
}

function _render(context, h) {
  var children = [];
  var mergedStyle = extractComponentStyle$4(context);
  var indicatorSpecStyle = extendKeys$1({}, mergedStyle, ['itemColor', 'itemSelectedColor', 'itemSize']);
  for (var i = 0; i < Number(context.count); ++i) {
    var classNames = ['weex-indicator-item weex-el'];
    var isActive = false;
    if (i === Number(context.active)) {
      classNames.push('weex-indicator-item-active');
      isActive = true;
    }
    children.push(h('mark', {
      staticClass: classNames.join(' '),
      staticStyle: getIndicatorItemStyle(indicatorSpecStyle, isActive)
    }));
  }
  context.$nextTick(function () {
    _reLayout(this, _getVirtualRect(this, mergedStyle), _getLtbr(this, mergedStyle));
  });
  return h('nav', {
    attrs: { 'weex-type': 'indicator' },
    staticClass: 'weex-indicator weex-ct',
    staticStyle: mergedStyle
  }, children);
}

/**
 * get indicator's virtual rect (width, height), which is the .
 */
function _getVirtualRect(context, mergedStyle) {
  var ct = context._getParentRect();
  var rect = ['width', 'height'].reduce(function (pre, key) {
    var msv = mergedStyle && mergedStyle[key];
    pre[key] = msv ? parseFloat(msv) : ct[key];
    return pre;
  }, {});
  return rect;
}

/**
 * get indicator's ltbr values (without units).
 */
function _getLtbr(context, mergedStyle) {
  return ['left', 'top', 'bottom', 'right'].reduce(function (pre, key) {
    var msv = mergedStyle && mergedStyle[key];
    if (!msv && msv !== 0) {
      return pre;
    }
    pre[key] = parseFloat(msv);
    return pre;
  }, {});
}

/**
 * get indicator's rect (width, height).
 */
function _getIndicatorRect(el) {
  var width, height;
  if (el.children.length === 1) {
    var itemComputedStyle = window.getComputedStyle(el.children[0]);
    width = parseFloat(itemComputedStyle.width);
    height = parseFloat(itemComputedStyle.height);
  } else {
    var itemComputedStyle$1 = window.getComputedStyle(el.children[1]);
    var padding = parseFloat(itemComputedStyle$1.marginLeft);
    height = parseFloat(itemComputedStyle$1.height);
    width = el.children.length * (height + padding) - padding;
  }
  return { width: width, height: height };
}

/**
 * calculate and reset indicator's width, height, and ltbr.
 * @param {object} virtualRect. width and height of indicator's virtual rect box.
 * @param {object} ltbr. the user specified left, top, bottom, right pixels (without units).
 */
function _reLayout(context, virtualRect, ltbr) {
  var el = context.$el;
  var rect = _getIndicatorRect(el);
  var rectWithPx = Object.keys(rect).reduce(function (pre, key) {
    pre[key] = rect[key] + 'px';
    return pre;
  }, {});
  extend$3(el.style, rectWithPx);
  var axisMap = [{
    dir: ltbr.left || ltbr.left === 0 ? 'left' : ltbr.right || ltbr.right === 0 ? 'right' : 'left',
    scale: 'width'
  }, {
    dir: ltbr.top || ltbr.top === 0 ? 'top' : ltbr.bottom || ltbr.bottom === 0 ? 'bottom' : 'top',
    scale: 'height'
  }];
  Object.keys(axisMap).forEach(function (key) {
    var ref = axisMap[key];
    var dir = ref.dir;
    var scale = ref.scale;
    el.style[dir] = (ltbr[dir] || 0) + virtualRect[scale] / 2 - rect[scale] / 2 + 'px';
  });
}

var indicator = {
  name: 'weex-indicator',
  methods: {
    show: function show() {
      this.$el.style.visibility = 'visible';
    }
  },
  data: function data() {
    return {
      count: 0,
      active: 0
    };
  },
  render: function render(createElement) {
    var ref = this.$vnode.data.attrs || {};
    var count = ref.count;
    var active = ref.active;
    this.count = count;
    this.active = active;
    if (!this.count) {
      return;
    }
    return _render(this, createElement);
  },
  _css: _css$6
};

var indicator$1 = {
  init: function init(weex) {
    extractComponentStyle$4 = weex.extractComponentStyle;
    extend$3 = weex.utils.extend;
    extendKeys$1 = weex.utils.extendKeys;
    weex.registerComponent('indicator', indicator);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var slider = {
  init: function init(weex) {
    weex.install(slider$2);
    weex.install(neighbor);
    weex.install(indicator$1);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileOverview Impl of text component.
 *
 * Notes about the style 'height' and 'lines':
 * if the computed value of 'height' is bigger than 'lines', than the text will
 * be clipped according to the 'lines'. Otherwise, it'll be the 'height'.
 */

var _css$7 = "\n.weex-text {\n  display: -webkit-box;\n  display: -moz-box;\n  -webkit-box-orient: vertical;\n  -moz-box-orient: vertical;\n  -moz-box-direction: normal;\n  position: relative;\n  white-space: pre-wrap;  /* not using 'pre': support auto line feed. */\n  font-size: 0.426667rem;\n  word-wrap: break-word;\n  overflow: hidden; /* it'll be clipped if the height is not high enough. */\n}\n";

/**
 * Get text special styles (lines and text-overflow).
 */
function getTextSpecStyle(ms) {
  if (ms === void 0) ms = {};

  var lines = parseInt(ms.lines) || 0;
  var overflow = ms['text-overflow'] || 'ellipsis';
  if (lines > 0) {
    return {
      overflow: 'hidden',
      'text-overflow': overflow,
      '-webkit-line-clamp': lines
    };
  }
}

function getText(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var createEventMap = weex.createEventMap;
  var ref = weex.utils;
  var extend = ref.extend;

  return {
    name: 'weex-text',
    props: {
      lines: [Number, String],
      value: [String]
    },

    render: function render(createElement) {
      var style = extractComponentStyle(this);
      var textSpecStyle = getTextSpecStyle(style);
      return createElement('p', {
        attrs: { 'weex-type': 'text' },
        on: createEventMap(this),
        staticClass: 'weex-text weex-el',
        staticStyle: extend(style, textSpecStyle)
      }, this.$slots.default || [this.value]);
    },
    _css: _css$7
  };
}

var text = {
  init: function init(weex) {
    weex.registerComponent('text', getText(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var _css$8 = "\n.weex-textarea {\n  font-size: 0.426667rem\n}\n.weex-textarea:focus {\n  outline: none;\n}\n";

function getTextarea(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var createEventMap = weex.createEventMap;
  var ref = weex.mixins;
  var inputCommon = ref.inputCommon;
  var ref$1 = weex.utils;
  var extend = ref$1.extend;
  var mapFormEvents = ref$1.mapFormEvents;

  return {
    name: 'weex-textarea',
    mixins: [inputCommon],
    props: {
      value: String,
      placeholder: String,
      disabled: {
        type: [String, Boolean],
        default: false
      },
      autofocus: {
        type: [String, Boolean],
        default: false
      },
      rows: {
        type: [String, Number],
        default: 2
      },
      returnKeyType: String
    },

    render: function render(createElement) {
      /* istanbul ignore next */
      // if ("production" === 'development') {
      //   validateStyles('textarea', this.$vnode.data && this.$vnode.data.staticStyle)
      // }
      var events = extend(createEventMap(this), mapFormEvents(this));
      return createElement('html:textarea', {
        attrs: {
          'weex-type': 'textarea',
          value: this.value,
          disabled: this.disabled !== 'false' && this.disabled !== false,
          autofocus: this.autofocus !== 'false' && this.autofocus !== false,
          placeholder: this.placeholder,
          rows: this.rows,
          'return-key-type': this.returnKeyType
        },
        domProps: {
          value: this.value
        },
        on: this.createKeyboardEvent(events),
        staticClass: 'weex-textarea weex-el',
        staticStyle: extractComponentStyle(this)
      });
    },
    _css: _css$8
  };
}

var textarea = {
  init: function init(weex) {
    weex.registerComponent('textarea', getTextarea(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function getVideo(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var createEventMap = weex.createEventMap;

  return {
    name: 'weex-video',
    props: {
      src: String,
      playStatus: {
        type: String,
        default: 'pause',
        validator: function validator(value) {
          return ['play', 'pause'].indexOf(value) !== -1;
        }
      },
      autoplay: {
        type: [String, Boolean],
        default: false
      },
      autoPlay: {
        type: [String, Boolean],
        default: false
      },
      playsinline: {
        type: [String, Boolean],
        default: true
      },
      controls: {
        type: [String, Boolean],
        default: false
      }
    },

    render: function render(createElement) {
      if (this.playStatus === 'play') {
        this.$nextTick(function () {
          this.$el && this.$el.play();
        });
      } else if (this.playStatus === 'pause') {
        this.$nextTick(function () {
          this.$el && this.$el.pause();
        });
      }

      return createElement('html:video', {
        attrs: {
          'weex-type': 'video',
          autoplay: this.autoplay !== 'false' && this.autoplay !== false || this.autoPlay !== 'false' && this.autoPlay !== false,
          'webkit-playsinline': this.playsinline,
          controls: this.controls,
          src: this.src
        },
        on: createEventMap(this, ['start', 'pause', 'finish', 'fail']),
        staticClass: 'weex-video weex-el',
        staticStyle: extractComponentStyle(this)
      });
    }
  };
}

var video = {
  init: function init(weex) {
    weex.registerComponent('video', getVideo(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var _css$9 = "\n.weex-web {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  border: none;\n  box-sizing: border-box;\n}\n";

function getWeb(weex) {
  var extractComponentStyle = weex.extractComponentStyle;
  var createEventMap = weex.createEventMap;
  var ref = weex.utils;
  var createEvent = ref.createEvent;

  return {
    name: 'weex-web',
    props: {
      src: String
    },
    methods: {
      // TODO: check cross-origin
      goBack: function goBack() {
        if (this.$el) {
          this.$el.contentWindow.history.back();
        }
      },
      goForward: function goForward() {
        if (this.$el) {
          this.$el.contentWindow.history.forward();
        }
      },
      reload: function reload() {
        if (this.$el) {
          this.$el.contentWindow.history.reload();
        }
      }
    },

    mounted: function mounted() {
      var this$1 = this;

      if (this.$el) {
        this.$emit('pagestart', createEvent(this.$el, 'pagestart', { url: this.src }));
        this.$el.addEventListener('load', function (event) {
          this$1.$emit('pagefinish', createEvent(this$1.$el, 'pagefinish', { url: this$1.src }));
        });
      }
    },

    render: function render(createElement) {
      /* istanbul ignore next */
      // if ("production" === 'development') {
      //   validateStyles('web', this.$vnode.data && this.$vnode.data.staticStyle)
      // }
      return createElement('iframe', {
        attrs: {
          'weex-type': 'web',
          src: this.src
        },
        on: createEventMap(this, ['error']),
        staticClass: 'weex-web weex-el',
        staticStyle: extractComponentStyle(this)
      });
    },
    _css: _css$9
  };
}

var web = {
  init: function init(weex) {
    weex.registerComponent('web', getWeb(weex));
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var components = [a, div, image$1, input, _switch, scrollable, slider, text, textarea, video, web];

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var supportGeolocation = 'geolocation' in navigator;
var errorMsg = "[h5-render]: browser doesn't support geolocation.";

var geolocation = {
  // options:
  //   - enableHighAccuracy optional, value is true or false, false by default.
  //   - timeout [none-native] optional, value is a number (milliseconds), default vaule is FINFINITY.
  //   - maximumAge [none-native] optional, value is a number (milliseconds), default value is 0.
  getCurrentPosition: function getCurrentPosition(successCbId, errorCbId, options) {
    var this$1 = this;

    var successCb = function successCb(pos) {
      return this$1.sender.performCallback(successCbId, pos);
    };
    var errorCb = function errorCb(err) {
      return this$1.sender.performCallback(errorCbId, err);
    };
    if (supportGeolocation) {
      navigator.geolocation.getCurrentPosition(successCb, errorCb, options);
    } else {
      console.warn(errorMsg);
      errorCb(new Error(errorMsg));
    }
  },

  // options: the same with `getCurrentPosition`.
  watchPosition: function watchPosition(successCbId, errorCbId, options) {
    var this$1 = this;

    var successCb = function successCb(pos) {
      return this$1.sender.performCallback(successCbId, pos, true);
    };
    var errorCb = function errorCb(err) {
      return this$1.sender.performCallback(errorCbId, err);
    };
    if (supportGeolocation) {
      var id = navigator.geolocation.watchPosition(function (pos) {
        pos.watchId = id;
        successCb(pos);
      }, errorCb, options);
    } else {
      console.warn(errorMsg);
      errorCb(new Error(errorMsg));
    }
  },

  clearWatch: function clearWatch(watchId) {
    if (supportGeolocation) {
      navigator.geolocation.clearWatch(watchId);
    } else {
      console.warn(errorMsg);
    }
  }
};

var meta = {
  geolocation: [{
    name: 'getCurrentPosition',
    args: ['function', 'function', 'object']
  }, {
    name: 'watchPosition',
    args: ['function', 'function', 'object']
  }, {
    name: 'clearWatch',
    args: ['string']
  }]
};

var geolocation$1 = {
  init: function init(Weex) {
    Weex.registerApiModule('geolocation', geolocation, meta);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* global localStorage */

var supportLocalStorage = false;
try {
  supportLocalStorage = typeof localStorage !== 'undefined';
} catch (err) {
  // not support.
}

var SUCCESS = 'success';
var FAILED = 'failed';
var INVALID_PARAM = 'invalid_param';
var UNDEFINED = 'undefined';

function callFail(sender, callbackId, errorMsg) {
  sender.performCallback(callbackId, {
    result: FAILED,
    data: errorMsg || UNDEFINED
  });
}

function callNotSupportFail(sender, callbackId) {
  sender.performCallback(callbackId, {
    result: FAILED,
    data: 'localStorage is disabled or not supported.'
  });
}

var storage = {

  /**
   * When passed a key name and value, will add that key to the storage,
   * or update that key's value if it already exists.
   * @param {string} key
   * @param {string} value not null nor undifined，but 0 works.
   * @param {function} callbackId
   */
  setItem: function setItem(key, value, callbackId) {
    var sender = this.sender;
    if (!supportLocalStorage) {
      return callNotSupportFail(sender, callbackId);
    }
    if (!key || !value && value !== 0) {
      sender.performCallback(callbackId, {
        result: 'failed',
        data: INVALID_PARAM
      });
      return;
    }
    try {
      localStorage.setItem(key, value);
      sender.performCallback(callbackId, {
        result: SUCCESS,
        data: UNDEFINED
      });
    } catch (e) {
      // accept any exception thrown during a storage attempt as a quota error
      callFail(sender, callbackId);
    }
  },

  /**
   * When passed a key name, will return that key's value.
   * @param {string} key
   * @param {function} callbackId
   */
  getItem: function getItem(key, callbackId) {
    var sender = this.sender;
    if (!supportLocalStorage) {
      return callNotSupportFail(sender, callbackId);
    }
    if (!key) {
      sender.performCallback(callbackId, {
        result: FAILED,
        data: INVALID_PARAM
      });
      return;
    }
    try {
      var val = localStorage.getItem(key);
      sender.performCallback(callbackId, {
        result: val ? SUCCESS : FAILED,
        data: val || UNDEFINED
      });
    } catch (e) {
      // accept any exception thrown during a storage attempt as a quota error
      callFail(sender, callbackId);
    }
  },

  /**
   *When passed a key name, will remove that key from the storage.
   * @param {string} key
   * @param {function} callbackId
   */
  removeItem: function removeItem(key, callbackId) {
    var sender = this.sender;
    if (!supportLocalStorage) {
      return callNotSupportFail(sender, callbackId);
    }
    if (!key) {
      sender.performCallback(callbackId, {
        result: FAILED,
        data: INVALID_PARAM
      });
      return;
    }
    try {
      localStorage.removeItem(key);
      sender.performCallback(callbackId, {
        result: SUCCESS,
        data: UNDEFINED
      });
    } catch (e) {
      // accept any exception thrown during a storage attempt as a quota error
      callFail(sender, callbackId);
    }
  },

  /**
   * Returns an integer representing the number of data items stored in the Storage object.
   * @param {function} callbackId
   */
  length: function length(callbackId) {
    var sender = this.sender;
    if (!supportLocalStorage) {
      return callNotSupportFail(sender, callbackId);
    }
    try {
      var len = localStorage.length;
      sender.performCallback(callbackId, {
        result: SUCCESS,
        data: len
      });
    } catch (e) {
      // accept any exception thrown during a storage attempt as a quota error
      callFail(sender, callbackId);
    }
  },

  /**
   * Returns an array that contains all keys stored in Storage object.
   * @param {function} callbackId
   */
  getAllKeys: function getAllKeys(callbackId) {
    var sender = this.sender;
    if (!supportLocalStorage) {
      return callNotSupportFail(sender, callbackId);
    }
    try {
      var _arr = [];
      for (var i = 0; i < localStorage.length; i++) {
        _arr.push(localStorage.key(i));
      }
      sender.performCallback(callbackId, {
        result: SUCCESS,
        data: _arr
      });
    } catch (e) {
      // accept any exception thrown during a storage attempt as a quota error
      callFail(sender, callbackId);
    }
  }
};

var meta$1 = {
  storage: [{
    name: 'setItem',
    args: ['string', 'string', 'function']
  }, {
    name: 'getItem',
    args: ['string', 'function']
  }, {
    name: 'removeItem',
    args: ['string', 'function']
  }, {
    name: 'length',
    args: ['function']
  }, {
    name: 'getAllKeys',
    args: ['function']
  }]
};

var storage$1 = {
  init: function init(Weex) {
    Weex.registerApiModule('storage', storage, meta$1);
  }
};

typeof window === 'undefined' && (window = { ctrl: {}, lib: {} });!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function (a, b) {
  function c(a) {
    var b = {};Object.defineProperty(this, "params", { set: function set(a) {
        if ("object" == (typeof a === 'undefined' ? 'undefined' : _typeof(a))) {
          for (var c in b) {
            delete b[c];
          }for (var c in a) {
            b[c] = a[c];
          }
        }
      }, get: function get() {
        return b;
      }, enumerable: !0 }), Object.defineProperty(this, "search", { set: function set(a) {
        if ("string" == typeof a) {
          0 === a.indexOf("?") && (a = a.substr(1));var c = a.split("&");for (var d in b) {
            delete b[d];
          }for (var e = 0; e < c.length; e++) {
            var f = c[e].split("=");if (void 0 !== f[1] && (f[1] = f[1].toString()), f[0]) {
              try {
                b[decodeURIComponent(f[0])] = decodeURIComponent(f[1]);
              } catch (g) {
                b[f[0]] = f[1];
              }
            }
          }
        }
      }, get: function get() {
        var a = [];for (var c in b) {
          if (void 0 !== b[c]) {
            if ("" !== b[c]) {
              try {
                a.push(encodeURIComponent(c) + "=" + encodeURIComponent(b[c]));
              } catch (d) {
                a.push(c + "=" + b[c]);
              }
            } else {
              try {
                a.push(encodeURIComponent(c));
              } catch (d) {
                a.push(c);
              }
            }
          }
        }return a.length ? "?" + a.join("&") : "";
      }, enumerable: !0 });var c;Object.defineProperty(this, "hash", { set: function set(a) {
        "string" == typeof a && (a && a.indexOf("#") < 0 && (a = "#" + a), c = a || "");
      }, get: function get() {
        return c;
      }, enumerable: !0 }), this.set = function (a) {
      a = a || "";var b;if (!(b = a.match(new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$", "i")))) {
        throw new Error("Wrong uri scheme.");
      }this.protocol = b[1] || ("object" == (typeof location === 'undefined' ? 'undefined' : _typeof(location)) ? location.protocol : ""), this.username = b[2] || "", this.password = b[3] || "", this.hostname = this.host = b[4], this.port = b[5] || "", this.pathname = b[6] || "/", this.search = b[7] || "", this.hash = b[8] || "", this.origin = this.protocol + "//" + this.hostname;
    }, this.toString = function () {
      var a = this.protocol + "//";return this.username && (a += this.username, this.password && (a += ":" + this.password), a += "@"), a += this.host, this.port && "80" !== this.port && (a += ":" + this.port), this.pathname && (a += this.pathname), this.search && (a += this.search), this.hash && (a += this.hash), a;
    }, a && this.set(a.toString());
  }b.httpurl = function (a) {
    return new c(a);
  };
}(window, window.lib || (window.lib = {}));

var index$5 = function index$5(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject$2(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }

    // Detect buggy property enumeration order in older V8 versions.

    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var index$7 = shouldUseNative() ? Object.assign : function (target, source) {
  var arguments$1 = arguments;

  var from;
  var to = toObject$2(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments$1[s]);

    for (var key in from) {
      if (hasOwnProperty$1.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

var strictUriEncode = index$5;
var objectAssign = index$7;

function encoderForArrayFormat(opts) {
  switch (opts.arrayFormat) {
    case 'index':
      return function (key, value, index) {
        return value === null ? [encode(key, opts), '[', index, ']'].join('') : [encode(key, opts), '[', encode(index, opts), ']=', encode(value, opts)].join('');
      };

    case 'bracket':
      return function (key, value) {
        return value === null ? encode(key, opts) : [encode(key, opts), '[]=', encode(value, opts)].join('');
      };

    default:
      return function (key, value) {
        return value === null ? encode(key, opts) : [encode(key, opts), '=', encode(value, opts)].join('');
      };
  }
}

function parserForArrayFormat(opts) {
  var result;

  switch (opts.arrayFormat) {
    case 'index':
      return function (key, value, accumulator) {
        result = /\[(\d*)\]$/.exec(key);

        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return function (key, value, accumulator) {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        } else if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    default:
      return function (key, value, accumulator) {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function encode(value, opts) {
  if (opts.encode) {
    return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  } else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
    return keysSorter(Object.keys(input)).sort(function (a, b) {
      return Number(a) - Number(b);
    }).map(function (key) {
      return input[key];
    });
  }

  return input;
}

var extract = function extract(str) {
  return str.split('?')[1] || '';
};

var parse = function parse(str, opts) {
  opts = objectAssign({ arrayFormat: 'none' }, opts);

  var formatter = parserForArrayFormat(opts);

  // Create an object with no prototype
  // https://github.com/sindresorhus/query-string/issues/47
  var ret = Object.create(null);

  if (typeof str !== 'string') {
    return ret;
  }

  str = str.trim().replace(/^(\?|#|&)/, '');

  if (!str) {
    return ret;
  }

  str.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    var key = parts.shift();
    var val = parts.length > 0 ? parts.join('=') : undefined;

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    formatter(decodeURIComponent(key), val, ret);
  });

  return Object.keys(ret).sort().reduce(function (result, key) {
    var val = ret[key];
    if (Boolean(val) && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !Array.isArray(val)) {
      // Sort object keys, not values
      result[key] = keysSorter(val);
    } else {
      result[key] = val;
    }

    return result;
  }, Object.create(null));
};

var stringify = function stringify(obj, opts) {
  var defaults = {
    encode: true,
    strict: true,
    arrayFormat: 'none'
  };

  opts = objectAssign(defaults, opts);

  var formatter = encoderForArrayFormat(opts);

  return obj ? Object.keys(obj).sort().map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key, opts);
    }

    if (Array.isArray(val)) {
      var result = [];

      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        result.push(formatter(key, val2, result.length));
      });

      return result.join('&');
    }

    return encode(key, opts) + '=' + encode(val, opts);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : '';
};

var index$4 = {
  extract: extract,
  parse: parse,
  stringify: stringify
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* global lib, XMLHttpRequest */
/* deps: httpurl */

var utils$1;

var jsonpCnt = 0;
var ERROR_STATE = -1;

function _jsonp(config, callback, progressCallback) {
  var cbName = config.jsonpCallbackName || 'jsonp_' + ++jsonpCnt;
  var url;

  if (!config.url) {
    console.error('[h5-render] config.url should be set in _jsonp for \'fetch\' API.');
  }

  global[cbName] = function (cb) {
    return function (response) {
      callback({
        status: 200,
        ok: true,
        statusText: 'OK',
        data: response
      });
      delete global[cb];
    };
  }(cbName);

  var script = document.createElement('script');
  try {
    url = lib.httpurl(config.url);
  } catch (err) {
    console.error('[h5-render] invalid config.url in _jsonp for \'fetch\' API: ' + config.url);
  }
  url.params.callback = cbName;
  script.type = 'text/javascript';
  script.src = url.toString();
  // script.onerror is not working on IE or safari.
  // but they are not considered here.
  script.onerror = function (cb) {
    return function (err) {
      console.error('[h5-render] unexpected error in _jsonp for \'fetch\' API', err);
      callback({
        status: ERROR_STATE,
        ok: false,
        statusText: '',
        data: ''
      });
      delete global[cb];
    };
  }(cbName);
  var head = document.getElementsByTagName('head')[0];
  head.insertBefore(script, null);
}

function _xhr(config, callback, progressCallback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = config.type;
  xhr.open(config.method, config.url, true);

  // cors cookie support
  if (config.withCredentials === true) {
    xhr.withCredentials = true;
  }

  var headers = config.headers || {};
  for (var k in headers) {
    xhr.setRequestHeader(k, headers[k]);
  }

  xhr.onload = function (res) {
    callback({
      status: xhr.status,
      ok: xhr.status >= 200 && xhr.status < 300,
      statusText: xhr.statusText,
      data: xhr.response,
      headers: xhr.getAllResponseHeaders().split('\n').reduce(function (obj, headerStr) {
        var headerArr = headerStr.match(/(.+): (.+)/);
        if (headerArr) {
          obj[headerArr[1]] = headerArr[2];
        }
        return obj;
      }, {})
    });
  };

  if (progressCallback) {
    xhr.onprogress = function (e) {
      progressCallback({
        readyState: xhr.readyState,
        status: xhr.status,
        length: e.loaded,
        total: e.total,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders().split('\n').reduce(function (obj, headerStr) {
          var headerArr = headerStr.match(/(.+): (.+)/);
          if (headerArr) {
            obj[headerArr[1]] = headerArr[2];
          }
          return obj;
        }, {})
      });
    };
  }

  xhr.onerror = function (err) {
    console.error('[h5-render] unexpected error in _xhr for \'fetch\' API', err);
    callback({
      status: ERROR_STATE,
      ok: false,
      statusText: '',
      data: ''
    });
  };

  xhr.send(config.body || null);
}

var stream = {

  /**
   * sendHttp
   * @deprecated
   * Note: This API is deprecated. Please use stream.fetch instead.
   * send a http request through XHR.
   * @param  {obj} params
   *  - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH',
   *  - url: url requested
   * @param  {string} callbackId
   */
  sendHttp: function sendHttp(param, callbackId) {
    if (typeof param === 'string') {
      try {
        param = JSON.parse(param);
      } catch (e) {
        return;
      }
    }
    if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) !== 'object' || !param.url) {
      return console.error('[h5-render] invalid config or invalid config.url for sendHttp API');
    }

    var sender = this.sender;
    var method = param.method || 'GET';
    var xhr = new XMLHttpRequest();
    xhr.open(method, param.url, true);
    xhr.onload = function () {
      sender.performCallback(callbackId, this.responseText);
    };
    xhr.onerror = function (error) {
      return console.error('[h5-render] unexpected error in sendHttp API', error);
      // sender.performCallback(
      //   callbackId,
      //   new Error('unexpected error in sendHttp API')
      // )
    };
    xhr.send();
  },

  /**
   * fetch
   * use stream.fetch to request for a json file, a plain text file or
   * a arraybuffer for a file stream. (You can use Blob and FileReader
   * API implemented by most modern browsers to read a arraybuffer.)
   * @param  {object} options config options
   *   - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH'
   *   - headers {obj}
   *   - url {string}
   *   - mode {string} 'cors' | 'no-cors' | 'same-origin' | 'navigate'
   *   - withCredentials {boolean}
   *   - body
   *   - type {string} 'json' | 'jsonp' | 'text'
   * @param  {string} callbackId
   * @param  {string} progressCallbackId
   */
  fetch: function fetch(options, callbackId, progressCallbackId) {
    var DEFAULT_METHOD = 'GET';
    var DEFAULT_MODE = 'cors';
    var DEFAULT_TYPE = 'text';

    var methodOptions = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'];
    var modeOptions = ['cors', 'no-cors', 'same-origin', 'navigate'];
    var typeOptions = ['text', 'json', 'jsonp', 'arraybuffer'];

    // const fallback = false  // fallback from 'fetch' API to XHR.
    var sender = this.sender;

    var config = utils$1.extend({}, options);

    // validate options.method
    if (typeof config.method === 'undefined') {
      config.method = DEFAULT_METHOD;
      console.warn('[h5-render] options.method for \'fetch\' API has been set to ' + 'default value \'' + config.method + '\'');
    } else if (methodOptions.indexOf((config.method + '').toUpperCase()) === -1) {
      return console.error('[h5-render] options.method \'' + config.method + '\' for \'fetch\' API should be one of ' + methodOptions + '.');
    }

    // validate options.url
    if (!config.url) {
      return console.error('[h5-render] options.url should be set for \'fetch\' API.');
    }

    // validate body content for method 'GET'.
    if (config.method.toUpperCase() === 'GET') {
      var body = config.body;
      if (utils$1.isPlainObject(body)) {
        body = index$4.stringify(body);
      }
      var url = config.url;
      var hashIdx = url.indexOf('#');
      hashIdx <= -1 && (hashIdx = url.length);
      var hash = url.substr(hashIdx);
      if (hash && hash[0] === '#') {
        hash = hash.substr(1);
      }
      url = url.substring(0, hashIdx);
      if (body) {
        url += (config.url.indexOf('?') <= -1 ? '?' : '&') + body;
      }
      url += '#' + hash;
      config.url = url;
    }

    // validate options.mode
    if (typeof config.mode === 'undefined') {
      config.mode = DEFAULT_MODE;
    } else if (modeOptions.indexOf((config.mode + '').toLowerCase()) === -1) {
      return console.error('[h5-render] options.mode \'' + config.mode + '\' for \'fetch\' API should be one of ' + modeOptions + '.');
    }

    // validate options.type
    if (typeof config.type === 'undefined') {
      config.type = DEFAULT_TYPE;
      console.warn('[h5-render] options.type for \'fetch\' API has been set to ' + 'default value \'' + config.type + '\'.');
    } else if (typeOptions.indexOf((config.type + '').toLowerCase()) === -1) {
      return console.error('[h5-render] options.type \'' + config.type + '\' for \'fetch\' API should be one of ' + typeOptions + '.');
    }

    // validate options.headers
    config.headers = config.headers || {};
    if (!utils$1.isPlainObject(config.headers)) {
      return console.error('[h5-render] options.headers should be a plain object');
    }

    // validate options.timeout
    config.timeout = parseInt(config.timeout, 10) || 2500;

    var _callArgs = [config, function (res) {
      sender.performCallback(callbackId, res);
    }];
    if (progressCallbackId) {
      _callArgs.push(function (res) {
        // Set 'keepAlive' to true for sending continuous callbacks
        sender.performCallback(progressCallbackId, res, true);
      });
    }

    if (config.type === 'jsonp') {
      _jsonp.apply(this, _callArgs);
    } else {
      _xhr.apply(this, _callArgs);
    }
  }

};

var meta$2 = {
  stream: [{
    name: 'sendHttp',
    args: ['object', 'function']
  }, {
    name: 'fetch',
    args: ['object', 'function', 'function']
  }]
};

var stream$1 = {
  init: function init(Weex) {
    utils$1 = Weex.utils;
    Weex.registerApiModule('stream', stream, meta$2);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/**

AUCTION:
taskQueue
Clipboard.setString()  NOW not works, facing to user-act lose of taskQueue.

works in Chrome Firefox Opera. but not in Safari.
@see https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility

Clipboard.getString() unimplemented. There is no easy way to do paste from clipboard to js variable.

So look out your app behavior, when downgrade to html5 render.
Any idea is welcome.
**/

var WEEX_CLIPBOARD_ID = '__weex_clipboard_id__';

var clipboard = {

  getString: function getString(callbackId) {
    // not supported in html5
    console.log('clipboard.getString() is not supported now.');
  },

  setString: function setString(text) {
    // not support safari
    if (typeof text === 'string' && text !== '' && document.execCommand) {
      var tempInput = element();
      tempInput.value = text;

      tempInput.select();
      document.execCommand('copy');
      // var out = document.execCommand('copy');
      // console.log("execCommand out is " + out);
      tempInput.value = '';
      tempInput.blur();
    } else {
      console.log('only support string input now');
    }
  }

};

function element() {
  var tempInput = document.getElementById(WEEX_CLIPBOARD_ID);
  if (!tempInput) {
    tempInput = document.createElement('input');
    tempInput.setAttribute('id', WEEX_CLIPBOARD_ID);
    tempInput.style.cssText = 'height:1px;width:1px;border:none;';
    // tempInput.style.cssText = "height:40px;width:300px;border:solid;"
    document.body.appendChild(tempInput);
  }
  return tempInput;
}

var meta$3 = {
  clipboard: [{
    name: 'getString',
    args: ['function']
  }, {
    name: 'setString',
    args: ['string']
  }]
};

var clipboard$1 = {
  init: function init(Weex) {
    Weex.registerApiModule('clipboard', clipboard, meta$3);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var event$1 = {
  /**
   * openUrl
   * @param  {string} url
   */
  openURL: function openURL(url) {
    location.href = url;
  }

};

var meta$4 = {
  event: [{
    name: 'openURL',
    args: ['string']
  }]
};

var eventModule = {
  init: function init(Weex) {
    Weex.registerApiModule('event', event$1, meta$4);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var utils$2 = {};
var endEvent;
var styleName;

var EVENT_NAME_MAP = {
  transition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'mozTransitionEnd',
  OTransition: 'oTransitionEnd',
  msTransition: 'MSTransitionEnd'
};

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;
  for (var name in EVENT_NAME_MAP) {
    if (name in style) {
      endEvent = EVENT_NAME_MAP[name];
      styleName = name;
      break;
    }
  }
}

detectEvents();

function transitionOnce(vnode, config, callback) {
  var nextFrame = utils$2.nextFrame;
  var toCSSText = utils$2.toCSSText;
  var autoPrefix = utils$2.autoPrefix;
  var camelizeKeys = utils$2.camelizeKeys;
  var normalizeStyle = utils$2.normalizeStyle;
  var isArray = utils$2.isArray;

  if (isArray(vnode)) {
    vnode = vnode[0];
  }

  var duration = config.duration || 0; // ms
  var timing = config.timingFunction || 'linear';
  var delay = config.delay || 0; // ms

  // TODO: parse transition properties
  var transitionValue = "all " + duration + "ms " + timing + " " + delay + "ms";

  var dom = vnode.$el;
  // trigger image lazyloading by force.
  dom && weex.utils.fireLazyload(dom, true);

  var transitionEndHandler = function transitionEndHandler(event) {
    event && event.stopPropagation();
    if (endEvent) {
      dom.removeEventListener(endEvent, transitionEndHandler);
      dom.style[styleName] = '';
    }
    callback();
  };
  if (endEvent) {
    dom.style[styleName] = transitionValue;
    dom.addEventListener(endEvent, transitionEndHandler);
  }
  nextFrame(function () {
    dom.style.cssText += toCSSText(autoPrefix(normalizeStyle(camelizeKeys(config.styles))) || {});
  });
}

var animation = {
  /**
   * transition
   * @param  {String} vnode
   * @param  {Object} config
   * @param  {String} callback
   */
  transition: function transition(vnode, config, callback) {
    if (!config.styles) {
      return;
    }
    return transitionOnce(vnode, config, function () {
      callback && callback();
    });
  }
};

var animation$1 = {
  init: function init(weex) {
    var extendKeys = weex.utils.extendKeys;
    extendKeys(utils$2, weex.utils, ['nextFrame', 'toCSSText', 'autoPrefix', 'camelizeKeys', 'normalizeStyle', 'isArray']);

    weex.registerModule('animation', animation);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var utils$3 = {};

function getParentScroller$1(vnode) {
  if (!vnode) {
    return null;
  }
  var vm = vnode.$el ? vnode : vnode.elm ? vnode.componentInstance || vnode.context : null;
  if (!vm) {
    return null;
  }
  var type = vm.$el && vm.$el.getAttribute('weex-type');
  if (config.scrollableTypes.indexOf(type) > -1) {
    return vm;
  }
  return getParentScroller$1(vm.$parent);
}

function now() {
  var now = window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now;
  return now();
}

function scrollElement(dSuffix, position) {
  if (this === document.body || this === window && window.scrollTo) {
    return window.scrollTo(0, position);
  }
  this["scroll" + dSuffix] = position;
}
/**
 * self invoked function that, given a context, steps through scrolling
 * @method step
 * @param {Object} context
 */
function step$1(context) {
  // call method again on next available frame
  context.frame = window.requestAnimationFrame(step$1.bind(window, context));
  var time = now();
  var elapsed = (time - context.startTime) / 468;
  // avoid elapsed times higher than one
  elapsed = elapsed > 1 ? 1 : elapsed;
  // apply easing to elapsed time
  var value = ease(elapsed);
  var currentPosition = context.startPosition + (context.position - context.startPosition) * value;
  context.method.call(context.scrollable, context.dSuffix, currentPosition);
  // return when end points have been reached
  /**
    * NOTE: should use ~~ to parse position number into integer. Otherwise
    * this two float numbers maybe have a slicely little difference, which
    * will cause this function never to stop.
  */
  if (~~currentPosition === ~~context.position) {
    window.cancelAnimationFrame(context.frame);
    return;
  }
}
/**
 * returns result of applying ease math function to a number
 * @method ease
 * @param {Number} k
 * @returns {Number}
 */
function ease(k) {
  return 0.5 * (1 - Math.cos(Math.PI * k));
}
var dom = {
  /**
   * scrollToElement
   * @param  {Vnode | VComponent} vnode
   * @param  {Object} options {offset:Number}
   *   ps: scroll-to has 'ease' and 'duration'(ms) as options.
   */
  scrollToElement: function scrollToElement(vnode, options) {
    var isArray = utils$3.isArray;
    if (isArray(vnode)) {
      vnode = vnode[0];
    }
    var scroller = getParentScroller$1(vnode);
    var scrollDirection = scroller && scroller.scrollDirection || 'vertical';
    var isWindow = !scroller;
    var ct = isWindow ? document.body : scroller.$el;
    var el = vnode.$el || vnode.elm;
    if (ct && el) {
      // if it's a list, then the listVnode.scrollDirection is undefined. just
      // assum it is the default value 'vertical'.
      var dSuffix = {
        horizontal: 'Left',
        vertical: 'Top'
      }[scrollDirection];
      var ctRect = ct.getBoundingClientRect();
      var elRect = el.getBoundingClientRect();
      /**
        * if it's a waterfall, and you want to scroll to a header, then just
        * scroll to the top.
      */
      if (scroller && scroller.weexType === 'waterfall' && scroller._headers && scroller._headers.indexOf(vnode.$vnode || vnode) > -1) {
        // it's in waterfall. just scroll to the top.
        elRect = ct.firstElementChild.getBoundingClientRect();
      }
      var dir = dSuffix.toLowerCase();
      var offset = (isWindow ? 0 : ct["scroll" + dSuffix]) + elRect[dir] - ctRect[dir];
      if (options) {
        offset += options.offset && options.offset * weex.config.env.scale || 0;
        // offset *= weex.config.env.scale /* adapt offset to different screen scales. */
      } else {}
      if (options && options.animated === false) {
        return scrollElement.call(ct, dSuffix, offset);
      }
      step$1({
        scrollable: ct,
        startTime: now(),
        frame: null,
        startPosition: isWindow ? window.pageYOffset : ct["scroll" + dSuffix],
        position: offset,
        method: scrollElement,
        dSuffix: dSuffix
      });
    }
  },
  /**
   * getComponentRect
   * @param {String} vnode
   * @param {Function} callback
   */
  getComponentRect: function getComponentRect(vnode, callback) {
    var isArray = utils$3.isArray;
    if (isArray(vnode)) {
      vnode = vnode[0];
    }
    var scale = window.weex.config.env.scale;
    var info = {
      result: false
    };
    var rectKeys = ['width', 'height', 'top', 'bottom', 'left', 'right'];

    function recalc(rect) {
      var res = {};
      rectKeys.forEach(function (key) {
        if (rect[key]) {
          res[key] = rect[key] / scale;
        }
      });
      return res;
    }
    if (vnode && vnode === 'viewport') {
      info.result = true;
      info.size = recalc({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        top: 0,
        left: 0,
        right: document.documentElement.clientWidth,
        bottom: document.documentElement.clientHeight
      });
      info.contentSize = recalc({
        width: document.documentElement.offsetWidth,
        height: document.documentElement.offsetHeight
      });
    } else if (vnode && vnode.$el) {
      info.result = true;
      info.size = recalc(vnode.$el.getBoundingClientRect());
      if (vnode.$refs.inner) {
        info.contentSize = recalc({
          width: vnode.$refs.inner.offsetWidth,
          height: vnode.$refs.inner.offsetHeight
        });
      } else {
        info.contentSize = recalc({
          width: vnode.$el.offsetWidth,
          height: vnode.$el.offsetHeight
        });
      }
    }
    var message = info.result ? info : {
      result: false,
      errMsg: 'Illegal parameter'
    };
    callback && callback(message);
    return message;
  },
  /**
   * for adding fontFace
   * @param {string} key fontFace
   * @param {object} styles rules
   */
  addRule: function addRule(key, styles) {
    var camelToKebab = utils$3.camelToKebab;
    var appendCss = utils$3.appendCss;
    key = camelToKebab(key);
    var stylesText = '';
    for (var k in styles) {
      if (styles.hasOwnProperty(k)) {
        stylesText += camelToKebab(k) + ':' + styles[k] + ';';
      }
    }
    var styleText = "@" + key + "{" + stylesText + "}";
    appendCss(styleText, 'dom-added-rules');
  }
};
var dom$1 = {
  init: function init(weex) {
    var extendKeys = weex.utils.extendKeys;
    extendKeys(utils$3, weex.utils, ['camelToKebab', 'appendCss', 'isArray']);
    weex.registerModule('dom', dom);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/**
 * globalEvent API:
 * @doc http://weex.apache.org/cn/references/modules/globalevent.html
 */
// track varies kinds of events and listeners.
var handlerTraker = {};

var globalEvent = {
  /**
   * addEventListener
   * NOTE: one callback can only be bound to the same event once. Bind a callback twice doesn't
   *  mean it will be called twice when the event fired once.
   * @param {string} evt - the event name to add a listener on.
   */
  addEventListener: function addEventListener(evt, callback) {
    if (!callback) {
      return;
    }
    var handlers = handlerTraker[evt];
    if (!handlers) {
      handlers = handlerTraker[evt] = [];
    }
    var len = handlers.length;
    for (var i = 0; i < len; i++) {
      if (handlers[i] === callback) {
        // this callback is already bound. no need to bind it again.
        return;
      }
    }
    handlers.push(callback);
    document.addEventListener(evt, callback);
  },

  /**
   * removeEventListener
   * NOTE: remove all the event handlers for the specified event type.
   * @param {string} evt - the event name to remove a listener from.
   */
  removeEventListener: function removeEventListener(evt) {
    var handlers = handlerTraker[evt];
    if (!handlers) {
      // evt handlers has been already removed.
      return;
    }
    handlers.forEach(function (cb) {
      return document.removeEventListener(evt, cb);
    });
    delete handlerTraker[evt];
  }
};

var globalEvent$1 = {
  init: function init(weex) {
    weex.registerModule('globalEvent', globalEvent);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var queue$1 = [];
var isProcessing = false;
var toastWin;
var TOAST_WIN_CLASS_NAME = 'weex-toast';
var TOAST_TRANSITION_DURATION = 0.4;

var DEFAULT_DURATION = 0.8;

function showToastWindow(msg, callback) {
  if (!toastWin) {
    toastWin = document.createElement('div');
    toastWin.classList.add(TOAST_WIN_CLASS_NAME);
    toastWin.classList.add('hide');
    document.body.appendChild(toastWin);
  }
  toastWin.textContent = msg;
  setTimeout(function () {
    toastWin.classList.remove('hide');
    callback && callback();
  }, 16);
}

function hideToastWindow(callback) {
  if (!toastWin) {
    return;
  }
  toastWin.classList.add('hide');
  setTimeout(function () {
    callback && callback();
  }, TOAST_TRANSITION_DURATION * 1000);
}

var _toast = {
  push: function push(msg, duration) {
    queue$1.push({
      msg: msg,
      duration: duration || DEFAULT_DURATION
    });
    this.show();
  },

  show: function show() {
    var that = this;

    // All messages had been toasted already, so remove the toast window,
    if (!queue$1.length) {
      toastWin && toastWin.parentNode.removeChild(toastWin);
      toastWin = null;
      return;
    }

    // the previous toast is not ended yet.
    if (isProcessing) {
      return;
    }
    isProcessing = true;

    var toastInfo = queue$1.shift();
    showToastWindow(toastInfo.msg, function () {
      setTimeout(function () {
        hideToastWindow(function () {
          isProcessing = false;
          that.show();
        });
      }, toastInfo.duration * 1000);
    });
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// there will be only one instance of modal.
var MODAL_WRAP_CLASS = 'weex-modal-wrap';
var MODAL_NODE_CLASS = 'weex-modal-node';

function Modal() {
  this.wrap = document.querySelector(MODAL_WRAP_CLASS);
  this.node = document.querySelector(MODAL_NODE_CLASS);
  if (!this.wrap) {
    this.createWrap();
  }
  if (!this.node) {
    this.createNode();
  }
  this.clearNode();
  this.createNodeContent();
  this.bindEvents();
}

Modal.prototype = {

  show: function show() {
    this.wrap.style.display = 'block';
    this.node.classList.remove('hide');
  },

  destroy: function destroy() {
    document.body.removeChild(this.wrap);
    document.body.removeChild(this.node);
    this.wrap = null;
    this.node = null;
  },

  createWrap: function createWrap() {
    this.wrap = document.createElement('div');
    this.wrap.className = MODAL_WRAP_CLASS;
    document.body.appendChild(this.wrap);
  },

  createNode: function createNode() {
    this.node = document.createElement('div');
    this.node.classList.add(MODAL_NODE_CLASS, 'hide');
    document.body.appendChild(this.node);
  },

  clearNode: function clearNode() {
    this.node.innerHTML = '';
  },

  createNodeContent: function createNodeContent() {

    // do nothing.
    // child classes can override this method.
  },

  bindEvents: function bindEvents() {
    this.wrap.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var CONTENT_CLASS = 'content';
var MSG_CLASS = 'content-msg';
var BUTTON_GROUP_CLASS = 'btn-group';
var BUTTON_CLASS = 'btn';

function Alert(config) {
  this.msg = config.message || '';
  this.callback = config.callback;
  this.okTitle = config.okTitle || 'OK';
  Modal.call(this);
  this.node.classList.add('weex-alert');
}

Alert.prototype = Object.create(Modal.prototype);

Alert.prototype.createNodeContent = function () {
  var content = document.createElement('div');
  content.classList.add(CONTENT_CLASS);
  this.node.appendChild(content);

  var msg = document.createElement('div');
  msg.classList.add(MSG_CLASS);
  msg.appendChild(document.createTextNode(this.msg));
  content.appendChild(msg);

  var buttonGroup = document.createElement('div');
  buttonGroup.classList.add(BUTTON_GROUP_CLASS);
  this.node.appendChild(buttonGroup);
  var button = document.createElement('div');
  button.classList.add(BUTTON_CLASS, 'alert-ok');
  button.appendChild(document.createTextNode(this.okTitle));
  buttonGroup.appendChild(button);
};

Alert.prototype.bindEvents = function () {
  Modal.prototype.bindEvents.call(this);
  var button = this.node.querySelector('.' + BUTTON_CLASS);
  button.addEventListener('click', function () {
    this.destroy();
    this.callback && this.callback();
  }.bind(this));
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var CONTENT_CLASS$1 = 'content';
var MSG_CLASS$1 = 'content-msg';
var BUTTON_GROUP_CLASS$1 = 'btn-group';
var BUTTON_CLASS$1 = 'btn';

function Confirm(config) {
  this.msg = config.message || '';
  this.callback = config.callback;
  this.okTitle = config.okTitle || 'OK';
  this.cancelTitle = config.cancelTitle || 'Cancel';
  Modal.call(this);
  this.node.classList.add('weex-confirm');
}

Confirm.prototype = Object.create(Modal.prototype);

Confirm.prototype.createNodeContent = function () {
  var content = document.createElement('div');
  content.classList.add(CONTENT_CLASS$1);
  this.node.appendChild(content);

  var msg = document.createElement('div');
  msg.classList.add(MSG_CLASS$1);
  msg.appendChild(document.createTextNode(this.msg));
  content.appendChild(msg);

  var buttonGroup = document.createElement('div');
  buttonGroup.classList.add(BUTTON_GROUP_CLASS$1);
  this.node.appendChild(buttonGroup);
  var btnOk = document.createElement('div');
  btnOk.appendChild(document.createTextNode(this.okTitle));
  btnOk.classList.add('btn-ok', BUTTON_CLASS$1);
  var btnCancel = document.createElement('div');
  btnCancel.appendChild(document.createTextNode(this.cancelTitle));
  btnCancel.classList.add('btn-cancel', BUTTON_CLASS$1);
  buttonGroup.appendChild(btnOk);
  buttonGroup.appendChild(btnCancel);
  this.node.appendChild(buttonGroup);
};

Confirm.prototype.bindEvents = function () {
  Modal.prototype.bindEvents.call(this);
  var btnOk = this.node.querySelector('.' + BUTTON_CLASS$1 + '.btn-ok');
  var btnCancel = this.node.querySelector('.' + BUTTON_CLASS$1 + '.btn-cancel');
  btnOk.addEventListener('click', function () {
    this.destroy();
    this.callback && this.callback(this.okTitle);
  }.bind(this));
  btnCancel.addEventListener('click', function () {
    this.destroy();
    this.callback && this.callback(this.cancelTitle);
  }.bind(this));
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var CONTENT_CLASS$2 = 'content';
var MSG_CLASS$2 = 'content-msg';
var BUTTON_GROUP_CLASS$2 = 'btn-group';
var BUTTON_CLASS$2 = 'btn';
var INPUT_WRAP_CLASS = 'input-wrap';
var INPUT_CLASS = 'input';

function Prompt(config) {
  this.msg = config.message || '';
  this.defaultMsg = config.default || '';
  this.callback = config.callback;
  this.okTitle = config.okTitle || 'OK';
  this.cancelTitle = config.cancelTitle || 'Cancel';
  Modal.call(this);
  this.node.classList.add('weex-prompt');
}

Prompt.prototype = Object.create(Modal.prototype);

Prompt.prototype.createNodeContent = function () {
  var content = document.createElement('div');
  content.classList.add(CONTENT_CLASS$2);
  this.node.appendChild(content);

  var msg = document.createElement('div');
  msg.classList.add(MSG_CLASS$2);
  msg.appendChild(document.createTextNode(this.msg));
  content.appendChild(msg);

  var inputWrap = document.createElement('div');
  inputWrap.classList.add(INPUT_WRAP_CLASS);
  content.appendChild(inputWrap);
  var input = document.createElement('input');
  input.classList.add(INPUT_CLASS);
  input.type = 'text';
  input.autofocus = true;
  input.placeholder = this.defaultMsg;
  inputWrap.appendChild(input);

  var buttonGroup = document.createElement('div');
  buttonGroup.classList.add(BUTTON_GROUP_CLASS$2);
  var btnOk = document.createElement('div');
  btnOk.appendChild(document.createTextNode(this.okTitle));
  btnOk.classList.add('btn-ok', BUTTON_CLASS$2);
  var btnCancel = document.createElement('div');
  btnCancel.appendChild(document.createTextNode(this.cancelTitle));
  btnCancel.classList.add('btn-cancel', BUTTON_CLASS$2);
  buttonGroup.appendChild(btnOk);
  buttonGroup.appendChild(btnCancel);
  this.node.appendChild(buttonGroup);
};

Prompt.prototype.bindEvents = function () {
  Modal.prototype.bindEvents.call(this);
  var btnOk = this.node.querySelector('.' + BUTTON_CLASS$2 + '.btn-ok');
  var btnCancel = this.node.querySelector('.' + BUTTON_CLASS$2 + '.btn-cancel');
  var that = this;
  btnOk.addEventListener('click', function () {
    var val = document.querySelector('input').value;
    this.destroy();
    this.callback && this.callback({
      result: that.okTitle,
      data: val
    });
  }.bind(this));
  btnCancel.addEventListener('click', function () {
    var val = document.querySelector('input').value;
    this.destroy();
    this.callback && this.callback({
      result: that.cancelTitle,
      data: val
    });
  }.bind(this));
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var _css$10 = "\n.weex-toast {\n  font-size: 0.426667rem;\n  line-height: 0.426667rem;\n  position: fixed;\n  z-index: 1999999999;\n  box-sizing: border-box;\n  max-width: 80%;\n  bottom: 50%;\n  left: 50%;\n  padding: 0.213333rem;\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n  opacity: 0.7;\n  -webkit-transition: all 0.4s ease-in-out;\n  -moz-transition: all 0.4s ease-in-out;\n  -ms-transition: all 0.4s ease-in-out;\n  transition: all 0.4s ease-in-out;\n  border-radius: 0.066667rem;\n  -webkit-transform: translateX(-50%);\n  -moz-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  transform: translateX(-50%);\n}\n\n.weex-toast.hide {\n  opacity: 0;\n}\n\n.weex-alert .weex-alert-ok {\n  width: 100%;\n}\n\n.weex-confirm .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n\n.weex-confirm .btn-group .btn.btn-ok {\n  border-right: 0.013333rem solid #ddd;\n}\n\n.weex-modal-wrap {\n  display: none;\n  position: fixed;\n  z-index: 999999999;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.weex-modal-node {\n  position: fixed;\n  z-index: 9999999999;\n  top: 50%;\n  left: 50%;\n  width: 6.666667rem;\n  min-height: 2.666667rem;\n  border-radius: 0.066667rem;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n}\n\n.weex-modal-node.hide {\n  display: none;\n}\n\n.weex-modal-node .content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-box-orient: vertical;\n  -moz-box-direction: normal;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  -moz-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -moz-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  min-height: 1.866667rem;\n  box-sizing: border-box;\n  font-size: 0.426667rem;\n  line-height: 0.426667rem;\n  padding: 0.213333rem;\n  border-bottom: 0.013333rem solid #ddd;\n}\n\n.weex-modal-node .btn-group {\n  width: 100%;\n  height: 0.8rem;\n  font-size: 0.373333rem;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  border: none;\n}\n\n.weex-modal-node .btn-group .btn {\n  text-align: center;\n}\n\n.weex-modal-node .btn-group .btn {\n  box-sizing: border-box;\n  height: 0.8rem;\n  line-height: 0.8rem;\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n  text-align: center;\n}\n\n.weex-prompt .input-wrap {\n  box-sizing: border-box;\n  width: 100%;\n  margin-top: 0.133333rem;\n  height: 0.96rem;\n}\n\n.weex-prompt .input-wrap .input {\n  box-sizing: border-box;\n  width: 100%;\n  height: 0.56rem;\n  line-height: 0.56rem;\n  font-size: 0.426667rem;\n  border: 0.013333rem solid #999;\n}\n\n.weex-prompt .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n\n.weex-prompt .btn-group .btn.btn-ok {\n  border-right: 0.013333rem solid #ddd;\n}\n";

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// TODO: rewrite the modal styles
var modal = {

  // duration: default is 0.8 seconds.
  toast: function toast(config) {
    _toast.push(config.message, config.duration);
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - callback
  alert: function alert(config, callback) {
    config.callback = function () {
      callback && callback();
    };
    new Alert(config).show();
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - cancelTitle: title of cancel button
  //  - callback
  confirm: function confirm(config, callback) {
    config.callback = function (val) {
      callback && callback(val);
    };
    new Confirm(config).show();
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - cancelTitle: title of cancel button
  //  - callback
  prompt: function prompt(config, callback) {
    config.callback = function (val) {
      callback && callback(val);
    };
    new Prompt(config).show();
  }
};

var modal$1 = {
  init: function init(Weex) {
    Weex.utils.appendCss(_css$10, 'weex-mud-modal');
    Weex.registerModule('modal', modal);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Navigator module
 */
var navigatorModule = {
  push: function push(config, callback) {
    window.location.href = config.url;
    callback && callback();
  },

  pop: function pop(config, callback) {
    window.history.back();
    callback && callback();
  }
};

var navigatorModule$1 = {
  init: function init(weex) {
    weex.registerModule('navigator', navigatorModule);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Webview module
 */
var isArray$2;

var webview = {
  goBack: function goBack(vnode) {
    if (isArray$2(vnode)) {
      vnode = vnode[0];
    }
    if (vnode && typeof vnode.goBack === 'function') {
      vnode.goBack();
    }
  },
  goForward: function goForward(vnode) {
    if (isArray$2(vnode)) {
      vnode = vnode[0];
    }
    if (vnode && typeof vnode.goForward === 'function') {
      vnode.goForward();
    }
  },
  reload: function reload(vnode) {
    if (isArray$2(vnode)) {
      vnode = vnode[0];
    }
    if (vnode && typeof vnode.reload === 'function') {
      vnode.reload();
    }
  }
};

var webview$1 = {
  init: function init(weex) {
    isArray$2 = weex.utils.isArray;
    weex.registerModule('webview', webview);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/**
 * websocket module
 */
/*global WebSocket*/
var websocket$1 = function () {
  var registerListeners = ['onopen', 'onmessage', 'onerror', 'onclose'];
  var ws = {
    INSTANCE: null,
    WebSocket: function (_WebSocket) {
      function WebSocket(_x, _x2) {
        return _WebSocket.apply(this, arguments);
      }

      WebSocket.toString = function () {
        return _WebSocket.toString();
      };

      return WebSocket;
    }(function (url, protocol) {
      if (!url) {
        ws.INSTANCE = null;
        return;
      }
      if (!protocol) {
        ws.INSTANCE = new WebSocket(url);
      } else {
        ws.INSTANCE = new WebSocket(url, protocol);
      }
      return ws.INSTANCE;
    }),
    send: function send(messages) {
      ws.INSTANCE && ws.INSTANCE.send(messages);
    },
    close: function close() {
      ws.INSTANCE && ws.INSTANCE.close();
    }
  };
  var loop = function loop(i) {
    if (registerListeners.hasOwnProperty(i)) {
      Object.defineProperty(ws, registerListeners[i], {
        get: function get() {
          return ws.INSTANCE && ws.INSTANCE[registerListeners[i]];
        },
        set: function set(fn) {
          if (ws.INSTANCE) {
            ws.INSTANCE[registerListeners[i]] = fn;
          }
        }
      });
    }
  };

  for (var i in registerListeners) {
    loop(i);
  }return ws;
}();

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// TODO: rewrite the module meta
var websocket = {
  init: function init(Weex) {
    Weex.registerModule('webSocket', websocket$1, { mountType: 'full' });
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var meta$5 = {
  /**
   * setViewport
   * Changing viewport width at runtime is not supported. Please use weex-viewport meta
   * tag to specify your viewport in your html file.
   */
  setViewport: function setViewport(options) {
    console.warn("[vue-render] meta.setViewport doesn't works as expected in web platform." + " Please use <meta name=\"weex-viewport\" content=\"xxx\"> to specify your viewport width.");
  }
};

var meta$6 = {
  init: function init(weex) {
    weex.registerModule('meta', meta$5);
  }
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// modules from render/browesr (legacy modules)

// custom modules
var modules$1 = [geolocation$1, storage$1, stream$1, clipboard$1, eventModule, modal$1, websocket, animation$1, dom$1, globalEvent$1, navigatorModule$1, webview$1, meta$6];

var preInit = weex.init;

weex.init = function () {
  preInit.apply(weex, arguments);
  var plugins = components.concat(modules$1);

  plugins.forEach(function (plugin) {
    weex.install(plugin);
  });
};

if (global.Vue) {
  weex.init(global.Vue);
}

module.exports = weex;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('text', {
    staticClass: ["message"]
  }, [_vm._v("Now, let's use Vue.js to build your Weex app.")]), _c('text', {
    on: {
      "click": function($event) {
        _vm.jump(_vm.link)
      }
    }
  }, [_vm._v("跳转")])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(10)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/zhanshichao/Documents/project/weex/src/components/Play.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  name: 'play',
  props: { // 添加props，即可从路由的props中取得指定的值
    id: {
      type: String,
      default: '1'
    }
  },
  data: function data(props) {
    return {
      link: '/',
      Id: +props.id
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用

    // 提取路由元数据，遍历 $route.matched 来检查路由记录中的 meta 字段
    if (to.matched.some(function (record) {
      return record.meta.requiresAuth;
    })) {}

    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(function (vm) {
      // 通过 `vm` 访问组件实例
    });
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next(); // 写这个方法的话必须要调用next方法，不然路由更新不生效
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // next(false) // 可以取消离开
    next(); // 写这个方法的话必须要调用next方法，不然跳转不生效
  },
  created: function created() {
    // const params = this.$route.params
    // console.log(params)
    // console.log(this.Id) // 可以取到路由中传递的值
  },

  methods: {
    back: function back(path) {
      // const navigator = weex.registerModule('navigator')
      // console.log(path)
      // // alert(navigator)
      // navigator
      //   ? navigator.push({
      //     url: path,
      //     animated: 'true'
      //   }) :
      this.$router.push(path); // 使用vue-router
    },
    nextTo: function nextTo() {
      this.Id += 1;
      // console.log(this.Id)
      this.$router.push('/play/' + this.Id);
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法，没有有next方法
    '$route': function $route(to, from) {
      // console.log(to, from)
    }
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('text', {
    staticClass: ["message"]
  }, [_vm._v("play" + _vm._s(_vm.Id))]), _c('text', {
    on: {
      "click": function($event) {
        _vm.back(_vm.link)
      }
    }
  }, [_vm._v("返回")]), _c('text', {
    on: {
      "click": _vm.nextTo
    }
  }, [_vm._v("下一个")])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(12)
)

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(14)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/zhanshichao/Documents/project/weex/src/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d863763e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "justifyContent": "center",
    "alignItems": "center"
  },
  "logo": {
    "width": "424",
    "height": "200"
  },
  "greeting": {
    "textAlign": "center",
    "marginTop": "70",
    "fontSize": "50",
    "color": "#41B883"
  },
  "message": {
    "marginTop": "30",
    "marginRight": "30",
    "marginBottom": "30",
    "marginLeft": "30",
    "fontSize": "32",
    "color": "#727272"
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  name: 'App',
  data: function data() {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
    };
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('image', {
    staticClass: ["logo"],
    attrs: {
      "src": _vm.logo
    }
  }), _c('text', {
    staticClass: ["greeting"]
  }, [_vm._v("The environment is ready!")]), _c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);