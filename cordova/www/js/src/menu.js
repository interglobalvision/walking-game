Menu = {
  $blackout: $('#blackout'),
  $menuBubble: $('#map-menu-bubble'),
  $menuButton: $('#map-menu-button'),
  $menuPoints: $('#menu-points'),
  $menuRank: $('#menu-rank'),
  $menuWorld: $('#menu-world'),
  $buttonShare: $('[data-ref="menu-share"]'),
  $buttonSub: $('.toggle-sub'),
  $buttonBack: $('.menu-back'),

  howtoGreeting: '<p>dear ' + Game.getUsername() + ',</p>',

  // Dev controls
  $devMenu: $('[data-ref="dev-menu"]'),
  $devEnd: $('[data-ref="dev-end-map"]'),

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

    $('.howto-text').prepend( _this.howtoGreeting );

    _this.$menuButton.on('click', function() {
      _this.toggleMenu(); 
    }); 

    _this.$buttonShare.on('click', function(event) {
      event.preventDefault();
      Game.shareWithOptions();
    });

    _this.$buttonSub.on('click', function(event) {
      event.preventDefault();
      _this.openSubMenu( $(this).attr('data-ref') );
    });

    _this.$buttonBack.on('click', function(event) {
      event.preventDefault();
      _this.closeSubMenu();
    });

    // Dev control click events
    _this.$devMenu.on('click', function(event) {
      event.preventDefault();
      Router.go('../dev/index.html');
    });

    _this.$devEnd.on('click', function(event) {
      event.preventDefault();
      Compass.stop();
    });

  },

  openSubMenu: function(menu) {
    $('#menu-main').addClass('show-sub-menu');
    $('#' + menu).addClass('show-sub-menu');
  },

  closeSubMenu: function() {
    $('#menu-main').removeClass('show-sub-menu');
    $('.sub-menu').removeClass('show-sub-menu');
  },

};
