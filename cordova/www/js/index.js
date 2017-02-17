/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },

  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('DOMContentLoaded', this.onContentLoaded, false);
    document.addEventListener('backbutton', this.onBackKeyDown, false);
  },

  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },

  onContentLoaded: function() {
    FastClick.attach(document.body);
  },

  onBackKeyDown: function() {
    return true;
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);

    $('#game-username').html(Game.getUsername());
    $('#game-points').html(Game.getPoints());
    $('#game-gems').html(Game.getGems());
    $('#game-progress').html(Game.getProgressPercent());
  },
};

app.initialize();
Compass = {
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
  /*
    minDistance: 0.0025, // in radians
    maxDistance: 0.006, // in radians
  */
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
    var mapFloorPos = progressToGoal * 0.75;

    // progressToGoal is multiplied to a thousandth decimal point
    // to use as scale of the map Goal object.
    // 1.00 is the object at full scale (goal is reached).
    var mapGoalScale = progressToGoal * 0.01;

    // if mapFloorPos is less than 0, we set it to 0
    // this keeps the floor from sliding off screen
    if (mapFloorPos < 0) {
      mapFloorPos = 0;
    }

    // if mapGoalScale is less than 0.01, we set it to 0.01
    // goal object from disappearing entirely or going negative scale
    if (mapGoalScale < 0.01) {
      mapGoalScale = 0.01;
    }

    _this.$mapFloor.css({
      '-webkit-transform': 'translateY(' + mapFloorPos + '%)',
      'transform': 'translateY(' + mapFloorPos + '%)',
    });

    _this.$mapGoal.css({
      '-webkit-transform': 'scale(' + mapGoalScale + ')',
      'transform': 'scale(' + mapGoalScale + ')',
    });

    if (distanceToDestiny < _this.destinyThresholdRadius) {

      Game.setTotalDistance(distanceToDestiny); //add distance to total

      _this.stop();

    }
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

    var angle = compensationAngle + northOrientation;

    // All the following alculations are based on a
    // the angle from 0 - 360, so we add 360 if the angle
    // is negative.
    if (angle < 0) {
      angle = angle + 360;
    }

    // Here we save the angle in a new variable to use for
    // the goal positioning.
    var goalAngle = angle;

    // We make that new angle from -180 - 180, because CSS
    // translateX transform will need a pos or neg value
    // to move the element left and right of center.
    if (angle > 180) {
      goalAngle = angle - 360;
    }

    // When the compass is pointed 70deg (+ or -) from 0 (top),
    // the arrow points offscreen.  So we get a percent of 70
    // to position the goal object with the arrow
    var goalPos = goalAngle / 0.7;

    // If the flag is offscreen, we don't move it
    if (goalPos > 75) {
      goalPos = 75;
    } else if (goalPos < -75) {
      goalPos = -75;
    }

    // for the scene we want a value from -25% - 25% to translate
    // left or right of center.  180 / 25 = 7.2
    var scenePos = angle / 7.2;

    if (angle > 180) {
      scenePos = ( ( angle - 180 ) / 7.2 ) - 25;
    }

    _this.$mapGoalContainer.css({
      '-webkit-transform': 'translateX(' + goalPos + '%)',
      'transform': 'translateX(' + goalPos + '%)',
    });

    _this.$mapOrientation.css({
      '-webkit-transform': 'translateX(' + scenePos + '%)',
      'transform': 'translateX(' + scenePos + '%)',
    });

    _this.$compass.css({
      '-webkit-transform': 'rotate(' + angle + 'deg)',
      'transform': 'rotate(' + angle + 'deg)',
    });

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

  stop: function() {
    var _this = this;

    _this.stopGeoWatchers();
    $(window).unbind('.compassOrientation');

    Game.nextMinigame();
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

        // Fade in map
        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

      });

    } else {

      WalkingError.unsupportedGPS();

    }
  },
};

WalkingError = {
  unsupportedCompensation: 1000,

  // most basic not sure if useful
  throw: function(log, message) {
    console.log(log);
    alert(message);
  },

  // most likely usecase
  unsupported: function(tech) {
    var _this = this;

    if (!tech) {
      tech = 'the required technology';
    }

    console.log(tech + ' is unsupported on this device');

    alert('Sorry ' + Game.getUsername() + ', but your device does not support ' + tech + '!! But I will give you a consolation prize... Here\'s ' + _this.unsupportedCompensation + ' points. Now get outta here!');

    Game.gameComplete(_this.unsupportedCompensation);
  },

  // perhaps this is only likely to happen if a user says no to GPS
  unsupportedGPS: function() {

    console.log('Fuck. No GPS');
    alert('Sorry ' + Game.getUsername() + ', but your device does not support GPS or you have denied the app access to your location. You can\'t go walking if I don\'t know where you are. Open the Walking Game settings on your device and allow location access!!');

  },
};
Game = {
  minigames: [
    'tippyswitch',
    'math',
    'supertap',
    'reset',
    'colorsnap',
    'vibeystopper',
    'jankenpon',
    'worldtraveler',
    'medit8',
  ],
  worlds: [
    'Desert',
    'City',
    'Arctic',
    'Jungle',
  ],
  gameAttempts: 2,

  shareTitle: function(score) {
    return 'WOOAAAAHH! U HAVE AN AWESOME SCORe 0F ' + score + ' POIIINTSSS BRAAAHHH';
  },

  shareSubject: 'Subject: I did this on Walking Game. The most tiring phone game ever made',
  shareUrl: 'http://interglobal.vision/',

  // USER

  createUser: function(username, callback) {
    var _this = this;

    window.localStorage.setItem('username', username);
    window.localStorage.setItem('points', 0);
    window.localStorage.setItem('gems', 0);
    window.localStorage.setItem('progress', 0);
    window.localStorage.setItem('distance', 0);
    window.localStorage.setItem('loops', 0);
    window.localStorage.setItem('world', 0);
    window.localStorage.setItem('rank', _this.newRank());
    _this.setupLoop();

    callback();
  },

  getUsername: function() {
    return window.localStorage.getItem('username');
  },

  // GAME STATE

  setupLoop: function() {
    var _this = this;

    console.log('Setting up loop');

    _this.setProgress(0);

    _this.setLoopOrder( Utilities.Misc.shuffleArray(_this.minigames) );

  },

  getProgress: function() {
    var progress = parseInt(window.localStorage.getItem('progress'));

    if (progress === null || isNaN(progress)) {
      progress = 0;
    }

    return progress;
  },

  setProgress: function(progress) {
    window.localStorage.setItem('progress', progress);
  },

  getProgressPercent: function() {
    var _this = this;
    var currentProgress = _this.getProgress();

    return currentProgress / this.minigames.length;
  },

  setTotalDistance: function(newDistance) {
    var _this = this;
    var oldDistance = _this.getTotalDistance();
    var newDistance = parseFloat(newDistance);

    window.localStorage.setItem('distance', oldDistance + newDistance);
  },

  getTotalDistance: function() {
    return window.localStorage.getItem('distance') ? parseFloat( window.localStorage.getItem('distance') ) : 0;
  },

  getTotalDistanceString: function() {
    var _this = this;
    var totalDistance = _this.getTotalDistance();

    var distances = [
      [ 0.0046, 'anacondas', ],
      [ 0.025, 'blue whales', ],
      [ 0.828, 'Burj Khalifas', ],
      [ 0.006, 'elephant trunks', ],
      [ 0.00206, 'Ebenezer Places', ],
      [ 385000.6, 'Lunar distances', ],
      [ 40075.0, 'Earth circumferences', ],
    ];

    var randomDistance = distances[ Utilities.Number.getRandomInt(0, distances.length - 1) ];
    var calcDistance = totalDistance / randomDistance[0];

    if ( calcDistance > 1 ) {
      calcDistance = calcDistance.toFixed(3);
    }

    return calcDistance + ' ' + randomDistance[1];
  },

  getLoops: function() {
    var loops = parseInt(window.localStorage.getItem('loops'));

    if (loops === null || isNaN(loops)) {
      loops = 0;
    }

    return loops;
  },

  setLoops: function(loops) {
    window.localStorage.setItem('loops', loops);
  },

  setLoopOrder: function(loopOrder) {
    window.localStorage.setItem('loopOrder', loopOrder);
  },

  getLoopOrder: function() {
    var loopOrder = window.localStorage.getItem('loopOrder');

    if(!loopOrder) {
      return [];
    }

    return loopOrder.split(',');
  },

  modifyDifficulty: function(difficulty) {
    var _this = this;
    var modifier = _this.getLoops();

    return modifier * difficulty;
  },

  nextMinigame: function() {
    var _this = this;
    var currentProgress = _this.getProgress();
    var gameOrder = _this.getLoopOrder();

    console.log('Loading next minigame');
    console.log('Current progress index', currentProgress);
    console.log('Game to load', gameOrder[currentProgress]);

    Router.go('/games/' + gameOrder[currentProgress] + '/');
  },

  finishLoop: function() {
    var _this = this;
    var currentLoops = _this.getLoops();

    console.log('Finished loop');

    // perhaps a lot more needs to happen here. This is probably where the narrative should happen. But this could be a different route just for animation. Would then need to if/else in gameComplete when checking if last game in loop

    _this.setLoops(currentLoops + 1);

    _this.nextWorld();
    _this.setRank();

    console.log('Loops so far', currentLoops);

    _this.setupLoop();

    Router.go('/scenes/levelup/');
  },

  // WORLD

  nextWorld: function() {
    var _this = this;
    var current = _this.getWorld();
    var next = current + 1;

    if ( next === _this.worlds.length ) {
      window.localStorage.setItem('world', 0);
    } else {
      window.localStorage.setItem('world', next);
    }
  },

  getWorld: function() {
    return parseInt( window.localStorage.getItem('world') );
  },

  getWorldName: function() {
    var _this = this;
    var worldNum = _this.getWorld();

    return _this.worlds[worldNum];
  },

  // RANK
  setRank: function() {
    var _this = this;

    window.localStorage.setItem('rank', _this.newRank());
  },

  newRank: function() {
    return Utilities.Word.getAdj(true, true) + ' ' + Utilities.Word.getNoun(false, true);
  },

  getRank: function() {
    return window.localStorage.getItem('rank');
  },

  // MINI GAME

  gameFail: function(tryAgainCallback, failCallback) {
    var _this = this;

    if (_this.gameAttempts > 1) {
      _this.gameAttempts--;
      tryAgainCallback();
    } else {
      failCallback();
    }

  },

  gameComplete: function(points) {
    var _this = this;
    var currentProgress = _this.getProgress();

    _this.setProgress(currentProgress + 1);

    if (points) {
      _this.setNewPoints(points);
    }

    if ((currentProgress + 1) === _this.minigames.length) {
      _this.finishLoop();
    } else {
      Router.go('/pages/compass/');
    }

  },

  // POINTS

  getPoints: function() {
    var points = parseInt( window.localStorage.getItem('points') );

    if (points === null || isNaN(points)) {
      points = 0;
    }

    return points;
  },

  setPoints: function(points) {
    window.localStorage.setItem('points', points);
  },

  setNewPoints: function(points) {
    var _this = this;

    var points = parseInt(points);
    var currentPoints = _this.getPoints();
    var currentGems = _this.getGems();

    if (points > 0) {
      var modifier = (Math.log(currentGems + 1) + 1);
      var modifiedPoints = Math.round((points * modifier));

      _this.setPoints( currentPoints + modifiedPoints );
    } else {
      _this.setPoints( currentPoints + points );
    }
  },

  resetPoints: function() {
    var _this = this;

    _this.setPoints(0);
  },

  // GEMS

  getGems: function() {
    var gems = parseInt( window.localStorage.getItem('gems') );

    if (gems === null || isNaN(gems)) {
      gems = 0;
    }

    return gems;
  },

  setGems: function(gems) {
    window.localStorage.setItem('gems', gems);
  },

  setNewGems: function(gems) {
    var _this = this;
    var gems = parseInt(gems);
    var currentGems = _this.getGems();

    _this.setGems( currentGems + gems);
  },

  // SOCIAL SHARING

  shareWithOptions: function() {
    var _this = this;
    var score = _this.getPoints();

    $('#map-menu').addClass('loading');

    _this.generateShareImage(score, function(image) {

      window.plugins.socialsharing.share(
        _this.shareTitle(score),
        _this.shareSubject,
        image,
        _this.shareUrl,
        function() {
          $('#map-menu').removeClass('loading');
        },
        function(errorMessage) {
          $('#map-menu').removeClass('loading');
          console.log(errorMessage);
          alert('Something went wrong. Maybe you got no friends?');
        }

      );

    });

  },

  generateShareImage: function(points, callback) {
    var _this = this;
    $('body').append('<canvas id="canvas" width="1200" height="1200" style="display: none"></canvas>');
    var canvas = document.getElementById('canvas');
    var stage = new createjs.Stage(canvas);

    var baseImageEncode = 'data:image/png;base64,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';

    var img = new Image();
    img.src = baseImageEncode;
    var baseImageBitmap = new createjs.Bitmap(img);

    img.onload = function() {

      stage.addChild(baseImageBitmap);

      var text = new createjs.Text('I am ' + _this.getRank() + ' , I\'m playing Walking Game and I got some ' + points +' points', 'bold 140px sans-serif', '#fff');
      text.x = 100;
      text.y= 100;
      text.lineWidth = 1000;

      stage.addChild(text);

      stage.update();

      var returnImage = stage.toDataURL();

      $('#canvas').remove();

      callback(returnImage);
    };

  },

};

Menu = {
  $blackout: $('#blackout'),
  $menu: $('.menu'),
  $menuButton: $('#map-menu-button'),
  $menuPoints: $('#menu-points'),
  $menuDistance: $('#menu-distance'),
  $menuRank: $('#menu-rank'),
  $menuWorld: $('#menu-world'),
  $buttonShare: $('[data-ref="menu-share"]'),
  $buttonOpenSub: $('.open-sub-menu'),
  $buttonCloseSub: $('.close-sub-menu'),

  howtoGreeting: '<p>dear ' + Game.getUsername() + ',</p>',

  resetDestinyDialog: [
    'What? You lost? Pshh...',
    'Ok, I\'ll set a new walking goal for you, ' + Game.getUsername() + '...',
    '...and imma take some points off your score!',
  ],

  $resetDestiny: $('[data-ref="menu-reset-destiny"]'),

  // Dev controls
  $devMenu: $('[data-ref="dev-menu"]'),
  $devEnd: $('[data-ref="dev-end-map"]'),

  toggleMenu: function() {
    var _this = this;

    _this.closeSubMenu();

    _this.$menu.toggle("fast");
  },

  init: function() {
    var _this = this;

    _this.$menuPoints.html( Game.getPoints() );
    _this.$menuDistance.html( Game.getTotalDistanceString() );
    _this.$menuWorld.html( Game.getWorldName() );
    _this.$menuRank.html( Game.getRank() );

    $('.howto-text').prepend( _this.howtoGreeting );

    // Toggle menu
    _this.$menuButton.on('click', function() {
      _this.toggleMenu();
    });

    // Share
    _this.$buttonShare.on('click', function(event) {
      event.preventDefault();
      Game.shareWithOptions();
    });

    // Open sub menu
    _this.$buttonOpenSub.on('click', function(event) {
      event.preventDefault();
      _this.openSubMenu( $(this).attr('data-ref') );
    });

    // Close sub menu
    _this.$buttonCloseSub.on('click', function(event) {
      event.preventDefault();
      _this.closeSubMenu();
    });

    // Reset destiny
    _this.$resetDestiny.on('click', function(event) {
      event.preventDefault();
      _this.toggleMenu();
      Utilities.Dialog.read(_this.resetDestinyDialog, function() {
        Compass.resetDestiny(function() {
          _this.$menuPoints.html(Game.getPoints());
        });
      });
    });

    // Dev control click events
    _this.$devMenu.on('click', function(event) {
      event.preventDefault();
      Router.go('/pages/dev/');
    });

    _this.$devEnd.on('click', function(event) {
      event.preventDefault();
      Compass.stop();
    });

  },

  openSubMenu: function(menu) {
    $('#menu-main').addClass('show-sub-menu');
    $('#' + menu).addClass('show-sub-menu');
  },

  closeSubMenu: function() {
    $('#menu-main').removeClass('show-sub-menu');
    $('.sub-menu').removeClass('show-sub-menu');
  },

};

Router = {
  init: function() {
    var _this = this;
    var regex = /(.+?(?:www))/;

    _this.basePath = regex.exec(window.location.href);

    if (window.cordova.platformId === 'browser') {
      _this.isBrowser = true;
    } else {
      _this.isBrowser = false;
    }
  },

  go: function(url) {
    var _this = this;

    if (_this.isBrowser) {
      window.location = url;
    } else {
      window.location = _this.basePath[0] + url + 'index.html';
    }
  },
};

Router.init();
Utilities = {

};
Utilities.Color = {
  isNeighborColor: function(color1, color2, tolerance) {
    if (tolerance == undefined) {
      tolerance = 32;
    }

    return Math.abs(color1[0] - color2[0]) <= tolerance && Math.abs(color1[1] - color2[1]) <= tolerance && Math.abs(color1[2] - color2[2]) <= tolerance;
  },

  hslToRgb: function(h, s, l){
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t){
        if (t < 0) {
          t += 1;
        }

        if (t > 1) {
          t -= 1;
        }

        if (t < 1 / 6) {
          return p + (q - p) * 6 * t;
        }

        if (t < 1 / 2) {
          return q;
        }

        if (t < 2 / 3) {
          return p + (q - p) * (2 / 3 - t) * 6;
        }

        return p;
      };

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255),];
  },
};
Utilities.Dialog = {
  $target: $('.text-box-dialog'),
  $parent: $('#dialog'),
  $skip: undefined,
  interval: 33,

  arrayIndex: 0,

  lineIndex: 0,
  lineTimer: 0,
  outputText: '',
  inProgress: false,

  read: function(dialogArray, callback) {

    var _this = this;

    _this.$parent = $('#dialog');
    _this.$target = $('.text-box-dialog');

    _this.dialogArray = dialogArray;
    _this.arrayIndex = 0;

    _this.$parent.show();
    _this.inProgress = true;

    _this.$parent.append('<div id="dialog-skip"></div>');
    _this.$skip = $('#dialog-skip');

    _this.$skip.off('click.dialogRead').on({
      'click.dialogRead': function() {
        if (_this.lineTimer > 0) {
          _this.skipLine();
        } else {
          if (_this.arrayIndex === (_this.dialogArray.length - 1)) {
            _this.finish(callback);
          } else {
            _this.arrayIndex++;
            _this.readLine();
          }
        }
      },
    });

    _this.readLine();

  },

  readLine: function() {
    var _this = this;
    var dialogLine = _this.dialogArray[_this.arrayIndex];

    _this.lineIndex = 0;
    _this.$target.html('');
    _this.outputText = '';

    _this.lineTimer = setInterval(function() {

      if (_this.lineIndex < dialogLine.length) {

        _this.outputText += dialogLine[_this.lineIndex];
        _this.$target[0].innerHTML = _this.outputText;

        _this.lineIndex++;

      } else {

        _this.clearLineInterval();
        _this.$target.append('<a class="text-box-next">&rarr;</a>');

      }

    }, _this.interval);
  },

  clearLineInterval: function() {
    var _this = this;

    clearInterval(_this.lineTimer);
    _this.lineTimer = 0;
  },

  skipLine: function() {
    var _this = this;

    _this.clearLineInterval();
    _this.$target.html(_this.dialogArray[_this.arrayIndex]);
    _this.$target.append('<a class="text-box-next">&rarr;</a>');

  },

  finish: function(callback) {
    var _this = this;

    _this.$parent.hide();
    _this.inProgress = false;
    _this.$target.html('');
    _this.$skip.remove();

    if (callback) {
      callback();
    }
  },

};

Utilities.Misc = {
  shuffleArray: function(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  },

  vibrate: function(otherDuration) {
    var duration = 1000;

    if (otherDuration) {
      duration = otherDuration;
    }

    if (navigator.vibrate) {
      navigator.vibrate(duration);
    } else {
      console.log('no vibrate support');
    }
  },
};
Utilities.Number = {
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  roundFloat: function(number) {
    // this is how to round to 3 decimal places in js lmao
    number = (number + 0.00001) * 1000;
    number = Math.floor(number);
    number = number / 1000;

    return number;
  },
};
Utilities.Word = {
  adjs: [],
  nouns: [],

  init: function(adjsList, nounList) {
    var _this = this;

    _this.adjs = adjsList;
    _this.nouns = nounList;

  },

  /**
   * Returns a word from the lists
   * @param {string} kind Defines what kind of word return (adj|noun)
   * @param {bool} indefinite Defines if it should append an indefinite article
   */
  getWord: function(kind, indefinite, capitalize) {
    var _this = this;

    var list = kind == 'adj' ? _this.adjs : _this.nouns;
    var word = list[Math.floor(Math.random() * list.length)];

    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (indefinite) {
      if (_this.isVowel(word[0])) {
        word = 'an ' + word;
      } else {
        word = 'a ' + word;
      }
    }

    return word;
  },

  getAdj: function(indefinite, capitalize) {
    var _this = this;

    return _this.getWord('adj', indefinite, capitalize);
  },

  getNoun: function(indefinite, capitalize) {
    var _this = this;

    return _this.getWord('noun', indefinite, capitalize);
  },

  isVowel: function(character) {
    return /[aeiouAEIOU]/.test(character);
  },
};

Utilities.Word.init(Adjs, Nouns);
