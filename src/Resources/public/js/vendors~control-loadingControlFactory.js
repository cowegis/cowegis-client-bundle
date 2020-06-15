(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~control-loadingControlFactory"],{

/***/ "./node_modules/leaflet-loading/src/Control.Loading.js":
/*!*************************************************************!*\
  !*** ./node_modules/leaflet-loading/src/Control.Loading.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * L.Control.Loading is a control that shows a loading indicator when tiles are
 * loading or when map-related AJAX requests are taking place.
 */

(function () {

    var console = window.console || {
        error: function () {},
        warn: function () {}
    };

    function defineLeafletLoading(L) {
        L.Control.Loading = L.Control.extend({
            options: {
                delayIndicator: null,
                position: 'topleft',
                separate: false,
                zoomControl: null,
                spinjs: false,
                spin: { 
                    lines: 7, 
                    length: 3, 
                    width: 3, 
                    radius: 5, 
                    rotate: 13, 
                    top: "83%"
                }
            },

            initialize: function(options) {
                L.setOptions(this, options);
                this._dataLoaders = {};

                // Try to set the zoom control this control is attached to from the 
                // options
                if (this.options.zoomControl !== null) {
                    this.zoomControl = this.options.zoomControl;
                }
            },

            onAdd: function(map) {
                if (this.options.spinjs && (typeof Spinner !== 'function')) {
                    return console.error("Leaflet.loading cannot load because you didn't load spin.js (http://fgnass.github.io/spin.js/), even though you set it in options.");
                }
                this._addLayerListeners(map);
                this._addMapListeners(map);

                // Try to set the zoom control this control is attached to from the map
                // the control is being added to
                if (!this.options.separate && !this.zoomControl) {
                    if (map.zoomControl) {
                        this.zoomControl = map.zoomControl;
                    } else if (map.zoomsliderControl) {
                        this.zoomControl = map.zoomsliderControl;
                    }
                }

                // Create the loading indicator
                var classes = 'leaflet-control-loading';
                var container;
                if (this.zoomControl && !this.options.separate) {
                    // If there is a zoom control, hook into the bottom of it
                    container = this.zoomControl._container;
                    // These classes are no longer used as of Leaflet 0.6
                    classes += ' leaflet-bar-part-bottom leaflet-bar-part last';

                    // Loading control will be added to the zoom control. So the visible last element is not the
                    // last dom element anymore. So add the part-bottom class.
                    L.DomUtil.addClass(this._getLastControlButton(), 'leaflet-bar-part-bottom');
                }
                else {
                    // Otherwise, create a container for the indicator
                    container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-control-layer-container leaflet-bar');
                }
                this._indicatorContainer = container;
                this._indicator = L.DomUtil.create('a', classes, container);
                if (this.options.spinjs) {
                    this._spinner = new Spinner(this.options.spin).spin();
                    this._indicator.appendChild(this._spinner.el);
                }
                return container;
            },

            onRemove: function(map) {
                this._removeLayerListeners(map);
                this._removeMapListeners(map);
            },

            removeFrom: function (map) {
                if (this.zoomControl && !this.options.separate) {
                    // Override Control.removeFrom() to avoid clobbering the entire
                    // _container, which is the same as zoomControl's
                    this._container.removeChild(this._indicator);
                    this._map = null;
                    this.onRemove(map);
                    return this;
                }
                else {
                    // If this control is separate from the zoomControl, call the
                    // parent method so we don't leave behind an empty container
                    return L.Control.prototype.removeFrom.call(this, map);
                }
            },

            addLoader: function(id) {
                this._dataLoaders[id] = true;
                if (this.options.delayIndicator && !this.delayIndicatorTimeout) {
                    // If we are delaying showing the indicator and we're not
                    // already waiting for that delay, set up a timeout.
                    var that = this;
                    this.delayIndicatorTimeout = setTimeout(function () {
                        that.updateIndicator();
                        that.delayIndicatorTimeout = null;
                    }, this.options.delayIndicator);
                }
                else {
                    // Otherwise show the indicator immediately
                    this.updateIndicator();
                }
            },

            removeLoader: function(id) {
                delete this._dataLoaders[id];
                this.updateIndicator();

                // If removing this loader means we're in no danger of loading,
                // clear the timeout. This prevents old delays from instantly 
                // triggering the indicator.
                if (this.options.delayIndicator && this.delayIndicatorTimeout && !this.isLoading()) {
                    clearTimeout(this.delayIndicatorTimeout);
                    this.delayIndicatorTimeout = null;
                }
            },

            updateIndicator: function() {
                if (this.isLoading()) {
                    this._showIndicator();
                }
                else {
                    this._hideIndicator();
                }
            },

            isLoading: function() {
                return this._countLoaders() > 0;
            },

            _countLoaders: function() {
                var size = 0, key;
                for (key in this._dataLoaders) {
                    if (this._dataLoaders.hasOwnProperty(key)) size++;
                }
                return size;
            },

            _showIndicator: function() {
                // Show loading indicator
                L.DomUtil.addClass(this._indicator, 'is-loading');
                L.DomUtil.addClass(this._indicatorContainer, 'is-loading');

                // If zoomControl exists, make the zoom-out button not last
                if (!this.options.separate) {
                    if (this.zoomControl instanceof L.Control.Zoom) {
                        L.DomUtil.removeClass(this._getLastControlButton(), 'leaflet-bar-part-bottom');
                    }
                    else if (typeof L.Control.Zoomslider === 'function' && this.zoomControl instanceof L.Control.Zoomslider) {
                        L.DomUtil.removeClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
                    }
                }
            },

            _hideIndicator: function() {
                // Hide loading indicator
                L.DomUtil.removeClass(this._indicator, 'is-loading');
                L.DomUtil.removeClass(this._indicatorContainer, 'is-loading');

                // If zoomControl exists, make the zoom-out button last
                if (!this.options.separate) {
                    if (this.zoomControl instanceof L.Control.Zoom) {
                        L.DomUtil.addClass(this._getLastControlButton(), 'leaflet-bar-part-bottom');
                    }
                    else if (typeof L.Control.Zoomslider === 'function' && this.zoomControl instanceof L.Control.Zoomslider) {
                        L.DomUtil.addClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
                    }
                }
            },

            _getLastControlButton: function() {
                var container = this.zoomControl._container,
                    index = container.children.length - 1;

                // Find the last visible control button that is not our loading
                // indicator
                while (index > 0) {
                    var button = container.children[index];
                    if (!(this._indicator === button || button.offsetWidth === 0 || button.offsetHeight === 0)) {
                        break;
                    }
                    index--;
                }

                return container.children[index];
            },

            _handleLoading: function(e) {
                this.addLoader(this.getEventId(e));
            },

            _handleBaseLayerChange: function (e) {
                var that = this;

                // Check for a target 'layer' that contains multiple layers, such as
                // L.LayerGroup. This will happen if you have an L.LayerGroup in an
                // L.Control.Layers.
                if (e.layer && e.layer.eachLayer && typeof e.layer.eachLayer === 'function') {
                    e.layer.eachLayer(function (layer) {
                        that._handleBaseLayerChange({ layer: layer });
                    });
                }
                else {
                    // If we're changing to a canvas layer, don't handle loading
                    // as canvas layers will not fire load events.
                    if (!(L.TileLayer.Canvas && e.layer instanceof L.TileLayer.Canvas)) {
                        that._handleLoading(e);
                    }
                }
            },

            _handleLoad: function(e) {
                this.removeLoader(this.getEventId(e));
            },

            getEventId: function(e) {
                if (e.id) {
                    return e.id;
                }
                else if (e.layer) {
                    return e.layer._leaflet_id;
                }
                return e.target._leaflet_id;
            },

            _layerAdd: function(e) {
                if (!e.layer || !e.layer.on) return
                try {
                    e.layer.on({
                        loading: this._handleLoading,
                        load: this._handleLoad
                    }, this);
                }
                catch (exception) {
                    console.warn('L.Control.Loading: Tried and failed to add ' +
                                 ' event handlers to layer', e.layer);
                    console.warn('L.Control.Loading: Full details', exception);
                }
            },

            _layerRemove: function(e) {
                if (!e.layer || !e.layer.off) return;
                try {
                    e.layer.off({
                        loading: this._handleLoading,
                        load: this._handleLoad
                    }, this);
                }
                catch (exception) {
                    console.warn('L.Control.Loading: Tried and failed to remove ' +
                                 'event handlers from layer', e.layer);
                    console.warn('L.Control.Loading: Full details', exception);
                }
            },

            _addLayerListeners: function(map) {
                // Add listeners for begin and end of load to any layers already on the 
                // map
                map.eachLayer(function(layer) {
                    if (!layer.on) return;
                    layer.on({
                        loading: this._handleLoading,
                        load: this._handleLoad
                    }, this);
                }, this);

                // When a layer is added to the map, add listeners for begin and end
                // of load
                map.on('layeradd', this._layerAdd, this);
                map.on('layerremove', this._layerRemove, this);
            },

            _removeLayerListeners: function(map) {
                // Remove listeners for begin and end of load from all layers
                map.eachLayer(function(layer) {
                    if (!layer.off) return;
                    layer.off({
                        loading: this._handleLoading,
                        load: this._handleLoad
                    }, this);
                }, this);

                // Remove layeradd/layerremove listener from map
                map.off('layeradd', this._layerAdd, this);
                map.off('layerremove', this._layerRemove, this);
            },

            _addMapListeners: function(map) {
                // Add listeners to the map for (custom) dataloading and dataload
                // events, eg, for AJAX calls that affect the map but will not be
                // reflected in the above layer events.
                map.on({
                    baselayerchange: this._handleBaseLayerChange,
                    dataloading: this._handleLoading,
                    dataload: this._handleLoad,
                    layerremove: this._handleLoad
                }, this);
            },

            _removeMapListeners: function(map) {
                map.off({
                    baselayerchange: this._handleBaseLayerChange,
                    dataloading: this._handleLoading,
                    dataload: this._handleLoad,
                    layerremove: this._handleLoad
                }, this);
            }
        });

        L.Map.addInitHook(function () {
            if (this.options.loadingControl) {
                this.loadingControl = new L.Control.Loading();
                this.addControl(this.loadingControl);
            }
        });

        L.Control.loading = function(options) {
            return new L.Control.Loading(options);
        };
    }

    if (true) {
        // Try to add leaflet.loading to Leaflet using AMD
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (L) {
            defineLeafletLoading(L);
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else {}

})();


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1sb2FkaW5nL3NyYy9Db250cm9sLkxvYWRpbmcuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsZUFBZTtBQUNwRSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLElBQTBDO0FBQ2xEO0FBQ0EsUUFBUSxpQ0FBTyxDQUFDLGdGQUFTLENBQUMsbUNBQUU7QUFDNUI7QUFDQSxTQUFTO0FBQUEsb0dBQUM7QUFDVjtBQUNBLFNBQVMsRUFHSjs7QUFFTCxDQUFDOzs7Ozs7Ozs7Ozs7QUM5VkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6ImpzL3ZlbmRvcnN+Y29udHJvbC1sb2FkaW5nQ29udHJvbEZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogTC5Db250cm9sLkxvYWRpbmcgaXMgYSBjb250cm9sIHRoYXQgc2hvd3MgYSBsb2FkaW5nIGluZGljYXRvciB3aGVuIHRpbGVzIGFyZVxuICogbG9hZGluZyBvciB3aGVuIG1hcC1yZWxhdGVkIEFKQVggcmVxdWVzdHMgYXJlIHRha2luZyBwbGFjZS5cbiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7XG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgd2FybjogZnVuY3Rpb24gKCkge31cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lTGVhZmxldExvYWRpbmcoTCkge1xuICAgICAgICBMLkNvbnRyb2wuTG9hZGluZyA9IEwuQ29udHJvbC5leHRlbmQoe1xuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGRlbGF5SW5kaWNhdG9yOiBudWxsLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAndG9wbGVmdCcsXG4gICAgICAgICAgICAgICAgc2VwYXJhdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHpvb21Db250cm9sOiBudWxsLFxuICAgICAgICAgICAgICAgIHNwaW5qczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3BpbjogeyBcbiAgICAgICAgICAgICAgICAgICAgbGluZXM6IDcsIFxuICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IDMsIFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMywgXG4gICAgICAgICAgICAgICAgICAgIHJhZGl1czogNSwgXG4gICAgICAgICAgICAgICAgICAgIHJvdGF0ZTogMTMsIFxuICAgICAgICAgICAgICAgICAgICB0b3A6IFwiODMlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFMb2FkZXJzID0ge307XG5cbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gc2V0IHRoZSB6b29tIGNvbnRyb2wgdGhpcyBjb250cm9sIGlzIGF0dGFjaGVkIHRvIGZyb20gdGhlIFxuICAgICAgICAgICAgICAgIC8vIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnpvb21Db250cm9sICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbUNvbnRyb2wgPSB0aGlzLm9wdGlvbnMuem9vbUNvbnRyb2w7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3BpbmpzICYmICh0eXBlb2YgU3Bpbm5lciAhPT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJMZWFmbGV0LmxvYWRpbmcgY2Fubm90IGxvYWQgYmVjYXVzZSB5b3UgZGlkbid0IGxvYWQgc3Bpbi5qcyAoaHR0cDovL2ZnbmFzcy5naXRodWIuaW8vc3Bpbi5qcy8pLCBldmVuIHRob3VnaCB5b3Ugc2V0IGl0IGluIG9wdGlvbnMuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRMYXllckxpc3RlbmVycyhtYXApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZE1hcExpc3RlbmVycyhtYXApO1xuXG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIHNldCB0aGUgem9vbSBjb250cm9sIHRoaXMgY29udHJvbCBpcyBhdHRhY2hlZCB0byBmcm9tIHRoZSBtYXBcbiAgICAgICAgICAgICAgICAvLyB0aGUgY29udHJvbCBpcyBiZWluZyBhZGRlZCB0b1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLnNlcGFyYXRlICYmICF0aGlzLnpvb21Db250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXAuem9vbUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbUNvbnRyb2wgPSBtYXAuem9vbUNvbnRyb2w7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwLnpvb21zbGlkZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvb21Db250cm9sID0gbWFwLnpvb21zbGlkZXJDb250cm9sO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gJ2xlYWZsZXQtY29udHJvbC1sb2FkaW5nJztcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sICYmICF0aGlzLm9wdGlvbnMuc2VwYXJhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSB6b29tIGNvbnRyb2wsIGhvb2sgaW50byB0aGUgYm90dG9tIG9mIGl0XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuem9vbUNvbnRyb2wuX2NvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlc2UgY2xhc3NlcyBhcmUgbm8gbG9uZ2VyIHVzZWQgYXMgb2YgTGVhZmxldCAwLjZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyArPSAnIGxlYWZsZXQtYmFyLXBhcnQtYm90dG9tIGxlYWZsZXQtYmFyLXBhcnQgbGFzdCc7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTG9hZGluZyBjb250cm9sIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHpvb20gY29udHJvbC4gU28gdGhlIHZpc2libGUgbGFzdCBlbGVtZW50IGlzIG5vdCB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gbGFzdCBkb20gZWxlbWVudCBhbnltb3JlLiBTbyBhZGQgdGhlIHBhcnQtYm90dG9tIGNsYXNzLlxuICAgICAgICAgICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fZ2V0TGFzdENvbnRyb2xCdXR0b24oKSwgJ2xlYWZsZXQtYmFyLXBhcnQtYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGNyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIGluZGljYXRvclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1jb250cm9sLXpvb20gbGVhZmxldC1jb250cm9sLWxheWVyLWNvbnRhaW5lciBsZWFmbGV0LWJhcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2F0b3JDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5kaWNhdG9yID0gTC5Eb21VdGlsLmNyZWF0ZSgnYScsIGNsYXNzZXMsIGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zcGluanMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3Bpbm5lciA9IG5ldyBTcGlubmVyKHRoaXMub3B0aW9ucy5zcGluKS5zcGluKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGljYXRvci5hcHBlbmRDaGlsZCh0aGlzLl9zcGlubmVyLmVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVMYXllckxpc3RlbmVycyhtYXApO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZU1hcExpc3RlbmVycyhtYXApO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlRnJvbTogZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sICYmICF0aGlzLm9wdGlvbnMuc2VwYXJhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3ZlcnJpZGUgQ29udHJvbC5yZW1vdmVGcm9tKCkgdG8gYXZvaWQgY2xvYmJlcmluZyB0aGUgZW50aXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIF9jb250YWluZXIsIHdoaWNoIGlzIHRoZSBzYW1lIGFzIHpvb21Db250cm9sJ3NcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuX2luZGljYXRvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SZW1vdmUobWFwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGNvbnRyb2wgaXMgc2VwYXJhdGUgZnJvbSB0aGUgem9vbUNvbnRyb2wsIGNhbGwgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhcmVudCBtZXRob2Qgc28gd2UgZG9uJ3QgbGVhdmUgYmVoaW5kIGFuIGVtcHR5IGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTC5Db250cm9sLnByb3RvdHlwZS5yZW1vdmVGcm9tLmNhbGwodGhpcywgbWFwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhZGRMb2FkZXI6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YUxvYWRlcnNbaWRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlbGF5SW5kaWNhdG9yICYmICF0aGlzLmRlbGF5SW5kaWNhdG9yVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgZGVsYXlpbmcgc2hvd2luZyB0aGUgaW5kaWNhdG9yIGFuZCB3ZSdyZSBub3RcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxyZWFkeSB3YWl0aW5nIGZvciB0aGF0IGRlbGF5LCBzZXQgdXAgYSB0aW1lb3V0LlxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlJbmRpY2F0b3JUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZUluZGljYXRvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWxheUluZGljYXRvclRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLm9wdGlvbnMuZGVsYXlJbmRpY2F0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHNob3cgdGhlIGluZGljYXRvciBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUluZGljYXRvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZUxvYWRlcjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZGF0YUxvYWRlcnNbaWRdO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5kaWNhdG9yKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiByZW1vdmluZyB0aGlzIGxvYWRlciBtZWFucyB3ZSdyZSBpbiBubyBkYW5nZXIgb2YgbG9hZGluZyxcbiAgICAgICAgICAgICAgICAvLyBjbGVhciB0aGUgdGltZW91dC4gVGhpcyBwcmV2ZW50cyBvbGQgZGVsYXlzIGZyb20gaW5zdGFudGx5IFxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXJpbmcgdGhlIGluZGljYXRvci5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlbGF5SW5kaWNhdG9yICYmIHRoaXMuZGVsYXlJbmRpY2F0b3JUaW1lb3V0ICYmICF0aGlzLmlzTG9hZGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlbGF5SW5kaWNhdG9yVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlJbmRpY2F0b3JUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB1cGRhdGVJbmRpY2F0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTG9hZGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dJbmRpY2F0b3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVJbmRpY2F0b3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb3VudExvYWRlcnMoKSA+IDA7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfY291bnRMb2FkZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IDAsIGtleTtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiB0aGlzLl9kYXRhTG9hZGVycykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGF0YUxvYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkgc2l6ZSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIF9zaG93SW5kaWNhdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBTaG93IGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2luZGljYXRvciwgJ2lzLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW5kaWNhdG9yQ29udGFpbmVyLCAnaXMtbG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgem9vbUNvbnRyb2wgZXhpc3RzLCBtYWtlIHRoZSB6b29tLW91dCBidXR0b24gbm90IGxhc3RcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5zZXBhcmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy56b29tQ29udHJvbCBpbnN0YW5jZW9mIEwuQ29udHJvbC5ab29tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fZ2V0TGFzdENvbnRyb2xCdXR0b24oKSwgJ2xlYWZsZXQtYmFyLXBhcnQtYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIEwuQ29udHJvbC5ab29tc2xpZGVyID09PSAnZnVuY3Rpb24nICYmIHRoaXMuem9vbUNvbnRyb2wgaW5zdGFuY2VvZiBMLkNvbnRyb2wuWm9vbXNsaWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuem9vbUNvbnRyb2wuX3VpLnpvb21PdXQsICdsZWFmbGV0LWJhci1wYXJ0LWJvdHRvbScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgX2hpZGVJbmRpY2F0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIEhpZGUgbG9hZGluZyBpbmRpY2F0b3JcbiAgICAgICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5kaWNhdG9yLCAnaXMtbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbmRpY2F0b3JDb250YWluZXIsICdpcy1sb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB6b29tQ29udHJvbCBleGlzdHMsIG1ha2UgdGhlIHpvb20tb3V0IGJ1dHRvbiBsYXN0XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2VwYXJhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuem9vbUNvbnRyb2wgaW5zdGFuY2VvZiBMLkNvbnRyb2wuWm9vbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2dldExhc3RDb250cm9sQnV0dG9uKCksICdsZWFmbGV0LWJhci1wYXJ0LWJvdHRvbScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBMLkNvbnRyb2wuWm9vbXNsaWRlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLnpvb21Db250cm9sIGluc3RhbmNlb2YgTC5Db250cm9sLlpvb21zbGlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLnpvb21Db250cm9sLl91aS56b29tT3V0LCAnbGVhZmxldC1iYXItcGFydC1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIF9nZXRMYXN0Q29udHJvbEJ1dHRvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuem9vbUNvbnRyb2wuX2NvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGxhc3QgdmlzaWJsZSBjb250cm9sIGJ1dHRvbiB0aGF0IGlzIG5vdCBvdXIgbG9hZGluZ1xuICAgICAgICAgICAgICAgIC8vIGluZGljYXRvclxuICAgICAgICAgICAgICAgIHdoaWxlIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGNvbnRhaW5lci5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMuX2luZGljYXRvciA9PT0gYnV0dG9uIHx8IGJ1dHRvbi5vZmZzZXRXaWR0aCA9PT0gMCB8fCBidXR0b24ub2Zmc2V0SGVpZ2h0ID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIF9oYW5kbGVMb2FkaW5nOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRMb2FkZXIodGhpcy5nZXRFdmVudElkKGUpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIF9oYW5kbGVCYXNlTGF5ZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGEgdGFyZ2V0ICdsYXllcicgdGhhdCBjb250YWlucyBtdWx0aXBsZSBsYXllcnMsIHN1Y2ggYXNcbiAgICAgICAgICAgICAgICAvLyBMLkxheWVyR3JvdXAuIFRoaXMgd2lsbCBoYXBwZW4gaWYgeW91IGhhdmUgYW4gTC5MYXllckdyb3VwIGluIGFuXG4gICAgICAgICAgICAgICAgLy8gTC5Db250cm9sLkxheWVycy5cbiAgICAgICAgICAgICAgICBpZiAoZS5sYXllciAmJiBlLmxheWVyLmVhY2hMYXllciAmJiB0eXBlb2YgZS5sYXllci5lYWNoTGF5ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5sYXllci5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9oYW5kbGVCYXNlTGF5ZXJDaGFuZ2UoeyBsYXllcjogbGF5ZXIgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgY2hhbmdpbmcgdG8gYSBjYW52YXMgbGF5ZXIsIGRvbid0IGhhbmRsZSBsb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGNhbnZhcyBsYXllcnMgd2lsbCBub3QgZmlyZSBsb2FkIGV2ZW50cy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoTC5UaWxlTGF5ZXIuQ2FudmFzICYmIGUubGF5ZXIgaW5zdGFuY2VvZiBMLlRpbGVMYXllci5DYW52YXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9oYW5kbGVMb2FkaW5nKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgX2hhbmRsZUxvYWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxvYWRlcih0aGlzLmdldEV2ZW50SWQoZSkpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0RXZlbnRJZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlLmxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLmxheWVyLl9sZWFmbGV0X2lkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZS50YXJnZXQuX2xlYWZsZXRfaWQ7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfbGF5ZXJBZGQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWUubGF5ZXIgfHwgIWUubGF5ZXIub24pIHJldHVyblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGUubGF5ZXIub24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogdGhpcy5faGFuZGxlTG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWQ6IHRoaXMuX2hhbmRsZUxvYWRcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdMLkNvbnRyb2wuTG9hZGluZzogVHJpZWQgYW5kIGZhaWxlZCB0byBhZGQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIGV2ZW50IGhhbmRsZXJzIHRvIGxheWVyJywgZS5sYXllcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTC5Db250cm9sLkxvYWRpbmc6IEZ1bGwgZGV0YWlscycsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgX2xheWVyUmVtb3ZlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlLmxheWVyIHx8ICFlLmxheWVyLm9mZikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGUubGF5ZXIub2ZmKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkOiB0aGlzLl9oYW5kbGVMb2FkXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTC5Db250cm9sLkxvYWRpbmc6IFRyaWVkIGFuZCBmYWlsZWQgdG8gcmVtb3ZlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V2ZW50IGhhbmRsZXJzIGZyb20gbGF5ZXInLCBlLmxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdMLkNvbnRyb2wuTG9hZGluZzogRnVsbCBkZXRhaWxzJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfYWRkTGF5ZXJMaXN0ZW5lcnM6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgZm9yIGJlZ2luIGFuZCBlbmQgb2YgbG9hZCB0byBhbnkgbGF5ZXJzIGFscmVhZHkgb24gdGhlIFxuICAgICAgICAgICAgICAgIC8vIG1hcFxuICAgICAgICAgICAgICAgIG1hcC5lYWNoTGF5ZXIoZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXllci5vbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBsYXllci5vbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiB0aGlzLl9oYW5kbGVMb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZDogdGhpcy5faGFuZGxlTG9hZFxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gYSBsYXllciBpcyBhZGRlZCB0byB0aGUgbWFwLCBhZGQgbGlzdGVuZXJzIGZvciBiZWdpbiBhbmQgZW5kXG4gICAgICAgICAgICAgICAgLy8gb2YgbG9hZFxuICAgICAgICAgICAgICAgIG1hcC5vbignbGF5ZXJhZGQnLCB0aGlzLl9sYXllckFkZCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgbWFwLm9uKCdsYXllcnJlbW92ZScsIHRoaXMuX2xheWVyUmVtb3ZlLCB0aGlzKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIF9yZW1vdmVMYXllckxpc3RlbmVyczogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVycyBmb3IgYmVnaW4gYW5kIGVuZCBvZiBsb2FkIGZyb20gYWxsIGxheWVyc1xuICAgICAgICAgICAgICAgIG1hcC5lYWNoTGF5ZXIoZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXllci5vZmYpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIub2ZmKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkOiB0aGlzLl9oYW5kbGVMb2FkXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGxheWVyYWRkL2xheWVycmVtb3ZlIGxpc3RlbmVyIGZyb20gbWFwXG4gICAgICAgICAgICAgICAgbWFwLm9mZignbGF5ZXJhZGQnLCB0aGlzLl9sYXllckFkZCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgbWFwLm9mZignbGF5ZXJyZW1vdmUnLCB0aGlzLl9sYXllclJlbW92ZSwgdGhpcyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfYWRkTWFwTGlzdGVuZXJzOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgbGlzdGVuZXJzIHRvIHRoZSBtYXAgZm9yIChjdXN0b20pIGRhdGFsb2FkaW5nIGFuZCBkYXRhbG9hZFxuICAgICAgICAgICAgICAgIC8vIGV2ZW50cywgZWcsIGZvciBBSkFYIGNhbGxzIHRoYXQgYWZmZWN0IHRoZSBtYXAgYnV0IHdpbGwgbm90IGJlXG4gICAgICAgICAgICAgICAgLy8gcmVmbGVjdGVkIGluIHRoZSBhYm92ZSBsYXllciBldmVudHMuXG4gICAgICAgICAgICAgICAgbWFwLm9uKHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZWxheWVyY2hhbmdlOiB0aGlzLl9oYW5kbGVCYXNlTGF5ZXJDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFsb2FkaW5nOiB0aGlzLl9oYW5kbGVMb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICBkYXRhbG9hZDogdGhpcy5faGFuZGxlTG9hZCxcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJyZW1vdmU6IHRoaXMuX2hhbmRsZUxvYWRcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIF9yZW1vdmVNYXBMaXN0ZW5lcnM6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICAgICAgICAgIG1hcC5vZmYoe1xuICAgICAgICAgICAgICAgICAgICBiYXNlbGF5ZXJjaGFuZ2U6IHRoaXMuX2hhbmRsZUJhc2VMYXllckNoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YWxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFsb2FkOiB0aGlzLl9oYW5kbGVMb2FkLFxuICAgICAgICAgICAgICAgICAgICBsYXllcnJlbW92ZTogdGhpcy5faGFuZGxlTG9hZFxuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBMLk1hcC5hZGRJbml0SG9vayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxvYWRpbmdDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ29udHJvbCA9IG5ldyBMLkNvbnRyb2wuTG9hZGluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ29udHJvbCh0aGlzLmxvYWRpbmdDb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgTC5Db250cm9sLmxvYWRpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEwuQ29udHJvbC5Mb2FkaW5nKG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gVHJ5IHRvIGFkZCBsZWFmbGV0LmxvYWRpbmcgdG8gTGVhZmxldCB1c2luZyBBTURcbiAgICAgICAgZGVmaW5lKFsnbGVhZmxldCddLCBmdW5jdGlvbiAoTCkge1xuICAgICAgICAgICAgZGVmaW5lTGVhZmxldExvYWRpbmcoTCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gRWxzZSB1c2UgdGhlIGdsb2JhbCBMXG4gICAgICAgIGRlZmluZUxlYWZsZXRMb2FkaW5nKEwpO1xuICAgIH1cblxufSkoKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiJdLCJzb3VyY2VSb290IjoiIn0=