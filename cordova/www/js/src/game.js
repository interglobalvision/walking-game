Game = {
  minigames: [
    'tippyswitch',
    'math',
    'supertap',
    'reset',
    'photocolor',
  ],
  gameAttempts: 2,

  // USER

  createUser: function(username, callback) {

    window.localStorage.setItem('username', username);
    window.localStorage.setItem('points', 0);
    window.localStorage.setItem('gems', 0);
    window.localStorage.setItem('progress', 0);
    window.localStorage.setItem('loops', 0);
    this.setupLoop();

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
    var _this = this;
    
    var loopOrder = window.localStorage.getItem('loopOrder');
    
    if(!loopOrder) {
      return [];
    }
    return loopOrder.split(',');
  },

  nextMinigame: function() {
    var _this= this;
    var currentProgress = _this.getProgress();
    var gameOrder = _this.getLoopOrder();

    console.log('Loading next minigame');
    console.log('Current progress index', currentProgress);
    console.log('Game to load', gameOrder[currentProgress]);

    Router.go('/games/' + gameOrder[currentProgress] + '/');
  },

  finishLoop: function() {
    var _this= this;
    var currentLoops = _this.getLoops;

    console.log('Finished loop');

    // perhaps a lot more needs to happen here. This is probably where the narrative should happen. But this could be a different route just for animation. Would then need to if/else in gameComplete when checking if last game in loop

    _this.setLoops(currentLoops + 1);

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
    var currentProgress = _this.getProgress();

    _this.setProgress(currentProgress + 1);

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
    var points = window.localStorage.getItem('points');

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
      var modifier = (Math.log(currentGems+ 1) + 1);
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
    var gems = window.localStorage.getItem('gems');

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

};
