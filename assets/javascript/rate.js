var config = {
    apiKey: "AIzaSyBOBuTY5eVKNK1z9PEsQyXeiI6-Lemj_TA",
    authDomain: "project-1-727b9.firebaseapp.com",
    databaseURL: "https://project-1-727b9.firebaseio.com",
    projectId: "project-1-727b9",
    storageBucket: "project-1-727b9.appspot.com",
    messagingSenderId: "275641339042"
};

firebase.initializeApp(config);

var database = firebase.database();

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

//get random bar name for testing =====================================
var barNames = ["bar1", "bar2", "bar3"];
var index = Math.floor(Math.random() * barNames.length);
var barName = barNames[index];
var placeID = barName + "id";

$("#bar-name").html(barName);
//======================================================================

//displaying questions and answer choices =====================================
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
//======================================================================


//check to see if placeID is in database
var ratingExists;
database.ref(placeID).on("value", function (snap) {
    var snapshot = snap.val()
    //if it's not in the database, add a blank rating setup
    if (snapshot === null) {
        console.log("not here");
        ratingExists = false;
        var q1 = ratings[0];
        var newRating = {
            name: barName,
            "Guy to Girl Ratio" : { "More Guys": 0, "More Gals": 0, "Equal Ratio": 0 },
            "Atmosphere": { "Dead": 0, "Chill": 0, "Inviting": 0, "Epic": 0 },
            "Cleanliness": { "Gross": 0, "Eh": 0, "Clean": 0 }
        };
        console.log("new rating " + newRating)
        database.ref().child(placeID).set(newRating);
    }
    else {
        ratingExists = true;
        console.log(snap.val());
        var place = snap.val();
        console.log(place.R1);
    }
});


$("#submit").on("click", function (event) {
    event.preventDefault();

    //Grab selections
    for (var i = 0; i < ratings.length; i++) {
        console.log(ratings[i].question);
        // console.log("Selected:" + $(`input:radio[name="${ratings[i].question}"]:checked`).val());

        //crate variable with selection, if that variable === the string of the rating, add 1 to the count of that rating
        var questionName = ratings[i].question;
        var selected = $(`input:radio[name="${ratings[i].question}"]:checked`).val()
        
       
        //run through all rating choices for bar
        // var ratingChoice ="whatever";
        // if (selected === ratingChoice) {
        //add 1 to rating choice counter
    }

    // var nRating = {
    //     name: barName,
    //     R0: { moreGuys: 0, "more Gals": 0, EqualRatio: 0 },
    //     R1: { Dead: 0, Chill: 0, Inviting: 0, Epic: 0 },
    //     R2: { Gross: 0, Eh: 0, Clean: 0 }
    // };

    // // newRating.R1.moreGuys = newRating.R1.moreGuys++;
    // console.log(nRating);




    // // getting snapshot of database
    // database.ref().on("value", function (snapshot) {
    //     //gets the unique key
    //     snapshot.forEach(function (placeId) {
    //         //prints once for each child of whole database (pace Ids)
    //         console.log("place ID:" + placeId.key);
    //         // placeId.forEach( function (child) {
    //         //prints out once for each child of the key(rotation through)
    //         // console.log("child" + child.val());
    //         // if(child.key === placeID) {
    //         //     console.log("they match");
    //         // };
    //     });
    // });
    //clear inputs
    $("input").val("");
});


function update() {
    console.log("updated");
}




//Code Below can grab particular parts of the objects in the database
// function barCheck(placeName){
//     database.ref().orderByChild("dateAdded").on("child_added", function(snapshot){
//         var sv = snapshot.val();
//         console.log("below");
//         console.log(sv[placeName].R1);
//     })
//     }
//     console.log("function check below");
//     var barNameChecking = "bar3id";
//     barCheck(barNameChecking);



// database.ref().once("value", snapshot => {
//     const place = snapshot.val();
//     console.log("wait");
//     if (placeID === place){
//         console.log("user exists!");
//         console.log(place);
//     }
//  });

