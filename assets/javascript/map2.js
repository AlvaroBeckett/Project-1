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
                    console.log(results[i]);
                    var placeID = results[i].place_id;
                    var request = {
                        placeId: placeID
                    };
                    //getting place details
                    service = new google.maps.places.PlacesService(map);
                    service.getDetails(request, callback)
                    function callback(place, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            //for displaying is open or not
                            var isOpen = "???";
                            if (place.opening_hours.open_now) {
                                isOpen = "Open";
                            }
                            else if (place.opening_hours.open_now === false) {
                                isOpen = "Closed";
                            }
                            $(".bar-quick-view").append(
                                `<div class="row barSection text-center">
                            <div class="bar-name col-sm-12">${place.name}</div>
                                <div class="col-sm-12">
                                    ${isOpen} | ${place.vicinity} | <a href="${place.website}" target="_blank">website</a>
                                </div>
                                <div>
                                <button class="rate" data-name="${place.name}" data-id="${place.place_id}">Rate</button> 
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


//===================== Modal Stuff
var ratings = [
    {
        question: "Guy to Girl Ratio",
        answerChoices: ["More Guys", "More Girls", "Equal Ratio"],
    },
    {
        question: "Atmosphere",
        answerChoices: ["Dead", "Chill", "Inviting", "Epic"],
    },
    {
        question: "Cleanliness",
        answerChoices: ["Gross", "Eh", "Clean"],
    },
];

//when rate clicked, will show modal and grabs the bar name and id
$(document).on("click", ".rate", function () {
    $("#myModal").css("display", "block");
    var barName = $(this).data("name");
    var placeID = $(this).data("id");
    console.log("id: " + placeID);

    //clearing form and setting showing bar name for bar clicked
    $("form").empty();
    $("#bar-name").html(barName);


    //displaying questions and answer choices 
    //display question
    for (var i = 0; i < ratings.length; i++) {
        $("form").append(
            `<div id="rating${i}" class="form-group">
        <label class="control-label">${ratings[i].question}</label>
        </div>`);
        //display rating options
        for (var j = 0; j < ratings[i].answerChoices.length; j++) {
            $(`#rating${i}`).append(
                `<div class="radio">
            <label>
            <input type="radio" name="${ratings[i].question}" value="${ratings[i].answerChoices[j]}">
             ${ratings[i].answerChoices[j]}
            </label>
            </div>`);
        }
    }
    //submit button
    $("form").append(
        `<div class="form-group">
		<button id="submit" class="btn btn-primary " name="submit" type="submit">Submit</button>
	</div>`
    );


    //check to see if placeID is in database
    database.ref(placeID).on("value", function (snap) {
        var snapshot = snap.val()
        //if it's not in the database, add a blank rating setup
        if (snapshot === null) {
            console.log("not here");
            var q1 = ratings[0];
            var newRating = {
                name: barName,
                "Guy to Girl Ratio": { "More Guys": 0, "More Gals": 0, "Equal Ratio": 0 },
                "Atmosphere": { "Dead": 0, "Chill": 0, "Inviting": 0, "Epic": 0 },
                "Cleanliness": { "Gross": 0, "Eh": 0, "Clean": 0 }
            };
            console.log("new rating " + newRating)
            database.ref().child(placeID).set(newRating);
        }
        else {
            console.log(snap.val());
        }
    });


    $("#submit").on("click", function (event) {
       
console.log ("hey");

        //Grab selections
        for (var i = 0; i < ratings.length; i++) {

            //grab question name and selection
            var questionName = ratings[i].question;
            var selected = $(`input:radio[name="${ratings[i].question}"]:checked`).val()

            //update rating for each rating question
            database.ref(placeID).once("value", function (snap) {
                var snapshot = snap.val();
                currentValue = snapshot[questionName][selected];
                currentValue++;
                database.ref().child(placeID).child(questionName).child(selected).set(currentValue);
            });
        }
    });

    //closing the modal
    $(".close").on("click", function () {
        $("#myModal").css("display", "none");
    });

});