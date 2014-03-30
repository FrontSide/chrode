/*
 * First Chrome App
 * Clock
 * Logics JS
 */


function updateTime() {

  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();

  document.getElementById("clockcon").innerHTML = h + ":" + m + ":" + s;

}



/*** Chrome doesn't support converting a String into code
** which is needed in a standard setInterval(). That means we need to
** create a function in setInterval() which then calls the function we actually need
***/
setInterval(function(){updateTime();},500);

