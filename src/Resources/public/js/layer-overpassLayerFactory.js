(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layer-overpassLayerFactory"],{

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

/***/ }),

/***/ "./js/layer/overpassLayerFactory.js":
/*!******************************************!*\
  !*** ./js/layer/overpassLayerFactory.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _OverpassLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OverpassLayer */ "./js/layer/OverpassLayer.js");



/* harmony default export */ __webpack_exports__["default"] = (function (_x, _x2) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config, element) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new _OverpassLayer__WEBPACK_IMPORTED_MODULE_2__["default"](config.options));

          case 1:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9sYXllci9PdmVycGFzc0xheWVyLmpzIiwid2VicGFjazovLy8uL2pzL2xheWVyL292ZXJwYXNzTGF5ZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbInRvT3ZlcnBhc3NCQm94U3RyaW5nIiwiTGF0TG5nQm91bmRzIiwiYSIsIl9zb3V0aFdlc3QiLCJiIiwiX25vcnRoRWFzdCIsImxhdCIsImxuZyIsImpvaW4iLCJsZWFmbGV0IiwiRmVhdHVyZUdyb3VwIiwiZXh0ZW5kIiwib3B0aW9ucyIsIm1pblpvb20iLCJlbmRwb2ludCIsInF1ZXJ5IiwiYW1lbml0eUljb25zIiwiaW5pdGlhbGl6ZSIsInBvaW50VG9MYXllciIsIm9uRWFjaEZlYXR1cmUiLCJVdGlsIiwic2V0T3B0aW9ucyIsImR5bmFtaWNMb2FkIiwibWF0Y2giLCJfbGF5ZXIiLCJnZW9Kc29uIiwiX2xheWVycyIsImFkZExheWVyIiwicmVmcmVzaERhdGEiLCJfbWFwIiwiZ2V0Wm9vbSIsImJvdW5kcyIsImdldEJvdW5kcyIsInJlcGxhY2UiLCJ1cmwiLCJmaXJlIiwibGF5ZXIiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwiZmVhdHVyZXMiLCJvc210b2dlb2pzb24iLCJiaW5kIiwicmVtb3ZlTGF5ZXIiLCJib3VuZHNNb2RlIiwiaXNWYWxpZCIsImZpdEJvdW5kcyIsImdldEJvdW5kc09wdGlvbnMiLCJvbkFkZCIsIm1hcCIsIm9uIiwiZmVhdHVyZSIsImxhdGxuZyIsInR5cGUiLCJpY29uIiwibWFya2VyIiwicHJvcGVydGllcyIsInJhZGl1cyIsInNldFJhZGl1cyIsImdldEljb24iLCJ0YWdzIiwiYW1lbml0eSIsInNldEljb24iLCJvdmVycGFzc1BvcHVwIiwiYmluZFBvcHVwIiwiY29uZmlnIiwiZWxlbWVudCIsIk92ZXJwYXNzTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBOzs7Ozs7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QWFDLFVBQWIsQ0FBd0JlLEtBQXhCLEVBQStCaUIsT0FBTyxDQUFDSyxVQUFSLENBQW1COUMsT0FBbEQ7O0FBRUEsVUFBSSxLQUFLQSxPQUFMLENBQWFxRCxhQUFqQixFQUFnQztBQUM1QjdCLGFBQUssQ0FBQzhCLFNBQU4sQ0FBZ0IsS0FBS3RELE9BQUwsQ0FBYXFELGFBQWIsQ0FBMkJaLE9BQTNCLEVBQW9DakIsS0FBcEMsQ0FBaEI7QUFDSDs7QUFFRCxXQUFLUCxJQUFMLENBQVVNLElBQVYsQ0FBZSxlQUFmLEVBQWdDO0FBQUNrQixlQUFPLEVBQUVBLE9BQVY7QUFBbUJqQixhQUFLLEVBQUVBO0FBQTFCLE9BQWhDO0FBQ0g7QUFDSjtBQXhIc0MsQ0FBNUIsQ0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUVlO0FBQWY7QUFBQTs7OzZLQUFlLGlCQUFnQitCLE1BQWhCLEVBQXdCQyxPQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkNBQ0osSUFBSUMsc0RBQUosQ0FBa0JGLE1BQU0sQ0FBQ3ZELE9BQXpCLENBREk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJqcy9sYXllci1vdmVycGFzc0xheWVyRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsZWFmbGV0IGZyb20gJy4uL2xlYWZsZXQnO1xuaW1wb3J0IG9zbXRvZ2VvanNvbiBmcm9tIFwib3NtdG9nZW9qc29uXCI7XG5cbi8qKlxuICogR2V0IHRoZSBib3VuZHMgYXMgb3ZlcnBhc3MgYmJveCBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gdG9PdmVycGFzc0JCb3hTdHJpbmcgKExhdExuZ0JvdW5kcykge1xuICAgIHZhciBhID0gTGF0TG5nQm91bmRzLl9zb3V0aFdlc3QsXG4gICAgICAgIGIgPSBMYXRMbmdCb3VuZHMuX25vcnRoRWFzdDtcblxuICAgIHJldHVybiBbYS5sYXQsIGEubG5nLCBiLmxhdCwgYi5sbmddLmpvaW4oXCIsXCIpO1xufVxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBvdmVycGFzcyBsYXllci4gSGVhdmlseSBpbnNwaXJlZCBieVxuICogaHR0cHM6Ly9naXRodWIuY29tL2thcnRlbmthcnN0ZW4vbGVhZmxldC1sYXllci1vdmVycGFzcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgbGVhZmxldC5GZWF0dXJlR3JvdXAuZXh0ZW5kKHtcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIG1pblpvb206IDAsXG4gICAgICAgIGVuZHBvaW50OiAnLy9vdmVycGFzcy1hcGkuZGUvYXBpLycsXG4gICAgICAgIHF1ZXJ5OiAnKG5vZGUoQkJPWClbb3JnYW5pY107bm9kZShCQk9YKVtzZWNvbmRfaGFuZF07KTtvdXQgcXQ7JyxcbiAgICAgICAgYW1lbml0eUljb25zOiB7fVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5wb2ludFRvTGF5ZXIpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucG9pbnRUb0xheWVyID0gdGhpcy5wb2ludFRvTGF5ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpb25zLm9uRWFjaEZlYXR1cmUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMub25FYWNoRmVhdHVyZSA9IHRoaXMub25FYWNoRmVhdHVyZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxlYWZsZXQuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLm9wdGlvbnMuZHluYW1pY0xvYWQgPSAhIXRoaXMub3B0aW9ucy5xdWVyeS5tYXRjaCgvQkJPWC9nKTtcblxuICAgICAgICB0aGlzLl9sYXllciAgPSBsZWFmbGV0Lmdlb0pzb24oKTtcbiAgICAgICAgdGhpcy5fbGF5ZXJzID0ge307XG5cbiAgICAgICAgdGhpcy5hZGRMYXllcih0aGlzLl9sYXllcik7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZWZyZXNoIHRoZSBkYXRhIG9mIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIFRPRE86IEltcGxlbWVudCBzb21lIGNhY2hpbmcuXG4gICAgICovXG4gICAgcmVmcmVzaERhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcC5nZXRab29tKCkgPCB0aGlzLm9wdGlvbnMubWluWm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJvdW5kcyA9IHRvT3ZlcnBhc3NCQm94U3RyaW5nKHRoaXMuX21hcC5nZXRCb3VuZHMoKSk7XG4gICAgICAgIHZhciBxdWVyeSAgPSB0aGlzLm9wdGlvbnMucXVlcnkucmVwbGFjZSgvKEJCT1gpL2csIGJvdW5kcyk7XG4gICAgICAgIHZhciB1cmwgICAgPSB0aGlzLm9wdGlvbnMuZW5kcG9pbnQgKyBcImludGVycHJldGVyP2RhdGE9W291dDpqc29uXTtcIiArIHF1ZXJ5O1xuXG4gICAgICAgIHRoaXMuX21hcC5maXJlKCdkYXRhbG9hZGluZycsIHtsYXllcjogdGhpc30pO1xuXG4gICAgICAgIGZldGNoKHVybCkudGhlbihhc3luYyBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciBkYXRhICAgICA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHZhciBmZWF0dXJlcyA9IG9zbXRvZ2VvanNvbihkYXRhKTtcbiAgICAgICAgICAgIHZhciBsYXllciAgICA9IGxlYWZsZXQuZ2VvSnNvbihmZWF0dXJlcywge1xuICAgICAgICAgICAgICAgIHBvaW50VG9MYXllcjogdGhpcy5vcHRpb25zLnBvaW50VG9MYXllci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIG9uRWFjaEZlYXR1cmU6IHRoaXMub3B0aW9ucy5vbkVhY2hGZWF0dXJlLmJpbmQodGhpcylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKGxheWVyKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXIodGhpcy5fbGF5ZXIpO1xuICAgICAgICAgICAgdGhpcy5fbGF5ZXIgPSBsYXllcjtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5ib3VuZHNNb2RlID09PSAnZXh0ZW5kJyAmJiBsYXllci5nZXRCb3VuZHMoKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldEJvdW5kcygpO1xuICAgICAgICAgICAgICAgIGJvdW5kcyAgICAgPSBib3VuZHMuZXh0ZW5kKGxheWVyLmdldEJvdW5kcygpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX21hcC5maXRCb3VuZHMoYm91bmRzLCB0aGlzLl9tYXAuZ2V0Qm91bmRzT3B0aW9ucygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbWFwLmZpcmUoJ2RhdGFsb2FkJywge2xheWVyOiB0aGlzfSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWFwXG4gICAgICovXG4gICAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgLy8gVE9ETzogTWFrZSBpdCBjb25maWd1cmFibGVcbiAgICAgICAgbWFwLm9uKCdtb3ZlZW5kJywgdGhpcy5yZWZyZXNoRGF0YSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YSgpO1xuICAgIH0sXG4gICAgcG9pbnRUb0xheWVyOiBmdW5jdGlvbiAoZmVhdHVyZSwgbGF0bG5nKSB7XG4gICAgICAgIHZhciB0eXBlICAgPSAnbWFya2VyJztcbiAgICAgICAgdmFyIGljb24gICA9IG51bGw7XG4gICAgICAgIHZhciBtYXJrZXIgPSBsZWFmbGV0Lm1hcmtlcihsYXRsbmcsIGZlYXR1cmUucHJvcGVydGllcy5vcHRpb25zKTtcblxuICAgICAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnJhZGl1cykge1xuICAgICAgICAgICAgICAgIG1hcmtlci5zZXRSYWRpdXMoZmVhdHVyZS5wcm9wZXJ0aWVzLnJhZGl1cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE86IEljb24gaGFuZGxpbmdcbiAgICAgICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMuaWNvbikge1xuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLl9tYXAuZ2V0SWNvbihmZWF0dXJlLnByb3BlcnRpZXMuaWNvbik7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnRhZ3NcbiAgICAgICAgICAgICAgICAmJiBmZWF0dXJlLnByb3BlcnRpZXMudGFncy5hbWVuaXR5XG4gICAgICAgICAgICAgICAgJiYgdGhpcy5vcHRpb25zLmFtZW5pdHlJY29uc1tmZWF0dXJlLnByb3BlcnRpZXMudGFncy5hbWVuaXR5XVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy9pY29uID0gTC5jb250YW8uZ2V0SWNvbih0aGlzLm9wdGlvbnMuYW1lbml0eUljb25zW2ZlYXR1cmUucHJvcGVydGllcy50YWdzLmFtZW5pdHldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETzogSWNvbiBoYW5kbGluZ1xuICAgICAgICAgICAgaWYgKGljb24pIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIuc2V0SWNvbihpY29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcnBhc3NQb3B1cCkge1xuICAgICAgICAgICAgbWFya2VyLmJpbmRQb3B1cCh0aGlzLm9wdGlvbnMub3ZlcnBhc3NQb3B1cChmZWF0dXJlLCBtYXJrZXIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21hcC5maXJlKCdwb2ludDphZGRlZCcsIHttYXJrZXI6IG1hcmtlciwgZmVhdHVyZTogZmVhdHVyZSwgbGF0bG5nOiBsYXRsbmcsIHR5cGU6IHR5cGV9KTtcblxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH0sXG4gICAgb25FYWNoRmVhdHVyZTogZnVuY3Rpb24gKGZlYXR1cmUsIGxheWVyKSB7XG4gICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGxlYWZsZXQuVXRpbC5zZXRPcHRpb25zKGxheWVyLCBmZWF0dXJlLnByb3BlcnRpZXMub3B0aW9ucyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcnBhc3NQb3B1cCkge1xuICAgICAgICAgICAgICAgIGxheWVyLmJpbmRQb3B1cCh0aGlzLm9wdGlvbnMub3ZlcnBhc3NQb3B1cChmZWF0dXJlLCBsYXllcikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9tYXAuZmlyZSgnZmVhdHVyZTphZGRlZCcsIHtmZWF0dXJlOiBmZWF0dXJlLCBsYXllcjogbGF5ZXJ9KTtcbiAgICAgICAgfVxuICAgIH0sXG59KTtcbiIsImltcG9ydCBPdmVycGFzc0xheWVyIGZyb20gXCIuL092ZXJwYXNzTGF5ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKGNvbmZpZywgZWxlbWVudCkge1xuICAgIHJldHVybiBuZXcgT3ZlcnBhc3NMYXllcihjb25maWcub3B0aW9ucyk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9