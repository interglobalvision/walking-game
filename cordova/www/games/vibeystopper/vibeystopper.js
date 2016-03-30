var ViberyStopper = {
  fullPoints: 4321,
  points: 0,
  minWait: 1010,
  maxWait: 8888,
  winThreshold: 1111,
  $switch: $('.vibey-switch'),
  $background: $('.vibey-background'),
  startTime: null,
  endTime: null,
  introDialog: [
    "OK I'm feeling TURNED ONNN! Which means were about to play..... VIBEY STOPPER!",
    "When the red box turns to green the machine is on! When the machine starts to overheat it will flash and shake.....",
    "That's when you hit the BIG YELLOW SWITCH to turn it off!! READY??? Lets GO!",
  ],
  tryAgainDialog: [
    "What a shame. try again eh!",
  ],
  loseDialog: [
    "U really suck at this simple boring task",
  ],

  init: function() {
    var _this = this;

    if (!navigator.vibrate) {
      console.log('no vibration for you :-(');
    }

    $('#blackout').css('opacity', 0);

    Utilities.Dialog.read(_this.introDialog, function() {
      _this.startGame();
    });

  },

  bind: function() {
    var _this = this;

   _this.$switch.on({
      click: function() {
        _this.$switch.removeClass('vibey-on');
        _this.$background.removeClass('vibey-flash');
        navigator.vibrate(0);
        _this.win();
      },
    });

  },

  unbind: function() {
    var _this = this;

    _this.$switch.off();

  },

  startGame: function() {
    var _this = this;

    _this.$switch.addClass('vibey-on');

    _this.wait = window.setTimeout(function() {

      _this.startTime = Date.now();
      _this.$background.addClass('vibey-flash');
      navigator.vibrate(500);
      _this.bind();

      _this.timeout = window.setTimeout(function() {

        _this.$switch.removeClass('vibey-on');
        _this.$background.removeClass('vibey-flash');

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

      Utilities.Dialog.read(_this.loseDialog, function() {

        Router.go('/');

      });

    });

  },

};

document.addEventListener('deviceready', function() {
  ViberyStopper.init();
}, false);
