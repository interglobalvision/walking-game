Game = {
  minigames: [
    'supertap',
    'reset',
    'photocolor',
  ],

  resetProgress: function() {
    Meteor.users.update(Meteor.userId(), {$set: {'profile.progress': 0,},});
  },

  gameComplete: function() {
    var currentProgress = Meteor.user().profile.progress;

    Meteor.users.update(Meteor.userId(), {$set: {'profile.progress': (currentProgress + 1),},});

    Router.go('/');
  },

  nextMinigame: function() {
    var currentProgress = Meteor.user().profile.progress;

    Router.go(this.minigames[currentProgress]);
  },

  percentComplete: function() {
    var currentProgress = Meteor.user().profile.progress;

    return currentProgress / this.minigames.length;
  },
};

// Helpers for display

Handlebars.registerHelper('gamePoints', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.score.points;
  }
});

Handlebars.registerHelper('gameGems', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.score.gems;
  }
});

Handlebars.registerHelper('gameProgress', function() {
  if (Meteor.user()) {
    return Game.percentComplete();
  }
});