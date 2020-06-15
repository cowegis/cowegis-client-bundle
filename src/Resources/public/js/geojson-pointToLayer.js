(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["geojson-pointToLayer"],{

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

/***/ }),

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

/***/ }),

/***/ "./js/geojson/pointToLayer.js":
/*!************************************!*\
  !*** ./js/geojson/pointToLayer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factory_bindEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory/bindEvents */ "./js/factory/bindEvents.js");
/* harmony import */ var _bindPopupFromFeature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bindPopupFromFeature */ "./js/geojson/bindPopupFromFeature.js");
/* harmony import */ var _bindTooltipFromFeature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bindTooltipFromFeature */ "./js/geojson/bindTooltipFromFeature.js");



/* harmony default export */ __webpack_exports__["default"] = (function (feature, latlng, element) {
  var type = 'marker';
  var marker = null;
  var options = {};

  if (feature.properties) {
    feature.properties.bounds = true;
    options = feature.properties.options || {};

    if (options.pane && element.panes[options.pane]) {
      options.pane = element.panes[options.pane].name;
    } else {
      delete options.pane;
    }

    if (feature.properties.type) {
      type = feature.properties.type;
    }
  } // TODO: Support different marker types as circle marker etc.


  marker = L[type](latlng, options);

  if (feature.properties) {
    Object(_factory_bindEvents__WEBPACK_IMPORTED_MODULE_0__["default"])(marker, feature.properties.events, element);

    if (feature.properties.radius) {
      marker.setRadius(feature.properties.radius);
    }

    Object(_bindPopupFromFeature__WEBPACK_IMPORTED_MODULE_1__["default"])(marker, feature, element);
    Object(_bindTooltipFromFeature__WEBPACK_IMPORTED_MODULE_2__["default"])(marker, feature, element);
  } //this.fire('point:added', {marker: marker, feature: feature, latlng: latlng, type: type});


  return marker;
});
;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9nZW9qc29uL2JpbmRQb3B1cEZyb21GZWF0dXJlLmpzIiwid2VicGFjazovLy8uL2pzL2dlb2pzb24vYmluZFRvb2x0aXBGcm9tRmVhdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nZW9qc29uL3BvaW50VG9MYXllci5qcyJdLCJuYW1lcyI6WyJvYmplY3QiLCJmZWF0dXJlIiwiZWxlbWVudCIsInByb3BlcnRpZXMiLCJwb3B1cCIsIm9wdGlvbnMiLCJwcmVzZXRJZCIsImNvbmZpZyIsIm1hcCIsInByZXNldHMiLCJwb3B1cHMiLCJPYmplY3QiLCJhc3NpZ24iLCJiaW5kUG9wdXAiLCJjb250ZW50IiwiYmluZEV2ZW50cyIsImV2ZW50cyIsInRvb2x0aXAiLCJ0b29sdGlwcyIsImJpbmRUb29sdGlwIiwibGF0bG5nIiwidHlwZSIsIm1hcmtlciIsImJvdW5kcyIsInBhbmUiLCJwYW5lcyIsIm5hbWUiLCJMIiwicmFkaXVzIiwic2V0UmFkaXVzIiwiYmluZFBvcHVwRnJvbUZlYXR1cmUiLCJiaW5kVG9vbHRpcEZyb21GZWF0dXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRWUseUVBQVVBLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCQyxPQUEzQixFQUFvQztBQUMvQyxNQUFJLENBQUNELE9BQU8sQ0FBQ0UsVUFBVCxJQUF1QixDQUFDRixPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQS9DLEVBQXNEO0FBQ2xEO0FBQ0g7O0FBRUQsTUFBSUMsT0FBTyxHQUFHSixPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQW5CLENBQXlCQyxPQUF2Qzs7QUFDQSxNQUFJSixPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQW5CLENBQXlCRSxRQUF6QixJQUFxQ0osT0FBTyxDQUFDSyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJDLE9BQW5CLENBQTJCQyxNQUEzQixDQUFrQ1QsT0FBTyxDQUFDRSxVQUFSLENBQW1CQyxLQUFu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QW1Ca0IsSUFBMUI7QUFDSDtBQUNKLEdBbEI4QyxDQW9CL0M7OztBQUNBQyxRQUFNLEdBQUdLLENBQUMsQ0FBQ04sSUFBRCxDQUFELENBQVFELE1BQVIsRUFBZ0JmLE9BQWhCLENBQVQ7O0FBRUEsTUFBSUosT0FBTyxDQUFDRSxVQUFaLEVBQXdCO0FBQ3BCWSx1RUFBVSxDQUFDTyxNQUFELEVBQVNyQixPQUFPLENBQUNFLFVBQVIsQ0FBbUJhLE1BQTVCLEVBQW9DZCxPQUFwQyxDQUFWOztBQUVBLFFBQUlELE9BQU8sQ0FBQ0UsVUFBUixDQUFtQnlCLE1BQXZCLEVBQStCO0FBQzNCTixZQUFNLENBQUNPLFNBQVAsQ0FBaUI1QixPQUFPLENBQUNFLFVBQVIsQ0FBbUJ5QixNQUFwQztBQUNIOztBQUVERSx5RUFBb0IsQ0FBQ1IsTUFBRCxFQUFTckIsT0FBVCxFQUFrQkMsT0FBbEIsQ0FBcEI7QUFDQTZCLDJFQUFzQixDQUFDVCxNQUFELEVBQVNyQixPQUFULEVBQWtCQyxPQUFsQixDQUF0QjtBQUNILEdBaEM4QyxDQWtDL0M7OztBQUVBLFNBQU9vQixNQUFQO0FBQ0g7QUFBQSxDIiwiZmlsZSI6ImpzL2dlb2pzb24tcG9pbnRUb0xheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJpbmRFdmVudHMgZnJvbSBcIi4uL2ZhY3RvcnkvYmluZEV2ZW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob2JqZWN0LCBmZWF0dXJlLCBlbGVtZW50KSB7XG4gICAgaWYgKCFmZWF0dXJlLnByb3BlcnRpZXMgfHwgIWZlYXR1cmUucHJvcGVydGllcy5wb3B1cCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSBmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAub3B0aW9ucztcbiAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLnByZXNldElkICYmIGVsZW1lbnQuY29uZmlnLm1hcC5wcmVzZXRzLnBvcHVwc1tmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAucHJlc2V0SWRdKSB7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGVsZW1lbnQuY29uZmlnLm1hcC5wcmVzZXRzLnBvcHVwc1tmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAucHJlc2V0SWRdLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9iamVjdC5iaW5kUG9wdXAoZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLmNvbnRlbnQsIG9wdGlvbnMpO1xuICAgIGJpbmRFdmVudHMob2JqZWN0LCBmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAuZXZlbnRzLCBlbGVtZW50KTtcbn1cbiIsImltcG9ydCBiaW5kRXZlbnRzIGZyb20gXCIuLi9mYWN0b3J5L2JpbmRFdmVudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9iamVjdCwgZmVhdHVyZSwgZWxlbWVudCkge1xuICAgIGlmICghZmVhdHVyZS5wcm9wZXJ0aWVzIHx8ICFmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSBmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5vcHRpb25zIHx8IHt9O1xuICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5wcmVzZXRJZCAmJiBlbGVtZW50LmNvbmZpZy5tYXAucHJlc2V0cy50b29sdGlwc1tmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5wcmVzZXRJZF0pIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZWxlbWVudC5jb25maWcubWFwLnByZXNldHMudG9vbHRpcHNbZmVhdHVyZS5wcm9wZXJ0aWVzLnRvb2x0aXAucHJlc2V0SWRdLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9iamVjdC5iaW5kVG9vbHRpcChmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5jb250ZW50LCBvcHRpb25zKVxuICAgIGJpbmRFdmVudHMob2JqZWN0LCBmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5ldmVudHMsIGVsZW1lbnQpO1xufVxuIiwiaW1wb3J0IGJpbmRFdmVudHMgZnJvbSBcIi4uL2ZhY3RvcnkvYmluZEV2ZW50c1wiO1xuaW1wb3J0IGJpbmRQb3B1cEZyb21GZWF0dXJlIGZyb20gXCIuL2JpbmRQb3B1cEZyb21GZWF0dXJlXCI7XG5pbXBvcnQgYmluZFRvb2x0aXBGcm9tRmVhdHVyZSBmcm9tIFwiLi9iaW5kVG9vbHRpcEZyb21GZWF0dXJlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXRsbmcsIGVsZW1lbnQpIHtcbiAgICBsZXQgdHlwZSAgID0gJ21hcmtlcic7XG4gICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgbGV0IG9wdGlvbnMgPSB7fTtcblxuICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMpIHtcbiAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLmJvdW5kcyA9IHRydWU7XG4gICAgICAgIG9wdGlvbnMgPSBmZWF0dXJlLnByb3BlcnRpZXMub3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBpZiAob3B0aW9ucy5wYW5lICYmIGVsZW1lbnQucGFuZXNbb3B0aW9ucy5wYW5lXSkge1xuICAgICAgICAgICAgb3B0aW9ucy5wYW5lID0gZWxlbWVudC5wYW5lc1tvcHRpb25zLnBhbmVdLm5hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5wYW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZlYXR1cmUucHJvcGVydGllcy50eXBlKSB7XG4gICAgICAgICAgICB0eXBlID0gZmVhdHVyZS5wcm9wZXJ0aWVzLnR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTdXBwb3J0IGRpZmZlcmVudCBtYXJrZXIgdHlwZXMgYXMgY2lyY2xlIG1hcmtlciBldGMuXG4gICAgbWFya2VyID0gTFt0eXBlXShsYXRsbmcsIG9wdGlvbnMpO1xuXG4gICAgaWYgKGZlYXR1cmUucHJvcGVydGllcykge1xuICAgICAgICBiaW5kRXZlbnRzKG1hcmtlciwgZmVhdHVyZS5wcm9wZXJ0aWVzLmV2ZW50cywgZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGZlYXR1cmUucHJvcGVydGllcy5yYWRpdXMpIHtcbiAgICAgICAgICAgIG1hcmtlci5zZXRSYWRpdXMoZmVhdHVyZS5wcm9wZXJ0aWVzLnJhZGl1cyk7XG4gICAgICAgIH1cblxuICAgICAgICBiaW5kUG9wdXBGcm9tRmVhdHVyZShtYXJrZXIsIGZlYXR1cmUsIGVsZW1lbnQpO1xuICAgICAgICBiaW5kVG9vbHRpcEZyb21GZWF0dXJlKG1hcmtlciwgZmVhdHVyZSwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy90aGlzLmZpcmUoJ3BvaW50OmFkZGVkJywge21hcmtlcjogbWFya2VyLCBmZWF0dXJlOiBmZWF0dXJlLCBsYXRsbmc6IGxhdGxuZywgdHlwZTogdHlwZX0pO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9