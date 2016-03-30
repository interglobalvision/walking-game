var Wakeup = {
  $blackout: $('#blackout'),
  dialog: [
    'Goodness!  I have been screaming my ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + ' off trying to get you out of bed!',
    'You ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + '!  Youre ' + Utilities.Word.getAdj(true) + ' ' + Utilities.Word.getNoun() + '!',
    'And your bedroom smells like ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + ' and ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + '!',
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 2000, 'linear', function() {

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

    _this.$blackout.animate({'opacity': 1,}, 2000, 'linear', function() {

      Router.go('/scenes/bedside/');

    });
  },
};

document.addEventListener('deviceready', function() {
  Wakeup.init();
}, false);
