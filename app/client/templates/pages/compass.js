Template.compass.onCreated(function () {
//   var _this = this;
});

Template.compass.onRendered(function () {
  var _this = this;
  
  Compass.init();
});

Template.compass.onDestroyed(function () {
  Compass.stop();
});

Template.compass.events({
  'click #tap-button' : function (event, template) {
  },
});

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
  minDistance: 0.0009, // in rad?
  maxDistance: 0.005, // in rad?
  distanceRatio: 300, // in Km
  getDistance: function(pointA, pointB) {
    var _this = this;

    var xs = 0;
    var ys = 0;

    xs = pointB.lng - pointA.lng;
    xs = xs * xs;

    ys = pointB.lat - pointA.lat;
    ys = ys * ys;

    return Math.sqrt( xs + ys );
  },
  getDistanceInKm: function(pointA, pointB) {
    var _this = this;

    var R = 6371; // Radius of the earth in km
    var dLat = _this.deg2rad(pointB.lat-pointA.lat);
    var dLon = _this.deg2rad(pointB.lng-pointA.lng); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(_this.deg2rad(pointA.lat)) * Math.cos(_this.deg2rad(pointB.lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  },
  deg2rad: function(deg) {
    return deg * (Math.PI/180)
  },
  rad2deg: function(rad) {
    return rad * 57.29577951308232;
  },
  getRandomDistance: function(min, max) {
    // Positive or negative?
    var way = Math.random() >= 0.5;
    console.log(way);
    if( way ) {
      max = max * -1;
      min = min * -1;
    }
    var distance = Math.random() * (max - min) + min;
    console.log(distance);
    return distance;
  },
  /*
   * Calculates the angle ABC (in radians) 
   *
   * A first point
   * C second point
   * B center point
   */
  getAngle: function( pointA, pointB, pointC ) {
    var _this = this;
    var AB = Math.sqrt(Math.pow(pointB.lng-pointA.lng,2)+ Math.pow(pointB.lat-pointA.lat,2));    
    var BC = Math.sqrt(Math.pow(pointB.lng-pointC.lng,2)+ Math.pow(pointB.lat-pointC.lat,2)); 
    var AC = Math.sqrt(Math.pow(pointC.lng-pointA.lng,2)+ Math.pow(pointC.lat-pointA.lat,2));
    return _this.rad2deg(Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB)));
  },
  updatePosition: function(position) {
    var _this = this;

    _this.position = position;
    
    // Also update north reference
    _this.reference = {
      lat: position.lat + _this.minDistance,
      lng: position.lng,
    };

    $('#position span').html( _this.position.lat + ", " + _this.position.lng );

    // Check distance in Km between position and destiny
    var distance = _this.getDistanceInKm( _this.position, _this.destiny );

    $('#distance span').html( distance );

    if( distance < 0.3 ) {
      $('#compass-destiny').addClass('blue');
    } else {
      $('#compass-destiny').removeClass('blue');
    }

  },
  updateOrientation: function(orientation) {
    var _this = this;

    $('#north-angle span').html(orientation);
    northOrientation = orientation * -1;
    $('#compass-north').css({
      '-ms-transform': 'rotate(' + northOrientation + 'deg)',
      '-webkit-transform': 'rotate(' + northOrientation + 'deg)',
      'transform': 'rotate(' + northOrientation + 'deg)',
    });

    // Get compensation angle
    var compensationAngle = _this.getAngle( _this.reference, _this.position, _this.destiny);


    // If destiny is at West of origin
    if( _this.position.lng > _this.destiny.lng ) {
      compensationAngle = 360 - compensationAngle;
    }

    $('#comp-angle span').html( compensationAngle );
    var angle =  compensationAngle + northOrientation;
    $('#angle span').html( angle );
    $('#compass-destiny').css({
      '-ms-transform': 'rotate(' + angle + 'deg)',
      '-webkit-transform': 'rotate(' + angle + 'deg)',
      'transform': 'rotate(' + angle + 'deg)',
    });

  },
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
    if( Meteor.isCordova ) {
      _this.watchId.orientation = navigator.compass.watchHeading( function(heading) {

        _this.updateOrientation(heading.magneticHeading);

      });

    } else {
      $(window).bind('deviceorientation.compassOrientation', function() {

        _this.updateOrientation(event.alpha);

     });
    }
  },
  stop: function() {
    var _this = this;

    navigator.geolocation.clearWatch( _this.watchId.position );
    navigator.compass.clearWatch( _this.watchId.orientation );

    $(window).unbind('.compassOrientation');
  },
  init: function() {
    var _this = this;

    // Check for geolocation and orientation availability
    if (navigator.geolocation && window.DeviceOrientationEvent) {

      // Set initial positions: origin, destiny, position
      navigator.geolocation.getCurrentPosition( function(position) {

        // Set Origin location
        _this.origin.lat = position.coords.latitude,
        _this.origin.lng = position.coords.longitude,

        $('#origin span').html( _this.origin.lat + ", " + _this.origin.lng);

        // Generate random destiny
        _this.destiny.lat = position.coords.latitude + _this.getRandomDistance(_this.minDistance,_this.maxDistance);
        _this.destiny.lng = position.coords.longitude + _this.getRandomDistance(_this.minDistance,_this.maxDistance);

        $('#destiny span').html( _this.destiny.lat + ", " + _this.destiny.lng);

        // Set current position
        _this.updatePosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        // Start orientation and position watchers
        _this.startGeoWatchers();

      });

    } else {
      console.log(':(');
    }
  },
};

