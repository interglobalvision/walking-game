var Loud = {
  $blackout: $('#blackout'),
  $loudBar: $('#loud-color-container'),
  $wordContainer: $('#loud-word'),

  failTime: 5000,
  winTime: 200,
  winTheshold: 0.85,

  word: Utilities.Word.getNoun(),

  tryAgainDialog: [
    "...too slow...too quiet...I can't hear you...",
  ],
  loseDialog: [
    "no more than a whimper",
  ],
  winDialog: [
    "PUM! BOOM! BANG! Nice one",
  ],

  init:  function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    Utilities.Dialog.read([
      "Oh " + Game.getUsername() + ", suddenly I'm very old... Help me be young again!",
      "You must shout the magic word LOUD and FAST!",
      "The magic word is......." + _this.word + "!! Now lets hear you shout it!",
    ], function() {
      _this.startGame();
    });

  },

  startGame: function() {
    var _this = this;

    var src = 'myrecording.wav';

    _this.mediaRec = new Media(src,
      // success callback
      function(event) {

      //  console.log(event);

      },
      // error callback
      function(err) {
        console.log("recordAudio():Audio Error: "+ err.code);
        console.log(err);
        WalkingError.unsupported('microphone access');
    },
      function(event) {

      //  console.log(event);

      }
    );

    // Show word
    _this.$wordContainer.html(_this.word).css('opacity',1);

    // Record audio
    _this.mediaRec.startRecord();

    _this.paused = false;

    // Pause Recording after 5 seconds
    _this.failTimeout = window.setTimeout(function() {
      _this.fail();
    }, _this.failTime);

    requestAnimationFrame(_this.draw.bind(_this));

  },

  draw: function() {
    var _this = this;

    if (!_this.paused) {

      if (_this.mediaRec) {
        _this.mediaRec.getCurrentAmplitude(function(value) {
          _this.$loudBar.css('opacity', value);

          if (value >= _this.winTheshold) {
            if (!_this.winTimeout) {
              _this.winTimeout = window.setTimeout(function() {
                _this.win();
              }, _this.winTime);
            }
          } else {
            window.clearTimeout(_this.winTimeout);
            _this.winTimeout = false;
          }

        }, function(err) {
          console.log("recordAudio():Audio Error: "+ err.code);
          console.log(err);
          WalkingError.unsupported('microphone access');
        });
      }

      requestAnimationFrame(_this.draw.bind(_this));
    }
  },

  win: function() {
    var _this = this;

    window.clearTimeout(_this.winTimeout);
    window.clearTimeout(_this.failTimeout);

    _this.paused = true;
    _this.mediaRec.stopRecord();

    _this.$loudBar.css('opacity', 1);

    var score = Game.getStepsPot();

    Utilities.Dialog.read(_this.winDialog, function() {

      Game.gameComplete(score);

    });

  },

  fail: function() {
    var _this = this;

    window.clearTimeout(_this.winTimeout);

    _this.paused = true;
    _this.mediaRec.stopRecord();

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.startGame();

      });

    }, function() {

      Utilities.Dialog.read(_this.loseDialog, function() {

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    });

  }
};

/*
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var requestAnimationFrame = window.requestAnimationFrame;
*/

document.addEventListener('deviceready', function() {
  cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus(function(status) {
    if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
      Loud.init();
    } else {
      cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status) {
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
          Loud.init();
        }
      }, function(error) {
        console.error(error);
        WalkingError.unsupported('microphone access');
      });
    }
  }, function(error) {
    console.error("The following error occurred: " + error);
    WalkingError.unsupported('microphone access');
  });
}, false);
