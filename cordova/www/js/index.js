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

      //Game.setTotalDistance(distanceToDestiny); //add distance to total
      Game.setStepsPot(_this.distanceToSteps(_this.totalDistance));

      _this.stop();

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
    'twisterfingers',
    'tippyswitch',
    'shakyvibrate',
    'math',
    'supertap',
    'reset',
    'colorsnap',
    '1percent',
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

  setStepsPot: function(pot) {
    var _this = this;

    window.localStorage.setItem('stepsPot', pot);
  },

  getStepsPot: function() {
    return window.localStorage.getItem('stepsPot') ? parseFloat( window.localStorage.getItem('stepsPot') ) : 0;
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

    window.plugins.socialsharing.share(
      _this.shareTitle(score),
      _this.shareSubject,
      'http://puu.sh/mTFtM/242a0fa967.png',
      _this.shareUrl,
      function() {
        console.log('share ok');
      },

      function(errorMessage) {
        console.log('share failed');
        console.log(errorMessage);
        alert('something went wrong');
      }

    );

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
