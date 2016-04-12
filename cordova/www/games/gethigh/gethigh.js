var Gethigh = {
  introDialog: [
    "OK " + Game.getUsername() + ".... it's time to GET HIGH..!!",
  ],
  winDialog: [
    "Woah, u r so high!",
  ],
  failDialog: [
    "Nah, u arent high enough, " + Game.getUsername() + "...",
  ],
  watch: null,
  timer: null,
  toClimb: 5, // Must increase by this altitude
  initialAltitude: 0,
  waitTime: 60, // 60 seconds
  $blackout: $('#blackout'),

  init: function() {
    var _this = this;

    if ( navigator.geolocation && window.DeviceOrientationEvent ) {

      _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

      Utilities.Dialog.read(_this.introDialog, function() {

        _this.setInitialAltitude();

      });

    } else {

      WalkingError.unsupportedGPS(); // eh? what?

    }

  },

  runTimer: function() {
    var _this = this;
    var timeCounter = 0;

    _this.timer = setInterval(function() {

      $('#gethigh-timer').html(timeCounter); // timer readout

      if(timeCounter >= _this.waitTime) { // if more than max wait time

        console.log('time\'s up');

        clearInterval(_this.timer); // stop the timer

        navigator.geolocation.clearWatch(_this.watch); // stop watching position

        _this.fail(); // you lose, loser

      }

      timeCounter++;

    }, 1000);

  },

  setInitialAltitude: function() {
    var _this = this;

    navigator.geolocation.getCurrentPosition( function(geoposition) {
      _this.initialAltitude = geoposition.coords.altitude;

      if ( _this.initialAltitude > 0 ) {

        $('#gethigh-initial').html( _this.initialAltitude ); // initial altitude readout

        _this.startAltitudeWatch();

      } else {

        WalkingError.unsupported('altitude'); // nope!

      }

    });

  },

  startAltitudeWatch: function(initialAltitude) {
    var _this = this;

    _this.runTimer(); // start the clock

    _this.watch = navigator.geolocation.watchPosition( function(geoposition) {

      _this.compareAltitude(geoposition.coords.altitude); //compare it with the inital

    }, function(error) {

      WalkingError.throw(error, error);
    }, {

      enableHighAccuracy: true,
    });

  },

  compareAltitude: function(updatedAltitude) {
    var _this = this;
    var altitudeDifference = updatedAltitude - _this.initialAltitude; //difference between new and initial altitudes

    $('#gethigh-update').html( updatedAltitude ); // updated altitude readout
    $('#gethigh-difference').html( altitudeDifference ); // altitude difference readout

    // if new altitutde is more than initial
    // and the difference is more than distance to climb
    if ( ( updatedAltitude > _this.initialAltitude ) && ( altitudeDifference >= _this.toClimb ) ) { 

      clearInterval(_this.timer); // stop the timer

      navigator.geolocation.clearWatch(_this.watch); // stop watching position

      _this.win( altitudeDifference ); // you win difference in points

    } else {

      console.log( altitudeDifference ); // why not

    }

  },

  win: function(altitudeClimbed) {
    var _this = this;

    Utilities.Dialog.read(_this.winDialog, function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Game.gameComplete(altitudeClimbed);
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
  Gethigh.init();
}, false);
