(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~control-geocoderControlFactory"],{

/***/ "./node_modules/leaflet-control-geocoder/src/control.js":
/*!**************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/control.js ***!
  \**************************************************************/
/*! exports provided: Geocoder, geocoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Geocoder", function() { return Geocoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geocoder", function() { return geocoder; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _geocoders_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./geocoders/index */ "./node_modules/leaflet-control-geocoder/src/geocoders/index.js");



var Geocoder = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Control.extend({
  options: {
    showUniqueResult: true,
    showResultIcons: false,
    collapsed: true,
    expand: 'touch', // options: touch, click, anythingelse
    position: 'topright',
    placeholder: 'Search...',
    errorMessage: 'Nothing found.',
    iconLabel: 'Initiate a new search',
    queryMinLength: 1,
    suggestMinLength: 3,
    suggestTimeout: 250,
    defaultMarkGeocode: true
  },

  includes: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Evented.prototype || leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Mixin.Events,

  initialize: function(options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.setOptions(this, options);
    if (!this.options.geocoder) {
      this.options.geocoder = new _geocoders_index__WEBPACK_IMPORTED_MODULE_1__["Nominatim"]();
    }

    this._requestCount = 0;
  },

  addThrobberClass: function() {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.addClass(this._container, 'leaflet-control-geocoder-throbber');
  },

  removeThrobberClass: function() {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-throbber');
  },

  onAdd: function(map) {
    var className = 'leaflet-control-geocoder',
      container = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.create('div', className + ' leaflet-bar'),
      icon = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.create('button', className + '-icon', container),
      form = (this._form = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.create('div', className + '-form', container)),
      input;

    this._map = map;
    this._container = container;

    icon.innerHTML = '&nbsp;';
    icon.type = 'button';
    icon.setAttribute('aria-label', this.options.iconLabel);

    input = this._input = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.create('input', '', form);
    input.type = 'text';
    input.value = this.options.query || '';
    input.placeholder = this.options.placeholder;
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.disableClickPropagation(input);

    this._errorElement = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.create('div', className + '-form-no-error', container);
    this._errorElement.innerHTML = this.options.errorMessage;

    this._alts = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.create(
      'ul',
      className + '-alternatives leaflet-control-geocoder-alternatives-minimized',
      container
    );
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.disableClickPropagation(this._alts);

    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(input, 'keydown', this._keydown, this);
    if (this.options.geocoder.suggest) {
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(input, 'input', this._change, this);
    }
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(
      input,
      'blur',
      function() {
        if (this.options.collapsed && !this._preventBlurCollapse) {
          this._collapse();
        }
        this._preventBlurCollapse = false;
      },
      this
    );

    if (this.options.collapsed) {
      if (this.options.expand === 'click') {
        leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(
          container,
          'click',
          function(e) {
            if (e.button === 0 && e.detail !== 2) {
              this._toggle();
            }
          },
          this
        );
      } else if (this.options.expand === 'touch') {
        leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(
          container,
          leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Browser.touch ? 'touchstart mousedown' : 'mousedown',
          function(e) {
            this._toggle();
            e.preventDefault(); // mobile: clicking focuses the icon, so UI expands and immediately collapses
            e.stopPropagation();
          },
          this
        );
      } else {
        leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(container, 'mouseover', this._expand, this);
        leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(container, 'mouseout', this._collapse, this);
        this._map.on('movestart', this._collapse, this);
      }
    } else {
      this._expand();
      if (leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Browser.touch) {
        leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(
          container,
          'touchstart',
          function() {
            this._geocode();
          },
          this
        );
      } else {
        leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(
          container,
          'click',
          function() {
            this._geocode();
          },
          this
        );
      }
    }

    if (this.options.defaultMarkGeocode) {
      this.on('markgeocode', this.markGeocode, this);
    }

    this.on('startgeocode', this.addThrobberClass, this);
    this.on('finishgeocode', this.removeThrobberClass, this);
    this.on('startsuggest', this.addThrobberClass, this);
    this.on('finishsuggest', this.removeThrobberClass, this);

    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.disableClickPropagation(container);

    return container;
  },

  setQuery: function(string) {
    this._input.value = string;
    return this;
  },

  _geocodeResult: function(results, suggest) {
    if (!suggest && this.options.showUniqueResult && results.length === 1) {
      this._geocodeResultSelected(results[0]);
    } else if (results.length > 0) {
      this._alts.innerHTML = '';
      this._results = results;
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.addClass(this._container, 'leaflet-control-geocoder-options-open');
      for (var i = 0; i < results.length; i++) {
        this._alts.appendChild(this._createAlt(results[i], i));
      }
    } else {
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.addClass(this._container, 'leaflet-control-geocoder-options-error');
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.addClass(this._errorElement, 'leaflet-control-geocoder-error');
    }
  },

  markGeocode: function(result) {
    result = result.geocode || result;

    this._map.fitBounds(result.bbox);

    if (this._geocodeMarker) {
      this._map.removeLayer(this._geocodeMarker);
    }

    this._geocodeMarker = new leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Marker(result.center)
      .bindPopup(result.html || result.name)
      .addTo(this._map)
      .openPopup();

    return this;
  },

  _geocode: function(suggest) {
    var value = this._input.value;
    if (!suggest && value.length < this.options.queryMinLength) {
      return;
    }

    var requestCount = ++this._requestCount,
      mode = suggest ? 'suggest' : 'geocode',
      eventData = { input: value };

    this._lastGeocode = value;
    if (!suggest) {
      this._clearResults();
    }

    this.fire('start' + mode, eventData);
    this.options.geocoder[mode](
      value,
      function(results) {
        if (requestCount === this._requestCount) {
          eventData.results = results;
          this.fire('finish' + mode, eventData);
          this._geocodeResult(results, suggest);
        }
      },
      this
    );
  },

  _geocodeResultSelected: function(result) {
    this.fire('markgeocode', { geocode: result });
  },

  _toggle: function() {
    if (leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.hasClass(this._container, 'leaflet-control-geocoder-expanded')) {
      this._collapse();
    } else {
      this._expand();
    }
  },

  _expand: function() {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');
    this._input.select();
    this.fire('expand');
  },

  _collapse: function() {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-expanded');
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-open');
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-error');
    this._input.blur(); // mobile: keyboard shouldn't stay expanded
    this.fire('collapse');
  },

  _clearResults: function() {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
    this._selection = null;
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-open');
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-error');
  },

  _createAlt: function(result, index) {
    var li = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.create('li', ''),
      a = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.create('a', '', li),
      icon = this.options.showResultIcons && result.icon ? leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.create('img', '', a) : null,
      text = result.html ? undefined : document.createTextNode(result.name),
      mouseDownHandler = function mouseDownHandler(e) {
        // In some browsers, a click will fire on the map if the control is
        // collapsed directly after mousedown. To work around this, we
        // wait until the click is completed, and _then_ collapse the
        // control. Messy, but this is the workaround I could come up with
        // for #142.
        this._preventBlurCollapse = true;
        leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.stop(e);
        this._geocodeResultSelected(result);
        leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.on(
          li,
          'click touchend',
          function() {
            if (this.options.collapsed) {
              this._collapse();
            } else {
              this._clearResults();
            }
          },
          this
        );
      };

    if (icon) {
      icon.src = result.icon;
    }

    li.setAttribute('data-result-index', index);

    if (result.html) {
      a.innerHTML = a.innerHTML + result.html;
    } else {
      a.appendChild(text);
    }

    // Use mousedown and not click, since click will fire _after_ blur,
    // causing the control to have collapsed and removed the items
    // before the click can fire.
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.addListener(li, 'mousedown touchstart', mouseDownHandler, this);

    return li;
  },

  _keydown: function(e) {
    var _this = this,
      select = function select(dir) {
        if (_this._selection) {
          leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.removeClass(_this._selection, 'leaflet-control-geocoder-selected');
          _this._selection = _this._selection[dir > 0 ? 'nextSibling' : 'previousSibling'];
        }
        if (!_this._selection) {
          _this._selection = _this._alts[dir > 0 ? 'firstChild' : 'lastChild'];
        }

        if (_this._selection) {
          leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomUtil.addClass(_this._selection, 'leaflet-control-geocoder-selected');
        }
      };

    switch (e.keyCode) {
      // Escape
      case 27:
        if (this.options.collapsed) {
          this._collapse();
        } else {
          this._clearResults();
        }
        break;
      // Up
      case 38:
        select(-1);
        break;
      // Up
      case 40:
        select(1);
        break;
      // Enter
      case 13:
        if (this._selection) {
          var index = parseInt(this._selection.getAttribute('data-result-index'), 10);
          this._geocodeResultSelected(this._results[index]);
          this._clearResults();
        } else {
          this._geocode();
        }
        break;
      default:
        return;
    }

    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.DomEvent.preventDefault(e);
  },
  _change: function() {
    var v = this._input.value;
    if (v !== this._lastGeocode) {
      clearTimeout(this._suggestTimeout);
      if (v.length >= this.options.suggestMinLength) {
        this._suggestTimeout = setTimeout(
          leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function() {
            this._geocode(true);
          }, this),
          this.options.suggestTimeout
        );
      } else {
        this._clearResults();
      }
    }
  }
});

function geocoder(options) {
  return new Geocoder(options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/arcgis.js":
/*!***********************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/arcgis.js ***!
  \***********************************************************************/
/*! exports provided: ArcGis, arcgis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcGis", function() { return ArcGis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arcgis", function() { return arcgis; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var ArcGis = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    service_url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
  },

  initialize: function(accessToken, options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.setOptions(this, options);
    this._accessToken = accessToken;
  },

  geocode: function(query, cb, context) {
    var params = {
      SingleLine: query,
      outFields: 'Addr_Type',
      forStorage: false,
      maxLocations: 10,
      f: 'json'
    };

    if (this._key && this._key.length) {
      params.token = this._key;
    }

    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.service_url + '/findAddressCandidates',
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(params, this.options.geocodingQueryParams),
      function(data) {
        var results = [],
          loc,
          latLng,
          latLngBounds;

        if (data.candidates && data.candidates.length) {
          for (var i = 0; i <= data.candidates.length - 1; i++) {
            loc = data.candidates[i];
            latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.location.y, loc.location.x);
            latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
              leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.extent.ymax, loc.extent.xmax),
              leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.extent.ymin, loc.extent.xmin)
            );
            results[i] = {
              name: loc.address,
              bbox: latLngBounds,
              center: latLng
            };
          }
        }

        cb.call(context, results);
      }
    );
  },

  suggest: function(query, cb, context) {
    return this.geocode(query, cb, context);
  },

  reverse: function(location, scale, cb, context) {
    var params = {
      location: encodeURIComponent(location.lng) + ',' + encodeURIComponent(location.lat),
      distance: 100,
      f: 'json'
    };

    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(this.options.service_url + '/reverseGeocode', params, function(data) {
      var result = [],
        loc;

      if (data && !data.error) {
        loc = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(data.location.y, data.location.x);
        result.push({
          name: data.address.Match_addr,
          center: loc,
          bounds: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(loc, loc)
        });
      }

      cb.call(context, result);
    });
  }
});

function arcgis(accessToken, options) {
  return new ArcGis(accessToken, options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/bing.js":
/*!*********************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/bing.js ***!
  \*********************************************************************/
/*! exports provided: Bing, bing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bing", function() { return Bing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bing", function() { return bing; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var Bing = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  initialize: function(key) {
    this.key = key;
  },

  geocode: function(query, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["jsonp"])(
      'https://dev.virtualearth.net/REST/v1/Locations',
      {
        query: query,
        key: this.key
      },
      function(data) {
        var results = [];
        if (data.resourceSets.length > 0) {
          for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
            var resource = data.resourceSets[0].resources[i],
              bbox = resource.bbox;
            results[i] = {
              name: resource.name,
              bbox: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
              center: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(resource.point.coordinates)
            };
          }
        }
        cb.call(context, results);
      },
      this,
      'jsonp'
    );
  },

  reverse: function(location, scale, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["jsonp"])(
      '//dev.virtualearth.net/REST/v1/Locations/' + location.lat + ',' + location.lng,
      {
        key: this.key
      },
      function(data) {
        var results = [];
        for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
          var resource = data.resourceSets[0].resources[i],
            bbox = resource.bbox;
          results[i] = {
            name: resource.name,
            bbox: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
            center: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(resource.point.coordinates)
          };
        }
        cb.call(context, results);
      },
      this,
      'jsonp'
    );
  }
});

function bing(key) {
  return new Bing(key);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/google.js":
/*!***********************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/google.js ***!
  \***********************************************************************/
/*! exports provided: Google, google */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Google", function() { return Google; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "google", function() { return google; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var Google = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    serviceUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
    geocodingQueryParams: {},
    reverseQueryParams: {}
  },

  initialize: function(key, options) {
    this._key = key;
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.setOptions(this, options);
    // Backwards compatibility
    this.options.serviceUrl = this.options.service_url || this.options.serviceUrl;
  },

  geocode: function(query, cb, context) {
    var params = {
      address: query
    };

    if (this._key && this._key.length) {
      params.key = this._key;
    }

    params = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(params, this.options.geocodingQueryParams);

    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(this.options.serviceUrl, params, function(data) {
      var results = [],
        loc,
        latLng,
        latLngBounds;
      if (data.results && data.results.length) {
        for (var i = 0; i <= data.results.length - 1; i++) {
          loc = data.results[i];
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.geometry.location);
          latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
            leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.geometry.viewport.northeast),
            leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.geometry.viewport.southwest)
          );
          results[i] = {
            name: loc.formatted_address,
            bbox: latLngBounds,
            center: latLng,
            properties: loc.address_components
          };
        }
      }

      cb.call(context, results);
    });
  },

  reverse: function(location, scale, cb, context) {
    var params = {
      latlng: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng)
    };
    params = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(params, this.options.reverseQueryParams);
    if (this._key && this._key.length) {
      params.key = this._key;
    }

    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(this.options.serviceUrl, params, function(data) {
      var results = [],
        loc,
        latLng,
        latLngBounds;
      if (data.results && data.results.length) {
        for (var i = 0; i <= data.results.length - 1; i++) {
          loc = data.results[i];
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.geometry.location);
          latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
            leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.geometry.viewport.northeast),
            leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.geometry.viewport.southwest)
          );
          results[i] = {
            name: loc.formatted_address,
            bbox: latLngBounds,
            center: latLng,
            properties: loc.address_components
          };
        }
      }

      cb.call(context, results);
    });
  }
});

function google(key, options) {
  return new Google(key, options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/here.js":
/*!*********************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/here.js ***!
  \*********************************************************************/
/*! exports provided: HERE, here */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HERE", function() { return HERE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "here", function() { return here; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");


var HERE = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    geocodeUrl: 'https://geocoder.api.here.com/6.2/geocode.json',
    reverseGeocodeUrl: 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json',
    app_id: '<insert your app_id here>',
    app_code: '<insert your app_code here>',
    geocodingQueryParams: {},
    reverseQueryParams: {},
    reverseGeocodeProxRadius: null
  },
  initialize: function(options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.setOptions(this, options);
  },
  geocode: function(query, cb, context) {
    var params = {
      searchtext: query,
      gen: 9,
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      jsonattributes: 1
    };
    params = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(params, this.options.geocodingQueryParams);
    this.getJSON(this.options.geocodeUrl, params, cb, context);
  },
  reverse: function(location, scale, cb, context) {
    var _proxRadius = this.options.reverseGeocodeProxRadius
      ? this.options.reverseGeocodeProxRadius
      : null;
    var proxRadius = _proxRadius ? ',' + encodeURIComponent(_proxRadius) : '';
    var params = {
      prox: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng) + proxRadius,
      mode: 'retrieveAddresses',
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      gen: 9,
      jsonattributes: 1
    };
    params = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(params, this.options.reverseQueryParams);
    this.getJSON(this.options.reverseGeocodeUrl, params, cb, context);
  },
  getJSON: function(url, params, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(url, params, function(data) {
      var results = [],
        loc,
        latLng,
        latLngBounds;
      if (data.response.view && data.response.view.length) {
        for (var i = 0; i <= data.response.view[0].result.length - 1; i++) {
          loc = data.response.view[0].result[i].location;
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.displayPosition.latitude, loc.displayPosition.longitude);
          latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
            leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.mapView.topLeft.latitude, loc.mapView.topLeft.longitude),
            leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.mapView.bottomRight.latitude, loc.mapView.bottomRight.longitude)
          );
          results[i] = {
            name: loc.address.label,
            properties: loc.address,
            bbox: latLngBounds,
            center: latLng
          };
        }
      }
      cb.call(context, results);
    });
  }
});
function here(options) {
  return new HERE(options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/index.js ***!
  \**********************************************************************/
/*! exports provided: ArcGis, arcgis, Bing, bing, Google, google, HERE, here, LatLng, latLng, Mapbox, mapbox, MapQuest, mapQuest, Neutrino, neutrino, Nominatim, nominatim, OpenLocationCode, openLocationCode, OpenCage, opencage, Pelias, pelias, GeocodeEarth, geocodeEarth, Mapzen, mapzen, Openrouteservice, openrouteservice, Photon, photon, What3Words, what3words */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _arcgis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arcgis */ "./node_modules/leaflet-control-geocoder/src/geocoders/arcgis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArcGis", function() { return _arcgis__WEBPACK_IMPORTED_MODULE_0__["ArcGis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arcgis", function() { return _arcgis__WEBPACK_IMPORTED_MODULE_0__["arcgis"]; });

/* harmony import */ var _bing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bing */ "./node_modules/leaflet-control-geocoder/src/geocoders/bing.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bing", function() { return _bing__WEBPACK_IMPORTED_MODULE_1__["Bing"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bing", function() { return _bing__WEBPACK_IMPORTED_MODULE_1__["bing"]; });

/* harmony import */ var _google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./google */ "./node_modules/leaflet-control-geocoder/src/geocoders/google.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Google", function() { return _google__WEBPACK_IMPORTED_MODULE_2__["Google"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "google", function() { return _google__WEBPACK_IMPORTED_MODULE_2__["google"]; });

/* harmony import */ var _here__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./here */ "./node_modules/leaflet-control-geocoder/src/geocoders/here.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HERE", function() { return _here__WEBPACK_IMPORTED_MODULE_3__["HERE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "here", function() { return _here__WEBPACK_IMPORTED_MODULE_3__["here"]; });

/* harmony import */ var _latlng__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./latlng */ "./node_modules/leaflet-control-geocoder/src/geocoders/latlng.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LatLng", function() { return _latlng__WEBPACK_IMPORTED_MODULE_4__["LatLng"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "latLng", function() { return _latlng__WEBPACK_IMPORTED_MODULE_4__["latLng"]; });

/* harmony import */ var _mapbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mapbox */ "./node_modules/leaflet-control-geocoder/src/geocoders/mapbox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mapbox", function() { return _mapbox__WEBPACK_IMPORTED_MODULE_5__["Mapbox"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapbox", function() { return _mapbox__WEBPACK_IMPORTED_MODULE_5__["mapbox"]; });

/* harmony import */ var _mapquest__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mapquest */ "./node_modules/leaflet-control-geocoder/src/geocoders/mapquest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MapQuest", function() { return _mapquest__WEBPACK_IMPORTED_MODULE_6__["MapQuest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapQuest", function() { return _mapquest__WEBPACK_IMPORTED_MODULE_6__["mapQuest"]; });

/* harmony import */ var _neutrino__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./neutrino */ "./node_modules/leaflet-control-geocoder/src/geocoders/neutrino.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Neutrino", function() { return _neutrino__WEBPACK_IMPORTED_MODULE_7__["Neutrino"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "neutrino", function() { return _neutrino__WEBPACK_IMPORTED_MODULE_7__["neutrino"]; });

/* harmony import */ var _nominatim__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./nominatim */ "./node_modules/leaflet-control-geocoder/src/geocoders/nominatim.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Nominatim", function() { return _nominatim__WEBPACK_IMPORTED_MODULE_8__["Nominatim"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nominatim", function() { return _nominatim__WEBPACK_IMPORTED_MODULE_8__["nominatim"]; });

/* harmony import */ var _open_location_code__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./open-location-code */ "./node_modules/leaflet-control-geocoder/src/geocoders/open-location-code.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OpenLocationCode", function() { return _open_location_code__WEBPACK_IMPORTED_MODULE_9__["OpenLocationCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "openLocationCode", function() { return _open_location_code__WEBPACK_IMPORTED_MODULE_9__["openLocationCode"]; });

/* harmony import */ var _opencage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./opencage */ "./node_modules/leaflet-control-geocoder/src/geocoders/opencage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OpenCage", function() { return _opencage__WEBPACK_IMPORTED_MODULE_10__["OpenCage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "opencage", function() { return _opencage__WEBPACK_IMPORTED_MODULE_10__["opencage"]; });

/* harmony import */ var _pelias__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pelias */ "./node_modules/leaflet-control-geocoder/src/geocoders/pelias.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pelias", function() { return _pelias__WEBPACK_IMPORTED_MODULE_11__["Pelias"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pelias", function() { return _pelias__WEBPACK_IMPORTED_MODULE_11__["pelias"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeocodeEarth", function() { return _pelias__WEBPACK_IMPORTED_MODULE_11__["GeocodeEarth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geocodeEarth", function() { return _pelias__WEBPACK_IMPORTED_MODULE_11__["geocodeEarth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mapzen", function() { return _pelias__WEBPACK_IMPORTED_MODULE_11__["Mapzen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapzen", function() { return _pelias__WEBPACK_IMPORTED_MODULE_11__["mapzen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Openrouteservice", function() { return _pelias__WEBPACK_IMPORTED_MODULE_11__["Openrouteservice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "openrouteservice", function() { return _pelias__WEBPACK_IMPORTED_MODULE_11__["openrouteservice"]; });

/* harmony import */ var _photon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./photon */ "./node_modules/leaflet-control-geocoder/src/geocoders/photon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Photon", function() { return _photon__WEBPACK_IMPORTED_MODULE_12__["Photon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "photon", function() { return _photon__WEBPACK_IMPORTED_MODULE_12__["photon"]; });

/* harmony import */ var _what3words__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./what3words */ "./node_modules/leaflet-control-geocoder/src/geocoders/what3words.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "What3Words", function() { return _what3words__WEBPACK_IMPORTED_MODULE_13__["What3Words"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "what3words", function() { return _what3words__WEBPACK_IMPORTED_MODULE_13__["what3words"]; });

















/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/latlng.js":
/*!***********************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/latlng.js ***!
  \***********************************************************************/
/*! exports provided: LatLng, latLng */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LatLng", function() { return LatLng; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "latLng", function() { return latLng; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);


var LatLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    // the next geocoder to use
    next: undefined,
    sizeInMeters: 10000
  },

  initialize: function(options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.setOptions(this, options);
  },

  geocode: function(query, cb, context) {
    var match;
    var center;
    // regex from https://github.com/openstreetmap/openstreetmap-website/blob/master/app/controllers/geocoder_controller.rb
    if ((match = query.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/))) {
      // [NSEW] decimal degrees
      center = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(
        (/N/i.test(match[1]) ? 1 : -1) * parseFloat(match[2]),
        (/E/i.test(match[3]) ? 1 : -1) * parseFloat(match[4])
      );
    } else if (
      (match = query.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/))
    ) {
      // decimal degrees [NSEW]
      center = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(
        (/N/i.test(match[2]) ? 1 : -1) * parseFloat(match[1]),
        (/E/i.test(match[4]) ? 1 : -1) * parseFloat(match[3])
      );
    } else if (
      (match = query.match(
        /^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/
      ))
    ) {
      // [NSEW] degrees, decimal minutes
      center = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(
        (/N/i.test(match[1]) ? 1 : -1) * (parseFloat(match[2]) + parseFloat(match[3] / 60)),
        (/E/i.test(match[4]) ? 1 : -1) * (parseFloat(match[5]) + parseFloat(match[6] / 60))
      );
    } else if (
      (match = query.match(
        /^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/
      ))
    ) {
      // degrees, decimal minutes [NSEW]
      center = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(
        (/N/i.test(match[3]) ? 1 : -1) * (parseFloat(match[1]) + parseFloat(match[2] / 60)),
        (/E/i.test(match[6]) ? 1 : -1) * (parseFloat(match[4]) + parseFloat(match[5] / 60))
      );
    } else if (
      (match = query.match(
        /^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/
      ))
    ) {
      // [NSEW] degrees, minutes, decimal seconds
      center = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(
        (/N/i.test(match[1]) ? 1 : -1) *
          (parseFloat(match[2]) + parseFloat(match[3] / 60 + parseFloat(match[4] / 3600))),
        (/E/i.test(match[5]) ? 1 : -1) *
          (parseFloat(match[6]) + parseFloat(match[7] / 60) + parseFloat(match[8] / 3600))
      );
    } else if (
      (match = query.match(
        /^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/
      ))
    ) {
      // degrees, minutes, decimal seconds [NSEW]
      center = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(
        (/N/i.test(match[4]) ? 1 : -1) *
          (parseFloat(match[1]) + parseFloat(match[2] / 60 + parseFloat(match[3] / 3600))),
        (/E/i.test(match[8]) ? 1 : -1) *
          (parseFloat(match[5]) + parseFloat(match[6] / 60) + parseFloat(match[7] / 3600))
      );
    } else if (
      (match = query.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/))
    ) {
      center = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(parseFloat(match[1]), parseFloat(match[2]));
    }
    if (center) {
      var results = [
        {
          name: query,
          center: center,
          bbox: center.toBounds(this.options.sizeInMeters)
        }
      ];
      cb.call(context, results);
    } else if (this.options.next) {
      this.options.next.geocode(query, cb, context);
    }
  }
});

function latLng(options) {
  return new LatLng(options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/mapbox.js":
/*!***********************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/mapbox.js ***!
  \***********************************************************************/
/*! exports provided: Mapbox, mapbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mapbox", function() { return Mapbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapbox", function() { return mapbox; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var Mapbox = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    serviceUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    geocodingQueryParams: {},
    reverseQueryParams: {}
  },

  initialize: function(accessToken, options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.setOptions(this, options);
    this.options.geocodingQueryParams.access_token = accessToken;
    this.options.reverseQueryParams.access_token = accessToken;
  },

  geocode: function(query, cb, context) {
    var params = this.options.geocodingQueryParams;
    if (
      params.proximity !== undefined &&
      params.proximity.lat !== undefined &&
      params.proximity.lng !== undefined
    ) {
      params.proximity = params.proximity.lng + ',' + params.proximity.lat;
    }
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(this.options.serviceUrl + encodeURIComponent(query) + '.json', params, function(data) {
      var results = [],
        loc,
        latLng,
        latLngBounds;
      if (data.features && data.features.length) {
        for (var i = 0; i <= data.features.length - 1; i++) {
          loc = data.features[i];
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.center.reverse());
          if (loc.bbox) {
            latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
              leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.bbox.slice(0, 2).reverse()),
              leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.bbox.slice(2, 4).reverse())
            );
          } else {
            latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng);
          }

          var properties = {
            text: loc.text,
            address: loc.address
          };

          for (var j = 0; j < (loc.context || []).length; j++) {
            var id = loc.context[j].id.split('.')[0];
            properties[id] = loc.context[j].text;

            // Get country code when available
            if (loc.context[j].short_code) {
              properties['countryShortCode'] = loc.context[j].short_code
            }
          }

          results[i] = {
            name: loc.place_name,
            bbox: latLngBounds,
            center: latLng,
            properties: properties
          };
        }
      }

      cb.call(context, results);
    });
  },

  suggest: function(query, cb, context) {
    return this.geocode(query, cb, context);
  },

  reverse: function(location, scale, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl +
        encodeURIComponent(location.lng) +
        ',' +
        encodeURIComponent(location.lat) +
        '.json',
      this.options.reverseQueryParams,
      function(data) {
        var results = [],
          loc,
          latLng,
          latLngBounds;
        if (data.features && data.features.length) {
          for (var i = 0; i <= data.features.length - 1; i++) {
            loc = data.features[i];
            latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.center.reverse());
            if (loc.bbox) {
              latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
                leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.bbox.slice(0, 2).reverse()),
                leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.bbox.slice(2, 4).reverse())
              );
            } else {
              latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng);
            }
            results[i] = {
              name: loc.place_name,
              bbox: latLngBounds,
              center: latLng
            };
          }
        }

        cb.call(context, results);
      }
    );
  }
});

function mapbox(accessToken, options) {
  return new Mapbox(accessToken, options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/mapquest.js":
/*!*************************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/mapquest.js ***!
  \*************************************************************************/
/*! exports provided: MapQuest, mapQuest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapQuest", function() { return MapQuest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapQuest", function() { return mapQuest; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var MapQuest = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    serviceUrl: 'https://www.mapquestapi.com/geocoding/v1'
  },

  initialize: function(key, options) {
    // MapQuest seems to provide URI encoded API keys,
    // so to avoid encoding them twice, we decode them here
    this._key = decodeURIComponent(key);

    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.setOptions(this, options);
  },

  _formatName: function() {
    var r = [],
      i;
    for (i = 0; i < arguments.length; i++) {
      if (arguments[i]) {
        r.push(arguments[i]);
      }
    }

    return r.join(', ');
  },

  geocode: function(query, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + '/address',
      {
        key: this._key,
        location: query,
        limit: 5,
        outFormat: 'json'
      },
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function(data) {
        var results = [],
          loc,
          latLng;
        if (data.results && data.results[0].locations) {
          for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
            loc = data.results[0].locations[i];
            latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.latLng);
            results[i] = {
              name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
              bbox: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng),
              center: latLng
            };
          }
        }

        cb.call(context, results);
      }, this)
    );
  },

  reverse: function(location, scale, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + '/reverse',
      {
        key: this._key,
        location: location.lat + ',' + location.lng,
        outputFormat: 'json'
      },
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function(data) {
        var results = [],
          loc,
          latLng;
        if (data.results && data.results[0].locations) {
          for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
            loc = data.results[0].locations[i];
            latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.latLng);
            results[i] = {
              name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
              bbox: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng),
              center: latLng
            };
          }
        }

        cb.call(context, results);
      }, this)
    );
  }
});

function mapQuest(key, options) {
  return new MapQuest(key, options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/neutrino.js":
/*!*************************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/neutrino.js ***!
  \*************************************************************************/
/*! exports provided: Neutrino, neutrino */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Neutrino", function() { return Neutrino; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "neutrino", function() { return neutrino; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var Neutrino = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    userId: '<insert your userId here>',
    apiKey: '<insert your apiKey here>',
    serviceUrl: 'https://neutrinoapi.com/'
  },

  initialize: function(options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.setOptions(this, options);
  },

  // https://www.neutrinoapi.com/api/geocode-address/
  geocode: function(query, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + 'geocode-address',
      {
        apiKey: this.options.apiKey,
        userId: this.options.userId,
        //get three words and make a dot based string
        address: query.split(/\s+/).join('.')
      },
      function(data) {
        var results = [],
          latLng,
          latLngBounds;
        if (data.locations) {
          data.geometry = data.locations[0];
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(data.geometry['latitude'], data.geometry['longitude']);
          latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng);
          results[0] = {
            name: data.geometry.address,
            bbox: latLngBounds,
            center: latLng
          };
        }

        cb.call(context, results);
      }
    );
  },

  suggest: function(query, cb, context) {
    return this.geocode(query, cb, context);
  },

  // https://www.neutrinoapi.com/api/geocode-reverse/
  reverse: function(location, scale, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + 'geocode-reverse',
      {
        apiKey: this.options.apiKey,
        userId: this.options.userId,
        latitude: location.lat,
        longitude: location.lng
      },
      function(data) {
        var results = [],
          latLng,
          latLngBounds;
        if (data.status.status == 200 && data.found) {
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(location.lat, location.lng);
          latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng);
          results[0] = {
            name: data.address,
            bbox: latLngBounds,
            center: latLng
          };
        }
        cb.call(context, results);
      }
    );
  }
});

function neutrino(accessToken) {
  return new Neutrino(accessToken);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/nominatim.js":
/*!**************************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/nominatim.js ***!
  \**************************************************************************/
/*! exports provided: Nominatim, nominatim */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nominatim", function() { return Nominatim; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nominatim", function() { return nominatim; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var Nominatim = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    serviceUrl: 'https://nominatim.openstreetmap.org/',
    geocodingQueryParams: {},
    reverseQueryParams: {},
    htmlTemplate: function(r) {
      var a = r.address,
        className,
        parts = [];
      if (a.road || a.building) {
        parts.push('{building} {road} {house_number}');
      }

      if (a.city || a.town || a.village || a.hamlet) {
        className = parts.length > 0 ? 'leaflet-control-geocoder-address-detail' : '';
        parts.push(
          '<span class="' + className + '">{postcode} {city} {town} {village} {hamlet}</span>'
        );
      }

      if (a.state || a.country) {
        className = parts.length > 0 ? 'leaflet-control-geocoder-address-context' : '';
        parts.push('<span class="' + className + '">{state} {country}</span>');
      }

      return Object(_util__WEBPACK_IMPORTED_MODULE_1__["template"])(parts.join('<br/>'), a, true);
    }
  },

  initialize: function(options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.setOptions(this, options);
  },

  geocode: function(query, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + 'search',
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(
        {
          q: query,
          limit: 5,
          format: 'json',
          addressdetails: 1
        },
        this.options.geocodingQueryParams
      ),
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function(data) {
        var results = [];
        for (var i = data.length - 1; i >= 0; i--) {
          var bbox = data[i].boundingbox;
          for (var j = 0; j < 4; j++) bbox[j] = parseFloat(bbox[j]);
          results[i] = {
            icon: data[i].icon,
            name: data[i].display_name,
            html: this.options.htmlTemplate ? this.options.htmlTemplate(data[i]) : undefined,
            bbox: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]]),
            center: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(data[i].lat, data[i].lon),
            properties: data[i]
          };
        }
        cb.call(context, results);
      }, this)
    );
  },

  reverse: function(location, scale, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + 'reverse',
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(
        {
          lat: location.lat,
          lon: location.lng,
          zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
          addressdetails: 1,
          format: 'json'
        },
        this.options.reverseQueryParams
      ),
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function(data) {
        var result = [],
          loc;

        if (data && data.lat && data.lon) {
          loc = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(data.lat, data.lon);
          result.push({
            name: data.display_name,
            html: this.options.htmlTemplate ? this.options.htmlTemplate(data) : undefined,
            center: loc,
            bounds: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(loc, loc),
            properties: data
          });
        }

        cb.call(context, result);
      }, this)
    );
  }
});

function nominatim(options) {
  return new Nominatim(options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/open-location-code.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/open-location-code.js ***!
  \***********************************************************************************/
/*! exports provided: OpenLocationCode, openLocationCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenLocationCode", function() { return OpenLocationCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openLocationCode", function() { return openLocationCode; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);


var OpenLocationCode = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    OpenLocationCode: undefined,
    codeLength: undefined
  },

  initialize: function(options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.setOptions(this, options);
  },

  geocode: function(query, cb, context) {
    try {
      var decoded = this.options.OpenLocationCode.decode(query);
      var result = {
        name: query,
        center: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(decoded.latitudeCenter, decoded.longitudeCenter),
        bbox: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
          leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(decoded.latitudeLo, decoded.longitudeLo),
          leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(decoded.latitudeHi, decoded.longitudeHi)
        )
      };
      cb.call(context, [result]);
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console
      cb.call(context, []);
    }
  },
  reverse: function(location, scale, cb, context) {
    try {
      var code = this.options.OpenLocationCode.encode(
        location.lat,
        location.lng,
        this.options.codeLength
      );
      var result = {
        name: code,
        center: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(location.lat, location.lng),
        bbox: leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
          leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(location.lat, location.lng),
          leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(location.lat, location.lng)
        )
      };
      cb.call(context, [result]);
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console
      cb.call(context, []);
    }
  }
});

function openLocationCode(options) {
  return new OpenLocationCode(options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/opencage.js":
/*!*************************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/opencage.js ***!
  \*************************************************************************/
/*! exports provided: OpenCage, opencage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenCage", function() { return OpenCage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opencage", function() { return opencage; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var OpenCage = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    serviceUrl: 'https://api.opencagedata.com/geocode/v1/json',
    geocodingQueryParams: {},
    reverseQueryParams: {}
  },

  initialize: function(apiKey, options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.setOptions(this, options);
    this._accessToken = apiKey;
  },

  geocode: function(query, cb, context) {
    var params = {
      key: this._accessToken,
      q: query
    };
    params = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(params, this.options.geocodingQueryParams);
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(this.options.serviceUrl, params, function(data) {
      var results = [],
        latLng,
        latLngBounds,
        loc;
      if (data.results && data.results.length) {
        for (var i = 0; i < data.results.length; i++) {
          loc = data.results[i];
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.geometry);
          if (loc.annotations && loc.annotations.bounds) {
            latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
              leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.annotations.bounds.northeast),
              leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.annotations.bounds.southwest)
            );
          } else {
            latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng);
          }
          results.push({
            name: loc.formatted,
            bbox: latLngBounds,
            center: latLng
          });
        }
      }
      cb.call(context, results);
    });
  },

  suggest: function(query, cb, context) {
    return this.geocode(query, cb, context);
  },

  reverse: function(location, scale, cb, context) {
    var params = {
      key: this._accessToken,
      q: [location.lat, location.lng].join(',')
    };
    params = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(params, this.options.reverseQueryParams);
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(this.options.serviceUrl, params, function(data) {
      var results = [],
        latLng,
        latLngBounds,
        loc;
      if (data.results && data.results.length) {
        for (var i = 0; i < data.results.length; i++) {
          loc = data.results[i];
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.geometry);
          if (loc.annotations && loc.annotations.bounds) {
            latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
              leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.annotations.bounds.northeast),
              leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(loc.annotations.bounds.southwest)
            );
          } else {
            latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng);
          }
          results.push({
            name: loc.formatted,
            bbox: latLngBounds,
            center: latLng
          });
        }
      }
      cb.call(context, results);
    });
  }
});

function opencage(apiKey, options) {
  return new OpenCage(apiKey, options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/pelias.js":
/*!***********************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/pelias.js ***!
  \***********************************************************************/
/*! exports provided: Pelias, pelias, GeocodeEarth, geocodeEarth, Mapzen, mapzen, Openrouteservice, openrouteservice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pelias", function() { return Pelias; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pelias", function() { return pelias; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeocodeEarth", function() { return GeocodeEarth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geocodeEarth", function() { return geocodeEarth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mapzen", function() { return Mapzen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapzen", function() { return mapzen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Openrouteservice", function() { return Openrouteservice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openrouteservice", function() { return openrouteservice; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var Pelias = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    serviceUrl: 'https://api.geocode.earth/v1',
    geocodingQueryParams: {},
    reverseQueryParams: {}
  },

  initialize: function(apiKey, options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.setOptions(this, options);
    this._apiKey = apiKey;
    this._lastSuggest = 0;
  },

  geocode: function(query, cb, context) {
    var _this = this;
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + '/search',
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(
        {
          api_key: this._apiKey,
          text: query
        },
        this.options.geocodingQueryParams
      ),
      function(data) {
        cb.call(context, _this._parseResults(data, 'bbox'));
      }
    );
  },

  suggest: function(query, cb, context) {
    var _this = this;
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + '/autocomplete',
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(
        {
          api_key: this._apiKey,
          text: query
        },
        this.options.geocodingQueryParams
      ),
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function(data) {
        if (data.geocoding.timestamp > this._lastSuggest) {
          this._lastSuggest = data.geocoding.timestamp;
          cb.call(context, _this._parseResults(data, 'bbox'));
        }
      }, this)
    );
  },

  reverse: function(location, scale, cb, context) {
    var _this = this;
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + '/reverse',
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(
        {
          api_key: this._apiKey,
          'point.lat': location.lat,
          'point.lon': location.lng
        },
        this.options.reverseQueryParams
      ),
      function(data) {
        cb.call(context, _this._parseResults(data, 'bounds'));
      }
    );
  },

  _parseResults: function(data, bboxname) {
    var results = [];
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        return leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.circleMarker(latlng);
      },
      onEachFeature: function(feature, layer) {
        var result = {},
          bbox,
          center;

        if (layer.getBounds) {
          bbox = layer.getBounds();
          center = bbox.getCenter();
        } else if (layer.feature.bbox) {
          center = layer.getLatLng();
          bbox = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(
            leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.GeoJSON.coordsToLatLng(layer.feature.bbox.slice(0, 2)),
            leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.GeoJSON.coordsToLatLng(layer.feature.bbox.slice(2, 4))
          );
        } else {
          center = layer.getLatLng();
          bbox = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(center, center);
        }

        result.name = layer.feature.properties.label;
        result.center = center;
        result[bboxname] = bbox;
        result.properties = layer.feature.properties;
        results.push(result);
      }
    });
    return results;
  }
});

function pelias(apiKey, options) {
  return new Pelias(apiKey, options);
}
var GeocodeEarth = Pelias;
var geocodeEarth = pelias;

var Mapzen = Pelias; // r.i.p.
var mapzen = pelias;

var Openrouteservice = Mapzen.extend({
  options: {
    serviceUrl: 'https://api.openrouteservice.org/geocode'
  }
});
function openrouteservice(apiKey, options) {
  return new Openrouteservice(apiKey, options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/photon.js":
/*!***********************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/photon.js ***!
  \***********************************************************************/
/*! exports provided: Photon, photon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Photon", function() { return Photon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "photon", function() { return photon; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var Photon = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    serviceUrl: 'https://photon.komoot.de/api/',
    reverseUrl: 'https://photon.komoot.de/reverse/',
    nameProperties: ['name', 'street', 'suburb', 'hamlet', 'town', 'city', 'state', 'country']
  },

  initialize: function(options) {
    leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.setOptions(this, options);
  },

  geocode: function(query, cb, context) {
    var params = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(
      {
        q: query
      },
      this.options.geocodingQueryParams
    );

    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl,
      params,
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function(data) {
        cb.call(context, this._decodeFeatures(data));
      }, this)
    );
  },

  suggest: function(query, cb, context) {
    return this.geocode(query, cb, context);
  },

  reverse: function(latLng, scale, cb, context) {
    var params = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.extend(
      {
        lat: latLng.lat,
        lon: latLng.lng
      },
      this.options.reverseQueryParams
    );

    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.reverseUrl,
      params,
      leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function(data) {
        cb.call(context, this._decodeFeatures(data));
      }, this)
    );
  },

  _decodeFeatures: function(data) {
    var results = [],
      i,
      f,
      c,
      latLng,
      extent,
      bbox;

    if (data && data.features) {
      for (i = 0; i < data.features.length; i++) {
        f = data.features[i];
        c = f.geometry.coordinates;
        latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(c[1], c[0]);
        extent = f.properties.extent;

        if (extent) {
          bbox = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds([extent[1], extent[0]], [extent[3], extent[2]]);
        } else {
          bbox = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng);
        }

        results.push({
          name: this._decodeFeatureName(f),
          html: this.options.htmlTemplate ? this.options.htmlTemplate(f) : undefined,
          center: latLng,
          bbox: bbox,
          properties: f.properties
        });
      }
    }

    return results;
  },

  _decodeFeatureName: function(f) {
    return (this.options.nameProperties || [])
      .map(function(p) {
        return f.properties[p];
      })
      .filter(function(v) {
        return !!v;
      })
      .join(', ');
  }
});

function photon(options) {
  return new Photon(options);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/geocoders/what3words.js":
/*!***************************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/geocoders/what3words.js ***!
  \***************************************************************************/
/*! exports provided: What3Words, what3words */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "What3Words", function() { return What3Words; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "what3words", function() { return what3words; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./node_modules/leaflet-control-geocoder/src/util.js");



var What3Words = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Class.extend({
  options: {
    serviceUrl: 'https://api.what3words.com/v2/'
  },

  initialize: function(accessToken) {
    this._accessToken = accessToken;
  },

  geocode: function(query, cb, context) {
    //get three words and make a dot based string
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + 'forward',
      {
        key: this._accessToken,
        addr: query.split(/\s+/).join('.')
      },
      function(data) {
        var results = [],
          latLng,
          latLngBounds;
        if (data.geometry) {
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(data.geometry['lat'], data.geometry['lng']);
          latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng);
          results[0] = {
            name: data.words,
            bbox: latLngBounds,
            center: latLng
          };
        }

        cb.call(context, results);
      }
    );
  },

  suggest: function(query, cb, context) {
    return this.geocode(query, cb, context);
  },

  reverse: function(location, scale, cb, context) {
    Object(_util__WEBPACK_IMPORTED_MODULE_1__["getJSON"])(
      this.options.serviceUrl + 'reverse',
      {
        key: this._accessToken,
        coords: [location.lat, location.lng].join(',')
      },
      function(data) {
        var results = [],
          latLng,
          latLngBounds;
        if (data.status.status == 200) {
          latLng = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLng(data.geometry['lat'], data.geometry['lng']);
          latLngBounds = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.latLngBounds(latLng, latLng);
          results[0] = {
            name: data.words,
            bbox: latLngBounds,
            center: latLng
          };
        }
        cb.call(context, results);
      }
    );
  }
});

function what3words(accessToken) {
  return new What3Words(accessToken);
}


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/index.js":
/*!************************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control */ "./node_modules/leaflet-control-geocoder/src/control.js");
/* harmony import */ var _geocoders_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./geocoders/index */ "./node_modules/leaflet-control-geocoder/src/geocoders/index.js");




leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(_control__WEBPACK_IMPORTED_MODULE_1__["Geocoder"], _geocoders_index__WEBPACK_IMPORTED_MODULE_2__);
/* harmony default export */ __webpack_exports__["default"] = (_control__WEBPACK_IMPORTED_MODULE_1__["Geocoder"]);

leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.extend(leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Control, {
  Geocoder: _control__WEBPACK_IMPORTED_MODULE_1__["Geocoder"],
  geocoder: _control__WEBPACK_IMPORTED_MODULE_1__["geocoder"]
});


/***/ }),

/***/ "./node_modules/leaflet-control-geocoder/src/util.js":
/*!***********************************************************!*\
  !*** ./node_modules/leaflet-control-geocoder/src/util.js ***!
  \***********************************************************/
/*! exports provided: htmlEscape, jsonp, getJSON, template, getParamString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "htmlEscape", function() { return htmlEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsonp", function() { return jsonp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getJSON", function() { return getJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "template", function() { return template; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParamString", function() { return getParamString; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);

var lastCallbackId = 0;

// Adapted from handlebars.js
// https://github.com/wycats/handlebars.js/
var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

function escapeChar(chr) {
  return escape[chr];
}

function htmlEscape(string) {
  if (string == null) {
    return '';
  } else if (!string) {
    return string + '';
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = '' + string;

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function jsonp(url, params, callback, context, jsonpParam) {
  var callbackId = '_l_geocoder_' + lastCallbackId++;
  params[jsonpParam || 'callback'] = callbackId;
  window[callbackId] = leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.bind(callback, context);
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url + getParamString(params);
  script.id = callbackId;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function getJSON(url, params, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState !== 4) {
      return;
    }
    var message;
    if (xmlHttp.status !== 200 && xmlHttp.status !== 304) {
      message = '';
    } else if (typeof xmlHttp.response === 'string') {
      // IE doesn't parse JSON responses even with responseType: 'json'.
      try {
        message = JSON.parse(xmlHttp.response);
      } catch (e) {
        // Not a JSON response
        message = xmlHttp.response;
      }
    } else {
      message = xmlHttp.response;
    }
    callback(message);
  };
  xmlHttp.open('GET', url + getParamString(params), true);
  xmlHttp.responseType = 'json';
  xmlHttp.setRequestHeader('Accept', 'application/json');
  xmlHttp.send(null);
}

function template(str, data) {
  return str.replace(/\{ *([\w_]+) *\}/g, function(str, key) {
    var value = data[key];
    if (value === undefined) {
      value = '';
    } else if (typeof value === 'function') {
      value = value(data);
    }
    return htmlEscape(value);
  });
}

function getParamString(obj, existingUrl, uppercase) {
  var params = [];
  for (var i in obj) {
    var key = encodeURIComponent(uppercase ? i.toUpperCase() : i);
    var value = obj[i];
    if (!leaflet__WEBPACK_IMPORTED_MODULE_0___default.a.Util.isArray(value)) {
      params.push(key + '=' + encodeURIComponent(value));
    } else {
      for (var j = 0; j < value.length; j++) {
        params.push(key + '=' + encodeURIComponent(value[j]));
      }
    }
  }
  return (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') + params.join('&');
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1jb250cm9sLWdlb2NvZGVyL3NyYy9jb250cm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXIvc3JjL2dlb2NvZGVycy9hcmNnaXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci9zcmMvZ2VvY29kZXJzL2JpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci9zcmMvZ2VvY29kZXJzL2dvb2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1jb250cm9sLWdlb2NvZGVyL3NyYy9nZW9jb2RlcnMvaGVyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1jb250cm9sLWdlb2NvZGVyL3NyYy9nZW9jb2RlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci9zcmMvZ2VvY29kZXJzL2xhdGxuZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1jb250cm9sLWdlb2NvZGVyL3NyYy9nZW9jb2RlcnMvbWFwYm94LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXIvc3JjL2dlb2NvZGVycy9tYXBxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1jb250cm9sLWdlb2NvZGVyL3NyYy9nZW9jb2RlcnMvbmV1dHJpbm8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci9zcmMvZ2VvY29kZXJzL25vbWluYXRpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1jb250cm9sLWdlb2NvZGVyL3NyYy9nZW9jb2RlcnMvb3Blbi1sb2NhdGlvbi1jb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXIvc3JjL2dlb2NvZGVycy9vcGVuY2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1jb250cm9sLWdlb2NvZGVyL3NyYy9nZW9jb2RlcnMvcGVsaWFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXIvc3JjL2dlb2NvZGVycy9waG90b24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci9zcmMvZ2VvY29kZXJzL3doYXQzd29yZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0I7QUFDc0I7O0FBRXZDLGVBQWUsOENBQUM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILFlBQVksOENBQUMsc0JBQXNCLDhDQUFDOztBQUVwQztBQUNBLElBQUksOENBQUM7QUFDTDtBQUNBLGtDQUFrQywwREFBUztBQUMzQzs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxJQUFJLDhDQUFDO0FBQ0wsR0FBRzs7QUFFSDtBQUNBLElBQUksOENBQUM7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSxrQkFBa0IsOENBQUM7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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFlBQVk7QUFDWixZQUFZO0FBQ1osY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsdUJBQXVCLDhDQUFDO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUCx3QkFBd0IsY0FBYztBQUN0QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDhDQUFDO0FBQ1Y7QUFDQSxLQUFLO0FBQ0wscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUMiLCJmaWxlIjoianMvdmVuZG9yc35jb250cm9sLWdlb2NvZGVyQ29udHJvbEZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IE5vbWluYXRpbSB9IGZyb20gJy4vZ2VvY29kZXJzL2luZGV4JztcblxuZXhwb3J0IHZhciBHZW9jb2RlciA9IEwuQ29udHJvbC5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgc2hvd1VuaXF1ZVJlc3VsdDogdHJ1ZSxcbiAgICBzaG93UmVzdWx0SWNvbnM6IGZhbHNlLFxuICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICBleHBhbmQ6ICd0b3VjaCcsIC8vIG9wdGlvbnM6IHRvdWNoLCBjbGljaywgYW55dGhpbmdlbHNlXG4gICAgcG9zaXRpb246ICd0b3ByaWdodCcsXG4gICAgcGxhY2Vob2xkZXI6ICdTZWFyY2guLi4nLFxuICAgIGVycm9yTWVzc2FnZTogJ05vdGhpbmcgZm91bmQuJyxcbiAgICBpY29uTGFiZWw6ICdJbml0aWF0ZSBhIG5ldyBzZWFyY2gnLFxuICAgIHF1ZXJ5TWluTGVuZ3RoOiAxLFxuICAgIHN1Z2dlc3RNaW5MZW5ndGg6IDMsXG4gICAgc3VnZ2VzdFRpbWVvdXQ6IDI1MCxcbiAgICBkZWZhdWx0TWFya0dlb2NvZGU6IHRydWVcbiAgfSxcblxuICBpbmNsdWRlczogTC5FdmVudGVkLnByb3RvdHlwZSB8fCBMLk1peGluLkV2ZW50cyxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZ2VvY29kZXIpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5nZW9jb2RlciA9IG5ldyBOb21pbmF0aW0oKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZXF1ZXN0Q291bnQgPSAwO1xuICB9LFxuXG4gIGFkZFRocm9iYmVyQ2xhc3M6IGZ1bmN0aW9uKCkge1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXItdGhyb2JiZXInKTtcbiAgfSxcblxuICByZW1vdmVUaHJvYmJlckNsYXNzOiBmdW5jdGlvbigpIHtcbiAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnbGVhZmxldC1jb250cm9sLWdlb2NvZGVyLXRocm9iYmVyJyk7XG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuICAgIHZhciBjbGFzc05hbWUgPSAnbGVhZmxldC1jb250cm9sLWdlb2NvZGVyJyxcbiAgICAgIGNvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGNsYXNzTmFtZSArICcgbGVhZmxldC1iYXInKSxcbiAgICAgIGljb24gPSBMLkRvbVV0aWwuY3JlYXRlKCdidXR0b24nLCBjbGFzc05hbWUgKyAnLWljb24nLCBjb250YWluZXIpLFxuICAgICAgZm9ybSA9ICh0aGlzLl9mb3JtID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lICsgJy1mb3JtJywgY29udGFpbmVyKSksXG4gICAgICBpbnB1dDtcblxuICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgICB0aGlzLl9jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICBpY29uLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgIGljb24udHlwZSA9ICdidXR0b24nO1xuICAgIGljb24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdGhpcy5vcHRpb25zLmljb25MYWJlbCk7XG5cbiAgICBpbnB1dCA9IHRoaXMuX2lucHV0ID0gTC5Eb21VdGlsLmNyZWF0ZSgnaW5wdXQnLCAnJywgZm9ybSk7XG4gICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBpbnB1dC52YWx1ZSA9IHRoaXMub3B0aW9ucy5xdWVyeSB8fCAnJztcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgICBMLkRvbUV2ZW50LmRpc2FibGVDbGlja1Byb3BhZ2F0aW9uKGlucHV0KTtcblxuICAgIHRoaXMuX2Vycm9yRWxlbWVudCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGNsYXNzTmFtZSArICctZm9ybS1uby1lcnJvcicsIGNvbnRhaW5lcik7XG4gICAgdGhpcy5fZXJyb3JFbGVtZW50LmlubmVySFRNTCA9IHRoaXMub3B0aW9ucy5lcnJvck1lc3NhZ2U7XG5cbiAgICB0aGlzLl9hbHRzID0gTC5Eb21VdGlsLmNyZWF0ZShcbiAgICAgICd1bCcsXG4gICAgICBjbGFzc05hbWUgKyAnLWFsdGVybmF0aXZlcyBsZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXItYWx0ZXJuYXRpdmVzLW1pbmltaXplZCcsXG4gICAgICBjb250YWluZXJcbiAgICApO1xuICAgIEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24odGhpcy5fYWx0cyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKGlucHV0LCAna2V5ZG93bicsIHRoaXMuX2tleWRvd24sIHRoaXMpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZ2VvY29kZXIuc3VnZ2VzdCkge1xuICAgICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihpbnB1dCwgJ2lucHV0JywgdGhpcy5fY2hhbmdlLCB0aGlzKTtcbiAgICB9XG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihcbiAgICAgIGlucHV0LFxuICAgICAgJ2JsdXInLFxuICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29sbGFwc2VkICYmICF0aGlzLl9wcmV2ZW50Qmx1ckNvbGxhcHNlKSB7XG4gICAgICAgICAgdGhpcy5fY29sbGFwc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmV2ZW50Qmx1ckNvbGxhcHNlID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgdGhpc1xuICAgICk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbGxhcHNlZCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHBhbmQgPT09ICdjbGljaycpIHtcbiAgICAgICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoZS5idXR0b24gPT09IDAgJiYgZS5kZXRhaWwgIT09IDIpIHtcbiAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5leHBhbmQgPT09ICd0b3VjaCcpIHtcbiAgICAgICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgTC5Ccm93c2VyLnRvdWNoID8gJ3RvdWNoc3RhcnQgbW91c2Vkb3duJyA6ICdtb3VzZWRvd24nLFxuICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvZ2dsZSgpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBtb2JpbGU6IGNsaWNraW5nIGZvY3VzZXMgdGhlIGljb24sIHNvIFVJIGV4cGFuZHMgYW5kIGltbWVkaWF0ZWx5IGNvbGxhcHNlc1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIoY29udGFpbmVyLCAnbW91c2VvdmVyJywgdGhpcy5fZXhwYW5kLCB0aGlzKTtcbiAgICAgICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihjb250YWluZXIsICdtb3VzZW91dCcsIHRoaXMuX2NvbGxhcHNlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fbWFwLm9uKCdtb3Zlc3RhcnQnLCB0aGlzLl9jb2xsYXBzZSwgdGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2V4cGFuZCgpO1xuICAgICAgaWYgKEwuQnJvd3Nlci50b3VjaCkge1xuICAgICAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLl9nZW9jb2RlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5fZ2VvY29kZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVmYXVsdE1hcmtHZW9jb2RlKSB7XG4gICAgICB0aGlzLm9uKCdtYXJrZ2VvY29kZScsIHRoaXMubWFya0dlb2NvZGUsIHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMub24oJ3N0YXJ0Z2VvY29kZScsIHRoaXMuYWRkVGhyb2JiZXJDbGFzcywgdGhpcyk7XG4gICAgdGhpcy5vbignZmluaXNoZ2VvY29kZScsIHRoaXMucmVtb3ZlVGhyb2JiZXJDbGFzcywgdGhpcyk7XG4gICAgdGhpcy5vbignc3RhcnRzdWdnZXN0JywgdGhpcy5hZGRUaHJvYmJlckNsYXNzLCB0aGlzKTtcbiAgICB0aGlzLm9uKCdmaW5pc2hzdWdnZXN0JywgdGhpcy5yZW1vdmVUaHJvYmJlckNsYXNzLCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24oY29udGFpbmVyKTtcblxuICAgIHJldHVybiBjb250YWluZXI7XG4gIH0sXG5cbiAgc2V0UXVlcnk6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHRoaXMuX2lucHV0LnZhbHVlID0gc3RyaW5nO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF9nZW9jb2RlUmVzdWx0OiBmdW5jdGlvbihyZXN1bHRzLCBzdWdnZXN0KSB7XG4gICAgaWYgKCFzdWdnZXN0ICYmIHRoaXMub3B0aW9ucy5zaG93VW5pcXVlUmVzdWx0ICYmIHJlc3VsdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9nZW9jb2RlUmVzdWx0U2VsZWN0ZWQocmVzdWx0c1swXSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2FsdHMuaW5uZXJIVE1MID0gJyc7XG4gICAgICB0aGlzLl9yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9hbHRzLCAnbGVhZmxldC1jb250cm9sLWdlb2NvZGVyLWFsdGVybmF0aXZlcy1taW5pbWl6ZWQnKTtcbiAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXItb3B0aW9ucy1vcGVuJyk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5fYWx0cy5hcHBlbmRDaGlsZCh0aGlzLl9jcmVhdGVBbHQocmVzdWx0c1tpXSwgaSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnbGVhZmxldC1jb250cm9sLWdlb2NvZGVyLW9wdGlvbnMtZXJyb3InKTtcbiAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9lcnJvckVsZW1lbnQsICdsZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXItZXJyb3InKTtcbiAgICB9XG4gIH0sXG5cbiAgbWFya0dlb2NvZGU6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHJlc3VsdCA9IHJlc3VsdC5nZW9jb2RlIHx8IHJlc3VsdDtcblxuICAgIHRoaXMuX21hcC5maXRCb3VuZHMocmVzdWx0LmJib3gpO1xuXG4gICAgaWYgKHRoaXMuX2dlb2NvZGVNYXJrZXIpIHtcbiAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9nZW9jb2RlTWFya2VyKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZW9jb2RlTWFya2VyID0gbmV3IEwuTWFya2VyKHJlc3VsdC5jZW50ZXIpXG4gICAgICAuYmluZFBvcHVwKHJlc3VsdC5odG1sIHx8IHJlc3VsdC5uYW1lKVxuICAgICAgLmFkZFRvKHRoaXMuX21hcClcbiAgICAgIC5vcGVuUG9wdXAoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF9nZW9jb2RlOiBmdW5jdGlvbihzdWdnZXN0KSB7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5faW5wdXQudmFsdWU7XG4gICAgaWYgKCFzdWdnZXN0ICYmIHZhbHVlLmxlbmd0aCA8IHRoaXMub3B0aW9ucy5xdWVyeU1pbkxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZXF1ZXN0Q291bnQgPSArK3RoaXMuX3JlcXVlc3RDb3VudCxcbiAgICAgIG1vZGUgPSBzdWdnZXN0ID8gJ3N1Z2dlc3QnIDogJ2dlb2NvZGUnLFxuICAgICAgZXZlbnREYXRhID0geyBpbnB1dDogdmFsdWUgfTtcblxuICAgIHRoaXMuX2xhc3RHZW9jb2RlID0gdmFsdWU7XG4gICAgaWYgKCFzdWdnZXN0KSB7XG4gICAgICB0aGlzLl9jbGVhclJlc3VsdHMoKTtcbiAgICB9XG5cbiAgICB0aGlzLmZpcmUoJ3N0YXJ0JyArIG1vZGUsIGV2ZW50RGF0YSk7XG4gICAgdGhpcy5vcHRpb25zLmdlb2NvZGVyW21vZGVdKFxuICAgICAgdmFsdWUsXG4gICAgICBmdW5jdGlvbihyZXN1bHRzKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0Q291bnQgPT09IHRoaXMuX3JlcXVlc3RDb3VudCkge1xuICAgICAgICAgIGV2ZW50RGF0YS5yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgICAgICB0aGlzLmZpcmUoJ2ZpbmlzaCcgKyBtb2RlLCBldmVudERhdGEpO1xuICAgICAgICAgIHRoaXMuX2dlb2NvZGVSZXN1bHQocmVzdWx0cywgc3VnZ2VzdCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfSxcblxuICBfZ2VvY29kZVJlc3VsdFNlbGVjdGVkOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICB0aGlzLmZpcmUoJ21hcmtnZW9jb2RlJywgeyBnZW9jb2RlOiByZXN1bHQgfSk7XG4gIH0sXG5cbiAgX3RvZ2dsZTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKEwuRG9tVXRpbC5oYXNDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXItZXhwYW5kZWQnKSkge1xuICAgICAgdGhpcy5fY29sbGFwc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZXhwYW5kKCk7XG4gICAgfVxuICB9LFxuXG4gIF9leHBhbmQ6IGZ1bmN0aW9uKCkge1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXItZXhwYW5kZWQnKTtcbiAgICB0aGlzLl9pbnB1dC5zZWxlY3QoKTtcbiAgICB0aGlzLmZpcmUoJ2V4cGFuZCcpO1xuICB9LFxuXG4gIF9jb2xsYXBzZTogZnVuY3Rpb24oKSB7XG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci1leHBhbmRlZCcpO1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9hbHRzLCAnbGVhZmxldC1jb250cm9sLWdlb2NvZGVyLWFsdGVybmF0aXZlcy1taW5pbWl6ZWQnKTtcbiAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fZXJyb3JFbGVtZW50LCAnbGVhZmxldC1jb250cm9sLWdlb2NvZGVyLWVycm9yJyk7XG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci1vcHRpb25zLW9wZW4nKTtcbiAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnbGVhZmxldC1jb250cm9sLWdlb2NvZGVyLW9wdGlvbnMtZXJyb3InKTtcbiAgICB0aGlzLl9pbnB1dC5ibHVyKCk7IC8vIG1vYmlsZToga2V5Ym9hcmQgc2hvdWxkbid0IHN0YXkgZXhwYW5kZWRcbiAgICB0aGlzLmZpcmUoJ2NvbGxhcHNlJyk7XG4gIH0sXG5cbiAgX2NsZWFyUmVzdWx0czogZnVuY3Rpb24oKSB7XG4gICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2FsdHMsICdsZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXItYWx0ZXJuYXRpdmVzLW1pbmltaXplZCcpO1xuICAgIHRoaXMuX3NlbGVjdGlvbiA9IG51bGw7XG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2Vycm9yRWxlbWVudCwgJ2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci1lcnJvcicpO1xuICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXItb3B0aW9ucy1vcGVuJyk7XG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci1vcHRpb25zLWVycm9yJyk7XG4gIH0sXG5cbiAgX2NyZWF0ZUFsdDogZnVuY3Rpb24ocmVzdWx0LCBpbmRleCkge1xuICAgIHZhciBsaSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2xpJywgJycpLFxuICAgICAgYSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2EnLCAnJywgbGkpLFxuICAgICAgaWNvbiA9IHRoaXMub3B0aW9ucy5zaG93UmVzdWx0SWNvbnMgJiYgcmVzdWx0Lmljb24gPyBMLkRvbVV0aWwuY3JlYXRlKCdpbWcnLCAnJywgYSkgOiBudWxsLFxuICAgICAgdGV4dCA9IHJlc3VsdC5odG1sID8gdW5kZWZpbmVkIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocmVzdWx0Lm5hbWUpLFxuICAgICAgbW91c2VEb3duSGFuZGxlciA9IGZ1bmN0aW9uIG1vdXNlRG93bkhhbmRsZXIoZSkge1xuICAgICAgICAvLyBJbiBzb21lIGJyb3dzZXJzLCBhIGNsaWNrIHdpbGwgZmlyZSBvbiB0aGUgbWFwIGlmIHRoZSBjb250cm9sIGlzXG4gICAgICAgIC8vIGNvbGxhcHNlZCBkaXJlY3RseSBhZnRlciBtb3VzZWRvd24uIFRvIHdvcmsgYXJvdW5kIHRoaXMsIHdlXG4gICAgICAgIC8vIHdhaXQgdW50aWwgdGhlIGNsaWNrIGlzIGNvbXBsZXRlZCwgYW5kIF90aGVuXyBjb2xsYXBzZSB0aGVcbiAgICAgICAgLy8gY29udHJvbC4gTWVzc3ksIGJ1dCB0aGlzIGlzIHRoZSB3b3JrYXJvdW5kIEkgY291bGQgY29tZSB1cCB3aXRoXG4gICAgICAgIC8vIGZvciAjMTQyLlxuICAgICAgICB0aGlzLl9wcmV2ZW50Qmx1ckNvbGxhcHNlID0gdHJ1ZTtcbiAgICAgICAgTC5Eb21FdmVudC5zdG9wKGUpO1xuICAgICAgICB0aGlzLl9nZW9jb2RlUmVzdWx0U2VsZWN0ZWQocmVzdWx0KTtcbiAgICAgICAgTC5Eb21FdmVudC5vbihcbiAgICAgICAgICBsaSxcbiAgICAgICAgICAnY2xpY2sgdG91Y2hlbmQnLFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fY29sbGFwc2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NsZWFyUmVzdWx0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfTtcblxuICAgIGlmIChpY29uKSB7XG4gICAgICBpY29uLnNyYyA9IHJlc3VsdC5pY29uO1xuICAgIH1cblxuICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS1yZXN1bHQtaW5kZXgnLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0Lmh0bWwpIHtcbiAgICAgIGEuaW5uZXJIVE1MID0gYS5pbm5lckhUTUwgKyByZXN1bHQuaHRtbDtcbiAgICB9IGVsc2Uge1xuICAgICAgYS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICB9XG5cbiAgICAvLyBVc2UgbW91c2Vkb3duIGFuZCBub3QgY2xpY2ssIHNpbmNlIGNsaWNrIHdpbGwgZmlyZSBfYWZ0ZXJfIGJsdXIsXG4gICAgLy8gY2F1c2luZyB0aGUgY29udHJvbCB0byBoYXZlIGNvbGxhcHNlZCBhbmQgcmVtb3ZlZCB0aGUgaXRlbXNcbiAgICAvLyBiZWZvcmUgdGhlIGNsaWNrIGNhbiBmaXJlLlxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIobGksICdtb3VzZWRvd24gdG91Y2hzdGFydCcsIG1vdXNlRG93bkhhbmRsZXIsIHRoaXMpO1xuXG4gICAgcmV0dXJuIGxpO1xuICB9LFxuXG4gIF9rZXlkb3duOiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgIHNlbGVjdCA9IGZ1bmN0aW9uIHNlbGVjdChkaXIpIHtcbiAgICAgICAgaWYgKF90aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3MoX3RoaXMuX3NlbGVjdGlvbiwgJ2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci1zZWxlY3RlZCcpO1xuICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24gPSBfdGhpcy5fc2VsZWN0aW9uW2RpciA+IDAgPyAnbmV4dFNpYmxpbmcnIDogJ3ByZXZpb3VzU2libGluZyddO1xuICAgICAgICB9XG4gICAgICAgIGlmICghX3RoaXMuX3NlbGVjdGlvbikge1xuICAgICAgICAgIF90aGlzLl9zZWxlY3Rpb24gPSBfdGhpcy5fYWx0c1tkaXIgPiAwID8gJ2ZpcnN0Q2hpbGQnIDogJ2xhc3RDaGlsZCddO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF90aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MoX3RoaXMuX3NlbGVjdGlvbiwgJ2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci1zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIC8vIEVzY2FwZVxuICAgICAgY2FzZSAyNzpcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICB0aGlzLl9jb2xsYXBzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2NsZWFyUmVzdWx0cygpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gVXBcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIHNlbGVjdCgtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gVXBcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHNlbGVjdCgxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBFbnRlclxuICAgICAgY2FzZSAxMzpcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KHRoaXMuX3NlbGVjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVzdWx0LWluZGV4JyksIDEwKTtcbiAgICAgICAgICB0aGlzLl9nZW9jb2RlUmVzdWx0U2VsZWN0ZWQodGhpcy5fcmVzdWx0c1tpbmRleF0pO1xuICAgICAgICAgIHRoaXMuX2NsZWFyUmVzdWx0cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2dlb2NvZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xuICB9LFxuICBfY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHRoaXMuX2lucHV0LnZhbHVlO1xuICAgIGlmICh2ICE9PSB0aGlzLl9sYXN0R2VvY29kZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3N1Z2dlc3RUaW1lb3V0KTtcbiAgICAgIGlmICh2Lmxlbmd0aCA+PSB0aGlzLm9wdGlvbnMuc3VnZ2VzdE1pbkxlbmd0aCkge1xuICAgICAgICB0aGlzLl9zdWdnZXN0VGltZW91dCA9IHNldFRpbWVvdXQoXG4gICAgICAgICAgTC5iaW5kKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5fZ2VvY29kZSh0cnVlKTtcbiAgICAgICAgICB9LCB0aGlzKSxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuc3VnZ2VzdFRpbWVvdXRcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2NsZWFyUmVzdWx0cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9jb2RlcihvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2VvY29kZXIob3B0aW9ucyk7XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGdldEpTT04gfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IHZhciBBcmNHaXMgPSBMLkNsYXNzLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBzZXJ2aWNlX3VybDogJ2h0dHBzOi8vZ2VvY29kZS5hcmNnaXMuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL1dvcmxkL0dlb2NvZGVTZXJ2ZXInXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oYWNjZXNzVG9rZW4sIG9wdGlvbnMpIHtcbiAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fYWNjZXNzVG9rZW4gPSBhY2Nlc3NUb2tlbjtcbiAgfSxcblxuICBnZW9jb2RlOiBmdW5jdGlvbihxdWVyeSwgY2IsIGNvbnRleHQpIHtcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgU2luZ2xlTGluZTogcXVlcnksXG4gICAgICBvdXRGaWVsZHM6ICdBZGRyX1R5cGUnLFxuICAgICAgZm9yU3RvcmFnZTogZmFsc2UsXG4gICAgICBtYXhMb2NhdGlvbnM6IDEwLFxuICAgICAgZjogJ2pzb24nXG4gICAgfTtcblxuICAgIGlmICh0aGlzLl9rZXkgJiYgdGhpcy5fa2V5Lmxlbmd0aCkge1xuICAgICAgcGFyYW1zLnRva2VuID0gdGhpcy5fa2V5O1xuICAgIH1cblxuICAgIGdldEpTT04oXG4gICAgICB0aGlzLm9wdGlvbnMuc2VydmljZV91cmwgKyAnL2ZpbmRBZGRyZXNzQ2FuZGlkYXRlcycsXG4gICAgICBMLmV4dGVuZChwYXJhbXMsIHRoaXMub3B0aW9ucy5nZW9jb2RpbmdRdWVyeVBhcmFtcyksXG4gICAgICBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW10sXG4gICAgICAgICAgbG9jLFxuICAgICAgICAgIGxhdExuZyxcbiAgICAgICAgICBsYXRMbmdCb3VuZHM7XG5cbiAgICAgICAgaWYgKGRhdGEuY2FuZGlkYXRlcyAmJiBkYXRhLmNhbmRpZGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gZGF0YS5jYW5kaWRhdGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgbG9jID0gZGF0YS5jYW5kaWRhdGVzW2ldO1xuICAgICAgICAgICAgbGF0TG5nID0gTC5sYXRMbmcobG9jLmxvY2F0aW9uLnksIGxvYy5sb2NhdGlvbi54KTtcbiAgICAgICAgICAgIGxhdExuZ0JvdW5kcyA9IEwubGF0TG5nQm91bmRzKFxuICAgICAgICAgICAgICBMLmxhdExuZyhsb2MuZXh0ZW50LnltYXgsIGxvYy5leHRlbnQueG1heCksXG4gICAgICAgICAgICAgIEwubGF0TG5nKGxvYy5leHRlbnQueW1pbiwgbG9jLmV4dGVudC54bWluKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdHNbaV0gPSB7XG4gICAgICAgICAgICAgIG5hbWU6IGxvYy5hZGRyZXNzLFxuICAgICAgICAgICAgICBiYm94OiBsYXRMbmdCb3VuZHMsXG4gICAgICAgICAgICAgIGNlbnRlcjogbGF0TG5nXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNiLmNhbGwoY29udGV4dCwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgKTtcbiAgfSxcblxuICBzdWdnZXN0OiBmdW5jdGlvbihxdWVyeSwgY2IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5nZW9jb2RlKHF1ZXJ5LCBjYiwgY29udGV4dCk7XG4gIH0sXG5cbiAgcmV2ZXJzZTogZnVuY3Rpb24obG9jYXRpb24sIHNjYWxlLCBjYiwgY29udGV4dCkge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBsb2NhdGlvbjogZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uLmxuZykgKyAnLCcgKyBlbmNvZGVVUklDb21wb25lbnQobG9jYXRpb24ubGF0KSxcbiAgICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgICBmOiAnanNvbidcbiAgICB9O1xuXG4gICAgZ2V0SlNPTih0aGlzLm9wdGlvbnMuc2VydmljZV91cmwgKyAnL3JldmVyc2VHZW9jb2RlJywgcGFyYW1zLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICAgIGxvYztcblxuICAgICAgaWYgKGRhdGEgJiYgIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgbG9jID0gTC5sYXRMbmcoZGF0YS5sb2NhdGlvbi55LCBkYXRhLmxvY2F0aW9uLngpO1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgbmFtZTogZGF0YS5hZGRyZXNzLk1hdGNoX2FkZHIsXG4gICAgICAgICAgY2VudGVyOiBsb2MsXG4gICAgICAgICAgYm91bmRzOiBMLmxhdExuZ0JvdW5kcyhsb2MsIGxvYylcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNiLmNhbGwoY29udGV4dCwgcmVzdWx0KTtcbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmNnaXMoYWNjZXNzVG9rZW4sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBBcmNHaXMoYWNjZXNzVG9rZW4sIG9wdGlvbnMpO1xufVxuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBqc29ucCB9IGZyb20gJy4uL3V0aWwnO1xuXG5leHBvcnQgdmFyIEJpbmcgPSBMLkNsYXNzLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGtleSkge1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICB9LFxuXG4gIGdlb2NvZGU6IGZ1bmN0aW9uKHF1ZXJ5LCBjYiwgY29udGV4dCkge1xuICAgIGpzb25wKFxuICAgICAgJ2h0dHBzOi8vZGV2LnZpcnR1YWxlYXJ0aC5uZXQvUkVTVC92MS9Mb2NhdGlvbnMnLFxuICAgICAge1xuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIGtleTogdGhpcy5rZXlcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIGlmIChkYXRhLnJlc291cmNlU2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IGRhdGEucmVzb3VyY2VTZXRzWzBdLnJlc291cmNlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gZGF0YS5yZXNvdXJjZVNldHNbMF0ucmVzb3VyY2VzW2ldLFxuICAgICAgICAgICAgICBiYm94ID0gcmVzb3VyY2UuYmJveDtcbiAgICAgICAgICAgIHJlc3VsdHNbaV0gPSB7XG4gICAgICAgICAgICAgIG5hbWU6IHJlc291cmNlLm5hbWUsXG4gICAgICAgICAgICAgIGJib3g6IEwubGF0TG5nQm91bmRzKFtiYm94WzBdLCBiYm94WzFdXSwgW2Jib3hbMl0sIGJib3hbM11dKSxcbiAgICAgICAgICAgICAgY2VudGVyOiBMLmxhdExuZyhyZXNvdXJjZS5wb2ludC5jb29yZGluYXRlcylcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNiLmNhbGwoY29udGV4dCwgcmVzdWx0cyk7XG4gICAgICB9LFxuICAgICAgdGhpcyxcbiAgICAgICdqc29ucCdcbiAgICApO1xuICB9LFxuXG4gIHJldmVyc2U6IGZ1bmN0aW9uKGxvY2F0aW9uLCBzY2FsZSwgY2IsIGNvbnRleHQpIHtcbiAgICBqc29ucChcbiAgICAgICcvL2Rldi52aXJ0dWFsZWFydGgubmV0L1JFU1QvdjEvTG9jYXRpb25zLycgKyBsb2NhdGlvbi5sYXQgKyAnLCcgKyBsb2NhdGlvbi5sbmcsXG4gICAgICB7XG4gICAgICAgIGtleTogdGhpcy5rZXlcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSBkYXRhLnJlc291cmNlU2V0c1swXS5yZXNvdXJjZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBkYXRhLnJlc291cmNlU2V0c1swXS5yZXNvdXJjZXNbaV0sXG4gICAgICAgICAgICBiYm94ID0gcmVzb3VyY2UuYmJveDtcbiAgICAgICAgICByZXN1bHRzW2ldID0ge1xuICAgICAgICAgICAgbmFtZTogcmVzb3VyY2UubmFtZSxcbiAgICAgICAgICAgIGJib3g6IEwubGF0TG5nQm91bmRzKFtiYm94WzBdLCBiYm94WzFdXSwgW2Jib3hbMl0sIGJib3hbM11dKSxcbiAgICAgICAgICAgIGNlbnRlcjogTC5sYXRMbmcocmVzb3VyY2UucG9pbnQuY29vcmRpbmF0ZXMpXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYi5jYWxsKGNvbnRleHQsIHJlc3VsdHMpO1xuICAgICAgfSxcbiAgICAgIHRoaXMsXG4gICAgICAnanNvbnAnXG4gICAgKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5nKGtleSkge1xuICByZXR1cm4gbmV3IEJpbmcoa2V5KTtcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgZ2V0SlNPTiB9IGZyb20gJy4uL3V0aWwnO1xuXG5leHBvcnQgdmFyIEdvb2dsZSA9IEwuQ2xhc3MuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIHNlcnZpY2VVcmw6ICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uJyxcbiAgICBnZW9jb2RpbmdRdWVyeVBhcmFtczoge30sXG4gICAgcmV2ZXJzZVF1ZXJ5UGFyYW1zOiB7fVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGtleSwgb3B0aW9ucykge1xuICAgIHRoaXMuX2tleSA9IGtleTtcbiAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICB0aGlzLm9wdGlvbnMuc2VydmljZVVybCA9IHRoaXMub3B0aW9ucy5zZXJ2aWNlX3VybCB8fCB0aGlzLm9wdGlvbnMuc2VydmljZVVybDtcbiAgfSxcblxuICBnZW9jb2RlOiBmdW5jdGlvbihxdWVyeSwgY2IsIGNvbnRleHQpIHtcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgYWRkcmVzczogcXVlcnlcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuX2tleSAmJiB0aGlzLl9rZXkubGVuZ3RoKSB7XG4gICAgICBwYXJhbXMua2V5ID0gdGhpcy5fa2V5O1xuICAgIH1cblxuICAgIHBhcmFtcyA9IEwuVXRpbC5leHRlbmQocGFyYW1zLCB0aGlzLm9wdGlvbnMuZ2VvY29kaW5nUXVlcnlQYXJhbXMpO1xuXG4gICAgZ2V0SlNPTih0aGlzLm9wdGlvbnMuc2VydmljZVVybCwgcGFyYW1zLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdLFxuICAgICAgICBsb2MsXG4gICAgICAgIGxhdExuZyxcbiAgICAgICAgbGF0TG5nQm91bmRzO1xuICAgICAgaWYgKGRhdGEucmVzdWx0cyAmJiBkYXRhLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGRhdGEucmVzdWx0cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBsb2MgPSBkYXRhLnJlc3VsdHNbaV07XG4gICAgICAgICAgbGF0TG5nID0gTC5sYXRMbmcobG9jLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAgICAgICBsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhcbiAgICAgICAgICAgIEwubGF0TG5nKGxvYy5nZW9tZXRyeS52aWV3cG9ydC5ub3J0aGVhc3QpLFxuICAgICAgICAgICAgTC5sYXRMbmcobG9jLmdlb21ldHJ5LnZpZXdwb3J0LnNvdXRod2VzdClcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc3VsdHNbaV0gPSB7XG4gICAgICAgICAgICBuYW1lOiBsb2MuZm9ybWF0dGVkX2FkZHJlc3MsXG4gICAgICAgICAgICBiYm94OiBsYXRMbmdCb3VuZHMsXG4gICAgICAgICAgICBjZW50ZXI6IGxhdExuZyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IGxvYy5hZGRyZXNzX2NvbXBvbmVudHNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNiLmNhbGwoY29udGV4dCwgcmVzdWx0cyk7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmV2ZXJzZTogZnVuY3Rpb24obG9jYXRpb24sIHNjYWxlLCBjYiwgY29udGV4dCkge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBsYXRsbmc6IGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5sYXQpICsgJywnICsgZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uLmxuZylcbiAgICB9O1xuICAgIHBhcmFtcyA9IEwuVXRpbC5leHRlbmQocGFyYW1zLCB0aGlzLm9wdGlvbnMucmV2ZXJzZVF1ZXJ5UGFyYW1zKTtcbiAgICBpZiAodGhpcy5fa2V5ICYmIHRoaXMuX2tleS5sZW5ndGgpIHtcbiAgICAgIHBhcmFtcy5rZXkgPSB0aGlzLl9rZXk7XG4gICAgfVxuXG4gICAgZ2V0SlNPTih0aGlzLm9wdGlvbnMuc2VydmljZVVybCwgcGFyYW1zLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdLFxuICAgICAgICBsb2MsXG4gICAgICAgIGxhdExuZyxcbiAgICAgICAgbGF0TG5nQm91bmRzO1xuICAgICAgaWYgKGRhdGEucmVzdWx0cyAmJiBkYXRhLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGRhdGEucmVzdWx0cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBsb2MgPSBkYXRhLnJlc3VsdHNbaV07XG4gICAgICAgICAgbGF0TG5nID0gTC5sYXRMbmcobG9jLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAgICAgICBsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhcbiAgICAgICAgICAgIEwubGF0TG5nKGxvYy5nZW9tZXRyeS52aWV3cG9ydC5ub3J0aGVhc3QpLFxuICAgICAgICAgICAgTC5sYXRMbmcobG9jLmdlb21ldHJ5LnZpZXdwb3J0LnNvdXRod2VzdClcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc3VsdHNbaV0gPSB7XG4gICAgICAgICAgICBuYW1lOiBsb2MuZm9ybWF0dGVkX2FkZHJlc3MsXG4gICAgICAgICAgICBiYm94OiBsYXRMbmdCb3VuZHMsXG4gICAgICAgICAgICBjZW50ZXI6IGxhdExuZyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IGxvYy5hZGRyZXNzX2NvbXBvbmVudHNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNiLmNhbGwoY29udGV4dCwgcmVzdWx0cyk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ29vZ2xlKGtleSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdvb2dsZShrZXksIG9wdGlvbnMpO1xufVxuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBnZXRKU09OIH0gZnJvbSAnLi4vdXRpbCc7XG5leHBvcnQgdmFyIEhFUkUgPSBMLkNsYXNzLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBnZW9jb2RlVXJsOiAnaHR0cHM6Ly9nZW9jb2Rlci5hcGkuaGVyZS5jb20vNi4yL2dlb2NvZGUuanNvbicsXG4gICAgcmV2ZXJzZUdlb2NvZGVVcmw6ICdodHRwczovL3JldmVyc2UuZ2VvY29kZXIuYXBpLmhlcmUuY29tLzYuMi9yZXZlcnNlZ2VvY29kZS5qc29uJyxcbiAgICBhcHBfaWQ6ICc8aW5zZXJ0IHlvdXIgYXBwX2lkIGhlcmU+JyxcbiAgICBhcHBfY29kZTogJzxpbnNlcnQgeW91ciBhcHBfY29kZSBoZXJlPicsXG4gICAgZ2VvY29kaW5nUXVlcnlQYXJhbXM6IHt9LFxuICAgIHJldmVyc2VRdWVyeVBhcmFtczoge30sXG4gICAgcmV2ZXJzZUdlb2NvZGVQcm94UmFkaXVzOiBudWxsXG4gIH0sXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gIH0sXG4gIGdlb2NvZGU6IGZ1bmN0aW9uKHF1ZXJ5LCBjYiwgY29udGV4dCkge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBzZWFyY2h0ZXh0OiBxdWVyeSxcbiAgICAgIGdlbjogOSxcbiAgICAgIGFwcF9pZDogdGhpcy5vcHRpb25zLmFwcF9pZCxcbiAgICAgIGFwcF9jb2RlOiB0aGlzLm9wdGlvbnMuYXBwX2NvZGUsXG4gICAgICBqc29uYXR0cmlidXRlczogMVxuICAgIH07XG4gICAgcGFyYW1zID0gTC5VdGlsLmV4dGVuZChwYXJhbXMsIHRoaXMub3B0aW9ucy5nZW9jb2RpbmdRdWVyeVBhcmFtcyk7XG4gICAgdGhpcy5nZXRKU09OKHRoaXMub3B0aW9ucy5nZW9jb2RlVXJsLCBwYXJhbXMsIGNiLCBjb250ZXh0KTtcbiAgfSxcbiAgcmV2ZXJzZTogZnVuY3Rpb24obG9jYXRpb24sIHNjYWxlLCBjYiwgY29udGV4dCkge1xuICAgIHZhciBfcHJveFJhZGl1cyA9IHRoaXMub3B0aW9ucy5yZXZlcnNlR2VvY29kZVByb3hSYWRpdXNcbiAgICAgID8gdGhpcy5vcHRpb25zLnJldmVyc2VHZW9jb2RlUHJveFJhZGl1c1xuICAgICAgOiBudWxsO1xuICAgIHZhciBwcm94UmFkaXVzID0gX3Byb3hSYWRpdXMgPyAnLCcgKyBlbmNvZGVVUklDb21wb25lbnQoX3Byb3hSYWRpdXMpIDogJyc7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIHByb3g6IGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5sYXQpICsgJywnICsgZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uLmxuZykgKyBwcm94UmFkaXVzLFxuICAgICAgbW9kZTogJ3JldHJpZXZlQWRkcmVzc2VzJyxcbiAgICAgIGFwcF9pZDogdGhpcy5vcHRpb25zLmFwcF9pZCxcbiAgICAgIGFwcF9jb2RlOiB0aGlzLm9wdGlvbnMuYXBwX2NvZGUsXG4gICAgICBnZW46IDksXG4gICAgICBqc29uYXR0cmlidXRlczogMVxuICAgIH07XG4gICAgcGFyYW1zID0gTC5VdGlsLmV4dGVuZChwYXJhbXMsIHRoaXMub3B0aW9ucy5yZXZlcnNlUXVlcnlQYXJhbXMpO1xuICAgIHRoaXMuZ2V0SlNPTih0aGlzLm9wdGlvbnMucmV2ZXJzZUdlb2NvZGVVcmwsIHBhcmFtcywgY2IsIGNvbnRleHQpO1xuICB9LFxuICBnZXRKU09OOiBmdW5jdGlvbih1cmwsIHBhcmFtcywgY2IsIGNvbnRleHQpIHtcbiAgICBnZXRKU09OKHVybCwgcGFyYW1zLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdLFxuICAgICAgICBsb2MsXG4gICAgICAgIGxhdExuZyxcbiAgICAgICAgbGF0TG5nQm91bmRzO1xuICAgICAgaWYgKGRhdGEucmVzcG9uc2UudmlldyAmJiBkYXRhLnJlc3BvbnNlLnZpZXcubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGRhdGEucmVzcG9uc2Uudmlld1swXS5yZXN1bHQubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgbG9jID0gZGF0YS5yZXNwb25zZS52aWV3WzBdLnJlc3VsdFtpXS5sb2NhdGlvbjtcbiAgICAgICAgICBsYXRMbmcgPSBMLmxhdExuZyhsb2MuZGlzcGxheVBvc2l0aW9uLmxhdGl0dWRlLCBsb2MuZGlzcGxheVBvc2l0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgICAgbGF0TG5nQm91bmRzID0gTC5sYXRMbmdCb3VuZHMoXG4gICAgICAgICAgICBMLmxhdExuZyhsb2MubWFwVmlldy50b3BMZWZ0LmxhdGl0dWRlLCBsb2MubWFwVmlldy50b3BMZWZ0LmxvbmdpdHVkZSksXG4gICAgICAgICAgICBMLmxhdExuZyhsb2MubWFwVmlldy5ib3R0b21SaWdodC5sYXRpdHVkZSwgbG9jLm1hcFZpZXcuYm90dG9tUmlnaHQubG9uZ2l0dWRlKVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzdWx0c1tpXSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGxvYy5hZGRyZXNzLmxhYmVsLFxuICAgICAgICAgICAgcHJvcGVydGllczogbG9jLmFkZHJlc3MsXG4gICAgICAgICAgICBiYm94OiBsYXRMbmdCb3VuZHMsXG4gICAgICAgICAgICBjZW50ZXI6IGxhdExuZ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNiLmNhbGwoY29udGV4dCwgcmVzdWx0cyk7XG4gICAgfSk7XG4gIH1cbn0pO1xuZXhwb3J0IGZ1bmN0aW9uIGhlcmUob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEhFUkUob3B0aW9ucyk7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2FyY2dpcyc7XG5leHBvcnQgKiBmcm9tICcuL2JpbmcnO1xuZXhwb3J0ICogZnJvbSAnLi9nb29nbGUnO1xuZXhwb3J0ICogZnJvbSAnLi9oZXJlJztcbmV4cG9ydCAqIGZyb20gJy4vbGF0bG5nJztcbmV4cG9ydCAqIGZyb20gJy4vbWFwYm94JztcbmV4cG9ydCAqIGZyb20gJy4vbWFwcXVlc3QnO1xuZXhwb3J0ICogZnJvbSAnLi9uZXV0cmlubyc7XG5leHBvcnQgKiBmcm9tICcuL25vbWluYXRpbSc7XG5leHBvcnQgKiBmcm9tICcuL29wZW4tbG9jYXRpb24tY29kZSc7XG5leHBvcnQgKiBmcm9tICcuL29wZW5jYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vcGVsaWFzJztcbmV4cG9ydCAqIGZyb20gJy4vcGhvdG9uJztcbmV4cG9ydCAqIGZyb20gJy4vd2hhdDN3b3Jkcyc7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuZXhwb3J0IHZhciBMYXRMbmcgPSBMLkNsYXNzLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICAvLyB0aGUgbmV4dCBnZW9jb2RlciB0byB1c2VcbiAgICBuZXh0OiB1bmRlZmluZWQsXG4gICAgc2l6ZUluTWV0ZXJzOiAxMDAwMFxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBnZW9jb2RlOiBmdW5jdGlvbihxdWVyeSwgY2IsIGNvbnRleHQpIHtcbiAgICB2YXIgbWF0Y2g7XG4gICAgdmFyIGNlbnRlcjtcbiAgICAvLyByZWdleCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuc3RyZWV0bWFwL29wZW5zdHJlZXRtYXAtd2Vic2l0ZS9ibG9iL21hc3Rlci9hcHAvY29udHJvbGxlcnMvZ2VvY29kZXJfY29udHJvbGxlci5yYlxuICAgIGlmICgobWF0Y2ggPSBxdWVyeS5tYXRjaCgvXihbTlNdKVxccyooXFxkezEsM30oPzpcXC5cXGQqKT8pXFxXKihbRVddKVxccyooXFxkezEsM30oPzpcXC5cXGQqKT8pJC8pKSkge1xuICAgICAgLy8gW05TRVddIGRlY2ltYWwgZGVncmVlc1xuICAgICAgY2VudGVyID0gTC5sYXRMbmcoXG4gICAgICAgICgvTi9pLnRlc3QobWF0Y2hbMV0pID8gMSA6IC0xKSAqIHBhcnNlRmxvYXQobWF0Y2hbMl0pLFxuICAgICAgICAoL0UvaS50ZXN0KG1hdGNoWzNdKSA/IDEgOiAtMSkgKiBwYXJzZUZsb2F0KG1hdGNoWzRdKVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKG1hdGNoID0gcXVlcnkubWF0Y2goL14oXFxkezEsM30oPzpcXC5cXGQqKT8pXFxzKihbTlNdKVxcVyooXFxkezEsM30oPzpcXC5cXGQqKT8pXFxzKihbRVddKSQvKSlcbiAgICApIHtcbiAgICAgIC8vIGRlY2ltYWwgZGVncmVlcyBbTlNFV11cbiAgICAgIGNlbnRlciA9IEwubGF0TG5nKFxuICAgICAgICAoL04vaS50ZXN0KG1hdGNoWzJdKSA/IDEgOiAtMSkgKiBwYXJzZUZsb2F0KG1hdGNoWzFdKSxcbiAgICAgICAgKC9FL2kudGVzdChtYXRjaFs0XSkgPyAxIDogLTEpICogcGFyc2VGbG9hdChtYXRjaFszXSlcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIChtYXRjaCA9IHF1ZXJ5Lm1hdGNoKFxuICAgICAgICAvXihbTlNdKVxccyooXFxkezEsM30pwrA/XFxzKihcXGR7MSwzfSg/OlxcLlxcZCopPyk/WyfigLJdP1xcVyooW0VXXSlcXHMqKFxcZHsxLDN9KcKwP1xccyooXFxkezEsM30oPzpcXC5cXGQqKT8pP1sn4oCyXT8kL1xuICAgICAgKSlcbiAgICApIHtcbiAgICAgIC8vIFtOU0VXXSBkZWdyZWVzLCBkZWNpbWFsIG1pbnV0ZXNcbiAgICAgIGNlbnRlciA9IEwubGF0TG5nKFxuICAgICAgICAoL04vaS50ZXN0KG1hdGNoWzFdKSA/IDEgOiAtMSkgKiAocGFyc2VGbG9hdChtYXRjaFsyXSkgKyBwYXJzZUZsb2F0KG1hdGNoWzNdIC8gNjApKSxcbiAgICAgICAgKC9FL2kudGVzdChtYXRjaFs0XSkgPyAxIDogLTEpICogKHBhcnNlRmxvYXQobWF0Y2hbNV0pICsgcGFyc2VGbG9hdChtYXRjaFs2XSAvIDYwKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIChtYXRjaCA9IHF1ZXJ5Lm1hdGNoKFxuICAgICAgICAvXihcXGR7MSwzfSnCsD9cXHMqKFxcZHsxLDN9KD86XFwuXFxkKik/KT9bJ+KAsl0/XFxzKihbTlNdKVxcVyooXFxkezEsM30pwrA/XFxzKihcXGR7MSwzfSg/OlxcLlxcZCopPyk/WyfigLJdP1xccyooW0VXXSkkL1xuICAgICAgKSlcbiAgICApIHtcbiAgICAgIC8vIGRlZ3JlZXMsIGRlY2ltYWwgbWludXRlcyBbTlNFV11cbiAgICAgIGNlbnRlciA9IEwubGF0TG5nKFxuICAgICAgICAoL04vaS50ZXN0KG1hdGNoWzNdKSA/IDEgOiAtMSkgKiAocGFyc2VGbG9hdChtYXRjaFsxXSkgKyBwYXJzZUZsb2F0KG1hdGNoWzJdIC8gNjApKSxcbiAgICAgICAgKC9FL2kudGVzdChtYXRjaFs2XSkgPyAxIDogLTEpICogKHBhcnNlRmxvYXQobWF0Y2hbNF0pICsgcGFyc2VGbG9hdChtYXRjaFs1XSAvIDYwKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIChtYXRjaCA9IHF1ZXJ5Lm1hdGNoKFxuICAgICAgICAvXihbTlNdKVxccyooXFxkezEsM30pwrA/XFxzKihcXGR7MSwyfSlbJ+KAsl0/XFxzKihcXGR7MSwzfSg/OlxcLlxcZCopPyk/W1wi4oCzXT9cXFcqKFtFV10pXFxzKihcXGR7MSwzfSnCsD9cXHMqKFxcZHsxLDJ9KVsn4oCyXT9cXHMqKFxcZHsxLDN9KD86XFwuXFxkKik/KT9bXCLigLNdPyQvXG4gICAgICApKVxuICAgICkge1xuICAgICAgLy8gW05TRVddIGRlZ3JlZXMsIG1pbnV0ZXMsIGRlY2ltYWwgc2Vjb25kc1xuICAgICAgY2VudGVyID0gTC5sYXRMbmcoXG4gICAgICAgICgvTi9pLnRlc3QobWF0Y2hbMV0pID8gMSA6IC0xKSAqXG4gICAgICAgICAgKHBhcnNlRmxvYXQobWF0Y2hbMl0pICsgcGFyc2VGbG9hdChtYXRjaFszXSAvIDYwICsgcGFyc2VGbG9hdChtYXRjaFs0XSAvIDM2MDApKSksXG4gICAgICAgICgvRS9pLnRlc3QobWF0Y2hbNV0pID8gMSA6IC0xKSAqXG4gICAgICAgICAgKHBhcnNlRmxvYXQobWF0Y2hbNl0pICsgcGFyc2VGbG9hdChtYXRjaFs3XSAvIDYwKSArIHBhcnNlRmxvYXQobWF0Y2hbOF0gLyAzNjAwKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIChtYXRjaCA9IHF1ZXJ5Lm1hdGNoKFxuICAgICAgICAvXihcXGR7MSwzfSnCsD9cXHMqKFxcZHsxLDJ9KVsn4oCyXT9cXHMqKFxcZHsxLDN9KD86XFwuXFxkKik/KT9bXCLigLNdXFxzKihbTlNdKVxcVyooXFxkezEsM30pwrA/XFxzKihcXGR7MSwyfSlbJ+KAsl0/XFxzKihcXGR7MSwzfSg/OlxcLlxcZCopPyk/W1wi4oCzXT9cXHMqKFtFV10pJC9cbiAgICAgICkpXG4gICAgKSB7XG4gICAgICAvLyBkZWdyZWVzLCBtaW51dGVzLCBkZWNpbWFsIHNlY29uZHMgW05TRVddXG4gICAgICBjZW50ZXIgPSBMLmxhdExuZyhcbiAgICAgICAgKC9OL2kudGVzdChtYXRjaFs0XSkgPyAxIDogLTEpICpcbiAgICAgICAgICAocGFyc2VGbG9hdChtYXRjaFsxXSkgKyBwYXJzZUZsb2F0KG1hdGNoWzJdIC8gNjAgKyBwYXJzZUZsb2F0KG1hdGNoWzNdIC8gMzYwMCkpKSxcbiAgICAgICAgKC9FL2kudGVzdChtYXRjaFs4XSkgPyAxIDogLTEpICpcbiAgICAgICAgICAocGFyc2VGbG9hdChtYXRjaFs1XSkgKyBwYXJzZUZsb2F0KG1hdGNoWzZdIC8gNjApICsgcGFyc2VGbG9hdChtYXRjaFs3XSAvIDM2MDApKVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKG1hdGNoID0gcXVlcnkubWF0Y2goL15cXHMqKFsrLV0/XFxkKyg/OlxcLlxcZCopPylcXHMqW1xccyxdXFxzKihbKy1dP1xcZCsoPzpcXC5cXGQqKT8pXFxzKiQvKSlcbiAgICApIHtcbiAgICAgIGNlbnRlciA9IEwubGF0TG5nKHBhcnNlRmxvYXQobWF0Y2hbMV0pLCBwYXJzZUZsb2F0KG1hdGNoWzJdKSk7XG4gICAgfVxuICAgIGlmIChjZW50ZXIpIHtcbiAgICAgIHZhciByZXN1bHRzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogcXVlcnksXG4gICAgICAgICAgY2VudGVyOiBjZW50ZXIsXG4gICAgICAgICAgYmJveDogY2VudGVyLnRvQm91bmRzKHRoaXMub3B0aW9ucy5zaXplSW5NZXRlcnMpXG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgICBjYi5jYWxsKGNvbnRleHQsIHJlc3VsdHMpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLm5leHQpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5uZXh0Lmdlb2NvZGUocXVlcnksIGNiLCBjb250ZXh0KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbGF0TG5nKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBMYXRMbmcob3B0aW9ucyk7XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGdldEpTT04gfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IHZhciBNYXBib3ggPSBMLkNsYXNzLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBzZXJ2aWNlVXJsOiAnaHR0cHM6Ly9hcGkubWFwYm94LmNvbS9nZW9jb2RpbmcvdjUvbWFwYm94LnBsYWNlcy8nLFxuICAgIGdlb2NvZGluZ1F1ZXJ5UGFyYW1zOiB7fSxcbiAgICByZXZlcnNlUXVlcnlQYXJhbXM6IHt9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oYWNjZXNzVG9rZW4sIG9wdGlvbnMpIHtcbiAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLmdlb2NvZGluZ1F1ZXJ5UGFyYW1zLmFjY2Vzc190b2tlbiA9IGFjY2Vzc1Rva2VuO1xuICAgIHRoaXMub3B0aW9ucy5yZXZlcnNlUXVlcnlQYXJhbXMuYWNjZXNzX3Rva2VuID0gYWNjZXNzVG9rZW47XG4gIH0sXG5cbiAgZ2VvY29kZTogZnVuY3Rpb24ocXVlcnksIGNiLCBjb250ZXh0KSB7XG4gICAgdmFyIHBhcmFtcyA9IHRoaXMub3B0aW9ucy5nZW9jb2RpbmdRdWVyeVBhcmFtcztcbiAgICBpZiAoXG4gICAgICBwYXJhbXMucHJveGltaXR5ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHBhcmFtcy5wcm94aW1pdHkubGF0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHBhcmFtcy5wcm94aW1pdHkubG5nICE9PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIHBhcmFtcy5wcm94aW1pdHkgPSBwYXJhbXMucHJveGltaXR5LmxuZyArICcsJyArIHBhcmFtcy5wcm94aW1pdHkubGF0O1xuICAgIH1cbiAgICBnZXRKU09OKHRoaXMub3B0aW9ucy5zZXJ2aWNlVXJsICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSArICcuanNvbicsIHBhcmFtcywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgbG9jLFxuICAgICAgICBsYXRMbmcsXG4gICAgICAgIGxhdExuZ0JvdW5kcztcbiAgICAgIGlmIChkYXRhLmZlYXR1cmVzICYmIGRhdGEuZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGRhdGEuZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgbG9jID0gZGF0YS5mZWF0dXJlc1tpXTtcbiAgICAgICAgICBsYXRMbmcgPSBMLmxhdExuZyhsb2MuY2VudGVyLnJldmVyc2UoKSk7XG4gICAgICAgICAgaWYgKGxvYy5iYm94KSB7XG4gICAgICAgICAgICBsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhcbiAgICAgICAgICAgICAgTC5sYXRMbmcobG9jLmJib3guc2xpY2UoMCwgMikucmV2ZXJzZSgpKSxcbiAgICAgICAgICAgICAgTC5sYXRMbmcobG9jLmJib3guc2xpY2UoMiwgNCkucmV2ZXJzZSgpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGF0TG5nQm91bmRzID0gTC5sYXRMbmdCb3VuZHMobGF0TG5nLCBsYXRMbmcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0ge1xuICAgICAgICAgICAgdGV4dDogbG9jLnRleHQsXG4gICAgICAgICAgICBhZGRyZXNzOiBsb2MuYWRkcmVzc1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IChsb2MuY29udGV4dCB8fCBbXSkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBpZCA9IGxvYy5jb250ZXh0W2pdLmlkLnNwbGl0KCcuJylbMF07XG4gICAgICAgICAgICBwcm9wZXJ0aWVzW2lkXSA9IGxvYy5jb250ZXh0W2pdLnRleHQ7XG5cbiAgICAgICAgICAgIC8vIEdldCBjb3VudHJ5IGNvZGUgd2hlbiBhdmFpbGFibGVcbiAgICAgICAgICAgIGlmIChsb2MuY29udGV4dFtqXS5zaG9ydF9jb2RlKSB7XG4gICAgICAgICAgICAgIHByb3BlcnRpZXNbJ2NvdW50cnlTaG9ydENvZGUnXSA9IGxvYy5jb250ZXh0W2pdLnNob3J0X2NvZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXN1bHRzW2ldID0ge1xuICAgICAgICAgICAgbmFtZTogbG9jLnBsYWNlX25hbWUsXG4gICAgICAgICAgICBiYm94OiBsYXRMbmdCb3VuZHMsXG4gICAgICAgICAgICBjZW50ZXI6IGxhdExuZyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNiLmNhbGwoY29udGV4dCwgcmVzdWx0cyk7XG4gICAgfSk7XG4gIH0sXG5cbiAgc3VnZ2VzdDogZnVuY3Rpb24ocXVlcnksIGNiLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VvY29kZShxdWVyeSwgY2IsIGNvbnRleHQpO1xuICB9LFxuXG4gIHJldmVyc2U6IGZ1bmN0aW9uKGxvY2F0aW9uLCBzY2FsZSwgY2IsIGNvbnRleHQpIHtcbiAgICBnZXRKU09OKFxuICAgICAgdGhpcy5vcHRpb25zLnNlcnZpY2VVcmwgK1xuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQobG9jYXRpb24ubG5nKSArXG4gICAgICAgICcsJyArXG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5sYXQpICtcbiAgICAgICAgJy5qc29uJyxcbiAgICAgIHRoaXMub3B0aW9ucy5yZXZlcnNlUXVlcnlQYXJhbXMsXG4gICAgICBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW10sXG4gICAgICAgICAgbG9jLFxuICAgICAgICAgIGxhdExuZyxcbiAgICAgICAgICBsYXRMbmdCb3VuZHM7XG4gICAgICAgIGlmIChkYXRhLmZlYXR1cmVzICYmIGRhdGEuZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gZGF0YS5mZWF0dXJlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGxvYyA9IGRhdGEuZmVhdHVyZXNbaV07XG4gICAgICAgICAgICBsYXRMbmcgPSBMLmxhdExuZyhsb2MuY2VudGVyLnJldmVyc2UoKSk7XG4gICAgICAgICAgICBpZiAobG9jLmJib3gpIHtcbiAgICAgICAgICAgICAgbGF0TG5nQm91bmRzID0gTC5sYXRMbmdCb3VuZHMoXG4gICAgICAgICAgICAgICAgTC5sYXRMbmcobG9jLmJib3guc2xpY2UoMCwgMikucmV2ZXJzZSgpKSxcbiAgICAgICAgICAgICAgICBMLmxhdExuZyhsb2MuYmJveC5zbGljZSgyLCA0KS5yZXZlcnNlKCkpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhsYXRMbmcsIGxhdExuZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRzW2ldID0ge1xuICAgICAgICAgICAgICBuYW1lOiBsb2MucGxhY2VfbmFtZSxcbiAgICAgICAgICAgICAgYmJveDogbGF0TG5nQm91bmRzLFxuICAgICAgICAgICAgICBjZW50ZXI6IGxhdExuZ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYi5jYWxsKGNvbnRleHQsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwYm94KGFjY2Vzc1Rva2VuLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgTWFwYm94KGFjY2Vzc1Rva2VuLCBvcHRpb25zKTtcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgZ2V0SlNPTiB9IGZyb20gJy4uL3V0aWwnO1xuXG5leHBvcnQgdmFyIE1hcFF1ZXN0ID0gTC5DbGFzcy5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgc2VydmljZVVybDogJ2h0dHBzOi8vd3d3Lm1hcHF1ZXN0YXBpLmNvbS9nZW9jb2RpbmcvdjEnXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oa2V5LCBvcHRpb25zKSB7XG4gICAgLy8gTWFwUXVlc3Qgc2VlbXMgdG8gcHJvdmlkZSBVUkkgZW5jb2RlZCBBUEkga2V5cyxcbiAgICAvLyBzbyB0byBhdm9pZCBlbmNvZGluZyB0aGVtIHR3aWNlLCB3ZSBkZWNvZGUgdGhlbSBoZXJlXG4gICAgdGhpcy5fa2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleSk7XG5cbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBfZm9ybWF0TmFtZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHIgPSBbXSxcbiAgICAgIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFyZ3VtZW50c1tpXSkge1xuICAgICAgICByLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gci5qb2luKCcsICcpO1xuICB9LFxuXG4gIGdlb2NvZGU6IGZ1bmN0aW9uKHF1ZXJ5LCBjYiwgY29udGV4dCkge1xuICAgIGdldEpTT04oXG4gICAgICB0aGlzLm9wdGlvbnMuc2VydmljZVVybCArICcvYWRkcmVzcycsXG4gICAgICB7XG4gICAgICAgIGtleTogdGhpcy5fa2V5LFxuICAgICAgICBsb2NhdGlvbjogcXVlcnksXG4gICAgICAgIGxpbWl0OiA1LFxuICAgICAgICBvdXRGb3JtYXQ6ICdqc29uJ1xuICAgICAgfSxcbiAgICAgIEwuYmluZChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW10sXG4gICAgICAgICAgbG9jLFxuICAgICAgICAgIGxhdExuZztcbiAgICAgICAgaWYgKGRhdGEucmVzdWx0cyAmJiBkYXRhLnJlc3VsdHNbMF0ubG9jYXRpb25zKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IGRhdGEucmVzdWx0c1swXS5sb2NhdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxvYyA9IGRhdGEucmVzdWx0c1swXS5sb2NhdGlvbnNbaV07XG4gICAgICAgICAgICBsYXRMbmcgPSBMLmxhdExuZyhsb2MubGF0TG5nKTtcbiAgICAgICAgICAgIHJlc3VsdHNbaV0gPSB7XG4gICAgICAgICAgICAgIG5hbWU6IHRoaXMuX2Zvcm1hdE5hbWUobG9jLnN0cmVldCwgbG9jLmFkbWluQXJlYTQsIGxvYy5hZG1pbkFyZWEzLCBsb2MuYWRtaW5BcmVhMSksXG4gICAgICAgICAgICAgIGJib3g6IEwubGF0TG5nQm91bmRzKGxhdExuZywgbGF0TG5nKSxcbiAgICAgICAgICAgICAgY2VudGVyOiBsYXRMbmdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2IuY2FsbChjb250ZXh0LCByZXN1bHRzKTtcbiAgICAgIH0sIHRoaXMpXG4gICAgKTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbihsb2NhdGlvbiwgc2NhbGUsIGNiLCBjb250ZXh0KSB7XG4gICAgZ2V0SlNPTihcbiAgICAgIHRoaXMub3B0aW9ucy5zZXJ2aWNlVXJsICsgJy9yZXZlcnNlJyxcbiAgICAgIHtcbiAgICAgICAga2V5OiB0aGlzLl9rZXksXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbi5sYXQgKyAnLCcgKyBsb2NhdGlvbi5sbmcsXG4gICAgICAgIG91dHB1dEZvcm1hdDogJ2pzb24nXG4gICAgICB9LFxuICAgICAgTC5iaW5kKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgICBsb2MsXG4gICAgICAgICAgbGF0TG5nO1xuICAgICAgICBpZiAoZGF0YS5yZXN1bHRzICYmIGRhdGEucmVzdWx0c1swXS5sb2NhdGlvbnMpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gZGF0YS5yZXN1bHRzWzBdLmxvY2F0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbG9jID0gZGF0YS5yZXN1bHRzWzBdLmxvY2F0aW9uc1tpXTtcbiAgICAgICAgICAgIGxhdExuZyA9IEwubGF0TG5nKGxvYy5sYXRMbmcpO1xuICAgICAgICAgICAgcmVzdWx0c1tpXSA9IHtcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5fZm9ybWF0TmFtZShsb2Muc3RyZWV0LCBsb2MuYWRtaW5BcmVhNCwgbG9jLmFkbWluQXJlYTMsIGxvYy5hZG1pbkFyZWExKSxcbiAgICAgICAgICAgICAgYmJveDogTC5sYXRMbmdCb3VuZHMobGF0TG5nLCBsYXRMbmcpLFxuICAgICAgICAgICAgICBjZW50ZXI6IGxhdExuZ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYi5jYWxsKGNvbnRleHQsIHJlc3VsdHMpO1xuICAgICAgfSwgdGhpcylcbiAgICApO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFF1ZXN0KGtleSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IE1hcFF1ZXN0KGtleSwgb3B0aW9ucyk7XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGdldEpTT04gfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IHZhciBOZXV0cmlubyA9IEwuQ2xhc3MuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIHVzZXJJZDogJzxpbnNlcnQgeW91ciB1c2VySWQgaGVyZT4nLFxuICAgIGFwaUtleTogJzxpbnNlcnQgeW91ciBhcGlLZXkgaGVyZT4nLFxuICAgIHNlcnZpY2VVcmw6ICdodHRwczovL25ldXRyaW5vYXBpLmNvbS8nXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIC8vIGh0dHBzOi8vd3d3Lm5ldXRyaW5vYXBpLmNvbS9hcGkvZ2VvY29kZS1hZGRyZXNzL1xuICBnZW9jb2RlOiBmdW5jdGlvbihxdWVyeSwgY2IsIGNvbnRleHQpIHtcbiAgICBnZXRKU09OKFxuICAgICAgdGhpcy5vcHRpb25zLnNlcnZpY2VVcmwgKyAnZ2VvY29kZS1hZGRyZXNzJyxcbiAgICAgIHtcbiAgICAgICAgYXBpS2V5OiB0aGlzLm9wdGlvbnMuYXBpS2V5LFxuICAgICAgICB1c2VySWQ6IHRoaXMub3B0aW9ucy51c2VySWQsXG4gICAgICAgIC8vZ2V0IHRocmVlIHdvcmRzIGFuZCBtYWtlIGEgZG90IGJhc2VkIHN0cmluZ1xuICAgICAgICBhZGRyZXNzOiBxdWVyeS5zcGxpdCgvXFxzKy8pLmpvaW4oJy4nKVxuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgICBsYXRMbmcsXG4gICAgICAgICAgbGF0TG5nQm91bmRzO1xuICAgICAgICBpZiAoZGF0YS5sb2NhdGlvbnMpIHtcbiAgICAgICAgICBkYXRhLmdlb21ldHJ5ID0gZGF0YS5sb2NhdGlvbnNbMF07XG4gICAgICAgICAgbGF0TG5nID0gTC5sYXRMbmcoZGF0YS5nZW9tZXRyeVsnbGF0aXR1ZGUnXSwgZGF0YS5nZW9tZXRyeVsnbG9uZ2l0dWRlJ10pO1xuICAgICAgICAgIGxhdExuZ0JvdW5kcyA9IEwubGF0TG5nQm91bmRzKGxhdExuZywgbGF0TG5nKTtcbiAgICAgICAgICByZXN1bHRzWzBdID0ge1xuICAgICAgICAgICAgbmFtZTogZGF0YS5nZW9tZXRyeS5hZGRyZXNzLFxuICAgICAgICAgICAgYmJveDogbGF0TG5nQm91bmRzLFxuICAgICAgICAgICAgY2VudGVyOiBsYXRMbmdcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY2IuY2FsbChjb250ZXh0LCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICApO1xuICB9LFxuXG4gIHN1Z2dlc3Q6IGZ1bmN0aW9uKHF1ZXJ5LCBjYiwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLmdlb2NvZGUocXVlcnksIGNiLCBjb250ZXh0KTtcbiAgfSxcblxuICAvLyBodHRwczovL3d3dy5uZXV0cmlub2FwaS5jb20vYXBpL2dlb2NvZGUtcmV2ZXJzZS9cbiAgcmV2ZXJzZTogZnVuY3Rpb24obG9jYXRpb24sIHNjYWxlLCBjYiwgY29udGV4dCkge1xuICAgIGdldEpTT04oXG4gICAgICB0aGlzLm9wdGlvbnMuc2VydmljZVVybCArICdnZW9jb2RlLXJldmVyc2UnLFxuICAgICAge1xuICAgICAgICBhcGlLZXk6IHRoaXMub3B0aW9ucy5hcGlLZXksXG4gICAgICAgIHVzZXJJZDogdGhpcy5vcHRpb25zLnVzZXJJZCxcbiAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uLmxhdCxcbiAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbi5sbmdcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW10sXG4gICAgICAgICAgbGF0TG5nLFxuICAgICAgICAgIGxhdExuZ0JvdW5kcztcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzLnN0YXR1cyA9PSAyMDAgJiYgZGF0YS5mb3VuZCkge1xuICAgICAgICAgIGxhdExuZyA9IEwubGF0TG5nKGxvY2F0aW9uLmxhdCwgbG9jYXRpb24ubG5nKTtcbiAgICAgICAgICBsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhsYXRMbmcsIGxhdExuZyk7XG4gICAgICAgICAgcmVzdWx0c1swXSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEuYWRkcmVzcyxcbiAgICAgICAgICAgIGJib3g6IGxhdExuZ0JvdW5kcyxcbiAgICAgICAgICAgIGNlbnRlcjogbGF0TG5nXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYi5jYWxsKGNvbnRleHQsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbmV1dHJpbm8oYWNjZXNzVG9rZW4pIHtcbiAgcmV0dXJuIG5ldyBOZXV0cmlubyhhY2Nlc3NUb2tlbik7XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IHRlbXBsYXRlLCBnZXRKU09OIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCB2YXIgTm9taW5hdGltID0gTC5DbGFzcy5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgc2VydmljZVVybDogJ2h0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnLycsXG4gICAgZ2VvY29kaW5nUXVlcnlQYXJhbXM6IHt9LFxuICAgIHJldmVyc2VRdWVyeVBhcmFtczoge30sXG4gICAgaHRtbFRlbXBsYXRlOiBmdW5jdGlvbihyKSB7XG4gICAgICB2YXIgYSA9IHIuYWRkcmVzcyxcbiAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICBwYXJ0cyA9IFtdO1xuICAgICAgaWYgKGEucm9hZCB8fCBhLmJ1aWxkaW5nKSB7XG4gICAgICAgIHBhcnRzLnB1c2goJ3tidWlsZGluZ30ge3JvYWR9IHtob3VzZV9udW1iZXJ9Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhLmNpdHkgfHwgYS50b3duIHx8IGEudmlsbGFnZSB8fCBhLmhhbWxldCkge1xuICAgICAgICBjbGFzc05hbWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gJ2xlYWZsZXQtY29udHJvbC1nZW9jb2Rlci1hZGRyZXNzLWRldGFpbCcgOiAnJztcbiAgICAgICAgcGFydHMucHVzaChcbiAgICAgICAgICAnPHNwYW4gY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiPntwb3N0Y29kZX0ge2NpdHl9IHt0b3dufSB7dmlsbGFnZX0ge2hhbWxldH08L3NwYW4+J1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYS5zdGF0ZSB8fCBhLmNvdW50cnkpIHtcbiAgICAgICAgY2xhc3NOYW1lID0gcGFydHMubGVuZ3RoID4gMCA/ICdsZWFmbGV0LWNvbnRyb2wtZ2VvY29kZXItYWRkcmVzcy1jb250ZXh0JyA6ICcnO1xuICAgICAgICBwYXJ0cy5wdXNoKCc8c3BhbiBjbGFzcz1cIicgKyBjbGFzc05hbWUgKyAnXCI+e3N0YXRlfSB7Y291bnRyeX08L3NwYW4+Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0ZW1wbGF0ZShwYXJ0cy5qb2luKCc8YnIvPicpLCBhLCB0cnVlKTtcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIGdlb2NvZGU6IGZ1bmN0aW9uKHF1ZXJ5LCBjYiwgY29udGV4dCkge1xuICAgIGdldEpTT04oXG4gICAgICB0aGlzLm9wdGlvbnMuc2VydmljZVVybCArICdzZWFyY2gnLFxuICAgICAgTC5leHRlbmQoXG4gICAgICAgIHtcbiAgICAgICAgICBxOiBxdWVyeSxcbiAgICAgICAgICBsaW1pdDogNSxcbiAgICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgICBhZGRyZXNzZGV0YWlsczogMVxuICAgICAgICB9LFxuICAgICAgICB0aGlzLm9wdGlvbnMuZ2VvY29kaW5nUXVlcnlQYXJhbXNcbiAgICAgICksXG4gICAgICBMLmJpbmQoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gZGF0YS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHZhciBiYm94ID0gZGF0YVtpXS5ib3VuZGluZ2JveDtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykgYmJveFtqXSA9IHBhcnNlRmxvYXQoYmJveFtqXSk7XG4gICAgICAgICAgcmVzdWx0c1tpXSA9IHtcbiAgICAgICAgICAgIGljb246IGRhdGFbaV0uaWNvbixcbiAgICAgICAgICAgIG5hbWU6IGRhdGFbaV0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgaHRtbDogdGhpcy5vcHRpb25zLmh0bWxUZW1wbGF0ZSA/IHRoaXMub3B0aW9ucy5odG1sVGVtcGxhdGUoZGF0YVtpXSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBiYm94OiBMLmxhdExuZ0JvdW5kcyhbYmJveFswXSwgYmJveFsyXV0sIFtiYm94WzFdLCBiYm94WzNdXSksXG4gICAgICAgICAgICBjZW50ZXI6IEwubGF0TG5nKGRhdGFbaV0ubGF0LCBkYXRhW2ldLmxvbiksXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBkYXRhW2ldXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYi5jYWxsKGNvbnRleHQsIHJlc3VsdHMpO1xuICAgICAgfSwgdGhpcylcbiAgICApO1xuICB9LFxuXG4gIHJldmVyc2U6IGZ1bmN0aW9uKGxvY2F0aW9uLCBzY2FsZSwgY2IsIGNvbnRleHQpIHtcbiAgICBnZXRKU09OKFxuICAgICAgdGhpcy5vcHRpb25zLnNlcnZpY2VVcmwgKyAncmV2ZXJzZScsXG4gICAgICBMLmV4dGVuZChcbiAgICAgICAge1xuICAgICAgICAgIGxhdDogbG9jYXRpb24ubGF0LFxuICAgICAgICAgIGxvbjogbG9jYXRpb24ubG5nLFxuICAgICAgICAgIHpvb206IE1hdGgucm91bmQoTWF0aC5sb2coc2NhbGUgLyAyNTYpIC8gTWF0aC5sb2coMikpLFxuICAgICAgICAgIGFkZHJlc3NkZXRhaWxzOiAxLFxuICAgICAgICAgIGZvcm1hdDogJ2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMub3B0aW9ucy5yZXZlcnNlUXVlcnlQYXJhbXNcbiAgICAgICksXG4gICAgICBMLmJpbmQoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICAgICAgbG9jO1xuXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGF0ICYmIGRhdGEubG9uKSB7XG4gICAgICAgICAgbG9jID0gTC5sYXRMbmcoZGF0YS5sYXQsIGRhdGEubG9uKTtcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBkYXRhLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgIGh0bWw6IHRoaXMub3B0aW9ucy5odG1sVGVtcGxhdGUgPyB0aGlzLm9wdGlvbnMuaHRtbFRlbXBsYXRlKGRhdGEpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY2VudGVyOiBsb2MsXG4gICAgICAgICAgICBib3VuZHM6IEwubGF0TG5nQm91bmRzKGxvYywgbG9jKSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IGRhdGFcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNiLmNhbGwoY29udGV4dCwgcmVzdWx0KTtcbiAgICAgIH0sIHRoaXMpXG4gICAgKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBub21pbmF0aW0ob3B0aW9ucykge1xuICByZXR1cm4gbmV3IE5vbWluYXRpbShvcHRpb25zKTtcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuXG5leHBvcnQgdmFyIE9wZW5Mb2NhdGlvbkNvZGUgPSBMLkNsYXNzLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBPcGVuTG9jYXRpb25Db2RlOiB1bmRlZmluZWQsXG4gICAgY29kZUxlbmd0aDogdW5kZWZpbmVkXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBnZW9jb2RlOiBmdW5jdGlvbihxdWVyeSwgY2IsIGNvbnRleHQpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGRlY29kZWQgPSB0aGlzLm9wdGlvbnMuT3BlbkxvY2F0aW9uQ29kZS5kZWNvZGUocXVlcnkpO1xuICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogcXVlcnksXG4gICAgICAgIGNlbnRlcjogTC5sYXRMbmcoZGVjb2RlZC5sYXRpdHVkZUNlbnRlciwgZGVjb2RlZC5sb25naXR1ZGVDZW50ZXIpLFxuICAgICAgICBiYm94OiBMLmxhdExuZ0JvdW5kcyhcbiAgICAgICAgICBMLmxhdExuZyhkZWNvZGVkLmxhdGl0dWRlTG8sIGRlY29kZWQubG9uZ2l0dWRlTG8pLFxuICAgICAgICAgIEwubGF0TG5nKGRlY29kZWQubGF0aXR1ZGVIaSwgZGVjb2RlZC5sb25naXR1ZGVIaSlcbiAgICAgICAgKVxuICAgICAgfTtcbiAgICAgIGNiLmNhbGwoY29udGV4dCwgW3Jlc3VsdF0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICBjYi5jYWxsKGNvbnRleHQsIFtdKTtcbiAgICB9XG4gIH0sXG4gIHJldmVyc2U6IGZ1bmN0aW9uKGxvY2F0aW9uLCBzY2FsZSwgY2IsIGNvbnRleHQpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGNvZGUgPSB0aGlzLm9wdGlvbnMuT3BlbkxvY2F0aW9uQ29kZS5lbmNvZGUoXG4gICAgICAgIGxvY2F0aW9uLmxhdCxcbiAgICAgICAgbG9jYXRpb24ubG5nLFxuICAgICAgICB0aGlzLm9wdGlvbnMuY29kZUxlbmd0aFxuICAgICAgKTtcbiAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6IGNvZGUsXG4gICAgICAgIGNlbnRlcjogTC5sYXRMbmcobG9jYXRpb24ubGF0LCBsb2NhdGlvbi5sbmcpLFxuICAgICAgICBiYm94OiBMLmxhdExuZ0JvdW5kcyhcbiAgICAgICAgICBMLmxhdExuZyhsb2NhdGlvbi5sYXQsIGxvY2F0aW9uLmxuZyksXG4gICAgICAgICAgTC5sYXRMbmcobG9jYXRpb24ubGF0LCBsb2NhdGlvbi5sbmcpXG4gICAgICAgIClcbiAgICAgIH07XG4gICAgICBjYi5jYWxsKGNvbnRleHQsIFtyZXN1bHRdKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgY2IuY2FsbChjb250ZXh0LCBbXSk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5Mb2NhdGlvbkNvZGUob3B0aW9ucykge1xuICByZXR1cm4gbmV3IE9wZW5Mb2NhdGlvbkNvZGUob3B0aW9ucyk7XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGdldEpTT04gfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IHZhciBPcGVuQ2FnZSA9IEwuQ2xhc3MuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIHNlcnZpY2VVcmw6ICdodHRwczovL2FwaS5vcGVuY2FnZWRhdGEuY29tL2dlb2NvZGUvdjEvanNvbicsXG4gICAgZ2VvY29kaW5nUXVlcnlQYXJhbXM6IHt9LFxuICAgIHJldmVyc2VRdWVyeVBhcmFtczoge31cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbihhcGlLZXksIG9wdGlvbnMpIHtcbiAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fYWNjZXNzVG9rZW4gPSBhcGlLZXk7XG4gIH0sXG5cbiAgZ2VvY29kZTogZnVuY3Rpb24ocXVlcnksIGNiLCBjb250ZXh0KSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIGtleTogdGhpcy5fYWNjZXNzVG9rZW4sXG4gICAgICBxOiBxdWVyeVxuICAgIH07XG4gICAgcGFyYW1zID0gTC5leHRlbmQocGFyYW1zLCB0aGlzLm9wdGlvbnMuZ2VvY29kaW5nUXVlcnlQYXJhbXMpO1xuICAgIGdldEpTT04odGhpcy5vcHRpb25zLnNlcnZpY2VVcmwsIHBhcmFtcywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgbGF0TG5nLFxuICAgICAgICBsYXRMbmdCb3VuZHMsXG4gICAgICAgIGxvYztcbiAgICAgIGlmIChkYXRhLnJlc3VsdHMgJiYgZGF0YS5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEucmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxvYyA9IGRhdGEucmVzdWx0c1tpXTtcbiAgICAgICAgICBsYXRMbmcgPSBMLmxhdExuZyhsb2MuZ2VvbWV0cnkpO1xuICAgICAgICAgIGlmIChsb2MuYW5ub3RhdGlvbnMgJiYgbG9jLmFubm90YXRpb25zLmJvdW5kcykge1xuICAgICAgICAgICAgbGF0TG5nQm91bmRzID0gTC5sYXRMbmdCb3VuZHMoXG4gICAgICAgICAgICAgIEwubGF0TG5nKGxvYy5hbm5vdGF0aW9ucy5ib3VuZHMubm9ydGhlYXN0KSxcbiAgICAgICAgICAgICAgTC5sYXRMbmcobG9jLmFubm90YXRpb25zLmJvdW5kcy5zb3V0aHdlc3QpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhsYXRMbmcsIGxhdExuZyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBsb2MuZm9ybWF0dGVkLFxuICAgICAgICAgICAgYmJveDogbGF0TG5nQm91bmRzLFxuICAgICAgICAgICAgY2VudGVyOiBsYXRMbmdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2IuY2FsbChjb250ZXh0LCByZXN1bHRzKTtcbiAgICB9KTtcbiAgfSxcblxuICBzdWdnZXN0OiBmdW5jdGlvbihxdWVyeSwgY2IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5nZW9jb2RlKHF1ZXJ5LCBjYiwgY29udGV4dCk7XG4gIH0sXG5cbiAgcmV2ZXJzZTogZnVuY3Rpb24obG9jYXRpb24sIHNjYWxlLCBjYiwgY29udGV4dCkge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBrZXk6IHRoaXMuX2FjY2Vzc1Rva2VuLFxuICAgICAgcTogW2xvY2F0aW9uLmxhdCwgbG9jYXRpb24ubG5nXS5qb2luKCcsJylcbiAgICB9O1xuICAgIHBhcmFtcyA9IEwuZXh0ZW5kKHBhcmFtcywgdGhpcy5vcHRpb25zLnJldmVyc2VRdWVyeVBhcmFtcyk7XG4gICAgZ2V0SlNPTih0aGlzLm9wdGlvbnMuc2VydmljZVVybCwgcGFyYW1zLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdLFxuICAgICAgICBsYXRMbmcsXG4gICAgICAgIGxhdExuZ0JvdW5kcyxcbiAgICAgICAgbG9jO1xuICAgICAgaWYgKGRhdGEucmVzdWx0cyAmJiBkYXRhLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5yZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbG9jID0gZGF0YS5yZXN1bHRzW2ldO1xuICAgICAgICAgIGxhdExuZyA9IEwubGF0TG5nKGxvYy5nZW9tZXRyeSk7XG4gICAgICAgICAgaWYgKGxvYy5hbm5vdGF0aW9ucyAmJiBsb2MuYW5ub3RhdGlvbnMuYm91bmRzKSB7XG4gICAgICAgICAgICBsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhcbiAgICAgICAgICAgICAgTC5sYXRMbmcobG9jLmFubm90YXRpb25zLmJvdW5kcy5ub3J0aGVhc3QpLFxuICAgICAgICAgICAgICBMLmxhdExuZyhsb2MuYW5ub3RhdGlvbnMuYm91bmRzLnNvdXRod2VzdClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxhdExuZ0JvdW5kcyA9IEwubGF0TG5nQm91bmRzKGxhdExuZywgbGF0TG5nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGxvYy5mb3JtYXR0ZWQsXG4gICAgICAgICAgICBiYm94OiBsYXRMbmdCb3VuZHMsXG4gICAgICAgICAgICBjZW50ZXI6IGxhdExuZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYi5jYWxsKGNvbnRleHQsIHJlc3VsdHMpO1xuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5jYWdlKGFwaUtleSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IE9wZW5DYWdlKGFwaUtleSwgb3B0aW9ucyk7XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGdldEpTT04gfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IHZhciBQZWxpYXMgPSBMLkNsYXNzLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBzZXJ2aWNlVXJsOiAnaHR0cHM6Ly9hcGkuZ2VvY29kZS5lYXJ0aC92MScsXG4gICAgZ2VvY29kaW5nUXVlcnlQYXJhbXM6IHt9LFxuICAgIHJldmVyc2VRdWVyeVBhcmFtczoge31cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbihhcGlLZXksIG9wdGlvbnMpIHtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9hcGlLZXkgPSBhcGlLZXk7XG4gICAgdGhpcy5fbGFzdFN1Z2dlc3QgPSAwO1xuICB9LFxuXG4gIGdlb2NvZGU6IGZ1bmN0aW9uKHF1ZXJ5LCBjYiwgY29udGV4dCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgZ2V0SlNPTihcbiAgICAgIHRoaXMub3B0aW9ucy5zZXJ2aWNlVXJsICsgJy9zZWFyY2gnLFxuICAgICAgTC5leHRlbmQoXG4gICAgICAgIHtcbiAgICAgICAgICBhcGlfa2V5OiB0aGlzLl9hcGlLZXksXG4gICAgICAgICAgdGV4dDogcXVlcnlcbiAgICAgICAgfSxcbiAgICAgICAgdGhpcy5vcHRpb25zLmdlb2NvZGluZ1F1ZXJ5UGFyYW1zXG4gICAgICApLFxuICAgICAgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjYi5jYWxsKGNvbnRleHQsIF90aGlzLl9wYXJzZVJlc3VsdHMoZGF0YSwgJ2Jib3gnKSk7XG4gICAgICB9XG4gICAgKTtcbiAgfSxcblxuICBzdWdnZXN0OiBmdW5jdGlvbihxdWVyeSwgY2IsIGNvbnRleHQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGdldEpTT04oXG4gICAgICB0aGlzLm9wdGlvbnMuc2VydmljZVVybCArICcvYXV0b2NvbXBsZXRlJyxcbiAgICAgIEwuZXh0ZW5kKFxuICAgICAgICB7XG4gICAgICAgICAgYXBpX2tleTogdGhpcy5fYXBpS2V5LFxuICAgICAgICAgIHRleHQ6IHF1ZXJ5XG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMub3B0aW9ucy5nZW9jb2RpbmdRdWVyeVBhcmFtc1xuICAgICAgKSxcbiAgICAgIEwuYmluZChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmdlb2NvZGluZy50aW1lc3RhbXAgPiB0aGlzLl9sYXN0U3VnZ2VzdCkge1xuICAgICAgICAgIHRoaXMuX2xhc3RTdWdnZXN0ID0gZGF0YS5nZW9jb2RpbmcudGltZXN0YW1wO1xuICAgICAgICAgIGNiLmNhbGwoY29udGV4dCwgX3RoaXMuX3BhcnNlUmVzdWx0cyhkYXRhLCAnYmJveCcpKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcylcbiAgICApO1xuICB9LFxuXG4gIHJldmVyc2U6IGZ1bmN0aW9uKGxvY2F0aW9uLCBzY2FsZSwgY2IsIGNvbnRleHQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGdldEpTT04oXG4gICAgICB0aGlzLm9wdGlvbnMuc2VydmljZVVybCArICcvcmV2ZXJzZScsXG4gICAgICBMLmV4dGVuZChcbiAgICAgICAge1xuICAgICAgICAgIGFwaV9rZXk6IHRoaXMuX2FwaUtleSxcbiAgICAgICAgICAncG9pbnQubGF0JzogbG9jYXRpb24ubGF0LFxuICAgICAgICAgICdwb2ludC5sb24nOiBsb2NhdGlvbi5sbmdcbiAgICAgICAgfSxcbiAgICAgICAgdGhpcy5vcHRpb25zLnJldmVyc2VRdWVyeVBhcmFtc1xuICAgICAgKSxcbiAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY2IuY2FsbChjb250ZXh0LCBfdGhpcy5fcGFyc2VSZXN1bHRzKGRhdGEsICdib3VuZHMnKSk7XG4gICAgICB9XG4gICAgKTtcbiAgfSxcblxuICBfcGFyc2VSZXN1bHRzOiBmdW5jdGlvbihkYXRhLCBiYm94bmFtZSkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgTC5nZW9Kc29uKGRhdGEsIHtcbiAgICAgIHBvaW50VG9MYXllcjogZnVuY3Rpb24oZmVhdHVyZSwgbGF0bG5nKSB7XG4gICAgICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcpO1xuICAgICAgfSxcbiAgICAgIG9uRWFjaEZlYXR1cmU6IGZ1bmN0aW9uKGZlYXR1cmUsIGxheWVyKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fSxcbiAgICAgICAgICBiYm94LFxuICAgICAgICAgIGNlbnRlcjtcblxuICAgICAgICBpZiAobGF5ZXIuZ2V0Qm91bmRzKSB7XG4gICAgICAgICAgYmJveCA9IGxheWVyLmdldEJvdW5kcygpO1xuICAgICAgICAgIGNlbnRlciA9IGJib3guZ2V0Q2VudGVyKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIuZmVhdHVyZS5iYm94KSB7XG4gICAgICAgICAgY2VudGVyID0gbGF5ZXIuZ2V0TGF0TG5nKCk7XG4gICAgICAgICAgYmJveCA9IEwubGF0TG5nQm91bmRzKFxuICAgICAgICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5nKGxheWVyLmZlYXR1cmUuYmJveC5zbGljZSgwLCAyKSksXG4gICAgICAgICAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmcobGF5ZXIuZmVhdHVyZS5iYm94LnNsaWNlKDIsIDQpKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VudGVyID0gbGF5ZXIuZ2V0TGF0TG5nKCk7XG4gICAgICAgICAgYmJveCA9IEwubGF0TG5nQm91bmRzKGNlbnRlciwgY2VudGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5uYW1lID0gbGF5ZXIuZmVhdHVyZS5wcm9wZXJ0aWVzLmxhYmVsO1xuICAgICAgICByZXN1bHQuY2VudGVyID0gY2VudGVyO1xuICAgICAgICByZXN1bHRbYmJveG5hbWVdID0gYmJveDtcbiAgICAgICAgcmVzdWx0LnByb3BlcnRpZXMgPSBsYXllci5mZWF0dXJlLnByb3BlcnRpZXM7XG4gICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBlbGlhcyhhcGlLZXksIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBQZWxpYXMoYXBpS2V5LCBvcHRpb25zKTtcbn1cbmV4cG9ydCB2YXIgR2VvY29kZUVhcnRoID0gUGVsaWFzO1xuZXhwb3J0IHZhciBnZW9jb2RlRWFydGggPSBwZWxpYXM7XG5cbmV4cG9ydCB2YXIgTWFwemVuID0gUGVsaWFzOyAvLyByLmkucC5cbmV4cG9ydCB2YXIgbWFwemVuID0gcGVsaWFzO1xuXG5leHBvcnQgdmFyIE9wZW5yb3V0ZXNlcnZpY2UgPSBNYXB6ZW4uZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIHNlcnZpY2VVcmw6ICdodHRwczovL2FwaS5vcGVucm91dGVzZXJ2aWNlLm9yZy9nZW9jb2RlJ1xuICB9XG59KTtcbmV4cG9ydCBmdW5jdGlvbiBvcGVucm91dGVzZXJ2aWNlKGFwaUtleSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IE9wZW5yb3V0ZXNlcnZpY2UoYXBpS2V5LCBvcHRpb25zKTtcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgZ2V0SlNPTiB9IGZyb20gJy4uL3V0aWwnO1xuXG5leHBvcnQgdmFyIFBob3RvbiA9IEwuQ2xhc3MuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIHNlcnZpY2VVcmw6ICdodHRwczovL3Bob3Rvbi5rb21vb3QuZGUvYXBpLycsXG4gICAgcmV2ZXJzZVVybDogJ2h0dHBzOi8vcGhvdG9uLmtvbW9vdC5kZS9yZXZlcnNlLycsXG4gICAgbmFtZVByb3BlcnRpZXM6IFsnbmFtZScsICdzdHJlZXQnLCAnc3VidXJiJywgJ2hhbWxldCcsICd0b3duJywgJ2NpdHknLCAnc3RhdGUnLCAnY291bnRyeSddXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBnZW9jb2RlOiBmdW5jdGlvbihxdWVyeSwgY2IsIGNvbnRleHQpIHtcbiAgICB2YXIgcGFyYW1zID0gTC5leHRlbmQoXG4gICAgICB7XG4gICAgICAgIHE6IHF1ZXJ5XG4gICAgICB9LFxuICAgICAgdGhpcy5vcHRpb25zLmdlb2NvZGluZ1F1ZXJ5UGFyYW1zXG4gICAgKTtcblxuICAgIGdldEpTT04oXG4gICAgICB0aGlzLm9wdGlvbnMuc2VydmljZVVybCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIEwuYmluZChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNiLmNhbGwoY29udGV4dCwgdGhpcy5fZGVjb2RlRmVhdHVyZXMoZGF0YSkpO1xuICAgICAgfSwgdGhpcylcbiAgICApO1xuICB9LFxuXG4gIHN1Z2dlc3Q6IGZ1bmN0aW9uKHF1ZXJ5LCBjYiwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLmdlb2NvZGUocXVlcnksIGNiLCBjb250ZXh0KTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbihsYXRMbmcsIHNjYWxlLCBjYiwgY29udGV4dCkge1xuICAgIHZhciBwYXJhbXMgPSBMLmV4dGVuZChcbiAgICAgIHtcbiAgICAgICAgbGF0OiBsYXRMbmcubGF0LFxuICAgICAgICBsb246IGxhdExuZy5sbmdcbiAgICAgIH0sXG4gICAgICB0aGlzLm9wdGlvbnMucmV2ZXJzZVF1ZXJ5UGFyYW1zXG4gICAgKTtcblxuICAgIGdldEpTT04oXG4gICAgICB0aGlzLm9wdGlvbnMucmV2ZXJzZVVybCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIEwuYmluZChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNiLmNhbGwoY29udGV4dCwgdGhpcy5fZGVjb2RlRmVhdHVyZXMoZGF0YSkpO1xuICAgICAgfSwgdGhpcylcbiAgICApO1xuICB9LFxuXG4gIF9kZWNvZGVGZWF0dXJlczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciByZXN1bHRzID0gW10sXG4gICAgICBpLFxuICAgICAgZixcbiAgICAgIGMsXG4gICAgICBsYXRMbmcsXG4gICAgICBleHRlbnQsXG4gICAgICBiYm94O1xuXG4gICAgaWYgKGRhdGEgJiYgZGF0YS5mZWF0dXJlcykge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGEuZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZiA9IGRhdGEuZmVhdHVyZXNbaV07XG4gICAgICAgIGMgPSBmLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgICBsYXRMbmcgPSBMLmxhdExuZyhjWzFdLCBjWzBdKTtcbiAgICAgICAgZXh0ZW50ID0gZi5wcm9wZXJ0aWVzLmV4dGVudDtcblxuICAgICAgICBpZiAoZXh0ZW50KSB7XG4gICAgICAgICAgYmJveCA9IEwubGF0TG5nQm91bmRzKFtleHRlbnRbMV0sIGV4dGVudFswXV0sIFtleHRlbnRbM10sIGV4dGVudFsyXV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJib3ggPSBMLmxhdExuZ0JvdW5kcyhsYXRMbmcsIGxhdExuZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHRoaXMuX2RlY29kZUZlYXR1cmVOYW1lKGYpLFxuICAgICAgICAgIGh0bWw6IHRoaXMub3B0aW9ucy5odG1sVGVtcGxhdGUgPyB0aGlzLm9wdGlvbnMuaHRtbFRlbXBsYXRlKGYpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIGNlbnRlcjogbGF0TG5nLFxuICAgICAgICAgIGJib3g6IGJib3gsXG4gICAgICAgICAgcHJvcGVydGllczogZi5wcm9wZXJ0aWVzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9LFxuXG4gIF9kZWNvZGVGZWF0dXJlTmFtZTogZnVuY3Rpb24oZikge1xuICAgIHJldHVybiAodGhpcy5vcHRpb25zLm5hbWVQcm9wZXJ0aWVzIHx8IFtdKVxuICAgICAgLm1hcChmdW5jdGlvbihwKSB7XG4gICAgICAgIHJldHVybiBmLnByb3BlcnRpZXNbcF07XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihmdW5jdGlvbih2KSB7XG4gICAgICAgIHJldHVybiAhIXY7XG4gICAgICB9KVxuICAgICAgLmpvaW4oJywgJyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcGhvdG9uKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBQaG90b24ob3B0aW9ucyk7XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGdldEpTT04gfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IHZhciBXaGF0M1dvcmRzID0gTC5DbGFzcy5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgc2VydmljZVVybDogJ2h0dHBzOi8vYXBpLndoYXQzd29yZHMuY29tL3YyLydcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbihhY2Nlc3NUb2tlbikge1xuICAgIHRoaXMuX2FjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XG4gIH0sXG5cbiAgZ2VvY29kZTogZnVuY3Rpb24ocXVlcnksIGNiLCBjb250ZXh0KSB7XG4gICAgLy9nZXQgdGhyZWUgd29yZHMgYW5kIG1ha2UgYSBkb3QgYmFzZWQgc3RyaW5nXG4gICAgZ2V0SlNPTihcbiAgICAgIHRoaXMub3B0aW9ucy5zZXJ2aWNlVXJsICsgJ2ZvcndhcmQnLFxuICAgICAge1xuICAgICAgICBrZXk6IHRoaXMuX2FjY2Vzc1Rva2VuLFxuICAgICAgICBhZGRyOiBxdWVyeS5zcGxpdCgvXFxzKy8pLmpvaW4oJy4nKVxuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgICBsYXRMbmcsXG4gICAgICAgICAgbGF0TG5nQm91bmRzO1xuICAgICAgICBpZiAoZGF0YS5nZW9tZXRyeSkge1xuICAgICAgICAgIGxhdExuZyA9IEwubGF0TG5nKGRhdGEuZ2VvbWV0cnlbJ2xhdCddLCBkYXRhLmdlb21ldHJ5WydsbmcnXSk7XG4gICAgICAgICAgbGF0TG5nQm91bmRzID0gTC5sYXRMbmdCb3VuZHMobGF0TG5nLCBsYXRMbmcpO1xuICAgICAgICAgIHJlc3VsdHNbMF0gPSB7XG4gICAgICAgICAgICBuYW1lOiBkYXRhLndvcmRzLFxuICAgICAgICAgICAgYmJveDogbGF0TG5nQm91bmRzLFxuICAgICAgICAgICAgY2VudGVyOiBsYXRMbmdcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY2IuY2FsbChjb250ZXh0LCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICApO1xuICB9LFxuXG4gIHN1Z2dlc3Q6IGZ1bmN0aW9uKHF1ZXJ5LCBjYiwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLmdlb2NvZGUocXVlcnksIGNiLCBjb250ZXh0KTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbihsb2NhdGlvbiwgc2NhbGUsIGNiLCBjb250ZXh0KSB7XG4gICAgZ2V0SlNPTihcbiAgICAgIHRoaXMub3B0aW9ucy5zZXJ2aWNlVXJsICsgJ3JldmVyc2UnLFxuICAgICAge1xuICAgICAgICBrZXk6IHRoaXMuX2FjY2Vzc1Rva2VuLFxuICAgICAgICBjb29yZHM6IFtsb2NhdGlvbi5sYXQsIGxvY2F0aW9uLmxuZ10uam9pbignLCcpXG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdLFxuICAgICAgICAgIGxhdExuZyxcbiAgICAgICAgICBsYXRMbmdCb3VuZHM7XG4gICAgICAgIGlmIChkYXRhLnN0YXR1cy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgbGF0TG5nID0gTC5sYXRMbmcoZGF0YS5nZW9tZXRyeVsnbGF0J10sIGRhdGEuZ2VvbWV0cnlbJ2xuZyddKTtcbiAgICAgICAgICBsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhsYXRMbmcsIGxhdExuZyk7XG4gICAgICAgICAgcmVzdWx0c1swXSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEud29yZHMsXG4gICAgICAgICAgICBiYm94OiBsYXRMbmdCb3VuZHMsXG4gICAgICAgICAgICBjZW50ZXI6IGxhdExuZ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY2IuY2FsbChjb250ZXh0LCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHdoYXQzd29yZHMoYWNjZXNzVG9rZW4pIHtcbiAgcmV0dXJuIG5ldyBXaGF0M1dvcmRzKGFjY2Vzc1Rva2VuKTtcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgR2VvY29kZXIsIGdlb2NvZGVyIH0gZnJvbSAnLi9jb250cm9sJztcbmltcG9ydCAqIGFzIGdlb2NvZGVycyBmcm9tICcuL2dlb2NvZGVycy9pbmRleCc7XG5cbkwuVXRpbC5leHRlbmQoR2VvY29kZXIsIGdlb2NvZGVycyk7XG5leHBvcnQgZGVmYXVsdCBHZW9jb2RlcjtcblxuTC5VdGlsLmV4dGVuZChMLkNvbnRyb2wsIHtcbiAgR2VvY29kZXI6IEdlb2NvZGVyLFxuICBnZW9jb2RlcjogZ2VvY29kZXJcbn0pO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG52YXIgbGFzdENhbGxiYWNrSWQgPSAwO1xuXG4vLyBBZGFwdGVkIGZyb20gaGFuZGxlYmFycy5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3d5Y2F0cy9oYW5kbGViYXJzLmpzL1xudmFyIGJhZENoYXJzID0gL1smPD5cIidgXS9nO1xudmFyIHBvc3NpYmxlID0gL1smPD5cIidgXS87XG52YXIgZXNjYXBlID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiN4Mjc7JyxcbiAgJ2AnOiAnJiN4NjA7J1xufTtcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHRtbEVzY2FwZShzdHJpbmcpIHtcbiAgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9IGVsc2UgaWYgKCFzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gIH1cblxuICAvLyBGb3JjZSBhIHN0cmluZyBjb252ZXJzaW9uIGFzIHRoaXMgd2lsbCBiZSBkb25lIGJ5IHRoZSBhcHBlbmQgcmVnYXJkbGVzcyBhbmRcbiAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gIC8vIGFuIG9iamVjdCdzIHRvIHN0cmluZyBoYXMgZXNjYXBlZCBjaGFyYWN0ZXJzIGluIGl0LlxuICBzdHJpbmcgPSAnJyArIHN0cmluZztcblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25wKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCwganNvbnBQYXJhbSkge1xuICB2YXIgY2FsbGJhY2tJZCA9ICdfbF9nZW9jb2Rlcl8nICsgbGFzdENhbGxiYWNrSWQrKztcbiAgcGFyYW1zW2pzb25wUGFyYW0gfHwgJ2NhbGxiYWNrJ10gPSBjYWxsYmFja0lkO1xuICB3aW5kb3dbY2FsbGJhY2tJZF0gPSBMLlV0aWwuYmluZChjYWxsYmFjaywgY29udGV4dCk7XG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgc2NyaXB0LnNyYyA9IHVybCArIGdldFBhcmFtU3RyaW5nKHBhcmFtcyk7XG4gIHNjcmlwdC5pZCA9IGNhbGxiYWNrSWQ7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEpTT04odXJsLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIHZhciB4bWxIdHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhtbEh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHhtbEh0dHAucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbWVzc2FnZTtcbiAgICBpZiAoeG1sSHR0cC5zdGF0dXMgIT09IDIwMCAmJiB4bWxIdHRwLnN0YXR1cyAhPT0gMzA0KSB7XG4gICAgICBtZXNzYWdlID0gJyc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgeG1sSHR0cC5yZXNwb25zZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIElFIGRvZXNuJ3QgcGFyc2UgSlNPTiByZXNwb25zZXMgZXZlbiB3aXRoIHJlc3BvbnNlVHlwZTogJ2pzb24nLlxuICAgICAgdHJ5IHtcbiAgICAgICAgbWVzc2FnZSA9IEpTT04ucGFyc2UoeG1sSHR0cC5yZXNwb25zZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIE5vdCBhIEpTT04gcmVzcG9uc2VcbiAgICAgICAgbWVzc2FnZSA9IHhtbEh0dHAucmVzcG9uc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UgPSB4bWxIdHRwLnJlc3BvbnNlO1xuICAgIH1cbiAgICBjYWxsYmFjayhtZXNzYWdlKTtcbiAgfTtcbiAgeG1sSHR0cC5vcGVuKCdHRVQnLCB1cmwgKyBnZXRQYXJhbVN0cmluZyhwYXJhbXMpLCB0cnVlKTtcbiAgeG1sSHR0cC5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gIHhtbEh0dHAuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgeG1sSHR0cC5zZW5kKG51bGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGUoc3RyLCBkYXRhKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFx7ICooW1xcd19dKykgKlxcfS9nLCBmdW5jdGlvbihzdHIsIGtleSkge1xuICAgIHZhciB2YWx1ZSA9IGRhdGFba2V5XTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxFc2NhcGUodmFsdWUpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmFtU3RyaW5nKG9iaiwgZXhpc3RpbmdVcmwsIHVwcGVyY2FzZSkge1xuICB2YXIgcGFyYW1zID0gW107XG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgdmFyIGtleSA9IGVuY29kZVVSSUNvbXBvbmVudCh1cHBlcmNhc2UgPyBpLnRvVXBwZXJDYXNlKCkgOiBpKTtcbiAgICB2YXIgdmFsdWUgPSBvYmpbaV07XG4gICAgaWYgKCFMLlV0aWwuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHBhcmFtcy5wdXNoKGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZVtqXSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gKCFleGlzdGluZ1VybCB8fCBleGlzdGluZ1VybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHBhcmFtcy5qb2luKCcmJyk7XG59XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iXSwic291cmNlUm9vdCI6IiJ9