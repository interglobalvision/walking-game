Home = {
  init: function() {
    var _this = this;

    // Turn on Immersive mode for Android
    if (navigator.userAgent.match(/(Android)/)) {
      AndroidFullScreen.immersiveMode(function() {
        console.log('Immersive Mode: On');
      }, function() {
        console.log('Immersive Mode: Failed');
      });
    }

    _this.checkGameStatus();

  },

  checkGameStatus: function() {
    var progress = Game.getProgressPercent();

    if (progress > 1) {
      WalkingError.throw('Game progress value above 100%. Returned at ' + progress, 'Seems your progress got corrupted somehow. Return to your bed!');
      Router.go('/scenes/wakeup/');
    } else if (!Game.getUsername()) {
      Router.go('/scenes/wakeup/');
    } else {
      Router.go('/pages/compass/');
    }
  },
}

document.addEventListener('deviceready', function() {
  Home.init();
}, false);