(window.webpackJsonp=window.webpackJsonp||[]).push([["layer-markerClusterGroupFactory"],{"c+5j":function(e,r,n){"use strict";n.r(r);var a=n("o0o1"),i=n.n(a),t=n("yXPU"),o=n.n(t);n("JXP8"),n("GINL");function s(e,r,n,a){r.forEach((function(r){e.layers.hasOwnProperty(r)?e.layers[r].cowegis.initialVisible?a.addLayer(e.layers[r]):a.checkIn(e.layers[r]):n.push(r)}))}function c(e,r,n){if(0!==n.length){e.addEventListener("cowegis:layer:add",(function a(i){var t=n.indexOf(i.detail.config.layerId);t<0||(n.splice(t,1),i.detail.config.initialVisible?r.addLayer(e.layers[i.detail.config.layerId]):r.checkIn(e.layers[i.detail.config.layerId]),0===n.length&&e.removeEventListener("cowegis:layer:add",a))}))}}function l(){return(l=o()(i.a.mark((function e(r,n){var a,t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],t=L.markerClusterGroup.layerSupport(r.options),s(n,r.layers,a,t),c(n,t,a),e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}r.default=function(e,r){return l.apply(this,arguments)}}}]);