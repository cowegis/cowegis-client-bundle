(window.webpackJsonp=window.webpackJsonp||[]).push([["vendors~control-geocoderControlFactory"],{Wuzz:function(e,t,o){"use strict";var n={};o.r(n),o.d(n,"ArcGis",(function(){return m})),o.d(n,"arcgis",(function(){return f})),o.d(n,"Bing",(function(){return v})),o.d(n,"bing",(function(){return _})),o.d(n,"Google",(function(){return b})),o.d(n,"google",(function(){return y})),o.d(n,"HERE",(function(){return x})),o.d(n,"here",(function(){return L})),o.d(n,"LatLng",(function(){return U})),o.d(n,"latLng",(function(){return C})),o.d(n,"Mapbox",(function(){return w})),o.d(n,"mapbox",(function(){return k})),o.d(n,"MapQuest",(function(){return D})),o.d(n,"mapQuest",(function(){return E})),o.d(n,"Neutrino",(function(){return P})),o.d(n,"neutrino",(function(){return R})),o.d(n,"Nominatim",(function(){return T})),o.d(n,"nominatim",(function(){return B})),o.d(n,"OpenLocationCode",(function(){return F})),o.d(n,"openLocationCode",(function(){return S})),o.d(n,"OpenCage",(function(){return Q})),o.d(n,"opencage",(function(){return j})),o.d(n,"Pelias",(function(){return M})),o.d(n,"pelias",(function(){return N})),o.d(n,"GeocodeEarth",(function(){return z})),o.d(n,"geocodeEarth",(function(){return I})),o.d(n,"Mapzen",(function(){return O})),o.d(n,"mapzen",(function(){return G})),o.d(n,"Openrouteservice",(function(){return A})),o.d(n,"openrouteservice",(function(){return q})),o.d(n,"Photon",(function(){return W})),o.d(n,"photon",(function(){return H})),o.d(n,"What3Words",(function(){return K})),o.d(n,"what3words",(function(){return J}));var s=o("4R65"),a=o.n(s),i=0,r=/[&<>"'`]/g,l=/[&<>"'`]/,c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};function d(e){return c[e]}function u(e,t,o,n,s){var r="_l_geocoder_"+i++;t[s||"callback"]=r,window[r]=a.a.Util.bind(o,n);var l=document.createElement("script");l.type="text/javascript",l.src=e+g(t),l.id=r,document.getElementsByTagName("head")[0].appendChild(l)}function p(e,t,o){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState){var e;if(200!==n.status&&304!==n.status)e="";else if("string"==typeof n.response)try{e=JSON.parse(n.response)}catch(t){e=n.response}else e=n.response;o(e)}},n.open("GET",e+g(t),!0),n.responseType="json",n.setRequestHeader("Accept","application/json"),n.send(null)}function h(e,t){return e.replace(/\{ *([\w_]+) *\}/g,(function(e,o){var n,s=t[o];return void 0===s?s="":"function"==typeof s&&(s=s(t)),null==(n=s)?"":n?(n=""+n,l.test(n)?n.replace(r,d):n):n+""}))}function g(e,t,o){var n=[];for(var s in e){var i=encodeURIComponent(o?s.toUpperCase():s),r=e[s];if(a.a.Util.isArray(r))for(var l=0;l<r.length;l++)n.push(i+"="+encodeURIComponent(r[l]));else n.push(i+"="+encodeURIComponent(r))}return(t&&-1!==t.indexOf("?")?"&":"?")+n.join("&")}var m=a.a.Class.extend({options:{service_url:"https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"},initialize:function(e,t){a.a.setOptions(this,t),this._accessToken=e},geocode:function(e,t,o){var n={SingleLine:e,outFields:"Addr_Type",forStorage:!1,maxLocations:10,f:"json"};this._key&&this._key.length&&(n.token=this._key),p(this.options.service_url+"/findAddressCandidates",a.a.extend(n,this.options.geocodingQueryParams),(function(e){var n,s,i,r=[];if(e.candidates&&e.candidates.length)for(var l=0;l<=e.candidates.length-1;l++)n=e.candidates[l],s=a.a.latLng(n.location.y,n.location.x),i=a.a.latLngBounds(a.a.latLng(n.extent.ymax,n.extent.xmax),a.a.latLng(n.extent.ymin,n.extent.xmin)),r[l]={name:n.address,bbox:i,center:s};t.call(o,r)}))},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,o,n){var s={location:encodeURIComponent(e.lng)+","+encodeURIComponent(e.lat),distance:100,f:"json"};p(this.options.service_url+"/reverseGeocode",s,(function(e){var t,s=[];e&&!e.error&&(t=a.a.latLng(e.location.y,e.location.x),s.push({name:e.address.Match_addr,center:t,bounds:a.a.latLngBounds(t,t)})),o.call(n,s)}))}});function f(e,t){return new m(e,t)}var v=a.a.Class.extend({initialize:function(e){this.key=e},geocode:function(e,t,o){u("https://dev.virtualearth.net/REST/v1/Locations",{query:e,key:this.key},(function(e){var n=[];if(e.resourceSets.length>0)for(var s=e.resourceSets[0].resources.length-1;s>=0;s--){var i=e.resourceSets[0].resources[s],r=i.bbox;n[s]={name:i.name,bbox:a.a.latLngBounds([r[0],r[1]],[r[2],r[3]]),center:a.a.latLng(i.point.coordinates)}}t.call(o,n)}),this,"jsonp")},reverse:function(e,t,o,n){u("//dev.virtualearth.net/REST/v1/Locations/"+e.lat+","+e.lng,{key:this.key},(function(e){for(var t=[],s=e.resourceSets[0].resources.length-1;s>=0;s--){var i=e.resourceSets[0].resources[s],r=i.bbox;t[s]={name:i.name,bbox:a.a.latLngBounds([r[0],r[1]],[r[2],r[3]]),center:a.a.latLng(i.point.coordinates)}}o.call(n,t)}),this,"jsonp")}});function _(e){return new v(e)}var b=a.a.Class.extend({options:{serviceUrl:"https://maps.googleapis.com/maps/api/geocode/json",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,t){this._key=e,a.a.setOptions(this,t),this.options.serviceUrl=this.options.service_url||this.options.serviceUrl},geocode:function(e,t,o){var n={address:e};this._key&&this._key.length&&(n.key=this._key),n=a.a.Util.extend(n,this.options.geocodingQueryParams),p(this.options.serviceUrl,n,(function(e){var n,s,i,r=[];if(e.results&&e.results.length)for(var l=0;l<=e.results.length-1;l++)n=e.results[l],s=a.a.latLng(n.geometry.location),i=a.a.latLngBounds(a.a.latLng(n.geometry.viewport.northeast),a.a.latLng(n.geometry.viewport.southwest)),r[l]={name:n.formatted_address,bbox:i,center:s,properties:n.address_components};t.call(o,r)}))},reverse:function(e,t,o,n){var s={latlng:encodeURIComponent(e.lat)+","+encodeURIComponent(e.lng)};s=a.a.Util.extend(s,this.options.reverseQueryParams),this._key&&this._key.length&&(s.key=this._key),p(this.options.serviceUrl,s,(function(e){var t,s,i,r=[];if(e.results&&e.results.length)for(var l=0;l<=e.results.length-1;l++)t=e.results[l],s=a.a.latLng(t.geometry.location),i=a.a.latLngBounds(a.a.latLng(t.geometry.viewport.northeast),a.a.latLng(t.geometry.viewport.southwest)),r[l]={name:t.formatted_address,bbox:i,center:s,properties:t.address_components};o.call(n,r)}))}});function y(e,t){return new b(e,t)}var x=a.a.Class.extend({options:{geocodeUrl:"https://geocoder.api.here.com/6.2/geocode.json",reverseGeocodeUrl:"https://reverse.geocoder.api.here.com/6.2/reversegeocode.json",app_id:"<insert your app_id here>",app_code:"<insert your app_code here>",geocodingQueryParams:{},reverseQueryParams:{},reverseGeocodeProxRadius:null},initialize:function(e){a.a.setOptions(this,e)},geocode:function(e,t,o){var n={searchtext:e,gen:9,app_id:this.options.app_id,app_code:this.options.app_code,jsonattributes:1};n=a.a.Util.extend(n,this.options.geocodingQueryParams),this.getJSON(this.options.geocodeUrl,n,t,o)},reverse:function(e,t,o,n){var s=this.options.reverseGeocodeProxRadius?this.options.reverseGeocodeProxRadius:null,i=s?","+encodeURIComponent(s):"",r={prox:encodeURIComponent(e.lat)+","+encodeURIComponent(e.lng)+i,mode:"retrieveAddresses",app_id:this.options.app_id,app_code:this.options.app_code,gen:9,jsonattributes:1};r=a.a.Util.extend(r,this.options.reverseQueryParams),this.getJSON(this.options.reverseGeocodeUrl,r,o,n)},getJSON:function(e,t,o,n){p(e,t,(function(e){var t,s,i,r=[];if(e.response.view&&e.response.view.length)for(var l=0;l<=e.response.view[0].result.length-1;l++)t=e.response.view[0].result[l].location,s=a.a.latLng(t.displayPosition.latitude,t.displayPosition.longitude),i=a.a.latLngBounds(a.a.latLng(t.mapView.topLeft.latitude,t.mapView.topLeft.longitude),a.a.latLng(t.mapView.bottomRight.latitude,t.mapView.bottomRight.longitude)),r[l]={name:t.address.label,properties:t.address,bbox:i,center:s};o.call(n,r)}))}});function L(e){return new x(e)}var U=a.a.Class.extend({options:{next:void 0,sizeInMeters:1e4},initialize:function(e){a.a.Util.setOptions(this,e)},geocode:function(e,t,o){var n,s;if((n=e.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/))?s=a.a.latLng((/N/i.test(n[1])?1:-1)*parseFloat(n[2]),(/E/i.test(n[3])?1:-1)*parseFloat(n[4])):(n=e.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/))?s=a.a.latLng((/N/i.test(n[2])?1:-1)*parseFloat(n[1]),(/E/i.test(n[4])?1:-1)*parseFloat(n[3])):(n=e.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/))?s=a.a.latLng((/N/i.test(n[1])?1:-1)*(parseFloat(n[2])+parseFloat(n[3]/60)),(/E/i.test(n[4])?1:-1)*(parseFloat(n[5])+parseFloat(n[6]/60))):(n=e.match(/^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/))?s=a.a.latLng((/N/i.test(n[3])?1:-1)*(parseFloat(n[1])+parseFloat(n[2]/60)),(/E/i.test(n[6])?1:-1)*(parseFloat(n[4])+parseFloat(n[5]/60))):(n=e.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/))?s=a.a.latLng((/N/i.test(n[1])?1:-1)*(parseFloat(n[2])+parseFloat(n[3]/60+parseFloat(n[4]/3600))),(/E/i.test(n[5])?1:-1)*(parseFloat(n[6])+parseFloat(n[7]/60)+parseFloat(n[8]/3600))):(n=e.match(/^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/))?s=a.a.latLng((/N/i.test(n[4])?1:-1)*(parseFloat(n[1])+parseFloat(n[2]/60+parseFloat(n[3]/3600))),(/E/i.test(n[8])?1:-1)*(parseFloat(n[5])+parseFloat(n[6]/60)+parseFloat(n[7]/3600))):(n=e.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/))&&(s=a.a.latLng(parseFloat(n[1]),parseFloat(n[2]))),s){var i=[{name:e,center:s,bbox:s.toBounds(this.options.sizeInMeters)}];t.call(o,i)}else this.options.next&&this.options.next.geocode(e,t,o)}});function C(e){return new U(e)}var w=a.a.Class.extend({options:{serviceUrl:"https://api.mapbox.com/geocoding/v5/mapbox.places/",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,t){a.a.setOptions(this,t),this.options.geocodingQueryParams.access_token=e,this.options.reverseQueryParams.access_token=e},geocode:function(e,t,o){var n=this.options.geocodingQueryParams;void 0!==n.proximity&&void 0!==n.proximity.lat&&void 0!==n.proximity.lng&&(n.proximity=n.proximity.lng+","+n.proximity.lat),p(this.options.serviceUrl+encodeURIComponent(e)+".json",n,(function(e){var n,s,i,r=[];if(e.features&&e.features.length)for(var l=0;l<=e.features.length-1;l++){n=e.features[l],s=a.a.latLng(n.center.reverse()),i=n.bbox?a.a.latLngBounds(a.a.latLng(n.bbox.slice(0,2).reverse()),a.a.latLng(n.bbox.slice(2,4).reverse())):a.a.latLngBounds(s,s);for(var c={text:n.text,address:n.address},d=0;d<(n.context||[]).length;d++){c[n.context[d].id.split(".")[0]]=n.context[d].text,n.context[d].short_code&&(c.countryShortCode=n.context[d].short_code)}r[l]={name:n.place_name,bbox:i,center:s,properties:c}}t.call(o,r)}))},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,o,n){p(this.options.serviceUrl+encodeURIComponent(e.lng)+","+encodeURIComponent(e.lat)+".json",this.options.reverseQueryParams,(function(e){var t,s,i,r=[];if(e.features&&e.features.length)for(var l=0;l<=e.features.length-1;l++)t=e.features[l],s=a.a.latLng(t.center.reverse()),i=t.bbox?a.a.latLngBounds(a.a.latLng(t.bbox.slice(0,2).reverse()),a.a.latLng(t.bbox.slice(2,4).reverse())):a.a.latLngBounds(s,s),r[l]={name:t.place_name,bbox:i,center:s};o.call(n,r)}))}});function k(e,t){return new w(e,t)}var D=a.a.Class.extend({options:{serviceUrl:"https://www.mapquestapi.com/geocoding/v1"},initialize:function(e,t){this._key=decodeURIComponent(e),a.a.Util.setOptions(this,t)},_formatName:function(){var e,t=[];for(e=0;e<arguments.length;e++)arguments[e]&&t.push(arguments[e]);return t.join(", ")},geocode:function(e,t,o){p(this.options.serviceUrl+"/address",{key:this._key,location:e,limit:5,outFormat:"json"},a.a.bind((function(e){var n,s,i=[];if(e.results&&e.results[0].locations)for(var r=e.results[0].locations.length-1;r>=0;r--)n=e.results[0].locations[r],s=a.a.latLng(n.latLng),i[r]={name:this._formatName(n.street,n.adminArea4,n.adminArea3,n.adminArea1),bbox:a.a.latLngBounds(s,s),center:s};t.call(o,i)}),this))},reverse:function(e,t,o,n){p(this.options.serviceUrl+"/reverse",{key:this._key,location:e.lat+","+e.lng,outputFormat:"json"},a.a.bind((function(e){var t,s,i=[];if(e.results&&e.results[0].locations)for(var r=e.results[0].locations.length-1;r>=0;r--)t=e.results[0].locations[r],s=a.a.latLng(t.latLng),i[r]={name:this._formatName(t.street,t.adminArea4,t.adminArea3,t.adminArea1),bbox:a.a.latLngBounds(s,s),center:s};o.call(n,i)}),this))}});function E(e,t){return new D(e,t)}var P=a.a.Class.extend({options:{userId:"<insert your userId here>",apiKey:"<insert your apiKey here>",serviceUrl:"https://neutrinoapi.com/"},initialize:function(e){a.a.Util.setOptions(this,e)},geocode:function(e,t,o){p(this.options.serviceUrl+"geocode-address",{apiKey:this.options.apiKey,userId:this.options.userId,address:e.split(/\s+/).join(".")},(function(e){var n,s,i=[];e.locations&&(e.geometry=e.locations[0],n=a.a.latLng(e.geometry.latitude,e.geometry.longitude),s=a.a.latLngBounds(n,n),i[0]={name:e.geometry.address,bbox:s,center:n}),t.call(o,i)}))},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,o,n){p(this.options.serviceUrl+"geocode-reverse",{apiKey:this.options.apiKey,userId:this.options.userId,latitude:e.lat,longitude:e.lng},(function(t){var s,i,r=[];200==t.status.status&&t.found&&(s=a.a.latLng(e.lat,e.lng),i=a.a.latLngBounds(s,s),r[0]={name:t.address,bbox:i,center:s}),o.call(n,r)}))}});function R(e){return new P(e)}var T=a.a.Class.extend({options:{serviceUrl:"https://nominatim.openstreetmap.org/",geocodingQueryParams:{},reverseQueryParams:{},htmlTemplate:function(e){var t,o=e.address,n=[];return(o.road||o.building)&&n.push("{building} {road} {house_number}"),(o.city||o.town||o.village||o.hamlet)&&(t=n.length>0?"leaflet-control-geocoder-address-detail":"",n.push('<span class="'+t+'">{postcode} {city} {town} {village} {hamlet}</span>')),(o.state||o.country)&&(t=n.length>0?"leaflet-control-geocoder-address-context":"",n.push('<span class="'+t+'">{state} {country}</span>')),h(n.join("<br/>"),o)}},initialize:function(e){a.a.Util.setOptions(this,e)},geocode:function(e,t,o){p(this.options.serviceUrl+"search",a.a.extend({q:e,limit:5,format:"json",addressdetails:1},this.options.geocodingQueryParams),a.a.bind((function(e){for(var n=[],s=e.length-1;s>=0;s--){for(var i=e[s].boundingbox,r=0;r<4;r++)i[r]=parseFloat(i[r]);n[s]={icon:e[s].icon,name:e[s].display_name,html:this.options.htmlTemplate?this.options.htmlTemplate(e[s]):void 0,bbox:a.a.latLngBounds([i[0],i[2]],[i[1],i[3]]),center:a.a.latLng(e[s].lat,e[s].lon),properties:e[s]}}t.call(o,n)}),this))},reverse:function(e,t,o,n){p(this.options.serviceUrl+"reverse",a.a.extend({lat:e.lat,lon:e.lng,zoom:Math.round(Math.log(t/256)/Math.log(2)),addressdetails:1,format:"json"},this.options.reverseQueryParams),a.a.bind((function(e){var t,s=[];e&&e.lat&&e.lon&&(t=a.a.latLng(e.lat,e.lon),s.push({name:e.display_name,html:this.options.htmlTemplate?this.options.htmlTemplate(e):void 0,center:t,bounds:a.a.latLngBounds(t,t),properties:e})),o.call(n,s)}),this))}});function B(e){return new T(e)}var F=a.a.Class.extend({options:{OpenLocationCode:void 0,codeLength:void 0},initialize:function(e){a.a.setOptions(this,e)},geocode:function(e,t,o){try{var n=this.options.OpenLocationCode.decode(e),s={name:e,center:a.a.latLng(n.latitudeCenter,n.longitudeCenter),bbox:a.a.latLngBounds(a.a.latLng(n.latitudeLo,n.longitudeLo),a.a.latLng(n.latitudeHi,n.longitudeHi))};t.call(o,[s])}catch(e){console.warn(e),t.call(o,[])}},reverse:function(e,t,o,n){try{var s={name:this.options.OpenLocationCode.encode(e.lat,e.lng,this.options.codeLength),center:a.a.latLng(e.lat,e.lng),bbox:a.a.latLngBounds(a.a.latLng(e.lat,e.lng),a.a.latLng(e.lat,e.lng))};o.call(n,[s])}catch(e){console.warn(e),o.call(n,[])}}});function S(e){return new F(e)}var Q=a.a.Class.extend({options:{serviceUrl:"https://api.opencagedata.com/geocode/v1/json",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,t){a.a.setOptions(this,t),this._accessToken=e},geocode:function(e,t,o){var n={key:this._accessToken,q:e};n=a.a.extend(n,this.options.geocodingQueryParams),p(this.options.serviceUrl,n,(function(e){var n,s,i,r=[];if(e.results&&e.results.length)for(var l=0;l<e.results.length;l++)i=e.results[l],n=a.a.latLng(i.geometry),s=i.annotations&&i.annotations.bounds?a.a.latLngBounds(a.a.latLng(i.annotations.bounds.northeast),a.a.latLng(i.annotations.bounds.southwest)):a.a.latLngBounds(n,n),r.push({name:i.formatted,bbox:s,center:n});t.call(o,r)}))},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,o,n){var s={key:this._accessToken,q:[e.lat,e.lng].join(",")};s=a.a.extend(s,this.options.reverseQueryParams),p(this.options.serviceUrl,s,(function(e){var t,s,i,r=[];if(e.results&&e.results.length)for(var l=0;l<e.results.length;l++)i=e.results[l],t=a.a.latLng(i.geometry),s=i.annotations&&i.annotations.bounds?a.a.latLngBounds(a.a.latLng(i.annotations.bounds.northeast),a.a.latLng(i.annotations.bounds.southwest)):a.a.latLngBounds(t,t),r.push({name:i.formatted,bbox:s,center:t});o.call(n,r)}))}});function j(e,t){return new Q(e,t)}var M=a.a.Class.extend({options:{serviceUrl:"https://api.geocode.earth/v1",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,t){a.a.Util.setOptions(this,t),this._apiKey=e,this._lastSuggest=0},geocode:function(e,t,o){var n=this;p(this.options.serviceUrl+"/search",a.a.extend({api_key:this._apiKey,text:e},this.options.geocodingQueryParams),(function(e){t.call(o,n._parseResults(e,"bbox"))}))},suggest:function(e,t,o){var n=this;p(this.options.serviceUrl+"/autocomplete",a.a.extend({api_key:this._apiKey,text:e},this.options.geocodingQueryParams),a.a.bind((function(e){e.geocoding.timestamp>this._lastSuggest&&(this._lastSuggest=e.geocoding.timestamp,t.call(o,n._parseResults(e,"bbox")))}),this))},reverse:function(e,t,o,n){var s=this;p(this.options.serviceUrl+"/reverse",a.a.extend({api_key:this._apiKey,"point.lat":e.lat,"point.lon":e.lng},this.options.reverseQueryParams),(function(e){o.call(n,s._parseResults(e,"bounds"))}))},_parseResults:function(e,t){var o=[];return a.a.geoJson(e,{pointToLayer:function(e,t){return a.a.circleMarker(t)},onEachFeature:function(e,n){var s,i,r={};n.getBounds?i=(s=n.getBounds()).getCenter():n.feature.bbox?(i=n.getLatLng(),s=a.a.latLngBounds(a.a.GeoJSON.coordsToLatLng(n.feature.bbox.slice(0,2)),a.a.GeoJSON.coordsToLatLng(n.feature.bbox.slice(2,4)))):(i=n.getLatLng(),s=a.a.latLngBounds(i,i)),r.name=n.feature.properties.label,r.center=i,r[t]=s,r.properties=n.feature.properties,o.push(r)}}),o}});function N(e,t){return new M(e,t)}var z=M,I=N,O=M,G=N,A=O.extend({options:{serviceUrl:"https://api.openrouteservice.org/geocode"}});function q(e,t){return new A(e,t)}var W=a.a.Class.extend({options:{serviceUrl:"https://photon.komoot.de/api/",reverseUrl:"https://photon.komoot.de/reverse/",nameProperties:["name","street","suburb","hamlet","town","city","state","country"]},initialize:function(e){a.a.setOptions(this,e)},geocode:function(e,t,o){var n=a.a.extend({q:e},this.options.geocodingQueryParams);p(this.options.serviceUrl,n,a.a.bind((function(e){t.call(o,this._decodeFeatures(e))}),this))},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,o,n){var s=a.a.extend({lat:e.lat,lon:e.lng},this.options.reverseQueryParams);p(this.options.reverseUrl,s,a.a.bind((function(e){o.call(n,this._decodeFeatures(e))}),this))},_decodeFeatures:function(e){var t,o,n,s,i,r,l=[];if(e&&e.features)for(t=0;t<e.features.length;t++)n=(o=e.features[t]).geometry.coordinates,s=a.a.latLng(n[1],n[0]),r=(i=o.properties.extent)?a.a.latLngBounds([i[1],i[0]],[i[3],i[2]]):a.a.latLngBounds(s,s),l.push({name:this._decodeFeatureName(o),html:this.options.htmlTemplate?this.options.htmlTemplate(o):void 0,center:s,bbox:r,properties:o.properties});return l},_decodeFeatureName:function(e){return(this.options.nameProperties||[]).map((function(t){return e.properties[t]})).filter((function(e){return!!e})).join(", ")}});function H(e){return new W(e)}var K=a.a.Class.extend({options:{serviceUrl:"https://api.what3words.com/v2/"},initialize:function(e){this._accessToken=e},geocode:function(e,t,o){p(this.options.serviceUrl+"forward",{key:this._accessToken,addr:e.split(/\s+/).join(".")},(function(e){var n,s,i=[];e.geometry&&(n=a.a.latLng(e.geometry.lat,e.geometry.lng),s=a.a.latLngBounds(n,n),i[0]={name:e.words,bbox:s,center:n}),t.call(o,i)}))},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,o,n){p(this.options.serviceUrl+"reverse",{key:this._accessToken,coords:[e.lat,e.lng].join(",")},(function(e){var t,s,i=[];200==e.status.status&&(t=a.a.latLng(e.geometry.lat,e.geometry.lng),s=a.a.latLngBounds(t,t),i[0]={name:e.words,bbox:s,center:t}),o.call(n,i)}))}});function J(e){return new K(e)}var $=a.a.Control.extend({options:{showUniqueResult:!0,showResultIcons:!1,collapsed:!0,expand:"touch",position:"topright",placeholder:"Search...",errorMessage:"Nothing found.",iconLabel:"Initiate a new search",queryMinLength:1,suggestMinLength:3,suggestTimeout:250,defaultMarkGeocode:!0},includes:a.a.Evented.prototype||a.a.Mixin.Events,initialize:function(e){a.a.Util.setOptions(this,e),this.options.geocoder||(this.options.geocoder=new T),this._requestCount=0},addThrobberClass:function(){a.a.DomUtil.addClass(this._container,"leaflet-control-geocoder-throbber")},removeThrobberClass:function(){a.a.DomUtil.removeClass(this._container,"leaflet-control-geocoder-throbber")},onAdd:function(e){var t,o="leaflet-control-geocoder",n=a.a.DomUtil.create("div",o+" leaflet-bar"),s=a.a.DomUtil.create("button",o+"-icon",n),i=this._form=a.a.DomUtil.create("div",o+"-form",n);return this._map=e,this._container=n,s.innerHTML="&nbsp;",s.type="button",s.setAttribute("aria-label",this.options.iconLabel),(t=this._input=a.a.DomUtil.create("input","",i)).type="text",t.value=this.options.query||"",t.placeholder=this.options.placeholder,a.a.DomEvent.disableClickPropagation(t),this._errorElement=a.a.DomUtil.create("div",o+"-form-no-error",n),this._errorElement.innerHTML=this.options.errorMessage,this._alts=a.a.DomUtil.create("ul",o+"-alternatives leaflet-control-geocoder-alternatives-minimized",n),a.a.DomEvent.disableClickPropagation(this._alts),a.a.DomEvent.addListener(t,"keydown",this._keydown,this),this.options.geocoder.suggest&&a.a.DomEvent.addListener(t,"input",this._change,this),a.a.DomEvent.addListener(t,"blur",(function(){this.options.collapsed&&!this._preventBlurCollapse&&this._collapse(),this._preventBlurCollapse=!1}),this),this.options.collapsed?"click"===this.options.expand?a.a.DomEvent.addListener(n,"click",(function(e){0===e.button&&2!==e.detail&&this._toggle()}),this):"touch"===this.options.expand?a.a.DomEvent.addListener(n,a.a.Browser.touch?"touchstart mousedown":"mousedown",(function(e){this._toggle(),e.preventDefault(),e.stopPropagation()}),this):(a.a.DomEvent.addListener(n,"mouseover",this._expand,this),a.a.DomEvent.addListener(n,"mouseout",this._collapse,this),this._map.on("movestart",this._collapse,this)):(this._expand(),a.a.Browser.touch?a.a.DomEvent.addListener(n,"touchstart",(function(){this._geocode()}),this):a.a.DomEvent.addListener(n,"click",(function(){this._geocode()}),this)),this.options.defaultMarkGeocode&&this.on("markgeocode",this.markGeocode,this),this.on("startgeocode",this.addThrobberClass,this),this.on("finishgeocode",this.removeThrobberClass,this),this.on("startsuggest",this.addThrobberClass,this),this.on("finishsuggest",this.removeThrobberClass,this),a.a.DomEvent.disableClickPropagation(n),n},setQuery:function(e){return this._input.value=e,this},_geocodeResult:function(e,t){if(!t&&this.options.showUniqueResult&&1===e.length)this._geocodeResultSelected(e[0]);else if(e.length>0){this._alts.innerHTML="",this._results=e,a.a.DomUtil.removeClass(this._alts,"leaflet-control-geocoder-alternatives-minimized"),a.a.DomUtil.addClass(this._container,"leaflet-control-geocoder-options-open");for(var o=0;o<e.length;o++)this._alts.appendChild(this._createAlt(e[o],o))}else a.a.DomUtil.addClass(this._container,"leaflet-control-geocoder-options-error"),a.a.DomUtil.addClass(this._errorElement,"leaflet-control-geocoder-error")},markGeocode:function(e){return e=e.geocode||e,this._map.fitBounds(e.bbox),this._geocodeMarker&&this._map.removeLayer(this._geocodeMarker),this._geocodeMarker=new a.a.Marker(e.center).bindPopup(e.html||e.name).addTo(this._map).openPopup(),this},_geocode:function(e){var t=this._input.value;if(e||!(t.length<this.options.queryMinLength)){var o=++this._requestCount,n=e?"suggest":"geocode",s={input:t};this._lastGeocode=t,e||this._clearResults(),this.fire("start"+n,s),this.options.geocoder[n](t,(function(t){o===this._requestCount&&(s.results=t,this.fire("finish"+n,s),this._geocodeResult(t,e))}),this)}},_geocodeResultSelected:function(e){this.fire("markgeocode",{geocode:e})},_toggle:function(){a.a.DomUtil.hasClass(this._container,"leaflet-control-geocoder-expanded")?this._collapse():this._expand()},_expand:function(){a.a.DomUtil.addClass(this._container,"leaflet-control-geocoder-expanded"),this._input.select(),this.fire("expand")},_collapse:function(){a.a.DomUtil.removeClass(this._container,"leaflet-control-geocoder-expanded"),a.a.DomUtil.addClass(this._alts,"leaflet-control-geocoder-alternatives-minimized"),a.a.DomUtil.removeClass(this._errorElement,"leaflet-control-geocoder-error"),a.a.DomUtil.removeClass(this._container,"leaflet-control-geocoder-options-open"),a.a.DomUtil.removeClass(this._container,"leaflet-control-geocoder-options-error"),this._input.blur(),this.fire("collapse")},_clearResults:function(){a.a.DomUtil.addClass(this._alts,"leaflet-control-geocoder-alternatives-minimized"),this._selection=null,a.a.DomUtil.removeClass(this._errorElement,"leaflet-control-geocoder-error"),a.a.DomUtil.removeClass(this._container,"leaflet-control-geocoder-options-open"),a.a.DomUtil.removeClass(this._container,"leaflet-control-geocoder-options-error")},_createAlt:function(e,t){var o=a.a.DomUtil.create("li",""),n=a.a.DomUtil.create("a","",o),s=this.options.showResultIcons&&e.icon?a.a.DomUtil.create("img","",n):null,i=e.html?void 0:document.createTextNode(e.name);return s&&(s.src=e.icon),o.setAttribute("data-result-index",t),e.html?n.innerHTML=n.innerHTML+e.html:n.appendChild(i),a.a.DomEvent.addListener(o,"mousedown touchstart",(function(t){this._preventBlurCollapse=!0,a.a.DomEvent.stop(t),this._geocodeResultSelected(e),a.a.DomEvent.on(o,"click touchend",(function(){this.options.collapsed?this._collapse():this._clearResults()}),this)}),this),o},_keydown:function(e){var t=this,o=function(e){t._selection&&(a.a.DomUtil.removeClass(t._selection,"leaflet-control-geocoder-selected"),t._selection=t._selection[e>0?"nextSibling":"previousSibling"]),t._selection||(t._selection=t._alts[e>0?"firstChild":"lastChild"]),t._selection&&a.a.DomUtil.addClass(t._selection,"leaflet-control-geocoder-selected")};switch(e.keyCode){case 27:this.options.collapsed?this._collapse():this._clearResults();break;case 38:o(-1);break;case 40:o(1);break;case 13:if(this._selection){var n=parseInt(this._selection.getAttribute("data-result-index"),10);this._geocodeResultSelected(this._results[n]),this._clearResults()}else this._geocode();break;default:return}a.a.DomEvent.preventDefault(e)},_change:function(){var e=this._input.value;e!==this._lastGeocode&&(clearTimeout(this._suggestTimeout),e.length>=this.options.suggestMinLength?this._suggestTimeout=setTimeout(a.a.bind((function(){this._geocode(!0)}),this),this.options.suggestTimeout):this._clearResults())}});a.a.Util.extend($,n);t.a=$;a.a.Util.extend(a.a.Control,{Geocoder:$,geocoder:function(e){return new $(e)}})},yLpj:function(e,t){var o;o=function(){return this}();try{o=o||new Function("return this")()}catch(e){"object"==typeof window&&(o=window)}e.exports=o}}]);