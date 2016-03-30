var Letsgo = {
  $blackout: $('#blackout'),
  dialog: [
      "Lets go!",
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 2000, 'linear', function() { //fade from black

      _this.partOne();
      
    });

  },

  partOne: function() {
    var _this = this;

  },

  partTwo: function() {
    var _this = this;

  },

};

document.addEventListener('deviceready', function() {
  Letsgo.init();
}, false);
