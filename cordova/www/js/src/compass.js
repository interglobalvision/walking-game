Compass = {
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
  /*
    minDistance: 0.0025, // in radians
    maxDistance: 0.006, // in radians
  */
  minDistance: 0.0025, // in radians
  maxDistance: 0.0028, // in radians
  thresholdRadius: 0.300, // in Km

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

    var bleepSpeed = ( (distanceToDestiny - _this.thresholdRadius) * 1000 ) / _this.totalDistance;// - _this.thresholdRadius;

    var progressToDestiny = - ( bleepSpeed - 1001 );

    var mapFloorPos = progressToDestiny * 0.001 * 75;

    var mapGoalScale = progressToDestiny * 0.001;

    if (mapFloorPos < 0) {
      mapFloorPos = 0;
    }

    if (mapGoalScale < 0.001) {
      mapGoalScale = 0.001;
    }

    _this.$mapFloor.css('transform', 'translateY(' + mapFloorPos + '%)');
    _this.$mapGoal.css('transform', 'scale(' + mapGoalScale + ')' );
    _this.$radar.css('animation-duration', bleepSpeed + 'ms');
    _this.$radar.html(bleepSpeed + 'ms');

    if( distanceToDestiny < _this.thresholdRadius ) {
      _this.stop();
      Game.nextMinigame();
    } 
  },

  updateOrientation: function(orientation) {
    var _this = this;

    var northOrientation = orientation * -1;

    // Get compensation angle
    var compensationAngle = _this.getAngle( _this.reference, _this.position, _this.destiny);

    // If destiny is at West of origin
    if( _this.position.lng > _this.destiny.lng ) {
      compensationAngle = 360 - compensationAngle;
    }

    var angle = compensationAngle + northOrientation;

    _this.$compass.css({
      '-webkit-transform': 'rotate(' + angle + 'deg)',
      'transform': 'rotate(' + angle + 'deg)',
    });

  },

  skyColor: function() {
    var _this = this;

    var now = new Date(),
      hour = now.getHours(),
      skyColor;

    if ( hour > 4 && hour < 10 ) { 

      skyColor = 'rgb(100, 160, 255)'; // Morning 5 - 9

    } else if ( hour > 9 && hour < 17 ) { 

      skyColor = 'rgb(0, 120, 255)'; // Day 10 - 16

    } else if ( hour > 16 &&  hour < 22 ) { 

      skyColor = 'rgb(10, 40, 95)'; // Evening 17 - 21

    } else { 

      skyColor = 'rgb(0, 20, 60)'; // Night 22 - 4

    }
    
    console.log("hour = " + hour);
    console.log("skyColor = " + skyColor);

    _this.$mapSky.css('background-color', skyColor);
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
  stop: function() {
    var _this = this;

    navigator.geolocation.clearWatch( _this.watchId.position );
    navigator.compass.clearWatch( _this.watchId.orientation );

    $(window).unbind('.compassOrientation');
  },

  init: function() {
    var _this = this;

    _this.$radar = $('#radar');
    _this.$compass = $('#compass');
    _this.$mapFloor = $('#map-floor');
    _this.$mapGoal = $('#map-goal');
    _this.$mapSky = $('#map-sky');

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
          lng: pos.longitude
        }, _this.destiny) - _this.thresholdRadius;

        // Set current position
        _this.updatePosition({
          lat: pos.latitude,
          lng: pos.longitude,
        });

        // Set sky color
        _this.skyColor();

        // Start orientation and position watchers
        _this.startGeoWatchers();

      });

    } else {

      // fallback for when not possible. Why? no idea but it might happen
      console.log(':(');
    }
  },
};
