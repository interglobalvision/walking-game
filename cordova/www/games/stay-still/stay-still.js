var StayStill = {
  $blackout: $('#blackout'),
  introDialog: [
    "learn to be patient... years can pass like seconds",
    "don’t wish your day away",
  ],
  winDialog: [
    "Patience is bitter, but its fruit is sweet",
    "let\'s go for a walk",
  ],
  failDialog: [
    "You moved! Bummer...",
  ],

  baseTime: 60, // 1 min
  levelFactor: 30, // Add this factor of time for each level
  moves: 0,

  init: function() {
    var _this = this;

    if ( navigator.geolocation && window.DeviceOrientationEvent ) {

      _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

      Utilities.Dialog.read(_this.introDialog, function() {
        _this.startGame();
      });

    } else {
      console.log('no geolocation, wait.. how u even?..');
    }

  },

  startGame: function() {
    var _this = this;

    var waitTime = _this.getWaitTime();
    var timeCounter = 0;

    var newLat;
    var newLng;
    var oldLat;
    var oldLang;

    navigator.geolocation.getCurrentPosition( function(geoposition) {

      oldLat = geoposition.coords.latitude;
      oldLng = geoposition.coords.longitude;

    });

    var timer = setInterval(function() {

      navigator.geolocation.getCurrentPosition( function(geoposition) {

        newLat = geoposition.coords.latitude;
        newLng = geoposition.coords.longitude;

        console.log('lat = ' + newLat + ', lng = ' + newLng);

        if ( ( Math.abs(oldLat - newLat) <= .001 ) && ( Math.abs(oldLng - newLng) <= .001 ) ) {

          // Calc 0-100%
          var progress = (timeCounter / waitTime) * 100;

          console.log(progress);

          // Calc 0-360 deg
          var degrees = progress * 3.60;
          console.log(degrees);
          
          /*
           *
           *      Do stuff here.
           * 
           * 〜(・▽・〜) (〜・▽・)〜
           *
           *        ⊂( ^ω^)⊃
           *
           */

          // If waitTime has passed, clear interval
          if(timeCounter >= waitTime) {

            clearInterval(timer);

            // Win
            _this.win(timeCounter * 0.19839); // Just because

          }

          timeCounter++;

        } else {

          clearInterval(timer);

          _this.fail();

        }

      });
      
    }, 1000); // Run every second

  },

  /*
   * return wait time in seconds
   */
  getWaitTime: function() {
    var _this = this;

    // When loop 0, extra time is 0
    // loop 1, extra 30
    // loop 2, extra 60
    var extraTime = Game.getLoops() * _this.levelFactor;

    return _this.baseTime + extraTime;
  },

  win: function(points) {
    var _this = this;

    Utilities.Dialog.read(_this.winDialog, function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Game.gameComplete(points);
      });

    });

  },

  fail: function() {
    var _this = this;

    Utilities.Dialog.read(_this.failDialog, function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Router.go('/pages/compass/');
      });

    });

  },

};

document.addEventListener('deviceready', function() {
  StayStill.init();
}, false);
