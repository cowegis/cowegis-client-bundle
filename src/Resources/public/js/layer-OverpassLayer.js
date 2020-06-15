(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layer-OverpassLayer"],{

/***/ "./js/layer/OverpassLayer.js":
/*!***********************************!*\
  !*** ./js/layer/OverpassLayer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../leaflet */ "./js/leaflet/index.js");
/* harmony import */ var osmtogeojson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! osmtogeojson */ "./node_modules/osmtogeojson/index.js");
/* harmony import */ var osmtogeojson__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(osmtogeojson__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Get the bounds as overpass bbox string.
 *
 * @returns {string}
 */

function toOverpassBBoxString(LatLngBounds) {
  var a = LatLngBounds._southWest,
      b = LatLngBounds._northEast;
  return [a.lat, a.lng, b.lat, b.lng].join(",");
}
/**
 * Implementation of the overpass layer. Heavily inspired by
 * https://github.com/kartenkarsten/leaflet-layer-overpass.
 */


/* harmony default export */ __webpack_exports__["default"] = (_leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].FeatureGroup.extend({
  options: {
    minZoom: 0,
    endpoint: '//overpass-api.de/api/',
    query: '(node(BBOX)[organic];node(BBOX)[second_hand];);out qt;',
    amenityIcons: {}
  },

  /**
   * Initialize the layer.
   *
   * @param options
   */
  initialize: function initialize(options) {
    if (!options.pointToLayer) {
      options.pointToLayer = this.pointToLayer;
    }

    if (!options.onEachFeature) {
      options.onEachFeature = this.onEachFeature;
    }

    _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].Util.setOptions(this, options);
    this.options.dynamicLoad = !!this.options.query.match(/BBOX/g);
    this._layer = _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].geoJson();
    this._layers = {};
    this.addLayer(this._layer);
  },

  /**
   * Refresh the data of the layer.
   *
   * TODO: Implement some caching.
   */
  refreshData: function refreshData() {
    if (this._map.getZoom() < this.options.minZoom) {
      return;
    }

    var bounds = toOverpassBBoxString(this._map.getBounds());
    var query = this.options.query.replace(/(BBOX)/g, bounds);
    var url = this.options.endpoint + "interpreter?data=[out:json];" + query;

    this._map.fire('dataloading', {
      layer: this
    });

    fetch(url).then( /*#__PURE__*/function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(response) {
        var data, features, layer, bounds;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return response.json();

              case 2:
                data = _context.sent;
                features = osmtogeojson__WEBPACK_IMPORTED_MODULE_3___default()(data);
                layer = _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].geoJson(features, {
                  pointToLayer: this.options.pointToLayer.bind(this),
                  onEachFeature: this.options.onEachFeature.bind(this)
                });
                this.addLayer(layer);
                this.removeLayer(this._layer);
                this._layer = layer;

                if (this.options.boundsMode === 'extend' && layer.getBounds().isValid()) {
                  bounds = this._map.getBounds();
                  bounds = bounds.extend(layer.getBounds());

                  this._map.fitBounds(bounds, this._map.getBoundsOptions());
                }

                this._map.fire('dataload', {
                  layer: this
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }().bind(this));
  },

  /**
   * @param map
   */
  onAdd: function onAdd(map) {
    // TODO: Make it configurable
    map.on('moveend', this.refreshData, this);
    this.refreshData();
  },
  pointToLayer: function pointToLayer(feature, latlng) {
    var type = 'marker';
    var icon = null;
    var marker = _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].marker(latlng, feature.properties.options);

    if (feature.properties) {
      if (feature.properties.radius) {
        marker.setRadius(feature.properties.radius);
      } // TODO: Icon handling


      if (feature.properties.icon) {
        icon = this._map.getIcon(feature.properties.icon);
      } else if (feature.properties.tags && feature.properties.tags.amenity && this.options.amenityIcons[feature.properties.tags.amenity]) {} //icon = L.contao.getIcon(this.options.amenityIcons[feature.properties.tags.amenity]);
      // TODO: Icon handling


      if (icon) {
        marker.setIcon(icon);
      }
    }

    if (this.options.overpassPopup) {
      marker.bindPopup(this.options.overpassPopup(feature, marker));
    }

    this._map.fire('point:added', {
      marker: marker,
      feature: feature,
      latlng: latlng,
      type: type
    });

    return marker;
  },
  onEachFeature: function onEachFeature(feature, layer) {
    if (feature.properties) {
      _leaflet__WEBPACK_IMPORTED_MODULE_2__["default"].Util.setOptions(layer, feature.properties.options);

      if (this.options.overpassPopup) {
        layer.bindPopup(this.options.overpassPopup(feature, layer));
      }

      this._map.fire('feature:added', {
        feature: feature,
        layer: layer
      });
    }
  }
}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9sYXllci9PdmVycGFzc0xheWVyLmpzIl0sIm5hbWVzIjpbInRvT3ZlcnBhc3NCQm94U3RyaW5nIiwiTGF0TG5nQm91bmRzIiwiYSIsIl9zb3V0aFdlc3QiLCJiIiwiX25vcnRoRWFzdCIsImxhdCIsImxuZyIsImpvaW4iLCJsZWFmbGV0IiwiRmVhdHVyZUdyb3VwIiwiZXh0ZW5kIiwib3B0aW9ucyIsIm1pblpvb20iLCJlbmRwb2ludCIsInF1ZXJ5IiwiYW1lbml0eUljb25zIiwiaW5pdGlhbGl6ZSIsInBvaW50VG9MYXllciIsIm9uRWFjaEZlYXR1cmUiLCJVdGlsIiwic2V0T3B0aW9ucyIsImR5bmFtaWNMb2FkIiwibWF0Y2giLCJfbGF5ZXIiLCJnZW9Kc29uIiwiX2xheWVycyIsImFkZExheWVyIiwicmVmcmVzaERhdGEiLCJfbWFwIiwiZ2V0Wm9vbSIsImJvdW5kcyIsImdldEJvdW5kcyIsInJlcGxhY2UiLCJ1cmwiLCJmaXJlIiwibGF5ZXIiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwiZmVhdHVyZXMiLCJvc210b2dlb2pzb24iLCJiaW5kIiwicmVtb3ZlTGF5ZXIiLCJib3VuZHNNb2RlIiwiaXNWYWxpZCIsImZpdEJvdW5kcyIsImdldEJvdW5kc09wdGlvbnMiLCJvbkFkZCIsIm1hcCIsIm9uIiwiZmVhdHVyZSIsImxhdGxuZyIsInR5cGUiLCJpY29uIiwibWFya2VyIiwicHJvcGVydGllcyIsInJhZGl1cyIsInNldFJhZGl1cyIsImdldEljb24iLCJ0YWdzIiwiYW1lbml0eSIsInNldEljb24iLCJvdmVycGFzc1BvcHVwIiwiYmluZFBvcHVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQTs7Ozs7O0FBS0EsU0FBU0Esb0JBQVQsQ0FBK0JDLFlBQS9CLEVBQTZDO0FBQ3pDLE1BQUlDLENBQUMsR0FBR0QsWUFBWSxDQUFDRSxVQUFyQjtBQUFBLE1B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QUFhcUQsYUFBakIsRUFBZ0M7QUFDNUI3QixhQUFLLENBQUM4QixTQUFOLENBQWdCLEtBQUt0RCxPQUFMLENBQWFxRCxhQUFiLENBQTJCWixPQUEzQixFQUFvQ2pCLEtBQXBDLENBQWhCO0FBQ0g7O0FBRUQsV0FBS1AsSUFBTCxDQUFVTSxJQUFWLENBQWUsZUFBZixFQUFnQztBQUFDa0IsZUFBTyxFQUFFQSxPQUFWO0FBQW1CakIsYUFBSyxFQUFFQTtBQUExQixPQUFoQztBQUNIO0FBQ0o7QUF4SHNDLENBQTVCLENBQWYsRSIsImZpbGUiOiJqcy9sYXllci1PdmVycGFzc0xheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxlYWZsZXQgZnJvbSAnLi4vbGVhZmxldCc7XG5pbXBvcnQgb3NtdG9nZW9qc29uIGZyb20gXCJvc210b2dlb2pzb25cIjtcblxuLyoqXG4gKiBHZXQgdGhlIGJvdW5kcyBhcyBvdmVycGFzcyBiYm94IHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB0b092ZXJwYXNzQkJveFN0cmluZyAoTGF0TG5nQm91bmRzKSB7XG4gICAgdmFyIGEgPSBMYXRMbmdCb3VuZHMuX3NvdXRoV2VzdCxcbiAgICAgICAgYiA9IExhdExuZ0JvdW5kcy5fbm9ydGhFYXN0O1xuXG4gICAgcmV0dXJuIFthLmxhdCwgYS5sbmcsIGIubGF0LCBiLmxuZ10uam9pbihcIixcIik7XG59XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIG92ZXJwYXNzIGxheWVyLiBIZWF2aWx5IGluc3BpcmVkIGJ5XG4gKiBodHRwczovL2dpdGh1Yi5jb20va2FydGVua2Fyc3Rlbi9sZWFmbGV0LWxheWVyLW92ZXJwYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBsZWFmbGV0LkZlYXR1cmVHcm91cC5leHRlbmQoe1xuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgbWluWm9vbTogMCxcbiAgICAgICAgZW5kcG9pbnQ6ICcvL292ZXJwYXNzLWFwaS5kZS9hcGkvJyxcbiAgICAgICAgcXVlcnk6ICcobm9kZShCQk9YKVtvcmdhbmljXTtub2RlKEJCT1gpW3NlY29uZF9oYW5kXTspO291dCBxdDsnLFxuICAgICAgICBhbWVuaXR5SWNvbnM6IHt9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBvaW50VG9MYXllcikge1xuICAgICAgICAgICAgb3B0aW9ucy5wb2ludFRvTGF5ZXIgPSB0aGlzLnBvaW50VG9MYXllcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMub25FYWNoRmVhdHVyZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkVhY2hGZWF0dXJlID0gdGhpcy5vbkVhY2hGZWF0dXJlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGVhZmxldC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5keW5hbWljTG9hZCA9ICEhdGhpcy5vcHRpb25zLnF1ZXJ5Lm1hdGNoKC9CQk9YL2cpO1xuXG4gICAgICAgIHRoaXMuX2xheWVyICA9IGxlYWZsZXQuZ2VvSnNvbigpO1xuICAgICAgICB0aGlzLl9sYXllcnMgPSB7fTtcblxuICAgICAgICB0aGlzLmFkZExheWVyKHRoaXMuX2xheWVyKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggdGhlIGRhdGEgb2YgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogVE9ETzogSW1wbGVtZW50IHNvbWUgY2FjaGluZy5cbiAgICAgKi9cbiAgICByZWZyZXNoRGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fbWFwLmdldFpvb20oKSA8IHRoaXMub3B0aW9ucy5taW5ab29tKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYm91bmRzID0gdG9PdmVycGFzc0JCb3hTdHJpbmcodGhpcy5fbWFwLmdldEJvdW5kcygpKTtcbiAgICAgICAgdmFyIHF1ZXJ5ICA9IHRoaXMub3B0aW9ucy5xdWVyeS5yZXBsYWNlKC8oQkJPWCkvZywgYm91bmRzKTtcbiAgICAgICAgdmFyIHVybCAgICA9IHRoaXMub3B0aW9ucy5lbmRwb2ludCArIFwiaW50ZXJwcmV0ZXI/ZGF0YT1bb3V0Ompzb25dO1wiICsgcXVlcnk7XG5cbiAgICAgICAgdGhpcy5fbWFwLmZpcmUoJ2RhdGFsb2FkaW5nJywge2xheWVyOiB0aGlzfSk7XG5cbiAgICAgICAgZmV0Y2godXJsKS50aGVuKGFzeW5jIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgICAgID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgdmFyIGZlYXR1cmVzID0gb3NtdG9nZW9qc29uKGRhdGEpO1xuICAgICAgICAgICAgdmFyIGxheWVyICAgID0gbGVhZmxldC5nZW9Kc29uKGZlYXR1cmVzLCB7XG4gICAgICAgICAgICAgICAgcG9pbnRUb0xheWVyOiB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgb25FYWNoRmVhdHVyZTogdGhpcy5vcHRpb25zLm9uRWFjaEZlYXR1cmUuYmluZCh0aGlzKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVMYXllcih0aGlzLl9sYXllcik7XG4gICAgICAgICAgICB0aGlzLl9sYXllciA9IGxheWVyO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJvdW5kc01vZGUgPT09ICdleHRlbmQnICYmIGxheWVyLmdldEJvdW5kcygpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgICAgICAgYm91bmRzICAgICA9IGJvdW5kcy5leHRlbmQobGF5ZXIuZ2V0Qm91bmRzKCkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwLmZpdEJvdW5kcyhib3VuZHMsIHRoaXMuX21hcC5nZXRCb3VuZHNPcHRpb25zKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9tYXAuZmlyZSgnZGF0YWxvYWQnLCB7bGF5ZXI6IHRoaXN9KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtYXBcbiAgICAgKi9cbiAgICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAvLyBUT0RPOiBNYWtlIGl0IGNvbmZpZ3VyYWJsZVxuICAgICAgICBtYXAub24oJ21vdmVlbmQnLCB0aGlzLnJlZnJlc2hEYXRhLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKCk7XG4gICAgfSxcbiAgICBwb2ludFRvTGF5ZXI6IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXRsbmcpIHtcbiAgICAgICAgdmFyIHR5cGUgICA9ICdtYXJrZXInO1xuICAgICAgICB2YXIgaWNvbiAgID0gbnVsbDtcbiAgICAgICAgdmFyIG1hcmtlciA9IGxlYWZsZXQubWFya2VyKGxhdGxuZywgZmVhdHVyZS5wcm9wZXJ0aWVzLm9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMucmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgbWFya2VyLnNldFJhZGl1cyhmZWF0dXJlLnByb3BlcnRpZXMucmFkaXVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETzogSWNvbiBoYW5kbGluZ1xuICAgICAgICAgICAgaWYgKGZlYXR1cmUucHJvcGVydGllcy5pY29uKSB7XG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuX21hcC5nZXRJY29uKGZlYXR1cmUucHJvcGVydGllcy5pY29uKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChmZWF0dXJlLnByb3BlcnRpZXMudGFnc1xuICAgICAgICAgICAgICAgICYmIGZlYXR1cmUucHJvcGVydGllcy50YWdzLmFtZW5pdHlcbiAgICAgICAgICAgICAgICAmJiB0aGlzLm9wdGlvbnMuYW1lbml0eUljb25zW2ZlYXR1cmUucHJvcGVydGllcy50YWdzLmFtZW5pdHldXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvL2ljb24gPSBMLmNvbnRhby5nZXRJY29uKHRoaXMub3B0aW9ucy5hbWVuaXR5SWNvbnNbZmVhdHVyZS5wcm9wZXJ0aWVzLnRhZ3MuYW1lbml0eV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPOiBJY29uIGhhbmRsaW5nXG4gICAgICAgICAgICBpZiAoaWNvbikge1xuICAgICAgICAgICAgICAgIG1hcmtlci5zZXRJY29uKGljb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVycGFzc1BvcHVwKSB7XG4gICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHRoaXMub3B0aW9ucy5vdmVycGFzc1BvcHVwKGZlYXR1cmUsIG1hcmtlcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbWFwLmZpcmUoJ3BvaW50OmFkZGVkJywge21hcmtlcjogbWFya2VyLCBmZWF0dXJlOiBmZWF0dXJlLCBsYXRsbmc6IGxhdGxuZywgdHlwZTogdHlwZX0pO1xuXG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfSxcbiAgICBvbkVhY2hGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgbGF5ZXIpIHtcbiAgICAgICAgaWYgKGZlYXR1cmUucHJvcGVydGllcykge1xuICAgICAgICAgICAgbGVhZmxldC5VdGlsLnNldE9wdGlvbnMobGF5ZXIsIGZlYXR1cmUucHJvcGVydGllcy5vcHRpb25zKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVycGFzc1BvcHVwKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIuYmluZFBvcHVwKHRoaXMub3B0aW9ucy5vdmVycGFzc1BvcHVwKGZlYXR1cmUsIGxheWVyKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX21hcC5maXJlKCdmZWF0dXJlOmFkZGVkJywge2ZlYXR1cmU6IGZlYXR1cmUsIGxheWVyOiBsYXllcn0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==