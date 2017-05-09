Running = {
  stepSize: 0.0008, // kilometers
  runningSpeed: 2, // Km/h
  timeout: null,
  $blackout: $('#blackout'),
  $timer: $('#timer'),
  $radar: $('#radar'),
  $angle: $('#angle'),
  $mapStage: $('.map-stage'),
  $compass: $('#compass'),
  $mapFloor: $('.map-floor'),
  $compassContainer: $('#compass-container'),
  $mapGoal: $('#map-goal'),
  $mapSky: $('.map-sky'),
  $mapGoalContainer: $('#map-goal-container'),
  $mapOrientation: $('.map-orientation'),
  animationFrame: null,
  watchId: {
    orientation: null,
    position: null,
  },
  origin: {
    lat: null,
    lng: null,
  },
  destiny: {
    lat: null,
    lng: null,
  },
  position: {
    lat: null,
    lng: null,
  },
  mapFloorPos: null,
  mapGoalScale: null,
  angle: 0,
  scenePos: 0,
  goalPos: 0,
  modifiedDistance: 0,
  minDistance: 0.0023, // in radians
  maxDistance: 0.0026, // in radians
  destinyThresholdRadius: 0.300, // in Km

  totalDistance: 0,

  introDialog: [
    "Alright " + Utilities.Word.getNoun() + ", get your paws warmed up...it's time to RUN!",
    "Find your destination ASAP " + Game.getUsername() + "! RUN as fast as you can!",
  ],
  tryAgainDialog: [
    "STOP STOP STOP!!",
    "They say that time flies but you keep breaking it's wings",
    "Try again eh, " + Utilities.Word.getNoun() + "!",
  ],
  loseDialog: [
    "OK NOW STOP!",
    "OMG! You haven't got any muscle from all this walking, " + Game.getUsername() + "...well guess WHAT?",
    "NOW WE GOTTA WALK AGAIN!!",
  ],

  /*
   * Return distance between two geographical points in Kilometers
   *
   */
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

  /*
   * Convert radians to degrees
   *
   */
  rad2deg: function(rad) {
    return rad * 57.29577951308232;
  },

  /*
   * Convert degrees to radians
   *
   */
  deg2rad: function(deg) {
    return deg * (Math.PI / 180);
  },

  /*
   * Return a random number in the range of:
   * -max < x <  -min
   *  min < x < max
   *
   */
  getRandomDistance: function(min, max) {
    // Positive or negative?
    var way = Math.random() >= 0.5;
    var distance = Math.random() * (max - min) + min;

    if (way) {
      distance = distance * -1;
    }

    return distance;
  },

  /*
   * Calculates the angle ABC (in radians)
   *
   * A first point
   * C second point
   * B center point
   *
   * It always return the smallest angle, so angle is always < 180deg
   *
   */
  getAngle: function( pointA, pointB, pointC ) {
    var _this = this;
    var AB = Math.sqrt(Math.pow(pointB.lng - pointA.lng,2) + Math.pow(pointB.lat - pointA.lat,2));
    var BC = Math.sqrt(Math.pow(pointB.lng - pointC.lng,2) + Math.pow(pointB.lat - pointC.lat,2));
    var AC = Math.sqrt(Math.pow(pointC.lng - pointA.lng,2) + Math.pow(pointC.lat - pointA.lat,2));

    return _this.rad2deg(Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)));
  },

  /*
   * Update players geographical position
   *
   */
  updatePosition: function(position) {
    var _this = this;

    // Update players position
    _this.position = position;

    // Update north reference
    _this.reference = {
      lat: position.lat + _this.minDistance,
      lng: position.lng,
    };

    // Check distance in Km between position and destiny
    var distanceToDestiny = _this.getDistanceInKm(_this.position, _this.destiny);

    // distanceFromGoal is a percentage value describing how far you are from the destiny [meaning the threshold of destiny and the moment the next game triggers].
    // This is based on your location from the moment the destiny is created.
    // So at 100[%] you have just generated a new destiny. At 0[%] you are at destiny.
    // This value can be larger than 100 if you move in the wrong direction.
    var distanceFromGoal = ( (distanceToDestiny - _this.destinyThresholdRadius) * 100 ) / _this.totalDistance;

    // progressToGoal is users progress toward goal radius.
    // this is the inverse of distanceFromGoal
    // 0[%] is moment of destiny creation and 100[%] is at destiny
    var progressToGoal = 100 - distanceFromGoal;

    // progressToGoal is multiplied to a thousandth decimal point of 75
    // to use as pecentage of 75% when moving the map floor gradient.
    // 75% is the full Y axis translation of the gradient
    _this.mapFloorPos = progressToGoal * 0.75;

    // progressToGoal is multiplied to a thousandth decimal point
    // to use as scale of the map Goal object.
    // 1.00 is the object at full scale (goal is reached).
    _this.mapGoalScale = progressToGoal * 0.01;

    // if mapFloorPos is less than 0, we set it to 0
    // this keeps the floor from sliding off screen
    if (_this.mapFloorPos < 0) {
      _this.mapFloorPos = 0;
    }

    // if mapGoalScale is less than 0.01, we set it to 0.01
    // goal object from disappearing entirely or going negative scale
    if (_this.mapGoalScale < 0.01) {
      _this.mapGoalScale = 0.01;
    }

    if (distanceToDestiny < _this.destinyThresholdRadius) {

      _this.win();

    }
  },

  distanceToSteps: function(distance) {
    var _this = this;

    return Math.floor(distance/_this.stepSize);
  },

  updateOrientation: function(orientation) {
    var _this = this;

    var northOrientation = orientation * -1;

    // Get compensation angle
    var compensationAngle = _this.getAngle( _this.reference, _this.position, _this.destiny);

    // If destiny is at West of origin
    if (_this.position.lng > _this.destiny.lng) {
      compensationAngle = 360 - compensationAngle;
    }

    _this.angle = compensationAngle + northOrientation;

    // All the following alculations are based on a
    // the angle from 0 - 360, so we add 360 if the angle
    // is negative.
    if (_this.angle < 0) {
      _this.angle = _this.angle + 360;
    }

    // Here we save the angle in a new variable to use for
    // the goal positioning.
    var goalAngle = _this.angle;

    // We make that new angle from -180 - 180, because CSS
    // translateX transform will need a pos or neg value
    // to move the element left and right of center.
    if (_this.angle > 180) {
      goalAngle = _this.angle - 360;
    }

    // When the compass is pointed 70deg (+ or -) from 0 (top),
    // the arrow points offscreen.  So we get a percent of 70
    // to position the goal object with the arrow
    _this.goalPos = goalAngle / 0.7;

    // If the flag is offscreen, we don't move it
    if (_this.goalPos > 75) {
      _this.goalPos = 75;
    } else if (_this.goalPos < -75) {
      _this.goalPos = -75;
    }

    // for the scene we want a value from -25% - 25% to translate
    // left or right of center.  180 / 25 = 7.2
    _this.scenePos = _this.angle / 7.2;

    if (_this.angle > 180) {
      _this.scenePos = ( ( _this.angle - 180 ) / 7.2 ) - 25;
    }

  },

  /*
   * Bind navigator.gelocation and deviceorientation events
   *
   */
  startGeoWatchers: function () {
    var _this = this;

    // Start geolocation watch
    _this.watchId.position = navigator.geolocation.watchPosition( function(position) {
      _this.updatePosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }, function(error) {

      alert(error);
    }, {

      enableHighAccuracy: true,
    });

    // Start orientation compass

    // if cordova
    if (navigator.userAgent.match(/(iPhone|iPod|Android)/)) {
      _this.watchId.orientation = navigator.compass.watchHeading( function(heading) {
        _this.updateOrientation(heading.magneticHeading);
      });

    } else {
      $(window).bind('deviceorientation.compassOrientation', function() {
        // dont parse event as function variable as breaks scope
        _this.updateOrientation(event.alpha);
     });
    }
  },

  /*
   * Ubind navigator.gelocation and deviceorientation events
   *
   */
  stopGeoWatchers: function() {
    var _this = this;

    navigator.geolocation.clearWatch( _this.watchId.position );
    navigator.compass.clearWatch( _this.watchId.orientation );

  },

  startAnimation: function() {
    var _this = this;

    _this.animationFrame = window.requestAnimationFrame(_this.animate.bind(_this));
  },

  // This function runs on every animation frame
  animate: function() {
    var _this = this;

    _this.$mapFloor.css({
      '-webkit-transform': 'translateY(' + _this.mapFloorPos + '%)',
      'transform': 'translateY(' + _this.mapFloorPos + '%)',
    });

    _this.$mapGoal.css({
      '-webkit-transform': 'scale(' + _this.mapGoalScale + ')',
      'transform': 'scale(' + _this.mapGoalScale + ')',
    });

    _this.$mapGoalContainer.css({
      '-webkit-transform': 'translateX(' + _this.goalPos + '%)',
      'transform': 'translateX(' + _this.goalPos + '%)',
    });

    _this.$mapOrientation.css({
      '-webkit-transform': 'translateX(' + _this.scenePos + '%)',
      'transform': 'translateX(' + _this.scenePos + '%)',
    });

    _this.$compass.css({
      '-webkit-transform': 'rotate(' + _this.angle + 'deg)',
      'transform': 'rotate(' + _this.angle + 'deg)',
    });

    // TODO ANIMATE SHIT FOR RUNNING GAME

    var currentTime = + new Date();

    _this.$timer.text(_this.formatTimerStr(_this.stopTime - currentTime));

    _this.animationFrame = window.requestAnimationFrame(_this.animate.bind(_this));

  },

  formatTimerStr: function(ms) {
    mils=Math.floor(ms%1000)
    secs=Math.floor((ms/1000)%60)
    mins=Math.floor((ms/(1000*60))%60)

    if (mils < 10) {
      milsStr = '00' + mils;
    } else if (mils < 100) {
      milsStr = '0' + mils;
    } else {
      milsStr = mils;
    }

    secsStr = secs < 10 ? '0' + secs : secs;
    minsStr = mins < 10 ? '0' + mins : mins;

    return minsStr + ":" + secsStr + ":" + milsStr;
  },

  startTimer: function() {
    var _this = this;


    var time = _this.totalDistance / _this.runningSpeed;

    // Convert time into ms
    time = time * 60 * 60 * 1000;

    time = Math.round(time);

    // Maybe use this to make it harder?
    //Game.modifydifficulty(0.0001);

    _this.stopTime = time + new Date().valueOf();

    _this.timeout = setTimeout(function(){
      _this.fail();
      _this.$timer.text('00:00:000');
    }, time);
  },

  win: function() {
    var _this = this;

    _this.stop();

    var score = Game.getStepsPot();

    Utilities.Dialog.read([
      "OK GREAT! NOW STOP! You ran your " + Utilities.Word.getNoun() + "off...",
      "I'll let you keep " + Utilities.Number.roundFloat(score) + " steps!!!",
      "Now let's GO for a WALK, " + Game.getUsername() + "!!",
    ], function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Game.gameComplete(score);
      });

    });

  },

  fail: function() {
    var _this = this;

    Utilities.Misc.vibrate();

    _this.stop();

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.resetDestiny();
        _this.start();

      });

    }, function() {

      Utilities.Dialog.read(_this.loseDialog, function() {

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    });

  },

  stop: function() {
    var _this = this;

    window.clearTimeout(_this.timeout);

    window.cancelAnimationFrame(_this.animationFrame);
    _this.animationFrame = null;


    _this.stopGeoWatchers();
    $(window).unbind('.compassOrientation');

  },

  resetDestiny: function(callback) {
    var _this = this;

    _this.stopGeoWatchers();

    $(window).unbind('.compassOrientation');

    Game.setNewPoints( Utilities.Number.getRandomInt(-100,0) );

    if (callback) {
      callback();
    }

  },

  start: function() {
    var _this = this;

    // Set initial positions: origin, destiny, position
    navigator.geolocation.getCurrentPosition( function(position) {

      var pos = position.coords;

      // Set Origin location
      _this.origin.lat = pos.latitude,
        _this.origin.lng = pos.longitude,

        // Generate random destiny
        _this.destiny.lat = pos.latitude + _this.getRandomDistance(_this.minDistance,_this.maxDistance);
      _this.destiny.lng = pos.longitude + _this.getRandomDistance(_this.minDistance,_this.maxDistance);

      // Set total distance
      _this.totalDistance = _this.getDistanceInKm({
        lat: pos.latitude,
        lng: pos.longitude,
      }, _this.destiny) - _this.destinyThresholdRadius;

      // Set current position
      _this.updatePosition({
        lat: pos.latitude,
        lng: pos.longitude,
      });

      // Start orientation and position watchers
      _this.startGeoWatchers();

      // Start animation
      _this.startAnimation();

      // Start timer
      _this.startTimer();

    });
  },

  init: function() {
    var _this = this;

    _this.modifiedDistance = Game.modifyDifficulty(0.0001);

    _this.minDistance = _this.minDistance + _this.modifiedDistance; // in radians
    _this.maxDistance = _this.maxDistance + _this.modifiedDistance; // in radians

    // Fade in map
    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    // Check for geolocation and orientation availability
    if (navigator.geolocation && window.DeviceOrientationEvent) {

      Utilities.Dialog.read(_this.introDialog, function() {
        _this.start();
      });

    } else {

      WalkingError.unsupportedGPS();

    }
  },
};

document.addEventListener('deviceready', function() {
  Running.init();
}, false);
