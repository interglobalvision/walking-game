var ShakyVibrate = {
  goal: 1000,
  modifier: Game.modifyDifficulty(200),
  pointsForGoal: 0,
  shakeTimeout: null,
  $blackout: $('#blackout'),
  $progress: $('#shaky-progress'),
  introDialog: [
    "OK I'm feeling sleepy. I think I'm gonna doze off",
    "When I'm rested up give me a shake and I'll snap back to life and we can be off again Walking Forever",
  ],
  tryAgainDialog: [
    "ZZZZZZZZZZZZZ tryryrzzz agaiiiinnzzzz",
  ],
  loseDialog: [
    "ZZZZZZZZZZZZZ",
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    _this.myShakeEvent = new Shake({
        threshold: 15,
        timeout: 400 ,
    });

    _this.goal = _this.goal + _this.modifier;

    Utilities.Dialog.read(_this.introDialog, function() {
      _this.startGame();
    });

  },

  bind: function() {
    var _this = this;

    window.addEventListener('shake', _this.onShake.bind(_this), false);

  },

  unbind: function() {
    var _this = this;

    window.removeEventListener('shake');

  },

  onShake: function() {
    var _this = this;

    // Vibrate phone
    Utilities.Misc.vibrate();

    // Adds goal points
    _this.pointsForGoal = _this.pointsForGoal + Utilities.Number.getRandomInt(40, 105);

    // Display goal change
    _this.updateDisplay();

    // Check win
    if (_this.pointsForGoal > _this.goal) {
       _this.win();
       return;
    }

    _this.shaking();

  },

  shaking: function() {
    var _this = this;

    _this.isShaking = true;

    _this.resetTimeout();
    _this.clearInterval();
  },

  resetTimeout: function() {
    var _this = this;

    _this.clearTimeout();
    _this.setTimeout();

  },

  setTimeout: function() {
    var _this = this;

    _this.timeout = window.setTimeout(function() {
      _this.onStoppedShaking();
      _this.setInterval();
    }, 1200);
  },

  clearTimeout: function() {
    var _this = this;

    if (_this.timeout) {
      window.clearTimeout(_this.timeout);
    }
  },

  setInterval: function() {
    var _this = this;

    _this.interval = setInterval( function() {
      _this.onStoppedShaking();
    }, 1200);

  },

  clearInterval: function() {
    var _this = this;

    if (_this.interval) {
      window.clearInterval(_this.interval);
    }
  },

  updateDisplay: function() {
    var _this = this;
    var percent = (_this.pointsForGoal / _this.goal) * 100;

    _this.$progress.css({
      'width': percent + '%',
    });
  },

  onStoppedShaking: function() {
    var _this = this;

    // Deduct goal points
    _this.pointsForGoal = _this.pointsForGoal - Utilities.Number.getRandomInt(77, 111);
    // Display goal change
    _this.updateDisplay();
    // Check fail
    if (_this.pointsForGoal < -100) {
       _this.fail();
    }

  },

  startGame: function() {
    var _this = this;

    _this.pointsForGoal = 0;

    _this.myShakeEvent.start();

    _this.bind();

  },

  win: function() {
    var _this = this;

    // Clear not shaking timeout and interval
    _this.clearTimeout();
    _this.clearInterval();

    _this.unbind();

    _this.myShakeEvent.stop();

    var score = Game.getStepsPot();

    Utilities.Dialog.read([
      "Yes yes YESSSS!",
      "You won " + Utilities.Number.roundFloat(score) + " points!!!",
    ], function() {

      Game.gameComplete(score);

    });

  },

  fail: function() {
    var _this = this;

    // Clear not shaking timeout and interval
    _this.clearTimeout();
    _this.clearInterval();

    _this.unbind();

    _this.myShakeEvent.stop();

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
  ShakyVibrate.init();
}, false);
