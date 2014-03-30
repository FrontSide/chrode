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

  //KeyPress
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

/* Image Paths */
dogefig_src = "img/dogefig.jpeg";
dogcoin_src = "img/dogecoin.png";
bitcoin_src = "img/bitcoin.png";

/* Dodge Fox */
dodgefigX = Math.ceil(canvas.width/2)-42;
moveRight = false;
moveLeft = false;

/* Draw Dodge Fox */
function drawDogeFig() {

  //Check X Movement
  if (moveRight) {
    dodgefigX += 15;
  }

  else if (moveLeft) {
    dodgefigX -= 15;
  }

  dogefig = new Image();
  dogefig.src = dogefig_src;
  dogefig.onload = function() {
        context.drawImage(dogefig, dodgefigX, 200);
  }

}

/* Coins */
coins = new Array();
function o_coin(isDoge, xPos, yPos, ySpeed) {
  this.isDoge = isDoge;
  this.xPos = xPos;
  this.yPos = yPos;
  this.ySpeed = ySpeed;
}

/* Draw Coin */
function drawCoin() {

  for (var i=0; i<coins.length; i++) {

    it_coin = coins[i];

    console.log("coin nr: " + i);
    console.log("coin yPos: " + it_coin.yPos);

    coin = new Image();
    if (it_coin.isDoge) {
      coin.src = dogcoin_src;
    } else {
      coin.src = bitcoin_src;
    }

    coin.onload = function() {
        context.drawImage(coin, it_coin.xPos, it_coin.yPos);
    }

    // Move Coin
    coins[i].yPos += 10;

  }

}

/* Draw Loop - Main */
function mainLoop() {

  //Clear Canvas
  canvas.width = canvas.width;

  //Draw Fox
  drawDogeFig();

  //Generate Coin
  var coinSeed = Math.ceil(Math.random()*100);
  if (coinSeed % 3 == 0) {
    var xPos = Math.ceil(Math.random()*(canvas.width-100))
    if (coinSeed % 2 == 0) {
      coins.push(new o_coin(true, xPos, 0, 1.2))
    } else {
      coins.push(new o_coin(false, xPos, 0, 1.2))
    }
  }


  //Draw Coins
  drawCoin();

  console.log("coins array size:" + coins.length);

}



/*** Chrome doesn't support converting a String into code
** which is needed in a standard setInterval(). That means we need to
** create a function in setInterval() which then calls the function we actually need
***/
setInterval(function(){mainLoop();},50);
keyListener();



