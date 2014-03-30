/*
 * First Chrome App
 * Clock
 * Background JS
 * 30th March 2014
 */

chrome.app.runtime.onLaunched.addListener(function() {

  chrome.app.window.create('window.html', {
    'bounds':{
      'width':400,
      'height':500
    }
  });
});


