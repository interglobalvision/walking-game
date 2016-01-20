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


        // Start orientation and position watchers
        _this.startGeoWatchers();

      });

    } else {

      // fallback for when not possible. Why? no idea but it might happen
      console.log(':(');
    }
  },
};

Game = {
  minigames: [
    'tippyswitch',
    'math',
    'supertap',
    'reset',
    'photocolor',
  ],
  loopGamesOrder: window.localStorage.getItem('loopOrder').split(','),
  gameAttempts: 2,

  // USER

  createUser: function(username, callback) {

    window.localStorage.setItem('username', username);
    window.localStorage.setItem('points', 0);
    window.localStorage.setItem('gems', 0);
    window.localStorage.setItem('progress', 0);
    window.localStorage.setItem('loops', 0);

    callback();
  },

  getUsername: function() {
    return window.localStorage.getItem('username');
  },

  // GAME STATE

  setupLoop: function() {
    var _this= this;

    console.log('Setting up loop');

    window.localStorage.setItem('progress', 0);

    _this.loopGamesOrder = Utilities.Misc.shuffleArray(_this.minigames);

    window.localStorage.setItem('loopOrder', _this.loopGamesOrder);

  },

  getProgressPercent: function() {
    var currentProgress = parseInt(window.localStorage.getItem('progress'));

    return currentProgress / this.minigames.length;
  },

  getLoops: function() {
    var currentLoops = parseInt(window.localStorage.getItem('loops'));

    return currentLoops;
  },

  nextMinigame: function() {
    var _this= this;
    var currentProgress = parseInt(window.localStorage.getItem('progress'));

    console.log('Loading next minigame');
    console.log('Current progress index', currentProgress);
    console.log('Game to load', _this.loopGamesOrder[currentProgress]);

    Router.go('/games/' + _this.loopGamesOrder[currentProgress] + '/');
  },

  finishLoop: function() {
    var _this= this;
    var currentLoops = parseInt(window.localStorage.getItem('loops'));

    if (currentLoops === null || isNaN(currentLoops)) {
      currentLoops = 0;
    }

    console.log('Finished loop');

    // perhaps a lot more needs to happen here. This is probably where the narrative should happen. But this could be a different route just for animation. Would then need to if/else in gameComplete when checking if last game in loop

    window.localStorage.setItem('loops', (currentLoops + 1));

    console.log('Loops so far', currentLoops);

    _this.setupLoop();
  },

  // MINI GAME

  gameFail: function(tryAgainCallback, failCallback) {
    var _this= this;

    if (_this.gameAttempts > 1) {
      _this.gameAttempts--;
      tryAgainCallback();
    } else {
      failCallback();
    }

  },

  gameComplete: function(points) {
    var _this= this;
    var currentProgress = parseInt(window.localStorage.getItem('progress'));

    if (currentProgress === null || isNaN(currentProgress)) {
      currentProgress = 0;
    }

    window.localStorage.setItem('progress', (currentProgress + 1));

    if (points) {
      _this.setNewPoints(points);
    }

    if ((currentProgress + 1) === _this.minigames.length) {
      _this.finishLoop();
    }

    Router.go('/');
  },

  // POINTS

  getPoints: function() {
    return window.localStorage.getItem('points');
  },

  setNewPoints: function(points) {
    var points = parseInt(points);
    var currentPoints = parseInt(window.localStorage.getItem('points'));
    var currentGems = parseInt(window.localStorage.getItem('gems'));

    if (currentPoints === null || isNaN(currentPoints)) {
      currentPoints = 0;
    }

    if (currentGems === null || isNaN(currentGems)) {
      currentGems = 0;
    }

    if (points > 0) {
      var modifier = (Math.log(currentGems+ 1) + 1);
      var modifiedPoints = Math.round((points * modifier));

      window.localStorage.setItem('points', (currentPoints + modifiedPoints));
    } else {
      window.localStorage.setItem('points', (currentPoints + points));
    }
  },

  resetPoints: function() {
    window.localStorage.setItem('points', 0);
  },

  // GEMS

  getGems: function() {
    return window.localStorage.getItem('gems');
  },

  setNewGems: function(gems) {
    var gems = parseInt(gems);
    var currentGems = window.localStorage.getItem('gems');

    if (currentGems === null || isNaN(currentGems)) {
      currentGems = 0;
    }

    window.localStorage.setItem('gems', (parseInt(currentGems) + gems));
  },

};

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
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);

    $('#game-username').html(Game.getUsername());
    $('#game-points').html(Game.getPoints());
    $('#game-gems').html(Game.getGems());
    $('#game-progress').html(Game.getProgressPercent());
  }
};

app.initialize();

Utilities = {

};
Router = {
  init: function() {
    var _this = this;

    var regex =  /(.+?(?:www))/;
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
}
Router.init();
Utilities.Color = {
  isNeighborColor: function(color1, color2, tolerance) {
    if (tolerance == undefined) {
      tolerance = 32;
    }

    return Math.abs(color1[0] - color2[0]) <= tolerance
    && Math.abs(color1[1] - color2[1]) <= tolerance
    && Math.abs(color1[2] - color2[2]) <= tolerance;
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
  }
};
Utilities.Dialog = {
  $target: $('.text-box-dialog'),
  $parent: $('#dialog'),
  interval: 44,

  arrayIndex: 0,

  lineIndex: 0,
  lineTimer: 0,

  read: function(dialogArray, callback) {

    var _this = this;

    _this.$parent = $('#dialog');
    _this.$target = $('.text-box-dialog');

    _this.dialogArray = dialogArray;
    _this.arrayIndex = 0;
    _this.callback = callback;

    _this.$parent.show();

    _this.$parent.off('click.dialogRead').on({
      'click.dialogRead': function() {
        if (_this.lineTimer > 0) {
          _this.skipLine();
        } else {
          if (_this.arrayIndex === (_this.dialogArray.length - 1)) {
            _this.finish();
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
    _this.lineTimer = setInterval(function() {

      if (_this.lineIndex < dialogLine.length) {

        _this.$target.append(dialogLine[_this.lineIndex]);
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

  finish: function() {
    var _this = this;

    _this.$parent.hide();
    _this.$target.html('');

    _this.callback();
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
};
Utilities.Number = {
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
  getWord: function(kind, indefinite) {
    var _this = this;

    var list = kind ==  'adj' ? _this.adjs : _this.nouns;
    var word = list[Math.floor(Math.random() * list.length)];

    if (indefinite) {
      if (_this.isVowel(word[0])) {
        word = 'an ' + word;
      } else {
        word = 'a ' + word;
      }
    }

    return word;
  },

  getAdj: function(indefinite) {
    var _this = this;

    return _this.getWord('adj', indefinite);
  },

  getNoun: function(indefinite) {
    var _this = this;

    return _this.getWord('noun', indefinite);
  },

  isVowel: function(character) {
    return /[aeiouAEIOU]/.test(character);
  }
}

Utilities.Word.init(Adjs, Nouns);
