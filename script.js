var answers = [
    "q1answer3",
    "q2answer3",
    "q3answer4",
    "q4answer3",
    "q5answer4"
]

var timeEl = document.getElementById("time");
var timeInterval = null

//Timer that counts down from 75
var timeLeft = 75;


var checkAnswer = function () {
    //will define later
}

var startQuizButtonHandler = function () {
    timeLeft = 75
    timeInterval = setInterval(function () {
        //As long as the "timeLeft" is greater than 1
        if (timeLeft > 1) {
            //Set the "textContent" of timer El to show the remianing seconds
            timeEl.textContent = "Time " + timeLeft
            //Decrement "timeLEft" by 1
            timeLeft--;
        } else {
            //Once "timeLeft" gets to 0, set "timeEl" to an empty string
            timeEl.textContent = " ";
            //use "clearInterval()" to stop the timer
            clearInterval(timeInterval);
            //Show the "done" 
            document.getElementById('done').style.display = 'block';
            document.getElementById('q1').style.display = 'none';
            document.getElementById('q2').style.display = 'none';
            document.getElementById('q3').style.display = 'none';
            document.getElementById('q4').style.display = 'none';
            document.getElementById('q5').style.display = 'none';

        }
    }, 1000);

    //Hide the start quiz header div 
    document.getElementById('intro').style.display = 'none';

    //Show the first question
    document.getElementById('q1').style.display = 'block';

};

var questionOneHandler = function (event) {
    //event.target.id is WHO clicked... AKA which button was clicked
    if (event.target.id === answers[0]) {
        //What to do if correct
        document.getElementById("question1AnswerCorrect").innerHTML = "CORRECT!";
    } else {
        //What to do if incorrect
        document.getElementById("question1AnswerCorrect").innerHTML = "WRONG!";

        //NEED TO SUBTRACT TIME
        timeLeft = timeLeft - 10;

    }

    //hide question 1
    document.getElementById('q1').style.display = 'none';
    //show question 2
    document.getElementById('q2').style.display = 'block';
}

var questionTwoHandler = function (event) {
    //event.target.id is WHO clicked... AKA which button was clicked
    if (event.target.id === answers[1]) {
        //What to do if correct
        document.getElementById("question2AnswerCorrect").innerHTML = "CORRECT!";
    } else {
        //What to do if incorrect
        document.getElementById("question2AnswerCorrect").innerHTML = "WRONG!";

        //NEED TO SUBTRACT TIME
        timeLeft = timeLeft - 10;
    }

    //hide question 2
    document.getElementById('q2').style.display = 'none';
    //show question 3
    document.getElementById('q3').style.display = 'block';
}

var questionThreeHandler = function (event) {
    //event.target.id is WHO clicked... AKA which button was clicked
    if (event.target.id === answers[2]) {
        //What to do if correct
        document.getElementById("question3AnswerCorrect").innerHTML = "CORRECT!";
    } else {
        //What to do if incorrect
        document.getElementById("question3AnswerCorrect").innerHTML = "WRONG!";

        //NEED TO SUBTRACT TIME
        timeLeft = timeLeft - 10;
    }

    //hide question 3
    document.getElementById('q3').style.display = 'none';
    //show question 4
    document.getElementById('q4').style.display = 'block';
}

var questionFourHandler = function (event) {
    //event.target.id is WHO clicked... AKA which button was clicked
    if (event.target.id === answers[3]) {
        //What to do if correct
        document.getElementById("question4AnswerCorrect").innerHTML = "CORRECT!";
    } else {
        //What to do if incorrect
        document.getElementById("question4AnswerCorrect").innerHTML = "WRONG!";

        //NEED TO SUBTRACT TIME
        timeLeft = timeLeft - 10;
    }

    //hide question 4
    document.getElementById('q4').style.display = 'none';
    //show question 5
    document.getElementById('q5').style.display = 'block';
}

var questionFiveHandler = function (event) {
    //event.target.id is WHO clicked... AKA which button was clicked
    if (event.target.id === answers[4]) {
        //What to do if correct
        document.getElementById("question5AnswerCorrect").innerHTML = "CORRECT!";
    } else {
        //What to do if incorrect
        document.getElementById("question5AnswerCorrect").innerHTML = "WRONG!";

        //NEED TO SUBTRACT TIME
        timeLeft = timeLeft - 10;
    }

    clearInterval(timeInterval);
    //hide question 5
    document.getElementById('q5').style.display = 'none';
    //show all done
    document.getElementById('done').style.display = 'block';
}


function saveCurrentScore(event) {
    event.preventDefault()
    //Retrieve the last initials from localStroage using "getItem()"
    var highScores = localStorage.getItem("highScores");
    var initialsInput = document.querySelector("#input-initials").value;

    //Add or update the high score list within local storage
    if (!highScores) {
        var highScoreValue = {
            "initials": initialsInput,
            "score": timeLeft
        };
        var highScoreList = []
        highScoreList.push(highScoreValue)
        localStorage.setItem("highScores", JSON.stringify(highScoreList));

    } else {
        var highScoreValue = {
            "initials": initialsInput,
            "score": timeLeft
        };
        var highScoresParsed = JSON.parse(highScores);
        highScoresParsed.push(highScoreValue);
        localStorage.setItem("highScores", JSON.stringify(highScoresParsed));
    }

    //Hide the done section and show the high scores
    document.getElementById('done').style.display = 'none';

    //Call function that inserts LIs into the high score list UL so that there's 
    //something there when we show the div
    renderHighScoreList();

    //show question 2
    document.getElementById('high-scores').style.display = 'block';
}

var renderHighScoreList = function (event) {
    var highScoreUL = document.getElementById('high-score-list');

    //get the high scores out of local storage
    var highScores = localStorage.getItem("highScores");
    var highScoresParsed = JSON.parse(highScores);

    for (i = 0; i < highScoresParsed.length; ++i) {
        var currentHighScore = highScoresParsed[i]

        //create list item
        var listItemEl = document.createElement("li");

        // create div to put li info in
        var highScoreInfoEl = document.createElement("div");
        highScoreInfoEl.innerHTML = "<span'>" + currentHighScore.initials + " " + currentHighScore.score + "</span>";
        listItemEl.appendChild(highScoreInfoEl);
        
        //append LI to UL
        highScoreUL.appendChild(listItemEl);
    };
}

var clearHighScores = function(){
    var highScoreUL = document.getElementById('high-score-list');
    highScoreUL.innerHTML = "";
    localStorage.removeItem('highScores');
}

var restartGame = function(){
    //Clear high score UL
    var highScoreUL = document.getElementById('high-score-list');
    highScoreUL.innerHTML = "";
    //hide high score list
    document.getElementById('high-scores').style.display = 'none';
    //show intro div
    document.getElementById('intro').style.display = 'block';
    
};

var viewHighScoreFromLink = function(event){
    event.preventDefault();
    //Show the "done" 
    document.getElementById('intro').style.display = 'none';
    document.getElementById('done').style.display = 'none';
    document.getElementById('q1').style.display = 'none';
    document.getElementById('q2').style.display = 'none';
    document.getElementById('q3').style.display = 'none';
    document.getElementById('q4').style.display = 'none';
    document.getElementById('q5').style.display = 'none';

    //call render UL
    document.getElementById('high-scores').style.display = 'block';
    renderHighScoreList();
}
document.getElementById("start-quiz").addEventListener("click", startQuizButtonHandler);

document.getElementById("q1answer1").addEventListener("click", questionOneHandler);
document.getElementById("q1answer2").addEventListener("click", questionOneHandler);
document.getElementById("q1answer3").addEventListener("click", questionOneHandler);
document.getElementById("q1answer4").addEventListener("click", questionOneHandler);

document.getElementById("q2answer1").addEventListener("click", questionTwoHandler);
document.getElementById("q2answer2").addEventListener("click", questionTwoHandler);
document.getElementById("q2answer3").addEventListener("click", questionTwoHandler);
document.getElementById("q2answer4").addEventListener("click", questionTwoHandler);

document.getElementById("q3answer1").addEventListener("click", questionThreeHandler);
document.getElementById("q3answer2").addEventListener("click", questionThreeHandler);
document.getElementById("q3answer3").addEventListener("click", questionThreeHandler);
document.getElementById("q3answer4").addEventListener("click", questionThreeHandler);

document.getElementById("q4answer1").addEventListener("click", questionFourHandler);
document.getElementById("q4answer2").addEventListener("click", questionFourHandler);
document.getElementById("q4answer3").addEventListener("click", questionFourHandler);
document.getElementById("q4answer4").addEventListener("click", questionFourHandler);

document.getElementById("q5answer1").addEventListener("click", questionFiveHandler);
document.getElementById("q5answer2").addEventListener("click", questionFiveHandler);
document.getElementById("q5answer3").addEventListener("click", questionFiveHandler);
document.getElementById("q5answer4").addEventListener("click", questionFiveHandler);

document.getElementById("initials").addEventListener("submit", saveCurrentScore);
document.getElementById("clear").addEventListener("click", clearHighScores);
document.getElementById("go-back").addEventListener("click", restartGame);
document.getElementById("view-high-score-link").addEventListener("click", viewHighScoreFromLink);
