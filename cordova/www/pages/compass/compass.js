Home = {
  dialog: [
      "Great, " + Game.getUsername() + "!! We're on our way...",
      "And it's time to go on our first walk...",
      "Follow your compass, and find the golden flag...",
      "Each time you reach a flag - I will give you a MINIGAME CHALLENGE!!!",
      "Complete 3 minigame challenges to move to the next world...AND gain a new rank!!",
      "To begin you are ... " + Game.getRank() + " in the " + Game.getWorldName() + ".",
      "If you get lost on your way, just tap me at the bottom right...",
      "OK! LETS GO!",
  ],
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
