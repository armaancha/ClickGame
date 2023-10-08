// Code runs in code.org's App Lab

var count = 0;
var timer = 5;
var timerStart = false;
var x;
var highScore = 0;
var playerName = "";
setScreen("screen2");

onEvent("button2", "click", function( ) {
	setScreen("screen1");
	playerName = getProperty("text_input2", "text");
	console.log(playerName);
	readRecords("ClickAppScore", {name:playerName}, function(records) {
    for (var i =0; i < records.length; i++) {
      if(records[i].score>highScore){
        highScore = records[i].score;
      }
    }
    setText("labelHighscore", highScore);
  });
});



setText("label2", timer);

function tick(){
  if (timer<=0){
    clearInterval(x);
    createRecord("ClickAppScore", {name: playerName, score: count}, function() {});
    
    if (count>highScore){
      highScore=count;
      setText("labelHighscore", highScore);
      playSound("sound://category_achievements/melodic_win_4.mp3");
    }
    showElement("againButton");
  }
  else{
    timer--;
    setText("label2", timer);
  }
}



onEvent("button1", "click", function( ) {
  if(timer>0){
    count++;
	  setText("label1", count);
  }
	if (timerStart == false){
	  x = setInterval(tick, 1000);
	  timerStart=true;
	}
});

onEvent("againButton", "click", function( ) {
	timer = 5;
	setText("label2", timer);
	count = 0;
  setText("label1", count);
  timerStart = false;
  hideElement("againButton");
});
