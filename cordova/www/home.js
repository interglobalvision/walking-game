Home = {
  $playGame: null,
  $compass: null,
  $compassContainer: null, 
  init: function() {
    var _this = this;

    _this.$compassContainer = $("#stage");
    _this.$compassEnd = $("#end-compass");

    // check if fresh game
    if( !Game.getUsername() ) {
      Router.go('/scenes/wakeup/');
    } 

    _this.$compassEnd.click( function(event) {
      event.preventDefault();

      Compass.stop();
    });

    _this.$compassContainer.fadeIn();

    Compass.init();

  },
}

document.addEventListener('deviceready', function() {
  Home.init();
}, false);
