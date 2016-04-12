var Gethigh = {
  introDialog: [
    "OK " + Game.getUsername() + ".... it's time for WORLD TRAVELER..!!",
    "The game where U gotta be as far as the distance between two famous pyramids...",
    "Templo Mayor and Piramide del Sol...thats like...really far...",
    "If you are that far away by the next world... You win!",
    "........now....lets see how far you are......",
    "......gimme " + Utilities.Word.getAdj(true, false) + " minute!!!...",
  ],
  winDialog: [
    "Woah, u r so high!",
  ],
  failDialog: [
    "Nah, u arent high enough, " + Game.getUsername() + "...",
  ],
  watch: null,
  timer: null,
  toClimb: 10, // Must increase by this altitude
  initialAltitude: 0,
  waitTime: 60000,
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
    var timeCounter = 0;

    _this.setInitialAltitude();

    _this.timer = setInterval(function() {

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

    navigator.geolocation.getCurrentPosition( function(geoposition) {
      var altitude = geoposition.coords.altitude;

      _this.initialAltitude = altitude;

      _this.startAltitudeWatch(altitude);

    });

  }

  startAltitudeWatch: function(initialAltitude) {
    var _this = this;

    _this.watch = navigator.geolocation.watchPosition( function(geoposition) {

      _this.compareAltitude(initialAltitude, geoposition.coords.altitude);

    }, function(error) {

      alert(error);
    }, {

      enableHighAccuracy: true,
    });

  },

  compareAltitude: function(oldAltitude, newAltitude) {
    var _this = this;
    var altitudeDifference = newAltitude - oldAltitude;

    if ( altitudeDifference >= _this.toClimb ) {

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
