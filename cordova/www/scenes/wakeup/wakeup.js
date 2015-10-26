var Wakeup = {
  init: function() {
    var _this = this;

    var scene = new TimelineLite(),
      blackIn = new TimelineLite(),
      openEyes = new TimelineLite(),
      blackOut = new TimelineLite(),
      $blackout = $('#blackout'),
      $coach = $('.coach-angry'),
      $bed = $('.bedroom-bed'),
      $wall = $('.bedroom-wall'),
      $furniture = $('.bedroom-furniture'),
      dialog = [
        'Goodness!  I have been screaming my ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + ' off trying to get you out of bed!',
        'You ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + '!  Youre ' + Utilities.Word.getAdj(true) + ' ' + Utilities.Word.getNoun() + '!',
        'And your bedroom smells like ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + ' and ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + '!',
      ];

    $blackout.css({
      display: 'none',
    });

    //Scene timeline
    scene.play();

    //add Fade from black to scene timeline
    scene.add(blackIn);

    //add text-box wakeup dialog to scene <timeline></timeline>
    scene.add(function() {

      Utilities.Dialog.read(dialog, function() {

        $blackout.css({
          display: 'none',
        });
        Router.go('/scenes/bedside/');

      });

    });

/*
    scene.add(TweenLite.delayedCall(0, function() {

      Utilities.Dialog.read(dialog, function() {

        blackOut.set($blackout, {display: 'block',});
        blackOut.to($blackout, 3, {opacity: 1,}, {ease:Bounce.easeIn,});
        blackOut.call(function() {

          Router.go('/scenes/bedside/');

        });

      });

    }));
*/
  },
};

$(document).ready(function() {
  Wakeup.init();
});
