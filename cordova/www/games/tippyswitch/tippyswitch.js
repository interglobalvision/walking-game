var TippySwitch = {
  fullPoints: 987,
  points: 0,
  maxMilliseconds: 12345,
  $gameBox: $('#game-box'),
  $gameBall: $('#game-ball'),
  forward: true,
  ballPosition: 15,
  startTime: null,
  tryAgainDialog: [
    "What a shame. try again eh!",
  ],
  looseDialog: [
    "U really suck at this simple boring task",
  ],

  init: function() {
    var _this = this;

    $('#blackout').css('opacity', 0);

    _this.bind();
    _this.startGame();

  },

  bind: function() {
    var _this = this;

    if (window.DeviceOrientationEvent) {
      $(window).bind('deviceorientation', function() {
      // dont parse event as function variable as breaks scope
        _this.orientationChange(event);
      });
    }

  },

  unbind: function() {

    if (window.DeviceOrientationEvent) {
      $(window).unbind('deviceorientation');
    }

  },

  startGame: function() {
    var _this = this;

    _this.timeout = window.setInterval(function() {

      _this.switchPoles();

    }, Utilities.Number.getRandomInt(789, 1009));

    _this.startTime = Date.now();

  },

  orientationChange: function(e) {
    var _this = this;

    if (_this.forward) {
      _this.updateBallPosition(e.beta / 22);
    } else {
      var modifier = (0 - (e.beta / 21));

      _this.updateBallPosition(modifier);
    }
  },

  updateBallPosition: function(modifier) {
    var _this = this;

    _this.ballPosition += modifier;

    if (_this.ballPosition > 99.9) {
      _this.win();
    }

    if (_this.ballPosition < 0) {
      _this.fail();
    }

    _this.$gameBall.css('bottom', _this.ballPosition + '%');
  },

  resetBallPosition: function() {
    var _this = this;

    _this.ballPosition = 15;
    _this.$gameBall.css('bottom', _this.ballPosition + '%');
  },

  switchPoles: function() {
    var _this = this;

    if (_this.forward) {
      _this.forward = false;
      _this.$gameBox.addClass('backwards');
    } else {
      _this.forward = true;
      _this.$gameBox.removeClass('backwards');
    }

  },

  win: function() {
    var _this = this;

    _this.unbind();

    window.clearInterval(_this.checker);
    window.clearInterval(_this.countdown);
    window.clearTimeout(_this.timeout);

    var endTime = Date.now();
    var gameLength = endTime - _this.startTime;
    var timeOutOfMax = _this.maxMilliseconds - gameLength;
    var percentWin = (timeOutOfMax / _this.maxMilliseconds);

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

    window.clearInterval(_this.checker);
    window.clearInterval(_this.countdown);
    window.clearTimeout(_this.timeout);

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.resetBallPosition();
        _this.bind();
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
  TippySwitch.init();
}, false);
