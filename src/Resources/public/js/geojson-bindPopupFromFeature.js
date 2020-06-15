(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["geojson-bindPopupFromFeature"],{

/***/ "./js/geojson/bindPopupFromFeature.js":
/*!********************************************!*\
  !*** ./js/geojson/bindPopupFromFeature.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factory_bindEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory/bindEvents */ "./js/factory/bindEvents.js");

/* harmony default export */ __webpack_exports__["default"] = (function (object, feature, element) {
  if (!feature.properties || !feature.properties.popup) {
    return;
  }

  var options = feature.properties.popup.options;

  if (feature.properties.popup.presetId && element.config.map.presets.popups[feature.properties.popup.presetId]) {
    options = Object.assign(element.config.map.presets.popups[feature.properties.popup.presetId].options, options);
  }

  object.bindPopup(feature.properties.popup.content, options);
  Object(_factory_bindEvents__WEBPACK_IMPORTED_MODULE_0__["default"])(object, feature.properties.popup.events, element);
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9nZW9qc29uL2JpbmRQb3B1cEZyb21GZWF0dXJlLmpzIl0sIm5hbWVzIjpbIm9iamVjdCIsImZlYXR1cmUiLCJlbGVtZW50IiwicHJvcGVydGllcyIsInBvcHVwIiwib3B0aW9ucyIsInByZXNldElkIiwiY29uZmlnIiwibWFwIiwicHJlc2V0cyIsInBvcHVwcyIsIk9iamVjdCIsImFzc2lnbiIsImJpbmRQb3B1cCIsImNvbnRlbnQiLCJiaW5kRXZlbnRzIiwiZXZlbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRWUseUVBQVVBLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCQyxPQUEzQixFQUFvQztBQUMvQyxNQUFJLENBQUNELE9BQU8sQ0FBQ0UsVUFBVCxJQUF1QixDQUFDRixPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQS9DLEVBQXNEO0FBQ2xEO0FBQ0g7O0FBRUQsTUFBSUMsT0FBTyxHQUFHSixPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQW5CLENBQXlCQyxPQUF2Qzs7QUFDQSxNQUFJSixPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQW5CLENBQXlCRSxRQUF6QixJQUFxQ0osT0FBTyxDQUFDSyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJDLE9BQW5CLENBQTJCQyxNQUEzQixDQUFrQ1QsT0FBTyxDQUFDRSxVQUFSLENBQW1CQyxLQUFuQixDQUF5QkUsUUFBM0QsQ0FBekMsRUFBK0c7QUFDM0dELFdBQU8sR0FBR00sTUFBTSxDQUFDQyxNQUFQLENBQWNWLE9BQU8sQ0FBQ0ssTUFBUixDQUFlQyxHQUFmLENBQW1CQyxPQUFuQixDQUEyQkMsTUFBM0IsQ0FBa0NULE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUJFLFFBQTNELEVBQXFFRCxPQUFuRixFQUE0RkEsT0FBNUYsQ0FBVjtBQUNIOztBQUVETCxRQUFNLENBQUNhLFNBQVAsQ0FBaUJaLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUJVLE9BQTFDLEVBQW1EVCxPQUFuRDtBQUNBVSxxRUFBVSxDQUFDZixNQUFELEVBQVNDLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUJZLE1BQWxDLEVBQTBDZCxPQUExQyxDQUFWO0FBQ0gsQyIsImZpbGUiOiJqcy9nZW9qc29uLWJpbmRQb3B1cEZyb21GZWF0dXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJpbmRFdmVudHMgZnJvbSBcIi4uL2ZhY3RvcnkvYmluZEV2ZW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob2JqZWN0LCBmZWF0dXJlLCBlbGVtZW50KSB7XG4gICAgaWYgKCFmZWF0dXJlLnByb3BlcnRpZXMgfHwgIWZlYXR1cmUucHJvcGVydGllcy5wb3B1cCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSBmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAub3B0aW9ucztcbiAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLnByZXNldElkICYmIGVsZW1lbnQuY29uZmlnLm1hcC5wcmVzZXRzLnBvcHVwc1tmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAucHJlc2V0SWRdKSB7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGVsZW1lbnQuY29uZmlnLm1hcC5wcmVzZXRzLnBvcHVwc1tmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAucHJlc2V0SWRdLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9iamVjdC5iaW5kUG9wdXAoZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLmNvbnRlbnQsIG9wdGlvbnMpO1xuICAgIGJpbmRFdmVudHMob2JqZWN0LCBmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAuZXZlbnRzLCBlbGVtZW50KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=