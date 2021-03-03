var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

function nextSequence() {

    userClickedPattern = [];

    $("#level-title").text("Level " + level);

    level++;

    randomNumber = Math.floor(Math.random() * 4);

    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    //flash effect

    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);

    playSound(randomChosenColour);
}

var started = false;

$(document).keypress(function () {

    if (!started) {

        $("#score").text("Let's Go!");

        nextSequence();

        started = true;
    }
});

//audio function

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

$("[type='button']").click(function (event) {

    var userChosenColour = event.target.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {

        $("#" + currentColour).removeClass("pressed");

    }, 100);
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (gamePattern.length == userClickedPattern.length) {

            setTimeout(function () {

                $("#score").text("Your Score: " + level);

                nextSequence();

            }, 1000);
        }

    } else {

        var a1 = new Audio("sounds/wrong.mp3");

        a1.play();

        $("body").addClass("game-over");

        setTimeout(function () {

            $("body").removeClass("game-over");

        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {

    level = 0;

    started = 0;

    gamePattern = [];

    $("#score").text("Oops!");
}