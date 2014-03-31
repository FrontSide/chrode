/*
 * DogeDodge
 * Logics JS
 *
 * This project is open-source
 * wow
 */


/* Init Canvas */
canvas = document.getElementById("maincanvas");
context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Refresh Time in ms
refreshTime = 50;

/* Key Listener */
function keyListener() {

  //KeyPress
  window.onkeydown = function(e) {
     var key = e.keyCode ? e.keyCode : e.which;

     // Cursor Right -> 39
     // Cursor Left  -> 37

     //Activate Movement if key is pressed
     if (key == 39) {
         moveLeft = false;
         moveRight = true;
     }else if (key == 37) {
         moveLeft = true;
         moveRight = false;
     }
  }

  //KeyRelease
  window.onkeyup = function(e) {
     var key = e.keyCode ? e.keyCode : e.which;

     // Cursor Right -> 39
     // Cursor Left  -> 37

     //Activate Movement if key is pressed
     if (key == 39) {
         moveRight = false;
     }else if (key == 37) {
         moveLeft = false;
     }
  }

}

/* Played Seconds */
startsec = Math.floor((new Date().getTime())/1000);
function getTime() {
  return Math.floor((new Date().getTime())/1000) - startsec;
}

/* Image Paths */
dogerig_src = "img/kabosu/fig_norm_r.png";
dogelef_src = "img/kabosu/fig_norm_l.png";
dogemin_src = "img/kabosu/fig_mine.png";
dogebar_src = "img/kabosu/fig_bark.png";

dogcoin_src = "img/dogecoin.png";
bitcoin_src = "img/bitcoin.png";

/* Points and Life */
lives = 10;
points = 0;
level = 1;

/* Coin Generator modulo constants CGMC */
mainCGMC = 50;
dogeCGMC = 100;

/* Dodge Fox */
dodgefigX = Math.ceil(canvas.width/2)-42;

//To show spectial faces for kabosu
//when value is > 0
//-1 at every loop iteration
//Colission Face Timer Constant
//is the value assigne to a picture (bark or mine) when collission occures
CFTC = (1000/refreshTime)*2
dogIsMine = 0;
dogIsBark = 0;

moveRight = false;
moveLeft = false;

/* Draw Dodge Fox */
function drawDogeFig() {

  dogefig = new Image();
  dogefig.src = dogerig_src;

  //Check X Movement
  if (moveRight && (dodgefigX < (canvas.width-85))) {
    dodgefigX += 15;
  }

  else if (moveLeft && (dodgefigX > 0)) {
    dodgefigX -= 15;
    dogefig.src = dogelef_src;
  }

  //If fox is out of the window (right) in cas window was resized
  if (dodgefigX > (canvas.width-85)) {
    dodgefigX = canvas.width-85;
  }

  if (--dogIsMine > 0) {
    dogefig.src = dogemin_src;
  } else if (--dogIsBark > 0) {
    dogefig.src = dogebar_src;
  }

  dogefig.onload = function() {
        context.drawImage(dogefig, dodgefigX, 200);
  }

}

/* Coins */
coins = new Array();
function o_coin(img, isDoge, xPos, yPos, ySpeed) {
  this.isActive = true; //No more active when collission
  this.img = img;
  this.isDoge = isDoge;
  this.xPos = xPos;
  this.yPos = yPos;
  this.ySpeed = ySpeed; //NOT USED RIGHT NOW
}

/* Draw Coin */
function drawCoin() {

  for (var i = 0; i<coins.length; i++) {

    it_coin = coins[i];

    if (it_coin.isActive) {
      context.drawImage(it_coin.img, it_coin.xPos, it_coin.yPos);
      detectCol(it_coin);
    }

    if(it_coin.yPos >= canvas.height) {
	      coins.shift();
    }

    else {
      // Move Coin
      coins[i].yPos += 5;
    }

  }

}

/* Collisson detection */
function detectCol(col_coin) {

  var x = col_coin.xPos;
  var y = col_coin.yPos;
  //Height and width is actually 50
  //but I'm gonna use some clearance
  var h = 40;
  var w = 40;

  var isDoge = col_coin.isDoge;
  var col = false;

  if (((x+w) >= dodgefigX) && (x <= (dodgefigX+85)) && ((y+h) >= 200) && (y < 285)) {
    col = true;
  }

  if (col) {
    col_coin.isActive = false;
    if (isDoge) {
      points += 100;
      dogIsMine = CFTC;
      dogIsBark = 0;
    } else {
      dogIsMine = 0;
      dogIsBark = CFTC;
      if (--lives == 0) {
        clearInterval(mainIV);
      }
    }
  }

}

/* Draw Stats */
function drawStats() {

  context.fillStyle = "#2222FF";
  context.font = "bold 20px sans-serif";
  context.fillText("POINTS " + points, canvas.width-250, canvas.height-50);
  context.fillText("LIVES " + lives, canvas.width-250, canvas.height-100);
  context.fillText("SECONDS " + getTime(), canvas.width-250, canvas.height-150);
  context.fillText("LEVEL " + level, canvas.width-250, canvas.height-200);

}

/* Draw Loop - Main */
function mainLoop() {

  //Clear Canvas + Window is now resizable
  canvas.width = window.innerWidth;

  drawStats();
  drawDogeFig();
  drawCoin();

  //Generate Coin
  var coinSeed = Math.ceil(Math.random()*500);
  console.log("coins seed: " + coinSeed);

  if (coinSeed % mainCGMC == 0) {

    var img = new Image();
    var xPos = Math.ceil(Math.random()*(canvas.width-100))

    if (coinSeed % dogeCGMC == 0) {
      img.src = dogcoin_src;
      coins.push(new o_coin(img, true, xPos, 0, 1.2))
    }

    else {
      img.src = bitcoin_src;
      coins.push(new o_coin(img, false, xPos, 0, 1.2))
    }

    console.log("coins array size:" + coins.length);
  }

  // Regulate CGMC
  // coin quantity grows with time
  if (mainCGMC == 50 && getTime() == 20) {
    mainCGMC = 25;
    dogeCGMC = 50;
    level++;
  }

  else if (mainCGMC == 25 && getTime() == 50) {
    mainCGMC = 20;
    dogeCGMC = 60;
    level++;
  }

  else if (mainCGMC == 20 && getTime() == 100) {
    mainCGMC = 10;
    level++;
  }

  else if (mainCGMC == 10 && getTime() == 150) {
    //TODO: change speed
    level++;
  }

}

/*** Chrome doesn't support converting a String into code
** which is needed in a standard setInterval(). That means we need to
** create a function in setInterval() which then calls the function we actually need
***/
mainIV = setInterval(function(){mainLoop();},refreshTime);
keyListener();



