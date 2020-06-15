(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layer-providerLayerFactory"],{

/***/ "./js/layer/providerLayerFactory.js":
/*!******************************************!*\
  !*** ./js/layer/providerLayerFactory.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../leaflet */ "./js/leaflet/index.js");
/* harmony import */ var leaflet_providers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet-providers */ "./node_modules/leaflet-providers/leaflet-providers.js");
/* harmony import */ var leaflet_providers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet_providers__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = (function (_x) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config) {
    var provider;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            provider = config.provider;

            if (config.variant !== null) {
              provider += '.' + config.variant;
            }

            return _context.abrupt("return", _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].tileLayer.provider(provider, config.options));

          case 3:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9sYXllci9wcm92aWRlckxheWVyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwcm92aWRlciIsInZhcmlhbnQiLCJsZWFmbGV0IiwidGlsZUxheWVyIiwib3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRWU7QUFBZjtBQUFBOzs7NktBQWUsaUJBQWdCQSxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUEMsb0JBRE8sR0FDSUQsTUFBTSxDQUFDQyxRQURYOztBQUVYLGdCQUFJRCxNQUFNLENBQUNFLE9BQVAsS0FBbUIsSUFBdkIsRUFBNkI7QUFDekJELHNCQUFRLElBQUksTUFBTUQsTUFBTSxDQUFDRSxPQUF6QjtBQUNIOztBQUpVLDZDQU1KQyxnREFBTyxDQUFDQyxTQUFSLENBQWtCSCxRQUFsQixDQUEyQkEsUUFBM0IsRUFBcUNELE1BQU0sQ0FBQ0ssT0FBNUMsQ0FOSTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwiZmlsZSI6ImpzL2xheWVyLXByb3ZpZGVyTGF5ZXJGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxlYWZsZXQgZnJvbSAnLi4vbGVhZmxldCc7XG5pbXBvcnQgJ2xlYWZsZXQtcHJvdmlkZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGxldCBwcm92aWRlciA9IGNvbmZpZy5wcm92aWRlcjtcbiAgICBpZiAoY29uZmlnLnZhcmlhbnQgIT09IG51bGwpIHtcbiAgICAgICAgcHJvdmlkZXIgKz0gJy4nICsgY29uZmlnLnZhcmlhbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWZsZXQudGlsZUxheWVyLnByb3ZpZGVyKHByb3ZpZGVyLCBjb25maWcub3B0aW9ucyk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9