Menu = {
  $blackout: $('#blackout'),
  $menuBubble: $('#map-menu-bubble'),
  $menuButton: $('#map-menu-button'),
  $menuPoints: $('#menu-points'),
  $menuRank: $('#menu-rank'),
  $menuWorld: $('#menu-world'),
  $buttonShare: $('[data-ref="menu-share"]'),
  $buttonSub: $('.toggle-sub'),
  $buttonEnd: $('[data-ref="menu-end"]'),

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

    _this.$buttonEnd.on('click', function(event) {
      event.preventDefault();
      Compass.stop();
    });

    _this.$buttonShare.on('click', function(event) {
      event.preventDefault();
      Game.shareWithOptions();
    });

    _this.buttonSub.on('click', function(event) {
      event.preventDefault();
      _this.openSubMenu('class');
    });

  },

  openSubMenu: function(class) {
    console.log(class);
  },

};
