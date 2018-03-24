
barName = "bar1";

var ratings =[
    {question: "Guy/Girl Ratio",
    answerChoices: ["More Guys", "More Girls", "EqualRatio"],
    },
    {question: "Atmosphere",
    answerChoices: ["Dead", "Chill", "Interactive", "Party"],
    },
    {question: "Cleanliness",
    answerChoices: ["Gross", "Eh...", "Clean"],
    },
];

//displaying questions and answer choices
//display question
for (var i = 0; i < ratings.length; i++) {
    console.log("ratings length " + ratings.length);
    $("form").append(
        `<div id="rating${i}" class="form-group">
        <label class="control-label">${ratings[i].question}</label>
        </div>`);
    //display rating options
    for (var j = 0; j < ratings[i].answerChoices.length; j++) {
        console.log("answer choices length " + ratings[i].answerChoices.length);
        console.log(i);
        $(`#rating${i}`).append(
            `<div class="radio">
            <label>
            <input type="radio" name="${ratings[i].question}" value="${ratings[i].answerChoices[j]}">
             ${ratings[i].answerChoices[j]}
            </label>
            </div>`);
    }
}

var database = firebase.database();
database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(child) {
        console.log(child.key+": "+child.val());
      });
});

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