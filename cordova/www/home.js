Home = {
  $playGame: null,
  $compass: null,
  $compassContainer: null, 
  init: function() {
    var _this = this;

    _this.$playGame = $("#play-game");
    _this.$compassContainer = $("#stage");
    _this.$compass = $("#compass");

    // Bind buttons
    _this.$playGame.click( function() {

      // Hide button
      $(this).fadeOut();

      // Show compass
      _this.$compassContainer.fadeIn();

      Compass.init();
    });

    $('#play-next').click(function() {
      Game.nextMinigame();
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
