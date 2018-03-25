var config = {
    apiKey: "AIzaSyBOBuTY5eVKNK1z9PEsQyXeiI6-Lemj_TA",
    authDomain: "project-1-727b9.firebaseapp.com",
    databaseURL: "https://project-1-727b9.firebaseio.com",
    projectId: "project-1-727b9",
    storageBucket: "project-1-727b9.appspot.com",
    messagingSenderId: "275641339042"
};

firebase.initializeApp(config);
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

//Getting new rating into firebase
var database = firebase.database();
database.ref().on("value", function (snapshot) {
    console.log("snapshot" + snapshot.val());
    snapshot.forEach(function (child) {
        console.log( "key:" + child.key + ": " + "child" + child);
        child.forEach( function (child) {
            console.log(child.val());
;        });
    });
});

$("#submit").on("click", function (event) {
    event.preventDefault();

    // if new bar, create setup, else just push to the specific counter


    //Grab selections
    for (var i = 0; i < ratings.length; i++) {
        console.log("Selected:" + $(`input:radio[name="${ratings[i].question}"]:checked`).val());
        //grab answer choices
        for (var j = 0; j < ratings[i].answerChoices.length; j++) {
        }
    }

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

    var newR1 = 1;
    var newR2 = 2;
    var newR3 = 3;
    var newRating = {
        [placeID]: {name: barName,
            R1: {moreGuys: 0, moreGals: 0, EqualRatio: 0},
            R2: {Dead: 0, Chill: 0, Inviting: 0, Epic: 0},
            R3: {Gross: 0, "Eh...": 0, Clean: 0}}
    };

    console.log(newRating)
    database.ref().push(newRating);
   
    
    
    //clear inputs
    $("input").val("");

    $("#r1avg").empty().html(newR1);
    $("#r2avg").empty().html(newR2);
    $("#r3avg").empty().html(newR3);
});
