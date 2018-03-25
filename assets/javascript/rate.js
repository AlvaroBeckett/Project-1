
//get random bar name for testing
var barNames = ["bar1", "bar2", "bar3"];
var index = Math.floor(Math.random() * barNames.length);
var bar = barNames[index];
$("#bar-name").html(bar);

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
database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(child) {
        console.log(child.key+": "+child.val());
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




// $(document).on("click", ".form-check-input", function() {
  
//     // Check all the answers and tally correct & incorrect
//     var index = $(this).attr("name");
  
//     if($(this).attr("value") == triviaQuestions[index].answer){
//       correctAnswer++;
//     } else if($(this).attr("value") !== triviaQuestions[index].answer) {
//       incorrectAnswer++;
//     }