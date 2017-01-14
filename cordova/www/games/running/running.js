Home = {
  init: function() {
    var _this = this;

    $('#menu-share').click(function() {
      Game.shareWithOptions();
    });

    Running.init();

  },
};

document.addEventListener('deviceready', function() {
  Home.init();
}, false);

Running = {
  stepSize: 0.0008, // kilometers
  $blackout: $('#blackout'),
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

  skyColor: function() {
    var _this = this;

    var now = new Date();

    if (now) {
      var hour = now.getHours(),
        skyColor;

      if (hour > 4 && hour < 10) {

        skyColor = 'rgb(100, 160, 255)'; // Morning 5 - 9

      } else if (hour > 9 && hour < 17) {

        skyColor = 'rgb(145, 205, 242)'; // Day 10 - 16

      } else if (hour > 16 && hour < 22) {

        skyColor = 'rgb(10, 40, 95)'; // Evening 17 - 21

      } else {

        skyColor = 'rgb(0, 20, 60)'; // Night 22 - 4

      }

      _this.$mapSky.css('background-color', skyColor); // set sky color
    }
  },

  /*
   * Sets map theme graphics
   *
   */
  mapTheme: function() {
    var _this = this;

    _this.$mapStage.addClass('world-' + Game.getWorld());
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

    window.requestAnimationFrame(_this.animate.bind(_this));
  },

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


    window.requestAnimationFrame(_this.animate.bind(_this));

  },

  win: function() {
    var _this = this;

    _this.stop();

    var score = Game.getStepsPot();

    Utilities.Dialog.read([
      "Yes yes YESSSS!",
      "You won " + Utilities.Number.roundFloat(score) + " points!!!",
    ], function() {

      Game.gameComplete(score);

    });


  },

  stop: function() {
    var _this = this;

    _this.stopGeoWatchers();
    $(window).unbind('.compassOrientation');

  },

  resetDestiny: function(callback) {
    var _this = this;

    _this.stopGeoWatchers();

    $(window).unbind('.compassOrientation');

    Game.setNewPoints( Utilities.Number.getRandomInt(-100,0) );

    _this.init();

    if (callback) {
      callback();
    }

  },

  init: function() {
    var _this = this;

    _this.modifiedDistance = Game.modifyDifficulty(0.0001);

    _this.minDistance = _this.minDistance + _this.modifiedDistance; // in radians
    _this.maxDistance = _this.maxDistance + _this.modifiedDistance; // in radians

    // Check for geolocation and orientation availability
    if (navigator.geolocation && window.DeviceOrientationEvent) {

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

        // Set sky color
        _this.skyColor();

        // Set map theme graphics
        _this.mapTheme();

        // Start orientation and position watchers
        _this.startGeoWatchers();

        // Start animation
        _this.startAnimation();


        // Fade in map
        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

      });

    } else {

      WalkingError.unsupportedGPS();

    }
  },
};
