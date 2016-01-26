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
  },
}

$(document).ready( function() {
  Home.init();
});
