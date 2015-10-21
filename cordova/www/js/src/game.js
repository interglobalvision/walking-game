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
    var currentProgress = window.localStorage.getItem('progress');

    window.localStorage.setItem('progress', (currentProgress + 1));
    Router.go('/');
  },

  nextMinigame: function() {
    var currentProgress = window.localStorage.getItem('progress');

    Router.go('/games/' + this.minigames[currentProgress]);
  },

  getProgressPercent: function() {
    var currentProgress = window.localStorage.getItem('progress');

    return currentProgress / this.minigames.length;
  },

  getPoints: function() {
    return window.localStorage.getItem('points');
  },

  setNewPoints: function(points) {
    var currentPoints = window.localStorage.getItem('points');
    var currentGems = window.localStorage.getItem('gems');

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
    var currentGems = window.localStorage.getItem('gems');

    window.localStorage.setItem('gems', (currentGems + gems));
  },

};