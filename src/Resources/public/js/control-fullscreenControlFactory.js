(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["control-fullscreenControlFactory"],{

/***/ "./js/control/fullscreenControlFactory.js":
/*!************************************************!*\
  !*** ./js/control/fullscreenControlFactory.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_fullscreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet.fullscreen */ "./node_modules/leaflet.fullscreen/Control.FullScreen.js");
/* harmony import */ var leaflet_fullscreen__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet_fullscreen__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function (_x) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new L.Control.FullScreen(config.options));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/leaflet.fullscreen/Control.FullScreen.js":
/*!***************************************************************!*\
  !*** ./node_modules/leaflet.fullscreen/Control.FullScreen.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {

L.Control.FullScreen = L.Control.extend({
	options: {
		position: 'topleft',
		title: 'Full Screen',
		titleCancel: 'Exit Full Screen',
		forceSeparateButton: false,
		forcePseudoFullscreen: false,
		fullscreenElement: false
	},
	
	onAdd: function (map) {
		var className = 'leaflet-control-zoom-fullscreen', container, content = '';
		
		if (map.zoomControl && !this.options.forceSeparateButton) {
			container = map.zoomControl._container;
		} else {
			container = L.DomUtil.create('div', 'leaflet-bar');
		}
		
		if (this.options.content) {
			content = this.options.content;
		} else {
			className += ' fullscreen-icon';
		}

		this._createButton(this.options.title, className, content, container, this.toggleFullScreen, this);
		this._map.fullscreenControl = this;

		this._map.on('enterFullscreen exitFullscreen', this._toggleTitle, this);

		return container;
	},
	
	onRemove: function (map) {
		L.DomEvent
			.off(this.link, 'click', L.DomEvent.stopPropagation)
			.off(this.link, 'click', L.DomEvent.preventDefault)
			.off(this.link, 'click', this.toggleFullScreen, this);
		
		L.DomEvent
			.off(this._container, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.off(this._container, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.off(this._container, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, this);
		
		L.DomEvent
			.off(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.off(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.off(document, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, this);
	},
	
	_createButton: function (title, className, content, container, fn, context) {
		this.link = L.DomUtil.create('a', className, container);
		this.link.href = '#';
		this.link.title = title;
		this.link.innerHTML = content;

		this.link.setAttribute('role', 'button');
		this.link.setAttribute('aria-label', title);

		L.DomEvent
			.on(this.link, 'click', L.DomEvent.stopPropagation)
			.on(this.link, 'click', L.DomEvent.preventDefault)
			.on(this.link, 'click', fn, context);
		
		L.DomEvent
			.on(container, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.on(container, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.on(container, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context);
		
		L.DomEvent
			.on(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.on(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.on(document, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context);

		return this.link;
	},
	
	toggleFullScreen: function () {
		var map = this._map;
		map._exitFired = false;
		if (map._isFullscreen) {
			if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
				fullScreenApi.cancelFullScreen();
			} else {
				L.DomUtil.removeClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen');
			}
			map.fire('exitFullscreen');
			map._exitFired = true;
			map._isFullscreen = false;
		}
		else {
			if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
				fullScreenApi.requestFullScreen(this.options.fullscreenElement ? this.options.fullscreenElement : map._container);
			} else {
				L.DomUtil.addClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen');
			}
			map.fire('enterFullscreen');
			map._isFullscreen = true;
		}
	},
	
	_toggleTitle: function () {
		this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel;
	},
	
	_handleFullscreenChange: function () {
		var map = this._map;
		map.invalidateSize();
		if (!fullScreenApi.isFullScreen() && !map._exitFired) {
			map.fire('exitFullscreen');
			map._exitFired = true;
			map._isFullscreen = false;
		}
	}
});

L.Map.include({
	toggleFullscreen: function () {
		this.fullscreenControl.toggleFullScreen();
	}
});

L.Map.addInitHook(function () {
	if (this.options.fullscreenControl) {
		this.addControl(L.control.fullscreen(this.options.fullscreenControlOptions));
	}
});

L.control.fullscreen = function (options) {
	return new L.Control.FullScreen(options);
};

/* 
Native FullScreen JavaScript API
-------------
Assumes Mozilla naming conventions instead of W3C for now

source : http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/

*/

	var 
		fullScreenApi = { 
			supportsFullScreen: false,
			isFullScreen: function () { return false; }, 
			requestFullScreen: function () {}, 
			cancelFullScreen: function () {},
			fullScreenEventName: '',
			prefix: ''
		},
		browserPrefixes = 'webkit moz o ms khtml'.split(' ');
	
	// check for native support
	if (typeof document.exitFullscreen !== 'undefined') {
		fullScreenApi.supportsFullScreen = true;
	} else {
		// check for fullscreen support by vendor prefix
		for (var i = 0, il = browserPrefixes.length; i < il; i++) {
			fullScreenApi.prefix = browserPrefixes[i];
			if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] !== 'undefined') {
				fullScreenApi.supportsFullScreen = true;
				break;
			}
		}
		if (typeof document['msExitFullscreen'] !== 'undefined') {
			fullScreenApi.prefix = 'ms';
			fullScreenApi.supportsFullScreen = true;
		}
	}
	
	// update methods to do something useful
	if (fullScreenApi.supportsFullScreen) {
		if (fullScreenApi.prefix === 'ms') {
			fullScreenApi.fullScreenEventName = 'MSFullscreenChange';
		} else {
			fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
		}
		fullScreenApi.isFullScreen = function () {
			switch (this.prefix) {
				case '':
					return document.fullscreen;
				case 'webkit':
					return document.webkitIsFullScreen;
				case 'ms':
					return document.msFullscreenElement;
				default:
					return document[this.prefix + 'FullScreen'];
			}
		};
		fullScreenApi.requestFullScreen = function (el) {
			switch (this.prefix) {
				case '':
					return el.requestFullscreen();
				case 'ms':
					return el.msRequestFullscreen();
				default:
					return el[this.prefix + 'RequestFullScreen']();
			}
		};
		fullScreenApi.cancelFullScreen = function () {
			switch (this.prefix) {
				case '':
					return document.exitFullscreen();
				case 'ms':
					return document.msExitFullscreen();
				default:
					return document[this.prefix + 'CancelFullScreen']();
			}
		};
	}

	// jQuery plugin
	if (typeof jQuery !== 'undefined') {
		jQuery.fn.requestFullScreen = function () {
			return this.each(function () {
				var el = jQuery(this);
				if (fullScreenApi.supportsFullScreen) {
					fullScreenApi.requestFullScreen(el);
				}
			});
		};
	}

	// export api
	window.fullScreenApi = fullScreenApi;
})();


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9jb250cm9sL2Z1bGxzY3JlZW5Db250cm9sRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC5mdWxsc2NyZWVuL0NvbnRyb2wuRnVsbFNjcmVlbi5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJMIiwiQ29udHJvbCIsIkZ1bGxTY3JlZW4iLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZTtBQUFmO0FBQUE7Ozs2S0FBZSxpQkFBZUEsTUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkNBQ0osSUFBSUMsQ0FBQyxDQUFDQyxPQUFGLENBQVVDLFVBQWQsQ0FBeUJILE1BQU0sQ0FBQ0ksT0FBaEMsQ0FESTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7Ozs7Ozs7Ozs7O0FDRmY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsbUI7QUFDQTtBQUNBLDhCQUE4QixjQUFjLEVBQUU7QUFDOUMsb0NBQW9DO0FBQ3BDLG1DQUFtQztBQUNuQztBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoianMvY29udHJvbC1mdWxsc2NyZWVuQ29udHJvbEZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2xlYWZsZXQuZnVsbHNjcmVlbic7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgTC5Db250cm9sLkZ1bGxTY3JlZW4oY29uZmlnLm9wdGlvbnMpO1xufVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuTC5Db250cm9sLkZ1bGxTY3JlZW4gPSBMLkNvbnRyb2wuZXh0ZW5kKHtcblx0b3B0aW9uczoge1xuXHRcdHBvc2l0aW9uOiAndG9wbGVmdCcsXG5cdFx0dGl0bGU6ICdGdWxsIFNjcmVlbicsXG5cdFx0dGl0bGVDYW5jZWw6ICdFeGl0IEZ1bGwgU2NyZWVuJyxcblx0XHRmb3JjZVNlcGFyYXRlQnV0dG9uOiBmYWxzZSxcblx0XHRmb3JjZVBzZXVkb0Z1bGxzY3JlZW46IGZhbHNlLFxuXHRcdGZ1bGxzY3JlZW5FbGVtZW50OiBmYWxzZVxuXHR9LFxuXHRcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcblx0XHR2YXIgY2xhc3NOYW1lID0gJ2xlYWZsZXQtY29udHJvbC16b29tLWZ1bGxzY3JlZW4nLCBjb250YWluZXIsIGNvbnRlbnQgPSAnJztcblx0XHRcblx0XHRpZiAobWFwLnpvb21Db250cm9sICYmICF0aGlzLm9wdGlvbnMuZm9yY2VTZXBhcmF0ZUJ1dHRvbikge1xuXHRcdFx0Y29udGFpbmVyID0gbWFwLnpvb21Db250cm9sLl9jb250YWluZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWJhcicpO1xuXHRcdH1cblx0XHRcblx0XHRpZiAodGhpcy5vcHRpb25zLmNvbnRlbnQpIHtcblx0XHRcdGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2xhc3NOYW1lICs9ICcgZnVsbHNjcmVlbi1pY29uJztcblx0XHR9XG5cblx0XHR0aGlzLl9jcmVhdGVCdXR0b24odGhpcy5vcHRpb25zLnRpdGxlLCBjbGFzc05hbWUsIGNvbnRlbnQsIGNvbnRhaW5lciwgdGhpcy50b2dnbGVGdWxsU2NyZWVuLCB0aGlzKTtcblx0XHR0aGlzLl9tYXAuZnVsbHNjcmVlbkNvbnRyb2wgPSB0aGlzO1xuXG5cdFx0dGhpcy5fbWFwLm9uKCdlbnRlckZ1bGxzY3JlZW4gZXhpdEZ1bGxzY3JlZW4nLCB0aGlzLl90b2dnbGVUaXRsZSwgdGhpcyk7XG5cblx0XHRyZXR1cm4gY29udGFpbmVyO1xuXHR9LFxuXHRcblx0b25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcblx0XHRMLkRvbUV2ZW50XG5cdFx0XHQub2ZmKHRoaXMubGluaywgJ2NsaWNrJywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pXG5cdFx0XHQub2ZmKHRoaXMubGluaywgJ2NsaWNrJywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdClcblx0XHRcdC5vZmYodGhpcy5saW5rLCAnY2xpY2snLCB0aGlzLnRvZ2dsZUZ1bGxTY3JlZW4sIHRoaXMpO1xuXHRcdFxuXHRcdEwuRG9tRXZlbnRcblx0XHRcdC5vZmYodGhpcy5fY29udGFpbmVyLCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuXHRcdFx0Lm9mZih0aGlzLl9jb250YWluZXIsIGZ1bGxTY3JlZW5BcGkuZnVsbFNjcmVlbkV2ZW50TmFtZSwgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdClcblx0XHRcdC5vZmYodGhpcy5fY29udGFpbmVyLCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIHRoaXMuX2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2UsIHRoaXMpO1xuXHRcdFxuXHRcdEwuRG9tRXZlbnRcblx0XHRcdC5vZmYoZG9jdW1lbnQsIGZ1bGxTY3JlZW5BcGkuZnVsbFNjcmVlbkV2ZW50TmFtZSwgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pXG5cdFx0XHQub2ZmKGRvY3VtZW50LCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQpXG5cdFx0XHQub2ZmKGRvY3VtZW50LCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIHRoaXMuX2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2UsIHRoaXMpO1xuXHR9LFxuXHRcblx0X2NyZWF0ZUJ1dHRvbjogZnVuY3Rpb24gKHRpdGxlLCBjbGFzc05hbWUsIGNvbnRlbnQsIGNvbnRhaW5lciwgZm4sIGNvbnRleHQpIHtcblx0XHR0aGlzLmxpbmsgPSBMLkRvbVV0aWwuY3JlYXRlKCdhJywgY2xhc3NOYW1lLCBjb250YWluZXIpO1xuXHRcdHRoaXMubGluay5ocmVmID0gJyMnO1xuXHRcdHRoaXMubGluay50aXRsZSA9IHRpdGxlO1xuXHRcdHRoaXMubGluay5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdFx0dGhpcy5saW5rLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcblx0XHR0aGlzLmxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdGl0bGUpO1xuXG5cdFx0TC5Eb21FdmVudFxuXHRcdFx0Lm9uKHRoaXMubGluaywgJ2NsaWNrJywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pXG5cdFx0XHQub24odGhpcy5saW5rLCAnY2xpY2snLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KVxuXHRcdFx0Lm9uKHRoaXMubGluaywgJ2NsaWNrJywgZm4sIGNvbnRleHQpO1xuXHRcdFxuXHRcdEwuRG9tRXZlbnRcblx0XHRcdC5vbihjb250YWluZXIsIGZ1bGxTY3JlZW5BcGkuZnVsbFNjcmVlbkV2ZW50TmFtZSwgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pXG5cdFx0XHQub24oY29udGFpbmVyLCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQpXG5cdFx0XHQub24oY29udGFpbmVyLCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIHRoaXMuX2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2UsIGNvbnRleHQpO1xuXHRcdFxuXHRcdEwuRG9tRXZlbnRcblx0XHRcdC5vbihkb2N1bWVudCwgZnVsbFNjcmVlbkFwaS5mdWxsU2NyZWVuRXZlbnROYW1lLCBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbilcblx0XHRcdC5vbihkb2N1bWVudCwgZnVsbFNjcmVlbkFwaS5mdWxsU2NyZWVuRXZlbnROYW1lLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KVxuXHRcdFx0Lm9uKGRvY3VtZW50LCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIHRoaXMuX2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2UsIGNvbnRleHQpO1xuXG5cdFx0cmV0dXJuIHRoaXMubGluaztcblx0fSxcblx0XG5cdHRvZ2dsZUZ1bGxTY3JlZW46IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHRcdG1hcC5fZXhpdEZpcmVkID0gZmFsc2U7XG5cdFx0aWYgKG1hcC5faXNGdWxsc2NyZWVuKSB7XG5cdFx0XHRpZiAoZnVsbFNjcmVlbkFwaS5zdXBwb3J0c0Z1bGxTY3JlZW4gJiYgIXRoaXMub3B0aW9ucy5mb3JjZVBzZXVkb0Z1bGxzY3JlZW4pIHtcblx0XHRcdFx0ZnVsbFNjcmVlbkFwaS5jYW5jZWxGdWxsU2NyZWVuKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5FbGVtZW50ID8gdGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5FbGVtZW50IDogbWFwLl9jb250YWluZXIsICdsZWFmbGV0LXBzZXVkby1mdWxsc2NyZWVuJyk7XG5cdFx0XHR9XG5cdFx0XHRtYXAuZmlyZSgnZXhpdEZ1bGxzY3JlZW4nKTtcblx0XHRcdG1hcC5fZXhpdEZpcmVkID0gdHJ1ZTtcblx0XHRcdG1hcC5faXNGdWxsc2NyZWVuID0gZmFsc2U7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKGZ1bGxTY3JlZW5BcGkuc3VwcG9ydHNGdWxsU2NyZWVuICYmICF0aGlzLm9wdGlvbnMuZm9yY2VQc2V1ZG9GdWxsc2NyZWVuKSB7XG5cdFx0XHRcdGZ1bGxTY3JlZW5BcGkucmVxdWVzdEZ1bGxTY3JlZW4odGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5FbGVtZW50ID8gdGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5FbGVtZW50IDogbWFwLl9jb250YWluZXIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMub3B0aW9ucy5mdWxsc2NyZWVuRWxlbWVudCA/IHRoaXMub3B0aW9ucy5mdWxsc2NyZWVuRWxlbWVudCA6IG1hcC5fY29udGFpbmVyLCAnbGVhZmxldC1wc2V1ZG8tZnVsbHNjcmVlbicpO1xuXHRcdFx0fVxuXHRcdFx0bWFwLmZpcmUoJ2VudGVyRnVsbHNjcmVlbicpO1xuXHRcdFx0bWFwLl9pc0Z1bGxzY3JlZW4gPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0XG5cdF90b2dnbGVUaXRsZTogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMubGluay50aXRsZSA9IHRoaXMuX21hcC5faXNGdWxsc2NyZWVuID8gdGhpcy5vcHRpb25zLnRpdGxlIDogdGhpcy5vcHRpb25zLnRpdGxlQ2FuY2VsO1xuXHR9LFxuXHRcblx0X2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHRcdG1hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuXHRcdGlmICghZnVsbFNjcmVlbkFwaS5pc0Z1bGxTY3JlZW4oKSAmJiAhbWFwLl9leGl0RmlyZWQpIHtcblx0XHRcdG1hcC5maXJlKCdleGl0RnVsbHNjcmVlbicpO1xuXHRcdFx0bWFwLl9leGl0RmlyZWQgPSB0cnVlO1xuXHRcdFx0bWFwLl9pc0Z1bGxzY3JlZW4gPSBmYWxzZTtcblx0XHR9XG5cdH1cbn0pO1xuXG5MLk1hcC5pbmNsdWRlKHtcblx0dG9nZ2xlRnVsbHNjcmVlbjogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuZnVsbHNjcmVlbkNvbnRyb2wudG9nZ2xlRnVsbFNjcmVlbigpO1xuXHR9XG59KTtcblxuTC5NYXAuYWRkSW5pdEhvb2soZnVuY3Rpb24gKCkge1xuXHRpZiAodGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5Db250cm9sKSB7XG5cdFx0dGhpcy5hZGRDb250cm9sKEwuY29udHJvbC5mdWxsc2NyZWVuKHRoaXMub3B0aW9ucy5mdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMpKTtcblx0fVxufSk7XG5cbkwuY29udHJvbC5mdWxsc2NyZWVuID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0cmV0dXJuIG5ldyBMLkNvbnRyb2wuRnVsbFNjcmVlbihvcHRpb25zKTtcbn07XG5cbi8qIFxuTmF0aXZlIEZ1bGxTY3JlZW4gSmF2YVNjcmlwdCBBUElcbi0tLS0tLS0tLS0tLS1cbkFzc3VtZXMgTW96aWxsYSBuYW1pbmcgY29udmVudGlvbnMgaW5zdGVhZCBvZiBXM0MgZm9yIG5vd1xuXG5zb3VyY2UgOiBodHRwOi8vam9obmR5ZXIubmFtZS9uYXRpdmUtZnVsbHNjcmVlbi1qYXZhc2NyaXB0LWFwaS1wbHVzLWpxdWVyeS1wbHVnaW4vXG5cbiovXG5cblx0dmFyIFxuXHRcdGZ1bGxTY3JlZW5BcGkgPSB7IFxuXHRcdFx0c3VwcG9ydHNGdWxsU2NyZWVuOiBmYWxzZSxcblx0XHRcdGlzRnVsbFNjcmVlbjogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0sIFxuXHRcdFx0cmVxdWVzdEZ1bGxTY3JlZW46IGZ1bmN0aW9uICgpIHt9LCBcblx0XHRcdGNhbmNlbEZ1bGxTY3JlZW46IGZ1bmN0aW9uICgpIHt9LFxuXHRcdFx0ZnVsbFNjcmVlbkV2ZW50TmFtZTogJycsXG5cdFx0XHRwcmVmaXg6ICcnXG5cdFx0fSxcblx0XHRicm93c2VyUHJlZml4ZXMgPSAnd2Via2l0IG1veiBvIG1zIGtodG1sJy5zcGxpdCgnICcpO1xuXHRcblx0Ly8gY2hlY2sgZm9yIG5hdGl2ZSBzdXBwb3J0XG5cdGlmICh0eXBlb2YgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0ZnVsbFNjcmVlbkFwaS5zdXBwb3J0c0Z1bGxTY3JlZW4gPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGNoZWNrIGZvciBmdWxsc2NyZWVuIHN1cHBvcnQgYnkgdmVuZG9yIHByZWZpeFxuXHRcdGZvciAodmFyIGkgPSAwLCBpbCA9IGJyb3dzZXJQcmVmaXhlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG5cdFx0XHRmdWxsU2NyZWVuQXBpLnByZWZpeCA9IGJyb3dzZXJQcmVmaXhlc1tpXTtcblx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnRbZnVsbFNjcmVlbkFwaS5wcmVmaXggKyAnQ2FuY2VsRnVsbFNjcmVlbiddICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRmdWxsU2NyZWVuQXBpLnN1cHBvcnRzRnVsbFNjcmVlbiA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodHlwZW9mIGRvY3VtZW50Wydtc0V4aXRGdWxsc2NyZWVuJ10gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRmdWxsU2NyZWVuQXBpLnByZWZpeCA9ICdtcyc7XG5cdFx0XHRmdWxsU2NyZWVuQXBpLnN1cHBvcnRzRnVsbFNjcmVlbiA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdFxuXHQvLyB1cGRhdGUgbWV0aG9kcyB0byBkbyBzb21ldGhpbmcgdXNlZnVsXG5cdGlmIChmdWxsU2NyZWVuQXBpLnN1cHBvcnRzRnVsbFNjcmVlbikge1xuXHRcdGlmIChmdWxsU2NyZWVuQXBpLnByZWZpeCA9PT0gJ21zJykge1xuXHRcdFx0ZnVsbFNjcmVlbkFwaS5mdWxsU2NyZWVuRXZlbnROYW1lID0gJ01TRnVsbHNjcmVlbkNoYW5nZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bGxTY3JlZW5BcGkuZnVsbFNjcmVlbkV2ZW50TmFtZSA9IGZ1bGxTY3JlZW5BcGkucHJlZml4ICsgJ2Z1bGxzY3JlZW5jaGFuZ2UnO1xuXHRcdH1cblx0XHRmdWxsU2NyZWVuQXBpLmlzRnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN3aXRjaCAodGhpcy5wcmVmaXgpIHtcblx0XHRcdFx0Y2FzZSAnJzpcblx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQuZnVsbHNjcmVlbjtcblx0XHRcdFx0Y2FzZSAnd2Via2l0Jzpcblx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuO1xuXHRcdFx0XHRjYXNlICdtcyc6XG5cdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQ7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50W3RoaXMucHJlZml4ICsgJ0Z1bGxTY3JlZW4nXTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGZ1bGxTY3JlZW5BcGkucmVxdWVzdEZ1bGxTY3JlZW4gPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHN3aXRjaCAodGhpcy5wcmVmaXgpIHtcblx0XHRcdFx0Y2FzZSAnJzpcblx0XHRcdFx0XHRyZXR1cm4gZWwucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0Y2FzZSAnbXMnOlxuXHRcdFx0XHRcdHJldHVybiBlbC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGVsW3RoaXMucHJlZml4ICsgJ1JlcXVlc3RGdWxsU2NyZWVuJ10oKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGZ1bGxTY3JlZW5BcGkuY2FuY2VsRnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN3aXRjaCAodGhpcy5wcmVmaXgpIHtcblx0XHRcdFx0Y2FzZSAnJzpcblx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0Y2FzZSAnbXMnOlxuXHRcdFx0XHRcdHJldHVybiBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50W3RoaXMucHJlZml4ICsgJ0NhbmNlbEZ1bGxTY3JlZW4nXSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHQvLyBqUXVlcnkgcGx1Z2luXG5cdGlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGpRdWVyeS5mbi5yZXF1ZXN0RnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgZWwgPSBqUXVlcnkodGhpcyk7XG5cdFx0XHRcdGlmIChmdWxsU2NyZWVuQXBpLnN1cHBvcnRzRnVsbFNjcmVlbikge1xuXHRcdFx0XHRcdGZ1bGxTY3JlZW5BcGkucmVxdWVzdEZ1bGxTY3JlZW4oZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9XG5cblx0Ly8gZXhwb3J0IGFwaVxuXHR3aW5kb3cuZnVsbFNjcmVlbkFwaSA9IGZ1bGxTY3JlZW5BcGk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==