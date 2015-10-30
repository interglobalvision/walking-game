Game = {
  minigames: [
    'tippyswitch',
    'math',
    'supertap',
    'reset',
    'photocolor',
  ],

  createUser: function(username, callback) {
    _this = this;

    window.localStorage.setItem('username', username);

    window.localStorage.setItem('points', 0);
    window.localStorage.setItem('gems', 0);
    window.localStorage.setItem('progress', 0);

    callback();
  },

  getUsername: function() {
    return window.localStorage.getItem('username');
  },

  resetProgress: function() {
    window.localStorage.setItem('progress', 0);
  },

  gameComplete: function() {
    var currentProgress = parseInt(window.localStorage.getItem('progress'));

    if (currentProgress === null || isNaN(currentProgress)) {
      currentProgress = 0;
    }

    window.localStorage.setItem('progress', (currentProgress + 1));
    Router.go('/');
  },

  nextMinigame: function() {
    var currentProgress = parseInt(window.localStorage.getItem('progress'));

    Router.go('/games/' + this.minigames[currentProgress] + '/');
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
