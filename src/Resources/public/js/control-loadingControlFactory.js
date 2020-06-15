(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["control-loadingControlFactory"],{

/***/ "./js/control/loadingControlFactory.js":
/*!*********************************************!*\
  !*** ./js/control/loadingControlFactory.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet-loading */ "./node_modules/leaflet-loading/src/Control.Loading.js");
/* harmony import */ var leaflet_loading__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet_loading__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function (_x, _x2) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config, element) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (config.options.zoomControl) {
              if (element.controls[config.options.zoomControl] !== undefined) {
                config.options.zoomControl = element.controls[config.options.zoomControl];
              } else {
                delete config.options.zoomControl;
              }
            }

            if (config.options.spinjs && config.options.spin === undefined) {
              config.options.spin = {
                lines: 7,
                length: 3,
                width: 3,
                radius: 4,
                rotate: 13,
                top: "50%"
              };
            }

            if (!(config.options.spinjs && global.Spinner === undefined)) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return __webpack_require__.e(/*! import() | spin */ "spin").then(__webpack_require__.bind(null, /*! spin.js */ "./node_modules/spin.js/spin.js")).then(function (module) {
              return global.Spinner = module.Spinner;
            });

          case 5:
            return _context.abrupt("return", L.Control.loading(config.options));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9jb250cm9sL2xvYWRpbmdDb250cm9sRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJlbGVtZW50Iiwib3B0aW9ucyIsInpvb21Db250cm9sIiwiY29udHJvbHMiLCJ1bmRlZmluZWQiLCJzcGluanMiLCJzcGluIiwibGluZXMiLCJsZW5ndGgiLCJ3aWR0aCIsInJhZGl1cyIsInJvdGF0ZSIsInRvcCIsImdsb2JhbCIsIlNwaW5uZXIiLCJ0aGVuIiwibW9kdWxlIiwiTCIsIkNvbnRyb2wiLCJsb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZTtBQUFmO0FBQUE7Ozs2S0FBZSxpQkFBZUEsTUFBZixFQUF1QkMsT0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNYLGdCQUFJRCxNQUFNLENBQUNFLE9BQVAsQ0FBZUMsV0FBbkIsRUFBZ0M7QUFDNUIsa0JBQUlGLE9BQU8sQ0FBQ0csUUFBUixDQUFpQkosTUFBTSxDQUFDRSxPQUFQLENBQWVDLFdBQWhDLE1BQWlERSxTQUFyRCxFQUFnRTtBQUM1REwsc0JBQU0sQ0FBQ0UsT0FBUCxDQUFlQyxXQUFmLEdBQTZCRixPQUFPLENBQUNHLFFBQVIsQ0FBaUJKLE1BQU0sQ0FBQ0UsT0FBUCxDQUFlQyxXQUFoQyxDQUE3QjtBQUNILGVBRkQsTUFFTztBQUNILHVCQUFPSCxNQUFNLENBQUNFLE9BQVAsQ0FBZUMsV0FBdEI7QUFDSDtBQUNKOztBQUVELGdCQUFJSCxNQUFNLENBQUNFLE9BQVAsQ0FBZUksTUFBZixJQUF5Qk4sTUFBTSxDQUFDRSxPQUFQLENBQWVLLElBQWYsS0FBd0JGLFNBQXJELEVBQWdFO0FBQzVETCxvQkFBTSxDQUFDRSxPQUFQLENBQWVLLElBQWYsR0FBc0I7QUFDbEJDLHFCQUFLLEVBQUUsQ0FEVztBQUVsQkMsc0JBQU0sRUFBRSxDQUZVO0FBR2xCQyxxQkFBSyxFQUFFLENBSFc7QUFJbEJDLHNCQUFNLEVBQUUsQ0FKVTtBQUtsQkMsc0JBQU0sRUFBRSxFQUxVO0FBTWxCQyxtQkFBRyxFQUFFO0FBTmEsZUFBdEI7QUFRSDs7QUFsQlUsa0JBbUJQYixNQUFNLENBQUNFLE9BQVAsQ0FBZUksTUFBZixJQUF5QlEsTUFBTSxDQUFDQyxPQUFQLEtBQW1CVixTQW5CckM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFvQkgsMklBQWlEVyxJQUFqRCxDQUNGLFVBQUNDLE1BQUQ7QUFBQSxxQkFBWUgsTUFBTSxDQUFDQyxPQUFQLEdBQWlCRSxNQUFNLENBQUNGLE9BQXBDO0FBQUEsYUFERSxDQXBCRzs7QUFBQTtBQUFBLDZDQXlCSkcsQ0FBQyxDQUFDQyxPQUFGLENBQVVDLE9BQVYsQ0FBa0JwQixNQUFNLENBQUNFLE9BQXpCLENBekJJOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoianMvY29udHJvbC1sb2FkaW5nQ29udHJvbEZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2xlYWZsZXQtbG9hZGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZywgZWxlbWVudCkge1xuICAgIGlmIChjb25maWcub3B0aW9ucy56b29tQ29udHJvbCkge1xuICAgICAgICBpZiAoZWxlbWVudC5jb250cm9sc1tjb25maWcub3B0aW9ucy56b29tQ29udHJvbF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uZmlnLm9wdGlvbnMuem9vbUNvbnRyb2wgPSBlbGVtZW50LmNvbnRyb2xzW2NvbmZpZy5vcHRpb25zLnpvb21Db250cm9sXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcub3B0aW9ucy56b29tQ29udHJvbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb25maWcub3B0aW9ucy5zcGluanMgJiYgY29uZmlnLm9wdGlvbnMuc3BpbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbmZpZy5vcHRpb25zLnNwaW4gPSB7XG4gICAgICAgICAgICBsaW5lczogNyxcbiAgICAgICAgICAgIGxlbmd0aDogMyxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgcmFkaXVzOiA0LFxuICAgICAgICAgICAgcm90YXRlOiAxMyxcbiAgICAgICAgICAgIHRvcDogXCI1MCVcIlxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjb25maWcub3B0aW9ucy5zcGluanMgJiYgZ2xvYmFsLlNwaW5uZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwic3BpblwiICovICdzcGluLmpzJykudGhlbihcbiAgICAgICAgICAobW9kdWxlKSA9PiBnbG9iYWwuU3Bpbm5lciA9IG1vZHVsZS5TcGlubmVyXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBMLkNvbnRyb2wubG9hZGluZyhjb25maWcub3B0aW9ucyk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9