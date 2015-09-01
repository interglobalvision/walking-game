Template.wakeUp.onRendered(function () {

  var scene = new TimelineLite(),
    openEyes = new TimelineLite(),
    $coach = $('.coach-angry'),
    $bed = $('.bedroom-bed'),
    $wall = $('.bedroom-wall'),
    $furniture = $('.bedroom-furniture'),
    dialog = [
      "Hey Wake Up!",
      "Lets Go!",
      "What are you Waiting For???",
    ];

//Open Eyes

  //unblur the bed
  openEyes.add( TweenMax.to($bed, 2, 
    {
      onUpdate: cssFilterTween, 
      onUpdateParams: ['{self}','blur', 40, 0]
    }
  ));

  //unblur the furniture
  openEyes.add( TweenMax.to($furniture, 2,
    {
      onUpdate: cssFilterTween, 
      onUpdateParams: ['{self}','blur', 40, 0]
    }
  ));

  //unblur the coach
  openEyes.add( TweenMax.to($coach, 2, 
    {
      onUpdate: cssFilterTween, 
      onUpdateParams: ['{self}','blur', 40, 0]
    }
  ));

//Scene timeline

  //add Open Eyes to scene timeline
  scene.add( openEyes );

  //add text-box wakeup dialog to scene timeline
  scene.add( TweenLite.delayedCall(0, showText, [dialog, 0, 0, 100]) );

});
