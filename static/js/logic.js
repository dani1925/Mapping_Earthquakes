// Add console.log to check to see if our code is working.
console.log("working");
console.log(API_KEY);
// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [
      40.7, -94.5
    ],
    zoom: 4
  });

  var streets =L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);

// Get data from cities.js
let cityData = cities;

// Coordinates for each point to be used in the line.
// Coordinates for each point to be used in the polyline.
let line = [
  [33.9416, -118.4085],
  [37.6213, -122.3790],
  [40.7899, -111.9791],
  [47.4502, -122.3088]
];

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
  console.log(city)
  L.circleMarker(city.location,{
    radius: city.population/100000,
    color:"yellow"

  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
.addTo(map);
});

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
  // We turn each feature into a marker on the map.
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng)
    .bindPopup("<h2>" + feature.properties.city + feature.properties.name+ "</h2>");
  }

}).addTo(map);


