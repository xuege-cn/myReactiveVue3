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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/baseHandler.js":
/*!*****************************!*\
  !*** ./core/baseHandler.js ***!
  \*****************************/
/*! exports provided: mutableHandlers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutableHandlers\", function() { return mutableHandlers; });\n/* harmony import */ var _reactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive */ \"./core/reactive.js\");\n/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect */ \"./core/effect.js\");\n\n // 为了便于理解，这里只做了get和set的proxy\n// 其他的代码都是一般的代理，不讲，讲一下track和trigger\n// 从vue 2.0的源码其实可以知道：\n//  1.get的时候会做依赖收集：即这里的track\n//  2.set的时候会做更新广播：即这里的trigger\n\nvar mutableHandlers = {\n  get: function get(target, key, receiver) {\n    var res = Reflect.get(target, key, receiver);\n    Object(_effect__WEBPACK_IMPORTED_MODULE_1__[\"track\"])(target, 'get', key);\n    return res;\n  },\n  set: function set(target, key, value, receiver) {\n    var oldValue = target[key];\n    var result = Reflect.set(target, key, value, receiver); // 这里检测key是否是target的自有属性\n\n    var hadKey = target.hasOwnProperty(key); // 在reactive维护了一个reactiveToRaw队列，存储了[proxy]:[target]这样的队列，这里检测下是否是使用createReactiveObject新建的proxy\n\n    if (target === Object(_reactive__WEBPACK_IMPORTED_MODULE_0__[\"toRaw\"])(receiver)) {\n      // 判断是否值改变，才触发更新\n      if (hadKey && value !== oldValue) {\n        Object(_effect__WEBPACK_IMPORTED_MODULE_1__[\"trigger\"])(target, 'set', key);\n      }\n    }\n\n    return result;\n  }\n};\n\n//# sourceURL=webpack:///./core/baseHandler.js?");

/***/ }),

/***/ "./core/compile.js":
/*!*************************!*\
  !*** ./core/compile.js ***!
  \*************************/
/*! exports provided: compile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compile\", function() { return compile; });\n/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./effect */ \"./core/effect.js\");\n/* harmony import */ var _scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler */ \"./core/scheduler.js\");\n\n\nfunction compile(el, vm) {\n  var fragment = document.createDocumentFragment();\n  var node;\n\n  while (node = el.firstChild) {\n    compileNode(vm, node);\n    fragment.append(node);\n  }\n\n  return fragment;\n}\nvar reg = /\\{\\{(.*)\\}\\}/;\n\nfunction compileNode(vm, node) {\n  var nodeType = node.nodeType,\n      nodeValue = node.nodeValue,\n      nodeName = node.nodeName;\n\n  node.update = function (type, bindName) {\n    return Object(_effect__WEBPACK_IMPORTED_MODULE_0__[\"effect\"])(function () {\n      node[type] = vm[bindName];\n    }, {\n      scheduler: _scheduler__WEBPACK_IMPORTED_MODULE_1__[\"queueJob\"]\n    });\n  };\n\n  var bindName;\n\n  switch (nodeType) {\n    case 1:\n      if (nodeName == 'INPUT') {\n        var attributes = node.attributes;\n        var _iteratorNormalCompletion = true;\n        var _didIteratorError = false;\n        var _iteratorError = undefined;\n\n        try {\n          for (var _iterator = attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            var attr = _step.value;\n\n            if (attr.name === 'v-model') {\n              bindName = attr.value;\n            }\n          }\n        } catch (err) {\n          _didIteratorError = true;\n          _iteratorError = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n              _iterator[\"return\"]();\n            }\n          } finally {\n            if (_didIteratorError) {\n              throw _iteratorError;\n            }\n          }\n        }\n\n        if (bindName) {\n          node.addEventListener('input', function (e) {\n            vm[bindName] = e.target.value;\n          });\n        }\n\n        node.update('value', bindName)();\n      }\n\n      break;\n\n    case 3:\n      var isModal = reg.test(nodeValue);\n\n      if (isModal) {\n        bindName = RegExp.$1 && RegExp.$1.trim();\n        node.update('nodeValue', bindName)();\n      }\n\n      break;\n  }\n}\n\n//# sourceURL=webpack:///./core/compile.js?");

/***/ }),

/***/ "./core/effect.js":
/*!************************!*\
  !*** ./core/effect.js ***!
  \************************/
/*! exports provided: effect, track, trigger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"effect\", function() { return effect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"track\", function() { return track; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"trigger\", function() { return trigger; });\n/* harmony import */ var _reactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive */ \"./core/reactive.js\");\n\nvar activeReactiveEffectStack = []; // 下面这两个api是初始化effect，就不过于纠结了\n\nfunction effect(fn, options) {\n  var effect = createReactiveEffect(fn, options);\n  return effect;\n}\n\nfunction createReactiveEffect(fn, options) {\n  var effect = function effect() {\n    if (!activeReactiveEffectStack.includes(effect)) {\n      try {\n        activeReactiveEffectStack.push(effect);\n        return fn();\n      } finally {\n        activeReactiveEffectStack.pop();\n      }\n    }\n  };\n\n  effect.scheduler = options.scheduler;\n  return effect;\n} // 作用：\n// 1.收集依赖\n\n\nfunction track(target, type, key) {\n  var effect = activeReactiveEffectStack[activeReactiveEffectStack.length - 1]; // proxy初始化的时候，这个depsMap为new Map\n\n  var depsMap = _reactive__WEBPACK_IMPORTED_MODULE_0__[\"targetMap\"].get(target);\n\n  if (depsMap === void 0) {\n    _reactive__WEBPACK_IMPORTED_MODULE_0__[\"targetMap\"].set(target, depsMap = new Map());\n  } // 如果是第一次这个dep是没有的，因为depsMap是new Map\n\n\n  var dep = depsMap.get(key);\n\n  if (dep === void 0) {\n    // 这里把依赖放进去。依赖是个Set\n    depsMap.set(key, dep = new Set());\n  } // 这里的effect就是依赖。\n  // 依赖是啥？可以理解为依赖保存了data <-> dom的关系\n\n\n  dep.add(effect); // effect.deps.push(dep)\n} // 作用：\n//  1.触发了数据更新，这时候得更新dom了\n\nfunction trigger(target, type, key) {\n  var depsMap = _reactive__WEBPACK_IMPORTED_MODULE_0__[\"targetMap\"].get(target);\n  var effects = new Set();\n\n  var run = function run(effect) {\n    scheduleRun(effect, target, type, key);\n  }; // 解析出依赖中要更新的effect\n\n\n  addRunners(effects, depsMap.get(key)); // 任务调度执行\n\n  effects.forEach(run);\n}\n\nfunction addRunners(effects, effectsToAdd) {\n  effectsToAdd.forEach(function (effect) {\n    effects.add(effect);\n  });\n} // 任务调度，就理解为data更新之后，调用effect.scheduler去更新dom\n\n\nfunction scheduleRun(effect, target, type, key) {\n  if (effect.scheduler !== void 0) {\n    effect.scheduler(effect);\n  } else {\n    effect();\n  }\n}\n\n//# sourceURL=webpack:///./core/effect.js?");

/***/ }),

/***/ "./core/reactive.js":
/*!**************************!*\
  !*** ./core/reactive.js ***!
  \**************************/
/*! exports provided: targetMap, reactive, toRaw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"targetMap\", function() { return targetMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reactive\", function() { return reactive; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toRaw\", function() { return toRaw; });\n/* harmony import */ var _baseHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseHandler */ \"./core/baseHandler.js\");\n // 这个map存储key: target， value：proxy\n// 作用：\n//  1.避免重复proxy\n\nvar rawToReactive = new WeakMap(); // 这个map存储key：proxy， value：target\n// 作用：\n//  1.避免proxy对象再次被proxy\n\nvar reactiveToRaw = new WeakMap();\nvar targetMap = new WeakMap();\nfunction reactive(target) {\n  return createReactiveObject(target, rawToReactive, reactiveToRaw, _baseHandler__WEBPACK_IMPORTED_MODULE_0__[\"mutableHandlers\"]);\n} // 创建响应式对象\n\nfunction createReactiveObject(target, toProxy, toRaw, handlers) {\n  // 如果当前对象已被proxy，那么直接返回\n  var observed = toProxy.get(target);\n\n  if (observed !== void 0) {\n    return observed;\n  } // 检测被proxy的对象，即这里的target，自身是否是个proxy，如果是的话，直接返回\n\n\n  if (toRaw.has(target)) {\n    return target;\n  } // 当前的target既没有被proxy，也不是个proxy对象，那么对它proxy\n\n\n  observed = new Proxy(target, handlers); // 实例化之后把它维护到两个map\n\n  toProxy.set(target, observed);\n  toRaw.set(observed, target); // 把当前的target维护到targetMap，targetMap的作用 -> 【继续往下看，先不管】\n\n  if (!targetMap.has(target)) {\n    targetMap.set(target, new Map());\n  }\n\n  return observed;\n} // toRaw函数，传入proxy对象，获取target\n// \n\n\nfunction toRaw(observed) {\n  return reactiveToRaw.get(observed) || observed;\n}\n\n//# sourceURL=webpack:///./core/reactive.js?");

/***/ }),

/***/ "./core/scheduler.js":
/*!***************************!*\
  !*** ./core/scheduler.js ***!
  \***************************/
/*! exports provided: queueJob, nextTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"queueJob\", function() { return queueJob; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nextTick\", function() { return nextTick; });\nvar queue = [];\nvar p = Promise.resolve();\nvar isFlushing = false;\nfunction queueJob(job) {\n  if (!queue.includes(job)) {\n    queue.push(job);\n\n    if (!isFlushing) {\n      nextTick(flushJobs);\n    }\n  }\n}\nfunction nextTick(fn) {\n  return fn ? p.then(fn) : p;\n}\n\nfunction flushJobs(seenJobs) {\n  isFlushing = true;\n  var job;\n\n  while (job = queue.shift()) {\n    job();\n  }\n\n  isFlushing = false;\n}\n\n//# sourceURL=webpack:///./core/scheduler.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: Vue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vue\", function() { return Vue; });\n/* harmony import */ var _core_reactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/reactive */ \"./core/reactive.js\");\n/* harmony import */ var _core_compile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/compile */ \"./core/compile.js\");\n\n\nfunction Vue(option) {\n  var proxy = Object(_core_reactive__WEBPACK_IMPORTED_MODULE_0__[\"reactive\"])(option.data);\n  var el = document.getElementById('app');\n  var fragment = Object(_core_compile__WEBPACK_IMPORTED_MODULE_1__[\"compile\"])(el, proxy);\n  el.appendChild(fragment);\n}\nnew Vue({\n  el: 'app',\n  data: {\n    name: 'my name is xuege'\n  }\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });