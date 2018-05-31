var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/index.html":
/*!***************************!*\
  !*** ./assets/index.html ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + context.plugin.urlForResourceNamed("_webpack_resources/0017a37ecfa7d668e6b919039eb7f761.html").path();

/***/ }),

/***/ "./node_modules/@skpm/events/index.js":
/*!********************************************!*\
  !*** ./node_modules/@skpm/events/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function EventEmitter () {}

// By default, a maximum of 10 listeners can be registered for any single event.
EventEmitter.defaultMaxListeners = 10

// Shortcuts to improve speed and size
var proto = EventEmitter.prototype

proto._maxListeners = EventEmitter.defaultMaxListeners

function indexOfListener (listeners, listener) {
  var i = listeners.length
  while (i--) {
    if (listeners[i].listener === listener) {
      return i
    }
  }

  return -1
}

function alias (name) {
  return function aliasClosure () {
    return this[name].apply(this, arguments)
  }
}

function isValidListener (listener) {
  if (typeof listener === 'function') {
    return true
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener)
  } else {
    return false
  }
}

proto._getListeners = function _getListeners (evt) {
  var events = this._getEvents()

  return events[evt] || (events[evt] = [])
}

proto._getEvents = function _getEvents () {
  return this._events || (this._events = {})
}

/*
  Alias for emitter.on(eventName, listener).
*/
proto.addListener = alias('on')

/*
  Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.

  Returns true if the event had listeners, false otherwise.
*/
proto.emit = function emit (evt) {
  var args = Array.prototype.slice.call(arguments, 1)
  var listeners = this._getListeners(evt) || []
  var listener
  var i
  var key
  var response

  for (i = 0; i < listeners.length; i++) {
    listener = listeners[i]

    if (listener.once === true) {
      this.removeListener(evt, listener.listener)
    }

    response = listener.listener.apply(this, args || [])
  }

  return listeners.length > 0
}

/*
  Returns an array listing the events for which the emitter has registered listeners.
  The values in the array will be strings or Symbols.
*/
proto.eventNames = function eventNames () {
  var events = this._getEvents()
  return Object.keys(events)
}

/*
  Returns the current max listener value for the EventEmitter which is either set by emitter.setMaxListeners(n) or defaults to EventEmitter.defaultMaxListeners.
*/
proto.getMaxListeners = function getMaxListeners() {
  return this._maxListeners
}

/*
  Returns the number of listeners listening to the event named eventName.
*/
proto.listenerCount = function listenerCount(eventName) {
  return this._getListeners(eventName).length
}

/*
  Returns a copy of the array of listeners for the event named eventName.
*/
proto.listeners = function listeners(eventName) {
  return this._getListeners(eventName).map(function (wrappedListener) {
    return wrappedListener.listener
  })
}

/*
  Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.on = function on (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.push(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependOnceListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.once = function once (evt, listener) {
  return this.on(evt, {
    listener: listener,
    once: true
  })
}

/*
  Adds the listener function to the beginning of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependListener = function prependListener (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.unshift(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName to the beginning of the listeners array. The next time eventName is triggered, this listener is removed, and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependOnceListener = function prependOnceListener (evt, listener) {
  return this.prependListener(evt, {
    listener: listener,
    once: true
  })
}

/*
  Removes all listeners, or those of the specified eventName.

  Note that it is bad practice to remove listeners added elsewhere in the code, particularly when the EventEmitter instance was created by some other component or module (e.g. sockets or file streams).

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeAllListeners = function removeAllListeners (evt) {
  var events = this._getEvents()

  if (typeof evt === 'string') {
    // Remove all listeners for the specified event
    delete events[evt]
  } else {
    // Remove all listeners in all events
    delete this._events
  }

  return this
}

/*
  Removes the specified listener from the listener array for the event named eventName.

  removeListener will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified eventName, then removeListener must be called multiple times to remove each instance.

  Note that once an event has been emitted, all listeners attached to it at the time of emitting will be called in order. This implies that any removeListener() or removeAllListeners() calls after emitting and before the last listener finishes execution will not remove them from emit() in progress. Subsequent events will behave as expected.

  Because listeners are managed using an internal array, calling this will change the position indices of any listener registered after the listener being removed. This will not impact the order in which listeners are called, but it means that any copies of the listener array as returned by the emitter.listeners() method will need to be recreated.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeListener = function removeListener (evt, listener) {
  var listeners = this._getListeners(evt)

  var index = indexOfListener(listeners, listener)

  if (index !== -1) {
    listeners.splice(index, 1)

    this.emit('removeListener', evt, listener)
  }

  return this
}

/*
  By default EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default that helps finding memory leaks. Obviously, not all events should be limited to just 10 listeners. The emitter.setMaxListeners() method allows the limit to be modified for this specific EventEmitter instance. The value can be set to Infinity (or 0) to indicate an unlimited number of listeners.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.setMaxListeners = function setMaxListeners (n) {
  this._maxListeners = n
  return this
}

/*
  Returns a copy of the array of listeners for the event named eventName, including any wrappers (such as those created by .once).
*/
proto.rawListeners = function rawListeners (evt) {
  return this._getListeners(evt).slice()
}

module.exports = EventEmitter


/***/ }),

/***/ "./node_modules/cocoascript-class/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(/*! ./runtime.js */ "./node_modules/cocoascript-class/lib/runtime.js");

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),

/***/ "./node_modules/cocoascript-class/lib/runtime.js":
/*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/browser-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/browser-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(/*! cocoascript-class */ "./node_modules/cocoascript-class/lib/index.js").default

var COLOR_CLASSES = [
  'NSColor',
  'NSDynamicSystemColor',
  'NSCachedColorSpaceColor',
]
function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      color.class &&
      COLOR_CLASSES.indexOf(String(color.class())) !== -1
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16)
  var g = parseInt(hex.slice(2, 4), 16)
  var b = parseInt(hex.slice(4, 6), 16)
  var a = parseInt(hex.slice(6, 8), 16)

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

// We create one ObjC class for ourselves here
var WindowDelegateClass

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    // TODO: Check size constraints since setFrame does not check it.
    var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(bounds.origin.x, 0, size.width, size.height)
    // Flip coordinates based on the primary screen.
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y =
      NSHeight(screen.frame()) - size.height - bounds.origin.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    return panel.frame()
  }

  browserWindow.setContentBounds = function(/* bounds, animate */) {
    // TODO:
  }

  browserWindow.getContentBounds = function() {
    // TODO:
  }

  browserWindow.setSize = function(width, height, animate) {
    var bounds = browserWindow.getBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    var bounds = browserWindow.getContentBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setContentBounds(bounds, animate)
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMaxSize(minSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    var bounds = browserWindow.getBounds()
    bounds.origin.x = x
    bounds.origin.y = y

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.origin.x, bounds.origin.y]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!http|localhost|www|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url = __command
          .pluginBundle()
          .urlForResourceNamed(url)
          .path()
      }
    }
    webview.setMainFrameURL(url)
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.setDrawsBackground(false)
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }

  if (!WindowDelegateClass) {
    WindowDelegateClass = ObjCClass({
      classname: 'WindowDelegateClass',
      utils: null,

      // Tells the delegate that the window has been resized.
      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      // Tells the delegate that the window has been resized.
      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      // Tells the delegate that the window has been resized.
      'windowShouldClose:': function() {
        var shouldClose = true
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = false
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  var windowDelegate = WindowDelegateClass.new()
  windowDelegate.utils = NSDictionary.dictionaryWithDictionary({
    emit: browserWindow.emit.bind(browserWindow),
  })

  panel.setDelegate(windowDelegate)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/dispatch-first-click.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  var x = point.x
  var y = webView.frame().size.height - point.y // the coord start from the bottom instead of the top
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    x +
    ', ' +
    y +
    '); ' +
    'if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/fitSubview.js":
/*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/fitSubview.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(/*! @skpm/events */ "./node_modules/@skpm/events/index.js")
var buildBrowserAPI = __webpack_require__(/*! ./browser-api */ "./node_modules/sketch-module-web-view/lib/browser-api.js")
var buildWebAPI = __webpack_require__(/*! ./webview-api */ "./node_modules/sketch-module-web-view/lib/webview-api.js")
var fitSubviewToView = __webpack_require__(/*! ./fitSubview */ "./node_modules/sketch-module-web-view/lib/fitSubview.js")
var dispatchFirstClick = __webpack_require__(/*! ./dispatch-first-click */ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js")

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  // Long-running script
  var fiber
  try {
    fiber = coscript.createFiber()
  } catch (err) {
    coscript.shouldKeepAround = true
  }

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  // TODO: handle modal mode

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var webView = WebView.alloc().initWithFrame(
    NSMakeRect(0, 0, options.width || 800, options.height || 600)
  )
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    panel.setDisableKeyOrMainWindow(true)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  if (options.focusable === false) {
    panel.setDisableKeyOrMainWindow(true)
  }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    // panel.opaque = false
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  const title =
    options.title ||
    (typeof __command !== 'undefined' && __command.pluginBundle()
      ? __command.pluginBundle().name()
      : undefined)
  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  if (options.webPreferences) {
    // TODO:
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents.executeJavaScript(
          dispatchFirstClick(webView, event)
        )
      }
    })
  }

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    if (fiber) {
      fiber.cleanup()
    } else {
      coscript.shouldKeepAround = false
    }
  })

  threadDictionary[identifier] = browserWindow

  if (fiber) {
    fiber.onCleanup(function() {
      if (!browserWindow._destroyed) {
        browserWindow.destroy()
      }
    })
  }

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    var browserWindow = threadDictionary[identifier]
    browserWindow.show()

    return browserWindow
  }

  return undefined
}

module.exports = BrowserWindow


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseWebArguments.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments[0])
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/webview-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/webview-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(/*! cocoascript-class */ "./node_modules/cocoascript-class/lib/index.js").default
var EventEmitter = __webpack_require__(/*! @skpm/events */ "./node_modules/@skpm/events/index.js")
var parseWebArguments = __webpack_require__(/*! ./parseWebArguments */ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js")
var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

// We create one ObjC class for ourselves here
var FrameLoadDelegateClass

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL
  webContents.getURL = webview.mainFrameURL
  webContents.getTitle = webview.mainFrameTitle
  webContents.isDestroyed = function() {
    // TODO:
  }
  webContents.isLoading = function() {
    return webview.loading()
  }
  webContents.stop = webview.stopLoading
  webContents.reload = webview.reload
  webContents.canGoBack = webview.canGoBack
  webContents.canGoForward = webview.canGoForward
  webContents.goBack = webview.goBack
  webContents.goForward = webview.goForward
  webContents.executeJavaScript = function(script) {
    return webview.stringByEvaluatingJavaScriptFromString(script)
  }
  webContents.undo = function() {
    webview.undoManager().undo()
  }
  webContents.redo = function() {
    webview.undoManager().redo()
  }
  webContents.cut = webview.cut
  webContents.copy = webview.copy
  webContents.paste = webview.paste
  webContents.pasteAndMatchStyle = webview.pasteAsRichText
  webContents.delete = webview.delete
  webContents.replace = webview.replaceSelectionWithText
  webContents.getNativeWebview = function() {
    return webview
  }

  if (!FrameLoadDelegateClass) {
    FrameLoadDelegateClass = ObjCClass({
      classname: 'FrameLoadDelegateClass',
      state: NSMutableDictionary.dictionaryWithDictionary({
        lastQueryId: null,
        wasReady: 0,
      }),
      utils: null,

      // // Called when a client redirect is cancelled.
      // 'webView:didCancelClientRedirectForFrame:': function (
      //   webView,
      //   webFrame
      // ) {},

      // Called when the scroll position within a frame changes.
      'webView:didChangeLocationWithinPageForFrame:': function(webView) {
        this.utils.emitEvent('did-navigate-in-page', [
          {},
          webView
            .windowScriptObject()
            .evaluateWebScript('window.location.href'),
        ])
      },

      // // Called when the JavaScript window object in a frame is ready for loading.
      // 'webView:didClearWindowObject:forFrame:': function (
      //   webView,
      //   windowObject,
      //   webFrame
      // ) {},

      // // Called when content starts arriving for a page load.
      // 'webView:didCommitLoadforFrame:': function (webView, webFrame) {},

      // // Notifies the delegate that a new JavaScript context has been created.
      // N.B - we intentionally omit the 2nd parameter (javascriptContext)
      // It was causing crashes in Sketch - possibly because of issues with converting
      // it from Objective C to Javascript
      'webView:didCreateJavaScriptContext:forFrame:': function(webView) {
        // any time there is a new js context, set a global value (on window.) to refer
        // to this frameloaddelegate class
        webView.windowScriptObject().setValue_forKey_(this, CONSTANTS.JS_BRIDGE)
      },

      // the normal way to expose a selector to webscript is with 'isSelectorExcludedFromWebScript:'
      // but that didn't work, so this is an alternative. This method gets invoked any time
      // an unknown method is called on this class by webscript
      'invokeUndefinedMethodFromWebScript:withArguments:': function(
        method,
        webArguments
      ) {
        if (String(method) !== 'callNative') {
          return false
        }

        var args = this.utils.parseWebArguments(webArguments)
        if (!args) {
          return false
        }

        this.utils.emit.apply(this, args)
        return true
      },

      // Called when an error occurs loading a committed data source.
      'webView:didFailLoadWithError:forFrame:': function(_, error) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when a page load completes.
      'webView:didFinishLoadForFrame:': function() {
        if (this.state.wasReady == 0) {
          // eslint-disable-line
          this.utils.emitBrowserEvent('ready-to-show')
          this.state.setObject_forKey(1, 'wasReady')
        }
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
        this.utils.emit('dom-ready')
      },

      // Called when a provisional data source for a frame receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalLoadForFrame:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // Called when the page title of a frame loads or changes.
      'webView:didReceiveTitle:forFrame:': function(_, _title) {
        var title = String(_title)
        var shouldChangeTitle = true
        this.utils.emitBrowserEvent(
          'page-title-updated',
          {
            get defaultPrevented() {
              return !shouldChangeTitle
            },
            preventDefault: function() {
              shouldChangeTitle = false
            },
          },
          title
        )

        if (shouldChangeTitle && title) {
          this.utils.setTitle(title)
        }
      },

      // Called when a page load is in progress in a given frame.
      'webView:didStartProvisionalLoadForFrame:': function() {
        this.utils.emit('did-start-loading')
      },

      // Called when a frame will be closed.
      // 'webView:willCloseFrame:': function (webView, webFrame) {}

      // Called when a frame receives a client redirect and before it is fired.
      'webView:willPerformClientRedirectToURL:delay:fireDate:forFrame:': function(
        _,
        url
      ) {
        this.utils.emit('will-navigate', {}, String(url.absoluteString))
      },
    })
  }

  var frameLoadDelegate = FrameLoadDelegateClass.new()
  frameLoadDelegate.utils = NSDictionary.dictionaryWithDictionary({
    setTitle: browserWindow.setTitle.bind(browserWindow),
    emitBrowserEvent: browserWindow.emit.bind(browserWindow),
    emit: webContents.emit.bind(webContents),
    parseWebArguments: parseWebArguments,
  })

  webview.setFrameLoadDelegate(frameLoadDelegate)

  browserWindow.webContents = webContents
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/my-command.js":
/*!***************************!*\
  !*** ./src/my-command.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_1__);


var options = {
  identifier: "overrideitWebView",
  width: 250,
  height: 600,
  frame: true,
  minHeight: 80,
  minWidth: 250,
  minimizable: false,
  maximizable: false,
  useContentSize: true,
  movable: true,
  alwaysOnTop: true,
  center: false,
  show: false
};
/* harmony default export */ __webpack_exports__["default"] = (onRun = function onRun(Context) {
  //transparent: true
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var browserWindow = threadDictionary["overrideitWebView"];

  if (Context.selection) {
    if (!browserWindow) {
      browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
      browserWindow.loadURL(__webpack_require__(/*! ../assets/index.html */ "./assets/index.html"));
      browserWindow["document"] = Context.document; //browserWindow.loadURL("http://localhost:8080/");

      browserWindow.show();
    }
  }

  if (browserWindow) {
    if (Context.actionContext) {
      var action = Context.actionContext;
      var context = {};
      context["document"] = action.document;
      context["selection"] = action.newSelection;
    } else {
      var context = Context;
    }

    if (browserWindow.document != context.document) {
      browserWindow.close();
      threadDictionary.removeObjectForKey("overrideitWebView");
    } else {
      var loadOverridesForSelection = function loadOverridesForSelection(symbolInstance) {
        if (symbolInstance.class() == MSSymbolInstance) {
          return getOverrides(symbolInstance, String(symbolInstance.objectID()));
        }
      };

      var setImgfromUrl = function setImgfromUrl(url) {
        var image = NSImage.alloc().initWithContentsOfURL(url);
        var imageData = MSImageData.alloc().initWithImage(image, true);
        object.setImage(imageData);
      }; // setTimeout(function(){
      //   browserWindow.webContents.executeJavaScript(`getOverrides(hi)`)
      //  }, 2000);
      // browserWindow.loadURL('http://localhost:8080/', function(){
      //     browserWindow.webContents.executeJavaScript(`sayHi("hello")`)
      //   })


      var getOverrides = function getOverrides(symbolInstance) {
        var overrides = {};
        var availableOverrides = symbolInstance.availableOverrides();

        for (var i = 0; i < availableOverrides.count(); i++) {
          if (!availableOverrides[i].affectedLayer().isLocked()) {
            var overridePoint = availableOverrides[i].overridePoint();

            if (overridePoint.isSymbolOverride() && availableOverrides[i].currentValue()) {
              var symbolOverrides = getOverridesFromSymbolOverride(availableOverrides[i], {}, true, availableOverrides[i].overridePoint().layerName());
              overrides = Object.assign({}, overrides, symbolOverrides);
            } else {
              var overrideOb = overrideObject(availableOverrides[i], true, "");
              var override = overrideOb[0];
              var searchQuery = overrideOb[1];
              overrides[override.overrideID] = override;
            }
          }
        }

        return sortOverrides(symbolInstance, overrides);
      };

      var sortOverrides = function sortOverrides(symbolInstance, overrides) {
        var overridePoints = symbolInstance.overridePoints();
        var sortedOverrides = {};

        for (var i = 0; i < overridePoints.count(); i++) {
          sortedOverrides[overridePoints[i]] = overrides[overridePoints[i]];
        }

        return sortedOverrides;
      };

      var getOverridesFromSymbolOverride = function getOverridesFromSymbolOverride(symbolOverride, overrides, isParent, searchQueryParent) {
        var availableOverrides = symbolOverride.children();
        var overrideOb = overrideObject(symbolOverride, isParent, searchQueryParent);
        var override = overrideOb[0];
        var searchQuery = overrideOb[1];
        overrides[override.overrideID] = override;

        for (var i = 0; i < availableOverrides.count(); i++) {
          if (!availableOverrides[i].affectedLayer().isLocked()) {
            var overridePoint = availableOverrides[i].overridePoint();

            if (overridePoint.isSymbolOverride() && availableOverrides[i].currentValue() != "") {
              var symbolOverrides = getOverridesFromSymbolOverride(availableOverrides[i], overrides, false, searchQuery);
              overrides = Object.assign({}, overrides, symbolOverrides);
            } else {
              var overrideOb = overrideObject(availableOverrides[i], false, searchQueryParent);
              var override = overrideOb[0];
              overrides[override.overrideID] = override;
            }
          }
        }

        return overrides;
      };

      var getImageData64 = function getImageData64(data) {
        var imageData = data;
        var mimeType = "image/png";
        return NSString.stringWithFormat("data:%@;base64,%@", mimeType, imageData.base64EncodedStringWithOptions(0));
      };

      var getImageFromSymbol = function getImageFromSymbol(symbol) {
        var exportRequest = MSExportRequest.exportRequestsFromExportableLayer_inRect_useIDForName_(symbol, symbol.absoluteInfluenceRect(), false).firstObject();
        exportRequest.format = "png";
        var scaleRate = 0;

        if (exportRequest.rect().size.width > exportRequest.rect().size.height) {
          scaleRate = 30 / exportRequest.rect().size.width;
        } else {
          scaleRate = 30 / exportRequest.rect().size.height;
        }

        exportRequest.scale = scaleRate;
        exportRequest.setCompression(0.2);
        var colorSpace = NSColorSpace.sRGBColorSpace();
        var exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest, colorSpace);
        var data = exporter.data();
        return getImageData64(data);
      };

      var overrideObject = function overrideObject(availableOverride, isParent, searchQuery) {
        var currentValue = {};
        var searchQueryResult = String(String(searchQuery) + " " + String(availableOverride.overridePoint().layerName()));

        if (availableOverride.overridePoint().property() == "image") {
          currentValue["value"] = String(getImageData64(availableOverride.currentValue().data()));
          currentValue["searchQuery"] = String(searchQueryResult + " image");
        } else if (availableOverride.overridePoint().property() == "symbolID") {
          if (availableOverride.currentValue() == "") {
            var symbolID = availableOverride.defaultValue();
            currentValue = {};
            currentValue["name"] = "none";
            currentValue["symbolID"] = String(symbolID);
            currentValue["Thumbnail"] = "";
            currentValue["searchQuery"] = String(searchQueryResult + " ");
          } else {
            var symbolID = availableOverride.currentValue();
            var symbol = context.document.documentData().symbolWithID(symbolID);
            currentValue["name"] = String(symbol.name());
            currentValue["symbolID"] = String(symbolID);
            currentValue["Thumbnail"] = String(getImageFromSymbol(symbol));
            currentValue["searchQuery"] = String(searchQueryResult + " " + currentValue.name);
          }
        } else {
          currentValue["value"] = String(availableOverride.currentValue());
          currentValue["searchQuery"] = String(searchQueryResult + " " + currentValue.value);
        }

        var override = {
          overrideTitle: String(availableOverride.overridePoint().layerName()),
          overrideType: String(availableOverride.overridePoint().property()),
          overrideDefualtValue: String(availableOverride.defaultValue()),
          overrideCurrentValue: currentValue,
          overrideID: String(availableOverride.overridePoint().name()),
          overridePoint: availableOverride.overridePoint(),
          isParent: isParent
        };
        return [override, searchQueryResult];
      };

      var setOverrides = function setOverrides(symbolInstance, overridePoint, value) {
        var overridePointsPredicate = NSPredicate.predicateWithFormat("(name == %@)", overridePoint);
        var overrides = symbolInstance.overridePoints();
        var matchOverride = overrides.filteredArrayUsingPredicate_(overridePointsPredicate);
        symbolInstance.setValue_forOverridePoint(value, matchOverride[0]); //symbolInstance.setValue_forOverridePoint("WTF",overridePoint)
      };

      var getImageValue = function getImageValue() {
        var fileTypes = ["png", "jpg", "tiff"];
        var panel = NSOpenPanel.openPanel();
        panel.setAllowsMultipleSelection(0);
        panel.setCanChooseDirectories(0);
        panel.setCanChooseFiles(1);
        panel.setFloatingPanel(1);
        panel.setMessage("Choose Image");
        var result = panel.runModalForDirectory_file_types(nil, nil, fileTypes);

        if (result != NSOKButton) {
          return 0;
        }

        if (panel.URLs().count() < 1) {
          return 0;
        }

        var image = NSImage.alloc().initWithContentsOfURL(panel.URLs()[0]);
        var imageData = MSImageData.alloc().initWithImage(image);
        return imageData;
      };

      var filterlocalSymbols = function filterlocalSymbols(symbolArray, symbol) {
        var matchSymbolArray = [];
        var symbolPredicate = NSPredicate.predicateWithFormat("(frame.width == %@) AND (frame.height == %@)", symbol.frame().size().width, symbol.frame().size().height);
        var matchedSymbols = symbolArray.filteredArrayUsingPredicate_(symbolPredicate);

        for (var i = 0; i < matchedSymbols.count(); i++) {
          var symbolObj = {};
          symbolObj["name"] = String(matchedSymbols[i].name());
          symbolObj["symbolID"] = String(matchedSymbols[i].symbolID());
          symbolObj["Thumbnail"] = String(getImageFromSymbol(matchedSymbols[i]));
          matchSymbolArray = matchSymbolArray.concat(symbolObj);
        }

        return matchSymbolArray;
      };

      var filterForeignSymbolsInLibrary = function filterForeignSymbolsInLibrary(context, symbol, library) {
        var matchSymbolArray = [];

        if (library.document() != null) {
          var symbolArray = getForgienSymbolForLibrary(context, library);
          var symbolPredicate = NSPredicate.predicateWithFormat("(frame.width == %@) AND (frame.height == %@)", symbol.frame().size().width, symbol.frame().size().height);
          var matchedSymbols = symbolArray.filteredArrayUsingPredicate_(symbolPredicate);

          for (var i = 0; i < matchedSymbols.count(); i++) {
            var foreignSymbol = matchedSymbols[i];
            var symbolObj = {};
            symbolObj["name"] = String(foreignSymbol.name());
            symbolObj["symbolID"] = String(foreignSymbol.symbolID());
            symbolObj["Thumbnail"] = String(getImageFromSymbol(foreignSymbol));
            matchSymbolArray = matchSymbolArray.concat(symbolObj);
          }
        }

        return matchSymbolArray;
      };

      var getMatchedSymbols = function getMatchedSymbols(context, symbol) {
        var libraries = AppController.sharedInstance().librariesController().availableLibraries();
        var matchedSymbolsArray = [];
        var matchedarray = filterlocalSymbols(context.document.documentData().localSymbols(), symbol);
        var importableSymbolsDictionary = {};

        if (matchedarray[0] != undefined) {
          var matchedSymbolObj = {};
          matchedSymbolObj["libraryName"] = "localSymbols";
          matchedSymbolObj["libraryID"] = "local";
          matchedSymbolObj["matchedSymbolArray"] = matchedarray;
          matchedSymbolsArray = matchedSymbolsArray.concat(matchedSymbolObj);
        }

        for (var i = 0; i < libraries.count(); i++) {
          var matchedarrayAndDictionary = getMatchedForgienSymbolForLibrary(context, symbol, libraries[i]);
          var matchedarray = matchedarrayAndDictionary[0];
          importableSymbolsDictionary = Object.assign({}, importableSymbolsDictionary, matchedarrayAndDictionary[1]);

          if (matchedarray) {
            if (matchedarray[0] != undefined) {
              var matchedSymbolObj = {};
              matchedSymbolObj["libraryName"] = String(libraries[i].name());
              matchedSymbolObj["libraryID"] = String(libraries[i].libraryID());
              matchedSymbolObj["matchedSymbolArray"] = matchedarray;
              matchedSymbolsArray = matchedSymbolsArray.concat(matchedSymbolObj);
            }
          }
        }

        return [matchedSymbolsArray, importableSymbolsDictionary];
      };

      var getMatchedForgienSymbolForLibrary = function getMatchedForgienSymbolForLibrary(context, symbol, library) {
        var importableSymbolsDictionary = {};
        var document = context.document;
        var libraryController = AppController.sharedInstance().librariesController();
        var provider = MSForeignSymbolProvider.alloc().initWithDocument(document);
        var collector = MSForeignObjectCollector.alloc().initWithProvider(provider);
        var shareableObjectRefsMap = collector.buildCollectionWithFilter(null);
        var libraryPredicate = NSPredicate.predicateWithFormat("(library.libraryID == %@)", library.libraryID());
        var matchedLibrary = shareableObjectRefsMap.filteredArrayUsingPredicate_(libraryPredicate);

        if (matchedLibrary.count() > 0) {
          var allSymbols = matchedLibrary[0].objectRefs;
          var symbolPredicate = NSPredicate.predicateWithFormat("(symbolMaster.frame.width == %@) AND (symbolMaster.frame.height == %@)", symbol.frame().size().width, symbol.frame().size().height);
          var matchedSymbols = allSymbols.filteredArrayUsingPredicate_(symbolPredicate);
          var matchSymbolArray = [];

          for (var i = 0; i < matchedSymbols.count(); i++) {
            var foreignSymbol = matchedSymbols[i].symbolMaster();
            var symbolObj = {};
            importableSymbolsDictionary[foreignSymbol.symbolID()] = matchedSymbols[i];
            symbolObj["name"] = String(foreignSymbol.name());
            symbolObj["symbolID"] = String(foreignSymbol.symbolID());
            symbolObj["Thumbnail"] = String(getImageFromSymbol(foreignSymbol));
            matchSymbolArray = matchSymbolArray.concat(symbolObj);
          }

          return [matchSymbolArray, importableSymbolsDictionary];
        }

        return [];
      };

      global.overrides = {};
      global.symbolsOverrides = {};
      global.importableSymbolsOverridesDicIdMap = {};
      var symbolInstance = context.selection[0]; //global.overrides = loadOverridesForSelection(symbolInstance);

      global.overrides = loadOverridesForSelection(symbolInstance);
      browserWindow.webContents.executeJavaScript("changeSelection(".concat(JSON.stringify(global.overrides), ",").concat(JSON.stringify(String(symbolInstance.objectID())), ")"));
      browserWindow.webContents.on("posScreen", function (width, height) {
        browserWindow.setPosition(width - 250, height - 630, false);
      });
      browserWindow.webContents.on("moveWindow", function (posX, posY) {
        browserWindow.setPosition(posX, posY, true);
      });
      browserWindow.webContents.on("openExternal", function (url) {
        NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
      });
      browserWindow.webContents.on("closeWindow", function () {
        browserWindow.close();
        threadDictionary.removeObjectForKey("overrideitWebView");
      });
      browserWindow.webContents.on("setOverride", function (overridePoint, value, symbolInstanceID) {
        var symbolInstance = context.document.documentData().layerWithID(symbolInstanceID);
        setOverrides(symbolInstance, overridePoint, value);
        var valueLength = global.overrides[overridePoint].overrideCurrentValue.value.length();
        var searchQuery = global.overrides[overridePoint].overrideCurrentValue.searchQuery;
        global.overrides[overridePoint].overrideCurrentValue.value = value;
        global.overrides[overridePoint].overrideCurrentValue.searchQuery = searchQuery.substring(0, searchQuery.length() - valueLength - 1) + value;
        browserWindow.webContents.executeJavaScript("getOverrides(".concat(JSON.stringify(global.overrides), ",").concat(JSON.stringify(String(symbolInstance.objectID())), ")"));
      });
      browserWindow.webContents.on("setOverrideImage", function (overridePoint, symbolInstanceID) {
        var symbolInstance = context.document.documentData().layerWithID(symbolInstanceID);
        var value = getImageValue();

        if (value != 0) {
          setOverrides(symbolInstance, overridePoint, value);
          global.overrides[overridePoint].overrideCurrentValue.value = String(getImageData64(value.data()));
          browserWindow.webContents.executeJavaScript("getOverrides(".concat(JSON.stringify(global.overrides), ",").concat(JSON.stringify(String(symbolInstance.objectID())), ")"));
        }
      });
      browserWindow.webContents.on("getSymbolOverridesData", function (symbolID) {
        if (!global.symbolsOverrides[symbolID]) {
          var symbol = context.document.documentData().symbolWithID(symbolID);
          var getMatchedSymbolArrayAndDic = getMatchedSymbols(context, symbol);
          global.symbolsOverrides[symbolID] = getMatchedSymbolArrayAndDic[0];
          global.importableSymbolsOverridesDicIdMap[symbolID] = getMatchedSymbolArrayAndDic[1];
        }

        browserWindow.webContents.executeJavaScript("getSymbolOverrides(".concat(JSON.stringify(global.symbolsOverrides[symbolID]), ")"));
      });
      browserWindow.webContents.on("setSymbolOverride", function (overridePoint, symbolID, value, symbolInstanceID) {
        var symbolInstance = context.document.documentData().layerWithID(symbolInstanceID);
        var foreignSymbolInDocument = context.document.documentData().symbolWithID(value);

        if (foreignSymbolInDocument || value == "") {
          setOverrides(symbolInstance, overridePoint, value);
          global.overrides = getOverrides(symbolInstance);
          browserWindow.webContents.executeJavaScript("getOverrides(".concat(JSON.stringify(global.overrides), ",").concat(JSON.stringify(String(symbolInstance.objectID())), ")"));
        } else {
          var importableSymbols = global.importableSymbolsOverridesDicIdMap[symbolID];
          var importableSymbol = importableSymbols[value];

          if (importableSymbol) {
            var foreignSymbolInDocument = context.document.documentData().symbolWithID(importableSymbol.sharedObjectID());
            var libraryController = AppController.sharedInstance().librariesController();
            var value = libraryController.importShareableObjectReference_intoDocument(importableSymbol, context.document.documentData()).symbolMaster().symbolID();
            setOverrides(symbolInstance, overridePoint, value);
            global.overrides = getOverrides(symbolInstance);
            browserWindow.webContents.executeJavaScript("getOverrides(".concat(JSON.stringify(global.overrides), ",").concat(JSON.stringify(String(symbolInstance.objectID())), ")"));
          }
        }
      });
      browserWindow.webContents.on("updateOverride", function () {
        global.overrides = loadOverridesForSelection(symbolInstance);
        browserWindow.webContents.executeJavaScript("getOverrides(".concat(JSON.stringify(global.overrides), ",").concat(JSON.stringify(String(symbolInstance.objectID())), ")"));
      });
      browserWindow.on("closed", function () {
        threadDictionary.removeObjectForKey("overrideitWebView");
      });
      threadDictionary["overrideitWebView"] = browserWindow;
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=my-command.js.map