(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~layer-markerClusterGroupFactory"],{

/***/ "./node_modules/leaflet.markercluster.layersupport/dist/leaflet.markercluster.layersupport.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/leaflet.markercluster.layersupport/dist/leaflet.markercluster.layersupport.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 Leaflet.MarkerCluster.LayerSupport 2.0.1+649b3a9
 (c) 2015-2018 Boris Seang
 License MIT
 */
!function(e,r){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined}(this,function(e,r){e.MarkerClusterGroup.LayerSupport=e.MarkerClusterGroup.extend({options:{singleAddRemoveBufferDuration:0},initialize:function(r){e.MarkerClusterGroup.prototype.initialize.call(this,r),this._featureGroup=new o,this._featureGroup.addEventParent(this),this._nonPointGroup=new o,this._nonPointGroup.addEventParent(this),this._layers={},this._proxyLayerGroups={},this._proxyLayerGroupsNeedRemoving={},this._singleAddRemoveBuffer=[]},checkIn:function(e){var r=this._toArray(e);return this._checkInGetSeparated(r),this},checkOut:function(r){var o,t,i=this._toArray(r),a=this._separateSingleFromGroupLayers(i,{groups:[],singles:[]}),s=a.groups,n=a.singles;for(o=0;o<n.length;o++)t=n[o],delete this._layers[e.stamp(t)],delete t._mcgLayerSupportGroup;for(this._originalRemoveLayers(n),o=0;o<s.length;o++)t=s[o],this._dismissProxyLayerGroup(t);return this},addLayers:function(r){var o,t,i,a=this._toArray(r),s=this._checkInGetSeparated(a),n=s.groups;for(this._originalAddLayers(s.singles),o=0;o<n.length;o++)t=n[o],i=e.stamp(t),this._proxyLayerGroups[i]=t,delete this._proxyLayerGroupsNeedRemoving[i],this._map&&this._map._originalAddLayer(t)},addLayer:function(e){return this._bufferSingleAddRemove(e,"addLayers"),this},_originalAddLayer:e.MarkerClusterGroup.prototype.addLayer,_originalAddLayers:e.MarkerClusterGroup.prototype.addLayers,removeLayers:function(r){var o,t,i=this._toArray(r),a=this._separateSingleFromGroupLayers(i,{groups:[],singles:[]}),s=a.groups,n=a.singles,p=0;for(this._originalRemoveLayers(n);p<s.length;p++)o=s[p],t=e.stamp(o),delete this._proxyLayerGroups[t],this._map?this._map._originalRemoveLayer(o):this._proxyLayerGroupsNeedRemoving[t]=o;return this},removeLayer:function(e){return this._bufferSingleAddRemove(e,"removeLayers"),this},_originalRemoveLayer:e.MarkerClusterGroup.prototype.removeLayer,_originalRemoveLayers:e.MarkerClusterGroup.prototype.removeLayers,onAdd:function(r){r._originalAddLayer=r._originalAddLayer||r.addLayer,r._originalRemoveLayer=r._originalRemoveLayer||r.removeLayer,e.extend(r,i);var o,t,a,s=this._removePreAddedLayers(r);this._originalOnAdd.call(this,r);for(o in this._proxyLayerGroups)t=this._proxyLayerGroups[o],r._originalAddLayer(t);for(o in this._proxyLayerGroupsNeedRemoving)t=this._proxyLayerGroupsNeedRemoving[o],r._originalRemoveLayer(t),delete this._proxyLayerGroupsNeedRemoving[o];for(a=0;a<s.length;a++)r.addLayer(s[a])},_originalOnAdd:e.MarkerClusterGroup.prototype.onAdd,_bufferSingleAddRemove:function(r,o){var t,i=this.options.singleAddRemoveBufferDuration;i>0?(this._singleAddRemoveBuffer.push({type:o,layer:r}),this._singleAddRemoveBufferTimeout||(t=e.bind(this._processSingleAddRemoveBuffer,this),this._singleAddRemoveBufferTimeout=setTimeout(t,i))):this[o](r)},_processSingleAddRemoveBuffer:function(){for(var e,r,o=this._singleAddRemoveBuffer,t=0,i=[];t<o.length;t++)e=o[t],r||(r=e.type),e.type===r?i.push(e.layer):(this[r](i),r=e.type,i=[e.layer]);this[r](i),o.length=0,clearTimeout(this._singleAddRemoveBufferTimeout),this._singleAddRemoveBufferTimeout=null},_checkInGetSeparated:function(r){var o,t,i=this._separateSingleFromGroupLayers(r,{groups:[],singles:[]}),a=i.groups,s=i.singles;for(o=0;o<a.length;o++)t=a[o],this._recruitLayerGroupAsProxy(t);for(o=0;o<s.length;o++)t=s[o],this._removeFromOtherGroupsOrMap(t),this._layers[e.stamp(t)]=t,t._mcgLayerSupportGroup=this;return i},_separateSingleFromGroupLayers:function(r,o){for(var t,i=o.groups,a=o.singles,s=e.Util.isArray,n=0;n<r.length;n++)t=r[n],t instanceof e.LayerGroup?(i.push(t),this._separateSingleFromGroupLayers(t.getLayers(),o)):s(t)?this._separateSingleFromGroupLayers(t,o):a.push(t);return o},_recruitLayerGroupAsProxy:function(r){var o=r._proxyMcgLayerSupportGroup;if(o){if(o===this)return;o.checkOut(r)}else this._removeFromOwnMap(r);r._proxyMcgLayerSupportGroup=this,r._originalAddLayer=r._originalAddLayer||r.addLayer,r._originalRemoveLayer=r._originalRemoveLayer||r.removeLayer,r._originalOnAdd=r._originalOnAdd||r.onAdd,r._originalOnRemove=r._originalOnRemove||r.onRemove,e.extend(r,t)},_dismissProxyLayerGroup:function(o){if(o._proxyMcgLayerSupportGroup!==r&&o._proxyMcgLayerSupportGroup===this){delete o._proxyMcgLayerSupportGroup,o.addLayer=o._originalAddLayer,o.removeLayer=o._originalRemoveLayer,o.onAdd=o._originalOnAdd,o.onRemove=o._originalOnRemove;var t=e.stamp(o);delete this._proxyLayerGroups[t],delete this._proxyLayerGroupsNeedRemoving[t],this._removeFromOwnMap(o)}},_removeFromOtherGroupsOrMap:function(e){var r=e._mcgLayerSupportGroup;if(r){if(r===this)return;r.checkOut(e)}else e.__parent?e.__parent._group.removeLayer(e):this._removeFromOwnMap(e)},_removeFromOwnMap:function(e){e._map&&e._map.removeLayer(e)},_removePreAddedLayers:function(e){var r,o=this._layers,t=[];for(var i in o)r=o[i],r._map&&(t.push(r),e._originalRemoveLayer(r));return t},_toArray:function(r){return e.Util.isArray(r)?r:[r]}});var o=e.FeatureGroup.extend({addLayer:function(r){if(this.hasLayer(r))return this;r.addEventParent(this);var o=e.stamp(r);return this._layers[o]=r,this._map&&this._map._originalAddLayer(r),this.fire("layeradd",{layer:r})},removeLayer:function(r){if(!this.hasLayer(r))return this;r in this._layers&&(r=this._layers[r]),r.removeEventParent(this);var o=e.stamp(r);return this._map&&this._layers[o]&&this._map._originalRemoveLayer(this._layers[o]),delete this._layers[o],this.fire("layerremove",{layer:r})},onAdd:function(e){this._map=e,this.eachLayer(e._originalAddLayer,e)},onRemove:function(e){this.eachLayer(e._originalRemoveLayer,e),this._map=null}}),t={addLayer:function(e){var r=this.getLayerId(e);return this._layers[r]=e,this._map?this._proxyMcgLayerSupportGroup.addLayer(e):this._proxyMcgLayerSupportGroup.checkIn(e),this},removeLayer:function(e){var r=e in this._layers?e:this.getLayerId(e);return this._proxyMcgLayerSupportGroup.removeLayer(e),delete this._layers[r],this},onAdd:function(){this._proxyMcgLayerSupportGroup.addLayers(this.getLayers())},onRemove:function(){this._proxyMcgLayerSupportGroup.removeLayers(this.getLayers())}},i={addLayer:function(e){return e._mcgLayerSupportGroup?e._mcgLayerSupportGroup._originalAddLayer(e):this._originalAddLayer(e)},removeLayer:function(e){return e._mcgLayerSupportGroup?e._mcgLayerSupportGroup._originalRemoveLayer(e):this._originalRemoveLayer(e)}};e.markerClusterGroup.layerSupport=function(r){return new e.MarkerClusterGroup.LayerSupport(r)}});

/***/ }),

/***/ "./node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js":
/*!******************************************************************************!*\
  !*** ./node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Leaflet.markercluster 1.4.1+master.94f9815,
 * Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 * https://github.com/Leaflet/Leaflet.markercluster
 * (c) 2012-2017, Dave Leaver, smartrak
 */
(function (global, factory) {
	 true ? factory(exports) :
	undefined;
}(this, (function (exports) { 'use strict';

/*
 * L.MarkerClusterGroup extends L.FeatureGroup by clustering the markers contained within
 */

var MarkerClusterGroup = L.MarkerClusterGroup = L.FeatureGroup.extend({

	options: {
		maxClusterRadius: 80, //A cluster will cover at most this many pixels from its center
		iconCreateFunction: null,
		clusterPane: L.Marker.prototype.options.pane,

		spiderfyOnMaxZoom: true,
		showCoverageOnHover: true,
		zoomToBoundsOnClick: true,
		singleMarkerMode: false,

		disableClusteringAtZoom: null,

		// Setting this to false prevents the removal of any clusters outside of the viewpoint, which
		// is the default behaviour for performance reasons.
		removeOutsideVisibleBounds: true,

		// Set to false to disable all animations (zoom and spiderfy).
		// If false, option animateAddingMarkers below has no effect.
		// If L.DomUtil.TRANSITION is falsy, this option has no effect.
		animate: true,

		//Whether to animate adding markers after adding the MarkerClusterGroup to the map
		// If you are adding individual markers set to true, if adding bulk markers leave false for massive performance gains.
		animateAddingMarkers: false,

		//Increase to increase the distance away that spiderfied markers appear from the center
		spiderfyDistanceMultiplier: 1,

		// Make it possible to specify a polyline options on a spider leg
		spiderLegPolylineOptions: { weight: 1.5, color: '#222', opacity: 0.5 },

		// When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call, others will be loaded during setTimeouts
		chunkedLoading: false,
		chunkInterval: 200, // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
		chunkDelay: 50, // at the end of each interval, give n milliseconds back to system/browser
		chunkProgress: null, // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)

		//Options to pass to the L.Polygon constructor
		polygonOptions: {}
	},

	initialize: function (options) {
		L.Util.setOptions(this, options);
		if (!this.options.iconCreateFunction) {
			this.options.iconCreateFunction = this._defaultIconCreateFunction;
		}

		this._featureGroup = L.featureGroup();
		this._featureGroup.addEventParent(this);

		this._nonPointGroup = L.featureGroup();
		this._nonPointGroup.addEventParent(this);

		this._inZoomAnimation = 0;
		this._needsClustering = [];
		this._needsRemoving = []; //Markers removed while we aren't on the map need to be kept track of
		//The bounds of the currently shown area (from _getExpandedVisibleBounds) Updated on zoom/move
		this._currentShownBounds = null;

		this._queue = [];

		this._childMarkerEventHandlers = {
			'dragstart': this._childMarkerDragStart,
			'move': this._childMarkerMoved,
			'dragend': this._childMarkerDragEnd,
		};

		// Hook the appropriate animation methods.
		var animate = L.DomUtil.TRANSITION && this.options.animate;
		L.extend(this, animate ? this._withAnimation : this._noAnimation);
		// Remember which MarkerCluster class to instantiate (animated or not).
		this._markerCluster = animate ? L.MarkerCluster : L.MarkerClusterNonAnimated;
	},

	addLayer: function (layer) {

		if (layer instanceof L.LayerGroup) {
			return this.addLayers([layer]);
		}

		//Don't cluster non point data
		if (!layer.getLatLng) {
			this._nonPointGroup.addLayer(layer);
			this.fire('layeradd', { layer: layer });
			return this;
		}

		if (!this._map) {
			this._needsClustering.push(layer);
			this.fire('layeradd', { layer: layer });
			return this;
		}

		if (this.hasLayer(layer)) {
			return this;
		}


		//If we have already clustered we'll need to add this one to a cluster

		if (this._unspiderfy) {
			this._unspiderfy();
		}

		this._addLayer(layer, this._maxZoom);
		this.fire('layeradd', { layer: layer });

		// Refresh bounds and weighted positions.
		this._topClusterLevel._recalculateBounds();

		this._refreshClustersIcons();

		//Work out what is visible
		var visibleLayer = layer,
		    currentZoom = this._zoom;
		if (layer.__parent) {
			while (visibleLayer.__parent._zoom >= currentZoom) {
				visibleLayer = visibleLayer.__parent;
			}
		}

		if (this._currentShownBounds.contains(visibleLayer.getLatLng())) {
			if (this.options.animateAddingMarkers) {
				this._animationAddLayer(layer, visibleLayer);
			} else {
				this._animationAddLayerNonAnimated(layer, visibleLayer);
			}
		}
		return this;
	},

	removeLayer: function (layer) {

		if (layer instanceof L.LayerGroup) {
			return this.removeLayers([layer]);
		}

		//Non point layers
		if (!layer.getLatLng) {
			this._nonPointGroup.removeLayer(layer);
			this.fire('layerremove', { layer: layer });
			return this;
		}

		if (!this._map) {
			if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) {
				this._needsRemoving.push({ layer: layer, latlng: layer._latlng });
			}
			this.fire('layerremove', { layer: layer });
			return this;
		}

		if (!layer.__parent) {
			return this;
		}

		if (this._unspiderfy) {
			this._unspiderfy();
			this._unspiderfyLayer(layer);
		}

		//Remove the marker from clusters
		this._removeLayer(layer, true);
		this.fire('layerremove', { layer: layer });

		// Refresh bounds and weighted positions.
		this._topClusterLevel._recalculateBounds();

		this._refreshClustersIcons();

		layer.off(this._childMarkerEventHandlers, this);

		if (this._featureGroup.hasLayer(layer)) {
			this._featureGroup.removeLayer(layer);
			if (layer.clusterShow) {
				layer.clusterShow();
			}
		}

		return this;
	},

	//Takes an array of markers and adds them in bulk
	addLayers: function (layersArray, skipLayerAddEvent) {
		if (!L.Util.isArray(layersArray)) {
			return this.addLayer(layersArray);
		}

		var fg = this._featureGroup,
		    npg = this._nonPointGroup,
		    chunked = this.options.chunkedLoading,
		    chunkInterval = this.options.chunkInterval,
		    chunkProgress = this.options.chunkProgress,
		    l = layersArray.length,
		    offset = 0,
		    originalArray = true,
		    m;

		if (this._map) {
			var started = (new Date()).getTime();
			var process = L.bind(function () {
				var start = (new Date()).getTime();
				for (; offset < l; offset++) {
					if (chunked && offset % 200 === 0) {
						// every couple hundred markers, instrument the time elapsed since processing started:
						var elapsed = (new Date()).getTime() - start;
						if (elapsed > chunkInterval) {
							break; // been working too hard, time to take a break :-)
						}
					}

					m = layersArray[offset];

					// Group of layers, append children to layersArray and skip.
					// Side effects:
					// - Total increases, so chunkProgress ratio jumps backward.
					// - Groups are not included in this group, only their non-group child layers (hasLayer).
					// Changing array length while looping does not affect performance in current browsers:
					// http://jsperf.com/for-loop-changing-length/6
					if (m instanceof L.LayerGroup) {
						if (originalArray) {
							layersArray = layersArray.slice();
							originalArray = false;
						}
						this._extractNonGroupLayers(m, layersArray);
						l = layersArray.length;
						continue;
					}

					//Not point data, can't be clustered
					if (!m.getLatLng) {
						npg.addLayer(m);
						if (!skipLayerAddEvent) {
							this.fire('layeradd', { layer: m });
						}
						continue;
					}

					if (this.hasLayer(m)) {
						continue;
					}

					this._addLayer(m, this._maxZoom);
					if (!skipLayerAddEvent) {
						this.fire('layeradd', { layer: m });
					}

					//If we just made a cluster of size 2 then we need to remove the other marker from the map (if it is) or we never will
					if (m.__parent) {
						if (m.__parent.getChildCount() === 2) {
							var markers = m.__parent.getAllChildMarkers(),
							    otherMarker = markers[0] === m ? markers[1] : markers[0];
							fg.removeLayer(otherMarker);
						}
					}
				}

				if (chunkProgress) {
					// report progress and time elapsed:
					chunkProgress(offset, l, (new Date()).getTime() - started);
				}

				// Completed processing all markers.
				if (offset === l) {

					// Refresh bounds and weighted positions.
					this._topClusterLevel._recalculateBounds();

					this._refreshClustersIcons();

					this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
				} else {
					setTimeout(process, this.options.chunkDelay);
				}
			}, this);

			process();
		} else {
			var needsClustering = this._needsClustering;

			for (; offset < l; offset++) {
				m = layersArray[offset];

				// Group of layers, append children to layersArray and skip.
				if (m instanceof L.LayerGroup) {
					if (originalArray) {
						layersArray = layersArray.slice();
						originalArray = false;
					}
					this._extractNonGroupLayers(m, layersArray);
					l = layersArray.length;
					continue;
				}

				//Not point data, can't be clustered
				if (!m.getLatLng) {
					npg.addLayer(m);
					continue;
				}

				if (this.hasLayer(m)) {
					continue;
				}

				needsClustering.push(m);
			}
		}
		return this;
	},

	//Takes an array of markers and removes them in bulk
	removeLayers: function (layersArray) {
		var i, m,
		    l = layersArray.length,
		    fg = this._featureGroup,
		    npg = this._nonPointGroup,
		    originalArray = true;

		if (!this._map) {
			for (i = 0; i < l; i++) {
				m = layersArray[i];

				// Group of layers, append children to layersArray and skip.
				if (m instanceof L.LayerGroup) {
					if (originalArray) {
						layersArray = layersArray.slice();
						originalArray = false;
					}
					this._extractNonGroupLayers(m, layersArray);
					l = layersArray.length;
					continue;
				}

				this._arraySplice(this._needsClustering, m);
				npg.removeLayer(m);
				if (this.hasLayer(m)) {
					this._needsRemoving.push({ layer: m, latlng: m._latlng });
				}
				this.fire('layerremove', { layer: m });
			}
			return this;
		}

		if (this._unspiderfy) {
			this._unspiderfy();

			// Work on a copy of the array, so that next loop is not affected.
			var layersArray2 = layersArray.slice(),
			    l2 = l;
			for (i = 0; i < l2; i++) {
				m = layersArray2[i];

				// Group of layers, append children to layersArray and skip.
				if (m instanceof L.LayerGroup) {
					this._extractNonGroupLayers(m, layersArray2);
					l2 = layersArray2.length;
					continue;
				}

				this._unspiderfyLayer(m);
			}
		}

		for (i = 0; i < l; i++) {
			m = layersArray[i];

			// Group of layers, append children to layersArray and skip.
			if (m instanceof L.LayerGroup) {
				if (originalArray) {
					layersArray = layersArray.slice();
					originalArray = false;
				}
				this._extractNonGroupLayers(m, layersArray);
				l = layersArray.length;
				continue;
			}

			if (!m.__parent) {
				npg.removeLayer(m);
				this.fire('layerremove', { layer: m });
				continue;
			}

			this._removeLayer(m, true, true);
			this.fire('layerremove', { layer: m });

			if (fg.hasLayer(m)) {
				fg.removeLayer(m);
				if (m.clusterShow) {
					m.clusterShow();
				}
			}
		}

		// Refresh bounds and weighted positions.
		this._topClusterLevel._recalculateBounds();

		this._refreshClustersIcons();

		//Fix up the clusters and markers on the map
		this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);

		return this;
	},

	//Removes all layers from the MarkerClusterGroup
	clearLayers: function () {
		//Need our own special implementation as the LayerGroup one doesn't work for us

		//If we aren't on the map (yet), blow away the markers we know of
		if (!this._map) {
			this._needsClustering = [];
			this._needsRemoving = [];
			delete this._gridClusters;
			delete this._gridUnclustered;
		}

		if (this._noanimationUnspiderfy) {
			this._noanimationUnspiderfy();
		}

		//Remove all the visible layers
		this._featureGroup.clearLayers();
		this._nonPointGroup.clearLayers();

		this.eachLayer(function (marker) {
			marker.off(this._childMarkerEventHandlers, this);
			delete marker.__parent;
		}, this);

		if (this._map) {
			//Reset _topClusterLevel and the DistanceGrids
			this._generateInitialClusters();
		}

		return this;
	},

	//Override FeatureGroup.getBounds as it doesn't work
	getBounds: function () {
		var bounds = new L.LatLngBounds();

		if (this._topClusterLevel) {
			bounds.extend(this._topClusterLevel._bounds);
		}

		for (var i = this._needsClustering.length - 1; i >= 0; i--) {
			bounds.extend(this._needsClustering[i].getLatLng());
		}

		bounds.extend(this._nonPointGroup.getBounds());

		return bounds;
	},

	//Overrides LayerGroup.eachLayer
	eachLayer: function (method, context) {
		var markers = this._needsClustering.slice(),
			needsRemoving = this._needsRemoving,
			thisNeedsRemoving, i, j;

		if (this._topClusterLevel) {
			this._topClusterLevel.getAllChildMarkers(markers);
		}

		for (i = markers.length - 1; i >= 0; i--) {
			thisNeedsRemoving = true;

			for (j = needsRemoving.length - 1; j >= 0; j--) {
				if (needsRemoving[j].layer === markers[i]) {
					thisNeedsRemoving = false;
					break;
				}
			}

			if (thisNeedsRemoving) {
				method.call(context, markers[i]);
			}
		}

		this._nonPointGroup.eachLayer(method, context);
	},

	//Overrides LayerGroup.getLayers
	getLayers: function () {
		var layers = [];
		this.eachLayer(function (l) {
			layers.push(l);
		});
		return layers;
	},

	//Overrides LayerGroup.getLayer, WARNING: Really bad performance
	getLayer: function (id) {
		var result = null;

		id = parseInt(id, 10);

		this.eachLayer(function (l) {
			if (L.stamp(l) === id) {
				result = l;
			}
		});

		return result;
	},

	//Returns true if the given layer is in this MarkerClusterGroup
	hasLayer: function (layer) {
		if (!layer) {
			return false;
		}

		var i, anArray = this._needsClustering;

		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === layer) {
				return true;
			}
		}

		anArray = this._needsRemoving;
		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i].layer === layer) {
				return false;
			}
		}

		return !!(layer.__parent && layer.__parent._group === this) || this._nonPointGroup.hasLayer(layer);
	},

	//Zoom down to show the given layer (spiderfying if necessary) then calls the callback
	zoomToShowLayer: function (layer, callback) {

		if (typeof callback !== 'function') {
			callback = function () {};
		}

		var showMarker = function () {
			if ((layer._icon || layer.__parent._icon) && !this._inZoomAnimation) {
				this._map.off('moveend', showMarker, this);
				this.off('animationend', showMarker, this);

				if (layer._icon) {
					callback();
				} else if (layer.__parent._icon) {
					this.once('spiderfied', callback, this);
					layer.__parent.spiderfy();
				}
			}
		};

		if (layer._icon && this._map.getBounds().contains(layer.getLatLng())) {
			//Layer is visible ond on screen, immediate return
			callback();
		} else if (layer.__parent._zoom < Math.round(this._map._zoom)) {
			//Layer should be visible at this zoom level. It must not be on screen so just pan over to it
			this._map.on('moveend', showMarker, this);
			this._map.panTo(layer.getLatLng());
		} else {
			this._map.on('moveend', showMarker, this);
			this.on('animationend', showMarker, this);
			layer.__parent.zoomToBounds();
		}
	},

	//Overrides FeatureGroup.onAdd
	onAdd: function (map) {
		this._map = map;
		var i, l, layer;

		if (!isFinite(this._map.getMaxZoom())) {
			throw "Map has no maxZoom specified";
		}

		this._featureGroup.addTo(map);
		this._nonPointGroup.addTo(map);

		if (!this._gridClusters) {
			this._generateInitialClusters();
		}

		this._maxLat = map.options.crs.projection.MAX_LATITUDE;

		//Restore all the positions as they are in the MCG before removing them
		for (i = 0, l = this._needsRemoving.length; i < l; i++) {
			layer = this._needsRemoving[i];
			layer.newlatlng = layer.layer._latlng;
			layer.layer._latlng = layer.latlng;
		}
		//Remove them, then restore their new positions
		for (i = 0, l = this._needsRemoving.length; i < l; i++) {
			layer = this._needsRemoving[i];
			this._removeLayer(layer.layer, true);
			layer.layer._latlng = layer.newlatlng;
		}
		this._needsRemoving = [];

		//Remember the current zoom level and bounds
		this._zoom = Math.round(this._map._zoom);
		this._currentShownBounds = this._getExpandedVisibleBounds();

		this._map.on('zoomend', this._zoomEnd, this);
		this._map.on('moveend', this._moveEnd, this);

		if (this._spiderfierOnAdd) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
			this._spiderfierOnAdd();
		}

		this._bindEvents();

		//Actually add our markers to the map:
		l = this._needsClustering;
		this._needsClustering = [];
		this.addLayers(l, true);
	},

	//Overrides FeatureGroup.onRemove
	onRemove: function (map) {
		map.off('zoomend', this._zoomEnd, this);
		map.off('moveend', this._moveEnd, this);

		this._unbindEvents();

		//In case we are in a cluster animation
		this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');

		if (this._spiderfierOnRemove) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
			this._spiderfierOnRemove();
		}

		delete this._maxLat;

		//Clean up all the layers we added to the map
		this._hideCoverage();
		this._featureGroup.remove();
		this._nonPointGroup.remove();

		this._featureGroup.clearLayers();

		this._map = null;
	},

	getVisibleParent: function (marker) {
		var vMarker = marker;
		while (vMarker && !vMarker._icon) {
			vMarker = vMarker.__parent;
		}
		return vMarker || null;
	},

	//Remove the given object from the given array
	_arraySplice: function (anArray, obj) {
		for (var i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === obj) {
				anArray.splice(i, 1);
				return true;
			}
		}
	},

	/**
	 * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
	 * @param marker to be removed from _gridUnclustered.
	 * @param z integer bottom start zoom level (included)
	 * @private
	 */
	_removeFromGridUnclustered: function (marker, z) {
		var map = this._map,
		    gridUnclustered = this._gridUnclustered,
			minZoom = Math.floor(this._map.getMinZoom());

		for (; z >= minZoom; z--) {
			if (!gridUnclustered[z].removeObject(marker, map.project(marker.getLatLng(), z))) {
				break;
			}
		}
	},

	_childMarkerDragStart: function (e) {
		e.target.__dragStart = e.target._latlng;
	},

	_childMarkerMoved: function (e) {
		if (!this._ignoreMove && !e.target.__dragStart) {
			var isPopupOpen = e.target._popup && e.target._popup.isOpen();

			this._moveChild(e.target, e.oldLatLng, e.latlng);

			if (isPopupOpen) {
				e.target.openPopup();
			}
		}
	},

	_moveChild: function (layer, from, to) {
		layer._latlng = from;
		this.removeLayer(layer);

		layer._latlng = to;
		this.addLayer(layer);
	},

	_childMarkerDragEnd: function (e) {
		var dragStart = e.target.__dragStart;
		delete e.target.__dragStart;
		if (dragStart) {
			this._moveChild(e.target, dragStart, e.target._latlng);
		}		
	},


	//Internal function for removing a marker from everything.
	//dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
	_removeLayer: function (marker, removeFromDistanceGrid, dontUpdateMap) {
		var gridClusters = this._gridClusters,
			gridUnclustered = this._gridUnclustered,
			fg = this._featureGroup,
			map = this._map,
			minZoom = Math.floor(this._map.getMinZoom());

		//Remove the marker from distance clusters it might be in
		if (removeFromDistanceGrid) {
			this._removeFromGridUnclustered(marker, this._maxZoom);
		}

		//Work our way up the clusters removing them as we go if required
		var cluster = marker.__parent,
			markers = cluster._markers,
			otherMarker;

		//Remove the marker from the immediate parents marker list
		this._arraySplice(markers, marker);

		while (cluster) {
			cluster._childCount--;
			cluster._boundsNeedUpdate = true;

			if (cluster._zoom < minZoom) {
				//Top level, do nothing
				break;
			} else if (removeFromDistanceGrid && cluster._childCount <= 1) { //Cluster no longer required
				//We need to push the other marker up to the parent
				otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0];

				//Update distance grid
				gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cLatLng, cluster._zoom));
				gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getLatLng(), cluster._zoom));

				//Move otherMarker up to parent
				this._arraySplice(cluster.__parent._childClusters, cluster);
				cluster.__parent._markers.push(otherMarker);
				otherMarker.__parent = cluster.__parent;

				if (cluster._icon) {
					//Cluster is currently on the map, need to put the marker on the map instead
					fg.removeLayer(cluster);
					if (!dontUpdateMap) {
						fg.addLayer(otherMarker);
					}
				}
			} else {
				cluster._iconNeedsUpdate = true;
			}

			cluster = cluster.__parent;
		}

		delete marker.__parent;
	},

	_isOrIsParent: function (el, oel) {
		while (oel) {
			if (el === oel) {
				return true;
			}
			oel = oel.parentNode;
		}
		return false;
	},

	//Override L.Evented.fire
	fire: function (type, data, propagate) {
		if (data && data.layer instanceof L.MarkerCluster) {
			//Prevent multiple clustermouseover/off events if the icon is made up of stacked divs (Doesn't work in ie <= 8, no relatedTarget)
			if (data.originalEvent && this._isOrIsParent(data.layer._icon, data.originalEvent.relatedTarget)) {
				return;
			}
			type = 'cluster' + type;
		}

		L.FeatureGroup.prototype.fire.call(this, type, data, propagate);
	},

	//Override L.Evented.listens
	listens: function (type, propagate) {
		return L.FeatureGroup.prototype.listens.call(this, type, propagate) || L.FeatureGroup.prototype.listens.call(this, 'cluster' + type, propagate);
	},

	//Default functionality
	_defaultIconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();

		var c = ' marker-cluster-';
		if (childCount < 10) {
			c += 'small';
		} else if (childCount < 100) {
			c += 'medium';
		} else {
			c += 'large';
		}

		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
	},

	_bindEvents: function () {
		var map = this._map,
		    spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
		    showCoverageOnHover = this.options.showCoverageOnHover,
		    zoomToBoundsOnClick = this.options.zoomToBoundsOnClick;

		//Zoom on cluster click or spiderfy if we are at the lowest level
		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.on('clusterclick', this._zoomOrSpiderfy, this);
		}

		//Show convex hull (boundary) polygon on mouse over
		if (showCoverageOnHover) {
			this.on('clustermouseover', this._showCoverage, this);
			this.on('clustermouseout', this._hideCoverage, this);
			map.on('zoomend', this._hideCoverage, this);
		}
	},

	_zoomOrSpiderfy: function (e) {
		var cluster = e.layer,
		    bottomCluster = cluster;

		while (bottomCluster._childClusters.length === 1) {
			bottomCluster = bottomCluster._childClusters[0];
		}

		if (bottomCluster._zoom === this._maxZoom &&
			bottomCluster._childCount === cluster._childCount &&
			this.options.spiderfyOnMaxZoom) {

			// All child markers are contained in a single cluster from this._maxZoom to this cluster.
			cluster.spiderfy();
		} else if (this.options.zoomToBoundsOnClick) {
			cluster.zoomToBounds();
		}

		// Focus the map again for keyboard users.
		if (e.originalEvent && e.originalEvent.keyCode === 13) {
			this._map._container.focus();
		}
	},

	_showCoverage: function (e) {
		var map = this._map;
		if (this._inZoomAnimation) {
			return;
		}
		if (this._shownPolygon) {
			map.removeLayer(this._shownPolygon);
		}
		if (e.layer.getChildCount() > 2 && e.layer !== this._spiderfied) {
			this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions);
			map.addLayer(this._shownPolygon);
		}
	},

	_hideCoverage: function () {
		if (this._shownPolygon) {
			this._map.removeLayer(this._shownPolygon);
			this._shownPolygon = null;
		}
	},

	_unbindEvents: function () {
		var spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
			showCoverageOnHover = this.options.showCoverageOnHover,
			zoomToBoundsOnClick = this.options.zoomToBoundsOnClick,
			map = this._map;

		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.off('clusterclick', this._zoomOrSpiderfy, this);
		}
		if (showCoverageOnHover) {
			this.off('clustermouseover', this._showCoverage, this);
			this.off('clustermouseout', this._hideCoverage, this);
			map.off('zoomend', this._hideCoverage, this);
		}
	},

	_zoomEnd: function () {
		if (!this._map) { //May have been removed from the map by a zoomEnd handler
			return;
		}
		this._mergeSplitClusters();

		this._zoom = Math.round(this._map._zoom);
		this._currentShownBounds = this._getExpandedVisibleBounds();
	},

	_moveEnd: function () {
		if (this._inZoomAnimation) {
			return;
		}

		var newBounds = this._getExpandedVisibleBounds();

		this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, newBounds);
		this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), newBounds);

		this._currentShownBounds = newBounds;
		return;
	},

	_generateInitialClusters: function () {
		var maxZoom = Math.ceil(this._map.getMaxZoom()),
			minZoom = Math.floor(this._map.getMinZoom()),
			radius = this.options.maxClusterRadius,
			radiusFn = radius;

		//If we just set maxClusterRadius to a single number, we need to create
		//a simple function to return that number. Otherwise, we just have to
		//use the function we've passed in.
		if (typeof radius !== "function") {
			radiusFn = function () { return radius; };
		}

		if (this.options.disableClusteringAtZoom !== null) {
			maxZoom = this.options.disableClusteringAtZoom - 1;
		}
		this._maxZoom = maxZoom;
		this._gridClusters = {};
		this._gridUnclustered = {};

		//Set up DistanceGrids for each zoom
		for (var zoom = maxZoom; zoom >= minZoom; zoom--) {
			this._gridClusters[zoom] = new L.DistanceGrid(radiusFn(zoom));
			this._gridUnclustered[zoom] = new L.DistanceGrid(radiusFn(zoom));
		}

		// Instantiate the appropriate L.MarkerCluster class (animated or not).
		this._topClusterLevel = new this._markerCluster(this, minZoom - 1);
	},

	//Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
	_addLayer: function (layer, zoom) {
		var gridClusters = this._gridClusters,
		    gridUnclustered = this._gridUnclustered,
			minZoom = Math.floor(this._map.getMinZoom()),
		    markerPoint, z;

		if (this.options.singleMarkerMode) {
			this._overrideMarkerIcon(layer);
		}

		layer.on(this._childMarkerEventHandlers, this);

		//Find the lowest zoom level to slot this one in
		for (; zoom >= minZoom; zoom--) {
			markerPoint = this._map.project(layer.getLatLng(), zoom); // calculate pixel position

			//Try find a cluster close by
			var closest = gridClusters[zoom].getNearObject(markerPoint);
			if (closest) {
				closest._addChild(layer);
				layer.__parent = closest;
				return;
			}

			//Try find a marker close by to form a new cluster with
			closest = gridUnclustered[zoom].getNearObject(markerPoint);
			if (closest) {
				var parent = closest.__parent;
				if (parent) {
					this._removeLayer(closest, false);
				}

				//Create new cluster with these 2 in it

				var newCluster = new this._markerCluster(this, zoom, closest, layer);
				gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cLatLng, zoom));
				closest.__parent = newCluster;
				layer.__parent = newCluster;

				//First create any new intermediate parent clusters that don't exist
				var lastParent = newCluster;
				for (z = zoom - 1; z > parent._zoom; z--) {
					lastParent = new this._markerCluster(this, z, lastParent);
					gridClusters[z].addObject(lastParent, this._map.project(closest.getLatLng(), z));
				}
				parent._addChild(lastParent);

				//Remove closest from this zoom level and any above that it is in, replace with newCluster
				this._removeFromGridUnclustered(closest, zoom);

				return;
			}

			//Didn't manage to cluster in at this zoom, record us as a marker here and continue upwards
			gridUnclustered[zoom].addObject(layer, markerPoint);
		}

		//Didn't get in anything, add us to the top
		this._topClusterLevel._addChild(layer);
		layer.__parent = this._topClusterLevel;
		return;
	},

	/**
	 * Refreshes the icon of all "dirty" visible clusters.
	 * Non-visible "dirty" clusters will be updated when they are added to the map.
	 * @private
	 */
	_refreshClustersIcons: function () {
		this._featureGroup.eachLayer(function (c) {
			if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
				c._updateIcon();
			}
		});
	},

	//Enqueue code to fire after the marker expand/contract has happened
	_enqueue: function (fn) {
		this._queue.push(fn);
		if (!this._queueTimeout) {
			this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300);
		}
	},
	_processQueue: function () {
		for (var i = 0; i < this._queue.length; i++) {
			this._queue[i].call(this);
		}
		this._queue.length = 0;
		clearTimeout(this._queueTimeout);
		this._queueTimeout = null;
	},

	//Merge and split any existing clusters that are too big or small
	_mergeSplitClusters: function () {
		var mapZoom = Math.round(this._map._zoom);

		//In case we are starting to split before the animation finished
		this._processQueue();

		if (this._zoom < mapZoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) { //Zoom in, split
			this._animationStart();
			//Remove clusters now off screen
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds());

			this._animationZoomIn(this._zoom, mapZoom);

		} else if (this._zoom > mapZoom) { //Zoom out, merge
			this._animationStart();

			this._animationZoomOut(this._zoom, mapZoom);
		} else {
			this._moveEnd();
		}
	},

	//Gets the maps visible bounds expanded in each direction by the size of the screen (so the user cannot see an area we do not cover in one pan)
	_getExpandedVisibleBounds: function () {
		if (!this.options.removeOutsideVisibleBounds) {
			return this._mapBoundsInfinite;
		} else if (L.Browser.mobile) {
			return this._checkBoundsMaxLat(this._map.getBounds());
		}

		return this._checkBoundsMaxLat(this._map.getBounds().pad(1)); // Padding expands the bounds by its own dimensions but scaled with the given factor.
	},

	/**
	 * Expands the latitude to Infinity (or -Infinity) if the input bounds reach the map projection maximum defined latitude
	 * (in the case of Web/Spherical Mercator, it is 85.0511287798 / see https://en.wikipedia.org/wiki/Web_Mercator#Formulas).
	 * Otherwise, the removeOutsideVisibleBounds option will remove markers beyond that limit, whereas the same markers without
	 * this option (or outside MCG) will have their position floored (ceiled) by the projection and rendered at that limit,
	 * making the user think that MCG "eats" them and never displays them again.
	 * @param bounds L.LatLngBounds
	 * @returns {L.LatLngBounds}
	 * @private
	 */
	_checkBoundsMaxLat: function (bounds) {
		var maxLat = this._maxLat;

		if (maxLat !== undefined) {
			if (bounds.getNorth() >= maxLat) {
				bounds._northEast.lat = Infinity;
			}
			if (bounds.getSouth() <= -maxLat) {
				bounds._southWest.lat = -Infinity;
			}
		}

		return bounds;
	},

	//Shared animation code
	_animationAddLayerNonAnimated: function (layer, newCluster) {
		if (newCluster === layer) {
			this._featureGroup.addLayer(layer);
		} else if (newCluster._childCount === 2) {
			newCluster._addToMap();

			var markers = newCluster.getAllChildMarkers();
			this._featureGroup.removeLayer(markers[0]);
			this._featureGroup.removeLayer(markers[1]);
		} else {
			newCluster._updateIcon();
		}
	},

	/**
	 * Extracts individual (i.e. non-group) layers from a Layer Group.
	 * @param group to extract layers from.
	 * @param output {Array} in which to store the extracted layers.
	 * @returns {*|Array}
	 * @private
	 */
	_extractNonGroupLayers: function (group, output) {
		var layers = group.getLayers(),
		    i = 0,
		    layer;

		output = output || [];

		for (; i < layers.length; i++) {
			layer = layers[i];

			if (layer instanceof L.LayerGroup) {
				this._extractNonGroupLayers(layer, output);
				continue;
			}

			output.push(layer);
		}

		return output;
	},

	/**
	 * Implements the singleMarkerMode option.
	 * @param layer Marker to re-style using the Clusters iconCreateFunction.
	 * @returns {L.Icon} The newly created icon.
	 * @private
	 */
	_overrideMarkerIcon: function (layer) {
		var icon = layer.options.icon = this.options.iconCreateFunction({
			getChildCount: function () {
				return 1;
			},
			getAllChildMarkers: function () {
				return [layer];
			}
		});

		return icon;
	}
});

// Constant bounds used in case option "removeOutsideVisibleBounds" is set to false.
L.MarkerClusterGroup.include({
	_mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity))
});

L.MarkerClusterGroup.include({
	_noAnimation: {
		//Non Animated versions of everything
		_animationStart: function () {
			//Do nothing...
		},
		_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

			//We didn't actually animate, but we use this event to mean "clustering animations have finished"
			this.fire('animationend');
		},
		_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

			//We didn't actually animate, but we use this event to mean "clustering animations have finished"
			this.fire('animationend');
		},
		_animationAddLayer: function (layer, newCluster) {
			this._animationAddLayerNonAnimated(layer, newCluster);
		}
	},

	_withAnimation: {
		//Animated versions here
		_animationStart: function () {
			this._map._mapPane.className += ' leaflet-cluster-anim';
			this._inZoomAnimation++;
		},

		_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
			var bounds = this._getExpandedVisibleBounds(),
			    fg = this._featureGroup,
				minZoom = Math.floor(this._map.getMinZoom()),
			    i;

			this._ignoreMove = true;

			//Add all children of current clusters to map and remove those clusters from map
			this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function (c) {
				var startPos = c._latlng,
				    markers  = c._markers,
				    m;

				if (!bounds.contains(startPos)) {
					startPos = null;
				}

				if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) { //Immediately add the new child and remove us
					fg.removeLayer(c);
					c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds);
				} else {
					//Fade out old cluster
					c.clusterHide();
					c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds);
				}

				//Remove all markers that aren't visible any more
				//TODO: Do we actually need to do this on the higher levels too?
				for (i = markers.length - 1; i >= 0; i--) {
					m = markers[i];
					if (!bounds.contains(m._latlng)) {
						fg.removeLayer(m);
					}
				}

			});

			this._forceLayout();

			//Update opacities
			this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel);
			//TODO Maybe? Update markers in _recursivelyBecomeVisible
			fg.eachLayer(function (n) {
				if (!(n instanceof L.MarkerCluster) && n._icon) {
					n.clusterShow();
				}
			});

			//update the positions of the just added clusters/markers
			this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function (c) {
				c._recursivelyRestoreChildPositions(newZoomLevel);
			});

			this._ignoreMove = false;

			//Remove the old clusters and close the zoom animation
			this._enqueue(function () {
				//update the positions of the just added clusters/markers
				this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function (c) {
					fg.removeLayer(c);
					c.clusterShow();
				});

				this._animationEnd();
			});
		},

		_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
			this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel);

			//Need to add markers for those that weren't on the map before but are now
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
			//Remove markers that were on the map before but won't be now
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel, this._getExpandedVisibleBounds());
		},

		_animationAddLayer: function (layer, newCluster) {
			var me = this,
			    fg = this._featureGroup;

			fg.addLayer(layer);
			if (newCluster !== layer) {
				if (newCluster._childCount > 2) { //Was already a cluster

					newCluster._updateIcon();
					this._forceLayout();
					this._animationStart();

					layer._setPos(this._map.latLngToLayerPoint(newCluster.getLatLng()));
					layer.clusterHide();

					this._enqueue(function () {
						fg.removeLayer(layer);
						layer.clusterShow();

						me._animationEnd();
					});

				} else { //Just became a cluster
					this._forceLayout();

					me._animationStart();
					me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._zoom);
				}
			}
		}
	},

	// Private methods for animated versions.
	_animationZoomOutSingle: function (cluster, previousZoomLevel, newZoomLevel) {
		var bounds = this._getExpandedVisibleBounds(),
			minZoom = Math.floor(this._map.getMinZoom());

		//Animate all of the markers in the clusters to move to their cluster center point
		cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, minZoom, previousZoomLevel + 1, newZoomLevel);

		var me = this;

		//Update the opacity (If we immediately set it they won't animate)
		this._forceLayout();
		cluster._recursivelyBecomeVisible(bounds, newZoomLevel);

		//TODO: Maybe use the transition timing stuff to make this more reliable
		//When the animations are done, tidy up
		this._enqueue(function () {

			//This cluster stopped being a cluster before the timeout fired
			if (cluster._childCount === 1) {
				var m = cluster._markers[0];
				//If we were in a cluster animation at the time then the opacity and position of our child could be wrong now, so fix it
				this._ignoreMove = true;
				m.setLatLng(m.getLatLng());
				this._ignoreMove = false;
				if (m.clusterShow) {
					m.clusterShow();
				}
			} else {
				cluster._recursively(bounds, newZoomLevel, minZoom, function (c) {
					c._recursivelyRemoveChildrenFromMap(bounds, minZoom, previousZoomLevel + 1);
				});
			}
			me._animationEnd();
		});
	},

	_animationEnd: function () {
		if (this._map) {
			this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');
		}
		this._inZoomAnimation--;
		this.fire('animationend');
	},

	//Force a browser layout of stuff in the map
	// Should apply the current opacity and location to all elements so we can update them again for an animation
	_forceLayout: function () {
		//In my testing this works, infact offsetWidth of any element seems to work.
		//Could loop all this._layers and do this for each _icon if it stops working

		L.Util.falseFn(document.body.offsetWidth);
	}
});

L.markerClusterGroup = function (options) {
	return new L.MarkerClusterGroup(options);
};

var MarkerCluster = L.MarkerCluster = L.Marker.extend({
	options: L.Icon.prototype.options,

	initialize: function (group, zoom, a, b) {

		L.Marker.prototype.initialize.call(this, a ? (a._cLatLng || a.getLatLng()) : new L.LatLng(0, 0),
            { icon: this, pane: group.options.clusterPane });

		this._group = group;
		this._zoom = zoom;

		this._markers = [];
		this._childClusters = [];
		this._childCount = 0;
		this._iconNeedsUpdate = true;
		this._boundsNeedUpdate = true;

		this._bounds = new L.LatLngBounds();

		if (a) {
			this._addChild(a);
		}
		if (b) {
			this._addChild(b);
		}
	},

	//Recursively retrieve all child markers of this cluster
	getAllChildMarkers: function (storageArray, ignoreDraggedMarker) {
		storageArray = storageArray || [];

		for (var i = this._childClusters.length - 1; i >= 0; i--) {
			this._childClusters[i].getAllChildMarkers(storageArray);
		}

		for (var j = this._markers.length - 1; j >= 0; j--) {
			if (ignoreDraggedMarker && this._markers[j].__dragStart) {
				continue;
			}
			storageArray.push(this._markers[j]);
		}

		return storageArray;
	},

	//Returns the count of how many child markers we have
	getChildCount: function () {
		return this._childCount;
	},

	//Zoom to the minimum of showing all of the child markers, or the extents of this cluster
	zoomToBounds: function (fitBoundsOptions) {
		var childClusters = this._childClusters.slice(),
			map = this._group._map,
			boundsZoom = map.getBoundsZoom(this._bounds),
			zoom = this._zoom + 1,
			mapZoom = map.getZoom(),
			i;

		//calculate how far we need to zoom down to see all of the markers
		while (childClusters.length > 0 && boundsZoom > zoom) {
			zoom++;
			var newClusters = [];
			for (i = 0; i < childClusters.length; i++) {
				newClusters = newClusters.concat(childClusters[i]._childClusters);
			}
			childClusters = newClusters;
		}

		if (boundsZoom > zoom) {
			this._group._map.setView(this._latlng, zoom);
		} else if (boundsZoom <= mapZoom) { //If fitBounds wouldn't zoom us down, zoom us down instead
			this._group._map.setView(this._latlng, mapZoom + 1);
		} else {
			this._group._map.fitBounds(this._bounds, fitBoundsOptions);
		}
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds();
		bounds.extend(this._bounds);
		return bounds;
	},

	_updateIcon: function () {
		this._iconNeedsUpdate = true;
		if (this._icon) {
			this.setIcon(this);
		}
	},

	//Cludge for Icon, we pretend to be an icon for performance
	createIcon: function () {
		if (this._iconNeedsUpdate) {
			this._iconObj = this._group.options.iconCreateFunction(this);
			this._iconNeedsUpdate = false;
		}
		return this._iconObj.createIcon();
	},
	createShadow: function () {
		return this._iconObj.createShadow();
	},


	_addChild: function (new1, isNotificationFromChild) {

		this._iconNeedsUpdate = true;

		this._boundsNeedUpdate = true;
		this._setClusterCenter(new1);

		if (new1 instanceof L.MarkerCluster) {
			if (!isNotificationFromChild) {
				this._childClusters.push(new1);
				new1.__parent = this;
			}
			this._childCount += new1._childCount;
		} else {
			if (!isNotificationFromChild) {
				this._markers.push(new1);
			}
			this._childCount++;
		}

		if (this.__parent) {
			this.__parent._addChild(new1, true);
		}
	},

	/**
	 * Makes sure the cluster center is set. If not, uses the child center if it is a cluster, or the marker position.
	 * @param child L.MarkerCluster|L.Marker that will be used as cluster center if not defined yet.
	 * @private
	 */
	_setClusterCenter: function (child) {
		if (!this._cLatLng) {
			// when clustering, take position of the first point as the cluster center
			this._cLatLng = child._cLatLng || child._latlng;
		}
	},

	/**
	 * Assigns impossible bounding values so that the next extend entirely determines the new bounds.
	 * This method avoids having to trash the previous L.LatLngBounds object and to create a new one, which is much slower for this class.
	 * As long as the bounds are not extended, most other methods would probably fail, as they would with bounds initialized but not extended.
	 * @private
	 */
	_resetBounds: function () {
		var bounds = this._bounds;

		if (bounds._southWest) {
			bounds._southWest.lat = Infinity;
			bounds._southWest.lng = Infinity;
		}
		if (bounds._northEast) {
			bounds._northEast.lat = -Infinity;
			bounds._northEast.lng = -Infinity;
		}
	},

	_recalculateBounds: function () {
		var markers = this._markers,
		    childClusters = this._childClusters,
		    latSum = 0,
		    lngSum = 0,
		    totalCount = this._childCount,
		    i, child, childLatLng, childCount;

		// Case where all markers are removed from the map and we are left with just an empty _topClusterLevel.
		if (totalCount === 0) {
			return;
		}

		// Reset rather than creating a new object, for performance.
		this._resetBounds();

		// Child markers.
		for (i = 0; i < markers.length; i++) {
			childLatLng = markers[i]._latlng;

			this._bounds.extend(childLatLng);

			latSum += childLatLng.lat;
			lngSum += childLatLng.lng;
		}

		// Child clusters.
		for (i = 0; i < childClusters.length; i++) {
			child = childClusters[i];

			// Re-compute child bounds and weighted position first if necessary.
			if (child._boundsNeedUpdate) {
				child._recalculateBounds();
			}

			this._bounds.extend(child._bounds);

			childLatLng = child._wLatLng;
			childCount = child._childCount;

			latSum += childLatLng.lat * childCount;
			lngSum += childLatLng.lng * childCount;
		}

		this._latlng = this._wLatLng = new L.LatLng(latSum / totalCount, lngSum / totalCount);

		// Reset dirty flag.
		this._boundsNeedUpdate = false;
	},

	//Set our markers position as given and add it to the map
	_addToMap: function (startPos) {
		if (startPos) {
			this._backupLatlng = this._latlng;
			this.setLatLng(startPos);
		}
		this._group._featureGroup.addLayer(this);
	},

	_recursivelyAnimateChildrenIn: function (bounds, center, maxZoom) {
		this._recursively(bounds, this._group._map.getMinZoom(), maxZoom - 1,
			function (c) {
				var markers = c._markers,
					i, m;
				for (i = markers.length - 1; i >= 0; i--) {
					m = markers[i];

					//Only do it if the icon is still on the map
					if (m._icon) {
						m._setPos(center);
						m.clusterHide();
					}
				}
			},
			function (c) {
				var childClusters = c._childClusters,
					j, cm;
				for (j = childClusters.length - 1; j >= 0; j--) {
					cm = childClusters[j];
					if (cm._icon) {
						cm._setPos(center);
						cm.clusterHide();
					}
				}
			}
		);
	},

	_recursivelyAnimateChildrenInAndAddSelfToMap: function (bounds, mapMinZoom, previousZoomLevel, newZoomLevel) {
		this._recursively(bounds, newZoomLevel, mapMinZoom,
			function (c) {
				c._recursivelyAnimateChildrenIn(bounds, c._group._map.latLngToLayerPoint(c.getLatLng()).round(), previousZoomLevel);

				//TODO: depthToAnimateIn affects _isSingleParent, if there is a multizoom we may/may not be.
				//As a hack we only do a animation free zoom on a single level zoom, if someone does multiple levels then we always animate
				if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
					c.clusterShow();
					c._recursivelyRemoveChildrenFromMap(bounds, mapMinZoom, previousZoomLevel); //Immediately remove our children as we are replacing them. TODO previousBounds not bounds
				} else {
					c.clusterHide();
				}

				c._addToMap();
			}
		);
	},

	_recursivelyBecomeVisible: function (bounds, zoomLevel) {
		this._recursively(bounds, this._group._map.getMinZoom(), zoomLevel, null, function (c) {
			c.clusterShow();
		});
	},

	_recursivelyAddChildrenToMap: function (startPos, zoomLevel, bounds) {
		this._recursively(bounds, this._group._map.getMinZoom() - 1, zoomLevel,
			function (c) {
				if (zoomLevel === c._zoom) {
					return;
				}

				//Add our child markers at startPos (so they can be animated out)
				for (var i = c._markers.length - 1; i >= 0; i--) {
					var nm = c._markers[i];

					if (!bounds.contains(nm._latlng)) {
						continue;
					}

					if (startPos) {
						nm._backupLatlng = nm.getLatLng();

						nm.setLatLng(startPos);
						if (nm.clusterHide) {
							nm.clusterHide();
						}
					}

					c._group._featureGroup.addLayer(nm);
				}
			},
			function (c) {
				c._addToMap(startPos);
			}
		);
	},

	_recursivelyRestoreChildPositions: function (zoomLevel) {
		//Fix positions of child markers
		for (var i = this._markers.length - 1; i >= 0; i--) {
			var nm = this._markers[i];
			if (nm._backupLatlng) {
				nm.setLatLng(nm._backupLatlng);
				delete nm._backupLatlng;
			}
		}

		if (zoomLevel - 1 === this._zoom) {
			//Reposition child clusters
			for (var j = this._childClusters.length - 1; j >= 0; j--) {
				this._childClusters[j]._restorePosition();
			}
		} else {
			for (var k = this._childClusters.length - 1; k >= 0; k--) {
				this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel);
			}
		}
	},

	_restorePosition: function () {
		if (this._backupLatlng) {
			this.setLatLng(this._backupLatlng);
			delete this._backupLatlng;
		}
	},

	//exceptBounds: If set, don't remove any markers/clusters in it
	_recursivelyRemoveChildrenFromMap: function (previousBounds, mapMinZoom, zoomLevel, exceptBounds) {
		var m, i;
		this._recursively(previousBounds, mapMinZoom - 1, zoomLevel - 1,
			function (c) {
				//Remove markers at every level
				for (i = c._markers.length - 1; i >= 0; i--) {
					m = c._markers[i];
					if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
						c._group._featureGroup.removeLayer(m);
						if (m.clusterShow) {
							m.clusterShow();
						}
					}
				}
			},
			function (c) {
				//Remove child clusters at just the bottom level
				for (i = c._childClusters.length - 1; i >= 0; i--) {
					m = c._childClusters[i];
					if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
						c._group._featureGroup.removeLayer(m);
						if (m.clusterShow) {
							m.clusterShow();
						}
					}
				}
			}
		);
	},

	//Run the given functions recursively to this and child clusters
	// boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
	// zoomLevelToStart: zoom level to start running functions (inclusive)
	// zoomLevelToStop: zoom level to stop running functions (inclusive)
	// runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
	// runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
	_recursively: function (boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
		var childClusters = this._childClusters,
		    zoom = this._zoom,
		    i, c;

		if (zoomLevelToStart <= zoom) {
			if (runAtEveryLevel) {
				runAtEveryLevel(this);
			}
			if (runAtBottomLevel && zoom === zoomLevelToStop) {
				runAtBottomLevel(this);
			}
		}

		if (zoom < zoomLevelToStart || zoom < zoomLevelToStop) {
			for (i = childClusters.length - 1; i >= 0; i--) {
				c = childClusters[i];
				if (c._boundsNeedUpdate) {
					c._recalculateBounds();
				}
				if (boundsToApplyTo.intersects(c._bounds)) {
					c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
				}
			}
		}
	},

	//Returns true if we are the parent of only one cluster and that cluster is the same as us
	_isSingleParent: function () {
		//Don't need to check this._markers as the rest won't work if there are any
		return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
	}
});

/*
* Extends L.Marker to include two extra methods: clusterHide and clusterShow.
* 
* They work as setOpacity(0) and setOpacity(1) respectively, but
* don't overwrite the options.opacity
* 
*/

L.Marker.include({
	clusterHide: function () {
		var backup = this.options.opacity;
		this.setOpacity(0);
		this.options.opacity = backup;
		return this;
	},
	
	clusterShow: function () {
		return this.setOpacity(this.options.opacity);
	}
});

L.DistanceGrid = function (cellSize) {
	this._cellSize = cellSize;
	this._sqCellSize = cellSize * cellSize;
	this._grid = {};
	this._objectPoint = { };
};

L.DistanceGrid.prototype = {

	addObject: function (obj, point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    grid = this._grid,
		    row = grid[y] = grid[y] || {},
		    cell = row[x] = row[x] || [],
		    stamp = L.Util.stamp(obj);

		this._objectPoint[stamp] = point;

		cell.push(obj);
	},

	updateObject: function (obj, point) {
		this.removeObject(obj);
		this.addObject(obj, point);
	},

	//Returns true if the object was found
	removeObject: function (obj, point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    grid = this._grid,
		    row = grid[y] = grid[y] || {},
		    cell = row[x] = row[x] || [],
		    i, len;

		delete this._objectPoint[L.Util.stamp(obj)];

		for (i = 0, len = cell.length; i < len; i++) {
			if (cell[i] === obj) {

				cell.splice(i, 1);

				if (len === 1) {
					delete row[x];
				}

				return true;
			}
		}

	},

	eachObject: function (fn, context) {
		var i, j, k, len, row, cell, removed,
		    grid = this._grid;

		for (i in grid) {
			row = grid[i];

			for (j in row) {
				cell = row[j];

				for (k = 0, len = cell.length; k < len; k++) {
					removed = fn.call(context, cell[k]);
					if (removed) {
						k--;
						len--;
					}
				}
			}
		}
	},

	getNearObject: function (point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    i, j, k, row, cell, len, obj, dist,
		    objectPoint = this._objectPoint,
		    closestDistSq = this._sqCellSize,
		    closest = null;

		for (i = y - 1; i <= y + 1; i++) {
			row = this._grid[i];
			if (row) {

				for (j = x - 1; j <= x + 1; j++) {
					cell = row[j];
					if (cell) {

						for (k = 0, len = cell.length; k < len; k++) {
							obj = cell[k];
							dist = this._sqDist(objectPoint[L.Util.stamp(obj)], point);
							if (dist < closestDistSq ||
								dist <= closestDistSq && closest === null) {
								closestDistSq = dist;
								closest = obj;
							}
						}
					}
				}
			}
		}
		return closest;
	},

	_getCoord: function (x) {
		var coord = Math.floor(x / this._cellSize);
		return isFinite(coord) ? coord : x;
	},

	_sqDist: function (p, p2) {
		var dx = p2.x - p.x,
		    dy = p2.y - p.y;
		return dx * dx + dy * dy;
	}
};

/* Copyright (c) 2012 the authors listed at the following URL, and/or
the authors of referenced articles or incorporated external code:
http://en.literateprograms.org/Quickhull_(Javascript)?action=history&offset=20120410175256

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Retrieved from: http://en.literateprograms.org/Quickhull_(Javascript)?oldid=18434
*/

(function () {
	L.QuickHull = {

		/*
		 * @param {Object} cpt a point to be measured from the baseline
		 * @param {Array} bl the baseline, as represented by a two-element
		 *   array of latlng objects.
		 * @returns {Number} an approximate distance measure
		 */
		getDistant: function (cpt, bl) {
			var vY = bl[1].lat - bl[0].lat,
				vX = bl[0].lng - bl[1].lng;
			return (vX * (cpt.lat - bl[0].lat) + vY * (cpt.lng - bl[0].lng));
		},

		/*
		 * @param {Array} baseLine a two-element array of latlng objects
		 *   representing the baseline to project from
		 * @param {Array} latLngs an array of latlng objects
		 * @returns {Object} the maximum point and all new points to stay
		 *   in consideration for the hull.
		 */
		findMostDistantPointFromBaseLine: function (baseLine, latLngs) {
			var maxD = 0,
				maxPt = null,
				newPoints = [],
				i, pt, d;

			for (i = latLngs.length - 1; i >= 0; i--) {
				pt = latLngs[i];
				d = this.getDistant(pt, baseLine);

				if (d > 0) {
					newPoints.push(pt);
				} else {
					continue;
				}

				if (d > maxD) {
					maxD = d;
					maxPt = pt;
				}
			}

			return { maxPoint: maxPt, newPoints: newPoints };
		},


		/*
		 * Given a baseline, compute the convex hull of latLngs as an array
		 * of latLngs.
		 *
		 * @param {Array} latLngs
		 * @returns {Array}
		 */
		buildConvexHull: function (baseLine, latLngs) {
			var convexHullBaseLines = [],
				t = this.findMostDistantPointFromBaseLine(baseLine, latLngs);

			if (t.maxPoint) { // if there is still a point "outside" the base line
				convexHullBaseLines =
					convexHullBaseLines.concat(
						this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints)
					);
				convexHullBaseLines =
					convexHullBaseLines.concat(
						this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints)
					);
				return convexHullBaseLines;
			} else {  // if there is no more point "outside" the base line, the current base line is part of the convex hull
				return [baseLine[0]];
			}
		},

		/*
		 * Given an array of latlngs, compute a convex hull as an array
		 * of latlngs
		 *
		 * @param {Array} latLngs
		 * @returns {Array}
		 */
		getConvexHull: function (latLngs) {
			// find first baseline
			var maxLat = false, minLat = false,
				maxLng = false, minLng = false,
				maxLatPt = null, minLatPt = null,
				maxLngPt = null, minLngPt = null,
				maxPt = null, minPt = null,
				i;

			for (i = latLngs.length - 1; i >= 0; i--) {
				var pt = latLngs[i];
				if (maxLat === false || pt.lat > maxLat) {
					maxLatPt = pt;
					maxLat = pt.lat;
				}
				if (minLat === false || pt.lat < minLat) {
					minLatPt = pt;
					minLat = pt.lat;
				}
				if (maxLng === false || pt.lng > maxLng) {
					maxLngPt = pt;
					maxLng = pt.lng;
				}
				if (minLng === false || pt.lng < minLng) {
					minLngPt = pt;
					minLng = pt.lng;
				}
			}
			
			if (minLat !== maxLat) {
				minPt = minLatPt;
				maxPt = maxLatPt;
			} else {
				minPt = minLngPt;
				maxPt = maxLngPt;
			}

			var ch = [].concat(this.buildConvexHull([minPt, maxPt], latLngs),
								this.buildConvexHull([maxPt, minPt], latLngs));
			return ch;
		}
	};
}());

L.MarkerCluster.include({
	getConvexHull: function () {
		var childMarkers = this.getAllChildMarkers(),
			points = [],
			p, i;

		for (i = childMarkers.length - 1; i >= 0; i--) {
			p = childMarkers[i].getLatLng();
			points.push(p);
		}

		return L.QuickHull.getConvexHull(points);
	}
});

//This code is 100% based on https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
//Huge thanks to jawj for implementing it first to make my job easy :-)

L.MarkerCluster.include({

	_2PI: Math.PI * 2,
	_circleFootSeparation: 25, //related to circumference of circle
	_circleStartAngle: 0,

	_spiralFootSeparation:  28, //related to size of spiral (experiment!)
	_spiralLengthStart: 11,
	_spiralLengthFactor: 5,

	_circleSpiralSwitchover: 9, //show spiral instead of circle from this marker count upwards.
								// 0 -> always spiral; Infinity -> always circle

	spiderfy: function () {
		if (this._group._spiderfied === this || this._group._inZoomAnimation) {
			return;
		}

		var childMarkers = this.getAllChildMarkers(null, true),
			group = this._group,
			map = group._map,
			center = map.latLngToLayerPoint(this._latlng),
			positions;

		this._group._unspiderfy();
		this._group._spiderfied = this;

		//TODO Maybe: childMarkers order by distance to center

		if (childMarkers.length >= this._circleSpiralSwitchover) {
			positions = this._generatePointsSpiral(childMarkers.length, center);
		} else {
			center.y += 10; // Otherwise circles look wrong => hack for standard blue icon, renders differently for other icons.
			positions = this._generatePointsCircle(childMarkers.length, center);
		}

		this._animationSpiderfy(childMarkers, positions);
	},

	unspiderfy: function (zoomDetails) {
		/// <param Name="zoomDetails">Argument from zoomanim if being called in a zoom animation or null otherwise</param>
		if (this._group._inZoomAnimation) {
			return;
		}
		this._animationUnspiderfy(zoomDetails);

		this._group._spiderfied = null;
	},

	_generatePointsCircle: function (count, centerPt) {
		var circumference = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count),
			legLength = circumference / this._2PI,  //radius from circumference
			angleStep = this._2PI / count,
			res = [],
			i, angle;

		legLength = Math.max(legLength, 35); // Minimum distance to get outside the cluster icon.

		res.length = count;

		for (i = 0; i < count; i++) { // Clockwise, like spiral.
			angle = this._circleStartAngle + i * angleStep;
			res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
		}

		return res;
	},

	_generatePointsSpiral: function (count, centerPt) {
		var spiderfyDistanceMultiplier = this._group.options.spiderfyDistanceMultiplier,
			legLength = spiderfyDistanceMultiplier * this._spiralLengthStart,
			separation = spiderfyDistanceMultiplier * this._spiralFootSeparation,
			lengthFactor = spiderfyDistanceMultiplier * this._spiralLengthFactor * this._2PI,
			angle = 0,
			res = [],
			i;

		res.length = count;

		// Higher index, closer position to cluster center.
		for (i = count; i >= 0; i--) {
			// Skip the first position, so that we are already farther from center and we avoid
			// being under the default cluster icon (especially important for Circle Markers).
			if (i < count) {
				res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
			}
			angle += separation / legLength + i * 0.0005;
			legLength += lengthFactor / angle;
		}
		return res;
	},

	_noanimationUnspiderfy: function () {
		var group = this._group,
			map = group._map,
			fg = group._featureGroup,
			childMarkers = this.getAllChildMarkers(null, true),
			m, i;

		group._ignoreMove = true;

		this.setOpacity(1);
		for (i = childMarkers.length - 1; i >= 0; i--) {
			m = childMarkers[i];

			fg.removeLayer(m);

			if (m._preSpiderfyLatlng) {
				m.setLatLng(m._preSpiderfyLatlng);
				delete m._preSpiderfyLatlng;
			}
			if (m.setZIndexOffset) {
				m.setZIndexOffset(0);
			}

			if (m._spiderLeg) {
				map.removeLayer(m._spiderLeg);
				delete m._spiderLeg;
			}
		}

		group.fire('unspiderfied', {
			cluster: this,
			markers: childMarkers
		});
		group._ignoreMove = false;
		group._spiderfied = null;
	}
});

//Non Animated versions of everything
L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
	_animationSpiderfy: function (childMarkers, positions) {
		var group = this._group,
			map = group._map,
			fg = group._featureGroup,
			legOptions = this._group.options.spiderLegPolylineOptions,
			i, m, leg, newPos;

		group._ignoreMove = true;

		// Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
		// The reverse order trick no longer improves performance on modern browsers.
		for (i = 0; i < childMarkers.length; i++) {
			newPos = map.layerPointToLatLng(positions[i]);
			m = childMarkers[i];

			// Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
			leg = new L.Polyline([this._latlng, newPos], legOptions);
			map.addLayer(leg);
			m._spiderLeg = leg;

			// Now add the marker.
			m._preSpiderfyLatlng = m._latlng;
			m.setLatLng(newPos);
			if (m.setZIndexOffset) {
				m.setZIndexOffset(1000000); //Make these appear on top of EVERYTHING
			}

			fg.addLayer(m);
		}
		this.setOpacity(0.3);

		group._ignoreMove = false;
		group.fire('spiderfied', {
			cluster: this,
			markers: childMarkers
		});
	},

	_animationUnspiderfy: function () {
		this._noanimationUnspiderfy();
	}
});

//Animated versions here
L.MarkerCluster.include({

	_animationSpiderfy: function (childMarkers, positions) {
		var me = this,
			group = this._group,
			map = group._map,
			fg = group._featureGroup,
			thisLayerLatLng = this._latlng,
			thisLayerPos = map.latLngToLayerPoint(thisLayerLatLng),
			svg = L.Path.SVG,
			legOptions = L.extend({}, this._group.options.spiderLegPolylineOptions), // Copy the options so that we can modify them for animation.
			finalLegOpacity = legOptions.opacity,
			i, m, leg, legPath, legLength, newPos;

		if (finalLegOpacity === undefined) {
			finalLegOpacity = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity;
		}

		if (svg) {
			// If the initial opacity of the spider leg is not 0 then it appears before the animation starts.
			legOptions.opacity = 0;

			// Add the class for CSS transitions.
			legOptions.className = (legOptions.className || '') + ' leaflet-cluster-spider-leg';
		} else {
			// Make sure we have a defined opacity.
			legOptions.opacity = finalLegOpacity;
		}

		group._ignoreMove = true;

		// Add markers and spider legs to map, hidden at our center point.
		// Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
		// The reverse order trick no longer improves performance on modern browsers.
		for (i = 0; i < childMarkers.length; i++) {
			m = childMarkers[i];

			newPos = map.layerPointToLatLng(positions[i]);

			// Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
			leg = new L.Polyline([thisLayerLatLng, newPos], legOptions);
			map.addLayer(leg);
			m._spiderLeg = leg;

			// Explanations: https://jakearchibald.com/2013/animated-line-drawing-svg/
			// In our case the transition property is declared in the CSS file.
			if (svg) {
				legPath = leg._path;
				legLength = legPath.getTotalLength() + 0.1; // Need a small extra length to avoid remaining dot in Firefox.
				legPath.style.strokeDasharray = legLength; // Just 1 length is enough, it will be duplicated.
				legPath.style.strokeDashoffset = legLength;
			}

			// If it is a marker, add it now and we'll animate it out
			if (m.setZIndexOffset) {
				m.setZIndexOffset(1000000); // Make normal markers appear on top of EVERYTHING
			}
			if (m.clusterHide) {
				m.clusterHide();
			}
			
			// Vectors just get immediately added
			fg.addLayer(m);

			if (m._setPos) {
				m._setPos(thisLayerPos);
			}
		}

		group._forceLayout();
		group._animationStart();

		// Reveal markers and spider legs.
		for (i = childMarkers.length - 1; i >= 0; i--) {
			newPos = map.layerPointToLatLng(positions[i]);
			m = childMarkers[i];

			//Move marker to new position
			m._preSpiderfyLatlng = m._latlng;
			m.setLatLng(newPos);
			
			if (m.clusterShow) {
				m.clusterShow();
			}

			// Animate leg (animation is actually delegated to CSS transition).
			if (svg) {
				leg = m._spiderLeg;
				legPath = leg._path;
				legPath.style.strokeDashoffset = 0;
				//legPath.style.strokeOpacity = finalLegOpacity;
				leg.setStyle({opacity: finalLegOpacity});
			}
		}
		this.setOpacity(0.3);

		group._ignoreMove = false;

		setTimeout(function () {
			group._animationEnd();
			group.fire('spiderfied', {
				cluster: me,
				markers: childMarkers
			});
		}, 200);
	},

	_animationUnspiderfy: function (zoomDetails) {
		var me = this,
			group = this._group,
			map = group._map,
			fg = group._featureGroup,
			thisLayerPos = zoomDetails ? map._latLngToNewLayerPoint(this._latlng, zoomDetails.zoom, zoomDetails.center) : map.latLngToLayerPoint(this._latlng),
			childMarkers = this.getAllChildMarkers(null, true),
			svg = L.Path.SVG,
			m, i, leg, legPath, legLength, nonAnimatable;

		group._ignoreMove = true;
		group._animationStart();

		//Make us visible and bring the child markers back in
		this.setOpacity(1);
		for (i = childMarkers.length - 1; i >= 0; i--) {
			m = childMarkers[i];

			//Marker was added to us after we were spiderfied
			if (!m._preSpiderfyLatlng) {
				continue;
			}

			//Close any popup on the marker first, otherwise setting the location of the marker will make the map scroll
			m.closePopup();

			//Fix up the location to the real one
			m.setLatLng(m._preSpiderfyLatlng);
			delete m._preSpiderfyLatlng;

			//Hack override the location to be our center
			nonAnimatable = true;
			if (m._setPos) {
				m._setPos(thisLayerPos);
				nonAnimatable = false;
			}
			if (m.clusterHide) {
				m.clusterHide();
				nonAnimatable = false;
			}
			if (nonAnimatable) {
				fg.removeLayer(m);
			}

			// Animate the spider leg back in (animation is actually delegated to CSS transition).
			if (svg) {
				leg = m._spiderLeg;
				legPath = leg._path;
				legLength = legPath.getTotalLength() + 0.1;
				legPath.style.strokeDashoffset = legLength;
				leg.setStyle({opacity: 0});
			}
		}

		group._ignoreMove = false;

		setTimeout(function () {
			//If we have only <= one child left then that marker will be shown on the map so don't remove it!
			var stillThereChildCount = 0;
			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i];
				if (m._spiderLeg) {
					stillThereChildCount++;
				}
			}


			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i];

				if (!m._spiderLeg) { //Has already been unspiderfied
					continue;
				}

				if (m.clusterShow) {
					m.clusterShow();
				}
				if (m.setZIndexOffset) {
					m.setZIndexOffset(0);
				}

				if (stillThereChildCount > 1) {
					fg.removeLayer(m);
				}

				map.removeLayer(m._spiderLeg);
				delete m._spiderLeg;
			}
			group._animationEnd();
			group.fire('unspiderfied', {
				cluster: me,
				markers: childMarkers
			});
		}, 200);
	}
});


L.MarkerClusterGroup.include({
	//The MarkerCluster currently spiderfied (if any)
	_spiderfied: null,

	unspiderfy: function () {
		this._unspiderfy.apply(this, arguments);
	},

	_spiderfierOnAdd: function () {
		this._map.on('click', this._unspiderfyWrapper, this);

		if (this._map.options.zoomAnimation) {
			this._map.on('zoomstart', this._unspiderfyZoomStart, this);
		}
		//Browsers without zoomAnimation or a big zoom don't fire zoomstart
		this._map.on('zoomend', this._noanimationUnspiderfy, this);

		if (!L.Browser.touch) {
			this._map.getRenderer(this);
			//Needs to happen in the pageload, not after, or animations don't work in webkit
			//  http://stackoverflow.com/questions/8455200/svg-animate-with-dynamically-added-elements
			//Disable on touch browsers as the animation messes up on a touch zoom and isn't very noticable
		}
	},

	_spiderfierOnRemove: function () {
		this._map.off('click', this._unspiderfyWrapper, this);
		this._map.off('zoomstart', this._unspiderfyZoomStart, this);
		this._map.off('zoomanim', this._unspiderfyZoomAnim, this);
		this._map.off('zoomend', this._noanimationUnspiderfy, this);

		//Ensure that markers are back where they should be
		// Use no animation to avoid a sticky leaflet-cluster-anim class on mapPane
		this._noanimationUnspiderfy();
	},

	//On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
	//This means we can define the animation they do rather than Markers doing an animation to their actual location
	_unspiderfyZoomStart: function () {
		if (!this._map) { //May have been removed from the map by a zoomEnd handler
			return;
		}

		this._map.on('zoomanim', this._unspiderfyZoomAnim, this);
	},

	_unspiderfyZoomAnim: function (zoomDetails) {
		//Wait until the first zoomanim after the user has finished touch-zooming before running the animation
		if (L.DomUtil.hasClass(this._map._mapPane, 'leaflet-touching')) {
			return;
		}

		this._map.off('zoomanim', this._unspiderfyZoomAnim, this);
		this._unspiderfy(zoomDetails);
	},

	_unspiderfyWrapper: function () {
		/// <summary>_unspiderfy but passes no arguments</summary>
		this._unspiderfy();
	},

	_unspiderfy: function (zoomDetails) {
		if (this._spiderfied) {
			this._spiderfied.unspiderfy(zoomDetails);
		}
	},

	_noanimationUnspiderfy: function () {
		if (this._spiderfied) {
			this._spiderfied._noanimationUnspiderfy();
		}
	},

	//If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
	_unspiderfyLayer: function (layer) {
		if (layer._spiderLeg) {
			this._featureGroup.removeLayer(layer);

			if (layer.clusterShow) {
				layer.clusterShow();
			}
				//Position will be fixed up immediately in _animationUnspiderfy
			if (layer.setZIndexOffset) {
				layer.setZIndexOffset(0);
			}

			this._map.removeLayer(layer._spiderLeg);
			delete layer._spiderLeg;
		}
	}
});

/**
 * Adds 1 public method to MCG and 1 to L.Marker to facilitate changing
 * markers' icon options and refreshing their icon and their parent clusters
 * accordingly (case where their iconCreateFunction uses data of childMarkers
 * to make up the cluster icon).
 */


L.MarkerClusterGroup.include({
	/**
	 * Updates the icon of all clusters which are parents of the given marker(s).
	 * In singleMarkerMode, also updates the given marker(s) icon.
	 * @param layers L.MarkerClusterGroup|L.LayerGroup|Array(L.Marker)|Map(L.Marker)|
	 * L.MarkerCluster|L.Marker (optional) list of markers (or single marker) whose parent
	 * clusters need to be updated. If not provided, retrieves all child markers of this.
	 * @returns {L.MarkerClusterGroup}
	 */
	refreshClusters: function (layers) {
		if (!layers) {
			layers = this._topClusterLevel.getAllChildMarkers();
		} else if (layers instanceof L.MarkerClusterGroup) {
			layers = layers._topClusterLevel.getAllChildMarkers();
		} else if (layers instanceof L.LayerGroup) {
			layers = layers._layers;
		} else if (layers instanceof L.MarkerCluster) {
			layers = layers.getAllChildMarkers();
		} else if (layers instanceof L.Marker) {
			layers = [layers];
		} // else: must be an Array(L.Marker)|Map(L.Marker)
		this._flagParentsIconsNeedUpdate(layers);
		this._refreshClustersIcons();

		// In case of singleMarkerMode, also re-draw the markers.
		if (this.options.singleMarkerMode) {
			this._refreshSingleMarkerModeMarkers(layers);
		}

		return this;
	},

	/**
	 * Simply flags all parent clusters of the given markers as having a "dirty" icon.
	 * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
	 * @private
	 */
	_flagParentsIconsNeedUpdate: function (layers) {
		var id, parent;

		// Assumes layers is an Array or an Object whose prototype is non-enumerable.
		for (id in layers) {
			// Flag parent clusters' icon as "dirty", all the way up.
			// Dumb process that flags multiple times upper parents, but still
			// much more efficient than trying to be smart and make short lists,
			// at least in the case of a hierarchy following a power law:
			// http://jsperf.com/flag-nodes-in-power-hierarchy/2
			parent = layers[id].__parent;
			while (parent) {
				parent._iconNeedsUpdate = true;
				parent = parent.__parent;
			}
		}
	},

	/**
	 * Re-draws the icon of the supplied markers.
	 * To be used in singleMarkerMode only.
	 * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
	 * @private
	 */
	_refreshSingleMarkerModeMarkers: function (layers) {
		var id, layer;

		for (id in layers) {
			layer = layers[id];

			// Make sure we do not override markers that do not belong to THIS group.
			if (this.hasLayer(layer)) {
				// Need to re-create the icon first, then re-draw the marker.
				layer.setIcon(this._overrideMarkerIcon(layer));
			}
		}
	}
});

L.Marker.include({
	/**
	 * Updates the given options in the marker's icon and refreshes the marker.
	 * @param options map object of icon options.
	 * @param directlyRefreshClusters boolean (optional) true to trigger
	 * MCG.refreshClustersOf() right away with this single marker.
	 * @returns {L.Marker}
	 */
	refreshIconOptions: function (options, directlyRefreshClusters) {
		var icon = this.options.icon;

		L.setOptions(icon, options);

		this.setIcon(icon);

		// Shortcut to refresh the associated MCG clusters right away.
		// To be used when refreshing a single marker.
		// Otherwise, better use MCG.refreshClusters() once at the end with
		// the list of modified markers.
		if (directlyRefreshClusters && this.__parent) {
			this.__parent._group.refreshClusters(this);
		}

		return this;
	}
});

exports.MarkerClusterGroup = MarkerClusterGroup;
exports.MarkerCluster = MarkerCluster;

})));
//# sourceMappingURL=leaflet.markercluster-src.js.map


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC5tYXJrZXJjbHVzdGVyLmxheWVyc3VwcG9ydC9kaXN0L2xlYWZsZXQubWFya2VyY2x1c3Rlci5sYXllcnN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQubWFya2VyY2x1c3Rlci9kaXN0L2xlYWZsZXQubWFya2VyY2x1c3Rlci1zcmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBcUMsQ0FBQyxpQ0FBTyxDQUFDLGdGQUFTLENBQUMsb0NBQUMsQ0FBQztBQUFBO0FBQUE7QUFBQSxvR0FBQyxDQUFDLFNBQWlFLENBQUMsb0JBQW9CLCtEQUErRCxTQUFTLGdDQUFnQyx3QkFBd0IsME1BQTBNLDBCQUEwQixzQ0FBc0MsZ0NBQWdDLHFCQUFxQix1QkFBdUIseUNBQXlDLHNCQUFzQixvRUFBb0UscUJBQXFCLHlCQUF5QixRQUFRLFdBQVcsMEVBQTBFLHNDQUFzQyxXQUFXLDJDQUEyQyxZQUFZLHVCQUF1Qix1RUFBdUUsMkNBQTJDLFdBQVcsMklBQTJJLHNCQUFzQix1REFBdUQsZ0pBQWdKLG9FQUFvRSxxQkFBcUIsNkJBQTZCLGtDQUFrQyxXQUFXLDZJQUE2SSxZQUFZLHlCQUF5QiwwREFBMEQscUpBQXFKLCtIQUErSCwwQ0FBMEMsaUNBQWlDLG1GQUFtRiwySkFBMkosUUFBUSxXQUFXLHFCQUFxQiwwRkFBMEYsbURBQW1ELHVDQUF1QyxlQUFlLHlKQUF5SiwwQ0FBMEMsbURBQW1ELFdBQVcsc0ZBQXNGLCtHQUErRyxrQ0FBa0MsaURBQWlELHFCQUFxQix5QkFBeUIsUUFBUSxXQUFXLDZDQUE2QyxRQUFRLFdBQVcsdUdBQXVHLFNBQVMsOENBQThDLHNEQUFzRCxXQUFXLDhKQUE4SixTQUFTLHVDQUF1QyxtQ0FBbUMsTUFBTSxtQkFBbUIsY0FBYywrQkFBK0IsZ1FBQWdRLHFDQUFx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Q0E7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLGtDQUFrQyxRQUFRO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsY0FBYztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQSxFQUFFOzs7QUFHRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksK0RBQStEO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxH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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQSxDQUFDO0FBQ0QiLCJmaWxlIjoianMvdmVuZG9yc35sYXllci1tYXJrZXJDbHVzdGVyR3JvdXBGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gTGVhZmxldC5NYXJrZXJDbHVzdGVyLkxheWVyU3VwcG9ydCAyLjAuMSs2NDliM2E5XG4gKGMpIDIwMTUtMjAxOCBCb3JpcyBTZWFuZ1xuIExpY2Vuc2UgTUlUXG4gKi9cbiFmdW5jdGlvbihlLHIpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wibGVhZmxldFwiXSxyKTpyKFwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP3JlcXVpcmUoXCJsZWFmbGV0XCIpOmUuTCl9KHRoaXMsZnVuY3Rpb24oZSxyKXtlLk1hcmtlckNsdXN0ZXJHcm91cC5MYXllclN1cHBvcnQ9ZS5NYXJrZXJDbHVzdGVyR3JvdXAuZXh0ZW5kKHtvcHRpb25zOntzaW5nbGVBZGRSZW1vdmVCdWZmZXJEdXJhdGlvbjowfSxpbml0aWFsaXplOmZ1bmN0aW9uKHIpe2UuTWFya2VyQ2x1c3Rlckdyb3VwLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcyxyKSx0aGlzLl9mZWF0dXJlR3JvdXA9bmV3IG8sdGhpcy5fZmVhdHVyZUdyb3VwLmFkZEV2ZW50UGFyZW50KHRoaXMpLHRoaXMuX25vblBvaW50R3JvdXA9bmV3IG8sdGhpcy5fbm9uUG9pbnRHcm91cC5hZGRFdmVudFBhcmVudCh0aGlzKSx0aGlzLl9sYXllcnM9e30sdGhpcy5fcHJveHlMYXllckdyb3Vwcz17fSx0aGlzLl9wcm94eUxheWVyR3JvdXBzTmVlZFJlbW92aW5nPXt9LHRoaXMuX3NpbmdsZUFkZFJlbW92ZUJ1ZmZlcj1bXX0sY2hlY2tJbjpmdW5jdGlvbihlKXt2YXIgcj10aGlzLl90b0FycmF5KGUpO3JldHVybiB0aGlzLl9jaGVja0luR2V0U2VwYXJhdGVkKHIpLHRoaXN9LGNoZWNrT3V0OmZ1bmN0aW9uKHIpe3ZhciBvLHQsaT10aGlzLl90b0FycmF5KHIpLGE9dGhpcy5fc2VwYXJhdGVTaW5nbGVGcm9tR3JvdXBMYXllcnMoaSx7Z3JvdXBzOltdLHNpbmdsZXM6W119KSxzPWEuZ3JvdXBzLG49YS5zaW5nbGVzO2ZvcihvPTA7bzxuLmxlbmd0aDtvKyspdD1uW29dLGRlbGV0ZSB0aGlzLl9sYXllcnNbZS5zdGFtcCh0KV0sZGVsZXRlIHQuX21jZ0xheWVyU3VwcG9ydEdyb3VwO2Zvcih0aGlzLl9vcmlnaW5hbFJlbW92ZUxheWVycyhuKSxvPTA7bzxzLmxlbmd0aDtvKyspdD1zW29dLHRoaXMuX2Rpc21pc3NQcm94eUxheWVyR3JvdXAodCk7cmV0dXJuIHRoaXN9LGFkZExheWVyczpmdW5jdGlvbihyKXt2YXIgbyx0LGksYT10aGlzLl90b0FycmF5KHIpLHM9dGhpcy5fY2hlY2tJbkdldFNlcGFyYXRlZChhKSxuPXMuZ3JvdXBzO2Zvcih0aGlzLl9vcmlnaW5hbEFkZExheWVycyhzLnNpbmdsZXMpLG89MDtvPG4ubGVuZ3RoO28rKyl0PW5bb10saT1lLnN0YW1wKHQpLHRoaXMuX3Byb3h5TGF5ZXJHcm91cHNbaV09dCxkZWxldGUgdGhpcy5fcHJveHlMYXllckdyb3Vwc05lZWRSZW1vdmluZ1tpXSx0aGlzLl9tYXAmJnRoaXMuX21hcC5fb3JpZ2luYWxBZGRMYXllcih0KX0sYWRkTGF5ZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX2J1ZmZlclNpbmdsZUFkZFJlbW92ZShlLFwiYWRkTGF5ZXJzXCIpLHRoaXN9LF9vcmlnaW5hbEFkZExheWVyOmUuTWFya2VyQ2x1c3Rlckdyb3VwLnByb3RvdHlwZS5hZGRMYXllcixfb3JpZ2luYWxBZGRMYXllcnM6ZS5NYXJrZXJDbHVzdGVyR3JvdXAucHJvdG90eXBlLmFkZExheWVycyxyZW1vdmVMYXllcnM6ZnVuY3Rpb24ocil7dmFyIG8sdCxpPXRoaXMuX3RvQXJyYXkociksYT10aGlzLl9zZXBhcmF0ZVNpbmdsZUZyb21Hcm91cExheWVycyhpLHtncm91cHM6W10sc2luZ2xlczpbXX0pLHM9YS5ncm91cHMsbj1hLnNpbmdsZXMscD0wO2Zvcih0aGlzLl9vcmlnaW5hbFJlbW92ZUxheWVycyhuKTtwPHMubGVuZ3RoO3ArKylvPXNbcF0sdD1lLnN0YW1wKG8pLGRlbGV0ZSB0aGlzLl9wcm94eUxheWVyR3JvdXBzW3RdLHRoaXMuX21hcD90aGlzLl9tYXAuX29yaWdpbmFsUmVtb3ZlTGF5ZXIobyk6dGhpcy5fcHJveHlMYXllckdyb3Vwc05lZWRSZW1vdmluZ1t0XT1vO3JldHVybiB0aGlzfSxyZW1vdmVMYXllcjpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fYnVmZmVyU2luZ2xlQWRkUmVtb3ZlKGUsXCJyZW1vdmVMYXllcnNcIiksdGhpc30sX29yaWdpbmFsUmVtb3ZlTGF5ZXI6ZS5NYXJrZXJDbHVzdGVyR3JvdXAucHJvdG90eXBlLnJlbW92ZUxheWVyLF9vcmlnaW5hbFJlbW92ZUxheWVyczplLk1hcmtlckNsdXN0ZXJHcm91cC5wcm90b3R5cGUucmVtb3ZlTGF5ZXJzLG9uQWRkOmZ1bmN0aW9uKHIpe3IuX29yaWdpbmFsQWRkTGF5ZXI9ci5fb3JpZ2luYWxBZGRMYXllcnx8ci5hZGRMYXllcixyLl9vcmlnaW5hbFJlbW92ZUxheWVyPXIuX29yaWdpbmFsUmVtb3ZlTGF5ZXJ8fHIucmVtb3ZlTGF5ZXIsZS5leHRlbmQocixpKTt2YXIgbyx0LGEscz10aGlzLl9yZW1vdmVQcmVBZGRlZExheWVycyhyKTt0aGlzLl9vcmlnaW5hbE9uQWRkLmNhbGwodGhpcyxyKTtmb3IobyBpbiB0aGlzLl9wcm94eUxheWVyR3JvdXBzKXQ9dGhpcy5fcHJveHlMYXllckdyb3Vwc1tvXSxyLl9vcmlnaW5hbEFkZExheWVyKHQpO2ZvcihvIGluIHRoaXMuX3Byb3h5TGF5ZXJHcm91cHNOZWVkUmVtb3ZpbmcpdD10aGlzLl9wcm94eUxheWVyR3JvdXBzTmVlZFJlbW92aW5nW29dLHIuX29yaWdpbmFsUmVtb3ZlTGF5ZXIodCksZGVsZXRlIHRoaXMuX3Byb3h5TGF5ZXJHcm91cHNOZWVkUmVtb3Zpbmdbb107Zm9yKGE9MDthPHMubGVuZ3RoO2ErKylyLmFkZExheWVyKHNbYV0pfSxfb3JpZ2luYWxPbkFkZDplLk1hcmtlckNsdXN0ZXJHcm91cC5wcm90b3R5cGUub25BZGQsX2J1ZmZlclNpbmdsZUFkZFJlbW92ZTpmdW5jdGlvbihyLG8pe3ZhciB0LGk9dGhpcy5vcHRpb25zLnNpbmdsZUFkZFJlbW92ZUJ1ZmZlckR1cmF0aW9uO2k+MD8odGhpcy5fc2luZ2xlQWRkUmVtb3ZlQnVmZmVyLnB1c2goe3R5cGU6byxsYXllcjpyfSksdGhpcy5fc2luZ2xlQWRkUmVtb3ZlQnVmZmVyVGltZW91dHx8KHQ9ZS5iaW5kKHRoaXMuX3Byb2Nlc3NTaW5nbGVBZGRSZW1vdmVCdWZmZXIsdGhpcyksdGhpcy5fc2luZ2xlQWRkUmVtb3ZlQnVmZmVyVGltZW91dD1zZXRUaW1lb3V0KHQsaSkpKTp0aGlzW29dKHIpfSxfcHJvY2Vzc1NpbmdsZUFkZFJlbW92ZUJ1ZmZlcjpmdW5jdGlvbigpe2Zvcih2YXIgZSxyLG89dGhpcy5fc2luZ2xlQWRkUmVtb3ZlQnVmZmVyLHQ9MCxpPVtdO3Q8by5sZW5ndGg7dCsrKWU9b1t0XSxyfHwocj1lLnR5cGUpLGUudHlwZT09PXI/aS5wdXNoKGUubGF5ZXIpOih0aGlzW3JdKGkpLHI9ZS50eXBlLGk9W2UubGF5ZXJdKTt0aGlzW3JdKGkpLG8ubGVuZ3RoPTAsY2xlYXJUaW1lb3V0KHRoaXMuX3NpbmdsZUFkZFJlbW92ZUJ1ZmZlclRpbWVvdXQpLHRoaXMuX3NpbmdsZUFkZFJlbW92ZUJ1ZmZlclRpbWVvdXQ9bnVsbH0sX2NoZWNrSW5HZXRTZXBhcmF0ZWQ6ZnVuY3Rpb24ocil7dmFyIG8sdCxpPXRoaXMuX3NlcGFyYXRlU2luZ2xlRnJvbUdyb3VwTGF5ZXJzKHIse2dyb3VwczpbXSxzaW5nbGVzOltdfSksYT1pLmdyb3VwcyxzPWkuc2luZ2xlcztmb3Iobz0wO288YS5sZW5ndGg7bysrKXQ9YVtvXSx0aGlzLl9yZWNydWl0TGF5ZXJHcm91cEFzUHJveHkodCk7Zm9yKG89MDtvPHMubGVuZ3RoO28rKyl0PXNbb10sdGhpcy5fcmVtb3ZlRnJvbU90aGVyR3JvdXBzT3JNYXAodCksdGhpcy5fbGF5ZXJzW2Uuc3RhbXAodCldPXQsdC5fbWNnTGF5ZXJTdXBwb3J0R3JvdXA9dGhpcztyZXR1cm4gaX0sX3NlcGFyYXRlU2luZ2xlRnJvbUdyb3VwTGF5ZXJzOmZ1bmN0aW9uKHIsbyl7Zm9yKHZhciB0LGk9by5ncm91cHMsYT1vLnNpbmdsZXMscz1lLlV0aWwuaXNBcnJheSxuPTA7bjxyLmxlbmd0aDtuKyspdD1yW25dLHQgaW5zdGFuY2VvZiBlLkxheWVyR3JvdXA/KGkucHVzaCh0KSx0aGlzLl9zZXBhcmF0ZVNpbmdsZUZyb21Hcm91cExheWVycyh0LmdldExheWVycygpLG8pKTpzKHQpP3RoaXMuX3NlcGFyYXRlU2luZ2xlRnJvbUdyb3VwTGF5ZXJzKHQsbyk6YS5wdXNoKHQpO3JldHVybiBvfSxfcmVjcnVpdExheWVyR3JvdXBBc1Byb3h5OmZ1bmN0aW9uKHIpe3ZhciBvPXIuX3Byb3h5TWNnTGF5ZXJTdXBwb3J0R3JvdXA7aWYobyl7aWYobz09PXRoaXMpcmV0dXJuO28uY2hlY2tPdXQocil9ZWxzZSB0aGlzLl9yZW1vdmVGcm9tT3duTWFwKHIpO3IuX3Byb3h5TWNnTGF5ZXJTdXBwb3J0R3JvdXA9dGhpcyxyLl9vcmlnaW5hbEFkZExheWVyPXIuX29yaWdpbmFsQWRkTGF5ZXJ8fHIuYWRkTGF5ZXIsci5fb3JpZ2luYWxSZW1vdmVMYXllcj1yLl9vcmlnaW5hbFJlbW92ZUxheWVyfHxyLnJlbW92ZUxheWVyLHIuX29yaWdpbmFsT25BZGQ9ci5fb3JpZ2luYWxPbkFkZHx8ci5vbkFkZCxyLl9vcmlnaW5hbE9uUmVtb3ZlPXIuX29yaWdpbmFsT25SZW1vdmV8fHIub25SZW1vdmUsZS5leHRlbmQocix0KX0sX2Rpc21pc3NQcm94eUxheWVyR3JvdXA6ZnVuY3Rpb24obyl7aWYoby5fcHJveHlNY2dMYXllclN1cHBvcnRHcm91cCE9PXImJm8uX3Byb3h5TWNnTGF5ZXJTdXBwb3J0R3JvdXA9PT10aGlzKXtkZWxldGUgby5fcHJveHlNY2dMYXllclN1cHBvcnRHcm91cCxvLmFkZExheWVyPW8uX29yaWdpbmFsQWRkTGF5ZXIsby5yZW1vdmVMYXllcj1vLl9vcmlnaW5hbFJlbW92ZUxheWVyLG8ub25BZGQ9by5fb3JpZ2luYWxPbkFkZCxvLm9uUmVtb3ZlPW8uX29yaWdpbmFsT25SZW1vdmU7dmFyIHQ9ZS5zdGFtcChvKTtkZWxldGUgdGhpcy5fcHJveHlMYXllckdyb3Vwc1t0XSxkZWxldGUgdGhpcy5fcHJveHlMYXllckdyb3Vwc05lZWRSZW1vdmluZ1t0XSx0aGlzLl9yZW1vdmVGcm9tT3duTWFwKG8pfX0sX3JlbW92ZUZyb21PdGhlckdyb3Vwc09yTWFwOmZ1bmN0aW9uKGUpe3ZhciByPWUuX21jZ0xheWVyU3VwcG9ydEdyb3VwO2lmKHIpe2lmKHI9PT10aGlzKXJldHVybjtyLmNoZWNrT3V0KGUpfWVsc2UgZS5fX3BhcmVudD9lLl9fcGFyZW50Ll9ncm91cC5yZW1vdmVMYXllcihlKTp0aGlzLl9yZW1vdmVGcm9tT3duTWFwKGUpfSxfcmVtb3ZlRnJvbU93bk1hcDpmdW5jdGlvbihlKXtlLl9tYXAmJmUuX21hcC5yZW1vdmVMYXllcihlKX0sX3JlbW92ZVByZUFkZGVkTGF5ZXJzOmZ1bmN0aW9uKGUpe3ZhciByLG89dGhpcy5fbGF5ZXJzLHQ9W107Zm9yKHZhciBpIGluIG8pcj1vW2ldLHIuX21hcCYmKHQucHVzaChyKSxlLl9vcmlnaW5hbFJlbW92ZUxheWVyKHIpKTtyZXR1cm4gdH0sX3RvQXJyYXk6ZnVuY3Rpb24ocil7cmV0dXJuIGUuVXRpbC5pc0FycmF5KHIpP3I6W3JdfX0pO3ZhciBvPWUuRmVhdHVyZUdyb3VwLmV4dGVuZCh7YWRkTGF5ZXI6ZnVuY3Rpb24ocil7aWYodGhpcy5oYXNMYXllcihyKSlyZXR1cm4gdGhpcztyLmFkZEV2ZW50UGFyZW50KHRoaXMpO3ZhciBvPWUuc3RhbXAocik7cmV0dXJuIHRoaXMuX2xheWVyc1tvXT1yLHRoaXMuX21hcCYmdGhpcy5fbWFwLl9vcmlnaW5hbEFkZExheWVyKHIpLHRoaXMuZmlyZShcImxheWVyYWRkXCIse2xheWVyOnJ9KX0scmVtb3ZlTGF5ZXI6ZnVuY3Rpb24ocil7aWYoIXRoaXMuaGFzTGF5ZXIocikpcmV0dXJuIHRoaXM7ciBpbiB0aGlzLl9sYXllcnMmJihyPXRoaXMuX2xheWVyc1tyXSksci5yZW1vdmVFdmVudFBhcmVudCh0aGlzKTt2YXIgbz1lLnN0YW1wKHIpO3JldHVybiB0aGlzLl9tYXAmJnRoaXMuX2xheWVyc1tvXSYmdGhpcy5fbWFwLl9vcmlnaW5hbFJlbW92ZUxheWVyKHRoaXMuX2xheWVyc1tvXSksZGVsZXRlIHRoaXMuX2xheWVyc1tvXSx0aGlzLmZpcmUoXCJsYXllcnJlbW92ZVwiLHtsYXllcjpyfSl9LG9uQWRkOmZ1bmN0aW9uKGUpe3RoaXMuX21hcD1lLHRoaXMuZWFjaExheWVyKGUuX29yaWdpbmFsQWRkTGF5ZXIsZSl9LG9uUmVtb3ZlOmZ1bmN0aW9uKGUpe3RoaXMuZWFjaExheWVyKGUuX29yaWdpbmFsUmVtb3ZlTGF5ZXIsZSksdGhpcy5fbWFwPW51bGx9fSksdD17YWRkTGF5ZXI6ZnVuY3Rpb24oZSl7dmFyIHI9dGhpcy5nZXRMYXllcklkKGUpO3JldHVybiB0aGlzLl9sYXllcnNbcl09ZSx0aGlzLl9tYXA/dGhpcy5fcHJveHlNY2dMYXllclN1cHBvcnRHcm91cC5hZGRMYXllcihlKTp0aGlzLl9wcm94eU1jZ0xheWVyU3VwcG9ydEdyb3VwLmNoZWNrSW4oZSksdGhpc30scmVtb3ZlTGF5ZXI6ZnVuY3Rpb24oZSl7dmFyIHI9ZSBpbiB0aGlzLl9sYXllcnM/ZTp0aGlzLmdldExheWVySWQoZSk7cmV0dXJuIHRoaXMuX3Byb3h5TWNnTGF5ZXJTdXBwb3J0R3JvdXAucmVtb3ZlTGF5ZXIoZSksZGVsZXRlIHRoaXMuX2xheWVyc1tyXSx0aGlzfSxvbkFkZDpmdW5jdGlvbigpe3RoaXMuX3Byb3h5TWNnTGF5ZXJTdXBwb3J0R3JvdXAuYWRkTGF5ZXJzKHRoaXMuZ2V0TGF5ZXJzKCkpfSxvblJlbW92ZTpmdW5jdGlvbigpe3RoaXMuX3Byb3h5TWNnTGF5ZXJTdXBwb3J0R3JvdXAucmVtb3ZlTGF5ZXJzKHRoaXMuZ2V0TGF5ZXJzKCkpfX0saT17YWRkTGF5ZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuX21jZ0xheWVyU3VwcG9ydEdyb3VwP2UuX21jZ0xheWVyU3VwcG9ydEdyb3VwLl9vcmlnaW5hbEFkZExheWVyKGUpOnRoaXMuX29yaWdpbmFsQWRkTGF5ZXIoZSl9LHJlbW92ZUxheWVyOmZ1bmN0aW9uKGUpe3JldHVybiBlLl9tY2dMYXllclN1cHBvcnRHcm91cD9lLl9tY2dMYXllclN1cHBvcnRHcm91cC5fb3JpZ2luYWxSZW1vdmVMYXllcihlKTp0aGlzLl9vcmlnaW5hbFJlbW92ZUxheWVyKGUpfX07ZS5tYXJrZXJDbHVzdGVyR3JvdXAubGF5ZXJTdXBwb3J0PWZ1bmN0aW9uKHIpe3JldHVybiBuZXcgZS5NYXJrZXJDbHVzdGVyR3JvdXAuTGF5ZXJTdXBwb3J0KHIpfX0pOyIsIi8qXG4gKiBMZWFmbGV0Lm1hcmtlcmNsdXN0ZXIgMS40LjErbWFzdGVyLjk0Zjk4MTUsXG4gKiBQcm92aWRlcyBCZWF1dGlmdWwgQW5pbWF0ZWQgTWFya2VyIENsdXN0ZXJpbmcgZnVuY3Rpb25hbGl0eSBmb3IgTGVhZmxldCwgYSBKUyBsaWJyYXJ5IGZvciBpbnRlcmFjdGl2ZSBtYXBzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL0xlYWZsZXQvTGVhZmxldC5tYXJrZXJjbHVzdGVyXG4gKiAoYykgMjAxMi0yMDE3LCBEYXZlIExlYXZlciwgc21hcnRyYWtcbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLkxlYWZsZXQgPSBnbG9iYWwuTGVhZmxldCB8fCB7fSwgZ2xvYmFsLkxlYWZsZXQubWFya2VyY2x1c3RlciA9IGdsb2JhbC5MZWFmbGV0Lm1hcmtlcmNsdXN0ZXIgfHwge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbi8qXHJcbiAqIEwuTWFya2VyQ2x1c3Rlckdyb3VwIGV4dGVuZHMgTC5GZWF0dXJlR3JvdXAgYnkgY2x1c3RlcmluZyB0aGUgbWFya2VycyBjb250YWluZWQgd2l0aGluXHJcbiAqL1xyXG5cclxudmFyIE1hcmtlckNsdXN0ZXJHcm91cCA9IEwuTWFya2VyQ2x1c3Rlckdyb3VwID0gTC5GZWF0dXJlR3JvdXAuZXh0ZW5kKHtcclxuXHJcblx0b3B0aW9uczoge1xyXG5cdFx0bWF4Q2x1c3RlclJhZGl1czogODAsIC8vQSBjbHVzdGVyIHdpbGwgY292ZXIgYXQgbW9zdCB0aGlzIG1hbnkgcGl4ZWxzIGZyb20gaXRzIGNlbnRlclxyXG5cdFx0aWNvbkNyZWF0ZUZ1bmN0aW9uOiBudWxsLFxyXG5cdFx0Y2x1c3RlclBhbmU6IEwuTWFya2VyLnByb3RvdHlwZS5vcHRpb25zLnBhbmUsXHJcblxyXG5cdFx0c3BpZGVyZnlPbk1heFpvb206IHRydWUsXHJcblx0XHRzaG93Q292ZXJhZ2VPbkhvdmVyOiB0cnVlLFxyXG5cdFx0em9vbVRvQm91bmRzT25DbGljazogdHJ1ZSxcclxuXHRcdHNpbmdsZU1hcmtlck1vZGU6IGZhbHNlLFxyXG5cclxuXHRcdGRpc2FibGVDbHVzdGVyaW5nQXRab29tOiBudWxsLFxyXG5cclxuXHRcdC8vIFNldHRpbmcgdGhpcyB0byBmYWxzZSBwcmV2ZW50cyB0aGUgcmVtb3ZhbCBvZiBhbnkgY2x1c3RlcnMgb3V0c2lkZSBvZiB0aGUgdmlld3BvaW50LCB3aGljaFxyXG5cdFx0Ly8gaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIGZvciBwZXJmb3JtYW5jZSByZWFzb25zLlxyXG5cdFx0cmVtb3ZlT3V0c2lkZVZpc2libGVCb3VuZHM6IHRydWUsXHJcblxyXG5cdFx0Ly8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgYWxsIGFuaW1hdGlvbnMgKHpvb20gYW5kIHNwaWRlcmZ5KS5cclxuXHRcdC8vIElmIGZhbHNlLCBvcHRpb24gYW5pbWF0ZUFkZGluZ01hcmtlcnMgYmVsb3cgaGFzIG5vIGVmZmVjdC5cclxuXHRcdC8vIElmIEwuRG9tVXRpbC5UUkFOU0lUSU9OIGlzIGZhbHN5LCB0aGlzIG9wdGlvbiBoYXMgbm8gZWZmZWN0LlxyXG5cdFx0YW5pbWF0ZTogdHJ1ZSxcclxuXHJcblx0XHQvL1doZXRoZXIgdG8gYW5pbWF0ZSBhZGRpbmcgbWFya2VycyBhZnRlciBhZGRpbmcgdGhlIE1hcmtlckNsdXN0ZXJHcm91cCB0byB0aGUgbWFwXHJcblx0XHQvLyBJZiB5b3UgYXJlIGFkZGluZyBpbmRpdmlkdWFsIG1hcmtlcnMgc2V0IHRvIHRydWUsIGlmIGFkZGluZyBidWxrIG1hcmtlcnMgbGVhdmUgZmFsc2UgZm9yIG1hc3NpdmUgcGVyZm9ybWFuY2UgZ2FpbnMuXHJcblx0XHRhbmltYXRlQWRkaW5nTWFya2VyczogZmFsc2UsXHJcblxyXG5cdFx0Ly9JbmNyZWFzZSB0byBpbmNyZWFzZSB0aGUgZGlzdGFuY2UgYXdheSB0aGF0IHNwaWRlcmZpZWQgbWFya2VycyBhcHBlYXIgZnJvbSB0aGUgY2VudGVyXHJcblx0XHRzcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllcjogMSxcclxuXHJcblx0XHQvLyBNYWtlIGl0IHBvc3NpYmxlIHRvIHNwZWNpZnkgYSBwb2x5bGluZSBvcHRpb25zIG9uIGEgc3BpZGVyIGxlZ1xyXG5cdFx0c3BpZGVyTGVnUG9seWxpbmVPcHRpb25zOiB7IHdlaWdodDogMS41LCBjb2xvcjogJyMyMjInLCBvcGFjaXR5OiAwLjUgfSxcclxuXHJcblx0XHQvLyBXaGVuIGJ1bGsgYWRkaW5nIGxheWVycywgYWRkcyBtYXJrZXJzIGluIGNodW5rcy4gTWVhbnMgYWRkTGF5ZXJzIG1heSBub3QgYWRkIGFsbCB0aGUgbGF5ZXJzIGluIHRoZSBjYWxsLCBvdGhlcnMgd2lsbCBiZSBsb2FkZWQgZHVyaW5nIHNldFRpbWVvdXRzXHJcblx0XHRjaHVua2VkTG9hZGluZzogZmFsc2UsXHJcblx0XHRjaHVua0ludGVydmFsOiAyMDAsIC8vIHByb2Nlc3MgbWFya2VycyBmb3IgYSBtYXhpbXVtIG9mIH4gbiBtaWxsaXNlY29uZHMgKHRoZW4gdHJpZ2dlciB0aGUgY2h1bmtQcm9ncmVzcyBjYWxsYmFjaylcclxuXHRcdGNodW5rRGVsYXk6IDUwLCAvLyBhdCB0aGUgZW5kIG9mIGVhY2ggaW50ZXJ2YWwsIGdpdmUgbiBtaWxsaXNlY29uZHMgYmFjayB0byBzeXN0ZW0vYnJvd3NlclxyXG5cdFx0Y2h1bmtQcm9ncmVzczogbnVsbCwgLy8gcHJvZ3Jlc3MgY2FsbGJhY2s6IGZ1bmN0aW9uKHByb2Nlc3NlZCwgdG90YWwsIGVsYXBzZWQpIChlLmcuIGZvciBhIHByb2dyZXNzIGluZGljYXRvcilcclxuXHJcblx0XHQvL09wdGlvbnMgdG8gcGFzcyB0byB0aGUgTC5Qb2x5Z29uIGNvbnN0cnVjdG9yXHJcblx0XHRwb2x5Z29uT3B0aW9uczoge31cclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0TC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblx0XHRpZiAoIXRoaXMub3B0aW9ucy5pY29uQ3JlYXRlRnVuY3Rpb24pIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zLmljb25DcmVhdGVGdW5jdGlvbiA9IHRoaXMuX2RlZmF1bHRJY29uQ3JlYXRlRnVuY3Rpb247XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZmVhdHVyZUdyb3VwID0gTC5mZWF0dXJlR3JvdXAoKTtcclxuXHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5hZGRFdmVudFBhcmVudCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9ub25Qb2ludEdyb3VwID0gTC5mZWF0dXJlR3JvdXAoKTtcclxuXHRcdHRoaXMuX25vblBvaW50R3JvdXAuYWRkRXZlbnRQYXJlbnQodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5faW5ab29tQW5pbWF0aW9uID0gMDtcclxuXHRcdHRoaXMuX25lZWRzQ2x1c3RlcmluZyA9IFtdO1xyXG5cdFx0dGhpcy5fbmVlZHNSZW1vdmluZyA9IFtdOyAvL01hcmtlcnMgcmVtb3ZlZCB3aGlsZSB3ZSBhcmVuJ3Qgb24gdGhlIG1hcCBuZWVkIHRvIGJlIGtlcHQgdHJhY2sgb2ZcclxuXHRcdC8vVGhlIGJvdW5kcyBvZiB0aGUgY3VycmVudGx5IHNob3duIGFyZWEgKGZyb20gX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcykgVXBkYXRlZCBvbiB6b29tL21vdmVcclxuXHRcdHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcyA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5fcXVldWUgPSBbXTtcclxuXHJcblx0XHR0aGlzLl9jaGlsZE1hcmtlckV2ZW50SGFuZGxlcnMgPSB7XHJcblx0XHRcdCdkcmFnc3RhcnQnOiB0aGlzLl9jaGlsZE1hcmtlckRyYWdTdGFydCxcclxuXHRcdFx0J21vdmUnOiB0aGlzLl9jaGlsZE1hcmtlck1vdmVkLFxyXG5cdFx0XHQnZHJhZ2VuZCc6IHRoaXMuX2NoaWxkTWFya2VyRHJhZ0VuZCxcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gSG9vayB0aGUgYXBwcm9wcmlhdGUgYW5pbWF0aW9uIG1ldGhvZHMuXHJcblx0XHR2YXIgYW5pbWF0ZSA9IEwuRG9tVXRpbC5UUkFOU0lUSU9OICYmIHRoaXMub3B0aW9ucy5hbmltYXRlO1xyXG5cdFx0TC5leHRlbmQodGhpcywgYW5pbWF0ZSA/IHRoaXMuX3dpdGhBbmltYXRpb24gOiB0aGlzLl9ub0FuaW1hdGlvbik7XHJcblx0XHQvLyBSZW1lbWJlciB3aGljaCBNYXJrZXJDbHVzdGVyIGNsYXNzIHRvIGluc3RhbnRpYXRlIChhbmltYXRlZCBvciBub3QpLlxyXG5cdFx0dGhpcy5fbWFya2VyQ2x1c3RlciA9IGFuaW1hdGUgPyBMLk1hcmtlckNsdXN0ZXIgOiBMLk1hcmtlckNsdXN0ZXJOb25BbmltYXRlZDtcclxuXHR9LFxyXG5cclxuXHRhZGRMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblxyXG5cdFx0aWYgKGxheWVyIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmFkZExheWVycyhbbGF5ZXJdKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL0Rvbid0IGNsdXN0ZXIgbm9uIHBvaW50IGRhdGFcclxuXHRcdGlmICghbGF5ZXIuZ2V0TGF0TG5nKSB7XHJcblx0XHRcdHRoaXMuX25vblBvaW50R3JvdXAuYWRkTGF5ZXIobGF5ZXIpO1xyXG5cdFx0XHR0aGlzLmZpcmUoJ2xheWVyYWRkJywgeyBsYXllcjogbGF5ZXIgfSk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX25lZWRzQ2x1c3RlcmluZy5wdXNoKGxheWVyKTtcclxuXHRcdFx0dGhpcy5maXJlKCdsYXllcmFkZCcsIHsgbGF5ZXI6IGxheWVyIH0pO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5oYXNMYXllcihsYXllcikpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vSWYgd2UgaGF2ZSBhbHJlYWR5IGNsdXN0ZXJlZCB3ZSdsbCBuZWVkIHRvIGFkZCB0aGlzIG9uZSB0byBhIGNsdXN0ZXJcclxuXHJcblx0XHRpZiAodGhpcy5fdW5zcGlkZXJmeSkge1xyXG5cdFx0XHR0aGlzLl91bnNwaWRlcmZ5KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fYWRkTGF5ZXIobGF5ZXIsIHRoaXMuX21heFpvb20pO1xyXG5cdFx0dGhpcy5maXJlKCdsYXllcmFkZCcsIHsgbGF5ZXI6IGxheWVyIH0pO1xyXG5cclxuXHRcdC8vIFJlZnJlc2ggYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbnMuXHJcblx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY2FsY3VsYXRlQm91bmRzKCk7XHJcblxyXG5cdFx0dGhpcy5fcmVmcmVzaENsdXN0ZXJzSWNvbnMoKTtcclxuXHJcblx0XHQvL1dvcmsgb3V0IHdoYXQgaXMgdmlzaWJsZVxyXG5cdFx0dmFyIHZpc2libGVMYXllciA9IGxheWVyLFxyXG5cdFx0ICAgIGN1cnJlbnRab29tID0gdGhpcy5fem9vbTtcclxuXHRcdGlmIChsYXllci5fX3BhcmVudCkge1xyXG5cdFx0XHR3aGlsZSAodmlzaWJsZUxheWVyLl9fcGFyZW50Ll96b29tID49IGN1cnJlbnRab29tKSB7XHJcblx0XHRcdFx0dmlzaWJsZUxheWVyID0gdmlzaWJsZUxheWVyLl9fcGFyZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcy5jb250YWlucyh2aXNpYmxlTGF5ZXIuZ2V0TGF0TG5nKCkpKSB7XHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0ZUFkZGluZ01hcmtlcnMpIHtcclxuXHRcdFx0XHR0aGlzLl9hbmltYXRpb25BZGRMYXllcihsYXllciwgdmlzaWJsZUxheWVyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLl9hbmltYXRpb25BZGRMYXllck5vbkFuaW1hdGVkKGxheWVyLCB2aXNpYmxlTGF5ZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblxyXG5cdFx0aWYgKGxheWVyIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnJlbW92ZUxheWVycyhbbGF5ZXJdKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL05vbiBwb2ludCBsYXllcnNcclxuXHRcdGlmICghbGF5ZXIuZ2V0TGF0TG5nKSB7XHJcblx0XHRcdHRoaXMuX25vblBvaW50R3JvdXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xyXG5cdFx0XHR0aGlzLmZpcmUoJ2xheWVycmVtb3ZlJywgeyBsYXllcjogbGF5ZXIgfSk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5fbWFwKSB7XHJcblx0XHRcdGlmICghdGhpcy5fYXJyYXlTcGxpY2UodGhpcy5fbmVlZHNDbHVzdGVyaW5nLCBsYXllcikgJiYgdGhpcy5oYXNMYXllcihsYXllcikpIHtcclxuXHRcdFx0XHR0aGlzLl9uZWVkc1JlbW92aW5nLnB1c2goeyBsYXllcjogbGF5ZXIsIGxhdGxuZzogbGF5ZXIuX2xhdGxuZyB9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmZpcmUoJ2xheWVycmVtb3ZlJywgeyBsYXllcjogbGF5ZXIgfSk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghbGF5ZXIuX19wYXJlbnQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX3Vuc3BpZGVyZnkpIHtcclxuXHRcdFx0dGhpcy5fdW5zcGlkZXJmeSgpO1xyXG5cdFx0XHR0aGlzLl91bnNwaWRlcmZ5TGF5ZXIobGF5ZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vUmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSBjbHVzdGVyc1xyXG5cdFx0dGhpcy5fcmVtb3ZlTGF5ZXIobGF5ZXIsIHRydWUpO1xyXG5cdFx0dGhpcy5maXJlKCdsYXllcnJlbW92ZScsIHsgbGF5ZXI6IGxheWVyIH0pO1xyXG5cclxuXHRcdC8vIFJlZnJlc2ggYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbnMuXHJcblx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY2FsY3VsYXRlQm91bmRzKCk7XHJcblxyXG5cdFx0dGhpcy5fcmVmcmVzaENsdXN0ZXJzSWNvbnMoKTtcclxuXHJcblx0XHRsYXllci5vZmYodGhpcy5fY2hpbGRNYXJrZXJFdmVudEhhbmRsZXJzLCB0aGlzKTtcclxuXHJcblx0XHRpZiAodGhpcy5fZmVhdHVyZUdyb3VwLmhhc0xheWVyKGxheWVyKSkge1xyXG5cdFx0XHR0aGlzLl9mZWF0dXJlR3JvdXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xyXG5cdFx0XHRpZiAobGF5ZXIuY2x1c3RlclNob3cpIHtcclxuXHRcdFx0XHRsYXllci5jbHVzdGVyU2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Ly9UYWtlcyBhbiBhcnJheSBvZiBtYXJrZXJzIGFuZCBhZGRzIHRoZW0gaW4gYnVsa1xyXG5cdGFkZExheWVyczogZnVuY3Rpb24gKGxheWVyc0FycmF5LCBza2lwTGF5ZXJBZGRFdmVudCkge1xyXG5cdFx0aWYgKCFMLlV0aWwuaXNBcnJheShsYXllcnNBcnJheSkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWRkTGF5ZXIobGF5ZXJzQXJyYXkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBmZyA9IHRoaXMuX2ZlYXR1cmVHcm91cCxcclxuXHRcdCAgICBucGcgPSB0aGlzLl9ub25Qb2ludEdyb3VwLFxyXG5cdFx0ICAgIGNodW5rZWQgPSB0aGlzLm9wdGlvbnMuY2h1bmtlZExvYWRpbmcsXHJcblx0XHQgICAgY2h1bmtJbnRlcnZhbCA9IHRoaXMub3B0aW9ucy5jaHVua0ludGVydmFsLFxyXG5cdFx0ICAgIGNodW5rUHJvZ3Jlc3MgPSB0aGlzLm9wdGlvbnMuY2h1bmtQcm9ncmVzcyxcclxuXHRcdCAgICBsID0gbGF5ZXJzQXJyYXkubGVuZ3RoLFxyXG5cdFx0ICAgIG9mZnNldCA9IDAsXHJcblx0XHQgICAgb3JpZ2luYWxBcnJheSA9IHRydWUsXHJcblx0XHQgICAgbTtcclxuXHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHZhciBzdGFydGVkID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuXHRcdFx0dmFyIHByb2Nlc3MgPSBMLmJpbmQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBzdGFydCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcblx0XHRcdFx0Zm9yICg7IG9mZnNldCA8IGw7IG9mZnNldCsrKSB7XHJcblx0XHRcdFx0XHRpZiAoY2h1bmtlZCAmJiBvZmZzZXQgJSAyMDAgPT09IDApIHtcclxuXHRcdFx0XHRcdFx0Ly8gZXZlcnkgY291cGxlIGh1bmRyZWQgbWFya2VycywgaW5zdHJ1bWVudCB0aGUgdGltZSBlbGFwc2VkIHNpbmNlIHByb2Nlc3Npbmcgc3RhcnRlZDpcclxuXHRcdFx0XHRcdFx0dmFyIGVsYXBzZWQgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpIC0gc3RhcnQ7XHJcblx0XHRcdFx0XHRcdGlmIChlbGFwc2VkID4gY2h1bmtJbnRlcnZhbCkge1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrOyAvLyBiZWVuIHdvcmtpbmcgdG9vIGhhcmQsIHRpbWUgdG8gdGFrZSBhIGJyZWFrIDotKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0bSA9IGxheWVyc0FycmF5W29mZnNldF07XHJcblxyXG5cdFx0XHRcdFx0Ly8gR3JvdXAgb2YgbGF5ZXJzLCBhcHBlbmQgY2hpbGRyZW4gdG8gbGF5ZXJzQXJyYXkgYW5kIHNraXAuXHJcblx0XHRcdFx0XHQvLyBTaWRlIGVmZmVjdHM6XHJcblx0XHRcdFx0XHQvLyAtIFRvdGFsIGluY3JlYXNlcywgc28gY2h1bmtQcm9ncmVzcyByYXRpbyBqdW1wcyBiYWNrd2FyZC5cclxuXHRcdFx0XHRcdC8vIC0gR3JvdXBzIGFyZSBub3QgaW5jbHVkZWQgaW4gdGhpcyBncm91cCwgb25seSB0aGVpciBub24tZ3JvdXAgY2hpbGQgbGF5ZXJzIChoYXNMYXllcikuXHJcblx0XHRcdFx0XHQvLyBDaGFuZ2luZyBhcnJheSBsZW5ndGggd2hpbGUgbG9vcGluZyBkb2VzIG5vdCBhZmZlY3QgcGVyZm9ybWFuY2UgaW4gY3VycmVudCBicm93c2VyczpcclxuXHRcdFx0XHRcdC8vIGh0dHA6Ly9qc3BlcmYuY29tL2Zvci1sb29wLWNoYW5naW5nLWxlbmd0aC82XHJcblx0XHRcdFx0XHRpZiAobSBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xyXG5cdFx0XHRcdFx0XHRpZiAob3JpZ2luYWxBcnJheSkge1xyXG5cdFx0XHRcdFx0XHRcdGxheWVyc0FycmF5ID0gbGF5ZXJzQXJyYXkuc2xpY2UoKTtcclxuXHRcdFx0XHRcdFx0XHRvcmlnaW5hbEFycmF5ID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dGhpcy5fZXh0cmFjdE5vbkdyb3VwTGF5ZXJzKG0sIGxheWVyc0FycmF5KTtcclxuXHRcdFx0XHRcdFx0bCA9IGxheWVyc0FycmF5Lmxlbmd0aDtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly9Ob3QgcG9pbnQgZGF0YSwgY2FuJ3QgYmUgY2x1c3RlcmVkXHJcblx0XHRcdFx0XHRpZiAoIW0uZ2V0TGF0TG5nKSB7XHJcblx0XHRcdFx0XHRcdG5wZy5hZGRMYXllcihtKTtcclxuXHRcdFx0XHRcdFx0aWYgKCFza2lwTGF5ZXJBZGRFdmVudCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJhZGQnLCB7IGxheWVyOiBtIH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLmhhc0xheWVyKG0pKSB7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuX2FkZExheWVyKG0sIHRoaXMuX21heFpvb20pO1xyXG5cdFx0XHRcdFx0aWYgKCFza2lwTGF5ZXJBZGRFdmVudCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpcmUoJ2xheWVyYWRkJywgeyBsYXllcjogbSB9KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvL0lmIHdlIGp1c3QgbWFkZSBhIGNsdXN0ZXIgb2Ygc2l6ZSAyIHRoZW4gd2UgbmVlZCB0byByZW1vdmUgdGhlIG90aGVyIG1hcmtlciBmcm9tIHRoZSBtYXAgKGlmIGl0IGlzKSBvciB3ZSBuZXZlciB3aWxsXHJcblx0XHRcdFx0XHRpZiAobS5fX3BhcmVudCkge1xyXG5cdFx0XHRcdFx0XHRpZiAobS5fX3BhcmVudC5nZXRDaGlsZENvdW50KCkgPT09IDIpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgbWFya2VycyA9IG0uX19wYXJlbnQuZ2V0QWxsQ2hpbGRNYXJrZXJzKCksXHJcblx0XHRcdFx0XHRcdFx0ICAgIG90aGVyTWFya2VyID0gbWFya2Vyc1swXSA9PT0gbSA/IG1hcmtlcnNbMV0gOiBtYXJrZXJzWzBdO1xyXG5cdFx0XHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKG90aGVyTWFya2VyKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGNodW5rUHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHRcdC8vIHJlcG9ydCBwcm9ncmVzcyBhbmQgdGltZSBlbGFwc2VkOlxyXG5cdFx0XHRcdFx0Y2h1bmtQcm9ncmVzcyhvZmZzZXQsIGwsIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLSBzdGFydGVkKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIENvbXBsZXRlZCBwcm9jZXNzaW5nIGFsbCBtYXJrZXJzLlxyXG5cdFx0XHRcdGlmIChvZmZzZXQgPT09IGwpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBSZWZyZXNoIGJvdW5kcyBhbmQgd2VpZ2h0ZWQgcG9zaXRpb25zLlxyXG5cdFx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWNhbGN1bGF0ZUJvdW5kcygpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3JlZnJlc2hDbHVzdGVyc0ljb25zKCk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseUFkZENoaWxkcmVuVG9NYXAobnVsbCwgdGhpcy5fem9vbSwgdGhpcy5fY3VycmVudFNob3duQm91bmRzKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChwcm9jZXNzLCB0aGlzLm9wdGlvbnMuY2h1bmtEZWxheSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHRcdHByb2Nlc3MoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBuZWVkc0NsdXN0ZXJpbmcgPSB0aGlzLl9uZWVkc0NsdXN0ZXJpbmc7XHJcblxyXG5cdFx0XHRmb3IgKDsgb2Zmc2V0IDwgbDsgb2Zmc2V0KyspIHtcclxuXHRcdFx0XHRtID0gbGF5ZXJzQXJyYXlbb2Zmc2V0XTtcclxuXHJcblx0XHRcdFx0Ly8gR3JvdXAgb2YgbGF5ZXJzLCBhcHBlbmQgY2hpbGRyZW4gdG8gbGF5ZXJzQXJyYXkgYW5kIHNraXAuXHJcblx0XHRcdFx0aWYgKG0gaW5zdGFuY2VvZiBMLkxheWVyR3JvdXApIHtcclxuXHRcdFx0XHRcdGlmIChvcmlnaW5hbEFycmF5KSB7XHJcblx0XHRcdFx0XHRcdGxheWVyc0FycmF5ID0gbGF5ZXJzQXJyYXkuc2xpY2UoKTtcclxuXHRcdFx0XHRcdFx0b3JpZ2luYWxBcnJheSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5fZXh0cmFjdE5vbkdyb3VwTGF5ZXJzKG0sIGxheWVyc0FycmF5KTtcclxuXHRcdFx0XHRcdGwgPSBsYXllcnNBcnJheS5sZW5ndGg7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vTm90IHBvaW50IGRhdGEsIGNhbid0IGJlIGNsdXN0ZXJlZFxyXG5cdFx0XHRcdGlmICghbS5nZXRMYXRMbmcpIHtcclxuXHRcdFx0XHRcdG5wZy5hZGRMYXllcihtKTtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuaGFzTGF5ZXIobSkpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bmVlZHNDbHVzdGVyaW5nLnB1c2gobSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdC8vVGFrZXMgYW4gYXJyYXkgb2YgbWFya2VycyBhbmQgcmVtb3ZlcyB0aGVtIGluIGJ1bGtcclxuXHRyZW1vdmVMYXllcnM6IGZ1bmN0aW9uIChsYXllcnNBcnJheSkge1xyXG5cdFx0dmFyIGksIG0sXHJcblx0XHQgICAgbCA9IGxheWVyc0FycmF5Lmxlbmd0aCxcclxuXHRcdCAgICBmZyA9IHRoaXMuX2ZlYXR1cmVHcm91cCxcclxuXHRcdCAgICBucGcgPSB0aGlzLl9ub25Qb2ludEdyb3VwLFxyXG5cdFx0ICAgIG9yaWdpbmFsQXJyYXkgPSB0cnVlO1xyXG5cclxuXHRcdGlmICghdGhpcy5fbWFwKSB7XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0XHRtID0gbGF5ZXJzQXJyYXlbaV07XHJcblxyXG5cdFx0XHRcdC8vIEdyb3VwIG9mIGxheWVycywgYXBwZW5kIGNoaWxkcmVuIHRvIGxheWVyc0FycmF5IGFuZCBza2lwLlxyXG5cdFx0XHRcdGlmIChtIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XHJcblx0XHRcdFx0XHRpZiAob3JpZ2luYWxBcnJheSkge1xyXG5cdFx0XHRcdFx0XHRsYXllcnNBcnJheSA9IGxheWVyc0FycmF5LnNsaWNlKCk7XHJcblx0XHRcdFx0XHRcdG9yaWdpbmFsQXJyYXkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhtLCBsYXllcnNBcnJheSk7XHJcblx0XHRcdFx0XHRsID0gbGF5ZXJzQXJyYXkubGVuZ3RoO1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLl9hcnJheVNwbGljZSh0aGlzLl9uZWVkc0NsdXN0ZXJpbmcsIG0pO1xyXG5cdFx0XHRcdG5wZy5yZW1vdmVMYXllcihtKTtcclxuXHRcdFx0XHRpZiAodGhpcy5oYXNMYXllcihtKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fbmVlZHNSZW1vdmluZy5wdXNoKHsgbGF5ZXI6IG0sIGxhdGxuZzogbS5fbGF0bG5nIH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmZpcmUoJ2xheWVycmVtb3ZlJywgeyBsYXllcjogbSB9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fdW5zcGlkZXJmeSkge1xyXG5cdFx0XHR0aGlzLl91bnNwaWRlcmZ5KCk7XHJcblxyXG5cdFx0XHQvLyBXb3JrIG9uIGEgY29weSBvZiB0aGUgYXJyYXksIHNvIHRoYXQgbmV4dCBsb29wIGlzIG5vdCBhZmZlY3RlZC5cclxuXHRcdFx0dmFyIGxheWVyc0FycmF5MiA9IGxheWVyc0FycmF5LnNsaWNlKCksXHJcblx0XHRcdCAgICBsMiA9IGw7XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsMjsgaSsrKSB7XHJcblx0XHRcdFx0bSA9IGxheWVyc0FycmF5MltpXTtcclxuXHJcblx0XHRcdFx0Ly8gR3JvdXAgb2YgbGF5ZXJzLCBhcHBlbmQgY2hpbGRyZW4gdG8gbGF5ZXJzQXJyYXkgYW5kIHNraXAuXHJcblx0XHRcdFx0aWYgKG0gaW5zdGFuY2VvZiBMLkxheWVyR3JvdXApIHtcclxuXHRcdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhtLCBsYXllcnNBcnJheTIpO1xyXG5cdFx0XHRcdFx0bDIgPSBsYXllcnNBcnJheTIubGVuZ3RoO1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLl91bnNwaWRlcmZ5TGF5ZXIobSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRcdG0gPSBsYXllcnNBcnJheVtpXTtcclxuXHJcblx0XHRcdC8vIEdyb3VwIG9mIGxheWVycywgYXBwZW5kIGNoaWxkcmVuIHRvIGxheWVyc0FycmF5IGFuZCBza2lwLlxyXG5cdFx0XHRpZiAobSBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xyXG5cdFx0XHRcdGlmIChvcmlnaW5hbEFycmF5KSB7XHJcblx0XHRcdFx0XHRsYXllcnNBcnJheSA9IGxheWVyc0FycmF5LnNsaWNlKCk7XHJcblx0XHRcdFx0XHRvcmlnaW5hbEFycmF5ID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhtLCBsYXllcnNBcnJheSk7XHJcblx0XHRcdFx0bCA9IGxheWVyc0FycmF5Lmxlbmd0aDtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFtLl9fcGFyZW50KSB7XHJcblx0XHRcdFx0bnBnLnJlbW92ZUxheWVyKG0pO1xyXG5cdFx0XHRcdHRoaXMuZmlyZSgnbGF5ZXJyZW1vdmUnLCB7IGxheWVyOiBtIH0pO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9yZW1vdmVMYXllcihtLCB0cnVlLCB0cnVlKTtcclxuXHRcdFx0dGhpcy5maXJlKCdsYXllcnJlbW92ZScsIHsgbGF5ZXI6IG0gfSk7XHJcblxyXG5cdFx0XHRpZiAoZmcuaGFzTGF5ZXIobSkpIHtcclxuXHRcdFx0XHRmZy5yZW1vdmVMYXllcihtKTtcclxuXHRcdFx0XHRpZiAobS5jbHVzdGVyU2hvdykge1xyXG5cdFx0XHRcdFx0bS5jbHVzdGVyU2hvdygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlZnJlc2ggYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbnMuXHJcblx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY2FsY3VsYXRlQm91bmRzKCk7XHJcblxyXG5cdFx0dGhpcy5fcmVmcmVzaENsdXN0ZXJzSWNvbnMoKTtcclxuXHJcblx0XHQvL0ZpeCB1cCB0aGUgY2x1c3RlcnMgYW5kIG1hcmtlcnMgb24gdGhlIG1hcFxyXG5cdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseUFkZENoaWxkcmVuVG9NYXAobnVsbCwgdGhpcy5fem9vbSwgdGhpcy5fY3VycmVudFNob3duQm91bmRzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvL1JlbW92ZXMgYWxsIGxheWVycyBmcm9tIHRoZSBNYXJrZXJDbHVzdGVyR3JvdXBcclxuXHRjbGVhckxheWVyczogZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly9OZWVkIG91ciBvd24gc3BlY2lhbCBpbXBsZW1lbnRhdGlvbiBhcyB0aGUgTGF5ZXJHcm91cCBvbmUgZG9lc24ndCB3b3JrIGZvciB1c1xyXG5cclxuXHRcdC8vSWYgd2UgYXJlbid0IG9uIHRoZSBtYXAgKHlldCksIGJsb3cgYXdheSB0aGUgbWFya2VycyB3ZSBrbm93IG9mXHJcblx0XHRpZiAoIXRoaXMuX21hcCkge1xyXG5cdFx0XHR0aGlzLl9uZWVkc0NsdXN0ZXJpbmcgPSBbXTtcclxuXHRcdFx0dGhpcy5fbmVlZHNSZW1vdmluZyA9IFtdO1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fZ3JpZENsdXN0ZXJzO1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fZ3JpZFVuY2x1c3RlcmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9ub2FuaW1hdGlvblVuc3BpZGVyZnkpIHtcclxuXHRcdFx0dGhpcy5fbm9hbmltYXRpb25VbnNwaWRlcmZ5KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9SZW1vdmUgYWxsIHRoZSB2aXNpYmxlIGxheWVyc1xyXG5cdFx0dGhpcy5fZmVhdHVyZUdyb3VwLmNsZWFyTGF5ZXJzKCk7XHJcblx0XHR0aGlzLl9ub25Qb2ludEdyb3VwLmNsZWFyTGF5ZXJzKCk7XHJcblxyXG5cdFx0dGhpcy5lYWNoTGF5ZXIoZnVuY3Rpb24gKG1hcmtlcikge1xyXG5cdFx0XHRtYXJrZXIub2ZmKHRoaXMuX2NoaWxkTWFya2VyRXZlbnRIYW5kbGVycywgdGhpcyk7XHJcblx0XHRcdGRlbGV0ZSBtYXJrZXIuX19wYXJlbnQ7XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdC8vUmVzZXQgX3RvcENsdXN0ZXJMZXZlbCBhbmQgdGhlIERpc3RhbmNlR3JpZHNcclxuXHRcdFx0dGhpcy5fZ2VuZXJhdGVJbml0aWFsQ2x1c3RlcnMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvL092ZXJyaWRlIEZlYXR1cmVHcm91cC5nZXRCb3VuZHMgYXMgaXQgZG9lc24ndCB3b3JrXHJcblx0Z2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3RvcENsdXN0ZXJMZXZlbCkge1xyXG5cdFx0XHRib3VuZHMuZXh0ZW5kKHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fYm91bmRzKTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciBpID0gdGhpcy5fbmVlZHNDbHVzdGVyaW5nLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdGJvdW5kcy5leHRlbmQodGhpcy5fbmVlZHNDbHVzdGVyaW5nW2ldLmdldExhdExuZygpKTtcclxuXHRcdH1cclxuXHJcblx0XHRib3VuZHMuZXh0ZW5kKHRoaXMuX25vblBvaW50R3JvdXAuZ2V0Qm91bmRzKCkpO1xyXG5cclxuXHRcdHJldHVybiBib3VuZHM7XHJcblx0fSxcclxuXHJcblx0Ly9PdmVycmlkZXMgTGF5ZXJHcm91cC5lYWNoTGF5ZXJcclxuXHRlYWNoTGF5ZXI6IGZ1bmN0aW9uIChtZXRob2QsIGNvbnRleHQpIHtcclxuXHRcdHZhciBtYXJrZXJzID0gdGhpcy5fbmVlZHNDbHVzdGVyaW5nLnNsaWNlKCksXHJcblx0XHRcdG5lZWRzUmVtb3ZpbmcgPSB0aGlzLl9uZWVkc1JlbW92aW5nLFxyXG5cdFx0XHR0aGlzTmVlZHNSZW1vdmluZywgaSwgajtcclxuXHJcblx0XHRpZiAodGhpcy5fdG9wQ2x1c3RlckxldmVsKSB7XHJcblx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5nZXRBbGxDaGlsZE1hcmtlcnMobWFya2Vycyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChpID0gbWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHR0aGlzTmVlZHNSZW1vdmluZyA9IHRydWU7XHJcblxyXG5cdFx0XHRmb3IgKGogPSBuZWVkc1JlbW92aW5nLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcblx0XHRcdFx0aWYgKG5lZWRzUmVtb3Zpbmdbal0ubGF5ZXIgPT09IG1hcmtlcnNbaV0pIHtcclxuXHRcdFx0XHRcdHRoaXNOZWVkc1JlbW92aW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzTmVlZHNSZW1vdmluZykge1xyXG5cdFx0XHRcdG1ldGhvZC5jYWxsKGNvbnRleHQsIG1hcmtlcnNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fbm9uUG9pbnRHcm91cC5lYWNoTGF5ZXIobWV0aG9kLCBjb250ZXh0KTtcclxuXHR9LFxyXG5cclxuXHQvL092ZXJyaWRlcyBMYXllckdyb3VwLmdldExheWVyc1xyXG5cdGdldExheWVyczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGxheWVycyA9IFtdO1xyXG5cdFx0dGhpcy5lYWNoTGF5ZXIoZnVuY3Rpb24gKGwpIHtcclxuXHRcdFx0bGF5ZXJzLnB1c2gobCk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBsYXllcnM7XHJcblx0fSxcclxuXHJcblx0Ly9PdmVycmlkZXMgTGF5ZXJHcm91cC5nZXRMYXllciwgV0FSTklORzogUmVhbGx5IGJhZCBwZXJmb3JtYW5jZVxyXG5cdGdldExheWVyOiBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdHZhciByZXN1bHQgPSBudWxsO1xyXG5cclxuXHRcdGlkID0gcGFyc2VJbnQoaWQsIDEwKTtcclxuXHJcblx0XHR0aGlzLmVhY2hMYXllcihmdW5jdGlvbiAobCkge1xyXG5cdFx0XHRpZiAoTC5zdGFtcChsKSA9PT0gaWQpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBsO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH0sXHJcblxyXG5cdC8vUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBsYXllciBpcyBpbiB0aGlzIE1hcmtlckNsdXN0ZXJHcm91cFxyXG5cdGhhc0xheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdGlmICghbGF5ZXIpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBpLCBhbkFycmF5ID0gdGhpcy5fbmVlZHNDbHVzdGVyaW5nO1xyXG5cclxuXHRcdGZvciAoaSA9IGFuQXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0aWYgKGFuQXJyYXlbaV0gPT09IGxheWVyKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhbkFycmF5ID0gdGhpcy5fbmVlZHNSZW1vdmluZztcclxuXHRcdGZvciAoaSA9IGFuQXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0aWYgKGFuQXJyYXlbaV0ubGF5ZXIgPT09IGxheWVyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuICEhKGxheWVyLl9fcGFyZW50ICYmIGxheWVyLl9fcGFyZW50Ll9ncm91cCA9PT0gdGhpcykgfHwgdGhpcy5fbm9uUG9pbnRHcm91cC5oYXNMYXllcihsYXllcik7XHJcblx0fSxcclxuXHJcblx0Ly9ab29tIGRvd24gdG8gc2hvdyB0aGUgZ2l2ZW4gbGF5ZXIgKHNwaWRlcmZ5aW5nIGlmIG5lY2Vzc2FyeSkgdGhlbiBjYWxscyB0aGUgY2FsbGJhY2tcclxuXHR6b29tVG9TaG93TGF5ZXI6IGZ1bmN0aW9uIChsYXllciwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHNob3dNYXJrZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICgobGF5ZXIuX2ljb24gfHwgbGF5ZXIuX19wYXJlbnQuX2ljb24pICYmICF0aGlzLl9pblpvb21BbmltYXRpb24pIHtcclxuXHRcdFx0XHR0aGlzLl9tYXAub2ZmKCdtb3ZlZW5kJywgc2hvd01hcmtlciwgdGhpcyk7XHJcblx0XHRcdFx0dGhpcy5vZmYoJ2FuaW1hdGlvbmVuZCcsIHNob3dNYXJrZXIsIHRoaXMpO1xyXG5cclxuXHRcdFx0XHRpZiAobGF5ZXIuX2ljb24pIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChsYXllci5fX3BhcmVudC5faWNvbikge1xyXG5cdFx0XHRcdFx0dGhpcy5vbmNlKCdzcGlkZXJmaWVkJywgY2FsbGJhY2ssIHRoaXMpO1xyXG5cdFx0XHRcdFx0bGF5ZXIuX19wYXJlbnQuc3BpZGVyZnkoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKGxheWVyLl9pY29uICYmIHRoaXMuX21hcC5nZXRCb3VuZHMoKS5jb250YWlucyhsYXllci5nZXRMYXRMbmcoKSkpIHtcclxuXHRcdFx0Ly9MYXllciBpcyB2aXNpYmxlIG9uZCBvbiBzY3JlZW4sIGltbWVkaWF0ZSByZXR1cm5cclxuXHRcdFx0Y2FsbGJhY2soKTtcclxuXHRcdH0gZWxzZSBpZiAobGF5ZXIuX19wYXJlbnQuX3pvb20gPCBNYXRoLnJvdW5kKHRoaXMuX21hcC5fem9vbSkpIHtcclxuXHRcdFx0Ly9MYXllciBzaG91bGQgYmUgdmlzaWJsZSBhdCB0aGlzIHpvb20gbGV2ZWwuIEl0IG11c3Qgbm90IGJlIG9uIHNjcmVlbiBzbyBqdXN0IHBhbiBvdmVyIHRvIGl0XHJcblx0XHRcdHRoaXMuX21hcC5vbignbW92ZWVuZCcsIHNob3dNYXJrZXIsIHRoaXMpO1xyXG5cdFx0XHR0aGlzLl9tYXAucGFuVG8obGF5ZXIuZ2V0TGF0TG5nKCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fbWFwLm9uKCdtb3ZlZW5kJywgc2hvd01hcmtlciwgdGhpcyk7XHJcblx0XHRcdHRoaXMub24oJ2FuaW1hdGlvbmVuZCcsIHNob3dNYXJrZXIsIHRoaXMpO1xyXG5cdFx0XHRsYXllci5fX3BhcmVudC56b29tVG9Cb3VuZHMoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvL092ZXJyaWRlcyBGZWF0dXJlR3JvdXAub25BZGRcclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5fbWFwID0gbWFwO1xyXG5cdFx0dmFyIGksIGwsIGxheWVyO1xyXG5cclxuXHRcdGlmICghaXNGaW5pdGUodGhpcy5fbWFwLmdldE1heFpvb20oKSkpIHtcclxuXHRcdFx0dGhyb3cgXCJNYXAgaGFzIG5vIG1heFpvb20gc3BlY2lmaWVkXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZmVhdHVyZUdyb3VwLmFkZFRvKG1hcCk7XHJcblx0XHR0aGlzLl9ub25Qb2ludEdyb3VwLmFkZFRvKG1hcCk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9ncmlkQ2x1c3RlcnMpIHtcclxuXHRcdFx0dGhpcy5fZ2VuZXJhdGVJbml0aWFsQ2x1c3RlcnMoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9tYXhMYXQgPSBtYXAub3B0aW9ucy5jcnMucHJvamVjdGlvbi5NQVhfTEFUSVRVREU7XHJcblxyXG5cdFx0Ly9SZXN0b3JlIGFsbCB0aGUgcG9zaXRpb25zIGFzIHRoZXkgYXJlIGluIHRoZSBNQ0cgYmVmb3JlIHJlbW92aW5nIHRoZW1cclxuXHRcdGZvciAoaSA9IDAsIGwgPSB0aGlzLl9uZWVkc1JlbW92aW5nLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG5cdFx0XHRsYXllciA9IHRoaXMuX25lZWRzUmVtb3ZpbmdbaV07XHJcblx0XHRcdGxheWVyLm5ld2xhdGxuZyA9IGxheWVyLmxheWVyLl9sYXRsbmc7XHJcblx0XHRcdGxheWVyLmxheWVyLl9sYXRsbmcgPSBsYXllci5sYXRsbmc7XHJcblx0XHR9XHJcblx0XHQvL1JlbW92ZSB0aGVtLCB0aGVuIHJlc3RvcmUgdGhlaXIgbmV3IHBvc2l0aW9uc1xyXG5cdFx0Zm9yIChpID0gMCwgbCA9IHRoaXMuX25lZWRzUmVtb3ZpbmcubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRcdGxheWVyID0gdGhpcy5fbmVlZHNSZW1vdmluZ1tpXTtcclxuXHRcdFx0dGhpcy5fcmVtb3ZlTGF5ZXIobGF5ZXIubGF5ZXIsIHRydWUpO1xyXG5cdFx0XHRsYXllci5sYXllci5fbGF0bG5nID0gbGF5ZXIubmV3bGF0bG5nO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fbmVlZHNSZW1vdmluZyA9IFtdO1xyXG5cclxuXHRcdC8vUmVtZW1iZXIgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBhbmQgYm91bmRzXHJcblx0XHR0aGlzLl96b29tID0gTWF0aC5yb3VuZCh0aGlzLl9tYXAuX3pvb20pO1xyXG5cdFx0dGhpcy5fY3VycmVudFNob3duQm91bmRzID0gdGhpcy5fZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzKCk7XHJcblxyXG5cdFx0dGhpcy5fbWFwLm9uKCd6b29tZW5kJywgdGhpcy5fem9vbUVuZCwgdGhpcyk7XHJcblx0XHR0aGlzLl9tYXAub24oJ21vdmVlbmQnLCB0aGlzLl9tb3ZlRW5kLCB0aGlzKTtcclxuXHJcblx0XHRpZiAodGhpcy5fc3BpZGVyZmllck9uQWRkKSB7IC8vVE9ETyBGSVhNRTogTm90IHN1cmUgaG93IHRvIGhhdmUgc3BpZGVyZmllciBhZGQgc29tZXRoaW5nIG9uIGhlcmUgbmljZWx5XHJcblx0XHRcdHRoaXMuX3NwaWRlcmZpZXJPbkFkZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2JpbmRFdmVudHMoKTtcclxuXHJcblx0XHQvL0FjdHVhbGx5IGFkZCBvdXIgbWFya2VycyB0byB0aGUgbWFwOlxyXG5cdFx0bCA9IHRoaXMuX25lZWRzQ2x1c3RlcmluZztcclxuXHRcdHRoaXMuX25lZWRzQ2x1c3RlcmluZyA9IFtdO1xyXG5cdFx0dGhpcy5hZGRMYXllcnMobCwgdHJ1ZSk7XHJcblx0fSxcclxuXHJcblx0Ly9PdmVycmlkZXMgRmVhdHVyZUdyb3VwLm9uUmVtb3ZlXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcC5vZmYoJ3pvb21lbmQnLCB0aGlzLl96b29tRW5kLCB0aGlzKTtcclxuXHRcdG1hcC5vZmYoJ21vdmVlbmQnLCB0aGlzLl9tb3ZlRW5kLCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLl91bmJpbmRFdmVudHMoKTtcclxuXHJcblx0XHQvL0luIGNhc2Ugd2UgYXJlIGluIGEgY2x1c3RlciBhbmltYXRpb25cclxuXHRcdHRoaXMuX21hcC5fbWFwUGFuZS5jbGFzc05hbWUgPSB0aGlzLl9tYXAuX21hcFBhbmUuY2xhc3NOYW1lLnJlcGxhY2UoJyBsZWFmbGV0LWNsdXN0ZXItYW5pbScsICcnKTtcclxuXHJcblx0XHRpZiAodGhpcy5fc3BpZGVyZmllck9uUmVtb3ZlKSB7IC8vVE9ETyBGSVhNRTogTm90IHN1cmUgaG93IHRvIGhhdmUgc3BpZGVyZmllciBhZGQgc29tZXRoaW5nIG9uIGhlcmUgbmljZWx5XHJcblx0XHRcdHRoaXMuX3NwaWRlcmZpZXJPblJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlbGV0ZSB0aGlzLl9tYXhMYXQ7XHJcblxyXG5cdFx0Ly9DbGVhbiB1cCBhbGwgdGhlIGxheWVycyB3ZSBhZGRlZCB0byB0aGUgbWFwXHJcblx0XHR0aGlzLl9oaWRlQ292ZXJhZ2UoKTtcclxuXHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5yZW1vdmUoKTtcclxuXHRcdHRoaXMuX25vblBvaW50R3JvdXAucmVtb3ZlKCk7XHJcblxyXG5cdFx0dGhpcy5fZmVhdHVyZUdyb3VwLmNsZWFyTGF5ZXJzKCk7XHJcblxyXG5cdFx0dGhpcy5fbWFwID0gbnVsbDtcclxuXHR9LFxyXG5cclxuXHRnZXRWaXNpYmxlUGFyZW50OiBmdW5jdGlvbiAobWFya2VyKSB7XHJcblx0XHR2YXIgdk1hcmtlciA9IG1hcmtlcjtcclxuXHRcdHdoaWxlICh2TWFya2VyICYmICF2TWFya2VyLl9pY29uKSB7XHJcblx0XHRcdHZNYXJrZXIgPSB2TWFya2VyLl9fcGFyZW50O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZNYXJrZXIgfHwgbnVsbDtcclxuXHR9LFxyXG5cclxuXHQvL1JlbW92ZSB0aGUgZ2l2ZW4gb2JqZWN0IGZyb20gdGhlIGdpdmVuIGFycmF5XHJcblx0X2FycmF5U3BsaWNlOiBmdW5jdGlvbiAoYW5BcnJheSwgb2JqKSB7XHJcblx0XHRmb3IgKHZhciBpID0gYW5BcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRpZiAoYW5BcnJheVtpXSA9PT0gb2JqKSB7XHJcblx0XHRcdFx0YW5BcnJheS5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgbWFya2VyIGZyb20gYWxsIF9ncmlkVW5jbHVzdGVyZWQgem9vbSBsZXZlbHMsIHN0YXJ0aW5nIGF0IHRoZSBzdXBwbGllZCB6b29tLlxyXG5cdCAqIEBwYXJhbSBtYXJrZXIgdG8gYmUgcmVtb3ZlZCBmcm9tIF9ncmlkVW5jbHVzdGVyZWQuXHJcblx0ICogQHBhcmFtIHogaW50ZWdlciBib3R0b20gc3RhcnQgem9vbSBsZXZlbCAoaW5jbHVkZWQpXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRfcmVtb3ZlRnJvbUdyaWRVbmNsdXN0ZXJlZDogZnVuY3Rpb24gKG1hcmtlciwgeikge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICBncmlkVW5jbHVzdGVyZWQgPSB0aGlzLl9ncmlkVW5jbHVzdGVyZWQsXHJcblx0XHRcdG1pblpvb20gPSBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpO1xyXG5cclxuXHRcdGZvciAoOyB6ID49IG1pblpvb207IHotLSkge1xyXG5cdFx0XHRpZiAoIWdyaWRVbmNsdXN0ZXJlZFt6XS5yZW1vdmVPYmplY3QobWFya2VyLCBtYXAucHJvamVjdChtYXJrZXIuZ2V0TGF0TG5nKCksIHopKSkge1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2NoaWxkTWFya2VyRHJhZ1N0YXJ0OiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0ZS50YXJnZXQuX19kcmFnU3RhcnQgPSBlLnRhcmdldC5fbGF0bG5nO1xyXG5cdH0sXHJcblxyXG5cdF9jaGlsZE1hcmtlck1vdmVkOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKCF0aGlzLl9pZ25vcmVNb3ZlICYmICFlLnRhcmdldC5fX2RyYWdTdGFydCkge1xyXG5cdFx0XHR2YXIgaXNQb3B1cE9wZW4gPSBlLnRhcmdldC5fcG9wdXAgJiYgZS50YXJnZXQuX3BvcHVwLmlzT3BlbigpO1xyXG5cclxuXHRcdFx0dGhpcy5fbW92ZUNoaWxkKGUudGFyZ2V0LCBlLm9sZExhdExuZywgZS5sYXRsbmcpO1xyXG5cclxuXHRcdFx0aWYgKGlzUG9wdXBPcGVuKSB7XHJcblx0XHRcdFx0ZS50YXJnZXQub3BlblBvcHVwKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfbW92ZUNoaWxkOiBmdW5jdGlvbiAobGF5ZXIsIGZyb20sIHRvKSB7XHJcblx0XHRsYXllci5fbGF0bG5nID0gZnJvbTtcclxuXHRcdHRoaXMucmVtb3ZlTGF5ZXIobGF5ZXIpO1xyXG5cclxuXHRcdGxheWVyLl9sYXRsbmcgPSB0bztcclxuXHRcdHRoaXMuYWRkTGF5ZXIobGF5ZXIpO1xyXG5cdH0sXHJcblxyXG5cdF9jaGlsZE1hcmtlckRyYWdFbmQ6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgZHJhZ1N0YXJ0ID0gZS50YXJnZXQuX19kcmFnU3RhcnQ7XHJcblx0XHRkZWxldGUgZS50YXJnZXQuX19kcmFnU3RhcnQ7XHJcblx0XHRpZiAoZHJhZ1N0YXJ0KSB7XHJcblx0XHRcdHRoaXMuX21vdmVDaGlsZChlLnRhcmdldCwgZHJhZ1N0YXJ0LCBlLnRhcmdldC5fbGF0bG5nKTtcclxuXHRcdH1cdFx0XHJcblx0fSxcclxuXHJcblxyXG5cdC8vSW50ZXJuYWwgZnVuY3Rpb24gZm9yIHJlbW92aW5nIGEgbWFya2VyIGZyb20gZXZlcnl0aGluZy5cclxuXHQvL2RvbnRVcGRhdGVNYXA6IHNldCB0byB0cnVlIGlmIHlvdSB3aWxsIGhhbmRsZSB1cGRhdGluZyB0aGUgbWFwIG1hbnVhbGx5IChmb3IgYnVsayBmdW5jdGlvbnMpXHJcblx0X3JlbW92ZUxheWVyOiBmdW5jdGlvbiAobWFya2VyLCByZW1vdmVGcm9tRGlzdGFuY2VHcmlkLCBkb250VXBkYXRlTWFwKSB7XHJcblx0XHR2YXIgZ3JpZENsdXN0ZXJzID0gdGhpcy5fZ3JpZENsdXN0ZXJzLFxyXG5cdFx0XHRncmlkVW5jbHVzdGVyZWQgPSB0aGlzLl9ncmlkVW5jbHVzdGVyZWQsXHJcblx0XHRcdGZnID0gdGhpcy5fZmVhdHVyZUdyb3VwLFxyXG5cdFx0XHRtYXAgPSB0aGlzLl9tYXAsXHJcblx0XHRcdG1pblpvb20gPSBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpO1xyXG5cclxuXHRcdC8vUmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSBkaXN0YW5jZSBjbHVzdGVycyBpdCBtaWdodCBiZSBpblxyXG5cdFx0aWYgKHJlbW92ZUZyb21EaXN0YW5jZUdyaWQpIHtcclxuXHRcdFx0dGhpcy5fcmVtb3ZlRnJvbUdyaWRVbmNsdXN0ZXJlZChtYXJrZXIsIHRoaXMuX21heFpvb20pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vV29yayBvdXIgd2F5IHVwIHRoZSBjbHVzdGVycyByZW1vdmluZyB0aGVtIGFzIHdlIGdvIGlmIHJlcXVpcmVkXHJcblx0XHR2YXIgY2x1c3RlciA9IG1hcmtlci5fX3BhcmVudCxcclxuXHRcdFx0bWFya2VycyA9IGNsdXN0ZXIuX21hcmtlcnMsXHJcblx0XHRcdG90aGVyTWFya2VyO1xyXG5cclxuXHRcdC8vUmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSB0aGUgaW1tZWRpYXRlIHBhcmVudHMgbWFya2VyIGxpc3RcclxuXHRcdHRoaXMuX2FycmF5U3BsaWNlKG1hcmtlcnMsIG1hcmtlcik7XHJcblxyXG5cdFx0d2hpbGUgKGNsdXN0ZXIpIHtcclxuXHRcdFx0Y2x1c3Rlci5fY2hpbGRDb3VudC0tO1xyXG5cdFx0XHRjbHVzdGVyLl9ib3VuZHNOZWVkVXBkYXRlID0gdHJ1ZTtcclxuXHJcblx0XHRcdGlmIChjbHVzdGVyLl96b29tIDwgbWluWm9vbSkge1xyXG5cdFx0XHRcdC8vVG9wIGxldmVsLCBkbyBub3RoaW5nXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH0gZWxzZSBpZiAocmVtb3ZlRnJvbURpc3RhbmNlR3JpZCAmJiBjbHVzdGVyLl9jaGlsZENvdW50IDw9IDEpIHsgLy9DbHVzdGVyIG5vIGxvbmdlciByZXF1aXJlZFxyXG5cdFx0XHRcdC8vV2UgbmVlZCB0byBwdXNoIHRoZSBvdGhlciBtYXJrZXIgdXAgdG8gdGhlIHBhcmVudFxyXG5cdFx0XHRcdG90aGVyTWFya2VyID0gY2x1c3Rlci5fbWFya2Vyc1swXSA9PT0gbWFya2VyID8gY2x1c3Rlci5fbWFya2Vyc1sxXSA6IGNsdXN0ZXIuX21hcmtlcnNbMF07XHJcblxyXG5cdFx0XHRcdC8vVXBkYXRlIGRpc3RhbmNlIGdyaWRcclxuXHRcdFx0XHRncmlkQ2x1c3RlcnNbY2x1c3Rlci5fem9vbV0ucmVtb3ZlT2JqZWN0KGNsdXN0ZXIsIG1hcC5wcm9qZWN0KGNsdXN0ZXIuX2NMYXRMbmcsIGNsdXN0ZXIuX3pvb20pKTtcclxuXHRcdFx0XHRncmlkVW5jbHVzdGVyZWRbY2x1c3Rlci5fem9vbV0uYWRkT2JqZWN0KG90aGVyTWFya2VyLCBtYXAucHJvamVjdChvdGhlck1hcmtlci5nZXRMYXRMbmcoKSwgY2x1c3Rlci5fem9vbSkpO1xyXG5cclxuXHRcdFx0XHQvL01vdmUgb3RoZXJNYXJrZXIgdXAgdG8gcGFyZW50XHJcblx0XHRcdFx0dGhpcy5fYXJyYXlTcGxpY2UoY2x1c3Rlci5fX3BhcmVudC5fY2hpbGRDbHVzdGVycywgY2x1c3Rlcik7XHJcblx0XHRcdFx0Y2x1c3Rlci5fX3BhcmVudC5fbWFya2Vycy5wdXNoKG90aGVyTWFya2VyKTtcclxuXHRcdFx0XHRvdGhlck1hcmtlci5fX3BhcmVudCA9IGNsdXN0ZXIuX19wYXJlbnQ7XHJcblxyXG5cdFx0XHRcdGlmIChjbHVzdGVyLl9pY29uKSB7XHJcblx0XHRcdFx0XHQvL0NsdXN0ZXIgaXMgY3VycmVudGx5IG9uIHRoZSBtYXAsIG5lZWQgdG8gcHV0IHRoZSBtYXJrZXIgb24gdGhlIG1hcCBpbnN0ZWFkXHJcblx0XHRcdFx0XHRmZy5yZW1vdmVMYXllcihjbHVzdGVyKTtcclxuXHRcdFx0XHRcdGlmICghZG9udFVwZGF0ZU1hcCkge1xyXG5cdFx0XHRcdFx0XHRmZy5hZGRMYXllcihvdGhlck1hcmtlcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNsdXN0ZXIuX2ljb25OZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNsdXN0ZXIgPSBjbHVzdGVyLl9fcGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlbGV0ZSBtYXJrZXIuX19wYXJlbnQ7XHJcblx0fSxcclxuXHJcblx0X2lzT3JJc1BhcmVudDogZnVuY3Rpb24gKGVsLCBvZWwpIHtcclxuXHRcdHdoaWxlIChvZWwpIHtcclxuXHRcdFx0aWYgKGVsID09PSBvZWwpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRvZWwgPSBvZWwucGFyZW50Tm9kZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHQvL092ZXJyaWRlIEwuRXZlbnRlZC5maXJlXHJcblx0ZmlyZTogZnVuY3Rpb24gKHR5cGUsIGRhdGEsIHByb3BhZ2F0ZSkge1xyXG5cdFx0aWYgKGRhdGEgJiYgZGF0YS5sYXllciBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlcikge1xyXG5cdFx0XHQvL1ByZXZlbnQgbXVsdGlwbGUgY2x1c3Rlcm1vdXNlb3Zlci9vZmYgZXZlbnRzIGlmIHRoZSBpY29uIGlzIG1hZGUgdXAgb2Ygc3RhY2tlZCBkaXZzIChEb2Vzbid0IHdvcmsgaW4gaWUgPD0gOCwgbm8gcmVsYXRlZFRhcmdldClcclxuXHRcdFx0aWYgKGRhdGEub3JpZ2luYWxFdmVudCAmJiB0aGlzLl9pc09ySXNQYXJlbnQoZGF0YS5sYXllci5faWNvbiwgZGF0YS5vcmlnaW5hbEV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHR5cGUgPSAnY2x1c3RlcicgKyB0eXBlO1xyXG5cdFx0fVxyXG5cclxuXHRcdEwuRmVhdHVyZUdyb3VwLnByb3RvdHlwZS5maXJlLmNhbGwodGhpcywgdHlwZSwgZGF0YSwgcHJvcGFnYXRlKTtcclxuXHR9LFxyXG5cclxuXHQvL092ZXJyaWRlIEwuRXZlbnRlZC5saXN0ZW5zXHJcblx0bGlzdGVuczogZnVuY3Rpb24gKHR5cGUsIHByb3BhZ2F0ZSkge1xyXG5cdFx0cmV0dXJuIEwuRmVhdHVyZUdyb3VwLnByb3RvdHlwZS5saXN0ZW5zLmNhbGwodGhpcywgdHlwZSwgcHJvcGFnYXRlKSB8fCBMLkZlYXR1cmVHcm91cC5wcm90b3R5cGUubGlzdGVucy5jYWxsKHRoaXMsICdjbHVzdGVyJyArIHR5cGUsIHByb3BhZ2F0ZSk7XHJcblx0fSxcclxuXHJcblx0Ly9EZWZhdWx0IGZ1bmN0aW9uYWxpdHlcclxuXHRfZGVmYXVsdEljb25DcmVhdGVGdW5jdGlvbjogZnVuY3Rpb24gKGNsdXN0ZXIpIHtcclxuXHRcdHZhciBjaGlsZENvdW50ID0gY2x1c3Rlci5nZXRDaGlsZENvdW50KCk7XHJcblxyXG5cdFx0dmFyIGMgPSAnIG1hcmtlci1jbHVzdGVyLSc7XHJcblx0XHRpZiAoY2hpbGRDb3VudCA8IDEwKSB7XHJcblx0XHRcdGMgKz0gJ3NtYWxsJztcclxuXHRcdH0gZWxzZSBpZiAoY2hpbGRDb3VudCA8IDEwMCkge1xyXG5cdFx0XHRjICs9ICdtZWRpdW0nO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YyArPSAnbGFyZ2UnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgTC5EaXZJY29uKHsgaHRtbDogJzxkaXY+PHNwYW4+JyArIGNoaWxkQ291bnQgKyAnPC9zcGFuPjwvZGl2PicsIGNsYXNzTmFtZTogJ21hcmtlci1jbHVzdGVyJyArIGMsIGljb25TaXplOiBuZXcgTC5Qb2ludCg0MCwgNDApIH0pO1xyXG5cdH0sXHJcblxyXG5cdF9iaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxyXG5cdFx0ICAgIHNwaWRlcmZ5T25NYXhab29tID0gdGhpcy5vcHRpb25zLnNwaWRlcmZ5T25NYXhab29tLFxyXG5cdFx0ICAgIHNob3dDb3ZlcmFnZU9uSG92ZXIgPSB0aGlzLm9wdGlvbnMuc2hvd0NvdmVyYWdlT25Ib3ZlcixcclxuXHRcdCAgICB6b29tVG9Cb3VuZHNPbkNsaWNrID0gdGhpcy5vcHRpb25zLnpvb21Ub0JvdW5kc09uQ2xpY2s7XHJcblxyXG5cdFx0Ly9ab29tIG9uIGNsdXN0ZXIgY2xpY2sgb3Igc3BpZGVyZnkgaWYgd2UgYXJlIGF0IHRoZSBsb3dlc3QgbGV2ZWxcclxuXHRcdGlmIChzcGlkZXJmeU9uTWF4Wm9vbSB8fCB6b29tVG9Cb3VuZHNPbkNsaWNrKSB7XHJcblx0XHRcdHRoaXMub24oJ2NsdXN0ZXJjbGljaycsIHRoaXMuX3pvb21PclNwaWRlcmZ5LCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL1Nob3cgY29udmV4IGh1bGwgKGJvdW5kYXJ5KSBwb2x5Z29uIG9uIG1vdXNlIG92ZXJcclxuXHRcdGlmIChzaG93Q292ZXJhZ2VPbkhvdmVyKSB7XHJcblx0XHRcdHRoaXMub24oJ2NsdXN0ZXJtb3VzZW92ZXInLCB0aGlzLl9zaG93Q292ZXJhZ2UsIHRoaXMpO1xyXG5cdFx0XHR0aGlzLm9uKCdjbHVzdGVybW91c2VvdXQnLCB0aGlzLl9oaWRlQ292ZXJhZ2UsIHRoaXMpO1xyXG5cdFx0XHRtYXAub24oJ3pvb21lbmQnLCB0aGlzLl9oaWRlQ292ZXJhZ2UsIHRoaXMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF96b29tT3JTcGlkZXJmeTogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciBjbHVzdGVyID0gZS5sYXllcixcclxuXHRcdCAgICBib3R0b21DbHVzdGVyID0gY2x1c3RlcjtcclxuXHJcblx0XHR3aGlsZSAoYm90dG9tQ2x1c3Rlci5fY2hpbGRDbHVzdGVycy5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0Ym90dG9tQ2x1c3RlciA9IGJvdHRvbUNsdXN0ZXIuX2NoaWxkQ2x1c3RlcnNbMF07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGJvdHRvbUNsdXN0ZXIuX3pvb20gPT09IHRoaXMuX21heFpvb20gJiZcclxuXHRcdFx0Ym90dG9tQ2x1c3Rlci5fY2hpbGRDb3VudCA9PT0gY2x1c3Rlci5fY2hpbGRDb3VudCAmJlxyXG5cdFx0XHR0aGlzLm9wdGlvbnMuc3BpZGVyZnlPbk1heFpvb20pIHtcclxuXHJcblx0XHRcdC8vIEFsbCBjaGlsZCBtYXJrZXJzIGFyZSBjb250YWluZWQgaW4gYSBzaW5nbGUgY2x1c3RlciBmcm9tIHRoaXMuX21heFpvb20gdG8gdGhpcyBjbHVzdGVyLlxyXG5cdFx0XHRjbHVzdGVyLnNwaWRlcmZ5KCk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy56b29tVG9Cb3VuZHNPbkNsaWNrKSB7XHJcblx0XHRcdGNsdXN0ZXIuem9vbVRvQm91bmRzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRm9jdXMgdGhlIG1hcCBhZ2FpbiBmb3Iga2V5Ym9hcmQgdXNlcnMuXHJcblx0XHRpZiAoZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC5rZXlDb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLl9tYXAuX2NvbnRhaW5lci5mb2N1cygpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9zaG93Q292ZXJhZ2U6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xyXG5cdFx0aWYgKHRoaXMuX2luWm9vbUFuaW1hdGlvbikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5fc2hvd25Qb2x5Z29uKSB7XHJcblx0XHRcdG1hcC5yZW1vdmVMYXllcih0aGlzLl9zaG93blBvbHlnb24pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGUubGF5ZXIuZ2V0Q2hpbGRDb3VudCgpID4gMiAmJiBlLmxheWVyICE9PSB0aGlzLl9zcGlkZXJmaWVkKSB7XHJcblx0XHRcdHRoaXMuX3Nob3duUG9seWdvbiA9IG5ldyBMLlBvbHlnb24oZS5sYXllci5nZXRDb252ZXhIdWxsKCksIHRoaXMub3B0aW9ucy5wb2x5Z29uT3B0aW9ucyk7XHJcblx0XHRcdG1hcC5hZGRMYXllcih0aGlzLl9zaG93blBvbHlnb24pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9oaWRlQ292ZXJhZ2U6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9zaG93blBvbHlnb24pIHtcclxuXHRcdFx0dGhpcy5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX3Nob3duUG9seWdvbik7XHJcblx0XHRcdHRoaXMuX3Nob3duUG9seWdvbiA9IG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3VuYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHNwaWRlcmZ5T25NYXhab29tID0gdGhpcy5vcHRpb25zLnNwaWRlcmZ5T25NYXhab29tLFxyXG5cdFx0XHRzaG93Q292ZXJhZ2VPbkhvdmVyID0gdGhpcy5vcHRpb25zLnNob3dDb3ZlcmFnZU9uSG92ZXIsXHJcblx0XHRcdHpvb21Ub0JvdW5kc09uQ2xpY2sgPSB0aGlzLm9wdGlvbnMuem9vbVRvQm91bmRzT25DbGljayxcclxuXHRcdFx0bWFwID0gdGhpcy5fbWFwO1xyXG5cclxuXHRcdGlmIChzcGlkZXJmeU9uTWF4Wm9vbSB8fCB6b29tVG9Cb3VuZHNPbkNsaWNrKSB7XHJcblx0XHRcdHRoaXMub2ZmKCdjbHVzdGVyY2xpY2snLCB0aGlzLl96b29tT3JTcGlkZXJmeSwgdGhpcyk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2hvd0NvdmVyYWdlT25Ib3Zlcikge1xyXG5cdFx0XHR0aGlzLm9mZignY2x1c3Rlcm1vdXNlb3ZlcicsIHRoaXMuX3Nob3dDb3ZlcmFnZSwgdGhpcyk7XHJcblx0XHRcdHRoaXMub2ZmKCdjbHVzdGVybW91c2VvdXQnLCB0aGlzLl9oaWRlQ292ZXJhZ2UsIHRoaXMpO1xyXG5cdFx0XHRtYXAub2ZmKCd6b29tZW5kJywgdGhpcy5faGlkZUNvdmVyYWdlLCB0aGlzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfem9vbUVuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9tYXApIHsgLy9NYXkgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgbWFwIGJ5IGEgem9vbUVuZCBoYW5kbGVyXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuX21lcmdlU3BsaXRDbHVzdGVycygpO1xyXG5cclxuXHRcdHRoaXMuX3pvb20gPSBNYXRoLnJvdW5kKHRoaXMuX21hcC5fem9vbSk7XHJcblx0XHR0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMgPSB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKTtcclxuXHR9LFxyXG5cclxuXHRfbW92ZUVuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX2luWm9vbUFuaW1hdGlvbikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG5ld0JvdW5kcyA9IHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpO1xyXG5cclxuXHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHlSZW1vdmVDaGlsZHJlbkZyb21NYXAodGhpcy5fY3VycmVudFNob3duQm91bmRzLCBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpLCB0aGlzLl96b29tLCBuZXdCb3VuZHMpO1xyXG5cdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseUFkZENoaWxkcmVuVG9NYXAobnVsbCwgTWF0aC5yb3VuZCh0aGlzLl9tYXAuX3pvb20pLCBuZXdCb3VuZHMpO1xyXG5cclxuXHRcdHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcyA9IG5ld0JvdW5kcztcclxuXHRcdHJldHVybjtcclxuXHR9LFxyXG5cclxuXHRfZ2VuZXJhdGVJbml0aWFsQ2x1c3RlcnM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtYXhab29tID0gTWF0aC5jZWlsKHRoaXMuX21hcC5nZXRNYXhab29tKCkpLFxyXG5cdFx0XHRtaW5ab29tID0gTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSxcclxuXHRcdFx0cmFkaXVzID0gdGhpcy5vcHRpb25zLm1heENsdXN0ZXJSYWRpdXMsXHJcblx0XHRcdHJhZGl1c0ZuID0gcmFkaXVzO1xyXG5cclxuXHRcdC8vSWYgd2UganVzdCBzZXQgbWF4Q2x1c3RlclJhZGl1cyB0byBhIHNpbmdsZSBudW1iZXIsIHdlIG5lZWQgdG8gY3JlYXRlXHJcblx0XHQvL2Egc2ltcGxlIGZ1bmN0aW9uIHRvIHJldHVybiB0aGF0IG51bWJlci4gT3RoZXJ3aXNlLCB3ZSBqdXN0IGhhdmUgdG9cclxuXHRcdC8vdXNlIHRoZSBmdW5jdGlvbiB3ZSd2ZSBwYXNzZWQgaW4uXHJcblx0XHRpZiAodHlwZW9mIHJhZGl1cyAhPT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdHJhZGl1c0ZuID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmFkaXVzOyB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZUNsdXN0ZXJpbmdBdFpvb20gIT09IG51bGwpIHtcclxuXHRcdFx0bWF4Wm9vbSA9IHRoaXMub3B0aW9ucy5kaXNhYmxlQ2x1c3RlcmluZ0F0Wm9vbSAtIDE7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9tYXhab29tID0gbWF4Wm9vbTtcclxuXHRcdHRoaXMuX2dyaWRDbHVzdGVycyA9IHt9O1xyXG5cdFx0dGhpcy5fZ3JpZFVuY2x1c3RlcmVkID0ge307XHJcblxyXG5cdFx0Ly9TZXQgdXAgRGlzdGFuY2VHcmlkcyBmb3IgZWFjaCB6b29tXHJcblx0XHRmb3IgKHZhciB6b29tID0gbWF4Wm9vbTsgem9vbSA+PSBtaW5ab29tOyB6b29tLS0pIHtcclxuXHRcdFx0dGhpcy5fZ3JpZENsdXN0ZXJzW3pvb21dID0gbmV3IEwuRGlzdGFuY2VHcmlkKHJhZGl1c0ZuKHpvb20pKTtcclxuXHRcdFx0dGhpcy5fZ3JpZFVuY2x1c3RlcmVkW3pvb21dID0gbmV3IEwuRGlzdGFuY2VHcmlkKHJhZGl1c0ZuKHpvb20pKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJbnN0YW50aWF0ZSB0aGUgYXBwcm9wcmlhdGUgTC5NYXJrZXJDbHVzdGVyIGNsYXNzIChhbmltYXRlZCBvciBub3QpLlxyXG5cdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsID0gbmV3IHRoaXMuX21hcmtlckNsdXN0ZXIodGhpcywgbWluWm9vbSAtIDEpO1xyXG5cdH0sXHJcblxyXG5cdC8vWm9vbTogWm9vbSB0byBzdGFydCBhZGRpbmcgYXQgKFBhc3MgdGhpcy5fbWF4Wm9vbSB0byBzdGFydCBhdCB0aGUgYm90dG9tKVxyXG5cdF9hZGRMYXllcjogZnVuY3Rpb24gKGxheWVyLCB6b29tKSB7XHJcblx0XHR2YXIgZ3JpZENsdXN0ZXJzID0gdGhpcy5fZ3JpZENsdXN0ZXJzLFxyXG5cdFx0ICAgIGdyaWRVbmNsdXN0ZXJlZCA9IHRoaXMuX2dyaWRVbmNsdXN0ZXJlZCxcclxuXHRcdFx0bWluWm9vbSA9IE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSksXHJcblx0XHQgICAgbWFya2VyUG9pbnQsIHo7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zaW5nbGVNYXJrZXJNb2RlKSB7XHJcblx0XHRcdHRoaXMuX292ZXJyaWRlTWFya2VySWNvbihsYXllcik7XHJcblx0XHR9XHJcblxyXG5cdFx0bGF5ZXIub24odGhpcy5fY2hpbGRNYXJrZXJFdmVudEhhbmRsZXJzLCB0aGlzKTtcclxuXHJcblx0XHQvL0ZpbmQgdGhlIGxvd2VzdCB6b29tIGxldmVsIHRvIHNsb3QgdGhpcyBvbmUgaW5cclxuXHRcdGZvciAoOyB6b29tID49IG1pblpvb207IHpvb20tLSkge1xyXG5cdFx0XHRtYXJrZXJQb2ludCA9IHRoaXMuX21hcC5wcm9qZWN0KGxheWVyLmdldExhdExuZygpLCB6b29tKTsgLy8gY2FsY3VsYXRlIHBpeGVsIHBvc2l0aW9uXHJcblxyXG5cdFx0XHQvL1RyeSBmaW5kIGEgY2x1c3RlciBjbG9zZSBieVxyXG5cdFx0XHR2YXIgY2xvc2VzdCA9IGdyaWRDbHVzdGVyc1t6b29tXS5nZXROZWFyT2JqZWN0KG1hcmtlclBvaW50KTtcclxuXHRcdFx0aWYgKGNsb3Nlc3QpIHtcclxuXHRcdFx0XHRjbG9zZXN0Ll9hZGRDaGlsZChsYXllcik7XHJcblx0XHRcdFx0bGF5ZXIuX19wYXJlbnQgPSBjbG9zZXN0O1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly9UcnkgZmluZCBhIG1hcmtlciBjbG9zZSBieSB0byBmb3JtIGEgbmV3IGNsdXN0ZXIgd2l0aFxyXG5cdFx0XHRjbG9zZXN0ID0gZ3JpZFVuY2x1c3RlcmVkW3pvb21dLmdldE5lYXJPYmplY3QobWFya2VyUG9pbnQpO1xyXG5cdFx0XHRpZiAoY2xvc2VzdCkge1xyXG5cdFx0XHRcdHZhciBwYXJlbnQgPSBjbG9zZXN0Ll9fcGFyZW50O1xyXG5cdFx0XHRcdGlmIChwYXJlbnQpIHtcclxuXHRcdFx0XHRcdHRoaXMuX3JlbW92ZUxheWVyKGNsb3Nlc3QsIGZhbHNlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vQ3JlYXRlIG5ldyBjbHVzdGVyIHdpdGggdGhlc2UgMiBpbiBpdFxyXG5cclxuXHRcdFx0XHR2YXIgbmV3Q2x1c3RlciA9IG5ldyB0aGlzLl9tYXJrZXJDbHVzdGVyKHRoaXMsIHpvb20sIGNsb3Nlc3QsIGxheWVyKTtcclxuXHRcdFx0XHRncmlkQ2x1c3RlcnNbem9vbV0uYWRkT2JqZWN0KG5ld0NsdXN0ZXIsIHRoaXMuX21hcC5wcm9qZWN0KG5ld0NsdXN0ZXIuX2NMYXRMbmcsIHpvb20pKTtcclxuXHRcdFx0XHRjbG9zZXN0Ll9fcGFyZW50ID0gbmV3Q2x1c3RlcjtcclxuXHRcdFx0XHRsYXllci5fX3BhcmVudCA9IG5ld0NsdXN0ZXI7XHJcblxyXG5cdFx0XHRcdC8vRmlyc3QgY3JlYXRlIGFueSBuZXcgaW50ZXJtZWRpYXRlIHBhcmVudCBjbHVzdGVycyB0aGF0IGRvbid0IGV4aXN0XHJcblx0XHRcdFx0dmFyIGxhc3RQYXJlbnQgPSBuZXdDbHVzdGVyO1xyXG5cdFx0XHRcdGZvciAoeiA9IHpvb20gLSAxOyB6ID4gcGFyZW50Ll96b29tOyB6LS0pIHtcclxuXHRcdFx0XHRcdGxhc3RQYXJlbnQgPSBuZXcgdGhpcy5fbWFya2VyQ2x1c3Rlcih0aGlzLCB6LCBsYXN0UGFyZW50KTtcclxuXHRcdFx0XHRcdGdyaWRDbHVzdGVyc1t6XS5hZGRPYmplY3QobGFzdFBhcmVudCwgdGhpcy5fbWFwLnByb2plY3QoY2xvc2VzdC5nZXRMYXRMbmcoKSwgeikpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRwYXJlbnQuX2FkZENoaWxkKGxhc3RQYXJlbnQpO1xyXG5cclxuXHRcdFx0XHQvL1JlbW92ZSBjbG9zZXN0IGZyb20gdGhpcyB6b29tIGxldmVsIGFuZCBhbnkgYWJvdmUgdGhhdCBpdCBpcyBpbiwgcmVwbGFjZSB3aXRoIG5ld0NsdXN0ZXJcclxuXHRcdFx0XHR0aGlzLl9yZW1vdmVGcm9tR3JpZFVuY2x1c3RlcmVkKGNsb3Nlc3QsIHpvb20pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vRGlkbid0IG1hbmFnZSB0byBjbHVzdGVyIGluIGF0IHRoaXMgem9vbSwgcmVjb3JkIHVzIGFzIGEgbWFya2VyIGhlcmUgYW5kIGNvbnRpbnVlIHVwd2FyZHNcclxuXHRcdFx0Z3JpZFVuY2x1c3RlcmVkW3pvb21dLmFkZE9iamVjdChsYXllciwgbWFya2VyUG9pbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vRGlkbid0IGdldCBpbiBhbnl0aGluZywgYWRkIHVzIHRvIHRoZSB0b3BcclxuXHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fYWRkQ2hpbGQobGF5ZXIpO1xyXG5cdFx0bGF5ZXIuX19wYXJlbnQgPSB0aGlzLl90b3BDbHVzdGVyTGV2ZWw7XHJcblx0XHRyZXR1cm47XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogUmVmcmVzaGVzIHRoZSBpY29uIG9mIGFsbCBcImRpcnR5XCIgdmlzaWJsZSBjbHVzdGVycy5cclxuXHQgKiBOb24tdmlzaWJsZSBcImRpcnR5XCIgY2x1c3RlcnMgd2lsbCBiZSB1cGRhdGVkIHdoZW4gdGhleSBhcmUgYWRkZWQgdG8gdGhlIG1hcC5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdF9yZWZyZXNoQ2x1c3RlcnNJY29uczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fZmVhdHVyZUdyb3VwLmVhY2hMYXllcihmdW5jdGlvbiAoYykge1xyXG5cdFx0XHRpZiAoYyBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3RlciAmJiBjLl9pY29uTmVlZHNVcGRhdGUpIHtcclxuXHRcdFx0XHRjLl91cGRhdGVJY29uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vRW5xdWV1ZSBjb2RlIHRvIGZpcmUgYWZ0ZXIgdGhlIG1hcmtlciBleHBhbmQvY29udHJhY3QgaGFzIGhhcHBlbmVkXHJcblx0X2VucXVldWU6IGZ1bmN0aW9uIChmbikge1xyXG5cdFx0dGhpcy5fcXVldWUucHVzaChmbik7XHJcblx0XHRpZiAoIXRoaXMuX3F1ZXVlVGltZW91dCkge1xyXG5cdFx0XHR0aGlzLl9xdWV1ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KEwuYmluZCh0aGlzLl9wcm9jZXNzUXVldWUsIHRoaXMpLCAzMDApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0X3Byb2Nlc3NRdWV1ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9xdWV1ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLl9xdWV1ZVtpXS5jYWxsKHRoaXMpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fcXVldWUubGVuZ3RoID0gMDtcclxuXHRcdGNsZWFyVGltZW91dCh0aGlzLl9xdWV1ZVRpbWVvdXQpO1xyXG5cdFx0dGhpcy5fcXVldWVUaW1lb3V0ID0gbnVsbDtcclxuXHR9LFxyXG5cclxuXHQvL01lcmdlIGFuZCBzcGxpdCBhbnkgZXhpc3RpbmcgY2x1c3RlcnMgdGhhdCBhcmUgdG9vIGJpZyBvciBzbWFsbFxyXG5cdF9tZXJnZVNwbGl0Q2x1c3RlcnM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtYXBab29tID0gTWF0aC5yb3VuZCh0aGlzLl9tYXAuX3pvb20pO1xyXG5cclxuXHRcdC8vSW4gY2FzZSB3ZSBhcmUgc3RhcnRpbmcgdG8gc3BsaXQgYmVmb3JlIHRoZSBhbmltYXRpb24gZmluaXNoZWRcclxuXHRcdHRoaXMuX3Byb2Nlc3NRdWV1ZSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl96b29tIDwgbWFwWm9vbSAmJiB0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMuaW50ZXJzZWN0cyh0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSkpIHsgLy9ab29tIGluLCBzcGxpdFxyXG5cdFx0XHR0aGlzLl9hbmltYXRpb25TdGFydCgpO1xyXG5cdFx0XHQvL1JlbW92ZSBjbHVzdGVycyBub3cgb2ZmIHNjcmVlblxyXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcywgTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSwgdGhpcy5fem9vbSwgdGhpcy5fZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzKCkpO1xyXG5cclxuXHRcdFx0dGhpcy5fYW5pbWF0aW9uWm9vbUluKHRoaXMuX3pvb20sIG1hcFpvb20pO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAodGhpcy5fem9vbSA+IG1hcFpvb20pIHsgLy9ab29tIG91dCwgbWVyZ2VcclxuXHRcdFx0dGhpcy5fYW5pbWF0aW9uU3RhcnQoKTtcclxuXHJcblx0XHRcdHRoaXMuX2FuaW1hdGlvblpvb21PdXQodGhpcy5fem9vbSwgbWFwWm9vbSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9tb3ZlRW5kKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly9HZXRzIHRoZSBtYXBzIHZpc2libGUgYm91bmRzIGV4cGFuZGVkIGluIGVhY2ggZGlyZWN0aW9uIGJ5IHRoZSBzaXplIG9mIHRoZSBzY3JlZW4gKHNvIHRoZSB1c2VyIGNhbm5vdCBzZWUgYW4gYXJlYSB3ZSBkbyBub3QgY292ZXIgaW4gb25lIHBhbilcclxuXHRfZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVPdXRzaWRlVmlzaWJsZUJvdW5kcykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fbWFwQm91bmRzSW5maW5pdGU7XHJcblx0XHR9IGVsc2UgaWYgKEwuQnJvd3Nlci5tb2JpbGUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NoZWNrQm91bmRzTWF4TGF0KHRoaXMuX21hcC5nZXRCb3VuZHMoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2NoZWNrQm91bmRzTWF4TGF0KHRoaXMuX21hcC5nZXRCb3VuZHMoKS5wYWQoMSkpOyAvLyBQYWRkaW5nIGV4cGFuZHMgdGhlIGJvdW5kcyBieSBpdHMgb3duIGRpbWVuc2lvbnMgYnV0IHNjYWxlZCB3aXRoIHRoZSBnaXZlbiBmYWN0b3IuXHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogRXhwYW5kcyB0aGUgbGF0aXR1ZGUgdG8gSW5maW5pdHkgKG9yIC1JbmZpbml0eSkgaWYgdGhlIGlucHV0IGJvdW5kcyByZWFjaCB0aGUgbWFwIHByb2plY3Rpb24gbWF4aW11bSBkZWZpbmVkIGxhdGl0dWRlXHJcblx0ICogKGluIHRoZSBjYXNlIG9mIFdlYi9TcGhlcmljYWwgTWVyY2F0b3IsIGl0IGlzIDg1LjA1MTEyODc3OTggLyBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2ViX01lcmNhdG9yI0Zvcm11bGFzKS5cclxuXHQgKiBPdGhlcndpc2UsIHRoZSByZW1vdmVPdXRzaWRlVmlzaWJsZUJvdW5kcyBvcHRpb24gd2lsbCByZW1vdmUgbWFya2VycyBiZXlvbmQgdGhhdCBsaW1pdCwgd2hlcmVhcyB0aGUgc2FtZSBtYXJrZXJzIHdpdGhvdXRcclxuXHQgKiB0aGlzIG9wdGlvbiAob3Igb3V0c2lkZSBNQ0cpIHdpbGwgaGF2ZSB0aGVpciBwb3NpdGlvbiBmbG9vcmVkIChjZWlsZWQpIGJ5IHRoZSBwcm9qZWN0aW9uIGFuZCByZW5kZXJlZCBhdCB0aGF0IGxpbWl0LFxyXG5cdCAqIG1ha2luZyB0aGUgdXNlciB0aGluayB0aGF0IE1DRyBcImVhdHNcIiB0aGVtIGFuZCBuZXZlciBkaXNwbGF5cyB0aGVtIGFnYWluLlxyXG5cdCAqIEBwYXJhbSBib3VuZHMgTC5MYXRMbmdCb3VuZHNcclxuXHQgKiBAcmV0dXJucyB7TC5MYXRMbmdCb3VuZHN9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRfY2hlY2tCb3VuZHNNYXhMYXQ6IGZ1bmN0aW9uIChib3VuZHMpIHtcclxuXHRcdHZhciBtYXhMYXQgPSB0aGlzLl9tYXhMYXQ7XHJcblxyXG5cdFx0aWYgKG1heExhdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGlmIChib3VuZHMuZ2V0Tm9ydGgoKSA+PSBtYXhMYXQpIHtcclxuXHRcdFx0XHRib3VuZHMuX25vcnRoRWFzdC5sYXQgPSBJbmZpbml0eTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoYm91bmRzLmdldFNvdXRoKCkgPD0gLW1heExhdCkge1xyXG5cdFx0XHRcdGJvdW5kcy5fc291dGhXZXN0LmxhdCA9IC1JbmZpbml0eTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBib3VuZHM7XHJcblx0fSxcclxuXHJcblx0Ly9TaGFyZWQgYW5pbWF0aW9uIGNvZGVcclxuXHRfYW5pbWF0aW9uQWRkTGF5ZXJOb25BbmltYXRlZDogZnVuY3Rpb24gKGxheWVyLCBuZXdDbHVzdGVyKSB7XHJcblx0XHRpZiAobmV3Q2x1c3RlciA9PT0gbGF5ZXIpIHtcclxuXHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLmFkZExheWVyKGxheWVyKTtcclxuXHRcdH0gZWxzZSBpZiAobmV3Q2x1c3Rlci5fY2hpbGRDb3VudCA9PT0gMikge1xyXG5cdFx0XHRuZXdDbHVzdGVyLl9hZGRUb01hcCgpO1xyXG5cclxuXHRcdFx0dmFyIG1hcmtlcnMgPSBuZXdDbHVzdGVyLmdldEFsbENoaWxkTWFya2VycygpO1xyXG5cdFx0XHR0aGlzLl9mZWF0dXJlR3JvdXAucmVtb3ZlTGF5ZXIobWFya2Vyc1swXSk7XHJcblx0XHRcdHRoaXMuX2ZlYXR1cmVHcm91cC5yZW1vdmVMYXllcihtYXJrZXJzWzFdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5ld0NsdXN0ZXIuX3VwZGF0ZUljb24oKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBFeHRyYWN0cyBpbmRpdmlkdWFsIChpLmUuIG5vbi1ncm91cCkgbGF5ZXJzIGZyb20gYSBMYXllciBHcm91cC5cclxuXHQgKiBAcGFyYW0gZ3JvdXAgdG8gZXh0cmFjdCBsYXllcnMgZnJvbS5cclxuXHQgKiBAcGFyYW0gb3V0cHV0IHtBcnJheX0gaW4gd2hpY2ggdG8gc3RvcmUgdGhlIGV4dHJhY3RlZCBsYXllcnMuXHJcblx0ICogQHJldHVybnMgeyp8QXJyYXl9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRfZXh0cmFjdE5vbkdyb3VwTGF5ZXJzOiBmdW5jdGlvbiAoZ3JvdXAsIG91dHB1dCkge1xyXG5cdFx0dmFyIGxheWVycyA9IGdyb3VwLmdldExheWVycygpLFxyXG5cdFx0ICAgIGkgPSAwLFxyXG5cdFx0ICAgIGxheWVyO1xyXG5cclxuXHRcdG91dHB1dCA9IG91dHB1dCB8fCBbXTtcclxuXHJcblx0XHRmb3IgKDsgaSA8IGxheWVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRsYXllciA9IGxheWVyc1tpXTtcclxuXHJcblx0XHRcdGlmIChsYXllciBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCkge1xyXG5cdFx0XHRcdHRoaXMuX2V4dHJhY3ROb25Hcm91cExheWVycyhsYXllciwgb3V0cHV0KTtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3V0cHV0LnB1c2gobGF5ZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogSW1wbGVtZW50cyB0aGUgc2luZ2xlTWFya2VyTW9kZSBvcHRpb24uXHJcblx0ICogQHBhcmFtIGxheWVyIE1hcmtlciB0byByZS1zdHlsZSB1c2luZyB0aGUgQ2x1c3RlcnMgaWNvbkNyZWF0ZUZ1bmN0aW9uLlxyXG5cdCAqIEByZXR1cm5zIHtMLkljb259IFRoZSBuZXdseSBjcmVhdGVkIGljb24uXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRfb3ZlcnJpZGVNYXJrZXJJY29uOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdHZhciBpY29uID0gbGF5ZXIub3B0aW9ucy5pY29uID0gdGhpcy5vcHRpb25zLmljb25DcmVhdGVGdW5jdGlvbih7XHJcblx0XHRcdGdldENoaWxkQ291bnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0QWxsQ2hpbGRNYXJrZXJzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIFtsYXllcl07XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBpY29uO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBDb25zdGFudCBib3VuZHMgdXNlZCBpbiBjYXNlIG9wdGlvbiBcInJlbW92ZU91dHNpZGVWaXNpYmxlQm91bmRzXCIgaXMgc2V0IHRvIGZhbHNlLlxyXG5MLk1hcmtlckNsdXN0ZXJHcm91cC5pbmNsdWRlKHtcclxuXHRfbWFwQm91bmRzSW5maW5pdGU6IG5ldyBMLkxhdExuZ0JvdW5kcyhuZXcgTC5MYXRMbmcoLUluZmluaXR5LCAtSW5maW5pdHkpLCBuZXcgTC5MYXRMbmcoSW5maW5pdHksIEluZmluaXR5KSlcclxufSk7XHJcblxyXG5MLk1hcmtlckNsdXN0ZXJHcm91cC5pbmNsdWRlKHtcclxuXHRfbm9BbmltYXRpb246IHtcclxuXHRcdC8vTm9uIEFuaW1hdGVkIHZlcnNpb25zIG9mIGV2ZXJ5dGhpbmdcclxuXHRcdF9hbmltYXRpb25TdGFydDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvL0RvIG5vdGhpbmcuLi5cclxuXHRcdH0sXHJcblx0XHRfYW5pbWF0aW9uWm9vbUluOiBmdW5jdGlvbiAocHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCkge1xyXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcywgTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSwgcHJldmlvdXNab29tTGV2ZWwpO1xyXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcChudWxsLCBuZXdab29tTGV2ZWwsIHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpKTtcclxuXHJcblx0XHRcdC8vV2UgZGlkbid0IGFjdHVhbGx5IGFuaW1hdGUsIGJ1dCB3ZSB1c2UgdGhpcyBldmVudCB0byBtZWFuIFwiY2x1c3RlcmluZyBhbmltYXRpb25zIGhhdmUgZmluaXNoZWRcIlxyXG5cdFx0XHR0aGlzLmZpcmUoJ2FuaW1hdGlvbmVuZCcpO1xyXG5cdFx0fSxcclxuXHRcdF9hbmltYXRpb25ab29tT3V0OiBmdW5jdGlvbiAocHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCkge1xyXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5UmVtb3ZlQ2hpbGRyZW5Gcm9tTWFwKHRoaXMuX2N1cnJlbnRTaG93bkJvdW5kcywgTWF0aC5mbG9vcih0aGlzLl9tYXAuZ2V0TWluWm9vbSgpKSwgcHJldmlvdXNab29tTGV2ZWwpO1xyXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcChudWxsLCBuZXdab29tTGV2ZWwsIHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpKTtcclxuXHJcblx0XHRcdC8vV2UgZGlkbid0IGFjdHVhbGx5IGFuaW1hdGUsIGJ1dCB3ZSB1c2UgdGhpcyBldmVudCB0byBtZWFuIFwiY2x1c3RlcmluZyBhbmltYXRpb25zIGhhdmUgZmluaXNoZWRcIlxyXG5cdFx0XHR0aGlzLmZpcmUoJ2FuaW1hdGlvbmVuZCcpO1xyXG5cdFx0fSxcclxuXHRcdF9hbmltYXRpb25BZGRMYXllcjogZnVuY3Rpb24gKGxheWVyLCBuZXdDbHVzdGVyKSB7XHJcblx0XHRcdHRoaXMuX2FuaW1hdGlvbkFkZExheWVyTm9uQW5pbWF0ZWQobGF5ZXIsIG5ld0NsdXN0ZXIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF93aXRoQW5pbWF0aW9uOiB7XHJcblx0XHQvL0FuaW1hdGVkIHZlcnNpb25zIGhlcmVcclxuXHRcdF9hbmltYXRpb25TdGFydDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLl9tYXAuX21hcFBhbmUuY2xhc3NOYW1lICs9ICcgbGVhZmxldC1jbHVzdGVyLWFuaW0nO1xyXG5cdFx0XHR0aGlzLl9pblpvb21BbmltYXRpb24rKztcclxuXHRcdH0sXHJcblxyXG5cdFx0X2FuaW1hdGlvblpvb21JbjogZnVuY3Rpb24gKHByZXZpb3VzWm9vbUxldmVsLCBuZXdab29tTGV2ZWwpIHtcclxuXHRcdFx0dmFyIGJvdW5kcyA9IHRoaXMuX2dldEV4cGFuZGVkVmlzaWJsZUJvdW5kcygpLFxyXG5cdFx0XHQgICAgZmcgPSB0aGlzLl9mZWF0dXJlR3JvdXAsXHJcblx0XHRcdFx0bWluWm9vbSA9IE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSksXHJcblx0XHRcdCAgICBpO1xyXG5cclxuXHRcdFx0dGhpcy5faWdub3JlTW92ZSA9IHRydWU7XHJcblxyXG5cdFx0XHQvL0FkZCBhbGwgY2hpbGRyZW4gb2YgY3VycmVudCBjbHVzdGVycyB0byBtYXAgYW5kIHJlbW92ZSB0aG9zZSBjbHVzdGVycyBmcm9tIG1hcFxyXG5cdFx0XHR0aGlzLl90b3BDbHVzdGVyTGV2ZWwuX3JlY3Vyc2l2ZWx5KGJvdW5kcywgcHJldmlvdXNab29tTGV2ZWwsIG1pblpvb20sIGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdFx0dmFyIHN0YXJ0UG9zID0gYy5fbGF0bG5nLFxyXG5cdFx0XHRcdCAgICBtYXJrZXJzICA9IGMuX21hcmtlcnMsXHJcblx0XHRcdFx0ICAgIG07XHJcblxyXG5cdFx0XHRcdGlmICghYm91bmRzLmNvbnRhaW5zKHN0YXJ0UG9zKSkge1xyXG5cdFx0XHRcdFx0c3RhcnRQb3MgPSBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGMuX2lzU2luZ2xlUGFyZW50KCkgJiYgcHJldmlvdXNab29tTGV2ZWwgKyAxID09PSBuZXdab29tTGV2ZWwpIHsgLy9JbW1lZGlhdGVseSBhZGQgdGhlIG5ldyBjaGlsZCBhbmQgcmVtb3ZlIHVzXHJcblx0XHRcdFx0XHRmZy5yZW1vdmVMYXllcihjKTtcclxuXHRcdFx0XHRcdGMuX3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcChudWxsLCBuZXdab29tTGV2ZWwsIGJvdW5kcyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vRmFkZSBvdXQgb2xkIGNsdXN0ZXJcclxuXHRcdFx0XHRcdGMuY2x1c3RlckhpZGUoKTtcclxuXHRcdFx0XHRcdGMuX3JlY3Vyc2l2ZWx5QWRkQ2hpbGRyZW5Ub01hcChzdGFydFBvcywgbmV3Wm9vbUxldmVsLCBib3VuZHMpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly9SZW1vdmUgYWxsIG1hcmtlcnMgdGhhdCBhcmVuJ3QgdmlzaWJsZSBhbnkgbW9yZVxyXG5cdFx0XHRcdC8vVE9ETzogRG8gd2UgYWN0dWFsbHkgbmVlZCB0byBkbyB0aGlzIG9uIHRoZSBoaWdoZXIgbGV2ZWxzIHRvbz9cclxuXHRcdFx0XHRmb3IgKGkgPSBtYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0XHRtID0gbWFya2Vyc1tpXTtcclxuXHRcdFx0XHRcdGlmICghYm91bmRzLmNvbnRhaW5zKG0uX2xhdGxuZykpIHtcclxuXHRcdFx0XHRcdFx0ZmcucmVtb3ZlTGF5ZXIobSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLl9mb3JjZUxheW91dCgpO1xyXG5cclxuXHRcdFx0Ly9VcGRhdGUgb3BhY2l0aWVzXHJcblx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHlCZWNvbWVWaXNpYmxlKGJvdW5kcywgbmV3Wm9vbUxldmVsKTtcclxuXHRcdFx0Ly9UT0RPIE1heWJlPyBVcGRhdGUgbWFya2VycyBpbiBfcmVjdXJzaXZlbHlCZWNvbWVWaXNpYmxlXHJcblx0XHRcdGZnLmVhY2hMYXllcihmdW5jdGlvbiAobikge1xyXG5cdFx0XHRcdGlmICghKG4gaW5zdGFuY2VvZiBMLk1hcmtlckNsdXN0ZXIpICYmIG4uX2ljb24pIHtcclxuXHRcdFx0XHRcdG4uY2x1c3RlclNob3coKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly91cGRhdGUgdGhlIHBvc2l0aW9ucyBvZiB0aGUganVzdCBhZGRlZCBjbHVzdGVycy9tYXJrZXJzXHJcblx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHkoYm91bmRzLCBwcmV2aW91c1pvb21MZXZlbCwgbmV3Wm9vbUxldmVsLCBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHRcdGMuX3JlY3Vyc2l2ZWx5UmVzdG9yZUNoaWxkUG9zaXRpb25zKG5ld1pvb21MZXZlbCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy5faWdub3JlTW92ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Ly9SZW1vdmUgdGhlIG9sZCBjbHVzdGVycyBhbmQgY2xvc2UgdGhlIHpvb20gYW5pbWF0aW9uXHJcblx0XHRcdHRoaXMuX2VucXVldWUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdC8vdXBkYXRlIHRoZSBwb3NpdGlvbnMgb2YgdGhlIGp1c3QgYWRkZWQgY2x1c3RlcnMvbWFya2Vyc1xyXG5cdFx0XHRcdHRoaXMuX3RvcENsdXN0ZXJMZXZlbC5fcmVjdXJzaXZlbHkoYm91bmRzLCBwcmV2aW91c1pvb21MZXZlbCwgbWluWm9vbSwgZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKGMpO1xyXG5cdFx0XHRcdFx0Yy5jbHVzdGVyU2hvdygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR0aGlzLl9hbmltYXRpb25FbmQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdF9hbmltYXRpb25ab29tT3V0OiBmdW5jdGlvbiAocHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCkge1xyXG5cdFx0XHR0aGlzLl9hbmltYXRpb25ab29tT3V0U2luZ2xlKHRoaXMuX3RvcENsdXN0ZXJMZXZlbCwgcHJldmlvdXNab29tTGV2ZWwgLSAxLCBuZXdab29tTGV2ZWwpO1xyXG5cclxuXHRcdFx0Ly9OZWVkIHRvIGFkZCBtYXJrZXJzIGZvciB0aG9zZSB0aGF0IHdlcmVuJ3Qgb24gdGhlIG1hcCBiZWZvcmUgYnV0IGFyZSBub3dcclxuXHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseUFkZENoaWxkcmVuVG9NYXAobnVsbCwgbmV3Wm9vbUxldmVsLCB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSk7XHJcblx0XHRcdC8vUmVtb3ZlIG1hcmtlcnMgdGhhdCB3ZXJlIG9uIHRoZSBtYXAgYmVmb3JlIGJ1dCB3b24ndCBiZSBub3dcclxuXHRcdFx0dGhpcy5fdG9wQ2x1c3RlckxldmVsLl9yZWN1cnNpdmVseVJlbW92ZUNoaWxkcmVuRnJvbU1hcCh0aGlzLl9jdXJyZW50U2hvd25Cb3VuZHMsIE1hdGguZmxvb3IodGhpcy5fbWFwLmdldE1pblpvb20oKSksIHByZXZpb3VzWm9vbUxldmVsLCB0aGlzLl9nZXRFeHBhbmRlZFZpc2libGVCb3VuZHMoKSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdF9hbmltYXRpb25BZGRMYXllcjogZnVuY3Rpb24gKGxheWVyLCBuZXdDbHVzdGVyKSB7XHJcblx0XHRcdHZhciBtZSA9IHRoaXMsXHJcblx0XHRcdCAgICBmZyA9IHRoaXMuX2ZlYXR1cmVHcm91cDtcclxuXHJcblx0XHRcdGZnLmFkZExheWVyKGxheWVyKTtcclxuXHRcdFx0aWYgKG5ld0NsdXN0ZXIgIT09IGxheWVyKSB7XHJcblx0XHRcdFx0aWYgKG5ld0NsdXN0ZXIuX2NoaWxkQ291bnQgPiAyKSB7IC8vV2FzIGFscmVhZHkgYSBjbHVzdGVyXHJcblxyXG5cdFx0XHRcdFx0bmV3Q2x1c3Rlci5fdXBkYXRlSWNvbigpO1xyXG5cdFx0XHRcdFx0dGhpcy5fZm9yY2VMYXlvdXQoKTtcclxuXHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvblN0YXJ0KCk7XHJcblxyXG5cdFx0XHRcdFx0bGF5ZXIuX3NldFBvcyh0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KG5ld0NsdXN0ZXIuZ2V0TGF0TG5nKCkpKTtcclxuXHRcdFx0XHRcdGxheWVyLmNsdXN0ZXJIaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fZW5xdWV1ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdGZnLnJlbW92ZUxheWVyKGxheWVyKTtcclxuXHRcdFx0XHRcdFx0bGF5ZXIuY2x1c3RlclNob3coKTtcclxuXHJcblx0XHRcdFx0XHRcdG1lLl9hbmltYXRpb25FbmQoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9IGVsc2UgeyAvL0p1c3QgYmVjYW1lIGEgY2x1c3RlclxyXG5cdFx0XHRcdFx0dGhpcy5fZm9yY2VMYXlvdXQoKTtcclxuXHJcblx0XHRcdFx0XHRtZS5fYW5pbWF0aW9uU3RhcnQoKTtcclxuXHRcdFx0XHRcdG1lLl9hbmltYXRpb25ab29tT3V0U2luZ2xlKG5ld0NsdXN0ZXIsIHRoaXMuX21hcC5nZXRNYXhab29tKCksIHRoaXMuX3pvb20pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIFByaXZhdGUgbWV0aG9kcyBmb3IgYW5pbWF0ZWQgdmVyc2lvbnMuXHJcblx0X2FuaW1hdGlvblpvb21PdXRTaW5nbGU6IGZ1bmN0aW9uIChjbHVzdGVyLCBwcmV2aW91c1pvb21MZXZlbCwgbmV3Wm9vbUxldmVsKSB7XHJcblx0XHR2YXIgYm91bmRzID0gdGhpcy5fZ2V0RXhwYW5kZWRWaXNpYmxlQm91bmRzKCksXHJcblx0XHRcdG1pblpvb20gPSBNYXRoLmZsb29yKHRoaXMuX21hcC5nZXRNaW5ab29tKCkpO1xyXG5cclxuXHRcdC8vQW5pbWF0ZSBhbGwgb2YgdGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJzIHRvIG1vdmUgdG8gdGhlaXIgY2x1c3RlciBjZW50ZXIgcG9pbnRcclxuXHRcdGNsdXN0ZXIuX3JlY3Vyc2l2ZWx5QW5pbWF0ZUNoaWxkcmVuSW5BbmRBZGRTZWxmVG9NYXAoYm91bmRzLCBtaW5ab29tLCBwcmV2aW91c1pvb21MZXZlbCArIDEsIG5ld1pvb21MZXZlbCk7XHJcblxyXG5cdFx0dmFyIG1lID0gdGhpcztcclxuXHJcblx0XHQvL1VwZGF0ZSB0aGUgb3BhY2l0eSAoSWYgd2UgaW1tZWRpYXRlbHkgc2V0IGl0IHRoZXkgd29uJ3QgYW5pbWF0ZSlcclxuXHRcdHRoaXMuX2ZvcmNlTGF5b3V0KCk7XHJcblx0XHRjbHVzdGVyLl9yZWN1cnNpdmVseUJlY29tZVZpc2libGUoYm91bmRzLCBuZXdab29tTGV2ZWwpO1xyXG5cclxuXHRcdC8vVE9ETzogTWF5YmUgdXNlIHRoZSB0cmFuc2l0aW9uIHRpbWluZyBzdHVmZiB0byBtYWtlIHRoaXMgbW9yZSByZWxpYWJsZVxyXG5cdFx0Ly9XaGVuIHRoZSBhbmltYXRpb25zIGFyZSBkb25lLCB0aWR5IHVwXHJcblx0XHR0aGlzLl9lbnF1ZXVlKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdC8vVGhpcyBjbHVzdGVyIHN0b3BwZWQgYmVpbmcgYSBjbHVzdGVyIGJlZm9yZSB0aGUgdGltZW91dCBmaXJlZFxyXG5cdFx0XHRpZiAoY2x1c3Rlci5fY2hpbGRDb3VudCA9PT0gMSkge1xyXG5cdFx0XHRcdHZhciBtID0gY2x1c3Rlci5fbWFya2Vyc1swXTtcclxuXHRcdFx0XHQvL0lmIHdlIHdlcmUgaW4gYSBjbHVzdGVyIGFuaW1hdGlvbiBhdCB0aGUgdGltZSB0aGVuIHRoZSBvcGFjaXR5IGFuZCBwb3NpdGlvbiBvZiBvdXIgY2hpbGQgY291bGQgYmUgd3Jvbmcgbm93LCBzbyBmaXggaXRcclxuXHRcdFx0XHR0aGlzLl9pZ25vcmVNb3ZlID0gdHJ1ZTtcclxuXHRcdFx0XHRtLnNldExhdExuZyhtLmdldExhdExuZygpKTtcclxuXHRcdFx0XHR0aGlzLl9pZ25vcmVNb3ZlID0gZmFsc2U7XHJcblx0XHRcdFx0aWYgKG0uY2x1c3RlclNob3cpIHtcclxuXHRcdFx0XHRcdG0uY2x1c3RlclNob3coKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y2x1c3Rlci5fcmVjdXJzaXZlbHkoYm91bmRzLCBuZXdab29tTGV2ZWwsIG1pblpvb20sIGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdFx0XHRjLl9yZWN1cnNpdmVseVJlbW92ZUNoaWxkcmVuRnJvbU1hcChib3VuZHMsIG1pblpvb20sIHByZXZpb3VzWm9vbUxldmVsICsgMSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0bWUuX2FuaW1hdGlvbkVuZCgpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0X2FuaW1hdGlvbkVuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHR0aGlzLl9tYXAuX21hcFBhbmUuY2xhc3NOYW1lID0gdGhpcy5fbWFwLl9tYXBQYW5lLmNsYXNzTmFtZS5yZXBsYWNlKCcgbGVhZmxldC1jbHVzdGVyLWFuaW0nLCAnJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9pblpvb21BbmltYXRpb24tLTtcclxuXHRcdHRoaXMuZmlyZSgnYW5pbWF0aW9uZW5kJyk7XHJcblx0fSxcclxuXHJcblx0Ly9Gb3JjZSBhIGJyb3dzZXIgbGF5b3V0IG9mIHN0dWZmIGluIHRoZSBtYXBcclxuXHQvLyBTaG91bGQgYXBwbHkgdGhlIGN1cnJlbnQgb3BhY2l0eSBhbmQgbG9jYXRpb24gdG8gYWxsIGVsZW1lbnRzIHNvIHdlIGNhbiB1cGRhdGUgdGhlbSBhZ2FpbiBmb3IgYW4gYW5pbWF0aW9uXHJcblx0X2ZvcmNlTGF5b3V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHQvL0luIG15IHRlc3RpbmcgdGhpcyB3b3JrcywgaW5mYWN0IG9mZnNldFdpZHRoIG9mIGFueSBlbGVtZW50IHNlZW1zIHRvIHdvcmsuXHJcblx0XHQvL0NvdWxkIGxvb3AgYWxsIHRoaXMuX2xheWVycyBhbmQgZG8gdGhpcyBmb3IgZWFjaCBfaWNvbiBpZiBpdCBzdG9wcyB3b3JraW5nXHJcblxyXG5cdFx0TC5VdGlsLmZhbHNlRm4oZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwubWFya2VyQ2x1c3Rlckdyb3VwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuTWFya2VyQ2x1c3Rlckdyb3VwKG9wdGlvbnMpO1xyXG59O1xuXG52YXIgTWFya2VyQ2x1c3RlciA9IEwuTWFya2VyQ2x1c3RlciA9IEwuTWFya2VyLmV4dGVuZCh7XHJcblx0b3B0aW9uczogTC5JY29uLnByb3RvdHlwZS5vcHRpb25zLFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAoZ3JvdXAsIHpvb20sIGEsIGIpIHtcclxuXHJcblx0XHRMLk1hcmtlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGEgPyAoYS5fY0xhdExuZyB8fCBhLmdldExhdExuZygpKSA6IG5ldyBMLkxhdExuZygwLCAwKSxcclxuICAgICAgICAgICAgeyBpY29uOiB0aGlzLCBwYW5lOiBncm91cC5vcHRpb25zLmNsdXN0ZXJQYW5lIH0pO1xyXG5cclxuXHRcdHRoaXMuX2dyb3VwID0gZ3JvdXA7XHJcblx0XHR0aGlzLl96b29tID0gem9vbTtcclxuXHJcblx0XHR0aGlzLl9tYXJrZXJzID0gW107XHJcblx0XHR0aGlzLl9jaGlsZENsdXN0ZXJzID0gW107XHJcblx0XHR0aGlzLl9jaGlsZENvdW50ID0gMDtcclxuXHRcdHRoaXMuX2ljb25OZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0XHR0aGlzLl9ib3VuZHNOZWVkVXBkYXRlID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLl9ib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcclxuXHJcblx0XHRpZiAoYSkge1xyXG5cdFx0XHR0aGlzLl9hZGRDaGlsZChhKTtcclxuXHRcdH1cclxuXHRcdGlmIChiKSB7XHJcblx0XHRcdHRoaXMuX2FkZENoaWxkKGIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vUmVjdXJzaXZlbHkgcmV0cmlldmUgYWxsIGNoaWxkIG1hcmtlcnMgb2YgdGhpcyBjbHVzdGVyXHJcblx0Z2V0QWxsQ2hpbGRNYXJrZXJzOiBmdW5jdGlvbiAoc3RvcmFnZUFycmF5LCBpZ25vcmVEcmFnZ2VkTWFya2VyKSB7XHJcblx0XHRzdG9yYWdlQXJyYXkgPSBzdG9yYWdlQXJyYXkgfHwgW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0dGhpcy5fY2hpbGRDbHVzdGVyc1tpXS5nZXRBbGxDaGlsZE1hcmtlcnMoc3RvcmFnZUFycmF5KTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciBqID0gdGhpcy5fbWFya2Vycy5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xyXG5cdFx0XHRpZiAoaWdub3JlRHJhZ2dlZE1hcmtlciAmJiB0aGlzLl9tYXJrZXJzW2pdLl9fZHJhZ1N0YXJ0KSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHRcdFx0c3RvcmFnZUFycmF5LnB1c2godGhpcy5fbWFya2Vyc1tqXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0b3JhZ2VBcnJheTtcclxuXHR9LFxyXG5cclxuXHQvL1JldHVybnMgdGhlIGNvdW50IG9mIGhvdyBtYW55IGNoaWxkIG1hcmtlcnMgd2UgaGF2ZVxyXG5cdGdldENoaWxkQ291bnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGlsZENvdW50O1xyXG5cdH0sXHJcblxyXG5cdC8vWm9vbSB0byB0aGUgbWluaW11bSBvZiBzaG93aW5nIGFsbCBvZiB0aGUgY2hpbGQgbWFya2Vycywgb3IgdGhlIGV4dGVudHMgb2YgdGhpcyBjbHVzdGVyXHJcblx0em9vbVRvQm91bmRzOiBmdW5jdGlvbiAoZml0Qm91bmRzT3B0aW9ucykge1xyXG5cdFx0dmFyIGNoaWxkQ2x1c3RlcnMgPSB0aGlzLl9jaGlsZENsdXN0ZXJzLnNsaWNlKCksXHJcblx0XHRcdG1hcCA9IHRoaXMuX2dyb3VwLl9tYXAsXHJcblx0XHRcdGJvdW5kc1pvb20gPSBtYXAuZ2V0Qm91bmRzWm9vbSh0aGlzLl9ib3VuZHMpLFxyXG5cdFx0XHR6b29tID0gdGhpcy5fem9vbSArIDEsXHJcblx0XHRcdG1hcFpvb20gPSBtYXAuZ2V0Wm9vbSgpLFxyXG5cdFx0XHRpO1xyXG5cclxuXHRcdC8vY2FsY3VsYXRlIGhvdyBmYXIgd2UgbmVlZCB0byB6b29tIGRvd24gdG8gc2VlIGFsbCBvZiB0aGUgbWFya2Vyc1xyXG5cdFx0d2hpbGUgKGNoaWxkQ2x1c3RlcnMubGVuZ3RoID4gMCAmJiBib3VuZHNab29tID4gem9vbSkge1xyXG5cdFx0XHR6b29tKys7XHJcblx0XHRcdHZhciBuZXdDbHVzdGVycyA9IFtdO1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2hpbGRDbHVzdGVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdG5ld0NsdXN0ZXJzID0gbmV3Q2x1c3RlcnMuY29uY2F0KGNoaWxkQ2x1c3RlcnNbaV0uX2NoaWxkQ2x1c3RlcnMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNoaWxkQ2x1c3RlcnMgPSBuZXdDbHVzdGVycztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYm91bmRzWm9vbSA+IHpvb20pIHtcclxuXHRcdFx0dGhpcy5fZ3JvdXAuX21hcC5zZXRWaWV3KHRoaXMuX2xhdGxuZywgem9vbSk7XHJcblx0XHR9IGVsc2UgaWYgKGJvdW5kc1pvb20gPD0gbWFwWm9vbSkgeyAvL0lmIGZpdEJvdW5kcyB3b3VsZG4ndCB6b29tIHVzIGRvd24sIHpvb20gdXMgZG93biBpbnN0ZWFkXHJcblx0XHRcdHRoaXMuX2dyb3VwLl9tYXAuc2V0Vmlldyh0aGlzLl9sYXRsbmcsIG1hcFpvb20gKyAxKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX2dyb3VwLl9tYXAuZml0Qm91bmRzKHRoaXMuX2JvdW5kcywgZml0Qm91bmRzT3B0aW9ucyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Z2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKCk7XHJcblx0XHRib3VuZHMuZXh0ZW5kKHRoaXMuX2JvdW5kcyk7XHJcblx0XHRyZXR1cm4gYm91bmRzO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVJY29uOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9pY29uTmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cdFx0aWYgKHRoaXMuX2ljb24pIHtcclxuXHRcdFx0dGhpcy5zZXRJY29uKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vQ2x1ZGdlIGZvciBJY29uLCB3ZSBwcmV0ZW5kIHRvIGJlIGFuIGljb24gZm9yIHBlcmZvcm1hbmNlXHJcblx0Y3JlYXRlSWNvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX2ljb25OZWVkc1VwZGF0ZSkge1xyXG5cdFx0XHR0aGlzLl9pY29uT2JqID0gdGhpcy5fZ3JvdXAub3B0aW9ucy5pY29uQ3JlYXRlRnVuY3Rpb24odGhpcyk7XHJcblx0XHRcdHRoaXMuX2ljb25OZWVkc1VwZGF0ZSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuX2ljb25PYmouY3JlYXRlSWNvbigpO1xyXG5cdH0sXHJcblx0Y3JlYXRlU2hhZG93OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faWNvbk9iai5jcmVhdGVTaGFkb3coKTtcclxuXHR9LFxyXG5cclxuXHJcblx0X2FkZENoaWxkOiBmdW5jdGlvbiAobmV3MSwgaXNOb3RpZmljYXRpb25Gcm9tQ2hpbGQpIHtcclxuXHJcblx0XHR0aGlzLl9pY29uTmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX2JvdW5kc05lZWRVcGRhdGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5fc2V0Q2x1c3RlckNlbnRlcihuZXcxKTtcclxuXHJcblx0XHRpZiAobmV3MSBpbnN0YW5jZW9mIEwuTWFya2VyQ2x1c3Rlcikge1xyXG5cdFx0XHRpZiAoIWlzTm90aWZpY2F0aW9uRnJvbUNoaWxkKSB7XHJcblx0XHRcdFx0dGhpcy5fY2hpbGRDbHVzdGVycy5wdXNoKG5ldzEpO1xyXG5cdFx0XHRcdG5ldzEuX19wYXJlbnQgPSB0aGlzO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuX2NoaWxkQ291bnQgKz0gbmV3MS5fY2hpbGRDb3VudDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICghaXNOb3RpZmljYXRpb25Gcm9tQ2hpbGQpIHtcclxuXHRcdFx0XHR0aGlzLl9tYXJrZXJzLnB1c2gobmV3MSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5fY2hpbGRDb3VudCsrO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9fcGFyZW50KSB7XHJcblx0XHRcdHRoaXMuX19wYXJlbnQuX2FkZENoaWxkKG5ldzEsIHRydWUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIHN1cmUgdGhlIGNsdXN0ZXIgY2VudGVyIGlzIHNldC4gSWYgbm90LCB1c2VzIHRoZSBjaGlsZCBjZW50ZXIgaWYgaXQgaXMgYSBjbHVzdGVyLCBvciB0aGUgbWFya2VyIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBjaGlsZCBMLk1hcmtlckNsdXN0ZXJ8TC5NYXJrZXIgdGhhdCB3aWxsIGJlIHVzZWQgYXMgY2x1c3RlciBjZW50ZXIgaWYgbm90IGRlZmluZWQgeWV0LlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0X3NldENsdXN0ZXJDZW50ZXI6IGZ1bmN0aW9uIChjaGlsZCkge1xyXG5cdFx0aWYgKCF0aGlzLl9jTGF0TG5nKSB7XHJcblx0XHRcdC8vIHdoZW4gY2x1c3RlcmluZywgdGFrZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcG9pbnQgYXMgdGhlIGNsdXN0ZXIgY2VudGVyXHJcblx0XHRcdHRoaXMuX2NMYXRMbmcgPSBjaGlsZC5fY0xhdExuZyB8fCBjaGlsZC5fbGF0bG5nO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFzc2lnbnMgaW1wb3NzaWJsZSBib3VuZGluZyB2YWx1ZXMgc28gdGhhdCB0aGUgbmV4dCBleHRlbmQgZW50aXJlbHkgZGV0ZXJtaW5lcyB0aGUgbmV3IGJvdW5kcy5cclxuXHQgKiBUaGlzIG1ldGhvZCBhdm9pZHMgaGF2aW5nIHRvIHRyYXNoIHRoZSBwcmV2aW91cyBMLkxhdExuZ0JvdW5kcyBvYmplY3QgYW5kIHRvIGNyZWF0ZSBhIG5ldyBvbmUsIHdoaWNoIGlzIG11Y2ggc2xvd2VyIGZvciB0aGlzIGNsYXNzLlxyXG5cdCAqIEFzIGxvbmcgYXMgdGhlIGJvdW5kcyBhcmUgbm90IGV4dGVuZGVkLCBtb3N0IG90aGVyIG1ldGhvZHMgd291bGQgcHJvYmFibHkgZmFpbCwgYXMgdGhleSB3b3VsZCB3aXRoIGJvdW5kcyBpbml0aWFsaXplZCBidXQgbm90IGV4dGVuZGVkLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0X3Jlc2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xyXG5cclxuXHRcdGlmIChib3VuZHMuX3NvdXRoV2VzdCkge1xyXG5cdFx0XHRib3VuZHMuX3NvdXRoV2VzdC5sYXQgPSBJbmZpbml0eTtcclxuXHRcdFx0Ym91bmRzLl9zb3V0aFdlc3QubG5nID0gSW5maW5pdHk7XHJcblx0XHR9XHJcblx0XHRpZiAoYm91bmRzLl9ub3J0aEVhc3QpIHtcclxuXHRcdFx0Ym91bmRzLl9ub3J0aEVhc3QubGF0ID0gLUluZmluaXR5O1xyXG5cdFx0XHRib3VuZHMuX25vcnRoRWFzdC5sbmcgPSAtSW5maW5pdHk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3JlY2FsY3VsYXRlQm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbWFya2VycyA9IHRoaXMuX21hcmtlcnMsXHJcblx0XHQgICAgY2hpbGRDbHVzdGVycyA9IHRoaXMuX2NoaWxkQ2x1c3RlcnMsXHJcblx0XHQgICAgbGF0U3VtID0gMCxcclxuXHRcdCAgICBsbmdTdW0gPSAwLFxyXG5cdFx0ICAgIHRvdGFsQ291bnQgPSB0aGlzLl9jaGlsZENvdW50LFxyXG5cdFx0ICAgIGksIGNoaWxkLCBjaGlsZExhdExuZywgY2hpbGRDb3VudDtcclxuXHJcblx0XHQvLyBDYXNlIHdoZXJlIGFsbCBtYXJrZXJzIGFyZSByZW1vdmVkIGZyb20gdGhlIG1hcCBhbmQgd2UgYXJlIGxlZnQgd2l0aCBqdXN0IGFuIGVtcHR5IF90b3BDbHVzdGVyTGV2ZWwuXHJcblx0XHRpZiAodG90YWxDb3VudCA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVzZXQgcmF0aGVyIHRoYW4gY3JlYXRpbmcgYSBuZXcgb2JqZWN0LCBmb3IgcGVyZm9ybWFuY2UuXHJcblx0XHR0aGlzLl9yZXNldEJvdW5kcygpO1xyXG5cclxuXHRcdC8vIENoaWxkIG1hcmtlcnMuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbWFya2Vycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRjaGlsZExhdExuZyA9IG1hcmtlcnNbaV0uX2xhdGxuZztcclxuXHJcblx0XHRcdHRoaXMuX2JvdW5kcy5leHRlbmQoY2hpbGRMYXRMbmcpO1xyXG5cclxuXHRcdFx0bGF0U3VtICs9IGNoaWxkTGF0TG5nLmxhdDtcclxuXHRcdFx0bG5nU3VtICs9IGNoaWxkTGF0TG5nLmxuZztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaGlsZCBjbHVzdGVycy5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBjaGlsZENsdXN0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGNoaWxkID0gY2hpbGRDbHVzdGVyc1tpXTtcclxuXHJcblx0XHRcdC8vIFJlLWNvbXB1dGUgY2hpbGQgYm91bmRzIGFuZCB3ZWlnaHRlZCBwb3NpdGlvbiBmaXJzdCBpZiBuZWNlc3NhcnkuXHJcblx0XHRcdGlmIChjaGlsZC5fYm91bmRzTmVlZFVwZGF0ZSkge1xyXG5cdFx0XHRcdGNoaWxkLl9yZWNhbGN1bGF0ZUJvdW5kcygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9ib3VuZHMuZXh0ZW5kKGNoaWxkLl9ib3VuZHMpO1xyXG5cclxuXHRcdFx0Y2hpbGRMYXRMbmcgPSBjaGlsZC5fd0xhdExuZztcclxuXHRcdFx0Y2hpbGRDb3VudCA9IGNoaWxkLl9jaGlsZENvdW50O1xyXG5cclxuXHRcdFx0bGF0U3VtICs9IGNoaWxkTGF0TG5nLmxhdCAqIGNoaWxkQ291bnQ7XHJcblx0XHRcdGxuZ1N1bSArPSBjaGlsZExhdExuZy5sbmcgKiBjaGlsZENvdW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2xhdGxuZyA9IHRoaXMuX3dMYXRMbmcgPSBuZXcgTC5MYXRMbmcobGF0U3VtIC8gdG90YWxDb3VudCwgbG5nU3VtIC8gdG90YWxDb3VudCk7XHJcblxyXG5cdFx0Ly8gUmVzZXQgZGlydHkgZmxhZy5cclxuXHRcdHRoaXMuX2JvdW5kc05lZWRVcGRhdGUgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHQvL1NldCBvdXIgbWFya2VycyBwb3NpdGlvbiBhcyBnaXZlbiBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcclxuXHRfYWRkVG9NYXA6IGZ1bmN0aW9uIChzdGFydFBvcykge1xyXG5cdFx0aWYgKHN0YXJ0UG9zKSB7XHJcblx0XHRcdHRoaXMuX2JhY2t1cExhdGxuZyA9IHRoaXMuX2xhdGxuZztcclxuXHRcdFx0dGhpcy5zZXRMYXRMbmcoc3RhcnRQb3MpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fZ3JvdXAuX2ZlYXR1cmVHcm91cC5hZGRMYXllcih0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRfcmVjdXJzaXZlbHlBbmltYXRlQ2hpbGRyZW5JbjogZnVuY3Rpb24gKGJvdW5kcywgY2VudGVyLCBtYXhab29tKSB7XHJcblx0XHR0aGlzLl9yZWN1cnNpdmVseShib3VuZHMsIHRoaXMuX2dyb3VwLl9tYXAuZ2V0TWluWm9vbSgpLCBtYXhab29tIC0gMSxcclxuXHRcdFx0ZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0XHR2YXIgbWFya2VycyA9IGMuX21hcmtlcnMsXHJcblx0XHRcdFx0XHRpLCBtO1xyXG5cdFx0XHRcdGZvciAoaSA9IG1hcmtlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0XHRcdG0gPSBtYXJrZXJzW2ldO1xyXG5cclxuXHRcdFx0XHRcdC8vT25seSBkbyBpdCBpZiB0aGUgaWNvbiBpcyBzdGlsbCBvbiB0aGUgbWFwXHJcblx0XHRcdFx0XHRpZiAobS5faWNvbikge1xyXG5cdFx0XHRcdFx0XHRtLl9zZXRQb3MoY2VudGVyKTtcclxuXHRcdFx0XHRcdFx0bS5jbHVzdGVySGlkZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0XHR2YXIgY2hpbGRDbHVzdGVycyA9IGMuX2NoaWxkQ2x1c3RlcnMsXHJcblx0XHRcdFx0XHRqLCBjbTtcclxuXHRcdFx0XHRmb3IgKGogPSBjaGlsZENsdXN0ZXJzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcblx0XHRcdFx0XHRjbSA9IGNoaWxkQ2x1c3RlcnNbal07XHJcblx0XHRcdFx0XHRpZiAoY20uX2ljb24pIHtcclxuXHRcdFx0XHRcdFx0Y20uX3NldFBvcyhjZW50ZXIpO1xyXG5cdFx0XHRcdFx0XHRjbS5jbHVzdGVySGlkZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHRfcmVjdXJzaXZlbHlBbmltYXRlQ2hpbGRyZW5JbkFuZEFkZFNlbGZUb01hcDogZnVuY3Rpb24gKGJvdW5kcywgbWFwTWluWm9vbSwgcHJldmlvdXNab29tTGV2ZWwsIG5ld1pvb21MZXZlbCkge1xyXG5cdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCBuZXdab29tTGV2ZWwsIG1hcE1pblpvb20sXHJcblx0XHRcdGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdFx0Yy5fcmVjdXJzaXZlbHlBbmltYXRlQ2hpbGRyZW5Jbihib3VuZHMsIGMuX2dyb3VwLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGMuZ2V0TGF0TG5nKCkpLnJvdW5kKCksIHByZXZpb3VzWm9vbUxldmVsKTtcclxuXHJcblx0XHRcdFx0Ly9UT0RPOiBkZXB0aFRvQW5pbWF0ZUluIGFmZmVjdHMgX2lzU2luZ2xlUGFyZW50LCBpZiB0aGVyZSBpcyBhIG11bHRpem9vbSB3ZSBtYXkvbWF5IG5vdCBiZS5cclxuXHRcdFx0XHQvL0FzIGEgaGFjayB3ZSBvbmx5IGRvIGEgYW5pbWF0aW9uIGZyZWUgem9vbSBvbiBhIHNpbmdsZSBsZXZlbCB6b29tLCBpZiBzb21lb25lIGRvZXMgbXVsdGlwbGUgbGV2ZWxzIHRoZW4gd2UgYWx3YXlzIGFuaW1hdGVcclxuXHRcdFx0XHRpZiAoYy5faXNTaW5nbGVQYXJlbnQoKSAmJiBwcmV2aW91c1pvb21MZXZlbCAtIDEgPT09IG5ld1pvb21MZXZlbCkge1xyXG5cdFx0XHRcdFx0Yy5jbHVzdGVyU2hvdygpO1xyXG5cdFx0XHRcdFx0Yy5fcmVjdXJzaXZlbHlSZW1vdmVDaGlsZHJlbkZyb21NYXAoYm91bmRzLCBtYXBNaW5ab29tLCBwcmV2aW91c1pvb21MZXZlbCk7IC8vSW1tZWRpYXRlbHkgcmVtb3ZlIG91ciBjaGlsZHJlbiBhcyB3ZSBhcmUgcmVwbGFjaW5nIHRoZW0uIFRPRE8gcHJldmlvdXNCb3VuZHMgbm90IGJvdW5kc1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjLmNsdXN0ZXJIaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRjLl9hZGRUb01hcCgpO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdF9yZWN1cnNpdmVseUJlY29tZVZpc2libGU6IGZ1bmN0aW9uIChib3VuZHMsIHpvb21MZXZlbCkge1xyXG5cdFx0dGhpcy5fcmVjdXJzaXZlbHkoYm91bmRzLCB0aGlzLl9ncm91cC5fbWFwLmdldE1pblpvb20oKSwgem9vbUxldmVsLCBudWxsLCBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHRjLmNsdXN0ZXJTaG93KCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRfcmVjdXJzaXZlbHlBZGRDaGlsZHJlblRvTWFwOiBmdW5jdGlvbiAoc3RhcnRQb3MsIHpvb21MZXZlbCwgYm91bmRzKSB7XHJcblx0XHR0aGlzLl9yZWN1cnNpdmVseShib3VuZHMsIHRoaXMuX2dyb3VwLl9tYXAuZ2V0TWluWm9vbSgpIC0gMSwgem9vbUxldmVsLFxyXG5cdFx0XHRmdW5jdGlvbiAoYykge1xyXG5cdFx0XHRcdGlmICh6b29tTGV2ZWwgPT09IGMuX3pvb20pIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vQWRkIG91ciBjaGlsZCBtYXJrZXJzIGF0IHN0YXJ0UG9zIChzbyB0aGV5IGNhbiBiZSBhbmltYXRlZCBvdXQpXHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IGMuX21hcmtlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0XHRcdHZhciBubSA9IGMuX21hcmtlcnNbaV07XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFib3VuZHMuY29udGFpbnMobm0uX2xhdGxuZykpIHtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHN0YXJ0UG9zKSB7XHJcblx0XHRcdFx0XHRcdG5tLl9iYWNrdXBMYXRsbmcgPSBubS5nZXRMYXRMbmcoKTtcclxuXHJcblx0XHRcdFx0XHRcdG5tLnNldExhdExuZyhzdGFydFBvcyk7XHJcblx0XHRcdFx0XHRcdGlmIChubS5jbHVzdGVySGlkZSkge1xyXG5cdFx0XHRcdFx0XHRcdG5tLmNsdXN0ZXJIaWRlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRjLl9ncm91cC5fZmVhdHVyZUdyb3VwLmFkZExheWVyKG5tKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdFx0Yy5fYWRkVG9NYXAoc3RhcnRQb3MpO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cdF9yZWN1cnNpdmVseVJlc3RvcmVDaGlsZFBvc2l0aW9uczogZnVuY3Rpb24gKHpvb21MZXZlbCkge1xyXG5cdFx0Ly9GaXggcG9zaXRpb25zIG9mIGNoaWxkIG1hcmtlcnNcclxuXHRcdGZvciAodmFyIGkgPSB0aGlzLl9tYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdHZhciBubSA9IHRoaXMuX21hcmtlcnNbaV07XHJcblx0XHRcdGlmIChubS5fYmFja3VwTGF0bG5nKSB7XHJcblx0XHRcdFx0bm0uc2V0TGF0TG5nKG5tLl9iYWNrdXBMYXRsbmcpO1xyXG5cdFx0XHRcdGRlbGV0ZSBubS5fYmFja3VwTGF0bG5nO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHpvb21MZXZlbCAtIDEgPT09IHRoaXMuX3pvb20pIHtcclxuXHRcdFx0Ly9SZXBvc2l0aW9uIGNoaWxkIGNsdXN0ZXJzXHJcblx0XHRcdGZvciAodmFyIGogPSB0aGlzLl9jaGlsZENsdXN0ZXJzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcblx0XHRcdFx0dGhpcy5fY2hpbGRDbHVzdGVyc1tqXS5fcmVzdG9yZVBvc2l0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGZvciAodmFyIGsgPSB0aGlzLl9jaGlsZENsdXN0ZXJzLmxlbmd0aCAtIDE7IGsgPj0gMDsgay0tKSB7XHJcblx0XHRcdFx0dGhpcy5fY2hpbGRDbHVzdGVyc1trXS5fcmVjdXJzaXZlbHlSZXN0b3JlQ2hpbGRQb3NpdGlvbnMoem9vbUxldmVsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9yZXN0b3JlUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9iYWNrdXBMYXRsbmcpIHtcclxuXHRcdFx0dGhpcy5zZXRMYXRMbmcodGhpcy5fYmFja3VwTGF0bG5nKTtcclxuXHRcdFx0ZGVsZXRlIHRoaXMuX2JhY2t1cExhdGxuZztcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvL2V4Y2VwdEJvdW5kczogSWYgc2V0LCBkb24ndCByZW1vdmUgYW55IG1hcmtlcnMvY2x1c3RlcnMgaW4gaXRcclxuXHRfcmVjdXJzaXZlbHlSZW1vdmVDaGlsZHJlbkZyb21NYXA6IGZ1bmN0aW9uIChwcmV2aW91c0JvdW5kcywgbWFwTWluWm9vbSwgem9vbUxldmVsLCBleGNlcHRCb3VuZHMpIHtcclxuXHRcdHZhciBtLCBpO1xyXG5cdFx0dGhpcy5fcmVjdXJzaXZlbHkocHJldmlvdXNCb3VuZHMsIG1hcE1pblpvb20gLSAxLCB6b29tTGV2ZWwgLSAxLFxyXG5cdFx0XHRmdW5jdGlvbiAoYykge1xyXG5cdFx0XHRcdC8vUmVtb3ZlIG1hcmtlcnMgYXQgZXZlcnkgbGV2ZWxcclxuXHRcdFx0XHRmb3IgKGkgPSBjLl9tYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0XHRtID0gYy5fbWFya2Vyc1tpXTtcclxuXHRcdFx0XHRcdGlmICghZXhjZXB0Qm91bmRzIHx8ICFleGNlcHRCb3VuZHMuY29udGFpbnMobS5fbGF0bG5nKSkge1xyXG5cdFx0XHRcdFx0XHRjLl9ncm91cC5fZmVhdHVyZUdyb3VwLnJlbW92ZUxheWVyKG0pO1xyXG5cdFx0XHRcdFx0XHRpZiAobS5jbHVzdGVyU2hvdykge1xyXG5cdFx0XHRcdFx0XHRcdG0uY2x1c3RlclNob3coKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0XHQvL1JlbW92ZSBjaGlsZCBjbHVzdGVycyBhdCBqdXN0IHRoZSBib3R0b20gbGV2ZWxcclxuXHRcdFx0XHRmb3IgKGkgPSBjLl9jaGlsZENsdXN0ZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0XHRtID0gYy5fY2hpbGRDbHVzdGVyc1tpXTtcclxuXHRcdFx0XHRcdGlmICghZXhjZXB0Qm91bmRzIHx8ICFleGNlcHRCb3VuZHMuY29udGFpbnMobS5fbGF0bG5nKSkge1xyXG5cdFx0XHRcdFx0XHRjLl9ncm91cC5fZmVhdHVyZUdyb3VwLnJlbW92ZUxheWVyKG0pO1xyXG5cdFx0XHRcdFx0XHRpZiAobS5jbHVzdGVyU2hvdykge1xyXG5cdFx0XHRcdFx0XHRcdG0uY2x1c3RlclNob3coKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHQvL1J1biB0aGUgZ2l2ZW4gZnVuY3Rpb25zIHJlY3Vyc2l2ZWx5IHRvIHRoaXMgYW5kIGNoaWxkIGNsdXN0ZXJzXHJcblx0Ly8gYm91bmRzVG9BcHBseVRvOiBhIEwuTGF0TG5nQm91bmRzIHJlcHJlc2VudGluZyB0aGUgYm91bmRzIG9mIHdoYXQgY2x1c3RlcnMgdG8gcmVjdXJzZSBpbiB0b1xyXG5cdC8vIHpvb21MZXZlbFRvU3RhcnQ6IHpvb20gbGV2ZWwgdG8gc3RhcnQgcnVubmluZyBmdW5jdGlvbnMgKGluY2x1c2l2ZSlcclxuXHQvLyB6b29tTGV2ZWxUb1N0b3A6IHpvb20gbGV2ZWwgdG8gc3RvcCBydW5uaW5nIGZ1bmN0aW9ucyAoaW5jbHVzaXZlKVxyXG5cdC8vIHJ1bkF0RXZlcnlMZXZlbDogZnVuY3Rpb24gdGhhdCB0YWtlcyBhbiBMLk1hcmtlckNsdXN0ZXIgYXMgYW4gYXJndW1lbnQgdGhhdCBzaG91bGQgYmUgYXBwbGllZCBvbiBldmVyeSBsZXZlbFxyXG5cdC8vIHJ1bkF0Qm90dG9tTGV2ZWw6IGZ1bmN0aW9uIHRoYXQgdGFrZXMgYW4gTC5NYXJrZXJDbHVzdGVyIGFzIGFuIGFyZ3VtZW50IHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgYXQgb25seSB0aGUgYm90dG9tIGxldmVsXHJcblx0X3JlY3Vyc2l2ZWx5OiBmdW5jdGlvbiAoYm91bmRzVG9BcHBseVRvLCB6b29tTGV2ZWxUb1N0YXJ0LCB6b29tTGV2ZWxUb1N0b3AsIHJ1bkF0RXZlcnlMZXZlbCwgcnVuQXRCb3R0b21MZXZlbCkge1xyXG5cdFx0dmFyIGNoaWxkQ2x1c3RlcnMgPSB0aGlzLl9jaGlsZENsdXN0ZXJzLFxyXG5cdFx0ICAgIHpvb20gPSB0aGlzLl96b29tLFxyXG5cdFx0ICAgIGksIGM7XHJcblxyXG5cdFx0aWYgKHpvb21MZXZlbFRvU3RhcnQgPD0gem9vbSkge1xyXG5cdFx0XHRpZiAocnVuQXRFdmVyeUxldmVsKSB7XHJcblx0XHRcdFx0cnVuQXRFdmVyeUxldmVsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChydW5BdEJvdHRvbUxldmVsICYmIHpvb20gPT09IHpvb21MZXZlbFRvU3RvcCkge1xyXG5cdFx0XHRcdHJ1bkF0Qm90dG9tTGV2ZWwodGhpcyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoem9vbSA8IHpvb21MZXZlbFRvU3RhcnQgfHwgem9vbSA8IHpvb21MZXZlbFRvU3RvcCkge1xyXG5cdFx0XHRmb3IgKGkgPSBjaGlsZENsdXN0ZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0YyA9IGNoaWxkQ2x1c3RlcnNbaV07XHJcblx0XHRcdFx0aWYgKGMuX2JvdW5kc05lZWRVcGRhdGUpIHtcclxuXHRcdFx0XHRcdGMuX3JlY2FsY3VsYXRlQm91bmRzKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChib3VuZHNUb0FwcGx5VG8uaW50ZXJzZWN0cyhjLl9ib3VuZHMpKSB7XHJcblx0XHRcdFx0XHRjLl9yZWN1cnNpdmVseShib3VuZHNUb0FwcGx5VG8sIHpvb21MZXZlbFRvU3RhcnQsIHpvb21MZXZlbFRvU3RvcCwgcnVuQXRFdmVyeUxldmVsLCBydW5BdEJvdHRvbUxldmVsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvL1JldHVybnMgdHJ1ZSBpZiB3ZSBhcmUgdGhlIHBhcmVudCBvZiBvbmx5IG9uZSBjbHVzdGVyIGFuZCB0aGF0IGNsdXN0ZXIgaXMgdGhlIHNhbWUgYXMgdXNcclxuXHRfaXNTaW5nbGVQYXJlbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vRG9uJ3QgbmVlZCB0byBjaGVjayB0aGlzLl9tYXJrZXJzIGFzIHRoZSByZXN0IHdvbid0IHdvcmsgaWYgdGhlcmUgYXJlIGFueVxyXG5cdFx0cmV0dXJuIHRoaXMuX2NoaWxkQ2x1c3RlcnMubGVuZ3RoID4gMCAmJiB0aGlzLl9jaGlsZENsdXN0ZXJzWzBdLl9jaGlsZENvdW50ID09PSB0aGlzLl9jaGlsZENvdW50O1xyXG5cdH1cclxufSk7XG5cbi8qXHJcbiogRXh0ZW5kcyBMLk1hcmtlciB0byBpbmNsdWRlIHR3byBleHRyYSBtZXRob2RzOiBjbHVzdGVySGlkZSBhbmQgY2x1c3RlclNob3cuXHJcbiogXHJcbiogVGhleSB3b3JrIGFzIHNldE9wYWNpdHkoMCkgYW5kIHNldE9wYWNpdHkoMSkgcmVzcGVjdGl2ZWx5LCBidXRcclxuKiBkb24ndCBvdmVyd3JpdGUgdGhlIG9wdGlvbnMub3BhY2l0eVxyXG4qIFxyXG4qL1xyXG5cclxuTC5NYXJrZXIuaW5jbHVkZSh7XHJcblx0Y2x1c3RlckhpZGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBiYWNrdXAgPSB0aGlzLm9wdGlvbnMub3BhY2l0eTtcclxuXHRcdHRoaXMuc2V0T3BhY2l0eSgwKTtcclxuXHRcdHRoaXMub3B0aW9ucy5vcGFjaXR5ID0gYmFja3VwO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHRcclxuXHRjbHVzdGVyU2hvdzogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc2V0T3BhY2l0eSh0aGlzLm9wdGlvbnMub3BhY2l0eSk7XHJcblx0fVxyXG59KTtcblxuTC5EaXN0YW5jZUdyaWQgPSBmdW5jdGlvbiAoY2VsbFNpemUpIHtcclxuXHR0aGlzLl9jZWxsU2l6ZSA9IGNlbGxTaXplO1xyXG5cdHRoaXMuX3NxQ2VsbFNpemUgPSBjZWxsU2l6ZSAqIGNlbGxTaXplO1xyXG5cdHRoaXMuX2dyaWQgPSB7fTtcclxuXHR0aGlzLl9vYmplY3RQb2ludCA9IHsgfTtcclxufTtcclxuXHJcbkwuRGlzdGFuY2VHcmlkLnByb3RvdHlwZSA9IHtcclxuXHJcblx0YWRkT2JqZWN0OiBmdW5jdGlvbiAob2JqLCBwb2ludCkge1xyXG5cdFx0dmFyIHggPSB0aGlzLl9nZXRDb29yZChwb2ludC54KSxcclxuXHRcdCAgICB5ID0gdGhpcy5fZ2V0Q29vcmQocG9pbnQueSksXHJcblx0XHQgICAgZ3JpZCA9IHRoaXMuX2dyaWQsXHJcblx0XHQgICAgcm93ID0gZ3JpZFt5XSA9IGdyaWRbeV0gfHwge30sXHJcblx0XHQgICAgY2VsbCA9IHJvd1t4XSA9IHJvd1t4XSB8fCBbXSxcclxuXHRcdCAgICBzdGFtcCA9IEwuVXRpbC5zdGFtcChvYmopO1xyXG5cclxuXHRcdHRoaXMuX29iamVjdFBvaW50W3N0YW1wXSA9IHBvaW50O1xyXG5cclxuXHRcdGNlbGwucHVzaChvYmopO1xyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZU9iamVjdDogZnVuY3Rpb24gKG9iaiwgcG9pbnQpIHtcclxuXHRcdHRoaXMucmVtb3ZlT2JqZWN0KG9iaik7XHJcblx0XHR0aGlzLmFkZE9iamVjdChvYmosIHBvaW50KTtcclxuXHR9LFxyXG5cclxuXHQvL1JldHVybnMgdHJ1ZSBpZiB0aGUgb2JqZWN0IHdhcyBmb3VuZFxyXG5cdHJlbW92ZU9iamVjdDogZnVuY3Rpb24gKG9iaiwgcG9pbnQpIHtcclxuXHRcdHZhciB4ID0gdGhpcy5fZ2V0Q29vcmQocG9pbnQueCksXHJcblx0XHQgICAgeSA9IHRoaXMuX2dldENvb3JkKHBvaW50LnkpLFxyXG5cdFx0ICAgIGdyaWQgPSB0aGlzLl9ncmlkLFxyXG5cdFx0ICAgIHJvdyA9IGdyaWRbeV0gPSBncmlkW3ldIHx8IHt9LFxyXG5cdFx0ICAgIGNlbGwgPSByb3dbeF0gPSByb3dbeF0gfHwgW10sXHJcblx0XHQgICAgaSwgbGVuO1xyXG5cclxuXHRcdGRlbGV0ZSB0aGlzLl9vYmplY3RQb2ludFtMLlV0aWwuc3RhbXAob2JqKV07XHJcblxyXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY2VsbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAoY2VsbFtpXSA9PT0gb2JqKSB7XHJcblxyXG5cdFx0XHRcdGNlbGwuc3BsaWNlKGksIDEpO1xyXG5cclxuXHRcdFx0XHRpZiAobGVuID09PSAxKSB7XHJcblx0XHRcdFx0XHRkZWxldGUgcm93W3hdO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0ZWFjaE9iamVjdDogZnVuY3Rpb24gKGZuLCBjb250ZXh0KSB7XHJcblx0XHR2YXIgaSwgaiwgaywgbGVuLCByb3csIGNlbGwsIHJlbW92ZWQsXHJcblx0XHQgICAgZ3JpZCA9IHRoaXMuX2dyaWQ7XHJcblxyXG5cdFx0Zm9yIChpIGluIGdyaWQpIHtcclxuXHRcdFx0cm93ID0gZ3JpZFtpXTtcclxuXHJcblx0XHRcdGZvciAoaiBpbiByb3cpIHtcclxuXHRcdFx0XHRjZWxsID0gcm93W2pdO1xyXG5cclxuXHRcdFx0XHRmb3IgKGsgPSAwLCBsZW4gPSBjZWxsLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XHJcblx0XHRcdFx0XHRyZW1vdmVkID0gZm4uY2FsbChjb250ZXh0LCBjZWxsW2tdKTtcclxuXHRcdFx0XHRcdGlmIChyZW1vdmVkKSB7XHJcblx0XHRcdFx0XHRcdGstLTtcclxuXHRcdFx0XHRcdFx0bGVuLS07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Z2V0TmVhck9iamVjdDogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHR2YXIgeCA9IHRoaXMuX2dldENvb3JkKHBvaW50LngpLFxyXG5cdFx0ICAgIHkgPSB0aGlzLl9nZXRDb29yZChwb2ludC55KSxcclxuXHRcdCAgICBpLCBqLCBrLCByb3csIGNlbGwsIGxlbiwgb2JqLCBkaXN0LFxyXG5cdFx0ICAgIG9iamVjdFBvaW50ID0gdGhpcy5fb2JqZWN0UG9pbnQsXHJcblx0XHQgICAgY2xvc2VzdERpc3RTcSA9IHRoaXMuX3NxQ2VsbFNpemUsXHJcblx0XHQgICAgY2xvc2VzdCA9IG51bGw7XHJcblxyXG5cdFx0Zm9yIChpID0geSAtIDE7IGkgPD0geSArIDE7IGkrKykge1xyXG5cdFx0XHRyb3cgPSB0aGlzLl9ncmlkW2ldO1xyXG5cdFx0XHRpZiAocm93KSB7XHJcblxyXG5cdFx0XHRcdGZvciAoaiA9IHggLSAxOyBqIDw9IHggKyAxOyBqKyspIHtcclxuXHRcdFx0XHRcdGNlbGwgPSByb3dbal07XHJcblx0XHRcdFx0XHRpZiAoY2VsbCkge1xyXG5cclxuXHRcdFx0XHRcdFx0Zm9yIChrID0gMCwgbGVuID0gY2VsbC5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xyXG5cdFx0XHRcdFx0XHRcdG9iaiA9IGNlbGxba107XHJcblx0XHRcdFx0XHRcdFx0ZGlzdCA9IHRoaXMuX3NxRGlzdChvYmplY3RQb2ludFtMLlV0aWwuc3RhbXAob2JqKV0sIHBvaW50KTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZGlzdCA8IGNsb3Nlc3REaXN0U3EgfHxcclxuXHRcdFx0XHRcdFx0XHRcdGRpc3QgPD0gY2xvc2VzdERpc3RTcSAmJiBjbG9zZXN0ID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjbG9zZXN0RGlzdFNxID0gZGlzdDtcclxuXHRcdFx0XHRcdFx0XHRcdGNsb3Nlc3QgPSBvYmo7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY2xvc2VzdDtcclxuXHR9LFxyXG5cclxuXHRfZ2V0Q29vcmQ6IGZ1bmN0aW9uICh4KSB7XHJcblx0XHR2YXIgY29vcmQgPSBNYXRoLmZsb29yKHggLyB0aGlzLl9jZWxsU2l6ZSk7XHJcblx0XHRyZXR1cm4gaXNGaW5pdGUoY29vcmQpID8gY29vcmQgOiB4O1xyXG5cdH0sXHJcblxyXG5cdF9zcURpc3Q6IGZ1bmN0aW9uIChwLCBwMikge1xyXG5cdFx0dmFyIGR4ID0gcDIueCAtIHAueCxcclxuXHRcdCAgICBkeSA9IHAyLnkgLSBwLnk7XHJcblx0XHRyZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XHJcblx0fVxyXG59O1xuXG4vKiBDb3B5cmlnaHQgKGMpIDIwMTIgdGhlIGF1dGhvcnMgbGlzdGVkIGF0IHRoZSBmb2xsb3dpbmcgVVJMLCBhbmQvb3JcclxudGhlIGF1dGhvcnMgb2YgcmVmZXJlbmNlZCBhcnRpY2xlcyBvciBpbmNvcnBvcmF0ZWQgZXh0ZXJuYWwgY29kZTpcclxuaHR0cDovL2VuLmxpdGVyYXRlcHJvZ3JhbXMub3JnL1F1aWNraHVsbF8oSmF2YXNjcmlwdCk/YWN0aW9uPWhpc3Rvcnkmb2Zmc2V0PTIwMTIwNDEwMTc1MjU2XHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcclxuYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXHJcblwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xyXG53aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXHJcbmRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xyXG5wZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG9cclxudGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcclxuaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxyXG5FWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcclxuTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULlxyXG5JTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWVxyXG5DTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULFxyXG5UT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRVxyXG5TT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuXHJcblJldHJpZXZlZCBmcm9tOiBodHRwOi8vZW4ubGl0ZXJhdGVwcm9ncmFtcy5vcmcvUXVpY2todWxsXyhKYXZhc2NyaXB0KT9vbGRpZD0xODQzNFxyXG4qL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHRMLlF1aWNrSHVsbCA9IHtcclxuXHJcblx0XHQvKlxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGNwdCBhIHBvaW50IHRvIGJlIG1lYXN1cmVkIGZyb20gdGhlIGJhc2VsaW5lXHJcblx0XHQgKiBAcGFyYW0ge0FycmF5fSBibCB0aGUgYmFzZWxpbmUsIGFzIHJlcHJlc2VudGVkIGJ5IGEgdHdvLWVsZW1lbnRcclxuXHRcdCAqICAgYXJyYXkgb2YgbGF0bG5nIG9iamVjdHMuXHJcblx0XHQgKiBAcmV0dXJucyB7TnVtYmVyfSBhbiBhcHByb3hpbWF0ZSBkaXN0YW5jZSBtZWFzdXJlXHJcblx0XHQgKi9cclxuXHRcdGdldERpc3RhbnQ6IGZ1bmN0aW9uIChjcHQsIGJsKSB7XHJcblx0XHRcdHZhciB2WSA9IGJsWzFdLmxhdCAtIGJsWzBdLmxhdCxcclxuXHRcdFx0XHR2WCA9IGJsWzBdLmxuZyAtIGJsWzFdLmxuZztcclxuXHRcdFx0cmV0dXJuICh2WCAqIChjcHQubGF0IC0gYmxbMF0ubGF0KSArIHZZICogKGNwdC5sbmcgLSBibFswXS5sbmcpKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0LypcclxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9IGJhc2VMaW5lIGEgdHdvLWVsZW1lbnQgYXJyYXkgb2YgbGF0bG5nIG9iamVjdHNcclxuXHRcdCAqICAgcmVwcmVzZW50aW5nIHRoZSBiYXNlbGluZSB0byBwcm9qZWN0IGZyb21cclxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9IGxhdExuZ3MgYW4gYXJyYXkgb2YgbGF0bG5nIG9iamVjdHNcclxuXHRcdCAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBtYXhpbXVtIHBvaW50IGFuZCBhbGwgbmV3IHBvaW50cyB0byBzdGF5XHJcblx0XHQgKiAgIGluIGNvbnNpZGVyYXRpb24gZm9yIHRoZSBodWxsLlxyXG5cdFx0ICovXHJcblx0XHRmaW5kTW9zdERpc3RhbnRQb2ludEZyb21CYXNlTGluZTogZnVuY3Rpb24gKGJhc2VMaW5lLCBsYXRMbmdzKSB7XHJcblx0XHRcdHZhciBtYXhEID0gMCxcclxuXHRcdFx0XHRtYXhQdCA9IG51bGwsXHJcblx0XHRcdFx0bmV3UG9pbnRzID0gW10sXHJcblx0XHRcdFx0aSwgcHQsIGQ7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSBsYXRMbmdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0cHQgPSBsYXRMbmdzW2ldO1xyXG5cdFx0XHRcdGQgPSB0aGlzLmdldERpc3RhbnQocHQsIGJhc2VMaW5lKTtcclxuXHJcblx0XHRcdFx0aWYgKGQgPiAwKSB7XHJcblx0XHRcdFx0XHRuZXdQb2ludHMucHVzaChwdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGQgPiBtYXhEKSB7XHJcblx0XHRcdFx0XHRtYXhEID0gZDtcclxuXHRcdFx0XHRcdG1heFB0ID0gcHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4geyBtYXhQb2ludDogbWF4UHQsIG5ld1BvaW50czogbmV3UG9pbnRzIH07XHJcblx0XHR9LFxyXG5cclxuXHJcblx0XHQvKlxyXG5cdFx0ICogR2l2ZW4gYSBiYXNlbGluZSwgY29tcHV0ZSB0aGUgY29udmV4IGh1bGwgb2YgbGF0TG5ncyBhcyBhbiBhcnJheVxyXG5cdFx0ICogb2YgbGF0TG5ncy5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge0FycmF5fSBsYXRMbmdzXHJcblx0XHQgKiBAcmV0dXJucyB7QXJyYXl9XHJcblx0XHQgKi9cclxuXHRcdGJ1aWxkQ29udmV4SHVsbDogZnVuY3Rpb24gKGJhc2VMaW5lLCBsYXRMbmdzKSB7XHJcblx0XHRcdHZhciBjb252ZXhIdWxsQmFzZUxpbmVzID0gW10sXHJcblx0XHRcdFx0dCA9IHRoaXMuZmluZE1vc3REaXN0YW50UG9pbnRGcm9tQmFzZUxpbmUoYmFzZUxpbmUsIGxhdExuZ3MpO1xyXG5cclxuXHRcdFx0aWYgKHQubWF4UG9pbnQpIHsgLy8gaWYgdGhlcmUgaXMgc3RpbGwgYSBwb2ludCBcIm91dHNpZGVcIiB0aGUgYmFzZSBsaW5lXHJcblx0XHRcdFx0Y29udmV4SHVsbEJhc2VMaW5lcyA9XHJcblx0XHRcdFx0XHRjb252ZXhIdWxsQmFzZUxpbmVzLmNvbmNhdChcclxuXHRcdFx0XHRcdFx0dGhpcy5idWlsZENvbnZleEh1bGwoW2Jhc2VMaW5lWzBdLCB0Lm1heFBvaW50XSwgdC5uZXdQb2ludHMpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdGNvbnZleEh1bGxCYXNlTGluZXMgPVxyXG5cdFx0XHRcdFx0Y29udmV4SHVsbEJhc2VMaW5lcy5jb25jYXQoXHJcblx0XHRcdFx0XHRcdHRoaXMuYnVpbGRDb252ZXhIdWxsKFt0Lm1heFBvaW50LCBiYXNlTGluZVsxXV0sIHQubmV3UG9pbnRzKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRyZXR1cm4gY29udmV4SHVsbEJhc2VMaW5lcztcclxuXHRcdFx0fSBlbHNlIHsgIC8vIGlmIHRoZXJlIGlzIG5vIG1vcmUgcG9pbnQgXCJvdXRzaWRlXCIgdGhlIGJhc2UgbGluZSwgdGhlIGN1cnJlbnQgYmFzZSBsaW5lIGlzIHBhcnQgb2YgdGhlIGNvbnZleCBodWxsXHJcblx0XHRcdFx0cmV0dXJuIFtiYXNlTGluZVswXV07XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LypcclxuXHRcdCAqIEdpdmVuIGFuIGFycmF5IG9mIGxhdGxuZ3MsIGNvbXB1dGUgYSBjb252ZXggaHVsbCBhcyBhbiBhcnJheVxyXG5cdFx0ICogb2YgbGF0bG5nc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9IGxhdExuZ3NcclxuXHRcdCAqIEByZXR1cm5zIHtBcnJheX1cclxuXHRcdCAqL1xyXG5cdFx0Z2V0Q29udmV4SHVsbDogZnVuY3Rpb24gKGxhdExuZ3MpIHtcclxuXHRcdFx0Ly8gZmluZCBmaXJzdCBiYXNlbGluZVxyXG5cdFx0XHR2YXIgbWF4TGF0ID0gZmFsc2UsIG1pbkxhdCA9IGZhbHNlLFxyXG5cdFx0XHRcdG1heExuZyA9IGZhbHNlLCBtaW5MbmcgPSBmYWxzZSxcclxuXHRcdFx0XHRtYXhMYXRQdCA9IG51bGwsIG1pbkxhdFB0ID0gbnVsbCxcclxuXHRcdFx0XHRtYXhMbmdQdCA9IG51bGwsIG1pbkxuZ1B0ID0gbnVsbCxcclxuXHRcdFx0XHRtYXhQdCA9IG51bGwsIG1pblB0ID0gbnVsbCxcclxuXHRcdFx0XHRpO1xyXG5cclxuXHRcdFx0Zm9yIChpID0gbGF0TG5ncy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRcdHZhciBwdCA9IGxhdExuZ3NbaV07XHJcblx0XHRcdFx0aWYgKG1heExhdCA9PT0gZmFsc2UgfHwgcHQubGF0ID4gbWF4TGF0KSB7XHJcblx0XHRcdFx0XHRtYXhMYXRQdCA9IHB0O1xyXG5cdFx0XHRcdFx0bWF4TGF0ID0gcHQubGF0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAobWluTGF0ID09PSBmYWxzZSB8fCBwdC5sYXQgPCBtaW5MYXQpIHtcclxuXHRcdFx0XHRcdG1pbkxhdFB0ID0gcHQ7XHJcblx0XHRcdFx0XHRtaW5MYXQgPSBwdC5sYXQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChtYXhMbmcgPT09IGZhbHNlIHx8IHB0LmxuZyA+IG1heExuZykge1xyXG5cdFx0XHRcdFx0bWF4TG5nUHQgPSBwdDtcclxuXHRcdFx0XHRcdG1heExuZyA9IHB0LmxuZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG1pbkxuZyA9PT0gZmFsc2UgfHwgcHQubG5nIDwgbWluTG5nKSB7XHJcblx0XHRcdFx0XHRtaW5MbmdQdCA9IHB0O1xyXG5cdFx0XHRcdFx0bWluTG5nID0gcHQubG5nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYgKG1pbkxhdCAhPT0gbWF4TGF0KSB7XHJcblx0XHRcdFx0bWluUHQgPSBtaW5MYXRQdDtcclxuXHRcdFx0XHRtYXhQdCA9IG1heExhdFB0O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG1pblB0ID0gbWluTG5nUHQ7XHJcblx0XHRcdFx0bWF4UHQgPSBtYXhMbmdQdDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGNoID0gW10uY29uY2F0KHRoaXMuYnVpbGRDb252ZXhIdWxsKFttaW5QdCwgbWF4UHRdLCBsYXRMbmdzKSxcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYnVpbGRDb252ZXhIdWxsKFttYXhQdCwgbWluUHRdLCBsYXRMbmdzKSk7XHJcblx0XHRcdHJldHVybiBjaDtcclxuXHRcdH1cclxuXHR9O1xyXG59KCkpO1xyXG5cclxuTC5NYXJrZXJDbHVzdGVyLmluY2x1ZGUoe1xyXG5cdGdldENvbnZleEh1bGw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBjaGlsZE1hcmtlcnMgPSB0aGlzLmdldEFsbENoaWxkTWFya2VycygpLFxyXG5cdFx0XHRwb2ludHMgPSBbXSxcclxuXHRcdFx0cCwgaTtcclxuXHJcblx0XHRmb3IgKGkgPSBjaGlsZE1hcmtlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0cCA9IGNoaWxkTWFya2Vyc1tpXS5nZXRMYXRMbmcoKTtcclxuXHRcdFx0cG9pbnRzLnB1c2gocCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIEwuUXVpY2tIdWxsLmdldENvbnZleEh1bGwocG9pbnRzKTtcclxuXHR9XHJcbn0pO1xuXG4vL1RoaXMgY29kZSBpcyAxMDAlIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXdqL092ZXJsYXBwaW5nTWFya2VyU3BpZGVyZmllci1MZWFmbGV0XHJcbi8vSHVnZSB0aGFua3MgdG8gamF3aiBmb3IgaW1wbGVtZW50aW5nIGl0IGZpcnN0IHRvIG1ha2UgbXkgam9iIGVhc3kgOi0pXHJcblxyXG5MLk1hcmtlckNsdXN0ZXIuaW5jbHVkZSh7XHJcblxyXG5cdF8yUEk6IE1hdGguUEkgKiAyLFxyXG5cdF9jaXJjbGVGb290U2VwYXJhdGlvbjogMjUsIC8vcmVsYXRlZCB0byBjaXJjdW1mZXJlbmNlIG9mIGNpcmNsZVxyXG5cdF9jaXJjbGVTdGFydEFuZ2xlOiAwLFxyXG5cclxuXHRfc3BpcmFsRm9vdFNlcGFyYXRpb246ICAyOCwgLy9yZWxhdGVkIHRvIHNpemUgb2Ygc3BpcmFsIChleHBlcmltZW50ISlcclxuXHRfc3BpcmFsTGVuZ3RoU3RhcnQ6IDExLFxyXG5cdF9zcGlyYWxMZW5ndGhGYWN0b3I6IDUsXHJcblxyXG5cdF9jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyOiA5LCAvL3Nob3cgc3BpcmFsIGluc3RlYWQgb2YgY2lyY2xlIGZyb20gdGhpcyBtYXJrZXIgY291bnQgdXB3YXJkcy5cclxuXHRcdFx0XHRcdFx0XHRcdC8vIDAgLT4gYWx3YXlzIHNwaXJhbDsgSW5maW5pdHkgLT4gYWx3YXlzIGNpcmNsZVxyXG5cclxuXHRzcGlkZXJmeTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX2dyb3VwLl9zcGlkZXJmaWVkID09PSB0aGlzIHx8IHRoaXMuX2dyb3VwLl9pblpvb21BbmltYXRpb24pIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjaGlsZE1hcmtlcnMgPSB0aGlzLmdldEFsbENoaWxkTWFya2VycyhudWxsLCB0cnVlKSxcclxuXHRcdFx0Z3JvdXAgPSB0aGlzLl9ncm91cCxcclxuXHRcdFx0bWFwID0gZ3JvdXAuX21hcCxcclxuXHRcdFx0Y2VudGVyID0gbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9sYXRsbmcpLFxyXG5cdFx0XHRwb3NpdGlvbnM7XHJcblxyXG5cdFx0dGhpcy5fZ3JvdXAuX3Vuc3BpZGVyZnkoKTtcclxuXHRcdHRoaXMuX2dyb3VwLl9zcGlkZXJmaWVkID0gdGhpcztcclxuXHJcblx0XHQvL1RPRE8gTWF5YmU6IGNoaWxkTWFya2VycyBvcmRlciBieSBkaXN0YW5jZSB0byBjZW50ZXJcclxuXHJcblx0XHRpZiAoY2hpbGRNYXJrZXJzLmxlbmd0aCA+PSB0aGlzLl9jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyKSB7XHJcblx0XHRcdHBvc2l0aW9ucyA9IHRoaXMuX2dlbmVyYXRlUG9pbnRzU3BpcmFsKGNoaWxkTWFya2Vycy5sZW5ndGgsIGNlbnRlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjZW50ZXIueSArPSAxMDsgLy8gT3RoZXJ3aXNlIGNpcmNsZXMgbG9vayB3cm9uZyA9PiBoYWNrIGZvciBzdGFuZGFyZCBibHVlIGljb24sIHJlbmRlcnMgZGlmZmVyZW50bHkgZm9yIG90aGVyIGljb25zLlxyXG5cdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9nZW5lcmF0ZVBvaW50c0NpcmNsZShjaGlsZE1hcmtlcnMubGVuZ3RoLCBjZW50ZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2FuaW1hdGlvblNwaWRlcmZ5KGNoaWxkTWFya2VycywgcG9zaXRpb25zKTtcclxuXHR9LFxyXG5cclxuXHR1bnNwaWRlcmZ5OiBmdW5jdGlvbiAoem9vbURldGFpbHMpIHtcclxuXHRcdC8vLyA8cGFyYW0gTmFtZT1cInpvb21EZXRhaWxzXCI+QXJndW1lbnQgZnJvbSB6b29tYW5pbSBpZiBiZWluZyBjYWxsZWQgaW4gYSB6b29tIGFuaW1hdGlvbiBvciBudWxsIG90aGVyd2lzZTwvcGFyYW0+XHJcblx0XHRpZiAodGhpcy5fZ3JvdXAuX2luWm9vbUFuaW1hdGlvbikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLl9hbmltYXRpb25VbnNwaWRlcmZ5KHpvb21EZXRhaWxzKTtcclxuXHJcblx0XHR0aGlzLl9ncm91cC5fc3BpZGVyZmllZCA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0X2dlbmVyYXRlUG9pbnRzQ2lyY2xlOiBmdW5jdGlvbiAoY291bnQsIGNlbnRlclB0KSB7XHJcblx0XHR2YXIgY2lyY3VtZmVyZW5jZSA9IHRoaXMuX2dyb3VwLm9wdGlvbnMuc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgKiB0aGlzLl9jaXJjbGVGb290U2VwYXJhdGlvbiAqICgyICsgY291bnQpLFxyXG5cdFx0XHRsZWdMZW5ndGggPSBjaXJjdW1mZXJlbmNlIC8gdGhpcy5fMlBJLCAgLy9yYWRpdXMgZnJvbSBjaXJjdW1mZXJlbmNlXHJcblx0XHRcdGFuZ2xlU3RlcCA9IHRoaXMuXzJQSSAvIGNvdW50LFxyXG5cdFx0XHRyZXMgPSBbXSxcclxuXHRcdFx0aSwgYW5nbGU7XHJcblxyXG5cdFx0bGVnTGVuZ3RoID0gTWF0aC5tYXgobGVnTGVuZ3RoLCAzNSk7IC8vIE1pbmltdW0gZGlzdGFuY2UgdG8gZ2V0IG91dHNpZGUgdGhlIGNsdXN0ZXIgaWNvbi5cclxuXHJcblx0XHRyZXMubGVuZ3RoID0gY291bnQ7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGNvdW50OyBpKyspIHsgLy8gQ2xvY2t3aXNlLCBsaWtlIHNwaXJhbC5cclxuXHRcdFx0YW5nbGUgPSB0aGlzLl9jaXJjbGVTdGFydEFuZ2xlICsgaSAqIGFuZ2xlU3RlcDtcclxuXHRcdFx0cmVzW2ldID0gbmV3IEwuUG9pbnQoY2VudGVyUHQueCArIGxlZ0xlbmd0aCAqIE1hdGguY29zKGFuZ2xlKSwgY2VudGVyUHQueSArIGxlZ0xlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSkuX3JvdW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcztcclxuXHR9LFxyXG5cclxuXHRfZ2VuZXJhdGVQb2ludHNTcGlyYWw6IGZ1bmN0aW9uIChjb3VudCwgY2VudGVyUHQpIHtcclxuXHRcdHZhciBzcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciA9IHRoaXMuX2dyb3VwLm9wdGlvbnMuc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIsXHJcblx0XHRcdGxlZ0xlbmd0aCA9IHNwaWRlcmZ5RGlzdGFuY2VNdWx0aXBsaWVyICogdGhpcy5fc3BpcmFsTGVuZ3RoU3RhcnQsXHJcblx0XHRcdHNlcGFyYXRpb24gPSBzcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciAqIHRoaXMuX3NwaXJhbEZvb3RTZXBhcmF0aW9uLFxyXG5cdFx0XHRsZW5ndGhGYWN0b3IgPSBzcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciAqIHRoaXMuX3NwaXJhbExlbmd0aEZhY3RvciAqIHRoaXMuXzJQSSxcclxuXHRcdFx0YW5nbGUgPSAwLFxyXG5cdFx0XHRyZXMgPSBbXSxcclxuXHRcdFx0aTtcclxuXHJcblx0XHRyZXMubGVuZ3RoID0gY291bnQ7XHJcblxyXG5cdFx0Ly8gSGlnaGVyIGluZGV4LCBjbG9zZXIgcG9zaXRpb24gdG8gY2x1c3RlciBjZW50ZXIuXHJcblx0XHRmb3IgKGkgPSBjb3VudDsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0Ly8gU2tpcCB0aGUgZmlyc3QgcG9zaXRpb24sIHNvIHRoYXQgd2UgYXJlIGFscmVhZHkgZmFydGhlciBmcm9tIGNlbnRlciBhbmQgd2UgYXZvaWRcclxuXHRcdFx0Ly8gYmVpbmcgdW5kZXIgdGhlIGRlZmF1bHQgY2x1c3RlciBpY29uIChlc3BlY2lhbGx5IGltcG9ydGFudCBmb3IgQ2lyY2xlIE1hcmtlcnMpLlxyXG5cdFx0XHRpZiAoaSA8IGNvdW50KSB7XHJcblx0XHRcdFx0cmVzW2ldID0gbmV3IEwuUG9pbnQoY2VudGVyUHQueCArIGxlZ0xlbmd0aCAqIE1hdGguY29zKGFuZ2xlKSwgY2VudGVyUHQueSArIGxlZ0xlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSkuX3JvdW5kKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0YW5nbGUgKz0gc2VwYXJhdGlvbiAvIGxlZ0xlbmd0aCArIGkgKiAwLjAwMDU7XHJcblx0XHRcdGxlZ0xlbmd0aCArPSBsZW5ndGhGYWN0b3IgLyBhbmdsZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXM7XHJcblx0fSxcclxuXHJcblx0X25vYW5pbWF0aW9uVW5zcGlkZXJmeTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGdyb3VwID0gdGhpcy5fZ3JvdXAsXHJcblx0XHRcdG1hcCA9IGdyb3VwLl9tYXAsXHJcblx0XHRcdGZnID0gZ3JvdXAuX2ZlYXR1cmVHcm91cCxcclxuXHRcdFx0Y2hpbGRNYXJrZXJzID0gdGhpcy5nZXRBbGxDaGlsZE1hcmtlcnMobnVsbCwgdHJ1ZSksXHJcblx0XHRcdG0sIGk7XHJcblxyXG5cdFx0Z3JvdXAuX2lnbm9yZU1vdmUgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuc2V0T3BhY2l0eSgxKTtcclxuXHRcdGZvciAoaSA9IGNoaWxkTWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xyXG5cclxuXHRcdFx0ZmcucmVtb3ZlTGF5ZXIobSk7XHJcblxyXG5cdFx0XHRpZiAobS5fcHJlU3BpZGVyZnlMYXRsbmcpIHtcclxuXHRcdFx0XHRtLnNldExhdExuZyhtLl9wcmVTcGlkZXJmeUxhdGxuZyk7XHJcblx0XHRcdFx0ZGVsZXRlIG0uX3ByZVNwaWRlcmZ5TGF0bG5nO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtLnNldFpJbmRleE9mZnNldCkge1xyXG5cdFx0XHRcdG0uc2V0WkluZGV4T2Zmc2V0KDApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobS5fc3BpZGVyTGVnKSB7XHJcblx0XHRcdFx0bWFwLnJlbW92ZUxheWVyKG0uX3NwaWRlckxlZyk7XHJcblx0XHRcdFx0ZGVsZXRlIG0uX3NwaWRlckxlZztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGdyb3VwLmZpcmUoJ3Vuc3BpZGVyZmllZCcsIHtcclxuXHRcdFx0Y2x1c3RlcjogdGhpcyxcclxuXHRcdFx0bWFya2VyczogY2hpbGRNYXJrZXJzXHJcblx0XHR9KTtcclxuXHRcdGdyb3VwLl9pZ25vcmVNb3ZlID0gZmFsc2U7XHJcblx0XHRncm91cC5fc3BpZGVyZmllZCA9IG51bGw7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vTm9uIEFuaW1hdGVkIHZlcnNpb25zIG9mIGV2ZXJ5dGhpbmdcclxuTC5NYXJrZXJDbHVzdGVyTm9uQW5pbWF0ZWQgPSBMLk1hcmtlckNsdXN0ZXIuZXh0ZW5kKHtcclxuXHRfYW5pbWF0aW9uU3BpZGVyZnk6IGZ1bmN0aW9uIChjaGlsZE1hcmtlcnMsIHBvc2l0aW9ucykge1xyXG5cdFx0dmFyIGdyb3VwID0gdGhpcy5fZ3JvdXAsXHJcblx0XHRcdG1hcCA9IGdyb3VwLl9tYXAsXHJcblx0XHRcdGZnID0gZ3JvdXAuX2ZlYXR1cmVHcm91cCxcclxuXHRcdFx0bGVnT3B0aW9ucyA9IHRoaXMuX2dyb3VwLm9wdGlvbnMuc3BpZGVyTGVnUG9seWxpbmVPcHRpb25zLFxyXG5cdFx0XHRpLCBtLCBsZWcsIG5ld1BvcztcclxuXHJcblx0XHRncm91cC5faWdub3JlTW92ZSA9IHRydWU7XHJcblxyXG5cdFx0Ly8gVHJhdmVyc2UgaW4gYXNjZW5kaW5nIG9yZGVyIHRvIG1ha2Ugc3VyZSB0aGF0IGlubmVyIGNpcmNsZU1hcmtlcnMgYXJlIG9uIHRvcCBvZiBmdXJ0aGVyIGxlZ3MuIE5vcm1hbCBtYXJrZXJzIGFyZSByZS1vcmRlcmVkIGJ5IG5ld1Bvc2l0aW9uLlxyXG5cdFx0Ly8gVGhlIHJldmVyc2Ugb3JkZXIgdHJpY2sgbm8gbG9uZ2VyIGltcHJvdmVzIHBlcmZvcm1hbmNlIG9uIG1vZGVybiBicm93c2Vycy5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBjaGlsZE1hcmtlcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0bmV3UG9zID0gbWFwLmxheWVyUG9pbnRUb0xhdExuZyhwb3NpdGlvbnNbaV0pO1xyXG5cdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSBsZWcgYmVmb3JlIHRoZSBtYXJrZXIsIHNvIHRoYXQgaW4gY2FzZSB0aGUgbGF0dGVyIGlzIGEgY2lyY2xlTWFya2VyLCB0aGUgbGVnIGlzIGJlaGluZCBpdC5cclxuXHRcdFx0bGVnID0gbmV3IEwuUG9seWxpbmUoW3RoaXMuX2xhdGxuZywgbmV3UG9zXSwgbGVnT3B0aW9ucyk7XHJcblx0XHRcdG1hcC5hZGRMYXllcihsZWcpO1xyXG5cdFx0XHRtLl9zcGlkZXJMZWcgPSBsZWc7XHJcblxyXG5cdFx0XHQvLyBOb3cgYWRkIHRoZSBtYXJrZXIuXHJcblx0XHRcdG0uX3ByZVNwaWRlcmZ5TGF0bG5nID0gbS5fbGF0bG5nO1xyXG5cdFx0XHRtLnNldExhdExuZyhuZXdQb3MpO1xyXG5cdFx0XHRpZiAobS5zZXRaSW5kZXhPZmZzZXQpIHtcclxuXHRcdFx0XHRtLnNldFpJbmRleE9mZnNldCgxMDAwMDAwKTsgLy9NYWtlIHRoZXNlIGFwcGVhciBvbiB0b3Agb2YgRVZFUllUSElOR1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmZy5hZGRMYXllcihtKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0T3BhY2l0eSgwLjMpO1xyXG5cclxuXHRcdGdyb3VwLl9pZ25vcmVNb3ZlID0gZmFsc2U7XHJcblx0XHRncm91cC5maXJlKCdzcGlkZXJmaWVkJywge1xyXG5cdFx0XHRjbHVzdGVyOiB0aGlzLFxyXG5cdFx0XHRtYXJrZXJzOiBjaGlsZE1hcmtlcnNcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdF9hbmltYXRpb25VbnNwaWRlcmZ5OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9ub2FuaW1hdGlvblVuc3BpZGVyZnkoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy9BbmltYXRlZCB2ZXJzaW9ucyBoZXJlXHJcbkwuTWFya2VyQ2x1c3Rlci5pbmNsdWRlKHtcclxuXHJcblx0X2FuaW1hdGlvblNwaWRlcmZ5OiBmdW5jdGlvbiAoY2hpbGRNYXJrZXJzLCBwb3NpdGlvbnMpIHtcclxuXHRcdHZhciBtZSA9IHRoaXMsXHJcblx0XHRcdGdyb3VwID0gdGhpcy5fZ3JvdXAsXHJcblx0XHRcdG1hcCA9IGdyb3VwLl9tYXAsXHJcblx0XHRcdGZnID0gZ3JvdXAuX2ZlYXR1cmVHcm91cCxcclxuXHRcdFx0dGhpc0xheWVyTGF0TG5nID0gdGhpcy5fbGF0bG5nLFxyXG5cdFx0XHR0aGlzTGF5ZXJQb3MgPSBtYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXNMYXllckxhdExuZyksXHJcblx0XHRcdHN2ZyA9IEwuUGF0aC5TVkcsXHJcblx0XHRcdGxlZ09wdGlvbnMgPSBMLmV4dGVuZCh7fSwgdGhpcy5fZ3JvdXAub3B0aW9ucy5zcGlkZXJMZWdQb2x5bGluZU9wdGlvbnMpLCAvLyBDb3B5IHRoZSBvcHRpb25zIHNvIHRoYXQgd2UgY2FuIG1vZGlmeSB0aGVtIGZvciBhbmltYXRpb24uXHJcblx0XHRcdGZpbmFsTGVnT3BhY2l0eSA9IGxlZ09wdGlvbnMub3BhY2l0eSxcclxuXHRcdFx0aSwgbSwgbGVnLCBsZWdQYXRoLCBsZWdMZW5ndGgsIG5ld1BvcztcclxuXHJcblx0XHRpZiAoZmluYWxMZWdPcGFjaXR5ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZmluYWxMZWdPcGFjaXR5ID0gTC5NYXJrZXJDbHVzdGVyR3JvdXAucHJvdG90eXBlLm9wdGlvbnMuc3BpZGVyTGVnUG9seWxpbmVPcHRpb25zLm9wYWNpdHk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHN2Zykge1xyXG5cdFx0XHQvLyBJZiB0aGUgaW5pdGlhbCBvcGFjaXR5IG9mIHRoZSBzcGlkZXIgbGVnIGlzIG5vdCAwIHRoZW4gaXQgYXBwZWFycyBiZWZvcmUgdGhlIGFuaW1hdGlvbiBzdGFydHMuXHJcblx0XHRcdGxlZ09wdGlvbnMub3BhY2l0eSA9IDA7XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIGNsYXNzIGZvciBDU1MgdHJhbnNpdGlvbnMuXHJcblx0XHRcdGxlZ09wdGlvbnMuY2xhc3NOYW1lID0gKGxlZ09wdGlvbnMuY2xhc3NOYW1lIHx8ICcnKSArICcgbGVhZmxldC1jbHVzdGVyLXNwaWRlci1sZWcnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gTWFrZSBzdXJlIHdlIGhhdmUgYSBkZWZpbmVkIG9wYWNpdHkuXHJcblx0XHRcdGxlZ09wdGlvbnMub3BhY2l0eSA9IGZpbmFsTGVnT3BhY2l0eTtcclxuXHRcdH1cclxuXHJcblx0XHRncm91cC5faWdub3JlTW92ZSA9IHRydWU7XHJcblxyXG5cdFx0Ly8gQWRkIG1hcmtlcnMgYW5kIHNwaWRlciBsZWdzIHRvIG1hcCwgaGlkZGVuIGF0IG91ciBjZW50ZXIgcG9pbnQuXHJcblx0XHQvLyBUcmF2ZXJzZSBpbiBhc2NlbmRpbmcgb3JkZXIgdG8gbWFrZSBzdXJlIHRoYXQgaW5uZXIgY2lyY2xlTWFya2VycyBhcmUgb24gdG9wIG9mIGZ1cnRoZXIgbGVncy4gTm9ybWFsIG1hcmtlcnMgYXJlIHJlLW9yZGVyZWQgYnkgbmV3UG9zaXRpb24uXHJcblx0XHQvLyBUaGUgcmV2ZXJzZSBvcmRlciB0cmljayBubyBsb25nZXIgaW1wcm92ZXMgcGVyZm9ybWFuY2Ugb24gbW9kZXJuIGJyb3dzZXJzLlxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGNoaWxkTWFya2Vycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xyXG5cclxuXHRcdFx0bmV3UG9zID0gbWFwLmxheWVyUG9pbnRUb0xhdExuZyhwb3NpdGlvbnNbaV0pO1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSBsZWcgYmVmb3JlIHRoZSBtYXJrZXIsIHNvIHRoYXQgaW4gY2FzZSB0aGUgbGF0dGVyIGlzIGEgY2lyY2xlTWFya2VyLCB0aGUgbGVnIGlzIGJlaGluZCBpdC5cclxuXHRcdFx0bGVnID0gbmV3IEwuUG9seWxpbmUoW3RoaXNMYXllckxhdExuZywgbmV3UG9zXSwgbGVnT3B0aW9ucyk7XHJcblx0XHRcdG1hcC5hZGRMYXllcihsZWcpO1xyXG5cdFx0XHRtLl9zcGlkZXJMZWcgPSBsZWc7XHJcblxyXG5cdFx0XHQvLyBFeHBsYW5hdGlvbnM6IGh0dHBzOi8vamFrZWFyY2hpYmFsZC5jb20vMjAxMy9hbmltYXRlZC1saW5lLWRyYXdpbmctc3ZnL1xyXG5cdFx0XHQvLyBJbiBvdXIgY2FzZSB0aGUgdHJhbnNpdGlvbiBwcm9wZXJ0eSBpcyBkZWNsYXJlZCBpbiB0aGUgQ1NTIGZpbGUuXHJcblx0XHRcdGlmIChzdmcpIHtcclxuXHRcdFx0XHRsZWdQYXRoID0gbGVnLl9wYXRoO1xyXG5cdFx0XHRcdGxlZ0xlbmd0aCA9IGxlZ1BhdGguZ2V0VG90YWxMZW5ndGgoKSArIDAuMTsgLy8gTmVlZCBhIHNtYWxsIGV4dHJhIGxlbmd0aCB0byBhdm9pZCByZW1haW5pbmcgZG90IGluIEZpcmVmb3guXHJcblx0XHRcdFx0bGVnUGF0aC5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBsZWdMZW5ndGg7IC8vIEp1c3QgMSBsZW5ndGggaXMgZW5vdWdoLCBpdCB3aWxsIGJlIGR1cGxpY2F0ZWQuXHJcblx0XHRcdFx0bGVnUGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gbGVnTGVuZ3RoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJZiBpdCBpcyBhIG1hcmtlciwgYWRkIGl0IG5vdyBhbmQgd2UnbGwgYW5pbWF0ZSBpdCBvdXRcclxuXHRcdFx0aWYgKG0uc2V0WkluZGV4T2Zmc2V0KSB7XHJcblx0XHRcdFx0bS5zZXRaSW5kZXhPZmZzZXQoMTAwMDAwMCk7IC8vIE1ha2Ugbm9ybWFsIG1hcmtlcnMgYXBwZWFyIG9uIHRvcCBvZiBFVkVSWVRISU5HXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG0uY2x1c3RlckhpZGUpIHtcclxuXHRcdFx0XHRtLmNsdXN0ZXJIaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdC8vIFZlY3RvcnMganVzdCBnZXQgaW1tZWRpYXRlbHkgYWRkZWRcclxuXHRcdFx0ZmcuYWRkTGF5ZXIobSk7XHJcblxyXG5cdFx0XHRpZiAobS5fc2V0UG9zKSB7XHJcblx0XHRcdFx0bS5fc2V0UG9zKHRoaXNMYXllclBvcyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRncm91cC5fZm9yY2VMYXlvdXQoKTtcclxuXHRcdGdyb3VwLl9hbmltYXRpb25TdGFydCgpO1xyXG5cclxuXHRcdC8vIFJldmVhbCBtYXJrZXJzIGFuZCBzcGlkZXIgbGVncy5cclxuXHRcdGZvciAoaSA9IGNoaWxkTWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRuZXdQb3MgPSBtYXAubGF5ZXJQb2ludFRvTGF0TG5nKHBvc2l0aW9uc1tpXSk7XHJcblx0XHRcdG0gPSBjaGlsZE1hcmtlcnNbaV07XHJcblxyXG5cdFx0XHQvL01vdmUgbWFya2VyIHRvIG5ldyBwb3NpdGlvblxyXG5cdFx0XHRtLl9wcmVTcGlkZXJmeUxhdGxuZyA9IG0uX2xhdGxuZztcclxuXHRcdFx0bS5zZXRMYXRMbmcobmV3UG9zKTtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChtLmNsdXN0ZXJTaG93KSB7XHJcblx0XHRcdFx0bS5jbHVzdGVyU2hvdygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBbmltYXRlIGxlZyAoYW5pbWF0aW9uIGlzIGFjdHVhbGx5IGRlbGVnYXRlZCB0byBDU1MgdHJhbnNpdGlvbikuXHJcblx0XHRcdGlmIChzdmcpIHtcclxuXHRcdFx0XHRsZWcgPSBtLl9zcGlkZXJMZWc7XHJcblx0XHRcdFx0bGVnUGF0aCA9IGxlZy5fcGF0aDtcclxuXHRcdFx0XHRsZWdQYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSAwO1xyXG5cdFx0XHRcdC8vbGVnUGF0aC5zdHlsZS5zdHJva2VPcGFjaXR5ID0gZmluYWxMZWdPcGFjaXR5O1xyXG5cdFx0XHRcdGxlZy5zZXRTdHlsZSh7b3BhY2l0eTogZmluYWxMZWdPcGFjaXR5fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0T3BhY2l0eSgwLjMpO1xyXG5cclxuXHRcdGdyb3VwLl9pZ25vcmVNb3ZlID0gZmFsc2U7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGdyb3VwLl9hbmltYXRpb25FbmQoKTtcclxuXHRcdFx0Z3JvdXAuZmlyZSgnc3BpZGVyZmllZCcsIHtcclxuXHRcdFx0XHRjbHVzdGVyOiBtZSxcclxuXHRcdFx0XHRtYXJrZXJzOiBjaGlsZE1hcmtlcnNcclxuXHRcdFx0fSk7XHJcblx0XHR9LCAyMDApO1xyXG5cdH0sXHJcblxyXG5cdF9hbmltYXRpb25VbnNwaWRlcmZ5OiBmdW5jdGlvbiAoem9vbURldGFpbHMpIHtcclxuXHRcdHZhciBtZSA9IHRoaXMsXHJcblx0XHRcdGdyb3VwID0gdGhpcy5fZ3JvdXAsXHJcblx0XHRcdG1hcCA9IGdyb3VwLl9tYXAsXHJcblx0XHRcdGZnID0gZ3JvdXAuX2ZlYXR1cmVHcm91cCxcclxuXHRcdFx0dGhpc0xheWVyUG9zID0gem9vbURldGFpbHMgPyBtYXAuX2xhdExuZ1RvTmV3TGF5ZXJQb2ludCh0aGlzLl9sYXRsbmcsIHpvb21EZXRhaWxzLnpvb20sIHpvb21EZXRhaWxzLmNlbnRlcikgOiBtYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2xhdGxuZyksXHJcblx0XHRcdGNoaWxkTWFya2VycyA9IHRoaXMuZ2V0QWxsQ2hpbGRNYXJrZXJzKG51bGwsIHRydWUpLFxyXG5cdFx0XHRzdmcgPSBMLlBhdGguU1ZHLFxyXG5cdFx0XHRtLCBpLCBsZWcsIGxlZ1BhdGgsIGxlZ0xlbmd0aCwgbm9uQW5pbWF0YWJsZTtcclxuXHJcblx0XHRncm91cC5faWdub3JlTW92ZSA9IHRydWU7XHJcblx0XHRncm91cC5fYW5pbWF0aW9uU3RhcnQoKTtcclxuXHJcblx0XHQvL01ha2UgdXMgdmlzaWJsZSBhbmQgYnJpbmcgdGhlIGNoaWxkIG1hcmtlcnMgYmFjayBpblxyXG5cdFx0dGhpcy5zZXRPcGFjaXR5KDEpO1xyXG5cdFx0Zm9yIChpID0gY2hpbGRNYXJrZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdG0gPSBjaGlsZE1hcmtlcnNbaV07XHJcblxyXG5cdFx0XHQvL01hcmtlciB3YXMgYWRkZWQgdG8gdXMgYWZ0ZXIgd2Ugd2VyZSBzcGlkZXJmaWVkXHJcblx0XHRcdGlmICghbS5fcHJlU3BpZGVyZnlMYXRsbmcpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly9DbG9zZSBhbnkgcG9wdXAgb24gdGhlIG1hcmtlciBmaXJzdCwgb3RoZXJ3aXNlIHNldHRpbmcgdGhlIGxvY2F0aW9uIG9mIHRoZSBtYXJrZXIgd2lsbCBtYWtlIHRoZSBtYXAgc2Nyb2xsXHJcblx0XHRcdG0uY2xvc2VQb3B1cCgpO1xyXG5cclxuXHRcdFx0Ly9GaXggdXAgdGhlIGxvY2F0aW9uIHRvIHRoZSByZWFsIG9uZVxyXG5cdFx0XHRtLnNldExhdExuZyhtLl9wcmVTcGlkZXJmeUxhdGxuZyk7XHJcblx0XHRcdGRlbGV0ZSBtLl9wcmVTcGlkZXJmeUxhdGxuZztcclxuXHJcblx0XHRcdC8vSGFjayBvdmVycmlkZSB0aGUgbG9jYXRpb24gdG8gYmUgb3VyIGNlbnRlclxyXG5cdFx0XHRub25BbmltYXRhYmxlID0gdHJ1ZTtcclxuXHRcdFx0aWYgKG0uX3NldFBvcykge1xyXG5cdFx0XHRcdG0uX3NldFBvcyh0aGlzTGF5ZXJQb3MpO1xyXG5cdFx0XHRcdG5vbkFuaW1hdGFibGUgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAobS5jbHVzdGVySGlkZSkge1xyXG5cdFx0XHRcdG0uY2x1c3RlckhpZGUoKTtcclxuXHRcdFx0XHRub25BbmltYXRhYmxlID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG5vbkFuaW1hdGFibGUpIHtcclxuXHRcdFx0XHRmZy5yZW1vdmVMYXllcihtKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQW5pbWF0ZSB0aGUgc3BpZGVyIGxlZyBiYWNrIGluIChhbmltYXRpb24gaXMgYWN0dWFsbHkgZGVsZWdhdGVkIHRvIENTUyB0cmFuc2l0aW9uKS5cclxuXHRcdFx0aWYgKHN2Zykge1xyXG5cdFx0XHRcdGxlZyA9IG0uX3NwaWRlckxlZztcclxuXHRcdFx0XHRsZWdQYXRoID0gbGVnLl9wYXRoO1xyXG5cdFx0XHRcdGxlZ0xlbmd0aCA9IGxlZ1BhdGguZ2V0VG90YWxMZW5ndGgoKSArIDAuMTtcclxuXHRcdFx0XHRsZWdQYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBsZWdMZW5ndGg7XHJcblx0XHRcdFx0bGVnLnNldFN0eWxlKHtvcGFjaXR5OiAwfSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRncm91cC5faWdub3JlTW92ZSA9IGZhbHNlO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvL0lmIHdlIGhhdmUgb25seSA8PSBvbmUgY2hpbGQgbGVmdCB0aGVuIHRoYXQgbWFya2VyIHdpbGwgYmUgc2hvd24gb24gdGhlIG1hcCBzbyBkb24ndCByZW1vdmUgaXQhXHJcblx0XHRcdHZhciBzdGlsbFRoZXJlQ2hpbGRDb3VudCA9IDA7XHJcblx0XHRcdGZvciAoaSA9IGNoaWxkTWFya2Vycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRcdG0gPSBjaGlsZE1hcmtlcnNbaV07XHJcblx0XHRcdFx0aWYgKG0uX3NwaWRlckxlZykge1xyXG5cdFx0XHRcdFx0c3RpbGxUaGVyZUNoaWxkQ291bnQrKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRmb3IgKGkgPSBjaGlsZE1hcmtlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0XHRtID0gY2hpbGRNYXJrZXJzW2ldO1xyXG5cclxuXHRcdFx0XHRpZiAoIW0uX3NwaWRlckxlZykgeyAvL0hhcyBhbHJlYWR5IGJlZW4gdW5zcGlkZXJmaWVkXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChtLmNsdXN0ZXJTaG93KSB7XHJcblx0XHRcdFx0XHRtLmNsdXN0ZXJTaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChtLnNldFpJbmRleE9mZnNldCkge1xyXG5cdFx0XHRcdFx0bS5zZXRaSW5kZXhPZmZzZXQoMCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoc3RpbGxUaGVyZUNoaWxkQ291bnQgPiAxKSB7XHJcblx0XHRcdFx0XHRmZy5yZW1vdmVMYXllcihtKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdG1hcC5yZW1vdmVMYXllcihtLl9zcGlkZXJMZWcpO1xyXG5cdFx0XHRcdGRlbGV0ZSBtLl9zcGlkZXJMZWc7XHJcblx0XHRcdH1cclxuXHRcdFx0Z3JvdXAuX2FuaW1hdGlvbkVuZCgpO1xyXG5cdFx0XHRncm91cC5maXJlKCd1bnNwaWRlcmZpZWQnLCB7XHJcblx0XHRcdFx0Y2x1c3RlcjogbWUsXHJcblx0XHRcdFx0bWFya2VyczogY2hpbGRNYXJrZXJzXHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgMjAwKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbkwuTWFya2VyQ2x1c3Rlckdyb3VwLmluY2x1ZGUoe1xyXG5cdC8vVGhlIE1hcmtlckNsdXN0ZXIgY3VycmVudGx5IHNwaWRlcmZpZWQgKGlmIGFueSlcclxuXHRfc3BpZGVyZmllZDogbnVsbCxcclxuXHJcblx0dW5zcGlkZXJmeTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fdW5zcGlkZXJmeS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdH0sXHJcblxyXG5cdF9zcGlkZXJmaWVyT25BZGQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl91bnNwaWRlcmZ5V3JhcHBlciwgdGhpcyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX21hcC5vcHRpb25zLnpvb21BbmltYXRpb24pIHtcclxuXHRcdFx0dGhpcy5fbWFwLm9uKCd6b29tc3RhcnQnLCB0aGlzLl91bnNwaWRlcmZ5Wm9vbVN0YXJ0LCB0aGlzKTtcclxuXHRcdH1cclxuXHRcdC8vQnJvd3NlcnMgd2l0aG91dCB6b29tQW5pbWF0aW9uIG9yIGEgYmlnIHpvb20gZG9uJ3QgZmlyZSB6b29tc3RhcnRcclxuXHRcdHRoaXMuX21hcC5vbignem9vbWVuZCcsIHRoaXMuX25vYW5pbWF0aW9uVW5zcGlkZXJmeSwgdGhpcyk7XHJcblxyXG5cdFx0aWYgKCFMLkJyb3dzZXIudG91Y2gpIHtcclxuXHRcdFx0dGhpcy5fbWFwLmdldFJlbmRlcmVyKHRoaXMpO1xyXG5cdFx0XHQvL05lZWRzIHRvIGhhcHBlbiBpbiB0aGUgcGFnZWxvYWQsIG5vdCBhZnRlciwgb3IgYW5pbWF0aW9ucyBkb24ndCB3b3JrIGluIHdlYmtpdFxyXG5cdFx0XHQvLyAgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NDU1MjAwL3N2Zy1hbmltYXRlLXdpdGgtZHluYW1pY2FsbHktYWRkZWQtZWxlbWVudHNcclxuXHRcdFx0Ly9EaXNhYmxlIG9uIHRvdWNoIGJyb3dzZXJzIGFzIHRoZSBhbmltYXRpb24gbWVzc2VzIHVwIG9uIGEgdG91Y2ggem9vbSBhbmQgaXNuJ3QgdmVyeSBub3RpY2FibGVcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfc3BpZGVyZmllck9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9tYXAub2ZmKCdjbGljaycsIHRoaXMuX3Vuc3BpZGVyZnlXcmFwcGVyLCB0aGlzKTtcclxuXHRcdHRoaXMuX21hcC5vZmYoJ3pvb21zdGFydCcsIHRoaXMuX3Vuc3BpZGVyZnlab29tU3RhcnQsIHRoaXMpO1xyXG5cdFx0dGhpcy5fbWFwLm9mZignem9vbWFuaW0nLCB0aGlzLl91bnNwaWRlcmZ5Wm9vbUFuaW0sIHRoaXMpO1xyXG5cdFx0dGhpcy5fbWFwLm9mZignem9vbWVuZCcsIHRoaXMuX25vYW5pbWF0aW9uVW5zcGlkZXJmeSwgdGhpcyk7XHJcblxyXG5cdFx0Ly9FbnN1cmUgdGhhdCBtYXJrZXJzIGFyZSBiYWNrIHdoZXJlIHRoZXkgc2hvdWxkIGJlXHJcblx0XHQvLyBVc2Ugbm8gYW5pbWF0aW9uIHRvIGF2b2lkIGEgc3RpY2t5IGxlYWZsZXQtY2x1c3Rlci1hbmltIGNsYXNzIG9uIG1hcFBhbmVcclxuXHRcdHRoaXMuX25vYW5pbWF0aW9uVW5zcGlkZXJmeSgpO1xyXG5cdH0sXHJcblxyXG5cdC8vT24gem9vbSBzdGFydCB3ZSBhZGQgYSB6b29tYW5pbSBoYW5kbGVyIHNvIHRoYXQgd2UgYXJlIGd1YXJhbnRlZWQgdG8gYmUgbGFzdCAoYWZ0ZXIgbWFya2VycyBhcmUgYW5pbWF0ZWQpXHJcblx0Ly9UaGlzIG1lYW5zIHdlIGNhbiBkZWZpbmUgdGhlIGFuaW1hdGlvbiB0aGV5IGRvIHJhdGhlciB0aGFuIE1hcmtlcnMgZG9pbmcgYW4gYW5pbWF0aW9uIHRvIHRoZWlyIGFjdHVhbCBsb2NhdGlvblxyXG5cdF91bnNwaWRlcmZ5Wm9vbVN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX21hcCkgeyAvL01heSBoYXZlIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBtYXAgYnkgYSB6b29tRW5kIGhhbmRsZXJcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX21hcC5vbignem9vbWFuaW0nLCB0aGlzLl91bnNwaWRlcmZ5Wm9vbUFuaW0sIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdF91bnNwaWRlcmZ5Wm9vbUFuaW06IGZ1bmN0aW9uICh6b29tRGV0YWlscykge1xyXG5cdFx0Ly9XYWl0IHVudGlsIHRoZSBmaXJzdCB6b29tYW5pbSBhZnRlciB0aGUgdXNlciBoYXMgZmluaXNoZWQgdG91Y2gtem9vbWluZyBiZWZvcmUgcnVubmluZyB0aGUgYW5pbWF0aW9uXHJcblx0XHRpZiAoTC5Eb21VdGlsLmhhc0NsYXNzKHRoaXMuX21hcC5fbWFwUGFuZSwgJ2xlYWZsZXQtdG91Y2hpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fbWFwLm9mZignem9vbWFuaW0nLCB0aGlzLl91bnNwaWRlcmZ5Wm9vbUFuaW0sIHRoaXMpO1xyXG5cdFx0dGhpcy5fdW5zcGlkZXJmeSh6b29tRGV0YWlscyk7XHJcblx0fSxcclxuXHJcblx0X3Vuc3BpZGVyZnlXcmFwcGVyOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQvLy8gPHN1bW1hcnk+X3Vuc3BpZGVyZnkgYnV0IHBhc3NlcyBubyBhcmd1bWVudHM8L3N1bW1hcnk+XHJcblx0XHR0aGlzLl91bnNwaWRlcmZ5KCk7XHJcblx0fSxcclxuXHJcblx0X3Vuc3BpZGVyZnk6IGZ1bmN0aW9uICh6b29tRGV0YWlscykge1xyXG5cdFx0aWYgKHRoaXMuX3NwaWRlcmZpZWQpIHtcclxuXHRcdFx0dGhpcy5fc3BpZGVyZmllZC51bnNwaWRlcmZ5KHpvb21EZXRhaWxzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfbm9hbmltYXRpb25VbnNwaWRlcmZ5OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5fc3BpZGVyZmllZCkge1xyXG5cdFx0XHR0aGlzLl9zcGlkZXJmaWVkLl9ub2FuaW1hdGlvblVuc3BpZGVyZnkoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvL0lmIHRoZSBnaXZlbiBsYXllciBpcyBjdXJyZW50bHkgYmVpbmcgc3BpZGVyZmllZCB0aGVuIHdlIHVuc3BpZGVyZnkgaXQgc28gaXQgaXNuJ3Qgb24gdGhlIG1hcCBhbnltb3JlIGV0Y1xyXG5cdF91bnNwaWRlcmZ5TGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0aWYgKGxheWVyLl9zcGlkZXJMZWcpIHtcclxuXHRcdFx0dGhpcy5fZmVhdHVyZUdyb3VwLnJlbW92ZUxheWVyKGxheWVyKTtcclxuXHJcblx0XHRcdGlmIChsYXllci5jbHVzdGVyU2hvdykge1xyXG5cdFx0XHRcdGxheWVyLmNsdXN0ZXJTaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHQvL1Bvc2l0aW9uIHdpbGwgYmUgZml4ZWQgdXAgaW1tZWRpYXRlbHkgaW4gX2FuaW1hdGlvblVuc3BpZGVyZnlcclxuXHRcdFx0aWYgKGxheWVyLnNldFpJbmRleE9mZnNldCkge1xyXG5cdFx0XHRcdGxheWVyLnNldFpJbmRleE9mZnNldCgwKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fbWFwLnJlbW92ZUxheWVyKGxheWVyLl9zcGlkZXJMZWcpO1xyXG5cdFx0XHRkZWxldGUgbGF5ZXIuX3NwaWRlckxlZztcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xuXG4vKipcclxuICogQWRkcyAxIHB1YmxpYyBtZXRob2QgdG8gTUNHIGFuZCAxIHRvIEwuTWFya2VyIHRvIGZhY2lsaXRhdGUgY2hhbmdpbmdcclxuICogbWFya2VycycgaWNvbiBvcHRpb25zIGFuZCByZWZyZXNoaW5nIHRoZWlyIGljb24gYW5kIHRoZWlyIHBhcmVudCBjbHVzdGVyc1xyXG4gKiBhY2NvcmRpbmdseSAoY2FzZSB3aGVyZSB0aGVpciBpY29uQ3JlYXRlRnVuY3Rpb24gdXNlcyBkYXRhIG9mIGNoaWxkTWFya2Vyc1xyXG4gKiB0byBtYWtlIHVwIHRoZSBjbHVzdGVyIGljb24pLlxyXG4gKi9cclxuXHJcblxyXG5MLk1hcmtlckNsdXN0ZXJHcm91cC5pbmNsdWRlKHtcclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSBpY29uIG9mIGFsbCBjbHVzdGVycyB3aGljaCBhcmUgcGFyZW50cyBvZiB0aGUgZ2l2ZW4gbWFya2VyKHMpLlxyXG5cdCAqIEluIHNpbmdsZU1hcmtlck1vZGUsIGFsc28gdXBkYXRlcyB0aGUgZ2l2ZW4gbWFya2VyKHMpIGljb24uXHJcblx0ICogQHBhcmFtIGxheWVycyBMLk1hcmtlckNsdXN0ZXJHcm91cHxMLkxheWVyR3JvdXB8QXJyYXkoTC5NYXJrZXIpfE1hcChMLk1hcmtlcil8XHJcblx0ICogTC5NYXJrZXJDbHVzdGVyfEwuTWFya2VyIChvcHRpb25hbCkgbGlzdCBvZiBtYXJrZXJzIChvciBzaW5nbGUgbWFya2VyKSB3aG9zZSBwYXJlbnRcclxuXHQgKiBjbHVzdGVycyBuZWVkIHRvIGJlIHVwZGF0ZWQuIElmIG5vdCBwcm92aWRlZCwgcmV0cmlldmVzIGFsbCBjaGlsZCBtYXJrZXJzIG9mIHRoaXMuXHJcblx0ICogQHJldHVybnMge0wuTWFya2VyQ2x1c3Rlckdyb3VwfVxyXG5cdCAqL1xyXG5cdHJlZnJlc2hDbHVzdGVyczogZnVuY3Rpb24gKGxheWVycykge1xyXG5cdFx0aWYgKCFsYXllcnMpIHtcclxuXHRcdFx0bGF5ZXJzID0gdGhpcy5fdG9wQ2x1c3RlckxldmVsLmdldEFsbENoaWxkTWFya2VycygpO1xyXG5cdFx0fSBlbHNlIGlmIChsYXllcnMgaW5zdGFuY2VvZiBMLk1hcmtlckNsdXN0ZXJHcm91cCkge1xyXG5cdFx0XHRsYXllcnMgPSBsYXllcnMuX3RvcENsdXN0ZXJMZXZlbC5nZXRBbGxDaGlsZE1hcmtlcnMoKTtcclxuXHRcdH0gZWxzZSBpZiAobGF5ZXJzIGluc3RhbmNlb2YgTC5MYXllckdyb3VwKSB7XHJcblx0XHRcdGxheWVycyA9IGxheWVycy5fbGF5ZXJzO1xyXG5cdFx0fSBlbHNlIGlmIChsYXllcnMgaW5zdGFuY2VvZiBMLk1hcmtlckNsdXN0ZXIpIHtcclxuXHRcdFx0bGF5ZXJzID0gbGF5ZXJzLmdldEFsbENoaWxkTWFya2VycygpO1xyXG5cdFx0fSBlbHNlIGlmIChsYXllcnMgaW5zdGFuY2VvZiBMLk1hcmtlcikge1xyXG5cdFx0XHRsYXllcnMgPSBbbGF5ZXJzXTtcclxuXHRcdH0gLy8gZWxzZTogbXVzdCBiZSBhbiBBcnJheShMLk1hcmtlcil8TWFwKEwuTWFya2VyKVxyXG5cdFx0dGhpcy5fZmxhZ1BhcmVudHNJY29uc05lZWRVcGRhdGUobGF5ZXJzKTtcclxuXHRcdHRoaXMuX3JlZnJlc2hDbHVzdGVyc0ljb25zKCk7XHJcblxyXG5cdFx0Ly8gSW4gY2FzZSBvZiBzaW5nbGVNYXJrZXJNb2RlLCBhbHNvIHJlLWRyYXcgdGhlIG1hcmtlcnMuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnNpbmdsZU1hcmtlck1vZGUpIHtcclxuXHRcdFx0dGhpcy5fcmVmcmVzaFNpbmdsZU1hcmtlck1vZGVNYXJrZXJzKGxheWVycyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogU2ltcGx5IGZsYWdzIGFsbCBwYXJlbnQgY2x1c3RlcnMgb2YgdGhlIGdpdmVuIG1hcmtlcnMgYXMgaGF2aW5nIGEgXCJkaXJ0eVwiIGljb24uXHJcblx0ICogQHBhcmFtIGxheWVycyBBcnJheShMLk1hcmtlcil8TWFwKEwuTWFya2VyKSBsaXN0IG9mIG1hcmtlcnMuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRfZmxhZ1BhcmVudHNJY29uc05lZWRVcGRhdGU6IGZ1bmN0aW9uIChsYXllcnMpIHtcclxuXHRcdHZhciBpZCwgcGFyZW50O1xyXG5cclxuXHRcdC8vIEFzc3VtZXMgbGF5ZXJzIGlzIGFuIEFycmF5IG9yIGFuIE9iamVjdCB3aG9zZSBwcm90b3R5cGUgaXMgbm9uLWVudW1lcmFibGUuXHJcblx0XHRmb3IgKGlkIGluIGxheWVycykge1xyXG5cdFx0XHQvLyBGbGFnIHBhcmVudCBjbHVzdGVycycgaWNvbiBhcyBcImRpcnR5XCIsIGFsbCB0aGUgd2F5IHVwLlxyXG5cdFx0XHQvLyBEdW1iIHByb2Nlc3MgdGhhdCBmbGFncyBtdWx0aXBsZSB0aW1lcyB1cHBlciBwYXJlbnRzLCBidXQgc3RpbGxcclxuXHRcdFx0Ly8gbXVjaCBtb3JlIGVmZmljaWVudCB0aGFuIHRyeWluZyB0byBiZSBzbWFydCBhbmQgbWFrZSBzaG9ydCBsaXN0cyxcclxuXHRcdFx0Ly8gYXQgbGVhc3QgaW4gdGhlIGNhc2Ugb2YgYSBoaWVyYXJjaHkgZm9sbG93aW5nIGEgcG93ZXIgbGF3OlxyXG5cdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS9mbGFnLW5vZGVzLWluLXBvd2VyLWhpZXJhcmNoeS8yXHJcblx0XHRcdHBhcmVudCA9IGxheWVyc1tpZF0uX19wYXJlbnQ7XHJcblx0XHRcdHdoaWxlIChwYXJlbnQpIHtcclxuXHRcdFx0XHRwYXJlbnQuX2ljb25OZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50Ll9fcGFyZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogUmUtZHJhd3MgdGhlIGljb24gb2YgdGhlIHN1cHBsaWVkIG1hcmtlcnMuXHJcblx0ICogVG8gYmUgdXNlZCBpbiBzaW5nbGVNYXJrZXJNb2RlIG9ubHkuXHJcblx0ICogQHBhcmFtIGxheWVycyBBcnJheShMLk1hcmtlcil8TWFwKEwuTWFya2VyKSBsaXN0IG9mIG1hcmtlcnMuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRfcmVmcmVzaFNpbmdsZU1hcmtlck1vZGVNYXJrZXJzOiBmdW5jdGlvbiAobGF5ZXJzKSB7XHJcblx0XHR2YXIgaWQsIGxheWVyO1xyXG5cclxuXHRcdGZvciAoaWQgaW4gbGF5ZXJzKSB7XHJcblx0XHRcdGxheWVyID0gbGF5ZXJzW2lkXTtcclxuXHJcblx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSBkbyBub3Qgb3ZlcnJpZGUgbWFya2VycyB0aGF0IGRvIG5vdCBiZWxvbmcgdG8gVEhJUyBncm91cC5cclxuXHRcdFx0aWYgKHRoaXMuaGFzTGF5ZXIobGF5ZXIpKSB7XHJcblx0XHRcdFx0Ly8gTmVlZCB0byByZS1jcmVhdGUgdGhlIGljb24gZmlyc3QsIHRoZW4gcmUtZHJhdyB0aGUgbWFya2VyLlxyXG5cdFx0XHRcdGxheWVyLnNldEljb24odGhpcy5fb3ZlcnJpZGVNYXJrZXJJY29uKGxheWVyKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTC5NYXJrZXIuaW5jbHVkZSh7XHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgZ2l2ZW4gb3B0aW9ucyBpbiB0aGUgbWFya2VyJ3MgaWNvbiBhbmQgcmVmcmVzaGVzIHRoZSBtYXJrZXIuXHJcblx0ICogQHBhcmFtIG9wdGlvbnMgbWFwIG9iamVjdCBvZiBpY29uIG9wdGlvbnMuXHJcblx0ICogQHBhcmFtIGRpcmVjdGx5UmVmcmVzaENsdXN0ZXJzIGJvb2xlYW4gKG9wdGlvbmFsKSB0cnVlIHRvIHRyaWdnZXJcclxuXHQgKiBNQ0cucmVmcmVzaENsdXN0ZXJzT2YoKSByaWdodCBhd2F5IHdpdGggdGhpcyBzaW5nbGUgbWFya2VyLlxyXG5cdCAqIEByZXR1cm5zIHtMLk1hcmtlcn1cclxuXHQgKi9cclxuXHRyZWZyZXNoSWNvbk9wdGlvbnM6IGZ1bmN0aW9uIChvcHRpb25zLCBkaXJlY3RseVJlZnJlc2hDbHVzdGVycykge1xyXG5cdFx0dmFyIGljb24gPSB0aGlzLm9wdGlvbnMuaWNvbjtcclxuXHJcblx0XHRMLnNldE9wdGlvbnMoaWNvbiwgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5zZXRJY29uKGljb24pO1xyXG5cclxuXHRcdC8vIFNob3J0Y3V0IHRvIHJlZnJlc2ggdGhlIGFzc29jaWF0ZWQgTUNHIGNsdXN0ZXJzIHJpZ2h0IGF3YXkuXHJcblx0XHQvLyBUbyBiZSB1c2VkIHdoZW4gcmVmcmVzaGluZyBhIHNpbmdsZSBtYXJrZXIuXHJcblx0XHQvLyBPdGhlcndpc2UsIGJldHRlciB1c2UgTUNHLnJlZnJlc2hDbHVzdGVycygpIG9uY2UgYXQgdGhlIGVuZCB3aXRoXHJcblx0XHQvLyB0aGUgbGlzdCBvZiBtb2RpZmllZCBtYXJrZXJzLlxyXG5cdFx0aWYgKGRpcmVjdGx5UmVmcmVzaENsdXN0ZXJzICYmIHRoaXMuX19wYXJlbnQpIHtcclxuXHRcdFx0dGhpcy5fX3BhcmVudC5fZ3JvdXAucmVmcmVzaENsdXN0ZXJzKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSk7XG5cbmV4cG9ydHMuTWFya2VyQ2x1c3Rlckdyb3VwID0gTWFya2VyQ2x1c3Rlckdyb3VwO1xuZXhwb3J0cy5NYXJrZXJDbHVzdGVyID0gTWFya2VyQ2x1c3RlcjtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxlYWZsZXQubWFya2VyY2x1c3Rlci1zcmMuanMubWFwXG4iXSwic291cmNlUm9vdCI6IiJ9