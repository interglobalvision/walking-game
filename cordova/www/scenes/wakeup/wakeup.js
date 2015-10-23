var Wakeup = {
  init: function() {
    var _this = this; 

    var scene = new TimelineLite(),
    blackIn = new TimelineLite(),
    openEyes = new TimelineLite(),
    blackOut = new TimelineLite(),
    $blackout = $('.blackout'),
    $coach = $('.coach-angry'),
    $bed = $('.bedroom-bed'),
    $wall = $('.bedroom-wall'),
    $furniture = $('.bedroom-furniture'),
    dialog = [
      'Goodness!  I have been screaming my ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + ' off trying to get you out of bed!',
      'You ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + '!  Youre ' + Utilities.Word.getAdj(true) + ' ' + Utilities.Word.getNoun() + '!',
      'And your bedroom smells like ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + ' and ' + Utilities.Word.getAdj() + ' ' + Utilities.Word.getNoun() + '!',
    ];

    //Fade from black
    blackIn.set($blackout, {display: 'block', opacity: 1,});
    blackIn.to($blackout, 0, {opacity: 0,}, {ease:Bounce.easeIn,});
    blackIn.set($blackout, {display: 'none',});

    //Open Eyes

    //unblur the bed
    openEyes.add( TweenMax.to($bed, 0.7, {
      onUpdate: cssFilterTween,
      onUpdateParams: ['{self}','blur', 40, 0,],
    }));

    //unblur the furniture
    openEyes.add( TweenMax.to($furniture, 0.5, {
      onUpdate: cssFilterTween,
      onUpdateParams: ['{self}','blur', 40, 0,],
    }));

    //unblur the coach
    openEyes.add( TweenMax.to($coach, 0.2, {
      onUpdate: cssFilterTween,
      onUpdateParams: ['{self}','blur', 40, 0,],
    }));

    //Scene timeline
    scene.play();

    //add Fade from black to scene timeline
    scene.add( blackIn );

    //add Open Eyes to scene timeline
    scene.add( openEyes );

    //add text-box wakeup dialog to scene timeline

    scene.add(TweenLite.delayedCall(0, function() {

      Utilities.Dialog.read(dialog, function() {

        blackOut.set($blackout, {display: 'block',});
        blackOut.to($blackout, 3, {opacity: 1,}, {ease:Bounce.easeIn,});
        blackOut.call(function() {

          Router.go('/scenes/bedside/');

        });

      });

    }));
  },
};

$(document).ready(function() {
  Wakeup.init();
});
