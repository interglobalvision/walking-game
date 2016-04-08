var Medit8 = {
  $blackout: $('#blackout'),
  $coachTalk: $('.medit8-coach-talk'),
  $coach1: $('.medit8-coach-1'),
  $coach2: $('.medit8-coach-2'),
  $coach3: $('.medit8-coach-3'),
  $clockHands: $('.medit8-clock-hands'),
  $clockFace: $('.medit8-clock-face'),
  introDialog: [
    "learn to be patient, " + Game.getUsername() + "... years can pass like seconds",
    "don't wish your " + Utilities.Word.getAdj(false, false) + " day away...its time to play...",
    "MEDIT8...8.....8.......",
    "Just relax and don't move around too much....",
  ],
  medDialog1: [
    "just be " + Utilities.Word.getAdj(false, false) + ", " + Game.getUsername() + "...",
  ],
  medDialog2: [
    "open your " + Utilities.Word.getNoun(false, false) + " to the " + Utilities.Word.getNoun(false, false) + "....",
  ],
  medDialog3: [
    "don't be too " + Utilities.Word.getAdj(false, false) + ".....",
  ],
  winDialog: [
    Utilities.Word.getNoun(false, true) + " is bitter, but " + Utilities.Word.getNoun(false, false) + " is sweet",
    "let's go for a walk, " + Game.getUsername() + "!!",
  ],
  failDialog: [
    "You moved! " + Utilities.Word.getAdj(false, true) + " bummer....",
    "Next time be more patient....",
  ],

  baseTime: 60, // 1 min
  levelFactor: 30, // Add this factor of time for each level
  moves: 0,
  movesMax: 2,

  init: function() {
    var _this = this;

    $('.medit8-coach-container').addClass('medit8-coach-container-anim');
    $('.medit8-background').addClass('medit8-background-anim');

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
    var oldLng;

    navigator.geolocation.getCurrentPosition( function(geoposition) {

      oldLat = geoposition.coords.latitude;
      oldLng = geoposition.coords.longitude;

    });

    _this.$coachTalk.css('opacity', 0);
    _this.$coach1.css('opacity', 1);

    var timer = setInterval(function() {

      navigator.geolocation.getCurrentPosition( function(geoposition) {

        newLat = geoposition.coords.latitude;
        newLng = geoposition.coords.longitude;

        console.log('lat = ' + newLat + ', lng = ' + newLng);

        //check if position has changed, at least 0.001 in either direction
        if ( Math.abs(oldLat - newLat) >= 0.001 || Math.abs(oldLng - newLng) >= 0.001 ) {

          //if position has changed, increase moves counter
          _this.moves++;

          //if moves counter reaches max, fail
          if (_this.moves === _this.movesMax) {

            clearInterval(timer);

            _this.fail();

          }
        } 

      });

      // Calc 0-100%
      var progress = (timeCounter / waitTime) * 100;

      //console.log(progress);

      // Calc 0-360 deg
      var degrees = progress * 3.60; 

      //console.log(degrees);

      if (progress === 20) {
        Utilities.Dialog.read(_this.medDialog1);
      }

      if (progress === 50) {
        if ( Utilities.Dialog.inProgress ) { 
          Utilities.Dialog.finish();
        }

        Utilities.Dialog.read(_this.medDialog2);
      }

      if (progress === 80) {
        if ( Utilities.Dialog.inProgress ) { 
          Utilities.Dialog.finish();
        }

        Utilities.Dialog.read(_this.medDialog3);
      }

      if (progress >= 30 && progress <= 35) {
        _this.$coach1.css('opacity', 0);
        _this.$coach2.css('opacity', 1);
      }

      if (progress >= 60 && progress <= 65) {
        _this.$coach2.css('opacity', 0);
        _this.$coach3.css('opacity', 1);
      }

      _this.$clockHands.css('transform', 'rotate(' + degrees + 'deg)');
      _this.$clockFace.css({
        '-webkit-filter': 'hue-rotate(' + degrees + 'deg)',
        'filter': 'hue-rotate(' + degrees + 'deg)',
      });

      // If waitTime has passed, clear interval
      if(timeCounter >= waitTime) {

        console.log('time\'s up');

        clearInterval(timer);

        // Win
        _this.win(timeCounter * 0.19839); // Just because

      }

      timeCounter++;

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

    _this.$coach3.css('opacity', 0);
    _this.$coachTalk.css('opacity', 1);

    if (navigator.vibrate) {
      navigator.vibrate(1000);
    }

    if ( Utilities.Dialog.inProgress ) { 
      Utilities.Dialog.finish();
    }
    
    Utilities.Dialog.read(_this.winDialog, function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Game.gameComplete(points);
      });

    });

  },

  fail: function() {
    var _this = this;

    _this.$coach1.css('opacity', 0);
    _this.$coach2.css('opacity', 0);
    _this.$coach3.css('opacity', 0);
    _this.$coachTalk.css('opacity', 1);

    if ( Utilities.Dialog.inProgress ) { 
      Utilities.Dialog.finish();
    }

    Utilities.Dialog.read(_this.failDialog, function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Router.go('/pages/compass/');
      });

    });

  },

};

document.addEventListener('deviceready', function() {
  Medit8.init();
}, false);
