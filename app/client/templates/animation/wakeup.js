Template.wakeup.onRendered(function () {

  var _this = this,
    scene = new TimelineLite(),
    blackIn = new TimelineLite(),
    //openEyes = new TimelineLite(),
    blackOut = new TimelineLite(),
    $blackout = $('.blackout'),
    $coach = _this.$('.coach-angry'),
    $bed = _this.$('.bedroom-bed'),
    $wall = _this.$('.bedroom-wall'),
    $furniture = _this.$('.bedroom-furniture'),
    dialog = [
      'Goodness!  I have been screaming my ' + word(adj) + ' ' + word(noun) + ' off trying to get you out of bed!',
      'You ' + word(adj) + ' ' + word(noun) + '!  Youre ' + word(adj, true) + ' ' + word(noun) + '!',
      'And your bedroom smells like ' + word(adj) + ' ' + word(noun) + ' and ' + word(adj) + ' ' + word(noun) + '!',
    ];

//Fade from black

  blackIn.set($blackout, {display: 'block', opacity: 1,});

  blackIn.to($blackout, 3, {opacity: 0,}, {ease:Bounce.easeIn,});

  blackIn.set($blackout, {display: 'none',}); 

/*
//Open Eyes

  //unblur the bed
  openEyes.add( TweenMax.to($bed, 1.7,
    {
      onUpdate: cssFilterTween,
      onUpdateParams: ['{self}','blur', 40, 0,],
    }
  ));

  //unblur the furniture
  openEyes.add( TweenMax.to($furniture, 1.5,
    {
      onUpdate: cssFilterTween,
      onUpdateParams: ['{self}','blur', 40, 0,],
    }
  ));

  //unblur the coach
  openEyes.add( TweenMax.to($coach, 1.2,
    {
      onUpdate: cssFilterTween,
      onUpdateParams: ['{self}','blur', 40, 0,],
    }
  ));
*/

//Scene timeline
  scene.play();

  //add Fade from black to scene timeline
  scene.add( blackIn );

  //add Open Eyes to scene timeline
  //scene.add( openEyes );

  //add text-box wakeup dialog to scene timeline

  scene.add(TweenLite.delayedCall(0, function() {

    Dialog.read(dialog, function() {

      blackOut.set($blackout, {display: 'block',});
      blackOut.to($blackout, 2, {opacity: 1,}, {ease:Bounce.easeIn,});
      blackOut.call(function() {

        Router.go('/bedside');

      });

    });

  }));

});