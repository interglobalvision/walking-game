Game = {
  minigames: [
    'tippyswitch',
    'math',
    'supertap',
    'reset',
    'photocolor',
  ],
  loopGamesOrder: function() {
    var _this = this;
    
    var loopOrder = window.localStorage.getItem('loopOrder');
    
    if(!loopOrder) {
      return [];
    }
    return loopOrder.split(',');
  }
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
