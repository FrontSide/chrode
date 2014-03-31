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
refreshTime = 30;

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


/* Preloaded Pictres */
function preloadPics() {

  context.fillStyle = "#2222FF";
  context.font = "bold 40px sans-serif";
  context.fillText("LOADING ... ", Math.floor(canvas.width/2)-100, 200);

  i_doge_rig = new Image();
  i_doge_rig.onload = function() { incr_loaded_pics(); };
  i_doge_rig.src = "img/kabosu/fig_norm_r.png";

  i_doge_lef = new Image();
  i_doge_lef.onload = function() { incr_loaded_pics(); };
  i_doge_lef.src = "img/kabosu/fig_norm_l.png";

  i_doge_mine = new Image();
  i_doge_mine.onload = function() { incr_loaded_pics(); };
  i_doge_mine.src = "img/kabosu/fig_mine.png";

  i_doge_bark = new Image();
  i_doge_bark.onload = function() { incr_loaded_pics(); };
  i_doge_bark.src = "img/kabosu/fig_bark.png";

  i_coin_doge = new Image();
  i_coin_doge.onload = function() { incr_loaded_pics(); };
  i_coin_doge.src = "img/dogecoin.png";

  i_coin_bit = new Image();
  i_coin_bit.onload = function() { incr_loaded_pics(); };
  i_coin_bit.src = "img/bitcoin.png";
}

nr_pics = 6;
loaded_pics = 0;

function incr_loaded_pics() {
  if (++loaded_pics == nr_pics) {
    requestAnimationFrame(mainLoop);
  }
}

/* Points and Life */
lives = 10;
points = 0;
level = 1;
isGameOver = false;

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

  var img = i_doge_rig;

  //Check X Movement
  if (moveRight && (dodgefigX < (canvas.width-85))) {
    dodgefigX += 15;
  }

  else if (moveLeft && (dodgefigX > 0)) {
    dodgefigX -= 15;
    img = i_doge_lef;
  }

  //If fox is out of the window (right) in cas window was resized
  if (dodgefigX > (canvas.width-85)) {
    dodgefigX = canvas.width-85;
  }

  if (--dogIsMine > 0) {
    img = i_doge_mine;
  } else if (--dogIsBark > 0) {
    img = i_doge_bark;
  }

  context.drawImage(img, dodgefigX, 200);

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
        gameOver();
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

/* Set Game Over */
function gameOver() {

  isGameOver = true;

  context.fillStyle = "#2222FF";
  context.font = "bold 40px sans-serif";
  context.fillText("GAME OVER", Math.floor(canvas.width/2)-100, 200);

}

/* Draw Loop - Main */
function mainLoop() {


  /***
  *
  * TODO: BUFFER AGAINST FLICKERING
  *
  ***/

  //Clear Canvas + Window is now resizable
  canvas.width = window.innerWidth;

  drawStats();
  drawDogeFig();
  drawCoin();

  //Generate Coin
  var coinSeed = Math.ceil(Math.random()*500);
  console.log("coins seed: " + coinSeed);

  if (coinSeed % mainCGMC == 0) {

    var xPos = Math.ceil(Math.random()*(canvas.width-100))

    if (coinSeed % dogeCGMC == 0) {
      coins.push(new o_coin(i_coin_doge, true, xPos, 0, 1.2))
    }

    else {
      coins.push(new o_coin(i_coin_bit, false, xPos, 0, 1.2))
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

  if (!isGameOver) {
    requestAnimationFrame(mainLoop);
  }

}

//Request Animation Frame
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.msRequestAnimationFrame;

mainIV = false;
preloadPics();
keyListener();



