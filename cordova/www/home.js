Home = {
  $playGame: null,
  $compass: null,
  $compassContainer: null, 
  init: function() {
    var _this = this;

    _this.$compassContainer = $("#stage");

    // check if fresh game
    if( !Game.getUsername() ) {
      Router.go('/scenes/wakeup/');
    } 

    _this.$compassContainer.fadeIn();

    Compass.init();

  },
}

document.addEventListener('deviceready', function() {
  Home.init();
}, false);
