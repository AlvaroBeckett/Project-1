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

//get random bar name for testing
var barNames = ["bar1", "bar2", "bar3"];
var index = Math.floor(Math.random() * barNames.length);
var barName = barNames[index];
var placeID = barName + "id";

$("#bar-name").html(barName);

var ratings = [
    {
        question: "Guy/Girl Ratio",
        answerChoices: ["More Guys", "More Girls", "EqualRatio"],
    },
    {
        question: "Atmosphere",
        answerChoices: ["Dead", "Chill", "Interactive", "Party"],
    },
    {
        question: "Cleanliness",
        answerChoices: ["Gross", "Eh...", "Clean"],
    },
];

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



database.ref().once("value", snapshot => {
    const place = snapshot.val();
    console.log("wait");
    if (placeID === place){
        console.log("user exists!");
        console.log(place);
    }
 });

database().ref().child().orderByChild("ID").equalTo("U1EL5623").once("value",snapshot => {
    const userData = snapshot.val();
    if (userData){
      console.log("exists!");
    }
});

$("#submit").on("click", function (event) {
    event.preventDefault();

    // getting snapshot of database
    database.ref().on("value", function (snapshot) {
        //gets the unique key
        snapshot.forEach(function (placeId) {
            //prints once for each child of whole database (pace Ids)
            console.log("place ID:" + placeId.key);
            // if place already rated, just want ot update rating, otherwise will want to setup and then update
            if (placeID === placeId.key) {
                console.log("match");
                update();
            }
            else {
                console.log("make new");
                var newRating = {
                    name: barName,
                    R1: { moreGuys: 0, moreGals: 0, EqualRatio: 0 },
                    R2: { Dead: 0, Chill: 0, Inviting: 0, Epic: 0 },
                    R3: { Gross: 0, Eh: 0, Clean: 0 }
                };

                console.log("new rating " + newRating)
                database.ref().child(placeID).set(newRating);
                update();
            }
            // placeId.forEach( function (child) {
            //prints out once for each child of the key(rotation through)
            // console.log("child" + child.val());
            // if(child.key === placeID) {
            //     console.log("they match");
            // };
        });
    });
    //clear inputs
    $("input").val("");
});


function update() {
    console.log("updated");

    //Grab selections
    for (var i = 0; i < ratings.length; i++) {
        console.log("Selected:" + $(`input:radio[name="${ratings[i].question}"]:checked`).val());
        //grab answer choices
        for (var j = 0; j < ratings[i].answerChoices.length; j++) {
        }
    }
}




