(window.webpackJsonp=window.webpackJsonp||[]).push([["geojson-pointToLayer","geojson-bindPopupFromFeature","geojson-bindTooltipFromFeature"],{GZxy:function(e,p,t){"use strict";t.r(p);var o=t("wGjx");p.default=function(e,p,t){if(!p.properties||!p.properties.popup)return;let r=p.properties.popup.options;p.properties.popup.presetId&&t.config.map.presets.popups[p.properties.popup.presetId]&&(r=Object.assign(t.config.map.presets.popups[p.properties.popup.presetId].options,r)),e.bindPopup(p.properties.popup.content,r),Object(o.default)(e,p.properties.popup.events,t)}},nduN:function(e,p,t){"use strict";t.r(p);var o=t("wGjx"),r=t("GZxy"),s=t("vxwR");p.default=function(e,p,t){let i="marker",n=null,u={};return e.properties&&(e.properties.bounds=!0,u=e.properties.options||{},u.pane&&t.panes[u.pane]?u.pane=t.panes[u.pane].name:delete u.pane,e.properties.type&&(i=e.properties.type)),n=L[i](p,u),e.properties&&(Object(o.default)(n,e.properties.events,t),e.properties.radius&&n.setRadius(e.properties.radius),Object(r.default)(n,e,t),Object(s.default)(n,e,t)),n}},vxwR:function(e,p,t){"use strict";t.r(p);var o=t("wGjx");p.default=function(e,p,t){if(!p.properties||!p.properties.tooltip)return;let r=p.properties.tooltip.options||{};p.properties.tooltip.presetId&&t.config.map.presets.tooltips[p.properties.tooltip.presetId]&&(r=Object.assign(t.config.map.presets.tooltips[p.properties.tooltip.presetId].options,r)),e.bindTooltip(p.properties.tooltip.content,r),Object(o.default)(e,p.properties.tooltip.events,t)}}}]);