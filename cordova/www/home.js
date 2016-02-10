Home = {
  $playGame: null,
  $playButton: null, 
  init: function() {
    var _this = this;

    _this.$playButton = $("#play-next");

    _this.$playButton.click( function(event) {
      event.preventDefault();

      Router.go('/pages/compass/');
    });

  },
}

document.addEventListener('deviceready', function() {
  Home.init();
}, false);
