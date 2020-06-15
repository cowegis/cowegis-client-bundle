(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["control-zoomControlFactory"],{

/***/ "./js/control/zoomControlFactory.js":
/*!******************************************!*\
  !*** ./js/control/zoomControlFactory.js ***!
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



/* harmony default export */ __webpack_exports__["default"] = (function (_x, _x2) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config, element) {
    var control;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            control = _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].control.zoom(config.options);

            if (config.replacesDefault && element.map.zoomControl) {
              element.map.removeControl(element.map.zoomControl);
            } // Required for compatibility with leaflet.fullscreen which cannot handle a custom zoom control.


            if (!element.map.zoomControl) {
              element.map.zoomControl = control;
            }

            return _context.abrupt("return", control);

          case 4:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9jb250cm9sL3pvb21Db250cm9sRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJlbGVtZW50IiwiY29udHJvbCIsImxlYWZsZXQiLCJ6b29tIiwib3B0aW9ucyIsInJlcGxhY2VzRGVmYXVsdCIsIm1hcCIsInpvb21Db250cm9sIiwicmVtb3ZlQ29udHJvbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZTtBQUFmO0FBQUE7Ozs2S0FBZSxpQkFBZUEsTUFBZixFQUF1QkMsT0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0xDLG1CQURLLEdBQ0tDLGdEQUFPLENBQUNELE9BQVIsQ0FBZ0JFLElBQWhCLENBQXFCSixNQUFNLENBQUNLLE9BQTVCLENBREw7O0FBR1gsZ0JBQUlMLE1BQU0sQ0FBQ00sZUFBUCxJQUEwQkwsT0FBTyxDQUFDTSxHQUFSLENBQVlDLFdBQTFDLEVBQXVEO0FBQ25EUCxxQkFBTyxDQUFDTSxHQUFSLENBQVlFLGFBQVosQ0FBMEJSLE9BQU8sQ0FBQ00sR0FBUixDQUFZQyxXQUF0QztBQUNILGFBTFUsQ0FPWDs7O0FBQ0EsZ0JBQUksQ0FBRVAsT0FBTyxDQUFDTSxHQUFSLENBQVlDLFdBQWxCLEVBQStCO0FBQzNCUCxxQkFBTyxDQUFDTSxHQUFSLENBQVlDLFdBQVosR0FBMEJOLE9BQTFCO0FBQ0g7O0FBVlUsNkNBWUpBLE9BWkk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJqcy9jb250cm9sLXpvb21Db250cm9sRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsZWFmbGV0IGZyb20gXCIuLi9sZWFmbGV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZywgZWxlbWVudCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSBsZWFmbGV0LmNvbnRyb2wuem9vbShjb25maWcub3B0aW9ucyk7XG5cbiAgICBpZiAoY29uZmlnLnJlcGxhY2VzRGVmYXVsdCAmJiBlbGVtZW50Lm1hcC56b29tQ29udHJvbCkge1xuICAgICAgICBlbGVtZW50Lm1hcC5yZW1vdmVDb250cm9sKGVsZW1lbnQubWFwLnpvb21Db250cm9sKTtcbiAgICB9XG5cbiAgICAvLyBSZXF1aXJlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIGxlYWZsZXQuZnVsbHNjcmVlbiB3aGljaCBjYW5ub3QgaGFuZGxlIGEgY3VzdG9tIHpvb20gY29udHJvbC5cbiAgICBpZiAoISBlbGVtZW50Lm1hcC56b29tQ29udHJvbCkge1xuICAgICAgICBlbGVtZW50Lm1hcC56b29tQ29udHJvbCA9IGNvbnRyb2w7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRyb2w7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9