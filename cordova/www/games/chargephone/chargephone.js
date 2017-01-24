var ChargePhone = {
  $blackout: $('#blackout'),
  $countdown: $('#countdown'),
  timeToFail: 500000,
  modifiedFail: Game.modifyDifficulty(500),
  batteryLevel: false,
  timeLeft: null,
  introDialog: [
    "My phone is about to die, " + Game.getUsername() + "!!",
    "I need you to transfer some of your phone charge to my phone!",
    "Quick! Before it dies: hold down on my phone battery to transfer your charge!",
  ],
  winDialog: [
    "This should knock you down a peg or 2. I'm going to take away 1 point for every smartass character in your maths! HAHAHAHAHA......",
  ],
  tryAgainDialog: [
    "What a shame " + Game.getUsername() + "...try again eh!?!",
  ],
  loseDialog: [
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

    navigator.getBattery().then(function(battery) {
      _this.levelChange(battery.level);

      battery.onlevelchange = function() {
        _this.levelChange(this.level);
      };
    });

    $('#chargephone-phone').on('mousedown', function() {
      $('.chargephone-stage').addClass('charging');
    });

    $('#chargephone-phone').on('mouseup', function() {
      $('.chargephone-stage').removeClass('charging');
    });
  },

  levelChange: function(level) {
    var _this = this;

    if (!_this.batteryLevel) {
      _this.batteryLevel = level;
    }  else if (level < _this.batteryLevel) {
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

    $('.chargephone-stage').addClass('show-phone');

  },

  endGame: function() {
    var _this = this;

    window.clearInterval(_this.countdown);
    $('.chargephone-stage').removeClass('show-phone charging');
    $('#chargephone-phone').off('mousedown');
  },

  win: function() {
    var _this = this;
    var score = Game.getStepsPot() + 1;

    _this.endGame();

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

      Utilities.Dialog.read(_this.loseDialog, function() {

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    });

  },
};

document.addEventListener('deviceready', function() {
  ChargePhone.init();
}, false);
