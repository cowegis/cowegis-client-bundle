(window.webpackJsonp=window.webpackJsonp||[]).push([["geojson-pointToLayer","geojson-bindPopupFromFeature","geojson-bindTooltipFromFeature"],{"4Ohi":function(p,e,t){"use strict";t.r(e);var o=t("bHXD"),r=t("XmCt"),s=t("gWOW");e.default=function(p,e,t){var i="marker",n=null,a={};return p.properties&&(p.properties.bounds=!0,(a=p.properties.options||{}).pane&&t.panes[a.pane]?a.pane=t.panes[a.pane].name:delete a.pane,p.properties.type&&(i=p.properties.type)),n=L[i](e,a),p.properties&&(Object(o.default)(n,p.properties.events,t),p.properties.radius&&n.setRadius(p.properties.radius),Object(r.default)(n,p,t),Object(s.default)(n,p,t)),n}},XmCt:function(p,e,t){"use strict";t.r(e);var o=t("bHXD");e.default=function(p,e,t){if(e.properties&&e.properties.popup){var r=e.properties.popup.options;e.properties.popup.presetId&&t.config.map.presets.popups[e.properties.popup.presetId]&&(r=Object.assign(t.config.map.presets.popups[e.properties.popup.presetId].options,r)),p.bindPopup(e.properties.popup.content,r),Object(o.default)(p,e.properties.popup.events,t)}}},gWOW:function(p,e,t){"use strict";t.r(e);var o=t("bHXD");e.default=function(p,e,t){if(e.properties&&e.properties.tooltip){var r=e.properties.tooltip.options||{};e.properties.tooltip.presetId&&t.config.map.presets.tooltips[e.properties.tooltip.presetId]&&(r=Object.assign(t.config.map.presets.tooltips[e.properties.tooltip.presetId].options,r)),p.bindTooltip(e.properties.tooltip.content,r),Object(o.default)(p,e.properties.tooltip.events,t)}}}}]);