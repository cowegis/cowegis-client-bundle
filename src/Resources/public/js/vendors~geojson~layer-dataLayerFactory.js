(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~geojson~layer-dataLayerFactory"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hcGJveC90b2dlb2pzb24vdG9nZW9qc29uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvYmJveC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9iaXNlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvZmVhdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9tZXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90b3BvanNvbi1jbGllbnQvc3JjL25laWdoYm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9xdWFudGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9yZXZlcnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90b3BvanNvbi1jbGllbnQvc3JjL3N0aXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvdW50cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlbGxrbm93bi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx3QkFBd0Isa0NBQWtDO0FBQzFELHlCQUF5QiwwQkFBMEI7QUFDbkQsMEJBQTBCLCtCQUErQjtBQUN6RDtBQUNBLHlCQUF5QixtQkFBbUIsK0JBQStCO0FBQzNFO0FBQ0EsdUJBQXVCLG9CQUFvQixnQkFBZ0IsRUFBRSxXQUFXO0FBQ3hFO0FBQ0E7QUFDQSwrQkFBK0IsY0FBYyxPQUFPLHlCQUF5QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLG1CQUFtQixlQUFlO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiw4QkFBOEI7QUFDekQ7QUFDQSx3QkFBd0Isd0RBQXdEO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFVBQVUsS0FBMkI7QUFDMUMsMEJBQTBCLG1CQUFPLENBQUMsZ0JBQVE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixtQkFBbUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGlCQUFpQjtBQUM5RCx1REFBdUQsV0FBVztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLCtCQUErQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0EsK0JBQStCLHNCQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxpREFBaUQ7QUFDbkcsK0NBQStDLDhDQUE4QztBQUM3RixrREFBa0QsaURBQWlEO0FBQ25HLDJCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBLG1DQUFtQyxzQkFBc0I7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsMkNBQTJDLGtCQUFrQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBLCtCQUErQix3QkFBd0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQywrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHFCQUFxQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGtCQUFrQjtBQUN2RCw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxJQUFJLElBQTZCLDZCOzs7Ozs7Ozs7Ozs7QUN6YWpDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixzQkFBc0I7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL3ZlbmRvcnN+Z2VvanNvbn5sYXllci1kYXRhTGF5ZXJGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHRvR2VvSlNPTiA9IChmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgcmVtb3ZlU3BhY2UgPSAvXFxzKi9nLFxuICAgICAgICB0cmltU3BhY2UgPSAvXlxccyp8XFxzKiQvZyxcbiAgICAgICAgc3BsaXRTcGFjZSA9IC9cXHMrLztcbiAgICAvLyBnZW5lcmF0ZSBhIHNob3J0LCBudW1lcmljIGhhc2ggb2YgYSBzdHJpbmdcbiAgICBmdW5jdGlvbiBva2hhc2goeCkge1xuICAgICAgICBpZiAoIXggfHwgIXgubGVuZ3RoKSByZXR1cm4gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGggPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaCA9ICgoaCA8PCA1KSAtIGgpICsgeC5jaGFyQ29kZUF0KGkpIHwgMDtcbiAgICAgICAgfSByZXR1cm4gaDtcbiAgICB9XG4gICAgLy8gYWxsIFkgY2hpbGRyZW4gb2YgWFxuICAgIGZ1bmN0aW9uIGdldCh4LCB5KSB7IHJldHVybiB4LmdldEVsZW1lbnRzQnlUYWdOYW1lKHkpOyB9XG4gICAgZnVuY3Rpb24gYXR0cih4LCB5KSB7IHJldHVybiB4LmdldEF0dHJpYnV0ZSh5KTsgfVxuICAgIGZ1bmN0aW9uIGF0dHJmKHgsIHkpIHsgcmV0dXJuIHBhcnNlRmxvYXQoYXR0cih4LCB5KSk7IH1cbiAgICAvLyBvbmUgWSBjaGlsZCBvZiBYLCBpZiBhbnksIG90aGVyd2lzZSBudWxsXG4gICAgZnVuY3Rpb24gZ2V0MSh4LCB5KSB7IHZhciBuID0gZ2V0KHgsIHkpOyByZXR1cm4gbi5sZW5ndGggPyBuWzBdIDogbnVsbDsgfVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlLm5vcm1hbGl6ZVxuICAgIGZ1bmN0aW9uIG5vcm0oZWwpIHsgaWYgKGVsLm5vcm1hbGl6ZSkgeyBlbC5ub3JtYWxpemUoKTsgfSByZXR1cm4gZWw7IH1cbiAgICAvLyBjYXN0IGFycmF5IHggaW50byBudW1iZXJzXG4gICAgZnVuY3Rpb24gbnVtYXJyYXkoeCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgbyA9IFtdOyBqIDwgeC5sZW5ndGg7IGorKykgeyBvW2pdID0gcGFyc2VGbG9hdCh4W2pdKTsgfVxuICAgICAgICByZXR1cm4gbztcbiAgICB9XG4gICAgLy8gZ2V0IHRoZSBjb250ZW50IG9mIGEgdGV4dCBub2RlLCBpZiBhbnlcbiAgICBmdW5jdGlvbiBub2RlVmFsKHgpIHtcbiAgICAgICAgaWYgKHgpIHsgbm9ybSh4KTsgfVxuICAgICAgICByZXR1cm4gKHggJiYgeC50ZXh0Q29udGVudCkgfHwgJyc7XG4gICAgfVxuICAgIC8vIGdldCB0aGUgY29udGVudHMgb2YgbXVsdGlwbGUgdGV4dCBub2RlcywgaWYgcHJlc2VudFxuICAgIGZ1bmN0aW9uIGdldE11bHRpKHgsIHlzKSB7XG4gICAgICAgIHZhciBvID0ge30sIG4sIGs7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCB5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgbiA9IGdldDEoeCwgeXNba10pO1xuICAgICAgICAgICAgaWYgKG4pIG9beXNba11dID0gbm9kZVZhbChuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbztcbiAgICB9XG4gICAgLy8gYWRkIHByb3BlcnRpZXMgb2YgWSB0byBYLCBvdmVyd3JpdGluZyBpZiBwcmVzZW50IGluIGJvdGhcbiAgICBmdW5jdGlvbiBleHRlbmQoeCwgeSkgeyBmb3IgKHZhciBrIGluIHkpIHhba10gPSB5W2tdOyB9XG4gICAgLy8gZ2V0IG9uZSBjb29yZGluYXRlIGZyb20gYSBjb29yZGluYXRlIGFycmF5LCBpZiBhbnlcbiAgICBmdW5jdGlvbiBjb29yZDEodikgeyByZXR1cm4gbnVtYXJyYXkodi5yZXBsYWNlKHJlbW92ZVNwYWNlLCAnJykuc3BsaXQoJywnKSk7IH1cbiAgICAvLyBnZXQgYWxsIGNvb3JkaW5hdGVzIGZyb20gYSBjb29yZGluYXRlIGFycmF5IGFzIFtbXSxbXV1cbiAgICBmdW5jdGlvbiBjb29yZCh2KSB7XG4gICAgICAgIHZhciBjb29yZHMgPSB2LnJlcGxhY2UodHJpbVNwYWNlLCAnJykuc3BsaXQoc3BsaXRTcGFjZSksXG4gICAgICAgICAgICBvID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvLnB1c2goY29vcmQxKGNvb3Jkc1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb29yZFBhaXIoeCkge1xuICAgICAgICB2YXIgbGwgPSBbYXR0cmYoeCwgJ2xvbicpLCBhdHRyZih4LCAnbGF0JyldLFxuICAgICAgICAgICAgZWxlID0gZ2V0MSh4LCAnZWxlJyksXG4gICAgICAgICAgICAvLyBoYW5kbGUgbmFtZXNwYWNlZCBhdHRyaWJ1dGUgaW4gYnJvd3NlclxuICAgICAgICAgICAgaGVhcnRSYXRlID0gZ2V0MSh4LCAnZ3B4dHB4OmhyJykgfHwgZ2V0MSh4LCAnaHInKSxcbiAgICAgICAgICAgIHRpbWUgPSBnZXQxKHgsICd0aW1lJyksXG4gICAgICAgICAgICBlO1xuICAgICAgICBpZiAoZWxlKSB7XG4gICAgICAgICAgICBlID0gcGFyc2VGbG9hdChub2RlVmFsKGVsZSkpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihlKSkge1xuICAgICAgICAgICAgICAgIGxsLnB1c2goZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBsbCxcbiAgICAgICAgICAgIHRpbWU6IHRpbWUgPyBub2RlVmFsKHRpbWUpIDogbnVsbCxcbiAgICAgICAgICAgIGhlYXJ0UmF0ZTogaGVhcnRSYXRlID8gcGFyc2VGbG9hdChub2RlVmFsKGhlYXJ0UmF0ZSkpIDogbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBmZWF0dXJlIGNvbGxlY3Rpb24gcGFyZW50IG9iamVjdFxuICAgIGZ1bmN0aW9uIGZjKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgIGZlYXR1cmVzOiBbXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBzZXJpYWxpemVyO1xuICAgIGlmICh0eXBlb2YgWE1MU2VyaWFsaXplciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgc2VyaWFsaXplciA9IG5ldyBYTUxTZXJpYWxpemVyKCk7XG4gICAgLy8gb25seSByZXF1aXJlIHhtbGRvbSBpbiBhIG5vZGUgZW52aXJvbm1lbnRcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgIXByb2Nlc3MuYnJvd3Nlcikge1xuICAgICAgICBzZXJpYWxpemVyID0gbmV3IChyZXF1aXJlKCd4bWxkb20nKS5YTUxTZXJpYWxpemVyKSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB4bWwyc3RyKHN0cikge1xuICAgICAgICAvLyBJRTkgd2lsbCBjcmVhdGUgYSBuZXcgWE1MU2VyaWFsaXplciBidXQgaXQnbGwgY3Jhc2ggaW1tZWRpYXRlbHkuXG4gICAgICAgIC8vIFRoaXMgbGluZSBpcyBpZ25vcmVkIGJlY2F1c2Ugd2UgZG9uJ3QgcnVuIGNvdmVyYWdlIHRlc3RzIGluIElFOVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoc3RyLnhtbCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gc3RyLnhtbDtcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcoc3RyKTtcbiAgICB9XG5cbiAgICB2YXIgdCA9IHtcbiAgICAgICAga21sOiBmdW5jdGlvbihkb2MpIHtcblxuICAgICAgICAgICAgdmFyIGdqID0gZmMoKSxcbiAgICAgICAgICAgICAgICAvLyBzdHlsZWluZGV4IGtlZXBzIHRyYWNrIG9mIGhhc2hlZCBzdHlsZXMgaW4gb3JkZXIgdG8gbWF0Y2ggZmVhdHVyZXNcbiAgICAgICAgICAgICAgICBzdHlsZUluZGV4ID0ge30sIHN0eWxlQnlIYXNoID0ge30sXG4gICAgICAgICAgICAgICAgLy8gc3R5bGVtYXBpbmRleCBrZWVwcyB0cmFjayBvZiBzdHlsZSBtYXBzIHRvIGV4cG9zZSBpbiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgc3R5bGVNYXBJbmRleCA9IHt9LFxuICAgICAgICAgICAgICAgIC8vIGF0b21pYyBnZW9zcGF0aWFsIHR5cGVzIHN1cHBvcnRlZCBieSBLTUwgLSBNdWx0aUdlb21ldHJ5IGlzXG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlZCBzZXBhcmF0ZWx5XG4gICAgICAgICAgICAgICAgZ2VvdHlwZXMgPSBbJ1BvbHlnb24nLCAnTGluZVN0cmluZycsICdQb2ludCcsICdUcmFjaycsICdneDpUcmFjayddLFxuICAgICAgICAgICAgICAgIC8vIGFsbCByb290IHBsYWNlbWFya3MgaW4gdGhlIGZpbGVcbiAgICAgICAgICAgICAgICBwbGFjZW1hcmtzID0gZ2V0KGRvYywgJ1BsYWNlbWFyaycpLFxuICAgICAgICAgICAgICAgIHN0eWxlcyA9IGdldChkb2MsICdTdHlsZScpLFxuICAgICAgICAgICAgICAgIHN0eWxlTWFwcyA9IGdldChkb2MsICdTdHlsZU1hcCcpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHN0eWxlcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIHZhciBoYXNoID0gb2toYXNoKHhtbDJzdHIoc3R5bGVzW2tdKSkudG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgICAgIHN0eWxlSW5kZXhbJyMnICsgYXR0cihzdHlsZXNba10sICdpZCcpXSA9IGhhc2g7XG4gICAgICAgICAgICAgICAgc3R5bGVCeUhhc2hbaGFzaF0gPSBzdHlsZXNba107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHN0eWxlTWFwcy5sZW5ndGg7IGwrKykge1xuICAgICAgICAgICAgICAgIHN0eWxlSW5kZXhbJyMnICsgYXR0cihzdHlsZU1hcHNbbF0sICdpZCcpXSA9IG9raGFzaCh4bWwyc3RyKHN0eWxlTWFwc1tsXSkpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgICAgICB2YXIgcGFpcnMgPSBnZXQoc3R5bGVNYXBzW2xdLCAnUGFpcicpO1xuICAgICAgICAgICAgICAgIHZhciBwYWlyc01hcCA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgcGFpcnMubGVuZ3RoOyBtKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcGFpcnNNYXBbbm9kZVZhbChnZXQxKHBhaXJzW21dLCAna2V5JykpXSA9IG5vZGVWYWwoZ2V0MShwYWlyc1ttXSwgJ3N0eWxlVXJsJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHlsZU1hcEluZGV4WycjJyArIGF0dHIoc3R5bGVNYXBzW2xdLCAnaWQnKV0gPSBwYWlyc01hcDtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFjZW1hcmtzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgZ2ouZmVhdHVyZXMgPSBnai5mZWF0dXJlcy5jb25jYXQoZ2V0UGxhY2VtYXJrKHBsYWNlbWFya3Nbal0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGttbENvbG9yKHYpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IsIG9wYWNpdHk7XG4gICAgICAgICAgICAgICAgdiA9IHYgfHwgJyc7XG4gICAgICAgICAgICAgICAgaWYgKHYuc3Vic3RyKDAsIDEpID09PSAnIycpIHsgdiA9IHYuc3Vic3RyKDEpOyB9XG4gICAgICAgICAgICAgICAgaWYgKHYubGVuZ3RoID09PSA2IHx8IHYubGVuZ3RoID09PSAzKSB7IGNvbG9yID0gdjsgfVxuICAgICAgICAgICAgICAgIGlmICh2Lmxlbmd0aCA9PT0gOCkge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5ID0gcGFyc2VJbnQodi5zdWJzdHIoMCwgMiksIDE2KSAvIDI1NTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSAnIycgKyB2LnN1YnN0cig2LCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICB2LnN1YnN0cig0LCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICB2LnN1YnN0cigyLCAyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtjb2xvciwgaXNOYU4ob3BhY2l0eSkgPyB1bmRlZmluZWQgOiBvcGFjaXR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGd4Q29vcmQodikgeyByZXR1cm4gbnVtYXJyYXkodi5zcGxpdCgnICcpKTsgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ3hDb29yZHMocm9vdCkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtcyA9IGdldChyb290LCAnY29vcmQnLCAnZ3gnKSwgY29vcmRzID0gW10sIHRpbWVzID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1zLmxlbmd0aCA9PT0gMCkgZWxlbXMgPSBnZXQocm9vdCwgJ2d4OmNvb3JkJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7IGkrKykgY29vcmRzLnB1c2goZ3hDb29yZChub2RlVmFsKGVsZW1zW2ldKSkpO1xuICAgICAgICAgICAgICAgIHZhciB0aW1lRWxlbXMgPSBnZXQocm9vdCwgJ3doZW4nKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRpbWVFbGVtcy5sZW5ndGg7IGorKykgdGltZXMucHVzaChub2RlVmFsKHRpbWVFbGVtc1tqXSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvb3JkczogY29vcmRzLFxuICAgICAgICAgICAgICAgICAgICB0aW1lczogdGltZXNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0R2VvbWV0cnkocm9vdCkge1xuICAgICAgICAgICAgICAgIHZhciBnZW9tTm9kZSwgZ2VvbU5vZGVzLCBpLCBqLCBrLCBnZW9tcyA9IFtdLCBjb29yZFRpbWVzID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGdldDEocm9vdCwgJ011bHRpR2VvbWV0cnknKSkgeyByZXR1cm4gZ2V0R2VvbWV0cnkoZ2V0MShyb290LCAnTXVsdGlHZW9tZXRyeScpKTsgfVxuICAgICAgICAgICAgICAgIGlmIChnZXQxKHJvb3QsICdNdWx0aVRyYWNrJykpIHsgcmV0dXJuIGdldEdlb21ldHJ5KGdldDEocm9vdCwgJ011bHRpVHJhY2snKSk7IH1cbiAgICAgICAgICAgICAgICBpZiAoZ2V0MShyb290LCAnZ3g6TXVsdGlUcmFjaycpKSB7IHJldHVybiBnZXRHZW9tZXRyeShnZXQxKHJvb3QsICdneDpNdWx0aVRyYWNrJykpOyB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGdlb3R5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlb21Ob2RlcyA9IGdldChyb290LCBnZW90eXBlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnZW9tTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBnZW9tTm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW9tTm9kZSA9IGdlb21Ob2Rlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VvdHlwZXNbaV0gPT09ICdQb2ludCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkMShub2RlVmFsKGdldDEoZ2VvbU5vZGUsICdjb29yZGluYXRlcycpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChnZW90eXBlc1tpXSA9PT0gJ0xpbmVTdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb21zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkKG5vZGVWYWwoZ2V0MShnZW9tTm9kZSwgJ2Nvb3JkaW5hdGVzJykpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdlb3R5cGVzW2ldID09PSAnUG9seWdvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJpbmdzID0gZ2V0KGdlb21Ob2RlLCAnTGluZWFyUmluZycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCByaW5ncy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2goY29vcmQobm9kZVZhbChnZXQxKHJpbmdzW2tdLCAnY29vcmRpbmF0ZXMnKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW9tcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChnZW90eXBlc1tpXSA9PT0gJ1RyYWNrJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW90eXBlc1tpXSA9PT0gJ2d4OlRyYWNrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhY2sgPSBneENvb3JkcyhnZW9tTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb21zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHRyYWNrLmNvb3Jkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNrLnRpbWVzLmxlbmd0aCkgY29vcmRUaW1lcy5wdXNoKHRyYWNrLnRpbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbXM6IGdlb21zLFxuICAgICAgICAgICAgICAgICAgICBjb29yZFRpbWVzOiBjb29yZFRpbWVzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFBsYWNlbWFyayhyb290KSB7XG4gICAgICAgICAgICAgICAgdmFyIGdlb21zQW5kVGltZXMgPSBnZXRHZW9tZXRyeShyb290KSwgaSwgcHJvcGVydGllcyA9IHt9LFxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gbm9kZVZhbChnZXQxKHJvb3QsICduYW1lJykpLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzID0gbm9kZVZhbChnZXQxKHJvb3QsICdhZGRyZXNzJykpLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZVVybCA9IG5vZGVWYWwoZ2V0MShyb290LCAnc3R5bGVVcmwnKSksXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gbm9kZVZhbChnZXQxKHJvb3QsICdkZXNjcmlwdGlvbicpKSxcbiAgICAgICAgICAgICAgICAgICAgdGltZVNwYW4gPSBnZXQxKHJvb3QsICdUaW1lU3BhbicpLFxuICAgICAgICAgICAgICAgICAgICB0aW1lU3RhbXAgPSBnZXQxKHJvb3QsICdUaW1lU3RhbXAnKSxcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kZWREYXRhID0gZ2V0MShyb290LCAnRXh0ZW5kZWREYXRhJyksXG4gICAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZSA9IGdldDEocm9vdCwgJ0xpbmVTdHlsZScpLFxuICAgICAgICAgICAgICAgICAgICBwb2x5U3R5bGUgPSBnZXQxKHJvb3QsICdQb2x5U3R5bGUnKSxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IGdldDEocm9vdCwgJ3Zpc2liaWxpdHknKTtcblxuICAgICAgICAgICAgICAgIGlmICghZ2VvbXNBbmRUaW1lcy5nZW9tcy5sZW5ndGgpIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICBpZiAobmFtZSkgcHJvcGVydGllcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoYWRkcmVzcykgcHJvcGVydGllcy5hZGRyZXNzID0gYWRkcmVzcztcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGVVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlVXJsWzBdICE9PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlVXJsID0gJyMnICsgc3R5bGVVcmw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnN0eWxlVXJsID0gc3R5bGVVcmw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZUluZGV4W3N0eWxlVXJsXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5zdHlsZUhhc2ggPSBzdHlsZUluZGV4W3N0eWxlVXJsXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGVNYXBJbmRleFtzdHlsZVVybF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuc3R5bGVNYXBIYXNoID0gc3R5bGVNYXBJbmRleFtzdHlsZVVybF07XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnN0eWxlSGFzaCA9IHN0eWxlSW5kZXhbc3R5bGVNYXBJbmRleFtzdHlsZVVybF0ubm9ybWFsXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gcG9wdWxhdGUgdGhlIGxpbmVTdHlsZSBvciBwb2x5U3R5bGUgc2luY2Ugd2UgZ290IHRoZSBzdHlsZSBoYXNoXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IHN0eWxlQnlIYXNoW3Byb3BlcnRpZXMuc3R5bGVIYXNoXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxpbmVTdHlsZSkgbGluZVN0eWxlID0gZ2V0MShzdHlsZSwgJ0xpbmVTdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwb2x5U3R5bGUpIHBvbHlTdHlsZSA9IGdldDEoc3R5bGUsICdQb2x5U3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24pIHByb3BlcnRpZXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodGltZVNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJlZ2luID0gbm9kZVZhbChnZXQxKHRpbWVTcGFuLCAnYmVnaW4nKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmQgPSBub2RlVmFsKGdldDEodGltZVNwYW4sICdlbmQnKSk7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMudGltZXNwYW4gPSB7IGJlZ2luOiBiZWdpbiwgZW5kOiBlbmQgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnRpbWVzdGFtcCA9IG5vZGVWYWwoZ2V0MSh0aW1lU3RhbXAsICd3aGVuJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGluZVN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lc3R5bGVzID0ga21sQ29sb3Iobm9kZVZhbChnZXQxKGxpbmVTdHlsZSwgJ2NvbG9yJykpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gbGluZXN0eWxlc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgPSBsaW5lc3R5bGVzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBwYXJzZUZsb2F0KG5vZGVWYWwoZ2V0MShsaW5lU3R5bGUsICd3aWR0aCcpKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvcikgcHJvcGVydGllcy5zdHJva2UgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihvcGFjaXR5KSkgcHJvcGVydGllc1snc3Ryb2tlLW9wYWNpdHknXSA9IG9wYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4od2lkdGgpKSBwcm9wZXJ0aWVzWydzdHJva2Utd2lkdGgnXSA9IHdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocG9seVN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb2x5c3R5bGVzID0ga21sQ29sb3Iobm9kZVZhbChnZXQxKHBvbHlTdHlsZSwgJ2NvbG9yJykpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBjb2xvciA9IHBvbHlzdHlsZXNbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3BhY2l0eSA9IHBvbHlzdHlsZXNbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsID0gbm9kZVZhbChnZXQxKHBvbHlTdHlsZSwgJ2ZpbGwnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRsaW5lID0gbm9kZVZhbChnZXQxKHBvbHlTdHlsZSwgJ291dGxpbmUnKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwY29sb3IpIHByb3BlcnRpZXMuZmlsbCA9IHBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihwb3BhY2l0eSkpIHByb3BlcnRpZXNbJ2ZpbGwtb3BhY2l0eSddID0gcG9wYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxsKSBwcm9wZXJ0aWVzWydmaWxsLW9wYWNpdHknXSA9IGZpbGwgPT09ICcxJyA/IHByb3BlcnRpZXNbJ2ZpbGwtb3BhY2l0eSddIHx8IDEgOiAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3V0bGluZSkgcHJvcGVydGllc1snc3Ryb2tlLW9wYWNpdHknXSA9IG91dGxpbmUgPT09ICcxJyA/IHByb3BlcnRpZXNbJ3N0cm9rZS1vcGFjaXR5J10gfHwgMSA6IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChleHRlbmRlZERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFzID0gZ2V0KGV4dGVuZGVkRGF0YSwgJ0RhdGEnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbXBsZURhdGFzID0gZ2V0KGV4dGVuZGVkRGF0YSwgJ1NpbXBsZURhdGEnKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbZGF0YXNbaV0uZ2V0QXR0cmlidXRlKCduYW1lJyldID0gbm9kZVZhbChnZXQxKGRhdGFzW2ldLCAndmFsdWUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNpbXBsZURhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3NpbXBsZURhdGFzW2ldLmdldEF0dHJpYnV0ZSgnbmFtZScpXSA9IG5vZGVWYWwoc2ltcGxlRGF0YXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMudmlzaWJpbGl0eSA9IG5vZGVWYWwodmlzaWJpbGl0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChnZW9tc0FuZFRpbWVzLmNvb3JkVGltZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuY29vcmRUaW1lcyA9IChnZW9tc0FuZFRpbWVzLmNvb3JkVGltZXMubGVuZ3RoID09PSAxKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9tc0FuZFRpbWVzLmNvb3JkVGltZXNbMF0gOiBnZW9tc0FuZFRpbWVzLmNvb3JkVGltZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBmZWF0dXJlID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5OiAoZ2VvbXNBbmRUaW1lcy5nZW9tcy5sZW5ndGggPT09IDEpID8gZ2VvbXNBbmRUaW1lcy5nZW9tc1swXSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHZW9tZXRyeUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cmllczogZ2VvbXNBbmRUaW1lcy5nZW9tc1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cihyb290LCAnaWQnKSkgZmVhdHVyZS5pZCA9IGF0dHIocm9vdCwgJ2lkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtmZWF0dXJlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnajtcbiAgICAgICAgfSxcbiAgICAgICAgZ3B4OiBmdW5jdGlvbihkb2MpIHtcbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIHRyYWNrcyA9IGdldChkb2MsICd0cmsnKSxcbiAgICAgICAgICAgICAgICByb3V0ZXMgPSBnZXQoZG9jLCAncnRlJyksXG4gICAgICAgICAgICAgICAgd2F5cG9pbnRzID0gZ2V0KGRvYywgJ3dwdCcpLFxuICAgICAgICAgICAgICAgIC8vIGEgZmVhdHVyZSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgZ2ogPSBmYygpLFxuICAgICAgICAgICAgICAgIGZlYXR1cmU7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZSA9IGdldFRyYWNrKHRyYWNrc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGZlYXR1cmUpIGdqLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcm91dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZSA9IGdldFJvdXRlKHJvdXRlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGZlYXR1cmUpIGdqLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgd2F5cG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZ2ouZmVhdHVyZXMucHVzaChnZXRQb2ludCh3YXlwb2ludHNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFBvaW50cyhub2RlLCBwb2ludG5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHRzID0gZ2V0KG5vZGUsIHBvaW50bmFtZSksXG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgdGltZXMgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgaGVhcnRSYXRlcyA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBsID0gcHRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAobCA8IDIpIHJldHVybiB7fTsgIC8vIEludmFsaWQgbGluZSBpbiBHZW9KU09OXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSBjb29yZFBhaXIocHRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5wdXNoKGMuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYy50aW1lKSB0aW1lcy5wdXNoKGMudGltZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjLmhlYXJ0UmF0ZSkgaGVhcnRSYXRlcy5wdXNoKGMuaGVhcnRSYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICAgICAgICAgICAgdGltZXM6IHRpbWVzLFxuICAgICAgICAgICAgICAgICAgICBoZWFydFJhdGVzOiBoZWFydFJhdGVzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFRyYWNrKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBnZXQobm9kZSwgJ3Rya3NlZycpLFxuICAgICAgICAgICAgICAgICAgICB0cmFjayA9IFtdLFxuICAgICAgICAgICAgICAgICAgICB0aW1lcyA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBoZWFydFJhdGVzID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGxpbmU7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gZ2V0UG9pbnRzKHNlZ21lbnRzW2ldLCAndHJrcHQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLmxpbmUpIHRyYWNrLnB1c2gobGluZS5saW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLnRpbWVzICYmIGxpbmUudGltZXMubGVuZ3RoKSB0aW1lcy5wdXNoKGxpbmUudGltZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUuaGVhcnRSYXRlcyAmJiBsaW5lLmhlYXJ0UmF0ZXMubGVuZ3RoKSBoZWFydFJhdGVzLnB1c2gobGluZS5oZWFydFJhdGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHJhY2subGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBnZXRQcm9wZXJ0aWVzKG5vZGUpO1xuICAgICAgICAgICAgICAgIGV4dGVuZChwcm9wZXJ0aWVzLCBnZXRMaW5lU3R5bGUoZ2V0MShub2RlLCAnZXh0ZW5zaW9ucycpKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVzLmxlbmd0aCkgcHJvcGVydGllcy5jb29yZFRpbWVzID0gdHJhY2subGVuZ3RoID09PSAxID8gdGltZXNbMF0gOiB0aW1lcztcbiAgICAgICAgICAgICAgICBpZiAoaGVhcnRSYXRlcy5sZW5ndGgpIHByb3BlcnRpZXMuaGVhcnRSYXRlcyA9IHRyYWNrLmxlbmd0aCA9PT0gMSA/IGhlYXJ0UmF0ZXNbMF0gOiBoZWFydFJhdGVzO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRyYWNrLmxlbmd0aCA9PT0gMSA/ICdMaW5lU3RyaW5nJyA6ICdNdWx0aUxpbmVTdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHRyYWNrLmxlbmd0aCA9PT0gMSA/IHRyYWNrWzBdIDogdHJhY2tcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRSb3V0ZShub2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBnZXRQb2ludHMobm9kZSwgJ3J0ZXB0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCFsaW5lLmxpbmUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGdldFByb3BlcnRpZXMobm9kZSk7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHByb3AsIGdldExpbmVTdHlsZShnZXQxKG5vZGUsICdleHRlbnNpb25zJykpKTtcbiAgICAgICAgICAgICAgICB2YXIgcm91dGVPYmogPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcCxcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdMaW5lU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBsaW5lLmxpbmVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdXRlT2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UG9pbnQobm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gZ2V0UHJvcGVydGllcyhub2RlKTtcbiAgICAgICAgICAgICAgICBleHRlbmQocHJvcCwgZ2V0TXVsdGkobm9kZSwgWydzeW0nXSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcCxcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogY29vcmRQYWlyKG5vZGUpLmNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TGluZVN0eWxlKGV4dGVuc2lvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGluZVN0eWxlID0gZ2V0MShleHRlbnNpb25zLCAnbGluZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGluZVN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBub2RlVmFsKGdldDEobGluZVN0eWxlLCAnY29sb3InKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSA9IHBhcnNlRmxvYXQobm9kZVZhbChnZXQxKGxpbmVTdHlsZSwgJ29wYWNpdHknKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gcGFyc2VGbG9hdChub2RlVmFsKGdldDEobGluZVN0eWxlLCAnd2lkdGgnKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yKSBzdHlsZS5zdHJva2UgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4ob3BhY2l0eSkpIHN0eWxlWydzdHJva2Utb3BhY2l0eSddID0gb3BhY2l0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdQWCB3aWR0aCBpcyBpbiBtbSwgY29udmVydCB0byBweCB3aXRoIDk2IHB4IHBlciBpbmNoXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHdpZHRoKSkgc3R5bGVbJ3N0cm9rZS13aWR0aCddID0gd2lkdGggKiA5NiAvIDI1LjQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UHJvcGVydGllcyhub2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBnZXRNdWx0aShub2RlLCBbJ25hbWUnLCAnY210JywgJ2Rlc2MnLCAndHlwZScsICd0aW1lJywgJ2tleXdvcmRzJ10pLFxuICAgICAgICAgICAgICAgICAgICBsaW5rcyA9IGdldChub2RlLCAnbGluaycpO1xuICAgICAgICAgICAgICAgIGlmIChsaW5rcy5sZW5ndGgpIHByb3AubGlua3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGluazsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmsgPSB7IGhyZWY6IGF0dHIobGlua3NbaV0sICdocmVmJykgfTtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKGxpbmssIGdldE11bHRpKGxpbmtzW2ldLCBbJ3RleHQnLCAndHlwZSddKSk7XG4gICAgICAgICAgICAgICAgICAgIHByb3AubGlua3MucHVzaChsaW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ2o7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0O1xufSkoKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IHRvR2VvSlNPTjsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiaW1wb3J0IHRyYW5zZm9ybSBmcm9tIFwiLi90cmFuc2Zvcm0uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odG9wb2xvZ3kpIHtcbiAgdmFyIHQgPSB0cmFuc2Zvcm0odG9wb2xvZ3kudHJhbnNmb3JtKSwga2V5LFxuICAgICAgeDAgPSBJbmZpbml0eSwgeTAgPSB4MCwgeDEgPSAteDAsIHkxID0gLXgwO1xuXG4gIGZ1bmN0aW9uIGJib3hQb2ludChwKSB7XG4gICAgcCA9IHQocCk7XG4gICAgaWYgKHBbMF0gPCB4MCkgeDAgPSBwWzBdO1xuICAgIGlmIChwWzBdID4geDEpIHgxID0gcFswXTtcbiAgICBpZiAocFsxXSA8IHkwKSB5MCA9IHBbMV07XG4gICAgaWYgKHBbMV0gPiB5MSkgeTEgPSBwWzFdO1xuICB9XG5cbiAgZnVuY3Rpb24gYmJveEdlb21ldHJ5KG8pIHtcbiAgICBzd2l0Y2ggKG8udHlwZSkge1xuICAgICAgY2FzZSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiOiBvLmdlb21ldHJpZXMuZm9yRWFjaChiYm94R2VvbWV0cnkpOyBicmVhaztcbiAgICAgIGNhc2UgXCJQb2ludFwiOiBiYm94UG9pbnQoby5jb29yZGluYXRlcyk7IGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjogby5jb29yZGluYXRlcy5mb3JFYWNoKGJib3hQb2ludCk7IGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHRvcG9sb2d5LmFyY3MuZm9yRWFjaChmdW5jdGlvbihhcmMpIHtcbiAgICB2YXIgaSA9IC0xLCBuID0gYXJjLmxlbmd0aCwgcDtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgcCA9IHQoYXJjW2ldLCBpKTtcbiAgICAgIGlmIChwWzBdIDwgeDApIHgwID0gcFswXTtcbiAgICAgIGlmIChwWzBdID4geDEpIHgxID0gcFswXTtcbiAgICAgIGlmIChwWzFdIDwgeTApIHkwID0gcFsxXTtcbiAgICAgIGlmIChwWzFdID4geTEpIHkxID0gcFsxXTtcbiAgICB9XG4gIH0pO1xuXG4gIGZvciAoa2V5IGluIHRvcG9sb2d5Lm9iamVjdHMpIHtcbiAgICBiYm94R2VvbWV0cnkodG9wb2xvZ3kub2JqZWN0c1trZXldKTtcbiAgfVxuXG4gIHJldHVybiBbeDAsIHkwLCB4MSwgeTFdO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgeCkge1xuICB2YXIgbG8gPSAwLCBoaSA9IGEubGVuZ3RoO1xuICB3aGlsZSAobG8gPCBoaSkge1xuICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgIGlmIChhW21pZF0gPCB4KSBsbyA9IG1pZCArIDE7XG4gICAgZWxzZSBoaSA9IG1pZDtcbiAgfVxuICByZXR1cm4gbG87XG59XG4iLCJpbXBvcnQgcmV2ZXJzZSBmcm9tIFwiLi9yZXZlcnNlLmpzXCI7XG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gXCIuL3RyYW5zZm9ybS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0b3BvbG9neSwgbykge1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIG8gPSB0b3BvbG9neS5vYmplY3RzW29dO1xuICByZXR1cm4gby50eXBlID09PSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiXG4gICAgICA/IHt0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsIGZlYXR1cmVzOiBvLmdlb21ldHJpZXMubWFwKGZ1bmN0aW9uKG8pIHsgcmV0dXJuIGZlYXR1cmUodG9wb2xvZ3ksIG8pOyB9KX1cbiAgICAgIDogZmVhdHVyZSh0b3BvbG9neSwgbyk7XG59XG5cbmZ1bmN0aW9uIGZlYXR1cmUodG9wb2xvZ3ksIG8pIHtcbiAgdmFyIGlkID0gby5pZCxcbiAgICAgIGJib3ggPSBvLmJib3gsXG4gICAgICBwcm9wZXJ0aWVzID0gby5wcm9wZXJ0aWVzID09IG51bGwgPyB7fSA6IG8ucHJvcGVydGllcyxcbiAgICAgIGdlb21ldHJ5ID0gb2JqZWN0KHRvcG9sb2d5LCBvKTtcbiAgcmV0dXJuIGlkID09IG51bGwgJiYgYmJveCA9PSBudWxsID8ge3R5cGU6IFwiRmVhdHVyZVwiLCBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLCBnZW9tZXRyeTogZ2VvbWV0cnl9XG4gICAgICA6IGJib3ggPT0gbnVsbCA/IHt0eXBlOiBcIkZlYXR1cmVcIiwgaWQ6IGlkLCBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLCBnZW9tZXRyeTogZ2VvbWV0cnl9XG4gICAgICA6IHt0eXBlOiBcIkZlYXR1cmVcIiwgaWQ6IGlkLCBiYm94OiBiYm94LCBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLCBnZW9tZXRyeTogZ2VvbWV0cnl9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0KHRvcG9sb2d5LCBvKSB7XG4gIHZhciB0cmFuc2Zvcm1Qb2ludCA9IHRyYW5zZm9ybSh0b3BvbG9neS50cmFuc2Zvcm0pLFxuICAgICAgYXJjcyA9IHRvcG9sb2d5LmFyY3M7XG5cbiAgZnVuY3Rpb24gYXJjKGksIHBvaW50cykge1xuICAgIGlmIChwb2ludHMubGVuZ3RoKSBwb2ludHMucG9wKCk7XG4gICAgZm9yICh2YXIgYSA9IGFyY3NbaSA8IDAgPyB+aSA6IGldLCBrID0gMCwgbiA9IGEubGVuZ3RoOyBrIDwgbjsgKytrKSB7XG4gICAgICBwb2ludHMucHVzaCh0cmFuc2Zvcm1Qb2ludChhW2tdLCBrKSk7XG4gICAgfVxuICAgIGlmIChpIDwgMCkgcmV2ZXJzZShwb2ludHMsIG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnQocCkge1xuICAgIHJldHVybiB0cmFuc2Zvcm1Qb2ludChwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpbmUoYXJjcykge1xuICAgIHZhciBwb2ludHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IGFyY3MubGVuZ3RoOyBpIDwgbjsgKytpKSBhcmMoYXJjc1tpXSwgcG9pbnRzKTtcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA8IDIpIHBvaW50cy5wdXNoKHBvaW50c1swXSk7IC8vIFRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbiBwZXIgdGhlIHNwZWNpZmljYXRpb24uXG4gICAgcmV0dXJuIHBvaW50cztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJpbmcoYXJjcykge1xuICAgIHZhciBwb2ludHMgPSBsaW5lKGFyY3MpO1xuICAgIHdoaWxlIChwb2ludHMubGVuZ3RoIDwgNCkgcG9pbnRzLnB1c2gocG9pbnRzWzBdKTsgLy8gVGhpcyBtYXkgaGFwcGVuIGlmIGFuIGFyYyBoYXMgb25seSB0d28gcG9pbnRzLlxuICAgIHJldHVybiBwb2ludHM7XG4gIH1cblxuICBmdW5jdGlvbiBwb2x5Z29uKGFyY3MpIHtcbiAgICByZXR1cm4gYXJjcy5tYXAocmluZyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW9tZXRyeShvKSB7XG4gICAgdmFyIHR5cGUgPSBvLnR5cGUsIGNvb3JkaW5hdGVzO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiOiByZXR1cm4ge3R5cGU6IHR5cGUsIGdlb21ldHJpZXM6IG8uZ2VvbWV0cmllcy5tYXAoZ2VvbWV0cnkpfTtcbiAgICAgIGNhc2UgXCJQb2ludFwiOiBjb29yZGluYXRlcyA9IHBvaW50KG8uY29vcmRpbmF0ZXMpOyBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6IGNvb3JkaW5hdGVzID0gby5jb29yZGluYXRlcy5tYXAocG9pbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6IGNvb3JkaW5hdGVzID0gbGluZShvLmFyY3MpOyBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjogY29vcmRpbmF0ZXMgPSBvLmFyY3MubWFwKGxpbmUpOyBicmVhaztcbiAgICAgIGNhc2UgXCJQb2x5Z29uXCI6IGNvb3JkaW5hdGVzID0gcG9seWdvbihvLmFyY3MpOyBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjogY29vcmRpbmF0ZXMgPSBvLmFyY3MubWFwKHBvbHlnb24pOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge3R5cGU6IHR5cGUsIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlc307XG4gIH1cblxuICByZXR1cm4gZ2VvbWV0cnkobyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB4O1xufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIGJib3h9IGZyb20gXCIuL2Jib3guanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBmZWF0dXJlfSBmcm9tIFwiLi9mZWF0dXJlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgbWVzaCwgbWVzaEFyY3N9IGZyb20gXCIuL21lc2guanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBtZXJnZSwgbWVyZ2VBcmNzfSBmcm9tIFwiLi9tZXJnZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG5laWdoYm9yc30gZnJvbSBcIi4vbmVpZ2hib3JzLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcXVhbnRpemV9IGZyb20gXCIuL3F1YW50aXplLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdHJhbnNmb3JtfSBmcm9tIFwiLi90cmFuc2Zvcm0uanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB1bnRyYW5zZm9ybX0gZnJvbSBcIi4vdW50cmFuc2Zvcm0uanNcIjtcbiIsImltcG9ydCB7b2JqZWN0fSBmcm9tIFwiLi9mZWF0dXJlLmpzXCI7XG5pbXBvcnQgc3RpdGNoIGZyb20gXCIuL3N0aXRjaC5qc1wiO1xuXG5mdW5jdGlvbiBwbGFuYXJSaW5nQXJlYShyaW5nKSB7XG4gIHZhciBpID0gLTEsIG4gPSByaW5nLmxlbmd0aCwgYSwgYiA9IHJpbmdbbiAtIDFdLCBhcmVhID0gMDtcbiAgd2hpbGUgKCsraSA8IG4pIGEgPSBiLCBiID0gcmluZ1tpXSwgYXJlYSArPSBhWzBdICogYlsxXSAtIGFbMV0gKiBiWzBdO1xuICByZXR1cm4gTWF0aC5hYnMoYXJlYSk7IC8vIE5vdGU6IGRvdWJsZWQgYXJlYSFcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odG9wb2xvZ3kpIHtcbiAgcmV0dXJuIG9iamVjdCh0b3BvbG9neSwgbWVyZ2VBcmNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBcmNzKHRvcG9sb2d5LCBvYmplY3RzKSB7XG4gIHZhciBwb2x5Z29uc0J5QXJjID0ge30sXG4gICAgICBwb2x5Z29ucyA9IFtdLFxuICAgICAgZ3JvdXBzID0gW107XG5cbiAgb2JqZWN0cy5mb3JFYWNoKGdlb21ldHJ5KTtcblxuICBmdW5jdGlvbiBnZW9tZXRyeShvKSB7XG4gICAgc3dpdGNoIChvLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjogby5nZW9tZXRyaWVzLmZvckVhY2goZ2VvbWV0cnkpOyBicmVhaztcbiAgICAgIGNhc2UgXCJQb2x5Z29uXCI6IGV4dHJhY3Qoby5hcmNzKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6IG8uYXJjcy5mb3JFYWNoKGV4dHJhY3QpOyBicmVhaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0KHBvbHlnb24pIHtcbiAgICBwb2x5Z29uLmZvckVhY2goZnVuY3Rpb24ocmluZykge1xuICAgICAgcmluZy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykge1xuICAgICAgICAocG9seWdvbnNCeUFyY1thcmMgPSBhcmMgPCAwID8gfmFyYyA6IGFyY10gfHwgKHBvbHlnb25zQnlBcmNbYXJjXSA9IFtdKSkucHVzaChwb2x5Z29uKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHBvbHlnb25zLnB1c2gocG9seWdvbik7XG4gIH1cblxuICBmdW5jdGlvbiBhcmVhKHJpbmcpIHtcbiAgICByZXR1cm4gcGxhbmFyUmluZ0FyZWEob2JqZWN0KHRvcG9sb2d5LCB7dHlwZTogXCJQb2x5Z29uXCIsIGFyY3M6IFtyaW5nXX0pLmNvb3JkaW5hdGVzWzBdKTtcbiAgfVxuXG4gIHBvbHlnb25zLmZvckVhY2goZnVuY3Rpb24ocG9seWdvbikge1xuICAgIGlmICghcG9seWdvbi5fKSB7XG4gICAgICB2YXIgZ3JvdXAgPSBbXSxcbiAgICAgICAgICBuZWlnaGJvcnMgPSBbcG9seWdvbl07XG4gICAgICBwb2x5Z29uLl8gPSAxO1xuICAgICAgZ3JvdXBzLnB1c2goZ3JvdXApO1xuICAgICAgd2hpbGUgKHBvbHlnb24gPSBuZWlnaGJvcnMucG9wKCkpIHtcbiAgICAgICAgZ3JvdXAucHVzaChwb2x5Z29uKTtcbiAgICAgICAgcG9seWdvbi5mb3JFYWNoKGZ1bmN0aW9uKHJpbmcpIHtcbiAgICAgICAgICByaW5nLmZvckVhY2goZnVuY3Rpb24oYXJjKSB7XG4gICAgICAgICAgICBwb2x5Z29uc0J5QXJjW2FyYyA8IDAgPyB+YXJjIDogYXJjXS5mb3JFYWNoKGZ1bmN0aW9uKHBvbHlnb24pIHtcbiAgICAgICAgICAgICAgaWYgKCFwb2x5Z29uLl8pIHtcbiAgICAgICAgICAgICAgICBwb2x5Z29uLl8gPSAxO1xuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKHBvbHlnb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBwb2x5Z29ucy5mb3JFYWNoKGZ1bmN0aW9uKHBvbHlnb24pIHtcbiAgICBkZWxldGUgcG9seWdvbi5fO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiTXVsdGlQb2x5Z29uXCIsXG4gICAgYXJjczogZ3JvdXBzLm1hcChmdW5jdGlvbihwb2x5Z29ucykge1xuICAgICAgdmFyIGFyY3MgPSBbXSwgbjtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgZXh0ZXJpb3IgKHVuaXF1ZSkgYXJjcy5cbiAgICAgIHBvbHlnb25zLmZvckVhY2goZnVuY3Rpb24ocG9seWdvbikge1xuICAgICAgICBwb2x5Z29uLmZvckVhY2goZnVuY3Rpb24ocmluZykge1xuICAgICAgICAgIHJpbmcuZm9yRWFjaChmdW5jdGlvbihhcmMpIHtcbiAgICAgICAgICAgIGlmIChwb2x5Z29uc0J5QXJjW2FyYyA8IDAgPyB+YXJjIDogYXJjXS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgIGFyY3MucHVzaChhcmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTdGl0Y2ggdGhlIGFyY3MgaW50byBvbmUgb3IgbW9yZSByaW5ncy5cbiAgICAgIGFyY3MgPSBzdGl0Y2godG9wb2xvZ3ksIGFyY3MpO1xuXG4gICAgICAvLyBJZiBtb3JlIHRoYW4gb25lIHJpbmcgaXMgcmV0dXJuZWQsXG4gICAgICAvLyBhdCBtb3N0IG9uZSBvZiB0aGVzZSByaW5ncyBjYW4gYmUgdGhlIGV4dGVyaW9yO1xuICAgICAgLy8gY2hvb3NlIHRoZSBvbmUgd2l0aCB0aGUgZ3JlYXRlc3QgYWJzb2x1dGUgYXJlYS5cbiAgICAgIGlmICgobiA9IGFyY3MubGVuZ3RoKSA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDEsIGsgPSBhcmVhKGFyY3NbMF0pLCBraSwgdDsgaSA8IG47ICsraSkge1xuICAgICAgICAgIGlmICgoa2kgPSBhcmVhKGFyY3NbaV0pKSA+IGspIHtcbiAgICAgICAgICAgIHQgPSBhcmNzWzBdLCBhcmNzWzBdID0gYXJjc1tpXSwgYXJjc1tpXSA9IHQsIGsgPSBraTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFyY3M7XG4gICAgfSkuZmlsdGVyKGZ1bmN0aW9uKGFyY3MpIHtcbiAgICAgIHJldHVybiBhcmNzLmxlbmd0aCA+IDA7XG4gICAgfSlcbiAgfTtcbn1cbiIsImltcG9ydCB7b2JqZWN0fSBmcm9tIFwiLi9mZWF0dXJlLmpzXCI7XG5pbXBvcnQgc3RpdGNoIGZyb20gXCIuL3N0aXRjaC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0b3BvbG9neSkge1xuICByZXR1cm4gb2JqZWN0KHRvcG9sb2d5LCBtZXNoQXJjcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lc2hBcmNzKHRvcG9sb2d5LCBvYmplY3QsIGZpbHRlcikge1xuICB2YXIgYXJjcywgaSwgbjtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSBhcmNzID0gZXh0cmFjdEFyY3ModG9wb2xvZ3ksIG9iamVjdCwgZmlsdGVyKTtcbiAgZWxzZSBmb3IgKGkgPSAwLCBhcmNzID0gbmV3IEFycmF5KG4gPSB0b3BvbG9neS5hcmNzLmxlbmd0aCk7IGkgPCBuOyArK2kpIGFyY3NbaV0gPSBpO1xuICByZXR1cm4ge3R5cGU6IFwiTXVsdGlMaW5lU3RyaW5nXCIsIGFyY3M6IHN0aXRjaCh0b3BvbG9neSwgYXJjcyl9O1xufVxuXG5mdW5jdGlvbiBleHRyYWN0QXJjcyh0b3BvbG9neSwgb2JqZWN0LCBmaWx0ZXIpIHtcbiAgdmFyIGFyY3MgPSBbXSxcbiAgICAgIGdlb21zQnlBcmMgPSBbXSxcbiAgICAgIGdlb207XG5cbiAgZnVuY3Rpb24gZXh0cmFjdDAoaSkge1xuICAgIHZhciBqID0gaSA8IDAgPyB+aSA6IGk7XG4gICAgKGdlb21zQnlBcmNbal0gfHwgKGdlb21zQnlBcmNbal0gPSBbXSkpLnB1c2goe2k6IGksIGc6IGdlb219KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dHJhY3QxKGFyY3MpIHtcbiAgICBhcmNzLmZvckVhY2goZXh0cmFjdDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0cmFjdDIoYXJjcykge1xuICAgIGFyY3MuZm9yRWFjaChleHRyYWN0MSk7XG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0MyhhcmNzKSB7XG4gICAgYXJjcy5mb3JFYWNoKGV4dHJhY3QyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlb21ldHJ5KG8pIHtcbiAgICBzd2l0Y2ggKGdlb20gPSBvLCBvLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjogby5nZW9tZXRyaWVzLmZvckVhY2goZ2VvbWV0cnkpOyBicmVhaztcbiAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6IGV4dHJhY3QxKG8uYXJjcyk7IGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOiBjYXNlIFwiUG9seWdvblwiOiBleHRyYWN0MihvLmFyY3MpOyBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjogZXh0cmFjdDMoby5hcmNzKTsgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ2VvbWV0cnkob2JqZWN0KTtcblxuICBnZW9tc0J5QXJjLmZvckVhY2goZmlsdGVyID09IG51bGxcbiAgICAgID8gZnVuY3Rpb24oZ2VvbXMpIHsgYXJjcy5wdXNoKGdlb21zWzBdLmkpOyB9XG4gICAgICA6IGZ1bmN0aW9uKGdlb21zKSB7IGlmIChmaWx0ZXIoZ2VvbXNbMF0uZywgZ2VvbXNbZ2VvbXMubGVuZ3RoIC0gMV0uZykpIGFyY3MucHVzaChnZW9tc1swXS5pKTsgfSk7XG5cbiAgcmV0dXJuIGFyY3M7XG59XG4iLCJpbXBvcnQgYmlzZWN0IGZyb20gXCIuL2Jpc2VjdC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmplY3RzKSB7XG4gIHZhciBpbmRleGVzQnlBcmMgPSB7fSwgLy8gYXJjIGluZGV4IC0+IGFycmF5IG9mIG9iamVjdCBpbmRleGVzXG4gICAgICBuZWlnaGJvcnMgPSBvYmplY3RzLm1hcChmdW5jdGlvbigpIHsgcmV0dXJuIFtdOyB9KTtcblxuICBmdW5jdGlvbiBsaW5lKGFyY3MsIGkpIHtcbiAgICBhcmNzLmZvckVhY2goZnVuY3Rpb24oYSkge1xuICAgICAgaWYgKGEgPCAwKSBhID0gfmE7XG4gICAgICB2YXIgbyA9IGluZGV4ZXNCeUFyY1thXTtcbiAgICAgIGlmIChvKSBvLnB1c2goaSk7XG4gICAgICBlbHNlIGluZGV4ZXNCeUFyY1thXSA9IFtpXTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvbHlnb24oYXJjcywgaSkge1xuICAgIGFyY3MuZm9yRWFjaChmdW5jdGlvbihhcmMpIHsgbGluZShhcmMsIGkpOyB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlb21ldHJ5KG8sIGkpIHtcbiAgICBpZiAoby50eXBlID09PSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiKSBvLmdlb21ldHJpZXMuZm9yRWFjaChmdW5jdGlvbihvKSB7IGdlb21ldHJ5KG8sIGkpOyB9KTtcbiAgICBlbHNlIGlmIChvLnR5cGUgaW4gZ2VvbWV0cnlUeXBlKSBnZW9tZXRyeVR5cGVbby50eXBlXShvLmFyY3MsIGkpO1xuICB9XG5cbiAgdmFyIGdlb21ldHJ5VHlwZSA9IHtcbiAgICBMaW5lU3RyaW5nOiBsaW5lLFxuICAgIE11bHRpTGluZVN0cmluZzogcG9seWdvbixcbiAgICBQb2x5Z29uOiBwb2x5Z29uLFxuICAgIE11bHRpUG9seWdvbjogZnVuY3Rpb24oYXJjcywgaSkgeyBhcmNzLmZvckVhY2goZnVuY3Rpb24oYXJjKSB7IHBvbHlnb24oYXJjLCBpKTsgfSk7IH1cbiAgfTtcblxuICBvYmplY3RzLmZvckVhY2goZ2VvbWV0cnkpO1xuXG4gIGZvciAodmFyIGkgaW4gaW5kZXhlc0J5QXJjKSB7XG4gICAgZm9yICh2YXIgaW5kZXhlcyA9IGluZGV4ZXNCeUFyY1tpXSwgbSA9IGluZGV4ZXMubGVuZ3RoLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgICAgZm9yICh2YXIgayA9IGogKyAxOyBrIDwgbTsgKytrKSB7XG4gICAgICAgIHZhciBpaiA9IGluZGV4ZXNbal0sIGlrID0gaW5kZXhlc1trXSwgbjtcbiAgICAgICAgaWYgKChuID0gbmVpZ2hib3JzW2lqXSlbaSA9IGJpc2VjdChuLCBpayldICE9PSBpaykgbi5zcGxpY2UoaSwgMCwgaWspO1xuICAgICAgICBpZiAoKG4gPSBuZWlnaGJvcnNbaWtdKVtpID0gYmlzZWN0KG4sIGlqKV0gIT09IGlqKSBuLnNwbGljZShpLCAwLCBpaik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5laWdoYm9ycztcbn1cbiIsImltcG9ydCBiYm94IGZyb20gXCIuL2Jib3guanNcIjtcbmltcG9ydCB1bnRyYW5zZm9ybSBmcm9tIFwiLi91bnRyYW5zZm9ybS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0b3BvbG9neSwgdHJhbnNmb3JtKSB7XG4gIGlmICh0b3BvbG9neS50cmFuc2Zvcm0pIHRocm93IG5ldyBFcnJvcihcImFscmVhZHkgcXVhbnRpemVkXCIpO1xuXG4gIGlmICghdHJhbnNmb3JtIHx8ICF0cmFuc2Zvcm0uc2NhbGUpIHtcbiAgICBpZiAoISgobiA9IE1hdGguZmxvb3IodHJhbnNmb3JtKSkgPj0gMikpIHRocm93IG5ldyBFcnJvcihcIm4gbXVzdCBiZSDiiaUyXCIpO1xuICAgIGJveCA9IHRvcG9sb2d5LmJib3ggfHwgYmJveCh0b3BvbG9neSk7XG4gICAgdmFyIHgwID0gYm94WzBdLCB5MCA9IGJveFsxXSwgeDEgPSBib3hbMl0sIHkxID0gYm94WzNdLCBuO1xuICAgIHRyYW5zZm9ybSA9IHtzY2FsZTogW3gxIC0geDAgPyAoeDEgLSB4MCkgLyAobiAtIDEpIDogMSwgeTEgLSB5MCA/ICh5MSAtIHkwKSAvIChuIC0gMSkgOiAxXSwgdHJhbnNsYXRlOiBbeDAsIHkwXX07XG4gIH0gZWxzZSB7XG4gICAgYm94ID0gdG9wb2xvZ3kuYmJveDtcbiAgfVxuXG4gIHZhciB0ID0gdW50cmFuc2Zvcm0odHJhbnNmb3JtKSwgYm94LCBrZXksIGlucHV0cyA9IHRvcG9sb2d5Lm9iamVjdHMsIG91dHB1dHMgPSB7fTtcblxuICBmdW5jdGlvbiBxdWFudGl6ZVBvaW50KHBvaW50KSB7XG4gICAgcmV0dXJuIHQocG9pbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcXVhbnRpemVHZW9tZXRyeShpbnB1dCkge1xuICAgIHZhciBvdXRwdXQ7XG4gICAgc3dpdGNoIChpbnB1dC50eXBlKSB7XG4gICAgICBjYXNlIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI6IG91dHB1dCA9IHt0eXBlOiBcIkdlb21ldHJ5Q29sbGVjdGlvblwiLCBnZW9tZXRyaWVzOiBpbnB1dC5nZW9tZXRyaWVzLm1hcChxdWFudGl6ZUdlb21ldHJ5KX07IGJyZWFrO1xuICAgICAgY2FzZSBcIlBvaW50XCI6IG91dHB1dCA9IHt0eXBlOiBcIlBvaW50XCIsIGNvb3JkaW5hdGVzOiBxdWFudGl6ZVBvaW50KGlucHV0LmNvb3JkaW5hdGVzKX07IGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjogb3V0cHV0ID0ge3R5cGU6IFwiTXVsdGlQb2ludFwiLCBjb29yZGluYXRlczogaW5wdXQuY29vcmRpbmF0ZXMubWFwKHF1YW50aXplUG9pbnQpfTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGlmIChpbnB1dC5pZCAhPSBudWxsKSBvdXRwdXQuaWQgPSBpbnB1dC5pZDtcbiAgICBpZiAoaW5wdXQuYmJveCAhPSBudWxsKSBvdXRwdXQuYmJveCA9IGlucHV0LmJib3g7XG4gICAgaWYgKGlucHV0LnByb3BlcnRpZXMgIT0gbnVsbCkgb3V0cHV0LnByb3BlcnRpZXMgPSBpbnB1dC5wcm9wZXJ0aWVzO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBxdWFudGl6ZUFyYyhpbnB1dCkge1xuICAgIHZhciBpID0gMCwgaiA9IDEsIG4gPSBpbnB1dC5sZW5ndGgsIHAsIG91dHB1dCA9IG5ldyBBcnJheShuKTsgLy8gcGVzc2ltaXN0aWNcbiAgICBvdXRwdXRbMF0gPSB0KGlucHV0WzBdLCAwKTtcbiAgICB3aGlsZSAoKytpIDwgbikgaWYgKChwID0gdChpbnB1dFtpXSwgaSkpWzBdIHx8IHBbMV0pIG91dHB1dFtqKytdID0gcDsgLy8gbm9uLWNvaW5jaWRlbnQgcG9pbnRzXG4gICAgaWYgKGogPT09IDEpIG91dHB1dFtqKytdID0gWzAsIDBdOyAvLyBhbiBhcmMgbXVzdCBoYXZlIGF0IGxlYXN0IHR3byBwb2ludHNcbiAgICBvdXRwdXQubGVuZ3RoID0gajtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgZm9yIChrZXkgaW4gaW5wdXRzKSBvdXRwdXRzW2tleV0gPSBxdWFudGl6ZUdlb21ldHJ5KGlucHV0c1trZXldKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiVG9wb2xvZ3lcIixcbiAgICBiYm94OiBib3gsXG4gICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgb2JqZWN0czogb3V0cHV0cyxcbiAgICBhcmNzOiB0b3BvbG9neS5hcmNzLm1hcChxdWFudGl6ZUFyYylcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFycmF5LCBuKSB7XG4gIHZhciB0LCBqID0gYXJyYXkubGVuZ3RoLCBpID0gaiAtIG47XG4gIHdoaWxlIChpIDwgLS1qKSB0ID0gYXJyYXlbaV0sIGFycmF5W2krK10gPSBhcnJheVtqXSwgYXJyYXlbal0gPSB0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odG9wb2xvZ3ksIGFyY3MpIHtcbiAgdmFyIHN0aXRjaGVkQXJjcyA9IHt9LFxuICAgICAgZnJhZ21lbnRCeVN0YXJ0ID0ge30sXG4gICAgICBmcmFnbWVudEJ5RW5kID0ge30sXG4gICAgICBmcmFnbWVudHMgPSBbXSxcbiAgICAgIGVtcHR5SW5kZXggPSAtMTtcblxuICAvLyBTdGl0Y2ggZW1wdHkgYXJjcyBmaXJzdCwgc2luY2UgdGhleSBtYXkgYmUgc3Vic3VtZWQgYnkgb3RoZXIgYXJjcy5cbiAgYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGksIGopIHtcbiAgICB2YXIgYXJjID0gdG9wb2xvZ3kuYXJjc1tpIDwgMCA/IH5pIDogaV0sIHQ7XG4gICAgaWYgKGFyYy5sZW5ndGggPCAzICYmICFhcmNbMV1bMF0gJiYgIWFyY1sxXVsxXSkge1xuICAgICAgdCA9IGFyY3NbKytlbXB0eUluZGV4XSwgYXJjc1tlbXB0eUluZGV4XSA9IGksIGFyY3Nbal0gPSB0O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICB2YXIgZSA9IGVuZHMoaSksXG4gICAgICAgIHN0YXJ0ID0gZVswXSxcbiAgICAgICAgZW5kID0gZVsxXSxcbiAgICAgICAgZiwgZztcblxuICAgIGlmIChmID0gZnJhZ21lbnRCeUVuZFtzdGFydF0pIHtcbiAgICAgIGRlbGV0ZSBmcmFnbWVudEJ5RW5kW2YuZW5kXTtcbiAgICAgIGYucHVzaChpKTtcbiAgICAgIGYuZW5kID0gZW5kO1xuICAgICAgaWYgKGcgPSBmcmFnbWVudEJ5U3RhcnRbZW5kXSkge1xuICAgICAgICBkZWxldGUgZnJhZ21lbnRCeVN0YXJ0W2cuc3RhcnRdO1xuICAgICAgICB2YXIgZmcgPSBnID09PSBmID8gZiA6IGYuY29uY2F0KGcpO1xuICAgICAgICBmcmFnbWVudEJ5U3RhcnRbZmcuc3RhcnQgPSBmLnN0YXJ0XSA9IGZyYWdtZW50QnlFbmRbZmcuZW5kID0gZy5lbmRdID0gZmc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcmFnbWVudEJ5U3RhcnRbZi5zdGFydF0gPSBmcmFnbWVudEJ5RW5kW2YuZW5kXSA9IGY7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChmID0gZnJhZ21lbnRCeVN0YXJ0W2VuZF0pIHtcbiAgICAgIGRlbGV0ZSBmcmFnbWVudEJ5U3RhcnRbZi5zdGFydF07XG4gICAgICBmLnVuc2hpZnQoaSk7XG4gICAgICBmLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICBpZiAoZyA9IGZyYWdtZW50QnlFbmRbc3RhcnRdKSB7XG4gICAgICAgIGRlbGV0ZSBmcmFnbWVudEJ5RW5kW2cuZW5kXTtcbiAgICAgICAgdmFyIGdmID0gZyA9PT0gZiA/IGYgOiBnLmNvbmNhdChmKTtcbiAgICAgICAgZnJhZ21lbnRCeVN0YXJ0W2dmLnN0YXJ0ID0gZy5zdGFydF0gPSBmcmFnbWVudEJ5RW5kW2dmLmVuZCA9IGYuZW5kXSA9IGdmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnJhZ21lbnRCeVN0YXJ0W2Yuc3RhcnRdID0gZnJhZ21lbnRCeUVuZFtmLmVuZF0gPSBmO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmID0gW2ldO1xuICAgICAgZnJhZ21lbnRCeVN0YXJ0W2Yuc3RhcnQgPSBzdGFydF0gPSBmcmFnbWVudEJ5RW5kW2YuZW5kID0gZW5kXSA9IGY7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBlbmRzKGkpIHtcbiAgICB2YXIgYXJjID0gdG9wb2xvZ3kuYXJjc1tpIDwgMCA/IH5pIDogaV0sIHAwID0gYXJjWzBdLCBwMTtcbiAgICBpZiAodG9wb2xvZ3kudHJhbnNmb3JtKSBwMSA9IFswLCAwXSwgYXJjLmZvckVhY2goZnVuY3Rpb24oZHApIHsgcDFbMF0gKz0gZHBbMF0sIHAxWzFdICs9IGRwWzFdOyB9KTtcbiAgICBlbHNlIHAxID0gYXJjW2FyYy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gaSA8IDAgPyBbcDEsIHAwXSA6IFtwMCwgcDFdO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goZnJhZ21lbnRCeUVuZCwgZnJhZ21lbnRCeVN0YXJ0KSB7XG4gICAgZm9yICh2YXIgayBpbiBmcmFnbWVudEJ5RW5kKSB7XG4gICAgICB2YXIgZiA9IGZyYWdtZW50QnlFbmRba107XG4gICAgICBkZWxldGUgZnJhZ21lbnRCeVN0YXJ0W2Yuc3RhcnRdO1xuICAgICAgZGVsZXRlIGYuc3RhcnQ7XG4gICAgICBkZWxldGUgZi5lbmQ7XG4gICAgICBmLmZvckVhY2goZnVuY3Rpb24oaSkgeyBzdGl0Y2hlZEFyY3NbaSA8IDAgPyB+aSA6IGldID0gMTsgfSk7XG4gICAgICBmcmFnbWVudHMucHVzaChmKTtcbiAgICB9XG4gIH1cblxuICBmbHVzaChmcmFnbWVudEJ5RW5kLCBmcmFnbWVudEJ5U3RhcnQpO1xuICBmbHVzaChmcmFnbWVudEJ5U3RhcnQsIGZyYWdtZW50QnlFbmQpO1xuICBhcmNzLmZvckVhY2goZnVuY3Rpb24oaSkgeyBpZiAoIXN0aXRjaGVkQXJjc1tpIDwgMCA/IH5pIDogaV0pIGZyYWdtZW50cy5wdXNoKFtpXSk7IH0pO1xuXG4gIHJldHVybiBmcmFnbWVudHM7XG59XG4iLCJpbXBvcnQgaWRlbnRpdHkgZnJvbSBcIi4vaWRlbnRpdHkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHJhbnNmb3JtKSB7XG4gIGlmICh0cmFuc2Zvcm0gPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICB2YXIgeDAsXG4gICAgICB5MCxcbiAgICAgIGt4ID0gdHJhbnNmb3JtLnNjYWxlWzBdLFxuICAgICAga3kgPSB0cmFuc2Zvcm0uc2NhbGVbMV0sXG4gICAgICBkeCA9IHRyYW5zZm9ybS50cmFuc2xhdGVbMF0sXG4gICAgICBkeSA9IHRyYW5zZm9ybS50cmFuc2xhdGVbMV07XG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCwgaSkge1xuICAgIGlmICghaSkgeDAgPSB5MCA9IDA7XG4gICAgdmFyIGogPSAyLCBuID0gaW5wdXQubGVuZ3RoLCBvdXRwdXQgPSBuZXcgQXJyYXkobik7XG4gICAgb3V0cHV0WzBdID0gKHgwICs9IGlucHV0WzBdKSAqIGt4ICsgZHg7XG4gICAgb3V0cHV0WzFdID0gKHkwICs9IGlucHV0WzFdKSAqIGt5ICsgZHk7XG4gICAgd2hpbGUgKGogPCBuKSBvdXRwdXRbal0gPSBpbnB1dFtqXSwgKytqO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG59XG4iLCJpbXBvcnQgaWRlbnRpdHkgZnJvbSBcIi4vaWRlbnRpdHkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHJhbnNmb3JtKSB7XG4gIGlmICh0cmFuc2Zvcm0gPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICB2YXIgeDAsXG4gICAgICB5MCxcbiAgICAgIGt4ID0gdHJhbnNmb3JtLnNjYWxlWzBdLFxuICAgICAga3kgPSB0cmFuc2Zvcm0uc2NhbGVbMV0sXG4gICAgICBkeCA9IHRyYW5zZm9ybS50cmFuc2xhdGVbMF0sXG4gICAgICBkeSA9IHRyYW5zZm9ybS50cmFuc2xhdGVbMV07XG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCwgaSkge1xuICAgIGlmICghaSkgeDAgPSB5MCA9IDA7XG4gICAgdmFyIGogPSAyLFxuICAgICAgICBuID0gaW5wdXQubGVuZ3RoLFxuICAgICAgICBvdXRwdXQgPSBuZXcgQXJyYXkobiksXG4gICAgICAgIHgxID0gTWF0aC5yb3VuZCgoaW5wdXRbMF0gLSBkeCkgLyBreCksXG4gICAgICAgIHkxID0gTWF0aC5yb3VuZCgoaW5wdXRbMV0gLSBkeSkgLyBreSk7XG4gICAgb3V0cHV0WzBdID0geDEgLSB4MCwgeDAgPSB4MTtcbiAgICBvdXRwdXRbMV0gPSB5MSAtIHkwLCB5MCA9IHkxO1xuICAgIHdoaWxlIChqIDwgbikgb3V0cHV0W2pdID0gaW5wdXRbal0sICsrajtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xufVxuIiwiLyplc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcbm1vZHVsZS5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5tb2R1bGUuZXhwb3J0cy5zdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG5cbnZhciBudW1iZXJSZWdleHAgPSAvWy0rXT8oWzAtOV0qXFwuWzAtOV0rfFswLTldKykoW2VFXVstK10/WzAtOV0rKT8vO1xuLy8gTWF0Y2hlcyBzZXF1ZW5jZXMgbGlrZSAnMTAwIDEwMCcgb3IgJzEwMCAxMDAgMTAwJy5cbnZhciB0dXBsZXMgPSBuZXcgUmVnRXhwKCdeJyArIG51bWJlclJlZ2V4cC5zb3VyY2UgKyAnKFxcXFxzJyArIG51bWJlclJlZ2V4cC5zb3VyY2UgKyAnKXsxLH0nKTtcblxuLypcbiAqIFBhcnNlIFdLVCBhbmQgcmV0dXJuIEdlb0pTT04uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IF8gQSBXS1QgZ2VvbWV0cnlcbiAqIEByZXR1cm4gez9PYmplY3R9IEEgR2VvSlNPTiBnZW9tZXRyeSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gcGFyc2UgKGlucHV0KSB7XG4gIHZhciBwYXJ0cyA9IGlucHV0LnNwbGl0KCc7Jyk7XG4gIHZhciBfID0gcGFydHMucG9wKCk7XG4gIHZhciBzcmlkID0gKHBhcnRzLnNoaWZ0KCkgfHwgJycpLnNwbGl0KCc9JykucG9wKCk7XG5cbiAgdmFyIGkgPSAwO1xuXG4gIGZ1bmN0aW9uICQgKHJlKSB7XG4gICAgdmFyIG1hdGNoID0gXy5zdWJzdHJpbmcoaSkubWF0Y2gocmUpO1xuICAgIGlmICghbWF0Y2gpIHJldHVybiBudWxsO1xuICAgIGVsc2Uge1xuICAgICAgaSArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICByZXR1cm4gbWF0Y2hbMF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JzIChvYmopIHtcbiAgICBpZiAob2JqICYmIHNyaWQubWF0Y2goL1xcZCsvKSkge1xuICAgICAgb2JqLmNycyA9IHtcbiAgICAgICAgdHlwZTogJ25hbWUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgbmFtZTogJ3VybjpvZ2M6ZGVmOmNyczpFUFNHOjonICsgc3JpZFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiB3aGl0ZSAoKSB7ICQoL15cXHMqLyk7IH1cblxuICBmdW5jdGlvbiBtdWx0aWNvb3JkcyAoKSB7XG4gICAgd2hpdGUoKTtcbiAgICB2YXIgZGVwdGggPSAwO1xuICAgIHZhciByaW5ncyA9IFtdO1xuICAgIHZhciBzdGFjayA9IFtyaW5nc107XG4gICAgdmFyIHBvaW50ZXIgPSByaW5ncztcbiAgICB2YXIgZWxlbTtcblxuICAgIHdoaWxlIChlbGVtID1cbiAgICAgICAgICAgJCgvXihcXCgpLykgfHxcbiAgICAgICAgICAgICAkKC9eKFxcKSkvKSB8fFxuICAgICAgICAgICAgICAgJCgvXigsKS8pIHx8XG4gICAgICAgICAgICAgICAgICQodHVwbGVzKSkge1xuICAgICAgaWYgKGVsZW0gPT09ICcoJykge1xuICAgICAgICBzdGFjay5wdXNoKHBvaW50ZXIpO1xuICAgICAgICBwb2ludGVyID0gW107XG4gICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLnB1c2gocG9pbnRlcik7XG4gICAgICAgIGRlcHRoKys7XG4gICAgICB9IGVsc2UgaWYgKGVsZW0gPT09ICcpJykge1xuICAgICAgICAvLyBGb3IgdGhlIGNhc2U6IFBvbHlnb24oKSwgLi4uXG4gICAgICAgIGlmIChwb2ludGVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcG9pbnRlciA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAvLyB0aGUgc3RhY2sgd2FzIGVtcHR5LCBpbnB1dCB3YXMgbWFsZm9ybWVkXG4gICAgICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgICAgIGRlcHRoLS07XG4gICAgICAgIGlmIChkZXB0aCA9PT0gMCkgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKGVsZW0gPT09ICcsJykge1xuICAgICAgICBwb2ludGVyID0gW107XG4gICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLnB1c2gocG9pbnRlcik7XG4gICAgICB9IGVsc2UgaWYgKCFlbGVtLnNwbGl0KC9cXHMvZykuc29tZShpc05hTikpIHtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocG9pbnRlciwgZWxlbS5zcGxpdCgvXFxzL2cpLm1hcChwYXJzZUZsb2F0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHdoaXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKGRlcHRoICE9PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiByaW5ncztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3JkcyAoKSB7XG4gICAgdmFyIGxpc3QgPSBbXTtcbiAgICB2YXIgaXRlbTtcbiAgICB2YXIgcHQ7XG4gICAgd2hpbGUgKHB0ID1cbiAgICAgICAgICAgJCh0dXBsZXMpIHx8XG4gICAgICAgICAgICAgJCgvXigsKS8pKSB7XG4gICAgICBpZiAocHQgPT09ICcsJykge1xuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgICAgIGl0ZW0gPSBbXTtcbiAgICAgIH0gZWxzZSBpZiAoIXB0LnNwbGl0KC9cXHMvZykuc29tZShpc05hTikpIHtcbiAgICAgICAgaWYgKCFpdGVtKSBpdGVtID0gW107XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGl0ZW0sIHB0LnNwbGl0KC9cXHMvZykubWFwKHBhcnNlRmxvYXQpKTtcbiAgICAgIH1cbiAgICAgIHdoaXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW0pIGxpc3QucHVzaChpdGVtKTtcbiAgICBlbHNlIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIGxpc3QubGVuZ3RoID8gbGlzdCA6IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBwb2ludCAoKSB7XG4gICAgaWYgKCEkKC9eKHBvaW50KFxcc3opPykvaSkpIHJldHVybiBudWxsO1xuICAgIHdoaXRlKCk7XG4gICAgaWYgKCEkKC9eKFxcKCkvKSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIGMgPSBjb29yZHMoKTtcbiAgICBpZiAoIWMpIHJldHVybiBudWxsO1xuICAgIHdoaXRlKCk7XG4gICAgaWYgKCEkKC9eKFxcKSkvKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICBjb29yZGluYXRlczogY1swXVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBtdWx0aXBvaW50ICgpIHtcbiAgICBpZiAoISQoL14obXVsdGlwb2ludCkvaSkpIHJldHVybiBudWxsO1xuICAgIHdoaXRlKCk7XG4gICAgdmFyIG5ld0Nvb3Jkc0Zvcm1hdCA9IF9cbiAgICAgIC5zdWJzdHJpbmcoXy5pbmRleE9mKCcoJykgKyAxLCBfLmxlbmd0aCAtIDEpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICcnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJyk7XG4gICAgXyA9ICdNVUxUSVBPSU5UICgnICsgbmV3Q29vcmRzRm9ybWF0ICsgJyknO1xuICAgIHZhciBjID0gbXVsdGljb29yZHMoKTtcbiAgICBpZiAoIWMpIHJldHVybiBudWxsO1xuICAgIHdoaXRlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdNdWx0aVBvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzOiBjXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG11bHRpbGluZXN0cmluZyAoKSB7XG4gICAgaWYgKCEkKC9eKG11bHRpbGluZXN0cmluZykvaSkpIHJldHVybiBudWxsO1xuICAgIHdoaXRlKCk7XG4gICAgdmFyIGMgPSBtdWx0aWNvb3JkcygpO1xuICAgIGlmICghYykgcmV0dXJuIG51bGw7XG4gICAgd2hpdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ011bHRpTGluZVN0cmluZycsXG4gICAgICBjb29yZGluYXRlczogY1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaW5lc3RyaW5nICgpIHtcbiAgICBpZiAoISQoL14obGluZXN0cmluZyhcXHN6KT8pL2kpKSByZXR1cm4gbnVsbDtcbiAgICB3aGl0ZSgpO1xuICAgIGlmICghJCgvXihcXCgpLykpIHJldHVybiBudWxsO1xuICAgIHZhciBjID0gY29vcmRzKCk7XG4gICAgaWYgKCFjKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoISQoL14oXFwpKS8pKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgICAgY29vcmRpbmF0ZXM6IGNcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcG9seWdvbiAoKSB7XG4gICAgaWYgKCEkKC9eKHBvbHlnb24oXFxzeik/KS9pKSkgcmV0dXJuIG51bGw7XG4gICAgd2hpdGUoKTtcbiAgICB2YXIgYyA9IG11bHRpY29vcmRzKCk7XG4gICAgaWYgKCFjKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IGNcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbXVsdGlwb2x5Z29uICgpIHtcbiAgICBpZiAoISQoL14obXVsdGlwb2x5Z29uKS9pKSkgcmV0dXJuIG51bGw7XG4gICAgd2hpdGUoKTtcbiAgICB2YXIgYyA9IG11bHRpY29vcmRzKCk7XG4gICAgaWYgKCFjKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ011bHRpUG9seWdvbicsXG4gICAgICBjb29yZGluYXRlczogY1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBnZW9tZXRyeWNvbGxlY3Rpb24gKCkge1xuICAgIHZhciBnZW9tZXRyaWVzID0gW107XG4gICAgdmFyIGdlb21ldHJ5O1xuXG4gICAgaWYgKCEkKC9eKGdlb21ldHJ5Y29sbGVjdGlvbikvaSkpIHJldHVybiBudWxsO1xuICAgIHdoaXRlKCk7XG5cbiAgICBpZiAoISQoL14oXFwoKS8pKSByZXR1cm4gbnVsbDtcbiAgICB3aGlsZSAoZ2VvbWV0cnkgPSByb290KCkpIHtcbiAgICAgIGdlb21ldHJpZXMucHVzaChnZW9tZXRyeSk7XG4gICAgICB3aGl0ZSgpO1xuICAgICAgJCgvXigsKS8pO1xuICAgICAgd2hpdGUoKTtcbiAgICB9XG4gICAgaWYgKCEkKC9eKFxcKSkvKSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ0dlb21ldHJ5Q29sbGVjdGlvbicsXG4gICAgICBnZW9tZXRyaWVzOiBnZW9tZXRyaWVzXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJvb3QgKCkge1xuICAgIHJldHVybiBwb2ludCgpIHx8XG4gICAgICBsaW5lc3RyaW5nKCkgfHxcbiAgICAgIHBvbHlnb24oKSB8fFxuICAgICAgbXVsdGlwb2ludCgpIHx8XG4gICAgICBtdWx0aWxpbmVzdHJpbmcoKSB8fFxuICAgICAgbXVsdGlwb2x5Z29uKCkgfHxcbiAgICAgIGdlb21ldHJ5Y29sbGVjdGlvbigpO1xuICB9XG5cbiAgcmV0dXJuIGNycyhyb290KCkpO1xufVxuXG4vKipcbiAqIFN0cmluZ2lmaWVzIGEgR2VvSlNPTiBvYmplY3QgaW50byBXS1RcbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5IChnaikge1xuICBpZiAoZ2oudHlwZSA9PT0gJ0ZlYXR1cmUnKSB7XG4gICAgZ2ogPSBnai5nZW9tZXRyeTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhaXJXS1QgKGMpIHtcbiAgICByZXR1cm4gYy5qb2luKCcgJyk7XG4gIH1cblxuICBmdW5jdGlvbiByaW5nV0tUIChyKSB7XG4gICAgcmV0dXJuIHIubWFwKHBhaXJXS1QpLmpvaW4oJywgJyk7XG4gIH1cblxuICBmdW5jdGlvbiByaW5nc1dLVCAocikge1xuICAgIHJldHVybiByLm1hcChyaW5nV0tUKS5tYXAod3JhcFBhcmVucykuam9pbignLCAnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG11bHRpUmluZ3NXS1QgKHIpIHtcbiAgICByZXR1cm4gci5tYXAocmluZ3NXS1QpLm1hcCh3cmFwUGFyZW5zKS5qb2luKCcsICcpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcFBhcmVucyAocykgeyByZXR1cm4gJygnICsgcyArICcpJzsgfVxuXG4gIHN3aXRjaCAoZ2oudHlwZSkge1xuICAgIGNhc2UgJ1BvaW50JzpcbiAgICAgIHJldHVybiAnUE9JTlQgKCcgKyBwYWlyV0tUKGdqLmNvb3JkaW5hdGVzKSArICcpJztcbiAgICBjYXNlICdMaW5lU3RyaW5nJzpcbiAgICAgIHJldHVybiAnTElORVNUUklORyAoJyArIHJpbmdXS1QoZ2ouY29vcmRpbmF0ZXMpICsgJyknO1xuICAgIGNhc2UgJ1BvbHlnb24nOlxuICAgICAgcmV0dXJuICdQT0xZR09OICgnICsgcmluZ3NXS1QoZ2ouY29vcmRpbmF0ZXMpICsgJyknO1xuICAgIGNhc2UgJ011bHRpUG9pbnQnOlxuICAgICAgcmV0dXJuICdNVUxUSVBPSU5UICgnICsgcmluZ1dLVChnai5jb29yZGluYXRlcykgKyAnKSc7XG4gICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcbiAgICAgIHJldHVybiAnTVVMVElQT0xZR09OICgnICsgbXVsdGlSaW5nc1dLVChnai5jb29yZGluYXRlcykgKyAnKSc7XG4gICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgIHJldHVybiAnTVVMVElMSU5FU1RSSU5HICgnICsgcmluZ3NXS1QoZ2ouY29vcmRpbmF0ZXMpICsgJyknO1xuICAgIGNhc2UgJ0dlb21ldHJ5Q29sbGVjdGlvbic6XG4gICAgICByZXR1cm4gJ0dFT01FVFJZQ09MTEVDVElPTiAoJyArIGdqLmdlb21ldHJpZXMubWFwKHN0cmluZ2lmeSkuam9pbignLCAnKSArICcpJztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdHJpbmdpZnkgcmVxdWlyZXMgYSB2YWxpZCBHZW9KU09OIEZlYXR1cmUgb3IgZ2VvbWV0cnkgb2JqZWN0IGFzIGlucHV0Jyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=