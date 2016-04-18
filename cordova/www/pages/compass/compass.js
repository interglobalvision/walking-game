Home = {
  init: function() {
    var _this = this;

    $('#menu-share').click(function() {
      Game.shareWithOptions();
    });

    Compass.init();
    Menu.init();

  },
};

document.addEventListener('deviceready', function() {
  Home.init(); 
}, false);