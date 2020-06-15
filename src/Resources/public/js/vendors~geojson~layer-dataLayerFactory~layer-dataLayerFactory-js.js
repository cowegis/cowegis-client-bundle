(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~geojson~layer-dataLayerFactory~layer-dataLayerFactory-js"],{

/***/ "./node_modules/@mapbox/togeojson/togeojson.js":
/*!*****************************************************!*\
  !*** ./node_modules/@mapbox/togeojson/togeojson.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var toGeoJSON = (function() {
    'use strict';

    var removeSpace = /\s*/g,
        trimSpace = /^\s*|\s*$/g,
        splitSpace = /\s+/;
    // generate a short, numeric hash of a string
    function okhash(x) {
        if (!x || !x.length) return 0;
        for (var i = 0, h = 0; i < x.length; i++) {
            h = ((h << 5) - h) + x.charCodeAt(i) | 0;
        } return h;
    }
    // all Y children of X
    function get(x, y) { return x.getElementsByTagName(y); }
    function attr(x, y) { return x.getAttribute(y); }
    function attrf(x, y) { return parseFloat(attr(x, y)); }
    // one Y child of X, if any, otherwise null
    function get1(x, y) { var n = get(x, y); return n.length ? n[0] : null; }
    // https://developer.mozilla.org/en-US/docs/Web/API/Node.normalize
    function norm(el) { if (el.normalize) { el.normalize(); } return el; }
    // cast array x into numbers
    function numarray(x) {
        for (var j = 0, o = []; j < x.length; j++) { o[j] = parseFloat(x[j]); }
        return o;
    }
    // get the content of a text node, if any
    function nodeVal(x) {
        if (x) { norm(x); }
        return (x && x.textContent) || '';
    }
    // get the contents of multiple text nodes, if present
    function getMulti(x, ys) {
        var o = {}, n, k;
        for (k = 0; k < ys.length; k++) {
            n = get1(x, ys[k]);
            if (n) o[ys[k]] = nodeVal(n);
        }
        return o;
    }
    // add properties of Y to X, overwriting if present in both
    function extend(x, y) { for (var k in y) x[k] = y[k]; }
    // get one coordinate from a coordinate array, if any
    function coord1(v) { return numarray(v.replace(removeSpace, '').split(',')); }
    // get all coordinates from a coordinate array as [[],[]]
    function coord(v) {
        var coords = v.replace(trimSpace, '').split(splitSpace),
            o = [];
        for (var i = 0; i < coords.length; i++) {
            o.push(coord1(coords[i]));
        }
        return o;
    }
    function coordPair(x) {
        var ll = [attrf(x, 'lon'), attrf(x, 'lat')],
            ele = get1(x, 'ele'),
            // handle namespaced attribute in browser
            heartRate = get1(x, 'gpxtpx:hr') || get1(x, 'hr'),
            time = get1(x, 'time'),
            e;
        if (ele) {
            e = parseFloat(nodeVal(ele));
            if (!isNaN(e)) {
                ll.push(e);
            }
        }
        return {
            coordinates: ll,
            time: time ? nodeVal(time) : null,
            heartRate: heartRate ? parseFloat(nodeVal(heartRate)) : null
        };
    }

    // create a new feature collection parent object
    function fc() {
        return {
            type: 'FeatureCollection',
            features: []
        };
    }

    var serializer;
    if (typeof XMLSerializer !== 'undefined') {
        /* istanbul ignore next */
        serializer = new XMLSerializer();
    // only require xmldom in a node environment
    } else if ( true && typeof process === 'object' && !process.browser) {
        serializer = new (__webpack_require__(/*! xmldom */ 11).XMLSerializer)();
    }
    function xml2str(str) {
        // IE9 will create a new XMLSerializer but it'll crash immediately.
        // This line is ignored because we don't run coverage tests in IE9
        /* istanbul ignore next */
        if (str.xml !== undefined) return str.xml;
        return serializer.serializeToString(str);
    }

    var t = {
        kml: function(doc) {

            var gj = fc(),
                // styleindex keeps track of hashed styles in order to match features
                styleIndex = {}, styleByHash = {},
                // stylemapindex keeps track of style maps to expose in properties
                styleMapIndex = {},
                // atomic geospatial types supported by KML - MultiGeometry is
                // handled separately
                geotypes = ['Polygon', 'LineString', 'Point', 'Track', 'gx:Track'],
                // all root placemarks in the file
                placemarks = get(doc, 'Placemark'),
                styles = get(doc, 'Style'),
                styleMaps = get(doc, 'StyleMap');

            for (var k = 0; k < styles.length; k++) {
                var hash = okhash(xml2str(styles[k])).toString(16);
                styleIndex['#' + attr(styles[k], 'id')] = hash;
                styleByHash[hash] = styles[k];
            }
            for (var l = 0; l < styleMaps.length; l++) {
                styleIndex['#' + attr(styleMaps[l], 'id')] = okhash(xml2str(styleMaps[l])).toString(16);
                var pairs = get(styleMaps[l], 'Pair');
                var pairsMap = {};
                for (var m = 0; m < pairs.length; m++) {
                    pairsMap[nodeVal(get1(pairs[m], 'key'))] = nodeVal(get1(pairs[m], 'styleUrl'));
                }
                styleMapIndex['#' + attr(styleMaps[l], 'id')] = pairsMap;

            }
            for (var j = 0; j < placemarks.length; j++) {
                gj.features = gj.features.concat(getPlacemark(placemarks[j]));
            }
            function kmlColor(v) {
                var color, opacity;
                v = v || '';
                if (v.substr(0, 1) === '#') { v = v.substr(1); }
                if (v.length === 6 || v.length === 3) { color = v; }
                if (v.length === 8) {
                    opacity = parseInt(v.substr(0, 2), 16) / 255;
                    color = '#' + v.substr(6, 2) +
                        v.substr(4, 2) +
                        v.substr(2, 2);
                }
                return [color, isNaN(opacity) ? undefined : opacity];
            }
            function gxCoord(v) { return numarray(v.split(' ')); }
            function gxCoords(root) {
                var elems = get(root, 'coord', 'gx'), coords = [], times = [];
                if (elems.length === 0) elems = get(root, 'gx:coord');
                for (var i = 0; i < elems.length; i++) coords.push(gxCoord(nodeVal(elems[i])));
                var timeElems = get(root, 'when');
                for (var j = 0; j < timeElems.length; j++) times.push(nodeVal(timeElems[j]));
                return {
                    coords: coords,
                    times: times
                };
            }
            function getGeometry(root) {
                var geomNode, geomNodes, i, j, k, geoms = [], coordTimes = [];
                if (get1(root, 'MultiGeometry')) { return getGeometry(get1(root, 'MultiGeometry')); }
                if (get1(root, 'MultiTrack')) { return getGeometry(get1(root, 'MultiTrack')); }
                if (get1(root, 'gx:MultiTrack')) { return getGeometry(get1(root, 'gx:MultiTrack')); }
                for (i = 0; i < geotypes.length; i++) {
                    geomNodes = get(root, geotypes[i]);
                    if (geomNodes) {
                        for (j = 0; j < geomNodes.length; j++) {
                            geomNode = geomNodes[j];
                            if (geotypes[i] === 'Point') {
                                geoms.push({
                                    type: 'Point',
                                    coordinates: coord1(nodeVal(get1(geomNode, 'coordinates')))
                                });
                            } else if (geotypes[i] === 'LineString') {
                                geoms.push({
                                    type: 'LineString',
                                    coordinates: coord(nodeVal(get1(geomNode, 'coordinates')))
                                });
                            } else if (geotypes[i] === 'Polygon') {
                                var rings = get(geomNode, 'LinearRing'),
                                    coords = [];
                                for (k = 0; k < rings.length; k++) {
                                    coords.push(coord(nodeVal(get1(rings[k], 'coordinates'))));
                                }
                                geoms.push({
                                    type: 'Polygon',
                                    coordinates: coords
                                });
                            } else if (geotypes[i] === 'Track' ||
                                geotypes[i] === 'gx:Track') {
                                var track = gxCoords(geomNode);
                                geoms.push({
                                    type: 'LineString',
                                    coordinates: track.coords
                                });
                                if (track.times.length) coordTimes.push(track.times);
                            }
                        }
                    }
                }
                return {
                    geoms: geoms,
                    coordTimes: coordTimes
                };
            }
            function getPlacemark(root) {
                var geomsAndTimes = getGeometry(root), i, properties = {},
                    name = nodeVal(get1(root, 'name')),
                    address = nodeVal(get1(root, 'address')),
                    styleUrl = nodeVal(get1(root, 'styleUrl')),
                    description = nodeVal(get1(root, 'description')),
                    timeSpan = get1(root, 'TimeSpan'),
                    timeStamp = get1(root, 'TimeStamp'),
                    extendedData = get1(root, 'ExtendedData'),
                    lineStyle = get1(root, 'LineStyle'),
                    polyStyle = get1(root, 'PolyStyle'),
                    visibility = get1(root, 'visibility');

                if (!geomsAndTimes.geoms.length) return [];
                if (name) properties.name = name;
                if (address) properties.address = address;
                if (styleUrl) {
                    if (styleUrl[0] !== '#') {
                        styleUrl = '#' + styleUrl;
                    }

                    properties.styleUrl = styleUrl;
                    if (styleIndex[styleUrl]) {
                        properties.styleHash = styleIndex[styleUrl];
                    }
                    if (styleMapIndex[styleUrl]) {
                        properties.styleMapHash = styleMapIndex[styleUrl];
                        properties.styleHash = styleIndex[styleMapIndex[styleUrl].normal];
                    }
                    // Try to populate the lineStyle or polyStyle since we got the style hash
                    var style = styleByHash[properties.styleHash];
                    if (style) {
                        if (!lineStyle) lineStyle = get1(style, 'LineStyle');
                        if (!polyStyle) polyStyle = get1(style, 'PolyStyle');
                    }
                }
                if (description) properties.description = description;
                if (timeSpan) {
                    var begin = nodeVal(get1(timeSpan, 'begin'));
                    var end = nodeVal(get1(timeSpan, 'end'));
                    properties.timespan = { begin: begin, end: end };
                }
                if (timeStamp) {
                    properties.timestamp = nodeVal(get1(timeStamp, 'when'));
                }
                if (lineStyle) {
                    var linestyles = kmlColor(nodeVal(get1(lineStyle, 'color'))),
                        color = linestyles[0],
                        opacity = linestyles[1],
                        width = parseFloat(nodeVal(get1(lineStyle, 'width')));
                    if (color) properties.stroke = color;
                    if (!isNaN(opacity)) properties['stroke-opacity'] = opacity;
                    if (!isNaN(width)) properties['stroke-width'] = width;
                }
                if (polyStyle) {
                    var polystyles = kmlColor(nodeVal(get1(polyStyle, 'color'))),
                        pcolor = polystyles[0],
                        popacity = polystyles[1],
                        fill = nodeVal(get1(polyStyle, 'fill')),
                        outline = nodeVal(get1(polyStyle, 'outline'));
                    if (pcolor) properties.fill = pcolor;
                    if (!isNaN(popacity)) properties['fill-opacity'] = popacity;
                    if (fill) properties['fill-opacity'] = fill === '1' ? properties['fill-opacity'] || 1 : 0;
                    if (outline) properties['stroke-opacity'] = outline === '1' ? properties['stroke-opacity'] || 1 : 0;
                }
                if (extendedData) {
                    var datas = get(extendedData, 'Data'),
                        simpleDatas = get(extendedData, 'SimpleData');

                    for (i = 0; i < datas.length; i++) {
                        properties[datas[i].getAttribute('name')] = nodeVal(get1(datas[i], 'value'));
                    }
                    for (i = 0; i < simpleDatas.length; i++) {
                        properties[simpleDatas[i].getAttribute('name')] = nodeVal(simpleDatas[i]);
                    }
                }
                if (visibility) {
                    properties.visibility = nodeVal(visibility);
                }
                if (geomsAndTimes.coordTimes.length) {
                    properties.coordTimes = (geomsAndTimes.coordTimes.length === 1) ?
                        geomsAndTimes.coordTimes[0] : geomsAndTimes.coordTimes;
                }
                var feature = {
                    type: 'Feature',
                    geometry: (geomsAndTimes.geoms.length === 1) ? geomsAndTimes.geoms[0] : {
                        type: 'GeometryCollection',
                        geometries: geomsAndTimes.geoms
                    },
                    properties: properties
                };
                if (attr(root, 'id')) feature.id = attr(root, 'id');
                return [feature];
            }
            return gj;
        },
        gpx: function(doc) {
            var i,
                tracks = get(doc, 'trk'),
                routes = get(doc, 'rte'),
                waypoints = get(doc, 'wpt'),
                // a feature collection
                gj = fc(),
                feature;
            for (i = 0; i < tracks.length; i++) {
                feature = getTrack(tracks[i]);
                if (feature) gj.features.push(feature);
            }
            for (i = 0; i < routes.length; i++) {
                feature = getRoute(routes[i]);
                if (feature) gj.features.push(feature);
            }
            for (i = 0; i < waypoints.length; i++) {
                gj.features.push(getPoint(waypoints[i]));
            }
            function getPoints(node, pointname) {
                var pts = get(node, pointname),
                    line = [],
                    times = [],
                    heartRates = [],
                    l = pts.length;
                if (l < 2) return {};  // Invalid line in GeoJSON
                for (var i = 0; i < l; i++) {
                    var c = coordPair(pts[i]);
                    line.push(c.coordinates);
                    if (c.time) times.push(c.time);
                    if (c.heartRate) heartRates.push(c.heartRate);
                }
                return {
                    line: line,
                    times: times,
                    heartRates: heartRates
                };
            }
            function getTrack(node) {
                var segments = get(node, 'trkseg'),
                    track = [],
                    times = [],
                    heartRates = [],
                    line;
                for (var i = 0; i < segments.length; i++) {
                    line = getPoints(segments[i], 'trkpt');
                    if (line) {
                        if (line.line) track.push(line.line);
                        if (line.times && line.times.length) times.push(line.times);
                        if (line.heartRates && line.heartRates.length) heartRates.push(line.heartRates);
                    }
                }
                if (track.length === 0) return;
                var properties = getProperties(node);
                extend(properties, getLineStyle(get1(node, 'extensions')));
                if (times.length) properties.coordTimes = track.length === 1 ? times[0] : times;
                if (heartRates.length) properties.heartRates = track.length === 1 ? heartRates[0] : heartRates;
                return {
                    type: 'Feature',
                    properties: properties,
                    geometry: {
                        type: track.length === 1 ? 'LineString' : 'MultiLineString',
                        coordinates: track.length === 1 ? track[0] : track
                    }
                };
            }
            function getRoute(node) {
                var line = getPoints(node, 'rtept');
                if (!line.line) return;
                var prop = getProperties(node);
                extend(prop, getLineStyle(get1(node, 'extensions')));
                var routeObj = {
                    type: 'Feature',
                    properties: prop,
                    geometry: {
                        type: 'LineString',
                        coordinates: line.line
                    }
                };
                return routeObj;
            }
            function getPoint(node) {
                var prop = getProperties(node);
                extend(prop, getMulti(node, ['sym']));
                return {
                    type: 'Feature',
                    properties: prop,
                    geometry: {
                        type: 'Point',
                        coordinates: coordPair(node).coordinates
                    }
                };
            }
            function getLineStyle(extensions) {
                var style = {};
                if (extensions) {
                    var lineStyle = get1(extensions, 'line');
                    if (lineStyle) {
                        var color = nodeVal(get1(lineStyle, 'color')),
                            opacity = parseFloat(nodeVal(get1(lineStyle, 'opacity'))),
                            width = parseFloat(nodeVal(get1(lineStyle, 'width')));
                        if (color) style.stroke = color;
                        if (!isNaN(opacity)) style['stroke-opacity'] = opacity;
                        // GPX width is in mm, convert to px with 96 px per inch
                        if (!isNaN(width)) style['stroke-width'] = width * 96 / 25.4;
                    }
                }
                return style;
            }
            function getProperties(node) {
                var prop = getMulti(node, ['name', 'cmt', 'desc', 'type', 'time', 'keywords']),
                    links = get(node, 'link');
                if (links.length) prop.links = [];
                for (var i = 0, link; i < links.length; i++) {
                    link = { href: attr(links[i], 'href') };
                    extend(link, getMulti(links[i], ['text', 'type']));
                    prop.links.push(link);
                }
                return prop;
            }
            return gj;
        }
    };
    return t;
})();

if (true) module.exports = toGeoJSON;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/topojson-client/src/bbox.js":
/*!**************************************************!*\
  !*** ./node_modules/topojson-client/src/bbox.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transform.js */ "./node_modules/topojson-client/src/transform.js");


/* harmony default export */ __webpack_exports__["default"] = (function(topology) {
  var t = Object(_transform_js__WEBPACK_IMPORTED_MODULE_0__["default"])(topology.transform), key,
      x0 = Infinity, y0 = x0, x1 = -x0, y1 = -x0;

  function bboxPoint(p) {
    p = t(p);
    if (p[0] < x0) x0 = p[0];
    if (p[0] > x1) x1 = p[0];
    if (p[1] < y0) y0 = p[1];
    if (p[1] > y1) y1 = p[1];
  }

  function bboxGeometry(o) {
    switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(bboxGeometry); break;
      case "Point": bboxPoint(o.coordinates); break;
      case "MultiPoint": o.coordinates.forEach(bboxPoint); break;
    }
  }

  topology.arcs.forEach(function(arc) {
    var i = -1, n = arc.length, p;
    while (++i < n) {
      p = t(arc[i], i);
      if (p[0] < x0) x0 = p[0];
      if (p[0] > x1) x1 = p[0];
      if (p[1] < y0) y0 = p[1];
      if (p[1] > y1) y1 = p[1];
    }
  });

  for (key in topology.objects) {
    bboxGeometry(topology.objects[key]);
  }

  return [x0, y0, x1, y1];
});


/***/ }),

/***/ "./node_modules/topojson-client/src/bisect.js":
/*!****************************************************!*\
  !*** ./node_modules/topojson-client/src/bisect.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, x) {
  var lo = 0, hi = a.length;
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
});


/***/ }),

/***/ "./node_modules/topojson-client/src/feature.js":
/*!*****************************************************!*\
  !*** ./node_modules/topojson-client/src/feature.js ***!
  \*****************************************************/
/*! exports provided: default, object */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "object", function() { return object; });
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/topojson-client/src/reverse.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ "./node_modules/topojson-client/src/transform.js");



/* harmony default export */ __webpack_exports__["default"] = (function(topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection"
      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature(topology, o); })}
      : feature(topology, o);
});

function feature(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object(topology, o);
  return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
      : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
      : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
}

function object(topology, o) {
  var transformPoint = Object(_transform_js__WEBPACK_IMPORTED_MODULE_1__["default"])(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();
    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k], k));
    }
    if (i < 0) Object(_reverse_js__WEBPACK_IMPORTED_MODULE_0__["default"])(points, n);
  }

  function point(p) {
    return transformPoint(p);
  }

  function line(arcs) {
    var points = [];
    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
    return points;
  }

  function ring(arcs) {
    var points = line(arcs);
    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.
    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type, coordinates;
    switch (type) {
      case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
      case "Point": coordinates = point(o.coordinates); break;
      case "MultiPoint": coordinates = o.coordinates.map(point); break;
      case "LineString": coordinates = line(o.arcs); break;
      case "MultiLineString": coordinates = o.arcs.map(line); break;
      case "Polygon": coordinates = polygon(o.arcs); break;
      case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
      default: return null;
    }
    return {type: type, coordinates: coordinates};
  }

  return geometry(o);
}


/***/ }),

/***/ "./node_modules/topojson-client/src/identity.js":
/*!******************************************************!*\
  !*** ./node_modules/topojson-client/src/identity.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return x;
});


/***/ }),

/***/ "./node_modules/topojson-client/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/topojson-client/src/index.js ***!
  \***************************************************/
/*! exports provided: bbox, feature, mesh, meshArcs, merge, mergeArcs, neighbors, quantize, transform, untransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bbox.js */ "./node_modules/topojson-client/src/bbox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bbox", function() { return _bbox_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./node_modules/topojson-client/src/feature.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "feature", function() { return _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _mesh_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mesh.js */ "./node_modules/topojson-client/src/mesh.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mesh", function() { return _mesh_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "meshArcs", function() { return _mesh_js__WEBPACK_IMPORTED_MODULE_2__["meshArcs"]; });

/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./merge.js */ "./node_modules/topojson-client/src/merge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return _merge_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeArcs", function() { return _merge_js__WEBPACK_IMPORTED_MODULE_3__["mergeArcs"]; });

/* harmony import */ var _neighbors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./neighbors.js */ "./node_modules/topojson-client/src/neighbors.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "neighbors", function() { return _neighbors_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _quantize_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quantize.js */ "./node_modules/topojson-client/src/quantize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quantize", function() { return _quantize_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transform.js */ "./node_modules/topojson-client/src/transform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return _transform_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _untransform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./untransform.js */ "./node_modules/topojson-client/src/untransform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "untransform", function() { return _untransform_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });











/***/ }),

/***/ "./node_modules/topojson-client/src/merge.js":
/*!***************************************************!*\
  !*** ./node_modules/topojson-client/src/merge.js ***!
  \***************************************************/
/*! exports provided: default, mergeArcs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeArcs", function() { return mergeArcs; });
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./node_modules/topojson-client/src/feature.js");
/* harmony import */ var _stitch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stitch.js */ "./node_modules/topojson-client/src/stitch.js");



function planarRingArea(ring) {
  var i = -1, n = ring.length, a, b = ring[n - 1], area = 0;
  while (++i < n) a = b, b = ring[i], area += a[0] * b[1] - a[1] * b[0];
  return Math.abs(area); // Note: doubled area!
}

/* harmony default export */ __webpack_exports__["default"] = (function(topology) {
  return Object(_feature_js__WEBPACK_IMPORTED_MODULE_0__["object"])(topology, mergeArcs.apply(this, arguments));
});

function mergeArcs(topology, objects) {
  var polygonsByArc = {},
      polygons = [],
      groups = [];

  objects.forEach(geometry);

  function geometry(o) {
    switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(geometry); break;
      case "Polygon": extract(o.arcs); break;
      case "MultiPolygon": o.arcs.forEach(extract); break;
    }
  }

  function extract(polygon) {
    polygon.forEach(function(ring) {
      ring.forEach(function(arc) {
        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
      });
    });
    polygons.push(polygon);
  }

  function area(ring) {
    return planarRingArea(Object(_feature_js__WEBPACK_IMPORTED_MODULE_0__["object"])(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]);
  }

  polygons.forEach(function(polygon) {
    if (!polygon._) {
      var group = [],
          neighbors = [polygon];
      polygon._ = 1;
      groups.push(group);
      while (polygon = neighbors.pop()) {
        group.push(polygon);
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
              if (!polygon._) {
                polygon._ = 1;
                neighbors.push(polygon);
              }
            });
          });
        });
      }
    }
  });

  polygons.forEach(function(polygon) {
    delete polygon._;
  });

  return {
    type: "MultiPolygon",
    arcs: groups.map(function(polygons) {
      var arcs = [], n;

      // Extract the exterior (unique) arcs.
      polygons.forEach(function(polygon) {
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
              arcs.push(arc);
            }
          });
        });
      });

      // Stitch the arcs into one or more rings.
      arcs = Object(_stitch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(topology, arcs);

      // If more than one ring is returned,
      // at most one of these rings can be the exterior;
      // choose the one with the greatest absolute area.
      if ((n = arcs.length) > 1) {
        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
          if ((ki = area(arcs[i])) > k) {
            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
          }
        }
      }

      return arcs;
    }).filter(function(arcs) {
      return arcs.length > 0;
    })
  };
}


/***/ }),

/***/ "./node_modules/topojson-client/src/mesh.js":
/*!**************************************************!*\
  !*** ./node_modules/topojson-client/src/mesh.js ***!
  \**************************************************/
/*! exports provided: default, meshArcs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "meshArcs", function() { return meshArcs; });
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./node_modules/topojson-client/src/feature.js");
/* harmony import */ var _stitch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stitch.js */ "./node_modules/topojson-client/src/stitch.js");



/* harmony default export */ __webpack_exports__["default"] = (function(topology) {
  return Object(_feature_js__WEBPACK_IMPORTED_MODULE_0__["object"])(topology, meshArcs.apply(this, arguments));
});

function meshArcs(topology, object, filter) {
  var arcs, i, n;
  if (arguments.length > 1) arcs = extractArcs(topology, object, filter);
  else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) arcs[i] = i;
  return {type: "MultiLineString", arcs: Object(_stitch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(topology, arcs)};
}

function extractArcs(topology, object, filter) {
  var arcs = [],
      geomsByArc = [],
      geom;

  function extract0(i) {
    var j = i < 0 ? ~i : i;
    (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
  }

  function extract1(arcs) {
    arcs.forEach(extract0);
  }

  function extract2(arcs) {
    arcs.forEach(extract1);
  }

  function extract3(arcs) {
    arcs.forEach(extract2);
  }

  function geometry(o) {
    switch (geom = o, o.type) {
      case "GeometryCollection": o.geometries.forEach(geometry); break;
      case "LineString": extract1(o.arcs); break;
      case "MultiLineString": case "Polygon": extract2(o.arcs); break;
      case "MultiPolygon": extract3(o.arcs); break;
    }
  }

  geometry(object);

  geomsByArc.forEach(filter == null
      ? function(geoms) { arcs.push(geoms[0].i); }
      : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });

  return arcs;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/neighbors.js":
/*!*******************************************************!*\
  !*** ./node_modules/topojson-client/src/neighbors.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bisect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bisect.js */ "./node_modules/topojson-client/src/bisect.js");


/* harmony default export */ __webpack_exports__["default"] = (function(objects) {
  var indexesByArc = {}, // arc index -> array of object indexes
      neighbors = objects.map(function() { return []; });

  function line(arcs, i) {
    arcs.forEach(function(a) {
      if (a < 0) a = ~a;
      var o = indexesByArc[a];
      if (o) o.push(i);
      else indexesByArc[a] = [i];
    });
  }

  function polygon(arcs, i) {
    arcs.forEach(function(arc) { line(arc, i); });
  }

  function geometry(o, i) {
    if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
    else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
  }

  var geometryType = {
    LineString: line,
    MultiLineString: polygon,
    Polygon: polygon,
    MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
  };

  objects.forEach(geometry);

  for (var i in indexesByArc) {
    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
      for (var k = j + 1; k < m; ++k) {
        var ij = indexes[j], ik = indexes[k], n;
        if ((n = neighbors[ij])[i = Object(_bisect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(n, ik)] !== ik) n.splice(i, 0, ik);
        if ((n = neighbors[ik])[i = Object(_bisect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(n, ij)] !== ij) n.splice(i, 0, ij);
      }
    }
  }

  return neighbors;
});


/***/ }),

/***/ "./node_modules/topojson-client/src/quantize.js":
/*!******************************************************!*\
  !*** ./node_modules/topojson-client/src/quantize.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bbox.js */ "./node_modules/topojson-client/src/bbox.js");
/* harmony import */ var _untransform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./untransform.js */ "./node_modules/topojson-client/src/untransform.js");



/* harmony default export */ __webpack_exports__["default"] = (function(topology, transform) {
  if (topology.transform) throw new Error("already quantized");

  if (!transform || !transform.scale) {
    if (!((n = Math.floor(transform)) >= 2)) throw new Error("n must be ≥2");
    box = topology.bbox || Object(_bbox_js__WEBPACK_IMPORTED_MODULE_0__["default"])(topology);
    var x0 = box[0], y0 = box[1], x1 = box[2], y1 = box[3], n;
    transform = {scale: [x1 - x0 ? (x1 - x0) / (n - 1) : 1, y1 - y0 ? (y1 - y0) / (n - 1) : 1], translate: [x0, y0]};
  } else {
    box = topology.bbox;
  }

  var t = Object(_untransform_js__WEBPACK_IMPORTED_MODULE_1__["default"])(transform), box, key, inputs = topology.objects, outputs = {};

  function quantizePoint(point) {
    return t(point);
  }

  function quantizeGeometry(input) {
    var output;
    switch (input.type) {
      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(quantizeGeometry)}; break;
      case "Point": output = {type: "Point", coordinates: quantizePoint(input.coordinates)}; break;
      case "MultiPoint": output = {type: "MultiPoint", coordinates: input.coordinates.map(quantizePoint)}; break;
      default: return input;
    }
    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function quantizeArc(input) {
    var i = 0, j = 1, n = input.length, p, output = new Array(n); // pessimistic
    output[0] = t(input[0], 0);
    while (++i < n) if ((p = t(input[i], i))[0] || p[1]) output[j++] = p; // non-coincident points
    if (j === 1) output[j++] = [0, 0]; // an arc must have at least two points
    output.length = j;
    return output;
  }

  for (key in inputs) outputs[key] = quantizeGeometry(inputs[key]);

  return {
    type: "Topology",
    bbox: box,
    transform: transform,
    objects: outputs,
    arcs: topology.arcs.map(quantizeArc)
  };
});


/***/ }),

/***/ "./node_modules/topojson-client/src/reverse.js":
/*!*****************************************************!*\
  !*** ./node_modules/topojson-client/src/reverse.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(array, n) {
  var t, j = array.length, i = j - n;
  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
});


/***/ }),

/***/ "./node_modules/topojson-client/src/stitch.js":
/*!****************************************************!*\
  !*** ./node_modules/topojson-client/src/stitch.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(topology, arcs) {
  var stitchedArcs = {},
      fragmentByStart = {},
      fragmentByEnd = {},
      fragments = [],
      emptyIndex = -1;

  // Stitch empty arcs first, since they may be subsumed by other arcs.
  arcs.forEach(function(i, j) {
    var arc = topology.arcs[i < 0 ? ~i : i], t;
    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
    }
  });

  arcs.forEach(function(i) {
    var e = ends(i),
        start = e[0],
        end = e[1],
        f, g;

    if (f = fragmentByEnd[start]) {
      delete fragmentByEnd[f.end];
      f.push(i);
      f.end = end;
      if (g = fragmentByStart[end]) {
        delete fragmentByStart[g.start];
        var fg = g === f ? f : f.concat(g);
        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else if (f = fragmentByStart[end]) {
      delete fragmentByStart[f.start];
      f.unshift(i);
      f.start = start;
      if (g = fragmentByEnd[start]) {
        delete fragmentByEnd[g.end];
        var gf = g === f ? f : g.concat(f);
        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else {
      f = [i];
      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
    }
  });

  function ends(i) {
    var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
    if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
    else p1 = arc[arc.length - 1];
    return i < 0 ? [p1, p0] : [p0, p1];
  }

  function flush(fragmentByEnd, fragmentByStart) {
    for (var k in fragmentByEnd) {
      var f = fragmentByEnd[k];
      delete fragmentByStart[f.start];
      delete f.start;
      delete f.end;
      f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
      fragments.push(f);
    }
  }

  flush(fragmentByEnd, fragmentByStart);
  flush(fragmentByStart, fragmentByEnd);
  arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

  return fragments;
});


/***/ }),

/***/ "./node_modules/topojson-client/src/transform.js":
/*!*******************************************************!*\
  !*** ./node_modules/topojson-client/src/transform.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/topojson-client/src/identity.js");


/* harmony default export */ __webpack_exports__["default"] = (function(transform) {
  if (transform == null) return _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2, n = input.length, output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
});


/***/ }),

/***/ "./node_modules/topojson-client/src/untransform.js":
/*!*********************************************************!*\
  !*** ./node_modules/topojson-client/src/untransform.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/topojson-client/src/identity.js");


/* harmony default export */ __webpack_exports__["default"] = (function(transform) {
  if (transform == null) return _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n),
        x1 = Math.round((input[0] - dx) / kx),
        y1 = Math.round((input[1] - dy) / ky);
    output[0] = x1 - x0, x0 = x1;
    output[1] = y1 - y0, y0 = y1;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
});


/***/ }),

/***/ "./node_modules/wellknown/index.js":
/*!*****************************************!*\
  !*** ./node_modules/wellknown/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*eslint-disable no-cond-assign */
module.exports = parse;
module.exports.parse = parse;
module.exports.stringify = stringify;

var numberRegexp = /[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?/;
// Matches sequences like '100 100' or '100 100 100'.
var tuples = new RegExp('^' + numberRegexp.source + '(\\s' + numberRegexp.source + '){1,}');

/*
 * Parse WKT and return GeoJSON.
 *
 * @param {string} _ A WKT geometry
 * @return {?Object} A GeoJSON geometry object
 */
function parse (input) {
  var parts = input.split(';');
  var _ = parts.pop();
  var srid = (parts.shift() || '').split('=').pop();

  var i = 0;

  function $ (re) {
    var match = _.substring(i).match(re);
    if (!match) return null;
    else {
      i += match[0].length;
      return match[0];
    }
  }

  function crs (obj) {
    if (obj && srid.match(/\d+/)) {
      obj.crs = {
        type: 'name',
        properties: {
          name: 'urn:ogc:def:crs:EPSG::' + srid
        }
      };
    }

    return obj;
  }

  function white () { $(/^\s*/); }

  function multicoords () {
    white();
    var depth = 0;
    var rings = [];
    var stack = [rings];
    var pointer = rings;
    var elem;

    while (elem =
           $(/^(\()/) ||
             $(/^(\))/) ||
               $(/^(,)/) ||
                 $(tuples)) {
      if (elem === '(') {
        stack.push(pointer);
        pointer = [];
        stack[stack.length - 1].push(pointer);
        depth++;
      } else if (elem === ')') {
        // For the case: Polygon(), ...
        if (pointer.length === 0) return null;

        pointer = stack.pop();
        // the stack was empty, input was malformed
        if (!pointer) return null;
        depth--;
        if (depth === 0) break;
      } else if (elem === ',') {
        pointer = [];
        stack[stack.length - 1].push(pointer);
      } else if (!elem.split(/\s/g).some(isNaN)) {
        Array.prototype.push.apply(pointer, elem.split(/\s/g).map(parseFloat));
      } else {
        return null;
      }
      white();
    }

    if (depth !== 0) return null;

    return rings;
  }

  function coords () {
    var list = [];
    var item;
    var pt;
    while (pt =
           $(tuples) ||
             $(/^(,)/)) {
      if (pt === ',') {
        list.push(item);
        item = [];
      } else if (!pt.split(/\s/g).some(isNaN)) {
        if (!item) item = [];
        Array.prototype.push.apply(item, pt.split(/\s/g).map(parseFloat));
      }
      white();
    }

    if (item) list.push(item);
    else return null;

    return list.length ? list : null;
  }

  function point () {
    if (!$(/^(point(\sz)?)/i)) return null;
    white();
    if (!$(/^(\()/)) return null;
    var c = coords();
    if (!c) return null;
    white();
    if (!$(/^(\))/)) return null;
    return {
      type: 'Point',
      coordinates: c[0]
    };
  }

  function multipoint () {
    if (!$(/^(multipoint)/i)) return null;
    white();
    var newCoordsFormat = _
      .substring(_.indexOf('(') + 1, _.length - 1)
      .replace(/\(/g, '')
      .replace(/\)/g, '');
    _ = 'MULTIPOINT (' + newCoordsFormat + ')';
    var c = multicoords();
    if (!c) return null;
    white();
    return {
      type: 'MultiPoint',
      coordinates: c
    };
  }

  function multilinestring () {
    if (!$(/^(multilinestring)/i)) return null;
    white();
    var c = multicoords();
    if (!c) return null;
    white();
    return {
      type: 'MultiLineString',
      coordinates: c
    };
  }

  function linestring () {
    if (!$(/^(linestring(\sz)?)/i)) return null;
    white();
    if (!$(/^(\()/)) return null;
    var c = coords();
    if (!c) return null;
    if (!$(/^(\))/)) return null;
    return {
      type: 'LineString',
      coordinates: c
    };
  }

  function polygon () {
    if (!$(/^(polygon(\sz)?)/i)) return null;
    white();
    var c = multicoords();
    if (!c) return null;
    return {
      type: 'Polygon',
      coordinates: c
    };
  }

  function multipolygon () {
    if (!$(/^(multipolygon)/i)) return null;
    white();
    var c = multicoords();
    if (!c) return null;
    return {
      type: 'MultiPolygon',
      coordinates: c
    };
  }

  function geometrycollection () {
    var geometries = [];
    var geometry;

    if (!$(/^(geometrycollection)/i)) return null;
    white();

    if (!$(/^(\()/)) return null;
    while (geometry = root()) {
      geometries.push(geometry);
      white();
      $(/^(,)/);
      white();
    }
    if (!$(/^(\))/)) return null;

    return {
      type: 'GeometryCollection',
      geometries: geometries
    };
  }

  function root () {
    return point() ||
      linestring() ||
      polygon() ||
      multipoint() ||
      multilinestring() ||
      multipolygon() ||
      geometrycollection();
  }

  return crs(root());
}

/**
 * Stringifies a GeoJSON object into WKT
 */
function stringify (gj) {
  if (gj.type === 'Feature') {
    gj = gj.geometry;
  }

  function pairWKT (c) {
    return c.join(' ');
  }

  function ringWKT (r) {
    return r.map(pairWKT).join(', ');
  }

  function ringsWKT (r) {
    return r.map(ringWKT).map(wrapParens).join(', ');
  }

  function multiRingsWKT (r) {
    return r.map(ringsWKT).map(wrapParens).join(', ');
  }

  function wrapParens (s) { return '(' + s + ')'; }

  switch (gj.type) {
    case 'Point':
      return 'POINT (' + pairWKT(gj.coordinates) + ')';
    case 'LineString':
      return 'LINESTRING (' + ringWKT(gj.coordinates) + ')';
    case 'Polygon':
      return 'POLYGON (' + ringsWKT(gj.coordinates) + ')';
    case 'MultiPoint':
      return 'MULTIPOINT (' + ringWKT(gj.coordinates) + ')';
    case 'MultiPolygon':
      return 'MULTIPOLYGON (' + multiRingsWKT(gj.coordinates) + ')';
    case 'MultiLineString':
      return 'MULTILINESTRING (' + ringsWKT(gj.coordinates) + ')';
    case 'GeometryCollection':
      return 'GEOMETRYCOLLECTION (' + gj.geometries.map(stringify).join(', ') + ')';
    default:
      throw new Error('stringify requires a valid GeoJSON Feature or geometry object as input');
  }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hcGJveC90b2dlb2pzb24vdG9nZW9qc29uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvYmJveC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9iaXNlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvZmVhdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9tZXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90b3BvanNvbi1jbGllbnQvc3JjL25laWdoYm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9xdWFudGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9yZXZlcnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90b3BvanNvbi1jbGllbnQvc3JjL3N0aXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvdW50cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlbGxrbm93bi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx3QkFBd0Isa0NBQWtDO0FBQzFELHlCQUF5QiwwQkFBMEI7QUFDbkQsMEJBQTBCLCtCQUErQjtBQUN6RDtBQUNBLHlCQUF5QixtQkFBbUIsK0JBQStCO0FBQzNFO0FBQ0EsdUJBQXVCLG9CQUFvQixnQkFBZ0IsRUFBRSxXQUFXO0FBQ3hFO0FBQ0E7QUFDQSwrQkFBK0IsY0FBYyxPQUFPLHlCQUF5QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLG1CQUFtQixlQUFlO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiw4QkFBOEI7QUFDekQ7QUFDQSx3QkFBd0Isd0RBQXdEO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFVBQVUsS0FBMkI7QUFDMUMsMEJBQTBCLG1CQUFPLENBQUMsZ0JBQVE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixtQkFBbUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGlCQUFpQjtBQUM5RCx1REFBdUQsV0FBVztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLCtCQUErQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0EsK0JBQStCLHNCQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxpREFBaUQ7QUFDbkcsK0NBQStDLDhDQUE4QztBQUM3RixrREFBa0QsaURBQWlEO0FBQ25HLDJCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBLG1DQUFtQyxzQkFBc0I7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsMkNBQTJDLGtCQUFrQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBLCtCQUErQix3QkFBd0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQywrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHFCQUFxQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGtCQUFrQjtBQUN2RCw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxJQUFJLElBQTZCLDZCOzs7Ozs7Ozs7Ozs7QUN6YWpDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixzQkFBc0I7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL3ZlbmRvcnN+Z2VvanNvbn5sYXllci1kYXRhTGF5ZXJGYWN0b3J5fmxheWVyLWRhdGFMYXllckZhY3RvcnktanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdG9HZW9KU09OID0gKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciByZW1vdmVTcGFjZSA9IC9cXHMqL2csXG4gICAgICAgIHRyaW1TcGFjZSA9IC9eXFxzKnxcXHMqJC9nLFxuICAgICAgICBzcGxpdFNwYWNlID0gL1xccysvO1xuICAgIC8vIGdlbmVyYXRlIGEgc2hvcnQsIG51bWVyaWMgaGFzaCBvZiBhIHN0cmluZ1xuICAgIGZ1bmN0aW9uIG9raGFzaCh4KSB7XG4gICAgICAgIGlmICgheCB8fCAheC5sZW5ndGgpIHJldHVybiAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgaCA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBoID0gKChoIDw8IDUpIC0gaCkgKyB4LmNoYXJDb2RlQXQoaSkgfCAwO1xuICAgICAgICB9IHJldHVybiBoO1xuICAgIH1cbiAgICAvLyBhbGwgWSBjaGlsZHJlbiBvZiBYXG4gICAgZnVuY3Rpb24gZ2V0KHgsIHkpIHsgcmV0dXJuIHguZ2V0RWxlbWVudHNCeVRhZ05hbWUoeSk7IH1cbiAgICBmdW5jdGlvbiBhdHRyKHgsIHkpIHsgcmV0dXJuIHguZ2V0QXR0cmlidXRlKHkpOyB9XG4gICAgZnVuY3Rpb24gYXR0cmYoeCwgeSkgeyByZXR1cm4gcGFyc2VGbG9hdChhdHRyKHgsIHkpKTsgfVxuICAgIC8vIG9uZSBZIGNoaWxkIG9mIFgsIGlmIGFueSwgb3RoZXJ3aXNlIG51bGxcbiAgICBmdW5jdGlvbiBnZXQxKHgsIHkpIHsgdmFyIG4gPSBnZXQoeCwgeSk7IHJldHVybiBuLmxlbmd0aCA/IG5bMF0gOiBudWxsOyB9XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05vZGUubm9ybWFsaXplXG4gICAgZnVuY3Rpb24gbm9ybShlbCkgeyBpZiAoZWwubm9ybWFsaXplKSB7IGVsLm5vcm1hbGl6ZSgpOyB9IHJldHVybiBlbDsgfVxuICAgIC8vIGNhc3QgYXJyYXkgeCBpbnRvIG51bWJlcnNcbiAgICBmdW5jdGlvbiBudW1hcnJheSh4KSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBvID0gW107IGogPCB4Lmxlbmd0aDsgaisrKSB7IG9bal0gPSBwYXJzZUZsb2F0KHhbal0pOyB9XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cbiAgICAvLyBnZXQgdGhlIGNvbnRlbnQgb2YgYSB0ZXh0IG5vZGUsIGlmIGFueVxuICAgIGZ1bmN0aW9uIG5vZGVWYWwoeCkge1xuICAgICAgICBpZiAoeCkgeyBub3JtKHgpOyB9XG4gICAgICAgIHJldHVybiAoeCAmJiB4LnRleHRDb250ZW50KSB8fCAnJztcbiAgICB9XG4gICAgLy8gZ2V0IHRoZSBjb250ZW50cyBvZiBtdWx0aXBsZSB0ZXh0IG5vZGVzLCBpZiBwcmVzZW50XG4gICAgZnVuY3Rpb24gZ2V0TXVsdGkoeCwgeXMpIHtcbiAgICAgICAgdmFyIG8gPSB7fSwgbiwgaztcbiAgICAgICAgZm9yIChrID0gMDsgayA8IHlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBuID0gZ2V0MSh4LCB5c1trXSk7XG4gICAgICAgICAgICBpZiAobikgb1t5c1trXV0gPSBub2RlVmFsKG4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cbiAgICAvLyBhZGQgcHJvcGVydGllcyBvZiBZIHRvIFgsIG92ZXJ3cml0aW5nIGlmIHByZXNlbnQgaW4gYm90aFxuICAgIGZ1bmN0aW9uIGV4dGVuZCh4LCB5KSB7IGZvciAodmFyIGsgaW4geSkgeFtrXSA9IHlba107IH1cbiAgICAvLyBnZXQgb25lIGNvb3JkaW5hdGUgZnJvbSBhIGNvb3JkaW5hdGUgYXJyYXksIGlmIGFueVxuICAgIGZ1bmN0aW9uIGNvb3JkMSh2KSB7IHJldHVybiBudW1hcnJheSh2LnJlcGxhY2UocmVtb3ZlU3BhY2UsICcnKS5zcGxpdCgnLCcpKTsgfVxuICAgIC8vIGdldCBhbGwgY29vcmRpbmF0ZXMgZnJvbSBhIGNvb3JkaW5hdGUgYXJyYXkgYXMgW1tdLFtdXVxuICAgIGZ1bmN0aW9uIGNvb3JkKHYpIHtcbiAgICAgICAgdmFyIGNvb3JkcyA9IHYucmVwbGFjZSh0cmltU3BhY2UsICcnKS5zcGxpdChzcGxpdFNwYWNlKSxcbiAgICAgICAgICAgIG8gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG8ucHVzaChjb29yZDEoY29vcmRzW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvb3JkUGFpcih4KSB7XG4gICAgICAgIHZhciBsbCA9IFthdHRyZih4LCAnbG9uJyksIGF0dHJmKHgsICdsYXQnKV0sXG4gICAgICAgICAgICBlbGUgPSBnZXQxKHgsICdlbGUnKSxcbiAgICAgICAgICAgIC8vIGhhbmRsZSBuYW1lc3BhY2VkIGF0dHJpYnV0ZSBpbiBicm93c2VyXG4gICAgICAgICAgICBoZWFydFJhdGUgPSBnZXQxKHgsICdncHh0cHg6aHInKSB8fCBnZXQxKHgsICdocicpLFxuICAgICAgICAgICAgdGltZSA9IGdldDEoeCwgJ3RpbWUnKSxcbiAgICAgICAgICAgIGU7XG4gICAgICAgIGlmIChlbGUpIHtcbiAgICAgICAgICAgIGUgPSBwYXJzZUZsb2F0KG5vZGVWYWwoZWxlKSk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKGUpKSB7XG4gICAgICAgICAgICAgICAgbGwucHVzaChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGxsLFxuICAgICAgICAgICAgdGltZTogdGltZSA/IG5vZGVWYWwodGltZSkgOiBudWxsLFxuICAgICAgICAgICAgaGVhcnRSYXRlOiBoZWFydFJhdGUgPyBwYXJzZUZsb2F0KG5vZGVWYWwoaGVhcnRSYXRlKSkgOiBudWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgbmV3IGZlYXR1cmUgY29sbGVjdGlvbiBwYXJlbnQgb2JqZWN0XG4gICAgZnVuY3Rpb24gZmMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgZmVhdHVyZXM6IFtdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHNlcmlhbGl6ZXI7XG4gICAgaWYgKHR5cGVvZiBYTUxTZXJpYWxpemVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBzZXJpYWxpemVyID0gbmV3IFhNTFNlcmlhbGl6ZXIoKTtcbiAgICAvLyBvbmx5IHJlcXVpcmUgeG1sZG9tIGluIGEgbm9kZSBlbnZpcm9ubWVudFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJiAhcHJvY2Vzcy5icm93c2VyKSB7XG4gICAgICAgIHNlcmlhbGl6ZXIgPSBuZXcgKHJlcXVpcmUoJ3htbGRvbScpLlhNTFNlcmlhbGl6ZXIpKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHhtbDJzdHIoc3RyKSB7XG4gICAgICAgIC8vIElFOSB3aWxsIGNyZWF0ZSBhIG5ldyBYTUxTZXJpYWxpemVyIGJ1dCBpdCdsbCBjcmFzaCBpbW1lZGlhdGVseS5cbiAgICAgICAgLy8gVGhpcyBsaW5lIGlzIGlnbm9yZWQgYmVjYXVzZSB3ZSBkb24ndCBydW4gY292ZXJhZ2UgdGVzdHMgaW4gSUU5XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGlmIChzdHIueG1sICE9PSB1bmRlZmluZWQpIHJldHVybiBzdHIueG1sO1xuICAgICAgICByZXR1cm4gc2VyaWFsaXplci5zZXJpYWxpemVUb1N0cmluZyhzdHIpO1xuICAgIH1cblxuICAgIHZhciB0ID0ge1xuICAgICAgICBrbWw6IGZ1bmN0aW9uKGRvYykge1xuXG4gICAgICAgICAgICB2YXIgZ2ogPSBmYygpLFxuICAgICAgICAgICAgICAgIC8vIHN0eWxlaW5kZXgga2VlcHMgdHJhY2sgb2YgaGFzaGVkIHN0eWxlcyBpbiBvcmRlciB0byBtYXRjaCBmZWF0dXJlc1xuICAgICAgICAgICAgICAgIHN0eWxlSW5kZXggPSB7fSwgc3R5bGVCeUhhc2ggPSB7fSxcbiAgICAgICAgICAgICAgICAvLyBzdHlsZW1hcGluZGV4IGtlZXBzIHRyYWNrIG9mIHN0eWxlIG1hcHMgdG8gZXhwb3NlIGluIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICBzdHlsZU1hcEluZGV4ID0ge30sXG4gICAgICAgICAgICAgICAgLy8gYXRvbWljIGdlb3NwYXRpYWwgdHlwZXMgc3VwcG9ydGVkIGJ5IEtNTCAtIE11bHRpR2VvbWV0cnkgaXNcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGVkIHNlcGFyYXRlbHlcbiAgICAgICAgICAgICAgICBnZW90eXBlcyA9IFsnUG9seWdvbicsICdMaW5lU3RyaW5nJywgJ1BvaW50JywgJ1RyYWNrJywgJ2d4OlRyYWNrJ10sXG4gICAgICAgICAgICAgICAgLy8gYWxsIHJvb3QgcGxhY2VtYXJrcyBpbiB0aGUgZmlsZVxuICAgICAgICAgICAgICAgIHBsYWNlbWFya3MgPSBnZXQoZG9jLCAnUGxhY2VtYXJrJyksXG4gICAgICAgICAgICAgICAgc3R5bGVzID0gZ2V0KGRvYywgJ1N0eWxlJyksXG4gICAgICAgICAgICAgICAgc3R5bGVNYXBzID0gZ2V0KGRvYywgJ1N0eWxlTWFwJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgc3R5bGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc2ggPSBva2hhc2goeG1sMnN0cihzdHlsZXNba10pKS50b1N0cmluZygxNik7XG4gICAgICAgICAgICAgICAgc3R5bGVJbmRleFsnIycgKyBhdHRyKHN0eWxlc1trXSwgJ2lkJyldID0gaGFzaDtcbiAgICAgICAgICAgICAgICBzdHlsZUJ5SGFzaFtoYXNoXSA9IHN0eWxlc1trXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgc3R5bGVNYXBzLmxlbmd0aDsgbCsrKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVJbmRleFsnIycgKyBhdHRyKHN0eWxlTWFwc1tsXSwgJ2lkJyldID0gb2toYXNoKHhtbDJzdHIoc3R5bGVNYXBzW2xdKSkudG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgICAgIHZhciBwYWlycyA9IGdldChzdHlsZU1hcHNbbF0sICdQYWlyJyk7XG4gICAgICAgICAgICAgICAgdmFyIHBhaXJzTWFwID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCBwYWlycy5sZW5ndGg7IG0rKykge1xuICAgICAgICAgICAgICAgICAgICBwYWlyc01hcFtub2RlVmFsKGdldDEocGFpcnNbbV0sICdrZXknKSldID0gbm9kZVZhbChnZXQxKHBhaXJzW21dLCAnc3R5bGVVcmwnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0eWxlTWFwSW5kZXhbJyMnICsgYXR0cihzdHlsZU1hcHNbbF0sICdpZCcpXSA9IHBhaXJzTWFwO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYWNlbWFya3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBnai5mZWF0dXJlcyA9IGdqLmZlYXR1cmVzLmNvbmNhdChnZXRQbGFjZW1hcmsocGxhY2VtYXJrc1tqXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24ga21sQ29sb3Iodikge1xuICAgICAgICAgICAgICAgIHZhciBjb2xvciwgb3BhY2l0eTtcbiAgICAgICAgICAgICAgICB2ID0gdiB8fCAnJztcbiAgICAgICAgICAgICAgICBpZiAodi5zdWJzdHIoMCwgMSkgPT09ICcjJykgeyB2ID0gdi5zdWJzdHIoMSk7IH1cbiAgICAgICAgICAgICAgICBpZiAodi5sZW5ndGggPT09IDYgfHwgdi5sZW5ndGggPT09IDMpIHsgY29sb3IgPSB2OyB9XG4gICAgICAgICAgICAgICAgaWYgKHYubGVuZ3RoID09PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgPSBwYXJzZUludCh2LnN1YnN0cigwLCAyKSwgMTYpIC8gMjU1O1xuICAgICAgICAgICAgICAgICAgICBjb2xvciA9ICcjJyArIHYuc3Vic3RyKDYsIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYuc3Vic3RyKDQsIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYuc3Vic3RyKDIsIDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW2NvbG9yLCBpc05hTihvcGFjaXR5KSA/IHVuZGVmaW5lZCA6IG9wYWNpdHldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ3hDb29yZCh2KSB7IHJldHVybiBudW1hcnJheSh2LnNwbGl0KCcgJykpOyB9XG4gICAgICAgICAgICBmdW5jdGlvbiBneENvb3Jkcyhyb290KSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1zID0gZ2V0KHJvb3QsICdjb29yZCcsICdneCcpLCBjb29yZHMgPSBbXSwgdGltZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbXMubGVuZ3RoID09PSAwKSBlbGVtcyA9IGdldChyb290LCAnZ3g6Y29vcmQnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSBjb29yZHMucHVzaChneENvb3JkKG5vZGVWYWwoZWxlbXNbaV0pKSk7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVFbGVtcyA9IGdldChyb290LCAnd2hlbicpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGltZUVsZW1zLmxlbmd0aDsgaisrKSB0aW1lcy5wdXNoKG5vZGVWYWwodGltZUVsZW1zW2pdKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzOiBjb29yZHMsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzOiB0aW1lc1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRHZW9tZXRyeShyb290KSB7XG4gICAgICAgICAgICAgICAgdmFyIGdlb21Ob2RlLCBnZW9tTm9kZXMsIGksIGosIGssIGdlb21zID0gW10sIGNvb3JkVGltZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0MShyb290LCAnTXVsdGlHZW9tZXRyeScpKSB7IHJldHVybiBnZXRHZW9tZXRyeShnZXQxKHJvb3QsICdNdWx0aUdlb21ldHJ5JykpOyB9XG4gICAgICAgICAgICAgICAgaWYgKGdldDEocm9vdCwgJ011bHRpVHJhY2snKSkgeyByZXR1cm4gZ2V0R2VvbWV0cnkoZ2V0MShyb290LCAnTXVsdGlUcmFjaycpKTsgfVxuICAgICAgICAgICAgICAgIGlmIChnZXQxKHJvb3QsICdneDpNdWx0aVRyYWNrJykpIHsgcmV0dXJuIGdldEdlb21ldHJ5KGdldDEocm9vdCwgJ2d4Ok11bHRpVHJhY2snKSk7IH1cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZ2VvdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbU5vZGVzID0gZ2V0KHJvb3QsIGdlb3R5cGVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdlb21Ob2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGdlb21Ob2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb21Ob2RlID0gZ2VvbU5vZGVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZW90eXBlc1tpXSA9PT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW9tcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogY29vcmQxKG5vZGVWYWwoZ2V0MShnZW9tTm9kZSwgJ2Nvb3JkaW5hdGVzJykpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdlb3R5cGVzW2ldID09PSAnTGluZVN0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogY29vcmQobm9kZVZhbChnZXQxKGdlb21Ob2RlLCAnY29vcmRpbmF0ZXMnKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2VvdHlwZXNbaV0gPT09ICdQb2x5Z29uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmluZ3MgPSBnZXQoZ2VvbU5vZGUsICdMaW5lYXJSaW5nJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IHJpbmdzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChjb29yZChub2RlVmFsKGdldDEocmluZ3Nba10sICdjb29yZGluYXRlcycpKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb21zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3Jkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdlb3R5cGVzW2ldID09PSAnVHJhY2snIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb3R5cGVzW2ldID09PSAnZ3g6VHJhY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFjayA9IGd4Q29vcmRzKGdlb21Ob2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogdHJhY2suY29vcmRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2sudGltZXMubGVuZ3RoKSBjb29yZFRpbWVzLnB1c2godHJhY2sudGltZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBnZW9tczogZ2VvbXMsXG4gICAgICAgICAgICAgICAgICAgIGNvb3JkVGltZXM6IGNvb3JkVGltZXNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UGxhY2VtYXJrKHJvb3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2VvbXNBbmRUaW1lcyA9IGdldEdlb21ldHJ5KHJvb3QpLCBpLCBwcm9wZXJ0aWVzID0ge30sXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBub2RlVmFsKGdldDEocm9vdCwgJ25hbWUnKSksXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3MgPSBub2RlVmFsKGdldDEocm9vdCwgJ2FkZHJlc3MnKSksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlVXJsID0gbm9kZVZhbChnZXQxKHJvb3QsICdzdHlsZVVybCcpKSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBub2RlVmFsKGdldDEocm9vdCwgJ2Rlc2NyaXB0aW9uJykpLFxuICAgICAgICAgICAgICAgICAgICB0aW1lU3BhbiA9IGdldDEocm9vdCwgJ1RpbWVTcGFuJyksXG4gICAgICAgICAgICAgICAgICAgIHRpbWVTdGFtcCA9IGdldDEocm9vdCwgJ1RpbWVTdGFtcCcpLFxuICAgICAgICAgICAgICAgICAgICBleHRlbmRlZERhdGEgPSBnZXQxKHJvb3QsICdFeHRlbmRlZERhdGEnKSxcbiAgICAgICAgICAgICAgICAgICAgbGluZVN0eWxlID0gZ2V0MShyb290LCAnTGluZVN0eWxlJyksXG4gICAgICAgICAgICAgICAgICAgIHBvbHlTdHlsZSA9IGdldDEocm9vdCwgJ1BvbHlTdHlsZScpLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gZ2V0MShyb290LCAndmlzaWJpbGl0eScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFnZW9tc0FuZFRpbWVzLmdlb21zLmxlbmd0aCkgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lKSBwcm9wZXJ0aWVzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzKSBwcm9wZXJ0aWVzLmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgICAgICAgICAgICAgIGlmIChzdHlsZVVybCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGVVcmxbMF0gIT09ICcjJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVVcmwgPSAnIycgKyBzdHlsZVVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuc3R5bGVVcmwgPSBzdHlsZVVybDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlSW5kZXhbc3R5bGVVcmxdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnN0eWxlSGFzaCA9IHN0eWxlSW5kZXhbc3R5bGVVcmxdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZU1hcEluZGV4W3N0eWxlVXJsXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5zdHlsZU1hcEhhc2ggPSBzdHlsZU1hcEluZGV4W3N0eWxlVXJsXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuc3R5bGVIYXNoID0gc3R5bGVJbmRleFtzdHlsZU1hcEluZGV4W3N0eWxlVXJsXS5ub3JtYWxdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyeSB0byBwb3B1bGF0ZSB0aGUgbGluZVN0eWxlIG9yIHBvbHlTdHlsZSBzaW5jZSB3ZSBnb3QgdGhlIHN0eWxlIGhhc2hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gc3R5bGVCeUhhc2hbcHJvcGVydGllcy5zdHlsZUhhc2hdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZVN0eWxlKSBsaW5lU3R5bGUgPSBnZXQxKHN0eWxlLCAnTGluZVN0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBvbHlTdHlsZSkgcG9seVN0eWxlID0gZ2V0MShzdHlsZSwgJ1BvbHlTdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbikgcHJvcGVydGllcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0aW1lU3Bhbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmVnaW4gPSBub2RlVmFsKGdldDEodGltZVNwYW4sICdiZWdpbicpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZCA9IG5vZGVWYWwoZ2V0MSh0aW1lU3BhbiwgJ2VuZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy50aW1lc3BhbiA9IHsgYmVnaW46IGJlZ2luLCBlbmQ6IGVuZCB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGltZVN0YW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMudGltZXN0YW1wID0gbm9kZVZhbChnZXQxKHRpbWVTdGFtcCwgJ3doZW4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsaW5lU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmVzdHlsZXMgPSBrbWxDb2xvcihub2RlVmFsKGdldDEobGluZVN0eWxlLCAnY29sb3InKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBsaW5lc3R5bGVzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSA9IGxpbmVzdHlsZXNbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHBhcnNlRmxvYXQobm9kZVZhbChnZXQxKGxpbmVTdHlsZSwgJ3dpZHRoJykpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yKSBwcm9wZXJ0aWVzLnN0cm9rZSA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG9wYWNpdHkpKSBwcm9wZXJ0aWVzWydzdHJva2Utb3BhY2l0eSddID0gb3BhY2l0eTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTih3aWR0aCkpIHByb3BlcnRpZXNbJ3N0cm9rZS13aWR0aCddID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwb2x5U3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvbHlzdHlsZXMgPSBrbWxDb2xvcihub2RlVmFsKGdldDEocG9seVN0eWxlLCAnY29sb3InKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGNvbG9yID0gcG9seXN0eWxlc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcGFjaXR5ID0gcG9seXN0eWxlc1sxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGwgPSBub2RlVmFsKGdldDEocG9seVN0eWxlLCAnZmlsbCcpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGxpbmUgPSBub2RlVmFsKGdldDEocG9seVN0eWxlLCAnb3V0bGluZScpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBjb2xvcikgcHJvcGVydGllcy5maWxsID0gcGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHBvcGFjaXR5KSkgcHJvcGVydGllc1snZmlsbC1vcGFjaXR5J10gPSBwb3BhY2l0eTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGwpIHByb3BlcnRpZXNbJ2ZpbGwtb3BhY2l0eSddID0gZmlsbCA9PT0gJzEnID8gcHJvcGVydGllc1snZmlsbC1vcGFjaXR5J10gfHwgMSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXRsaW5lKSBwcm9wZXJ0aWVzWydzdHJva2Utb3BhY2l0eSddID0gb3V0bGluZSA9PT0gJzEnID8gcHJvcGVydGllc1snc3Ryb2tlLW9wYWNpdHknXSB8fCAxIDogMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuZGVkRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YXMgPSBnZXQoZXh0ZW5kZWREYXRhLCAnRGF0YScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2ltcGxlRGF0YXMgPSBnZXQoZXh0ZW5kZWREYXRhLCAnU2ltcGxlRGF0YScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1tkYXRhc1tpXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKV0gPSBub2RlVmFsKGdldDEoZGF0YXNbaV0sICd2YWx1ZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2ltcGxlRGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbc2ltcGxlRGF0YXNbaV0uZ2V0QXR0cmlidXRlKCduYW1lJyldID0gbm9kZVZhbChzaW1wbGVEYXRhc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy52aXNpYmlsaXR5ID0gbm9kZVZhbCh2aXNpYmlsaXR5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGdlb21zQW5kVGltZXMuY29vcmRUaW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5jb29yZFRpbWVzID0gKGdlb21zQW5kVGltZXMuY29vcmRUaW1lcy5sZW5ndGggPT09IDEpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb21zQW5kVGltZXMuY29vcmRUaW1lc1swXSA6IGdlb21zQW5kVGltZXMuY29vcmRUaW1lcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGZlYXR1cmUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnk6IChnZW9tc0FuZFRpbWVzLmdlb21zLmxlbmd0aCA9PT0gMSkgPyBnZW9tc0FuZFRpbWVzLmdlb21zWzBdIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0dlb21ldHJ5Q29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9tZXRyaWVzOiBnZW9tc0FuZFRpbWVzLmdlb21zXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChhdHRyKHJvb3QsICdpZCcpKSBmZWF0dXJlLmlkID0gYXR0cihyb290LCAnaWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2ZlYXR1cmVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdqO1xuICAgICAgICB9LFxuICAgICAgICBncHg6IGZ1bmN0aW9uKGRvYykge1xuICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgdHJhY2tzID0gZ2V0KGRvYywgJ3RyaycpLFxuICAgICAgICAgICAgICAgIHJvdXRlcyA9IGdldChkb2MsICdydGUnKSxcbiAgICAgICAgICAgICAgICB3YXlwb2ludHMgPSBnZXQoZG9jLCAnd3B0JyksXG4gICAgICAgICAgICAgICAgLy8gYSBmZWF0dXJlIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBnaiA9IGZjKCksXG4gICAgICAgICAgICAgICAgZmVhdHVyZTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmZWF0dXJlID0gZ2V0VHJhY2sodHJhY2tzW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZSkgZ2ouZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmZWF0dXJlID0gZ2V0Um91dGUocm91dGVzW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZSkgZ2ouZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB3YXlwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBnai5mZWF0dXJlcy5wdXNoKGdldFBvaW50KHdheXBvaW50c1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UG9pbnRzKG5vZGUsIHBvaW50bmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBwdHMgPSBnZXQobm9kZSwgcG9pbnRuYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IFtdLFxuICAgICAgICAgICAgICAgICAgICB0aW1lcyA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBoZWFydFJhdGVzID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGwgPSBwdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChsIDwgMikgcmV0dXJuIHt9OyAgLy8gSW52YWxpZCBsaW5lIGluIEdlb0pTT05cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IGNvb3JkUGFpcihwdHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBsaW5lLnB1c2goYy5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjLnRpbWUpIHRpbWVzLnB1c2goYy50aW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGMuaGVhcnRSYXRlKSBoZWFydFJhdGVzLnB1c2goYy5oZWFydFJhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICAgICAgICAgICAgICB0aW1lczogdGltZXMsXG4gICAgICAgICAgICAgICAgICAgIGhlYXJ0UmF0ZXM6IGhlYXJ0UmF0ZXNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VHJhY2sobm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IGdldChub2RlLCAndHJrc2VnJyksXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrID0gW10sXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGhlYXJ0UmF0ZXMgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgbGluZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBnZXRQb2ludHMoc2VnbWVudHNbaV0sICd0cmtwdCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUubGluZSkgdHJhY2sucHVzaChsaW5lLmxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUudGltZXMgJiYgbGluZS50aW1lcy5sZW5ndGgpIHRpbWVzLnB1c2gobGluZS50aW1lcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5oZWFydFJhdGVzICYmIGxpbmUuaGVhcnRSYXRlcy5sZW5ndGgpIGhlYXJ0UmF0ZXMucHVzaChsaW5lLmhlYXJ0UmF0ZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0cmFjay5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydGllcyA9IGdldFByb3BlcnRpZXMobm9kZSk7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHByb3BlcnRpZXMsIGdldExpbmVTdHlsZShnZXQxKG5vZGUsICdleHRlbnNpb25zJykpKTtcbiAgICAgICAgICAgICAgICBpZiAodGltZXMubGVuZ3RoKSBwcm9wZXJ0aWVzLmNvb3JkVGltZXMgPSB0cmFjay5sZW5ndGggPT09IDEgPyB0aW1lc1swXSA6IHRpbWVzO1xuICAgICAgICAgICAgICAgIGlmIChoZWFydFJhdGVzLmxlbmd0aCkgcHJvcGVydGllcy5oZWFydFJhdGVzID0gdHJhY2subGVuZ3RoID09PSAxID8gaGVhcnRSYXRlc1swXSA6IGhlYXJ0UmF0ZXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdHJhY2subGVuZ3RoID09PSAxID8gJ0xpbmVTdHJpbmcnIDogJ011bHRpTGluZVN0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogdHJhY2subGVuZ3RoID09PSAxID8gdHJhY2tbMF0gOiB0cmFja1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFJvdXRlKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IGdldFBvaW50cyhub2RlLCAncnRlcHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoIWxpbmUubGluZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gZ2V0UHJvcGVydGllcyhub2RlKTtcbiAgICAgICAgICAgICAgICBleHRlbmQocHJvcCwgZ2V0TGluZVN0eWxlKGdldDEobm9kZSwgJ2V4dGVuc2lvbnMnKSkpO1xuICAgICAgICAgICAgICAgIHZhciByb3V0ZU9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wLFxuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGxpbmUubGluZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm91dGVPYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQb2ludChub2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBnZXRQcm9wZXJ0aWVzKG5vZGUpO1xuICAgICAgICAgICAgICAgIGV4dGVuZChwcm9wLCBnZXRNdWx0aShub2RlLCBbJ3N5bSddKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wLFxuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZFBhaXIobm9kZSkuY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRMaW5lU3R5bGUoZXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lU3R5bGUgPSBnZXQxKGV4dGVuc2lvbnMsICdsaW5lJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IG5vZGVWYWwoZ2V0MShsaW5lU3R5bGUsICdjb2xvcicpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5ID0gcGFyc2VGbG9hdChub2RlVmFsKGdldDEobGluZVN0eWxlLCAnb3BhY2l0eScpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBwYXJzZUZsb2F0KG5vZGVWYWwoZ2V0MShsaW5lU3R5bGUsICd3aWR0aCcpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IpIHN0eWxlLnN0cm9rZSA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihvcGFjaXR5KSkgc3R5bGVbJ3N0cm9rZS1vcGFjaXR5J10gPSBvcGFjaXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR1BYIHdpZHRoIGlzIGluIG1tLCBjb252ZXJ0IHRvIHB4IHdpdGggOTYgcHggcGVyIGluY2hcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4od2lkdGgpKSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gPSB3aWR0aCAqIDk2IC8gMjUuNDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGdldE11bHRpKG5vZGUsIFsnbmFtZScsICdjbXQnLCAnZGVzYycsICd0eXBlJywgJ3RpbWUnLCAna2V5d29yZHMnXSksXG4gICAgICAgICAgICAgICAgICAgIGxpbmtzID0gZ2V0KG5vZGUsICdsaW5rJyk7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmtzLmxlbmd0aCkgcHJvcC5saW5rcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsaW5rOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGluayA9IHsgaHJlZjogYXR0cihsaW5rc1tpXSwgJ2hyZWYnKSB9O1xuICAgICAgICAgICAgICAgICAgICBleHRlbmQobGluaywgZ2V0TXVsdGkobGlua3NbaV0sIFsndGV4dCcsICd0eXBlJ10pKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcC5saW5rcy5wdXNoKGxpbmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnajtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHQ7XG59KSgpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gdG9HZW9KU09OOyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpbXBvcnQgdHJhbnNmb3JtIGZyb20gXCIuL3RyYW5zZm9ybS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0b3BvbG9neSkge1xuICB2YXIgdCA9IHRyYW5zZm9ybSh0b3BvbG9neS50cmFuc2Zvcm0pLCBrZXksXG4gICAgICB4MCA9IEluZmluaXR5LCB5MCA9IHgwLCB4MSA9IC14MCwgeTEgPSAteDA7XG5cbiAgZnVuY3Rpb24gYmJveFBvaW50KHApIHtcbiAgICBwID0gdChwKTtcbiAgICBpZiAocFswXSA8IHgwKSB4MCA9IHBbMF07XG4gICAgaWYgKHBbMF0gPiB4MSkgeDEgPSBwWzBdO1xuICAgIGlmIChwWzFdIDwgeTApIHkwID0gcFsxXTtcbiAgICBpZiAocFsxXSA+IHkxKSB5MSA9IHBbMV07XG4gIH1cblxuICBmdW5jdGlvbiBiYm94R2VvbWV0cnkobykge1xuICAgIHN3aXRjaCAoby50eXBlKSB7XG4gICAgICBjYXNlIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI6IG8uZ2VvbWV0cmllcy5mb3JFYWNoKGJib3hHZW9tZXRyeSk7IGJyZWFrO1xuICAgICAgY2FzZSBcIlBvaW50XCI6IGJib3hQb2ludChvLmNvb3JkaW5hdGVzKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOiBvLmNvb3JkaW5hdGVzLmZvckVhY2goYmJveFBvaW50KTsgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdG9wb2xvZ3kuYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykge1xuICAgIHZhciBpID0gLTEsIG4gPSBhcmMubGVuZ3RoLCBwO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBwID0gdChhcmNbaV0sIGkpO1xuICAgICAgaWYgKHBbMF0gPCB4MCkgeDAgPSBwWzBdO1xuICAgICAgaWYgKHBbMF0gPiB4MSkgeDEgPSBwWzBdO1xuICAgICAgaWYgKHBbMV0gPCB5MCkgeTAgPSBwWzFdO1xuICAgICAgaWYgKHBbMV0gPiB5MSkgeTEgPSBwWzFdO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChrZXkgaW4gdG9wb2xvZ3kub2JqZWN0cykge1xuICAgIGJib3hHZW9tZXRyeSh0b3BvbG9neS5vYmplY3RzW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIFt4MCwgeTAsIHgxLCB5MV07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCB4KSB7XG4gIHZhciBsbyA9IDAsIGhpID0gYS5sZW5ndGg7XG4gIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgdmFyIG1pZCA9IGxvICsgaGkgPj4+IDE7XG4gICAgaWYgKGFbbWlkXSA8IHgpIGxvID0gbWlkICsgMTtcbiAgICBlbHNlIGhpID0gbWlkO1xuICB9XG4gIHJldHVybiBsbztcbn1cbiIsImltcG9ydCByZXZlcnNlIGZyb20gXCIuL3JldmVyc2UuanNcIjtcbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSBcIi4vdHJhbnNmb3JtLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRvcG9sb2d5LCBvKSB7XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgbyA9IHRvcG9sb2d5Lm9iamVjdHNbb107XG4gIHJldHVybiBvLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCJcbiAgICAgID8ge3R5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIiwgZmVhdHVyZXM6IG8uZ2VvbWV0cmllcy5tYXAoZnVuY3Rpb24obykgeyByZXR1cm4gZmVhdHVyZSh0b3BvbG9neSwgbyk7IH0pfVxuICAgICAgOiBmZWF0dXJlKHRvcG9sb2d5LCBvKTtcbn1cblxuZnVuY3Rpb24gZmVhdHVyZSh0b3BvbG9neSwgbykge1xuICB2YXIgaWQgPSBvLmlkLFxuICAgICAgYmJveCA9IG8uYmJveCxcbiAgICAgIHByb3BlcnRpZXMgPSBvLnByb3BlcnRpZXMgPT0gbnVsbCA/IHt9IDogby5wcm9wZXJ0aWVzLFxuICAgICAgZ2VvbWV0cnkgPSBvYmplY3QodG9wb2xvZ3ksIG8pO1xuICByZXR1cm4gaWQgPT0gbnVsbCAmJiBiYm94ID09IG51bGwgPyB7dHlwZTogXCJGZWF0dXJlXCIsIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsIGdlb21ldHJ5OiBnZW9tZXRyeX1cbiAgICAgIDogYmJveCA9PSBudWxsID8ge3R5cGU6IFwiRmVhdHVyZVwiLCBpZDogaWQsIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsIGdlb21ldHJ5OiBnZW9tZXRyeX1cbiAgICAgIDoge3R5cGU6IFwiRmVhdHVyZVwiLCBpZDogaWQsIGJib3g6IGJib3gsIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsIGdlb21ldHJ5OiBnZW9tZXRyeX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3QodG9wb2xvZ3ksIG8pIHtcbiAgdmFyIHRyYW5zZm9ybVBvaW50ID0gdHJhbnNmb3JtKHRvcG9sb2d5LnRyYW5zZm9ybSksXG4gICAgICBhcmNzID0gdG9wb2xvZ3kuYXJjcztcblxuICBmdW5jdGlvbiBhcmMoaSwgcG9pbnRzKSB7XG4gICAgaWYgKHBvaW50cy5sZW5ndGgpIHBvaW50cy5wb3AoKTtcbiAgICBmb3IgKHZhciBhID0gYXJjc1tpIDwgMCA/IH5pIDogaV0sIGsgPSAwLCBuID0gYS5sZW5ndGg7IGsgPCBuOyArK2spIHtcbiAgICAgIHBvaW50cy5wdXNoKHRyYW5zZm9ybVBvaW50KGFba10sIGspKTtcbiAgICB9XG4gICAgaWYgKGkgPCAwKSByZXZlcnNlKHBvaW50cywgbik7XG4gIH1cblxuICBmdW5jdGlvbiBwb2ludChwKSB7XG4gICAgcmV0dXJuIHRyYW5zZm9ybVBvaW50KHApO1xuICB9XG5cbiAgZnVuY3Rpb24gbGluZShhcmNzKSB7XG4gICAgdmFyIHBvaW50cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gYXJjcy5sZW5ndGg7IGkgPCBuOyArK2kpIGFyYyhhcmNzW2ldLCBwb2ludHMpO1xuICAgIGlmIChwb2ludHMubGVuZ3RoIDwgMikgcG9pbnRzLnB1c2gocG9pbnRzWzBdKTsgLy8gVGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuIHBlciB0aGUgc3BlY2lmaWNhdGlvbi5cbiAgICByZXR1cm4gcG9pbnRzO1xuICB9XG5cbiAgZnVuY3Rpb24gcmluZyhhcmNzKSB7XG4gICAgdmFyIHBvaW50cyA9IGxpbmUoYXJjcyk7XG4gICAgd2hpbGUgKHBvaW50cy5sZW5ndGggPCA0KSBwb2ludHMucHVzaChwb2ludHNbMF0pOyAvLyBUaGlzIG1heSBoYXBwZW4gaWYgYW4gYXJjIGhhcyBvbmx5IHR3byBwb2ludHMuXG4gICAgcmV0dXJuIHBvaW50cztcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvbHlnb24oYXJjcykge1xuICAgIHJldHVybiBhcmNzLm1hcChyaW5nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlb21ldHJ5KG8pIHtcbiAgICB2YXIgdHlwZSA9IG8udHlwZSwgY29vcmRpbmF0ZXM7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI6IHJldHVybiB7dHlwZTogdHlwZSwgZ2VvbWV0cmllczogby5nZW9tZXRyaWVzLm1hcChnZW9tZXRyeSl9O1xuICAgICAgY2FzZSBcIlBvaW50XCI6IGNvb3JkaW5hdGVzID0gcG9pbnQoby5jb29yZGluYXRlcyk7IGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjogY29vcmRpbmF0ZXMgPSBvLmNvb3JkaW5hdGVzLm1hcChwb2ludCk7IGJyZWFrO1xuICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjogY29vcmRpbmF0ZXMgPSBsaW5lKG8uYXJjcyk7IGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOiBjb29yZGluYXRlcyA9IG8uYXJjcy5tYXAobGluZSk7IGJyZWFrO1xuICAgICAgY2FzZSBcIlBvbHlnb25cIjogY29vcmRpbmF0ZXMgPSBwb2x5Z29uKG8uYXJjcyk7IGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOiBjb29yZGluYXRlcyA9IG8uYXJjcy5tYXAocG9seWdvbik7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7dHlwZTogdHlwZSwgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzfTtcbiAgfVxuXG4gIHJldHVybiBnZW9tZXRyeShvKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHg7XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgYmJveH0gZnJvbSBcIi4vYmJveC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGZlYXR1cmV9IGZyb20gXCIuL2ZlYXR1cmUuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBtZXNoLCBtZXNoQXJjc30gZnJvbSBcIi4vbWVzaC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1lcmdlLCBtZXJnZUFyY3N9IGZyb20gXCIuL21lcmdlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgbmVpZ2hib3JzfSBmcm9tIFwiLi9uZWlnaGJvcnMuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBxdWFudGl6ZX0gZnJvbSBcIi4vcXVhbnRpemUuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0cmFuc2Zvcm19IGZyb20gXCIuL3RyYW5zZm9ybS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHVudHJhbnNmb3JtfSBmcm9tIFwiLi91bnRyYW5zZm9ybS5qc1wiO1xuIiwiaW1wb3J0IHtvYmplY3R9IGZyb20gXCIuL2ZlYXR1cmUuanNcIjtcbmltcG9ydCBzdGl0Y2ggZnJvbSBcIi4vc3RpdGNoLmpzXCI7XG5cbmZ1bmN0aW9uIHBsYW5hclJpbmdBcmVhKHJpbmcpIHtcbiAgdmFyIGkgPSAtMSwgbiA9IHJpbmcubGVuZ3RoLCBhLCBiID0gcmluZ1tuIC0gMV0sIGFyZWEgPSAwO1xuICB3aGlsZSAoKytpIDwgbikgYSA9IGIsIGIgPSByaW5nW2ldLCBhcmVhICs9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gIHJldHVybiBNYXRoLmFicyhhcmVhKTsgLy8gTm90ZTogZG91YmxlZCBhcmVhIVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0b3BvbG9neSkge1xuICByZXR1cm4gb2JqZWN0KHRvcG9sb2d5LCBtZXJnZUFyY3MuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUFyY3ModG9wb2xvZ3ksIG9iamVjdHMpIHtcbiAgdmFyIHBvbHlnb25zQnlBcmMgPSB7fSxcbiAgICAgIHBvbHlnb25zID0gW10sXG4gICAgICBncm91cHMgPSBbXTtcblxuICBvYmplY3RzLmZvckVhY2goZ2VvbWV0cnkpO1xuXG4gIGZ1bmN0aW9uIGdlb21ldHJ5KG8pIHtcbiAgICBzd2l0Y2ggKG8udHlwZSkge1xuICAgICAgY2FzZSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiOiBvLmdlb21ldHJpZXMuZm9yRWFjaChnZW9tZXRyeSk7IGJyZWFrO1xuICAgICAgY2FzZSBcIlBvbHlnb25cIjogZXh0cmFjdChvLmFyY3MpOyBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjogby5hcmNzLmZvckVhY2goZXh0cmFjdCk7IGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dHJhY3QocG9seWdvbikge1xuICAgIHBvbHlnb24uZm9yRWFjaChmdW5jdGlvbihyaW5nKSB7XG4gICAgICByaW5nLmZvckVhY2goZnVuY3Rpb24oYXJjKSB7XG4gICAgICAgIChwb2x5Z29uc0J5QXJjW2FyYyA9IGFyYyA8IDAgPyB+YXJjIDogYXJjXSB8fCAocG9seWdvbnNCeUFyY1thcmNdID0gW10pKS5wdXNoKHBvbHlnb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcG9seWdvbnMucHVzaChwb2x5Z29uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFyZWEocmluZykge1xuICAgIHJldHVybiBwbGFuYXJSaW5nQXJlYShvYmplY3QodG9wb2xvZ3ksIHt0eXBlOiBcIlBvbHlnb25cIiwgYXJjczogW3JpbmddfSkuY29vcmRpbmF0ZXNbMF0pO1xuICB9XG5cbiAgcG9seWdvbnMuZm9yRWFjaChmdW5jdGlvbihwb2x5Z29uKSB7XG4gICAgaWYgKCFwb2x5Z29uLl8pIHtcbiAgICAgIHZhciBncm91cCA9IFtdLFxuICAgICAgICAgIG5laWdoYm9ycyA9IFtwb2x5Z29uXTtcbiAgICAgIHBvbHlnb24uXyA9IDE7XG4gICAgICBncm91cHMucHVzaChncm91cCk7XG4gICAgICB3aGlsZSAocG9seWdvbiA9IG5laWdoYm9ycy5wb3AoKSkge1xuICAgICAgICBncm91cC5wdXNoKHBvbHlnb24pO1xuICAgICAgICBwb2x5Z29uLmZvckVhY2goZnVuY3Rpb24ocmluZykge1xuICAgICAgICAgIHJpbmcuZm9yRWFjaChmdW5jdGlvbihhcmMpIHtcbiAgICAgICAgICAgIHBvbHlnb25zQnlBcmNbYXJjIDwgMCA/IH5hcmMgOiBhcmNdLmZvckVhY2goZnVuY3Rpb24ocG9seWdvbikge1xuICAgICAgICAgICAgICBpZiAoIXBvbHlnb24uXykge1xuICAgICAgICAgICAgICAgIHBvbHlnb24uXyA9IDE7XG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2gocG9seWdvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHBvbHlnb25zLmZvckVhY2goZnVuY3Rpb24ocG9seWdvbikge1xuICAgIGRlbGV0ZSBwb2x5Z29uLl87XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJNdWx0aVBvbHlnb25cIixcbiAgICBhcmNzOiBncm91cHMubWFwKGZ1bmN0aW9uKHBvbHlnb25zKSB7XG4gICAgICB2YXIgYXJjcyA9IFtdLCBuO1xuXG4gICAgICAvLyBFeHRyYWN0IHRoZSBleHRlcmlvciAodW5pcXVlKSBhcmNzLlxuICAgICAgcG9seWdvbnMuZm9yRWFjaChmdW5jdGlvbihwb2x5Z29uKSB7XG4gICAgICAgIHBvbHlnb24uZm9yRWFjaChmdW5jdGlvbihyaW5nKSB7XG4gICAgICAgICAgcmluZy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykge1xuICAgICAgICAgICAgaWYgKHBvbHlnb25zQnlBcmNbYXJjIDwgMCA/IH5hcmMgOiBhcmNdLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgYXJjcy5wdXNoKGFyYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFN0aXRjaCB0aGUgYXJjcyBpbnRvIG9uZSBvciBtb3JlIHJpbmdzLlxuICAgICAgYXJjcyA9IHN0aXRjaCh0b3BvbG9neSwgYXJjcyk7XG5cbiAgICAgIC8vIElmIG1vcmUgdGhhbiBvbmUgcmluZyBpcyByZXR1cm5lZCxcbiAgICAgIC8vIGF0IG1vc3Qgb25lIG9mIHRoZXNlIHJpbmdzIGNhbiBiZSB0aGUgZXh0ZXJpb3I7XG4gICAgICAvLyBjaG9vc2UgdGhlIG9uZSB3aXRoIHRoZSBncmVhdGVzdCBhYnNvbHV0ZSBhcmVhLlxuICAgICAgaWYgKChuID0gYXJjcy5sZW5ndGgpID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMSwgayA9IGFyZWEoYXJjc1swXSksIGtpLCB0OyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgaWYgKChraSA9IGFyZWEoYXJjc1tpXSkpID4gaykge1xuICAgICAgICAgICAgdCA9IGFyY3NbMF0sIGFyY3NbMF0gPSBhcmNzW2ldLCBhcmNzW2ldID0gdCwgayA9IGtpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXJjcztcbiAgICB9KS5maWx0ZXIoZnVuY3Rpb24oYXJjcykge1xuICAgICAgcmV0dXJuIGFyY3MubGVuZ3RoID4gMDtcbiAgICB9KVxuICB9O1xufVxuIiwiaW1wb3J0IHtvYmplY3R9IGZyb20gXCIuL2ZlYXR1cmUuanNcIjtcbmltcG9ydCBzdGl0Y2ggZnJvbSBcIi4vc3RpdGNoLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRvcG9sb2d5KSB7XG4gIHJldHVybiBvYmplY3QodG9wb2xvZ3ksIG1lc2hBcmNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVzaEFyY3ModG9wb2xvZ3ksIG9iamVjdCwgZmlsdGVyKSB7XG4gIHZhciBhcmNzLCBpLCBuO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIGFyY3MgPSBleHRyYWN0QXJjcyh0b3BvbG9neSwgb2JqZWN0LCBmaWx0ZXIpO1xuICBlbHNlIGZvciAoaSA9IDAsIGFyY3MgPSBuZXcgQXJyYXkobiA9IHRvcG9sb2d5LmFyY3MubGVuZ3RoKTsgaSA8IG47ICsraSkgYXJjc1tpXSA9IGk7XG4gIHJldHVybiB7dHlwZTogXCJNdWx0aUxpbmVTdHJpbmdcIiwgYXJjczogc3RpdGNoKHRvcG9sb2d5LCBhcmNzKX07XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RBcmNzKHRvcG9sb2d5LCBvYmplY3QsIGZpbHRlcikge1xuICB2YXIgYXJjcyA9IFtdLFxuICAgICAgZ2VvbXNCeUFyYyA9IFtdLFxuICAgICAgZ2VvbTtcblxuICBmdW5jdGlvbiBleHRyYWN0MChpKSB7XG4gICAgdmFyIGogPSBpIDwgMCA/IH5pIDogaTtcbiAgICAoZ2VvbXNCeUFyY1tqXSB8fCAoZ2VvbXNCeUFyY1tqXSA9IFtdKSkucHVzaCh7aTogaSwgZzogZ2VvbX0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0cmFjdDEoYXJjcykge1xuICAgIGFyY3MuZm9yRWFjaChleHRyYWN0MCk7XG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0MihhcmNzKSB7XG4gICAgYXJjcy5mb3JFYWNoKGV4dHJhY3QxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dHJhY3QzKGFyY3MpIHtcbiAgICBhcmNzLmZvckVhY2goZXh0cmFjdDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VvbWV0cnkobykge1xuICAgIHN3aXRjaCAoZ2VvbSA9IG8sIG8udHlwZSkge1xuICAgICAgY2FzZSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiOiBvLmdlb21ldHJpZXMuZm9yRWFjaChnZW9tZXRyeSk7IGJyZWFrO1xuICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjogZXh0cmFjdDEoby5hcmNzKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6IGNhc2UgXCJQb2x5Z29uXCI6IGV4dHJhY3QyKG8uYXJjcyk7IGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOiBleHRyYWN0MyhvLmFyY3MpOyBicmVhaztcbiAgICB9XG4gIH1cblxuICBnZW9tZXRyeShvYmplY3QpO1xuXG4gIGdlb21zQnlBcmMuZm9yRWFjaChmaWx0ZXIgPT0gbnVsbFxuICAgICAgPyBmdW5jdGlvbihnZW9tcykgeyBhcmNzLnB1c2goZ2VvbXNbMF0uaSk7IH1cbiAgICAgIDogZnVuY3Rpb24oZ2VvbXMpIHsgaWYgKGZpbHRlcihnZW9tc1swXS5nLCBnZW9tc1tnZW9tcy5sZW5ndGggLSAxXS5nKSkgYXJjcy5wdXNoKGdlb21zWzBdLmkpOyB9KTtcblxuICByZXR1cm4gYXJjcztcbn1cbiIsImltcG9ydCBiaXNlY3QgZnJvbSBcIi4vYmlzZWN0LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdHMpIHtcbiAgdmFyIGluZGV4ZXNCeUFyYyA9IHt9LCAvLyBhcmMgaW5kZXggLT4gYXJyYXkgb2Ygb2JqZWN0IGluZGV4ZXNcbiAgICAgIG5laWdoYm9ycyA9IG9iamVjdHMubWFwKGZ1bmN0aW9uKCkgeyByZXR1cm4gW107IH0pO1xuXG4gIGZ1bmN0aW9uIGxpbmUoYXJjcywgaSkge1xuICAgIGFyY3MuZm9yRWFjaChmdW5jdGlvbihhKSB7XG4gICAgICBpZiAoYSA8IDApIGEgPSB+YTtcbiAgICAgIHZhciBvID0gaW5kZXhlc0J5QXJjW2FdO1xuICAgICAgaWYgKG8pIG8ucHVzaChpKTtcbiAgICAgIGVsc2UgaW5kZXhlc0J5QXJjW2FdID0gW2ldO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9seWdvbihhcmNzLCBpKSB7XG4gICAgYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykgeyBsaW5lKGFyYywgaSk7IH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VvbWV0cnkobywgaSkge1xuICAgIGlmIChvLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCIpIG8uZ2VvbWV0cmllcy5mb3JFYWNoKGZ1bmN0aW9uKG8pIHsgZ2VvbWV0cnkobywgaSk7IH0pO1xuICAgIGVsc2UgaWYgKG8udHlwZSBpbiBnZW9tZXRyeVR5cGUpIGdlb21ldHJ5VHlwZVtvLnR5cGVdKG8uYXJjcywgaSk7XG4gIH1cblxuICB2YXIgZ2VvbWV0cnlUeXBlID0ge1xuICAgIExpbmVTdHJpbmc6IGxpbmUsXG4gICAgTXVsdGlMaW5lU3RyaW5nOiBwb2x5Z29uLFxuICAgIFBvbHlnb246IHBvbHlnb24sXG4gICAgTXVsdGlQb2x5Z29uOiBmdW5jdGlvbihhcmNzLCBpKSB7IGFyY3MuZm9yRWFjaChmdW5jdGlvbihhcmMpIHsgcG9seWdvbihhcmMsIGkpOyB9KTsgfVxuICB9O1xuXG4gIG9iamVjdHMuZm9yRWFjaChnZW9tZXRyeSk7XG5cbiAgZm9yICh2YXIgaSBpbiBpbmRleGVzQnlBcmMpIHtcbiAgICBmb3IgKHZhciBpbmRleGVzID0gaW5kZXhlc0J5QXJjW2ldLCBtID0gaW5kZXhlcy5sZW5ndGgsIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICBmb3IgKHZhciBrID0gaiArIDE7IGsgPCBtOyArK2spIHtcbiAgICAgICAgdmFyIGlqID0gaW5kZXhlc1tqXSwgaWsgPSBpbmRleGVzW2tdLCBuO1xuICAgICAgICBpZiAoKG4gPSBuZWlnaGJvcnNbaWpdKVtpID0gYmlzZWN0KG4sIGlrKV0gIT09IGlrKSBuLnNwbGljZShpLCAwLCBpayk7XG4gICAgICAgIGlmICgobiA9IG5laWdoYm9yc1tpa10pW2kgPSBiaXNlY3QobiwgaWopXSAhPT0gaWopIG4uc3BsaWNlKGksIDAsIGlqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmVpZ2hib3JzO1xufVxuIiwiaW1wb3J0IGJib3ggZnJvbSBcIi4vYmJveC5qc1wiO1xuaW1wb3J0IHVudHJhbnNmb3JtIGZyb20gXCIuL3VudHJhbnNmb3JtLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRvcG9sb2d5LCB0cmFuc2Zvcm0pIHtcbiAgaWYgKHRvcG9sb2d5LnRyYW5zZm9ybSkgdGhyb3cgbmV3IEVycm9yKFwiYWxyZWFkeSBxdWFudGl6ZWRcIik7XG5cbiAgaWYgKCF0cmFuc2Zvcm0gfHwgIXRyYW5zZm9ybS5zY2FsZSkge1xuICAgIGlmICghKChuID0gTWF0aC5mbG9vcih0cmFuc2Zvcm0pKSA+PSAyKSkgdGhyb3cgbmV3IEVycm9yKFwibiBtdXN0IGJlIOKJpTJcIik7XG4gICAgYm94ID0gdG9wb2xvZ3kuYmJveCB8fCBiYm94KHRvcG9sb2d5KTtcbiAgICB2YXIgeDAgPSBib3hbMF0sIHkwID0gYm94WzFdLCB4MSA9IGJveFsyXSwgeTEgPSBib3hbM10sIG47XG4gICAgdHJhbnNmb3JtID0ge3NjYWxlOiBbeDEgLSB4MCA/ICh4MSAtIHgwKSAvIChuIC0gMSkgOiAxLCB5MSAtIHkwID8gKHkxIC0geTApIC8gKG4gLSAxKSA6IDFdLCB0cmFuc2xhdGU6IFt4MCwgeTBdfTtcbiAgfSBlbHNlIHtcbiAgICBib3ggPSB0b3BvbG9neS5iYm94O1xuICB9XG5cbiAgdmFyIHQgPSB1bnRyYW5zZm9ybSh0cmFuc2Zvcm0pLCBib3gsIGtleSwgaW5wdXRzID0gdG9wb2xvZ3kub2JqZWN0cywgb3V0cHV0cyA9IHt9O1xuXG4gIGZ1bmN0aW9uIHF1YW50aXplUG9pbnQocG9pbnQpIHtcbiAgICByZXR1cm4gdChwb2ludCk7XG4gIH1cblxuICBmdW5jdGlvbiBxdWFudGl6ZUdlb21ldHJ5KGlucHV0KSB7XG4gICAgdmFyIG91dHB1dDtcbiAgICBzd2l0Y2ggKGlucHV0LnR5cGUpIHtcbiAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjogb3V0cHV0ID0ge3R5cGU6IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCIsIGdlb21ldHJpZXM6IGlucHV0Lmdlb21ldHJpZXMubWFwKHF1YW50aXplR2VvbWV0cnkpfTsgYnJlYWs7XG4gICAgICBjYXNlIFwiUG9pbnRcIjogb3V0cHV0ID0ge3R5cGU6IFwiUG9pbnRcIiwgY29vcmRpbmF0ZXM6IHF1YW50aXplUG9pbnQoaW5wdXQuY29vcmRpbmF0ZXMpfTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOiBvdXRwdXQgPSB7dHlwZTogXCJNdWx0aVBvaW50XCIsIGNvb3JkaW5hdGVzOiBpbnB1dC5jb29yZGluYXRlcy5tYXAocXVhbnRpemVQb2ludCl9OyBicmVhaztcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgaWYgKGlucHV0LmlkICE9IG51bGwpIG91dHB1dC5pZCA9IGlucHV0LmlkO1xuICAgIGlmIChpbnB1dC5iYm94ICE9IG51bGwpIG91dHB1dC5iYm94ID0gaW5wdXQuYmJveDtcbiAgICBpZiAoaW5wdXQucHJvcGVydGllcyAhPSBudWxsKSBvdXRwdXQucHJvcGVydGllcyA9IGlucHV0LnByb3BlcnRpZXM7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1YW50aXplQXJjKGlucHV0KSB7XG4gICAgdmFyIGkgPSAwLCBqID0gMSwgbiA9IGlucHV0Lmxlbmd0aCwgcCwgb3V0cHV0ID0gbmV3IEFycmF5KG4pOyAvLyBwZXNzaW1pc3RpY1xuICAgIG91dHB1dFswXSA9IHQoaW5wdXRbMF0sIDApO1xuICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKHAgPSB0KGlucHV0W2ldLCBpKSlbMF0gfHwgcFsxXSkgb3V0cHV0W2orK10gPSBwOyAvLyBub24tY29pbmNpZGVudCBwb2ludHNcbiAgICBpZiAoaiA9PT0gMSkgb3V0cHV0W2orK10gPSBbMCwgMF07IC8vIGFuIGFyYyBtdXN0IGhhdmUgYXQgbGVhc3QgdHdvIHBvaW50c1xuICAgIG91dHB1dC5sZW5ndGggPSBqO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBmb3IgKGtleSBpbiBpbnB1dHMpIG91dHB1dHNba2V5XSA9IHF1YW50aXplR2VvbWV0cnkoaW5wdXRzW2tleV0pO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJUb3BvbG9neVwiLFxuICAgIGJib3g6IGJveCxcbiAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICBvYmplY3RzOiBvdXRwdXRzLFxuICAgIGFyY3M6IHRvcG9sb2d5LmFyY3MubWFwKHF1YW50aXplQXJjKVxuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJyYXksIG4pIHtcbiAgdmFyIHQsIGogPSBhcnJheS5sZW5ndGgsIGkgPSBqIC0gbjtcbiAgd2hpbGUgKGkgPCAtLWopIHQgPSBhcnJheVtpXSwgYXJyYXlbaSsrXSA9IGFycmF5W2pdLCBhcnJheVtqXSA9IHQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0b3BvbG9neSwgYXJjcykge1xuICB2YXIgc3RpdGNoZWRBcmNzID0ge30sXG4gICAgICBmcmFnbWVudEJ5U3RhcnQgPSB7fSxcbiAgICAgIGZyYWdtZW50QnlFbmQgPSB7fSxcbiAgICAgIGZyYWdtZW50cyA9IFtdLFxuICAgICAgZW1wdHlJbmRleCA9IC0xO1xuXG4gIC8vIFN0aXRjaCBlbXB0eSBhcmNzIGZpcnN0LCBzaW5jZSB0aGV5IG1heSBiZSBzdWJzdW1lZCBieSBvdGhlciBhcmNzLlxuICBhcmNzLmZvckVhY2goZnVuY3Rpb24oaSwgaikge1xuICAgIHZhciBhcmMgPSB0b3BvbG9neS5hcmNzW2kgPCAwID8gfmkgOiBpXSwgdDtcbiAgICBpZiAoYXJjLmxlbmd0aCA8IDMgJiYgIWFyY1sxXVswXSAmJiAhYXJjWzFdWzFdKSB7XG4gICAgICB0ID0gYXJjc1srK2VtcHR5SW5kZXhdLCBhcmNzW2VtcHR5SW5kZXhdID0gaSwgYXJjc1tqXSA9IHQ7XG4gICAgfVxuICB9KTtcblxuICBhcmNzLmZvckVhY2goZnVuY3Rpb24oaSkge1xuICAgIHZhciBlID0gZW5kcyhpKSxcbiAgICAgICAgc3RhcnQgPSBlWzBdLFxuICAgICAgICBlbmQgPSBlWzFdLFxuICAgICAgICBmLCBnO1xuXG4gICAgaWYgKGYgPSBmcmFnbWVudEJ5RW5kW3N0YXJ0XSkge1xuICAgICAgZGVsZXRlIGZyYWdtZW50QnlFbmRbZi5lbmRdO1xuICAgICAgZi5wdXNoKGkpO1xuICAgICAgZi5lbmQgPSBlbmQ7XG4gICAgICBpZiAoZyA9IGZyYWdtZW50QnlTdGFydFtlbmRdKSB7XG4gICAgICAgIGRlbGV0ZSBmcmFnbWVudEJ5U3RhcnRbZy5zdGFydF07XG4gICAgICAgIHZhciBmZyA9IGcgPT09IGYgPyBmIDogZi5jb25jYXQoZyk7XG4gICAgICAgIGZyYWdtZW50QnlTdGFydFtmZy5zdGFydCA9IGYuc3RhcnRdID0gZnJhZ21lbnRCeUVuZFtmZy5lbmQgPSBnLmVuZF0gPSBmZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyYWdtZW50QnlTdGFydFtmLnN0YXJ0XSA9IGZyYWdtZW50QnlFbmRbZi5lbmRdID0gZjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGYgPSBmcmFnbWVudEJ5U3RhcnRbZW5kXSkge1xuICAgICAgZGVsZXRlIGZyYWdtZW50QnlTdGFydFtmLnN0YXJ0XTtcbiAgICAgIGYudW5zaGlmdChpKTtcbiAgICAgIGYuc3RhcnQgPSBzdGFydDtcbiAgICAgIGlmIChnID0gZnJhZ21lbnRCeUVuZFtzdGFydF0pIHtcbiAgICAgICAgZGVsZXRlIGZyYWdtZW50QnlFbmRbZy5lbmRdO1xuICAgICAgICB2YXIgZ2YgPSBnID09PSBmID8gZiA6IGcuY29uY2F0KGYpO1xuICAgICAgICBmcmFnbWVudEJ5U3RhcnRbZ2Yuc3RhcnQgPSBnLnN0YXJ0XSA9IGZyYWdtZW50QnlFbmRbZ2YuZW5kID0gZi5lbmRdID0gZ2Y7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcmFnbWVudEJ5U3RhcnRbZi5zdGFydF0gPSBmcmFnbWVudEJ5RW5kW2YuZW5kXSA9IGY7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGYgPSBbaV07XG4gICAgICBmcmFnbWVudEJ5U3RhcnRbZi5zdGFydCA9IHN0YXJ0XSA9IGZyYWdtZW50QnlFbmRbZi5lbmQgPSBlbmRdID0gZjtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGVuZHMoaSkge1xuICAgIHZhciBhcmMgPSB0b3BvbG9neS5hcmNzW2kgPCAwID8gfmkgOiBpXSwgcDAgPSBhcmNbMF0sIHAxO1xuICAgIGlmICh0b3BvbG9neS50cmFuc2Zvcm0pIHAxID0gWzAsIDBdLCBhcmMuZm9yRWFjaChmdW5jdGlvbihkcCkgeyBwMVswXSArPSBkcFswXSwgcDFbMV0gKz0gZHBbMV07IH0pO1xuICAgIGVsc2UgcDEgPSBhcmNbYXJjLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBpIDwgMCA/IFtwMSwgcDBdIDogW3AwLCBwMV07XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaChmcmFnbWVudEJ5RW5kLCBmcmFnbWVudEJ5U3RhcnQpIHtcbiAgICBmb3IgKHZhciBrIGluIGZyYWdtZW50QnlFbmQpIHtcbiAgICAgIHZhciBmID0gZnJhZ21lbnRCeUVuZFtrXTtcbiAgICAgIGRlbGV0ZSBmcmFnbWVudEJ5U3RhcnRbZi5zdGFydF07XG4gICAgICBkZWxldGUgZi5zdGFydDtcbiAgICAgIGRlbGV0ZSBmLmVuZDtcbiAgICAgIGYuZm9yRWFjaChmdW5jdGlvbihpKSB7IHN0aXRjaGVkQXJjc1tpIDwgMCA/IH5pIDogaV0gPSAxOyB9KTtcbiAgICAgIGZyYWdtZW50cy5wdXNoKGYpO1xuICAgIH1cbiAgfVxuXG4gIGZsdXNoKGZyYWdtZW50QnlFbmQsIGZyYWdtZW50QnlTdGFydCk7XG4gIGZsdXNoKGZyYWdtZW50QnlTdGFydCwgZnJhZ21lbnRCeUVuZCk7XG4gIGFyY3MuZm9yRWFjaChmdW5jdGlvbihpKSB7IGlmICghc3RpdGNoZWRBcmNzW2kgPCAwID8gfmkgOiBpXSkgZnJhZ21lbnRzLnB1c2goW2ldKTsgfSk7XG5cbiAgcmV0dXJuIGZyYWdtZW50cztcbn1cbiIsImltcG9ydCBpZGVudGl0eSBmcm9tIFwiLi9pZGVudGl0eS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0cmFuc2Zvcm0pIHtcbiAgaWYgKHRyYW5zZm9ybSA9PSBudWxsKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhciB4MCxcbiAgICAgIHkwLFxuICAgICAga3ggPSB0cmFuc2Zvcm0uc2NhbGVbMF0sXG4gICAgICBreSA9IHRyYW5zZm9ybS5zY2FsZVsxXSxcbiAgICAgIGR4ID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVswXSxcbiAgICAgIGR5ID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVsxXTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBpKSB7XG4gICAgaWYgKCFpKSB4MCA9IHkwID0gMDtcbiAgICB2YXIgaiA9IDIsIG4gPSBpbnB1dC5sZW5ndGgsIG91dHB1dCA9IG5ldyBBcnJheShuKTtcbiAgICBvdXRwdXRbMF0gPSAoeDAgKz0gaW5wdXRbMF0pICoga3ggKyBkeDtcbiAgICBvdXRwdXRbMV0gPSAoeTAgKz0gaW5wdXRbMV0pICoga3kgKyBkeTtcbiAgICB3aGlsZSAoaiA8IG4pIG91dHB1dFtqXSA9IGlucHV0W2pdLCArK2o7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcbn1cbiIsImltcG9ydCBpZGVudGl0eSBmcm9tIFwiLi9pZGVudGl0eS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0cmFuc2Zvcm0pIHtcbiAgaWYgKHRyYW5zZm9ybSA9PSBudWxsKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhciB4MCxcbiAgICAgIHkwLFxuICAgICAga3ggPSB0cmFuc2Zvcm0uc2NhbGVbMF0sXG4gICAgICBreSA9IHRyYW5zZm9ybS5zY2FsZVsxXSxcbiAgICAgIGR4ID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVswXSxcbiAgICAgIGR5ID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVsxXTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBpKSB7XG4gICAgaWYgKCFpKSB4MCA9IHkwID0gMDtcbiAgICB2YXIgaiA9IDIsXG4gICAgICAgIG4gPSBpbnB1dC5sZW5ndGgsXG4gICAgICAgIG91dHB1dCA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgeDEgPSBNYXRoLnJvdW5kKChpbnB1dFswXSAtIGR4KSAvIGt4KSxcbiAgICAgICAgeTEgPSBNYXRoLnJvdW5kKChpbnB1dFsxXSAtIGR5KSAvIGt5KTtcbiAgICBvdXRwdXRbMF0gPSB4MSAtIHgwLCB4MCA9IHgxO1xuICAgIG91dHB1dFsxXSA9IHkxIC0geTAsIHkwID0geTE7XG4gICAgd2hpbGUgKGogPCBuKSBvdXRwdXRbal0gPSBpbnB1dFtqXSwgKytqO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG59XG4iLCIvKmVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlO1xubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbm1vZHVsZS5leHBvcnRzLnN0cmluZ2lmeSA9IHN0cmluZ2lmeTtcblxudmFyIG51bWJlclJlZ2V4cCA9IC9bLStdPyhbMC05XSpcXC5bMC05XSt8WzAtOV0rKShbZUVdWy0rXT9bMC05XSspPy87XG4vLyBNYXRjaGVzIHNlcXVlbmNlcyBsaWtlICcxMDAgMTAwJyBvciAnMTAwIDEwMCAxMDAnLlxudmFyIHR1cGxlcyA9IG5ldyBSZWdFeHAoJ14nICsgbnVtYmVyUmVnZXhwLnNvdXJjZSArICcoXFxcXHMnICsgbnVtYmVyUmVnZXhwLnNvdXJjZSArICcpezEsfScpO1xuXG4vKlxuICogUGFyc2UgV0tUIGFuZCByZXR1cm4gR2VvSlNPTi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gXyBBIFdLVCBnZW9tZXRyeVxuICogQHJldHVybiB7P09iamVjdH0gQSBHZW9KU09OIGdlb21ldHJ5IG9iamVjdFxuICovXG5mdW5jdGlvbiBwYXJzZSAoaW5wdXQpIHtcbiAgdmFyIHBhcnRzID0gaW5wdXQuc3BsaXQoJzsnKTtcbiAgdmFyIF8gPSBwYXJ0cy5wb3AoKTtcbiAgdmFyIHNyaWQgPSAocGFydHMuc2hpZnQoKSB8fCAnJykuc3BsaXQoJz0nKS5wb3AoKTtcblxuICB2YXIgaSA9IDA7XG5cbiAgZnVuY3Rpb24gJCAocmUpIHtcbiAgICB2YXIgbWF0Y2ggPSBfLnN1YnN0cmluZyhpKS5tYXRjaChyZSk7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG4gICAgZWxzZSB7XG4gICAgICBpICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIHJldHVybiBtYXRjaFswXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjcnMgKG9iaikge1xuICAgIGlmIChvYmogJiYgc3JpZC5tYXRjaCgvXFxkKy8pKSB7XG4gICAgICBvYmouY3JzID0ge1xuICAgICAgICB0eXBlOiAnbmFtZScsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBuYW1lOiAndXJuOm9nYzpkZWY6Y3JzOkVQU0c6OicgKyBzcmlkXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdoaXRlICgpIHsgJCgvXlxccyovKTsgfVxuXG4gIGZ1bmN0aW9uIG11bHRpY29vcmRzICgpIHtcbiAgICB3aGl0ZSgpO1xuICAgIHZhciBkZXB0aCA9IDA7XG4gICAgdmFyIHJpbmdzID0gW107XG4gICAgdmFyIHN0YWNrID0gW3JpbmdzXTtcbiAgICB2YXIgcG9pbnRlciA9IHJpbmdzO1xuICAgIHZhciBlbGVtO1xuXG4gICAgd2hpbGUgKGVsZW0gPVxuICAgICAgICAgICAkKC9eKFxcKCkvKSB8fFxuICAgICAgICAgICAgICQoL14oXFwpKS8pIHx8XG4gICAgICAgICAgICAgICAkKC9eKCwpLykgfHxcbiAgICAgICAgICAgICAgICAgJCh0dXBsZXMpKSB7XG4gICAgICBpZiAoZWxlbSA9PT0gJygnKSB7XG4gICAgICAgIHN0YWNrLnB1c2gocG9pbnRlcik7XG4gICAgICAgIHBvaW50ZXIgPSBbXTtcbiAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0ucHVzaChwb2ludGVyKTtcbiAgICAgICAgZGVwdGgrKztcbiAgICAgIH0gZWxzZSBpZiAoZWxlbSA9PT0gJyknKSB7XG4gICAgICAgIC8vIEZvciB0aGUgY2FzZTogUG9seWdvbigpLCAuLi5cbiAgICAgICAgaWYgKHBvaW50ZXIubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBwb2ludGVyID0gc3RhY2sucG9wKCk7XG4gICAgICAgIC8vIHRoZSBzdGFjayB3YXMgZW1wdHksIGlucHV0IHdhcyBtYWxmb3JtZWRcbiAgICAgICAgaWYgKCFwb2ludGVyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgZGVwdGgtLTtcbiAgICAgICAgaWYgKGRlcHRoID09PSAwKSBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoZWxlbSA9PT0gJywnKSB7XG4gICAgICAgIHBvaW50ZXIgPSBbXTtcbiAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0ucHVzaChwb2ludGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoIWVsZW0uc3BsaXQoL1xccy9nKS5zb21lKGlzTmFOKSkge1xuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShwb2ludGVyLCBlbGVtLnNwbGl0KC9cXHMvZykubWFwKHBhcnNlRmxvYXQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgd2hpdGUoKTtcbiAgICB9XG5cbiAgICBpZiAoZGVwdGggIT09IDApIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHJpbmdzO1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzICgpIHtcbiAgICB2YXIgbGlzdCA9IFtdO1xuICAgIHZhciBpdGVtO1xuICAgIHZhciBwdDtcbiAgICB3aGlsZSAocHQgPVxuICAgICAgICAgICAkKHR1cGxlcykgfHxcbiAgICAgICAgICAgICAkKC9eKCwpLykpIHtcbiAgICAgIGlmIChwdCA9PT0gJywnKSB7XG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgICAgaXRlbSA9IFtdO1xuICAgICAgfSBlbHNlIGlmICghcHQuc3BsaXQoL1xccy9nKS5zb21lKGlzTmFOKSkge1xuICAgICAgICBpZiAoIWl0ZW0pIGl0ZW0gPSBbXTtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoaXRlbSwgcHQuc3BsaXQoL1xccy9nKS5tYXAocGFyc2VGbG9hdCkpO1xuICAgICAgfVxuICAgICAgd2hpdGUoKTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbSkgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIGVsc2UgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gbGlzdC5sZW5ndGggPyBsaXN0IDogbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ICgpIHtcbiAgICBpZiAoISQoL14ocG9pbnQoXFxzeik/KS9pKSkgcmV0dXJuIG51bGw7XG4gICAgd2hpdGUoKTtcbiAgICBpZiAoISQoL14oXFwoKS8pKSByZXR1cm4gbnVsbDtcbiAgICB2YXIgYyA9IGNvb3JkcygpO1xuICAgIGlmICghYykgcmV0dXJuIG51bGw7XG4gICAgd2hpdGUoKTtcbiAgICBpZiAoISQoL14oXFwpKS8pKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzOiBjWzBdXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG11bHRpcG9pbnQgKCkge1xuICAgIGlmICghJCgvXihtdWx0aXBvaW50KS9pKSkgcmV0dXJuIG51bGw7XG4gICAgd2hpdGUoKTtcbiAgICB2YXIgbmV3Q29vcmRzRm9ybWF0ID0gX1xuICAgICAgLnN1YnN0cmluZyhfLmluZGV4T2YoJygnKSArIDEsIF8ubGVuZ3RoIC0gMSlcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJycpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICcnKTtcbiAgICBfID0gJ01VTFRJUE9JTlQgKCcgKyBuZXdDb29yZHNGb3JtYXQgKyAnKSc7XG4gICAgdmFyIGMgPSBtdWx0aWNvb3JkcygpO1xuICAgIGlmICghYykgcmV0dXJuIG51bGw7XG4gICAgd2hpdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ011bHRpUG9pbnQnLFxuICAgICAgY29vcmRpbmF0ZXM6IGNcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbXVsdGlsaW5lc3RyaW5nICgpIHtcbiAgICBpZiAoISQoL14obXVsdGlsaW5lc3RyaW5nKS9pKSkgcmV0dXJuIG51bGw7XG4gICAgd2hpdGUoKTtcbiAgICB2YXIgYyA9IG11bHRpY29vcmRzKCk7XG4gICAgaWYgKCFjKSByZXR1cm4gbnVsbDtcbiAgICB3aGl0ZSgpO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnTXVsdGlMaW5lU3RyaW5nJyxcbiAgICAgIGNvb3JkaW5hdGVzOiBjXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpbmVzdHJpbmcgKCkge1xuICAgIGlmICghJCgvXihsaW5lc3RyaW5nKFxcc3opPykvaSkpIHJldHVybiBudWxsO1xuICAgIHdoaXRlKCk7XG4gICAgaWYgKCEkKC9eKFxcKCkvKSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIGMgPSBjb29yZHMoKTtcbiAgICBpZiAoIWMpIHJldHVybiBudWxsO1xuICAgIGlmICghJCgvXihcXCkpLykpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICBjb29yZGluYXRlczogY1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBwb2x5Z29uICgpIHtcbiAgICBpZiAoISQoL14ocG9seWdvbihcXHN6KT8pL2kpKSByZXR1cm4gbnVsbDtcbiAgICB3aGl0ZSgpO1xuICAgIHZhciBjID0gbXVsdGljb29yZHMoKTtcbiAgICBpZiAoIWMpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICBjb29yZGluYXRlczogY1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBtdWx0aXBvbHlnb24gKCkge1xuICAgIGlmICghJCgvXihtdWx0aXBvbHlnb24pL2kpKSByZXR1cm4gbnVsbDtcbiAgICB3aGl0ZSgpO1xuICAgIHZhciBjID0gbXVsdGljb29yZHMoKTtcbiAgICBpZiAoIWMpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnTXVsdGlQb2x5Z29uJyxcbiAgICAgIGNvb3JkaW5hdGVzOiBjXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlb21ldHJ5Y29sbGVjdGlvbiAoKSB7XG4gICAgdmFyIGdlb21ldHJpZXMgPSBbXTtcbiAgICB2YXIgZ2VvbWV0cnk7XG5cbiAgICBpZiAoISQoL14oZ2VvbWV0cnljb2xsZWN0aW9uKS9pKSkgcmV0dXJuIG51bGw7XG4gICAgd2hpdGUoKTtcblxuICAgIGlmICghJCgvXihcXCgpLykpIHJldHVybiBudWxsO1xuICAgIHdoaWxlIChnZW9tZXRyeSA9IHJvb3QoKSkge1xuICAgICAgZ2VvbWV0cmllcy5wdXNoKGdlb21ldHJ5KTtcbiAgICAgIHdoaXRlKCk7XG4gICAgICAkKC9eKCwpLyk7XG4gICAgICB3aGl0ZSgpO1xuICAgIH1cbiAgICBpZiAoISQoL14oXFwpKS8pKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnR2VvbWV0cnlDb2xsZWN0aW9uJyxcbiAgICAgIGdlb21ldHJpZXM6IGdlb21ldHJpZXNcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcm9vdCAoKSB7XG4gICAgcmV0dXJuIHBvaW50KCkgfHxcbiAgICAgIGxpbmVzdHJpbmcoKSB8fFxuICAgICAgcG9seWdvbigpIHx8XG4gICAgICBtdWx0aXBvaW50KCkgfHxcbiAgICAgIG11bHRpbGluZXN0cmluZygpIHx8XG4gICAgICBtdWx0aXBvbHlnb24oKSB8fFxuICAgICAgZ2VvbWV0cnljb2xsZWN0aW9uKCk7XG4gIH1cblxuICByZXR1cm4gY3JzKHJvb3QoKSk7XG59XG5cbi8qKlxuICogU3RyaW5naWZpZXMgYSBHZW9KU09OIG9iamVjdCBpbnRvIFdLVFxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnkgKGdqKSB7XG4gIGlmIChnai50eXBlID09PSAnRmVhdHVyZScpIHtcbiAgICBnaiA9IGdqLmdlb21ldHJ5O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFpcldLVCAoYykge1xuICAgIHJldHVybiBjLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJpbmdXS1QgKHIpIHtcbiAgICByZXR1cm4gci5tYXAocGFpcldLVCkuam9pbignLCAnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJpbmdzV0tUIChyKSB7XG4gICAgcmV0dXJuIHIubWFwKHJpbmdXS1QpLm1hcCh3cmFwUGFyZW5zKS5qb2luKCcsICcpO1xuICB9XG5cbiAgZnVuY3Rpb24gbXVsdGlSaW5nc1dLVCAocikge1xuICAgIHJldHVybiByLm1hcChyaW5nc1dLVCkubWFwKHdyYXBQYXJlbnMpLmpvaW4oJywgJyk7XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwUGFyZW5zIChzKSB7IHJldHVybiAnKCcgKyBzICsgJyknOyB9XG5cbiAgc3dpdGNoIChnai50eXBlKSB7XG4gICAgY2FzZSAnUG9pbnQnOlxuICAgICAgcmV0dXJuICdQT0lOVCAoJyArIHBhaXJXS1QoZ2ouY29vcmRpbmF0ZXMpICsgJyknO1xuICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgICAgcmV0dXJuICdMSU5FU1RSSU5HICgnICsgcmluZ1dLVChnai5jb29yZGluYXRlcykgKyAnKSc7XG4gICAgY2FzZSAnUG9seWdvbic6XG4gICAgICByZXR1cm4gJ1BPTFlHT04gKCcgKyByaW5nc1dLVChnai5jb29yZGluYXRlcykgKyAnKSc7XG4gICAgY2FzZSAnTXVsdGlQb2ludCc6XG4gICAgICByZXR1cm4gJ01VTFRJUE9JTlQgKCcgKyByaW5nV0tUKGdqLmNvb3JkaW5hdGVzKSArICcpJztcbiAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgcmV0dXJuICdNVUxUSVBPTFlHT04gKCcgKyBtdWx0aVJpbmdzV0tUKGdqLmNvb3JkaW5hdGVzKSArICcpJztcbiAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxuICAgICAgcmV0dXJuICdNVUxUSUxJTkVTVFJJTkcgKCcgKyByaW5nc1dLVChnai5jb29yZGluYXRlcykgKyAnKSc7XG4gICAgY2FzZSAnR2VvbWV0cnlDb2xsZWN0aW9uJzpcbiAgICAgIHJldHVybiAnR0VPTUVUUllDT0xMRUNUSU9OICgnICsgZ2ouZ2VvbWV0cmllcy5tYXAoc3RyaW5naWZ5KS5qb2luKCcsICcpICsgJyknO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0cmluZ2lmeSByZXF1aXJlcyBhIHZhbGlkIEdlb0pTT04gRmVhdHVyZSBvciBnZW9tZXRyeSBvYmplY3QgYXMgaW5wdXQnKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==