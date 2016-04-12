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

        _this.startGame();

      });

    } else {

      console.log('no geolocation, wait.. how u even?..');

    }

  },

  startGame: function() {
    var _this = this;

    _this.setInitialAltitude();

  },

  runTimer: function() {
    var _this = this;
    var timeCounter = 0;

    _this.timer = setInterval(function() {

      $('#gethigh-timer').html(timeCounter);

      if(timeCounter >= _this.waitTime) {

        console.log('time\'s up');

        clearInterval(_this.timer);

        navigator.geolocation.clearWatch(_this.watch);

        _this.fail();

      }

      timeCounter++;

    }, 1000);

  },

  setInitialAltitude: function() {
    var _this = this;

    navigator.geolocation.getCurrentPosition( function(geoposition) {
      var altitude = geoposition.coords.altitude;

      _this.initialAltitude = altitude;

      if ( altitude > 0 ) {

        $('#gethigh-initial').html( altitude );

        _this.startAltitudeWatch();

      } else {

        WalkingError.unsupported('altitude');

      }

    });

  },

  startAltitudeWatch: function(initialAltitude) {
    var _this = this;

    _this.runTimer();

    _this.watch = navigator.geolocation.watchPosition( function(geoposition) {

      _this.compareAltitude(geoposition.coords.altitude);

    }, function(error) {

      alert(error);
    }, {

      enableHighAccuracy: true,
    });

  },

  compareAltitude: function(updatedAltitude) {
    var _this = this;
    var altitudeDifference = updatedAltitude - _this.initialAltitude;

    $('#gethigh-update').html( updatedAltitude ); //dev
    $('#gethigh-difference').html( altitudeDifference ); //dev

    if ( ( updatedAltitude > _this.initialAltitude ) && ( altitudeDifference >= _this.toClimb ) ) {

      clearInterval(_this.timer);

      navigator.geolocation.clearWatch(_this.watch);

      _this.win( altitudeDifference );

    } else {

      console.log( altitudeDifference );

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
