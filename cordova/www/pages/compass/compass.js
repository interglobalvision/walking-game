Home = {
  init: function() {
    var _this = this;

    $('#end-compass').click( function(event) {
      event.preventDefault();
      Compass.stop();
    });

    $('#menu-share').click(function() {
      Game.shareWithOptions();
    });

    // Check if fresh game
    if (!Game.getUsername()) {
      Router.go('/scenes/wakeup/');
    } else {
      Compass.init();
      Menu.init();
    }

  },
}

document.addEventListener('deviceready', function() {
  Home.init();
}, false);
