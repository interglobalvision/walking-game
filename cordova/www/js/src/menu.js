Menu = {
  $blackout: $('#blackout'),
  $menu: $('.menu'),
  $menuButton: $('#map-menu-button'),
  $menuPoints: $('#menu-points'),
  $menuDistance: $('#menu-distance'),
  $menuRank: $('#menu-rank'),
  $menuWorld: $('#menu-world'),
  $buttonShare: $('[data-ref="menu-share"]'),
  $buttonOpenSub: $('.open-sub-menu'),
  $buttonCloseSub: $('.close-sub-menu'),

  howtoGreeting: '<p>dear ' + Game.getUsername() + ',</p>',

  resetDestinyDialog: [
    'What? You lost? Pshh...',
    'Ok, I\'ll set a new walking goal for you, ' + Game.getUsername() + '...',
    '...and imma take some points off your score!'
  ],

  $resetDestiny: $('[data-ref="menu-reset-destiny"]'),

  // Dev controls
  $devMenu: $('[data-ref="dev-menu"]'),
  $devEnd: $('[data-ref="dev-end-map"]'),

  toggleMenu: function() {
    var _this = this;

    _this.closeSubMenu();

    _this.$menu.toggle("fast");
  },

  init: function() {
    var _this = this;

    _this.$menuPoints.html( Game.getPoints() );
    _this.$menuDistance.html( Game.getTotalDistanceString() );
    _this.$menuWorld.html( Game.getWorldName() );
    _this.$menuRank.html( Game.getRank() );

    $('.howto-text').prepend( _this.howtoGreeting );

    // Toggle menu
    _this.$menuButton.on('click', function() {
      _this.toggleMenu();
    });

    // Share
    _this.$buttonShare.on('click', function(event) {
      event.preventDefault();
      Game.shareWithOptions();
    });

    // Open sub menu
    _this.$buttonOpenSub.on('click', function(event) {
      event.preventDefault();
      _this.openSubMenu( $(this).attr('data-ref') );
    });

    // Close sub menu
    _this.$buttonCloseSub.on('click', function(event) {
      event.preventDefault();
      _this.closeSubMenu();
    });

    // Reset destiny
    _this.$resetDestiny.on('click', function(event) {
      event.preventDefault();
      _this.toggleMenu();
      Utilities.Dialog.read(_this.resetDestinyDialog, function() {
        Compass.resetDestiny(function() {
          _this.$menuPoints.html(Game.getPoints());
        });
      });
    });

    // Dev control click events
    _this.$devMenu.on('click', function(event) {
      event.preventDefault();
      Router.go('/pages/dev/');
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
