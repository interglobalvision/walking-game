/*
number between 1-4 generated
target lights up
user holds on target
target changes color and loop repeats

if user ends the hold the game fails, if user cancels a hold the game fails, if user moves tap outside of target the game fails
*/

var TwisterFingers = {
  $blackout: $('#blackout'),

  targetOrder: [1, 2, 3, 4],

  introDialog: [
    "Okely " + Utilities.Word.getNoun() + ", lets twist",
    "Press and hold with a finger for each target as they light up. Don't let go!",
  ],
  winDialog: [
    "Big winner " + Utilities.Word.getNoun() + ". Big winner",
  ],
  tryAgainDialog: [
    "What a shambles you are " + Utilities.Word.getNoun() + "! Give it another shot.",
  ],
  loseDialog: [
    "..." + Game.getUsername() + "...well guess WHAT?",
    "NOW WE GOTTA WALK IT OUT!!",
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    Utilities.Dialog.read(_this.introDialog, function() {
      _this.startGame();
    });

  },

  startGame: function() {
    var _this = this;

    _this.targetOrder = Utilities.Misc.shuffleArray(_this.targetOrder);

    _this.setTarget(_this.targetOrder[0]);

    _this.bind();

  },

  setTarget: function(target) {
    var _this = this;

    _this.target = target;
    _this.$target = $('#twister-target-' + (target + 1));

    _this.$target.css('background-color', 'teal');
  },

  log: function(data) {
    console.log(data)
  },

  bind: function() {
    var _this = this;

    document.body.addEventListener('touchstart', _this.onTouchStart.bind(event), false);
    document.body.addEventListener('touchmove', _this.log.bind(event), false);
    document.body.addEventListener('touchend', _this.onTouchEnd.bind(event), false);
    document.body.addEventListener('touchcancel', _this.onTouchEnd.bind(event), false);

  },

  unbind: function() {
    var _this = this;

    document.body.removeEventListener('touchstart', _this.onTouchStart.bind(_this), false);
    document.body.removeEventListener('touchmove', _this.log.bind(_this), false);
    document.body.removeEventListener('touchend', _this.onTouchEnd.bind(_this), false);
    document.body.removeEventListener('touchcancel', _this.onTouchEnd.bind(_this), false);

  },

  onTouchStart: function(event) {
    var _this = this;

    console.log(event);

    // check if touch location is inside target.
    // if not fail
    // if yes save touch id to target then generate new target

  },

  onTouchMove: function(event) {
    var _this = this;

    console.log(event);

    // check for touch id in array of saved touches. then check that new position is not outside target associated with that id if it is then fail game
    // (possibly add a warning state for near edge of target?)

  },

  onTouchEnd: function(event) {
    var _this = this;

    console.log(event);

    _this.fail();
  },

  stopGame: function() {
    var _this = this;

    _this.unbind();
  },

  win: function() {
    var _this = this;

    _this.stopGame();

    var score = Game.getStepsPot();

    Utilities.Dialog.read([
      "Muy dexterous eh!",
      "You won " + Utilities.Number.roundFloat(score) + " points!!!",
    ], function() {

      Game.gameComplete(score);

    });
  },

  fail: function() {
    var _this = this;

    _this.stopGame();

    Utilities.Misc.vibrate();

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

      });

    }, function() {

      Utilities.Dialog.read(_this.loseDialog, function() {

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    });
  }

};

document.addEventListener('deviceready', function() {
  TwisterFingers.init();
}, false);
