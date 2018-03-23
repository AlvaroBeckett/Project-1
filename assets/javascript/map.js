// Initialize Firebase
var config = {
  apiKey: "AIzaSyBOBuTY5eVKNK1z9PEsQyXeiI6-Lemj_TA",
  authDomain: "project-1-727b9.firebaseapp.com",
  databaseURL: "https://project-1-727b9.firebaseio.com",
  projectId: "project-1-727b9",
  storageBucket: "project-1-727b9.appspot.com",
  messagingSenderId: "275641339042"
};
firebase.initializeApp(config);

var map;
var infoWindow;
var currentLocation;

//get map and display current location, being called in html
function initMap() {
  var defaultLocation = { lat: 37.5407, lng: -77.4360 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: defaultLocation,
    zoom: 12
  });

  function createMarker(place, icon) {
    //getting object info___________________
    console.log(place, icon);
    
    //_______________________________
   
    //var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: icon,
    });
    console.log("marker: %O", marker);
    // marker.setMap(map);  
     
    
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

  function placesCallback(icon) {
    return function(results, status) {
      console.log("results array?" + results);
    
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i], icon);
          console.log(results[i].name);
          $("#bar-container").append(`<div id="${results[i].name}"><p>${results[i].name}</p></div>`);
        }
      }
    };
  }

  function findPlaces(service, location, query, icon) {
    var request = {
      location: location,
      radius: '5000',
      query: query,
      icon: icon,
    };
  
    service.textSearch(request, placesCallback(icon));
  }
  
  infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(currentLocation);
      infoWindow.setContent('You are here');
      infoWindow.open(map);
      map.setCenter(currentLocation);
      
      var service = new google.maps.places.PlacesService(map);
      //  findBars(service, currentLocation);
      //  findBreweries(service, currentLocation);
      findPlaces(service, currentLocation, 'bar', 'assets/images/beer.png');
      findPlaces(service, currentLocation, 'brewery', 'assets/images/brewery.png');
    
      //service = new google.maps.places.PlacesService(map);
      //service.nearbySearch(request, callback);
    

      //geolocation available, but error
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
  //geolocation not available
  else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
  
}

//Handling errors if geolocation not available
function handleLocationError(browserHasGeolocation, infoWindow, currentLocation) {
  infoWindow.setPosition(currentLocation);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


//take these bars and display in html, each with own div (this will also display rating for each bar)
// for each marker visible, add div with it's name and then the rating (grabbing name, other stuff we create)
//will want to take ratings into firebase, average them, and output the average to the html

//===================================================