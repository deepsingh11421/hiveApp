console.log("jsdfhk");

var mentors = document.getElementById("mentors");


function nextPage(mentorPos) {
    if (mentorPos == "men1") {
     
      window.open("./rqst_appoint.html?men1", "_self");
    } else if (mentorPos == "men2") {
      
      window.open("./rqst_appoint.html?men2", "_self");
    } else if (mentorPos == "men3") {
     
      window.open("./rqst_appoint.html?men3", "_self");
    } else if (mentorPos == "men4") {
     
      window.open("./rqst_appoint.html?men4", "_self");
    }
}


// var locations = [
//   ["Bondi Beach", -33.890542, 151.274856, 4],
//   ["Coogee Beach", -33.923036, 151.259052, 5],
//   ["Cronulla Beach", -34.028249, 151.157507, 3],
//   ["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
//   ['<a href="./mentor4.html">Sandy</a>', -33.950198, 151.259302, 1],
// ];

// var map = new google.maps.Map(document.getElementById("map"), {
//   zoom: 10,
//   center: new google.maps.LatLng(-33.92, 151.25),
//   mapTypeId: google.maps.MapTypeId.ROADMAP,
// });

// var infowindow = new google.maps.InfoWindow();

// var marker, i;

// for (i = 0; i < locations.length; i++) {
//   marker = new google.maps.Marker({
//     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//     map: map,
//   });

//   google.maps.event.addListener(
//     marker,
//     "click",
//     (function (marker, i) {
//       return function () {
//         infowindow.setContent(locations[i][0]);
//         infowindow.open(map, marker);
//       };
//     })(marker, i)
//   );
// }


var mymap = L.map("map").setView([51.505, -0.09], 12);

L.tileLayer(
  "https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=9JPOzJ9eJaZ6UE6q7whH",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }
).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);
var marker1 = L.marker([51.508, -0.11]).addTo(mymap);
var marker2 = L.marker([51.509, -0.08]).addTo(mymap);
var marker3 = L.marker([51.51, -0.047]).addTo(mymap);
marker.bindPopup("<a href='./mentor1.html'>Larry Bums</a>").closePopup();
marker1.bindPopup("<a href='./mentor2.html'>Stephen Burt</a>").closePopup();
marker2.bindPopup("<a href='./mentor3.html'>Edward Burtynsky</a>").closePopup();
marker3.bindPopup("<a href='./mentor4.html'>David Byrne</a>").closePopup();

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

mymap.on("click", onMapClick);