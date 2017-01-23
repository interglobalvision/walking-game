var OnePercent = {
  $blackout: $('#blackout'),
  $countdown: $('#countdown'),
  timeToFail: 500000,
  modifiedFail: Game.modifyDifficulty(500),
  batteryLevel: false,
  timeLeft: null,
  introDialog: [
    "Join the 1%...",
    "...more mobile phone battery club",
  ],
  winDialog: [
    "This should knock you down a peg or 2. I'm going to take away 1 point for every smartass character in your maths! HAHAHAHAHA......",
  ],
  tryAgainDialog: [
    "What a shame " + Game.getUsername() + "...try again eh!?!",
  ],
  looseDialog: [
    "Wow " + Game.getUsername() + "!! Terrible!",
    "Time for a walk...",
  ],

  init: function() {
    var _this = this;

    _this.timeToFail = _this.timeToFail - _this.modifiedFail;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    Utilities.Dialog.read(_this.introDialog, function() {

      _this.startGame();

    });

  },

  bind: function() {
    var _this = this;

    window.addEventListener('batterystatus', _this.onBatteryStatus.bind(_this), false);

  },

  onBatteryStatus: function(status) {
    var _this = this;

    console.log(status);

    if (status.isPlugged == true) {
      $('#battery-status').addClass('battery-charge').removeClass('battery-red');
    } else {
      $('#battery-status').addClass('battery-red').removeClass('battery-charge');
    }

    if (!_this.batteryLevel) {
      _this.batteryLevel = status.level;
    } else if (status.level > _this.batteryLevel) {
      _this.win();
    }

  },

  setCountdown: function() {
    var _this = this;

    _this.countdown = window.setInterval(function() {

      _this.timeLeft = _this.timeLeft - 1000;
      _this.$countdown.html(_this.timeLeft / 1000);

      if (_this.timeLeft < 0) {
        _this.fail();
      }

    }, 1000);
  },

  startGame: function() {
    var _this = this;

    _this.timeLeft = _this.timeToFail;
    _this.$countdown.html(_this.timeLeft / 1000);

    _this.bind();
    _this.setCountdown();

    $('#chargephone-coach').attr('class', 'zoom-phone');

  },

  endGame: function() {
    var _this = this;

    window.clearInterval(_this.countdown);
  },

  win: function() {
    var _this = this;
    var score = Game.getStepsPot() + 1;

    _this.endGame();

    $('#battery-status').addClass('battery-green').removeClass('battery-red, battery-charge');

    Utilities.Dialog.read([
      "Yes yes YESSSS!",
      "You won " + Utilities.Number.roundFloat(score) + " points!!!",
    ], function() {

      Game.gameComplete(score);

    });

  },

  fail: function() {
    var _this = this;

    _this.endGame();

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.startGame();

      });

    }, function() {

      Utilities.Dialog.read(_this.looseDialog, function() {

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    });

  },
};

document.addEventListener('deviceready', function() {
  OnePercent.init();
}, false);
