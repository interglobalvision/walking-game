var Letsgo = {
  $blackout: $('#blackout'),
  dialog: [
      "Great " + Game.getUsername() + "!! We're on our way...",
      "And it's time to go on our first walk...",
      "Follow the compass that your Auntie gave you, and find the golden flag...",
      "Each time you reach a flag - I will give you a MINIGAME CHALLENGE!!!",
      "Complete 3 minigame challenges to move to the next world...AND gain a new rank!!",
      "To begin you are ... " + Game.getRank() + " in the " + Game.getWorldName() + ".",
      "If you get lost on your way, just tap me at the bottom right...",
      "OK! LETS GO!",
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 2000, 'linear', function() { //fade from black

      _this.partOne();
      
    });

  },

  partOne: function() {
    var _this = this;

    Utilities.Dialog.read(_this.dialog, function() {

      _this.partTwo();

    });

  },

  partTwo: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 1,}, 2000, 'linear', function() { //fade to black

      Router.go('/pages/compass/'); //go to map

    });

  },

};

document.addEventListener('deviceready', function() {
  Letsgo.init();
}, false);
