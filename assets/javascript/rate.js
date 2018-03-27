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
        answerChoices: ["More Guys", "More Gals", "Equal Ratio"],
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
database.ref(placeID).once("value", function (snap) {
    var snapshot = snap.val()
    //if it's not in the database, add a blank rating setup
    if (snapshot === null) {
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
        console.log(snap.val());
    }
});


$("#submit").on("click", function (event) {
    event.preventDefault();

    //Grab selections
    // for (var i = 0; i < ratings.length; i++) {
        ratings.forEach(function(i){
            console.log(i.question);
        // console.log(ratings[i].question);
        // console.log("Selected:" + $(`input:radio[name="${ratings[i].question}"]:checked`).val());

        //crate variable with selection, if that variable === the string of the rating, add 1 to the count of that rating
        var questionName = i.question;
        var selected = $(`input:radio[name="${i.question}"]:checked`).val()
        
        database.ref(placeID).once("value", function (snap) {
            var snapshot = snap.val();
            currentValue = snapshot[questionName][selected];
            console.log ("original value" + currentValue);
            currentValue++;
            console.log("new value" + currentValue);
            database.ref().child(placeID).child(questionName).child(selected).set(currentValue);
        });
    // }
    });
    $("input").val("");
});

