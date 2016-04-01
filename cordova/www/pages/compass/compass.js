Home = {
  init: function() {
    var _this = this;

    $('#menu-share').click(function() {
      Game.shareWithOptions();
    });

  },
}

document.addEventListener('deviceready', function() {
  Home.init();
}, false);
