(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["control-attributionControlFactory"],{

/***/ "./js/control/attributionControlFactory.js":
/*!*************************************************!*\
  !*** ./js/control/attributionControlFactory.js ***!
  \*************************************************/
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
            control = _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].control.attribution(config.options);
            config.attributions.forEach(function (attribution) {
              return control.addAttribution(attribution);
            });

            if (config.replacesDefault && element.map.attributionControl) {
              element.map.removeControl(element.map.attributionControl);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9jb250cm9sL2F0dHJpYnV0aW9uQ29udHJvbEZhY3RvcnkuanMiXSwibmFtZXMiOlsiY29uZmlnIiwiZWxlbWVudCIsImNvbnRyb2wiLCJsZWFmbGV0IiwiYXR0cmlidXRpb24iLCJvcHRpb25zIiwiYXR0cmlidXRpb25zIiwiZm9yRWFjaCIsImFkZEF0dHJpYnV0aW9uIiwicmVwbGFjZXNEZWZhdWx0IiwibWFwIiwiYXR0cmlidXRpb25Db250cm9sIiwicmVtb3ZlQ29udHJvbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZTtBQUFmO0FBQUE7Ozs2S0FBZSxpQkFBZUEsTUFBZixFQUF1QkMsT0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0xDLG1CQURLLEdBQ0tDLGdEQUFPLENBQUNELE9BQVIsQ0FBZ0JFLFdBQWhCLENBQTRCSixNQUFNLENBQUNLLE9BQW5DLENBREw7QUFHWEwsa0JBQU0sQ0FBQ00sWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBQ0gsV0FBRDtBQUFBLHFCQUFpQkYsT0FBTyxDQUFDTSxjQUFSLENBQXVCSixXQUF2QixDQUFqQjtBQUFBLGFBQTVCOztBQUVBLGdCQUFJSixNQUFNLENBQUNTLGVBQVAsSUFBMEJSLE9BQU8sQ0FBQ1MsR0FBUixDQUFZQyxrQkFBMUMsRUFBOEQ7QUFDMURWLHFCQUFPLENBQUNTLEdBQVIsQ0FBWUUsYUFBWixDQUEwQlgsT0FBTyxDQUFDUyxHQUFSLENBQVlDLGtCQUF0QztBQUNIOztBQVBVLDZDQVNKVCxPQVRJOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoianMvY29udHJvbC1hdHRyaWJ1dGlvbkNvbnRyb2xGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxlYWZsZXQgZnJvbSBcIi4uL2xlYWZsZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oY29uZmlnLCBlbGVtZW50KSB7XG4gICAgY29uc3QgY29udHJvbCA9IGxlYWZsZXQuY29udHJvbC5hdHRyaWJ1dGlvbihjb25maWcub3B0aW9ucyk7XG5cbiAgICBjb25maWcuYXR0cmlidXRpb25zLmZvckVhY2goKGF0dHJpYnV0aW9uKSA9PiBjb250cm9sLmFkZEF0dHJpYnV0aW9uKGF0dHJpYnV0aW9uKSk7XG5cbiAgICBpZiAoY29uZmlnLnJlcGxhY2VzRGVmYXVsdCAmJiBlbGVtZW50Lm1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wpIHtcbiAgICAgICAgZWxlbWVudC5tYXAucmVtb3ZlQ29udHJvbChlbGVtZW50Lm1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wpO1xuICAgIH1cblxuICAgIHJldHVybiBjb250cm9sO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==