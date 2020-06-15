(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layer-dataLayerFactory"],{

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









function boundsListener(layer, map) {
  if (!layer.options.adjustBounds) {
    return;
  }

  var listener = function listener(event) {
    layer.eachLayer(function (child) {
      if (child.getBounds) {
        var source = child.getBounds();

        if (source.isValid()) {
          event.bounds.extend(source);
        }
      } else if (child.getLatLng) {
        event.bounds.extend(child.getLatLng());
      }
    });
  };

  map.on('cowegis:calculate-bounds', listener);
  layer.off('remove', function () {
    map.offset('cowegis:calculate-bounds', listener);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (function (_x, _x2) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config, element) {
    var data, response, json, blob, content, index, feature, pointToLayerCallback, layer;
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
            boundsListener(layer, element.map);
            return _context.abrupt("return", layer);

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9nZW9qc29uL2JpbmRQb3B1cEZyb21GZWF0dXJlLmpzIiwid2VicGFjazovLy8uL2pzL2dlb2pzb24vYmluZFRvb2x0aXBGcm9tRmVhdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9nZW9qc29uL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL2dlb2pzb24vcG9pbnRUb0xheWVyLmpzIiwid2VicGFjazovLy8uL2pzL2xheWVyL2RhdGFMYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vL3htbGRvbSAoaWdub3JlZCkiXSwibmFtZXMiOlsib2JqZWN0IiwiZmVhdHVyZSIsImVsZW1lbnQiLCJwcm9wZXJ0aWVzIiwicG9wdXAiLCJvcHRpb25zIiwicHJlc2V0SWQiLCJjb25maWciLCJtYXAiLCJwcmVzZXRzIiwicG9wdXBzIiwiT2JqZWN0IiwiYXNzaWduIiwiYmluZFBvcHVwIiwiY29udGVudCIsImJpbmRFdmVudHMiLCJldmVudHMiLCJ0b29sdGlwIiwidG9vbHRpcHMiLCJiaW5kVG9vbHRpcCIsInBhcnNlWG1sIiwic3RyIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwicGFyc2VHcHgiLCJ0b0dlb0pTT04iLCJncHgiLCJwYXJzZUttbCIsImttbCIsInBhcnNlV2t0Iiwid2VsbGtub3duIiwicGFyc2VUb3BvSnNvbiIsImpzb24iLCJKU09OIiwicGFyc2UiLCJnZW9qc29uIiwidHlwZSIsImZlYXR1cmVzIiwiaSIsIm9iamVjdHMiLCJwYXJzZVRvcG9Kc29uRmVhdHVyZSIsInB1c2giLCJmcm9tIiwiZm9ybWF0Iiwic3RyaW5nIiwiRXJyb3IiLCJmcm9tR3B4IiwiZnJvbUttbCIsImZyb21Xa3QiLCJmcm9tVG9wb0pzb24iLCJsYXRsbmciLCJtYXJrZXIiLCJib3VuZHMiLCJwYW5lIiwicGFuZXMiLCJuYW1lIiwiTCIsInJhZGl1cyIsInNldFJhZGl1cyIsImJpbmRQb3B1cEZyb21GZWF0dXJlIiwiYmluZFRvb2x0aXBGcm9tRmVhdHVyZSIsImJvdW5kc0xpc3RlbmVyIiwibGF5ZXIiLCJhZGp1c3RCb3VuZHMiLCJsaXN0ZW5lciIsImV2ZW50IiwiZWFjaExheWVyIiwiY2hpbGQiLCJnZXRCb3VuZHMiLCJzb3VyY2UiLCJpc1ZhbGlkIiwiZXh0ZW5kIiwiZ2V0TGF0TG5nIiwib24iLCJvZmYiLCJvZmZzZXQiLCJkYXRhIiwiZmV0Y2giLCJ1cmkiLCJyZXNwb25zZSIsInByZWxvYWRBc3NldHMiLCJhc3NldHMiLCJibG9iIiwidGV4dCIsIkdlb0pTT04iLCJpbmRleCIsImljb24iLCJpY29ucyIsInVuZGVmaW5lZCIsIm1hcEZhY3RvcnkiLCJjcmVhdGVJY29uIiwicG9pbnRUb0xheWVyQ2FsbGJhY2siLCJwb2ludFRvTGF5ZXIiLCJkZXRlcm1pbmVMaXN0ZW5lciIsImxlYWZsZXQiLCJnZW9KU09OIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRWUseUVBQVVBLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCQyxPQUEzQixFQUFvQztBQUMvQyxNQUFJLENBQUNELE9BQU8sQ0FBQ0UsVUFBVCxJQUF1QixDQUFDRixPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQS9DLEVBQXNEO0FBQ2xEO0FBQ0g7O0FBRUQsTUFBSUMsT0FBTyxHQUFHSixPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQW5CLENBQXlCQyxPQUF2Qzs7QUFDQSxNQUFJSixPQUFPLENBQUNFLFVBQVIsQ0FBbUJDLEtBQW5CLENBQXlCRSxRQUF6QixJQUFxQ0osT0FBTyxDQUFDSyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJDLE9BQW5CLENBQTJCQyxNQUEzQixDQUFrQ1QsT0FBTyxDQUFDRSxVQUFSLENBQW1CQyxLQUFuQixDQUF5QkUsUUFBM0QsQ0FBekMsRUFBK0c7QUFDM0dELFdBQU8sR0FBR00sTUFBTSxDQUFDQyxNQUFQLENBQWNWLE9BQU8sQ0FBQ0ssTUFBUixDQUFlQyxHQUFmLENBQW1CQyxPQUFuQixDQUEyQkMsTUFBM0IsQ0FBa0NULE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUJFLFFBQTNELEVBQXFFRCxPQUFuRixFQUE0RkEsT0FBNUYsQ0FBVjtBQUNIOztBQUVETCxRQUFNLENBQUNhLFNBQVAsQ0FBaUJaLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUJVLE9BQTFDLEVBQW1EVCxPQUFuRDtBQUNBVSxxRUFBVSxDQUFDZixNQUFELEVBQVNDLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUJZLE1BQWxDLEVBQTBDZCxPQUExQyxDQUFWO0FBQ0gsQzs7Ozs7Ozs7Ozs7O0FDZEQ7QUFBQTtBQUFBO0FBRWUseUVBQVVGLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCQyxPQUEzQixFQUFvQztBQUMvQyxNQUFJLENBQUNELE9BQU8sQ0FBQ0UsVUFBVCxJQUF1QixDQUFDRixPQUFPLENBQUNFLFVBQVIsQ0FBbUJjLE9BQS9DLEVBQXdEO0FBQ3BEO0FBQ0g7O0FBRUQsTUFBSVosT0FBTyxHQUFHSixPQUFPLENBQUNFLFVBQVIsQ0FBbUJjLE9BQW5CLENBQTJCWixPQUEzQixJQUFzQyxFQUFwRDs7QUFDQSxNQUFJSixPQUFPLENBQUNFLFVBQVIsQ0FBbUJjLE9BQW5CLENBQTJCWCxRQUEzQixJQUF1Q0osT0FBTyxDQUFDSyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJDLE9BQW5CLENBQTJCUyxRQUEzQixDQUFvQ2pCLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQmMsT0FBbkIsQ0FBMkJYLFFBQS9ELENBQTNDLEVBQXFIO0FBQ2pIRCxXQUFPLEdBQUdNLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjVixPQUFPLENBQUNLLE1BQVIsQ0FBZUMsR0FBZixDQUFtQkMsT0FBbkIsQ0FBMkJTLFFBQTNCLENBQW9DakIsT0FBTyxDQUFDRSxVQUFSLENBQW1CYyxPQUFuQixDQUEyQlgsUUFBL0QsRUFBeUVELE9BQXZGLEVBQWdHQSxPQUFoRyxDQUFWO0FBQ0g7O0FBRURMLFFBQU0sQ0FBQ21CLFdBQVAsQ0FBbUJsQixPQUFPLENBQUNFLFVBQVIsQ0FBbUJjLE9BQW5CLENBQTJCSCxPQUE5QyxFQUF1RFQsT0FBdkQ7QUFDQVUscUVBQVUsQ0FBQ2YsTUFBRCxFQUFTQyxPQUFPLENBQUNFLFVBQVIsQ0FBbUJjLE9BQW5CLENBQTJCRCxNQUFwQyxFQUE0Q2QsT0FBNUMsQ0FBVjtBQUNILEM7Ozs7Ozs7Ozs7OztBQ2REO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBLFNBQVNrQixRQUFULENBQWtCQyxHQUFsQixFQUF1QjtBQUNuQixTQUFRLElBQUlDLFNBQUosRUFBRCxDQUFrQkMsZUFBbEIsQ0FBa0NGLEdBQWxDLEVBQXdDLFVBQXhDLENBQVA7QUFDSDs7QUFFRCxTQUFTRyxRQUFULENBQWtCSCxHQUFsQixFQUF1QjtBQUNuQixTQUFPSSx3REFBUyxDQUFDQyxHQUFWLENBQWNOLFFBQVEsQ0FBQ0MsR0FBRCxDQUF0QixDQUFQO0FBQ0g7O0FBRUQsU0FBU00sUUFBVCxDQUFrQk4sR0FBbEIsRUFBdUI7QUFDbkIsU0FBT0ksd0RBQVMsQ0FBQ0csR0FBVixDQUFjUixRQUFRLENBQUNDLEdBQUQsQ0FBdEIsQ0FBUDtBQUNIOztBQUVELFNBQVNRLFFBQVQsQ0FBa0JSLEdBQWxCLEVBQXVCO0FBQ25CLFNBQU9TLGdEQUFTLENBQUNULEdBQUQsQ0FBaEI7QUFDSDs7QUFFRCxTQUFTVSxhQUFULENBQXVCVixHQUF2QixFQUE0QjtBQUN4QixNQUFNVyxJQUFJLEdBQUcsT0FBT1gsR0FBUCxLQUFlLFFBQWYsR0FBMEJZLElBQUksQ0FBQ0MsS0FBTCxDQUFXYixHQUFYLENBQTFCLEdBQTRDQSxHQUF6RDtBQUNBLE1BQU1jLE9BQU8sR0FBRztBQUFFQyxRQUFJLEVBQUUsbUJBQVI7QUFBNkJDLFlBQVEsRUFBRTtBQUF2QyxHQUFoQjs7QUFFQSxPQUFLLElBQUlDLENBQVQsSUFBY04sSUFBSSxDQUFDTyxPQUFuQixFQUE0QjtBQUN4QixRQUFJdEMsT0FBTyxHQUFHdUMsK0RBQW9CLENBQUNSLElBQUQsRUFBT0EsSUFBSSxDQUFDTyxPQUFMLENBQWFELENBQWIsQ0FBUCxDQUFsQztBQUNBSCxXQUFPLENBQUNFLFFBQVIsQ0FBaUJJLElBQWpCLENBQXNCeEMsT0FBdEI7QUFDSDs7QUFFRCxTQUFPa0MsT0FBUDtBQUNIOztBQUVNLFNBQVNPLElBQVQsQ0FBY0MsTUFBZCxFQUFzQkMsTUFBdEIsRUFBOEI7QUFDakMsVUFBUUQsTUFBUjtBQUNJLFNBQUssU0FBTDtBQUNJLGFBQU8sT0FBT0MsTUFBUCxLQUFrQixRQUFsQixHQUE2QlgsSUFBSSxDQUFDQyxLQUFMLENBQVdVLE1BQVgsQ0FBN0IsR0FBa0RBLE1BQXpEOztBQUVKLFNBQUssS0FBTDtBQUNJLGFBQU9wQixRQUFRLENBQUNvQixNQUFELENBQWY7O0FBRUosU0FBSyxLQUFMO0FBQ0ksYUFBT2pCLFFBQVEsQ0FBQ2lCLE1BQUQsQ0FBZjs7QUFFSixTQUFLLEtBQUw7QUFDSSxhQUFPZixRQUFRLENBQUNlLE1BQUQsQ0FBZjs7QUFFSixTQUFLLFVBQUw7QUFDSSxhQUFPYixhQUFhLENBQUNhLE1BQUQsQ0FBcEI7O0FBRUo7QUFDSSxZQUFNLElBQUlDLEtBQUosb0JBQXFCRixNQUFyQixzQkFBTjtBQWpCUjtBQW1CSDtBQUVjO0FBQ1hELE1BQUksRUFBRUEsSUFESztBQUVYSSxTQUFPLEVBQUV0QixRQUZFO0FBR1h1QixTQUFPLEVBQUVwQixRQUhFO0FBSVhxQixTQUFPLEVBQUVuQixRQUpFO0FBS1hvQixjQUFZLEVBQUVsQjtBQUxILENBQWYsRTs7Ozs7Ozs7Ozs7O0FDdERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRWUseUVBQVU5QixPQUFWLEVBQW1CaUQsTUFBbkIsRUFBMkJoRCxPQUEzQixFQUFvQztBQUMvQyxNQUFJa0MsSUFBSSxHQUFLLFFBQWI7QUFDQSxNQUFJZSxNQUFNLEdBQUcsSUFBYjtBQUNBLE1BQUk5QyxPQUFPLEdBQUcsRUFBZDs7QUFFQSxNQUFJSixPQUFPLENBQUNFLFVBQVosRUFBd0I7QUFDcEJGLFdBQU8sQ0FBQ0UsVUFBUixDQUFtQmlELE1BQW5CLEdBQTRCLElBQTVCO0FBQ0EvQyxXQUFPLEdBQUdKLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQkUsT0FBbkIsSUFBOEIsRUFBeEM7O0FBRUEsUUFBSUEsT0FBTyxDQUFDZ0QsSUFBUixJQUFnQm5ELE9BQU8sQ0FBQ29ELEtBQVIsQ0FBY2pELE9BQU8sQ0FBQ2dELElBQXRCLENBQXBCLEVBQWlEO0FBQzdDaEQsYUFBTyxDQUFDZ0QsSUFBUixHQUFlbkQsT0FBTyxDQUFDb0QsS0FBUixDQUFjakQsT0FBTyxDQUFDZ0QsSUFBdEIsRUFBNEJFLElBQTNDO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBT2xELE9BQU8sQ0FBQ2dELElBQWY7QUFDSDs7QUFFRCxRQUFJcEQsT0FBTyxDQUFDRSxVQUFSLENBQW1CaUMsSUFBdkIsRUFBNkI7QUFDekJBLFVBQUksR0FBR25DLE9BQU8sQ0FBQ0UsVUFBUixDQUFtQmlDLElBQTFCO0FBQ0g7QUFDSixHQWxCOEMsQ0FvQi9DOzs7QUFDQWUsUUFBTSxHQUFHSyxDQUFDLENBQUNwQixJQUFELENBQUQsQ0FBUWMsTUFBUixFQUFnQjdDLE9BQWhCLENBQVQ7O0FBRUEsTUFBSUosT0FBTyxDQUFDRSxVQUFaLEVBQXdCO0FBQ3BCWSx1RUFBVSxDQUFDb0MsTUFBRCxFQUFTbEQsT0FBTyxDQUFDRSxVQUFSLENBQW1CYSxNQUE1QixFQUFvQ2QsT0FBcEMsQ0FBVjs7QUFFQSxRQUFJRCxPQUFPLENBQUNFLFVBQVIsQ0FBbUJzRCxNQUF2QixFQUErQjtBQUMzQk4sWUFBTSxDQUFDTyxTQUFQLENBQWlCekQsT0FBTyxDQUFDRSxVQUFSLENBQW1Cc0QsTUFBcEM7QUFDSDs7QUFFREUseUVBQW9CLENBQUNSLE1BQUQsRUFBU2xELE9BQVQsRUFBa0JDLE9BQWxCLENBQXBCO0FBQ0EwRCwyRUFBc0IsQ0FBQ1QsTUFBRCxFQUFTbEQsT0FBVCxFQUFrQkMsT0FBbEIsQ0FBdEI7QUFDSCxHQWhDOEMsQ0FrQy9DOzs7QUFFQSxTQUFPaUQsTUFBUDtBQUNIO0FBQUEsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU1UsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0J0RCxHQUEvQixFQUFvQztBQUNoQyxNQUFJLENBQUNzRCxLQUFLLENBQUN6RCxPQUFOLENBQWMwRCxZQUFuQixFQUFpQztBQUM3QjtBQUNIOztBQUVELE1BQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQVVDLEtBQVYsRUFBaUI7QUFDOUJILFNBQUssQ0FBQ0ksU0FBTixDQUFnQixVQUFVQyxLQUFWLEVBQWlCO0FBQzdCLFVBQUlBLEtBQUssQ0FBQ0MsU0FBVixFQUFxQjtBQUNqQixZQUFNQyxNQUFNLEdBQUdGLEtBQUssQ0FBQ0MsU0FBTixFQUFmOztBQUVBLFlBQUlDLE1BQU0sQ0FBQ0MsT0FBUCxFQUFKLEVBQXNCO0FBQ2xCTCxlQUFLLENBQUNiLE1BQU4sQ0FBYW1CLE1BQWIsQ0FBb0JGLE1BQXBCO0FBQ0g7QUFDSixPQU5ELE1BTU8sSUFBSUYsS0FBSyxDQUFDSyxTQUFWLEVBQXFCO0FBQ3hCUCxhQUFLLENBQUNiLE1BQU4sQ0FBYW1CLE1BQWIsQ0FBb0JKLEtBQUssQ0FBQ0ssU0FBTixFQUFwQjtBQUNIO0FBQ0osS0FWRDtBQVdILEdBWkQ7O0FBY0FoRSxLQUFHLENBQUNpRSxFQUFKLENBQU8sMEJBQVAsRUFBbUNULFFBQW5DO0FBQ0FGLE9BQUssQ0FBQ1ksR0FBTixDQUFVLFFBQVYsRUFBb0IsWUFBWTtBQUM1QmxFLE9BQUcsQ0FBQ21FLE1BQUosQ0FBVywwQkFBWCxFQUF1Q1gsUUFBdkM7QUFDSCxHQUZEO0FBR0g7O0FBRWM7QUFBZjtBQUFBOzs7NktBQWUsaUJBQWdCekQsTUFBaEIsRUFBd0JMLE9BQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUdISyxNQUFNLENBQUNxRSxJQUFQLENBQVl4QyxJQUhUO0FBQUEsNENBSUYsUUFKRSx1QkFRRixLQVJFLHVCQWVGLFVBZkU7QUFBQTs7QUFBQTtBQUtId0MsZ0JBQUksR0FBR3JFLE1BQU0sQ0FBQ3FFLElBQVAsQ0FBWUEsSUFBbkI7QUFMRzs7QUFBQTtBQUFBO0FBQUEsbUJBU2NDLEtBQUssQ0FBQ3RFLE1BQU0sQ0FBQ3FFLElBQVAsQ0FBWUUsR0FBYixDQVRuQjs7QUFBQTtBQVNIQyxvQkFURztBQUFBO0FBQUEsbUJBVWdCQSxRQUFRLENBQUMvQyxJQUFULEVBVmhCOztBQUFBO0FBVUdBLGdCQVZIO0FBQUE7QUFBQSxtQkFXR2dELHNFQUFhLENBQUNoRCxJQUFJLENBQUNpRCxNQUFOLEVBQWMvRSxPQUFkLENBWGhCOztBQUFBO0FBWUgwRSxnQkFBSSxHQUFHNUMsSUFBSSxDQUFDNEMsSUFBWjtBQVpHOztBQUFBO0FBQUE7QUFBQSxtQkFnQmNDLEtBQUssQ0FBQ3RFLE1BQU0sQ0FBQ3FFLElBQVAsQ0FBWUUsR0FBYixDQWhCbkI7O0FBQUE7QUFnQkhDLG9CQWhCRztBQUFBO0FBQUEsbUJBaUJnQkEsUUFBUSxDQUFDRyxJQUFULEVBakJoQjs7QUFBQTtBQWlCR0EsZ0JBakJIO0FBQUE7QUFBQSxtQkFrQm1CQSxJQUFJLENBQUNDLElBQUwsRUFsQm5COztBQUFBO0FBa0JHckUsbUJBbEJIO0FBbUJIOEQsZ0JBQUksR0FBRzlELE9BQVA7QUFuQkc7O0FBQUE7QUFBQSxrQkF3QkcsSUFBSStCLEtBQUosK0JBQWdDdEMsTUFBTSxDQUFDcUUsSUFBUCxDQUFZeEMsSUFBNUMsUUF4Qkg7O0FBQUE7QUEyQlh3QyxnQkFBSSxHQUFHUSxnREFBTyxDQUFDMUMsSUFBUixDQUFhbkMsTUFBTSxDQUFDcUUsSUFBUCxDQUFZakMsTUFBekIsRUFBaUNpQyxJQUFqQyxDQUFQLENBM0JXLENBNkJYOztBQTdCVyxpQkE4QlBBLElBQUksQ0FBQ3ZDLFFBOUJFO0FBQUE7QUFBQTtBQUFBOztBQUFBLGlHQStCYXVDLElBQUksQ0FBQ3ZDLFFBL0JsQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQStCSWdELGlCQS9CSjtBQWdDR3BGLG1CQWhDSCxHQWdDYTJFLElBQUksQ0FBQ3ZDLFFBQUwsQ0FBY2dELEtBQWQsQ0FoQ2I7O0FBQUEsa0JBaUNDLENBQUNwRixPQUFPLENBQUNFLFVBQVQsSUFBdUIsQ0FBQ0YsT0FBTyxDQUFDRSxVQUFSLENBQW1CbUYsSUFqQzVDO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUEsa0JBcUNDcEYsT0FBTyxDQUFDSyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJDLE9BQW5CLENBQTJCOEUsS0FBM0IsQ0FBaUN0RixPQUFPLENBQUNFLFVBQVIsQ0FBbUJtRixJQUFwRCxNQUE4REUsU0FyQy9EO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkF5Q3FDQyxtREFBVSxDQUFDQyxVQUFYLENBQ3BDeEYsT0FBTyxDQUFDSyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJDLE9BQW5CLENBQTJCOEUsS0FBM0IsQ0FBaUN0RixPQUFPLENBQUNFLFVBQVIsQ0FBbUJtRixJQUFwRCxDQURvQyxFQUVwQ3JGLE9BQU8sQ0FBQ0UsVUFGNEIsRUFHcENELE9BSG9DLENBekNyQzs7QUFBQTtBQXlDSEQsbUJBQU8sQ0FBQ0UsVUFBUixDQUFtQkUsT0FBbkIsQ0FBMkJpRixJQXpDeEI7QUFBQTtBQUFBOztBQUFBO0FBaURMSyxnQ0FqREssR0FpRGtCcEYsTUFBTSxDQUFDRixPQUFQLENBQWV1RixZQUFmLEdBQ3ZCQyw2RUFBaUIsQ0FBQ3RGLE1BQU0sQ0FBQ0YsT0FBUCxDQUFldUYsWUFBaEIsRUFBOEIxRixPQUE5QixDQURNLEdBRXZCMEYsNkRBbkRLOztBQXFEWHJGLGtCQUFNLENBQUNGLE9BQVAsQ0FBZXVGLFlBQWYsR0FBOEIsVUFBQzNGLE9BQUQsRUFBVWlELE1BQVY7QUFBQSxxQkFBcUJ5QyxvQkFBb0IsQ0FBQzFGLE9BQUQsRUFBVWlELE1BQVYsRUFBa0JoRCxPQUFsQixFQUEyQjBGLDZEQUEzQixDQUF6QztBQUFBLGFBQTlCOztBQUVNOUIsaUJBdkRLLEdBdURHZ0MsZ0RBQU8sQ0FBQ0MsT0FBUixDQUFnQm5CLElBQWhCLEVBQXNCckUsTUFBTSxDQUFDRixPQUE3QixDQXZESDtBQXdEWHdELDBCQUFjLENBQUNDLEtBQUQsRUFBUTVELE9BQU8sQ0FBQ00sR0FBaEIsQ0FBZDtBQXhEVyw2Q0EwREpzRCxLQTFESTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7Ozs7Ozs7Ozs7O0FDaENmLGUiLCJmaWxlIjoianMvbGF5ZXItZGF0YUxheWVyRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiaW5kRXZlbnRzIGZyb20gXCIuLi9mYWN0b3J5L2JpbmRFdmVudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9iamVjdCwgZmVhdHVyZSwgZWxlbWVudCkge1xuICAgIGlmICghZmVhdHVyZS5wcm9wZXJ0aWVzIHx8ICFmZWF0dXJlLnByb3BlcnRpZXMucG9wdXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0gZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLm9wdGlvbnM7XG4gICAgaWYgKGZlYXR1cmUucHJvcGVydGllcy5wb3B1cC5wcmVzZXRJZCAmJiBlbGVtZW50LmNvbmZpZy5tYXAucHJlc2V0cy5wb3B1cHNbZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLnByZXNldElkXSkge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihlbGVtZW50LmNvbmZpZy5tYXAucHJlc2V0cy5wb3B1cHNbZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLnByZXNldElkXS5vcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBvYmplY3QuYmluZFBvcHVwKGZlYXR1cmUucHJvcGVydGllcy5wb3B1cC5jb250ZW50LCBvcHRpb25zKTtcbiAgICBiaW5kRXZlbnRzKG9iamVjdCwgZmVhdHVyZS5wcm9wZXJ0aWVzLnBvcHVwLmV2ZW50cywgZWxlbWVudCk7XG59XG4iLCJpbXBvcnQgYmluZEV2ZW50cyBmcm9tIFwiLi4vZmFjdG9yeS9iaW5kRXZlbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvYmplY3QsIGZlYXR1cmUsIGVsZW1lbnQpIHtcbiAgICBpZiAoIWZlYXR1cmUucHJvcGVydGllcyB8fCAhZmVhdHVyZS5wcm9wZXJ0aWVzLnRvb2x0aXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0gZmVhdHVyZS5wcm9wZXJ0aWVzLnRvb2x0aXAub3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnRvb2x0aXAucHJlc2V0SWQgJiYgZWxlbWVudC5jb25maWcubWFwLnByZXNldHMudG9vbHRpcHNbZmVhdHVyZS5wcm9wZXJ0aWVzLnRvb2x0aXAucHJlc2V0SWRdKSB7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGVsZW1lbnQuY29uZmlnLm1hcC5wcmVzZXRzLnRvb2x0aXBzW2ZlYXR1cmUucHJvcGVydGllcy50b29sdGlwLnByZXNldElkXS5vcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBvYmplY3QuYmluZFRvb2x0aXAoZmVhdHVyZS5wcm9wZXJ0aWVzLnRvb2x0aXAuY29udGVudCwgb3B0aW9ucylcbiAgICBiaW5kRXZlbnRzKG9iamVjdCwgZmVhdHVyZS5wcm9wZXJ0aWVzLnRvb2x0aXAuZXZlbnRzLCBlbGVtZW50KTtcbn1cbiIsImltcG9ydCB7IGZlYXR1cmUgYXMgcGFyc2VUb3BvSnNvbkZlYXR1cmUgfSBmcm9tIFwidG9wb2pzb24tY2xpZW50XCI7XG5pbXBvcnQgdG9HZW9KU09OIGZyb20gJ0BtYXBib3gvdG9nZW9qc29uJztcbmltcG9ydCB3ZWxsa25vd24gZnJvbSAnd2VsbGtub3duJztcblxuZnVuY3Rpb24gcGFyc2VYbWwoc3RyKSB7XG4gICAgcmV0dXJuIChuZXcgRE9NUGFyc2VyKCkpLnBhcnNlRnJvbVN0cmluZyhzdHIsICAndGV4dC94bWwnKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VHcHgoc3RyKSB7XG4gICAgcmV0dXJuIHRvR2VvSlNPTi5ncHgocGFyc2VYbWwoc3RyKSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlS21sKHN0cikge1xuICAgIHJldHVybiB0b0dlb0pTT04ua21sKHBhcnNlWG1sKHN0cikpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVdrdChzdHIpIHtcbiAgICByZXR1cm4gd2VsbGtub3duKHN0cik7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9wb0pzb24oc3RyKSB7XG4gICAgY29uc3QganNvbiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShzdHIpIDogc3RyO1xuICAgIGNvbnN0IGdlb2pzb24gPSB7IHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsIGZlYXR1cmVzOiBbXSB9O1xuXG4gICAgZm9yICh2YXIgaSBpbiBqc29uLm9iamVjdHMpIHtcbiAgICAgICAgdmFyIGZlYXR1cmUgPSBwYXJzZVRvcG9Kc29uRmVhdHVyZShqc29uLCBqc29uLm9iamVjdHNbaV0pO1xuICAgICAgICBnZW9qc29uLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdlb2pzb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tKGZvcm1hdCwgc3RyaW5nKSB7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgICAgY2FzZSAnZ2VvanNvbic6XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHN0cmluZykgOiBzdHJpbmc7XG5cbiAgICAgICAgY2FzZSAnZ3B4JzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUdweChzdHJpbmcpO1xuXG4gICAgICAgIGNhc2UgJ2ttbCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VLbWwoc3RyaW5nKTtcblxuICAgICAgICBjYXNlICd3a3QnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlV2t0KHN0cmluZyk7XG5cbiAgICAgICAgY2FzZSAndG9wb2pzb24nOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlVG9wb0pzb24oc3RyaW5nKTtcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGb3JtYXQgXCIke2Zvcm1hdH1cIiBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZnJvbTogZnJvbSxcbiAgICBmcm9tR3B4OiBwYXJzZUdweCxcbiAgICBmcm9tS21sOiBwYXJzZUttbCxcbiAgICBmcm9tV2t0OiBwYXJzZVdrdCxcbiAgICBmcm9tVG9wb0pzb246IHBhcnNlVG9wb0pzb24sXG59XG4iLCJpbXBvcnQgYmluZEV2ZW50cyBmcm9tIFwiLi4vZmFjdG9yeS9iaW5kRXZlbnRzXCI7XG5pbXBvcnQgYmluZFBvcHVwRnJvbUZlYXR1cmUgZnJvbSBcIi4vYmluZFBvcHVwRnJvbUZlYXR1cmVcIjtcbmltcG9ydCBiaW5kVG9vbHRpcEZyb21GZWF0dXJlIGZyb20gXCIuL2JpbmRUb29sdGlwRnJvbUZlYXR1cmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZlYXR1cmUsIGxhdGxuZywgZWxlbWVudCkge1xuICAgIGxldCB0eXBlICAgPSAnbWFya2VyJztcbiAgICBsZXQgbWFya2VyID0gbnVsbDtcbiAgICBsZXQgb3B0aW9ucyA9IHt9O1xuXG4gICAgaWYgKGZlYXR1cmUucHJvcGVydGllcykge1xuICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMuYm91bmRzID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9ucyA9IGZlYXR1cmUucHJvcGVydGllcy5vcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIGlmIChvcHRpb25zLnBhbmUgJiYgZWxlbWVudC5wYW5lc1tvcHRpb25zLnBhbmVdKSB7XG4gICAgICAgICAgICBvcHRpb25zLnBhbmUgPSBlbGVtZW50LnBhbmVzW29wdGlvbnMucGFuZV0ubmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLnBhbmU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnR5cGUpIHtcbiAgICAgICAgICAgIHR5cGUgPSBmZWF0dXJlLnByb3BlcnRpZXMudHlwZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IFN1cHBvcnQgZGlmZmVyZW50IG1hcmtlciB0eXBlcyBhcyBjaXJjbGUgbWFya2VyIGV0Yy5cbiAgICBtYXJrZXIgPSBMW3R5cGVdKGxhdGxuZywgb3B0aW9ucyk7XG5cbiAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIGJpbmRFdmVudHMobWFya2VyLCBmZWF0dXJlLnByb3BlcnRpZXMuZXZlbnRzLCBlbGVtZW50KTtcblxuICAgICAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnJhZGl1cykge1xuICAgICAgICAgICAgbWFya2VyLnNldFJhZGl1cyhmZWF0dXJlLnByb3BlcnRpZXMucmFkaXVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJpbmRQb3B1cEZyb21GZWF0dXJlKG1hcmtlciwgZmVhdHVyZSwgZWxlbWVudCk7XG4gICAgICAgIGJpbmRUb29sdGlwRnJvbUZlYXR1cmUobWFya2VyLCBmZWF0dXJlLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvL3RoaXMuZmlyZSgncG9pbnQ6YWRkZWQnLCB7bWFya2VyOiBtYXJrZXIsIGZlYXR1cmU6IGZlYXR1cmUsIGxhdGxuZzogbGF0bG5nLCB0eXBlOiB0eXBlfSk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xufTtcbiIsImltcG9ydCBsZWFmbGV0IGZyb20gJy4uL2xlYWZsZXQnO1xuaW1wb3J0IHBvaW50VG9MYXllciBmcm9tIFwiLi4vZ2VvanNvbi9wb2ludFRvTGF5ZXJcIjtcbmltcG9ydCB7ZGV0ZXJtaW5lTGlzdGVuZXJ9IGZyb20gJy4uL2ZhY3RvcnkvYmluZEV2ZW50cyc7XG5pbXBvcnQgcHJlbG9hZEFzc2V0cyBmcm9tIFwiLi4vZmFjdG9yeS9wcmVsb2FkQXNzZXRzXCI7XG5pbXBvcnQgR2VvSlNPTiBmcm9tIFwiLi4vZ2VvanNvblwiO1xuaW1wb3J0IHttYXBGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBib3VuZHNMaXN0ZW5lcihsYXllciwgbWFwKSB7XG4gICAgaWYgKCFsYXllci5vcHRpb25zLmFkanVzdEJvdW5kcykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbGF5ZXIuZWFjaExheWVyKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgaWYgKGNoaWxkLmdldEJvdW5kcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGNoaWxkLmdldEJvdW5kcygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuYm91bmRzLmV4dGVuZChzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hpbGQuZ2V0TGF0TG5nKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuYm91bmRzLmV4dGVuZChjaGlsZC5nZXRMYXRMbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtYXAub24oJ2Nvd2VnaXM6Y2FsY3VsYXRlLWJvdW5kcycsIGxpc3RlbmVyKTtcbiAgICBsYXllci5vZmYoJ3JlbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbWFwLm9mZnNldCgnY293ZWdpczpjYWxjdWxhdGUtYm91bmRzJywgbGlzdGVuZXIpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoY29uZmlnLCBlbGVtZW50KSB7XG4gICAgbGV0IGRhdGEsIHJlc3BvbnNlO1xuXG4gICAgc3dpdGNoIChjb25maWcuZGF0YS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2lubGluZSc6XG4gICAgICAgICAgICBkYXRhID0gY29uZmlnLmRhdGEuZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3VyaSc6XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGNvbmZpZy5kYXRhLnVyaSk7XG4gICAgICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgYXdhaXQgcHJlbG9hZEFzc2V0cyhqc29uLmFzc2V0cywgZWxlbWVudCk7XG4gICAgICAgICAgICBkYXRhID0ganNvbi5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZXh0ZXJuYWwnOlxuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChjb25maWcuZGF0YS51cmkpO1xuICAgICAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBibG9iLnRleHQoKTtcbiAgICAgICAgICAgIGRhdGEgPSBjb250ZW50O1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGRhdGEgdHlwZSBcIiR7Y29uZmlnLmRhdGEudHlwZX1cImApO1xuICAgIH1cblxuICAgIGRhdGEgPSBHZW9KU09OLmZyb20oY29uZmlnLmRhdGEuZm9ybWF0LCBkYXRhKTtcblxuICAgIC8vIFRPRE86IEltcGxlbWVudCBhIGJldHRlciB3YXkgZm9yIHByZXByb2Nlc3NpbmcgZ2VvanNvbiBkYXRhXG4gICAgaWYgKGRhdGEuZmVhdHVyZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBpbmRleCBpbiBkYXRhLmZlYXR1cmVzKSB7XG4gICAgICAgICAgICBjb25zdCBmZWF0dXJlID0gZGF0YS5mZWF0dXJlc1tpbmRleF07XG4gICAgICAgICAgICBpZiAoIWZlYXR1cmUucHJvcGVydGllcyB8fCAhZmVhdHVyZS5wcm9wZXJ0aWVzLmljb24pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29uZmlnLm1hcC5wcmVzZXRzLmljb25zW2ZlYXR1cmUucHJvcGVydGllcy5pY29uXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5vcHRpb25zLmljb24gPSBhd2FpdCBtYXBGYWN0b3J5LmNyZWF0ZUljb24oXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb25maWcubWFwLnByZXNldHMuaWNvbnNbZmVhdHVyZS5wcm9wZXJ0aWVzLmljb25dLFxuICAgICAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcG9pbnRUb0xheWVyQ2FsbGJhY2sgPSBjb25maWcub3B0aW9ucy5wb2ludFRvTGF5ZXJcbiAgICAgICAgPyBkZXRlcm1pbmVMaXN0ZW5lcihjb25maWcub3B0aW9ucy5wb2ludFRvTGF5ZXIsIGVsZW1lbnQpXG4gICAgICAgIDogcG9pbnRUb0xheWVyO1xuXG4gICAgY29uZmlnLm9wdGlvbnMucG9pbnRUb0xheWVyID0gKGZlYXR1cmUsIGxhdGxuZykgPT4gcG9pbnRUb0xheWVyQ2FsbGJhY2soZmVhdHVyZSwgbGF0bG5nLCBlbGVtZW50LCBwb2ludFRvTGF5ZXIpO1xuXG4gICAgY29uc3QgbGF5ZXIgPSBsZWFmbGV0Lmdlb0pTT04oZGF0YSwgY29uZmlnLm9wdGlvbnMpO1xuICAgIGJvdW5kc0xpc3RlbmVyKGxheWVyLCBlbGVtZW50Lm1hcCk7XG5cbiAgICByZXR1cm4gbGF5ZXI7XG59XG4iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9