//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

//ICH code for popup template if needed----------
var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

// var onEachFeature = function(feature, layer) {
//   layer.bindPopup(ich.popup(feature.properties))
// };
// var onEachFeature = function(feature, layer) {
//   layer.bindPopup(ich.popup(feature.properties))
// };

// var data = require("./sps_lead.geo.json");

 var markers = [];
 var latest = null;
 var markergroup = L.featureGroup()

 var commafy = s => s.toLocaleString().replace(/\.0+/, "")
 console.log(window.lead)

window.lead.forEach(function(data) {    
	var marker = L.marker([data.lat, data.lng], {
     icon: L.divIcon({
       className: "leaflet-div-icon lead-icon " + data.aboveTen
   })

 });

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))

  layer.on({
  	     mouseover: function(e) {
        layer.setStyle({ weight: 3, fillOpacity: .8 });
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 2, fillOpacity: 0.5 });
      }
    });
	};

// function geojsonMarkerOptions(feature) {
//   console.log(feature.properties)

//   return {
//     radius: 5,
//     // fillColor: getColor(feature.properties.type),
//     fillColor: "#89d359",
//     color: "#000000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.6
//   }
// };

// var geojson = L.geoJson(data, {
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng);
//     },
//     style: geojsonMarkerOptions,
//     onEachFeature: onEachFeature
// }).addTo(map);


// var onEachFeature = function(feature, layer) {
//   layer.bindPopup(ich.popup(feature.properties))
// };

  // marker.bindPopup(html);
  markers.push(marker);
  marker.addTo(markergroup);
});

markergroup.addTo(map);

 map.scrollWheelZoom.disable();