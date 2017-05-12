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
    "Just relax and don't move around too much...or the egg will fall off my head!",
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
  failDialog: [
    "You moved! " + Utilities.Word.getAdj(false, true) + " bummer....",
    "Next time be more patient....",
  ],

  modifiedTime: Game.modifyDifficulty(30),
  waitTime: 60,
  moves: 0,
  movesMax: 2,

  init: function() {
    var _this = this;

    _this.waitTime = _this.waitTime + _this.modifiedTime;

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

    var waitTime = _this.waitTime;
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
        _this.win(); // Just because

      }

      timeCounter++;

    }, 1000); // Run every second

  },

  win: function() {
    var _this = this;

    _this.$coach3.css('opacity', 0);
    _this.$coachTalk.css('opacity', 1);

    Utilities.Misc.vibrate();

    if ( Utilities.Dialog.inProgress ) {
      Utilities.Dialog.finish();
    }

    var score = Game.getStepsPot();

    Utilities.Dialog.read([
      Utilities.Word.getNoun(false, true) + " is bitter, but " + Utilities.Word.getNoun(false, false) + " is sweet...",
      Utilities.Number.roundFloat(score) + " steps you can keep!!!",
      "Let's go for a walk, " + Game.getUsername() + "!!",
    ], function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Game.gameComplete(score);
      });

    });

  },

  fail: function() {
    var _this = this;

    _this.$coach1.css('opacity', 0);
    _this.$coach2.css('opacity', 0);
    _this.$coach3.css('opacity', 0);
    _this.$coachTalk.css('opacity', 1);
    $('.medit8-egg-fail').addClass('egg-fall');

    Utilities.Misc.vibrate();

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
