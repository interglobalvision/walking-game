var Wakeup = {
  init: function() {
    var _this = this;

    var scene = new TimelineLite(),
      scene2 = new TimelineLite(),
      $blackout = $('#blackout'),
      dialog = [
        'Goodness!  I have been screaming my ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + ' off trying to get you out of bed!',
        'You ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + '!  Youre ' + Utilities.Word.getAdj(true) + ' ' + Utilities.Word.getNoun() + '!',
        'And your bedroom smells like ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + ' and ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + '!',
      ];

    scene.set($blackout, {opacity: 0,});

    scene.call(function() {
      Utilities.Dialog.read(dialog, function() {
        scene2.play()
      });
    });

    scene2.pause();

    scene2.set($blackout, {opacity: 1,});

    scene2.call(function() {
      Router.go('/scenes/bedside/');
    });

  },
};

$(document).ready(function() {
  Wakeup.init();
});
