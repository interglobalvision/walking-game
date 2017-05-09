var Worldtraveler = {
  introDialog: [
    "OK " + Game.getUsername() + ".... it's time for WORLD TRAVELER..!!",
    "The game where U gotta be as far as the distance between two famous pyramids...",
    "Templo Mayor and Piramide del Sol...thats like...really far...",
    "If you are that far away by the next world... You win!",
    "........now....lets see how far you are......",
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
  finalFailDialog: [
    "Nah, u arent far enough, " + Game.getUsername() + "...",
    "I'll set ur new position as the starting point for the next time...",
    "........",
    "........",
    "OK! Back to walking...see ya in the next world...",
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

  getDistanceInKm: function(pointA, pointB) {
    var _this = this;

    var R = 6371; // Radius of the earth in km
    var dLat = _this.deg2rad(pointB.lat - pointA.lat);
    var dLon = _this.deg2rad(pointB.lng - pointA.lng);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(_this.deg2rad(pointA.lat)) * Math.cos(_this.deg2rad(pointB.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    return d;
  },

  compareDistance: function(initialPos, finalPos) {
    var _this = this;

    // Compare distances
    var stepSize = 0.0008,
    var distance = _this.getDistanceInKm(initialPos,finalPos);
    var steps = Math.floor(distance/stepSize);

    // if distance traveled is grater than the threshold
    if ( distance >= _this.distanceThreshold ) {

      // Win
      _this.win(steps);

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
        Game.gameComplete(0);
      });

    });

  },

  win: function(steps) {
    var _this = this;

    Utilities.Dialog.read([
      "Woah, u r such a good traveler!",
      "You are at least as far the distance between the pyramids!! That's just amazing!",
      "I'll let you keep your total steps since the last time you played this minigame...",
      "You keep " + Utilities.Number.roundFloat(steps) + " steps!!!",
      "Since u love going far, " + Game.getUsername() + "... let's go for a walk...!!!",
    ], function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Game.gameComplete(steps);
      });

    });

  },

  fail: function() {
    var _this = this;

    Utilities.Dialog.read(_this.finalFailDialog, function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Game.gameComplete(0);
      });

    });

  },

};

document.addEventListener('deviceready', function() {
  Worldtraveler.init();
}, false);
