var ChargePhone = {
  $blackout: $('#blackout'),
  $countdown: $('#chargephone-countdown'),
  timeToFail: 180000,
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


    // Bind event handler functions
    _this.onBatteryStatus = _this.onBatteryStatus.bind(_this);

    Utilities.Dialog.read(_this.introDialog, function() {

      _this.startGame();

    });

  },

  bind: function() {
    var _this = this;

    window.addEventListener('batterystatus', _this.onBatteryStatus, false);

    $('#chargephone-phone').on('touchstart', function() {
      $('.chargephone-stage').addClass('charging');
      _this.setVibrateInterval();
    });

    $('#chargephone-phone').on('touchend', function() {
      $('.chargephone-stage').removeClass('charging');
      _this.clearVibrateInterval();
    });
  },

  unbind: function() {
    var _this = this;

    window.removeEventListener('batterystatus', _this.onBatteryStatus, false);
  },

  setVibrateInterval: function() {
    var _this = this;

    _this.interval = setInterval( function() {
      Utilities.Misc.vibrate();
    }, 1000);
  },

  clearVibrateInterval: function() {
    var _this = this;

    if (_this.interval) {
      clearInterval(_this.interval);
    }
  },

  onBatteryStatus: function(status) {
    var _this = this;

    console.log(status);

    if (!_this.batteryLevel) {
    _this.batteryLevel = status.level;
    }  else if (status.level < _this.batteryLevel) {
    _this.win();
    }

  },

  setCountdown: function() {
    var _this = this;
    var currentTime = new Date().valueOf();

    var updateCountdown = function() {
      _this.$countdown.html(_this.formatTimerStr(_this.timeLeft - currentTime));

      currentTime = + new Date().valueOf();

      if (_this.timeLeft - currentTime <= 0) {
        _this.fail();
      }
    }

    _this.countdown = window.setInterval(function() {
      updateCountdown();
    }, 1000);

    updateCountdown();
  },

  formatTimerStr: function(ms) {
    secs=Math.floor((ms/1000)%60)
    mins=Math.floor((ms/(1000*60))%60)

    secsStr = secs < 10 ? '0' + secs : secs;
    minsStr = mins < 10 ? '0' + mins : mins;

    return minsStr + ":" + secsStr;
  },

  startGame: function() {
    var _this = this;

    _this.bind();

    _this.timeLeft = new Date().valueOf() + _this.timeToFail;
    _this.setCountdown();

    $('.chargephone-stage').addClass('show-phone');

  },

  endGame: function() {
    var _this = this;

    _this.unbind();
    window.clearInterval(_this.countdown);
    _this.clearVibrateInterval();
    $('.chargephone-stage').removeClass('show-phone charging');
    $('#chargephone-phone').off('touchstart');
  },

  win: function() {
    var _this = this;
    var score = Game.getStepsPot() + 1;

    _this.endGame();

    Utilities.Dialog.read([
      "Yes yes YESSSS!",
      "I'll let you keep your " + Utilities.Number.roundFloat(score) + " steps!!!",
    ], function() {

      _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
        Game.gameComplete(score);
      });

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
