(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["control-layersControlFactory"],{

/***/ "./js/control/layersControlFactory.js":
/*!********************************************!*\
  !*** ./js/control/layersControlFactory.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../leaflet */ "./js/leaflet/index.js");




function defaultNameCallback(layer) {
  return "<span class=\"cowegis-layer cowegis-layer-".concat(layer.cowegis.type, "\">").concat(layer.cowegis.title, "</span>");
}

function collectLayers(element, layers, state, nameCallback) {
  layers.forEach(function (layerId) {
    if (element.layers.hasOwnProperty(layerId)) {
      state.available[nameCallback(element.layers[layerId])] = element.layers[layerId];
    } else {
      state.pending.push(layerId);
    }
  });
}

function registerCollectListener(element, state, callback, nameCallback) {
  if (state.pending.length === 0) {
    return;
  }

  var listener = function listener(event) {
    var index = state.pending.indexOf(event.detail.config.layerId);

    if (index < 0) {
      return;
    }

    callback(event.detail.layer, nameCallback(event.detail.layer));
    state.pending.splice(index, 1);

    if (state.pending.length === 0) {
      element.removeEventListener('cowegis:layer:add', listener);
    }
  };

  element.addEventListener('cowegis:layer:add', listener);
}

function createDefaultSortLayerCallback(config) {
  return function (layerA, layerB) {
    var positionA = config.baseLayers.indexOf(layerA.cowegis.layerId);
    var positionB;

    if (positionA >= 0) {
      positionB = config.baseLayers.indexOf(layerB.cowegis.layerId);
    } else {
      positionA = config.overlays.indexOf(layerA.cowegis.layerId);
      positionB = config.overlays.indexOf(layerB.cowegis.layerId);
    }

    return positionA - positionB;
  };
}

function getListener(element, reference) {
  if (reference.namespace === null) {
    return element.listeners[reference.reference];
  }

  var listeners = element.listeners;
  reference.namespace.forEach(function (part) {
    listeners = listeners[part];
  });
  return listeners[reference.reference];
}

/* harmony default export */ __webpack_exports__["default"] = (function (_x, _x2) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config, element) {
    var baseLayers, overlays, nameCallback, control;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            baseLayers = {
              available: {},
              pending: []
            };
            overlays = {
              available: {},
              pending: []
            };

            if (config.options.sortFunction) {
              config.options.sortFunction = getListener(element, config.options.sortFunction);
            } else if (!config.options.sortLayers) {
              config.options.sortLayers = true;
              config.options.sortFunction = createDefaultSortLayerCallback(config);
            }

            nameCallback = config.options.nameFunction ? getListener(element, config.options.nameFunction) : defaultNameCallback;
            collectLayers(element, config.baseLayers, baseLayers, nameCallback);
            collectLayers(element, config.overlays, overlays, nameCallback);
            control = _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].control.layers(baseLayers.available, overlays.available, config.options);
            registerCollectListener(element, baseLayers, control.addBaseLayer.bind(control), nameCallback);
            registerCollectListener(element, overlays, control.addOverlay.bind(control), nameCallback);
            return _context.abrupt("return", control);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9jb250cm9sL2xheWVyc0NvbnRyb2xGYWN0b3J5LmpzIl0sIm5hbWVzIjpbImRlZmF1bHROYW1lQ2FsbGJhY2siLCJsYXllciIsImNvd2VnaXMiLCJ0eXBlIiwidGl0bGUiLCJjb2xsZWN0TGF5ZXJzIiwiZWxlbWVudCIsImxheWVycyIsInN0YXRlIiwibmFtZUNhbGxiYWNrIiwiZm9yRWFjaCIsImxheWVySWQiLCJoYXNPd25Qcm9wZXJ0eSIsImF2YWlsYWJsZSIsInBlbmRpbmciLCJwdXNoIiwicmVnaXN0ZXJDb2xsZWN0TGlzdGVuZXIiLCJjYWxsYmFjayIsImxlbmd0aCIsImxpc3RlbmVyIiwiZXZlbnQiLCJpbmRleCIsImluZGV4T2YiLCJkZXRhaWwiLCJjb25maWciLCJzcGxpY2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZURlZmF1bHRTb3J0TGF5ZXJDYWxsYmFjayIsImxheWVyQSIsImxheWVyQiIsInBvc2l0aW9uQSIsImJhc2VMYXllcnMiLCJwb3NpdGlvbkIiLCJvdmVybGF5cyIsImdldExpc3RlbmVyIiwicmVmZXJlbmNlIiwibmFtZXNwYWNlIiwibGlzdGVuZXJzIiwicGFydCIsIm9wdGlvbnMiLCJzb3J0RnVuY3Rpb24iLCJzb3J0TGF5ZXJzIiwibmFtZUZ1bmN0aW9uIiwiY29udHJvbCIsImxlYWZsZXQiLCJhZGRCYXNlTGF5ZXIiLCJiaW5kIiwiYWRkT3ZlcmxheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsU0FBU0EsbUJBQVQsQ0FBNkJDLEtBQTdCLEVBQW9DO0FBQ2hDLDZEQUFtREEsS0FBSyxDQUFDQyxPQUFOLENBQWNDLElBQWpFLGdCQUEwRUYsS0FBSyxDQUFDQyxPQUFOLENBQWNFLEtBQXhGO0FBQ0g7O0FBRUQsU0FBU0MsYUFBVCxDQUF1QkMsT0FBdkIsRUFBZ0NDLE1BQWhDLEVBQXdDQyxLQUF4QyxFQUErQ0MsWUFB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UUFBakIsRUFBMkJBLFFBQTNCLEVBQXFDekIsWUFBckMsQ0FBYjtBQUVNbUMsbUJBekJLLEdBeUJLQyxnREFBTyxDQUFDRCxPQUFSLENBQWdCckMsTUFBaEIsQ0FBdUJ5QixVQUFVLENBQUNuQixTQUFsQyxFQUE2Q3FCLFFBQVEsQ0FBQ3JCLFNBQXRELEVBQWlFVyxNQUFNLENBQUNnQixPQUF4RSxDQXpCTDtBQTBCWHhCLG1DQUF1QixDQUFDVixPQUFELEVBQVUwQixVQUFWLEVBQXNCWSxPQUFPLENBQUNFLFlBQVIsQ0FBcUJDLElBQXJCLENBQTBCSCxPQUExQixDQUF0QixFQUEwRG5DLFlBQTFELENBQXZCO0FBQ0FPLG1DQUF1QixDQUFDVixPQUFELEVBQVU0QixRQUFWLEVBQW9CVSxPQUFPLENBQUNJLFVBQVIsQ0FBbUJELElBQW5CLENBQXdCSCxPQUF4QixDQUFwQixFQUFzRG5DLFlBQXRELENBQXZCO0FBM0JXLDZDQTZCSm1DLE9BN0JJOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoianMvY29udHJvbC1sYXllcnNDb250cm9sRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsZWFmbGV0IGZyb20gJy4uL2xlYWZsZXQnO1xuXG5mdW5jdGlvbiBkZWZhdWx0TmFtZUNhbGxiYWNrKGxheWVyKSB7XG4gICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cImNvd2VnaXMtbGF5ZXIgY293ZWdpcy1sYXllci0ke2xheWVyLmNvd2VnaXMudHlwZX1cIj4ke2xheWVyLmNvd2VnaXMudGl0bGV9PC9zcGFuPmA7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RMYXllcnMoZWxlbWVudCwgbGF5ZXJzLCBzdGF0ZSwgbmFtZUNhbGxiYWNrKSB7XG4gICAgbGF5ZXJzLmZvckVhY2goZnVuY3Rpb24gKGxheWVySWQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQubGF5ZXJzLmhhc093blByb3BlcnR5KGxheWVySWQpKSB7XG4gICAgICAgICAgICBzdGF0ZS5hdmFpbGFibGVbbmFtZUNhbGxiYWNrKGVsZW1lbnQubGF5ZXJzW2xheWVySWRdKV0gPSBlbGVtZW50LmxheWVyc1tsYXllcklkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlLnBlbmRpbmcucHVzaChsYXllcklkKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckNvbGxlY3RMaXN0ZW5lcihlbGVtZW50LCBzdGF0ZSwgY2FsbGJhY2ssIG5hbWVDYWxsYmFjaykge1xuICAgIGlmIChzdGF0ZS5wZW5kaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBzdGF0ZS5wZW5kaW5nLmluZGV4T2YoZXZlbnQuZGV0YWlsLmNvbmZpZy5sYXllcklkKTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2soZXZlbnQuZGV0YWlsLmxheWVyLCBuYW1lQ2FsbGJhY2soZXZlbnQuZGV0YWlsLmxheWVyKSk7XG4gICAgICAgIHN0YXRlLnBlbmRpbmcuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICBpZiAoc3RhdGUucGVuZGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY293ZWdpczpsYXllcjphZGQnLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nvd2VnaXM6bGF5ZXI6YWRkJywgbGlzdGVuZXIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEZWZhdWx0U29ydExheWVyQ2FsbGJhY2soY29uZmlnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChsYXllckEsIGxheWVyQikge1xuICAgICAgICBsZXQgcG9zaXRpb25BID0gY29uZmlnLmJhc2VMYXllcnMuaW5kZXhPZihsYXllckEuY293ZWdpcy5sYXllcklkKTtcbiAgICAgICAgbGV0IHBvc2l0aW9uQjtcblxuICAgICAgICBpZiAocG9zaXRpb25BID49IDAgKSB7XG4gICAgICAgICAgICBwb3NpdGlvbkIgPSBjb25maWcuYmFzZUxheWVycy5pbmRleE9mKGxheWVyQi5jb3dlZ2lzLmxheWVySWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zaXRpb25BID0gY29uZmlnLm92ZXJsYXlzLmluZGV4T2YobGF5ZXJBLmNvd2VnaXMubGF5ZXJJZCk7XG4gICAgICAgICAgICBwb3NpdGlvbkIgPSBjb25maWcub3ZlcmxheXMuaW5kZXhPZihsYXllckIuY293ZWdpcy5sYXllcklkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb3NpdGlvbkEgLSBwb3NpdGlvbkI7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRMaXN0ZW5lcihlbGVtZW50LCByZWZlcmVuY2UpXG57XG4gICAgaWYgKHJlZmVyZW5jZS5uYW1lc3BhY2UgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQubGlzdGVuZXJzW3JlZmVyZW5jZS5yZWZlcmVuY2VdO1xuICAgIH1cblxuICAgIGxldCBsaXN0ZW5lcnMgPSBlbGVtZW50Lmxpc3RlbmVycztcbiAgICByZWZlcmVuY2UubmFtZXNwYWNlLmZvckVhY2goZnVuY3Rpb24gKHBhcnQpIHtcbiAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzW3BhcnRdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyc1tyZWZlcmVuY2UucmVmZXJlbmNlXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnLCBlbGVtZW50KSB7XG4gICAgY29uc3QgYmFzZUxheWVycyA9IHtcbiAgICAgICAgYXZhaWxhYmxlOiB7fSxcbiAgICAgICAgcGVuZGluZzogW10sXG4gICAgfTtcblxuICAgIGNvbnN0IG92ZXJsYXlzID0ge1xuICAgICAgICBhdmFpbGFibGU6IHt9LFxuICAgICAgICBwZW5kaW5nOiBbXSxcbiAgICB9O1xuXG4gICAgaWYgKGNvbmZpZy5vcHRpb25zLnNvcnRGdW5jdGlvbikge1xuICAgICAgICBjb25maWcub3B0aW9ucy5zb3J0RnVuY3Rpb24gPSBnZXRMaXN0ZW5lcihlbGVtZW50LCBjb25maWcub3B0aW9ucy5zb3J0RnVuY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAoIWNvbmZpZy5vcHRpb25zLnNvcnRMYXllcnMpIHtcbiAgICAgICAgY29uZmlnLm9wdGlvbnMuc29ydExheWVycyA9IHRydWU7XG4gICAgICAgIGNvbmZpZy5vcHRpb25zLnNvcnRGdW5jdGlvbiA9IGNyZWF0ZURlZmF1bHRTb3J0TGF5ZXJDYWxsYmFjayhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IG5hbWVDYWxsYmFjayA9IGNvbmZpZy5vcHRpb25zLm5hbWVGdW5jdGlvblxuICAgICAgICA/IGdldExpc3RlbmVyKGVsZW1lbnQsIGNvbmZpZy5vcHRpb25zLm5hbWVGdW5jdGlvbilcbiAgICAgICAgOiBkZWZhdWx0TmFtZUNhbGxiYWNrO1xuXG4gICAgY29sbGVjdExheWVycyhlbGVtZW50LCBjb25maWcuYmFzZUxheWVycywgYmFzZUxheWVycywgbmFtZUNhbGxiYWNrKTtcbiAgICBjb2xsZWN0TGF5ZXJzKGVsZW1lbnQsIGNvbmZpZy5vdmVybGF5cywgb3ZlcmxheXMsIG5hbWVDYWxsYmFjayk7XG5cbiAgICBjb25zdCBjb250cm9sID0gbGVhZmxldC5jb250cm9sLmxheWVycyhiYXNlTGF5ZXJzLmF2YWlsYWJsZSwgb3ZlcmxheXMuYXZhaWxhYmxlLCBjb25maWcub3B0aW9ucyk7XG4gICAgcmVnaXN0ZXJDb2xsZWN0TGlzdGVuZXIoZWxlbWVudCwgYmFzZUxheWVycywgY29udHJvbC5hZGRCYXNlTGF5ZXIuYmluZChjb250cm9sKSwgbmFtZUNhbGxiYWNrKTtcbiAgICByZWdpc3RlckNvbGxlY3RMaXN0ZW5lcihlbGVtZW50LCBvdmVybGF5cywgY29udHJvbC5hZGRPdmVybGF5LmJpbmQoY29udHJvbCksIG5hbWVDYWxsYmFjayk7XG5cbiAgICByZXR1cm4gY29udHJvbDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=