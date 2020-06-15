(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["icon-SvgIcon"],{

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9pY29uL1N2Z0ljb24uanMiXSwibmFtZXMiOlsic2l6ZXMiLCJzbWFsbCIsIm1lZGl1bSIsImxhcmdlIiwiRGl2SWNvbiIsImV4dGVuZCIsIm9wdGlvbnMiLCJpY29uU2l6ZSIsImljb25BbmNob3IiLCJwb3B1cEFuY2hvciIsImNsYXNzTmFtZSIsImV4dHJhSWNvbkNsYXNzZXMiLCJleHRyYURpdkNsYXNzZXMiLCJiZ0NvbG9yIiwiY29sb3IiLCJwaW5WaWV3Qm94IiwicGluUGF0aCIsInNpemUiLCJjcmVhdGVJY29uIiwib2xkSWNvbiIsImRpdiIsInRhZ05hbWUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJfY3JlYXRlU3ltYm9sIiwiX3NldEljb25TdHlsZXMiLCJodG1sIiwiY29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQU1BLEtBQUssR0FBRztBQUNWQyxPQUFLLEVBQUUsR0FERztBQUVWQyxRQUFNLEVBQUUsQ0FGRTtBQUdWQyxPQUFLLEVBQUU7QUFIRyxDQUFkO0FBTWVDLDhHQUFPLENBQUNDLE1BQVIsQ0FBZTtBQUMxQkMsU0FBTyxFQUFFO0FBQ0xDLFlBQVEsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBREw7QUFFTEMsY0FBVSxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FGUDtBQUdMQyxlQUFXLEVBQUUsQ0FBQyxDQUFELEVBQUksQ0FBQyxFQUFMLENBSFI7QUFJTEMsYUFBUyxFQUFFLGNBSk47QUFLTEMsb0JBQWdCLEVBQUUsRUFMYjtBQU1MQyxtQkFBZSxFQUFFLEVBTlo7QUFPTEMsV0FBTyxFQUFFLFNBUEo7QUFRTEMsU0FBSyxFQUFFLE1BUkY7QUFTTEMsY0FBVSxFQUFFLFdBVFA7QUFVTEMsV0FBTyxFQUFFLDZLQVZKO0FBV0xDLFFBQUksRUFBRTtBQVhELEdBRGlCO0FBZTFCQyxZQUFVLEVBQUUsb0JBQVVDLE9BQVYsRUFBbUI7QUFDM0IsUUFBTUMsR0FBRyxHQUFJRCxPQUFPLElBQUlBLE9BQU8sQ0FBQ0UsT0FBUixLQUFvQixLQUFoQyxHQUF5Q0YsT0FBekMsR0FBbURHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUEvRDtBQUFBLFFBQ0lqQixPQUFPLEdBQUcsS0FBS0EsT0FEbkI7QUFHQWMsT0FBRyxDQUFDVixTQUFKLEdBQWdCSixPQUFPLENBQUNJLFNBQXhCOztBQUNBLFFBQUlKLE9BQU8sQ0FBQ00sZUFBWixFQUE2QjtBQUN6QlEsU0FBRyxDQUFDVixTQUFKLElBQWlCLE1BQU1KLE9BQU8sQ0FBQ00sZUFBL0I7QUFDSDs7QUFFRFEsT0FBRyxDQUFDSSxTQUFKLDBCQUErQmxCLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQixDQUFqQixDQUEvQix5Q0FDY0QsT0FBTyxDQUFDQyxRQUFSLENBQWlCLENBQWpCLENBRGQsMENBRWVELE9BQU8sQ0FBQ1MsVUFGdkIsOE5BT2VULE9BQU8sQ0FBQ1UsT0FQdkIsdUJBT3lDVixPQUFPLENBQUNPLE9BUGpEOztBQVVBLFNBQUtZLGFBQUwsQ0FBbUJMLEdBQW5CLEVBQXdCZCxPQUF4Qjs7QUFDQSxTQUFLb0IsY0FBTCxDQUFvQk4sR0FBcEIsRUFBeUIsTUFBekI7O0FBRUEsV0FBT0EsR0FBUDtBQUNILEdBdEN5QjtBQXdDMUJLLGVBeEMwQix5QkF3Q1pMLEdBeENZLEVBd0NQZCxPQXhDTyxFQXdDRTtBQUN4QixRQUFJQSxPQUFPLENBQUNxQixJQUFaLEVBQWtCO0FBQ2QsVUFBTUMsT0FBTyxHQUFHTixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBaEI7QUFDQUssYUFBTyxDQUFDQyxTQUFSLENBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7QUFDQUYsYUFBTyxDQUFDSixTQUFSLEdBQW9CbEIsT0FBTyxDQUFDcUIsSUFBNUI7O0FBRUEsVUFBSXJCLE9BQU8sQ0FBQ1EsS0FBWixFQUFtQjtBQUNmYyxlQUFPLENBQUNHLEtBQVIsQ0FBY2pCLEtBQWQsR0FBc0JSLE9BQU8sQ0FBQ1EsS0FBOUI7QUFDSDs7QUFFRE0sU0FBRyxDQUFDWSxXQUFKLENBQWdCSixPQUFoQjtBQUNIO0FBQ0o7QUFwRHlCLENBQWYsQ0FBZixFIiwiZmlsZSI6ImpzL2ljb24tU3ZnSWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGl2SWNvbiwgcG9pbnQgYXMgdG9Qb2ludH0gZnJvbSAnbGVhZmxldCc7XG5cbmNvbnN0IHNpemVzID0ge1xuICAgIHNtYWxsOiAwLjcsXG4gICAgbWVkaXVtOiAxLFxuICAgIGxhcmdlOiAxLjUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IERpdkljb24uZXh0ZW5kKHtcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIGljb25TaXplOiBbMjYsIDQwXSxcbiAgICAgICAgaWNvbkFuY2hvcjogWzEzLCA0MF0sXG4gICAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTQxXSxcbiAgICAgICAgY2xhc3NOYW1lOiAnY293ZWdpcy1pY29uJyxcbiAgICAgICAgZXh0cmFJY29uQ2xhc3NlczogJycsXG4gICAgICAgIGV4dHJhRGl2Q2xhc3NlczogJycsXG4gICAgICAgIGJnQ29sb3I6ICcjODBjMjJhJyxcbiAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgcGluVmlld0JveDogJzAgMCAyNiA0MCcsXG4gICAgICAgIHBpblBhdGg6ICdNMTIuNTk0IDEuMzIzQzYuMDIxIDEuMzIzLjU1IDcuMDE0LjU1IDEzLjE5YzAgMi43NzggMS41NjQgNi4zMDggMi42OTQgOC43NDZsOS4zMDYgMTcuODcyIDkuMjYyLTE3Ljg3MmMxLjEzLTIuNDM4IDIuNzM4LTUuNzkgMi43MzgtOC43NDYgMC02LjE3NS01LjM4My0xMS44NjYtMTEuOTU2LTExLjg2NnonLFxuICAgICAgICBzaXplOiAnbWVkaXVtJ1xuICAgIH0sXG5cbiAgICBjcmVhdGVJY29uOiBmdW5jdGlvbiAob2xkSWNvbikge1xuICAgICAgICBjb25zdCBkaXYgPSAob2xkSWNvbiAmJiBvbGRJY29uLnRhZ05hbWUgPT09ICdESVYnKSA/IG9sZEljb24gOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgICAgZGl2LmNsYXNzTmFtZSA9IG9wdGlvbnMuY2xhc3NOYW1lO1xuICAgICAgICBpZiAob3B0aW9ucy5leHRyYURpdkNsYXNzZXMpIHtcbiAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgKz0gJyAnICsgb3B0aW9ucy5leHRyYURpdkNsYXNzZXM7XG4gICAgICAgIH1cblxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gYDxzdmcgd2lkdGg9XCIke29wdGlvbnMuaWNvblNpemVbMF19cHhcIiBcbiAgICAgICAgICAgIGhlaWdodD1cIiR7b3B0aW9ucy5pY29uU2l6ZVsxXX1weFwiIFxuICAgICAgICAgICAgdmlld0JveD1cIiR7b3B0aW9ucy5waW5WaWV3Qm94fVwiIFxuICAgICAgICAgICAgdmVyc2lvbj1cIjEuMVwiIFxuICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIFxuICAgICAgICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY293ZWdpcy1tYXJrZXItcGluXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiJHtvcHRpb25zLnBpblBhdGh9XCIgZmlsbD1cIiR7b3B0aW9ucy5iZ0NvbG9yfVwiPjwvcGF0aD5cbiAgICAgICAgPC9zdmc+YDtcblxuICAgICAgICB0aGlzLl9jcmVhdGVTeW1ib2woZGl2LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fc2V0SWNvblN0eWxlcyhkaXYsICdpY29uJyk7XG5cbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVN5bWJvbChkaXYsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaHRtbCkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY293ZWdpcy1tYXJrZXItY29udGVudCcpO1xuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBvcHRpb25zLmh0bWw7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgY29udGVudC5zdHlsZS5jb2xvciA9IG9wdGlvbnMuY29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==