var Supertap = {
  tapCount: 0,
  lastTap: undefined,
  startTime: undefined,
  endTime: undefined,
  modifiedTime: Game.modifyDifficulty(5000), // add 5 seconds
  gameMiniseconds: 9000,
  thresholdMiniseconds: 400,
  timeout: undefined,
  checker: undefined,
  countdown: undefined,
  $blackout: $('#blackout'),
  $tap: $('#tap-button'),
  $message: $('#tap-button-message'),
  $countdown: $('.tap-countdown-number'),
  introDialog: [
    "Alright " + Utilities.Word.getNoun() + ", get your finger warmed up...it's time to play SUPERTAP!",
    "Tap that button with MY FACE on it to start the countdown, " + Game.getUsername() + "! And keep tapping FAST FAST until the countdown ends!",
  ],
  winDialog: [
    "OK GREAT! NOW STOP!",
    "Noice 1 " + Utilities.Word.getNoun() + "! Now let's GO for a WALK!!!!",
  ],
  tryAgainDialog: [
    "STOP STOP STOP!!",
    "UFFFF what a shame. Try again eh, " + Utilities.Word.getNoun() + "!",
  ],
  loseDialog: [
    "OK NOW STOP!",
    "U really suck at this simple boring task, " + Game.getUsername() + "...well guess WHAT?",
    "NOW WE GOTTA WALK AGAIN!!",
  ],

  init: function() {
    var _this = this;

    _this.gameMiniseconds = _this.gameMiniseconds + _this.modifiedTime;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');
    $('.tap-background-1').addClass('tap-background-1-anim');
    $('.tap-background-2').addClass('tap-background-2-anim');

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

    Utilities.Misc.vibrate();

    window.clearInterval(_this.checker);
    window.clearInterval(_this.countdown);

    Utilities.Dialog.read(_this.winDialog, function() {

      Game.gameComplete(_this.tapCount);

    });

  },

  fail: function() {
    var _this = this;

    Utilities.Misc.vibrate();

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

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    });

  },

};

document.addEventListener('deviceready', function() {
  Supertap.init();
}, false);
