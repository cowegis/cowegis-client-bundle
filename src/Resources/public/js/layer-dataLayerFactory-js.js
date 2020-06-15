(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layer-dataLayerFactory-js"],{

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

/***/ "./js/geojson/index.js":
/*!*****************************!*\
  !*** ./js/geojson/index.js ***!
  \*****************************/
/*! exports provided: from, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony import */ var topojson_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! topojson-client */ "./node_modules/topojson-client/src/index.js");
/* harmony import */ var _mapbox_togeojson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mapbox/togeojson */ "./node_modules/@mapbox/togeojson/togeojson.js");
/* harmony import */ var _mapbox_togeojson__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mapbox_togeojson__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var wellknown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wellknown */ "./node_modules/wellknown/index.js");
/* harmony import */ var wellknown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(wellknown__WEBPACK_IMPORTED_MODULE_2__);




function parseXml(str) {
  return new DOMParser().parseFromString(str, 'text/xml');
}

function parseGpx(str) {
  return _mapbox_togeojson__WEBPACK_IMPORTED_MODULE_1___default.a.gpx(parseXml(str));
}

function parseKml(str) {
  return _mapbox_togeojson__WEBPACK_IMPORTED_MODULE_1___default.a.kml(parseXml(str));
}

function parseWkt(str) {
  return wellknown__WEBPACK_IMPORTED_MODULE_2___default()(str);
}

function parseTopoJson(str) {
  var json = typeof str === 'string' ? JSON.parse(str) : str;
  var geojson = {
    type: 'FeatureCollection',
    features: []
  };

  for (var i in json.objects) {
    var feature = Object(topojson_client__WEBPACK_IMPORTED_MODULE_0__["feature"])(json, json.objects[i]);
    geojson.features.push(feature);
  }

  return geojson;
}

function from(format, string) {
  switch (format) {
    case 'geojson':
      return typeof string === 'string' ? JSON.parse(string) : string;

    case 'gpx':
      return parseGpx(string);

    case 'kml':
      return parseKml(string);

    case 'wkt':
      return parseWkt(string);

    case 'topojson':
      return parseTopoJson(string);

    default:
      throw new Error("Format \"".concat(format, "\" not supported"));
  }
}
/* harmony default export */ __webpack_exports__["default"] = ({
  from: from,
  fromGpx: parseGpx,
  fromKml: parseKml,
  fromWkt: parseWkt,
  fromTopoJson: parseTopoJson
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

/***/ }),

/***/ "./js/layer/dataLayerFactory.js":
/*!**************************************!*\
  !*** ./js/layer/dataLayerFactory.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../leaflet */ "./js/leaflet/index.js");
/* harmony import */ var _geojson_pointToLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../geojson/pointToLayer */ "./js/geojson/pointToLayer.js");
/* harmony import */ var _factory_bindEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../factory/bindEvents */ "./js/factory/bindEvents.js");
/* harmony import */ var _factory_preloadAssets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../factory/preloadAssets */ "./js/factory/preloadAssets.js");
/* harmony import */ var _geojson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../geojson */ "./js/geojson/index.js");
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../factory */ "./js/factory/index.js");








/* harmony default export */ __webpack_exports__["default"] = (function (_x, _x2) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config, element) {
    var data, response, json, blob, content, index, feature, pointToLayerCallback, layer, listener;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = config.data.type;
            _context.next = _context.t0 === 'inline' ? 3 : _context.t0 === 'uri' ? 5 : _context.t0 === 'external' ? 15 : 26;
            break;

          case 3:
            data = config.data.data;
            return _context.abrupt("break", 27);

          case 5:
            _context.next = 7;
            return fetch(config.data.uri);

          case 7:
            response = _context.sent;
            _context.next = 10;
            return response.json();

          case 10:
            json = _context.sent;
            _context.next = 13;
            return Object(_factory_preloadAssets__WEBPACK_IMPORTED_MODULE_5__["default"])(json.assets, element);

          case 13:
            data = json.data;
            return _context.abrupt("break", 27);

          case 15:
            _context.next = 17;
            return fetch(config.data.uri);

          case 17:
            response = _context.sent;
            _context.next = 20;
            return response.blob();

          case 20:
            blob = _context.sent;
            _context.next = 23;
            return blob.text();

          case 23:
            content = _context.sent;
            data = content;
            return _context.abrupt("break", 27);

          case 26:
            throw new Error("Unknown data type \"".concat(config.data.type, "\""));

          case 27:
            data = _geojson__WEBPACK_IMPORTED_MODULE_6__["default"].from(config.data.format, data); // TODO: Implement a better way for preprocessing geojson data

            if (!data.features) {
              _context.next = 42;
              break;
            }

            _context.t1 = _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.keys(data.features);

          case 30:
            if ((_context.t2 = _context.t1()).done) {
              _context.next = 42;
              break;
            }

            index = _context.t2.value;
            feature = data.features[index];

            if (!(!feature.properties || !feature.properties.icon)) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("continue", 30);

          case 35:
            if (!(element.config.map.presets.icons[feature.properties.icon] === undefined)) {
              _context.next = 37;
              break;
            }

            return _context.abrupt("continue", 30);

          case 37:
            _context.next = 39;
            return _factory__WEBPACK_IMPORTED_MODULE_7__["mapFactory"].createIcon(element.config.map.presets.icons[feature.properties.icon], feature.properties, element);

          case 39:
            feature.properties.options.icon = _context.sent;
            _context.next = 30;
            break;

          case 42:
            pointToLayerCallback = config.options.pointToLayer ? Object(_factory_bindEvents__WEBPACK_IMPORTED_MODULE_4__["determineListener"])(config.options.pointToLayer, element) : _geojson_pointToLayer__WEBPACK_IMPORTED_MODULE_3__["default"];

            config.options.pointToLayer = function (feature, latlng) {
              return pointToLayerCallback(feature, latlng, element, _geojson_pointToLayer__WEBPACK_IMPORTED_MODULE_3__["default"]);
            };

            layer = _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].geoJSON(data, config.options);

            listener = function listener(event) {
              console.log(event);
            };

            element.map.on('cowegis:calculate-bounds', listener);
            layer.off('remove', function () {
              element.map.offset('cowegis:calculate-bounds', listener);
            });
            return _context.abrupt("return", layer);

          case 49:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

/***/ }),

/***/ "./js/layer/dataLayerFactory.js~":
/*!***************************************!*\
  !*** ./js/layer/dataLayerFactory.js~ ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../leaflet */ "./js/leaflet/index.js");
/* harmony import */ var _geojson_pointToLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geojson/pointToLayer */ "./js/geojson/pointToLayer.js");
/* harmony import */ var _factory_bindEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factory/bindEvents */ "./js/factory/bindEvents.js");
/* harmony import */ var _factory_preloadAssets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../factory/preloadAssets */ "./js/factory/preloadAssets.js");
/* harmony import */ var _geojson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../geojson */ "./js/geojson/index.js");
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../factory */ "./js/factory/index.js");







/* harmony default export */ __webpack_exports__["default"] = (async function (config, element) {
    let data, response;

    switch (config.data.type) {
        case 'inline':
            data = config.data.data;
            break;

        case 'uri':
            response = await fetch(config.data.uri);
            const json = await response.json();
            await Object(_factory_preloadAssets__WEBPACK_IMPORTED_MODULE_3__["default"])(json.assets, element);
            data = json.data;
            break;

        case 'external':
            response = await fetch(config.data.uri);
            const blob = await response.blob();
            const content = await blob.text();
            data = content;

            break;

        default:
            throw new Error(`Unknown data type "${config.data.type}"`);
    }

    data = _geojson__WEBPACK_IMPORTED_MODULE_4__["default"].from(config.data.format, data);

    // TODO: Implement a better way for preprocessing geojson data
    if (data.features) {
        for (const index in data.features) {
            const feature = data.features[index];
            if (!feature.properties || !feature.properties.icon) {
                continue;
            }

            if (element.config.map.presets.icons[feature.properties.icon] === undefined) {
                continue;
            }

            feature.properties.options.icon = await _factory__WEBPACK_IMPORTED_MODULE_5__["mapFactory"].createIcon(
                element.config.map.presets.icons[feature.properties.icon],
                feature.properties,
                element
            );
        }
    }

    const pointToLayerCallback = config.options.pointToLayer
        ? Object(_factory_bindEvents__WEBPACK_IMPORTED_MODULE_2__["determineListener"])(config.options.pointToLayer, element)
        : _geojson_pointToLayer__WEBPACK_IMPORTED_MODULE_1__["default"];

    config.options.pointToLayer = (feature, latlng) => pointToLayerCallback(feature, latlng, element, _geojson_pointToLayer__WEBPACK_IMPORTED_MODULE_1__["default"]);

    const layer = _leaflet__WEBPACK_IMPORTED_MODULE_0__["default"].geoJSON(data, config.options);
    const listener = function (event) {
        console.log(event);
    };

    element.map.on('cowegis:calculate-bounds', listener);
    layer.onRemove('remove', function () {
        element.map.offset('cowegis:calculate-bounds', listener);
    });

    return layer;
});


/***/ }),

/***/ 11:
/*!************************!*\
  !*** xmldom (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9nZW9qc29uL2JpbmRQb3B1cEZyb21GZWF0dXJlLmpzIiwid2VicGFjazovLy8uL2pzL2dlb2pzb24vYmluZFRvb2x0aXBGcm9tRmVhdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nZW9qc29uL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL2dlb2pzb24vcG9pbnRUb0xheWVyLmpzIiwid2VicGFjazovLy8uL2pzL2xheWVyL2RhdGFMYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbGF5ZXIvZGF0YUxheWVyRmFjdG9yeS5qc34iLCJ3ZWJwYWNrOi8vL3htbGRvbSAoaWdub3JlZCkiXSwibmFtZXMiOlsib2JqZWN0IiwiZmVhdHVyZSIsImVsZW1lbnQiLCJwcm9wZXJ0aWVzIiwicG9wdXAiLCJvcHRpb25zIiwicHJlc2V0SWQiLCJjb25maWciLCJtYXAiLCJwcmVzZXRzIiwicG9wdXBzIiwiT2JqZWN0IiwiYXNzaWduIiwiYmluZFBvcHVwIiwiY29udGVudCIsImJpbmRFdmVudHMiLCJldmVudHMiLCJ0b29sdGlwIiwidG9vbHRpcHMiLCJiaW5kVG9vbHRpcCIsInBhcnNlWG1sIiwic3RyIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwicGFyc2VHcHgiLCJ0b0dlb0pTT04iLCJncHgiLCJwYXJzZUttbCIsImttbCIsInBhcnNlV2t0Iiwid2VsbGtub3duIiwicGFyc2VUb3BvSnNvbiIsImpzb24iLCJKU09OIiwicGFyc2UiLCJnZW9qc29uIiwidHlwZSIsImZlYXR1cmVzIiwiaSIsIm9iamVjdHMiLCJwYXJzZVRvcG9Kc29uRmVhdHVyZSIsInB1c2giLCJmcm9tIiwiZm9ybWF0Iiwic3RyaW5nIiwiRXJyb3IiLCJmcm9tR3B4IiwiZnJvbUttbCIsImZyb21Xa3QiLCJmcm9tVG9wb0pzb24iLCJsYXRsbmciLCJtYXJrZXIiLCJib3VuZHMiLCJwYW5lIiwicGFuZXMiLCJuYW1lIiwiTCIsInJhZGl1cyIsInNldFJhZGl1cyIsImJpbmRQb3B1cEZyb21GZWF0dXJlIiwiYmluZFRvb2x0aXBGcm9tRmVhdHVyZSIsImRhdGEiLCJmZXRjaCIsInVyaSIsInJlc3BvbnNlIiwicHJlbG9hZEFzc2V0cyIsImFzc2V0cyIsImJsb2IiLCJ0ZXh0IiwiR2VvSlNPTiIsImluZGV4IiwiaWNvbiIsImljb25zIiwidW5kZWZpbmVkIiwibWFwRmFjdG9yeSIsImNyZWF0ZUljb24iLCJwb2ludFRvTGF5ZXJDYWxsYmFjayIsInBvaW50VG9MYXllciIsImRldGVybWluZUxpc3RlbmVyIiwibGF5ZXIiLCJsZWFmbGV0IiwiZ2VvSlNPTiIsImxpc3RlbmVyIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwib24iLCJvZmYiLCJvZmZzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFZSx5RUFBVUEsTUFBVixFQUFrQkMsT0FBbEIsRUFBMkJDLE9BQTNCLEVBQW9DO0FBQy9DLE1BQUksQ0FBQ0QsT0FBTyxDQUFDRSxVQUFULElBQXVCLENBQUNGLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsS0FBL0MsRUFBc0Q7QUFDbEQ7QUFDSDs7QUFFRCxNQUFJQyxPQUFPLEdBQUdKLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUJDLE9BQXZDOztBQUNBLE1BQUlKLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUJFLFFBQXpCLElBQXFDSixPQUFPLENBQUNLLE1BQVIsQ0FBZUMsR0FBZixDQUFtQkMsT0FBbkIsQ0FBMkJDLE1BQTNCLENBQWtDVCxPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQW5CLENBQXlCRSxRQUEzRCxDQUF6QyxFQUErRztBQUMzR0QsV0FBTyxHQUFHTSxNQUFNLENBQUNDLE1BQVAsQ0FBY1YsT0FBTyxDQUFDSyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJDLE9BQW5CLENBQTJCQyxNQUEzQixDQUFrQ1QsT0FBTyxDQUFDRSxVQUFSLENBQW1CQyxLQUFuQixDQUF5QkUsUUFB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M0IsVUFBVSw2REFBWTs7QUFFdEIsc0dBQXNHLDZEQUFZOztBQUVsSCxrQkFBa0IsZ0RBQU87QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUN6RUQsZSIsImZpbGUiOiJqcy9sYXllci1kYXRhTGF5ZXJGYWN0b3J5LWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJpbmRFdmVudHMgZnJvbSBcIi4uL2ZhY3RvcnkvYmluZEV2ZW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob2JqZWN0LCBmZWF0dXJlLCBlbGVtZW50KSB7XG4gICAgaWYgKCFmZWF0dXJlLnByb3BlcnRpZXMgfHwgIWZlYXR1cmUucHJvcGVydGllcy5wb3B1cCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSBmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAub3B0aW9ucztcbiAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLnByZXNldElkICYmIGVsZW1lbnQuY29uZmlnLm1hcC5wcmVzZXRzLnBvcHVwc1tmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAucHJlc2V0SWRdKSB7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGVsZW1lbnQuY29uZmlnLm1hcC5wcmVzZXRzLnBvcHVwc1tmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAucHJlc2V0SWRdLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9iamVjdC5iaW5kUG9wdXAoZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLmNvbnRlbnQsIG9wdGlvbnMpO1xuICAgIGJpbmRFdmVudHMob2JqZWN0LCBmZWF0dXJlLnByb3BlcnRpZXMucG9wdXAuZXZlbnRzLCBlbGVtZW50KTtcbn1cbiIsImltcG9ydCBiaW5kRXZlbnRzIGZyb20gXCIuLi9mYWN0b3J5L2JpbmRFdmVudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9iamVjdCwgZmVhdHVyZSwgZWxlbWVudCkge1xuICAgIGlmICghZmVhdHVyZS5wcm9wZXJ0aWVzIHx8ICFmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSBmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5vcHRpb25zIHx8IHt9O1xuICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5wcmVzZXRJZCAmJiBlbGVtZW50LmNvbmZpZy5tYXAucHJlc2V0cy50b29sdGlwc1tmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5wcmVzZXRJZF0pIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZWxlbWVudC5jb25maWcubWFwLnByZXNldHMudG9vbHRpcHNbZmVhdHVyZS5wcm9wZXJ0aWVzLnRvb2x0aXAucHJlc2V0SWRdLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9iamVjdC5iaW5kVG9vbHRpcChmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5jb250ZW50LCBvcHRpb25zKVxuICAgIGJpbmRFdmVudHMob2JqZWN0LCBmZWF0dXJlLnByb3BlcnRpZXMudG9vbHRpcC5ldmVudHMsIGVsZW1lbnQpO1xufVxuIiwiaW1wb3J0IHsgZmVhdHVyZSBhcyBwYXJzZVRvcG9Kc29uRmVhdHVyZSB9IGZyb20gXCJ0b3BvanNvbi1jbGllbnRcIjtcbmltcG9ydCB0b0dlb0pTT04gZnJvbSAnQG1hcGJveC90b2dlb2pzb24nO1xuaW1wb3J0IHdlbGxrbm93biBmcm9tICd3ZWxsa25vd24nO1xuXG5mdW5jdGlvbiBwYXJzZVhtbChzdHIpIHtcbiAgICByZXR1cm4gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKHN0ciwgICd0ZXh0L3htbCcpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUdweChzdHIpIHtcbiAgICByZXR1cm4gdG9HZW9KU09OLmdweChwYXJzZVhtbChzdHIpKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VLbWwoc3RyKSB7XG4gICAgcmV0dXJuIHRvR2VvSlNPTi5rbWwocGFyc2VYbWwoc3RyKSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlV2t0KHN0cikge1xuICAgIHJldHVybiB3ZWxsa25vd24oc3RyKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb3BvSnNvbihzdHIpIHtcbiAgICBjb25zdCBqc29uID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHN0cikgOiBzdHI7XG4gICAgY29uc3QgZ2VvanNvbiA9IHsgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJywgZmVhdHVyZXM6IFtdIH07XG5cbiAgICBmb3IgKHZhciBpIGluIGpzb24ub2JqZWN0cykge1xuICAgICAgICB2YXIgZmVhdHVyZSA9IHBhcnNlVG9wb0pzb25GZWF0dXJlKGpzb24sIGpzb24ub2JqZWN0c1tpXSk7XG4gICAgICAgIGdlb2pzb24uZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2VvanNvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb20oZm9ybWF0LCBzdHJpbmcpIHtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgICBjYXNlICdnZW9qc29uJzpcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2Uoc3RyaW5nKSA6IHN0cmluZztcblxuICAgICAgICBjYXNlICdncHgnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlR3B4KHN0cmluZyk7XG5cbiAgICAgICAgY2FzZSAna21sJzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUttbChzdHJpbmcpO1xuXG4gICAgICAgIGNhc2UgJ3drdCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VXa3Qoc3RyaW5nKTtcblxuICAgICAgICBjYXNlICd0b3BvanNvbic6XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VUb3BvSnNvbihzdHJpbmcpO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZvcm1hdCBcIiR7Zm9ybWF0fVwiIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBmcm9tOiBmcm9tLFxuICAgIGZyb21HcHg6IHBhcnNlR3B4LFxuICAgIGZyb21LbWw6IHBhcnNlS21sLFxuICAgIGZyb21Xa3Q6IHBhcnNlV2t0LFxuICAgIGZyb21Ub3BvSnNvbjogcGFyc2VUb3BvSnNvbixcbn1cbiIsImltcG9ydCBiaW5kRXZlbnRzIGZyb20gXCIuLi9mYWN0b3J5L2JpbmRFdmVudHNcIjtcbmltcG9ydCBiaW5kUG9wdXBGcm9tRmVhdHVyZSBmcm9tIFwiLi9iaW5kUG9wdXBGcm9tRmVhdHVyZVwiO1xuaW1wb3J0IGJpbmRUb29sdGlwRnJvbUZlYXR1cmUgZnJvbSBcIi4vYmluZFRvb2x0aXBGcm9tRmVhdHVyZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZmVhdHVyZSwgbGF0bG5nLCBlbGVtZW50KSB7XG4gICAgbGV0IHR5cGUgICA9ICdtYXJrZXInO1xuICAgIGxldCBtYXJrZXIgPSBudWxsO1xuICAgIGxldCBvcHRpb25zID0ge307XG5cbiAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5ib3VuZHMgPSB0cnVlO1xuICAgICAgICBvcHRpb25zID0gZmVhdHVyZS5wcm9wZXJ0aWVzLm9wdGlvbnMgfHwge307XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucGFuZSAmJiBlbGVtZW50LnBhbmVzW29wdGlvbnMucGFuZV0pIHtcbiAgICAgICAgICAgIG9wdGlvbnMucGFuZSA9IGVsZW1lbnQucGFuZXNbb3B0aW9ucy5wYW5lXS5uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMucGFuZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMudHlwZSkge1xuICAgICAgICAgICAgdHlwZSA9IGZlYXR1cmUucHJvcGVydGllcy50eXBlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogU3VwcG9ydCBkaWZmZXJlbnQgbWFya2VyIHR5cGVzIGFzIGNpcmNsZSBtYXJrZXIgZXRjLlxuICAgIG1hcmtlciA9IExbdHlwZV0obGF0bG5nLCBvcHRpb25zKTtcblxuICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMpIHtcbiAgICAgICAgYmluZEV2ZW50cyhtYXJrZXIsIGZlYXR1cmUucHJvcGVydGllcy5ldmVudHMsIGVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMucmFkaXVzKSB7XG4gICAgICAgICAgICBtYXJrZXIuc2V0UmFkaXVzKGZlYXR1cmUucHJvcGVydGllcy5yYWRpdXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluZFBvcHVwRnJvbUZlYXR1cmUobWFya2VyLCBmZWF0dXJlLCBlbGVtZW50KTtcbiAgICAgICAgYmluZFRvb2x0aXBGcm9tRmVhdHVyZShtYXJrZXIsIGZlYXR1cmUsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vdGhpcy5maXJlKCdwb2ludDphZGRlZCcsIHttYXJrZXI6IG1hcmtlciwgZmVhdHVyZTogZmVhdHVyZSwgbGF0bG5nOiBsYXRsbmcsIHR5cGU6IHR5cGV9KTtcblxuICAgIHJldHVybiBtYXJrZXI7XG59O1xuIiwiaW1wb3J0IGxlYWZsZXQgZnJvbSAnLi4vbGVhZmxldCc7XG5pbXBvcnQgcG9pbnRUb0xheWVyIGZyb20gXCIuLi9nZW9qc29uL3BvaW50VG9MYXllclwiO1xuaW1wb3J0IHtkZXRlcm1pbmVMaXN0ZW5lcn0gZnJvbSAnLi4vZmFjdG9yeS9iaW5kRXZlbnRzJztcbmltcG9ydCBwcmVsb2FkQXNzZXRzIGZyb20gXCIuLi9mYWN0b3J5L3ByZWxvYWRBc3NldHNcIjtcbmltcG9ydCBHZW9KU09OIGZyb20gXCIuLi9nZW9qc29uXCI7XG5pbXBvcnQge21hcEZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIChjb25maWcsIGVsZW1lbnQpIHtcbiAgICBsZXQgZGF0YSwgcmVzcG9uc2U7XG5cbiAgICBzd2l0Y2ggKGNvbmZpZy5kYXRhLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnaW5saW5lJzpcbiAgICAgICAgICAgIGRhdGEgPSBjb25maWcuZGF0YS5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndXJpJzpcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY29uZmlnLmRhdGEudXJpKTtcbiAgICAgICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBhd2FpdCBwcmVsb2FkQXNzZXRzKGpzb24uYXNzZXRzLCBlbGVtZW50KTtcbiAgICAgICAgICAgIGRhdGEgPSBqc29uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdleHRlcm5hbCc6XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGNvbmZpZy5kYXRhLnVyaSk7XG4gICAgICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGJsb2IudGV4dCgpO1xuICAgICAgICAgICAgZGF0YSA9IGNvbnRlbnQ7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZGF0YSB0eXBlIFwiJHtjb25maWcuZGF0YS50eXBlfVwiYCk7XG4gICAgfVxuXG4gICAgZGF0YSA9IEdlb0pTT04uZnJvbShjb25maWcuZGF0YS5mb3JtYXQsIGRhdGEpO1xuXG4gICAgLy8gVE9ETzogSW1wbGVtZW50IGEgYmV0dGVyIHdheSBmb3IgcHJlcHJvY2Vzc2luZyBnZW9qc29uIGRhdGFcbiAgICBpZiAoZGF0YS5mZWF0dXJlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGluZGV4IGluIGRhdGEuZmVhdHVyZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmUgPSBkYXRhLmZlYXR1cmVzW2luZGV4XTtcbiAgICAgICAgICAgIGlmICghZmVhdHVyZS5wcm9wZXJ0aWVzIHx8ICFmZWF0dXJlLnByb3BlcnRpZXMuaWNvbikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jb25maWcubWFwLnByZXNldHMuaWNvbnNbZmVhdHVyZS5wcm9wZXJ0aWVzLmljb25dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLm9wdGlvbnMuaWNvbiA9IGF3YWl0IG1hcEZhY3RvcnkuY3JlYXRlSWNvbihcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNvbmZpZy5tYXAucHJlc2V0cy5pY29uc1tmZWF0dXJlLnByb3BlcnRpZXMuaWNvbl0sXG4gICAgICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwb2ludFRvTGF5ZXJDYWxsYmFjayA9IGNvbmZpZy5vcHRpb25zLnBvaW50VG9MYXllclxuICAgICAgICA/IGRldGVybWluZUxpc3RlbmVyKGNvbmZpZy5vcHRpb25zLnBvaW50VG9MYXllciwgZWxlbWVudClcbiAgICAgICAgOiBwb2ludFRvTGF5ZXI7XG5cbiAgICBjb25maWcub3B0aW9ucy5wb2ludFRvTGF5ZXIgPSAoZmVhdHVyZSwgbGF0bG5nKSA9PiBwb2ludFRvTGF5ZXJDYWxsYmFjayhmZWF0dXJlLCBsYXRsbmcsIGVsZW1lbnQsIHBvaW50VG9MYXllcik7XG5cbiAgICBjb25zdCBsYXllciA9IGxlYWZsZXQuZ2VvSlNPTihkYXRhLCBjb25maWcub3B0aW9ucyk7XG4gICAgY29uc3QgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIH07XG5cbiAgICBlbGVtZW50Lm1hcC5vbignY293ZWdpczpjYWxjdWxhdGUtYm91bmRzJywgbGlzdGVuZXIpO1xuICAgIGxheWVyLm9mZigncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtZW50Lm1hcC5vZmZzZXQoJ2Nvd2VnaXM6Y2FsY3VsYXRlLWJvdW5kcycsIGxpc3RlbmVyKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBsYXllcjtcbn1cbiIsImltcG9ydCBsZWFmbGV0IGZyb20gJy4uL2xlYWZsZXQnO1xuaW1wb3J0IHBvaW50VG9MYXllciBmcm9tIFwiLi4vZ2VvanNvbi9wb2ludFRvTGF5ZXJcIjtcbmltcG9ydCB7ZGV0ZXJtaW5lTGlzdGVuZXJ9IGZyb20gJy4uL2ZhY3RvcnkvYmluZEV2ZW50cyc7XG5pbXBvcnQgcHJlbG9hZEFzc2V0cyBmcm9tIFwiLi4vZmFjdG9yeS9wcmVsb2FkQXNzZXRzXCI7XG5pbXBvcnQgR2VvSlNPTiBmcm9tIFwiLi4vZ2VvanNvblwiO1xuaW1wb3J0IHttYXBGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoY29uZmlnLCBlbGVtZW50KSB7XG4gICAgbGV0IGRhdGEsIHJlc3BvbnNlO1xuXG4gICAgc3dpdGNoIChjb25maWcuZGF0YS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2lubGluZSc6XG4gICAgICAgICAgICBkYXRhID0gY29uZmlnLmRhdGEuZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3VyaSc6XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGNvbmZpZy5kYXRhLnVyaSk7XG4gICAgICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgYXdhaXQgcHJlbG9hZEFzc2V0cyhqc29uLmFzc2V0cywgZWxlbWVudCk7XG4gICAgICAgICAgICBkYXRhID0ganNvbi5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZXh0ZXJuYWwnOlxuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChjb25maWcuZGF0YS51cmkpO1xuICAgICAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBibG9iLnRleHQoKTtcbiAgICAgICAgICAgIGRhdGEgPSBjb250ZW50O1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGRhdGEgdHlwZSBcIiR7Y29uZmlnLmRhdGEudHlwZX1cImApO1xuICAgIH1cblxuICAgIGRhdGEgPSBHZW9KU09OLmZyb20oY29uZmlnLmRhdGEuZm9ybWF0LCBkYXRhKTtcblxuICAgIC8vIFRPRE86IEltcGxlbWVudCBhIGJldHRlciB3YXkgZm9yIHByZXByb2Nlc3NpbmcgZ2VvanNvbiBkYXRhXG4gICAgaWYgKGRhdGEuZmVhdHVyZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBpbmRleCBpbiBkYXRhLmZlYXR1cmVzKSB7XG4gICAgICAgICAgICBjb25zdCBmZWF0dXJlID0gZGF0YS5mZWF0dXJlc1tpbmRleF07XG4gICAgICAgICAgICBpZiAoIWZlYXR1cmUucHJvcGVydGllcyB8fCAhZmVhdHVyZS5wcm9wZXJ0aWVzLmljb24pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29uZmlnLm1hcC5wcmVzZXRzLmljb25zW2ZlYXR1cmUucHJvcGVydGllcy5pY29uXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5vcHRpb25zLmljb24gPSBhd2FpdCBtYXBGYWN0b3J5LmNyZWF0ZUljb24oXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb25maWcubWFwLnByZXNldHMuaWNvbnNbZmVhdHVyZS5wcm9wZXJ0aWVzLmljb25dLFxuICAgICAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcG9pbnRUb0xheWVyQ2FsbGJhY2sgPSBjb25maWcub3B0aW9ucy5wb2ludFRvTGF5ZXJcbiAgICAgICAgPyBkZXRlcm1pbmVMaXN0ZW5lcihjb25maWcub3B0aW9ucy5wb2ludFRvTGF5ZXIsIGVsZW1lbnQpXG4gICAgICAgIDogcG9pbnRUb0xheWVyO1xuXG4gICAgY29uZmlnLm9wdGlvbnMucG9pbnRUb0xheWVyID0gKGZlYXR1cmUsIGxhdGxuZykgPT4gcG9pbnRUb0xheWVyQ2FsbGJhY2soZmVhdHVyZSwgbGF0bG5nLCBlbGVtZW50LCBwb2ludFRvTGF5ZXIpO1xuXG4gICAgY29uc3QgbGF5ZXIgPSBsZWFmbGV0Lmdlb0pTT04oZGF0YSwgY29uZmlnLm9wdGlvbnMpO1xuICAgIGNvbnN0IGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICB9O1xuXG4gICAgZWxlbWVudC5tYXAub24oJ2Nvd2VnaXM6Y2FsY3VsYXRlLWJvdW5kcycsIGxpc3RlbmVyKTtcbiAgICBsYXllci5vblJlbW92ZSgncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtZW50Lm1hcC5vZmZzZXQoJ2Nvd2VnaXM6Y2FsY3VsYXRlLWJvdW5kcycsIGxpc3RlbmVyKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBsYXllcjtcbn1cbiIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=