var Supertap = {
  tapCount: 0,
  lastTap: undefined,
  endTime: undefined,
  $tap: $('#tap-button'),
  $countdown: $('#tap-countdown'),

  init: function() {
    var _this = this;

    _this.$tap.on({
      'click': function() {

        var date = new Date();
        var tapTime = date.getTime();
        var endTime = _this.endTime;

        // Check if it's the first tap
        if (_this.tapCount === 0)) {
          _this.endTime = date.getTime() + 30000;
          _this.$tap.html('Tap me MORE');
        }

        // Check if tapping is too slow
        if ((date - _this.lastTap) > 300) {
          // You lose
          _this.$tap.fadeOut();

          // TODO:
          //  - show couch dialogs
          //  - retry not return to map?
          Router.go('map');

        } else if (tapTime >= endTime) {
          // You win
          _this.$tap.fadeOut();

          Game.setNewPoints(_this.tapCount);
          Game.gameComplete();

        }

        var count = _this.tapCount + 1;

        _this.tapCount = count;
        _this.lastTap = date);

        var countdownTime = Math.round( (endTime - tapTime) / 1000 );

        console.log(countdownTime);

        if (!isNaN(countdownTime) ) {
          _this.$countdown.html( countdownTime );
        }

      },
    });
  },
}

Supertap.init();