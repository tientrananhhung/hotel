webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withParams", {
  enumerable: true,
  get: function get() {
    return _withParams.default;
  }
});
exports.regex = exports.ref = exports.len = exports.req = void 0;

var _withParams = _interopRequireDefault(__webpack_require__(90));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var req = function req(value) {
  if (Array.isArray(value)) return !!value.length;

  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  if (_typeof(value) === 'object') {
    for (var _ in value) {
      return true;
    }

    return false;
  }

  return !!String(value).length;
};

exports.req = req;

var len = function len(value) {
  if (Array.isArray(value)) return value.length;

  if (_typeof(value) === 'object') {
    return Object.keys(value).length;
  }

  return String(value).length;
};

exports.len = len;

var ref = function ref(reference, vm, parentVm) {
  return typeof reference === 'function' ? reference.call(vm, parentVm) : parentVm[reference];
};

exports.ref = ref;

var regex = function regex(type, expr) {
  return (0, _withParams.default)({
    type: type
  }, function (value) {
    return !req(value) || expr.test(value);
  });
};

exports.regex = regex;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(15);
var isBuffer = __webpack_require__(61);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(60);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(29)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(54)
/* template */
var __vue_template__ = __webpack_require__(55)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\DialogRoom\\Dialogeditroom.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0999739f", Component.options)
  } else {
    hotAPI.reload("data-v-0999739f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(56)
/* template */
var __vue_template__ = __webpack_require__(57)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\DialogRoom\\Dialogdelroom.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-29b3791c", Component.options)
  } else {
    hotAPI.reload("data-v-29b3791c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var normalizeHeaderName = __webpack_require__(63);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(16);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(16);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(58)
/* template */
var __vue_template__ = __webpack_require__(59)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\DialogRoom\\Dialogaddroom.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56cf109c", Component.options)
  } else {
    hotAPI.reload("data-v-56cf109c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var settle = __webpack_require__(64);
var buildURL = __webpack_require__(66);
var parseHeaders = __webpack_require__(67);
var isURLSameOrigin = __webpack_require__(68);
var createError = __webpack_require__(17);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(69);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(70);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(65);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushParams = pushParams;
exports.popParams = popParams;
exports.withParams = withParams;
exports._setTarget = exports.target = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var stack = [];
var target = null;
exports.target = target;

var _setTarget = function _setTarget(x) {
  exports.target = target = x;
};

exports._setTarget = _setTarget;

function pushParams() {
  if (target !== null) {
    stack.push(target);
  }

  exports.target = target = {};
}

function popParams() {
  var lastTarget = target;
  var newTarget = exports.target = target = stack.pop() || null;

  if (newTarget) {
    if (!Array.isArray(newTarget.$sub)) {
      newTarget.$sub = [];
    }

    newTarget.$sub.push(lastTarget);
  }

  return lastTarget;
}

function addParams(params) {
  if (_typeof(params) === 'object' && !Array.isArray(params)) {
    exports.target = target = _objectSpread({}, target, params);
  } else {
    throw new Error('params must be an object');
  }
}

function withParamsDirect(params, validator) {
  return withParamsClosure(function (add) {
    return function () {
      add(params);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return validator.apply(this, args);
    };
  });
}

function withParamsClosure(closure) {
  var validator = closure(addParams);
  return function () {
    pushParams();

    try {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return validator.apply(this, args);
    } finally {
      popParams();
    }
  };
}

function withParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return withParamsDirect(paramsOrClosure, maybeValidator);
  }

  return withParamsClosure(paramsOrClosure);
}

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuetify_dist_vuetify_min_css__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuetify_dist_vuetify_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuetify_dist_vuetify_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuetify__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuetify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vuetify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store__ = __webpack_require__(129);







__webpack_require__(130);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_3_vuetify___default.a);
//
__WEBPACK_IMPORTED_MODULE_5__store__["a" /* default */].dispatch("Init").then(function (is_login) {
  var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    el: "#app",
    router: __WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */],
    store: __WEBPACK_IMPORTED_MODULE_5__store__["a" /* default */],
    render: function render(h) {
      return h(__WEBPACK_IMPORTED_MODULE_1__App_vue___default.a);
    },
    created: function created() {
      if (!is_login) {
        console.log("Chua dang nhap, chuyen den trang login");
        location.href = "#/login";
      } else {
        if (__WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */].app.$route.name === "Login") {
          __WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */].replace({ name: "Home" });
        }
      }
    }
  });
});
//

// Vue.component(
//   'passport-clients',
//   require('./components/passport/Clients.vue')
// );

// Vue.component(
//   'passport-authorized-clients',
//   require('./components/passport/AuthorizedClients.vue')
// );

// Vue.component(
//   'passport-personal-access-tokens',
//   require('./components/passport/PersonalAccessTokens.vue')
// );

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(30)
/* template */
var __vue_template__ = __webpack_require__(31)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6dd1125c", Component.options)
  } else {
    hotAPI.reload("data-v-6dd1125c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("02b3e434", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6dd1125c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6dd1125c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, "\n#app {\r\n  font-family: \"Avenir\", Helvetica, Arial, sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n  text-align: center;\r\n  color: #2c3e50;\n}\n#nav {\r\n  padding: 30px;\n}\n#nav a {\r\n  font-weight: bold;\r\n  color: #2c3e50;\n}\n#nav a.router-link-exact-active {\r\n  color: #42b983;\n}\r\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {}
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-app", [_c("router-view")], 1)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6dd1125c", module.exports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(34)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./vuetify.min.css", function() {
			var newContent = require("!!../../css-loader/index.js!./vuetify.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, "@keyframes shake{59%{margin-left:0}60%,80%{margin-left:2px}70%,90%{margin-left:-2px}}.black{background-color:#000!important;border-color:#000!important}.black--text{color:#000!important}.black--text input,.black--text textarea{caret-color:#000!important}.white{background-color:#fff!important;border-color:#fff!important}.white--text{color:#fff!important}.white--text input,.white--text textarea{caret-color:#fff!important}.transparent{background-color:transparent!important;border-color:transparent!important}.transparent--text{color:transparent!important}.transparent--text input,.transparent--text textarea{caret-color:transparent!important}.red{background-color:#f44336!important;border-color:#f44336!important}.red--text{color:#f44336!important}.red--text input,.red--text textarea{caret-color:#f44336!important}.red.lighten-5{background-color:#ffebee!important;border-color:#ffebee!important}.red--text.text--lighten-5{color:#ffebee!important}.red--text.text--lighten-5 input,.red--text.text--lighten-5 textarea{caret-color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important;border-color:#ffcdd2!important}.red--text.text--lighten-4{color:#ffcdd2!important}.red--text.text--lighten-4 input,.red--text.text--lighten-4 textarea{caret-color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important;border-color:#ef9a9a!important}.red--text.text--lighten-3{color:#ef9a9a!important}.red--text.text--lighten-3 input,.red--text.text--lighten-3 textarea{caret-color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important;border-color:#e57373!important}.red--text.text--lighten-2{color:#e57373!important}.red--text.text--lighten-2 input,.red--text.text--lighten-2 textarea{caret-color:#e57373!important}.red.lighten-1{background-color:#ef5350!important;border-color:#ef5350!important}.red--text.text--lighten-1{color:#ef5350!important}.red--text.text--lighten-1 input,.red--text.text--lighten-1 textarea{caret-color:#ef5350!important}.red.darken-1{background-color:#e53935!important;border-color:#e53935!important}.red--text.text--darken-1{color:#e53935!important}.red--text.text--darken-1 input,.red--text.text--darken-1 textarea{caret-color:#e53935!important}.red.darken-2{background-color:#d32f2f!important;border-color:#d32f2f!important}.red--text.text--darken-2{color:#d32f2f!important}.red--text.text--darken-2 input,.red--text.text--darken-2 textarea{caret-color:#d32f2f!important}.red.darken-3{background-color:#c62828!important;border-color:#c62828!important}.red--text.text--darken-3{color:#c62828!important}.red--text.text--darken-3 input,.red--text.text--darken-3 textarea{caret-color:#c62828!important}.red.darken-4{background-color:#b71c1c!important;border-color:#b71c1c!important}.red--text.text--darken-4{color:#b71c1c!important}.red--text.text--darken-4 input,.red--text.text--darken-4 textarea{caret-color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important;border-color:#ff8a80!important}.red--text.text--accent-1{color:#ff8a80!important}.red--text.text--accent-1 input,.red--text.text--accent-1 textarea{caret-color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important;border-color:#ff5252!important}.red--text.text--accent-2{color:#ff5252!important}.red--text.text--accent-2 input,.red--text.text--accent-2 textarea{caret-color:#ff5252!important}.red.accent-3{background-color:#ff1744!important;border-color:#ff1744!important}.red--text.text--accent-3{color:#ff1744!important}.red--text.text--accent-3 input,.red--text.text--accent-3 textarea{caret-color:#ff1744!important}.red.accent-4{background-color:#d50000!important;border-color:#d50000!important}.red--text.text--accent-4{color:#d50000!important}.red--text.text--accent-4 input,.red--text.text--accent-4 textarea{caret-color:#d50000!important}.pink{background-color:#e91e63!important;border-color:#e91e63!important}.pink--text{color:#e91e63!important}.pink--text input,.pink--text textarea{caret-color:#e91e63!important}.pink.lighten-5{background-color:#fce4ec!important;border-color:#fce4ec!important}.pink--text.text--lighten-5{color:#fce4ec!important}.pink--text.text--lighten-5 input,.pink--text.text--lighten-5 textarea{caret-color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important;border-color:#f8bbd0!important}.pink--text.text--lighten-4{color:#f8bbd0!important}.pink--text.text--lighten-4 input,.pink--text.text--lighten-4 textarea{caret-color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important;border-color:#f48fb1!important}.pink--text.text--lighten-3{color:#f48fb1!important}.pink--text.text--lighten-3 input,.pink--text.text--lighten-3 textarea{caret-color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important;border-color:#f06292!important}.pink--text.text--lighten-2{color:#f06292!important}.pink--text.text--lighten-2 input,.pink--text.text--lighten-2 textarea{caret-color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important;border-color:#ec407a!important}.pink--text.text--lighten-1{color:#ec407a!important}.pink--text.text--lighten-1 input,.pink--text.text--lighten-1 textarea{caret-color:#ec407a!important}.pink.darken-1{background-color:#d81b60!important;border-color:#d81b60!important}.pink--text.text--darken-1{color:#d81b60!important}.pink--text.text--darken-1 input,.pink--text.text--darken-1 textarea{caret-color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important;border-color:#c2185b!important}.pink--text.text--darken-2{color:#c2185b!important}.pink--text.text--darken-2 input,.pink--text.text--darken-2 textarea{caret-color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important;border-color:#ad1457!important}.pink--text.text--darken-3{color:#ad1457!important}.pink--text.text--darken-3 input,.pink--text.text--darken-3 textarea{caret-color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important;border-color:#880e4f!important}.pink--text.text--darken-4{color:#880e4f!important}.pink--text.text--darken-4 input,.pink--text.text--darken-4 textarea{caret-color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important;border-color:#ff80ab!important}.pink--text.text--accent-1{color:#ff80ab!important}.pink--text.text--accent-1 input,.pink--text.text--accent-1 textarea{caret-color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important;border-color:#ff4081!important}.pink--text.text--accent-2{color:#ff4081!important}.pink--text.text--accent-2 input,.pink--text.text--accent-2 textarea{caret-color:#ff4081!important}.pink.accent-3{background-color:#f50057!important;border-color:#f50057!important}.pink--text.text--accent-3{color:#f50057!important}.pink--text.text--accent-3 input,.pink--text.text--accent-3 textarea{caret-color:#f50057!important}.pink.accent-4{background-color:#c51162!important;border-color:#c51162!important}.pink--text.text--accent-4{color:#c51162!important}.pink--text.text--accent-4 input,.pink--text.text--accent-4 textarea{caret-color:#c51162!important}.purple{background-color:#9c27b0!important;border-color:#9c27b0!important}.purple--text{color:#9c27b0!important}.purple--text input,.purple--text textarea{caret-color:#9c27b0!important}.purple.lighten-5{background-color:#f3e5f5!important;border-color:#f3e5f5!important}.purple--text.text--lighten-5{color:#f3e5f5!important}.purple--text.text--lighten-5 input,.purple--text.text--lighten-5 textarea{caret-color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important;border-color:#e1bee7!important}.purple--text.text--lighten-4{color:#e1bee7!important}.purple--text.text--lighten-4 input,.purple--text.text--lighten-4 textarea{caret-color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important;border-color:#ce93d8!important}.purple--text.text--lighten-3{color:#ce93d8!important}.purple--text.text--lighten-3 input,.purple--text.text--lighten-3 textarea{caret-color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important;border-color:#ba68c8!important}.purple--text.text--lighten-2{color:#ba68c8!important}.purple--text.text--lighten-2 input,.purple--text.text--lighten-2 textarea{caret-color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important;border-color:#ab47bc!important}.purple--text.text--lighten-1{color:#ab47bc!important}.purple--text.text--lighten-1 input,.purple--text.text--lighten-1 textarea{caret-color:#ab47bc!important}.purple.darken-1{background-color:#8e24aa!important;border-color:#8e24aa!important}.purple--text.text--darken-1{color:#8e24aa!important}.purple--text.text--darken-1 input,.purple--text.text--darken-1 textarea{caret-color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important;border-color:#7b1fa2!important}.purple--text.text--darken-2{color:#7b1fa2!important}.purple--text.text--darken-2 input,.purple--text.text--darken-2 textarea{caret-color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important;border-color:#6a1b9a!important}.purple--text.text--darken-3{color:#6a1b9a!important}.purple--text.text--darken-3 input,.purple--text.text--darken-3 textarea{caret-color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important;border-color:#4a148c!important}.purple--text.text--darken-4{color:#4a148c!important}.purple--text.text--darken-4 input,.purple--text.text--darken-4 textarea{caret-color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important;border-color:#ea80fc!important}.purple--text.text--accent-1{color:#ea80fc!important}.purple--text.text--accent-1 input,.purple--text.text--accent-1 textarea{caret-color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important;border-color:#e040fb!important}.purple--text.text--accent-2{color:#e040fb!important}.purple--text.text--accent-2 input,.purple--text.text--accent-2 textarea{caret-color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important;border-color:#d500f9!important}.purple--text.text--accent-3{color:#d500f9!important}.purple--text.text--accent-3 input,.purple--text.text--accent-3 textarea{caret-color:#d500f9!important}.purple.accent-4{background-color:#a0f!important;border-color:#a0f!important}.purple--text.text--accent-4{color:#a0f!important}.purple--text.text--accent-4 input,.purple--text.text--accent-4 textarea{caret-color:#a0f!important}.deep-purple{background-color:#673ab7!important;border-color:#673ab7!important}.deep-purple--text{color:#673ab7!important}.deep-purple--text input,.deep-purple--text textarea{caret-color:#673ab7!important}.deep-purple.lighten-5{background-color:#ede7f6!important;border-color:#ede7f6!important}.deep-purple--text.text--lighten-5{color:#ede7f6!important}.deep-purple--text.text--lighten-5 input,.deep-purple--text.text--lighten-5 textarea{caret-color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important;border-color:#d1c4e9!important}.deep-purple--text.text--lighten-4{color:#d1c4e9!important}.deep-purple--text.text--lighten-4 input,.deep-purple--text.text--lighten-4 textarea{caret-color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important;border-color:#b39ddb!important}.deep-purple--text.text--lighten-3{color:#b39ddb!important}.deep-purple--text.text--lighten-3 input,.deep-purple--text.text--lighten-3 textarea{caret-color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important;border-color:#9575cd!important}.deep-purple--text.text--lighten-2{color:#9575cd!important}.deep-purple--text.text--lighten-2 input,.deep-purple--text.text--lighten-2 textarea{caret-color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important;border-color:#7e57c2!important}.deep-purple--text.text--lighten-1{color:#7e57c2!important}.deep-purple--text.text--lighten-1 input,.deep-purple--text.text--lighten-1 textarea{caret-color:#7e57c2!important}.deep-purple.darken-1{background-color:#5e35b1!important;border-color:#5e35b1!important}.deep-purple--text.text--darken-1{color:#5e35b1!important}.deep-purple--text.text--darken-1 input,.deep-purple--text.text--darken-1 textarea{caret-color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important;border-color:#512da8!important}.deep-purple--text.text--darken-2{color:#512da8!important}.deep-purple--text.text--darken-2 input,.deep-purple--text.text--darken-2 textarea{caret-color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important;border-color:#4527a0!important}.deep-purple--text.text--darken-3{color:#4527a0!important}.deep-purple--text.text--darken-3 input,.deep-purple--text.text--darken-3 textarea{caret-color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important;border-color:#311b92!important}.deep-purple--text.text--darken-4{color:#311b92!important}.deep-purple--text.text--darken-4 input,.deep-purple--text.text--darken-4 textarea{caret-color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important;border-color:#b388ff!important}.deep-purple--text.text--accent-1{color:#b388ff!important}.deep-purple--text.text--accent-1 input,.deep-purple--text.text--accent-1 textarea{caret-color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important;border-color:#7c4dff!important}.deep-purple--text.text--accent-2{color:#7c4dff!important}.deep-purple--text.text--accent-2 input,.deep-purple--text.text--accent-2 textarea{caret-color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important;border-color:#651fff!important}.deep-purple--text.text--accent-3{color:#651fff!important}.deep-purple--text.text--accent-3 input,.deep-purple--text.text--accent-3 textarea{caret-color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important;border-color:#6200ea!important}.deep-purple--text.text--accent-4{color:#6200ea!important}.deep-purple--text.text--accent-4 input,.deep-purple--text.text--accent-4 textarea{caret-color:#6200ea!important}.indigo{background-color:#3f51b5!important;border-color:#3f51b5!important}.indigo--text{color:#3f51b5!important}.indigo--text input,.indigo--text textarea{caret-color:#3f51b5!important}.indigo.lighten-5{background-color:#e8eaf6!important;border-color:#e8eaf6!important}.indigo--text.text--lighten-5{color:#e8eaf6!important}.indigo--text.text--lighten-5 input,.indigo--text.text--lighten-5 textarea{caret-color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important;border-color:#c5cae9!important}.indigo--text.text--lighten-4{color:#c5cae9!important}.indigo--text.text--lighten-4 input,.indigo--text.text--lighten-4 textarea{caret-color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important;border-color:#9fa8da!important}.indigo--text.text--lighten-3{color:#9fa8da!important}.indigo--text.text--lighten-3 input,.indigo--text.text--lighten-3 textarea{caret-color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important;border-color:#7986cb!important}.indigo--text.text--lighten-2{color:#7986cb!important}.indigo--text.text--lighten-2 input,.indigo--text.text--lighten-2 textarea{caret-color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important;border-color:#5c6bc0!important}.indigo--text.text--lighten-1{color:#5c6bc0!important}.indigo--text.text--lighten-1 input,.indigo--text.text--lighten-1 textarea{caret-color:#5c6bc0!important}.indigo.darken-1{background-color:#3949ab!important;border-color:#3949ab!important}.indigo--text.text--darken-1{color:#3949ab!important}.indigo--text.text--darken-1 input,.indigo--text.text--darken-1 textarea{caret-color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important;border-color:#303f9f!important}.indigo--text.text--darken-2{color:#303f9f!important}.indigo--text.text--darken-2 input,.indigo--text.text--darken-2 textarea{caret-color:#303f9f!important}.indigo.darken-3{background-color:#283593!important;border-color:#283593!important}.indigo--text.text--darken-3{color:#283593!important}.indigo--text.text--darken-3 input,.indigo--text.text--darken-3 textarea{caret-color:#283593!important}.indigo.darken-4{background-color:#1a237e!important;border-color:#1a237e!important}.indigo--text.text--darken-4{color:#1a237e!important}.indigo--text.text--darken-4 input,.indigo--text.text--darken-4 textarea{caret-color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important;border-color:#8c9eff!important}.indigo--text.text--accent-1{color:#8c9eff!important}.indigo--text.text--accent-1 input,.indigo--text.text--accent-1 textarea{caret-color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important;border-color:#536dfe!important}.indigo--text.text--accent-2{color:#536dfe!important}.indigo--text.text--accent-2 input,.indigo--text.text--accent-2 textarea{caret-color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important;border-color:#3d5afe!important}.indigo--text.text--accent-3{color:#3d5afe!important}.indigo--text.text--accent-3 input,.indigo--text.text--accent-3 textarea{caret-color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important;border-color:#304ffe!important}.indigo--text.text--accent-4{color:#304ffe!important}.indigo--text.text--accent-4 input,.indigo--text.text--accent-4 textarea{caret-color:#304ffe!important}.blue{background-color:#2196f3!important;border-color:#2196f3!important}.blue--text{color:#2196f3!important}.blue--text input,.blue--text textarea{caret-color:#2196f3!important}.blue.lighten-5{background-color:#e3f2fd!important;border-color:#e3f2fd!important}.blue--text.text--lighten-5{color:#e3f2fd!important}.blue--text.text--lighten-5 input,.blue--text.text--lighten-5 textarea{caret-color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important;border-color:#bbdefb!important}.blue--text.text--lighten-4{color:#bbdefb!important}.blue--text.text--lighten-4 input,.blue--text.text--lighten-4 textarea{caret-color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important;border-color:#90caf9!important}.blue--text.text--lighten-3{color:#90caf9!important}.blue--text.text--lighten-3 input,.blue--text.text--lighten-3 textarea{caret-color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important;border-color:#64b5f6!important}.blue--text.text--lighten-2{color:#64b5f6!important}.blue--text.text--lighten-2 input,.blue--text.text--lighten-2 textarea{caret-color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important;border-color:#42a5f5!important}.blue--text.text--lighten-1{color:#42a5f5!important}.blue--text.text--lighten-1 input,.blue--text.text--lighten-1 textarea{caret-color:#42a5f5!important}.blue.darken-1{background-color:#1e88e5!important;border-color:#1e88e5!important}.blue--text.text--darken-1{color:#1e88e5!important}.blue--text.text--darken-1 input,.blue--text.text--darken-1 textarea{caret-color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important;border-color:#1976d2!important}.blue--text.text--darken-2{color:#1976d2!important}.blue--text.text--darken-2 input,.blue--text.text--darken-2 textarea{caret-color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important;border-color:#1565c0!important}.blue--text.text--darken-3{color:#1565c0!important}.blue--text.text--darken-3 input,.blue--text.text--darken-3 textarea{caret-color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important;border-color:#0d47a1!important}.blue--text.text--darken-4{color:#0d47a1!important}.blue--text.text--darken-4 input,.blue--text.text--darken-4 textarea{caret-color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important;border-color:#82b1ff!important}.blue--text.text--accent-1{color:#82b1ff!important}.blue--text.text--accent-1 input,.blue--text.text--accent-1 textarea{caret-color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important;border-color:#448aff!important}.blue--text.text--accent-2{color:#448aff!important}.blue--text.text--accent-2 input,.blue--text.text--accent-2 textarea{caret-color:#448aff!important}.blue.accent-3{background-color:#2979ff!important;border-color:#2979ff!important}.blue--text.text--accent-3{color:#2979ff!important}.blue--text.text--accent-3 input,.blue--text.text--accent-3 textarea{caret-color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important;border-color:#2962ff!important}.blue--text.text--accent-4{color:#2962ff!important}.blue--text.text--accent-4 input,.blue--text.text--accent-4 textarea{caret-color:#2962ff!important}.light-blue{background-color:#03a9f4!important;border-color:#03a9f4!important}.light-blue--text{color:#03a9f4!important}.light-blue--text input,.light-blue--text textarea{caret-color:#03a9f4!important}.light-blue.lighten-5{background-color:#e1f5fe!important;border-color:#e1f5fe!important}.light-blue--text.text--lighten-5{color:#e1f5fe!important}.light-blue--text.text--lighten-5 input,.light-blue--text.text--lighten-5 textarea{caret-color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important;border-color:#b3e5fc!important}.light-blue--text.text--lighten-4{color:#b3e5fc!important}.light-blue--text.text--lighten-4 input,.light-blue--text.text--lighten-4 textarea{caret-color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important;border-color:#81d4fa!important}.light-blue--text.text--lighten-3{color:#81d4fa!important}.light-blue--text.text--lighten-3 input,.light-blue--text.text--lighten-3 textarea{caret-color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important;border-color:#4fc3f7!important}.light-blue--text.text--lighten-2{color:#4fc3f7!important}.light-blue--text.text--lighten-2 input,.light-blue--text.text--lighten-2 textarea{caret-color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important;border-color:#29b6f6!important}.light-blue--text.text--lighten-1{color:#29b6f6!important}.light-blue--text.text--lighten-1 input,.light-blue--text.text--lighten-1 textarea{caret-color:#29b6f6!important}.light-blue.darken-1{background-color:#039be5!important;border-color:#039be5!important}.light-blue--text.text--darken-1{color:#039be5!important}.light-blue--text.text--darken-1 input,.light-blue--text.text--darken-1 textarea{caret-color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important;border-color:#0288d1!important}.light-blue--text.text--darken-2{color:#0288d1!important}.light-blue--text.text--darken-2 input,.light-blue--text.text--darken-2 textarea{caret-color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important;border-color:#0277bd!important}.light-blue--text.text--darken-3{color:#0277bd!important}.light-blue--text.text--darken-3 input,.light-blue--text.text--darken-3 textarea{caret-color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important;border-color:#01579b!important}.light-blue--text.text--darken-4{color:#01579b!important}.light-blue--text.text--darken-4 input,.light-blue--text.text--darken-4 textarea{caret-color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important;border-color:#80d8ff!important}.light-blue--text.text--accent-1{color:#80d8ff!important}.light-blue--text.text--accent-1 input,.light-blue--text.text--accent-1 textarea{caret-color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important;border-color:#40c4ff!important}.light-blue--text.text--accent-2{color:#40c4ff!important}.light-blue--text.text--accent-2 input,.light-blue--text.text--accent-2 textarea{caret-color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important;border-color:#00b0ff!important}.light-blue--text.text--accent-3{color:#00b0ff!important}.light-blue--text.text--accent-3 input,.light-blue--text.text--accent-3 textarea{caret-color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important;border-color:#0091ea!important}.light-blue--text.text--accent-4{color:#0091ea!important}.light-blue--text.text--accent-4 input,.light-blue--text.text--accent-4 textarea{caret-color:#0091ea!important}.cyan{background-color:#00bcd4!important;border-color:#00bcd4!important}.cyan--text{color:#00bcd4!important}.cyan--text input,.cyan--text textarea{caret-color:#00bcd4!important}.cyan.lighten-5{background-color:#e0f7fa!important;border-color:#e0f7fa!important}.cyan--text.text--lighten-5{color:#e0f7fa!important}.cyan--text.text--lighten-5 input,.cyan--text.text--lighten-5 textarea{caret-color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important;border-color:#b2ebf2!important}.cyan--text.text--lighten-4{color:#b2ebf2!important}.cyan--text.text--lighten-4 input,.cyan--text.text--lighten-4 textarea{caret-color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important;border-color:#80deea!important}.cyan--text.text--lighten-3{color:#80deea!important}.cyan--text.text--lighten-3 input,.cyan--text.text--lighten-3 textarea{caret-color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important;border-color:#4dd0e1!important}.cyan--text.text--lighten-2{color:#4dd0e1!important}.cyan--text.text--lighten-2 input,.cyan--text.text--lighten-2 textarea{caret-color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important;border-color:#26c6da!important}.cyan--text.text--lighten-1{color:#26c6da!important}.cyan--text.text--lighten-1 input,.cyan--text.text--lighten-1 textarea{caret-color:#26c6da!important}.cyan.darken-1{background-color:#00acc1!important;border-color:#00acc1!important}.cyan--text.text--darken-1{color:#00acc1!important}.cyan--text.text--darken-1 input,.cyan--text.text--darken-1 textarea{caret-color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important;border-color:#0097a7!important}.cyan--text.text--darken-2{color:#0097a7!important}.cyan--text.text--darken-2 input,.cyan--text.text--darken-2 textarea{caret-color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important;border-color:#00838f!important}.cyan--text.text--darken-3{color:#00838f!important}.cyan--text.text--darken-3 input,.cyan--text.text--darken-3 textarea{caret-color:#00838f!important}.cyan.darken-4{background-color:#006064!important;border-color:#006064!important}.cyan--text.text--darken-4{color:#006064!important}.cyan--text.text--darken-4 input,.cyan--text.text--darken-4 textarea{caret-color:#006064!important}.cyan.accent-1{background-color:#84ffff!important;border-color:#84ffff!important}.cyan--text.text--accent-1{color:#84ffff!important}.cyan--text.text--accent-1 input,.cyan--text.text--accent-1 textarea{caret-color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important;border-color:#18ffff!important}.cyan--text.text--accent-2{color:#18ffff!important}.cyan--text.text--accent-2 input,.cyan--text.text--accent-2 textarea{caret-color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important;border-color:#00e5ff!important}.cyan--text.text--accent-3{color:#00e5ff!important}.cyan--text.text--accent-3 input,.cyan--text.text--accent-3 textarea{caret-color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important;border-color:#00b8d4!important}.cyan--text.text--accent-4{color:#00b8d4!important}.cyan--text.text--accent-4 input,.cyan--text.text--accent-4 textarea{caret-color:#00b8d4!important}.teal{background-color:#009688!important;border-color:#009688!important}.teal--text{color:#009688!important}.teal--text input,.teal--text textarea{caret-color:#009688!important}.teal.lighten-5{background-color:#e0f2f1!important;border-color:#e0f2f1!important}.teal--text.text--lighten-5{color:#e0f2f1!important}.teal--text.text--lighten-5 input,.teal--text.text--lighten-5 textarea{caret-color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important;border-color:#b2dfdb!important}.teal--text.text--lighten-4{color:#b2dfdb!important}.teal--text.text--lighten-4 input,.teal--text.text--lighten-4 textarea{caret-color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important;border-color:#80cbc4!important}.teal--text.text--lighten-3{color:#80cbc4!important}.teal--text.text--lighten-3 input,.teal--text.text--lighten-3 textarea{caret-color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important;border-color:#4db6ac!important}.teal--text.text--lighten-2{color:#4db6ac!important}.teal--text.text--lighten-2 input,.teal--text.text--lighten-2 textarea{caret-color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important;border-color:#26a69a!important}.teal--text.text--lighten-1{color:#26a69a!important}.teal--text.text--lighten-1 input,.teal--text.text--lighten-1 textarea{caret-color:#26a69a!important}.teal.darken-1{background-color:#00897b!important;border-color:#00897b!important}.teal--text.text--darken-1{color:#00897b!important}.teal--text.text--darken-1 input,.teal--text.text--darken-1 textarea{caret-color:#00897b!important}.teal.darken-2{background-color:#00796b!important;border-color:#00796b!important}.teal--text.text--darken-2{color:#00796b!important}.teal--text.text--darken-2 input,.teal--text.text--darken-2 textarea{caret-color:#00796b!important}.teal.darken-3{background-color:#00695c!important;border-color:#00695c!important}.teal--text.text--darken-3{color:#00695c!important}.teal--text.text--darken-3 input,.teal--text.text--darken-3 textarea{caret-color:#00695c!important}.teal.darken-4{background-color:#004d40!important;border-color:#004d40!important}.teal--text.text--darken-4{color:#004d40!important}.teal--text.text--darken-4 input,.teal--text.text--darken-4 textarea{caret-color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important;border-color:#a7ffeb!important}.teal--text.text--accent-1{color:#a7ffeb!important}.teal--text.text--accent-1 input,.teal--text.text--accent-1 textarea{caret-color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important;border-color:#64ffda!important}.teal--text.text--accent-2{color:#64ffda!important}.teal--text.text--accent-2 input,.teal--text.text--accent-2 textarea{caret-color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important;border-color:#1de9b6!important}.teal--text.text--accent-3{color:#1de9b6!important}.teal--text.text--accent-3 input,.teal--text.text--accent-3 textarea{caret-color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important;border-color:#00bfa5!important}.teal--text.text--accent-4{color:#00bfa5!important}.teal--text.text--accent-4 input,.teal--text.text--accent-4 textarea{caret-color:#00bfa5!important}.green{background-color:#4caf50!important;border-color:#4caf50!important}.green--text{color:#4caf50!important}.green--text input,.green--text textarea{caret-color:#4caf50!important}.green.lighten-5{background-color:#e8f5e9!important;border-color:#e8f5e9!important}.green--text.text--lighten-5{color:#e8f5e9!important}.green--text.text--lighten-5 input,.green--text.text--lighten-5 textarea{caret-color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important;border-color:#c8e6c9!important}.green--text.text--lighten-4{color:#c8e6c9!important}.green--text.text--lighten-4 input,.green--text.text--lighten-4 textarea{caret-color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important;border-color:#a5d6a7!important}.green--text.text--lighten-3{color:#a5d6a7!important}.green--text.text--lighten-3 input,.green--text.text--lighten-3 textarea{caret-color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important;border-color:#81c784!important}.green--text.text--lighten-2{color:#81c784!important}.green--text.text--lighten-2 input,.green--text.text--lighten-2 textarea{caret-color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important;border-color:#66bb6a!important}.green--text.text--lighten-1{color:#66bb6a!important}.green--text.text--lighten-1 input,.green--text.text--lighten-1 textarea{caret-color:#66bb6a!important}.green.darken-1{background-color:#43a047!important;border-color:#43a047!important}.green--text.text--darken-1{color:#43a047!important}.green--text.text--darken-1 input,.green--text.text--darken-1 textarea{caret-color:#43a047!important}.green.darken-2{background-color:#388e3c!important;border-color:#388e3c!important}.green--text.text--darken-2{color:#388e3c!important}.green--text.text--darken-2 input,.green--text.text--darken-2 textarea{caret-color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important;border-color:#2e7d32!important}.green--text.text--darken-3{color:#2e7d32!important}.green--text.text--darken-3 input,.green--text.text--darken-3 textarea{caret-color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important;border-color:#1b5e20!important}.green--text.text--darken-4{color:#1b5e20!important}.green--text.text--darken-4 input,.green--text.text--darken-4 textarea{caret-color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important;border-color:#b9f6ca!important}.green--text.text--accent-1{color:#b9f6ca!important}.green--text.text--accent-1 input,.green--text.text--accent-1 textarea{caret-color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important;border-color:#69f0ae!important}.green--text.text--accent-2{color:#69f0ae!important}.green--text.text--accent-2 input,.green--text.text--accent-2 textarea{caret-color:#69f0ae!important}.green.accent-3{background-color:#00e676!important;border-color:#00e676!important}.green--text.text--accent-3{color:#00e676!important}.green--text.text--accent-3 input,.green--text.text--accent-3 textarea{caret-color:#00e676!important}.green.accent-4{background-color:#00c853!important;border-color:#00c853!important}.green--text.text--accent-4{color:#00c853!important}.green--text.text--accent-4 input,.green--text.text--accent-4 textarea{caret-color:#00c853!important}.light-green{background-color:#8bc34a!important;border-color:#8bc34a!important}.light-green--text{color:#8bc34a!important}.light-green--text input,.light-green--text textarea{caret-color:#8bc34a!important}.light-green.lighten-5{background-color:#f1f8e9!important;border-color:#f1f8e9!important}.light-green--text.text--lighten-5{color:#f1f8e9!important}.light-green--text.text--lighten-5 input,.light-green--text.text--lighten-5 textarea{caret-color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important;border-color:#dcedc8!important}.light-green--text.text--lighten-4{color:#dcedc8!important}.light-green--text.text--lighten-4 input,.light-green--text.text--lighten-4 textarea{caret-color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important;border-color:#c5e1a5!important}.light-green--text.text--lighten-3{color:#c5e1a5!important}.light-green--text.text--lighten-3 input,.light-green--text.text--lighten-3 textarea{caret-color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important;border-color:#aed581!important}.light-green--text.text--lighten-2{color:#aed581!important}.light-green--text.text--lighten-2 input,.light-green--text.text--lighten-2 textarea{caret-color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important;border-color:#9ccc65!important}.light-green--text.text--lighten-1{color:#9ccc65!important}.light-green--text.text--lighten-1 input,.light-green--text.text--lighten-1 textarea{caret-color:#9ccc65!important}.light-green.darken-1{background-color:#7cb342!important;border-color:#7cb342!important}.light-green--text.text--darken-1{color:#7cb342!important}.light-green--text.text--darken-1 input,.light-green--text.text--darken-1 textarea{caret-color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important;border-color:#689f38!important}.light-green--text.text--darken-2{color:#689f38!important}.light-green--text.text--darken-2 input,.light-green--text.text--darken-2 textarea{caret-color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important;border-color:#558b2f!important}.light-green--text.text--darken-3{color:#558b2f!important}.light-green--text.text--darken-3 input,.light-green--text.text--darken-3 textarea{caret-color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important;border-color:#33691e!important}.light-green--text.text--darken-4{color:#33691e!important}.light-green--text.text--darken-4 input,.light-green--text.text--darken-4 textarea{caret-color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important;border-color:#ccff90!important}.light-green--text.text--accent-1{color:#ccff90!important}.light-green--text.text--accent-1 input,.light-green--text.text--accent-1 textarea{caret-color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important;border-color:#b2ff59!important}.light-green--text.text--accent-2{color:#b2ff59!important}.light-green--text.text--accent-2 input,.light-green--text.text--accent-2 textarea{caret-color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important;border-color:#76ff03!important}.light-green--text.text--accent-3{color:#76ff03!important}.light-green--text.text--accent-3 input,.light-green--text.text--accent-3 textarea{caret-color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important;border-color:#64dd17!important}.light-green--text.text--accent-4{color:#64dd17!important}.light-green--text.text--accent-4 input,.light-green--text.text--accent-4 textarea{caret-color:#64dd17!important}.lime{background-color:#cddc39!important;border-color:#cddc39!important}.lime--text{color:#cddc39!important}.lime--text input,.lime--text textarea{caret-color:#cddc39!important}.lime.lighten-5{background-color:#f9fbe7!important;border-color:#f9fbe7!important}.lime--text.text--lighten-5{color:#f9fbe7!important}.lime--text.text--lighten-5 input,.lime--text.text--lighten-5 textarea{caret-color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important;border-color:#f0f4c3!important}.lime--text.text--lighten-4{color:#f0f4c3!important}.lime--text.text--lighten-4 input,.lime--text.text--lighten-4 textarea{caret-color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important;border-color:#e6ee9c!important}.lime--text.text--lighten-3{color:#e6ee9c!important}.lime--text.text--lighten-3 input,.lime--text.text--lighten-3 textarea{caret-color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important;border-color:#dce775!important}.lime--text.text--lighten-2{color:#dce775!important}.lime--text.text--lighten-2 input,.lime--text.text--lighten-2 textarea{caret-color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important;border-color:#d4e157!important}.lime--text.text--lighten-1{color:#d4e157!important}.lime--text.text--lighten-1 input,.lime--text.text--lighten-1 textarea{caret-color:#d4e157!important}.lime.darken-1{background-color:#c0ca33!important;border-color:#c0ca33!important}.lime--text.text--darken-1{color:#c0ca33!important}.lime--text.text--darken-1 input,.lime--text.text--darken-1 textarea{caret-color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important;border-color:#afb42b!important}.lime--text.text--darken-2{color:#afb42b!important}.lime--text.text--darken-2 input,.lime--text.text--darken-2 textarea{caret-color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important;border-color:#9e9d24!important}.lime--text.text--darken-3{color:#9e9d24!important}.lime--text.text--darken-3 input,.lime--text.text--darken-3 textarea{caret-color:#9e9d24!important}.lime.darken-4{background-color:#827717!important;border-color:#827717!important}.lime--text.text--darken-4{color:#827717!important}.lime--text.text--darken-4 input,.lime--text.text--darken-4 textarea{caret-color:#827717!important}.lime.accent-1{background-color:#f4ff81!important;border-color:#f4ff81!important}.lime--text.text--accent-1{color:#f4ff81!important}.lime--text.text--accent-1 input,.lime--text.text--accent-1 textarea{caret-color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important;border-color:#eeff41!important}.lime--text.text--accent-2{color:#eeff41!important}.lime--text.text--accent-2 input,.lime--text.text--accent-2 textarea{caret-color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important;border-color:#c6ff00!important}.lime--text.text--accent-3{color:#c6ff00!important}.lime--text.text--accent-3 input,.lime--text.text--accent-3 textarea{caret-color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important;border-color:#aeea00!important}.lime--text.text--accent-4{color:#aeea00!important}.lime--text.text--accent-4 input,.lime--text.text--accent-4 textarea{caret-color:#aeea00!important}.yellow{background-color:#ffeb3b!important;border-color:#ffeb3b!important}.yellow--text{color:#ffeb3b!important}.yellow--text input,.yellow--text textarea{caret-color:#ffeb3b!important}.yellow.lighten-5{background-color:#fffde7!important;border-color:#fffde7!important}.yellow--text.text--lighten-5{color:#fffde7!important}.yellow--text.text--lighten-5 input,.yellow--text.text--lighten-5 textarea{caret-color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important;border-color:#fff9c4!important}.yellow--text.text--lighten-4{color:#fff9c4!important}.yellow--text.text--lighten-4 input,.yellow--text.text--lighten-4 textarea{caret-color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important;border-color:#fff59d!important}.yellow--text.text--lighten-3{color:#fff59d!important}.yellow--text.text--lighten-3 input,.yellow--text.text--lighten-3 textarea{caret-color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important;border-color:#fff176!important}.yellow--text.text--lighten-2{color:#fff176!important}.yellow--text.text--lighten-2 input,.yellow--text.text--lighten-2 textarea{caret-color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important;border-color:#ffee58!important}.yellow--text.text--lighten-1{color:#ffee58!important}.yellow--text.text--lighten-1 input,.yellow--text.text--lighten-1 textarea{caret-color:#ffee58!important}.yellow.darken-1{background-color:#fdd835!important;border-color:#fdd835!important}.yellow--text.text--darken-1{color:#fdd835!important}.yellow--text.text--darken-1 input,.yellow--text.text--darken-1 textarea{caret-color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important;border-color:#fbc02d!important}.yellow--text.text--darken-2{color:#fbc02d!important}.yellow--text.text--darken-2 input,.yellow--text.text--darken-2 textarea{caret-color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important;border-color:#f9a825!important}.yellow--text.text--darken-3{color:#f9a825!important}.yellow--text.text--darken-3 input,.yellow--text.text--darken-3 textarea{caret-color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important;border-color:#f57f17!important}.yellow--text.text--darken-4{color:#f57f17!important}.yellow--text.text--darken-4 input,.yellow--text.text--darken-4 textarea{caret-color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important;border-color:#ffff8d!important}.yellow--text.text--accent-1{color:#ffff8d!important}.yellow--text.text--accent-1 input,.yellow--text.text--accent-1 textarea{caret-color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important;border-color:#ff0!important}.yellow--text.text--accent-2{color:#ff0!important}.yellow--text.text--accent-2 input,.yellow--text.text--accent-2 textarea{caret-color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important;border-color:#ffea00!important}.yellow--text.text--accent-3{color:#ffea00!important}.yellow--text.text--accent-3 input,.yellow--text.text--accent-3 textarea{caret-color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important;border-color:#ffd600!important}.yellow--text.text--accent-4{color:#ffd600!important}.yellow--text.text--accent-4 input,.yellow--text.text--accent-4 textarea{caret-color:#ffd600!important}.amber{background-color:#ffc107!important;border-color:#ffc107!important}.amber--text{color:#ffc107!important}.amber--text input,.amber--text textarea{caret-color:#ffc107!important}.amber.lighten-5{background-color:#fff8e1!important;border-color:#fff8e1!important}.amber--text.text--lighten-5{color:#fff8e1!important}.amber--text.text--lighten-5 input,.amber--text.text--lighten-5 textarea{caret-color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important;border-color:#ffecb3!important}.amber--text.text--lighten-4{color:#ffecb3!important}.amber--text.text--lighten-4 input,.amber--text.text--lighten-4 textarea{caret-color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important;border-color:#ffe082!important}.amber--text.text--lighten-3{color:#ffe082!important}.amber--text.text--lighten-3 input,.amber--text.text--lighten-3 textarea{caret-color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important;border-color:#ffd54f!important}.amber--text.text--lighten-2{color:#ffd54f!important}.amber--text.text--lighten-2 input,.amber--text.text--lighten-2 textarea{caret-color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important;border-color:#ffca28!important}.amber--text.text--lighten-1{color:#ffca28!important}.amber--text.text--lighten-1 input,.amber--text.text--lighten-1 textarea{caret-color:#ffca28!important}.amber.darken-1{background-color:#ffb300!important;border-color:#ffb300!important}.amber--text.text--darken-1{color:#ffb300!important}.amber--text.text--darken-1 input,.amber--text.text--darken-1 textarea{caret-color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important;border-color:#ffa000!important}.amber--text.text--darken-2{color:#ffa000!important}.amber--text.text--darken-2 input,.amber--text.text--darken-2 textarea{caret-color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important;border-color:#ff8f00!important}.amber--text.text--darken-3{color:#ff8f00!important}.amber--text.text--darken-3 input,.amber--text.text--darken-3 textarea{caret-color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important;border-color:#ff6f00!important}.amber--text.text--darken-4{color:#ff6f00!important}.amber--text.text--darken-4 input,.amber--text.text--darken-4 textarea{caret-color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important;border-color:#ffe57f!important}.amber--text.text--accent-1{color:#ffe57f!important}.amber--text.text--accent-1 input,.amber--text.text--accent-1 textarea{caret-color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important;border-color:#ffd740!important}.amber--text.text--accent-2{color:#ffd740!important}.amber--text.text--accent-2 input,.amber--text.text--accent-2 textarea{caret-color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important;border-color:#ffc400!important}.amber--text.text--accent-3{color:#ffc400!important}.amber--text.text--accent-3 input,.amber--text.text--accent-3 textarea{caret-color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important;border-color:#ffab00!important}.amber--text.text--accent-4{color:#ffab00!important}.amber--text.text--accent-4 input,.amber--text.text--accent-4 textarea{caret-color:#ffab00!important}.orange{background-color:#ff9800!important;border-color:#ff9800!important}.orange--text{color:#ff9800!important}.orange--text input,.orange--text textarea{caret-color:#ff9800!important}.orange.lighten-5{background-color:#fff3e0!important;border-color:#fff3e0!important}.orange--text.text--lighten-5{color:#fff3e0!important}.orange--text.text--lighten-5 input,.orange--text.text--lighten-5 textarea{caret-color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important;border-color:#ffe0b2!important}.orange--text.text--lighten-4{color:#ffe0b2!important}.orange--text.text--lighten-4 input,.orange--text.text--lighten-4 textarea{caret-color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important;border-color:#ffcc80!important}.orange--text.text--lighten-3{color:#ffcc80!important}.orange--text.text--lighten-3 input,.orange--text.text--lighten-3 textarea{caret-color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important;border-color:#ffb74d!important}.orange--text.text--lighten-2{color:#ffb74d!important}.orange--text.text--lighten-2 input,.orange--text.text--lighten-2 textarea{caret-color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important;border-color:#ffa726!important}.orange--text.text--lighten-1{color:#ffa726!important}.orange--text.text--lighten-1 input,.orange--text.text--lighten-1 textarea{caret-color:#ffa726!important}.orange.darken-1{background-color:#fb8c00!important;border-color:#fb8c00!important}.orange--text.text--darken-1{color:#fb8c00!important}.orange--text.text--darken-1 input,.orange--text.text--darken-1 textarea{caret-color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important;border-color:#f57c00!important}.orange--text.text--darken-2{color:#f57c00!important}.orange--text.text--darken-2 input,.orange--text.text--darken-2 textarea{caret-color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important;border-color:#ef6c00!important}.orange--text.text--darken-3{color:#ef6c00!important}.orange--text.text--darken-3 input,.orange--text.text--darken-3 textarea{caret-color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important;border-color:#e65100!important}.orange--text.text--darken-4{color:#e65100!important}.orange--text.text--darken-4 input,.orange--text.text--darken-4 textarea{caret-color:#e65100!important}.orange.accent-1{background-color:#ffd180!important;border-color:#ffd180!important}.orange--text.text--accent-1{color:#ffd180!important}.orange--text.text--accent-1 input,.orange--text.text--accent-1 textarea{caret-color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important;border-color:#ffab40!important}.orange--text.text--accent-2{color:#ffab40!important}.orange--text.text--accent-2 input,.orange--text.text--accent-2 textarea{caret-color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important;border-color:#ff9100!important}.orange--text.text--accent-3{color:#ff9100!important}.orange--text.text--accent-3 input,.orange--text.text--accent-3 textarea{caret-color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important;border-color:#ff6d00!important}.orange--text.text--accent-4{color:#ff6d00!important}.orange--text.text--accent-4 input,.orange--text.text--accent-4 textarea{caret-color:#ff6d00!important}.deep-orange{background-color:#ff5722!important;border-color:#ff5722!important}.deep-orange--text{color:#ff5722!important}.deep-orange--text input,.deep-orange--text textarea{caret-color:#ff5722!important}.deep-orange.lighten-5{background-color:#fbe9e7!important;border-color:#fbe9e7!important}.deep-orange--text.text--lighten-5{color:#fbe9e7!important}.deep-orange--text.text--lighten-5 input,.deep-orange--text.text--lighten-5 textarea{caret-color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important;border-color:#ffccbc!important}.deep-orange--text.text--lighten-4{color:#ffccbc!important}.deep-orange--text.text--lighten-4 input,.deep-orange--text.text--lighten-4 textarea{caret-color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important;border-color:#ffab91!important}.deep-orange--text.text--lighten-3{color:#ffab91!important}.deep-orange--text.text--lighten-3 input,.deep-orange--text.text--lighten-3 textarea{caret-color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important;border-color:#ff8a65!important}.deep-orange--text.text--lighten-2{color:#ff8a65!important}.deep-orange--text.text--lighten-2 input,.deep-orange--text.text--lighten-2 textarea{caret-color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important;border-color:#ff7043!important}.deep-orange--text.text--lighten-1{color:#ff7043!important}.deep-orange--text.text--lighten-1 input,.deep-orange--text.text--lighten-1 textarea{caret-color:#ff7043!important}.deep-orange.darken-1{background-color:#f4511e!important;border-color:#f4511e!important}.deep-orange--text.text--darken-1{color:#f4511e!important}.deep-orange--text.text--darken-1 input,.deep-orange--text.text--darken-1 textarea{caret-color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important;border-color:#e64a19!important}.deep-orange--text.text--darken-2{color:#e64a19!important}.deep-orange--text.text--darken-2 input,.deep-orange--text.text--darken-2 textarea{caret-color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important;border-color:#d84315!important}.deep-orange--text.text--darken-3{color:#d84315!important}.deep-orange--text.text--darken-3 input,.deep-orange--text.text--darken-3 textarea{caret-color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important;border-color:#bf360c!important}.deep-orange--text.text--darken-4{color:#bf360c!important}.deep-orange--text.text--darken-4 input,.deep-orange--text.text--darken-4 textarea{caret-color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important;border-color:#ff9e80!important}.deep-orange--text.text--accent-1{color:#ff9e80!important}.deep-orange--text.text--accent-1 input,.deep-orange--text.text--accent-1 textarea{caret-color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important;border-color:#ff6e40!important}.deep-orange--text.text--accent-2{color:#ff6e40!important}.deep-orange--text.text--accent-2 input,.deep-orange--text.text--accent-2 textarea{caret-color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important;border-color:#ff3d00!important}.deep-orange--text.text--accent-3{color:#ff3d00!important}.deep-orange--text.text--accent-3 input,.deep-orange--text.text--accent-3 textarea{caret-color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important;border-color:#dd2c00!important}.deep-orange--text.text--accent-4{color:#dd2c00!important}.deep-orange--text.text--accent-4 input,.deep-orange--text.text--accent-4 textarea{caret-color:#dd2c00!important}.brown{background-color:#795548!important;border-color:#795548!important}.brown--text{color:#795548!important}.brown--text input,.brown--text textarea{caret-color:#795548!important}.brown.lighten-5{background-color:#efebe9!important;border-color:#efebe9!important}.brown--text.text--lighten-5{color:#efebe9!important}.brown--text.text--lighten-5 input,.brown--text.text--lighten-5 textarea{caret-color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important;border-color:#d7ccc8!important}.brown--text.text--lighten-4{color:#d7ccc8!important}.brown--text.text--lighten-4 input,.brown--text.text--lighten-4 textarea{caret-color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important;border-color:#bcaaa4!important}.brown--text.text--lighten-3{color:#bcaaa4!important}.brown--text.text--lighten-3 input,.brown--text.text--lighten-3 textarea{caret-color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important;border-color:#a1887f!important}.brown--text.text--lighten-2{color:#a1887f!important}.brown--text.text--lighten-2 input,.brown--text.text--lighten-2 textarea{caret-color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important;border-color:#8d6e63!important}.brown--text.text--lighten-1{color:#8d6e63!important}.brown--text.text--lighten-1 input,.brown--text.text--lighten-1 textarea{caret-color:#8d6e63!important}.brown.darken-1{background-color:#6d4c41!important;border-color:#6d4c41!important}.brown--text.text--darken-1{color:#6d4c41!important}.brown--text.text--darken-1 input,.brown--text.text--darken-1 textarea{caret-color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important;border-color:#5d4037!important}.brown--text.text--darken-2{color:#5d4037!important}.brown--text.text--darken-2 input,.brown--text.text--darken-2 textarea{caret-color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important;border-color:#4e342e!important}.brown--text.text--darken-3{color:#4e342e!important}.brown--text.text--darken-3 input,.brown--text.text--darken-3 textarea{caret-color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important;border-color:#3e2723!important}.brown--text.text--darken-4{color:#3e2723!important}.brown--text.text--darken-4 input,.brown--text.text--darken-4 textarea{caret-color:#3e2723!important}.blue-grey{background-color:#607d8b!important;border-color:#607d8b!important}.blue-grey--text{color:#607d8b!important}.blue-grey--text input,.blue-grey--text textarea{caret-color:#607d8b!important}.blue-grey.lighten-5{background-color:#eceff1!important;border-color:#eceff1!important}.blue-grey--text.text--lighten-5{color:#eceff1!important}.blue-grey--text.text--lighten-5 input,.blue-grey--text.text--lighten-5 textarea{caret-color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important;border-color:#cfd8dc!important}.blue-grey--text.text--lighten-4{color:#cfd8dc!important}.blue-grey--text.text--lighten-4 input,.blue-grey--text.text--lighten-4 textarea{caret-color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important;border-color:#b0bec5!important}.blue-grey--text.text--lighten-3{color:#b0bec5!important}.blue-grey--text.text--lighten-3 input,.blue-grey--text.text--lighten-3 textarea{caret-color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important;border-color:#90a4ae!important}.blue-grey--text.text--lighten-2{color:#90a4ae!important}.blue-grey--text.text--lighten-2 input,.blue-grey--text.text--lighten-2 textarea{caret-color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important;border-color:#78909c!important}.blue-grey--text.text--lighten-1{color:#78909c!important}.blue-grey--text.text--lighten-1 input,.blue-grey--text.text--lighten-1 textarea{caret-color:#78909c!important}.blue-grey.darken-1{background-color:#546e7a!important;border-color:#546e7a!important}.blue-grey--text.text--darken-1{color:#546e7a!important}.blue-grey--text.text--darken-1 input,.blue-grey--text.text--darken-1 textarea{caret-color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important;border-color:#455a64!important}.blue-grey--text.text--darken-2{color:#455a64!important}.blue-grey--text.text--darken-2 input,.blue-grey--text.text--darken-2 textarea{caret-color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important;border-color:#37474f!important}.blue-grey--text.text--darken-3{color:#37474f!important}.blue-grey--text.text--darken-3 input,.blue-grey--text.text--darken-3 textarea{caret-color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important;border-color:#263238!important}.blue-grey--text.text--darken-4{color:#263238!important}.blue-grey--text.text--darken-4 input,.blue-grey--text.text--darken-4 textarea{caret-color:#263238!important}.grey{background-color:#9e9e9e!important;border-color:#9e9e9e!important}.grey--text{color:#9e9e9e!important}.grey--text input,.grey--text textarea{caret-color:#9e9e9e!important}.grey.lighten-5{background-color:#fafafa!important;border-color:#fafafa!important}.grey--text.text--lighten-5{color:#fafafa!important}.grey--text.text--lighten-5 input,.grey--text.text--lighten-5 textarea{caret-color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important;border-color:#f5f5f5!important}.grey--text.text--lighten-4{color:#f5f5f5!important}.grey--text.text--lighten-4 input,.grey--text.text--lighten-4 textarea{caret-color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important;border-color:#eee!important}.grey--text.text--lighten-3{color:#eee!important}.grey--text.text--lighten-3 input,.grey--text.text--lighten-3 textarea{caret-color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important;border-color:#e0e0e0!important}.grey--text.text--lighten-2{color:#e0e0e0!important}.grey--text.text--lighten-2 input,.grey--text.text--lighten-2 textarea{caret-color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important;border-color:#bdbdbd!important}.grey--text.text--lighten-1{color:#bdbdbd!important}.grey--text.text--lighten-1 input,.grey--text.text--lighten-1 textarea{caret-color:#bdbdbd!important}.grey.darken-1{background-color:#757575!important;border-color:#757575!important}.grey--text.text--darken-1{color:#757575!important}.grey--text.text--darken-1 input,.grey--text.text--darken-1 textarea{caret-color:#757575!important}.grey.darken-2{background-color:#616161!important;border-color:#616161!important}.grey--text.text--darken-2{color:#616161!important}.grey--text.text--darken-2 input,.grey--text.text--darken-2 textarea{caret-color:#616161!important}.grey.darken-3{background-color:#424242!important;border-color:#424242!important}.grey--text.text--darken-3{color:#424242!important}.grey--text.text--darken-3 input,.grey--text.text--darken-3 textarea{caret-color:#424242!important}.grey.darken-4{background-color:#212121!important;border-color:#212121!important}.grey--text.text--darken-4{color:#212121!important}.grey--text.text--darken-4 input,.grey--text.text--darken-4 textarea{caret-color:#212121!important}.shades.black{background-color:#000!important;border-color:#000!important}.shades--text.text--black{color:#000!important}.shades--text.text--black input,.shades--text.text--black textarea{caret-color:#000!important}.shades.white{background-color:#fff!important;border-color:#fff!important}.shades--text.text--white{color:#fff!important}.shades--text.text--white input,.shades--text.text--white textarea{caret-color:#fff!important}.shades.transparent{background-color:transparent!important;border-color:transparent!important}.shades--text.text--transparent{color:transparent!important}.shades--text.text--transparent input,.shades--text.text--transparent textarea{caret-color:transparent!important}.elevation-0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)!important}.elevation-1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)!important}.elevation-2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important}.elevation-3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)!important}.elevation-4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)!important}.elevation-5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)!important}.elevation-6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)!important}.elevation-7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)!important}.elevation-8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)!important}.elevation-9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)!important}.elevation-10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)!important}.elevation-11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)!important}.elevation-12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important}.elevation-13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)!important}.elevation-14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)!important}.elevation-15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)!important}.elevation-16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)!important}.elevation-17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)!important}.elevation-18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)!important}.elevation-19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)!important}.elevation-20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)!important}.elevation-21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)!important}.elevation-22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)!important}.elevation-23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)!important}.elevation-24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)!important}html{box-sizing:border-box;overflow-y:scroll;-webkit-text-size-adjust:100%}*,:after,:before{box-sizing:inherit}:after,:before{text-decoration:inherit;vertical-align:inherit}*{background-repeat:no-repeat;padding:0;margin:0}audio:not([controls]){display:none;height:0}hr{overflow:visible}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}summary{display:list-item}small{font-size:80%}[hidden],template{display:none}abbr[title]{border-bottom:1px dotted;text-decoration:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}code,kbd,pre,samp{font-family:monospace,monospace}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background-color:#ff0;color:#000}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}input{border-radius:0}[role=button],[type=button],[type=reset],[type=submit],button{cursor:pointer}[disabled]{cursor:default}[type=number]{width:auto}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}textarea{overflow:auto;resize:vertical}button,input,optgroup,select,textarea{font:inherit}optgroup{font-weight:700}button{overflow:visible}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:0;padding:0}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button:-moz-focusring{outline:0;border:0}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}button,select{text-transform:none}button,input,select,textarea{background-color:transparent;border-style:none;color:inherit}select{-moz-appearance:none;-webkit-appearance:none}select::-ms-expand{display:none}select::-ms-value{color:currentColor}legend{border:0;color:inherit;display:table;max-width:100%;white-space:normal}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}img{border-style:none}progress{vertical-align:baseline}svg:not(:root){overflow:hidden}audio,canvas,progress,video{display:inline-block}[aria-busy=true]{cursor:progress}[aria-controls]{cursor:pointer}[aria-disabled]{cursor:default}::-moz-selection{background-color:#b3d4fc;color:#000;text-shadow:none}::selection{background-color:#b3d4fc;color:#000;text-shadow:none}.bottom-sheet-transition-enter,.bottom-sheet-transition-leave-to{transform:translateY(100%)}.carousel-transition-enter{transform:translate(100%)}.carousel-transition-leave,.carousel-transition-leave-to{position:absolute;top:0;transform:translate(-100%)}.carousel-reverse-transition-enter{transform:translate(-100%)}.carousel-reverse-transition-leave,.carousel-reverse-transition-leave-to{position:absolute;top:0;transform:translate(100%)}.dialog-transition-enter,.dialog-transition-leave-to{transform:scale(.5);opacity:0}.dialog-transition-enter-to,.dialog-transition-leave{opacity:1}.dialog-bottom-transition-enter,.dialog-bottom-transition-leave-to{transform:translateY(100%)}.picker-reverse-transition-enter-active,.picker-reverse-transition-leave-active,.picker-transition-enter-active,.picker-transition-leave-active{transition:.3s cubic-bezier(0,0,.2,1)}.picker-reverse-transition-enter,.picker-reverse-transition-leave-to,.picker-transition-enter,.picker-transition-leave-to{opacity:0}.picker-reverse-transition-enter-to,.picker-transition-enter-to{transtion:translate(0,0)}.picker-reverse-transition-leave,.picker-reverse-transition-leave-active,.picker-reverse-transition-leave-to,.picker-transition-leave,.picker-transition-leave-active,.picker-transition-leave-to{position:absolute!important}.picker-transition-enter{transform:translateY(100%)}.picker-reverse-transition-enter,.picker-transition-leave-to{transform:translateY(-100%)}.picker-reverse-transition-leave-to{transform:translateY(100%)}.picker-title-transition-enter-to,.picker-title-transition-leave{transform:translate(0)}.picker-title-transition-enter{transform:translate(-100%)}.picker-title-transition-leave-to{opacity:0;transform:translate(100%)}.picker-title-transition-leave,.picker-title-transition-leave-active,.picker-title-transition-leave-to{position:absolute!important}.tab-transition-enter{transform:translate(100%)}.tab-transition-leave,.tab-transition-leave-active{position:absolute;top:0}.tab-transition-leave-to{position:absolute}.tab-reverse-transition-enter,.tab-transition-leave-to{transform:translate(-100%)}.tab-reverse-transition-leave,.tab-reverse-transition-leave-to{top:0;position:absolute;transform:translate(100%)}.scale-transition-enter-active,.scale-transition-leave-active{transition:.2s cubic-bezier(.4,0,.6,1)}.scale-transition-enter,.scale-transition-leave,.scale-transition-leave-to{opacity:0;transform:scale(0)}.message-transition-enter-active,.message-transition-leave-active{transition:.3s cubic-bezier(.25,.8,.5,1)}.message-transition-enter,.message-transition-leave-to{opacity:0;transform:translateY(-15px)}.message-transition-leave,.message-transition-leave-active{position:absolute}.slide-y-transition-enter-active,.slide-y-transition-leave-active{transition:.3s cubic-bezier(.25,.8,.5,1)}.slide-y-transition-enter,.slide-y-transition-leave-to{opacity:0;transform:translateY(-15px)}.slide-y-reverse-transition-enter-active,.slide-y-reverse-transition-leave-active{transition:.3s cubic-bezier(.25,.8,.5,1)}.slide-y-reverse-transition-enter,.slide-y-reverse-transition-leave-to{opacity:0;transform:translateY(15px)}.slide-x-transition-enter-active,.slide-x-transition-leave-active{transition:.3s cubic-bezier(.25,.8,.5,1)}.slide-x-transition-enter,.slide-x-transition-leave-to{opacity:0;transform:translateX(-15px)}.slide-x-reverse-transition-enter-active,.slide-x-reverse-transition-leave-active{transition:.3s cubic-bezier(.25,.8,.5,1)}.slide-x-reverse-transition-enter,.slide-x-reverse-transition-leave-to{opacity:0;transform:translateX(15px)}.fade-transition-enter-active,.fade-transition-leave-active{transition:.3s cubic-bezier(.25,.8,.5,1)}.fade-transition-enter,.fade-transition-leave-to{opacity:0}.fab-transition-enter-active,.fab-transition-leave-active{transition:.3s cubic-bezier(.25,.8,.5,1)}.fab-transition-enter,.fab-transition-leave-to{transform:scale(0) rotate(-45deg)}.blockquote{padding:16px 0 16px 24px;font-size:18px;font-weight:300}code,kbd{display:inline-block;border-radius:3px;white-space:pre-wrap;font-size:85%;font-weight:900}code:after,code:before,kbd:after,kbd:before{content:\"\\A0\";letter-spacing:-1px}code{background-color:#f5f5f5;color:#bd4147;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}kbd{background:#424242;color:#fff}html{font-size:14px;overflow-x:hidden;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:rgba(0,0,0,0)}.application{font-family:Roboto,sans-serif;line-height:1.5}::-ms-clear,::-ms-reveal{display:none}ol,ul{padding-left:24px}.display-4{font-size:112px!important;font-weight:300;line-height:1!important;letter-spacing:-.04em!important;font-family:Roboto,sans-serif!important}.display-3{font-size:56px!important;line-height:1.35!important;letter-spacing:-.02em!important}.display-2,.display-3{font-weight:400;font-family:Roboto,sans-serif!important}.display-2{font-size:45px!important;line-height:48px!important;letter-spacing:normal!important}.display-1{font-size:34px!important;line-height:40px!important}.display-1,.headline{font-weight:400;letter-spacing:normal!important;font-family:Roboto,sans-serif!important}.headline{font-size:24px!important;line-height:32px!important}.title{font-size:20px!important;font-weight:500;line-height:1!important;letter-spacing:.02em!important;font-family:Roboto,sans-serif!important}.subheading{font-size:16px!important;font-weight:400}.body-2{font-weight:500}.body-1,.body-2{font-size:14px!important}.body-1,.caption{font-weight:400}.caption{font-size:12px!important}p{margin-bottom:16px}.overflow-hidden{overflow:hidden}.overflow-x-hidden{overflow-x:hidden}.overflow-y-hidden{overflow-y:hidden}.right{float:right!important}.left{float:left!important}.mx-auto{margin-left:auto!important;margin-right:auto!important}.ma-0{margin:0!important}.my-0{margin-top:0!important;margin-bottom:0!important}.mx-0{margin-left:0!important;margin-right:0!important}.mt-0{margin-top:0!important}.mr-0{margin-right:0!important}.mb-0{margin-bottom:0!important}.ml-0{margin-left:0!important}.pa-0{padding:0!important}.py-0{padding-top:0!important;padding-bottom:0!important}.px-0{padding-left:0!important;padding-right:0!important}.pt-0{padding-top:0!important}.pr-0{padding-right:0!important}.pb-0{padding-bottom:0!important}.pl-0{padding-left:0!important}.ma-1{margin:4px!important}.my-1{margin-top:4px!important;margin-bottom:4px!important}.mx-1{margin-left:4px!important;margin-right:4px!important}.mt-1{margin-top:4px!important}.mr-1{margin-right:4px!important}.mb-1{margin-bottom:4px!important}.ml-1{margin-left:4px!important}.pa-1{padding:4px!important}.py-1{padding-top:4px!important;padding-bottom:4px!important}.px-1{padding-left:4px!important;padding-right:4px!important}.pt-1{padding-top:4px!important}.pr-1{padding-right:4px!important}.pb-1{padding-bottom:4px!important}.pl-1{padding-left:4px!important}.ma-2{margin:8px!important}.my-2{margin-top:8px!important;margin-bottom:8px!important}.mx-2{margin-left:8px!important;margin-right:8px!important}.mt-2{margin-top:8px!important}.mr-2{margin-right:8px!important}.mb-2{margin-bottom:8px!important}.ml-2{margin-left:8px!important}.pa-2{padding:8px!important}.py-2{padding-top:8px!important;padding-bottom:8px!important}.px-2{padding-left:8px!important;padding-right:8px!important}.pt-2{padding-top:8px!important}.pr-2{padding-right:8px!important}.pb-2{padding-bottom:8px!important}.pl-2{padding-left:8px!important}.ma-3{margin:16px!important}.my-3{margin-top:16px!important;margin-bottom:16px!important}.mx-3{margin-left:16px!important;margin-right:16px!important}.mt-3{margin-top:16px!important}.mr-3{margin-right:16px!important}.mb-3{margin-bottom:16px!important}.ml-3{margin-left:16px!important}.pa-3{padding:16px!important}.py-3{padding-top:16px!important;padding-bottom:16px!important}.px-3{padding-left:16px!important;padding-right:16px!important}.pt-3{padding-top:16px!important}.pr-3{padding-right:16px!important}.pb-3{padding-bottom:16px!important}.pl-3{padding-left:16px!important}.ma-4{margin:24px!important}.my-4{margin-top:24px!important;margin-bottom:24px!important}.mx-4{margin-left:24px!important;margin-right:24px!important}.mt-4{margin-top:24px!important}.mr-4{margin-right:24px!important}.mb-4{margin-bottom:24px!important}.ml-4{margin-left:24px!important}.pa-4{padding:24px!important}.py-4{padding-top:24px!important;padding-bottom:24px!important}.px-4{padding-left:24px!important;padding-right:24px!important}.pt-4{padding-top:24px!important}.pr-4{padding-right:24px!important}.pb-4{padding-bottom:24px!important}.pl-4{padding-left:24px!important}.ma-5{margin:48px!important}.my-5{margin-top:48px!important;margin-bottom:48px!important}.mx-5{margin-left:48px!important;margin-right:48px!important}.mt-5{margin-top:48px!important}.mr-5{margin-right:48px!important}.mb-5{margin-bottom:48px!important}.ml-5{margin-left:48px!important}.pa-5{padding:48px!important}.py-5{padding-top:48px!important;padding-bottom:48px!important}.px-5{padding-left:48px!important;padding-right:48px!important}.pt-5{padding-top:48px!important}.pr-5{padding-right:48px!important}.pb-5{padding-bottom:48px!important}.pl-5{padding-left:48px!important}.font-weight-thin{font-weight:100!important}.font-weight-light{font-weight:300!important}.font-weight-regular{font-weight:400!important}.font-weight-medium{font-weight:500!important}.font-weight-bold{font-weight:700!important}.font-weight-black{font-weight:900!important}.font-italic{font-style:italic!important}.text-capitalize{text-transform:capitalize!important}.text-lowercase{text-transform:lowercase!important}.text-uppercase{text-transform:uppercase!important}.text-no-wrap,.text-truncate{white-space:nowrap!important}.text-truncate{overflow:hidden!important;text-overflow:ellipsis!important}@media screen{[hidden~=screen]{display:inherit}[hidden~=screen]:not(:active):not(:focus):not(:target){position:absolute!important;clip:rect(0 0 0 0)!important}}@media only screen and (max-width:599px){.hidden-xs-only{display:none!important}}@media only screen and (min-width:600px) and (max-width:959px){.hidden-sm-only{display:none!important}}@media only screen and (max-width:959px){.hidden-sm-and-down{display:none!important}}@media only screen and (min-width:600px){.hidden-sm-and-up{display:none!important}}@media only screen and (min-width:960px) and (max-width:1263px){.hidden-md-only{display:none!important}}@media only screen and (max-width:1263px){.hidden-md-and-down{display:none!important}}@media only screen and (min-width:960px){.hidden-md-and-up{display:none!important}}@media only screen and (min-width:1264px) and (max-width:1903px){.hidden-lg-only{display:none!important}}@media only screen and (max-width:1903px){.hidden-lg-and-down{display:none!important}}@media only screen and (min-width:1264px){.hidden-lg-and-up{display:none!important}}@media only screen and (min-width:1904px){.hidden-xl-only{display:none!important}}@media (min-width:0){.text-xs-left{text-align:left!important}.text-xs-center{text-align:center!important}.text-xs-right{text-align:right!important}.text-xs-justify{text-align:justify!important}}@media (min-width:600px){.text-sm-left{text-align:left!important}.text-sm-center{text-align:center!important}.text-sm-right{text-align:right!important}.text-sm-justify{text-align:justify!important}}@media (min-width:960px){.text-md-left{text-align:left!important}.text-md-center{text-align:center!important}.text-md-right{text-align:right!important}.text-md-justify{text-align:justify!important}}@media (min-width:1264px){.text-lg-left{text-align:left!important}.text-lg-center{text-align:center!important}.text-lg-right{text-align:right!important}.text-lg-justify{text-align:justify!important}}@media (min-width:1904px){.text-xl-left{text-align:left!important}.text-xl-center{text-align:center!important}.text-xl-right{text-align:right!important}.text-xl-justify{text-align:justify!important}}.application{display:flex}.application--is-rtl{direction:rtl}.application--wrap{flex:1 1 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;display:flex;flex-direction:column;min-height:100vh;max-width:100%;position:relative}.application.theme--light{background:#fafafa;color:rgba(0,0,0,.87)}.application.theme--light a{cursor:pointer}.application.theme--light .text--primary{color:rgba(0,0,0,.87)!important}.application.theme--light .text--secondary{color:rgba(0,0,0,.54)!important}.application.theme--light .text--disabled{color:rgba(0,0,0,.38)!important}.application.theme--dark{background:#303030;color:#fff}.application.theme--dark a{cursor:pointer}.application.theme--dark .text--primary{color:#fff!important}.application.theme--dark .text--secondary{color:hsla(0,0%,100%,.7)!important}.application.theme--dark .text--disabled{color:hsla(0,0%,100%,.5)!important}@media print{@-moz-document url-prefix(){.application,.application--wrap{display:block}}}.v-alert{border-radius:0;border-width:4px 0 0;border-style:solid;color:#fff;display:flex;font-size:14px;margin:4px auto;padding:16px;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-alert .v-alert__icon.v-icon,.v-alert__dismissible .v-icon{align-self:center;color:rgba(0,0,0,.3);font-size:24px}.v-alert--outline .v-icon{color:inherit!important}.v-alert__icon{margin-right:16px}.v-alert__dismissible{align-self:flex-start;color:inherit;margin-left:16px;margin-right:0;text-decoration:none;transition:.3s cubic-bezier(.25,.8,.5,1);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-alert__dismissible:hover{opacity:.8}.v-alert--no-icon .v-alert__icon{display:none}.v-alert>div{align-self:center;flex:1 1}.v-alert.v-alert{border-color:rgba(0,0,0,.12)!important}.v-alert.v-alert--outline{border:1px solid currentColor!important}@media screen and (max-width:600px){.v-alert__icon{display:none}}.application .theme--light.v-icon,.theme--light .v-icon{color:rgba(0,0,0,.54)}.application .theme--light.v-icon.v-icon--disabled,.theme--light .v-icon.v-icon--disabled{color:rgba(0,0,0,.38)!important}.application .theme--dark.v-icon,.theme--dark .v-icon{color:#fff}.application .theme--dark.v-icon.v-icon--disabled,.theme--dark .v-icon.v-icon--disabled{color:hsla(0,0%,100%,.5)!important}.v-icon{align-items:center;display:inline-flex;-webkit-font-feature-settings:\"liga\";font-feature-settings:\"liga\";font-size:24px;justify-content:center;line-height:1;transition:.3s cubic-bezier(.25,.8,.5,1);vertical-align:text-bottom}.v-icon.v-icon.v-icon--link{cursor:pointer}.v-icon.v-icon--large{font-size:2.5rem}.v-icon.v-icon--medium{font-size:2rem}.v-icon.v-icon--x-large{font-size:3rem}.v-icon.v-icon--disabled{pointer-events:none}.v-autocomplete.v-input,.v-autocomplete .v-menu__activator,.v-autocomplete .v-menu__activator *{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo) .v-select__slot>input{margin-top:24px}.v-autocomplete:not(.v-input--is-disabled).v-select.v-text-field input{pointer-events:auto}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}.application .theme--light.v-text-field .v-input__slot:before,.theme--light .v-text-field .v-input__slot:before{border-color:rgba(0,0,0,.42)}.application .theme--light.v-text-field:not(.v-input--has-state) .v-input__slot:hover:before,.theme--light .v-text-field:not(.v-input--has-state) .v-input__slot:hover:before{border-color:rgba(0,0,0,.87)}.application .theme--light.v-text-field.v-input--is-disabled .v-input__slot:before,.theme--light .v-text-field.v-input--is-disabled .v-input__slot:before{border-image:repeating-linear-gradient(90deg,rgba(0,0,0,.38) 0,rgba(0,0,0,.38) 2px,transparent 0,transparent 4px) 1 repeat}.application .theme--light.v-text-field__prefix,.application .theme--light.v-text-field__suffix,.theme--light .v-text-field__prefix,.theme--light .v-text-field__suffix{color:rgba(0,0,0,.54)}.application .theme--light.v-text-field--solo .v-input__slot,.theme--light .v-text-field--solo .v-input__slot{border-radius:2px;background:#fff}.application .theme--light.v-text-field--solo-inverted.v-text-field--solo .v-input__slot,.theme--light .v-text-field--solo-inverted.v-text-field--solo .v-input__slot{background:rgba(0,0,0,.16)}.application .theme--light.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot,.theme--light .v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot{background:#424242}.application .theme--light.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot .v-label,.application .theme--light.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot input,.theme--light .v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot .v-label,.theme--light .v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot input{color:#fff}.application .theme--light.v-text-field--box .v-input__slot,.theme--light .v-text-field--box .v-input__slot{background:rgba(0,0,0,.06)}.application .theme--light.v-text-field--box:not(.v-input--is-focused) .v-input__slot:hover,.theme--light .v-text-field--box:not(.v-input--is-focused) .v-input__slot:hover{background:rgba(0,0,0,.12)}.application .theme--light.v-text-field--outline .v-input__slot,.theme--light .v-text-field--outline .v-input__slot{border:2px solid rgba(0,0,0,.54)}.application .theme--light.v-text-field--outline:not(.v-input--is-focused) .v-input__slot:hover,.theme--light .v-text-field--outline:not(.v-input--is-focused) .v-input__slot:hover{border:2px solid rgba(0,0,0,.87)}.application .theme--dark.v-text-field .v-input__slot:before,.theme--dark .v-text-field .v-input__slot:before{border-color:hsla(0,0%,100%,.7)}.application .theme--dark.v-text-field:not(.v-input--has-state) .v-input__slot:hover:before,.theme--dark .v-text-field:not(.v-input--has-state) .v-input__slot:hover:before{border-color:#fff}.application .theme--dark.v-text-field.v-input--is-disabled .v-input__slot:before,.theme--dark .v-text-field.v-input--is-disabled .v-input__slot:before{border-image:repeating-linear-gradient(90deg,hsla(0,0%,100%,.5) 0,hsla(0,0%,100%,.5) 2px,transparent 0,transparent 4px) 1 repeat}.application .theme--dark.v-text-field__prefix,.application .theme--dark.v-text-field__suffix,.theme--dark .v-text-field__prefix,.theme--dark .v-text-field__suffix{color:hsla(0,0%,100%,.7)}.application .theme--dark.v-text-field--solo .v-input__slot,.theme--dark .v-text-field--solo .v-input__slot{border-radius:2px;background:#424242}.application .theme--dark.v-text-field--solo-inverted.v-text-field--solo .v-input__slot,.theme--dark .v-text-field--solo-inverted.v-text-field--solo .v-input__slot{background:hsla(0,0%,100%,.16)}.application .theme--dark.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot,.theme--dark .v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot{background:#fff}.application .theme--dark.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot .v-label,.application .theme--dark.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot input,.theme--dark .v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot .v-label,.theme--dark .v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused .v-input__slot input{color:rgba(0,0,0,.87)}.application .theme--dark.v-text-field--box .v-input__slot,.theme--dark .v-text-field--box .v-input__slot{background:rgba(0,0,0,.1)}.application .theme--dark.v-text-field--box:not(.v-input--is-focused) .v-input__slot:hover,.theme--dark .v-text-field--box:not(.v-input--is-focused) .v-input__slot:hover{background:rgba(0,0,0,.2)}.application .theme--dark.v-text-field--outline .v-input__slot,.theme--dark .v-text-field--outline .v-input__slot{border:2px solid hsla(0,0%,100%,.7)}.application .theme--dark.v-text-field--outline:not(.v-input--is-focused) .v-input__slot:hover,.theme--dark .v-text-field--outline:not(.v-input--is-focused) .v-input__slot:hover{border:2px solid #fff}.application--is-rtl .v-text-field .v-label{transform-origin:top right}.application--is-rtl .v-text-field .v-counter{margin-left:0;margin-right:8px}.application--is-rtl .v-text-field--enclosed .v-input__append-outer{margin-left:0;margin-right:16px}.application--is-rtl .v-text-field--enclosed .v-input__prepend-outer{margin-left:16px;margin-right:0}.application--is-rtl .v-text-field--reverse input{text-align:left}.application--is-rtl .v-text-field--reverse .v-label{transform-origin:top left}.application--is-rtl .v-text-field__prefix{text-align:left;padding-right:0;padding-left:4px}.application--is-rtl .v-text-field__suffix{padding-left:0;padding-right:4px}.application--is-rtl .v-text-field--reverse .v-text-field__prefix{text-align:right;padding-left:0;padding-right:4px}.application--is-rtl .v-text-field--reverse .v-text-field__suffix{padding-left:0;padding-right:4px}.v-text-field input{flex:1 1 auto;line-height:20px;padding:8px 0;max-width:100%;width:100%}.v-text-field .v-input__append-inner,.v-text-field .v-input__prepend-inner{align-self:flex-start;display:inline-flex;margin-top:4px;line-height:1;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-text-field .v-input__prepend-inner{margin-right:auto;padding-right:4px}.v-text-field .v-input__append-inner{margin-left:auto;padding-left:4px}.v-text-field .v-counter{margin-left:8px;white-space:nowrap}.v-text-field .v-label{max-width:90%;overflow:hidden;text-overflow:ellipsis;top:6px;transform-origin:top left;white-space:nowrap;pointer-events:none}.v-text-field .v-label--active{max-width:100%;transform:translateY(-18px) scale(.75)}.v-text-field .v-input__slot{transition:background .3s cubic-bezier(.25,.8,.5,1)}.v-text-field .v-input__slot:after,.v-text-field .v-input__slot:before{bottom:-1px;content:\"\";left:0;position:absolute;transition:.3s cubic-bezier(.25,.8,.5,1);width:100%}.v-text-field .v-input__slot:before{border-style:solid;border-width:thin 0 0}.v-text-field .v-input__slot:after{border-color:currentColor;border-style:solid;border-width:thin 0;transform:scaleX(0)}.v-text-field__details{display:flex;flex:1 0 auto;max-width:100%;overflow:hidden}.v-text-field__prefix,.v-text-field__suffix{align-self:center;cursor:default}.v-text-field__prefix{width:16px;text-align:right;padding-right:4px}.v-text-field__suffix{padding-left:4px;white-space:nowrap}.v-text-field--reverse .v-text-field__prefix{text-align:left;padding-right:0;padding-left:4px}.v-text-field--reverse .v-text-field__suffix{padding-left:0;padding-right:4px}.v-text-field__slot{display:flex;flex:1 1 auto;height:100%;position:relative}.v-text-field--box,.v-text-field--outline{position:relative}.v-text-field--box .v-input__slot,.v-text-field--outline .v-input__slot{align-items:stretch}.v-text-field--box input,.v-text-field--outline input{margin-top:22px}.v-text-field--box.v-text-field--single-line input,.v-text-field--outline.v-text-field--single-line input{margin-top:12px}.v-text-field--box .v-label,.v-text-field--outline .v-label{top:18px}.v-text-field--box .v-label--active,.v-text-field--outline .v-label--active{transform:translateY(-6px) scale(.75)}.v-text-field--box .v-input__slot,.v-text-field--outline .v-input__slot{min-height:56px}.v-text-field--box .v-input__slot{border-top-left-radius:4px;border-top-right-radius:4px}.v-text-field--box .v-input__slot:before{border-style:solid;border-width:thin 0}.v-text-field.v-text-field--enclosed{margin:0}.v-text-field.v-text-field--enclosed:not(.v-text-field--box) .v-progress-linear__background{display:none}.v-text-field.v-text-field--enclosed .v-input__append-inner,.v-text-field.v-text-field--enclosed .v-input__append-outer,.v-text-field.v-text-field--enclosed .v-input__prepend-inner,.v-text-field.v-text-field--enclosed .v-input__prepend-outer{margin-top:16px}.v-text-field.v-text-field--enclosed .v-input__slot,.v-text-field.v-text-field--enclosed .v-text-field__details{padding:0 12px}.v-text-field.v-text-field--enclosed .v-text-field__details{margin-bottom:8px}.v-text-field.v-text-field--full-width.v-input{margin-bottom:0;margin-top:0}.v-text-field.v-text-field--full-width .v-label{top:calc(50% - 10px)}.v-text-field.v-text-field--full-width .v-input__control{padding:12px 0}.v-text-field.v-text-field--full-width .v-input__append-outer,.v-text-field.v-text-field--full-width .v-input__prepend-outer{margin-top:4px}.v-text-field.v-text-field--full-width .v-input__append-inner{align-self:center;margin-top:0}.v-text-field--reverse input{text-align:right}.v-text-field--reverse .v-label{transform-origin:top right}.v-text-field--reverse .v-input__slot,.v-text-field--reverse .v-text-field__slot{flex-direction:row-reverse}.v-text-field--full-width .v-input__slot:after,.v-text-field--full-width .v-input__slot:before,.v-text-field--outline .v-input__slot:after,.v-text-field--outline .v-input__slot:before,.v-text-field--solo .v-input__slot:after,.v-text-field--solo .v-input__slot:before{display:none}.v-text-field--outline{margin-bottom:16px;transition:border .3s cubic-bezier(.25,.8,.5,1)}.v-text-field--outline .v-input__slot{background:transparent!important;border-radius:4px}.v-text-field--outline .v-input__append-outer,.v-text-field--outline .v-input__prepend-outer{margin-top:18px}.v-text-field--outline.v-input--is-focused .v-input__slot{border:2px solid currentColor;transition:border .3s cubic-bezier(.25,.8,.5,1)}.v-text-field.v-text-field--solo .v-label{top:calc(50% - 10px)}.v-text-field.v-text-field--solo .v-input__control{min-height:48px;padding:0}.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) .v-input__slot{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-text-field.v-text-field--solo .v-text-field__slot{align-items:center}.v-text-field.v-text-field--solo .v-input__append-inner,.v-text-field.v-text-field--solo .v-input__prepend-inner{align-self:center;margin-top:0}.v-text-field.v-text-field--solo .v-input__append-outer,.v-text-field.v-text-field--solo .v-input__prepend-outer{margin-top:12px}.v-text-field.v-input--is-focused .v-input__slot:after{transform:scaleX(1)}.v-text-field.v-input--has-state .v-input__slot:before{border-color:currentColor}.application .theme--light.v-select__selections,.theme--light .v-select__selections{color:rgba(0,0,0,.87)}.application .theme--light.v-select .v-chip--disabled,.application .theme--light.v-select.v-input--is-disabled .v-select__selections,.application .theme--light.v-select .v-select__selection--disabled,.theme--light .v-select .v-chip--disabled,.theme--light .v-select.v-input--is-disabled .v-select__selections,.theme--light .v-select .v-select__selection--disabled{color:rgba(0,0,0,.38)}.application .theme--dark.v-select__selections,.application .theme--light.v-select.v-text-field--solo-inverted.v-input--is-focused .v-select__selections,.theme--dark .v-select__selections,.theme--light .v-select.v-text-field--solo-inverted.v-input--is-focused .v-select__selections{color:#fff}.application .theme--dark.v-select .v-chip--disabled,.application .theme--dark.v-select.v-input--is-disabled .v-select__selections,.application .theme--dark.v-select .v-select__selection--disabled,.theme--dark .v-select .v-chip--disabled,.theme--dark .v-select.v-input--is-disabled .v-select__selections,.theme--dark .v-select .v-select__selection--disabled{color:hsla(0,0%,100%,.5)}.application .theme--dark.v-select.v-text-field--solo-inverted.v-input--is-focused .v-select__selections,.theme--dark .v-select.v-text-field--solo-inverted.v-input--is-focused .v-select__selections{color:rgba(0,0,0,.87)}.v-select{cursor:pointer;position:relative}.v-select .v-menu{flex:1 1 auto;width:100%}.v-select .v-chip{flex:0 1 auto}.v-select .fade-transition-leave-active{position:absolute;left:0}.v-select.v-input--is-dirty ::-webkit-input-placeholder{color:transparent!important}.v-select.v-input--is-dirty :-ms-input-placeholder,.v-select.v-input--is-dirty ::-ms-input-placeholder{color:transparent!important}.v-select.v-input--is-dirty ::placeholder{color:transparent!important}.v-select.v-text-field--enclosed:not(.v-text-field--single-line) .v-select__selections{padding-top:24px}.v-select.v-text-field input{flex:1 1;margin-top:0;min-width:0;pointer-events:none;position:relative}.v-select.v-select--is-menu-active .v-input__icon--append .v-icon{transform:rotate(180deg)}.v-select.v-select--chips input{margin:0}.v-select.v-select--chips .v-select__selections{min-height:42px}.v-select.v-select--chips.v-select--chips--small .v-select__selections{min-height:32px}.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box .v-select__selections,.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed .v-select__selections{min-height:68px}.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--box.v-select--chips--small .v-select__selections,.v-select.v-select--chips:not(.v-text-field--single-line).v-text-field--enclosed.v-select--chips--small .v-select__selections{min-height:56px}.v-select.v-text-field--reverse .v-select__selections,.v-select.v-text-field--reverse .v-select__slot{flex-direction:row-reverse}.v-select__selections{align-items:center;display:flex;flex:1 1 auto;flex-wrap:wrap;line-height:18px}.v-select__selection{max-width:90%}.v-select__selection--comma{align-items:center;display:inline-flex;margin:7px 4px 7px 0}.v-select__slot{align-items:center;display:flex;height:100%;width:100%}.v-select:not(.v-text-field--single-line) .v-select__slot>input{align-self:flex-end}.application .theme--light.v-chip,.theme--light .v-chip{background:#e0e0e0;color:rgba(0,0,0,.87)}.application .theme--light.v-chip--disabled,.theme--light .v-chip--disabled{color:rgba(0,0,0,.38)}.application .theme--dark.v-chip,.theme--dark .v-chip{background:#fff;color:rgba(0,0,0,.87)}.application .theme--dark.v-chip--disabled,.theme--dark .v-chip--disabled{color:hsla(0,0%,100%,.5)}.v-chip{border-radius:28px;border:1px solid transparent;font-size:13px;margin:4px;outline:none;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-chip,.v-chip .v-chip__content{align-items:center;display:inline-flex;vertical-align:middle}.v-chip .v-chip__content{border-radius:28px;cursor:default;height:32px;justify-content:space-between;padding:0 12px;white-space:nowrap;z-index:1}.v-chip--removable .v-chip__content{padding:0 4px 0 12px}.v-chip .v-avatar{height:32px!important;margin-left:-12px;margin-right:8px;min-width:32px;width:32px!important}.v-chip .v-avatar img{height:100%;width:100%}.v-chip--active,.v-chip--selected,.v-chip:focus:not(.v-chip--disabled){border-color:rgba(0,0,0,.13);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-chip--active:after,.v-chip--selected:after,.v-chip:focus:not(.v-chip--disabled):after{background:currentColor;border-radius:inherit;content:\"\";height:100%;position:absolute;top:0;left:0;transition:inherit;width:100%;pointer-events:none;opacity:.13}.v-chip--label,.v-chip--label .v-chip__content{border-radius:2px}.v-chip.v-chip.v-chip--outline{background:transparent!important;border-color:currentColor;color:#9e9e9e}.v-chip--small{height:24px}.v-chip--small .v-avatar{height:24px;min-width:24px;width:24px}.v-chip--small .v-icon{font-size:20px}.v-chip__close{align-items:center;color:inherit;display:flex;font-size:20px;margin:0 2px 0 8px;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-chip__close>.v-icon{color:inherit!important;font-size:20px;cursor:pointer;opacity:.5}.v-chip__close>.v-icon:hover{opacity:1}.v-chip--disabled .v-chip__close{pointer-events:none}.v-chip--select-multi{margin:4px 4px 4px 0}.v-chip .v-icon{color:inherit}.v-chip .v-icon--right{margin-left:12px;margin-right:-8px}.v-chip .v-icon--left{margin-left:-8px;margin-right:12px}.v-menu{display:block;position:relative;vertical-align:middle}.v-menu--inline{display:inline-block}.v-menu__activator{align-items:center;cursor:pointer;display:flex;height:100%;position:relative}.v-menu__activator *{cursor:pointer}.v-menu__activator--disabled{pointer-events:none}.v-menu__content{position:absolute;display:inline-block;border-radius:2px;max-width:80%;overflow-y:auto;overflow-x:hidden;contain:content;will-change:transform;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-menu__content--active{pointer-events:none}.v-menu__content>.card{contain:content;-webkit-backface-visibility:hidden;backface-visibility:hidden}.v-menu>.v-menu__content{max-width:none}.v-menu-transition-enter .v-list__tile{min-width:0;pointer-events:none}.v-menu-transition-enter-to .v-list__tile{pointer-events:auto;transition-delay:.1s}.v-menu-transition-leave-active,.v-menu-transition-leave-to{pointer-events:none}.v-menu-transition-enter,.v-menu-transition-leave-to{opacity:0}.v-menu-transition-enter-active,.v-menu-transition-leave-active{transition:all .3s cubic-bezier(.25,.8,.25,1)}.v-menu-transition-enter.v-menu__content--auto .v-list__tile{opacity:0;transform:translateY(-15px)}.v-menu-transition-enter.v-menu__content--auto .v-list__tile--active{opacity:1;transform:none!important;pointer-events:auto}.application .theme--light.v-card,.theme--light .v-card{background-color:#fff;color:rgba(0,0,0,.87)}.application .theme--dark.v-card,.theme--dark .v-card{background-color:#424242;color:#fff}.v-card{display:block;border-radius:2px;min-width:0;position:relative;text-decoration:none;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.v-card>:first-child:not(.v-btn):not(.v-chip){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card--raised{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.v-card--tile{border-radius:0}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.v-card--hover{cursor:pointer;transition:all .4s cubic-bezier(.25,.8,.25,1);transition-property:box-shadow}.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;padding:16px}.v-card__title--primary{padding-top:24px}.v-card__text{padding:16px;width:100%}.v-card__media{display:flex;overflow:hidden;position:relative}.v-card__media img{width:100%}.v-card__media__background{border-radius:inherit;position:absolute;left:0;top:0;width:100%;height:100%}.v-card__media__content{display:flex;flex:1 1 auto;position:relative}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions .v-btn,.v-card__actions>*{margin:0}.v-card__actions .v-btn+.v-btn{margin-left:8px}.application .theme--light.v-input--selection-controls.v-input--is-disabled .v-icon,.theme--light .v-input--selection-controls.v-input--is-disabled .v-icon{color:rgba(0,0,0,.26)!important}.application .theme--dark.v-input--selection-controls.v-input--is-disabled .v-icon,.theme--dark .v-input--selection-controls.v-input--is-disabled .v-icon{color:hsla(0,0%,100%,.3)!important}.application--is-rtl .v-input--selection-controls .v-input--selection-controls__input{margin-right:0;margin-left:8px}.v-input--selection-controls{padding:4px 0}.v-input--selection-controls .v-input__append-outer,.v-input--selection-controls .v-input__prepend-outer{margin-top:0;margin-bottom:0}.v-input--selection-controls__input{color:inherit;display:inline-flex;flex:0 0 auto;height:24px;position:relative;margin-right:8px;transition:color .2s cubic-bezier(.25,.8,.25,1),transform .3s cubic-bezier(.25,.8,.25,1);width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__input input{position:absolute;opacity:0}.v-input--selection-controls__input+.v-label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.v-input--selection-controls__ripple{cursor:pointer;height:48px;position:absolute;transition:inherit;width:48px;left:-12px;top:calc(50% - 24px)}.v-input--selection-controls__ripple:before{border-radius:50%;bottom:0;content:\"\";position:absolute;opacity:.2;left:0;right:0;top:0;transform-origin:center center;transform:scale(.2);transition:inherit}.v-input--selection-controls.v-input .v-label{align-items:center;display:inline-flex;top:0;height:auto}.v-input--selection-controls.v-input--is-focused .v-input--selection-controls__ripple:before,.v-input--selection-controls .v-radio--is-focused .v-input--selection-controls__ripple:before{background:currentColor;transform:scale(.8)}.application .theme--light.v-input:not(.v-input--is-disabled) input,.application .theme--light.v-input:not(.v-input--is-disabled) textarea,.theme--light .v-input:not(.v-input--is-disabled) input,.theme--light .v-input:not(.v-input--is-disabled) textarea{color:rgba(0,0,0,.87)}.application .theme--light.v-input input::-webkit-input-placeholder,.application .theme--light.v-input textarea::-webkit-input-placeholder,.theme--light .v-input input::-webkit-input-placeholder,.theme--light .v-input textarea::-webkit-input-placeholder{color:rgba(0,0,0,.38)}.application .theme--light.v-input input:-ms-input-placeholder,.application .theme--light.v-input input::-ms-input-placeholder,.application .theme--light.v-input textarea:-ms-input-placeholder,.application .theme--light.v-input textarea::-ms-input-placeholder,.theme--light .v-input input:-ms-input-placeholder,.theme--light .v-input input::-ms-input-placeholder,.theme--light .v-input textarea:-ms-input-placeholder,.theme--light .v-input textarea::-ms-input-placeholder{color:rgba(0,0,0,.38)}.application .theme--light.v-input input::placeholder,.application .theme--light.v-input textarea::placeholder,.theme--light .v-input input::placeholder,.theme--light .v-input textarea::placeholder{color:rgba(0,0,0,.38)}.application .theme--light.v-input--is-disabled .v-label,.application .theme--light.v-input--is-disabled input,.application .theme--light.v-input--is-disabled textarea,.theme--light .v-input--is-disabled .v-label,.theme--light .v-input--is-disabled input,.theme--light .v-input--is-disabled textarea{color:rgba(0,0,0,.38)}.application .theme--dark.v-input:not(.v-input--is-disabled) input,.application .theme--dark.v-input:not(.v-input--is-disabled) textarea,.theme--dark .v-input:not(.v-input--is-disabled) input,.theme--dark .v-input:not(.v-input--is-disabled) textarea{color:#fff}.application .theme--dark.v-input input::-webkit-input-placeholder,.application .theme--dark.v-input textarea::-webkit-input-placeholder,.theme--dark .v-input input::-webkit-input-placeholder,.theme--dark .v-input textarea::-webkit-input-placeholder{color:hsla(0,0%,100%,.5)}.application .theme--dark.v-input input:-ms-input-placeholder,.application .theme--dark.v-input input::-ms-input-placeholder,.application .theme--dark.v-input textarea:-ms-input-placeholder,.application .theme--dark.v-input textarea::-ms-input-placeholder,.theme--dark .v-input input:-ms-input-placeholder,.theme--dark .v-input input::-ms-input-placeholder,.theme--dark .v-input textarea:-ms-input-placeholder,.theme--dark .v-input textarea::-ms-input-placeholder{color:hsla(0,0%,100%,.5)}.application .theme--dark.v-input input::placeholder,.application .theme--dark.v-input textarea::placeholder,.theme--dark .v-input input::placeholder,.theme--dark .v-input textarea::placeholder{color:hsla(0,0%,100%,.5)}.application .theme--dark.v-input--is-disabled .v-label,.application .theme--dark.v-input--is-disabled input,.application .theme--dark.v-input--is-disabled textarea,.theme--dark .v-input--is-disabled .v-label,.theme--dark .v-input--is-disabled input,.theme--dark .v-input--is-disabled textarea{color:hsla(0,0%,100%,.5)}.v-input{align-items:flex-start;display:flex;flex:1 1 auto;font-size:16px;margin-top:16px;text-align:left}.v-input .v-progress-linear{top:calc(100% - 1px);left:0;margin:0;position:absolute}.v-input input{max-height:32px}.v-input input:invalid,.v-input textarea:invalid{box-shadow:none}.v-input input:active,.v-input input:focus,.v-input textarea:active,.v-input textarea:focus{outline:none}.v-input .v-label{height:20px;line-height:20px}.v-input__append-outer,.v-input__prepend-outer{display:inline-flex;margin-bottom:4px;margin-top:4px;line-height:1}.v-input__append-outer .v-icon,.v-input__prepend-outer .v-icon{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input__append-outer{margin-left:9px}.v-input__prepend-outer{margin-right:9px}.v-input__control{display:flex;flex-direction:column;height:auto;flex-grow:1;flex-wrap:wrap;position:relative;width:100%}.v-input__icon{align-items:center;display:inline-flex;height:24px;flex:1 0 auto;justify-content:center;min-width:24px;width:24px}.v-input__icon--clear{border-radius:50%}.v-input__slot{align-items:center;color:inherit;display:flex;margin-bottom:8px;min-height:inherit;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1);width:100%}.v-input--is-disabled:not(.v-input--is-readonly){pointer-events:none}.v-input--is-loading .v-input__slot:after,.v-input--is-loading .v-input__slot:before{display:none}.v-input--hide-details .v-input__slot{margin-bottom:0}.v-input--has-state.error--text .v-label{animation:shake .6s cubic-bezier(.25,.8,.5,1)}.application .theme--light.v-label,.theme--light .v-label{color:rgba(0,0,0,.54)}.application .theme--light.v-label--is-disabled,.theme--light .v-label--is-disabled{color:rgba(0,0,0,.38)}.application .theme--dark.v-label,.theme--dark .v-label{color:hsla(0,0%,100%,.7)}.application .theme--dark.v-label--is-disabled,.theme--dark .v-label--is-disabled{color:hsla(0,0%,100%,.5)}.v-label{font-size:16px;line-height:1;min-height:8px;transition:.3s cubic-bezier(.25,.8,.5,1)}.application .theme--light.v-messages,.theme--light .v-messages{color:rgba(0,0,0,.54)}.application .theme--dark.v-messages,.theme--dark .v-messages{color:hsla(0,0%,100%,.7)}.application--is-rtl .v-messages{text-align:right}.v-messages{flex:1 1 auto;font-size:12px;min-height:12px;min-width:1px;position:relative}.v-messages__message{line-height:1;word-break:break-word;overflow-wrap:break-word;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.v-progress-linear{background:transparent;margin:1rem 0;overflow:hidden;width:100%;position:relative}.v-progress-linear__bar{width:100%;position:relative;z-index:1}.v-progress-linear__bar,.v-progress-linear__bar__determinate{height:inherit;transition:.2s}.v-progress-linear__bar__indeterminate .long,.v-progress-linear__bar__indeterminate .short{height:inherit;position:absolute;left:0;top:0;bottom:0;will-change:left,right;width:auto;background-color:inherit}.v-progress-linear__bar__indeterminate--active .long{animation:indeterminate;animation-duration:2.2s;animation-iteration-count:infinite}.v-progress-linear__bar__indeterminate--active .short{animation:indeterminate-short;animation-duration:2.2s;animation-iteration-count:infinite}.v-progress-linear__background{position:absolute;top:0;left:0;bottom:0;transition:.3s ease-in}.v-progress-linear--query .v-progress-linear__bar__indeterminate--active .long{animation:query;animation-duration:2s;animation-iteration-count:infinite}.v-progress-linear--query .v-progress-linear__bar__indeterminate--active .short{animation:query-short;animation-duration:2s;animation-iteration-count:infinite}@keyframes indeterminate{0%{left:-90%;right:100%}60%{left:-90%;right:100%}to{left:100%;right:-35%}}@keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}@keyframes query{0%{right:-90%;left:100%}60%{right:-90%;left:100%}to{right:100%;left:-35%}}@keyframes query-short{0%{right:-200%;left:100%}60%{right:107%;left:-8%}to{right:107%;left:-8%}}.application .theme--light.v-divider,.theme--light .v-divider{border-color:rgba(0,0,0,.12)}.application .theme--dark.v-divider,.theme--dark .v-divider{border-color:hsla(0,0%,100%,.12)}.v-divider{display:block;flex:1 1 0px;max-width:100%;height:0;max-height:0;border:solid;border-width:thin 0 0}.v-divider--inset:not(.v-divider--vertical){margin-left:72px;max-width:calc(100% - 72px)}.v-divider--vertical{width:0;max-width:0;height:100%;max-height:100%;border:solid;border-width:0 thin 0 0}.v-divider--vertical.v-divider--inset{max-height:calc(100% - 16px)}.application .theme--light.v-subheader,.theme--light .v-subheader{color:rgba(0,0,0,.54)}.application .theme--dark.v-subheader,.theme--dark .v-subheader{color:hsla(0,0%,100%,.7)}.v-subheader{align-items:center;display:flex;height:48px;font-size:14px;font-weight:500;padding:0 16px}.v-subheader--inset{margin-left:56px}.application .theme--light.v-list,.theme--light .v-list{background:#fff;color:rgba(0,0,0,.87)}.application .theme--light.v-list .v-list--disabled,.theme--light .v-list .v-list--disabled{color:rgba(0,0,0,.38)}.application .theme--light.v-list .v-list__tile__sub-title,.theme--light .v-list .v-list__tile__sub-title{color:rgba(0,0,0,.54)}.application .theme--light.v-list .v-list__tile__mask,.theme--light .v-list .v-list__tile__mask{color:rgba(0,0,0,.38);background:#eee}.application .theme--light.v-list .v-list__group__header:hover,.application .theme--light.v-list .v-list__tile--highlighted,.application .theme--light.v-list .v-list__tile--link:hover,.theme--light .v-list .v-list__group__header:hover,.theme--light .v-list .v-list__tile--highlighted,.theme--light .v-list .v-list__tile--link:hover{background:rgba(0,0,0,.04)}.application .theme--light.v-list .v-list__group--active:after,.application .theme--light.v-list .v-list__group--active:before,.theme--light .v-list .v-list__group--active:after,.theme--light .v-list .v-list__group--active:before{background:rgba(0,0,0,.12)}.application .theme--light.v-list .v-list__group--disabled .v-list__group__header__prepend-icon .v-icon,.application .theme--light.v-list .v-list__group--disabled .v-list__tile,.theme--light .v-list .v-list__group--disabled .v-list__group__header__prepend-icon .v-icon,.theme--light .v-list .v-list__group--disabled .v-list__tile{color:rgba(0,0,0,.38)!important}.application .theme--dark.v-list,.theme--dark .v-list{background:#424242;color:#fff}.application .theme--dark.v-list .v-list--disabled,.theme--dark .v-list .v-list--disabled{color:hsla(0,0%,100%,.5)}.application .theme--dark.v-list .v-list__tile__sub-title,.theme--dark .v-list .v-list__tile__sub-title{color:hsla(0,0%,100%,.7)}.application .theme--dark.v-list .v-list__tile__mask,.theme--dark .v-list .v-list__tile__mask{color:hsla(0,0%,100%,.5);background:#494949}.application .theme--dark.v-list .v-list__group__header:hover,.application .theme--dark.v-list .v-list__tile--highlighted,.application .theme--dark.v-list .v-list__tile--link:hover,.theme--dark .v-list .v-list__group__header:hover,.theme--dark .v-list .v-list__tile--highlighted,.theme--dark .v-list .v-list__tile--link:hover{background:hsla(0,0%,100%,.08)}.application .theme--dark.v-list .v-list__group--active:after,.application .theme--dark.v-list .v-list__group--active:before,.theme--dark .v-list .v-list__group--active:after,.theme--dark .v-list .v-list__group--active:before{background:hsla(0,0%,100%,.12)}.application .theme--dark.v-list .v-list__group--disabled .v-list__group__header__prepend-icon .v-icon,.application .theme--dark.v-list .v-list__group--disabled .v-list__tile,.theme--dark .v-list .v-list__group--disabled .v-list__group__header__prepend-icon .v-icon,.theme--dark .v-list .v-list__group--disabled .v-list__tile{color:hsla(0,0%,100%,.5)!important}.v-list{list-style-type:none;padding:8px 0;transition:height .3s cubic-bezier(.4,0,.2,1)}.v-list .v-input .v-messages{display:none}.v-list .v-input,.v-list .v-input__slot{margin:0}.v-list__tile{align-items:center;color:inherit;display:flex;font-size:16px;font-weight:400;height:48px;margin:0;padding:0 16px;position:relative;text-decoration:none;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-list__tile--link{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-list__tile__action,.v-list__tile__content{height:100%}.v-list__tile__sub-title,.v-list__tile__title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:.3s cubic-bezier(.25,.8,.5,1);width:100%}.v-list__tile__title{height:24px;line-height:24px;position:relative;text-align:left}.v-list__tile__sub-title{font-size:14px}.v-list__tile__action,.v-list__tile__avatar{display:flex;justify-content:flex-start;min-width:56px}.v-list__tile__action{align-items:center}.v-list__tile__action .v-btn{padding:0;margin:0}.v-list__tile__action .v-btn--icon{margin:-6px}.v-list__tile__action .v-radio.v-radio{margin:0}.v-list__tile__action-text{color:#9e9e9e;font-size:12px}.v-list__tile__action--stack{align-items:flex-end;justify-content:space-between;padding-top:8px;padding-bottom:8px;white-space:nowrap;flex-direction:column}.v-list__tile__content{text-align:left;flex:1 1 auto;overflow:hidden;display:flex;align-items:flex-start;justify-content:center;flex-direction:column}.v-list__tile__content~.v-list__tile__action:not(.v-list__tile__action--stack),.v-list__tile__content~.v-list__tile__avatar{justify-content:flex-end}.v-list__tile--active .v-list__tile__action:first-of-type .v-icon{color:inherit}.v-list__tile--avatar{height:56px}.v-list--dense{padding-top:4px;padding-bottom:4px}.v-list--dense .v-subheader{font-size:13px;height:40px}.v-list--dense .v-list__group .v-subheader{height:40px}.v-list--dense .v-list__tile{font-size:13px}.v-list--dense .v-list__tile--avatar{height:48px}.v-list--dense .v-list__tile:not(.v-list__tile--avatar){height:40px}.v-list--dense .v-list__tile .v-icon{font-size:22px}.v-list--dense .v-list__tile__sub-title{font-size:13px}.v-list--disabled{pointer-events:none}.v-list--two-line .v-list__tile{height:72px}.v-list--two-line.v-list--dense .v-list__tile{height:60px}.v-list--three-line .v-list__tile{height:88px}.v-list--three-line .v-list__tile__avatar{margin-top:-18px}.v-list--three-line .v-list__tile__sub-title{white-space:normal;-webkit-line-clamp:2;display:-webkit-box}.v-list--three-line.v-list--dense .v-list__tile{height:76px}.v-list>.v-list__group:before{top:0}.v-list>.v-list__group:before .v-list__tile__avatar{margin-top:-14px}.v-list__group{padding:0;position:relative;transition:inherit}.v-list__group:after,.v-list__group:before{content:\"\";height:1px;left:0;position:absolute;transition:.3s cubic-bezier(.25,.8,.5,1);width:100%}.v-list__group--active~.v-list__group:before{display:none}.v-list__group__header{align-items:center;cursor:pointer;display:flex;list-style-type:none}.v-list__group__header>div:not(.v-list__group__header__prepend-icon):not(.v-list__group__header__append-icon){flex:1 0 auto}.v-list__group__header .v-list__group__header__append-icon,.v-list__group__header .v-list__group__header__prepend-icon{padding:0 16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-list__group__header--sub-group{align-items:center;display:flex}.v-list__group__header--sub-group div .v-list__tile{padding-left:0}.v-list__group__header--sub-group .v-list__group__header__prepend-icon{padding:0 0 0 40px;margin-right:8px}.v-list__group__header .v-list__group__header__prepend-icon{display:flex;justify-content:flex-start;min-width:56px}.v-list__group__header--active .v-list__group__header__append-icon .v-icon{transform:rotate(-180deg)}.v-list__group__header--active .v-list__group__header__prepend-icon .v-icon{color:inherit}.v-list__group__header--active.v-list__group__header--sub-group .v-list__group__header__prepend-icon .v-icon{transform:rotate(-180deg)}.v-list__group__items{position:relative;padding:0;transition:inherit}.v-list__group__items>div{display:block}.v-list__group__items--no-action .v-list__tile{padding-left:72px}.v-list__group--disabled{pointer-events:none}.v-list--subheader{padding-top:0}.v-avatar{align-items:center;border-radius:50%;display:inline-flex;justify-content:center;position:relative;text-align:center;vertical-align:middle}.v-avatar .v-icon,.v-avatar img{border-radius:50%;display:inline-flex;height:inherit;width:inherit}.v-avatar--tile,.v-avatar--tile .v-icon,.v-avatar--tile img{border-radius:0}.application .theme--light.v-counter,.theme--light .v-counter{color:rgba(0,0,0,.54)}.application .theme--dark.v-counter,.theme--dark .v-counter{color:hsla(0,0%,100%,.7)}.v-counter{flex:0 1 auto;font-size:12px;min-height:12px;line-height:1}.v-badge{display:inline-block;position:relative}.v-badge__badge{color:#fff;display:flex;position:absolute;font-size:14px;top:-11px;right:-22px;border-radius:50%;height:22px;width:22px;justify-content:center;align-items:center;flex-direction:row;flex-wrap:wrap;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-badge__badge .v-icon{font-size:14px}.v-badge--overlap .v-badge__badge{top:-8px;right:-8px}.v-badge--overlap.v-badge--left .v-badge__badge{left:-8px;right:auto}.v-badge--overlap.v-badge--bottom .v-badge__badge{bottom:-8px;top:auto}.v-badge--left .v-badge__badge{left:-22px}.v-badge--bottom .v-badge__badge{bottom:-11px;top:auto}.application .theme--light.v-bottom-nav,.theme--light .v-bottom-nav{background-color:#fff}.application .theme--dark.v-bottom-nav,.theme--dark .v-bottom-nav{background-color:#424242}.v-bottom-nav{bottom:0;box-shadow:0 3px 14px 2px rgba(0,0,0,.12);display:flex;left:0;justify-content:center;transform:translateY(60px);transition:all .4s cubic-bezier(.25,.8,.5,1);width:100%}.v-bottom-nav--absolute{position:absolute}.v-bottom-nav--active{transform:translate(0)}.v-bottom-nav--fixed{position:fixed;z-index:4}.v-bottom-nav .v-btn{background:transparent!important;border-radius:0;box-shadow:none!important;font-weight:400;height:100%;margin:0;max-width:168px;min-width:80px;padding:8px 12px 10px;text-transform:none;opacity:.5;width:100%;flex-shrink:1}.v-bottom-nav .v-btn .v-btn__content{flex-direction:column-reverse;font-size:12px;white-space:nowrap;will-change:font-size}.v-bottom-nav .v-btn .v-btn__content i.v-icon{color:inherit;margin-bottom:4px;transition:all .4s cubic-bezier(.25,.8,.5,1)}.v-bottom-nav .v-btn .v-btn__content span{line-height:1}.v-bottom-nav .v-btn--active{opacity:1;padding-top:6px}.v-bottom-nav .v-btn--active:before{background-color:transparent}.v-bottom-nav .v-btn--active .v-btn__content{font-size:14px}.v-bottom-nav .v-btn--active .v-btn__content .v-icon{transform:none}.v-bottom-nav .v-btn:not(.v-btn--active){-webkit-filter:grayscale(100%);filter:grayscale(100%)}.v-bottom-nav--shift .v-btn__content{font-size:14px}.v-bottom-nav--shift .v-btn{transition:all .3s;min-width:56px;max-width:96px}.v-bottom-nav--shift .v-btn--active{min-width:96px;max-width:168px}.v-bottom-nav--shift .v-btn:not(.v-btn--active) .v-btn__content .v-icon{transform:scale(1) translateY(8px)}.v-bottom-nav--shift .v-btn:not(.v-btn--active) .v-btn__content span{color:transparent}.v-bottom-sheet.v-dialog{align-self:flex-end;border-radius:0;flex:1 0 100%;margin:0;min-width:100%;overflow:visible;transition:.3s cubic-bezier(.25,.8,.25,1)}.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:70%;min-width:0}@media only screen and (max-width:599px){.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:none}}.v-dialog{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);border-radius:2px;margin:24px;overflow-y:auto;pointer-events:auto;transition:.3s cubic-bezier(.25,.8,.25,1);width:100%;z-index:inherit}.v-dialog__content{align-items:center;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:.2s cubic-bezier(.25,.8,.25,1);width:100%;z-index:6;outline:none}.v-dialog:not(.v-dialog--fullscreen){max-height:90%}.v-dialog__activator,.v-dialog__activator *{cursor:pointer}.v-dialog__activator--disabled{pointer-events:none}.v-dialog__container{display:inline-block;vertical-align:middle}.v-dialog--animated{animation-duration:.15s;animation-name:animate-dialog;animation-timing-function:cubic-bezier(.25,.8,.25,1)}.v-dialog--fullscreen{border-radius:0;margin:0;height:100%;position:fixed;overflow-y:auto;top:0;left:0}.v-dialog--fullscreen>.v-card{min-height:100%;min-width:100%;margin:0!important;padding:0!important}.v-dialog--scrollable{display:flex}.v-dialog--scrollable>.v-card{display:flex;flex:1 1 auto;flex-direction:column}.v-dialog--scrollable>.v-card>.v-card__actions,.v-dialog--scrollable>.v-card>.v-card__title{flex:1 0 auto}.v-dialog--scrollable>.v-card>.v-card__text{overflow-y:auto;-webkit-backface-visibility:hidden;backface-visibility:hidden}@keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}.v-overlay{position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;transition:.3s cubic-bezier(.25,.8,.5,1);z-index:5}.v-overlay--absolute{position:absolute}.v-overlay:before{background-color:#212121;bottom:0;content:\"\";height:100%;left:0;opacity:0;position:absolute;right:0;top:0;transition:inherit;transition-delay:.15s;width:100%}.v-overlay--active{pointer-events:auto;touch-action:none}.v-overlay--active:before{opacity:.46}.application .theme--light.v-breadcrumbs li.v-breadcrumbs__divider,.application .theme--light.v-breadcrumbs li .v-breadcrumbs__item--disabled,.application .theme--light.v-breadcrumbs li:last-child .v-breadcrumbs__item,.theme--light .v-breadcrumbs li.v-breadcrumbs__divider,.theme--light .v-breadcrumbs li .v-breadcrumbs__item--disabled,.theme--light .v-breadcrumbs li:last-child .v-breadcrumbs__item{color:rgba(0,0,0,.38)}.application .theme--dark.v-breadcrumbs li.v-breadcrumbs__divider,.application .theme--dark.v-breadcrumbs li .v-breadcrumbs__item--disabled,.application .theme--dark.v-breadcrumbs li:last-child .v-breadcrumbs__item,.theme--dark .v-breadcrumbs li.v-breadcrumbs__divider,.theme--dark .v-breadcrumbs li .v-breadcrumbs__item--disabled,.theme--dark .v-breadcrumbs li:last-child .v-breadcrumbs__item{color:hsla(0,0%,100%,.5)}.v-breadcrumbs{align-items:center;display:flex;flex-wrap:wrap;flex:0 1 auto;list-style-type:none;margin:0;padding:18px 12px}.v-breadcrumbs li{align-items:center;display:inline-flex;font-size:14px}.v-breadcrumbs li .v-icon{font-size:16px}.v-breadcrumbs li:last-child a{cursor:default;pointer-events:none}.v-breadcrumbs li:nth-child(2n){padding:0 12px}.v-breadcrumbs--large li,.v-breadcrumbs--large li .v-icon{font-size:16px}.v-breadcrumbs__item{align-items:center;display:inline-flex;text-decoration:none;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-breadcrumbs__item--disabled{pointer-events:none}.v-ripple__container{border-radius:inherit;width:100%;height:100%;z-index:0;contain:strict}.v-ripple__animation,.v-ripple__container{color:inherit;position:absolute;left:0;top:0;overflow:hidden;pointer-events:none}.v-ripple__animation{border-radius:50%;background:currentColor;opacity:0;transition:.3s cubic-bezier(0,0,.2,1);will-change:transform,opacity}.v-ripple__animation--enter{transition:none}.v-ripple__animation--visible{opacity:.15}.application .theme--light.v-btn,.theme--light .v-btn{color:rgba(0,0,0,.87)}.application .theme--light.v-btn.v-btn--disabled,.application .theme--light.v-btn.v-btn--disabled .v-btn__loading,.application .theme--light.v-btn.v-btn--disabled .v-icon,.theme--light .v-btn.v-btn--disabled,.theme--light .v-btn.v-btn--disabled .v-btn__loading,.theme--light .v-btn.v-btn--disabled .v-icon{color:rgba(0,0,0,.26)!important}.application .theme--light.v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat),.theme--light .v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat){background-color:rgba(0,0,0,.12)!important}.application .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat),.theme--light .v-btn:not(.v-btn--icon):not(.v-btn--flat){background-color:#f5f5f5}.application .theme--dark.v-btn,.theme--dark .v-btn{color:#fff}.application .theme--dark.v-btn.v-btn--disabled,.application .theme--dark.v-btn.v-btn--disabled .v-btn__loading,.application .theme--dark.v-btn.v-btn--disabled .v-icon,.theme--dark .v-btn.v-btn--disabled,.theme--dark .v-btn.v-btn--disabled .v-btn__loading,.theme--dark .v-btn.v-btn--disabled .v-icon{color:hsla(0,0%,100%,.3)!important}.application .theme--dark.v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat),.theme--dark .v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat){background-color:hsla(0,0%,100%,.12)!important}.application .theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat),.theme--dark .v-btn:not(.v-btn--icon):not(.v-btn--flat){background-color:#212121}.v-btn{align-items:center;border-radius:2px;display:inline-flex;height:36px;flex:0 0 auto;font-size:14px;font-weight:500;justify-content:center;margin:6px 8px;min-width:88px;outline:0;text-transform:uppercase;text-decoration:none;transition:.3s cubic-bezier(.25,.8,.5,1),color 1ms;position:relative;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-btn:before{border-radius:inherit;color:inherit;content:\"\";position:absolute;left:0;top:0;height:100%;opacity:.12;transition:.3s cubic-bezier(.25,.8,.5,1);width:100%}.v-btn{padding:0 16px}.v-btn--active,.v-btn:focus,.v-btn:hover{position:relative}.v-btn--active:before,.v-btn:focus:before,.v-btn:hover:before{background-color:currentColor}.v-btn__content{align-items:center;border-radius:inherit;color:inherit;display:flex;flex:1 0 auto;justify-content:center;margin:0 auto;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1);white-space:nowrap;width:inherit}.v-btn--small{font-size:13px;height:28px;padding:0 8px}.v-btn--large{font-size:15px;height:44px;padding:0 32px}.v-btn .v-btn__content .v-icon{color:inherit}.v-btn:not(.v-btn--depressed):not(.v-btn--flat){will-change:box-shadow;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-btn:not(.v-btn--depressed):not(.v-btn--flat):active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-btn--icon{background:transparent;box-shadow:none!important;border-radius:50%;justify-content:center;min-width:0;width:36px}.v-btn--icon.v-btn--small{width:28px}.v-btn--icon.v-btn--large{width:44px}.v-btn--floating,.v-btn--icon:before{border-radius:50%}.v-btn--floating{min-width:0;height:56px;width:56px;padding:0}.v-btn--floating.v-btn--absolute,.v-btn--floating.v-btn--fixed{z-index:4}.v-btn--floating:not(.v-btn--depressed):not(.v-btn--flat){box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.v-btn--floating:not(.v-btn--depressed):not(.v-btn--flat):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.v-btn--floating .v-btn__content{flex:1 1 auto;margin:0}.v-btn--floating:after{border-radius:50%}.v-btn--floating .v-btn__content :not(:only-child){transition:.3s cubic-bezier(.25,.8,.5,1)}.v-btn--floating .v-btn__content :not(:only-child):first-child{opacity:1}.v-btn--floating .v-btn__content :not(:only-child):last-child{opacity:0;transform:rotate(-45deg)}.v-btn--floating .v-btn__content :not(:only-child):first-child,.v-btn--floating .v-btn__content :not(:only-child):last-child{-webkit-backface-visibility:hidden;position:absolute;left:0;top:0}.v-btn--floating.v-btn--active .v-btn__content :not(:only-child):first-child{opacity:0;transform:rotate(45deg)}.v-btn--floating.v-btn--active .v-btn__content :not(:only-child):last-child{opacity:1;transform:rotate(0)}.v-btn--floating .v-icon{height:inherit;width:inherit}.v-btn--floating.v-btn--small{height:40px;width:40px}.v-btn--floating.v-btn--small .v-icon{font-size:18px}.v-btn--floating.v-btn--large{height:72px;width:72px}.v-btn--floating.v-btn--large .v-icon{font-size:30px}.v-btn--reverse .v-btn__content{flex-direction:row-reverse}.v-btn--reverse.v-btn--column .v-btn__content{flex-direction:column-reverse}.v-btn--absolute,.v-btn--fixed{margin:0}.v-btn.v-btn--absolute{position:absolute}.v-btn.v-btn--fixed{position:fixed}.v-btn--top:not(.v-btn--absolute){top:16px}.v-btn--top.v-btn--absolute{top:-28px}.v-btn--top.v-btn--absolute.v-btn--small{top:-20px}.v-btn--top.v-btn--absolute.v-btn--large{top:-36px}.v-btn--bottom:not(.v-btn--absolute){bottom:16px}.v-btn--bottom.v-btn--absolute{bottom:-28px}.v-btn--bottom.v-btn--absolute.v-btn--small{bottom:-20px}.v-btn--bottom.v-btn--absolute.v-btn--large{bottom:-36px}.v-btn--left{left:16px}.v-btn--right{right:16px}.v-btn.v-btn--disabled{box-shadow:none!important;pointer-events:none}.v-btn:not(.v-btn--disabled):not(.v-btn--floating):not(.v-btn--icon) .v-btn__content .v-icon{transition:none}.v-btn--icon{padding:0}.v-btn--loader{pointer-events:none}.v-btn--loader .v-btn__content{opacity:0}.v-btn__loading{align-items:center;display:flex;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%}.v-btn__loading .v-icon--left{margin-right:1rem;line-height:inherit}.v-btn__loading .v-icon--right{margin-left:1rem;line-height:inherit}.v-btn.v-btn--outline{border:1px solid currentColor;background:transparent!important;box-shadow:none}.v-btn.v-btn--outline:hover{box-shadow:none}.v-btn--block{display:flex;flex:1;margin:6px 0;width:100%}.v-btn--round,.v-btn--round:after{border-radius:28px}.v-btn .v-icon--right{margin-left:16px}.v-btn .v-icon--left{margin-right:16px}.v-btn.accent,.v-btn.error,.v-btn.info,.v-btn.primary,.v-btn.secondary,.v-btn.success,.v-btn.warning{color:#fff}.v-progress-circular{position:relative;display:inline-flex;vertical-align:middle}.v-progress-circular svg{width:100%;height:100%;margin:auto;position:absolute;top:0;bottom:0;left:0;right:0;z-index:0}.v-progress-circular--indeterminate svg{animation:progress-circular-rotate 1.4s linear infinite;transform-origin:center center;transition:all .2s ease-in-out}.v-progress-circular--indeterminate .v-progress-circular__overlay{animation:progress-circular-dash 1.4s ease-in-out infinite;stroke-linecap:round;stroke-dasharray:80,200;stroke-dashoffset:0px}.v-progress-circular__underlay{stroke:rgba(0,0,0,.1);z-index:1}.v-progress-circular__overlay{stroke:currentColor;z-index:2;transition:all .6s ease-in-out}.v-progress-circular__info{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}@keyframes progress-circular-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0px}50%{stroke-dasharray:100,200;stroke-dashoffset:-15px}to{stroke-dasharray:100,200;stroke-dashoffset:-125px}}@keyframes progress-circular-rotate{to{transform:rotate(1turn)}}.application .theme--light.v-btn-toggle,.theme--light .v-btn-toggle{background:#fff}.application .theme--light.v-btn-toggle .v-btn,.theme--light .v-btn-toggle .v-btn{color:rgba(0,0,0,.87)}.application .theme--light.v-btn-toggle .v-btn.v-btn--active:not(:last-child):not([data-only-child]),.theme--light .v-btn-toggle .v-btn.v-btn--active:not(:last-child):not([data-only-child]){border-right-color:rgba(0,0,0,.26)}.application .theme--dark.v-btn-toggle,.theme--dark .v-btn-toggle{background:#424242}.application .theme--dark.v-btn-toggle .v-btn,.theme--dark .v-btn-toggle .v-btn{color:#fff}.application .theme--dark.v-btn-toggle .v-btn.v-btn--active:not(:last-child):not([data-only-child]),.theme--dark .v-btn-toggle .v-btn.v-btn--active:not(:last-child):not([data-only-child]){border-right-color:hsla(0,0%,100%,.3)}.v-btn-toggle{display:inline-flex;border-radius:2px;transition:.3s cubic-bezier(.25,.8,.5,1);will-change:background,box-shadow}.v-btn-toggle .v-btn{justify-content:center;min-width:auto;width:auto;padding:0 8px;margin:0;opacity:.4;border-radius:0}.v-btn-toggle .v-btn:not(:last-child){border-right:1px solid transparent}.v-btn-toggle .v-btn:after{display:none}.v-btn-toggle .v-btn.v-btn--active{opacity:1}.v-btn-toggle .v-btn span+.v-icon{font-size:medium;margin-left:10px}.v-btn-toggle .v-btn:first-child{border-radius:2px 0 0 2px}.v-btn-toggle .v-btn:last-child{border-radius:0 2px 2px 0}.v-btn-toggle--selected{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.application--is-rtl .v-carousel__prev{left:auto;right:5px}.application--is-rtl .v-carousel__next{left:5px;right:auto}.v-carousel{height:500px;width:100%;position:relative;overflow:hidden;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-carousel__next,.v-carousel__prev{position:absolute;top:50%;z-index:1;transform:translateY(-50%)}.v-carousel__next .v-btn,.v-carousel__prev .v-btn{color:#fff;margin:0!important;height:auto;width:auto}.v-carousel__next .v-btn i,.v-carousel__prev .v-btn i{font-size:48px}.v-carousel__next .v-btn:hover,.v-carousel__prev .v-btn:hover{background:none}.v-carousel__prev{left:5px}.v-carousel__next{right:5px}.v-carousel__controls{background:rgba(0,0,0,.5);align-items:center;bottom:0;display:flex;justify-content:center;left:0;position:absolute;height:50px;list-style-type:none;width:100%;z-index:1}.v-carousel__controls__item{color:#fff;margin:0 8px!important}.v-carousel__controls__item i{opacity:.5;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-carousel__controls__item--active i{opacity:1;vertical-align:middle}.v-carousel__controls__item:hover{background:none}.v-carousel__controls__item:hover i{opacity:.8}.application .theme--light.v-jumbotron__content,.theme--light .v-jumbotron__content{color:rgba(0,0,0,.87)}.application .theme--dark.v-jumbotron__content,.theme--dark .v-jumbotron__content{color:#fff}.v-jumbotron{display:block;top:0;transition:.3s cubic-bezier(.25,.8,.5,1);width:100%}.v-jumbotron__wrapper{height:100%;overflow:hidden;position:relative;transition:inherit;width:100%}.v-jumbotron__background{position:absolute;top:0;left:0;right:0;bottom:0;contain:strict;transition:inherit}.v-jumbotron__image{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;will-change:transform;transition:inherit}.v-jumbotron__content{height:100%;position:relative;transition:inherit}.application .theme--light.v-data-iterator .v-data-iterator__actions,.theme--light .v-data-iterator .v-data-iterator__actions{color:rgba(0,0,0,.54)}.application .theme--light.v-data-iterator .v-data-iterator__actions__select .v-select .v-input__append-inner,.application .theme--light.v-data-iterator .v-data-iterator__actions__select .v-select .v-select__selection--comma,.theme--light .v-data-iterator .v-data-iterator__actions__select .v-select .v-input__append-inner,.theme--light .v-data-iterator .v-data-iterator__actions__select .v-select .v-select__selection--comma{color:rgba(0,0,0,.54)!important}.application .theme--dark.v-data-iterator .v-data-iterator__actions,.theme--dark .v-data-iterator .v-data-iterator__actions{color:hsla(0,0%,100%,.7)}.application .theme--dark.v-data-iterator .v-data-iterator__actions__select .v-select .v-input__append-inner,.application .theme--dark.v-data-iterator .v-data-iterator__actions__select .v-select .v-select__selection--comma,.theme--dark .v-data-iterator .v-data-iterator__actions__select .v-select .v-input__append-inner,.theme--dark .v-data-iterator .v-data-iterator__actions__select .v-select .v-select__selection--comma{color:hsla(0,0%,100%,.7)!important}.v-data-iterator__actions{display:flex;justify-content:flex-end;align-items:center;font-size:12px;flex-wrap:wrap-reverse}.v-data-iterator__actions .v-btn{color:inherit}.v-data-iterator__actions .v-btn:last-of-type{margin-left:14px}.v-data-iterator__actions__range-controls{display:flex;align-items:center;min-height:48px}.v-data-iterator__actions__pagination{display:block;text-align:center;margin:0 32px 0 24px}.v-data-iterator__actions__select{display:flex;align-items:center;justify-content:center;margin-right:14px}.v-data-iterator__actions__select .v-select{margin:13px 0 13px 34px;padding:0;position:static}.v-data-iterator__actions__select .v-select .v-select__selection--comma{font-size:12px}.application .theme--light.v-overflow-btn .v-input__control:before,.application .theme--light.v-overflow-btn .v-input__slot:before,.theme--light .v-overflow-btn .v-input__control:before,.theme--light .v-overflow-btn .v-input__slot:before{background-color:rgba(0,0,0,.12)!important}.application .theme--light.v-overflow-btn--editable.v-input--is-focused .v-input__append-inner,.application .theme--light.v-overflow-btn--editable.v-select--is-menu-active .v-input__append-inner,.application .theme--light.v-overflow-btn--editable:hover .v-input__append-inner,.application .theme--light.v-overflow-btn--segmented .v-input__append-inner,.theme--light .v-overflow-btn--editable.v-input--is-focused .v-input__append-inner,.theme--light .v-overflow-btn--editable.v-select--is-menu-active .v-input__append-inner,.theme--light .v-overflow-btn--editable:hover .v-input__append-inner,.theme--light .v-overflow-btn--segmented .v-input__append-inner{border-left:1px solid rgba(0,0,0,.12)}.application .theme--light.v-overflow-btn.v-input--is-focused .v-input__slot,.application .theme--light.v-overflow-btn.v-select--is-menu-active .v-input__slot,.application .theme--light.v-overflow-btn:hover .v-input__slot,.theme--light .v-overflow-btn.v-input--is-focused .v-input__slot,.theme--light .v-overflow-btn.v-select--is-menu-active .v-input__slot,.theme--light .v-overflow-btn:hover .v-input__slot{background:#fff}.application .theme--dark.v-overflow-btn .v-input__control:before,.application .theme--dark.v-overflow-btn .v-input__slot:before,.theme--dark .v-overflow-btn .v-input__control:before,.theme--dark .v-overflow-btn .v-input__slot:before{background-color:hsla(0,0%,100%,.12)!important}.application .theme--dark.v-overflow-btn--editable.v-input--is-focused .v-input__append-inner,.application .theme--dark.v-overflow-btn--editable.v-select--is-menu-active .v-input__append-inner,.application .theme--dark.v-overflow-btn--editable:hover .v-input__append-inner,.application .theme--dark.v-overflow-btn--segmented .v-input__append-inner,.theme--dark .v-overflow-btn--editable.v-input--is-focused .v-input__append-inner,.theme--dark .v-overflow-btn--editable.v-select--is-menu-active .v-input__append-inner,.theme--dark .v-overflow-btn--editable:hover .v-input__append-inner,.theme--dark .v-overflow-btn--segmented .v-input__append-inner{border-left:1px solid hsla(0,0%,100%,.12)}.application .theme--dark.v-overflow-btn.v-input--is-focused .v-input__slot,.application .theme--dark.v-overflow-btn.v-select--is-menu-active .v-input__slot,.application .theme--dark.v-overflow-btn:hover .v-input__slot,.theme--dark .v-overflow-btn.v-input--is-focused .v-input__slot,.theme--dark .v-overflow-btn.v-select--is-menu-active .v-input__slot,.theme--dark .v-overflow-btn:hover .v-input__slot{background:#424242}.v-overflow-btn{margin-top:12px}.v-overflow-btn:not(.v-overflow-btn--editable) .v-menu__activator,.v-overflow-btn:not(.v-overflow-btn--editable) .v-menu__activator *{cursor:pointer}.v-overflow-btn .v-select__slot{height:48px}.v-overflow-btn .v-select__selection--comma:first-child,.v-overflow-btn .v-select__slot input{margin-left:16px}.v-overflow-btn .v-input__slot{transition:.3s cubic-bezier(.25,.8,.5,1)}.v-overflow-btn .v-input__slot:after{content:none}.v-overflow-btn .v-label{margin-left:16px;top:calc(50% - 10px)}.v-overflow-btn .v-input__append-inner{width:48px;height:48px;align-self:auto;align-items:center;margin-top:0;padding:0;flex-shrink:0}.v-overflow-btn .v-input__append-outer,.v-overflow-btn .v-input__prepend-outer{margin-top:12px;margin-bottom:12px}.v-overflow-btn .v-input__control:before{height:1px;top:-1px;content:\"\";left:0;position:absolute;transition:.3s cubic-bezier(.25,.8,.5,1);width:100%}.v-overflow-btn.v-input--is-focused .v-input__slot,.v-overflow-btn.v-select--is-menu-active .v-input__slot{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-overflow-btn .v-select__selections{width:0}.v-overflow-btn--segmented .v-select__selections{flex-wrap:nowrap}.v-overflow-btn--segmented .v-select__selections .v-btn{border-radius:0;margin:0;margin-right:-16px;height:48px;width:100%}.v-overflow-btn--segmented .v-select__selections .v-btn__content{justify-content:start}.v-overflow-btn--segmented .v-select__selections .v-btn__content:before{background-color:transparent}.v-overflow-btn--editable .v-input__append-inner,.v-overflow-btn--editable .v-input__append-inner *{cursor:pointer}.application .theme--light.v-table,.theme--light .v-table{background-color:#fff;color:rgba(0,0,0,.87)}.application .theme--light.v-table thead tr:first-child,.theme--light .v-table thead tr:first-child{border-bottom:1px solid rgba(0,0,0,.12)}.application .theme--light.v-table thead th,.theme--light .v-table thead th{color:rgba(0,0,0,.54)}.application .theme--light.v-table tbody tr:not(:last-child),.theme--light .v-table tbody tr:not(:last-child){border-bottom:1px solid rgba(0,0,0,.12)}.application .theme--light.v-table tbody tr[active],.theme--light .v-table tbody tr[active]{background:#f5f5f5}.application .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row),.theme--light .v-table tbody tr:hover:not(.v-datatable__expand-row){background:#eee}.application .theme--light.v-table tfoot tr,.theme--light .v-table tfoot tr{border-top:1px solid rgba(0,0,0,.12)}.application .theme--dark.v-table,.theme--dark .v-table{background-color:#424242;color:#fff}.application .theme--dark.v-table thead tr:first-child,.theme--dark .v-table thead tr:first-child{border-bottom:1px solid hsla(0,0%,100%,.12)}.application .theme--dark.v-table thead th,.theme--dark .v-table thead th{color:hsla(0,0%,100%,.7)}.application .theme--dark.v-table tbody tr:not(:last-child),.theme--dark .v-table tbody tr:not(:last-child){border-bottom:1px solid hsla(0,0%,100%,.12)}.application .theme--dark.v-table tbody tr[active],.theme--dark .v-table tbody tr[active]{background:#505050}.application .theme--dark.v-table tbody tr:hover:not(.v-datatable__expand-row),.theme--dark .v-table tbody tr:hover:not(.v-datatable__expand-row){background:#616161}.application .theme--dark.v-table tfoot tr,.theme--dark .v-table tfoot tr{border-top:1px solid hsla(0,0%,100%,.12)}.v-table__overflow{width:100%;overflow-x:auto;overflow-y:hidden}table.v-table{border-radius:2px;border-collapse:collapse;border-spacing:0;width:100%;max-width:100%}table.v-table tbody td:first-child,table.v-table tbody td:not(:first-child),table.v-table tbody th:first-child,table.v-table tbody th:not(:first-child),table.v-table thead td:first-child,table.v-table thead td:not(:first-child),table.v-table thead th:first-child,table.v-table thead th:not(:first-child){padding:0 24px}table.v-table thead tr{height:56px}table.v-table thead th{font-weight:500;font-size:12px;transition:.3s cubic-bezier(.25,.8,.5,1);white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}table.v-table thead th.sortable{pointer-events:auto}table.v-table thead th>div{width:100%}table.v-table tbody tr{transition:background .3s cubic-bezier(.25,.8,.5,1);will-change:background}table.v-table tbody td,table.v-table tbody th{height:48px}table.v-table tbody td{font-weight:400;font-size:13px}table.v-table .input-group--selection-controls{padding:0}table.v-table .input-group--selection-controls .input-group__details{display:none}table.v-table .input-group--selection-controls.checkbox .v-icon{left:50%;transform:translateX(-50%)}table.v-table .input-group--selection-controls.checkbox .input-group--selection-controls__ripple{left:50%;transform:translate(-50%,-50%)}table.v-table tfoot tr{height:48px}table.v-table tfoot tr td{padding:0 24px}.application .theme--light.v-datatable thead th.column.sortable i,.theme--light .v-datatable thead th.column.sortable i{color:rgba(0,0,0,.38)}.application .theme--light.v-datatable thead th.column.sortable.active,.application .theme--light.v-datatable thead th.column.sortable.active i,.application .theme--light.v-datatable thead th.column.sortable:hover,.theme--light .v-datatable thead th.column.sortable.active,.theme--light .v-datatable thead th.column.sortable.active i,.theme--light .v-datatable thead th.column.sortable:hover{color:rgba(0,0,0,.87)}.application .theme--light.v-datatable .v-datatable__actions,.theme--light .v-datatable .v-datatable__actions{background-color:#fff;color:rgba(0,0,0,.54);border-top:1px solid rgba(0,0,0,.12)}.application .theme--dark.v-datatable thead th.column.sortable i,.theme--dark .v-datatable thead th.column.sortable i{color:hsla(0,0%,100%,.5)}.application .theme--dark.v-datatable thead th.column.sortable.active,.application .theme--dark.v-datatable thead th.column.sortable.active i,.application .theme--dark.v-datatable thead th.column.sortable:hover,.theme--dark .v-datatable thead th.column.sortable.active,.theme--dark .v-datatable thead th.column.sortable.active i,.theme--dark .v-datatable thead th.column.sortable:hover{color:#fff}.application .theme--dark.v-datatable .v-datatable__actions,.theme--dark .v-datatable .v-datatable__actions{background-color:#424242;color:hsla(0,0%,100%,.7);border-top:1px solid hsla(0,0%,100%,.12)}.v-datatable .v-input--selection-controls{margin:0}.v-datatable thead th.column.sortable{cursor:pointer;outline:0}.v-datatable thead th.column.sortable i{font-size:16px;vertical-align:sub;display:inline-block;opacity:0;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-datatable thead th.column.sortable:focus i,.v-datatable thead th.column.sortable:hover i{opacity:.6}.v-datatable thead th.column.sortable.active{transform:none}.v-datatable thead th.column.sortable.active i{opacity:1}.v-datatable thead th.column.sortable.active.desc i{transform:rotate(-180deg)}.v-datatable__actions{display:flex;justify-content:flex-end;align-items:center;font-size:12px;flex-wrap:wrap-reverse}.v-datatable__actions .v-btn{color:inherit}.v-datatable__actions .v-btn:last-of-type{margin-left:14px}.v-datatable__actions__range-controls{display:flex;align-items:center;min-height:48px}.v-datatable__actions__pagination{display:block;text-align:center;margin:0 32px 0 24px}.v-datatable__actions__select{display:flex;align-items:center;justify-content:flex-end;margin-right:14px;white-space:nowrap}.v-datatable__actions__select .v-select{flex:0 1 0;margin:13px 0 13px 34px;padding:0;position:static}.v-datatable__actions__select .v-select .v-select__selection--comma{font-size:12px}.v-datatable__progress,.v-datatable__progress td,.v-datatable__progress th,.v-datatable__progress tr{height:auto!important}.v-datatable__progress th{padding:0!important}.v-datatable__progress th .v-progress-linear{top:-2px;margin:0 0 -2px}.v-datatable__expand-row{border:none!important}.v-datatable__expand-col{padding:0!important;height:0!important}.v-datatable__expand-col--expanded{border-bottom:1px solid rgba(0,0,0,.12)}.v-datatable__expand-content{transition:height .3s cubic-bezier(.25,.8,.5,1)}.v-datatable__expand-content>.card{border-radius:0;box-shadow:none}.application .theme--light.v-small-dialog__actions,.application .theme--light.v-small-dialog__content,.theme--light .v-small-dialog__actions,.theme--light .v-small-dialog__content{background:#fff}.application .theme--light.v-small-dialog a,.theme--light .v-small-dialog a{color:rgba(0,0,0,.87)}.application .theme--dark.v-small-dialog__actions,.application .theme--dark.v-small-dialog__content,.theme--dark .v-small-dialog__actions,.theme--dark .v-small-dialog__content{background:#424242}.application .theme--dark.v-small-dialog a,.theme--dark .v-small-dialog a{color:#fff}.v-small-dialog{display:block;width:100%;height:100%}.v-small-dialog__content{padding:0 24px}.v-small-dialog__actions{text-align:right}.v-small-dialog a{display:flex;align-items:center;height:100%;text-decoration:none}.v-small-dialog a>*{width:100%}.v-small-dialog .v-menu__activator{height:100%}.application--is-rtl .v-date-picker-title .v-picker__title__btn{text-align:right}.v-date-picker-title{display:flex;justify-content:space-between;flex-direction:column;flex-wrap:wrap;line-height:1}.v-date-picker-title__year{align-items:center;display:inline-flex;font-size:14px;font-weight:500;margin-bottom:8px}.v-date-picker-title__date{font-size:34px;text-align:left;font-weight:500;position:relative;overflow:hidden}.v-date-picker-title__date>div{position:relative}.application .theme--light.v-date-picker-header .v-date-picker-header__value:not(.v-date-picker-header__value--disabled) strong:not(:hover),.theme--light .v-date-picker-header .v-date-picker-header__value:not(.v-date-picker-header__value--disabled) strong:not(:hover){color:rgba(0,0,0,.87)!important}.application .theme--light.v-date-picker-header .v-date-picker-header__value--disabled strong,.theme--light .v-date-picker-header .v-date-picker-header__value--disabled strong{color:rgba(0,0,0,.38)}.application .theme--dark.v-date-picker-header .v-date-picker-header__value:not(.v-date-picker-header__value--disabled) strong:not(:hover),.theme--dark .v-date-picker-header .v-date-picker-header__value:not(.v-date-picker-header__value--disabled) strong:not(:hover){color:#fff!important}.application .theme--dark.v-date-picker-header .v-date-picker-header__value--disabled strong,.theme--dark .v-date-picker-header .v-date-picker-header__value--disabled strong{color:hsla(0,0%,100%,.5)}.v-date-picker-header{padding:4px 16px;align-items:center;display:flex;justify-content:space-between;position:relative}.v-date-picker-header .v-btn{margin:0;z-index:auto}.v-date-picker-header .v-icon{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-date-picker-header__value{flex:1;text-align:center;position:relative;overflow:hidden}.v-date-picker-header__value strong{cursor:pointer;transition:.3s cubic-bezier(.25,.8,.5,1);display:block;width:100%}.application .theme--light.v-date-picker-table th,.theme--light .v-date-picker-table th{color:rgba(0,0,0,.38)}.application .theme--dark.v-date-picker-table th,.theme--dark .v-date-picker-table th{color:hsla(0,0%,100%,.5)}.v-date-picker-table{position:relative;padding:0 12px;height:242px}.v-date-picker-table table{transition:.3s cubic-bezier(.25,.8,.5,1);top:0;table-layout:fixed;width:100%}.v-date-picker-table td,.v-date-picker-table th{text-align:center;position:relative}.v-date-picker-table th{font-size:12px}.v-date-picker-table--date .v-btn{height:32px;width:32px}.v-date-picker-table .v-btn{z-index:auto;margin:0;font-size:12px}.v-date-picker-table .v-btn.v-btn--active{color:#fff}.v-date-picker-table--month td{width:33.333333%;height:56px;vertical-align:middle;text-align:center}.v-date-picker-table--month td .v-btn{margin:0 auto;max-width:160px;min-width:40px;width:100%}.v-date-picker-table--date th{padding:8px 0;font-weight:600}.v-date-picker-table--date td{width:45px}.v-date-picker-table__event{border-radius:50%;bottom:2px;content:\"\";display:block;height:8px;left:50%;position:absolute;transform:translateX(-4px);width:8px}.v-date-picker-years{font-size:16px;font-weight:400;height:334px;list-style-type:none;overflow:auto;padding:0;text-align:center}.v-date-picker-years li{cursor:pointer;padding:8px 0;transition:none}.v-date-picker-years li.active{font-size:26px;font-weight:500;padding:10px 0}.v-date-picker-years li:hover{background:rgba(0,0,0,.12)}.v-picker--landscape .v-date-picker-years{height:286px}.application .theme--light.v-picker__title,.theme--light .v-picker__title{background:#e0e0e0}.application .theme--dark.v-picker__title,.theme--dark .v-picker__title{background:#616161}.application .theme--light.v-picker__body,.theme--light .v-picker__body{background:#fff}.application .theme--dark.v-picker__body,.theme--dark .v-picker__body{background:#424242}.v-picker{border-radius:2px;contain:layout style;display:inline-flex;flex-direction:column;vertical-align:top}.v-picker--full-width{display:flex}.v-picker__title{color:#fff;border-top-left-radius:2px;border-top-right-radius:2px;padding:16px}.v-picker__title__btn{transition:.3s cubic-bezier(.25,.8,.5,1)}.v-picker__title__btn.active{opacity:1}.v-picker__title__btn:not(.active){opacity:.6;cursor:pointer}.v-picker__title__btn:not(.active):hover{opacity:1}.v-picker__body{height:auto;overflow:hidden;position:relative;z-index:0;flex:1 0 auto;display:flex;flex-direction:column;align-items:center}.v-picker__body>div{width:100%}.v-picker__body>div.fade-transition-leave-active{position:absolute}.v-picker--landscape .v-picker__title{border-top-right-radius:0;border-bottom-right-radius:0;width:170px;position:absolute;top:0;left:0;height:100%;z-index:1}.v-picker--landscape .v-picker__actions,.v-picker--landscape .v-picker__body{margin-left:170px}.application .theme--light.v-expansion-panel .v-expansion-panel__container,.theme--light .v-expansion-panel .v-expansion-panel__container{border-top:1px solid rgba(0,0,0,.12);background-color:#fff;color:rgba(0,0,0,.87)}.application .theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon,.theme--light .v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon{color:rgba(0,0,0,.54)}.application .theme--light.v-expansion-panel .v-expansion-panel__container--disabled,.theme--light .v-expansion-panel .v-expansion-panel__container--disabled{color:rgba(0,0,0,.38)}.application .theme--light.v-expansion-panel--focusable .v-expansion-panel__container:focus,.theme--light .v-expansion-panel--focusable .v-expansion-panel__container:focus{background-color:#eee}.application .theme--dark.v-expansion-panel .v-expansion-panel__container,.theme--dark .v-expansion-panel .v-expansion-panel__container{border-top:1px solid hsla(0,0%,100%,.12);background-color:#424242;color:#fff}.application .theme--dark.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon,.theme--dark .v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon{color:#fff}.application .theme--dark.v-expansion-panel .v-expansion-panel__container--disabled,.theme--dark .v-expansion-panel .v-expansion-panel__container--disabled{color:hsla(0,0%,100%,.5)}.application .theme--dark.v-expansion-panel--focusable .v-expansion-panel__container:focus,.theme--dark .v-expansion-panel--focusable .v-expansion-panel__container:focus{background-color:#494949}.v-expansion-panel{display:flex;flex-wrap:wrap;justify-content:center;list-style-type:none;padding:0;text-align:left;width:100%;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.v-expansion-panel__container{flex:1 0 100%;max-width:100%;outline:none;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-expansion-panel__container:first-child{border-top:none!important}.v-expansion-panel__container .v-expansion-panel__header__iconnel__header__icon{margin-left:auto}.v-expansion-panel__container--disabled .v-expansion-panel__header{pointer-events:none}.v-expansion-panel__container--active>.v-expansion-panel__header .v-expansion-panel__header__icon .v-icon{transform:rotate(-180deg)}.v-expansion-panel__header{display:flex;cursor:pointer;align-items:center;position:relative;padding:12px 24px;height:48px}.v-expansion-panel__header>:not(.v-expansion-panel__header__icon){flex:1 1 auto}.v-expansion-panel__body{transition:.3s cubic-bezier(.25,.8,.5,1)}.v-expansion-panel__body .v-card{border-radius:0}.v-expansion-panel--inset,.v-expansion-panel--popout,.v-expansion-panel__body .v-card{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.v-expansion-panel--inset .v-expansion-panel__container--active,.v-expansion-panel--popout .v-expansion-panel__container--active{margin:16px;box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.v-expansion-panel--inset .v-expansion-panel__container,.v-expansion-panel--popout .v-expansion-panel__container{max-width:95%}.v-expansion-panel--popout .v-expansion-panel__container--active{max-width:100%}.v-expansion-panel--inset .v-expansion-panel__container--active{max-width:85%}.application .theme--light.v-footer,.theme--light .v-footer{background:#f5f5f5;color:rgba(0,0,0,.87)}.application .theme--dark.v-footer,.theme--dark .v-footer{background:#212121;color:#fff}.v-footer{align-items:center;display:flex;flex:0 1 auto!important;min-height:36px;transition:.2s cubic-bezier(.4,0,.2,1)}.v-footer--absolute,.v-footer--fixed{bottom:0;left:0;width:100%;z-index:3}.v-footer--inset{z-index:2}.v-footer--absolute{position:absolute}.v-footer--fixed{position:fixed}.v-form>.container{padding:16px}.v-form>.container>.layout>.flex{padding:8px}.v-form>.container>.layout:only-child{margin:-8px}.v-form>.container>.layout:not(:only-child){margin:auto -8px}.v-content{transition:none;display:flex;flex:1 0 auto;max-width:100%}.v-content[data-booted=true]{transition:.2s cubic-bezier(.4,0,.2,1)}.v-content__wrap{flex:1 1 auto;max-width:100%;position:relative}@media print{@-moz-document url-prefix(){.v-content{display:block}}}.container{flex:1 1 100%;margin:auto;padding:24px;width:100%}.container.fluid{max-width:100%}.container.fill-height{align-items:center;display:flex}.container.fill-height>.layout{height:100%;flex:1 1 auto}.container.grid-list-xs .layout .flex{padding:1px}.container.grid-list-xs .layout:only-child{margin:-1px}.container.grid-list-xs .layout:not(:only-child){margin:auto -1px}.container.grid-list-xs :not(:only-child) .layout:first-child{margin-top:-1px}.container.grid-list-xs :not(:only-child) .layout:last-child{margin-bottom:-1px}.container.grid-list-sm .layout .flex{padding:2px}.container.grid-list-sm .layout:only-child{margin:-2px}.container.grid-list-sm .layout:not(:only-child){margin:auto -2px}.container.grid-list-sm :not(:only-child) .layout:first-child{margin-top:-2px}.container.grid-list-sm :not(:only-child) .layout:last-child{margin-bottom:-2px}.container.grid-list-md .layout .flex{padding:4px}.container.grid-list-md .layout:only-child{margin:-4px}.container.grid-list-md .layout:not(:only-child){margin:auto -4px}.container.grid-list-md :not(:only-child) .layout:first-child{margin-top:-4px}.container.grid-list-md :not(:only-child) .layout:last-child{margin-bottom:-4px}.container.grid-list-lg .layout .flex{padding:8px}.container.grid-list-lg .layout:only-child{margin:-8px}.container.grid-list-lg .layout:not(:only-child){margin:auto -8px}.container.grid-list-lg :not(:only-child) .layout:first-child{margin-top:-8px}.container.grid-list-lg :not(:only-child) .layout:last-child{margin-bottom:-8px}.container.grid-list-xl .layout .flex{padding:12px}.container.grid-list-xl .layout:only-child{margin:-12px}.container.grid-list-xl .layout:not(:only-child){margin:auto -12px}.container.grid-list-xl :not(:only-child) .layout:first-child{margin-top:-12px}.container.grid-list-xl :not(:only-child) .layout:last-child{margin-bottom:-12px}.layout{display:flex;flex:1 1 auto;flex-wrap:nowrap;min-width:0}.layout.row{flex-direction:row}.layout.row.reverse{flex-direction:row-reverse}.layout.column{flex-direction:column}.layout.column.reverse{flex-direction:column-reverse}.layout.column>.flex{max-width:100%}.layout.wrap{flex-wrap:wrap}.child-flex>*,.flex{flex:1 1 auto;max-width:100%}.align-start{align-items:flex-start}.align-end{align-items:flex-end}.align-center{align-items:center}.align-baseline{align-items:baseline}.align-content-start{align-content:flex-start}.align-content-end{align-content:flex-end}.align-content-center{align-content:center}.align-content-space-between{align-content:space-between}.align-content-space-around{align-content:space-around}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-space-around{justify-content:space-around}.justify-space-between{justify-content:space-between}.grow,.spacer{flex-grow:1!important}.grow{flex-shrink:0!important}.shrink{flex-grow:0!important;flex-shrink:1!important}.scroll-y{overflow-y:auto}.fill-height{height:100%}.hide-overflow{overflow:hidden!important}.show-overflow{overflow:visible!important}.ellipsis,.no-wrap{white-space:nowrap}.ellipsis{overflow:hidden;text-overflow:ellipsis}.d-flex{display:flex!important}.d-inline-flex{display:inline-flex!important}.d-flex>*,.d-inline-flex>*{flex:1 1 auto!important}.d-block{display:block!important}.d-inline-block{display:inline-block!important}.d-inline{display:inline!important}@media only screen and (min-width:960px){.container{max-width:900px}}@media only screen and (min-width:1264px){.container{max-width:1185px}}@media only screen and (min-width:1904px){.container{max-width:1785px}}@media only screen and (max-width:959px){.container{padding:16px}}@media (min-width:0){.flex.xs1{flex-basis:8.333333333333332%;flex-grow:0;max-width:8.333333333333332%}.flex.order-xs1{order:1}.flex.xs2{flex-basis:16.666666666666664%;flex-grow:0;max-width:16.666666666666664%}.flex.order-xs2{order:2}.flex.xs3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-xs3{order:3}.flex.xs4{flex-basis:33.33333333333333%;flex-grow:0;max-width:33.33333333333333%}.flex.order-xs4{order:4}.flex.xs5{flex-basis:41.66666666666667%;flex-grow:0;max-width:41.66666666666667%}.flex.order-xs5{order:5}.flex.xs6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-xs6{order:6}.flex.xs7{flex-basis:58.333333333333336%;flex-grow:0;max-width:58.333333333333336%}.flex.order-xs7{order:7}.flex.xs8{flex-basis:66.66666666666666%;flex-grow:0;max-width:66.66666666666666%}.flex.order-xs8{order:8}.flex.xs9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-xs9{order:9}.flex.xs10{flex-basis:83.33333333333334%;flex-grow:0;max-width:83.33333333333334%}.flex.order-xs10{order:10}.flex.xs11{flex-basis:91.66666666666666%;flex-grow:0;max-width:91.66666666666666%}.flex.order-xs11{order:11}.flex.xs12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-xs12{order:12}.flex.offset-xs0{margin-left:0}.flex.offset-xs1{margin-left:8.333333333333332%}.flex.offset-xs2{margin-left:16.666666666666664%}.flex.offset-xs3{margin-left:25%}.flex.offset-xs4{margin-left:33.33333333333333%}.flex.offset-xs5{margin-left:41.66666666666667%}.flex.offset-xs6{margin-left:50%}.flex.offset-xs7{margin-left:58.333333333333336%}.flex.offset-xs8{margin-left:66.66666666666666%}.flex.offset-xs9{margin-left:75%}.flex.offset-xs10{margin-left:83.33333333333334%}.flex.offset-xs11{margin-left:91.66666666666666%}.flex.offset-xs12{margin-left:100%}}@media (min-width:600px){.flex.sm1{flex-basis:8.333333333333332%;flex-grow:0;max-width:8.333333333333332%}.flex.order-sm1{order:1}.flex.sm2{flex-basis:16.666666666666664%;flex-grow:0;max-width:16.666666666666664%}.flex.order-sm2{order:2}.flex.sm3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-sm3{order:3}.flex.sm4{flex-basis:33.33333333333333%;flex-grow:0;max-width:33.33333333333333%}.flex.order-sm4{order:4}.flex.sm5{flex-basis:41.66666666666667%;flex-grow:0;max-width:41.66666666666667%}.flex.order-sm5{order:5}.flex.sm6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-sm6{order:6}.flex.sm7{flex-basis:58.333333333333336%;flex-grow:0;max-width:58.333333333333336%}.flex.order-sm7{order:7}.flex.sm8{flex-basis:66.66666666666666%;flex-grow:0;max-width:66.66666666666666%}.flex.order-sm8{order:8}.flex.sm9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-sm9{order:9}.flex.sm10{flex-basis:83.33333333333334%;flex-grow:0;max-width:83.33333333333334%}.flex.order-sm10{order:10}.flex.sm11{flex-basis:91.66666666666666%;flex-grow:0;max-width:91.66666666666666%}.flex.order-sm11{order:11}.flex.sm12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-sm12{order:12}.flex.offset-sm0{margin-left:0}.flex.offset-sm1{margin-left:8.333333333333332%}.flex.offset-sm2{margin-left:16.666666666666664%}.flex.offset-sm3{margin-left:25%}.flex.offset-sm4{margin-left:33.33333333333333%}.flex.offset-sm5{margin-left:41.66666666666667%}.flex.offset-sm6{margin-left:50%}.flex.offset-sm7{margin-left:58.333333333333336%}.flex.offset-sm8{margin-left:66.66666666666666%}.flex.offset-sm9{margin-left:75%}.flex.offset-sm10{margin-left:83.33333333333334%}.flex.offset-sm11{margin-left:91.66666666666666%}.flex.offset-sm12{margin-left:100%}}@media (min-width:960px){.flex.md1{flex-basis:8.333333333333332%;flex-grow:0;max-width:8.333333333333332%}.flex.order-md1{order:1}.flex.md2{flex-basis:16.666666666666664%;flex-grow:0;max-width:16.666666666666664%}.flex.order-md2{order:2}.flex.md3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-md3{order:3}.flex.md4{flex-basis:33.33333333333333%;flex-grow:0;max-width:33.33333333333333%}.flex.order-md4{order:4}.flex.md5{flex-basis:41.66666666666667%;flex-grow:0;max-width:41.66666666666667%}.flex.order-md5{order:5}.flex.md6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-md6{order:6}.flex.md7{flex-basis:58.333333333333336%;flex-grow:0;max-width:58.333333333333336%}.flex.order-md7{order:7}.flex.md8{flex-basis:66.66666666666666%;flex-grow:0;max-width:66.66666666666666%}.flex.order-md8{order:8}.flex.md9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-md9{order:9}.flex.md10{flex-basis:83.33333333333334%;flex-grow:0;max-width:83.33333333333334%}.flex.order-md10{order:10}.flex.md11{flex-basis:91.66666666666666%;flex-grow:0;max-width:91.66666666666666%}.flex.order-md11{order:11}.flex.md12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-md12{order:12}.flex.offset-md0{margin-left:0}.flex.offset-md1{margin-left:8.333333333333332%}.flex.offset-md2{margin-left:16.666666666666664%}.flex.offset-md3{margin-left:25%}.flex.offset-md4{margin-left:33.33333333333333%}.flex.offset-md5{margin-left:41.66666666666667%}.flex.offset-md6{margin-left:50%}.flex.offset-md7{margin-left:58.333333333333336%}.flex.offset-md8{margin-left:66.66666666666666%}.flex.offset-md9{margin-left:75%}.flex.offset-md10{margin-left:83.33333333333334%}.flex.offset-md11{margin-left:91.66666666666666%}.flex.offset-md12{margin-left:100%}}@media (min-width:1264px){.flex.lg1{flex-basis:8.333333333333332%;flex-grow:0;max-width:8.333333333333332%}.flex.order-lg1{order:1}.flex.lg2{flex-basis:16.666666666666664%;flex-grow:0;max-width:16.666666666666664%}.flex.order-lg2{order:2}.flex.lg3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-lg3{order:3}.flex.lg4{flex-basis:33.33333333333333%;flex-grow:0;max-width:33.33333333333333%}.flex.order-lg4{order:4}.flex.lg5{flex-basis:41.66666666666667%;flex-grow:0;max-width:41.66666666666667%}.flex.order-lg5{order:5}.flex.lg6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-lg6{order:6}.flex.lg7{flex-basis:58.333333333333336%;flex-grow:0;max-width:58.333333333333336%}.flex.order-lg7{order:7}.flex.lg8{flex-basis:66.66666666666666%;flex-grow:0;max-width:66.66666666666666%}.flex.order-lg8{order:8}.flex.lg9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-lg9{order:9}.flex.lg10{flex-basis:83.33333333333334%;flex-grow:0;max-width:83.33333333333334%}.flex.order-lg10{order:10}.flex.lg11{flex-basis:91.66666666666666%;flex-grow:0;max-width:91.66666666666666%}.flex.order-lg11{order:11}.flex.lg12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-lg12{order:12}.flex.offset-lg0{margin-left:0}.flex.offset-lg1{margin-left:8.333333333333332%}.flex.offset-lg2{margin-left:16.666666666666664%}.flex.offset-lg3{margin-left:25%}.flex.offset-lg4{margin-left:33.33333333333333%}.flex.offset-lg5{margin-left:41.66666666666667%}.flex.offset-lg6{margin-left:50%}.flex.offset-lg7{margin-left:58.333333333333336%}.flex.offset-lg8{margin-left:66.66666666666666%}.flex.offset-lg9{margin-left:75%}.flex.offset-lg10{margin-left:83.33333333333334%}.flex.offset-lg11{margin-left:91.66666666666666%}.flex.offset-lg12{margin-left:100%}}@media (min-width:1904px){.flex.xl1{flex-basis:8.333333333333332%;flex-grow:0;max-width:8.333333333333332%}.flex.order-xl1{order:1}.flex.xl2{flex-basis:16.666666666666664%;flex-grow:0;max-width:16.666666666666664%}.flex.order-xl2{order:2}.flex.xl3{flex-basis:25%;flex-grow:0;max-width:25%}.flex.order-xl3{order:3}.flex.xl4{flex-basis:33.33333333333333%;flex-grow:0;max-width:33.33333333333333%}.flex.order-xl4{order:4}.flex.xl5{flex-basis:41.66666666666667%;flex-grow:0;max-width:41.66666666666667%}.flex.order-xl5{order:5}.flex.xl6{flex-basis:50%;flex-grow:0;max-width:50%}.flex.order-xl6{order:6}.flex.xl7{flex-basis:58.333333333333336%;flex-grow:0;max-width:58.333333333333336%}.flex.order-xl7{order:7}.flex.xl8{flex-basis:66.66666666666666%;flex-grow:0;max-width:66.66666666666666%}.flex.order-xl8{order:8}.flex.xl9{flex-basis:75%;flex-grow:0;max-width:75%}.flex.order-xl9{order:9}.flex.xl10{flex-basis:83.33333333333334%;flex-grow:0;max-width:83.33333333333334%}.flex.order-xl10{order:10}.flex.xl11{flex-basis:91.66666666666666%;flex-grow:0;max-width:91.66666666666666%}.flex.order-xl11{order:11}.flex.xl12{flex-basis:100%;flex-grow:0;max-width:100%}.flex.order-xl12{order:12}.flex.offset-xl0{margin-left:0}.flex.offset-xl1{margin-left:8.333333333333332%}.flex.offset-xl2{margin-left:16.666666666666664%}.flex.offset-xl3{margin-left:25%}.flex.offset-xl4{margin-left:33.33333333333333%}.flex.offset-xl5{margin-left:41.66666666666667%}.flex.offset-xl6{margin-left:50%}.flex.offset-xl7{margin-left:58.333333333333336%}.flex.offset-xl8{margin-left:66.66666666666666%}.flex.offset-xl9{margin-left:75%}.flex.offset-xl10{margin-left:83.33333333333334%}.flex.offset-xl11{margin-left:91.66666666666666%}.flex.offset-xl12{margin-left:100%}}.application .theme--light.v-navigation-drawer,.theme--light .v-navigation-drawer{background-color:#fff}.application .theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border,.theme--light .v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border{background-color:rgba(0,0,0,.12)}.application .theme--light.v-navigation-drawer .v-divider,.theme--light .v-navigation-drawer .v-divider{border-color:rgba(0,0,0,.12)}.application .theme--dark.v-navigation-drawer,.theme--dark .v-navigation-drawer{background-color:#424242}.application .theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border,.theme--dark .v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border{background-color:hsla(0,0%,100%,.12)}.application .theme--dark.v-navigation-drawer .v-divider,.theme--dark .v-navigation-drawer .v-divider{border-color:hsla(0,0%,100%,.12)}.v-navigation-drawer{transition:none;display:block;left:0;max-width:100%;overflow-y:auto;overflow-x:hidden;pointer-events:auto;top:0;will-change:transform;z-index:3;-webkit-overflow-scrolling:touch}.v-navigation-drawer[data-booted=true]{transition:.2s cubic-bezier(.4,0,.2,1);transition-property:transform,width}.v-navigation-drawer__border{position:absolute;right:0;top:0;height:100%;width:1px}.v-navigation-drawer.v-navigation-drawer--right:after{left:0;right:auto}.v-navigation-drawer--right{left:auto;right:0}.v-navigation-drawer--right>.v-navigation-drawer__border{right:auto;left:0}.v-navigation-drawer--absolute{position:absolute}.v-navigation-drawer--fixed{position:fixed}.v-navigation-drawer--floating:after{display:none}.v-navigation-drawer--mini-variant{overflow:hidden}.v-navigation-drawer--mini-variant .v-list__group__header__prepend-icon{flex:1 0 auto;justify-content:center;width:100%}.v-navigation-drawer--mini-variant .v-list__tile__action,.v-navigation-drawer--mini-variant .v-list__tile__avatar{justify-content:center;min-width:48px}.v-navigation-drawer--mini-variant .v-list__tile:after,.v-navigation-drawer--mini-variant .v-list__tile__content{opacity:0}.v-navigation-drawer--mini-variant .v-divider,.v-navigation-drawer--mini-variant .v-list--group,.v-navigation-drawer--mini-variant .v-subheader{display:none!important}.v-navigation-drawer--is-mobile,.v-navigation-drawer--temporary{z-index:6}.v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),.v-navigation-drawer--temporary:not(.v-navigation-drawer--close){box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.v-navigation-drawer .v-list{background:inherit}.v-navigation-drawer>.v-list .v-list__tile{transition:none;font-weight:500}.v-navigation-drawer>.v-list .v-list__tile--active .v-list__tile__title{color:inherit}.v-navigation-drawer>.v-list .v-list--group .v-list__tile{font-weight:400}.v-navigation-drawer>.v-list .v-list--group__header--active:after{background:transparent}.v-navigation-drawer>.v-list:not(.v-list--dense) .v-list__tile{font-size:14px}.application .theme--light.v-pagination__item,.theme--light .v-pagination__item{background:#fff;color:#000}.application .theme--light.v-pagination__item--active,.theme--light .v-pagination__item--active{color:#fff}.application .theme--light.v-pagination__navigation,.theme--light .v-pagination__navigation{background:#fff}.application .theme--light.v-pagination__navigation .v-icon,.theme--light .v-pagination__navigation .v-icon{color:rgba(0,0,0,.54)}.application .theme--dark.v-pagination__item,.theme--dark .v-pagination__item{background:#424242;color:#fff}.application .theme--dark.v-pagination__item--active,.theme--dark .v-pagination__item--active{color:#fff}.application .theme--dark.v-pagination__navigation,.theme--dark .v-pagination__navigation{background:#424242}.application .theme--dark.v-pagination__navigation .v-icon,.theme--dark .v-pagination__navigation .v-icon{color:#fff}.v-pagination{align-items:center;display:inline-flex;list-style-type:none;margin:0;max-width:100%;padding:0}.v-pagination>li{align-items:center;display:flex}.v-pagination--circle .v-pagination__item,.v-pagination--circle .v-pagination__more,.v-pagination--circle .v-pagination__navigation{border-radius:50%}.v-pagination--disabled{pointer-events:none;opacity:.6}.v-pagination__item{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);border-radius:4px;display:inline-flex;justify-content:center;align-items:center;font-size:14px;background:transparent;height:34px;width:34px;margin:.3rem;text-decoration:none;transition:.3s cubic-bezier(0,0,.2,1)}.v-pagination__item--active{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.v-pagination__navigation{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);display:inline-flex;justify-content:center;align-items:center;text-decoration:none;height:2rem;border-radius:4px;width:2rem;margin:.3rem 10px}.v-pagination__navigation .v-icon{font-size:2rem;transition:.2s cubic-bezier(.4,0,.6,1);vertical-align:middle}.v-pagination__navigation--disabled{opacity:.6;pointer-events:none}.v-pagination__more{margin:.3rem;display:inline-flex;align-items:flex-end;justify-content:center;height:2rem;width:2rem}.v-parallax{position:relative;overflow:hidden;z-index:0}.v-parallax__image-container{position:absolute;top:0;left:0;right:0;bottom:0;z-index:1;contain:strict}.v-parallax__image{position:absolute;bottom:0;left:50%;min-width:100%;min-height:100%;display:none;transform:translate(-50%);will-change:transform;transition:opacity .3s cubic-bezier(.25,.8,.5,1);z-index:1}.v-parallax__content{color:#fff;height:100%;z-index:2;position:relative;display:flex;flex-direction:column;justify-content:center;padding:0 1rem}.v-input--radio-group .v-radio{margin-bottom:8px}.v-input--radio-group__input{display:flex;width:100%}.v-input--radio-group__input>.v-label{padding-bottom:8px}.v-input--radio-group--row .v-input--radio-group__input{flex-direction:row;flex-wrap:wrap}.v-input--radio-group--column .v-input--radio-group__input{flex-direction:column}.application .theme--light.v-radio--is-disabled label,.theme--light .v-radio--is-disabled label{color:rgba(0,0,0,.38)}.application .theme--light.v-radio--is-disabled .v-icon,.theme--light .v-radio--is-disabled .v-icon{color:rgba(0,0,0,.26)!important}.application .theme--dark.v-radio--is-disabled label,.theme--dark .v-radio--is-disabled label{color:hsla(0,0%,100%,.5)}.application .theme--dark.v-radio--is-disabled .v-icon,.theme--dark .v-radio--is-disabled .v-icon{color:hsla(0,0%,100%,.3)!important}.v-radio{align-items:center;display:flex;height:auto;margin-right:16px;outline:none}.v-radio--is-disabled{pointer-events:none}.application .theme--light.v-input--range-slider.v-input--slider.v-input--is-disabled .v-slider.v-slider .v-slider__thumb,.theme--light .v-input--range-slider.v-input--slider.v-input--is-disabled .v-slider.v-slider .v-slider__thumb{background:#bdbdbd}.application .theme--dark.v-input--range-slider.v-input--slider.v-input--is-disabled .v-slider.v-slider .v-slider__thumb,.theme--dark .v-input--range-slider.v-input--slider.v-input--is-disabled .v-slider.v-slider .v-slider__thumb{background:#424242}.v-input--range-slider.v-input--is-disabled .v-slider__track-fill{display:none}.v-input--range-slider.v-input--is-disabled.v-input--slider .v-slider.v-slider .v-slider__thumb{border-color:transparent}.application .theme--light.v-input--slider .v-slider__track,.application .theme--light.v-input--slider .v-slider__track-fill,.theme--light .v-input--slider .v-slider__track,.theme--light .v-input--slider .v-slider__track-fill{background:rgba(0,0,0,.26)}.application .theme--light.v-input--slider .v-slider__track__container:after,.theme--light .v-input--slider .v-slider__track__container:after{border:1px solid rgba(0,0,0,.87)}.application .theme--light.v-input--slider .v-slider__ticks,.theme--light .v-input--slider .v-slider__ticks{border-color:rgba(0,0,0,.87);color:rgba(0,0,0,.54)}.application .theme--light.v-input--slider:not(.v-input--is-dirty) .v-slider__thumb-label,.theme--light .v-input--slider:not(.v-input--is-dirty) .v-slider__thumb-label{background:rgba(0,0,0,.26)}.application .theme--light.v-input--slider:not(.v-input--is-dirty) .v-slider__thumb,.theme--light .v-input--slider:not(.v-input--is-dirty) .v-slider__thumb{border:3px solid rgba(0,0,0,.26)}.application .theme--light.v-input--slider:not(.v-input--is-dirty).v-input--slider--is-active .v-slider__thumb,.theme--light .v-input--slider:not(.v-input--is-dirty).v-input--slider--is-active .v-slider__thumb{border:3px solid rgba(0,0,0,.38)}.application .theme--light.v-input--slider.v-input--is-disabled .v-slider__thumb,.theme--light .v-input--slider.v-input--is-disabled .v-slider__thumb{border:5px solid rgba(0,0,0,.26)}.application .theme--light.v-input--slider.v-input--is-disabled.v-input--is-dirty .v-slider__thumb,.theme--light .v-input--slider.v-input--is-disabled.v-input--is-dirty .v-slider__thumb{background:rgba(0,0,0,.26)}.application .theme--light.v-input--slider.v-input--slider--is-active .v-slider__track,.theme--light .v-input--slider.v-input--slider--is-active .v-slider__track{background:rgba(0,0,0,.38)}.application .theme--dark.v-input--slider .v-slider__track,.application .theme--dark.v-input--slider .v-slider__track-fill,.theme--dark .v-input--slider .v-slider__track,.theme--dark .v-input--slider .v-slider__track-fill{background:hsla(0,0%,100%,.2)}.application .theme--dark.v-input--slider .v-slider__track__container:after,.theme--dark .v-input--slider .v-slider__track__container:after{border:1px solid #fff}.application .theme--dark.v-input--slider .v-slider__ticks,.theme--dark .v-input--slider .v-slider__ticks{border-color:#fff;color:hsla(0,0%,100%,.7)}.application .theme--dark.v-input--slider:not(.v-input--is-dirty) .v-slider__thumb-label,.theme--dark .v-input--slider:not(.v-input--is-dirty) .v-slider__thumb-label{background:hsla(0,0%,100%,.2)}.application .theme--dark.v-input--slider:not(.v-input--is-dirty) .v-slider__thumb,.theme--dark .v-input--slider:not(.v-input--is-dirty) .v-slider__thumb{border:3px solid hsla(0,0%,100%,.2)}.application .theme--dark.v-input--slider:not(.v-input--is-dirty).v-input--slider--is-active .v-slider__thumb,.theme--dark .v-input--slider:not(.v-input--is-dirty).v-input--slider--is-active .v-slider__thumb{border:3px solid hsla(0,0%,100%,.3)}.application .theme--dark.v-input--slider.v-input--is-disabled .v-slider__thumb,.theme--dark .v-input--slider.v-input--is-disabled .v-slider__thumb{border:5px solid hsla(0,0%,100%,.2)}.application .theme--dark.v-input--slider.v-input--is-disabled.v-input--is-dirty .v-slider__thumb,.theme--dark .v-input--slider.v-input--is-disabled.v-input--is-dirty .v-slider__thumb{background:hsla(0,0%,100%,.2)}.application .theme--dark.v-input--slider.v-input--slider--is-active .v-slider__track,.theme--dark .v-input--slider.v-input--slider--is-active .v-slider__track{background:hsla(0,0%,100%,.3)}.application--is-rtl .v-input--slider .v-label{margin-left:16px;margin-right:0}.v-input--slider:not(.v-input--slider--thumb-label){margin-top:0}.v-input--slider.v-input--is-focused .v-slider__thumb-container--is-active:not(.v-slider__thumb-container--show-label):before{opacity:.2;transform:scale(1)}.v-input--slider.v-input--is-focused .v-slider__track{transition:none}.v-input--slider.v-input--is-focused.v-input--slider--ticks .v-slider .v-slider__tick,.v-input--slider.v-input--is-focused.v-input--slider--ticks .v-slider__track__container:after,.v-input--slider.v-input--slider--ticks .v-slider__ticks.v-slider__ticks--always-show{opacity:1}.v-input--slider.v-input--slider--ticks-labels .v-input__slot{margin-bottom:16px}.v-input--slider.v-input--is-readonly{pointer-events:none}.v-input--slider.v-input--is-disabled .v-slider__thumb{transform:translateY(-50%) scale(.45)}.v-input--slider.v-input--is-disabled.v-input--is-dirty .v-slider__thumb{border:0 solid transparent}.v-input--slider .v-input__slot>:first-child:not(:only-child){margin-right:16px}.v-slider{cursor:default;display:flex;align-items:center;position:relative;height:32px;flex:1;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-slider input{cursor:default;opacity:0;padding:0;width:100%}.v-slider__track__container{height:2px;left:0;overflow:hidden;pointer-events:none;position:absolute;top:50%;transform:translateY(-50%);width:100%}.v-slider__track__container:after{content:\"\";position:absolute;right:0;top:0;height:2px;transition:.3s cubic-bezier(.25,.8,.5,1);width:2px;opacity:0}.v-slider__thumb,.v-slider__ticks,.v-slider__track{position:absolute;top:0}.v-slider__track{transform-origin:right;overflow:hidden}.v-slider__track,.v-slider__track-fill{height:2px;left:0;transition:.3s cubic-bezier(.25,.8,.5,1);width:100%}.v-slider__track-fill{position:absolute;transform-origin:left}.v-slider__ticks-container{position:absolute;left:0;height:2px;width:100%;top:50%;transform:translateY(-50%)}.v-slider__ticks{opacity:0;border-style:solid;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-slider__ticks>span{position:absolute;top:8px;transform:translateX(-50%);white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-slider__ticks:first-child>span{transform:translateX(0)}.v-slider__ticks:last-child>span{transform:translateX(-100%)}.v-slider:not(.v-input--is-dirty) .v-slider__ticks:first-child{border-color:transparent}.v-slider__thumb-container{position:absolute;top:50%;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-slider__thumb-container:before{content:\"\";color:inherit;border-radius:50%;background:currentColor;height:32px;left:-16px;opacity:0;overflow:hidden;pointer-events:none;position:absolute;top:-16px;transform:scale(.2);transition:.3s cubic-bezier(0,0,.2,1);width:32px;will-change:transform,opacity}.v-slider__thumb{width:24px;height:24px;left:-12px;top:50%;border-radius:50%;background:transparent;transition:.3s cubic-bezier(.25,.8,.5,1);transform:translateY(-50%) scale(.6);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-slider--is-active .v-slider__thumb-container--is-active .v-slider__thumb{transform:translateY(-50%) scale(1)}.v-slider--is-active .v-slider__thumb-container--is-active.v-slider__thumb-container--show-label .v-slider__thumb{transform:translateY(-50%) scale(0)}.v-slider--is-active .v-slider__ticks-container .v-slider__ticks{opacity:1}.v-slider__thumb-label__container{top:0}.v-slider__thumb-label,.v-slider__thumb-label__container{position:absolute;left:0;transition:.3s cubic-bezier(.25,.8,.25,1)}.v-slider__thumb-label{display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;width:32px;height:32px;border-radius:50% 50% 0;bottom:100%;transform:translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-slider__thumb-label>*{transform:rotate(-45deg)}.v-slider__track,.v-slider__track-fill{position:absolute}.v-snack{position:fixed;display:flex;align-items:center;color:#fff;pointer-events:none;z-index:1000;font-size:14px;left:0;right:0}.v-snack--absolute{position:absolute}.v-snack--top{top:0}.v-snack--bottom{bottom:0}.v-snack__wrapper{background-color:#323232;pointer-events:auto;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.v-snack__content,.v-snack__wrapper{display:flex;align-items:center;width:100%}.v-snack__content{height:48px;padding:14px 24px;justify-content:space-between;overflow:hidden}.v-snack__content .v-btn{color:#fff;flex:0 0 auto;padding:8px;margin:0 0 0 24px;height:auto;min-width:auto;width:auto}.v-snack__content .v-btn__content{margin:-2px}.v-snack__content .v-btn:before{display:none}.v-snack--multi-line .v-snack__content{height:80px;padding:24px}.v-snack--vertical .v-snack__content{height:112px;padding:24px 24px 14px;flex-direction:column;align-items:stretch}.v-snack--vertical .v-snack__content .v-btn.v-btn{justify-content:flex-end;padding:0;margin-left:0;margin-top:24px}.v-snack--vertical .v-snack__content .v-btn__content{flex:0 0 auto;margin:0}.v-snack--auto-height .v-snack__content{height:auto}.v-snack-transition-enter-active,.v-snack-transition-leave-active{transition:transform .4s cubic-bezier(.25,.8,.5,1)}.v-snack-transition-enter-active .v-snack__content,.v-snack-transition-leave-active .v-snack__content{transition:opacity .3s linear .1s}.v-snack-transition-enter .v-snack__content{opacity:0}.v-snack-transition-enter-to .v-snack__content,.v-snack-transition-leave .v-snack__content{opacity:1}.v-snack-transition-enter.v-snack.v-snack--top,.v-snack-transition-leave-to.v-snack.v-snack--top{transform:translateY(calc(-100% - 8px))}.v-snack-transition-enter.v-snack.v-snack--bottom,.v-snack-transition-leave-to.v-snack.v-snack--bottom{transform:translateY(100%)}@media only screen and (min-width:600px){.v-snack__wrapper{width:auto;max-width:568px;min-width:288px;margin:0 auto;border-radius:2px}.v-snack--left .v-snack__wrapper{margin-left:0}.v-snack--right .v-snack__wrapper{margin-right:0}.v-snack--left,.v-snack--right{margin:0 24px}.v-snack--left.v-snack--top,.v-snack--right.v-snack--top{transform:translateY(24px)}.v-snack--left.v-snack--bottom,.v-snack--right.v-snack--bottom{transform:translateY(-24px)}.v-snack__content .v-btn:first-of-type{margin-left:42px}}.v-speed-dial{position:relative}.v-speed-dial--absolute{position:absolute}.v-speed-dial--fixed{position:fixed}.v-speed-dial--absolute,.v-speed-dial--fixed{z-index:4}.v-speed-dial--absolute>.v-btn--floating,.v-speed-dial--fixed>.v-btn--floating{margin:0}.v-speed-dial--top:not(.v-speed-dial--absolute){top:16px}.v-speed-dial--top.v-speed-dial--absolute{top:50%;transform:translateY(-50%)}.v-speed-dial--bottom:not(.v-speed-dial--absolute){bottom:16px}.v-speed-dial--bottom.v-speed-dial--absolute{bottom:50%;transform:translateY(50%)}.v-speed-dial--left{left:16px}.v-speed-dial--right{right:16px}.v-speed-dial--direction-left .v-speed-dial__list,.v-speed-dial--direction-right .v-speed-dial__list{height:100%;top:0}.v-speed-dial--direction-bottom .v-speed-dial__list,.v-speed-dial--direction-top .v-speed-dial__list{left:0;width:100%}.v-speed-dial--direction-top .v-speed-dial__list{flex-direction:column-reverse;bottom:100%}.v-speed-dial--direction-right .v-speed-dial__list{flex-direction:row;left:100%}.v-speed-dial--direction-bottom .v-speed-dial__list{flex-direction:column;top:100%}.v-speed-dial--direction-left .v-speed-dial__list{flex-direction:row-reverse;right:100%}.v-speed-dial__list{align-items:center;display:flex;justify-content:center;position:absolute}.v-speed-dial__list .v-btn:first-child{transition-delay:.05s}.v-speed-dial__list .v-btn:nth-child(2){transition-delay:.1s}.v-speed-dial__list .v-btn:nth-child(3){transition-delay:.15s}.v-speed-dial__list .v-btn:nth-child(4){transition-delay:.2s}.v-speed-dial__list .v-btn:nth-child(5){transition-delay:.25s}.v-speed-dial__list .v-btn:nth-child(6){transition-delay:.3s}.v-speed-dial__list .v-btn:nth-child(7){transition-delay:.35s}.application .theme--light.v-stepper,.theme--light .v-stepper{background:#fff}.application .theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step,.theme--light .v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step{background:rgba(0,0,0,.38)}.application .theme--light.v-stepper .v-stepper__step__step,.application .theme--light.v-stepper .v-stepper__step__step .v-icon,.theme--light .v-stepper .v-stepper__step__step,.theme--light .v-stepper .v-stepper__step__step .v-icon{color:#fff}.application .theme--light.v-stepper .v-stepper__header .v-divider,.theme--light .v-stepper .v-stepper__header .v-divider{border-color:rgba(0,0,0,.12)}.application .theme--light.v-stepper .v-stepper__step--active .v-stepper__label,.theme--light .v-stepper .v-stepper__step--active .v-stepper__label{text-shadow:0 0 0 #000}.application .theme--light.v-stepper .v-stepper__step--editable:hover,.theme--light .v-stepper .v-stepper__step--editable:hover{background:rgba(0,0,0,.06)}.application .theme--light.v-stepper .v-stepper__step--editable:hover .v-stepper__label,.theme--light .v-stepper .v-stepper__step--editable:hover .v-stepper__label{text-shadow:0 0 0 #000}.application .theme--light.v-stepper .v-stepper__step--complete .v-stepper__label,.theme--light .v-stepper .v-stepper__step--complete .v-stepper__label{color:rgba(0,0,0,.87)}.application .theme--light.v-stepper .v-stepper__step--inactive.v-stepper__step--editable:not(.v-stepper__step--error):hover .v-stepper__step__step,.theme--light .v-stepper .v-stepper__step--inactive.v-stepper__step--editable:not(.v-stepper__step--error):hover .v-stepper__step__step{background:rgba(0,0,0,.54)}.application .theme--light.v-stepper .v-stepper__label,.theme--light .v-stepper .v-stepper__label{color:rgba(0,0,0,.38)}.application .theme--light.v-stepper--non-linear .v-stepper__step:not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__label,.application .theme--light.v-stepper .v-stepper__label small,.theme--light .v-stepper--non-linear .v-stepper__step:not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__label,.theme--light .v-stepper .v-stepper__label small{color:rgba(0,0,0,.54)}.application .theme--light.v-stepper--vertical .v-stepper__content:not(:last-child),.theme--light .v-stepper--vertical .v-stepper__content:not(:last-child){border-left:1px solid rgba(0,0,0,.12)}.application .theme--dark.v-stepper,.theme--dark .v-stepper{background:#303030}.application .theme--dark.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step,.theme--dark .v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step{background:hsla(0,0%,100%,.5)}.application .theme--dark.v-stepper .v-stepper__step__step,.application .theme--dark.v-stepper .v-stepper__step__step .v-icon,.theme--dark .v-stepper .v-stepper__step__step,.theme--dark .v-stepper .v-stepper__step__step .v-icon{color:#fff}.application .theme--dark.v-stepper .v-stepper__header .v-divider,.theme--dark .v-stepper .v-stepper__header .v-divider{border-color:hsla(0,0%,100%,.12)}.application .theme--dark.v-stepper .v-stepper__step--active .v-stepper__label,.theme--dark .v-stepper .v-stepper__step--active .v-stepper__label{text-shadow:0 0 0 #fff}.application .theme--dark.v-stepper .v-stepper__step--editable:hover,.theme--dark .v-stepper .v-stepper__step--editable:hover{background:hsla(0,0%,100%,.06)}.application .theme--dark.v-stepper .v-stepper__step--editable:hover .v-stepper__label,.theme--dark .v-stepper .v-stepper__step--editable:hover .v-stepper__label{text-shadow:0 0 0 #fff}.application .theme--dark.v-stepper .v-stepper__step--complete .v-stepper__label,.theme--dark .v-stepper .v-stepper__step--complete .v-stepper__label{color:hsla(0,0%,100%,.87)}.application .theme--dark.v-stepper .v-stepper__step--inactive.v-stepper__step--editable:not(.v-stepper__step--error):hover .v-stepper__step__step,.theme--dark .v-stepper .v-stepper__step--inactive.v-stepper__step--editable:not(.v-stepper__step--error):hover .v-stepper__step__step{background:hsla(0,0%,100%,.75)}.application .theme--dark.v-stepper .v-stepper__label,.theme--dark .v-stepper .v-stepper__label{color:hsla(0,0%,100%,.5)}.application .theme--dark.v-stepper--non-linear .v-stepper__step:not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__label,.application .theme--dark.v-stepper .v-stepper__label small,.theme--dark .v-stepper--non-linear .v-stepper__step:not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__label,.theme--dark .v-stepper .v-stepper__label small{color:hsla(0,0%,100%,.7)}.application .theme--dark.v-stepper--vertical .v-stepper__content:not(:last-child),.theme--dark .v-stepper--vertical .v-stepper__content:not(:last-child){border-left:1px solid hsla(0,0%,100%,.12)}.v-stepper{overflow:hidden;position:relative}.v-stepper,.v-stepper__header{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-stepper__header{height:72px;align-items:stretch;display:flex;flex-wrap:wrap;justify-content:space-between}.v-stepper__header .v-divider{align-self:center;margin:0 -16px}.v-stepper__items{position:relative;overflow:hidden}.v-stepper__step__step{align-items:center;border-radius:50%;display:inline-flex;font-size:12px;justify-content:center;height:24px;margin-right:8px;min-width:24px;width:24px;transition:.3s cubic-bezier(.25,.8,.25,1)}.v-stepper__step__step .v-icon{font-size:18px}.v-stepper__step{align-items:center;display:flex;flex-direction:row;padding:24px;position:relative}.v-stepper__step--active .v-stepper__label{transition:.3s cubic-bezier(.4,0,.6,1)}.v-stepper__step--editable{cursor:pointer}.v-stepper__step.v-stepper__step--error .v-stepper__step__step{background:transparent;color:inherit}.v-stepper__step.v-stepper__step--error .v-stepper__step__step .v-icon{font-size:24px;color:inherit}.v-stepper__step.v-stepper__step--error .v-stepper__label{color:inherit;text-shadow:none;font-weight:500}.v-stepper__step.v-stepper__step--error .v-stepper__label small{color:inherit}.v-stepper__label{align-items:flex-start;display:flex;flex-direction:column;text-align:left}.v-stepper__label small{font-size:12px;font-weight:300;text-shadow:none}.v-stepper__wrapper{overflow:hidden;transition:none}.v-stepper__content{top:0;padding:24px 24px 16px;flex:1 0 auto;width:100%}.v-stepper__content>.v-btn{margin:24px 8px 8px 0}.v-stepper--is-booted .v-stepper__content,.v-stepper--is-booted .v-stepper__wrapper{transition:.3s cubic-bezier(.25,.8,.5,1)}.v-stepper--vertical{padding-bottom:36px}.v-stepper--vertical .v-stepper__content{margin:-8px -36px -16px 36px;padding:16px 60px 16px 23px;width:auto}.v-stepper--vertical .v-stepper__step{padding:24px 24px 16px}.v-stepper--vertical .v-stepper__step__step{margin-right:12px}.v-stepper--alt-labels .v-stepper__header{height:auto}.v-stepper--alt-labels .v-stepper__header .v-divider{margin:35px -67px 0;align-self:flex-start}.v-stepper--alt-labels .v-stepper__step{flex-direction:column;justify-content:flex-start;align-items:center;flex-basis:175px}.v-stepper--alt-labels .v-stepper__step small{align-self:center}.v-stepper--alt-labels .v-stepper__step__step{margin-right:0;margin-bottom:11px}@media only screen and (max-width:959px){.v-stepper:not(.v-stepper--vertical) .v-stepper__label{display:none}.v-stepper:not(.v-stepper--vertical) .v-stepper__step__step{margin-right:0}}.application .theme--light.v-input--switch__thumb,.theme--light .v-input--switch__thumb{color:#fafafa}.application .theme--light.v-input--switch__track,.theme--light .v-input--switch__track{color:rgba(0,0,0,.38)}.application .theme--light.v-input--switch.v-input--is-disabled .v-input--switch__thumb,.theme--light .v-input--switch.v-input--is-disabled .v-input--switch__thumb{color:#bdbdbd!important}.application .theme--light.v-input--switch.v-input--is-disabled .v-input--switch__track,.theme--light .v-input--switch.v-input--is-disabled .v-input--switch__track{color:rgba(0,0,0,.12)!important}.application .theme--dark.v-input--switch__thumb,.theme--dark .v-input--switch__thumb{color:#bdbdbd}.application .theme--dark.v-input--switch__track,.theme--dark .v-input--switch__track{color:hsla(0,0%,100%,.3)}.application .theme--dark.v-input--switch.v-input--is-disabled .v-input--switch__thumb,.theme--dark .v-input--switch.v-input--is-disabled .v-input--switch__thumb{color:#424242!important}.application .theme--dark.v-input--switch.v-input--is-disabled .v-input--switch__track,.theme--dark .v-input--switch.v-input--is-disabled .v-input--switch__track{color:hsla(0,0%,100%,.1)!important}.application--is-rtl .v-input--switch .v-input--selection-controls__ripple{left:auto;right:-14px}.application--is-rtl .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,.application--is-rtl .v-input--switch.v-input--is-dirty .v-input--switch__thumb{transform:translate(-16px)}.v-input--switch__thumb,.v-input--switch__track{background-color:currentColor;pointer-events:none;transition:inherit}.v-input--switch__track{border-radius:8px;height:14px;left:2px;opacity:.6;position:absolute;right:2px;top:calc(50% - 7px)}.v-input--switch__thumb{border-radius:50%;top:calc(50% - 10px);height:20px;position:relative;width:20px;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.v-input--switch .v-input--selection-controls__input{width:38px}.v-input--switch .v-input--selection-controls__ripple{left:-14px;top:calc(50% - 24px)}.v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,.v-input--switch.v-input--is-dirty .v-input--switch__thumb{transform:translate(16px)}.application .theme--light.v-system-bar,.theme--light .v-system-bar{background-color:#e0e0e0;color:rgba(0,0,0,.54)}.application .theme--light.v-system-bar .v-icon,.theme--light .v-system-bar .v-icon{color:rgba(0,0,0,.54)}.application .theme--light.v-system-bar--lights-out,.theme--light .v-system-bar--lights-out{background-color:hsla(0,0%,100%,.7)!important}.application .theme--dark.v-system-bar,.theme--dark .v-system-bar{background-color:#000;color:hsla(0,0%,100%,.7)}.application .theme--dark.v-system-bar .v-icon,.theme--dark .v-system-bar .v-icon{color:hsla(0,0%,100%,.7)}.application .theme--dark.v-system-bar--lights-out,.theme--dark .v-system-bar--lights-out{background-color:rgba(0,0,0,.2)!important}.v-system-bar{align-items:center;display:flex;font-size:14px;font-weight:500;padding:0 8px}.v-system-bar .v-icon{font-size:16px}.v-system-bar--absolute,.v-system-bar--fixed{left:0;top:0;width:100%;z-index:3}.v-system-bar--fixed{position:fixed}.v-system-bar--absolute{position:absolute}.v-system-bar--status .v-icon{margin-right:4px}.v-system-bar--window .v-icon{font-size:20px;margin-right:8px}.application .theme--light.v-tabs__bar,.theme--light .v-tabs__bar{background-color:#fff}.application .theme--light.v-tabs__bar .v-tabs__div,.theme--light .v-tabs__bar .v-tabs__div{color:rgba(0,0,0,.87)}.application .theme--light.v-tabs__bar .v-tabs__item--disabled,.theme--light .v-tabs__bar .v-tabs__item--disabled{color:rgba(0,0,0,.26)}.application .theme--dark.v-tabs__bar,.theme--dark .v-tabs__bar{background-color:#424242}.application .theme--dark.v-tabs__bar .v-tabs__div,.theme--dark .v-tabs__bar .v-tabs__div{color:#fff}.application .theme--dark.v-tabs__bar .v-tabs__item--disabled,.theme--dark .v-tabs__bar .v-tabs__item--disabled{color:hsla(0,0%,100%,.3)}.v-tabs,.v-tabs__bar{position:relative}.v-tabs__icon{align-items:center;cursor:pointer;display:inline-flex;height:100%;position:absolute;top:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:32px}.v-tabs__icon--prev{left:4px}.v-tabs__icon--next{right:4px}.v-tabs__wrapper{overflow:hidden;contain:content;display:flex}.v-tabs__wrapper--show-arrows{margin-left:40px;margin-right:40px}.v-tabs__wrapper--show-arrows .v-tabs__container--align-with-title{padding-left:16px}.v-tabs__container{flex:1 0 auto;display:flex;height:48px;list-style-type:none;transition:transform .6s cubic-bezier(.86,0,.07,1);white-space:nowrap;position:relative}.v-tabs__container--overflow .v-tabs__div{flex:1 0 auto}.v-tabs__container--grow .v-tabs__div{flex:1 0 auto;max-width:none}.v-tabs__container--icons-and-text{height:72px}.v-tabs__container--align-with-title{padding-left:56px}.v-tabs__container--fixed-tabs .v-tabs__div,.v-tabs__container--icons-and-text .v-tabs__div{min-width:72px}.v-tabs__container--centered .v-tabs__slider-wrapper+.v-tabs__div,.v-tabs__container--centered>.v-tabs__div:first-child,.v-tabs__container--fixed-tabs .v-tabs__slider-wrapper+.v-tabs__div,.v-tabs__container--fixed-tabs>.v-tabs__div:first-child,.v-tabs__container--right .v-tabs__slider-wrapper+.v-tabs__div,.v-tabs__container--right>.v-tabs__div:first-child{margin-left:auto}.v-tabs__container--centered>.v-tabs__div:last-child,.v-tabs__container--fixed-tabs>.v-tabs__div:last-child{margin-right:auto}.v-tabs__container--icons-and-text .v-tabs__item{flex-direction:column-reverse}.v-tabs__container--icons-and-text .v-tabs__item .v-icon{margin-bottom:6px}.v-tabs__div{align-items:center;display:inline-flex;flex:0 1 auto;font-size:14px;font-weight:500;line-height:normal;height:inherit;max-width:264px;text-align:center;text-transform:uppercase;vertical-align:middle}.v-tabs__item{align-items:center;color:inherit;display:flex;flex:1 1 auto;height:100%;justify-content:center;max-width:inherit;padding:6px 12px;text-decoration:none;transition:.3s cubic-bezier(.25,.8,.5,1);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:normal}.v-tabs__item:not(.v-tabs__item--active){opacity:.7}.v-tabs__item--disabled{pointer-events:none}.v-tabs__slider{height:2px;width:100%}.v-tabs__slider-wrapper{bottom:0;margin:0!important;position:absolute;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-tabs__items{overflow:hidden;position:relative}.v-tabs__content{width:100%;transition:transform .4s cubic-bezier(.86,0,.07,1)}@media only screen and (max-width:599px){.v-tabs__wrapper--show-arrows .v-tabs__container--align-with-title{padding-left:24px}.v-tabs__container--fixed-tabs .v-tabs__div{flex:1 0 auto}}@media only screen and (min-width:600px){.v-tabs__container--fixed-tabs .v-tabs__div,.v-tabs__container--icons-and-text .v-tabs__div{min-width:160px}}.application .theme--light.v-textarea.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused textarea,.theme--light .v-textarea.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused textarea{color:#fff}.application .theme--dark.v-textarea.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused textarea,.theme--dark .v-textarea.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused textarea{color:rgba(0,0,0,.87)}.application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-right:0;margin-left:-12px}.application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-right:0;padding-left:12px}.v-textarea textarea{flex:1 1 auto;line-height:18px;max-width:100%;min-height:32px;outline:none;padding:7px 0 8px;width:100%}.v-textarea .v-text-field__prefix{padding-top:4px;align-self:start}.v-textarea.v-text-field--full-width.v-text-field--single-line .v-text-field__slot textarea,.v-textarea.v-text-field--full-width .v-text-field__slot textarea{margin-top:0}.v-textarea.v-text-field--full-width.v-text-field--single-line .v-text-field__details,.v-textarea.v-text-field--full-width .v-text-field__details{bottom:4px}.v-textarea.v-text-field--enclosed .v-text-field__slot{margin-right:-12px}.v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-right:12px}.v-textarea.v-text-field--box .v-text-field__prefix,.v-textarea.v-text-field--box textarea,.v-textarea.v-text-field--enclosed .v-text-field__prefix,.v-textarea.v-text-field--enclosed textarea{margin-top:24px}.v-textarea.v-text-field--box.v-text-field--single-line .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line textarea{margin-top:12px}.v-textarea.v-text-field--box.v-text-field--single-line .v-label,.v-textarea.v-text-field--enclosed.v-text-field--single-line .v-label{top:18px}.v-textarea.v-text-field--box.v-text-field--single-line.v-text-field--outline .v-input__control,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-text-field--outline .v-input__control{padding-top:0}.v-textarea.v-text-field--solo{align-items:flex-start}.v-textarea.v-text-field--solo .v-input__append-inner,.v-textarea.v-text-field--solo .v-input__append-outer,.v-textarea.v-text-field--solo .v-input__prepend-inner,.v-textarea.v-text-field--solo .v-input__prepend-outer{align-self:flex-start;margin-top:16px}.v-textarea--auto-grow textarea{overflow:hidden}.v-textarea--no-resize textarea{resize:none}.v-time-picker-title{color:#fff;display:flex;line-height:1;justify-content:flex-end}.v-time-picker-title__time{white-space:nowrap}.v-time-picker-title__time .v-picker__title__btn,.v-time-picker-title__time span{align-items:center;display:inline-flex;height:70px;font-size:70px;justify-content:center}.v-time-picker-title__ampm{align-self:flex-end;display:flex;flex-direction:column;font-size:16px;margin:8px 0 6px 8px;text-transform:uppercase}.v-time-picker-title__ampm div:only-child{flex-direction:row}.v-picker__title--landscape .v-time-picker-title{flex-direction:column;justify-content:center;height:100%}.v-picker__title--landscape .v-time-picker-title__time{text-align:right}.v-picker__title--landscape .v-time-picker-title__time .v-picker__title__btn,.v-picker__title--landscape .v-time-picker-title__time span{height:55px;font-size:55px}.v-picker__title--landscape .v-time-picker-title__ampm{margin:16px 0 0;align-self:auto;text-align:center}.application .theme--light.v-time-picker-clock,.theme--light .v-time-picker-clock{background:#e0e0e0}.application .theme--light.v-time-picker-clock>span.disabled,.theme--light .v-time-picker-clock>span.disabled{color:rgba(0,0,0,.26)}.application .theme--light.v-time-picker-clock>span.disabled.active,.theme--light .v-time-picker-clock>span.disabled.active{color:hsla(0,0%,100%,.3)}.application .theme--light.v-time-picker-clock--indeterminate .v-time-picker-clock__hand,.theme--light .v-time-picker-clock--indeterminate .v-time-picker-clock__hand{background-color:#bdbdbd}.application .theme--light.v-time-picker-clock--indeterminate .v-time-picker-clock__hand:after,.theme--light .v-time-picker-clock--indeterminate .v-time-picker-clock__hand:after{color:#bdbdbd}.application .theme--light.v-time-picker-clock--indeterminate>span.active,.theme--light .v-time-picker-clock--indeterminate>span.active{background-color:#bdbdbd}.application .theme--dark.v-time-picker-clock,.theme--dark .v-time-picker-clock{background:#616161}.application .theme--dark.v-time-picker-clock>span.disabled,.application .theme--dark.v-time-picker-clock>span.disabled.active,.theme--dark .v-time-picker-clock>span.disabled,.theme--dark .v-time-picker-clock>span.disabled.active{color:hsla(0,0%,100%,.3)}.application .theme--dark.v-time-picker-clock--indeterminate .v-time-picker-clock__hand,.theme--dark .v-time-picker-clock--indeterminate .v-time-picker-clock__hand{background-color:#757575}.application .theme--dark.v-time-picker-clock--indeterminate .v-time-picker-clock__hand:after,.theme--dark .v-time-picker-clock--indeterminate .v-time-picker-clock__hand:after{color:#757575}.application .theme--dark.v-time-picker-clock--indeterminate>span.active,.theme--dark .v-time-picker-clock--indeterminate>span.active{background-color:#757575}.v-time-picker-clock{border-radius:100%;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-time-picker-clock__container{display:flex;align-items:center;justify-content:center;padding:10px}.v-time-picker-clock__hand{height:calc(50% - 28px);width:2px;bottom:50%;left:calc(50% - 1px);transform-origin:center bottom;position:absolute;will-change:transform;z-index:1}.v-time-picker-clock__hand:before{background:transparent;border-width:2px;width:10px;height:10px;top:-3%}.v-time-picker-clock__hand:after,.v-time-picker-clock__hand:before{border-style:solid;border-color:inherit;border-radius:100%;content:\"\";position:absolute;left:50%;transform:translate(-50%,-50%)}.v-time-picker-clock__hand:after{height:8px;width:8px;top:100%;background-color:inherit}.v-time-picker-clock>span{align-items:center;border-radius:100%;cursor:default;display:flex;font-size:16px;justify-content:center;left:calc(50% - 40px / 2);height:40px;position:absolute;text-align:center;top:calc(50% - 40px / 2);width:40px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-time-picker-clock>span>span{z-index:1}.v-time-picker-clock>span:after,.v-time-picker-clock>span:before{content:\"\";border-radius:100%;position:absolute;top:50%;left:50%;height:14px;width:14px;transform:translate(-50%,-50%);height:40px;width:40px}.v-time-picker-clock>span.active{color:#fff;cursor:default;z-index:2}.v-time-picker-clock>span.disabled{pointer-events:none}.application .theme--light.v-toolbar,.theme--light .v-toolbar{background-color:#f5f5f5;color:rgba(0,0,0,.87)}.application .theme--dark.v-toolbar,.theme--dark .v-toolbar{background-color:#212121;color:#fff}.v-toolbar{transition:none;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);position:relative;width:100%;will-change:padding-left,padding-right}.v-toolbar[data-booted=true]{transition:.2s cubic-bezier(.4,0,.2,1)}.v-toolbar .v-text-field--box,.v-toolbar .v-text-field--enclosed{margin:0}.v-toolbar .v-text-field--box .v-text-field__details,.v-toolbar .v-text-field--enclosed .v-text-field__details{display:none}.v-toolbar .v-tabs{width:100%}.v-toolbar__title{font-size:20px;font-weight:500;letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v-toolbar__title:not(:first-child){margin-left:20px}.v-toolbar__content,.v-toolbar__extension{align-items:center;display:flex;padding:0 24px}.v-toolbar__content .v-btn--icon,.v-toolbar__extension .v-btn--icon{margin:6px}.v-toolbar__content>:first-child,.v-toolbar__extension>:first-child{margin-left:0}.v-toolbar__content>:first-child.v-btn--icon,.v-toolbar__extension>:first-child.v-btn--icon{margin-left:-6px}.v-toolbar__content>:first-child.v-menu .v-menu__activator .v-btn,.v-toolbar__content>:first-child.v-tooltip span .v-btn,.v-toolbar__extension>:first-child.v-menu .v-menu__activator .v-btn,.v-toolbar__extension>:first-child.v-tooltip span .v-btn{margin-left:0}.v-toolbar__content>:first-child.v-menu .v-menu__activator .v-btn--icon,.v-toolbar__content>:first-child.v-tooltip span .v-btn--icon,.v-toolbar__extension>:first-child.v-menu .v-menu__activator .v-btn--icon,.v-toolbar__extension>:first-child.v-tooltip span .v-btn--icon{margin-left:-6px}.v-toolbar__content>:last-child,.v-toolbar__extension>:last-child{margin-right:0}.v-toolbar__content>:last-child.v-btn--icon,.v-toolbar__extension>:last-child.v-btn--icon{margin-right:-6px}.v-toolbar__content>:last-child.v-menu .v-menu__activator .v-btn,.v-toolbar__content>:last-child.v-tooltip span .v-btn,.v-toolbar__extension>:last-child.v-menu .v-menu__activator .v-btn,.v-toolbar__extension>:last-child.v-tooltip span .v-btn{margin-right:0}.v-toolbar__content>:last-child.v-menu .v-menu__activator .v-btn--icon,.v-toolbar__content>:last-child.v-tooltip span .v-btn--icon,.v-toolbar__extension>:last-child.v-menu .v-menu__activator .v-btn--icon,.v-toolbar__extension>:last-child.v-tooltip span .v-btn--icon{margin-right:-6px}.v-toolbar__content>.v-list,.v-toolbar__extension>.v-list{flex:1 1 auto;max-height:100%}.v-toolbar__content>.v-list:first-child,.v-toolbar__extension>.v-list:first-child{margin-left:-24px}.v-toolbar__content>.v-list:last-child,.v-toolbar__extension>.v-list:last-child{margin-right:-24px}.v-toolbar__extension>.v-toolbar__title{margin-left:72px}.v-toolbar__items{display:flex;height:inherit;max-width:100%;padding:0}.v-toolbar__items .v-btn{align-items:stretch}.v-toolbar__items .v-tooltip,.v-toolbar__items .v-tooltip>span{height:inherit}.v-toolbar__items .v-btn,.v-toolbar__items .v-menu,.v-toolbar__items .v-menu__activator{height:inherit;margin:0}.v-toolbar .v-btn-toggle,.v-toolbar .v-overflow-btn{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.v-toolbar .v-input{margin:0}.v-toolbar .v-overflow-btn .v-input__control:before,.v-toolbar .v-overflow-btn .v-input__slot:before{display:none}.v-toolbar--card{border-radius:2px 2px 0 0;box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.v-toolbar--fixed{position:fixed;z-index:2}.v-toolbar--absolute,.v-toolbar--fixed{top:0;left:0}.v-toolbar--absolute{position:absolute;z-index:2}.v-toolbar--floating{display:inline-flex;margin:16px;width:auto}.v-toolbar--clipped{z-index:3}@media only screen and (max-width:959px){.v-toolbar__content,.v-toolbar__extension{padding:0 16px}.v-toolbar__content>.v-list:first-child,.v-toolbar__extension>.v-list:first-child{margin-left:-16px}.v-toolbar__content>.v-list:last-child,.v-toolbar__extension>.v-list:last-child{margin-right:-16px}}.v-tooltip{position:relative}.v-tooltip__content{background:#616161;border-radius:2px;color:#fff;font-size:12px;display:inline-block;padding:5px 8px;position:absolute;text-transform:none;transition:.15s cubic-bezier(.25,.8,.5,1);width:auto;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-tooltip__content[class*=-active]{pointer-events:none}@media only screen and (max-width:959px){.v-tooltip .v-tooltip__content{padding:10px 16px}}", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(35);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 35 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layouts_default__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layouts_default___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__layouts_default__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Home__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__views_Home__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_About_vue__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_About_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__views_About_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_Login_vue__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_Login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__views_Login_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_Usersmg_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_Usersmg_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__views_Usersmg_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_Roomsmg_vue__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_Roomsmg_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__views_Roomsmg_vue__);









__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]);

var route = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]({
  routes: [{
    path: "/",
    component: __WEBPACK_IMPORTED_MODULE_2__layouts_default___default.a,
    meta: {
      auth: true
    },
    children: [{
      path: "/",
      name: "Home",
      component: __WEBPACK_IMPORTED_MODULE_3__views_Home___default.a
    }, {
      path: "/about",
      name: "about",
      component: __WEBPACK_IMPORTED_MODULE_4__views_About_vue___default.a
    }, {
      path: "/usersmg",
      name: "usersmg",
      component: __WEBPACK_IMPORTED_MODULE_6__views_Usersmg_vue___default.a
    }, {
      path: "/roomsmg",
      name: "roomsmg",
      component: __WEBPACK_IMPORTED_MODULE_7__views_Roomsmg_vue___default.a
    }]
  }, {
    path: "/login",
    name: "Login",
    component: __WEBPACK_IMPORTED_MODULE_5__views_Login_vue___default.a
  }]
});
route.beforeEach(function (to, from, next) {
  if (to.matched[0].meta && to.matched[0].meta.auth) {
    //checktoken
    var token = localStorage.getItem("token");
    if (token) {
      next(true);
      // console.log($router);
      // if (router.app.$route.name === "Login") {
      //   router.replace({ name: "Home" });
      // }
    } else {
      next(false);
    }
  } else {
    next(true);
  }
});
/* harmony default export */ __webpack_exports__["a"] = (route);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(38)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(40)
/* template */
var __vue_template__ = __webpack_require__(49)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\layouts\\default.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f15b9e82", Component.options)
  } else {
    hotAPI.reload("data-v-f15b9e82", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("27fccda4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f15b9e82\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./default.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f15b9e82\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./default.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Toolbar_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Toolbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Toolbar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Footer_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Footer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Footer_vue__);
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Toolbar: __WEBPACK_IMPORTED_MODULE_0__components_Toolbar_vue___default.a,
    Footer: __WEBPACK_IMPORTED_MODULE_1__components_Footer_vue___default.a
  }
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(42)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(44)
/* template */
var __vue_template__ = __webpack_require__(45)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\Toolbar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f6d9c658", Component.options)
  } else {
    hotAPI.reload("data-v-f6d9c658", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("813135dc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f6d9c658\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Toolbar.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f6d9c658\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Toolbar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, "\n#linebar a {\r\n  font-weight: bold;\r\n  color: #494949;\r\n  text-decoration: none;\n}\n#hearbar a {\r\n  font-weight: bold;\r\n  color: #ffffff;\r\n  text-decoration: none;\n}\n#linebar a.router-link-exact-active {\r\n  color: rgb(0, 41, 155);\n}\n#navigation {\r\n  background-color: rgb(21, 75, 92);\n}\r\n", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      userlogin: "Admin",
      drawer: null,
      myname: "Hotel Manager",
      mini: false,
      right: null,
      items: [{ title: "Bảng Điều Kiển", icon: "donut_small", link: "/" }, { title: "Quản lý Phòng ", icon: "meeting_room", link: "/roomsmg" }, {
        title: "Quản lý Nhân Viên",
        icon: "assignment_ind",
        link: "/usersmg"
      }, { title: "Quản lý Dịch vụ", icon: "room_service", link: "/home" }]
    };
  },

  components: {},
  methods: {},
  computed: {},
  watch: {}
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", wrap: "", id: "linebar" } },
    [
      _c(
        "v-flex",
        { attrs: { xs12: "" } },
        [
          _c(
            "v-card",
            {
              staticClass: "white--text",
              attrs: {
                id: "hearbar",
                flat: "",
                height: "auto",
                fixed: "",
                tile: ""
              }
            },
            [
              _c(
                "v-toolbar",
                { staticClass: "white--text blue lighten-1" },
                [
                  _c("v-toolbar-side-icon", {
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        _vm.drawer = !_vm.drawer
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-toolbar-title",
                    { attrs: { color: "white--text" } },
                    [
                      _c("router-link", { attrs: { to: "/" } }, [
                        _vm._v(_vm._s(_vm.myname))
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    { attrs: { icon: "" } },
                    [_c("v-icon", [_vm._v("grade")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "router-link",
                    { attrs: { to: "/login" } },
                    [
                      _c(
                        "v-btn",
                        { attrs: { icon: "" } },
                        [_c("v-icon", [_vm._v("perm_identity")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "router-link",
                    { attrs: { to: "/about" } },
                    [
                      _c(
                        "v-btn",
                        { attrs: { icon: "" } },
                        [_c("v-icon", [_vm._v("more_vert")])],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-navigation-drawer",
        {
          attrs: {
            "mini-variant": _vm.mini,
            absolute: "",
            temporary: "",
            color: "primary"
          },
          model: {
            value: _vm.drawer,
            callback: function($$v) {
              _vm.drawer = $$v
            },
            expression: "drawer"
          }
        },
        [
          _c(
            "v-list",
            { staticClass: "pa-1" },
            [
              _vm.mini
                ? _c(
                    "v-list-tile",
                    {
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.mini = !_vm.mini
                        }
                      }
                    },
                    [
                      _c(
                        "v-list-tile-action",
                        [_c("v-icon", [_vm._v("chevron_right")])],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-list-tile",
                { attrs: { avatar: "", tag: "div" } },
                [
                  _c("v-list-tile-avatar", [
                    _c("img", {
                      attrs: {
                        src:
                          "https://yt3.ggpht.com/-TyxgQYDx-lI/AAAAAAAAAAI/AAAAAAAAAAA/UwM3eRMLuKM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-list-tile-content",
                    [_c("v-list-tile-title", [_vm._v(_vm._s(_vm.userlogin))])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-tile-action",
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: { icon: "" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.mini = !_vm.mini
                            }
                          }
                        },
                        [_c("v-icon", [_vm._v("chevron_left")])],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list",
            { staticClass: "pt-0", attrs: { dense: "" } },
            [
              _c("v-divider", { attrs: { light: "" } }),
              _vm._v(" "),
              _vm._l(_vm.items, function(item) {
                return _c(
                  "v-list-tile",
                  { key: item.title },
                  [
                    _c(
                      "router-link",
                      { attrs: { to: item.link } },
                      [
                        _c(
                          "v-list-tile-action",
                          [_c("v-icon", [_vm._v(_vm._s(item.icon))])],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "router-link",
                      { attrs: { to: item.link } },
                      [
                        _c(
                          "v-list-tile-content",
                          [
                            _c("v-list-tile-title", [
                              _vm._v(_vm._s(item.title))
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              })
            ],
            2
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f6d9c658", module.exports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(47)
/* template */
var __vue_template__ = __webpack_require__(48)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\Footer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ae3fb5c", Component.options)
  } else {
    hotAPI.reload("data-v-0ae3fb5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      make: "Hotel Manager"
    };
  }
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-footer",
    { attrs: { dark: "", height: "auto" } },
    [
      _c("v-card", {
        staticClass: "blue lighten-5 white--text text-xs-center",
        attrs: { flat: "", tile: "" }
      }),
      _vm._v(" "),
      _c("v-card-text", { staticClass: "white--text blue lighten-1" }, [
        _vm._v("\n    © 2018 -\n    "),
        _c("strong", [_vm._v(_vm._s(_vm.make))])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0ae3fb5c", module.exports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-content",
    [
      _c("Toolbar"),
      _vm._v(" "),
      _c("router-view", { attrs: { height: "500" } }),
      _vm._v(" "),
      _c("Footer")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f15b9e82", module.exports)
  }
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(51)
/* template */
var __vue_template__ = __webpack_require__(79)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\views\\Home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11c5acec", Component.options)
  } else {
    hotAPI.reload("data-v-11c5acec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      colortxt: "light-green lighten-3",
      colorbgtitle: "light-green lighten-2",
      urlgetdata: "",
      card1: true,
      card2: true,
      status: [{ name: "Phòng đã đặt", color: "deep-orange lighten-1", num: 0 }, { name: "Phòng chưa đặt", color: "cyan lighten-1", num: 35 }, { name: "Nhân viên", color: "pink lighten-1", num: 3 }, { name: "All Oder", color: "light-green lighten-1", num: 8 }]
    };
  },

  computed: {},
  created: function created() {},

  methods: {
    setStatus: function setStatus() {}
  }
});

/***/ }),
/* 52 */,
/* 53 */,
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      dialog: false,
      texthint: "Đây là trường bắt buộc không được để trống",
      roominfor: {},
      inforold: {}
    };
  },

  props: {
    room: {
      type: Object
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.roominfor = this.room;
    this.inforold = this.room;
  },

  watch: {
    roominfor: function roominfor() {
      return this.room;
    }
  },
  methods: {
    setinfor: function setinfor() {

      this.dialog = false;
    },

    // xử lí lấy lịch sử phòng để chèn lại khi đóng nút hủy
    getoldroom: function getoldroom() {
      this.inforold = this.detailroom;
      this.dialog = false;
    }
  }
});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", "justify-center": "" } },
    [
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", "max-width": "600" },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _c(
            "v-btn",
            {
              attrs: {
                slot: "activator",
                flat: "",
                icon: "",
                color: "success"
              },
              slot: "activator"
            },
            [_c("v-icon", [_vm._v("edit")])],
            1
          ),
          _vm._v(" "),
          _c(
            "v-card",
            [
              _c("v-card-title", { staticClass: "light-green darken-1" }, [
                _c("span", { staticClass: "headline" }, [
                  _vm._v("Cập nhật thông tin phòng")
                ]),
                _vm._v(" "),
                _c("p")
              ]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-container",
                    { attrs: { "grid-list-md": "" } },
                    [
                      _c(
                        "v-layout",
                        { attrs: { wrap: "" } },
                        [
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm12: "", md12: "" } },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  color: "green",
                                  label: "Tên Phòng",
                                  hint: _vm.texthint,
                                  value: _vm.roominfor.name,
                                  required: ""
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm6: "", md6: "" } },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  color: "green",
                                  label: "Kiểu Phòng",
                                  hint: _vm.texthint,
                                  value: _vm.roominfor.type,
                                  required: ""
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm6: "", md6: "" } },
                            [
                              _c("v-switch", {
                                attrs: {
                                  color: "green",
                                  label:
                                    _vm.roominfor.status != 1
                                      ? "Phòng trống"
                                      : "Phòng đã được đặt"
                                },
                                model: {
                                  value: _vm.roominfor.status,
                                  callback: function($$v) {
                                    _vm.$set(_vm.roominfor, "status", $$v)
                                  },
                                  expression: "roominfor.status"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm12: "", md12: "" } },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  color: "green",
                                  label: "Giá phòng",
                                  hint: _vm.texthint,
                                  value: _vm.roominfor.price,
                                  required: ""
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "" } },
                            [
                              _c("v-textarea", {
                                attrs: {
                                  color: "green",
                                  type: "text",
                                  name: "input-5-3",
                                  label: "Mô tả",
                                  value: _vm.roominfor.note
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "green darken-1", flat: "" },
                      on: {
                        click: function($event) {
                          _vm.getoldroom()
                        }
                      }
                    },
                    [_vm._v("Đóng")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "green darken-1", flat: "" },
                      nativeOn: {
                        click: function($event) {
                          _vm.setinfor()
                        }
                      }
                    },
                    [_vm._v("Cập Nhật")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0999739f", module.exports)
  }
}

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      dialog: false,
      roominfor: {}
    };
  },

  props: {
    room: {
      type: Object
    }
  },
  mounted: function mounted() {
    this.roominfor = this.room;
  }
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", "justify-center": "" } },
    [
      _c(
        "v-btn",
        {
          attrs: { flat: "", icon: "", color: "red" },
          on: {
            click: function($event) {
              $event.stopPropagation()
              _vm.dialog = true
            }
          }
        },
        [_c("v-icon", [_vm._v("delete_sweep")])],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "600" },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-layout",
                {
                  staticClass: "light-green darken-1",
                  attrs: { row: "", wrap: "" }
                },
                [
                  _c("v-card-title", { staticClass: "headline" }, [
                    _vm._v("Bạn có muốn xóa phòng này ?")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-container",
                    { attrs: { "grid-list-md": "" } },
                    [
                      _c(
                        "v-layout",
                        { attrs: { wrap: "" } },
                        [
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm12: "", md12: "" } },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  label: "Tên phòng",
                                  disabled: "",
                                  value: _vm.roominfor.name
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm6: "", md6: "" } },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  label: "Kiểu Phòng",
                                  disabled: "",
                                  value: _vm.roominfor.type
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm6: "", md6: "" } },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  label: "Trạng thái phòng",
                                  disabled: "",
                                  value:
                                    _vm.roominfor.status != 1
                                      ? "Phòng trống"
                                      : "Phòng đã đặt"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm12: "", md12: "" } },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  color: "green",
                                  label: "Giá phòng",
                                  disabled: "",
                                  value: _vm.roominfor.price
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "" } },
                            [
                              _c("v-textarea", {
                                attrs: {
                                  color: "green",
                                  type: "text",
                                  name: "input-5-3",
                                  label: "Mô tả",
                                  disabled: "",
                                  value: _vm.roominfor.note
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "green darken-1", flat: "flat" },
                      on: {
                        click: function($event) {
                          _vm.dialog = false
                        }
                      }
                    },
                    [_vm._v("Hủy")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "green darken-1", flat: "flat" },
                      on: {
                        click: function($event) {
                          _vm.dialog = false
                        }
                      }
                    },
                    [_vm._v("Đồng ý")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-29b3791c", module.exports)
  }
}

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      dialog: false,
      texthint: "Đây là trường bắt buộc không được để trống",
      statusroom: true,
      name: ""
    };
  },

  props: {
    room: {
      type: Object
    }
  },
  watch: {
    detailroom: function detailroom() {}
  },
  methods: {
    setinfor: function setinfor() {
      this.dialog = false;
    },
    addroom: function addroom() {}
  },
  created: function created() {}
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", wrap: "" } },
    [
      _c(
        "v-card-text",
        { staticStyle: { position: "relative" } },
        [
          _c(
            "v-fab-transition",
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    color: "blue darken-1",
                    dark: "",
                    absolute: "",
                    top: "",
                    right: ""
                  },
                  on: {
                    click: function($event) {
                      _vm.dialog = !_vm.dialog
                    }
                  }
                },
                [_vm._v("\n                Thêm Phòng Mới\n            ")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", "justify-center": "" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "600px" },
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { staticClass: "blue lighten-1" }, [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v("Thêm Phòng Mới")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        { attrs: { "grid-list-md": "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { wrap: "" } },
                            [
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm12: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Tên Phòng",
                                      hint: _vm.texthint,
                                      required: ""
                                    },
                                    model: {
                                      value: _vm.name,
                                      callback: function($$v) {
                                        _vm.name = $$v
                                      },
                                      expression: "name"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md6: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Kiểu Phòng",
                                      hint: _vm.texthint,
                                      required: ""
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md6: "" } },
                                [
                                  _c("v-switch", {
                                    attrs: { label: "Trạng thái phòng" }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm12: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      color: "green",
                                      label: "Giá phòng",
                                      hint: _vm.texthint,
                                      required: ""
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "" } },
                                [
                                  _c("v-textarea", {
                                    attrs: {
                                      color: "green",
                                      type: "text",
                                      name: "input-5-3",
                                      label: "Mô tả"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "green darken-1", flat: "" },
                          nativeOn: {
                            click: function($event) {
                              _vm.dialog = false
                            }
                          }
                        },
                        [_vm._v("Hủy")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "green darken-1", flat: "" },
                          nativeOn: {
                            click: function($event) {
                              _vm.setinfor()
                            }
                          }
                        },
                        [_vm._v("Đồng ý")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-56cf109c", module.exports)
  }
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var bind = __webpack_require__(15);
var Axios = __webpack_require__(62);
var defaults = __webpack_require__(10);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(19);
axios.CancelToken = __webpack_require__(76);
axios.isCancel = __webpack_require__(18);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(77);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(10);
var utils = __webpack_require__(2);
var InterceptorManager = __webpack_require__(71);
var dispatchRequest = __webpack_require__(72);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(17);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var transformData = __webpack_require__(73);
var isCancel = __webpack_require__(18);
var defaults = __webpack_require__(10);
var isAbsoluteURL = __webpack_require__(74);
var combineURLs = __webpack_require__(75);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(19);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "grid-list-lg": "" } },
    [
      _c(
        "v-layout",
        {
          attrs: { row: "", wrap: "", "align-center": "", "justify-center": "" }
        },
        _vm._l(_vm.status, function(i) {
          return _c(
            "v-flex",
            { key: i.name, attrs: { xs3: "" } },
            [
              _c(
                "v-card",
                { attrs: { dark: "", color: i.color } },
                [
                  _c(
                    "v-card-actions",
                    {
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.card1 = !_vm.card1
                        }
                      }
                    },
                    [
                      _c("v-card-text", { staticClass: "px-6" }, [
                        _vm._v(_vm._s(i.name) + "\n          ")
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("p", { staticClass: "headline" }, [_vm._v(_vm._s(i.num))])
                ],
                1
              )
            ],
            1
          )
        })
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-11c5acec", module.exports)
  }
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(81)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\views\\About.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5b755950", Component.options)
  } else {
    hotAPI.reload("data-v-5b755950", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "about" })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5b755950", module.exports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(83)
/* template */
var __vue_template__ = __webpack_require__(113)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\views\\Login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44d4d72c", Component.options)
  } else {
    hotAPI.reload("data-v-44d4d72c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0_vuelidate__["validationMixin"]],

  validations: {
    email: { required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"], email: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["email"] },
    password: { required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"] },
    checkbox: { required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"] }
  },

  data: function data() {
    return {
      email: "",
      password: "",
      checkbox: false,
      loading: false,
      alert: false
    };
  },

  computed: {
    checkboxErrors: function checkboxErrors() {
      var errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.required && errors.push("Bạn phải nhấn đồng ý để tiếp tục");
      return errors;
    },
    emailErrors: function emailErrors() {
      var errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Kiểu nhập vào không phải dạng email");
      !this.$v.email.required && errors.push("Bạn cần nhập email");
      return errors;
    },
    passErrors: function passErrors() {
      var errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Bạn cần nhập mật khẩu");
      return errors;
    }
  },

  methods: {
    login: function login() {
      var _this = this;

      this.$v.$touch();
      // console.log(this.$v.email.$dirty);
      // console.log(this.$v.password.$dirty);
      if (this.$v.email.$dirty && this.$v.password.$dirty) {
        axios.post("/login", {
          email: this.email,
          password: this.password
        }).then(function (res) {
          console.log(res.data);
          _this.alert = false;
          _this.$store.dispatch("setToken", res.data.success.token);
          _this.$router.replace({ name: "Home" });
        }).catch(function (error) {
          _this.alert = true;
          console.log(error.response.status);
        });
      }
    },
    clear: function clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    }
  }
});

/***/ }),
/* 84 */,
/* 85 */,
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vuelidate = Vuelidate;
Object.defineProperty(exports, "withParams", {
  enumerable: true,
  get: function get() {
    return _params.withParams;
  }
});
exports.default = exports.validationMixin = void 0;

var _vval = __webpack_require__(87);

var _params = __webpack_require__(20);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var NIL = function NIL() {
  return null;
};

var buildFromKeys = function buildFromKeys(keys, fn, keyFn) {
  return keys.reduce(function (build, key) {
    build[keyFn ? keyFn(key) : key] = fn(key);
    return build;
  }, {});
};

function isFunction(val) {
  return typeof val === 'function';
}

function isObject(val) {
  return val !== null && (_typeof(val) === 'object' || isFunction(val));
}

function isPromise(object) {
  return isObject(object) && isFunction(object.then);
}

var getPath = function getPath(ctx, obj, path, fallback) {
  if (typeof path === 'function') {
    return path.call(ctx, obj, fallback);
  }

  path = Array.isArray(path) ? path : path.split('.');

  for (var i = 0; i < path.length; i++) {
    if (obj && _typeof(obj) === 'object') {
      obj = obj[path[i]];
    } else {
      return fallback;
    }
  }

  return typeof obj === 'undefined' ? fallback : obj;
};

var __isVuelidateAsyncVm = '__isVuelidateAsyncVm';

function makePendingAsyncVm(Vue, promise) {
  var asyncVm = new Vue({
    data: {
      p: true,
      v: false
    }
  });
  promise.then(function (value) {
    asyncVm.p = false;
    asyncVm.v = value;
  }, function (error) {
    asyncVm.p = false;
    asyncVm.v = false;
    throw error;
  });
  asyncVm[__isVuelidateAsyncVm] = true;
  return asyncVm;
}

var validationGetters = {
  $invalid: function $invalid() {
    var _this = this;

    var proxy = this.proxy;
    return this.nestedKeys.some(function (nested) {
      return _this.refProxy(nested).$invalid;
    }) || this.ruleKeys.some(function (rule) {
      return !proxy[rule];
    });
  },
  $dirty: function $dirty() {
    var _this2 = this;

    if (this.dirty) {
      return true;
    }

    if (this.nestedKeys.length === 0) {
      return false;
    }

    return this.nestedKeys.every(function (key) {
      return _this2.refProxy(key).$dirty;
    });
  },
  $anyDirty: function $anyDirty() {
    var _this3 = this;

    if (this.dirty) {
      return true;
    }

    if (this.nestedKeys.length === 0) {
      return false;
    }

    return this.nestedKeys.some(function (key) {
      return _this3.refProxy(key).$anyDirty;
    });
  },
  $error: function $error() {
    return this.$dirty && !this.$pending && this.$invalid;
  },
  $anyError: function $anyError() {
    return this.$anyDirty && !this.$pending && this.$invalid;
  },
  $pending: function $pending() {
    var _this4 = this;

    return this.ruleKeys.some(function (key) {
      return _this4.getRef(key).$pending;
    }) || this.nestedKeys.some(function (key) {
      return _this4.refProxy(key).$pending;
    });
  },
  $params: function $params() {
    var _this5 = this;

    var vals = this.validations;
    return _objectSpread({}, buildFromKeys(this.nestedKeys, function (key) {
      return vals[key] && vals[key].$params || null;
    }), buildFromKeys(this.ruleKeys, function (key) {
      return _this5.getRef(key).$params;
    }));
  }
};

function setDirtyRecursive(newState) {
  this.dirty = newState;
  var proxy = this.proxy;
  var method = newState ? '$touch' : '$reset';
  this.nestedKeys.forEach(function (key) {
    proxy[key][method]();
  });
}

var validationMethods = {
  $touch: function $touch() {
    setDirtyRecursive.call(this, true);
  },
  $reset: function $reset() {
    setDirtyRecursive.call(this, false);
  },
  $flattenParams: function $flattenParams() {
    var proxy = this.proxy;
    var params = [];

    for (var key in this.$params) {
      if (this.isNested(key)) {
        var childParams = proxy[key].$flattenParams();

        for (var j = 0; j < childParams.length; j++) {
          childParams[j].path.unshift(key);
        }

        params = params.concat(childParams);
      } else {
        params.push({
          path: [],
          name: key,
          params: this.$params[key]
        });
      }
    }

    return params;
  }
};
var getterNames = Object.keys(validationGetters);
var methodNames = Object.keys(validationMethods);
var _cachedComponent = null;

var getComponent = function getComponent(Vue) {
  if (_cachedComponent) {
    return _cachedComponent;
  }

  var VBase = Vue.extend({
    computed: {
      refs: function refs() {
        var oldVval = this._vval;
        this._vval = this.children;
        (0, _vval.patchChildren)(oldVval, this._vval);
        var refs = {};

        this._vval.forEach(function (c) {
          refs[c.key] = c.vm;
        });

        return refs;
      }
    },
    beforeCreate: function beforeCreate() {
      this._vval = null;
    },
    beforeDestroy: function beforeDestroy() {
      if (this._vval) {
        (0, _vval.patchChildren)(this._vval);
        this._vval = null;
      }
    },
    methods: {
      getModel: function getModel() {
        return this.lazyModel ? this.lazyModel(this.prop) : this.model;
      },
      getModelKey: function getModelKey(key) {
        var model = this.getModel();

        if (model) {
          return model[key];
        }
      },
      hasIter: function hasIter() {
        return false;
      }
    }
  });
  var ValidationRule = VBase.extend({
    data: function data() {
      return {
        rule: null,
        lazyModel: null,
        model: null,
        lazyParentModel: null,
        rootModel: null
      };
    },
    methods: {
      runRule: function runRule(parent) {
        var model = this.getModel();
        (0, _params.pushParams)();
        var rawOutput = this.rule.call(this.rootModel, model, parent);
        var output = isPromise(rawOutput) ? makePendingAsyncVm(Vue, rawOutput) : rawOutput;
        var rawParams = (0, _params.popParams)();
        var params = rawParams && rawParams.$sub ? rawParams.$sub.length > 1 ? rawParams : rawParams.$sub[0] : null;
        return {
          output: output,
          params: params
        };
      }
    },
    computed: {
      run: function run() {
        var _this6 = this;

        var parent = this.lazyParentModel();

        var isArrayDependant = Array.isArray(parent) && parent.__ob__;

        if (isArrayDependant) {
          var arrayDep = parent.__ob__.dep;
          arrayDep.depend();
          var target = arrayDep.constructor.target;

          if (!this._indirectWatcher) {
            var Watcher = target.constructor;
            this._indirectWatcher = new Watcher(this, function () {
              return _this6.runRule(parent);
            }, null, {
              lazy: true
            });
          }

          var model = this.getModel();

          if (!this._indirectWatcher.dirty && this._lastModel === model) {
            this._indirectWatcher.depend();

            return target.value;
          }

          this._lastModel = model;

          this._indirectWatcher.evaluate();

          this._indirectWatcher.depend();
        } else if (this._indirectWatcher) {
          this._indirectWatcher.teardown();

          this._indirectWatcher = null;
        }

        return this._indirectWatcher ? this._indirectWatcher.value : this.runRule(parent);
      },
      $params: function $params() {
        return this.run.params;
      },
      proxy: function proxy() {
        var output = this.run.output;

        if (output[__isVuelidateAsyncVm]) {
          return !!output.v;
        }

        return !!output;
      },
      $pending: function $pending() {
        var output = this.run.output;

        if (output[__isVuelidateAsyncVm]) {
          return output.p;
        }

        return false;
      }
    },
    destroyed: function destroyed() {
      if (this._indirectWatcher) {
        this._indirectWatcher.teardown();

        this._indirectWatcher = null;
      }
    }
  });
  var Validation = VBase.extend({
    data: function data() {
      return {
        dirty: false,
        validations: null,
        lazyModel: null,
        model: null,
        prop: null,
        lazyParentModel: null,
        rootModel: null
      };
    },
    methods: _objectSpread({}, validationMethods, {
      refProxy: function refProxy(key) {
        return this.getRef(key).proxy;
      },
      getRef: function getRef(key) {
        return this.refs[key];
      },
      isNested: function isNested(key) {
        return typeof this.validations[key] !== 'function';
      }
    }),
    computed: _objectSpread({}, validationGetters, {
      nestedKeys: function nestedKeys() {
        return this.keys.filter(this.isNested);
      },
      ruleKeys: function ruleKeys() {
        var _this7 = this;

        return this.keys.filter(function (k) {
          return !_this7.isNested(k);
        });
      },
      keys: function keys() {
        return Object.keys(this.validations).filter(function (k) {
          return k !== '$params';
        });
      },
      proxy: function proxy() {
        var _this8 = this;

        var keyDefs = buildFromKeys(this.keys, function (key) {
          return {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _this8.refProxy(key);
            }
          };
        });
        var getterDefs = buildFromKeys(getterNames, function (key) {
          return {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _this8[key];
            }
          };
        });
        var methodDefs = buildFromKeys(methodNames, function (key) {
          return {
            enumerable: false,
            configurable: true,
            get: function get() {
              return _this8[key];
            }
          };
        });
        var iterDefs = this.hasIter() ? {
          $iter: {
            enumerable: true,
            value: Object.defineProperties({}, _objectSpread({}, keyDefs))
          }
        } : {};
        return Object.defineProperties({}, _objectSpread({}, keyDefs, iterDefs, {
          $model: {
            enumerable: true,
            get: function get() {
              var parent = _this8.lazyParentModel();

              if (parent != null) {
                return parent[_this8.prop];
              } else {
                return null;
              }
            },
            set: function set(value) {
              var parent = _this8.lazyParentModel();

              if (parent != null) {
                parent[_this8.prop] = value;

                _this8.$touch();
              }
            }
          }
        }, getterDefs, methodDefs));
      },
      children: function children() {
        var _this9 = this;

        return _toConsumableArray(this.nestedKeys.map(function (key) {
          return renderNested(_this9, key);
        })).concat(_toConsumableArray(this.ruleKeys.map(function (key) {
          return renderRule(_this9, key);
        }))).filter(Boolean);
      }
    })
  });
  var GroupValidation = Validation.extend({
    methods: {
      isNested: function isNested(key) {
        return typeof this.validations[key]() !== 'undefined';
      },
      getRef: function getRef(key) {
        var vm = this;
        return {
          get proxy() {
            return vm.validations[key]() || false;
          }

        };
      }
    }
  });
  var EachValidation = Validation.extend({
    computed: {
      keys: function keys() {
        var model = this.getModel();

        if (isObject(model)) {
          return Object.keys(model);
        } else {
          return [];
        }
      },
      tracker: function tracker() {
        var _this10 = this;

        var trackBy = this.validations.$trackBy;
        return trackBy ? function (key) {
          return "".concat(getPath(_this10.rootModel, _this10.getModelKey(key), trackBy));
        } : function (x) {
          return "".concat(x);
        };
      },
      getModelLazy: function getModelLazy() {
        var _this11 = this;

        return function () {
          return _this11.getModel();
        };
      },
      children: function children() {
        var _this12 = this;

        var def = this.validations;
        var model = this.getModel();

        var validations = _objectSpread({}, def);

        delete validations['$trackBy'];
        var usedTracks = {};
        return this.keys.map(function (key) {
          var track = _this12.tracker(key);

          if (usedTracks.hasOwnProperty(track)) {
            return null;
          }

          usedTracks[track] = true;
          return (0, _vval.h)(Validation, track, {
            validations: validations,
            prop: key,
            lazyParentModel: _this12.getModelLazy,
            model: model[key],
            rootModel: _this12.rootModel
          });
        }).filter(Boolean);
      }
    },
    methods: {
      isNested: function isNested() {
        return true;
      },
      getRef: function getRef(key) {
        return this.refs[this.tracker(key)];
      },
      hasIter: function hasIter() {
        return true;
      }
    }
  });

  var renderNested = function renderNested(vm, key) {
    if (key === '$each') {
      return (0, _vval.h)(EachValidation, key, {
        validations: vm.validations[key],
        lazyParentModel: vm.lazyParentModel,
        prop: key,
        lazyModel: vm.getModel,
        rootModel: vm.rootModel
      });
    }

    var validations = vm.validations[key];

    if (Array.isArray(validations)) {
      var root = vm.rootModel;
      var refVals = buildFromKeys(validations, function (path) {
        return function () {
          return getPath(root, root.$v, path);
        };
      }, function (v) {
        return Array.isArray(v) ? v.join('.') : v;
      });
      return (0, _vval.h)(GroupValidation, key, {
        validations: refVals,
        lazyParentModel: NIL,
        prop: key,
        lazyModel: NIL,
        rootModel: root
      });
    }

    return (0, _vval.h)(Validation, key, {
      validations: validations,
      lazyParentModel: vm.getModel,
      prop: key,
      lazyModel: vm.getModelKey,
      rootModel: vm.rootModel
    });
  };

  var renderRule = function renderRule(vm, key) {
    return (0, _vval.h)(ValidationRule, key, {
      rule: vm.validations[key],
      lazyParentModel: vm.lazyParentModel,
      lazyModel: vm.getModel,
      rootModel: vm.rootModel
    });
  };

  _cachedComponent = {
    VBase: VBase,
    Validation: Validation
  };
  return _cachedComponent;
};

var _cachedVue = null;

function getVue(rootVm) {
  if (_cachedVue) return _cachedVue;
  var Vue = rootVm.constructor;

  while (Vue.super) {
    Vue = Vue.super;
  }

  _cachedVue = Vue;
  return Vue;
}

var validateModel = function validateModel(model, validations) {
  var Vue = getVue(model);

  var _getComponent = getComponent(Vue),
      Validation = _getComponent.Validation,
      VBase = _getComponent.VBase;

  var root = new VBase({
    computed: {
      children: function children() {
        var vals = typeof validations === 'function' ? validations.call(model) : validations;
        return [(0, _vval.h)(Validation, '$v', {
          validations: vals,
          lazyParentModel: NIL,
          prop: '$v',
          model: model,
          rootModel: model
        })];
      }
    }
  });
  return root;
};

var validationMixin = {
  data: function data() {
    var vals = this.$options.validations;

    if (vals) {
      this._vuelidate = validateModel(this, vals);
    }

    return {};
  },
  beforeCreate: function beforeCreate() {
    var options = this.$options;
    var vals = options.validations;
    if (!vals) return;
    if (!options.computed) options.computed = {};
    if (options.computed.$v) return;

    options.computed.$v = function () {
      return this._vuelidate ? this._vuelidate.refs.$v.proxy : null;
    };
  },
  beforeDestroy: function beforeDestroy() {
    if (this._vuelidate) {
      this._vuelidate.$destroy();

      this._vuelidate = null;
    }
  }
};
exports.validationMixin = validationMixin;

function Vuelidate(Vue) {
  Vue.mixin(validationMixin);
}

var _default = Vuelidate;
exports.default = _default;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchChildren = patchChildren;
exports.h = h;

function isUndef(v) {
  return v === null || v === undefined;
}

function isDef(v) {
  return v !== null && v !== undefined;
}

function sameVval(oldVval, vval) {
  return vval.tag === oldVval.tag && vval.key === oldVval.key;
}

function createVm(vval) {
  var Vm = vval.tag;
  vval.vm = new Vm({
    data: vval.args
  });
}

function updateVval(vval) {
  var keys = Object.keys(vval.args);

  for (var i = 0; i < keys.length; i++) {
    keys.forEach(function (k) {
      vval.vm[k] = vval.args[k];
    });
  }
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }

  return map;
}

function updateChildren(oldCh, newCh) {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVval = oldCh[0];
  var oldEndVval = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVval = newCh[0];
  var newEndVval = newCh[newEndIdx];
  var oldKeyToIdx, idxInOld, elmToMove;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVval)) {
      oldStartVval = oldCh[++oldStartIdx];
    } else if (isUndef(oldEndVval)) {
      oldEndVval = oldCh[--oldEndIdx];
    } else if (sameVval(oldStartVval, newStartVval)) {
      patchVval(oldStartVval, newStartVval);
      oldStartVval = oldCh[++oldStartIdx];
      newStartVval = newCh[++newStartIdx];
    } else if (sameVval(oldEndVval, newEndVval)) {
      patchVval(oldEndVval, newEndVval);
      oldEndVval = oldCh[--oldEndIdx];
      newEndVval = newCh[--newEndIdx];
    } else if (sameVval(oldStartVval, newEndVval)) {
      patchVval(oldStartVval, newEndVval);
      oldStartVval = oldCh[++oldStartIdx];
      newEndVval = newCh[--newEndIdx];
    } else if (sameVval(oldEndVval, newStartVval)) {
      patchVval(oldEndVval, newStartVval);
      oldEndVval = oldCh[--oldEndIdx];
      newStartVval = newCh[++newStartIdx];
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = isDef(newStartVval.key) ? oldKeyToIdx[newStartVval.key] : null;

      if (isUndef(idxInOld)) {
        createVm(newStartVval);
        newStartVval = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];

        if (sameVval(elmToMove, newStartVval)) {
          patchVval(elmToMove, newStartVval);
          oldCh[idxInOld] = undefined;
          newStartVval = newCh[++newStartIdx];
        } else {
          createVm(newStartVval);
          newStartVval = newCh[++newStartIdx];
        }
      }
    }
  }

  if (oldStartIdx > oldEndIdx) {
    addVvals(newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVvals(oldCh, oldStartIdx, oldEndIdx);
  }
}

function addVvals(vvals, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createVm(vvals[startIdx]);
  }
}

function removeVvals(vvals, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vvals[startIdx];

    if (isDef(ch)) {
      ch.vm.$destroy();
      ch.vm = null;
    }
  }
}

function patchVval(oldVval, vval) {
  if (oldVval === vval) {
    return;
  }

  vval.vm = oldVval.vm;
  updateVval(vval);
}

function patchChildren(oldCh, ch) {
  if (isDef(oldCh) && isDef(ch)) {
    if (oldCh !== ch) updateChildren(oldCh, ch);
  } else if (isDef(ch)) {
    addVvals(ch, 0, ch.length - 1);
  } else if (isDef(oldCh)) {
    removeVvals(oldCh, 0, oldCh.length - 1);
  }
}

function h(tag, key, args) {
  return {
    tag: tag,
    key: key,
    args: args
  };
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "alpha", {
  enumerable: true,
  get: function get() {
    return _alpha.default;
  }
});
Object.defineProperty(exports, "alphaNum", {
  enumerable: true,
  get: function get() {
    return _alphaNum.default;
  }
});
Object.defineProperty(exports, "numeric", {
  enumerable: true,
  get: function get() {
    return _numeric.default;
  }
});
Object.defineProperty(exports, "between", {
  enumerable: true,
  get: function get() {
    return _between.default;
  }
});
Object.defineProperty(exports, "email", {
  enumerable: true,
  get: function get() {
    return _email.default;
  }
});
Object.defineProperty(exports, "ipAddress", {
  enumerable: true,
  get: function get() {
    return _ipAddress.default;
  }
});
Object.defineProperty(exports, "macAddress", {
  enumerable: true,
  get: function get() {
    return _macAddress.default;
  }
});
Object.defineProperty(exports, "maxLength", {
  enumerable: true,
  get: function get() {
    return _maxLength.default;
  }
});
Object.defineProperty(exports, "minLength", {
  enumerable: true,
  get: function get() {
    return _minLength.default;
  }
});
Object.defineProperty(exports, "required", {
  enumerable: true,
  get: function get() {
    return _required.default;
  }
});
Object.defineProperty(exports, "requiredIf", {
  enumerable: true,
  get: function get() {
    return _requiredIf.default;
  }
});
Object.defineProperty(exports, "requiredUnless", {
  enumerable: true,
  get: function get() {
    return _requiredUnless.default;
  }
});
Object.defineProperty(exports, "sameAs", {
  enumerable: true,
  get: function get() {
    return _sameAs.default;
  }
});
Object.defineProperty(exports, "url", {
  enumerable: true,
  get: function get() {
    return _url.default;
  }
});
Object.defineProperty(exports, "or", {
  enumerable: true,
  get: function get() {
    return _or.default;
  }
});
Object.defineProperty(exports, "and", {
  enumerable: true,
  get: function get() {
    return _and.default;
  }
});
Object.defineProperty(exports, "not", {
  enumerable: true,
  get: function get() {
    return _not.default;
  }
});
Object.defineProperty(exports, "minValue", {
  enumerable: true,
  get: function get() {
    return _minValue.default;
  }
});
Object.defineProperty(exports, "maxValue", {
  enumerable: true,
  get: function get() {
    return _maxValue.default;
  }
});
Object.defineProperty(exports, "integer", {
  enumerable: true,
  get: function get() {
    return _integer.default;
  }
});
Object.defineProperty(exports, "decimal", {
  enumerable: true,
  get: function get() {
    return _decimal.default;
  }
});
exports.helpers = void 0;

var _alpha = _interopRequireDefault(__webpack_require__(89));

var _alphaNum = _interopRequireDefault(__webpack_require__(92));

var _numeric = _interopRequireDefault(__webpack_require__(93));

var _between = _interopRequireDefault(__webpack_require__(94));

var _email = _interopRequireDefault(__webpack_require__(95));

var _ipAddress = _interopRequireDefault(__webpack_require__(96));

var _macAddress = _interopRequireDefault(__webpack_require__(97));

var _maxLength = _interopRequireDefault(__webpack_require__(98));

var _minLength = _interopRequireDefault(__webpack_require__(99));

var _required = _interopRequireDefault(__webpack_require__(100));

var _requiredIf = _interopRequireDefault(__webpack_require__(101));

var _requiredUnless = _interopRequireDefault(__webpack_require__(102));

var _sameAs = _interopRequireDefault(__webpack_require__(103));

var _url = _interopRequireDefault(__webpack_require__(104));

var _or = _interopRequireDefault(__webpack_require__(105));

var _and = _interopRequireDefault(__webpack_require__(106));

var _not = _interopRequireDefault(__webpack_require__(107));

var _minValue = _interopRequireDefault(__webpack_require__(108));

var _maxValue = _interopRequireDefault(__webpack_require__(109));

var _integer = _interopRequireDefault(__webpack_require__(110));

var _decimal = _interopRequireDefault(__webpack_require__(111));

var helpers = _interopRequireWildcard(__webpack_require__(0));

exports.helpers = helpers;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('alpha', /^[a-zA-Z]*$/);

exports.default = _default;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var withParams = Object({"MIX_PUSHER_APP_CLUSTER":"mt1","MIX_PUSHER_APP_KEY":"","NODE_ENV":"development"}).BUILD === 'web' ? __webpack_require__(91).withParams : __webpack_require__(20).withParams;
var _default = withParams;
exports.default = _default;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withParams = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

var fakeWithParams = function fakeWithParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return maybeValidator;
  }

  return paramsOrClosure(function () {});
};

var withParams = root.vuelidate ? root.vuelidate.withParams : fakeWithParams;
exports.withParams = withParams;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('alphaNum', /^[a-zA-Z0-9]*$/);

exports.default = _default;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('numeric', /^[0-9]*$/);

exports.default = _default;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(min, max) {
  return (0, _common.withParams)({
    type: 'between',
    min: min,
    max: max
  }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +min <= +value && +max >= +value;
  });
};

exports.default = _default;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

var _default = (0, _common.regex)('email', emailRegex);

exports.default = _default;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.withParams)({
  type: 'ipAddress'
}, function (value) {
  if (!(0, _common.req)(value)) {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  var nibbles = value.split('.');
  return nibbles.length === 4 && nibbles.every(nibbleValid);
});

exports.default = _default;

var nibbleValid = function nibbleValid(nibble) {
  if (nibble.length > 3 || nibble.length === 0) {
    return false;
  }

  if (nibble[0] === '0' && nibble !== '0') {
    return false;
  }

  if (!nibble.match(/^\d+$/)) {
    return false;
  }

  var numeric = +nibble | 0;
  return numeric >= 0 && numeric <= 255;
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default() {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
  return (0, _common.withParams)({
    type: 'macAddress'
  }, function (value) {
    if (!(0, _common.req)(value)) {
      return true;
    }

    if (typeof value !== 'string') {
      return false;
    }

    var parts = typeof separator === 'string' && separator !== '' ? value.split(separator) : value.length === 12 || value.length === 16 ? value.match(/.{2}/g) : null;
    return parts !== null && (parts.length === 6 || parts.length === 8) && parts.every(hexValid);
  });
};

exports.default = _default;

var hexValid = function hexValid(hex) {
  return hex.toLowerCase().match(/^[0-9a-f]{2}$/);
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(length) {
  return (0, _common.withParams)({
    type: 'maxLength',
    max: length
  }, function (value) {
    return !(0, _common.req)(value) || (0, _common.len)(value) <= length;
  });
};

exports.default = _default;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(length) {
  return (0, _common.withParams)({
    type: 'minLength',
    min: length
  }, function (value) {
    return !(0, _common.req)(value) || (0, _common.len)(value) >= length;
  });
};

exports.default = _default;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.withParams)({
  type: 'required'
}, _common.req);

exports.default = _default;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(prop) {
  return (0, _common.withParams)({
    type: 'requiredIf',
    prop: prop
  }, function (value, parentVm) {
    return (0, _common.ref)(prop, this, parentVm) ? (0, _common.req)(value) : true;
  });
};

exports.default = _default;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(prop) {
  return (0, _common.withParams)({
    type: 'requiredUnless',
    prop: prop
  }, function (value, parentVm) {
    return !(0, _common.ref)(prop, this, parentVm) ? (0, _common.req)(value) : true;
  });
};

exports.default = _default;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(equalTo) {
  return (0, _common.withParams)({
    type: 'sameAs',
    eq: equalTo
  }, function (value, parentVm) {
    return value === (0, _common.ref)(equalTo, this, parentVm);
  });
};

exports.default = _default;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

var _default = (0, _common.regex)('url', urlRegex);

exports.default = _default;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, _common.withParams)({
    type: 'or'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid || fn.apply(_this, args);
    }, false);
  });
};

exports.default = _default;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, _common.withParams)({
    type: 'and'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid && fn.apply(_this, args);
    }, true);
  });
};

exports.default = _default;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(validator) {
  return (0, _common.withParams)({
    type: 'not'
  }, function (value, vm) {
    return !(0, _common.req)(value) || !validator.call(this, value, vm);
  });
};

exports.default = _default;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(min) {
  return (0, _common.withParams)({
    type: 'minValue',
    min: min
  }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value >= +min;
  });
};

exports.default = _default;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(max) {
  return (0, _common.withParams)({
    type: 'maxValue',
    max: max
  }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value <= +max;
  });
};

exports.default = _default;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('integer', /^-?[0-9]*$/);

exports.default = _default;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('decimal', /^[-]?\d*(\.\d+)?$/);

exports.default = _default;

/***/ }),
/* 112 */,
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-content",
    [
      _c(
        "v-container",
        { attrs: { fluid: "", "fill-height": "" } },
        [
          _c(
            "v-layout",
            { attrs: { "align-center": "", "justify-center": "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs12: "", sm8: "", md4: "", lg4: "" } },
                [
                  _c(
                    "v-card",
                    { staticClass: "elevation-1 pa-3" },
                    [
                      _c(
                        "v-card-text",
                        [
                          _c(
                            "div",
                            { staticClass: "layout column align-center" },
                            [
                              _c("img", {
                                attrs: {
                                  src: "images/logo.png",
                                  alt: "Hotel Manager App Web",
                                  width: "120",
                                  height: "120"
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "h1",
                                { staticClass: "flex my-4 primary--text" },
                                [_vm._v("Hotel Manager")]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-form",
                            [
                              _c("v-text-field", {
                                attrs: {
                                  "error-messages": _vm.emailErrors,
                                  "append-icon": "email",
                                  label: "Email Đăng Nhập",
                                  required: ""
                                },
                                on: {
                                  input: function($event) {
                                    _vm.$v.email.$touch()
                                  },
                                  blur: function($event) {
                                    _vm.$v.email.$touch()
                                  }
                                },
                                model: {
                                  value: _vm.email,
                                  callback: function($$v) {
                                    _vm.email = $$v
                                  },
                                  expression: "email"
                                }
                              }),
                              _vm._v(" "),
                              _c("v-text-field", {
                                attrs: {
                                  type: "password",
                                  "append-icon": "lock",
                                  "error-messages": _vm.passErrors,
                                  label: "Mật Khẩu",
                                  required: ""
                                },
                                on: {
                                  input: function($event) {
                                    _vm.$v.password.$touch()
                                  },
                                  blur: function($event) {
                                    _vm.$v.password.$touch()
                                  }
                                },
                                model: {
                                  value: _vm.password,
                                  callback: function($$v) {
                                    _vm.password = $$v
                                  },
                                  expression: "password"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: {
                                block: "",
                                color: "primary",
                                loading: _vm.loading
                              },
                              on: { click: _vm.login }
                            },
                            [_vm._v("Login")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-alert",
                    {
                      attrs: {
                        value: _vm.alert,
                        type: "error",
                        transition: "scale-transition"
                      }
                    },
                    [_vm._v("\n          Login Fail\n        ")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-44d4d72c", module.exports)
  }
}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(115)
/* template */
var __vue_template__ = __webpack_require__(122)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\views\\Usersmg.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-619a9e25", Component.options)
  } else {
    hotAPI.reload("data-v-619a9e25", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ListUser__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ListUser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_ListUser__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ListUsers: __WEBPACK_IMPORTED_MODULE_0__components_ListUser___default.a
  }
});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(117)
/* template */
var __vue_template__ = __webpack_require__(121)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\ListUser.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-255fcb80", Component.options)
  } else {
    hotAPI.reload("data-v-255fcb80", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DialogRoom_Dialogeditroom_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DialogRoom_Dialogeditroom_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__DialogRoom_Dialogeditroom_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DialogRoom_Dialogdelroom_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DialogRoom_Dialogdelroom_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__DialogRoom_Dialogdelroom_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DialogUsers_DialogAddUser_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DialogUsers_DialogAddUser_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__DialogUsers_DialogAddUser_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DialogEditRoom: __WEBPACK_IMPORTED_MODULE_0__DialogRoom_Dialogeditroom_vue___default.a,
    DialogDelRoom: __WEBPACK_IMPORTED_MODULE_1__DialogRoom_Dialogdelroom_vue___default.a,
    DialogAddUser: __WEBPACK_IMPORTED_MODULE_2__DialogUsers_DialogAddUser_vue___default.a
  },
  data: function data() {
    return {
      searchQuery: "",
      pagination: {},
      page: 0,
      flag: true,
      arrclicked: [1],
      headers: [{ text: "Avartar", align: "left", sortable: false, value: "avartar" }, { text: "Họ và Tên", value: "name", align: "left" }, { text: "Số điện thoại", value: "birthday", align: "left" }, { text: "Địa chỉ mail", value: "address", align: "left" }, { text: "Chỉnh sửa", align: "left" }, { text: "Xóa", align: "left" }],
      users: []
    };
  },
  created: function created() {},
  mounted: function mounted() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_3_axios___default.a.get("/user").then(function (response) {
      _this.users = response.data.data;
      _this.pagination.totalItems = response.data.total;
      _this.pagination.rowsPerPage = response.data.to;
    }).catch(function (error) {
      return console.log(error);
    });
  },

  watch: {
    page: function page() {
      this.page = this.pagination.page;
      this.onPageChange(this.page);
    }
  },
  methods: {
    onPageChange: function onPageChange(newPage) {
      var _this2 = this;

      this.checkclick(newPage);
      if (this.flag) {
        __WEBPACK_IMPORTED_MODULE_3_axios___default()({
          method: "get",
          url: "/api/pusers?page=" + newPage
        }).then(function (response) {
          var arr = _this2.users.concat(response.data.data);
          __WEBPACK_IMPORTED_MODULE_4_vue___default.a.set(_this2.users = arr);
          _this2.arrclicked.push(newPage);
        }).catch(function (error) {
          return console.log(error);
        });
      } else {
        console.log("đã load xong");
      }
    },
    checkclick: function checkclick(newPage) {
      var _this3 = this;

      this.arrclicked.forEach(function (i) {
        if (i === newPage) _this3.flag = false;
        console.log(_this3.flag);
      });
    }
  },
  computed: {
    pages: function pages() {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    }
  }
});

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(119)
/* template */
var __vue_template__ = __webpack_require__(120)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\DialogUsers\\DialogAddUser.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d8d2e3e", Component.options)
  } else {
    hotAPI.reload("data-v-1d8d2e3e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      dialog: false,
      texthint: "Đây là trường bắt buộc không được để trống",
      statusroom: true,
      name: ""
    };
  },

  props: {
    room: {
      type: Object
    }
  },
  watch: {
    detailroom: function detailroom() {}
  },
  methods: {
    setinfor: function setinfor() {
      this.dialog = false;
    },
    addroom: function addroom() {}
  },
  created: function created() {}
});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", wrap: "" } },
    [
      _c(
        "v-card-text",
        { staticStyle: { position: "relative" } },
        [
          _c(
            "v-fab-transition",
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    color: "blue darken-1",
                    dark: "",
                    absolute: "",
                    top: "",
                    right: ""
                  },
                  on: {
                    click: function($event) {
                      _vm.dialog = !_vm.dialog
                    }
                  }
                },
                [_vm._v("\n                Thêm Nhân Viên Mới\n            ")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", "justify-center": "" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "600px" },
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { staticClass: "light-green darken-1" }, [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v("Thêm Nhân Viên Mới")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        { attrs: { "grid-list-md": "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { wrap: "" } },
                            [
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm12: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Tên Phòng",
                                      hint: _vm.texthint,
                                      required: ""
                                    },
                                    model: {
                                      value: _vm.name,
                                      callback: function($$v) {
                                        _vm.name = $$v
                                      },
                                      expression: "name"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md6: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Kiểu Phòng",
                                      hint: _vm.texthint,
                                      required: ""
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md6: "" } },
                                [
                                  _c("v-switch", {
                                    attrs: { label: "Trạng thái phòng" }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm12: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      color: "green",
                                      label: "Giá phòng",
                                      hint: _vm.texthint,
                                      required: ""
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "" } },
                                [
                                  _c("v-textarea", {
                                    attrs: {
                                      color: "green",
                                      type: "text",
                                      name: "input-5-3",
                                      label: "Mô tả"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "green darken-1", flat: "" },
                          nativeOn: {
                            click: function($event) {
                              _vm.dialog = false
                            }
                          }
                        },
                        [_vm._v("Hủy")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "green darken-1", flat: "" },
                          nativeOn: {
                            click: function($event) {
                              _vm.setinfor()
                            }
                          }
                        },
                        [_vm._v("Đồng ý")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1d8d2e3e", module.exports)
  }
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "grid-list-xs": "" } },
    [
      _c(
        "v-toolbar",
        {
          staticClass: "elevation-1",
          attrs: { flat: "", color: "blue lighten-2" }
        },
        [
          _c("v-toolbar-title", [_vm._v("Mục Quản Lý Nhân Viên")]),
          _vm._v(" "),
          _c("v-divider", {
            staticClass: "mx-2",
            attrs: { inset: "", vertical: "" }
          }),
          _vm._v(" "),
          _c("v-text-field", {
            staticStyle: { "margin-top": "20px" },
            attrs: {
              color: "blue lighten-2",
              label: "Tìm kiếm",
              "append-outer-icon": "search"
            },
            model: {
              value: _vm.searchQuery,
              callback: function($$v) {
                _vm.searchQuery = $$v
              },
              expression: "searchQuery"
            }
          }),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("dialog-add-user", { staticStyle: { "margin-top": "50px" } })
        ],
        1
      ),
      _vm._v(" "),
      _c("v-data-table", {
        staticClass: "elevation-1",
        attrs: {
          headers: _vm.headers,
          items: _vm.users,
          search: _vm.searchQuery,
          pagination: _vm.pagination,
          "hide-actions": ""
        },
        on: {
          "update:pagination": function($event) {
            _vm.pagination = $event
          }
        },
        scopedSlots: _vm._u([
          {
            key: "headerCell",
            fn: function(props) {
              return [
                _c("v-tooltip", { attrs: { bottom: "" } }, [
                  _c(
                    "span",
                    { attrs: { slot: "activator" }, slot: "activator" },
                    [
                      _vm._v(
                        "\n          " +
                          _vm._s(props.header.text) +
                          "\n        "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(
                      "\n          " + _vm._s(props.header.text) + "\n        "
                    )
                  ])
                ])
              ]
            }
          },
          {
            key: "items",
            fn: function(props) {
              return [
                _c("td", [_vm._v(_vm._s(props.item.avatar))]),
                _vm._v(" "),
                _c("td", { staticClass: "text-xs-right" }, [
                  _vm._v(_vm._s(props.item.name))
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "text-xs-right" }, [
                  _vm._v(_vm._s(props.item.phone))
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "text-xs-right" }, [
                  _vm._v(_vm._s(props.item.email))
                ]),
                _vm._v(" "),
                _c(
                  "td",
                  { staticClass: "text-xs-right" },
                  [_c("dialog-edit-room", { attrs: { room: props.item } })],
                  1
                ),
                _vm._v(" "),
                _c(
                  "td",
                  { staticClass: "text-xs-right" },
                  [_c("dialog-del-room", { attrs: { room: props.item } })],
                  1
                )
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "text-xs-center pt-2" },
        [
          _c("v-pagination", {
            attrs: { length: _vm.pages, circle: "" },
            on: { input: _vm.onPageChange },
            model: {
              value: _vm.pagination.page,
              callback: function($$v) {
                _vm.$set(_vm.pagination, "page", $$v)
              },
              expression: "pagination.page"
            }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-255fcb80", module.exports)
  }
}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "grid-list-xs": "" } },
    [_c("list-users")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-619a9e25", module.exports)
  }
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(124)
/* template */
var __vue_template__ = __webpack_require__(128)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\views\\Roomsmg.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d5e591d6", Component.options)
  } else {
    hotAPI.reload("data-v-d5e591d6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ListRooms__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ListRooms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_ListRooms__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ListRooms: __WEBPACK_IMPORTED_MODULE_0__components_ListRooms___default.a
  }
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(126)
/* template */
var __vue_template__ = __webpack_require__(127)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\ListRooms.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-36695a93", Component.options)
  } else {
    hotAPI.reload("data-v-36695a93", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DialogRoom_Dialogeditroom_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DialogRoom_Dialogeditroom_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__DialogRoom_Dialogeditroom_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DialogRoom_Dialogdelroom_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DialogRoom_Dialogdelroom_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__DialogRoom_Dialogdelroom_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DialogRoom_Dialogaddroom_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DialogRoom_Dialogaddroom_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__DialogRoom_Dialogaddroom_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DialogEditRoom: __WEBPACK_IMPORTED_MODULE_0__DialogRoom_Dialogeditroom_vue___default.a,
    DialogDelRoom: __WEBPACK_IMPORTED_MODULE_1__DialogRoom_Dialogdelroom_vue___default.a,
    DialogAddRoom: __WEBPACK_IMPORTED_MODULE_2__DialogRoom_Dialogaddroom_vue___default.a
  },
  data: function data() {
    return {
      searchQuery: "",
      pagination: {},
      page: 0,
      flag: true,
      arrclicked: [1],
      headers: [{
        text: "Tên Phòng",
        align: "left",
        sortable: false,
        value: "name"
      }, { text: "Loại Phòng", sortable: false, value: "type" }, { text: "Giá phòng", sortable: false, value: "price" }, { text: "Chỉnh sửa", sortable: false }, { text: "Xóa Phòng", sortable: false }],
      users: []
    };
  },
  created: function created() {},
  mounted: function mounted() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_3_axios___default.a.get("/room").then(function (response) {
      _this.users = response.data.data;
      _this.pagination.totalItems = response.data.total;
      _this.pagination.rowsPerPage = response.data.to;
    }).catch(function (error) {
      return console.log(error);
    });
  },

  watch: {
    page: function page() {
      this.page = this.pagination.page;
      this.onPageChange(this.page);
    }
  },
  methods: {
    onPageChange: function onPageChange(newPage) {
      var _this2 = this;

      this.checkclick(newPage);
      if (this.flag) {
        __WEBPACK_IMPORTED_MODULE_3_axios___default()({
          method: "get",
          url: "/api/prooms?page=" + newPage
        }).then(function (response) {
          var arr = _this2.users.concat(response.data.data);
          __WEBPACK_IMPORTED_MODULE_4_vue___default.a.set(_this2.users = arr);
          _this2.arrclicked.push(newPage);
        }).catch(function (error) {
          return console.log(error);
        });
      } else {
        console.log("đã load xong");
      }
    },
    checkclick: function checkclick(newPage) {
      var _this3 = this;

      this.arrclicked.forEach(function (i) {
        if (i === newPage) _this3.flag = false;
        console.log(_this3.flag);
      });
    }
  },
  computed: {
    pages: function pages() {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    }
  }
});

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "grid-list-xs": "" } },
    [
      _c(
        "v-toolbar",
        {
          staticClass: "elevation-1",
          attrs: { flat: "", color: "white--text blue lighten-2" }
        },
        [
          _c("v-toolbar-title", [_vm._v("Mục Quản Lý Phòng")]),
          _vm._v(" "),
          _c("v-divider", {
            staticClass: "mx-2",
            attrs: { inset: "", vertical: "" }
          }),
          _vm._v(" "),
          _c("v-text-field", {
            staticStyle: { "margin-top": "20px" },
            attrs: {
              color: "blue lighten-2",
              label: "Tìm kiếm",
              "append-outer-icon": "search"
            },
            model: {
              value: _vm.searchQuery,
              callback: function($$v) {
                _vm.searchQuery = $$v
              },
              expression: "searchQuery"
            }
          }),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("dialog-add-room", { staticStyle: { "margin-top": "50px" } })
        ],
        1
      ),
      _vm._v(" "),
      _c("v-data-table", {
        staticClass: "elevation-1",
        attrs: {
          headers: _vm.headers,
          items: _vm.users,
          search: _vm.searchQuery,
          pagination: _vm.pagination,
          "hide-actions": ""
        },
        on: {
          "update:pagination": function($event) {
            _vm.pagination = $event
          }
        },
        scopedSlots: _vm._u([
          {
            key: "headerCell",
            fn: function(props) {
              return [
                _c("v-tooltip", { attrs: { bottom: "" } }, [
                  _c(
                    "span",
                    { attrs: { slot: "activator" }, slot: "activator" },
                    [
                      _vm._v(
                        "\n          " +
                          _vm._s(props.header.text) +
                          "\n        "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(
                      "\n          " + _vm._s(props.header.text) + "\n        "
                    )
                  ])
                ])
              ]
            }
          },
          {
            key: "items",
            fn: function(props) {
              return [
                _c("td", { staticClass: "text-xs-left" }, [
                  _vm._v(_vm._s(props.item.name))
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "text-xs-left" }, [
                  _vm._v(_vm._s(props.item.type))
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "text-xs-left" }, [
                  _vm._v(_vm._s(props.item.price))
                ]),
                _vm._v(" "),
                _c(
                  "td",
                  { staticClass: "text-xs-right" },
                  [_c("dialog-edit-room", { attrs: { room: props.item } })],
                  1
                ),
                _vm._v(" "),
                _c(
                  "td",
                  { staticClass: "text-xs-right" },
                  [_c("dialog-del-room", { attrs: { room: props.item } })],
                  1
                )
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "text-xs-center pt-2" },
        [
          _c("v-pagination", {
            attrs: { length: _vm.pages, circle: "" },
            on: { input: _vm.onPageChange },
            model: {
              value: _vm.pagination.page,
              callback: function($$v) {
                _vm.$set(_vm.pagination, "page", $$v)
              },
              expression: "pagination.page"
            }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-36695a93", module.exports)
  }
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "grid-list-xs": "" } },
    [_c("list-rooms")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d5e591d6", module.exports)
  }
}

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(21);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["default"]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["default"].Store({
  state: {
    token: null,
    user: null
  },
  mutations: {
    TOKEN: function TOKEN(state, data) {
      state.token = data;
    },
    USER: function USER(state, data) {
      __WEBPACK_IMPORTED_MODULE_0_vue___default.a.$set(state, "user", data);
    }
  },
  actions: {
    Init: function Init(_ref) {
      var dispatch = _ref.dispatch;

      return new Promise(function (resolve, reject) {
        var token = localStorage.getItem("token");
        if (token) {
          dispatch("setToken", token);
          resolve(true);
        } else {
          resolve();
        }
      });
    },
    setToken: function setToken(_ref2, token) {
      var commit = _ref2.commit;

      commit("TOKEN", token);
      localStorage.setItem("token", token);
      // set token vao axios
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      // lay user
    }
  }
}));

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// import axios from "axios";
window.axios = __webpack_require__(6);
//
window.axios.defaults.baseURL = "http://hotel.test/api";
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// const instance = axios.create({
//   baseURL: "http://hotel.test/",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" }
// });
// Add a request interceptor
window.axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
window.axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // console.log("AAA", error.response.status);
  // Do something with response error
  return Promise.reject(error);
});
// export default axios;

/***/ })
],[22]);