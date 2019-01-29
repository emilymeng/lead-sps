//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");
require("leaflet.sync")



//get access to Leaflet and the map
var element = document.querySelector("leaflet-map.SPS");
var L = element.leaflet;
var mapSPS = element.map;

//ICH code for popup template if needed----------
var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

 //map sync
var center = [47.604575, -122.334715];
var layer1 = L.tileLayer('http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  });
var layer2 = L.tileLayer('http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  });
var map1 = L.map('map1', {
            layers: [layer1],
            center: center,
            zoom: 11
        });
map1.attributionControl.setPrefix('');
var map2 = L.map('map2', {
            layers: [layer2],
            center: center,
            zoom: 11,
        });
map1.sync(map2);
map2.sync(map1);


//map 1

var data = require("./lead-count.geo.json");
var mapElementSPS = document.querySelector("leaflet-map.SPS");

data.features.forEach(function(f) {
  ["aboveTwo", "aboveTen"].forEach(function(prop) {
    f.properties[prop] = (f.properties[prop]*100).toFixed(1);
  });
});

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))

    layer.on({
      mouseover: function(e) {
        layer.setStyle({ weight: 3, fillOpacity: .8 });
      },
      mouseout: function(e) {
        layer.setStyle({ weight: 1, fillOpacity: 0.6 });
      }
    });
};

// function getColor(d) {
//   return  d >= 7 ? '#d73027' :
//           d >= 4 ? '#f46d43' :
//           d >= 1 ? '#fee090' :
//     '#abd9e9';
// }

function geojsonMarkerOptions(feature) {

  return {
    radius: 5.5,
    fillColor: getColor(feature.properties.leadSourceAboveTen),
    color: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6
  }
};

var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
    },
    style: geojsonMarkerOptions,
    onEachFeature: onEachFeature
}).addTo(map1);

 map1.scrollWheelZoom.disable();

//map 2

var element = document.querySelector("leaflet-map.noah");
var L2 = element.leaflet;
var mapNoah = element.map;

var dataNoah = require("./lead-count.geo.json");
var mapElementNoah = document.querySelector("leaflet-map.noah");

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))

    layer.on({
      mouseover: function(e) {
        layer.setStyle({ weight: 3, fillOpacity: .8 });
      },
      mouseout: function(e) {
        layer.setStyle({ weight: 1, fillOpacity: 0.6 });
      }
    });
};

function getColor(d) {
  // return  d >= 7 ? '#d73027' :
          // d >= 4 ? '#f46d43' :
      return d >= 1 ? '#f46d43' :
    '#abd9e9';
}

function geojsonMarkerOptions2(feature) {

  return {
    radius: 5.5,
    fillColor: getColor(feature.properties.leadSourceAboveTwo),
    color: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6
  }
};

var geojson = L2.geoJson(dataNoah, {
    pointToLayer: function (feature, latlng) {
        return L2.circleMarker(latlng);
    },
    style: geojsonMarkerOptions2,
    onEachFeature: onEachFeature
}).addTo(map2);

 map2.scrollWheelZoom.disable();
