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
                    console.log(results[i]);
                    var placeID = results[i].place_id;
                    var request = {
                        placeId: placeID
                    };
                    service = new google.maps.places.PlacesService(map);
                    service.getDetails(request, callback)
                    function callback(place, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            console.log("place id " + place.place_id);
                            console.log("price " + place.price_level);
                            console.log("open? " + place.opening_hours.open_now);///can use this to only display what's open now too
                            $(".bar-quick-view").append(
                                `<div class="row barSection text-center">
                            <div class="bar-name col-sm-12">${place.name}</div>
                                <div class="col-sm-12">
                                    Open? | ${place.vicinity} | <a href="${place.website}" target="_blank">website</a>
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

var ratings =[
    {question: "Guy/Girl Ratio",
    answerChoices: ["More Guys", "More Gals", "Equal Ratio"],
    },
    {question: "Atmosphere",
    answerChoices: ["Dead", "Chill", "Inviting", "Epic"],
    },
    {question: "Cleanliness",
    answerChoices: ["Gross", "Eh...", "Clean"],
    },
];

//when rate clicked, will show modal and grabs the bar name and id
$(document).on("click",".rate", function(){
    $("#myModal").css("display", "block");
    var barName = $(this).data("name");
    var placeID = $(this).data("id");
    console.log("id: " + placeID);

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
    $("form").append(
        `<div class="form-group">
            <button id="submit" class="btn btn-primary " name="submit" type="submit">Submit</button>
        </div>`
    );
});

$("#submit").on("click", function (event) {
    event.preventDefault();

//*** need to do something where it can look at database and if the placeid is in there it will update the ratings (all counters) 
//if not then it will creat the setup.
//and then it will update the counter with the input
//then run thorough each category and find counter with most-> that's what should be display as " current" rating


    //creates a rating setup and add its to database with the place id as the id
    var newRating = {
        name: barName,
        R1: { moreGuys: 0, moreGals: 0, EqualRatio: 0 },
        R2: { Dead: 0, Chill: 0, Inviting: 0, Epic: 0 },
        R3: { Gross: 0, Eh: 0, Clean: 0 }
    };
    console.log("new rating " + newRating)
    database.ref().child(placeID).set(newRating);

     //Grab selections (not currently working but it was)
     for (var i = 0; i < ratings.length; i++) {
        console.log("Selected:" + $(`input:radio[name="${ratings[i].question}"]:checked`).val());
        //grab answer choices
        for (var j = 0; j < ratings[i].answerChoices.length; j++) {
        }
    }
});

//closing the modal
$(".close").on ("click", function () {
    $("#myModal").css("display", "none");
});





//++++++++++++++++++++++++++++++++++++++
//Getting new rating into firebase
var database = firebase.database();
database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(child) {
        console.log(child.key+": "+ child.val());
      });
});

$("#submit").on("click", function (event) {
    event.preventDefault();

    //Grab selections
    for (var i = 0; i < ratings.length; i++) {
        console.log("Selected:" + $(`input:radio[name="${ratings[i].question}"]:checked`).val());
        //grab answer choices
        for (var j = 0; j < ratings[i].answerChoices.length; j++) {
        }
    }


    var newR1 = r1; //(r1 + storedR1)/numberRatings;
    var newR2 = r2;//(r2 + storedR2)/numberRatings;
    var newR3 = r3;//(r3 + storedR3)/numberRatings;

    var newRating = {
        name: $("#bar-name").val(),
        R1: newR1,
        R2: newR2,
        R3: newR3, //add timestamp?
    };

    console.log(newRating)
    database.ref().push(newRating);
    //clear inputs
    $("input").val("");

    $("#r1avg").empty().html(newR1);
    $("#r2avg").empty().html(newR2);
    $("#r3avg").empty().html(newR3);
});

