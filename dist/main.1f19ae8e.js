// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
// 记住因为后面在jquery里我们干掉了api ,直接return那个函数,下面声明了api,相当于把api从前面传到了后面, 相当于给那个函数命名
// const api = jQuery ( '.test' ) // 不返回元素,返回api对象
// 因为把api从前面传到了后面,后面的函数就是this,他就直接调用那个api为他的名字
// 所以api可以进行链式操作,还有是调用后才确定this是api的,`.addClass`前面是什么调用,就是前面就传什么
// =>api.addClass ( 'blue' ).addClass('red').addClass('yellow')
// 链式操作
// 用 api 调用函数 addClass ,而 addClass 又返回了一个api ,所以后面可以在加一个. addClass('red')
// 这时相当于 api.addClass = api 后面加上. addClass('red')
// 相当于api.addClass('red')
// 这就是 链式操作 ,这样做 就是因为前面仅仅return api
//1. 第一个核心就是闭包
//2. 第二个核心是链式操作
//前面的公理,用函数来调用一个对象,那么函数的this就是前面的那个对象
//obj.fn(p1)  // 同理  这个函数的里的this就是 obj
//onj.fn.call(obj,p1)
// *****%%%%%%代码的在最终版本,声明都可以不要了%%%%%%
//jQuery ( '.test' ).addClass('blue').addClass('red').addClass('yellow' )
//声明都可以不要了,直接jQuery得到元素放进this里面,直接在后面传递addClass调用this,相当于
//jQuery ( '.test' ).addClass('blue') = tish
// 相当于tish.addClass('red') =this
// 相当于this.addClass('yellow' )
// jQuery对象   =>>>>>>>>>    代指jQuery函数构造出来的对象
//jQuery对象 =>>>>>>  不是说「jQuery这个对象」,是 说 指jQuery函数构造出来的对象
// jQuery 是 一个  ******>>>>>>函数  记住
//举例
// Object是个函数
// Object对象表示Object构造出的对象
// Array是个函数
// Array对象/数组对象表示Array构造出来的对象
// Function是个函数
// Function对象/函数对象表示Function构造出来的对象
//所有首字母大写的 都代表了 他 构造出来了 一个 对象 ,记住: 首字母大写
//--------------------------------------------------
// const x1 =  jQuery ( '.test' ).find('.child')
// console.log(x1)
// x1.addclass('red')  这一步是报错的,因为前面返回的就变成了一个纯数组了
// jQuery ( '.test' )
//     .find('.child')
//     .addClass('red')
//     .addClass('yellow')
//--------------------------------------------------
// jQuery ( '.test' )       // 假设这个为api1
//     .find('.child')  //假设这个为api2
//     .addClass('red') //这句话就在api2中执行
//     .addClass('yellow') ////这句话就在api2中执行
//     .end()   // 通过这个 再次回到api1,就是'.test' 上操作
//     .addClass('green')  // green 就在api1上 ,test 上面加一个green
// const api1 =jQuery ( '.test' )  // 旧的 api1
// const api2 = api1.find('.child').addClass('red')
// const oldApi = api2.end().addClass('green')  // 调用end的只能是api2,是新的api
// jQuery ( '.test' )
//     .find('.child')
//     .addClass('red')
//     .addClass('yellow')
//     .end()
//     .addClass('green')
// const  x =  jQuery('.test').find('.child')
// x.each((div)=>console.log(div))  // x 就是jQuery('.test').find('.child') 传回的 对象
// const  x =  jQuery('.test')
// x.children().print()
//  细节 :笔记-----------------------------
//const div1 = document.querySelector('.test')
// const div2 =$('.test')
// div2到底是DOM对象,还是jQuery对象?????
// DOM对象只能使用DOM API    =>    querySelector  , appendChild
// jQuery对象只能使用jQuery的API   =>    find ,each
//  const elDiv1 = document.querySelector('.test')    前面加**el    ** 表示DOM  api
// const $div2 = $('.test')     前面加**$   ** 表示jQuery   api
//我代码中所有$开头的变量都是jQuery对象 =>   这是约定,除非特殊说明
var a = $('body');
console.log(a);
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50456" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map