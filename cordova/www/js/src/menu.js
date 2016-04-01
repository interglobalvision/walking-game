Menu = {
  $blackout: $('#blackout'),
  $menuBubble: $('#map-menu-bubble'),
  $menuButton: $('#map-menu-button'),
  $menuPoints: $('#menu-points'),
  $menuRank: $('#menu-rank'),
  $menuWorld: $('#menu-world'),

  toggleMenu: function() {
  //functionality to open and close menu
  var _this = this;

  _this.$menuBubble.toggle("fast");
  },

  init: function() {
    var _this = this;

    _this.$menuPoints.html( Game.getPoints() );
    _this.$menuWorld.html( Game.getWorldName() );
    _this.$menuRank.html( Game.getRank() );

    _this.$menuButton.on('click', function() {
      _this.toggleMenu();
    }); 

    $('#play-reset-game').on('click', function(event) {

      _this.$blackout.animate({'opacity': 1,}, 2000, 'linear', function() {
        Router.go('/games/reset');
      })
      
    });

    $('#end-compass').on('click', function(event) {
      event.preventDefault();
      Compass.stop();
    });
  }

};
