(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layer-featureGroupFactory"],{

/***/ "./js/layer/featureGroupFactory.js":
/*!*****************************************!*\
  !*** ./js/layer/featureGroupFactory.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../leaflet */ "./js/leaflet/index.js");
/* harmony import */ var _layerGroupFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layerGroupFactory */ "./js/layer/layerGroupFactory.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_layerGroupFactory__WEBPACK_IMPORTED_MODULE_1__["createFactory"])(_leaflet__WEBPACK_IMPORTED_MODULE_0__["default"].featureGroup));

/***/ }),

/***/ "./js/layer/layerGroupFactory.js":
/*!***************************************!*\
  !*** ./js/layer/layerGroupFactory.js ***!
  \***************************************/
/*! exports provided: createFactory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../leaflet */ "./js/leaflet/index.js");




function collectLayers(element, layers, state) {
  layers.forEach(function (layerId) {
    if (element.layers.hasOwnProperty(layerId)) {
      state.available.push(element.layers[layerId]);
    } else {
      state.pending.push(layerId);
    }
  });
}

function registerCollectListener(element, layer, state) {
  if (state.pending.length === 0) {
    return;
  }

  var listener = function listener(event) {
    var index = state.pending.indexOf(event.detail.config.layerId);

    if (index < 0) {
      return;
    }

    layer.addLayer(event.detail.layer);
    state.pending.splice(index, 1);

    if (state.pending.length === 0) {
      element.removeEventListener('cowegis:layer:add', listener);
    }
  };

  element.addEventListener('cowegis:layer:add', listener);
}

function createFactory(layerFactory) {
  return /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config, element) {
      var state, layer;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = {
                available: [],
                pending: []
              };
              collectLayers(element, config.layers, state);
              layer = layerFactory(state.available, config.options);
              registerCollectListener(element, layer, state);
              return _context.abrupt("return", layer);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}
/* harmony default export */ __webpack_exports__["default"] = (createFactory(_leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].layerGroup));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9sYXllci9mZWF0dXJlR3JvdXBGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2pzL2xheWVyL2xheWVyR3JvdXBGYWN0b3J5LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUZhY3RvcnkiLCJsZWFmbGV0IiwiZmVhdHVyZUdyb3VwIiwiY29sbGVjdExheWVycyIsImVsZW1lbnQiLCJsYXllcnMiLCJzdGF0ZSIsImZvckVhY2giLCJsYXllcklkIiwiaGFzT3duUHJvcGVydHkiLCJhdmFpbGFibGUiLCJwdXNoIiwicGVuZGluZyIsInJlZ2lzdGVyQ29sbGVjdExpc3RlbmVyIiwibGF5ZXIiLCJsZW5ndGgiLCJsaXN0ZW5lciIsImV2ZW50IiwiaW5kZXgiLCJpbmRleE9mIiwiZGV0YWlsIiwiY29uZmlnIiwiYWRkTGF5ZXIiLCJzcGxpY2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxheWVyRmFjdG9yeSIsIm9wdGlvbnMiLCJsYXllckdyb3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVlQSx1SUFBYSxDQUFDQyxnREFBTyxDQUFDQyxZQUFULENBQTVCLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBOztBQUVBLFNBQVNDLGFBQVQsQ0FBdUJDLE9BQXZCLEVBQWdDQyxNQUFoQyxFQUF3Q0MsS0FBeEMsRUFBK0M7QUFDM0NELFFBQU0sQ0FBQ0UsT0FBUCxDQUFlLFVBQVVDLE9BQVYsRUFBbUI7QUFDOUIsUUFBSUosT0FBTyxDQUFDQyxNQUFSLENBQWVJLGNBQWYsQ0FBOEJELE9BQTlCLENBQUosRUFBNEM7QUFDeENGLFdBQUssQ0FBQ0ksU0FBTixDQUFnQkMsSUFBaEIsQ0FBcUJQLE9BQU8sQ0FBQ0MsTUFBUixDQUFlRyxPQUFmLENBQXJCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hGLFdBQUssQ0FBQ00sT0FBTixDQUFjRCxJQUFkLENBQW1CSCxPQUFuQjtBQUNIO0FBQ0osR0FORDtBQU9IOztBQUVELFNBQVNLLHVCQUFULENBQWlDVCxPQUFqQyxFQUEwQ1UsS0FBMUMsRUFBaURSLEtBQWpELEVBQXdEO0FBQ3BELE1BQUlBLEtBQUssQ0FBQ00sT0FBTixDQUFjRyxNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQzVCO0FBQ0g7O0FBRUQsTUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBVUMsS0FBVixFQUFpQjtBQUM5QixRQUFNQyxLQUFLLEdBQUdaLEtBQUssQ0FBQ00sT0FBTixDQUFjTyxPQUFkLENBQXNCRixLQUFLLENBQUNHLE1BQU4sQ0FBYUMsTUFBYixDQUFvQmIsT0FBMUMsQ0FBZDs7QUFDQSxRQUFJVSxLQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ1g7QUFDSDs7QUFFREosU0FBSyxDQUFDUSxRQUFOLENBQWVMLEtBQUssQ0FBQ0csTUFBTixDQUFhTixLQUE1QjtBQUNBUixTQUFLLENBQUNNLE9BQU4sQ0FBY1csTUFBZCxDQUFxQkwsS0FBckIsRUFBNEIsQ0FBNUI7O0FBRUEsUUFBSVosS0FBSyxDQUFDTSxPQUFOLENBQWNHLE1BQWQsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUJYLGFBQU8sQ0FBQ29CLG1CQUFSLENBQTRCLG1CQUE1QixFQUFpRFIsUUFBakQ7QUFDSDtBQUNKLEdBWkQ7O0FBY0FaLFNBQU8sQ0FBQ3FCLGdCQUFSLENBQXlCLG1CQUF6QixFQUE4Q1QsUUFBOUM7QUFDSDs7QUFFTSxTQUFTaEIsYUFBVCxDQUF1QjBCLFlBQXZCLEVBQXFDO0FBQ3hDO0FBQUEsbUxBQU8saUJBQWdCTCxNQUFoQixFQUF3QmpCLE9BQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNHRSxtQkFESCxHQUNXO0FBQ1ZJLHlCQUFTLEVBQUUsRUFERDtBQUVWRSx1QkFBTyxFQUFFO0FBRkMsZUFEWDtBQU1IVCwyQkFBYSxDQUFDQyxPQUFELEVBQVVpQixNQUFNLENBQUNoQixNQUFqQixFQUF5QkMsS0FBekIsQ0FBYjtBQUNNUSxtQkFQSCxHQU9XWSxZQUFZLENBQUNwQixLQUFLLENBQUNJLFNBQVAsRUFBa0JXLE1BQU0sQ0FBQ00sT0FBekIsQ0FQdkI7QUFRSGQscUNBQXVCLENBQUNULE9BQUQsRUFBVVUsS0FBVixFQUFpQlIsS0FBakIsQ0FBdkI7QUFSRywrQ0FVSVEsS0FWSjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFQOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWUg7QUFFY2QsNEVBQWEsQ0FBQ0MsZ0RBQU8sQ0FBQzJCLFVBQVQsQ0FBNUIsRSIsImZpbGUiOiJqcy9sYXllci1mZWF0dXJlR3JvdXBGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxlYWZsZXQgZnJvbSAnLi4vbGVhZmxldCc7XG5pbXBvcnQge2NyZWF0ZUZhY3Rvcnl9IGZyb20gJy4vbGF5ZXJHcm91cEZhY3RvcnknO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGYWN0b3J5KGxlYWZsZXQuZmVhdHVyZUdyb3VwKTtcbiIsImltcG9ydCBsZWFmbGV0IGZyb20gJy4uL2xlYWZsZXQnO1xuXG5mdW5jdGlvbiBjb2xsZWN0TGF5ZXJzKGVsZW1lbnQsIGxheWVycywgc3RhdGUpIHtcbiAgICBsYXllcnMuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXJJZCkge1xuICAgICAgICBpZiAoZWxlbWVudC5sYXllcnMuaGFzT3duUHJvcGVydHkobGF5ZXJJZCkpIHtcbiAgICAgICAgICAgIHN0YXRlLmF2YWlsYWJsZS5wdXNoKGVsZW1lbnQubGF5ZXJzW2xheWVySWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlLnBlbmRpbmcucHVzaChsYXllcklkKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckNvbGxlY3RMaXN0ZW5lcihlbGVtZW50LCBsYXllciwgc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUucGVuZGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gc3RhdGUucGVuZGluZy5pbmRleE9mKGV2ZW50LmRldGFpbC5jb25maWcubGF5ZXJJZCk7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxheWVyLmFkZExheWVyKGV2ZW50LmRldGFpbC5sYXllcik7XG4gICAgICAgIHN0YXRlLnBlbmRpbmcuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICBpZiAoc3RhdGUucGVuZGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY293ZWdpczpsYXllcjphZGQnLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nvd2VnaXM6bGF5ZXI6YWRkJywgbGlzdGVuZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmFjdG9yeShsYXllckZhY3RvcnkpIHtcbiAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKGNvbmZpZywgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAgIGF2YWlsYWJsZTogW10sXG4gICAgICAgICAgICBwZW5kaW5nOiBbXSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb2xsZWN0TGF5ZXJzKGVsZW1lbnQsIGNvbmZpZy5sYXllcnMsIHN0YXRlKTtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBsYXllckZhY3Rvcnkoc3RhdGUuYXZhaWxhYmxlLCBjb25maWcub3B0aW9ucyk7XG4gICAgICAgIHJlZ2lzdGVyQ29sbGVjdExpc3RlbmVyKGVsZW1lbnQsIGxheWVyLCBzdGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRmFjdG9yeShsZWFmbGV0LmxheWVyR3JvdXApO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==