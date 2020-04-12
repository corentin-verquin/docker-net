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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cloud__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cloud */ \"./javascript/cloud.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Renderer = /*#__PURE__*/function () {\n  function Renderer(graph, canvas) {\n    _classCallCheck(this, Renderer);\n\n    this.layout = new Springy.Layout.ForceDirected(graph, 400.0, 400.0, 0.5);\n    this.currentBB = this.layout.getBoundingBox();\n    this.targetBB = {\n      bottomleft: new Springy.Vector(-2, -2),\n      topright: new Springy.Vector(2, 2)\n    };\n    this.canvas = document.querySelector(canvas);\n    this.img = new Image();\n    this.img.src = _cloud__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n    this.configure();\n  }\n\n  _createClass(Renderer, [{\n    key: \"configure\",\n    value: function configure() {\n      var that = this;\n      Springy.requestAnimationFrame(function adjust() {\n        that.targetBB = that.layout.getBoundingBox(); // current gets 20% closer to target every iteration\n\n        that.currentBB = {\n          bottomleft: that.currentBB.bottomleft.add(that.targetBB.bottomleft.subtract(that.currentBB.bottomleft).divide(10)),\n          topright: that.currentBB.topright.add(that.targetBB.topright.subtract(that.currentBB.topright).divide(10))\n        };\n        Springy.requestAnimationFrame(adjust);\n      });\n    }\n  }, {\n    key: \"toScreen\",\n    value: function toScreen(p) {\n      var size = this.currentBB.topright.subtract(this.currentBB.bottomleft);\n      var sx = p.subtract(this.currentBB.bottomleft).divide(size.x).x * this.canvas.width;\n      var sy = p.subtract(this.currentBB.bottomleft).divide(size.y).y * this.canvas.height;\n      return new Springy.Vector(sx, sy);\n    }\n  }, {\n    key: \"drawSystem\",\n    value: function drawSystem(ctx, s, node) {\n      var size = 20;\n      var textWidth = this.getTextWidth(node, ctx);\n      var police = 16;\n\n      var pathing = function pathing() {\n        var revert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n        var padding = revert ? size * -1 : size;\n        ctx.lineTo(s.x - padding, s.y + padding);\n        ctx.lineTo(s.x, s.y + padding + padding / 2);\n        ctx.lineTo(s.x + padding, s.y + padding);\n      };\n\n      ctx.strokeStyle = 'black';\n      ctx.beginPath();\n      ctx.moveTo(s.x - size, s.y - size);\n      pathing();\n      pathing(true);\n      ctx.stroke();\n      ctx.fillStyle = 'white';\n      ctx.fill();\n      ctx.clearRect(s.x - textWidth / 2, s.y + size + size / 2 + 1, textWidth, police + 1);\n      ctx.fillStyle = 'black';\n      ctx.font = \"\".concat(police, \"px Verdana, sans-serif\");\n      ctx.fillText(node.data.label, s.x - textWidth / 2, s.y + size + size / 2 + police + 1);\n    }\n  }, {\n    key: \"getTextWidth\",\n    value: function getTextWidth(node, ctx) {\n      var text = node.data.label;\n      if (node._width && node._width[text]) return node._width[text];\n      ctx.save();\n      ctx.font = '16px Verdana, sans-serif';\n      var width = ctx.measureText(text).width;\n      ctx.restore();\n      node._width || (node._width = {});\n      node._width[text] = width;\n      return width;\n    }\n  }, {\n    key: \"drawNetwork\",\n    value: function drawNetwork(ctx, s, node) {\n      var textWidth = this.getTextWidth(node, ctx);\n      ctx.fillStyle = node.data.color;\n      ctx.save();\n\n      if (node.data.label === 'Internet') {\n        ctx.clearRect(s.x - 35, s.y - 10, 70, 40);\n        ctx.drawImage(this.img, s.x - 35, s.y - 30, 70, 60);\n      } else {\n        ctx.beginPath();\n        ctx.arc(s.x, s.y, 15, 0, 2 * Math.PI);\n        ctx.fill();\n      }\n\n      ctx.fillStyle = 'black';\n      ctx.font = \"16px Verdana, sans-serif\";\n      ctx.clearRect(s.x - textWidth / 2, s.y + 16, textWidth, 17);\n      ctx.fillText(node.data.label, s.x - textWidth / 2, s.y + 32);\n      ctx.restore();\n    }\n  }, {\n    key: \"drawer\",\n    get: function get() {\n      var _this = this;\n\n      var ctx = this.canvas.getContext('2d');\n\n      var clear = function clear() {\n        ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);\n      };\n\n      var drawEdge = function drawEdge(edge, p1, p2) {\n        var s1 = _this.toScreen(p1);\n\n        var s2 = _this.toScreen(p2);\n\n        ctx.save();\n        ctx.strokeStyle = edge.data.color;\n        ctx.beginPath();\n        ctx.moveTo(s1.x, s1.y);\n        ctx.lineTo(s2.x, s2.y);\n        ctx.stroke();\n        ctx.restore();\n      };\n\n      var drawNode = function drawNode(node, p) {\n        var s = _this.toScreen(p);\n\n        ctx.save();\n\n        if (node.data.isNet) {\n          _this.drawNetwork(ctx, s, node);\n        } else {\n          _this.drawSystem(ctx, s, node);\n        }\n\n        ctx.restore();\n      };\n\n      return new Springy.Renderer(this.layout, clear, drawEdge, drawNode);\n    }\n  }]);\n\n  return Renderer;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Renderer);\n\n//# sourceURL=webpack:///./javascript/_render.js?");

/***/ }),

/***/ "./javascript/app.js":
/*!***************************!*\
  !*** ./javascript/app.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_render */ \"./javascript/_render.js\");\n/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ \"./javascript/color.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\nvar socket = io.connect('http://localhost:5678');\nvar graph = new Springy.Graph();\nvar networks = {},\n    systems = {}; //construction au demarage\n\nsocket.on('con', function (data) {\n  data.networks.forEach(function (x, i) {\n    return networks[x] = _color__WEBPACK_IMPORTED_MODULE_1__[\"default\"][i];\n  });\n  systems = data.systems;\n  var edges = [];\n\n  var _loop = function _loop(k) {\n    systems[k].forEach(function (net) {\n      edges.push([k, net, {\n        color: networks[net]\n      }]);\n    });\n  };\n\n  for (var k in systems) {\n    _loop(k);\n  }\n\n  graph.addNodes.apply(graph, _toConsumableArray(Object.keys(systems)));\n\n  for (var _k in networks) {\n    graph.addNode(new Springy.Node(_k, {\n      label: _k,\n      isNet: true,\n      color: networks[_k]\n    }));\n  }\n\n  graph.addEdges.apply(graph, edges);\n  var renderer = new _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"](graph, '#board');\n  renderer.drawer.start();\n}); //connection d'un container a un reseau\n\nsocket.on('netUp', function (data) {\n  //si le reseau est nouveau on le cree\n  if (networks[data.net] === undefined) {\n    networks[data.net] = _color__WEBPACK_IMPORTED_MODULE_1__[\"default\"][Object.keys(networks).length];\n    graph.addNode(new Springy.Node(data.net, {\n      label: data.net,\n      isNet: true,\n      color: networks[data.net]\n    }));\n  } //si le container et nouveau on le cree\n\n\n  if (systems[data.sys] === undefined) {\n    systems[data.sys] = [];\n    graph.addNodes(data.sys);\n  }\n\n  systems[data.sys].push(data.net);\n  graph.addEdges([data.sys, data.net, {\n    color: networks[data.net]\n  }]);\n}); //deconnection d'un container a un reseau\n\nsocket.on('netDown', function (data) {\n  if (!systems[data.sys]) return;\n  graph.filterEdges(function (e) {\n    return !(e.source.id === data.net && e.target.id === data.sys || e.source.id === data.sys && e.target.id === data.net);\n  });\n  systems[data.sys] = systems[data.sys].filter(function (x) {\n    return x !== data.net;\n  }); //si le container n'est plus connecté a au moins reseau on le supprime\n\n  if (systems[data.sys].length === 0) {\n    graph.filterNodes(function (e) {\n      return e.id !== data.sys;\n    });\n    delete systems[data.sys];\n  } //si le reseau n'a plus de container on le supprime\n\n\n  var trv = false;\n  var i = 0;\n\n  while (i < Object.keys(systems).length && !trv) {\n    trv = systems[Object.keys(systems)[i]].includes(data.net);\n    i++;\n  }\n\n  if (!trv) {\n    graph.filterNodes(function (e) {\n      return e.id !== data.net;\n    });\n    delete networks[data.net];\n  }\n});\nvar canvas = document.getElementById('board');\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\n\n//# sourceURL=webpack:///./javascript/app.js?");

/***/ }),

/***/ "./javascript/cloud.js":
/*!*****************************!*\
  !*** ./javascript/cloud.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPG1ldGFkYXRhPiBTdmcgVmVjdG9yIEljb25zIDogaHR0cDovL3d3dy5vbmxpbmV3ZWJmb250cy5jb20vaWNvbiA8L21ldGFkYXRhPg0KPGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNTExLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSI+PHBhdGggZD0iTTM3MjIuMywyNzYxLjhjLTQwMy44LTY1LjMtNzcyLTI0NS40LTEwMzkuMi01MTIuN2MtMzE2LjctMzE2LjctNTA2LjctNzMwLjQtNTQ2LjMtMTE5MS42bC0xMy45LTE1MC40TDE5MjEsODk1LjJDMTU0Ni45LDg3MS41LDExMjMuMyw3MjUsODMyLjQsNTE3LjJDNTk2LjgsMzQ4LjksMzQzLjUsNDQuMSwyMzQuNi0xOTkuNEMxMzUuNi00MjUsMTAwLTU5NS4yLDEwMC04NTAuNmMwLTc0Mi4zLDM2Ni4yLTEzNDAsOTczLjgtMTU4NS41YzMxMi43LTEyNi43LDIxLjgtMTE2LjgsMzgwNC40LTExNi44aDM0MzQuMmwxNzYuMiw0Ny41Qzk0MjIuOS0yMjU5LjksOTk5MC45LTE0ODkuOSw5ODg4LTYxOWMtNDkuNSw0MDUuOC0xOTkuOSw3NDAuMy00NjMuMiwxMDE5LjRjLTMxNC43LDMzMi41LTY1MS4yLDQ5MC45LTExNTYsNTQ2LjNsLTIwOS44LDIzLjhsLTgxLjEsMTM4LjZjLTExMi44LDE5MC0zOTUuOSw0NjkuMS02MDEuNyw1OTEuOGMtNTA0LjcsMjk4LjktMTE0NC4xLDM0NC40LTE2NTIuOCwxMTYuOGMtNjcuMy0zMS43LTEyMi43LTQ1LjUtMTI2LjctMzMuNmMtMjkuNyw4OS4xLTE4Mi4xLDMwMC45LTMxMi43LDQzNS41Yy0yNTMuNCwyNTkuMy01NTIuMyw0MjkuNS05MDQuNiw1MTIuN0M0MjIxLjEsMjc2OS43LDM4NzQuNywyNzg1LjYsMzcyMi4zLDI3NjEuOHogTTQzNzMuNSwyNDE1LjRjMjk0LjktODEuMiw2MTUuNi0yOTQuOSw3ODkuOC01MjYuNWM1My40LTY5LjMsMTM0LjYtMjAzLjksMTgyLjEtMjk2LjljMTE0LjgtMjMxLjYsMTQ4LjUtMjQxLjUsMzg0LTExOC44YzI1OS4zLDEzNC42LDQwNy43LDE3MC4yLDcwMi43LDE3MC4yYzI5MS0yLDQyNy41LTI5LjcsNjU3LjEtMTQwLjVjMjk2LjktMTQyLjUsNTQwLjQtMzg2LDcwMC43LTcwNC43Qzc4NzcsNjI2LDc5MjAuNSw1OTguMyw4MDU1LjEsNjMwYzEwOC45LDIzLjgsMzMwLjUsNCw0OTQuOC00Ny41YzI0Ny40LTc1LjIsNDM5LjQtMTg4LDYxNS42LTM2NC4yYzEzOC42LTEzOC42LDE3Ni4yLTE5MiwyNjEuMy0zNjguMmMzNzIuMS03NjYsOTUtMTU1NS44LTY3Ni45LTE5MjcuOWMtMzYwLjItMTcyLjIsMy45LTE1OC4zLTM4ODEuNi0xNTguM2MtMzMxMy41LDAtMzQ0OC4xLDItMzU1MywzNy42Yy0xNjguMiw1Ny40LTM1Ni4zLDE2Mi4zLTQ2OS4xLDI1OS4zYy00MjcuNSwzNzQuMS01NzAuMSwxMTQ4LTMwNi44LDE2NjIuN2MxNTguMywzMTAuOCw0OTAuOSw1OTEuOCw4NzQuOSw3NDAuM2MyMjUuNiw4Ny4xLDQzMy41LDEyNC43LDcwNi42LDEyNC43YzMyMi42LDAsMzE0LjctOS45LDMyOC42LDM2Mi4yYzExLjksMzE2LjcsNDUuNSw0NTUuMywxNzguMSw3MTIuNmMxMTQuOCwyMjMuNywzOTUuOSw1MDIuOCw2MTcuNiw2MTcuNmMxNjQuMyw4My4xLDI5Ni45LDEzMi42LDQ0Ny4zLDE2NC4zQzM4MTkuMiwyNDcwLjgsNDIzNC45LDI0NTMsNDM3My41LDI0MTUuNHoiLz48cGF0aCBkPSJNNzkzMC40LTE3My42Yy00Ny41LTUxLjUtNTcuNC0xNDguNS0xNy44LTE5NmMxMS45LTE1LjgsNzMuMy01Ny40LDEzNC42LTkzYzEzNC42LTc1LjIsMjYzLjMtMjA5LjgsMzIwLjYtMzM0LjVjNjMuNC0xNDIuNSw1OS40LTM5My45LTkuOS01NDAuNGMtMjcuNy02MS40LTgzLjEtMTQ4LjQtMTI0LjctMTkyYy02Ny4zLTc1LjItMjc5LjEtMjAxLjktMzM4LjUtMjAxLjljLTM5LjYsMC04Ny4xLTgxLjItODcuMS0xNTAuNGMwLTQ3LjUsMTUuOC03Ny4yLDUzLjQtMTA2LjljNjkuMy01My40LDEzOC42LTQ1LjUsMzE0LjcsMzcuNmMyMzkuNSwxMTAuOCw0NDUuNCwzNjIuMiw1MTQuNiw2MjMuNWM1OS40LDIyMy43LDIzLjcsNTQ4LjMtODMuMSw3NDQuMmMtMTA0LjksMTkyLTQzNS41LDQ1NS4zLTU3Mi4xLDQ1NS4zQzc5OTUuNy0xMjguMSw3OTU4LjEtMTQzLjksNzkzMC40LTE3My42eiIvPjwvZz48L2c+DQo8L3N2Zz4=');\n\n//# sourceURL=webpack:///./javascript/cloud.js?");

/***/ }),

/***/ "./javascript/color.js":
/*!*****************************!*\
  !*** ./javascript/color.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (['#FF9900', '#78be20', '#7986cb', '#64b5f6', '#ff8a65', '#4db6ac', '#81c784', '#dce775', '#ffd54f', '#ffb74d', '#ff8a65', '#a1887f', '#e0e0e0', '#90a4ae', '#02ABB0', '#E30613', '#fd0']);\n\n//# sourceURL=webpack:///./javascript/color.js?");

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