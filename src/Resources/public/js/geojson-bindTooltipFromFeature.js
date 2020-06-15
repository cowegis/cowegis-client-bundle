(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["geojson-bindTooltipFromFeature"],{

/***/ "./js/geojson/bindTooltipFromFeature.js":
/*!**********************************************!*\
  !*** ./js/geojson/bindTooltipFromFeature.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factory_bindEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory/bindEvents */ "./js/factory/bindEvents.js");

/* harmony default export */ __webpack_exports__["default"] = (function (object, feature, element) {
  if (!feature.properties || !feature.properties.tooltip) {
    return;
  }

  var options = feature.properties.tooltip.options || {};

  if (feature.properties.tooltip.presetId && element.config.map.presets.tooltips[feature.properties.tooltip.presetId]) {
    options = Object.assign(element.config.map.presets.tooltips[feature.properties.tooltip.presetId].options, options);
  }

  object.bindTooltip(feature.properties.tooltip.content, options);
  Object(_factory_bindEvents__WEBPACK_IMPORTED_MODULE_0__["default"])(object, feature.properties.tooltip.events, element);
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9nZW9qc29uL2JpbmRUb29sdGlwRnJvbUZlYXR1cmUuanMiXSwibmFtZXMiOlsib2JqZWN0IiwiZmVhdHVyZSIsImVsZW1lbnQiLCJwcm9wZXJ0aWVzIiwidG9vbHRpcCIsIm9wdGlvbnMiLCJwcmVzZXRJZCIsImNvbmZpZyIsIm1hcCIsInByZXNldHMiLCJ0b29sdGlwcyIsIk9iamVjdCIsImFzc2lnbiIsImJpbmRUb29sdGlwIiwiY29udGVudCIsImJpbmRFdmVudHMiLCJldmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFZSx5RUFBVUEsTUFBVixFQUFrQkMsT0FBbEIsRUFBMkJDLE9BQTNCLEVBQW9DO0FBQy9DLE1BQUksQ0FBQ0QsT0FBTyxDQUFDRSxVQUFULElBQXVCLENBQUNGLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsT0FBL0MsRUFBd0Q7QUFDcEQ7QUFDSDs7QUFFRCxNQUFJQyxPQUFPLEdBQUdKLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsT0FBbkIsQ0FBMkJDLE9BQTNCLElBQXNDLEVBQXBEOztBQUNBLE1BQUlKLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsT0FBbkIsQ0FBMkJFLFFBQTNCLElBQXVDSixPQUFPLENBQUNLLE1BQVIsQ0FBZUMsR0FBZixDQUFtQkMsT0FBbkIsQ0FBMkJDLFFBQTNCLENBQW9DVCxPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLE9BQW5CLENBQTJCRSxRQUEvRCxDQUEzQyxFQUFxSDtBQUNqSEQsV0FBTyxHQUFHTSxNQUFNLENBQUNDLE1BQVAsQ0FBY1YsT0FBTyxDQUFDSyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJDLE9BQW5CLENBQTJCQyxRQUEzQixDQUFvQ1QsT0FBTyxDQUFDRSxVQUFSLENBQW1CQyxPQUFuQixDQUEyQkUsUUFBL0QsRUFBeUVELE9BQXZGLEVBQWdHQSxPQUFoRyxDQUFWO0FBQ0g7O0FBRURMLFFBQU0sQ0FBQ2EsV0FBUCxDQUFtQlosT0FBTyxDQUFDRSxVQUFSLENBQW1CQyxPQUFuQixDQUEyQlUsT0FBOUMsRUFBdURULE9BQXZEO0FBQ0FVLHFFQUFVLENBQUNmLE1BQUQsRUFBU0MsT0FBTyxDQUFDRSxVQUFSLENBQW1CQyxPQUFuQixDQUEyQlksTUFBcEMsRUFBNENkLE9BQTVDLENBQVY7QUFDSCxDIiwiZmlsZSI6ImpzL2dlb2pzb24tYmluZFRvb2x0aXBGcm9tRmVhdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiaW5kRXZlbnRzIGZyb20gXCIuLi9mYWN0b3J5L2JpbmRFdmVudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9iamVjdCwgZmVhdHVyZSwgZWxlbWVudCkge1xuICAgIGlmICghZmVhdHVyZS5wcm9wZXJ0aWVzIHx8ICFmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSBmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5vcHRpb25zIHx8IHt9O1xuICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5wcmVzZXRJZCAmJiBlbGVtZW50LmNvbmZpZy5tYXAucHJlc2V0cy50b29sdGlwc1tmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5wcmVzZXRJZF0pIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZWxlbWVudC5jb25maWcubWFwLnByZXNldHMudG9vbHRpcHNbZmVhdHVyZS5wcm9wZXJ0aWVzLnRvb2x0aXAucHJlc2V0SWRdLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9iamVjdC5iaW5kVG9vbHRpcChmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5jb250ZW50LCBvcHRpb25zKVxuICAgIGJpbmRFdmVudHMob2JqZWN0LCBmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5ldmVudHMsIGVsZW1lbnQpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==