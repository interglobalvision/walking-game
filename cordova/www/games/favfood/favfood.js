var FavFood = {
  $blackout: $('#blackout'),

  introDialog: [
    "How well do you really know your coach " + Game.getUsername() + "?",
    "Now me you will tell, my prefered food is which?!?!",
  ],
  winDialog: [
    "I'm glad friends we are. And friends together we walk walk walk...",
  ],
  failDialog: [
    "Hmmmm I'm quite upset " + Game.getUsername(),
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    Utilities.Dialog.read(_this.introDialog, function() {
      _this.startGame();
    });

  },

  bind: function() {
    var _this = this;

  },

  startGame: function() {
    var _this = this;

    _this.bind();
  },

  win: function() {
    var _this = this;
    var score = Game.getStepsPot();

    Utilities.Dialog.read(_this.winDialog, function() {

      Game.gameComplete(score);

    });

  },

  fail: function() {
    var _this = this;

    Utilities.Dialog.read(_this.failDialog, function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Router.go('/pages/compass/');
      });

    });


  },

};

document.addEventListener('deviceready', function() {
  FavFood.init();
}, false);
