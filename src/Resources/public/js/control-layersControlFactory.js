(window.webpackJsonp=window.webpackJsonp||[]).push([["control-layersControlFactory"],{gOro:function(e,n,a){"use strict";a.r(n);var r=a("o0o1"),o=a.n(r),t=a("yXPU"),i=a.n(t),s=a("y1Ye");function c(e){return'<span class="cowegis-layer cowegis-layer-'.concat(e.cowegis.type,'">').concat(e.cowegis.title,"</span>")}function l(e,n,a,r){n.forEach((function(n){e.layers.hasOwnProperty(n)?a.available[r(e.layers[n])]=e.layers[n]:a.pending.push(n)}))}function u(e,n,a,r){if(0!==n.pending.length){e.addEventListener("cowegis:layer:add",(function o(t){var i=n.pending.indexOf(t.detail.config.layerId);i<0||(a(t.detail.layer,r(t.detail.layer)),n.pending.splice(i,1),0===n.pending.length&&e.removeEventListener("cowegis:layer:add",o))}))}}function d(e){return function(n,a){var r,o=e.baseLayers.indexOf(n.cowegis.layerId);return o>=0?r=e.baseLayers.indexOf(a.cowegis.layerId):(o=e.overlays.indexOf(n.cowegis.layerId),r=e.overlays.indexOf(a.cowegis.layerId)),o-r}}function p(e,n){if(null===n.namespace)return e.listeners[n.reference];var a=e.listeners;return n.namespace.forEach((function(e){a=a[e]})),a[n.reference]}function y(){return(y=i()(o.a.mark((function e(n,a){var r,t,i,y;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={available:{},pending:[]},t={available:{},pending:[]},n.options.sortFunction?n.options.sortFunction=p(a,n.options.sortFunction):n.options.sortLayers||(n.options.sortLayers=!0,n.options.sortFunction=d(n)),i=n.options.nameFunction?p(a,n.options.nameFunction):c,l(a,n.baseLayers,r,i),l(a,n.overlays,t,i),y=s.default.control.layers(r.available,t.available,n.options),u(a,r,y.addBaseLayer.bind(y),i),u(a,t,y.addOverlay.bind(y),i),e.abrupt("return",y);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n.default=function(e,n){return y.apply(this,arguments)}}}]);