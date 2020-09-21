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
var $siteList = $('.siteList');
var $siteLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  name: '前端图标',
  url: 'https://www.iconfont.cn'
}, {
  name: 'Github',
  url: 'https://github.com'
}, {
  name: 'Figma页面布局',
  url: 'https://www.figma.com/'
}, {
  name: '阮一峰JS教程',
  url: 'http://www.ruanyifeng.com/blog/2016/11/javascript.html'
}, {
  name: 'Vue.js',
  url: 'https://cn.vuejs.org/index.html'
}, {
  name: 'React',
  url: 'https://zh-hans.reactjs.org/'
}, {
  name: 'jQuery',
  url: 'https://www.jquery123.com'
}, {
  name: '写代码啦',
  url: 'https://xiedaimala.com'
}, {
  name: '语雀博客',
  url: 'https://www.yuque.com/'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n            <li class=\"list\">\n                <div class=\"labelButton\">\n                    <div class=\"name\">".concat(node.name, "</div>\n                    <div class=\"url\">").concat(simplifyUrl(node.url), "</div>\n                    <svg class=\"icon\" aria-hidden=\"true\">\n                        <use xlink:href=\"#icon-more\"></use>\n                    </svg>\n                </div>\n            </li>\n            ")).insertBefore($siteLi[0]);
    $li.on('click', function () {
      window.open(node.url);
    }); //监听Mobile长按事件和点击事件

    var longClick = 0;
    var timeOutEvent = 0;
    $li.on({
      touchstart: function touchstart(e) {
        longClick = 0; //设置初始为0

        timeOutEvent = setTimeout(function () {
          $('.popWrapper').css('display', 'block');
          longClick = 1; //假如长按，则设置为1
        }, 500);
        $('div.popTitle')[0].innerText = '修改快捷标签';
        $('button.labelFinish')[0].innerText = '修改';
        $('.popNameInput')[0].value = node.name;
        $('.popUrlInput')[0].value = node.url;
        var index = hashMap.indexOf(node);
        $('.labelFinish').on('click', function () {
          var newUrl = $('#popUrlInput').val();
          var newName = $('#popNameInput').val();

          if (!newName) {
            hashMap[index].name = simplifyUrl(newUrl)[0].toUpperCase(), hashMap[index].url = newUrl;
            console.log(name);
          } else {
            hashMap[index].name = newName, hashMap[index].url = newUrl;
          }
        });
        $('.labelRemove').on('click', function () {
          hashMap.splice(index, 1);
          render();
        });
      },
      touchmove: function touchmove(e) {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        e.preventDefault();
      },
      touchend: function touchend(e) {
        clearTimeout(timeOutEvent);

        if (timeOutEvent !== 0 && longClick === 0) {
          window.open(node.url);
        }

        return false;
      }
    });
    $li.on('click', '.icon', function (e) {
      e.stopPropagation(); // 阻止冒泡

      $('.popWrapper').css('display', 'block');
      $('div.popTitle')[0].innerText = '修改快捷标签';
      $('button.labelFinish')[0].innerText = '修改';
      $('.popNameInput')[0].value = node.name;
      $('.popUrlInput')[0].value = node.url;
      var index = hashMap.indexOf(node);
      $('.labelFinish').on('click', function () {
        var newUrl = $('#popUrlInput').val();
        var newName = $('#popNameInput').val();

        if (!newName) {
          hashMap[index].name = simplifyUrl(newUrl)[0].toUpperCase(), hashMap[index].url = newUrl;
        } else {
          hashMap[index].name = newName, hashMap[index].url = newUrl;
        }
      });
      $('.labelRemove').on('click', function () {
        hashMap.splice(index, 1);
        render();
      });
    });
  });
};

render(); // 弹出框事件设置

$('.siteList > .last').on({
  click: function click() {
    $('.popWrapper').css('display', 'block');
    $('div.popTitle')[0].innerText = '添加快捷标签';
    $('button.labelFinish')[0].innerText = '添加';
  },
  touchstart: function touchstart() {
    $('.popWrapper').css('display', 'block');
    $('div.popTitle')[0].innerText = '添加快捷标签';
    $('button.labelFinish')[0].innerText = '添加';
  }
});
$('.labelFinish').on('click', function () {
  if ($('button.labelFinish')[0].innerText === '添加') {
    var url = $('#popUrlInput').val();

    var _name = $('#popNameInput').val();

    if (url) {
      if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
      }

      if (!_name) {
        hashMap.push({
          name: simplifyUrl(url)[0].toUpperCase(),
          url: url
        });
        console.log(_name);
      } else {
        hashMap.push({
          name: _name,
          url: url
        });
      }

      render();
    }
  }
});
$('.labelCancel').on('click', function () {
  $('.popWrapper').css('display', 'none');
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};
},{}],"C:/Users/18201/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "12830" + '/');

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
},{}]},{},["C:/Users/18201/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map