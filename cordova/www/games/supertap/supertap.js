var Supertap = {
  tapCount: 0,
  lastTap: undefined,
  startTime: undefined,
  endTime: undefined,
  gameMiniseconds: 10000,
  thresholdMiniseconds: 400,
  timeout: undefined,
  checker: undefined,
  countdown: undefined,
  $tap: $('#tap-button'),
  $countdown: $('#tap-countdown'),

  init: function() {
    var _this = this;

    _this.$tap.on({
      'click': function() {

        if (_this.tapCount === 0) {
          _this.startTimeout();
          _this.startChecker();
          _this.startCountdown();
          _this.$tap.html('Tap me MORE');
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
        _this.loose();
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

    alert('nice 1!');

    Game.setNewPoints(_this.tapCount);
    Game.gameComplete();

  },

  loose: function() {
    var _this = this;

    window.clearInterval(_this.checker);
    window.clearInterval(_this.countdown);
    window.clearTimeout(_this.timeout);

    alert('u better tap faster eh!');
    Router.go('/');

  },

};

$(document).ready(function() {
  Supertap.init();
});
