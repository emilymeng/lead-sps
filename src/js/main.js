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

var data = require("./SPS-lead.geo.json");
var mapElement = document.querySelector("leaflet-map.SPS");

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))

    layer.on({
      mouseover: function(e) {
        layer.setStyle({ weight: 3, fillOpacity: .8 });
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 1, fillOpacity: 0.6 });
      }
    });
};

function getColor(d) {
  return  d >= .21 ? '#d73027' :
          d >= .11 ? '#f46d43' :
          d >= .01 ? '#fee090' :
    '#abd9e9';
}

function geojsonMarkerOptions(feature) {

  return {
    radius: 6,
    fillColor: getColor(feature.properties.aboveTen),
    color: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7
  }
};

var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
    },
    style: geojsonMarkerOptions,
    onEachFeature: onEachFeature
}).addTo(map);

 map.scrollWheelZoom.disable();

//second map
var dataNoah = require("./SPS-lead.geo.json");
var mapElement2 = document.querySelector("leaflet-map.noah");

var onEachFeature2 = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))

    layer.on({
      mouseover: function(e) {
        layer.setStyle({ weight: 3, fillOpacity: .8 });
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 1, fillOpacity: 0.6 });
      }
    });
};

function getColor2(d) {
  return  d >= .21 ? '#d73027' :
          d >= .11 ? '#f46d43' :
          d >= .01 ? '#fee090' :
    '#abd9e9';
}

function geojsonMarker2Options(feature) {

  return {
    radius: 6,
    fillColor: getColor2(feature.properties.aboveTwo),
    color: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7
  }
};

var geojson = L.geoJson(dataNoah, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker2(latlng);
    },
    style: geojsonMarker2Options,
    onEachFeature2: onEachFeature2
}).addTo(map);

 map.scrollWheelZoom.disable();

