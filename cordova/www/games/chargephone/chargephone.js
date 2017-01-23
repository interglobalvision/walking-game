var OnePercent = {
  $blackout: $('#blackout'),
  $countdown: $('#countdown'),
  timeToFail: 500000,
  modifiedFail: Game.modifyDifficulty(500),
  batteryLevel: false,
  batteryCharging: false,
  timeLeft: null,
  introDialog: [
    "Join the 1%...",
    "...more mobile phone battery club",
  ],
  batteryDownDialog: [
    "Your battery level is going down!",
    "Use a better charger, " + Game.getUsername(),
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

    //window.addEventListener('batterystatus', _this.onBatteryStatus.bind(_this), false);

    navigator.getBattery().then(function(battery) {
      _this.chargingChange(battery.charging);
      _this.levelChange(battery.level);

      battery.onchargingchange = function() {
        _this.chargingChange(this.charging);
      });

      battery.onlevelchange = function() {
        _this.levelChange(this.level);
      });
    });
  },

  chargingChange: function(charging) {
    var _this = this;

    _this.batteryCharging = charging;

    console.log(charging);

    if (_this.batteryCharging == true) {
      $('#battery-status').attr('class', 'cls-16 charge');
    } else {
      $('#battery-status').attr('class', 'cls-16 red');
    }
  },

  levelChange: function(level) {
    var _this = this;

    console.log(level);

    if (!_this.batteryLevel) {
      _this.batteryLevel = level;
    } else if (level < _this.batteryLevel && _this.batteryCharging == true) {
      _this.batteryLevel = level;
      Utilities.Dialog.read(_this.batteryDownDialog);
    } else if (level > _this.batteryLevel) {
      _this.win();
    }
  },
/*
  onBatteryStatus: function(status) {
    var _this = this;

    console.log(status);

    if (status.isPlugged == true) {
      $('#battery-status').attr('class', 'cls-16 charge');
    } else {
      $('#battery-status').attr('class', 'cls-16 red');
    }

    if (!_this.batteryLevel) {
      _this.batteryLevel = status.level;
    } else if (status.level < _this.batteryLevel && status.isPlugged == true) {
      _this.batteryLevel = status.level;
      Utilities.Dialog.read(_this.batteryDownDialog);
    } else if (status.level > _this.batteryLevel) {
      _this.win();
    }

  },
*/
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

    $('#battery-status').attr('class', 'cls-16 green');

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
