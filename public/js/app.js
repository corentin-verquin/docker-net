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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/_render.js":
/*!*******************************!*\
  !*** ./javascript/_render.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Renderer = /*#__PURE__*/function () {\n  function Renderer(graph, net, canvas) {\n    _classCallCheck(this, Renderer);\n\n    this.layout = new Springy.Layout.ForceDirected(graph, 400.0, 400.0, 0.5);\n    this.currentBB = this.layout.getBoundingBox();\n    this.targetBB = {\n      bottomleft: new Springy.Vector(-2, -2),\n      topright: new Springy.Vector(2, 2)\n    };\n    this.canvas = document.querySelector(canvas);\n    this.net = net;\n    this.configure();\n  }\n\n  _createClass(Renderer, [{\n    key: \"configure\",\n    value: function configure() {\n      var that = this;\n      Springy.requestAnimationFrame(function adjust() {\n        that.targetBB = that.layout.getBoundingBox(); // current gets 20% closer to target every iteration\n\n        that.currentBB = {\n          bottomleft: that.currentBB.bottomleft.add(that.targetBB.bottomleft.subtract(that.currentBB.bottomleft).divide(10)),\n          topright: that.currentBB.topright.add(that.targetBB.topright.subtract(that.currentBB.topright).divide(10))\n        };\n        Springy.requestAnimationFrame(adjust);\n      });\n    }\n  }, {\n    key: \"toScreen\",\n    value: function toScreen(p) {\n      var size = this.currentBB.topright.subtract(this.currentBB.bottomleft);\n      var sx = p.subtract(this.currentBB.bottomleft).divide(size.x).x * this.canvas.width;\n      var sy = p.subtract(this.currentBB.bottomleft).divide(size.y).y * this.canvas.height;\n      return new Springy.Vector(sx, sy);\n    }\n  }, {\n    key: \"drawSystem\",\n    value: function drawSystem(ctx, s, node) {\n      var size = 20;\n      var textWidth = this.getTextWidth(node, ctx);\n      var police = 16;\n\n      var pathing = function pathing() {\n        var revert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n        var padding = revert ? size * -1 : size;\n        ctx.lineTo(s.x - padding, s.y + padding);\n        ctx.lineTo(s.x, s.y + padding + padding / 2);\n        ctx.lineTo(s.x + padding, s.y + padding);\n      };\n\n      ctx.strokeStyle = 'black';\n      ctx.beginPath();\n      ctx.moveTo(s.x - size, s.y - size);\n      pathing();\n      pathing(true);\n      ctx.stroke();\n      ctx.fillStyle = 'white';\n      ctx.fill();\n      ctx.clearRect(s.x - textWidth / 2, s.y + size + size / 2 + 1, textWidth, police + 1);\n      ctx.fillStyle = 'black';\n      ctx.font = \"\".concat(police, \"px Verdana, sans-serif\");\n      ctx.fillText(node.data.label, s.x - textWidth / 2, s.y + size + size / 2 + police + 1);\n    }\n  }, {\n    key: \"getTextWidth\",\n    value: function getTextWidth(node, ctx) {\n      var text = node.data.label;\n      if (node._width && node._width[text]) return node._width[text];\n      ctx.save();\n      ctx.font = '16px Verdana, sans-serif';\n      var width = ctx.measureText(text).width;\n      ctx.restore();\n      node._width || (node._width = {});\n      node._width[text] = width;\n      return width;\n    }\n  }, {\n    key: \"drawNetwork\",\n    value: function drawNetwork(ctx, s, node) {\n      var textWidth = this.getTextWidth(node, ctx);\n      ctx.fillStyle = this.net[node.data.label].color;\n      ctx.strokeStyle = this.net[node.data.label].color;\n      ctx.save();\n      ctx.beginPath();\n      ctx.arc(s.x, s.y, 15, 0, 2 * Math.PI);\n      ctx.stroke();\n      ctx.fill();\n      ctx.fillStyle = 'black';\n      ctx.font = \"16px Verdana, sans-serif\";\n      ctx.clearRect(s.x - textWidth / 2, s.y + 16, textWidth, 17);\n      ctx.fillText(node.data.label, s.x - textWidth / 2, s.y + 32);\n      ctx.restore();\n    }\n  }, {\n    key: \"drawer\",\n    get: function get() {\n      var _this = this;\n\n      var ctx = this.canvas.getContext('2d');\n\n      var clear = function clear() {\n        ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);\n      };\n\n      var drawEdge = function drawEdge(edge, p1, p2) {\n        var s1 = _this.toScreen(p1);\n\n        var s2 = _this.toScreen(p2);\n\n        ctx.save();\n        ctx.strokeStyle = edge.data.color;\n        ctx.beginPath();\n        ctx.moveTo(s1.x, s1.y);\n        ctx.lineTo(s2.x, s2.y);\n        ctx.stroke();\n        ctx.restore();\n      };\n\n      var drawNode = function drawNode(node, p) {\n        var s = _this.toScreen(p);\n\n        ctx.save();\n\n        if (Object.keys(_this.net).includes(node.data.label)) {\n          _this.drawNetwork(ctx, s, node);\n        } else {\n          _this.drawSystem(ctx, s, node);\n        }\n\n        ctx.restore();\n      };\n\n      return new Springy.Renderer(this.layout, clear, drawEdge, drawNode);\n    }\n  }]);\n\n  return Renderer;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Renderer);\n\n//# sourceURL=webpack:///./javascript/_render.js?");

/***/ }),

/***/ "./javascript/app.js":
/*!***************************!*\
  !*** ./javascript/app.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_render */ \"./javascript/_render.js\");\n/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ \"./javascript/color.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\nvar socket = io.connect('http://localhost:5678');\nsocket.on('con', function (data) {\n  var netColor = {};\n  var graph = new Springy.Graph();\n  graph.addNodes.apply(graph, _toConsumableArray(Object.keys(data.networks)));\n  graph.addNodes.apply(graph, _toConsumableArray(Object.keys(data.systems)));\n\n  for (var i = 0; i < Object.keys(data.networks).length; i++) {\n    var k = Object.keys(data.networks)[i];\n    netColor[k] = _color__WEBPACK_IMPORTED_MODULE_1__[\"default\"][i];\n    data.networks[k].color = _color__WEBPACK_IMPORTED_MODULE_1__[\"default\"][i];\n  }\n\n  var edges = [];\n\n  var _loop = function _loop(_k) {\n    data.systems[_k].forEach(function (system) {\n      edges.push([_k, system.net, {\n        color: netColor[system.net],\n        label: system.ip\n      }]);\n    });\n  };\n\n  for (var _k in data.systems) {\n    _loop(_k);\n  }\n\n  graph.addEdges.apply(graph, edges);\n  var renderer = new _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"](graph, data.networks, '#board');\n  renderer.drawer.start();\n});\nvar canvas = document.getElementById('board');\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\n\n//# sourceURL=webpack:///./javascript/app.js?");

/***/ }),

/***/ "./javascript/color.js":
/*!*****************************!*\
  !*** ./javascript/color.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (['#FF9900', '#78be20', '#7986cb', '#64b5f6', '#4fc3f7', '#4db6ac', '#81c784', '#dce775', '#ffd54f', '#ffb74d', '#ff8a65', '#a1887f', '#e0e0e0', '#90a4ae', '#02ABB0', '#E30613', '#fd0']);\n\n//# sourceURL=webpack:///./javascript/color.js?");

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi ./javascript/app.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /home/corentin/projet/docker-net/javascript/app.js */\"./javascript/app.js\");\n\n\n//# sourceURL=webpack:///multi_./javascript/app.js?");

/***/ })

/******/ });