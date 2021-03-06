// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBOBuTY5eVKNK1z9PEsQyXeiI6-Lemj_TA",
//   authDomain: "project-1-727b9.firebaseapp.com",
//   databaseURL: "https://project-1-727b9.firebaseio.com",
//   projectId: "project-1-727b9",
//   storageBucket: "project-1-727b9.appspot.com",
//   messagingSenderId: "275641339042"
// };
var config = {
    apiKey: "AIzaSyBmdyo7rT8OHlIIapaqpLU6irujKCi1Z-k",
    authDomain: "project-1-b3e7e.firebaseapp.com",
    databaseURL: "https://project-1-b3e7e.firebaseio.com",
    projectId: "project-1-b3e7e",
    storageBucket: "project-1-b3e7e.appspot.com",
    messagingSenderId: "48007011983"
};
firebase.initializeApp(config);
var database = firebase.database();
var barName = "";
var moreGirls = 0;
var moreDudes = 0;
$(".bar-quick-view").empty();
var map;
var infoWindow;
var currentLocation;
var counter =0;

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


        google.maps.event.addListener(marker, 'click', function() {
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
                    var modal = $('#myModal');
                    var modalPop = $('.modal')
                    var btn = $('#myBtn');
                    var span = document.getElementsByClassName("close")[0];

                    $(".container").append(`<div class="row quick-view">
          <div class="col-lg-5 col-sm-12 bar-quick-view">
              <div class="row barSection text-center">
                  <div class="col-lg-3 col-sm-3" id="bar-pic"></div>
                  <div class="col-lg-8 col-sm-8">
                      <div class="row">
                          <div class="col-lg-2 col-sm-2"></div>
                          <div class="col-lg-8 col-sm-6 text-center">
                              <h2 id="barName">${results[i].name}</h2></div>
                          <div class="col-lg-2 col-sm-4"><i class="fas fa-dollar-sign cost"></i></div>
                      </div>
                      <div class="row">
                          
                          <button id="myBtn" value = "${results[i].name}">Edit Info</button>
                          <div id="myModal" class="modal col-lg-12 col-sm-12" >
                            <div class="modal-content"><span class="close">&times;</span>
                            <form>
                            
                            <p class="info-heading">Gender Ratio:</p>
                            <div class="row text-center">
                            
                             <input type="radio" id="moreGuys"><label for="moreGuys">More Guys</label>
                             <input type="radio" id="moreGals"><label for="moreGals">More Gals</label>
                             
                             </div>

                             <p class="info-heading">Atmosphere:</p>
                             <div class="row text-center">
                             <input type="radio" id="atmostDead"><label for="atmostDead">Dead</label>
                             <input type="radio" id="atmostChill"><label for="atmostChill">Chill</label>
                             <input type="radio" id="atmostInvite"><label for="atmostInvite">Inviting</label>
                             <input type="radio" id="atmostEpic"><label for="atmostEpic">Epic</label>
                             </div>

                             <p class="info-heading">Overall Cleanliness:</p>
                             <div class="row text-center">
                             <input type="radio" id="cleanGross"><label for="cleanGross">Gross</label>
                             <input type="radio" id="cleanEhh"><label for="cleanEhh">Ehh...</label>
                             <input type="radio" id="cleanClean"><label for="cleanClean">Clean</label>
                             
                             </div>
                             
                             </form>

                             <button id='submit'>Submit</button>
                          <br>
                             

                             <p class="info-heading">Display Averages:</p>
                             <p><span id="r1avg"></span> <span id="r2avg"></span> <span id="r3avg"></span></p></div>
                            </div>
                          </div>                          
                      </div>
                  </div>
              </div>`);


                }
                
                var GalCount = 0;
                var GuyCount = 0;
                $('button').click(function() {

                    barName = $(this).val().trim();
                    counter += 1;
                    moreGals = 0;
                    
                    console.log(counter);
                    if($(this).text()=="Edit Info"&& counter%2==0){
                    modalPop.css("display", "block");
                    console.log("Bar: " + barName);
                    }

                    if ($(this).text()=="Submit") {

                      console.log("submit");

                    };
                    // if($this).text(){};
                    // if($this).text(){};
                    // if($this).text(){};
                    // if($this).text(){};
                    // if($this).text(){};
                    // if($this).text(){};
                    // if($this).text(){};
                   database.ref().push({
                       barName: barName,
                       moreGals: GalCount,
                       moreGuys: GuyCount
                   })
                });

                $('span').click(function() {
                    modalPop.css("display", "none");
                })

            }
            
        };
        $("button").click(function(){
            var barNAME = $(this).val();
            console.log("Trying: " + barNAME);

        })

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
        navigator.geolocation.getCurrentPosition(function(position) {
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
        }, function() {
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

//not working because working asynchronously
//var iconTypeBars;
//var iconTypeBreweries;



//var service = new google.maps.places.PlacesService(map);
//service.textSearch(request, callback);
//service.textSearch(request2, callback);


//Creating bar markers

function callback(results, status) {
    

}


//take these bars and display in html, each with own div (this will also display rating for each bar)
// for each marker visible, add div with it's name and then the rating (grabbing name, other stuff we create)
//will want to take ratings into firebase, average them, and output the average to the html

//===================================================
