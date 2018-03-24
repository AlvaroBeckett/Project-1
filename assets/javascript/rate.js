
var database = firebase.database();
database.ref().once("value").then(function(snapshot) {
    console.log(snapshot);
});
barName = "bar1";
//pull bar name, if it exists add to rating else create new rating
//+++++++++++++++++++++++++++++
//Display on page; displays for every child and then when new child added
// console.log(database.ref());

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    //static variables
    var barName = childSnapshot.val();

     if (barName = $("#bar-name").val()) {
        //  console.log("match");
     }
     else {
        //  console.log("no match")
     }
    });

//++++++++++++++++++++++++++

var storedR1;
var storedR2;
var storedR3;
var numberRatings;
var lastRated;

$("#submit").on("click", function (event) {
    event.preventDefault();

    var r1 = $("#r1").val();
    var r2 = $("#r2").val();
    var r3 = $("#r3").val();

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