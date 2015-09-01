Template.wakeUp.onRendered(function () {

  var scene = new TimelineLite(),
    openEyes = new TimelineLite(),
    $coach = $('.coach-angry'),
    $bed = $('.bedroom-bed'),
    $wall = $('.bedroom-wall'),
    $furniture = $('.bedroom-furniture'),
    dialog = [
      'Goodness!  I have been screaming my '+word(adj)+' '+word(noun)+' off trying to get you out of bed!',
      'You '+word(adj)+' '+word(noun)+'!  Youre '+word(adj, true)+' '+word(noun)+'!',
      'And your bedroom smells like '+word(adj)+' '+word(noun)+' and '+word(adj)+' '+word(noun)+'!'
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
