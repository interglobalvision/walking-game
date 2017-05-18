var Dev = {
  init: function() {
    var _this = this;

    $('#play-next').click( function(event) {
      event.preventDefault();

      Router.go('/pages/compass/');
    });

  },
};

document.addEventListener('deviceready', function() {
  Dev.init();
}, false);