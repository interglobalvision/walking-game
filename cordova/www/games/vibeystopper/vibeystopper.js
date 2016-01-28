var ViberyStopper = {
  fullPoints: 4321,
  points: 0,
  minWait: 1010,
  maxWait: 8888,
  winThreshold: 1111,
  $gameBlock: $('#game-block'),
  startTime: null,
  endTime: null,
  tryAgainDialog: [
    "What a shame. try again eh!",
  ],
  looseDialog: [
    "U really suck at this simple boring task",
  ],

  init: function() {
    var _this = this;

    if (!navigator.vibrate) {
      console.log('no vibration for you :-(');
    }

    $('#blackout').css('opacity', 0);

    _this.startGame();

  },

  bind: function() {
    var _this = this;

   _this.$gameBlock.on({
      click: function() {
        navigator.vibrate(0);
        _this.win();
      },
    });

  },

  unbind: function() {
    var _this = this;

    _this.$gameBlock.off();

  },

  startGame: function() {
    var _this = this;

    _this.wait = window.setTimeout(function() {

      _this.startTime = Date.now();
      navigator.vibrate(1000);
      _this.bind();

      _this.timeout = window.setTimeout(function() {

        _this.fail();

      }, _this.winThreshold);

    }, Utilities.Number.getRandomInt(_this.minWait, _this.maxWait));

  },

  win: function() {
    var _this = this;

    _this.unbind();

    window.clearTimeout(_this.timeout);
    window.clearTimeout(_this.wait);

    var endTime = Date.now();
    var gameLength = endTime - _this.startTime;
    var timeOutOfMax = _this.winThreshold - gameLength;
    var percentWin = (timeOutOfMax / _this.winThreshold);

    if (percentWin < 0) {
      percentWin = 0;
    }

    _this.points = percentWin * _this.fullPoints;

    Utilities.Dialog.read([
        "Yes yes YESSSS!",
        "You won " + _this.points + " points!!!",
      ], function() {

      Game.gameComplete(_this.points);

    });

  },

  fail: function() {
    var _this = this;

    _this.unbind();

    window.clearTimeout(_this.timeout);
    window.clearTimeout(_this.wait);

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.startGame();

      });

    }, function() {

      Utilities.Dialog.read(_this.looseDialog, function() {

        Router.go('/');

      });

    });

  },

};

document.addEventListener('deviceready', function() {
  ViberyStopper.init();
}, false);
