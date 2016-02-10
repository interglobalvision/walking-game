Home = {
  $playGame: null,
  $playButton: null,
  init: function() {
    var _this = this;

    _this.$playButton = $("#play-next");

    _this.$playButton.click( function(event) {
      event.preventDefault();

      Router.go('/pages/compass/');
    });

    // Turn on Immersive mode for Android
    if (navigator.userAgent.match(/(Android)/)) {
      AndroidFullScreen.immersiveMode(function() {
        console.log('Immersive Mode: On');
      }, function() {
        console.log('Immersive Mode: Failed');
      });
    }

  },
}

document.addEventListener('deviceready', function() {
  Home.init();
}, false);
