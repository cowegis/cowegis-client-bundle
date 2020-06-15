(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~layer-providerLayerFactory"],{

/***/ "./node_modules/leaflet-providers/leaflet-providers.js":
/*!*************************************************************!*\
  !*** ./node_modules/leaflet-providers/leaflet-providers.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(this, function (L) {
	'use strict';

	L.TileLayer.Provider = L.TileLayer.extend({
		initialize: function (arg, options) {
			var providers = L.TileLayer.Provider.providers;

			var parts = arg.split('.');

			var providerName = parts[0];
			var variantName = parts[1];

			if (!providers[providerName]) {
				throw 'No such provider (' + providerName + ')';
			}

			var provider = {
				url: providers[providerName].url,
				options: providers[providerName].options
			};

			// overwrite values in provider from variant.
			if (variantName && 'variants' in providers[providerName]) {
				if (!(variantName in providers[providerName].variants)) {
					throw 'No such variant of ' + providerName + ' (' + variantName + ')';
				}
				var variant = providers[providerName].variants[variantName];
				var variantOptions;
				if (typeof variant === 'string') {
					variantOptions = {
						variant: variant
					};
				} else {
					variantOptions = variant.options;
				}
				provider = {
					url: variant.url || provider.url,
					options: L.Util.extend({}, provider.options, variantOptions)
				};
			}

			// replace attribution placeholders with their values from toplevel provider attribution,
			// recursively
			var attributionReplacer = function (attr) {
				if (attr.indexOf('{attribution.') === -1) {
					return attr;
				}
				return attr.replace(/\{attribution.(\w*)\}/g,
					function (match, attributionName) {
						return attributionReplacer(providers[attributionName].options.attribution);
					}
				);
			};
			provider.options.attribution = attributionReplacer(provider.options.attribution);

			// Compute final options combining provider options with any user overrides
			var layerOpts = L.Util.extend({}, provider.options, options);
			L.TileLayer.prototype.initialize.call(this, provider.url, layerOpts);
		}
	});

	/**
	 * Definition of providers.
	 * see http://leafletjs.com/reference.html#tilelayer for options in the options map.
	 */

	L.TileLayer.Provider.providers = {
		OpenStreetMap: {
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			options: {
				maxZoom: 19,
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			},
			variants: {
				Mapnik: {},
				DE: {
					url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
					options: {
						maxZoom: 18
					}
				},
				CH: {
					url: 'https://tile.osm.ch/switzerland/{z}/{x}/{y}.png',
					options: {
						maxZoom: 18,
						bounds: [[45, 5], [48, 11]]
					}
				},
				France: {
					url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
					options: {
						maxZoom: 20,
						attribution: '&copy; Openstreetmap France | {attribution.OpenStreetMap}'
					}
				},
				HOT: {
					url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
					options: {
						attribution:
							'{attribution.OpenStreetMap}, ' +
							'Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> ' +
							'hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
					}
				},
				BZH: {
					url: 'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png',
					options: {
						attribution: '{attribution.OpenStreetMap}, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
						bounds: [[46.2, -5.5], [50, 0.7]]
					}
				}
			}
		},
		OpenSeaMap: {
			url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
			options: {
				attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
			}
		},
		OpenPtMap: {
			url: 'http://openptmap.org/tiles/{z}/{x}/{y}.png',
			options: {
				maxZoom: 17,
				attribution: 'Map data: &copy; <a href="http://www.openptmap.org">OpenPtMap</a> contributors'
			}
		},
		OpenTopoMap: {
			url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
			options: {
				maxZoom: 17,
				attribution: 'Map data: {attribution.OpenStreetMap}, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
			}
		},
		OpenRailwayMap: {
			url: 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
			options: {
				maxZoom: 19,
				attribution: 'Map data: {attribution.OpenStreetMap} | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
			}
		},
		OpenFireMap: {
			url: 'http://openfiremap.org/hytiles/{z}/{x}/{y}.png',
			options: {
				maxZoom: 19,
				attribution: 'Map data: {attribution.OpenStreetMap} | Map style: &copy; <a href="http://www.openfiremap.org">OpenFireMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
			}
		},
		SafeCast: {
			url: 'https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png',
			options: {
				maxZoom: 16,
				attribution: 'Map data: {attribution.OpenStreetMap} | Map style: &copy; <a href="https://blog.safecast.org/about/">SafeCast</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
			}
		},
		Stadia: {
			url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
			options: {
				maxZoom: 20,
				attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
			},
			variants: {
				AlidadeSmooth: {
					url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
				},
				AlidadeSmoothDark: {
					url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
				},
				OSMBright: {
					url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
				},
				Outdoors: {
					url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
				}
			}
		},
		Thunderforest: {
			url: 'https://{s}.tile.thunderforest.com/{variant}/{z}/{x}/{y}.png?apikey={apikey}',
			options: {
				attribution:
					'&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, {attribution.OpenStreetMap}',
				variant: 'cycle',
				apikey: '<insert your api key here>',
				maxZoom: 22
			},
			variants: {
				OpenCycleMap: 'cycle',
				Transport: {
					options: {
						variant: 'transport'
					}
				},
				TransportDark: {
					options: {
						variant: 'transport-dark'
					}
				},
				SpinalMap: {
					options: {
						variant: 'spinal-map'
					}
				},
				Landscape: 'landscape',
				Outdoors: 'outdoors',
				Pioneer: 'pioneer',
				MobileAtlas: 'mobile-atlas',
				Neighbourhood: 'neighbourhood'
			}
		},
		CyclOSM: {
			url: 'https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
			options: {
				maxZoom: 20,
				attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: {attribution.OpenStreetMap}'
			}
		},
		Hydda: {
			url: 'https://{s}.tile.openstreetmap.se/hydda/{variant}/{z}/{x}/{y}.png',
			options: {
				maxZoom: 20,
				variant: 'full',
				attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data {attribution.OpenStreetMap}'
			},
			variants: {
				Full: 'full',
				Base: 'base',
				RoadsAndLabels: 'roads_and_labels'
			}
		},
		Jawg: {
			url: 'https://{s}.tile.jawg.io/{variant}/{z}/{x}/{y}{r}.png?access-token={accessToken}',
			options: {
				attribution:
					'<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> ' +
					'{attribution.OpenStreetMap}',
				minZoom: 0,
				maxZoom: 22,
				subdomains: 'abcd',
				variant: 'jawg-terrain',
				// Get your own Jawg access token here : https://www.jawg.io/lab/
				// NB : this is a demonstration key that comes with no guarantee
				accessToken: '<insert your access token here>',
			},
			variants: {
				Streets: 'jawg-streets',
				Terrain: 'jawg-terrain',
				Sunny: 'jawg-sunny',
				Dark: 'jawg-dark',
				Light: 'jawg-light',
				Matrix: 'jawg-matrix'
			}
		},
		MapBox: {
			url: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}',
			options: {
				attribution:
					'&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a> ' +
					'{attribution.OpenStreetMap} ' +
					'<a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>',
				tileSize: 512,
				maxZoom: 18,
				zoomOffset: -1,
				id: 'mapbox/streets-v11',
				accessToken: '<insert your access token here>',
			}
		},
		MapTiler: {
			url: 'https://api.maptiler.com/maps/{variant}/{z}/{x}/{y}{r}.{ext}?key={key}',
			options: {
				attribution:
					'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
				variant: 'streets',
				ext: 'png',
				key: '<insert your MapTiler Cloud API key here>',
				tileSize: 512,
				zoomOffset: -1,
				minZoom: 0,
				maxZoom: 21
			},
			variants: {
				Streets: 'streets',
				Basic: 'basic',
				Bright: 'bright',
				Pastel: 'pastel',
				Positron: 'positron',
				Hybrid: {
					options: {
						variant: 'hybrid',
						ext: 'jpg'
					}
				},
				Toner: 'toner',
				Topo: 'topo',
				Voyager: 'voyager'
			}
		},
		Stamen: {
			url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}{r}.{ext}',
			options: {
				attribution:
					'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
					'<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
					'Map data {attribution.OpenStreetMap}',
				subdomains: 'abcd',
				minZoom: 0,
				maxZoom: 20,
				variant: 'toner',
				ext: 'png'
			},
			variants: {
				Toner: 'toner',
				TonerBackground: 'toner-background',
				TonerHybrid: 'toner-hybrid',
				TonerLines: 'toner-lines',
				TonerLabels: 'toner-labels',
				TonerLite: 'toner-lite',
				Watercolor: {
					url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}',
					options: {
						variant: 'watercolor',
						ext: 'jpg',
						minZoom: 1,
						maxZoom: 16
					}
				},
				Terrain: {
					options: {
						variant: 'terrain',
						minZoom: 0,
						maxZoom: 18
					}
				},
				TerrainBackground: {
					options: {
						variant: 'terrain-background',
						minZoom: 0,
						maxZoom: 18
					}
				},
				TerrainLabels: {
					options: {
						variant: 'terrain-labels',
						minZoom: 0,
						maxZoom: 18
					}
				},
				TopOSMRelief: {
					url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}',
					options: {
						variant: 'toposm-color-relief',
						ext: 'jpg',
						bounds: [[22, -132], [51, -56]]
					}
				},
				TopOSMFeatures: {
					options: {
						variant: 'toposm-features',
						bounds: [[22, -132], [51, -56]],
						opacity: 0.9
					}
				}
			}
		},
		TomTom: {
			url: 'https://{s}.api.tomtom.com/map/1/tile/{variant}/{style}/{z}/{x}/{y}.{ext}?key={apikey}',
			options: {
				variant: 'basic',
				maxZoom: 22,
				attribution:
					'<a href="https://tomtom.com" target="_blank">&copy;  1992 - ' + new Date().getFullYear() + ' TomTom.</a> ',
				subdomains: 'abcd',
				style: 'main',
				ext: 'png',
				apikey: '<insert your API key here>',
			},
			variants: {
				Basic: 'basic',
				Hybrid: 'hybrid',
				Labels: 'labels'
			}
		},
		Esri: {
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}',
			options: {
				variant: 'World_Street_Map',
				attribution: 'Tiles &copy; Esri'
			},
			variants: {
				WorldStreetMap: {
					options: {
						attribution:
							'{attribution.Esri} &mdash; ' +
							'Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
					}
				},
				DeLorme: {
					options: {
						variant: 'Specialty/DeLorme_World_Base_Map',
						minZoom: 1,
						maxZoom: 11,
						attribution: '{attribution.Esri} &mdash; Copyright: &copy;2012 DeLorme'
					}
				},
				WorldTopoMap: {
					options: {
						variant: 'World_Topo_Map',
						attribution:
							'{attribution.Esri} &mdash; ' +
							'Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
					}
				},
				WorldImagery: {
					options: {
						variant: 'World_Imagery',
						attribution:
							'{attribution.Esri} &mdash; ' +
							'Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
					}
				},
				WorldTerrain: {
					options: {
						variant: 'World_Terrain_Base',
						maxZoom: 13,
						attribution:
							'{attribution.Esri} &mdash; ' +
							'Source: USGS, Esri, TANA, DeLorme, and NPS'
					}
				},
				WorldShadedRelief: {
					options: {
						variant: 'World_Shaded_Relief',
						maxZoom: 13,
						attribution: '{attribution.Esri} &mdash; Source: Esri'
					}
				},
				WorldPhysical: {
					options: {
						variant: 'World_Physical_Map',
						maxZoom: 8,
						attribution: '{attribution.Esri} &mdash; Source: US National Park Service'
					}
				},
				OceanBasemap: {
					options: {
						variant: 'Ocean_Basemap',
						maxZoom: 13,
						attribution: '{attribution.Esri} &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
					}
				},
				NatGeoWorldMap: {
					options: {
						variant: 'NatGeo_World_Map',
						maxZoom: 16,
						attribution: '{attribution.Esri} &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
					}
				},
				WorldGrayCanvas: {
					options: {
						variant: 'Canvas/World_Light_Gray_Base',
						maxZoom: 16,
						attribution: '{attribution.Esri} &mdash; Esri, DeLorme, NAVTEQ'
					}
				}
			}
		},
		OpenWeatherMap: {
			url: 'http://{s}.tile.openweathermap.org/map/{variant}/{z}/{x}/{y}.png?appid={apiKey}',
			options: {
				maxZoom: 19,
				attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
				apiKey:'<insert your api key here>',
				opacity: 0.5
			},
			variants: {
				Clouds: 'clouds',
				CloudsClassic: 'clouds_cls',
				Precipitation: 'precipitation',
				PrecipitationClassic: 'precipitation_cls',
				Rain: 'rain',
				RainClassic: 'rain_cls',
				Pressure: 'pressure',
				PressureContour: 'pressure_cntr',
				Wind: 'wind',
				Temperature: 'temp',
				Snow: 'snow'
			}
		},
		HERE: {
			/*
			 * HERE maps, formerly Nokia maps.
			 * These basemaps are free, but you need an api id and app key. Please sign up at
			 * https://developer.here.com/plans
			 */
			url:
				'https://{s}.{base}.maps.api.here.com/maptile/2.1/' +
				'{type}/{mapID}/{variant}/{z}/{x}/{y}/{size}/{format}?' +
				'app_id={app_id}&app_code={app_code}&lg={language}',
			options: {
				attribution:
					'Map &copy; 1987-' + new Date().getFullYear() + ' <a href="http://developer.here.com">HERE</a>',
				subdomains: '1234',
				mapID: 'newest',
				'app_id': '<insert your app_id here>',
				'app_code': '<insert your app_code here>',
				base: 'base',
				variant: 'normal.day',
				maxZoom: 20,
				type: 'maptile',
				language: 'eng',
				format: 'png8',
				size: '256'
			},
			variants: {
				normalDay: 'normal.day',
				normalDayCustom: 'normal.day.custom',
				normalDayGrey: 'normal.day.grey',
				normalDayMobile: 'normal.day.mobile',
				normalDayGreyMobile: 'normal.day.grey.mobile',
				normalDayTransit: 'normal.day.transit',
				normalDayTransitMobile: 'normal.day.transit.mobile',
				normalDayTraffic: {
					options: {
						variant: 'normal.traffic.day',
						base: 'traffic',
						type: 'traffictile'
					}
				},
				normalNight: 'normal.night',
				normalNightMobile: 'normal.night.mobile',
				normalNightGrey: 'normal.night.grey',
				normalNightGreyMobile: 'normal.night.grey.mobile',
				normalNightTransit: 'normal.night.transit',
				normalNightTransitMobile: 'normal.night.transit.mobile',
				reducedDay: 'reduced.day',
				reducedNight: 'reduced.night',
				basicMap: {
					options: {
						type: 'basetile'
					}
				},
				mapLabels: {
					options: {
						type: 'labeltile',
						format: 'png'
					}
				},
				trafficFlow: {
					options: {
						base: 'traffic',
						type: 'flowtile'
					}
				},
				carnavDayGrey: 'carnav.day.grey',
				hybridDay: {
					options: {
						base: 'aerial',
						variant: 'hybrid.day'
					}
				},
				hybridDayMobile: {
					options: {
						base: 'aerial',
						variant: 'hybrid.day.mobile'
					}
				},
				hybridDayTransit: {
					options: {
						base: 'aerial',
						variant: 'hybrid.day.transit'
					}
				},
				hybridDayGrey: {
					options: {
						base: 'aerial',
						variant: 'hybrid.grey.day'
					}
				},
				hybridDayTraffic: {
					options: {
						variant: 'hybrid.traffic.day',
						base: 'traffic',
						type: 'traffictile'
					}
				},
				pedestrianDay: 'pedestrian.day',
				pedestrianNight: 'pedestrian.night',
				satelliteDay: {
					options: {
						base: 'aerial',
						variant: 'satellite.day'
					}
				},
				terrainDay: {
					options: {
						base: 'aerial',
						variant: 'terrain.day'
					}
				},
				terrainDayMobile: {
					options: {
						base: 'aerial',
						variant: 'terrain.day.mobile'
					}
				}
			}
		},
		HEREv3: {
			/*
			 * HERE maps API Version 3.
			 * These basemaps are free, but you need an API key. Please sign up at
			 * https://developer.here.com/plans
			 * Version 3 deprecates the app_id and app_code access in favor of apiKey
			 *
			 * Supported access methods as of 2019/12/21:
			 * @see https://developer.here.com/faqs#access-control-1--how-do-you-control-access-to-here-location-services
			 */
			url:
				'https://{s}.{base}.maps.ls.hereapi.com/maptile/2.1/' +
				'{type}/{mapID}/{variant}/{z}/{x}/{y}/{size}/{format}?' +
				'apiKey={apiKey}&lg={language}',
			options: {
				attribution:
					'Map &copy; 1987-' + new Date().getFullYear() + ' <a href="http://developer.here.com">HERE</a>',
				subdomains: '1234',
				mapID: 'newest',
				apiKey: '<insert your apiKey here>',
				base: 'base',
				variant: 'normal.day',
				maxZoom: 20,
				type: 'maptile',
				language: 'eng',
				format: 'png8',
				size: '256'
			},
			variants: {
				normalDay: 'normal.day',
				normalDayCustom: 'normal.day.custom',
				normalDayGrey: 'normal.day.grey',
				normalDayMobile: 'normal.day.mobile',
				normalDayGreyMobile: 'normal.day.grey.mobile',
				normalDayTransit: 'normal.day.transit',
				normalDayTransitMobile: 'normal.day.transit.mobile',
				normalNight: 'normal.night',
				normalNightMobile: 'normal.night.mobile',
				normalNightGrey: 'normal.night.grey',
				normalNightGreyMobile: 'normal.night.grey.mobile',
				normalNightTransit: 'normal.night.transit',
				normalNightTransitMobile: 'normal.night.transit.mobile',
				reducedDay: 'reduced.day',
				reducedNight: 'reduced.night',
				basicMap: {
					options: {
						type: 'basetile'
					}
				},
				mapLabels: {
					options: {
						type: 'labeltile',
						format: 'png'
					}
				},
				trafficFlow: {
					options: {
						base: 'traffic',
						type: 'flowtile'
					}
				},
				carnavDayGrey: 'carnav.day.grey',
				hybridDay: {
					options: {
						base: 'aerial',
						variant: 'hybrid.day'
					}
				},
				hybridDayMobile: {
					options: {
						base: 'aerial',
						variant: 'hybrid.day.mobile'
					}
				},
				hybridDayTransit: {
					options: {
						base: 'aerial',
						variant: 'hybrid.day.transit'
					}
				},
				hybridDayGrey: {
					options: {
						base: 'aerial',
						variant: 'hybrid.grey.day'
					}
				},
				pedestrianDay: 'pedestrian.day',
				pedestrianNight: 'pedestrian.night',
				satelliteDay: {
					options: {
						base: 'aerial',
						variant: 'satellite.day'
					}
				},
				terrainDay: {
					options: {
						base: 'aerial',
						variant: 'terrain.day'
					}
				},
				terrainDayMobile: {
					options: {
						base: 'aerial',
						variant: 'terrain.day.mobile'
					}
				}
			}
		},
		FreeMapSK: {
			url: 'http://t{s}.freemap.sk/T/{z}/{x}/{y}.jpeg',
			options: {
				minZoom: 8,
				maxZoom: 16,
				subdomains: '1234',
				bounds: [[47.204642, 15.996093], [49.830896, 22.576904]],
				attribution:
					'{attribution.OpenStreetMap}, vizualization CC-By-SA 2.0 <a href="http://freemap.sk">Freemap.sk</a>'
			}
		},
		MtbMap: {
			url: 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
			options: {
				attribution:
					'{attribution.OpenStreetMap} &amp; USGS'
			}
		},
		CartoDB: {
			url: 'https://{s}.basemaps.cartocdn.com/{variant}/{z}/{x}/{y}{r}.png',
			options: {
				attribution: '{attribution.OpenStreetMap} &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: 'abcd',
				maxZoom: 19,
				variant: 'light_all'
			},
			variants: {
				Positron: 'light_all',
				PositronNoLabels: 'light_nolabels',
				PositronOnlyLabels: 'light_only_labels',
				DarkMatter: 'dark_all',
				DarkMatterNoLabels: 'dark_nolabels',
				DarkMatterOnlyLabels: 'dark_only_labels',
				Voyager: 'rastertiles/voyager',
				VoyagerNoLabels: 'rastertiles/voyager_nolabels',
				VoyagerOnlyLabels: 'rastertiles/voyager_only_labels',
				VoyagerLabelsUnder: 'rastertiles/voyager_labels_under'
			}
		},
		HikeBike: {
			url: 'https://tiles.wmflabs.org/{variant}/{z}/{x}/{y}.png',
			options: {
				maxZoom: 19,
				attribution: '{attribution.OpenStreetMap}',
				variant: 'hikebike'
			},
			variants: {
				HikeBike: {},
				HillShading: {
					options: {
						maxZoom: 15,
						variant: 'hillshading'
					}
				}
			}
		},
		BasemapAT: {
			url: 'https://maps{s}.wien.gv.at/basemap/{variant}/{type}/google3857/{z}/{y}/{x}.{format}',
			options: {
				maxZoom: 19,
				attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
				subdomains: ['', '1', '2', '3', '4'],
				type: 'normal',
				format: 'png',
				bounds: [[46.358770, 8.782379], [49.037872, 17.189532]],
				variant: 'geolandbasemap'
			},
			variants: {
				basemap: {
					options: {
						maxZoom: 20, // currently only in Vienna
						variant: 'geolandbasemap'
					}
				},
				grau: 'bmapgrau',
				overlay: 'bmapoverlay',
				terrain: {
					options: {
						variant: 'bmapgelaende',
						type: 'grau',
						format: 'jpeg'
					}
				},
				surface: {
					options: {
						variant: 'bmapoberflaeche',
						type: 'grau',
						format: 'jpeg'
					}
				},
				highdpi: {
					options: {
						variant: 'bmaphidpi',
						format: 'jpeg'
					}
				},
				orthofoto: {
					options: {
						maxZoom: 20, // currently only in Vienna
						variant: 'bmaporthofoto30cm',
						format: 'jpeg'
					}
				}
			}
		},
		nlmaps: {
			url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/{variant}/EPSG:3857/{z}/{x}/{y}.png',
			options: {
				minZoom: 6,
				maxZoom: 19,
				bounds: [[50.5, 3.25], [54, 7.6]],
				attribution: 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>'
			},
			variants: {
				'standaard': 'brtachtergrondkaart',
				'pastel': 'brtachtergrondkaartpastel',
				'grijs': 'brtachtergrondkaartgrijs',
				'luchtfoto': {
					'url': 'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/2018_ortho25/EPSG:3857/{z}/{x}/{y}.png',
				}
			}
		},
		NASAGIBS: {
			url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/{variant}/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
			options: {
				attribution:
					'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System ' +
					'(<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
				bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
				minZoom: 1,
				maxZoom: 9,
				format: 'jpg',
				time: '',
				tilematrixset: 'GoogleMapsCompatible_Level'
			},
			variants: {
				ModisTerraTrueColorCR: 'MODIS_Terra_CorrectedReflectance_TrueColor',
				ModisTerraBands367CR: 'MODIS_Terra_CorrectedReflectance_Bands367',
				ViirsEarthAtNight2012: {
					options: {
						variant: 'VIIRS_CityLights_2012',
						maxZoom: 8
					}
				},
				ModisTerraLSTDay: {
					options: {
						variant: 'MODIS_Terra_Land_Surface_Temp_Day',
						format: 'png',
						maxZoom: 7,
						opacity: 0.75
					}
				},
				ModisTerraSnowCover: {
					options: {
						variant: 'MODIS_Terra_Snow_Cover',
						format: 'png',
						maxZoom: 8,
						opacity: 0.75
					}
				},
				ModisTerraAOD: {
					options: {
						variant: 'MODIS_Terra_Aerosol',
						format: 'png',
						maxZoom: 6,
						opacity: 0.75
					}
				},
				ModisTerraChlorophyll: {
					options: {
						variant: 'MODIS_Terra_Chlorophyll_A',
						format: 'png',
						maxZoom: 7,
						opacity: 0.75
					}
				}
			}
		},
		NLS: {
			// NLS maps are copyright National library of Scotland.
			// http://maps.nls.uk/projects/api/index.html
			// Please contact NLS for anything other than non-commercial low volume usage
			//
			// Map sources: Ordnance Survey 1:1m to 1:63K, 1920s-1940s
			//   z0-9  - 1:1m
			//  z10-11 - quarter inch (1:253440)
			//  z12-18 - one inch (1:63360)
			url: 'https://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg',
			options: {
				attribution: '<a href="http://geo.nls.uk/maps/">National Library of Scotland Historic Maps</a>',
				bounds: [[49.6, -12], [61.7, 3]],
				minZoom: 1,
				maxZoom: 18,
				subdomains: '0123',
			}
		},
		JusticeMap: {
			// Justice Map (http://www.justicemap.org/)
			// Visualize race and income data for your community, county and country.
			// Includes tools for data journalists, bloggers and community activists.
			url: 'http://www.justicemap.org/tile/{size}/{variant}/{z}/{x}/{y}.png',
			options: {
				attribution: '<a href="http://www.justicemap.org/terms.php">Justice Map</a>',
				// one of 'county', 'tract', 'block'
				size: 'county',
				// Bounds for USA, including Alaska and Hawaii
				bounds: [[14, -180], [72, -56]]
			},
			variants: {
				income: 'income',
				americanIndian: 'indian',
				asian: 'asian',
				black: 'black',
				hispanic: 'hispanic',
				multi: 'multi',
				nonWhite: 'nonwhite',
				white: 'white',
				plurality: 'plural'
			}
		},
		Wikimedia: {
			url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
			options: {
				attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
				minZoom: 1,
				maxZoom: 19
			}
		},
		GeoportailFrance: {
			url: 'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER={variant}&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
			options: {
				attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
				bounds: [[-75, -180], [81, 180]],
				minZoom: 2,
				maxZoom: 18,
				// Get your own geoportail apikey here : http://professionnels.ign.fr/ign/contrats/
				// NB : 'choisirgeoportail' is a demonstration key that comes with no guarantee
				apikey: 'choisirgeoportail',
				format: 'image/jpeg',
				style : 'normal',
				variant: 'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD'
			},
			variants: {
				parcels: {
					options : {
						variant: 'CADASTRALPARCELS.PARCELS',
						maxZoom: 20,
						style : 'bdparcellaire',
						format: 'image/png'
					}
				},
				ignMaps: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
				maps: 'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD',
				orthos: {
					options: {
						maxZoom: 19,
						variant: 'ORTHOIMAGERY.ORTHOPHOTOS'
					}
				}
			}
		},
		OneMapSG: {
			url: 'https://maps-{s}.onemap.sg/v3/{variant}/{z}/{x}/{y}.png',
			options: {
				variant: 'Default',
				minZoom: 11,
				maxZoom: 18,
				bounds: [[1.56073, 104.11475], [1.16, 103.502]],
				attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
			},
			variants: {
				Default: 'Default',
				Night: 'Night',
				Original: 'Original',
				Grey: 'Grey',
				LandLot: 'LandLot'
			}
		}
	};

	L.tileLayer.provider = function (provider, options) {
		return new L.TileLayer.Provider(provider, options);
	};

	return L;
}));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGVhZmxldC1wcm92aWRlcnMvbGVhZmxldC1wcm92aWRlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSxLQUFLLElBQTBDO0FBQy9DO0FBQ0EsRUFBRSxpQ0FBTyxDQUFDLGdGQUFTLENBQUMsb0NBQUUsT0FBTztBQUFBO0FBQUE7QUFBQSxvR0FBQztBQUM5QixFQUFFLE1BQU0sRUFNTjtBQUNGLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsMkJBQTJCLG1CQUFtQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixFQUFFLHlCQUF5QixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLElBQUk7QUFDSjtBQUNBLGNBQWM7QUFDZDtBQUNBLG9CQUFvQixFQUFFLG9DQUFvQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNENBQTRDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG9CQUFvQixFQUFFLDhCQUE4QixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxFQUFFLEVBQUUsS0FBSztBQUN2QixNQUFNLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPO0FBQ3pELGFBQWEsT0FBTyxLQUFLLFNBQVM7QUFDbEM7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLDhDQUE4QyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsNkJBQTZCLE9BQU8sbUVBQW1FLE1BQU0sMEJBQTBCLE9BQU8sUUFBUSxRQUFRLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx1QkFBdUIsRUFBRSxlQUFlLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1HQUFtRyxXQUFXLGdDQUFnQztBQUM5SSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUMiLCJmaWxlIjoianMvdmVuZG9yc35sYXllci1wcm92aWRlckxheWVyRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuXHRcdGRlZmluZShbJ2xlYWZsZXQnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0Ly8gZGVmaW5lIGEgQ29tbW9uIEpTIG1vZHVsZSB0aGF0IHJlbGllcyBvbiAnbGVhZmxldCdcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnbGVhZmxldCcpKTtcblx0fSBlbHNlIHtcblx0XHQvLyBBc3N1bWUgTGVhZmxldCBpcyBsb2FkZWQgaW50byBnbG9iYWwgb2JqZWN0IEwgYWxyZWFkeVxuXHRcdGZhY3RvcnkoTCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKEwpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdEwuVGlsZUxheWVyLlByb3ZpZGVyID0gTC5UaWxlTGF5ZXIuZXh0ZW5kKHtcblx0XHRpbml0aWFsaXplOiBmdW5jdGlvbiAoYXJnLCBvcHRpb25zKSB7XG5cdFx0XHR2YXIgcHJvdmlkZXJzID0gTC5UaWxlTGF5ZXIuUHJvdmlkZXIucHJvdmlkZXJzO1xuXG5cdFx0XHR2YXIgcGFydHMgPSBhcmcuc3BsaXQoJy4nKTtcblxuXHRcdFx0dmFyIHByb3ZpZGVyTmFtZSA9IHBhcnRzWzBdO1xuXHRcdFx0dmFyIHZhcmlhbnROYW1lID0gcGFydHNbMV07XG5cblx0XHRcdGlmICghcHJvdmlkZXJzW3Byb3ZpZGVyTmFtZV0pIHtcblx0XHRcdFx0dGhyb3cgJ05vIHN1Y2ggcHJvdmlkZXIgKCcgKyBwcm92aWRlck5hbWUgKyAnKSc7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwcm92aWRlciA9IHtcblx0XHRcdFx0dXJsOiBwcm92aWRlcnNbcHJvdmlkZXJOYW1lXS51cmwsXG5cdFx0XHRcdG9wdGlvbnM6IHByb3ZpZGVyc1twcm92aWRlck5hbWVdLm9wdGlvbnNcblx0XHRcdH07XG5cblx0XHRcdC8vIG92ZXJ3cml0ZSB2YWx1ZXMgaW4gcHJvdmlkZXIgZnJvbSB2YXJpYW50LlxuXHRcdFx0aWYgKHZhcmlhbnROYW1lICYmICd2YXJpYW50cycgaW4gcHJvdmlkZXJzW3Byb3ZpZGVyTmFtZV0pIHtcblx0XHRcdFx0aWYgKCEodmFyaWFudE5hbWUgaW4gcHJvdmlkZXJzW3Byb3ZpZGVyTmFtZV0udmFyaWFudHMpKSB7XG5cdFx0XHRcdFx0dGhyb3cgJ05vIHN1Y2ggdmFyaWFudCBvZiAnICsgcHJvdmlkZXJOYW1lICsgJyAoJyArIHZhcmlhbnROYW1lICsgJyknO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciB2YXJpYW50ID0gcHJvdmlkZXJzW3Byb3ZpZGVyTmFtZV0udmFyaWFudHNbdmFyaWFudE5hbWVdO1xuXHRcdFx0XHR2YXIgdmFyaWFudE9wdGlvbnM7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFyaWFudCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHR2YXJpYW50T3B0aW9ucyA9IHtcblx0XHRcdFx0XHRcdHZhcmlhbnQ6IHZhcmlhbnRcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhcmlhbnRPcHRpb25zID0gdmFyaWFudC5vcHRpb25zO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHByb3ZpZGVyID0ge1xuXHRcdFx0XHRcdHVybDogdmFyaWFudC51cmwgfHwgcHJvdmlkZXIudXJsLFxuXHRcdFx0XHRcdG9wdGlvbnM6IEwuVXRpbC5leHRlbmQoe30sIHByb3ZpZGVyLm9wdGlvbnMsIHZhcmlhbnRPcHRpb25zKVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZXBsYWNlIGF0dHJpYnV0aW9uIHBsYWNlaG9sZGVycyB3aXRoIHRoZWlyIHZhbHVlcyBmcm9tIHRvcGxldmVsIHByb3ZpZGVyIGF0dHJpYnV0aW9uLFxuXHRcdFx0Ly8gcmVjdXJzaXZlbHlcblx0XHRcdHZhciBhdHRyaWJ1dGlvblJlcGxhY2VyID0gZnVuY3Rpb24gKGF0dHIpIHtcblx0XHRcdFx0aWYgKGF0dHIuaW5kZXhPZigne2F0dHJpYnV0aW9uLicpID09PSAtMSkge1xuXHRcdFx0XHRcdHJldHVybiBhdHRyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBhdHRyLnJlcGxhY2UoL1xce2F0dHJpYnV0aW9uLihcXHcqKVxcfS9nLFxuXHRcdFx0XHRcdGZ1bmN0aW9uIChtYXRjaCwgYXR0cmlidXRpb25OYW1lKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYXR0cmlidXRpb25SZXBsYWNlcihwcm92aWRlcnNbYXR0cmlidXRpb25OYW1lXS5vcHRpb25zLmF0dHJpYnV0aW9uKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9O1xuXHRcdFx0cHJvdmlkZXIub3B0aW9ucy5hdHRyaWJ1dGlvbiA9IGF0dHJpYnV0aW9uUmVwbGFjZXIocHJvdmlkZXIub3B0aW9ucy5hdHRyaWJ1dGlvbik7XG5cblx0XHRcdC8vIENvbXB1dGUgZmluYWwgb3B0aW9ucyBjb21iaW5pbmcgcHJvdmlkZXIgb3B0aW9ucyB3aXRoIGFueSB1c2VyIG92ZXJyaWRlc1xuXHRcdFx0dmFyIGxheWVyT3B0cyA9IEwuVXRpbC5leHRlbmQoe30sIHByb3ZpZGVyLm9wdGlvbnMsIG9wdGlvbnMpO1xuXHRcdFx0TC5UaWxlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBwcm92aWRlci51cmwsIGxheWVyT3B0cyk7XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogRGVmaW5pdGlvbiBvZiBwcm92aWRlcnMuXG5cdCAqIHNlZSBodHRwOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UuaHRtbCN0aWxlbGF5ZXIgZm9yIG9wdGlvbnMgaW4gdGhlIG9wdGlvbnMgbWFwLlxuXHQgKi9cblxuXHRMLlRpbGVMYXllci5Qcm92aWRlci5wcm92aWRlcnMgPSB7XG5cdFx0T3BlblN0cmVldE1hcDoge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtYXhab29tOiAxOSxcblx0XHRcdFx0YXR0cmlidXRpb246XG5cdFx0XHRcdFx0JyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xuXHRcdFx0fSxcblx0XHRcdHZhcmlhbnRzOiB7XG5cdFx0XHRcdE1hcG5pazoge30sXG5cdFx0XHRcdERFOiB7XG5cdFx0XHRcdFx0dXJsOiAnaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLmRlL3RpbGVzL29zbWRlL3t6fS97eH0ve3l9LnBuZycsXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0bWF4Wm9vbTogMThcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdENIOiB7XG5cdFx0XHRcdFx0dXJsOiAnaHR0cHM6Ly90aWxlLm9zbS5jaC9zd2l0emVybGFuZC97en0ve3h9L3t5fS5wbmcnLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdG1heFpvb206IDE4LFxuXHRcdFx0XHRcdFx0Ym91bmRzOiBbWzQ1LCA1XSwgWzQ4LCAxMV1dXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRGcmFuY2U6IHtcblx0XHRcdFx0XHR1cmw6ICdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAuZnIvb3NtZnIve3p9L3t4fS97eX0ucG5nJyxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRtYXhab29tOiAyMCxcblx0XHRcdFx0XHRcdGF0dHJpYnV0aW9uOiAnJmNvcHk7IE9wZW5zdHJlZXRtYXAgRnJhbmNlIHwge2F0dHJpYnV0aW9uLk9wZW5TdHJlZXRNYXB9J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0SE9UOiB7XG5cdFx0XHRcdFx0dXJsOiAnaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLmZyL2hvdC97en0ve3h9L3t5fS5wbmcnLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGF0dHJpYnV0aW9uOlxuXHRcdFx0XHRcdFx0XHQne2F0dHJpYnV0aW9uLk9wZW5TdHJlZXRNYXB9LCAnICtcblx0XHRcdFx0XHRcdFx0J1RpbGVzIHN0eWxlIGJ5IDxhIGhyZWY9XCJodHRwczovL3d3dy5ob3Rvc20ub3JnL1wiIHRhcmdldD1cIl9ibGFua1wiPkh1bWFuaXRhcmlhbiBPcGVuU3RyZWV0TWFwIFRlYW08L2E+ICcgK1xuXHRcdFx0XHRcdFx0XHQnaG9zdGVkIGJ5IDxhIGhyZWY9XCJodHRwczovL29wZW5zdHJlZXRtYXAuZnIvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+T3BlblN0cmVldE1hcCBGcmFuY2U8L2E+J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0QlpIOiB7XG5cdFx0XHRcdFx0dXJsOiAnaHR0cHM6Ly90aWxlLm9wZW5zdHJlZXRtYXAuYnpoL2JyL3t6fS97eH0ve3l9LnBuZycsXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0YXR0cmlidXRpb246ICd7YXR0cmlidXRpb24uT3BlblN0cmVldE1hcH0sIFRpbGVzIGNvdXJ0ZXN5IG9mIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5zdHJlZXRtYXAuYnpoL1wiIHRhcmdldD1cIl9ibGFua1wiPkJyZXRvbiBPcGVuU3RyZWV0TWFwIFRlYW08L2E+Jyxcblx0XHRcdFx0XHRcdGJvdW5kczogW1s0Ni4yLCAtNS41XSwgWzUwLCAwLjddXVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0T3BlblNlYU1hcDoge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly90aWxlcy5vcGVuc2VhbWFwLm9yZy9zZWFtYXJrL3t6fS97eH0ve3l9LnBuZycsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGF0dHJpYnV0aW9uOiAnTWFwIGRhdGE6ICZjb3B5OyA8YSBocmVmPVwiaHR0cDovL3d3dy5vcGVuc2VhbWFwLm9yZ1wiPk9wZW5TZWFNYXA8L2E+IGNvbnRyaWJ1dG9ycydcblx0XHRcdH1cblx0XHR9LFxuXHRcdE9wZW5QdE1hcDoge1xuXHRcdFx0dXJsOiAnaHR0cDovL29wZW5wdG1hcC5vcmcvdGlsZXMve3p9L3t4fS97eX0ucG5nJyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0bWF4Wm9vbTogMTcsXG5cdFx0XHRcdGF0dHJpYnV0aW9uOiAnTWFwIGRhdGE6ICZjb3B5OyA8YSBocmVmPVwiaHR0cDovL3d3dy5vcGVucHRtYXAub3JnXCI+T3BlblB0TWFwPC9hPiBjb250cmlidXRvcnMnXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRPcGVuVG9wb01hcDoge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly97c30udGlsZS5vcGVudG9wb21hcC5vcmcve3p9L3t4fS97eX0ucG5nJyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0bWF4Wm9vbTogMTcsXG5cdFx0XHRcdGF0dHJpYnV0aW9uOiAnTWFwIGRhdGE6IHthdHRyaWJ1dGlvbi5PcGVuU3RyZWV0TWFwfSwgPGEgaHJlZj1cImh0dHA6Ly92aWV3ZmluZGVycGFub3JhbWFzLm9yZ1wiPlNSVE08L2E+IHwgTWFwIHN0eWxlOiAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vb3BlbnRvcG9tYXAub3JnXCI+T3BlblRvcG9NYXA8L2E+ICg8YSBocmVmPVwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzMuMC9cIj5DQy1CWS1TQTwvYT4pJ1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0T3BlblJhaWx3YXlNYXA6IHtcblx0XHRcdHVybDogJ2h0dHBzOi8ve3N9LnRpbGVzLm9wZW5yYWlsd2F5bWFwLm9yZy9zdGFuZGFyZC97en0ve3h9L3t5fS5wbmcnLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtYXhab29tOiAxOSxcblx0XHRcdFx0YXR0cmlidXRpb246ICdNYXAgZGF0YToge2F0dHJpYnV0aW9uLk9wZW5TdHJlZXRNYXB9IHwgTWFwIHN0eWxlOiAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lk9wZW5SYWlsd2F5TWFwLm9yZ1wiPk9wZW5SYWlsd2F5TWFwPC9hPiAoPGEgaHJlZj1cImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8zLjAvXCI+Q0MtQlktU0E8L2E+KSdcblx0XHRcdH1cblx0XHR9LFxuXHRcdE9wZW5GaXJlTWFwOiB7XG5cdFx0XHR1cmw6ICdodHRwOi8vb3BlbmZpcmVtYXAub3JnL2h5dGlsZXMve3p9L3t4fS97eX0ucG5nJyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0bWF4Wm9vbTogMTksXG5cdFx0XHRcdGF0dHJpYnV0aW9uOiAnTWFwIGRhdGE6IHthdHRyaWJ1dGlvbi5PcGVuU3RyZWV0TWFwfSB8IE1hcCBzdHlsZTogJmNvcHk7IDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5maXJlbWFwLm9yZ1wiPk9wZW5GaXJlTWFwPC9hPiAoPGEgaHJlZj1cImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8zLjAvXCI+Q0MtQlktU0E8L2E+KSdcblx0XHRcdH1cblx0XHR9LFxuXHRcdFNhZmVDYXN0OiB7XG5cdFx0XHR1cmw6ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vdGU1MTIuc2FmZWNhc3Qub3JnL3t6fS97eH0ve3l9LnBuZycsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1heFpvb206IDE2LFxuXHRcdFx0XHRhdHRyaWJ1dGlvbjogJ01hcCBkYXRhOiB7YXR0cmlidXRpb24uT3BlblN0cmVldE1hcH0gfCBNYXAgc3R5bGU6ICZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly9ibG9nLnNhZmVjYXN0Lm9yZy9hYm91dC9cIj5TYWZlQ2FzdDwvYT4gKDxhIGhyZWY9XCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMy4wL1wiPkNDLUJZLVNBPC9hPiknXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRTdGFkaWE6IHtcblx0XHRcdHVybDogJ2h0dHBzOi8vdGlsZXMuc3RhZGlhbWFwcy5jb20vdGlsZXMvYWxpZGFkZV9zbW9vdGgve3p9L3t4fS97eX17cn0ucG5nJyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0bWF4Wm9vbTogMjAsXG5cdFx0XHRcdGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3N0YWRpYW1hcHMuY29tL1wiPlN0YWRpYSBNYXBzPC9hPiwgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL29wZW5tYXB0aWxlcy5vcmcvXCI+T3Blbk1hcFRpbGVzPC9hPiAmY29weTsgPGEgaHJlZj1cImh0dHA6Ly9vcGVuc3RyZWV0bWFwLm9yZ1wiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcblx0XHRcdH0sXG5cdFx0XHR2YXJpYW50czoge1xuXHRcdFx0XHRBbGlkYWRlU21vb3RoOiB7XG5cdFx0XHRcdFx0dXJsOiAnaHR0cHM6Ly90aWxlcy5zdGFkaWFtYXBzLmNvbS90aWxlcy9hbGlkYWRlX3Ntb290aC97en0ve3h9L3t5fXtyfS5wbmcnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdEFsaWRhZGVTbW9vdGhEYXJrOiB7XG5cdFx0XHRcdFx0dXJsOiAnaHR0cHM6Ly90aWxlcy5zdGFkaWFtYXBzLmNvbS90aWxlcy9hbGlkYWRlX3Ntb290aF9kYXJrL3t6fS97eH0ve3l9e3J9LnBuZydcblx0XHRcdFx0fSxcblx0XHRcdFx0T1NNQnJpZ2h0OiB7XG5cdFx0XHRcdFx0dXJsOiAnaHR0cHM6Ly90aWxlcy5zdGFkaWFtYXBzLmNvbS90aWxlcy9vc21fYnJpZ2h0L3t6fS97eH0ve3l9e3J9LnBuZydcblx0XHRcdFx0fSxcblx0XHRcdFx0T3V0ZG9vcnM6IHtcblx0XHRcdFx0XHR1cmw6ICdodHRwczovL3RpbGVzLnN0YWRpYW1hcHMuY29tL3RpbGVzL291dGRvb3JzL3t6fS97eH0ve3l9e3J9LnBuZydcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0VGh1bmRlcmZvcmVzdDoge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly97c30udGlsZS50aHVuZGVyZm9yZXN0LmNvbS97dmFyaWFudH0ve3p9L3t4fS97eX0ucG5nP2FwaWtleT17YXBpa2V5fScsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGF0dHJpYnV0aW9uOlxuXHRcdFx0XHRcdCcmY29weTsgPGEgaHJlZj1cImh0dHA6Ly93d3cudGh1bmRlcmZvcmVzdC5jb20vXCI+VGh1bmRlcmZvcmVzdDwvYT4sIHthdHRyaWJ1dGlvbi5PcGVuU3RyZWV0TWFwfScsXG5cdFx0XHRcdHZhcmlhbnQ6ICdjeWNsZScsXG5cdFx0XHRcdGFwaWtleTogJzxpbnNlcnQgeW91ciBhcGkga2V5IGhlcmU+Jyxcblx0XHRcdFx0bWF4Wm9vbTogMjJcblx0XHRcdH0sXG5cdFx0XHR2YXJpYW50czoge1xuXHRcdFx0XHRPcGVuQ3ljbGVNYXA6ICdjeWNsZScsXG5cdFx0XHRcdFRyYW5zcG9ydDoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICd0cmFuc3BvcnQnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRUcmFuc3BvcnREYXJrOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ3RyYW5zcG9ydC1kYXJrJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0U3BpbmFsTWFwOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ3NwaW5hbC1tYXAnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRMYW5kc2NhcGU6ICdsYW5kc2NhcGUnLFxuXHRcdFx0XHRPdXRkb29yczogJ291dGRvb3JzJyxcblx0XHRcdFx0UGlvbmVlcjogJ3Bpb25lZXInLFxuXHRcdFx0XHRNb2JpbGVBdGxhczogJ21vYmlsZS1hdGxhcycsXG5cdFx0XHRcdE5laWdoYm91cmhvb2Q6ICduZWlnaGJvdXJob29kJ1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Q3ljbE9TTToge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly9kZXYue3N9LnRpbGUub3BlbnN0cmVldG1hcC5mci9jeWNsb3NtL3t6fS97eH0ve3l9LnBuZycsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1heFpvb206IDIwLFxuXHRcdFx0XHRhdHRyaWJ1dGlvbjogJzxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vY3ljbG9zbS9jeWNsb3NtLWNhcnRvY3NzLXN0eWxlL3JlbGVhc2VzXCIgdGl0bGU9XCJDeWNsT1NNIC0gT3BlbiBCaWN5Y2xlIHJlbmRlclwiPkN5Y2xPU008L2E+IHwgTWFwIGRhdGE6IHthdHRyaWJ1dGlvbi5PcGVuU3RyZWV0TWFwfSdcblx0XHRcdH1cblx0XHR9LFxuXHRcdEh5ZGRhOiB7XG5cdFx0XHR1cmw6ICdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAuc2UvaHlkZGEve3ZhcmlhbnR9L3t6fS97eH0ve3l9LnBuZycsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1heFpvb206IDIwLFxuXHRcdFx0XHR2YXJpYW50OiAnZnVsbCcsXG5cdFx0XHRcdGF0dHJpYnV0aW9uOiAnVGlsZXMgY291cnRlc3kgb2YgPGEgaHJlZj1cImh0dHA6Ly9vcGVuc3RyZWV0bWFwLnNlL1wiIHRhcmdldD1cIl9ibGFua1wiPk9wZW5TdHJlZXRNYXAgU3dlZGVuPC9hPiAmbWRhc2g7IE1hcCBkYXRhIHthdHRyaWJ1dGlvbi5PcGVuU3RyZWV0TWFwfSdcblx0XHRcdH0sXG5cdFx0XHR2YXJpYW50czoge1xuXHRcdFx0XHRGdWxsOiAnZnVsbCcsXG5cdFx0XHRcdEJhc2U6ICdiYXNlJyxcblx0XHRcdFx0Um9hZHNBbmRMYWJlbHM6ICdyb2Fkc19hbmRfbGFiZWxzJ1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0SmF3Zzoge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly97c30udGlsZS5qYXdnLmlvL3t2YXJpYW50fS97en0ve3h9L3t5fXtyfS5wbmc/YWNjZXNzLXRva2VuPXthY2Nlc3NUb2tlbn0nLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRhdHRyaWJ1dGlvbjpcblx0XHRcdFx0XHQnPGEgaHJlZj1cImh0dHA6Ly9qYXdnLmlvXCIgdGl0bGU9XCJUaWxlcyBDb3VydGVzeSBvZiBKYXdnIE1hcHNcIiB0YXJnZXQ9XCJfYmxhbmtcIj4mY29weTsgPGI+SmF3ZzwvYj5NYXBzPC9hPiAnICtcblx0XHRcdFx0XHQne2F0dHJpYnV0aW9uLk9wZW5TdHJlZXRNYXB9Jyxcblx0XHRcdFx0bWluWm9vbTogMCxcblx0XHRcdFx0bWF4Wm9vbTogMjIsXG5cdFx0XHRcdHN1YmRvbWFpbnM6ICdhYmNkJyxcblx0XHRcdFx0dmFyaWFudDogJ2phd2ctdGVycmFpbicsXG5cdFx0XHRcdC8vIEdldCB5b3VyIG93biBKYXdnIGFjY2VzcyB0b2tlbiBoZXJlIDogaHR0cHM6Ly93d3cuamF3Zy5pby9sYWIvXG5cdFx0XHRcdC8vIE5CIDogdGhpcyBpcyBhIGRlbW9uc3RyYXRpb24ga2V5IHRoYXQgY29tZXMgd2l0aCBubyBndWFyYW50ZWVcblx0XHRcdFx0YWNjZXNzVG9rZW46ICc8aW5zZXJ0IHlvdXIgYWNjZXNzIHRva2VuIGhlcmU+Jyxcblx0XHRcdH0sXG5cdFx0XHR2YXJpYW50czoge1xuXHRcdFx0XHRTdHJlZXRzOiAnamF3Zy1zdHJlZXRzJyxcblx0XHRcdFx0VGVycmFpbjogJ2phd2ctdGVycmFpbicsXG5cdFx0XHRcdFN1bm55OiAnamF3Zy1zdW5ueScsXG5cdFx0XHRcdERhcms6ICdqYXdnLWRhcmsnLFxuXHRcdFx0XHRMaWdodDogJ2phd2ctbGlnaHQnLFxuXHRcdFx0XHRNYXRyaXg6ICdqYXdnLW1hdHJpeCdcblx0XHRcdH1cblx0XHR9LFxuXHRcdE1hcEJveDoge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly9hcGkubWFwYm94LmNvbS9zdHlsZXMvdjEve2lkfS90aWxlcy97en0ve3h9L3t5fXtyfT9hY2Nlc3NfdG9rZW49e2FjY2Vzc1Rva2VufScsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGF0dHJpYnV0aW9uOlxuXHRcdFx0XHRcdCcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vYWJvdXQvbWFwcy9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5NYXBib3g8L2E+ICcgK1xuXHRcdFx0XHRcdCd7YXR0cmlidXRpb24uT3BlblN0cmVldE1hcH0gJyArXG5cdFx0XHRcdFx0JzxhIGhyZWY9XCJodHRwczovL3d3dy5tYXBib3guY29tL21hcC1mZWVkYmFjay9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5JbXByb3ZlIHRoaXMgbWFwPC9hPicsXG5cdFx0XHRcdHRpbGVTaXplOiA1MTIsXG5cdFx0XHRcdG1heFpvb206IDE4LFxuXHRcdFx0XHR6b29tT2Zmc2V0OiAtMSxcblx0XHRcdFx0aWQ6ICdtYXBib3gvc3RyZWV0cy12MTEnLFxuXHRcdFx0XHRhY2Nlc3NUb2tlbjogJzxpbnNlcnQgeW91ciBhY2Nlc3MgdG9rZW4gaGVyZT4nLFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0TWFwVGlsZXI6IHtcblx0XHRcdHVybDogJ2h0dHBzOi8vYXBpLm1hcHRpbGVyLmNvbS9tYXBzL3t2YXJpYW50fS97en0ve3h9L3t5fXtyfS57ZXh0fT9rZXk9e2tleX0nLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRhdHRyaWJ1dGlvbjpcblx0XHRcdFx0XHQnPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcHRpbGVyLmNvbS9jb3B5cmlnaHQvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JmNvcHk7IE1hcFRpbGVyPC9hPiA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JmNvcHk7IE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzPC9hPicsXG5cdFx0XHRcdHZhcmlhbnQ6ICdzdHJlZXRzJyxcblx0XHRcdFx0ZXh0OiAncG5nJyxcblx0XHRcdFx0a2V5OiAnPGluc2VydCB5b3VyIE1hcFRpbGVyIENsb3VkIEFQSSBrZXkgaGVyZT4nLFxuXHRcdFx0XHR0aWxlU2l6ZTogNTEyLFxuXHRcdFx0XHR6b29tT2Zmc2V0OiAtMSxcblx0XHRcdFx0bWluWm9vbTogMCxcblx0XHRcdFx0bWF4Wm9vbTogMjFcblx0XHRcdH0sXG5cdFx0XHR2YXJpYW50czoge1xuXHRcdFx0XHRTdHJlZXRzOiAnc3RyZWV0cycsXG5cdFx0XHRcdEJhc2ljOiAnYmFzaWMnLFxuXHRcdFx0XHRCcmlnaHQ6ICdicmlnaHQnLFxuXHRcdFx0XHRQYXN0ZWw6ICdwYXN0ZWwnLFxuXHRcdFx0XHRQb3NpdHJvbjogJ3Bvc2l0cm9uJyxcblx0XHRcdFx0SHlicmlkOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ2h5YnJpZCcsXG5cdFx0XHRcdFx0XHRleHQ6ICdqcGcnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRUb25lcjogJ3RvbmVyJyxcblx0XHRcdFx0VG9wbzogJ3RvcG8nLFxuXHRcdFx0XHRWb3lhZ2VyOiAndm95YWdlcidcblx0XHRcdH1cblx0XHR9LFxuXHRcdFN0YW1lbjoge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly9zdGFtZW4tdGlsZXMte3N9LmEuc3NsLmZhc3RseS5uZXQve3ZhcmlhbnR9L3t6fS97eH0ve3l9e3J9LntleHR9Jyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0YXR0cmlidXRpb246XG5cdFx0XHRcdFx0J01hcCB0aWxlcyBieSA8YSBocmVmPVwiaHR0cDovL3N0YW1lbi5jb21cIj5TdGFtZW4gRGVzaWduPC9hPiwgJyArXG5cdFx0XHRcdFx0JzxhIGhyZWY9XCJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS8zLjBcIj5DQyBCWSAzLjA8L2E+ICZtZGFzaDsgJyArXG5cdFx0XHRcdFx0J01hcCBkYXRhIHthdHRyaWJ1dGlvbi5PcGVuU3RyZWV0TWFwfScsXG5cdFx0XHRcdHN1YmRvbWFpbnM6ICdhYmNkJyxcblx0XHRcdFx0bWluWm9vbTogMCxcblx0XHRcdFx0bWF4Wm9vbTogMjAsXG5cdFx0XHRcdHZhcmlhbnQ6ICd0b25lcicsXG5cdFx0XHRcdGV4dDogJ3BuZydcblx0XHRcdH0sXG5cdFx0XHR2YXJpYW50czoge1xuXHRcdFx0XHRUb25lcjogJ3RvbmVyJyxcblx0XHRcdFx0VG9uZXJCYWNrZ3JvdW5kOiAndG9uZXItYmFja2dyb3VuZCcsXG5cdFx0XHRcdFRvbmVySHlicmlkOiAndG9uZXItaHlicmlkJyxcblx0XHRcdFx0VG9uZXJMaW5lczogJ3RvbmVyLWxpbmVzJyxcblx0XHRcdFx0VG9uZXJMYWJlbHM6ICd0b25lci1sYWJlbHMnLFxuXHRcdFx0XHRUb25lckxpdGU6ICd0b25lci1saXRlJyxcblx0XHRcdFx0V2F0ZXJjb2xvcjoge1xuXHRcdFx0XHRcdHVybDogJ2h0dHBzOi8vc3RhbWVuLXRpbGVzLXtzfS5hLnNzbC5mYXN0bHkubmV0L3t2YXJpYW50fS97en0ve3h9L3t5fS57ZXh0fScsXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ3dhdGVyY29sb3InLFxuXHRcdFx0XHRcdFx0ZXh0OiAnanBnJyxcblx0XHRcdFx0XHRcdG1pblpvb206IDEsXG5cdFx0XHRcdFx0XHRtYXhab29tOiAxNlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0VGVycmFpbjoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICd0ZXJyYWluJyxcblx0XHRcdFx0XHRcdG1pblpvb206IDAsXG5cdFx0XHRcdFx0XHRtYXhab29tOiAxOFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0VGVycmFpbkJhY2tncm91bmQ6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR2YXJpYW50OiAndGVycmFpbi1iYWNrZ3JvdW5kJyxcblx0XHRcdFx0XHRcdG1pblpvb206IDAsXG5cdFx0XHRcdFx0XHRtYXhab29tOiAxOFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0VGVycmFpbkxhYmVsczoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICd0ZXJyYWluLWxhYmVscycsXG5cdFx0XHRcdFx0XHRtaW5ab29tOiAwLFxuXHRcdFx0XHRcdFx0bWF4Wm9vbTogMThcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFRvcE9TTVJlbGllZjoge1xuXHRcdFx0XHRcdHVybDogJ2h0dHBzOi8vc3RhbWVuLXRpbGVzLXtzfS5hLnNzbC5mYXN0bHkubmV0L3t2YXJpYW50fS97en0ve3h9L3t5fS57ZXh0fScsXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ3RvcG9zbS1jb2xvci1yZWxpZWYnLFxuXHRcdFx0XHRcdFx0ZXh0OiAnanBnJyxcblx0XHRcdFx0XHRcdGJvdW5kczogW1syMiwgLTEzMl0sIFs1MSwgLTU2XV1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFRvcE9TTUZlYXR1cmVzOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ3RvcG9zbS1mZWF0dXJlcycsXG5cdFx0XHRcdFx0XHRib3VuZHM6IFtbMjIsIC0xMzJdLCBbNTEsIC01Nl1dLFxuXHRcdFx0XHRcdFx0b3BhY2l0eTogMC45XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRUb21Ub206IHtcblx0XHRcdHVybDogJ2h0dHBzOi8ve3N9LmFwaS50b210b20uY29tL21hcC8xL3RpbGUve3ZhcmlhbnR9L3tzdHlsZX0ve3p9L3t4fS97eX0ue2V4dH0/a2V5PXthcGlrZXl9Jyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0dmFyaWFudDogJ2Jhc2ljJyxcblx0XHRcdFx0bWF4Wm9vbTogMjIsXG5cdFx0XHRcdGF0dHJpYnV0aW9uOlxuXHRcdFx0XHRcdCc8YSBocmVmPVwiaHR0cHM6Ly90b210b20uY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JmNvcHk7ICAxOTkyIC0gJyArIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArICcgVG9tVG9tLjwvYT4gJyxcblx0XHRcdFx0c3ViZG9tYWluczogJ2FiY2QnLFxuXHRcdFx0XHRzdHlsZTogJ21haW4nLFxuXHRcdFx0XHRleHQ6ICdwbmcnLFxuXHRcdFx0XHRhcGlrZXk6ICc8aW5zZXJ0IHlvdXIgQVBJIGtleSBoZXJlPicsXG5cdFx0XHR9LFxuXHRcdFx0dmFyaWFudHM6IHtcblx0XHRcdFx0QmFzaWM6ICdiYXNpYycsXG5cdFx0XHRcdEh5YnJpZDogJ2h5YnJpZCcsXG5cdFx0XHRcdExhYmVsczogJ2xhYmVscydcblx0XHRcdH1cblx0XHR9LFxuXHRcdEVzcmk6IHtcblx0XHRcdHVybDogJ2h0dHBzOi8vc2VydmVyLmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMve3ZhcmlhbnR9L01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9Jyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0dmFyaWFudDogJ1dvcmxkX1N0cmVldF9NYXAnLFxuXHRcdFx0XHRhdHRyaWJ1dGlvbjogJ1RpbGVzICZjb3B5OyBFc3JpJ1xuXHRcdFx0fSxcblx0XHRcdHZhcmlhbnRzOiB7XG5cdFx0XHRcdFdvcmxkU3RyZWV0TWFwOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0YXR0cmlidXRpb246XG5cdFx0XHRcdFx0XHRcdCd7YXR0cmlidXRpb24uRXNyaX0gJm1kYXNoOyAnICtcblx0XHRcdFx0XHRcdFx0J1NvdXJjZTogRXNyaSwgRGVMb3JtZSwgTkFWVEVRLCBVU0dTLCBJbnRlcm1hcCwgaVBDLCBOUkNBTiwgRXNyaSBKYXBhbiwgTUVUSSwgRXNyaSBDaGluYSAoSG9uZyBLb25nKSwgRXNyaSAoVGhhaWxhbmQpLCBUb21Ub20sIDIwMTInXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHREZUxvcm1lOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ1NwZWNpYWx0eS9EZUxvcm1lX1dvcmxkX0Jhc2VfTWFwJyxcblx0XHRcdFx0XHRcdG1pblpvb206IDEsXG5cdFx0XHRcdFx0XHRtYXhab29tOiAxMSxcblx0XHRcdFx0XHRcdGF0dHJpYnV0aW9uOiAne2F0dHJpYnV0aW9uLkVzcml9ICZtZGFzaDsgQ29weXJpZ2h0OiAmY29weTsyMDEyIERlTG9ybWUnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRXb3JsZFRvcG9NYXA6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnV29ybGRfVG9wb19NYXAnLFxuXHRcdFx0XHRcdFx0YXR0cmlidXRpb246XG5cdFx0XHRcdFx0XHRcdCd7YXR0cmlidXRpb24uRXNyaX0gJm1kYXNoOyAnICtcblx0XHRcdFx0XHRcdFx0J0VzcmksIERlTG9ybWUsIE5BVlRFUSwgVG9tVG9tLCBJbnRlcm1hcCwgaVBDLCBVU0dTLCBGQU8sIE5QUywgTlJDQU4sIEdlb0Jhc2UsIEthZGFzdGVyIE5MLCBPcmRuYW5jZSBTdXJ2ZXksIEVzcmkgSmFwYW4sIE1FVEksIEVzcmkgQ2hpbmEgKEhvbmcgS29uZyksIGFuZCB0aGUgR0lTIFVzZXIgQ29tbXVuaXR5J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0V29ybGRJbWFnZXJ5OiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ1dvcmxkX0ltYWdlcnknLFxuXHRcdFx0XHRcdFx0YXR0cmlidXRpb246XG5cdFx0XHRcdFx0XHRcdCd7YXR0cmlidXRpb24uRXNyaX0gJm1kYXNoOyAnICtcblx0XHRcdFx0XHRcdFx0J1NvdXJjZTogRXNyaSwgaS1jdWJlZCwgVVNEQSwgVVNHUywgQUVYLCBHZW9FeWUsIEdldG1hcHBpbmcsIEFlcm9ncmlkLCBJR04sIElHUCwgVVBSLUVHUCwgYW5kIHRoZSBHSVMgVXNlciBDb21tdW5pdHknXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRXb3JsZFRlcnJhaW46IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnV29ybGRfVGVycmFpbl9CYXNlJyxcblx0XHRcdFx0XHRcdG1heFpvb206IDEzLFxuXHRcdFx0XHRcdFx0YXR0cmlidXRpb246XG5cdFx0XHRcdFx0XHRcdCd7YXR0cmlidXRpb24uRXNyaX0gJm1kYXNoOyAnICtcblx0XHRcdFx0XHRcdFx0J1NvdXJjZTogVVNHUywgRXNyaSwgVEFOQSwgRGVMb3JtZSwgYW5kIE5QUydcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFdvcmxkU2hhZGVkUmVsaWVmOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ1dvcmxkX1NoYWRlZF9SZWxpZWYnLFxuXHRcdFx0XHRcdFx0bWF4Wm9vbTogMTMsXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGlvbjogJ3thdHRyaWJ1dGlvbi5Fc3JpfSAmbWRhc2g7IFNvdXJjZTogRXNyaSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFdvcmxkUGh5c2ljYWw6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnV29ybGRfUGh5c2ljYWxfTWFwJyxcblx0XHRcdFx0XHRcdG1heFpvb206IDgsXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGlvbjogJ3thdHRyaWJ1dGlvbi5Fc3JpfSAmbWRhc2g7IFNvdXJjZTogVVMgTmF0aW9uYWwgUGFyayBTZXJ2aWNlJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0T2NlYW5CYXNlbWFwOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ09jZWFuX0Jhc2VtYXAnLFxuXHRcdFx0XHRcdFx0bWF4Wm9vbTogMTMsXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGlvbjogJ3thdHRyaWJ1dGlvbi5Fc3JpfSAmbWRhc2g7IFNvdXJjZXM6IEdFQkNPLCBOT0FBLCBDSFMsIE9TVSwgVU5ILCBDU1VNQiwgTmF0aW9uYWwgR2VvZ3JhcGhpYywgRGVMb3JtZSwgTkFWVEVRLCBhbmQgRXNyaSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdE5hdEdlb1dvcmxkTWFwOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ05hdEdlb19Xb3JsZF9NYXAnLFxuXHRcdFx0XHRcdFx0bWF4Wm9vbTogMTYsXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGlvbjogJ3thdHRyaWJ1dGlvbi5Fc3JpfSAmbWRhc2g7IE5hdGlvbmFsIEdlb2dyYXBoaWMsIEVzcmksIERlTG9ybWUsIE5BVlRFUSwgVU5FUC1XQ01DLCBVU0dTLCBOQVNBLCBFU0EsIE1FVEksIE5SQ0FOLCBHRUJDTywgTk9BQSwgaVBDJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0V29ybGRHcmF5Q2FudmFzOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ0NhbnZhcy9Xb3JsZF9MaWdodF9HcmF5X0Jhc2UnLFxuXHRcdFx0XHRcdFx0bWF4Wm9vbTogMTYsXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGlvbjogJ3thdHRyaWJ1dGlvbi5Fc3JpfSAmbWRhc2g7IEVzcmksIERlTG9ybWUsIE5BVlRFUSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdE9wZW5XZWF0aGVyTWFwOiB7XG5cdFx0XHR1cmw6ICdodHRwOi8ve3N9LnRpbGUub3BlbndlYXRoZXJtYXAub3JnL21hcC97dmFyaWFudH0ve3p9L3t4fS97eX0ucG5nP2FwcGlkPXthcGlLZXl9Jyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0bWF4Wm9vbTogMTksXG5cdFx0XHRcdGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnXCI+T3BlbldlYXRoZXJNYXA8L2E+Jyxcblx0XHRcdFx0YXBpS2V5Oic8aW5zZXJ0IHlvdXIgYXBpIGtleSBoZXJlPicsXG5cdFx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0fSxcblx0XHRcdHZhcmlhbnRzOiB7XG5cdFx0XHRcdENsb3VkczogJ2Nsb3VkcycsXG5cdFx0XHRcdENsb3Vkc0NsYXNzaWM6ICdjbG91ZHNfY2xzJyxcblx0XHRcdFx0UHJlY2lwaXRhdGlvbjogJ3ByZWNpcGl0YXRpb24nLFxuXHRcdFx0XHRQcmVjaXBpdGF0aW9uQ2xhc3NpYzogJ3ByZWNpcGl0YXRpb25fY2xzJyxcblx0XHRcdFx0UmFpbjogJ3JhaW4nLFxuXHRcdFx0XHRSYWluQ2xhc3NpYzogJ3JhaW5fY2xzJyxcblx0XHRcdFx0UHJlc3N1cmU6ICdwcmVzc3VyZScsXG5cdFx0XHRcdFByZXNzdXJlQ29udG91cjogJ3ByZXNzdXJlX2NudHInLFxuXHRcdFx0XHRXaW5kOiAnd2luZCcsXG5cdFx0XHRcdFRlbXBlcmF0dXJlOiAndGVtcCcsXG5cdFx0XHRcdFNub3c6ICdzbm93J1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0SEVSRToge1xuXHRcdFx0Lypcblx0XHRcdCAqIEhFUkUgbWFwcywgZm9ybWVybHkgTm9raWEgbWFwcy5cblx0XHRcdCAqIFRoZXNlIGJhc2VtYXBzIGFyZSBmcmVlLCBidXQgeW91IG5lZWQgYW4gYXBpIGlkIGFuZCBhcHAga2V5LiBQbGVhc2Ugc2lnbiB1cCBhdFxuXHRcdFx0ICogaHR0cHM6Ly9kZXZlbG9wZXIuaGVyZS5jb20vcGxhbnNcblx0XHRcdCAqL1xuXHRcdFx0dXJsOlxuXHRcdFx0XHQnaHR0cHM6Ly97c30ue2Jhc2V9Lm1hcHMuYXBpLmhlcmUuY29tL21hcHRpbGUvMi4xLycgK1xuXHRcdFx0XHQne3R5cGV9L3ttYXBJRH0ve3ZhcmlhbnR9L3t6fS97eH0ve3l9L3tzaXplfS97Zm9ybWF0fT8nICtcblx0XHRcdFx0J2FwcF9pZD17YXBwX2lkfSZhcHBfY29kZT17YXBwX2NvZGV9JmxnPXtsYW5ndWFnZX0nLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRhdHRyaWJ1dGlvbjpcblx0XHRcdFx0XHQnTWFwICZjb3B5OyAxOTg3LScgKyBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAnIDxhIGhyZWY9XCJodHRwOi8vZGV2ZWxvcGVyLmhlcmUuY29tXCI+SEVSRTwvYT4nLFxuXHRcdFx0XHRzdWJkb21haW5zOiAnMTIzNCcsXG5cdFx0XHRcdG1hcElEOiAnbmV3ZXN0Jyxcblx0XHRcdFx0J2FwcF9pZCc6ICc8aW5zZXJ0IHlvdXIgYXBwX2lkIGhlcmU+Jyxcblx0XHRcdFx0J2FwcF9jb2RlJzogJzxpbnNlcnQgeW91ciBhcHBfY29kZSBoZXJlPicsXG5cdFx0XHRcdGJhc2U6ICdiYXNlJyxcblx0XHRcdFx0dmFyaWFudDogJ25vcm1hbC5kYXknLFxuXHRcdFx0XHRtYXhab29tOiAyMCxcblx0XHRcdFx0dHlwZTogJ21hcHRpbGUnLFxuXHRcdFx0XHRsYW5ndWFnZTogJ2VuZycsXG5cdFx0XHRcdGZvcm1hdDogJ3BuZzgnLFxuXHRcdFx0XHRzaXplOiAnMjU2J1xuXHRcdFx0fSxcblx0XHRcdHZhcmlhbnRzOiB7XG5cdFx0XHRcdG5vcm1hbERheTogJ25vcm1hbC5kYXknLFxuXHRcdFx0XHRub3JtYWxEYXlDdXN0b206ICdub3JtYWwuZGF5LmN1c3RvbScsXG5cdFx0XHRcdG5vcm1hbERheUdyZXk6ICdub3JtYWwuZGF5LmdyZXknLFxuXHRcdFx0XHRub3JtYWxEYXlNb2JpbGU6ICdub3JtYWwuZGF5Lm1vYmlsZScsXG5cdFx0XHRcdG5vcm1hbERheUdyZXlNb2JpbGU6ICdub3JtYWwuZGF5LmdyZXkubW9iaWxlJyxcblx0XHRcdFx0bm9ybWFsRGF5VHJhbnNpdDogJ25vcm1hbC5kYXkudHJhbnNpdCcsXG5cdFx0XHRcdG5vcm1hbERheVRyYW5zaXRNb2JpbGU6ICdub3JtYWwuZGF5LnRyYW5zaXQubW9iaWxlJyxcblx0XHRcdFx0bm9ybWFsRGF5VHJhZmZpYzoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICdub3JtYWwudHJhZmZpYy5kYXknLFxuXHRcdFx0XHRcdFx0YmFzZTogJ3RyYWZmaWMnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3RyYWZmaWN0aWxlJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0bm9ybWFsTmlnaHQ6ICdub3JtYWwubmlnaHQnLFxuXHRcdFx0XHRub3JtYWxOaWdodE1vYmlsZTogJ25vcm1hbC5uaWdodC5tb2JpbGUnLFxuXHRcdFx0XHRub3JtYWxOaWdodEdyZXk6ICdub3JtYWwubmlnaHQuZ3JleScsXG5cdFx0XHRcdG5vcm1hbE5pZ2h0R3JleU1vYmlsZTogJ25vcm1hbC5uaWdodC5ncmV5Lm1vYmlsZScsXG5cdFx0XHRcdG5vcm1hbE5pZ2h0VHJhbnNpdDogJ25vcm1hbC5uaWdodC50cmFuc2l0Jyxcblx0XHRcdFx0bm9ybWFsTmlnaHRUcmFuc2l0TW9iaWxlOiAnbm9ybWFsLm5pZ2h0LnRyYW5zaXQubW9iaWxlJyxcblx0XHRcdFx0cmVkdWNlZERheTogJ3JlZHVjZWQuZGF5Jyxcblx0XHRcdFx0cmVkdWNlZE5pZ2h0OiAncmVkdWNlZC5uaWdodCcsXG5cdFx0XHRcdGJhc2ljTWFwOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dHlwZTogJ2Jhc2V0aWxlJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0bWFwTGFiZWxzOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dHlwZTogJ2xhYmVsdGlsZScsXG5cdFx0XHRcdFx0XHRmb3JtYXQ6ICdwbmcnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0cmFmZmljRmxvdzoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGJhc2U6ICd0cmFmZmljJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdmbG93dGlsZSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNhcm5hdkRheUdyZXk6ICdjYXJuYXYuZGF5LmdyZXknLFxuXHRcdFx0XHRoeWJyaWREYXk6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRiYXNlOiAnYWVyaWFsJyxcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICdoeWJyaWQuZGF5J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0aHlicmlkRGF5TW9iaWxlOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0YmFzZTogJ2FlcmlhbCcsXG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnaHlicmlkLmRheS5tb2JpbGUnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRoeWJyaWREYXlUcmFuc2l0OiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0YmFzZTogJ2FlcmlhbCcsXG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnaHlicmlkLmRheS50cmFuc2l0J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0aHlicmlkRGF5R3JleToge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGJhc2U6ICdhZXJpYWwnLFxuXHRcdFx0XHRcdFx0dmFyaWFudDogJ2h5YnJpZC5ncmV5LmRheSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGh5YnJpZERheVRyYWZmaWM6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnaHlicmlkLnRyYWZmaWMuZGF5Jyxcblx0XHRcdFx0XHRcdGJhc2U6ICd0cmFmZmljJyxcblx0XHRcdFx0XHRcdHR5cGU6ICd0cmFmZmljdGlsZSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHBlZGVzdHJpYW5EYXk6ICdwZWRlc3RyaWFuLmRheScsXG5cdFx0XHRcdHBlZGVzdHJpYW5OaWdodDogJ3BlZGVzdHJpYW4ubmlnaHQnLFxuXHRcdFx0XHRzYXRlbGxpdGVEYXk6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRiYXNlOiAnYWVyaWFsJyxcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICdzYXRlbGxpdGUuZGF5J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0dGVycmFpbkRheToge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGJhc2U6ICdhZXJpYWwnLFxuXHRcdFx0XHRcdFx0dmFyaWFudDogJ3RlcnJhaW4uZGF5J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0dGVycmFpbkRheU1vYmlsZToge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGJhc2U6ICdhZXJpYWwnLFxuXHRcdFx0XHRcdFx0dmFyaWFudDogJ3RlcnJhaW4uZGF5Lm1vYmlsZSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdEhFUkV2Mzoge1xuXHRcdFx0Lypcblx0XHRcdCAqIEhFUkUgbWFwcyBBUEkgVmVyc2lvbiAzLlxuXHRcdFx0ICogVGhlc2UgYmFzZW1hcHMgYXJlIGZyZWUsIGJ1dCB5b3UgbmVlZCBhbiBBUEkga2V5LiBQbGVhc2Ugc2lnbiB1cCBhdFxuXHRcdFx0ICogaHR0cHM6Ly9kZXZlbG9wZXIuaGVyZS5jb20vcGxhbnNcblx0XHRcdCAqIFZlcnNpb24gMyBkZXByZWNhdGVzIHRoZSBhcHBfaWQgYW5kIGFwcF9jb2RlIGFjY2VzcyBpbiBmYXZvciBvZiBhcGlLZXlcblx0XHRcdCAqXG5cdFx0XHQgKiBTdXBwb3J0ZWQgYWNjZXNzIG1ldGhvZHMgYXMgb2YgMjAxOS8xMi8yMTpcblx0XHRcdCAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuaGVyZS5jb20vZmFxcyNhY2Nlc3MtY29udHJvbC0xLS1ob3ctZG8teW91LWNvbnRyb2wtYWNjZXNzLXRvLWhlcmUtbG9jYXRpb24tc2VydmljZXNcblx0XHRcdCAqL1xuXHRcdFx0dXJsOlxuXHRcdFx0XHQnaHR0cHM6Ly97c30ue2Jhc2V9Lm1hcHMubHMuaGVyZWFwaS5jb20vbWFwdGlsZS8yLjEvJyArXG5cdFx0XHRcdCd7dHlwZX0ve21hcElEfS97dmFyaWFudH0ve3p9L3t4fS97eX0ve3NpemV9L3tmb3JtYXR9PycgK1xuXHRcdFx0XHQnYXBpS2V5PXthcGlLZXl9JmxnPXtsYW5ndWFnZX0nLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRhdHRyaWJ1dGlvbjpcblx0XHRcdFx0XHQnTWFwICZjb3B5OyAxOTg3LScgKyBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAnIDxhIGhyZWY9XCJodHRwOi8vZGV2ZWxvcGVyLmhlcmUuY29tXCI+SEVSRTwvYT4nLFxuXHRcdFx0XHRzdWJkb21haW5zOiAnMTIzNCcsXG5cdFx0XHRcdG1hcElEOiAnbmV3ZXN0Jyxcblx0XHRcdFx0YXBpS2V5OiAnPGluc2VydCB5b3VyIGFwaUtleSBoZXJlPicsXG5cdFx0XHRcdGJhc2U6ICdiYXNlJyxcblx0XHRcdFx0dmFyaWFudDogJ25vcm1hbC5kYXknLFxuXHRcdFx0XHRtYXhab29tOiAyMCxcblx0XHRcdFx0dHlwZTogJ21hcHRpbGUnLFxuXHRcdFx0XHRsYW5ndWFnZTogJ2VuZycsXG5cdFx0XHRcdGZvcm1hdDogJ3BuZzgnLFxuXHRcdFx0XHRzaXplOiAnMjU2J1xuXHRcdFx0fSxcblx0XHRcdHZhcmlhbnRzOiB7XG5cdFx0XHRcdG5vcm1hbERheTogJ25vcm1hbC5kYXknLFxuXHRcdFx0XHRub3JtYWxEYXlDdXN0b206ICdub3JtYWwuZGF5LmN1c3RvbScsXG5cdFx0XHRcdG5vcm1hbERheUdyZXk6ICdub3JtYWwuZGF5LmdyZXknLFxuXHRcdFx0XHRub3JtYWxEYXlNb2JpbGU6ICdub3JtYWwuZGF5Lm1vYmlsZScsXG5cdFx0XHRcdG5vcm1hbERheUdyZXlNb2JpbGU6ICdub3JtYWwuZGF5LmdyZXkubW9iaWxlJyxcblx0XHRcdFx0bm9ybWFsRGF5VHJhbnNpdDogJ25vcm1hbC5kYXkudHJhbnNpdCcsXG5cdFx0XHRcdG5vcm1hbERheVRyYW5zaXRNb2JpbGU6ICdub3JtYWwuZGF5LnRyYW5zaXQubW9iaWxlJyxcblx0XHRcdFx0bm9ybWFsTmlnaHQ6ICdub3JtYWwubmlnaHQnLFxuXHRcdFx0XHRub3JtYWxOaWdodE1vYmlsZTogJ25vcm1hbC5uaWdodC5tb2JpbGUnLFxuXHRcdFx0XHRub3JtYWxOaWdodEdyZXk6ICdub3JtYWwubmlnaHQuZ3JleScsXG5cdFx0XHRcdG5vcm1hbE5pZ2h0R3JleU1vYmlsZTogJ25vcm1hbC5uaWdodC5ncmV5Lm1vYmlsZScsXG5cdFx0XHRcdG5vcm1hbE5pZ2h0VHJhbnNpdDogJ25vcm1hbC5uaWdodC50cmFuc2l0Jyxcblx0XHRcdFx0bm9ybWFsTmlnaHRUcmFuc2l0TW9iaWxlOiAnbm9ybWFsLm5pZ2h0LnRyYW5zaXQubW9iaWxlJyxcblx0XHRcdFx0cmVkdWNlZERheTogJ3JlZHVjZWQuZGF5Jyxcblx0XHRcdFx0cmVkdWNlZE5pZ2h0OiAncmVkdWNlZC5uaWdodCcsXG5cdFx0XHRcdGJhc2ljTWFwOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dHlwZTogJ2Jhc2V0aWxlJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0bWFwTGFiZWxzOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dHlwZTogJ2xhYmVsdGlsZScsXG5cdFx0XHRcdFx0XHRmb3JtYXQ6ICdwbmcnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0cmFmZmljRmxvdzoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGJhc2U6ICd0cmFmZmljJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdmbG93dGlsZSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNhcm5hdkRheUdyZXk6ICdjYXJuYXYuZGF5LmdyZXknLFxuXHRcdFx0XHRoeWJyaWREYXk6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRiYXNlOiAnYWVyaWFsJyxcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICdoeWJyaWQuZGF5J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0aHlicmlkRGF5TW9iaWxlOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0YmFzZTogJ2FlcmlhbCcsXG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnaHlicmlkLmRheS5tb2JpbGUnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRoeWJyaWREYXlUcmFuc2l0OiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0YmFzZTogJ2FlcmlhbCcsXG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnaHlicmlkLmRheS50cmFuc2l0J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0aHlicmlkRGF5R3JleToge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGJhc2U6ICdhZXJpYWwnLFxuXHRcdFx0XHRcdFx0dmFyaWFudDogJ2h5YnJpZC5ncmV5LmRheSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHBlZGVzdHJpYW5EYXk6ICdwZWRlc3RyaWFuLmRheScsXG5cdFx0XHRcdHBlZGVzdHJpYW5OaWdodDogJ3BlZGVzdHJpYW4ubmlnaHQnLFxuXHRcdFx0XHRzYXRlbGxpdGVEYXk6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRiYXNlOiAnYWVyaWFsJyxcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICdzYXRlbGxpdGUuZGF5J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0dGVycmFpbkRheToge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGJhc2U6ICdhZXJpYWwnLFxuXHRcdFx0XHRcdFx0dmFyaWFudDogJ3RlcnJhaW4uZGF5J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0dGVycmFpbkRheU1vYmlsZToge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGJhc2U6ICdhZXJpYWwnLFxuXHRcdFx0XHRcdFx0dmFyaWFudDogJ3RlcnJhaW4uZGF5Lm1vYmlsZSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdEZyZWVNYXBTSzoge1xuXHRcdFx0dXJsOiAnaHR0cDovL3R7c30uZnJlZW1hcC5zay9UL3t6fS97eH0ve3l9LmpwZWcnLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtaW5ab29tOiA4LFxuXHRcdFx0XHRtYXhab29tOiAxNixcblx0XHRcdFx0c3ViZG9tYWluczogJzEyMzQnLFxuXHRcdFx0XHRib3VuZHM6IFtbNDcuMjA0NjQyLCAxNS45OTYwOTNdLCBbNDkuODMwODk2LCAyMi41NzY5MDRdXSxcblx0XHRcdFx0YXR0cmlidXRpb246XG5cdFx0XHRcdFx0J3thdHRyaWJ1dGlvbi5PcGVuU3RyZWV0TWFwfSwgdml6dWFsaXphdGlvbiBDQy1CeS1TQSAyLjAgPGEgaHJlZj1cImh0dHA6Ly9mcmVlbWFwLnNrXCI+RnJlZW1hcC5zazwvYT4nXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRNdGJNYXA6IHtcblx0XHRcdHVybDogJ2h0dHA6Ly90aWxlLm10Ym1hcC5jei9tdGJtYXBfdGlsZXMve3p9L3t4fS97eX0ucG5nJyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0YXR0cmlidXRpb246XG5cdFx0XHRcdFx0J3thdHRyaWJ1dGlvbi5PcGVuU3RyZWV0TWFwfSAmYW1wOyBVU0dTJ1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Q2FydG9EQjoge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly97c30uYmFzZW1hcHMuY2FydG9jZG4uY29tL3t2YXJpYW50fS97en0ve3h9L3t5fXtyfS5wbmcnLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRhdHRyaWJ1dGlvbjogJ3thdHRyaWJ1dGlvbi5PcGVuU3RyZWV0TWFwfSAmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vY2FydG8uY29tL2F0dHJpYnV0aW9uc1wiPkNBUlRPPC9hPicsXG5cdFx0XHRcdHN1YmRvbWFpbnM6ICdhYmNkJyxcblx0XHRcdFx0bWF4Wm9vbTogMTksXG5cdFx0XHRcdHZhcmlhbnQ6ICdsaWdodF9hbGwnXG5cdFx0XHR9LFxuXHRcdFx0dmFyaWFudHM6IHtcblx0XHRcdFx0UG9zaXRyb246ICdsaWdodF9hbGwnLFxuXHRcdFx0XHRQb3NpdHJvbk5vTGFiZWxzOiAnbGlnaHRfbm9sYWJlbHMnLFxuXHRcdFx0XHRQb3NpdHJvbk9ubHlMYWJlbHM6ICdsaWdodF9vbmx5X2xhYmVscycsXG5cdFx0XHRcdERhcmtNYXR0ZXI6ICdkYXJrX2FsbCcsXG5cdFx0XHRcdERhcmtNYXR0ZXJOb0xhYmVsczogJ2Rhcmtfbm9sYWJlbHMnLFxuXHRcdFx0XHREYXJrTWF0dGVyT25seUxhYmVsczogJ2Rhcmtfb25seV9sYWJlbHMnLFxuXHRcdFx0XHRWb3lhZ2VyOiAncmFzdGVydGlsZXMvdm95YWdlcicsXG5cdFx0XHRcdFZveWFnZXJOb0xhYmVsczogJ3Jhc3RlcnRpbGVzL3ZveWFnZXJfbm9sYWJlbHMnLFxuXHRcdFx0XHRWb3lhZ2VyT25seUxhYmVsczogJ3Jhc3RlcnRpbGVzL3ZveWFnZXJfb25seV9sYWJlbHMnLFxuXHRcdFx0XHRWb3lhZ2VyTGFiZWxzVW5kZXI6ICdyYXN0ZXJ0aWxlcy92b3lhZ2VyX2xhYmVsc191bmRlcidcblx0XHRcdH1cblx0XHR9LFxuXHRcdEhpa2VCaWtlOiB7XG5cdFx0XHR1cmw6ICdodHRwczovL3RpbGVzLndtZmxhYnMub3JnL3t2YXJpYW50fS97en0ve3h9L3t5fS5wbmcnLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtYXhab29tOiAxOSxcblx0XHRcdFx0YXR0cmlidXRpb246ICd7YXR0cmlidXRpb24uT3BlblN0cmVldE1hcH0nLFxuXHRcdFx0XHR2YXJpYW50OiAnaGlrZWJpa2UnXG5cdFx0XHR9LFxuXHRcdFx0dmFyaWFudHM6IHtcblx0XHRcdFx0SGlrZUJpa2U6IHt9LFxuXHRcdFx0XHRIaWxsU2hhZGluZzoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdG1heFpvb206IDE1LFxuXHRcdFx0XHRcdFx0dmFyaWFudDogJ2hpbGxzaGFkaW5nJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0QmFzZW1hcEFUOiB7XG5cdFx0XHR1cmw6ICdodHRwczovL21hcHN7c30ud2llbi5ndi5hdC9iYXNlbWFwL3t2YXJpYW50fS97dHlwZX0vZ29vZ2xlMzg1Ny97en0ve3l9L3t4fS57Zm9ybWF0fScsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1heFpvb206IDE5LFxuXHRcdFx0XHRhdHRyaWJ1dGlvbjogJ0RhdGVucXVlbGxlOiA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYmFzZW1hcC5hdFwiPmJhc2VtYXAuYXQ8L2E+Jyxcblx0XHRcdFx0c3ViZG9tYWluczogWycnLCAnMScsICcyJywgJzMnLCAnNCddLFxuXHRcdFx0XHR0eXBlOiAnbm9ybWFsJyxcblx0XHRcdFx0Zm9ybWF0OiAncG5nJyxcblx0XHRcdFx0Ym91bmRzOiBbWzQ2LjM1ODc3MCwgOC43ODIzNzldLCBbNDkuMDM3ODcyLCAxNy4xODk1MzJdXSxcblx0XHRcdFx0dmFyaWFudDogJ2dlb2xhbmRiYXNlbWFwJ1xuXHRcdFx0fSxcblx0XHRcdHZhcmlhbnRzOiB7XG5cdFx0XHRcdGJhc2VtYXA6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRtYXhab29tOiAyMCwgLy8gY3VycmVudGx5IG9ubHkgaW4gVmllbm5hXG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnZ2VvbGFuZGJhc2VtYXAnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRncmF1OiAnYm1hcGdyYXUnLFxuXHRcdFx0XHRvdmVybGF5OiAnYm1hcG92ZXJsYXknLFxuXHRcdFx0XHR0ZXJyYWluOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ2JtYXBnZWxhZW5kZScsXG5cdFx0XHRcdFx0XHR0eXBlOiAnZ3JhdScsXG5cdFx0XHRcdFx0XHRmb3JtYXQ6ICdqcGVnJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0c3VyZmFjZToge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICdibWFwb2JlcmZsYWVjaGUnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2dyYXUnLFxuXHRcdFx0XHRcdFx0Zm9ybWF0OiAnanBlZydcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGhpZ2hkcGk6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnYm1hcGhpZHBpJyxcblx0XHRcdFx0XHRcdGZvcm1hdDogJ2pwZWcnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcnRob2ZvdG86IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRtYXhab29tOiAyMCwgLy8gY3VycmVudGx5IG9ubHkgaW4gVmllbm5hXG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnYm1hcG9ydGhvZm90bzMwY20nLFxuXHRcdFx0XHRcdFx0Zm9ybWF0OiAnanBlZydcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdG5sbWFwczoge1xuXHRcdFx0dXJsOiAnaHR0cHM6Ly9nZW9kYXRhLm5hdGlvbmFhbGdlb3JlZ2lzdGVyLm5sL3RpbGVzL3NlcnZpY2Uvd210cy97dmFyaWFudH0vRVBTRzozODU3L3t6fS97eH0ve3l9LnBuZycsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblpvb206IDYsXG5cdFx0XHRcdG1heFpvb206IDE5LFxuXHRcdFx0XHRib3VuZHM6IFtbNTAuNSwgMy4yNV0sIFs1NCwgNy42XV0sXG5cdFx0XHRcdGF0dHJpYnV0aW9uOiAnS2FhcnRnZWdldmVucyAmY29weTsgPGEgaHJlZj1cImthZGFzdGVyLm5sXCI+S2FkYXN0ZXI8L2E+J1xuXHRcdFx0fSxcblx0XHRcdHZhcmlhbnRzOiB7XG5cdFx0XHRcdCdzdGFuZGFhcmQnOiAnYnJ0YWNodGVyZ3JvbmRrYWFydCcsXG5cdFx0XHRcdCdwYXN0ZWwnOiAnYnJ0YWNodGVyZ3JvbmRrYWFydHBhc3RlbCcsXG5cdFx0XHRcdCdncmlqcyc6ICdicnRhY2h0ZXJncm9uZGthYXJ0Z3JpanMnLFxuXHRcdFx0XHQnbHVjaHRmb3RvJzoge1xuXHRcdFx0XHRcdCd1cmwnOiAnaHR0cHM6Ly9nZW9kYXRhLm5hdGlvbmFhbGdlb3JlZ2lzdGVyLm5sL2x1Y2h0Zm90by9yZ2Ivd210cy8yMDE4X29ydGhvMjUvRVBTRzozODU3L3t6fS97eH0ve3l9LnBuZycsXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdE5BU0FHSUJTOiB7XG5cdFx0XHR1cmw6ICdodHRwczovL21hcDEudmlzLmVhcnRoZGF0YS5uYXNhLmdvdi93bXRzLXdlYm1lcmMve3ZhcmlhbnR9L2RlZmF1bHQve3RpbWV9L3t0aWxlbWF0cml4c2V0fXttYXhab29tfS97en0ve3l9L3t4fS57Zm9ybWF0fScsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGF0dHJpYnV0aW9uOlxuXHRcdFx0XHRcdCdJbWFnZXJ5IHByb3ZpZGVkIGJ5IHNlcnZpY2VzIGZyb20gdGhlIEdsb2JhbCBJbWFnZXJ5IEJyb3dzZSBTZXJ2aWNlcyAoR0lCUyksIG9wZXJhdGVkIGJ5IHRoZSBOQVNBL0dTRkMvRWFydGggU2NpZW5jZSBEYXRhIGFuZCBJbmZvcm1hdGlvbiBTeXN0ZW0gJyArXG5cdFx0XHRcdFx0Jyg8YSBocmVmPVwiaHR0cHM6Ly9lYXJ0aGRhdGEubmFzYS5nb3ZcIj5FU0RJUzwvYT4pIHdpdGggZnVuZGluZyBwcm92aWRlZCBieSBOQVNBL0hRLicsXG5cdFx0XHRcdGJvdW5kczogW1stODUuMDUxMTI4Nzc3NiwgLTE3OS45OTk5OTk5NzVdLCBbODUuMDUxMTI4Nzc3NiwgMTc5Ljk5OTk5OTk3NV1dLFxuXHRcdFx0XHRtaW5ab29tOiAxLFxuXHRcdFx0XHRtYXhab29tOiA5LFxuXHRcdFx0XHRmb3JtYXQ6ICdqcGcnLFxuXHRcdFx0XHR0aW1lOiAnJyxcblx0XHRcdFx0dGlsZW1hdHJpeHNldDogJ0dvb2dsZU1hcHNDb21wYXRpYmxlX0xldmVsJ1xuXHRcdFx0fSxcblx0XHRcdHZhcmlhbnRzOiB7XG5cdFx0XHRcdE1vZGlzVGVycmFUcnVlQ29sb3JDUjogJ01PRElTX1RlcnJhX0NvcnJlY3RlZFJlZmxlY3RhbmNlX1RydWVDb2xvcicsXG5cdFx0XHRcdE1vZGlzVGVycmFCYW5kczM2N0NSOiAnTU9ESVNfVGVycmFfQ29ycmVjdGVkUmVmbGVjdGFuY2VfQmFuZHMzNjcnLFxuXHRcdFx0XHRWaWlyc0VhcnRoQXROaWdodDIwMTI6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnVklJUlNfQ2l0eUxpZ2h0c18yMDEyJyxcblx0XHRcdFx0XHRcdG1heFpvb206IDhcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdE1vZGlzVGVycmFMU1REYXk6IHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnTU9ESVNfVGVycmFfTGFuZF9TdXJmYWNlX1RlbXBfRGF5Jyxcblx0XHRcdFx0XHRcdGZvcm1hdDogJ3BuZycsXG5cdFx0XHRcdFx0XHRtYXhab29tOiA3LFxuXHRcdFx0XHRcdFx0b3BhY2l0eTogMC43NVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0TW9kaXNUZXJyYVNub3dDb3Zlcjoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICdNT0RJU19UZXJyYV9Tbm93X0NvdmVyJyxcblx0XHRcdFx0XHRcdGZvcm1hdDogJ3BuZycsXG5cdFx0XHRcdFx0XHRtYXhab29tOiA4LFxuXHRcdFx0XHRcdFx0b3BhY2l0eTogMC43NVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0TW9kaXNUZXJyYUFPRDoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHZhcmlhbnQ6ICdNT0RJU19UZXJyYV9BZXJvc29sJyxcblx0XHRcdFx0XHRcdGZvcm1hdDogJ3BuZycsXG5cdFx0XHRcdFx0XHRtYXhab29tOiA2LFxuXHRcdFx0XHRcdFx0b3BhY2l0eTogMC43NVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0TW9kaXNUZXJyYUNobG9yb3BoeWxsOiB7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dmFyaWFudDogJ01PRElTX1RlcnJhX0NobG9yb3BoeWxsX0EnLFxuXHRcdFx0XHRcdFx0Zm9ybWF0OiAncG5nJyxcblx0XHRcdFx0XHRcdG1heFpvb206IDcsXG5cdFx0XHRcdFx0XHRvcGFjaXR5OiAwLjc1XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHROTFM6IHtcblx0XHRcdC8vIE5MUyBtYXBzIGFyZSBjb3B5cmlnaHQgTmF0aW9uYWwgbGlicmFyeSBvZiBTY290bGFuZC5cblx0XHRcdC8vIGh0dHA6Ly9tYXBzLm5scy51ay9wcm9qZWN0cy9hcGkvaW5kZXguaHRtbFxuXHRcdFx0Ly8gUGxlYXNlIGNvbnRhY3QgTkxTIGZvciBhbnl0aGluZyBvdGhlciB0aGFuIG5vbi1jb21tZXJjaWFsIGxvdyB2b2x1bWUgdXNhZ2Vcblx0XHRcdC8vXG5cdFx0XHQvLyBNYXAgc291cmNlczogT3JkbmFuY2UgU3VydmV5IDE6MW0gdG8gMTo2M0ssIDE5MjBzLTE5NDBzXG5cdFx0XHQvLyAgIHowLTkgIC0gMToxbVxuXHRcdFx0Ly8gIHoxMC0xMSAtIHF1YXJ0ZXIgaW5jaCAoMToyNTM0NDApXG5cdFx0XHQvLyAgejEyLTE4IC0gb25lIGluY2ggKDE6NjMzNjApXG5cdFx0XHR1cmw6ICdodHRwczovL25scy17c30udGlsZXNlcnZlci5jb20vbmxzL3t6fS97eH0ve3l9LmpwZycsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGF0dHJpYnV0aW9uOiAnPGEgaHJlZj1cImh0dHA6Ly9nZW8ubmxzLnVrL21hcHMvXCI+TmF0aW9uYWwgTGlicmFyeSBvZiBTY290bGFuZCBIaXN0b3JpYyBNYXBzPC9hPicsXG5cdFx0XHRcdGJvdW5kczogW1s0OS42LCAtMTJdLCBbNjEuNywgM11dLFxuXHRcdFx0XHRtaW5ab29tOiAxLFxuXHRcdFx0XHRtYXhab29tOiAxOCxcblx0XHRcdFx0c3ViZG9tYWluczogJzAxMjMnLFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0SnVzdGljZU1hcDoge1xuXHRcdFx0Ly8gSnVzdGljZSBNYXAgKGh0dHA6Ly93d3cuanVzdGljZW1hcC5vcmcvKVxuXHRcdFx0Ly8gVmlzdWFsaXplIHJhY2UgYW5kIGluY29tZSBkYXRhIGZvciB5b3VyIGNvbW11bml0eSwgY291bnR5IGFuZCBjb3VudHJ5LlxuXHRcdFx0Ly8gSW5jbHVkZXMgdG9vbHMgZm9yIGRhdGEgam91cm5hbGlzdHMsIGJsb2dnZXJzIGFuZCBjb21tdW5pdHkgYWN0aXZpc3RzLlxuXHRcdFx0dXJsOiAnaHR0cDovL3d3dy5qdXN0aWNlbWFwLm9yZy90aWxlL3tzaXplfS97dmFyaWFudH0ve3p9L3t4fS97eX0ucG5nJyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0YXR0cmlidXRpb246ICc8YSBocmVmPVwiaHR0cDovL3d3dy5qdXN0aWNlbWFwLm9yZy90ZXJtcy5waHBcIj5KdXN0aWNlIE1hcDwvYT4nLFxuXHRcdFx0XHQvLyBvbmUgb2YgJ2NvdW50eScsICd0cmFjdCcsICdibG9jaydcblx0XHRcdFx0c2l6ZTogJ2NvdW50eScsXG5cdFx0XHRcdC8vIEJvdW5kcyBmb3IgVVNBLCBpbmNsdWRpbmcgQWxhc2thIGFuZCBIYXdhaWlcblx0XHRcdFx0Ym91bmRzOiBbWzE0LCAtMTgwXSwgWzcyLCAtNTZdXVxuXHRcdFx0fSxcblx0XHRcdHZhcmlhbnRzOiB7XG5cdFx0XHRcdGluY29tZTogJ2luY29tZScsXG5cdFx0XHRcdGFtZXJpY2FuSW5kaWFuOiAnaW5kaWFuJyxcblx0XHRcdFx0YXNpYW46ICdhc2lhbicsXG5cdFx0XHRcdGJsYWNrOiAnYmxhY2snLFxuXHRcdFx0XHRoaXNwYW5pYzogJ2hpc3BhbmljJyxcblx0XHRcdFx0bXVsdGk6ICdtdWx0aScsXG5cdFx0XHRcdG5vbldoaXRlOiAnbm9ud2hpdGUnLFxuXHRcdFx0XHR3aGl0ZTogJ3doaXRlJyxcblx0XHRcdFx0cGx1cmFsaXR5OiAncGx1cmFsJ1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0V2lraW1lZGlhOiB7XG5cdFx0XHR1cmw6ICdodHRwczovL21hcHMud2lraW1lZGlhLm9yZy9vc20taW50bC97en0ve3h9L3t5fXtyfS5wbmcnLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRhdHRyaWJ1dGlvbjogJzxhIGhyZWY9XCJodHRwczovL3dpa2ltZWRpYWZvdW5kYXRpb24ub3JnL3dpa2kvTWFwc19UZXJtc19vZl9Vc2VcIj5XaWtpbWVkaWE8L2E+Jyxcblx0XHRcdFx0bWluWm9vbTogMSxcblx0XHRcdFx0bWF4Wm9vbTogMTlcblx0XHRcdH1cblx0XHR9LFxuXHRcdEdlb3BvcnRhaWxGcmFuY2U6IHtcblx0XHRcdHVybDogJ2h0dHBzOi8vd3hzLmlnbi5mci97YXBpa2V5fS9nZW9wb3J0YWlsL3dtdHM/UkVRVUVTVD1HZXRUaWxlJlNFUlZJQ0U9V01UUyZWRVJTSU9OPTEuMC4wJlNUWUxFPXtzdHlsZX0mVElMRU1BVFJJWFNFVD1QTSZGT1JNQVQ9e2Zvcm1hdH0mTEFZRVI9e3ZhcmlhbnR9JlRJTEVNQVRSSVg9e3p9JlRJTEVST1c9e3l9JlRJTEVDT0w9e3h9Jyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0YXR0cmlidXRpb246ICc8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ2VvcG9ydGFpbC5nb3V2LmZyL1wiPkdlb3BvcnRhaWwgRnJhbmNlPC9hPicsXG5cdFx0XHRcdGJvdW5kczogW1stNzUsIC0xODBdLCBbODEsIDE4MF1dLFxuXHRcdFx0XHRtaW5ab29tOiAyLFxuXHRcdFx0XHRtYXhab29tOiAxOCxcblx0XHRcdFx0Ly8gR2V0IHlvdXIgb3duIGdlb3BvcnRhaWwgYXBpa2V5IGhlcmUgOiBodHRwOi8vcHJvZmVzc2lvbm5lbHMuaWduLmZyL2lnbi9jb250cmF0cy9cblx0XHRcdFx0Ly8gTkIgOiAnY2hvaXNpcmdlb3BvcnRhaWwnIGlzIGEgZGVtb25zdHJhdGlvbiBrZXkgdGhhdCBjb21lcyB3aXRoIG5vIGd1YXJhbnRlZVxuXHRcdFx0XHRhcGlrZXk6ICdjaG9pc2lyZ2VvcG9ydGFpbCcsXG5cdFx0XHRcdGZvcm1hdDogJ2ltYWdlL2pwZWcnLFxuXHRcdFx0XHRzdHlsZSA6ICdub3JtYWwnLFxuXHRcdFx0XHR2YXJpYW50OiAnR0VPR1JBUEhJQ0FMR1JJRFNZU1RFTVMuTUFQUy5TQ0FOLUVYUFJFU1MuU1RBTkRBUkQnXG5cdFx0XHR9LFxuXHRcdFx0dmFyaWFudHM6IHtcblx0XHRcdFx0cGFyY2Vsczoge1xuXHRcdFx0XHRcdG9wdGlvbnMgOiB7XG5cdFx0XHRcdFx0XHR2YXJpYW50OiAnQ0FEQVNUUkFMUEFSQ0VMUy5QQVJDRUxTJyxcblx0XHRcdFx0XHRcdG1heFpvb206IDIwLFxuXHRcdFx0XHRcdFx0c3R5bGUgOiAnYmRwYXJjZWxsYWlyZScsXG5cdFx0XHRcdFx0XHRmb3JtYXQ6ICdpbWFnZS9wbmcnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpZ25NYXBzOiAnR0VPR1JBUEhJQ0FMR1JJRFNZU1RFTVMuTUFQUycsXG5cdFx0XHRcdG1hcHM6ICdHRU9HUkFQSElDQUxHUklEU1lTVEVNUy5NQVBTLlNDQU4tRVhQUkVTUy5TVEFOREFSRCcsXG5cdFx0XHRcdG9ydGhvczoge1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdG1heFpvb206IDE5LFxuXHRcdFx0XHRcdFx0dmFyaWFudDogJ09SVEhPSU1BR0VSWS5PUlRIT1BIT1RPUydcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdE9uZU1hcFNHOiB7XG5cdFx0XHR1cmw6ICdodHRwczovL21hcHMte3N9Lm9uZW1hcC5zZy92My97dmFyaWFudH0ve3p9L3t4fS97eX0ucG5nJyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0dmFyaWFudDogJ0RlZmF1bHQnLFxuXHRcdFx0XHRtaW5ab29tOiAxMSxcblx0XHRcdFx0bWF4Wm9vbTogMTgsXG5cdFx0XHRcdGJvdW5kczogW1sxLjU2MDczLCAxMDQuMTE0NzVdLCBbMS4xNiwgMTAzLjUwMl1dLFxuXHRcdFx0XHRhdHRyaWJ1dGlvbjogJzxpbWcgc3JjPVwiaHR0cHM6Ly9kb2NzLm9uZW1hcC5zZy9tYXBzL2ltYWdlcy9vbmVNYXA2NC0wMS5wbmdcIiBzdHlsZT1cImhlaWdodDoyMHB4O3dpZHRoOjIwcHg7XCIvPiBOZXcgT25lTWFwIHwgTWFwIGRhdGEgJmNvcHk7IGNvbnRyaWJ1dG9ycywgPGEgaHJlZj1cImh0dHA6Ly9TTEEuZ292LnNnXCI+U2luZ2Fwb3JlIExhbmQgQXV0aG9yaXR5PC9hPidcblx0XHRcdH0sXG5cdFx0XHR2YXJpYW50czoge1xuXHRcdFx0XHREZWZhdWx0OiAnRGVmYXVsdCcsXG5cdFx0XHRcdE5pZ2h0OiAnTmlnaHQnLFxuXHRcdFx0XHRPcmlnaW5hbDogJ09yaWdpbmFsJyxcblx0XHRcdFx0R3JleTogJ0dyZXknLFxuXHRcdFx0XHRMYW5kTG90OiAnTGFuZExvdCdcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0TC50aWxlTGF5ZXIucHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gbmV3IEwuVGlsZUxheWVyLlByb3ZpZGVyKHByb3ZpZGVyLCBvcHRpb25zKTtcblx0fTtcblxuXHRyZXR1cm4gTDtcbn0pKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=