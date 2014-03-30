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

     // Cursor Right -> 37
     // Cursor Left  -> 39

     //Activate Movement if key is pressed
     if (key == 37) {
         moveLeft = false;
         moveRight = true;
     }else if (key == 39) {
         moveLeft = true;
         moveRight = false;
     }
  }

  //KeyPress
  window.onkeyup = function(e) {
     var key = e.keyCode ? e.keyCode : e.which;

     // Cursor Right -> 37
     // Cursor Left  -> 39

     //Activate Movement if key is pressed
     if (key == 37) {
         moveRight = false;
     }else if (key == 39) {
         moveLeft = false;
     }
  }

}

/* Image Paths */
dogefig_src = "img/dogefig.jpeg";

/* Dodge Fox */
dodgefigX = Math.ceil(canvas.width/2)-42;
moveRight = false;
moveLeft = false;
/* Draw Dodge Fox */
function drawDogeFig() {

  //Check X Movement
  if (moveRight) {
    dodgefigX += 10;
  }

  else if (moveLeft) {
    dodgefigX -= 10;
  }

  dogefig = new Image();
  dogefig.src = dogefig_src;
  dogefig.onload = function() {
        context.drawImage(dogefig, dodgefigX, 200);
  }

}

/* Draw Loop - Main */
function mainDraw() {

  //Clear Canvas
  canvas.width = canvas.width;

  //Draw Fox
  drawDogeFig();

}



/*** Chrome doesn't support converting a String into code
** which is needed in a standard setInterval(). That means we need to
** create a function in setInterval() which then calls the function we actually need
***/
setInterval(function(){mainDraw();},50);
keyListener();



