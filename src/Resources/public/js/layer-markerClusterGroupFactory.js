(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layer-markerClusterGroupFactory"],{

/***/ "./js/layer/markerClusterGroupFactory.js":
/*!***********************************************!*\
  !*** ./js/layer/markerClusterGroupFactory.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_markercluster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet.markercluster */ "./node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js");
/* harmony import */ var leaflet_markercluster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet_markercluster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var leaflet_markercluster_layersupport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet.markercluster.layersupport */ "./node_modules/leaflet.markercluster.layersupport/dist/leaflet.markercluster.layersupport.js");
/* harmony import */ var leaflet_markercluster_layersupport__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet_markercluster_layersupport__WEBPACK_IMPORTED_MODULE_3__);





function collectLayers(element, layers, pending, layer) {
  layers.forEach(function (layerId) {
    if (element.layers.hasOwnProperty(layerId)) {
      if (element.layers[layerId].cowegis.initialVisible) {
        layer.addLayer(element.layers[layerId]);
      } else {
        layer.checkIn(element.layers[layerId]);
      }
    } else {
      pending.push(layerId);
    }
  });
}

function registerCollectListener(element, layer, pending) {
  if (pending.length === 0) {
    return;
  }

  var listener = function listener(event) {
    var index = pending.indexOf(event.detail.config.layerId);

    if (index < 0) {
      return;
    }

    pending.splice(index, 1);

    if (event.detail.config.initialVisible) {
      layer.addLayer(element.layers[event.detail.config.layerId]);
    } else {
      layer.checkIn(element.layers[event.detail.config.layerId]);
    }

    if (pending.length === 0) {
      element.removeEventListener('cowegis:layer:add', listener);
    }
  };

  element.addEventListener('cowegis:layer:add', listener);
}

/* harmony default export */ __webpack_exports__["default"] = (function (_x, _x2) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config, element) {
    var pending, layer;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pending = [];
            layer = L.markerClusterGroup.layerSupport(config.options);
            collectLayers(element, config.layers, pending, layer);
            registerCollectListener(element, layer, pending);
            return _context.abrupt("return", layer);

          case 5:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9sYXllci9tYXJrZXJDbHVzdGVyR3JvdXBGYWN0b3J5LmpzIl0sIm5hbWVzIjpbImNvbGxlY3RMYXllcnMiLCJlbGVtZW50IiwibGF5ZXJzIiwicGVuZGluZyIsImxheWVyIiwiZm9yRWFjaCIsImxheWVySWQiLCJoYXNPd25Qcm9wZXJ0eSIsImNvd2VnaXMiLCJpbml0aWFsVmlzaWJsZSIsImFkZExheWVyIiwiY2hlY2tJbiIsInB1c2giLCJyZWdpc3RlckNvbGxlY3RMaXN0ZW5lciIsImxlbmd0aCIsImxpc3RlbmVyIiwiZXZlbnQiLCJpbmRleCIsImluZGV4T2YiLCJkZXRhaWwiLCJjb25maWciLCJzcGxpY2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkwiLCJtYXJrZXJDbHVzdGVyR3JvdXAiLCJsYXllclN1cHBvcnQiLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBLFNBQVNBLGFBQVQsQ0FBdUJDLE9BQXZCLEVBQWdDQyxNQUFoQyxFQUF3Q0MsT0FBeEMsRUFBaURDLEtBQWpELEVBQXdEO0FBQ3BERixRQUFNLENBQUNHLE9BQVAsQ0FBZSxVQUFVQyxPQUFWLEVBQW1CO0FBQzlCLFFBQUlMLE9BQU8sQ0FBQ0MsTUFBUixDQUFlSyxjQUFmLENBQThCRCxPQUE5QixDQUFKLEVBQTRDO0FBQ3hDLFVBQUlMLE9BQU8sQ0FBQ0MsTUFBUixDQUFlSSxPQUFmLEVBQXdCRSxPQUF4QixDQUFnQ0MsY0FBcEMsRUFBb0Q7QUFDaERMLGFBQUssQ0FBQ00sUUFBTixDQUFlVCxPQUFPLENBQUNDLE1BQVIsQ0FBZUksT0FBZixDQUFmO0FBQ0gsT0FGRCxNQUVPO0FBQ0hGLGFBQUssQ0FBQ08sT0FBTixDQUFjVixPQUFPLENBQUNDLE1BQVIsQ0FBZUksT0FBZixDQUFkO0FBQ0g7QUFDSixLQU5ELE1BTU87QUFDSEgsYUFBTyxDQUFDUyxJQUFSLENBQWFOLE9BQWI7QUFDSDtBQUNKLEdBVkQ7QUFXSDs7QUFFRCxTQUFTTyx1QkFBVCxDQUFpQ1osT0FBakMsRUFBMENHLEtBQTFDLEVBQWlERCxPQUFqRCxFQUEwRDtBQUN0RCxNQUFJQSxPQUFPLENBQUNXLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEI7QUFDSDs7QUFFRCxNQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFVQyxLQUFWLEVBQWlCO0FBQzlCLFFBQU1DLEtBQUssR0FBR2QsT0FBTyxDQUFDZSxPQUFSLENBQWdCRixLQUFLLENBQUNHLE1BQU4sQ0FBYUMsTUFBYixDQUFvQmQsT0FBcEMsQ0FBZDs7QUFDQSxRQUFJVyxLQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ1g7QUFDSDs7QUFFRGQsV0FBTyxDQUFDa0IsTUFBUixDQUFlSixLQUFmLEVBQXNCLENBQXRCOztBQUNBLFFBQUlELEtBQUssQ0FBQ0csTUFBTixDQUFhQyxNQUFiLENBQW9CWCxjQUF4QixFQUF3QztBQUNwQ0wsV0FBSyxDQUFDTSxRQUFOLENBQWVULE9BQU8sQ0FBQ0MsTUFBUixDQUFlYyxLQUFLLENBQUNHLE1BQU4sQ0FBYUMsTUFBYixDQUFvQmQsT0FBbkMsQ0FBZjtBQUNILEtBRkQsTUFFTztBQUNIRixXQUFLLENBQUNPLE9BQU4sQ0FBY1YsT0FBTyxDQUFDQyxNQUFSLENBQWVjLEtBQUssQ0FBQ0csTUFBTixDQUFhQyxNQUFiLENBQW9CZCxPQUFuQyxDQUFkO0FBQ0g7O0FBRUQsUUFBSUgsT0FBTyxDQUFDVyxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3RCYixhQUFPLENBQUNxQixtQkFBUixDQUE0QixtQkFBNUIsRUFBaURQLFFBQWpEO0FBQ0g7QUFDSixHQWhCRDs7QUFrQkFkLFNBQU8sQ0FBQ3NCLGdCQUFSLENBQXlCLG1CQUF6QixFQUE4Q1IsUUFBOUM7QUFDSDs7QUFFYztBQUFmO0FBQUE7Ozs2S0FBZSxpQkFBZUssTUFBZixFQUF1Qm5CLE9BQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNMRSxtQkFESyxHQUNLLEVBREw7QUFFTEMsaUJBRkssR0FFS29CLENBQUMsQ0FBQ0Msa0JBQUYsQ0FBcUJDLFlBQXJCLENBQWtDTixNQUFNLENBQUNPLE9BQXpDLENBRkw7QUFJWDNCLHlCQUFhLENBQUNDLE9BQUQsRUFBVW1CLE1BQU0sQ0FBQ2xCLE1BQWpCLEVBQXlCQyxPQUF6QixFQUFrQ0MsS0FBbEMsQ0FBYjtBQUNBUyxtQ0FBdUIsQ0FBQ1osT0FBRCxFQUFVRyxLQUFWLEVBQWlCRCxPQUFqQixDQUF2QjtBQUxXLDZDQU9KQyxLQVBJOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoianMvbGF5ZXItbWFya2VyQ2x1c3Rlckdyb3VwRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnbGVhZmxldC5tYXJrZXJjbHVzdGVyJztcbmltcG9ydCAnbGVhZmxldC5tYXJrZXJjbHVzdGVyLmxheWVyc3VwcG9ydCc7XG5cbmZ1bmN0aW9uIGNvbGxlY3RMYXllcnMoZWxlbWVudCwgbGF5ZXJzLCBwZW5kaW5nLCBsYXllcikge1xuICAgIGxheWVycy5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcklkKSB7XG4gICAgICAgIGlmIChlbGVtZW50LmxheWVycy5oYXNPd25Qcm9wZXJ0eShsYXllcklkKSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF5ZXJzW2xheWVySWRdLmNvd2VnaXMuaW5pdGlhbFZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBsYXllci5hZGRMYXllcihlbGVtZW50LmxheWVyc1tsYXllcklkXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxheWVyLmNoZWNrSW4oZWxlbWVudC5sYXllcnNbbGF5ZXJJZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVuZGluZy5wdXNoKGxheWVySWQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQ29sbGVjdExpc3RlbmVyKGVsZW1lbnQsIGxheWVyLCBwZW5kaW5nKSB7XG4gICAgaWYgKHBlbmRpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHBlbmRpbmcuaW5kZXhPZihldmVudC5kZXRhaWwuY29uZmlnLmxheWVySWQpO1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwZW5kaW5nLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGlmIChldmVudC5kZXRhaWwuY29uZmlnLmluaXRpYWxWaXNpYmxlKSB7XG4gICAgICAgICAgICBsYXllci5hZGRMYXllcihlbGVtZW50LmxheWVyc1tldmVudC5kZXRhaWwuY29uZmlnLmxheWVySWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxheWVyLmNoZWNrSW4oZWxlbWVudC5sYXllcnNbZXZlbnQuZGV0YWlsLmNvbmZpZy5sYXllcklkXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGVuZGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY293ZWdpczpsYXllcjphZGQnLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Nvd2VnaXM6bGF5ZXI6YWRkJywgbGlzdGVuZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihjb25maWcsIGVsZW1lbnQpIHtcbiAgICBjb25zdCBwZW5kaW5nID0gW107XG4gICAgY29uc3QgbGF5ZXIgICA9IEwubWFya2VyQ2x1c3Rlckdyb3VwLmxheWVyU3VwcG9ydChjb25maWcub3B0aW9ucyk7XG5cbiAgICBjb2xsZWN0TGF5ZXJzKGVsZW1lbnQsIGNvbmZpZy5sYXllcnMsIHBlbmRpbmcsIGxheWVyKTtcbiAgICByZWdpc3RlckNvbGxlY3RMaXN0ZW5lcihlbGVtZW50LCBsYXllciwgcGVuZGluZyk7XG5cbiAgICByZXR1cm4gbGF5ZXI7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9