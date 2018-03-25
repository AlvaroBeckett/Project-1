// Initialize Firebase
//This is Julia's
var config = {
    apiKey: "AIzaSyBOBuTY5eVKNK1z9PEsQyXeiI6-Lemj_TA",
    authDomain: "project-1-727b9.firebaseapp.com",
    databaseURL: "https://project-1-727b9.firebaseio.com",
    projectId: "project-1-727b9",
    storageBucket: "project-1-727b9.appspot.com",
    messagingSenderId: "275641339042"
};
//this is Justin's
// var config = {
//   apiKey: "AIzaSyBmdyo7rT8OHlIIapaqpLU6irujKCi1Z-k",
//   authDomain: "project-1-b3e7e.firebaseapp.com",
//   databaseURL: "https://project-1-b3e7e.firebaseio.com",
//   projectId: "project-1-b3e7e",
//   storageBucket: "project-1-b3e7e.appspot.com",
//   messagingSenderId: "48007011983"
// };

firebase.initializeApp(config);
var database = firebase.database();

var barName = "";

var map;
var infoWindow;
//var currentLocation;

//get map and display current location, being called in html
function initMap() {
    //setting a default location and bringing up the map
    var defaultLocation = { lat: 37.5407, lng: -77.4360 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 12
    });

    infoWindow = new google.maps.InfoWindow();
    //if geolocation available, will grab currentLocation
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

            //will then search for nearby breweries and bars (can probably move this outside the of statement and use location)
            // -> calling findPlaces
            var service = new google.maps.places.PlacesService(map);
            findPlaces(service, currentLocation, 'bar', 'assets/images/beer.png');
            findPlaces(service, currentLocation, 'brewery', 'assets/images/brewery.png');


            //geolocation available, but error -> calls handleLocationError
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }
    //geolocation not available -> calls handleLocationError
    else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    //handlers location errors
    function handleLocationError(browserHasGeolocation, infoWindow, currentLocation) {
        infoWindow.setPosition(currentLocation);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    //finds places based on a query, then -> calls placesCallback 
    function findPlaces(service, location, keyword, icon) {
        var request = {
            location: location,
            radius: '1000', //changed this from 5000 for testing
            keyword: keyword, //=========================== change to keyword for nearby search
            icon: icon,
        };

        service.nearbySearch(request, placesCallback(icon)); //=============================== more accurate results, allows to rank by distance if we want (default = prominence)
    }

    //gets information about all the places that match a query -> calls createMarker
    function placesCallback(icon) {
        return function (results, status) {

            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i], icon);
                    var placeID = results[i].place_id;
                    var request = {
                        placeId: placeID
                    };
                    service = new google.maps.places.PlacesService(map);
                    service.getDetails(request, callback)
                    function callback(place, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            console.log("place id2 " + place.place_id);
                            console.log("price " + place.price_level);
                            console.log("open? " + place.opening_hours.open_now);///can use this to only display what's open now too
                            $(".bar-quick-view").append(
                                `<div class="row barSection text-center">
                            <div class="bar-name col-sm-12">${place.name}</div>
                                <div class="col-sm-12">
                                    Open? | ${place.vicinity} | <a href="${place.website}" target="_blank">website</a>
                                </div>
                                <div>
                                <button class="rate">Rate</button>
                                </div>`
                            );
                        }
                    }
                }
            }
        }
    }

    //creates marker for place
    function createMarker(place, icon) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: icon,
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(place.name);
            infoWindow.open(map, this);
        });
    }
}

var modal = $("#myModal");
console.log (modal);
$(".rate").on("click", function() {
});


