var Supertap = {
  tapCount: 0,
  lastTap: undefined,
  startTime: undefined,
  endTime: undefined,
  gameMiniseconds: 9000,
  thresholdMiniseconds: 400,
  timeout: undefined,
  checker: undefined,
  countdown: undefined,
  $tap: $('#tap-button'),
  $message: $('#tap-button-message'),
  $countdown: $('.tap-countdown-number'),
  introDialog: [
    "Alright " + Utilities.Word.getNoun() + ", get your finger warmed up...it's time to play SUPERTAP!",
    "Tap that button with MY FACE on it to start the countdown! And keep tapping FAST FAST until the countdown ends!",
  ],
  winDialog: [
    "Noice 1 " + Utilities.Word.getNoun() + "! Now let's GO for a WALK!!!!",
  ],
  tryAgainDialog: [
    "UFFFF what a shame. Try again eh, " + Utilities.Word.getNoun() + "!",
  ],
  loseDialog: [
    "U really suck at this simple boring task...well guess WHAT?",
    "NOW WE GOTTA WALK AGAIN!!",
  ],

  init: function() {
    var _this = this;

    $('#blackout').css('opacity', 0);

    Utilities.Dialog.read(_this.introDialog);

    _this.$tap.on({
      'click': function() {

        if (_this.tapCount === 0) {
          _this.startTimeout();
          _this.startChecker();
          _this.startCountdown();
          _this.$message.html('Tap me MORE');
        }

        _this.tap();

      },
    });
  },

  tap: function() {
    var _this = this;
    var date = new Date();

    _this.tapCount++;
    _this.lastTap = date.getTime();

  },

  startTimeout: function() {
    var _this = this;
    var date = new Date();

    _this.startTime = date.getTime();

    _this.timeout = window.setTimeout(function() {

      _this.win();

    }, _this.gameMiniseconds);

  },

  startChecker: function() { 
    var _this = this;

    _this.checker = window.setInterval(function() {

      var date = new Date();
      var now = date.getTime();

      if (_this.lastTap < (now - _this.thresholdMiniseconds)) {
        _this.fail();
      }

    }, 100);

  },

  startCountdown: function() {
    var _this = this;

    _this.countdownSeconds = _this.gameMiniseconds / 1000;
    _this.$countdown.html(_this.countdownSeconds );

    _this.countdown = window.setInterval(function() {
      _this.countdownSeconds--;
      _this.$countdown.html(_this.countdownSeconds);
    }, 1000);

  },

  win: function() {
    var _this = this;

    _this.$tap.fadeOut();

    window.clearInterval(_this.checker);
    window.clearInterval(_this.countdown);

    Utilities.Dialog.read(_this.winDialog, function() {

      Game.gameComplete(_this.tapCount);

    });

  },

  fail: function() {
    var _this = this;

    window.clearInterval(_this.checker);
    window.clearInterval(_this.countdown);
    window.clearTimeout(_this.timeout);

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.tapCount = 0;
        _this.$message.html('Start Tapping');

      });

    }, function() {

      Utilities.Dialog.read(_this.loseDialog, function() {

        Router.go('/');

      });

    });

  },

};

document.addEventListener('deviceready', function() {
  Supertap.init();
}, false);
