(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["geojson"],{

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

/***/ 11:
/*!************************!*\
  !*** xmldom (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9nZW9qc29uL2luZGV4LmpzIiwid2VicGFjazovLy94bWxkb20gKGlnbm9yZWQpIl0sIm5hbWVzIjpbInBhcnNlWG1sIiwic3RyIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwicGFyc2VHcHgiLCJ0b0dlb0pTT04iLCJncHgiLCJwYXJzZUttbCIsImttbCIsInBhcnNlV2t0Iiwid2VsbGtub3duIiwicGFyc2VUb3BvSnNvbiIsImpzb24iLCJKU09OIiwicGFyc2UiLCJnZW9qc29uIiwidHlwZSIsImZlYXR1cmVzIiwiaSIsIm9iamVjdHMiLCJmZWF0dXJlIiwicGFyc2VUb3BvSnNvbkZlYXR1cmUiLCJwdXNoIiwiZnJvbSIsImZvcm1hdCIsInN0cmluZyIsIkVycm9yIiwiZnJvbUdweCIsImZyb21LbWwiLCJmcm9tV2t0IiwiZnJvbVRvcG9Kc29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUI7QUFDbkIsU0FBUSxJQUFJQyxTQUFKLEVBQUQsQ0FBa0JDLGVBQWxCLENBQWtDRixHQUFsQyxFQUF3QyxVQUF4QyxDQUFQO0FBQ0g7O0FBRUQsU0FBU0csUUFBVCxDQUFrQkgsR0FBbEIsRUFBdUI7QUFDbkIsU0FBT0ksd0RBQVMsQ0FBQ0MsR0FBVixDQUFjTixRQUFRLENBQUNDLEdBQUQsQ0FBdEIsQ0FBUDtBQUNIOztBQUVELFNBQVNNLFFBQVQsQ0FBa0JOLEdBQWxCLEVBQXVCO0FBQ25CLFNBQU9JLHdEQUFTLENBQUNHLEdBQVYsQ0FBY1IsUUFBUSxDQUFDQyxHQUFELENBQXRCLENBQVA7QUFDSDs7QUFFRCxTQUFTUSxRQUFULENBQWtCUixHQUFsQixFQUF1QjtBQUNuQixTQUFPUyxnREFBUyxDQUFDVCxHQUFELENBQWhCO0FBQ0g7O0FBRUQsU0FBU1UsYUFBVCxDQUF1QlYsR0FBdkIsRUFBNEI7QUFDeEIsTUFBTVcsSUFBSSxHQUFHLE9BQU9YLEdBQVAsS0FBZSxRQUFmLEdBQTBCWSxJQUFJLENBQUNDLEtBQUwsQ0FBV2IsR0FBWCxDQUExQixHQUE0Q0EsR0FBekQ7QUFDQSxNQUFNYyxPQUFPLEdBQUc7QUFBRUMsUUFBSSxFQUFFLG1CQUFSO0FBQTZCQyxZQUFRLEVBQUU7QUFBdkMsR0FBaEI7O0FBRUEsT0FBSyxJQUFJQyxDQUFULElBQWNOLElBQUksQ0FBQ08sT0FBbkIsRUFBNEI7QUFDeEIsUUFBSUMsT0FBTyxHQUFHQywrREFBb0IsQ0FBQ1QsSUFBRCxFQUFPQSxJQUFJLENBQUNPLE9BQUwsQ0FBYUQsQ0FBYixDQUFQLENBQWxDO0FBQ0FILFdBQU8sQ0FBQ0UsUUFBUixDQUFpQkssSUFBakIsQ0FBc0JGLE9BQXRCO0FBQ0g7O0FBRUQsU0FBT0wsT0FBUDtBQUNIOztBQUVNLFNBQVNRLElBQVQsQ0FBY0MsTUFBZCxFQUFzQkMsTUFBdEIsRUFBOEI7QUFDakMsVUFBUUQsTUFBUjtBQUNJLFNBQUssU0FBTDtBQUNJLGFBQU8sT0FBT0MsTUFBUCxLQUFrQixRQUFsQixHQUE2QlosSUFBSSxDQUFDQyxLQUFMLENBQVdXLE1BQVgsQ0FBN0IsR0FBa0RBLE1BQXpEOztBQUVKLFNBQUssS0FBTDtBQUNJLGFBQU9yQixRQUFRLENBQUNxQixNQUFELENBQWY7O0FBRUosU0FBSyxLQUFMO0FBQ0ksYUFBT2xCLFFBQVEsQ0FBQ2tCLE1BQUQsQ0FBZjs7QUFFSixTQUFLLEtBQUw7QUFDSSxhQUFPaEIsUUFBUSxDQUFDZ0IsTUFBRCxDQUFmOztBQUVKLFNBQUssVUFBTDtBQUNJLGFBQU9kLGFBQWEsQ0FBQ2MsTUFBRCxDQUFwQjs7QUFFSjtBQUNJLFlBQU0sSUFBSUMsS0FBSixvQkFBcUJGLE1BQXJCLHNCQUFOO0FBakJSO0FBbUJIO0FBRWM7QUFDWEQsTUFBSSxFQUFFQSxJQURLO0FBRVhJLFNBQU8sRUFBRXZCLFFBRkU7QUFHWHdCLFNBQU8sRUFBRXJCLFFBSEU7QUFJWHNCLFNBQU8sRUFBRXBCLFFBSkU7QUFLWHFCLGNBQVksRUFBRW5CO0FBTEgsQ0FBZixFOzs7Ozs7Ozs7OztBQ3REQSxlIiwiZmlsZSI6ImpzL2dlb2pzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmZWF0dXJlIGFzIHBhcnNlVG9wb0pzb25GZWF0dXJlIH0gZnJvbSBcInRvcG9qc29uLWNsaWVudFwiO1xuaW1wb3J0IHRvR2VvSlNPTiBmcm9tICdAbWFwYm94L3RvZ2VvanNvbic7XG5pbXBvcnQgd2VsbGtub3duIGZyb20gJ3dlbGxrbm93bic7XG5cbmZ1bmN0aW9uIHBhcnNlWG1sKHN0cikge1xuICAgIHJldHVybiAobmV3IERPTVBhcnNlcigpKS5wYXJzZUZyb21TdHJpbmcoc3RyLCAgJ3RleHQveG1sJyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlR3B4KHN0cikge1xuICAgIHJldHVybiB0b0dlb0pTT04uZ3B4KHBhcnNlWG1sKHN0cikpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUttbChzdHIpIHtcbiAgICByZXR1cm4gdG9HZW9KU09OLmttbChwYXJzZVhtbChzdHIpKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VXa3Qoc3RyKSB7XG4gICAgcmV0dXJuIHdlbGxrbm93bihzdHIpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRvcG9Kc29uKHN0cikge1xuICAgIGNvbnN0IGpzb24gPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2Uoc3RyKSA6IHN0cjtcbiAgICBjb25zdCBnZW9qc29uID0geyB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLCBmZWF0dXJlczogW10gfTtcblxuICAgIGZvciAodmFyIGkgaW4ganNvbi5vYmplY3RzKSB7XG4gICAgICAgIHZhciBmZWF0dXJlID0gcGFyc2VUb3BvSnNvbkZlYXR1cmUoanNvbiwganNvbi5vYmplY3RzW2ldKTtcbiAgICAgICAgZ2VvanNvbi5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgIH1cblxuICAgIHJldHVybiBnZW9qc29uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbShmb3JtYXQsIHN0cmluZykge1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICAgIGNhc2UgJ2dlb2pzb24nOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShzdHJpbmcpIDogc3RyaW5nO1xuXG4gICAgICAgIGNhc2UgJ2dweCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VHcHgoc3RyaW5nKTtcblxuICAgICAgICBjYXNlICdrbWwnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlS21sKHN0cmluZyk7XG5cbiAgICAgICAgY2FzZSAnd2t0JzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVdrdChzdHJpbmcpO1xuXG4gICAgICAgIGNhc2UgJ3RvcG9qc29uJzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVRvcG9Kc29uKHN0cmluZyk7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRm9ybWF0IFwiJHtmb3JtYXR9XCIgbm90IHN1cHBvcnRlZGApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGZyb206IGZyb20sXG4gICAgZnJvbUdweDogcGFyc2VHcHgsXG4gICAgZnJvbUttbDogcGFyc2VLbWwsXG4gICAgZnJvbVdrdDogcGFyc2VXa3QsXG4gICAgZnJvbVRvcG9Kc29uOiBwYXJzZVRvcG9Kc29uLFxufVxuIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==