(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["icon-svgIconFactory"],{

/***/ "./js/icon/SvgIcon.js":
/*!****************************!*\
  !*** ./js/icon/SvgIcon.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);

var sizes = {
  small: 0.7,
  medium: 1,
  large: 1.5
};
/* harmony default export */ __webpack_exports__["default"] = (leaflet__WEBPACK_IMPORTED_MODULE_0__["DivIcon"].extend({
  options: {
    iconSize: [26, 40],
    iconAnchor: [13, 40],
    popupAnchor: [0, -41],
    className: 'cowegis-icon',
    extraIconClasses: '',
    extraDivClasses: '',
    bgColor: '#80c22a',
    color: '#fff',
    pinViewBox: '0 0 26 40',
    pinPath: 'M12.594 1.323C6.021 1.323.55 7.014.55 13.19c0 2.778 1.564 6.308 2.694 8.746l9.306 17.872 9.262-17.872c1.13-2.438 2.738-5.79 2.738-8.746 0-6.175-5.383-11.866-11.956-11.866z',
    size: 'medium'
  },
  createIcon: function createIcon(oldIcon) {
    var div = oldIcon && oldIcon.tagName === 'DIV' ? oldIcon : document.createElement('div'),
        options = this.options;
    div.className = options.className;

    if (options.extraDivClasses) {
      div.className += ' ' + options.extraDivClasses;
    }

    div.innerHTML = "<svg width=\"".concat(options.iconSize[0], "px\" \n            height=\"").concat(options.iconSize[1], "px\" \n            viewBox=\"").concat(options.pinViewBox, "\" \n            version=\"1.1\" \n            xmlns=\"http://www.w3.org/2000/svg\" \n            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            class=\"cowegis-marker-pin\">\n            <path d=\"").concat(options.pinPath, "\" fill=\"").concat(options.bgColor, "\"></path>\n        </svg>");

    this._createSymbol(div, options);

    this._setIconStyles(div, 'icon');

    return div;
  },
  _createSymbol: function _createSymbol(div, options) {
    if (options.html) {
      var content = document.createElement('span');
      content.classList.add('cowegis-marker-content');
      content.innerHTML = options.html;

      if (options.color) {
        content.style.color = options.color;
      }

      div.appendChild(content);
    }
  }
}));

/***/ }),

/***/ "./js/icon/svgIconFactory.js":
/*!***********************************!*\
  !*** ./js/icon/svgIconFactory.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SvgIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SvgIcon */ "./js/icon/SvgIcon.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (config, properties, element) {
  var options = leaflet__WEBPACK_IMPORTED_MODULE_1__["Util"].extend({}, config.options);

  if (properties['marker-color']) {
    options.bgColor = properties['marker-color'];
  }

  if (properties['symbol-color']) {
    options.color = properties['symbol-color'];
  }

  return new _SvgIcon__WEBPACK_IMPORTED_MODULE_0__["default"](options);
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9pY29uL1N2Z0ljb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvaWNvbi9zdmdJY29uRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJzaXplcyIsInNtYWxsIiwibWVkaXVtIiwibGFyZ2UiLCJEaXZJY29uIiwiZXh0ZW5kIiwib3B0aW9ucyIsImljb25TaXplIiwiaWNvbkFuY2hvciIsInBvcHVwQW5jaG9yIiwiY2xhc3NOYW1lIiwiZXh0cmFJY29uQ2xhc3NlcyIsImV4dHJhRGl2Q2xhc3NlcyIsImJnQ29sb3IiLCJjb2xvciIsInBpblZpZXdCb3giLCJwaW5QYXRoIiwic2l6ZSIsImNyZWF0ZUljb24iLCJvbGRJY29uIiwiZGl2IiwidGFnTmFtZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsIl9jcmVhdGVTeW1ib2wiLCJfc2V0SWNvblN0eWxlcyIsImh0bWwiLCJjb250ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImNvbmZpZyIsInByb3BlcnRpZXMiLCJlbGVtZW50IiwiVXRpbCIsIlN2Z0ljb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQU1BLEtBQUssR0FBRztBQUNWQyxPQUFLLEVBQUUsR0FERztBQUVWQyxRQUFNLEVBQUUsQ0FGRTtBQUdWQyxPQUFLLEVBQUU7QUFIRyxDQUFkO0FBTWVDLDhHQUFPLENBQUNDLE1BQVIsQ0FBZTtBQUMxQkMsU0FBTyxFQUFFO0FBQ0xDLFlBQVEsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBREw7QUFFTEMsY0FBVSxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FGUDtBQUdMQyxlQUFXLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBQyxFQUFMLENBSFI7QUFJTEMsYUFBUyxFQUFFLGNBSk47QUFLTEMsb0JBQWdCLEVBQUUsRUFMYjtBQU1MQyxtQkFBZSxFQUFFLEVBTlo7QUFPTEMsV0FBTyxFQUFFLFNBUEo7QUFRTEMsU0FBSyxFQUFFLE1BUkY7QUFTTEMsY0FBVSxFQUFFLFdBVFA7QUFVTEMsV0FBTyxFQUFFLDZLQVZKO0FBV0xDLFFBQUksRUFBRTtBQVhELEdBRGlCO0FBZTFCQyxZQUFVLEVBQUUsb0JBQVVDLE9BQVYsRUFBbUI7QUFDM0IsUUFBTUMsR0FBRyxHQUFJRCxPQUFPLElBQUlBLE9BQU8sQ0FBQ0UsT0FBUixLQUFvQixLQUFoQyxHQUF5Q0YsT0FBekMsR0FBbURHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUEvRDtBQUFBLFFBQ0lqQixPQUFPLEdBQUcsS0FBS0EsT0FEbkI7QUFHQWMsT0FBRyxDQUFDVixTQUFKLEdBQWdCSixPQUFPLENBQUNJLFNBQXhCOztBQUNBLFFBQUlKLE9BQU8sQ0FBQ00sZUFBWixFQUE2QjtBQUN6QlEsU0FBRyxDQUFDVixTQUFKLElBQWlCLE1BQU1KLE9BQU8sQ0FBQ00sZUFBL0I7QUFDSDs7QUFFRFEsT0FBRyxDQUFDSSxTQUFKLDBCQUErQmxCLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQixDQUFqQixDQUEvQix5Q0FDY0QsT0FBTyxDQUFDQyxRQUFSLENBQWlCLENBQWpCLENBRGQsMENBRWVELE9BQU8sQ0FBQ1MsVUFGdkIsOE5BT2VULE9BQU8sQ0FBQ1UsT0FQdkIsdUJBT3lDVixPQUFPLENBQUNPLE9BUGpEOztBQVVBLFNBQUtZLGFBQUwsQ0FBbUJMLEdBQW5CLEVBQXdCZCxPQUF4Qjs7QUFDQSxTQUFLb0IsY0FBTCxDQUFvQk4sR0FBcEIsRUFBeUIsTUFBekI7O0FBRUEsV0FBT0EsR0FBUDtBQUNILEdBdEN5QjtBQXdDMUJLLGVBeEMwQix5QkF3Q1pMLEdBeENZLEVBd0NQZCxPQXhDTyxFQXdDRTtBQUN4QixRQUFJQSxPQUFPLENBQUNxQixJQUFaLEVBQWtCO0FBQ2QsVUFBTUMsT0FBTyxHQUFHTixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBaEI7QUFDQUssYUFBTyxDQUFDQyxTQUFSLENBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7QUFDQUYsYUFBTyxDQUFDSixTQUFSLEdBQW9CbEIsT0FBTyxDQUFDcUIsSUFBNUI7O0FBRUEsVUFBSXJCLE9BQU8sQ0FBQ1EsS0FBWixFQUFtQjtBQUNmYyxlQUFPLENBQUNHLEtBQVIsQ0FBY2pCLEtBQWQsR0FBc0JSLE9BQU8sQ0FBQ1EsS0FBOUI7QUFDSDs7QUFFRE0sU0FBRyxDQUFDWSxXQUFKLENBQWdCSixPQUFoQjtBQUNIO0FBQ0o7QUFwRHlCLENBQWYsQ0FBZixFOzs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFZSx5RUFBU0ssTUFBVCxFQUFpQkMsVUFBakIsRUFBNkJDLE9BQTdCLEVBQXNDO0FBQ2pELE1BQU03QixPQUFPLEdBQUc4Qiw0Q0FBSSxDQUFDL0IsTUFBTCxDQUFZLEVBQVosRUFBZ0I0QixNQUFNLENBQUMzQixPQUF2QixDQUFoQjs7QUFFQSxNQUFJNEIsVUFBVSxDQUFDLGNBQUQsQ0FBZCxFQUFnQztBQUM1QjVCLFdBQU8sQ0FBQ08sT0FBUixHQUFrQnFCLFVBQVUsQ0FBQyxjQUFELENBQTVCO0FBQ0g7O0FBRUQsTUFBSUEsVUFBVSxDQUFDLGNBQUQsQ0FBZCxFQUFnQztBQUM1QjVCLFdBQU8sQ0FBQ1EsS0FBUixHQUFnQm9CLFVBQVUsQ0FBQyxjQUFELENBQTFCO0FBQ0g7O0FBRUQsU0FBTyxJQUFJRyxnREFBSixDQUFZL0IsT0FBWixDQUFQO0FBQ0gsQyIsImZpbGUiOiJqcy9pY29uLXN2Z0ljb25GYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXZJY29uLCBwb2ludCBhcyB0b1BvaW50fSBmcm9tICdsZWFmbGV0JztcblxuY29uc3Qgc2l6ZXMgPSB7XG4gICAgc21hbGw6IDAuNyxcbiAgICBtZWRpdW06IDEsXG4gICAgbGFyZ2U6IDEuNSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgRGl2SWNvbi5leHRlbmQoe1xuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgaWNvblNpemU6IFsyNiwgNDBdLFxuICAgICAgICBpY29uQW5jaG9yOiBbMTMsIDQwXSxcbiAgICAgICAgcG9wdXBBbmNob3I6IFswLCAtNDFdLFxuICAgICAgICBjbGFzc05hbWU6ICdjb3dlZ2lzLWljb24nLFxuICAgICAgICBleHRyYUljb25DbGFzc2VzOiAnJyxcbiAgICAgICAgZXh0cmFEaXZDbGFzc2VzOiAnJyxcbiAgICAgICAgYmdDb2xvcjogJyM4MGMyMmEnLFxuICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICBwaW5WaWV3Qm94OiAnMCAwIDI2IDQwJyxcbiAgICAgICAgcGluUGF0aDogJ00xMi41OTQgMS4zMjNDNi4wMjEgMS4zMjMuNTUgNy4wMTQuNTUgMTMuMTljMCAyLjc3OCAxLjU2NCA2LjMwOCAyLjY5NCA4Ljc0Nmw5LjMwNiAxNy44NzIgOS4yNjItMTcuODcyYzEuMTMtMi40MzggMi43MzgtNS43OSAyLjczOC04Ljc0NiAwLTYuMTc1LTUuMzgzLTExLjg2Ni0xMS45NTYtMTEuODY2eicsXG4gICAgICAgIHNpemU6ICdtZWRpdW0nXG4gICAgfSxcblxuICAgIGNyZWF0ZUljb246IGZ1bmN0aW9uIChvbGRJY29uKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IChvbGRJY29uICYmIG9sZEljb24udGFnTmFtZSA9PT0gJ0RJVicpID8gb2xkSWNvbiA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgICAgICBkaXYuY2xhc3NOYW1lID0gb3B0aW9ucy5jbGFzc05hbWU7XG4gICAgICAgIGlmIChvcHRpb25zLmV4dHJhRGl2Q2xhc3Nlcykge1xuICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSArPSAnICcgKyBvcHRpb25zLmV4dHJhRGl2Q2xhc3NlcztcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBgPHN2ZyB3aWR0aD1cIiR7b3B0aW9ucy5pY29uU2l6ZVswXX1weFwiIFxuICAgICAgICAgICAgaGVpZ2h0PVwiJHtvcHRpb25zLmljb25TaXplWzFdfXB4XCIgXG4gICAgICAgICAgICB2aWV3Qm94PVwiJHtvcHRpb25zLnBpblZpZXdCb3h9XCIgXG4gICAgICAgICAgICB2ZXJzaW9uPVwiMS4xXCIgXG4gICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgXG4gICAgICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgICAgICAgY2xhc3M9XCJjb3dlZ2lzLW1hcmtlci1waW5cIj5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCIke29wdGlvbnMucGluUGF0aH1cIiBmaWxsPVwiJHtvcHRpb25zLmJnQ29sb3J9XCI+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5gO1xuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVN5bWJvbChkaXYsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9zZXRJY29uU3R5bGVzKGRpdiwgJ2ljb24nKTtcblxuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU3ltYm9sKGRpdiwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5odG1sKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdjb3dlZ2lzLW1hcmtlci1jb250ZW50Jyk7XG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IG9wdGlvbnMuaHRtbDtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLmNvbG9yID0gb3B0aW9ucy5jb2xvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJpbXBvcnQgU3ZnSWNvbiBmcm9tIFwiLi9TdmdJY29uXCI7XG5pbXBvcnQge1V0aWx9IGZyb20gXCJsZWFmbGV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbmZpZywgcHJvcGVydGllcywgZWxlbWVudCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBVdGlsLmV4dGVuZCh7fSwgY29uZmlnLm9wdGlvbnMpO1xuXG4gICAgaWYgKHByb3BlcnRpZXNbJ21hcmtlci1jb2xvciddKSB7XG4gICAgICAgIG9wdGlvbnMuYmdDb2xvciA9IHByb3BlcnRpZXNbJ21hcmtlci1jb2xvciddO1xuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0aWVzWydzeW1ib2wtY29sb3InXSkge1xuICAgICAgICBvcHRpb25zLmNvbG9yID0gcHJvcGVydGllc1snc3ltYm9sLWNvbG9yJ107XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBTdmdJY29uKG9wdGlvbnMpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==