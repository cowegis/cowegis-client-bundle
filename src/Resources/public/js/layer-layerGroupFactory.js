(window.webpackJsonp=window.webpackJsonp||[]).push([["layer-layerGroupFactory"],{hF4G:function(n,e,r){"use strict";r.r(e),r.d(e,"createFactory",(function(){return l}));var a=r("o0o1"),t=r.n(a),i=r("yXPU"),o=r.n(i),u=r("y1Ye");function c(n,e,r){e.forEach((function(e){n.layers.hasOwnProperty(e)?r.available.push(n.layers[e]):r.pending.push(e)}))}function d(n,e,r){if(0!==r.pending.length){n.addEventListener("cowegis:layer:add",(function a(t){var i=r.pending.indexOf(t.detail.config.layerId);i<0||(e.addLayer(t.detail.layer),r.pending.splice(i,1),0===r.pending.length&&n.removeEventListener("cowegis:layer:add",a))}))}}function l(n){return function(){var e=o()(t.a.mark((function e(r,a){var i,o;return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i={available:[],pending:[]},c(a,r.layers,i),o=n(i.available,r.options),d(a,o,i),e.abrupt("return",o);case 5:case"end":return e.stop()}}),e)})));return function(n,r){return e.apply(this,arguments)}}()}e.default=l(u.default.layerGroup)}}]);