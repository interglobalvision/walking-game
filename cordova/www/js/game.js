Game = {
  minigames: [
    'supertap',
    'reset',
    'photocolor',
  ],

  resetProgress: function() {
    window.localstorage.setItem('progress', 0);
  },

  gameComplete: function() {
    var currentProgress = window.localstorage.getItem('progress');

    window.localstorage.setItem('progress', (currentProgress + 1));
    Router.go('/');
  },

  nextMinigame: function() {
    var currentProgress = window.localstorage.getItem('progress');

    Router.go('/games/' + this.minigames[currentProgress]);
  },

  percentComplete: function() {
    var currentProgress = window.localstorage.getItem('progress');

    return currentProgress / this.minigames.length;
  },

  setNewPoints: function(points) {
    var currentPoints = window.localstorage.getItem('points');
    var currentGems = window.localstorage.getItem('gems');

    if (points > 0) {
      var modifier = (Math.log(currentGems) + 1);
      var modifiedPoints = Math.round((points * modifier));

      window.localstorage.setItem('points', (currentPoints + modifiedPoints));
    } else {
      window.localstorage.setItem('points', (currentPoints + points));
    }
  },

  setNewGems: function(gems) {
    var currentGems = window.localstorage.getItem('gems');

    window.localstorage.setItem('gems', (currentGems + gems));
  },

};