var Worldtraveler = {
  introDialog: [
    "OK " + Game.getUsername() + ".... it's time for WORLD TRAVELER..!!",
    "The game where U gotta travel the distance between two famous pyramids...",
    "Templo Mayor and Piramide del Sol...thats like...a lot of traveling...",
    "If you have travelled that far by the next round... You win!",
    "........now....lets see how far you travelled......",
    "......gimme " + Utilities.Word.getAdj(true, false) + " minute!!!...",
  ],
  tieDialog: [
    "OH! this is the first round of WORLD TRAVELER for you " + Game.getUsername() + "!",
    "...and it seems like you haven't set an starting position",
    "I'll save it now...",
    "........",
    "........",
    "OK! See ya next time...",
  ],
  finalWinDialog: [
    "Woah, u r such a good travler!",
    "You travelled more than the distance between the pyramids!!",
    "Since u love traveling, " + Game.getUsername() + "... let's go for a walk...!!!",
  ],
  finalFailDialog: [
    "Nah, u didnt travel enough, " + Game.getUsername() + "...",
    "I'll set ur new position as the starting line for the next time...",
    "........",
    "........",
    "OK! Back to walking...see ya next round...",
  ],
  distanceThreshold: 41.62, // Actual distance between the piramides
  $blackout: $('#blackout'),
  prefix: 'worldtraveler-',

  init: function() {
    var _this = this;

    $('.worldtraveler-pyramids').addClass('worldtraveler-pyramids-anim');
    $('.worldtraveler-background').addClass('worldtraveler-background-anim');

    if ( navigator.geolocation && window.DeviceOrientationEvent ) {

      _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

      Utilities.Dialog.read(_this.introDialog, function() {
        _this.$blackout.addClass('worldtraveler-flash');
        $('#coach-container').addClass('worldtraveler-spin');
        _this.startGame();
      });

    } else {
      console.log('no geolocation, wait.. how u even?..');
    }

  },

  startGame: function() {
    var _this = this;

    // Get current location
    navigator.geolocation.getCurrentPosition( function(geoposition) {

      _this.$blackout.removeClass('worldtraveler-flash');
      $('#coach-container').removeClass('worldtraveler-spin');

      var position = {
        lat: geoposition.coords.latitude,
        lng: geoposition.coords.longitude,
      };

      // The loading indicator would be turn off here

      // Check if there's a saved initial position
      _this.startingPos = _this.getInitialPos();

      // If no initial position, set it and exit
      if ( _this.startingPos ) {

        _this.compareDistance(_this.startingPos, position);

      } else {

        _this.setInitialPos(position);
        _this.tie();
        
      }

    });

    // It'd be great to have a loding/finding your location indicator
    // it'd be activated here
  },

  getInitialPos: function() {
    var _this = this;
    var savedPos = window.localStorage.getItem(_this.prefix + 'intialPos');

    if( !savedPos ) {
      return false;
    }

    savedPos = savedPos.split(',');
    var initialPos = {
      lat: savedPos[0],
      lng: savedPos[1],
    };

    return initialPos; 
  },

  setInitialPos: function(position) {
    var _this = this;

    if ( !position ) {
      return _this.resetInitialPos();
    }

    return window.localStorage.setItem(_this.prefix + 'intialPos', position.lat + ',' + position.lng);
  },

  resetInitialPos: function() {
    var _this = this;

    return window.localStorage.removeItem(_this.prefix + 'intialPos');
  },

  compareDistance: function(initialPos, finalPos) {
    var _this = this;

    // Compare distances
    var distance = Compass.getDistanceInKm(initialPos,finalPos);

    // if dsitance traveled is grater than the threshold
    if ( distance >= _this.distanceThreshold ) {

      // Win
      _this.win(distance);

      // Reset inital position
      _this.resetInitialPos();

    } else {

      // Set actual position as initial position for next round
      _this.setInitialPos(finalPos);

      // Fail
      _this.fail();

    }
  },

  tie: function() {
    var _this = this;

    Utilities.Dialog.read(_this.tieDialog, function() {
      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Router.go('/pages/compass/');
      });
    });

  },

  win: function(distance) {
    var _this = this;

    Utilities.Dialog.read(_this.finalWinDialog, function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Game.gameComplete(distance);
      });

    });

  },

  fail: function() {
    var _this = this;

    Utilities.Dialog.read(_this.finalFailDialog, function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Router.go('/pages/compass/');
      });

    });

  },

};

document.addEventListener('deviceready', function() {
  Worldtraveler.init();
}, false);
