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
var moreGirls = 0;
var moreDudes = 0;
$(".bar-quick-view").empty();
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
                          <div class="col-lg-3 col-sm-3" id="bar-status"><div class = "genderRatio" id="moreGirls" value = "${results[i].name}"></div></div>
                          <div class="col-lg-3 col-sm-3" id="bar-status"><div class = "genderRatio" id="moreGuys" value = "${results[i].name}"></div></div>
                          <div class="col-lg-3 col-sm-3" id="bar-status"><div class = "atmosphere" value = "${results[i].name}" ></div>
                          <button id="myBtn">Edit Info</button>
                          <div id="myModal" class="modal col-lg-12 col-sm-12">
                            <div class="modal-content"><span class="close">&times;</span><p>Some text in the Modal..</p></div>
                            </div>
                          </div>                          
                      </div>
                  </div>
    <div class="container-fluid text-center">
        <header class="full-width">
            <nav>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 logo"><img src="assets/images/logo.png"></div>
                    
                </div>
            </nav>
        </header>
    </div>
    <div class="container">
        <div class="row quick-view">
            <div class="col-lg-6 col-sm-12 map-control" id="map">
                <!-- <div id="map"></div>  had multiple id tags of sme thing-->
            </div>
            <div class="col-lg-5 col-sm-12 bar-quick-view">
                <div class="row barSection text-center">
                    <div class="col-lg-3 col-sm-3" id="bar-pic"></div>
                    <div class="col-lg-8 col-sm-8">
                        <div class="row">
                            <div class="col-lg-2 col-sm-2"></div>
                            <div class="col-lg-6 col-sm-6 text-center">
                                <h3 id="barName">Hello</h3></div>
                            <div class="col-lg-4 col-sm-4"><i class="fas fa-dollar-sign cost"></i></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-sm-3" id="bar-status"><i class="fas fa-circle-notch fa-spin fa-2x"></i></div>
                            <div class="col-lg-3 col-sm-3" id="bar-status"><i class="fas fa-circle-notch fa-spin fa-2x"></i></div>
                            <div class="col-lg-3 col-sm-3" id="bar-status"><i class="fas fa-circle-notch fa-spin fa-2x"></i>
                            </div>
                            <div class="col-lg-3 col-sm-3" id="openBarInfo">
                                <button>Open</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row barSection text-center">
                    <div class="col-lg-3 col-sm-3" id="bar-pic"></div>
                    <div class="col-lg-8 col-sm-8">
                        <div class="row">
                            <div class="col-lg-2 col-sm-2"></div>
                            <div class="col-lg-6 col-sm-6 text-center">
                                <h3 id="barName">Hello</h3></div>
                            <div class="col-lg-4 col-sm-4"><i class="fas fa-dollar-sign cost"></i></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-sm-3" id="bar-status"><i class="fas fa-circle-notch fa-spin fa-2x"></i></div>
                            <div class="col-lg-3 col-sm-3" id="bar-status"><i class="fas fa-circle-notch fa-spin fa-2x"></i></div>
                            <div class="col-lg-3 col-sm-3" id="bar-status"><i class="fas fa-circle-notch fa-spin fa-2x"></i>
                            </div>
                            <div class="col-lg-3 col-sm-3" id="openBarInfo">
                                <button>Open</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row barSection text-center">
                    <div class="col-lg-3 col-sm-3" id="bar-pic"></div>
                    <div class="col-lg-8 col-sm-8">
                        <div class="row">
                            <div class="col-lg-2 col-sm-2"></div>
                            <div class="col-lg-6 col-sm-6 text-center">
                                <h3 id="barName">Hello</h3></div>
                            <div class="col-lg-4 col-sm-4"><i class="fas fa-dollar-sign cost"></i></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-sm-3" id="bar-status"><i class="fas fa-circle-notch fa-spin fa-2x"></i></div>
                            <div class="col-lg-3 col-sm-3" id="bar-status"><i class="fas fa-circle-notch fa-spin fa-2x"></i></div>
                            <div class="col-lg-3 col-sm-3" id="bar-status"><i class="fas fa-circle-notch fa-spin fa-2x"></i>
                            </div>
                            <div class="col-lg-3 col-sm-3" id="openBarInfo">
                                <button>Open</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col-lg-12 col-sm-12">
                        <i class="fas fa-angle-double-down fa-2x"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>  
   <!-- Scripts -->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <!-- Firebase -->
        <script src="https://www.gstatic.com/firebasejs/4.12.0/firebase.js"></script>
        <script src="assets/javascript/map.js"></script>
        <!-- Google Maps -->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFjokBeMIo4mkf81PUPUIQ4W72LzO30v8&callback=initMap&libraries=places" async defer></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                  <script>
                        function openLeftMenu() {
                            document.getElementById("leftMenu").style.display = "block";
                        }
                        function closeLeftMenu() {
                            document.getElementById("leftMenu").style.display = "none";
                        }
                        
                        function openRightMenu() {
                            document.getElementById("rightMenu").style.display = "block";
                        }
                        function closeRightMenu() {
                            document.getElementById("rightMenu").style.display = "none";
                        }
                        </script>
    </body>
</html>
