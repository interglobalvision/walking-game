Game = {
  minigames: [
    'supertap',
    'reset',
    'photocolor',
  ],

  resetProgress: function() {
    window.localStorage.setItem('progress', 0);
  },

  gameComplete: function() {
    var currentProgress = parseInt(window.localStorage.getItem('progress'));

    if (currentProgress === null || currentProgress === 'NaN') {
      currentProgress = 0;
    }

    window.localStorage.setItem('progress', (currentProgress + 1));
    Router.go('/');
  },

  nextMinigame: function() {
    var currentProgress = parseInt(window.localStorage.getItem('progress'));

    Router.go('/games/' + this.minigames[currentProgress]);
  },

  getProgressPercent: function() {
    var currentProgress = parseInt(window.localStorage.getItem('progress'));

    return currentProgress / this.minigames.length;
  },

  getPoints: function() {
    return window.localStorage.getItem('points');
  },

  setNewPoints: function(points) {
    var points = parseInt(points);
    var currentPoints = parseInt(window.localStorage.getItem('points'));
    var currentGems = parseInt(window.localStorage.getItem('gems'));

    if (currentPoints === null || currentPoints === 'NaN') {
      currentPoints = 0;
    }

    if (currentGems === null || currentGems === 'NaN') {
      currentGems = 0;
    }

    if (points > 0) {
      var modifier = (Math.log(currentGems) + 1);
      var modifiedPoints = Math.round((points * modifier));

      window.localStorage.setItem('points', (currentPoints + modifiedPoints));
    } else {
      window.localStorage.setItem('points', (currentPoints + points));
    }
  },

  getGems: function() {
    return window.localStorage.getItem('gems');
  },

  setNewGems: function(gems) {
    var gems = parseInt(gems);
    var currentGems = window.localStorage.getItem('gems');

    if (currentGems === null || currentGems === 'NaN') {
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
  },
  go: function(url) {
    var _this = this;

    window.location = _this.basePath[0] + url + 'index.html';
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
  interval: 66,

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

  getAdj(indefinite) {
    var _this = this;

    return _this.getWord('adj', indefinite);
  },

  getNoun(indefinite) {
    var _this = this;

    return _this.getWord('noun', indefinite);
  },

  isVowel: function(character) {
    return /[aeiouAEIOU]/.test(character);
  }
}

Utilities.Word.init(Adjs, Nouns);
