var Loud = {
  $blackout: $('#blackout'),
  init:  function() {
    var _this = this;

    _this.$loudBar = $('#loud-bar');

    var src = 'myrecording.wav';
    _this.mediaRec = new Media(src,
      // success callback
      function() {
        console.log("recordAudio():Audio Success");
      },

      // error callback
      function(err) {
        console.log("recordAudio():Audio Error: "+ err.code);
        console.log(err);
      });

    // Record audio
    _this.mediaRec.startRecord();

    // Pause Recording after 5 seconds
    setTimeout(function() {
      _this.mediaRec.pauseRecord();
    }, 10000);

    requestAnimationFrame(_this.draw.bind(_this));

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');
  },

  draw: function() {
    var _this = this;

    if (_this.mediaRec) {
      _this.mediaRec.getCurrentAmplitude(function(value) {
        console.log(value);
        _this.$loudBar.height(value * 100 + '%');
      }, function(err) {
        console.log("recordAudio():Audio Error: "+ err.code);
        console.log(err);
      });
    }

    requestAnimationFrame(_this.draw.bind(_this));
  },
};

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var requestAnimationFrame = window.requestAnimationFrame;

document.addEventListener('deviceready', function() {
  cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus(function(status){
    if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
      console.log("Microphone use is authorized");
      Loud.init();
    } else {
      cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status){
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
          console.log("Microphone use is authorized");
          Loud.init();
        }
      }, function(error){
        console.error(error);
      });
    }
  }, function(error){
    console.error("The following error occurred: "+error);
  });
}, false);

