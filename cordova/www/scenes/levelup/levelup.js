var Levelup = {
  $blackout: $('#blackout'),
  dialog: [
      "WOW " + Game.getUsername() + "!! I really can't believe you made it this far!",
      "No really...",
      "I'm simply " + Utilities.Word.getAdj(false, false) + "! And to show it I will award you with a new Rank!",
      "You are now.......",
      Game.getRank() + "!!!!!!!!",
      "How nice.",
      "You have walked a grand total of " + Game.getTotalDistanceString() + "!! And you have " + Game.getPoints() + " points!!!",
      "Now let's see how you do walking in the next world: the " + Game.getWorldName() + ".......",
  ],

  init: function() {
    var _this = this;

    var filterDeg = Utilities.Number.getRandomInt(0, 360);

    $('.levelup-stage').css({
      '-webkit-filter': 'hue-rotate(' + filterDeg + 'deg)',
      'filter': 'hue-rotate(' + filterDeg + 'deg)',
    });
    $('.levelup-background-2').addClass('levelup-background-2-anim');
    $('.levelup-background-3').addClass('levelup-background-3-anim');

    Utilities.Misc.vibrate();

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
  Levelup.init();
}, false);
