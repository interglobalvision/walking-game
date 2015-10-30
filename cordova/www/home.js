Home = {
  $playGame: null,
  $compass: null,
  init: function() {
    var _this = this;

    _this.$playGame = $("#play-game");
    _this.$compass = $("#compass");

    // Bind buttons
    _this.$playGame.click( function() {

      // Hide button
      $(this).fadeOut();

      // Show compass
      _this.$compass.fadeIn();

      Compass.init();
    });
  },
}

$(document).ready( function() {
  Home.init();
});
