var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// Keydown to start game
$(document).keydown(function() {
  if (started === false) {
    $("h1").text("Level " + level);
    nextSquence();
    started = true;
  }
});

// Game Random Sequence
function nextSquence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);

  playSound(randomChosenColor);
}


// User Clicked Sequence
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

// Check User Answer
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSquence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    new Audio("sounds/wrong.mp3").play();
    startOver();
  }
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}
$(".reset").on("click", function(){
  startOver();
  nextSquence();
  $(".reset").addClass("reset-pressed");
  setTimeout(function(){
    $(".reset").removeClass("reset-pressed");
  },100);

});

// Fetch sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Fancy animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
