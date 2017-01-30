Game = {
  minigames: [
    'favfood',
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
