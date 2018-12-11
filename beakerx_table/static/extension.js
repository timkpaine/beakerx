define(["services/config","services/kernels/comm","base/js/utils","base/js/namespace","base/js/events"], function(__WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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

var	fixUrls = __webpack_require__(9);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
// This file contains the javascript that is run when the notebook is loaded.
// It contains some requirejs configuration and the `load_ipython_extension`
// which is required for any notebook extension.
// Configure requirejs
if (window.require) {
  window.require.config({
    map: {
      "*": {
        "beakerx_table": "nbextensions/beakerx/index",
        "jupyter-js-widgets": "nbextensions/jupyter-js-widgets/extension",
        "@jupyter-widgets/base": "nbextensions/jupyter-js-widgets/extension",
        "@jupyter-widgets/controls": "nbextensions/jupyter-js-widgets/extension"
      }
    }
  });
}

__webpack_require__.p = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/beakerx/';

var extension = __webpack_require__(3).default;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  "use strict";

  return {
    load_ipython_extension: extension.load_ipython_extension
  };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_bkCoreManager__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_style_beakerx_scss__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_style_beakerx_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__shared_style_beakerx_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plot_bko_combinedplot_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plot_bko_combinedplot_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__plot_bko_combinedplot_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plot_bko_plot_css__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plot_bko_plot_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__plot_bko_plot_css__);
/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
// This file contains the javascript that is run when the notebook is loaded.
// It contains some requirejs configuration and the `load_ipython_extension`
// which is required for any notebook extension.
/// <reference path='../types/index.d.ts'/>




const configmod = __webpack_require__(15);
const comm = __webpack_require__(16);
const utils = __webpack_require__(17);
const Jupyter = __webpack_require__(18);
const events = __webpack_require__(19);
const big = __webpack_require__(20);
window['Big'] = big;
const base_url = utils.get_body_data('baseUrl');
const config = new configmod.ConfigSection('notebook', { base_url: base_url });
const MOD_NAME = 'init_cell';
const log_prefix = `[${MOD_NAME}]`;
let options = {
    run_on_kernel_ready: true
};
function callback_notebook_loaded() {
}
function extendWindowObject() {
    if (!window) {
        return;
    }
    const bkApp = __WEBPACK_IMPORTED_MODULE_0__shared_bkCoreManager__["a" /* default */].getBkApp();
    const bkObject = bkApp.getBeakerObject();
    const beakerxInstance = {
        prefs: bkObject.beakerObj.prefs
    };
    if (!window.beakerx) {
        window.beakerx = beakerxInstance;
    }
}
function setupNotebook() {
    if (Jupyter.NotebookList) {
        return; // Notebook not loaded
    }
    Jupyter.notebook.config.loaded
        .then(() => { options = Object.assign({}, options, Jupyter.notebook.config.data[MOD_NAME]); }, (reason) => { console.warn(log_prefix, 'error loading config:', reason); })
        .then(() => {
        Jupyter.notebook._fully_loaded
            ? callback_notebook_loaded()
            : events.on('notebook_loaded.Notebook', callback_notebook_loaded);
    })
        .catch((reason) => { console.error(log_prefix, 'unhandled error:', reason); });
}
const load_ipython_extension = () => {
    extendWindowObject();
    setupNotebook();
};
/* harmony export (immutable) */ __webpack_exports__["load_ipython_extension"] = load_ipython_extension;

/* harmony default export */ __webpack_exports__["default"] = ({
    load_ipython_extension
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
const beakerObj = {
    beakerObj: {
        prefs: {
            outputColumnLimit: 500,
            outputLineLimit: 100000,
            theme: {
                name: 'default',
                plotColors: [
                    "#FF1F77B4",
                    "#FFFF7F0E",
                    "#FF2CA02C",
                    "#FFD62728",
                    "#FF9467BD",
                    "#FF8C564B",
                    "#FFE377C2",
                    "#FF7F7F7F",
                    "#FFBCBD22",
                    "#FF17BECF",
                    "#FFAEC7E8",
                    "#FFFFBB78",
                    "#FF98DF8A",
                    "#FFFF9896",
                    "#FFC5B0D5",
                    "#FFC49C94",
                    "#FFF7B6D2",
                    "#FFC7C7C7",
                    "#FFDBDB8D",
                    "#FF9EDAE5"
                ]
            }
        }
    }
};
const bkCoreManager = {
    _bkAppImpl: {
        getBeakerObject: function () {
            return beakerObj;
        }
    },
    _prefs: {
        getTheme: function () {
            if (this.theme === undefined) {
                return "default";
            }
            return this.theme;
        }
    },
    getTheme: function () {
        return this._prefs.getTheme();
    },
    getBkApp: function () {
        return this._bkAppImpl;
    }
};
/* harmony default export */ __webpack_exports__["a"] = (bkCoreManager);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./beakerx.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./beakerx.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(7);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*\n *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *         http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n */\n/*\n *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *         http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n */\n.improveFonts .context-menu-root .context-menu-item span {\n  font-family: \"Lato\", Helvetica, sans-serif; }\n\n.bx-button[class*=\"icon\"] {\n  font: normal normal normal 14px/1 FontAwesome;\n  border: 1px solid #cccccc;\n  width: auto;\n  padding: 0 8px;\n  margin: 2px 4px; }\n\n.bx-button:before {\n  display: inline-block; }\n\n.bx-button.icon-close:before {\n  content: \"\\F00D\" !important; }\n\n.bx-button.icon-add:before {\n  content: \"\\F067\" !important; }\n\n.bx-button.icon-bg:before {\n  content: \"&\" !important;\n  font-family: \"Lato\", Helvetica, sans-serif;\n  font-weight: bold; }\n\n.bko-focused {\n  border: 1px solid #66bb6a !important; }\n  .bko-focused:before {\n    position: absolute;\n    display: block;\n    top: -1px;\n    left: -1px;\n    width: 5px;\n    height: calc(100% + 2px);\n    content: '';\n    background: #66bb6a; }\n\n.text-ellipsis * {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\n.bko-modal {\n  position: absolute;\n  left: 50%;\n  margin-left: -150px;\n  z-index: 9999;\n  width: auto;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n  overflow: visible;\n  animation: 1s fadeIn;\n  animation-fill-mode: forwards; }\n  .bko-modal .modal-dialog {\n    width: 300px; }\n  .bko-modal .modal-content {\n    border: none; }\n  .bko-modal .modal-body {\n    padding-top: 25px; }\n\n.jp-Toolbar-button.fa {\n  line-height: 100%; }\n\n.foldout-widget.widget-box {\n  display: block;\n  font-size: 14px; }\n  .foldout-widget.widget-box > .foldout-label {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    cursor: pointer;\n    color: #333333;\n    text-align: left;\n    line-height: normal;\n    text-indent: 16px;\n    border: 1px solid #c5c5c5;\n    background: #e6e6e6;\n    border-radius: 3px 3px 0 0;\n    position: relative;\n    margin: 2px 0 0 0;\n    padding: .5em .5em .5em .7em;\n    font-size: 100%;\n    width: 100%;\n    height: 36px; }\n    .foldout-widget.widget-box > .foldout-label:before {\n      content: '';\n      display: block;\n      position: absolute;\n      width: 16px;\n      height: 16px;\n      left: .5em;\n      top: 50%;\n      margin-top: -9px;\n      background-position: -32px -16px;\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAABDlBMVEVEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREQf23IJAAAAWnRSTlMAGf8QMwQIUL+CmS8iVXFAZmAaEzLMDSE8FkJISyAeWiMnMVMshTSHgMNqyM/GOEUcvLi+fKu1pYyqqK0fsin9AZ5RJO8KBgIDj6JilEqgr23fnEdjP29/kWiyI5UtAAAM80lEQVR4Aezb3XLzOgiFYXh8//e8T8MwQeNJ8yXd5T2zF8RiCfm3jWVZvoGUf7x+X+6AfLnEUZRkCZYf7EBQAsgoEFVNilpJ2gFafgkmP9eBoM1R2cEwg0GM6WDqh5ryXur4hxIGPZFD9vTrDbIe8e2QY4FtCsF5DU0dMAygdsCn6EM8d/AQkBzsJUsw+XeuApHIGiz3RmhZlmVZluVP3Anmd92Igbojh4IAg1/z+4CkZqSQn3wjld2AFlC3kM/9St2AHB8eg/yn9ZOnEQ9yIge/Zj8bCMS/AjD3rCzi+X1ATn4W9YMdMJDe+T4gT0sw5F4FlmVZlmVZ/gTiFcBLv++zBQTmHWdxxr3jw/AD5gOcM6DKekhN17SCvmkcjfPx53oMcjg4xslAoYp127GDWoIq3jo+0PWyY5CBuYJz+hCibAM1gBoOxg4yWzS3MCd/e8Xm9HkA5yPcKu+4xmFqQdz7RRwbuoA754CjKl7EV+eDWJZlWZZl6SQZL8EPDwCiMGhADMxqcm8A0WCOqsB5AOpnJVmlETk9QItIs4H9KPPxiRgLKDjPINQPi2TVpg4iRwOS4/hbyOQAY/2aaM5HKP485Ii5g4Dw1GB9jzgPQFefOoyInt/1nt9l9AEPBaLq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\"); }\n    .foldout-widget.widget-box > .foldout-label .foldout-label-content {\n      margin: 0;\n      padding: 0;\n      height: auto;\n      display: block;\n      line-height: 1.2em;\n      flex-shrink: 0; }\n  .foldout-widget.widget-box.collapsed {\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px; }\n  .foldout-widget.widget-box.active .foldout-label:before,\n  .foldout-widget.widget-box.active .widget-label:before {\n    background-position: -65px -16px; }\n  .foldout-widget.widget-box .foldout-preview {\n    line-height: 1.3em;\n    flex-shrink: 2;\n    flex-grow: 1;\n    text-indent: 0;\n    transition: opacity 0.1s ease-in-out;\n    padding: 0 15px; }\n    .foldout-widget.widget-box .foldout-preview .widget-html-content {\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap; }\n    .foldout-widget.widget-box .foldout-preview p {\n      margin: 0;\n      padding: 0; }\n  .foldout-widget.widget-box .foldout-content {\n    line-height: 1.3em;\n    padding: 0 2.2em;\n    border: 1px solid #cccccc;\n    border-top: 0;\n    border-radius: 0 0 3px 3px;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    transition: height 0.3s ease-in-out; }\n    .foldout-widget.widget-box .foldout-content:after, .foldout-widget.widget-box .foldout-content:before {\n      content: '';\n      height: 10px;\n      display: block;\n      width: 100%; }\n\n.bx-dark-theme .ui-icon,\n.bx-dark-theme .ui-widget-content .ui-icon {\n  background-image: url(" + escape(__webpack_require__(8)) + "); }\n\n@media (min-width: 1200px) {\n  .container.toolbar {\n    width: 100%; } }\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAABDlBMVEX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uKVtWAAAAWnRSTlMAGf8QMwQIUL+CmS8iVXFAZmAaEzLMDSE8FkJISyAeWiMnMVMshTSHgMNqyM/GOEUcvLi+fKu1pYyqqK0fsin9AZ5RJO8KBgIDj6JilEqgr23fnEdjP29/kWiyI5UtAAAM80lEQVR4Aezb3XLzOgiFYXh8//e8T8MwQeNJ8yXd5T2zF8RiCfm3jWVZvoGUf7x+X+6AfLnEUZRkCZYf7EBQAsgoEFVNilpJ2gFafgkmP9eBoM1R2cEwg0GM6WDqh5ryXur4hxIGPZFD9vTrDbIe8e2QY4FtCsF5DU0dMAygdsCn6EM8d/AQkBzsJUsw+XeuApHIGiz3RmhZlmVZluVP3Anmd92Igbojh4IAg1/z+4CkZqSQn3wjld2AFlC3kM/9St2AHB8eg/yn9ZOnEQ9yIge/Zj8bCMS/AjD3rCzi+X1ATn4W9YMdMJDe+T4gT0sw5F4FlmVZlmVZ/gTiFcBLv++zBQTmHWdxxr3jw/AD5gOcM6DKekhN17SCvmkcjfPx53oMcjg4xslAoYp127GDWoIq3jo+0PWyY5CBuYJz+hCibAM1gBoOxg4yWzS3MCd/e8Xm9HkA5yPcKu+4xmFqQdz7RRwbuoA754CjKl7EV+eDWJZlWZZl6SQZL8EPDwCiMGhADMxqcm8A0WCOqsB5AOpnJVmlETk9QItIs4H9KPPxiRgLKDjPINQPi2TVpg4iRwOS4/hbyOQAY/2aaM5HKP485Ii5g4Dw1GB9jzgPQFefOoyInt/1nt9l9AEPBaLq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"

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./bko-combinedplot.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./bko-combinedplot.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*\n*  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC\n*\n*  Licensed under the Apache License, Version 2.0 (the \"License\");\n*  you may not use this file except in compliance with the License.\n*  You may obtain a copy of the License at\n*\n*         http://www.apache.org/licenses/LICENSE-2.0\n*\n*  Unless required by applicable law or agreed to in writing, software\n*  distributed under the License is distributed on an \"AS IS\" BASIS,\n*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n*  See the License for the specific language governing permissions and\n*  limitations under the License.\n*/\n\n.combplot-plotcontainer {\n  background-color: #FEFEFE;\n  border: none;\n  position: relative;\n}\n\n.improveFonts .combplot-plotcontainer {\n  font-family: \"Lato\", Helvetica, sans-serif;\n}\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./bko-plot.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./bko-plot.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports
exports.i(__webpack_require__(14), "");

// module
exports.push([module.i, "/*\n *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *         http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n */\n\n.plot-plotcontainer {\n  background-color: #FEFEFE;\n  position: relative;\n  border-collapse: initial;\n  border: 1px solid transparent;\n  box-sizing: content-box;\n}\n\n.plot-test,\n.plot-cursorlabel,\n.plot-constlabel,\n.plot-tooltip,\n.plot-message-content,\n.plot-message-title {\n  font-family: verdana, helvetica, arial, sans-serif;\n}\n\n.plot-resp {\n  pointer-events: auto;\n}\n\n.plot-constline,\n.plot-line {\n  fill: none;\n}\n\n.plot-label,\n.plot-xylabel,\n.plot-legend-label {\n  line-height: 1.38462;\n}\n.plot-label {\n  font-size: 13px;\n}\n.plot-text {\n  font-size: 1.0em;\n}\n.plot-xylabel {\n  font-size: 15px;\n  text-anchor: middle;\n}\n\n.plot-cursorlabel,\n.plot-constlabel {\n  font-size: 0.75em;\n  color: white;\n  padding: 1px 5px;\n  pointer-events: none;\n  position: absolute;\n  width: auto;\n  height: auto;\n  border-radius: 2px;\n  display: inline-table;\n}\n\n.plot-gridline,\n.plot-gridline-base {\n  stroke-width: 1;\n  pointer-events: none;\n}\n.plot-gridline {\n  stroke: lightgrey;\n  stroke-width: 1;\n}\n.plot-gridline-base {\n  stroke: #333333;\n  stroke-width: 1;\n  opacity: .75;\n}\n.plot-tick {\n  stroke: #333333;\n}\n\n\n.plot-constline,\n.plot-constband,\n.plot-cursor {\n  pointer-events: none;\n}\n\n.plot-bar,\n.plot-stem {\n  pointer-events: auto;\n}\n\n.plot-pointrect,\n.plot-pointcircle,\n.plot-pointdiamond {\n  /* to be added if needed */\n}\n\n.plot-locatebox {\n  fill: #003366;\n  opacity: 0.2;\n}\n\n.plot-truncatebox {\n  fill: #FEFEFE;\n}\n\n.plot-title {\n  text-align: center;\n  font-weight: bold;\n  font-size: 1.2em;\n  margin: 5px;\n}\n\n.plot-legendbox {\n  width: 10px;\n  height: 10px;\n  margin: 0px 5px;\n  display: inline-block;\n  vertical-align: baseline;\n}\n\n.plot-legendcheckbox {\n  margin: 0px !important;\n  margin-right: 5px;\n}\n\n.plot-legendtext {\n  pointer-events: none;\n}\n\n.plot-legendlod {\n  margin: 0px 5px 0px 10px;\n  display: inline-block;\n}\n.plot-legendlod ul {\n  list-style: none;\n  margin: 0;\n}\n.plot-legendlod ul li a {\n  cursor: pointer;\n}\n\n.plot-legendlodtype {\n  color: #73be3b;\n  cursor: pointer;\n  display: inline-block;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAYAAADwdn+XAAAAUUlEQVQoFZ3RSwoAIAhF0XK3rqJahbuVeEERlf0EZ94z0YtIJKLgPkZVk0f3gyBm5liAV6TG6Bpwi/TxBJyQMV4CFrKKTWBErBh328F3sLujDB1vOtcHeTAhAAAAAElFTkSuQmCC') no-repeat center right;\n  padding-right: 13px;\n  background-size: 8px;\n}\n.plot-legendlodtype:hover {\n  color: #73be3b;\n  text-decoration: none;\n}\n\n.plot-plotlegendcontainer {\n  position: relative;\n}\n\n.plot-legend {\n  position: absolute;\n  background-color: #FEFEFE;\n}\n\n.plot-legenddraggable {\n  cursor: pointer;\n}\n\n.plot-legendscrollablecontainer {\n  border: 1px solid #BBBBBB;\n  border-collapse: initial; /* override the global table setting*/\n  overflow-y: visible;\n}\n\n.plot-legendscrollablecontainer .plot-legenddraggable {\n  padding: .25em .25em 0 .25em\n}\n.plot-legendscrollablecontainer .plot-legenddraggable.hasScroll {\n  padding-right: 23px\n}\n\n.plot-legendline{\n  white-space: nowrap;\n}\n\n.plot-legenditeminline{\n  display: inline-block;\n  margin-right: 10px;\n  position: relative;\n}\n\n.plot-legenditeminrow {\n}\n\n.plot-respdot,\n.plot-respstem {\n  fill: white;\n  fill-opacity: 0.75;\n  stroke-width: 1;\n  border-radius: 2.5px;\n}\n\n.plot-tooltip {\n  font-size: 0.8em;\n  position: absolute;\n  display: inline-table;\n  border: 1px solid;\n  background-color: white;\n  padding: 0.8em;\n  opacity: 0;\n  transition: opacity 0.4s;\n}\n\n.plot-tooltip > div {\n  width: 100%;\n  overflow: hidden;\n}\n\n.text-line-style {\n  fill: black;\n  stroke: black\n}\n\n.fa.fa-times {\n  float: right;\n  cursor: pointer;\n}\n\n.plot-message-content {\n  vertical-align: middle;\n}\n.plot-message-title {\n  font-weight: bold;\n}\n.plot-message {\n  min-width: 150px;\n  min-height: 50px;\n  font-size: 0.8em;\n  position: absolute;\n  border: 1px solid gray;\n  background-color: white;\n  padding: 0.8em;\n  display: inline-table;\n}\n\n.plot-lodbox {\n  stroke: black;\n  stroke-width: 1;\n}\n\n.plot-lodavg,\n.plot-lodavgline {\n  pointer-events: none;\n}\n\n.plot-lodavgline {\n  fill: none;\n  stroke: black;\n  stroke-width: 1.5;\n}\n.svg-export {\n  font-size: 14px;\n  line-height: 1.38462;\n  color: #333333;\n  background-color: white;\n}\n.nocollapsing-margins:after\n{\n  content: \"\\A0\"; /* No-break space character */\n  display: block;\n  overflow: hidden;\n  height: 0;\n}\n\n.plot-legend-axis {\n  stroke: #333333;\n  stroke-width: 1;\n}\n.plot-legend-tick {\n  stroke: #333333;\n}\n\n.plot-legend-histogram {\n  stroke: #333333;\n  stroke-width: 1;\n  opacity: 0.5;\n  fill: #333333;\n}\n.heatmap-tooltip{\n  color: white;\n  background-color: rgba(0,107,179,0.5);\n  font-size: 13px;\n  line-height: 1.38462;\n  padding: 0.5em;\n}\n\n.svg-export .plot-legendcheckbox {\n  display: none;\n}\n\n.svg-export {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n.svg-export.improveFonts {\n  font-family: \"Lato\", Helvetica, sans-serif;\n}\n\n.improveFonts .plot-plotcontainer,\n.improveFonts .plot-label,\n.improveFonts .plot-xylabel,\n.improveFonts .plot-legend-label,\n.improveFonts .plot-title,\n.improveFonts .heatmap-tooltip {\n  font-family: \"Lato\", Helvetica, sans-serif;\n}\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*-----------------------------------------------------------------------------\r\n| Copyright (c) 2014-2017, PhosphorJS Contributors\r\n|\r\n| Distributed under the terms of the BSD 3-Clause License.\r\n|\r\n| The full license is in the file LICENSE, distributed with this software.\r\n|----------------------------------------------------------------------------*/\r\n\r\n\r\n.p-Menu {\r\n  z-index: 10000;\r\n  position: absolute;\r\n  white-space: nowrap;\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n  outline: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n\r\n\r\n.p-Menu-content {\r\n  margin: 0;\r\n  padding: 0;\r\n  display: table;\r\n  list-style-type: none;\r\n}\r\n\r\n\r\n.p-Menu-item {\r\n  display: table-row;\r\n}\r\n\r\n\r\n.p-Menu-item.p-mod-hidden,\r\n.p-Menu-item.p-mod-collapsed {\r\n  display: none !important;\r\n}\r\n\r\n\r\n.p-Menu-itemIcon,\r\n.p-Menu-itemSubmenuIcon {\r\n  display: table-cell;\r\n  text-align: center;\r\n}\r\n\r\n\r\n.p-Menu-itemLabel {\r\n  display: table-cell;\r\n  text-align: left;\r\n}\r\n\r\n\r\n.p-Menu-itemShortcut {\r\n  display: table-cell;\r\n  text-align: right;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* big.js v3.1.3 https://github.com/MikeMcl/big.js/LICENCE */
;(function (global) {
    'use strict';

/*
  big.js v3.1.3
  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
  https://github.com/MikeMcl/big.js/
  Copyright (c) 2014 Michael Mclaughlin <M8ch88l@gmail.com>
  MIT Expat Licence
*/

/***************************** EDITABLE DEFAULTS ******************************/

    // The default values below must be integers within the stated ranges.

    /*
     * The maximum number of decimal places of the results of operations
     * involving division: div and sqrt, and pow with negative exponents.
     */
    var DP = 20,                           // 0 to MAX_DP

        /*
         * The rounding mode used when rounding to the above decimal places.
         *
         * 0 Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
         * 1 To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
         * 2 To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
         * 3 Away from zero.                                  (ROUND_UP)
         */
        RM = 1,                            // 0, 1, 2 or 3

        // The maximum value of DP and Big.DP.
        MAX_DP = 1E6,                      // 0 to 1000000

        // The maximum magnitude of the exponent argument to the pow method.
        MAX_POWER = 1E6,                   // 1 to 1000000

        /*
         * The exponent value at and beneath which toString returns exponential
         * notation.
         * JavaScript's Number type: -7
         * -1000000 is the minimum recommended exponent value of a Big.
         */
        E_NEG = -7,                   // 0 to -1000000

        /*
         * The exponent value at and above which toString returns exponential
         * notation.
         * JavaScript's Number type: 21
         * 1000000 is the maximum recommended exponent value of a Big.
         * (This limit is not enforced or checked.)
         */
        E_POS = 21,                   // 0 to 1000000

/******************************************************************************/

        // The shared prototype object.
        P = {},
        isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        Big;


    /*
     * Create and return a Big constructor.
     *
     */
    function bigFactory() {

        /*
         * The Big constructor and exported function.
         * Create and return a new instance of a Big number object.
         *
         * n {number|string|Big} A numeric value.
         */
        function Big(n) {
            var x = this;

            // Enable constructor usage without new.
            if (!(x instanceof Big)) {
                return n === void 0 ? bigFactory() : new Big(n);
            }

            // Duplicate.
            if (n instanceof Big) {
                x.s = n.s;
                x.e = n.e;
                x.c = n.c.slice();
            } else {
                parse(x, n);
            }

            /*
             * Retain a reference to this Big constructor, and shadow
             * Big.prototype.constructor which points to Object.
             */
            x.constructor = Big;
        }

        Big.prototype = P;
        Big.DP = DP;
        Big.RM = RM;
        Big.E_NEG = E_NEG;
        Big.E_POS = E_POS;

        return Big;
    }


    // Private functions


    /*
     * Return a string representing the value of Big x in normal or exponential
     * notation to dp fixed decimal places or significant digits.
     *
     * x {Big} The Big to format.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * toE {number} 1 (toExponential), 2 (toPrecision) or undefined (toFixed).
     */
    function format(x, dp, toE) {
        var Big = x.constructor,

            // The index (normal notation) of the digit that may be rounded up.
            i = dp - (x = new Big(x)).e,
            c = x.c;

        // Round?
        if (c.length > ++dp) {
            rnd(x, i, Big.RM);
        }

        if (!c[0]) {
            ++i;
        } else if (toE) {
            i = dp;

        // toFixed
        } else {
            c = x.c;

            // Recalculate i as x.e may have changed if value rounded up.
            i = x.e + i + 1;
        }

        // Append zeros?
        for (; c.length < i; c.push(0)) {
        }
        i = x.e;

        /*
         * toPrecision returns exponential notation if the number of
         * significant digits specified is less than the number of digits
         * necessary to represent the integer part of the value in normal
         * notation.
         */
        return toE === 1 || toE && (dp <= i || i <= Big.E_NEG) ?

          // Exponential notation.
          (x.s < 0 && c[0] ? '-' : '') +
            (c.length > 1 ? c[0] + '.' + c.join('').slice(1) : c[0]) +
              (i < 0 ? 'e' : 'e+') + i

          // Normal notation.
          : x.toString();
    }


    /*
     * Parse the number or string value passed to a Big constructor.
     *
     * x {Big} A Big number instance.
     * n {number|string} A numeric value.
     */
    function parse(x, n) {
        var e, i, nL;

        // Minus zero?
        if (n === 0 && 1 / n < 0) {
            n = '-0';

        // Ensure n is string and check validity.
        } else if (!isValid.test(n += '')) {
            throwErr(NaN);
        }

        // Determine sign.
        x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

        // Decimal point?
        if ((e = n.indexOf('.')) > -1) {
            n = n.replace('.', '');
        }

        // Exponential form?
        if ((i = n.search(/e/i)) > 0) {

            // Determine exponent.
            if (e < 0) {
                e = i;
            }
            e += +n.slice(i + 1);
            n = n.substring(0, i);

        } else if (e < 0) {

            // Integer.
            e = n.length;
        }

        nL = n.length;

        // Determine leading zeros.
        for (i = 0; i < nL && n.charAt(i) == '0'; i++) {
        }

        if (i == nL) {

            // Zero.
            x.c = [ x.e = 0 ];
        } else {

            // Determine trailing zeros.
            for (; nL > 0 && n.charAt(--nL) == '0';) {
            }

            x.e = e - i - 1;
            x.c = [];

            // Convert string to array of digits without leading/trailing zeros.
            //for (e = 0; i <= nL; x.c[e++] = +n.charAt(i++)) {
            for (; i <= nL; x.c.push(+n.charAt(i++))) {
            }
        }

        return x;
    }


    /*
     * Round Big x to a maximum of dp decimal places using rounding mode rm.
     * Called by div, sqrt and round.
     *
     * x {Big} The Big to round.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * rm {number} 0, 1, 2 or 3 (DOWN, HALF_UP, HALF_EVEN, UP)
     * [more] {boolean} Whether the result of division was truncated.
     */
    function rnd(x, dp, rm, more) {
        var u,
            xc = x.c,
            i = x.e + dp + 1;

        if (rm === 1) {

            // xc[i] is the digit after the digit that may be rounded up.
            more = xc[i] >= 5;
        } else if (rm === 2) {
            more = xc[i] > 5 || xc[i] == 5 &&
              (more || i < 0 || xc[i + 1] !== u || xc[i - 1] & 1);
        } else if (rm === 3) {
            more = more || xc[i] !== u || i < 0;
        } else {
            more = false;

            if (rm !== 0) {
                throwErr('!Big.RM!');
            }
        }

        if (i < 1 || !xc[0]) {

            if (more) {

                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                x.e = -dp;
                x.c = [1];
            } else {

                // Zero.
                x.c = [x.e = 0];
            }
        } else {

            // Remove any digits after the required decimal places.
            xc.length = i--;

            // Round up?
            if (more) {

                // Rounding up may mean the previous digit has to be rounded up.
                for (; ++xc[i] > 9;) {
                    xc[i] = 0;

                    if (!i--) {
                        ++x.e;
                        xc.unshift(1);
                    }
                }
            }

            // Remove trailing zeros.
            for (i = xc.length; !xc[--i]; xc.pop()) {
            }
        }

        return x;
    }


    /*
     * Throw a BigError.
     *
     * message {string} The error message.
     */
    function throwErr(message) {
        var err = new Error(message);
        err.name = 'BigError';

        throw err;
    }


    // Prototype/instance methods


    /*
     * Return a new Big whose value is the absolute value of this Big.
     */
    P.abs = function () {
        var x = new this.constructor(this);
        x.s = 1;

        return x;
    };


    /*
     * Return
     * 1 if the value of this Big is greater than the value of Big y,
     * -1 if the value of this Big is less than the value of Big y, or
     * 0 if they have the same value.
    */
    P.cmp = function (y) {
        var xNeg,
            x = this,
            xc = x.c,
            yc = (y = new x.constructor(y)).c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e;

        // Either zero?
        if (!xc[0] || !yc[0]) {
            return !xc[0] ? !yc[0] ? 0 : -j : i;
        }

        // Signs differ?
        if (i != j) {
            return i;
        }
        xNeg = i < 0;

        // Compare exponents.
        if (k != l) {
            return k > l ^ xNeg ? 1 : -1;
        }

        i = -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;

        // Compare digit by digit.
        for (; ++i < j;) {

            if (xc[i] != yc[i]) {
                return xc[i] > yc[i] ^ xNeg ? 1 : -1;
            }
        }

        // Compare lengths.
        return k == l ? 0 : k > l ^ xNeg ? 1 : -1;
    };


    /*
     * Return a new Big whose value is the value of this Big divided by the
     * value of Big y, rounded, if necessary, to a maximum of Big.DP decimal
     * places using rounding mode Big.RM.
     */
    P.div = function (y) {
        var x = this,
            Big = x.constructor,
            // dividend
            dvd = x.c,
            //divisor
            dvs = (y = new Big(y)).c,
            s = x.s == y.s ? 1 : -1,
            dp = Big.DP;

        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throwErr('!Big.DP!');
        }

        // Either 0?
        if (!dvd[0] || !dvs[0]) {

            // If both are 0, throw NaN
            if (dvd[0] == dvs[0]) {
                throwErr(NaN);
            }

            // If dvs is 0, throw +-Infinity.
            if (!dvs[0]) {
                throwErr(s / 0);
            }

            // dvd is 0, return +-0.
            return new Big(s * 0);
        }

        var dvsL, dvsT, next, cmp, remI, u,
            dvsZ = dvs.slice(),
            dvdI = dvsL = dvs.length,
            dvdL = dvd.length,
            // remainder
            rem = dvd.slice(0, dvsL),
            remL = rem.length,
            // quotient
            q = y,
            qc = q.c = [],
            qi = 0,
            digits = dp + (q.e = x.e - y.e) + 1;

        q.s = s;
        s = digits < 0 ? 0 : digits;

        // Create version of divisor with leading zero.
        dvsZ.unshift(0);

        // Add zeros to make remainder as long as divisor.
        for (; remL++ < dvsL; rem.push(0)) {
        }

        do {

            // 'next' is how many times the divisor goes into current remainder.
            for (next = 0; next < 10; next++) {

                // Compare divisor and remainder.
                if (dvsL != (remL = rem.length)) {
                    cmp = dvsL > remL ? 1 : -1;
                } else {

                    for (remI = -1, cmp = 0; ++remI < dvsL;) {

                        if (dvs[remI] != rem[remI]) {
                            cmp = dvs[remI] > rem[remI] ? 1 : -1;
                            break;
                        }
                    }
                }

                // If divisor < remainder, subtract divisor from remainder.
                if (cmp < 0) {

                    // Remainder can't be more than 1 digit longer than divisor.
                    // Equalise lengths using divisor with extra leading zero?
                    for (dvsT = remL == dvsL ? dvs : dvsZ; remL;) {

                        if (rem[--remL] < dvsT[remL]) {
                            remI = remL;

                            for (; remI && !rem[--remI]; rem[remI] = 9) {
                            }
                            --rem[remI];
                            rem[remL] += 10;
                        }
                        rem[remL] -= dvsT[remL];
                    }
                    for (; !rem[0]; rem.shift()) {
                    }
                } else {
                    break;
                }
            }

            // Add the 'next' digit to the result array.
            qc[qi++] = cmp ? next : ++next;

            // Update the remainder.
            if (rem[0] && cmp) {
                rem[remL] = dvd[dvdI] || 0;
            } else {
                rem = [ dvd[dvdI] ];
            }

        } while ((dvdI++ < dvdL || rem[0] !== u) && s--);

        // Leading zero? Do not remove if result is simply zero (qi == 1).
        if (!qc[0] && qi != 1) {

            // There can't be more than one zero.
            qc.shift();
            q.e--;
        }

        // Round?
        if (qi > digits) {
            rnd(q, dp, Big.RM, rem[0] !== u);
        }

        return q;
    };


    /*
     * Return true if the value of this Big is equal to the value of Big y,
     * otherwise returns false.
     */
    P.eq = function (y) {
        return !this.cmp(y);
    };


    /*
     * Return true if the value of this Big is greater than the value of Big y,
     * otherwise returns false.
     */
    P.gt = function (y) {
        return this.cmp(y) > 0;
    };


    /*
     * Return true if the value of this Big is greater than or equal to the
     * value of Big y, otherwise returns false.
     */
    P.gte = function (y) {
        return this.cmp(y) > -1;
    };


    /*
     * Return true if the value of this Big is less than the value of Big y,
     * otherwise returns false.
     */
    P.lt = function (y) {
        return this.cmp(y) < 0;
    };


    /*
     * Return true if the value of this Big is less than or equal to the value
     * of Big y, otherwise returns false.
     */
    P.lte = function (y) {
         return this.cmp(y) < 1;
    };


    /*
     * Return a new Big whose value is the value of this Big minus the value
     * of Big y.
     */
    P.sub = P.minus = function (y) {
        var i, j, t, xLTy,
            x = this,
            Big = x.constructor,
            a = x.s,
            b = (y = new Big(y)).s;

        // Signs differ?
        if (a != b) {
            y.s = -b;
            return x.plus(y);
        }

        var xc = x.c.slice(),
            xe = x.e,
            yc = y.c,
            ye = y.e;

        // Either zero?
        if (!xc[0] || !yc[0]) {

            // y is non-zero? x is non-zero? Or both are zero.
            return yc[0] ? (y.s = -b, y) : new Big(xc[0] ? x : 0);
        }

        // Determine which is the bigger number.
        // Prepend zeros to equalise exponents.
        if (a = xe - ye) {

            if (xLTy = a < 0) {
                a = -a;
                t = xc;
            } else {
                ye = xe;
                t = yc;
            }

            t.reverse();
            for (b = a; b--; t.push(0)) {
            }
            t.reverse();
        } else {

            // Exponents equal. Check digit by digit.
            j = ((xLTy = xc.length < yc.length) ? xc : yc).length;

            for (a = b = 0; b < j; b++) {

                if (xc[b] != yc[b]) {
                    xLTy = xc[b] < yc[b];
                    break;
                }
            }
        }

        // x < y? Point xc to the array of the bigger number.
        if (xLTy) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
        }

        /*
         * Append zeros to xc if shorter. No need to add zeros to yc if shorter
         * as subtraction only needs to start at yc.length.
         */
        if (( b = (j = yc.length) - (i = xc.length) ) > 0) {

            for (; b--; xc[i++] = 0) {
            }
        }

        // Subtract yc from xc.
        for (b = i; j > a;){

            if (xc[--j] < yc[j]) {

                for (i = j; i && !xc[--i]; xc[i] = 9) {
                }
                --xc[i];
                xc[j] += 10;
            }
            xc[j] -= yc[j];
        }

        // Remove trailing zeros.
        for (; xc[--b] === 0; xc.pop()) {
        }

        // Remove leading zeros and adjust exponent accordingly.
        for (; xc[0] === 0;) {
            xc.shift();
            --ye;
        }

        if (!xc[0]) {

            // n - n = +0
            y.s = 1;

            // Result must be zero.
            xc = [ye = 0];
        }

        y.c = xc;
        y.e = ye;

        return y;
    };


    /*
     * Return a new Big whose value is the value of this Big modulo the
     * value of Big y.
     */
    P.mod = function (y) {
        var yGTx,
            x = this,
            Big = x.constructor,
            a = x.s,
            b = (y = new Big(y)).s;

        if (!y.c[0]) {
            throwErr(NaN);
        }

        x.s = y.s = 1;
        yGTx = y.cmp(x) == 1;
        x.s = a;
        y.s = b;

        if (yGTx) {
            return new Big(x);
        }

        a = Big.DP;
        b = Big.RM;
        Big.DP = Big.RM = 0;
        x = x.div(y);
        Big.DP = a;
        Big.RM = b;

        return this.minus( x.times(y) );
    };


    /*
     * Return a new Big whose value is the value of this Big plus the value
     * of Big y.
     */
    P.add = P.plus = function (y) {
        var t,
            x = this,
            Big = x.constructor,
            a = x.s,
            b = (y = new Big(y)).s;

        // Signs differ?
        if (a != b) {
            y.s = -b;
            return x.minus(y);
        }

        var xe = x.e,
            xc = x.c,
            ye = y.e,
            yc = y.c;

        // Either zero?
        if (!xc[0] || !yc[0]) {

            // y is non-zero? x is non-zero? Or both are zero.
            return yc[0] ? y : new Big(xc[0] ? x : a * 0);
        }
        xc = xc.slice();

        // Prepend zeros to equalise exponents.
        // Note: Faster to use reverse then do unshifts.
        if (a = xe - ye) {

            if (a > 0) {
                ye = xe;
                t = yc;
            } else {
                a = -a;
                t = xc;
            }

            t.reverse();
            for (; a--; t.push(0)) {
            }
            t.reverse();
        }

        // Point xc to the longer array.
        if (xc.length - yc.length < 0) {
            t = yc;
            yc = xc;
            xc = t;
        }
        a = yc.length;

        /*
         * Only start adding at yc.length - 1 as the further digits of xc can be
         * left as they are.
         */
        for (b = 0; a;) {
            b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;
            xc[a] %= 10;
        }

        // No need to check for zero, as +x + +y != 0 && -x + -y != 0

        if (b) {
            xc.unshift(b);
            ++ye;
        }

         // Remove trailing zeros.
        for (a = xc.length; xc[--a] === 0; xc.pop()) {
        }

        y.c = xc;
        y.e = ye;

        return y;
    };


    /*
     * Return a Big whose value is the value of this Big raised to the power n.
     * If n is negative, round, if necessary, to a maximum of Big.DP decimal
     * places using rounding mode Big.RM.
     *
     * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
     */
    P.pow = function (n) {
        var x = this,
            one = new x.constructor(1),
            y = one,
            isNeg = n < 0;

        if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
            throwErr('!pow!');
        }

        n = isNeg ? -n : n;

        for (;;) {

            if (n & 1) {
                y = y.times(x);
            }
            n >>= 1;

            if (!n) {
                break;
            }
            x = x.times(x);
        }

        return isNeg ? one.div(y) : y;
    };


    /*
     * Return a new Big whose value is the value of this Big rounded to a
     * maximum of dp decimal places using rounding mode rm.
     * If dp is not specified, round to 0 decimal places.
     * If rm is not specified, use Big.RM.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     * [rm] 0, 1, 2 or 3 (ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP)
     */
    P.round = function (dp, rm) {
        var x = this,
            Big = x.constructor;

        if (dp == null) {
            dp = 0;
        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throwErr('!round!');
        }
        rnd(x = new Big(x), dp, rm == null ? Big.RM : rm);

        return x;
    };


    /*
     * Return a new Big whose value is the square root of the value of this Big,
     * rounded, if necessary, to a maximum of Big.DP decimal places using
     * rounding mode Big.RM.
     */
    P.sqrt = function () {
        var estimate, r, approx,
            x = this,
            Big = x.constructor,
            xc = x.c,
            i = x.s,
            e = x.e,
            half = new Big('0.5');

        // Zero?
        if (!xc[0]) {
            return new Big(x);
        }

        // If negative, throw NaN.
        if (i < 0) {
            throwErr(NaN);
        }

        // Estimate.
        i = Math.sqrt(x.toString());

        // Math.sqrt underflow/overflow?
        // Pass x to Math.sqrt as integer, then adjust the result exponent.
        if (i === 0 || i === 1 / 0) {
            estimate = xc.join('');

            if (!(estimate.length + e & 1)) {
                estimate += '0';
            }

            r = new Big( Math.sqrt(estimate).toString() );
            r.e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
        } else {
            r = new Big(i.toString());
        }

        i = r.e + (Big.DP += 4);

        // Newton-Raphson iteration.
        do {
            approx = r;
            r = half.times( approx.plus( x.div(approx) ) );
        } while ( approx.c.slice(0, i).join('') !==
                       r.c.slice(0, i).join('') );

        rnd(r, Big.DP -= 4, Big.RM);

        return r;
    };


    /*
     * Return a new Big whose value is the value of this Big times the value of
     * Big y.
     */
    P.mul = P.times = function (y) {
        var c,
            x = this,
            Big = x.constructor,
            xc = x.c,
            yc = (y = new Big(y)).c,
            a = xc.length,
            b = yc.length,
            i = x.e,
            j = y.e;

        // Determine sign of result.
        y.s = x.s == y.s ? 1 : -1;

        // Return signed 0 if either 0.
        if (!xc[0] || !yc[0]) {
            return new Big(y.s * 0);
        }

        // Initialise exponent of result as x.e + y.e.
        y.e = i + j;

        // If array xc has fewer digits than yc, swap xc and yc, and lengths.
        if (a < b) {
            c = xc;
            xc = yc;
            yc = c;
            j = a;
            a = b;
            b = j;
        }

        // Initialise coefficient array of result with zeros.
        for (c = new Array(j = a + b); j--; c[j] = 0) {
        }

        // Multiply.

        // i is initially xc.length.
        for (i = b; i--;) {
            b = 0;

            // a is yc.length.
            for (j = a + i; j > i;) {

                // Current sum of products at this digit position, plus carry.
                b = c[j] + yc[i] * xc[j - i - 1] + b;
                c[j--] = b % 10;

                // carry
                b = b / 10 | 0;
            }
            c[j] = (c[j] + b) % 10;
        }

        // Increment result exponent if there is a final carry.
        if (b) {
            ++y.e;
        }

        // Remove any leading zero.
        if (!c[0]) {
            c.shift();
        }

        // Remove trailing zeros.
        for (i = c.length; !c[--i]; c.pop()) {
        }
        y.c = c;

        return y;
    };


    /*
     * Return a string representing the value of this Big.
     * Return exponential notation if this Big has a positive exponent equal to
     * or greater than Big.E_POS, or a negative exponent equal to or less than
     * Big.E_NEG.
     */
    P.toString = P.valueOf = P.toJSON = function () {
        var x = this,
            Big = x.constructor,
            e = x.e,
            str = x.c.join(''),
            strL = str.length;

        // Exponential notation?
        if (e <= Big.E_NEG || e >= Big.E_POS) {
            str = str.charAt(0) + (strL > 1 ? '.' + str.slice(1) : '') +
              (e < 0 ? 'e' : 'e+') + e;

        // Negative exponent?
        } else if (e < 0) {

            // Prepend zeros.
            for (; ++e; str = '0' + str) {
            }
            str = '0.' + str;

        // Positive exponent?
        } else if (e > 0) {

            if (++e > strL) {

                // Append zeros.
                for (e -= strL; e-- ; str += '0') {
                }
            } else if (e < strL) {
                str = str.slice(0, e) + '.' + str.slice(e);
            }

        // Exponent zero.
        } else if (strL > 1) {
            str = str.charAt(0) + '.' + str.slice(1);
        }

        // Avoid '-0'
        return x.s < 0 && x.c[0] ? '-' + str : str;
    };


    /*
     ***************************************************************************
     * If toExponential, toFixed, toPrecision and format are not required they
     * can safely be commented-out or deleted. No redundant code will be left.
     * format is used only by toExponential, toFixed and toPrecision.
     ***************************************************************************
     */


    /*
     * Return a string representing the value of this Big in exponential
     * notation to dp fixed decimal places and rounded, if necessary, using
     * Big.RM.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P.toExponential = function (dp) {

        if (dp == null) {
            dp = this.c.length - 1;
        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throwErr('!toExp!');
        }

        return format(this, dp, 1);
    };


    /*
     * Return a string representing the value of this Big in normal notation
     * to dp fixed decimal places and rounded, if necessary, using Big.RM.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P.toFixed = function (dp) {
        var str,
            x = this,
            Big = x.constructor,
            neg = Big.E_NEG,
            pos = Big.E_POS;

        // Prevent the possibility of exponential notation.
        Big.E_NEG = -(Big.E_POS = 1 / 0);

        if (dp == null) {
            str = x.toString();
        } else if (dp === ~~dp && dp >= 0 && dp <= MAX_DP) {
            str = format(x, x.e + dp);

            // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
            // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
            if (x.s < 0 && x.c[0] && str.indexOf('-') < 0) {
        //E.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
                str = '-' + str;
            }
        }
        Big.E_NEG = neg;
        Big.E_POS = pos;

        if (!str) {
            throwErr('!toFix!');
        }

        return str;
    };


    /*
     * Return a string representing the value of this Big rounded to sd
     * significant digits using Big.RM. Use exponential notation if sd is less
     * than the number of digits necessary to represent the integer part of the
     * value in normal notation.
     *
     * sd {number} Integer, 1 to MAX_DP inclusive.
     */
    P.toPrecision = function (sd) {

        if (sd == null) {
            return this.toString();
        } else if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
            throwErr('!toPre!');
        }

        return format(this, sd - 1, 2);
    };


    // Export


    Big = bigFactory();

    //AMD.
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return Big;
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    // Node and other CommonJS-like environments that support module.exports.
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Big;
        module.exports.Big = Big;

    //Browser.
    } else {
        global.Big = Big;
    }
})(this);


/***/ })
/******/ ])});;
//# sourceMappingURL=extension.js.map