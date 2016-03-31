var Reset = {
  $blackout: $('#blackout'),
  $yes: $('.reset-yes'),
  $no: $('.reset-no'),
  dialog: [
    'Welcome welcome to RESET GAME...',
    'In RESET GAME there is only ONE GAME.... RESET!!',
    'Now...... do you want to RESET your ' + Utilities.Word.getAdj(false, false) + ' game, ' + Game.getUsername() + '?',
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {

      _this.partOne();

    });

  },

  partOne: function() {
    var _this = this;

    Utilities.Dialog.read(_this.dialog, function() {

      _this.$yes.on({
        'click': function() {

          _this.yesReset();

        },
      });

      _this.$no.on({
        'click': function() {

          _this.noReset();

        },
      });

    });

  },

  yesReset: function() {
    var _this = this;
    var date = new Date();
    var hours = date.getHours();

    Utilities.Dialog.read(["Congratulations! You just got " + hours + " gems!!! And lost all your points. Ok back to walking now...",], function() {

      Game.setNewGems(parseInt(hours));
      Game.resetPoints();
      _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {

        Game.gameComplete();

      });

    });

  },

  noReset: function() {
    var _this = this;

    Utilities.Dialog.read(["WOOWWW you're soooo boring....", "OK, then back to walking practice for you!!",], function() {

      _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {

        Game.gameComplete();

      });

    });

  },

};

document.addEventListener('deviceready', function() {
  Reset.init();
}, false);
