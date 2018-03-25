<!DOCTYPE html>
<html lang="en">
    <head>
        <!--- Basic Page Needs -->
        <meta charset="utf-8">
        <title>Project | 1</title>
        <!-- Styling -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="assets/css/style.css">
        <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/solid.js" integrity="sha384-+Ga2s7YBbhOD6nie0DzrZpJes+b2K1xkpKxTFFcx59QmVPaSA8c7pycsNaFwUK6l" crossorigin="anonymous"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/fontawesome.js" integrity="sha384-7ox8Q2yzO/uWircfojVuCQOZl+ZZBg2D2J5nkpLqzH1HY0C1dHlTKIbpRz/LG23c" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        
        <!-- Don't know what these are -->
        <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script> -->
        <!-- <script src="https://showtheway.io/w.js" async="async" type="text/javascript"></script> -->
    </head>
<body>
        <div class="w3-teal">
                <button class="w3-button w3-teal  w3-xlarge w3-right" onclick="openRightMenu()">&#9776;</button>
                <div class="w3-container">
                </div>
              </div>
              <div class="w3-sidebar w3-bar-block w3-card w3-animate-right" style="display:none;right:0;" id="rightMenu">
                    <button onclick="closeRightMenu()" class="w3-bar-item w3-button w3-large">Close &times;</button>
                    <a href="index.html" class="w3-bar-item w3-button">Home</a>
                    <a href="about.html" class="w3-bar-item w3-button">About</a>
                    <a href="https://showtheway.io/to/37.5503127,-77.46954690000001" class="w3-bar-item w3-button">Uber</a>
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
