/*
 * DogeDodge
 * Background JS
 */

chrome.app.runtime.onLaunched.addListener(function() {

  chrome.app.window.create('window.html', {
    'bounds':{
      'width':500,
      'height':500
    }
  });
});


