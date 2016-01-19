Template.farewell.onRendered(function () {
  var _this = this,
    coach = new TimelineLite(),
    aunt = new TimelineLite(),
    compass = new TimelineLite(),
    goodbye = new TimelineLite(),
    blackout = new TimelineLite(),
    $blackout = $('.blackout'),
    $coach = _this.$('.coach-container'),
    $livingroom = _this.$('.livingroom'),
    $compass = _this.$('.livingroom-compass'),
    $compassObj = _this.$('.livingroom-compass-obj'),
    moveCoachRight = new TweenMax.to($coach, 2, {left: '100%',}),
    moveRoomRight = new TweenMax.to($livingroom, 2, {left: '0%',}),
    dialog = [
      "It's time to hit the road...",
      "Along the way you must complete minigame challenges!",
      "That is the only way to become the best. Now say goodbye to your auntie...",
    ],
    dialog2 = [
      "Oh my " + word(adj) + " " + word(noun) + " i'm soo " + word(adj) + " to see you go... but you must go with your coach and train...",
      "...train train train to be the BEST at walking in the world!",
      "But look ~ I have something special for you...",
    ],
    dialog3 = [
      "This is your compass...",
      "It will tell you which way to walk to reach your next minigame challenge!",
    ],
    dialog4 = [
      "Now go with your coach...and good luck!",
    ];

//Fade from black

  coach.set($blackout, {display: 'block', opacity: 1,});

  coach.to($blackout, 3, {opacity: 0,}, {ease:Bounce.easeIn,});

  coach.set($blackout, {display: 'none',});

  coach.call(function() {
    Dialog.read(dialog, function() {
      aunt.play();
    });
  });

  aunt.pause();

//Move scene right

  aunt.add([moveRoomRight, moveCoachRight,]);

  aunt.call(function() {
    Dialog.read(dialog2, function() {
      compass.play();
    });
  });

  compass.pause();

  compass.set($compass, {display: 'block', opacity: 0,});

  compass.to($compass, 2, {opacity: 1,}, {ease:Bounce.easeIn,});

  compass.to($compassObj, 1, {width: '200px', height: '200px',}, {ease:Bounce.easeIn,});

  compass.call(function() {
    Dialog.read(dialog3, function() {
      goodbye.play();
    });
  });

  goodbye.pause();

  goodbye.to($compass, 2, {opacity: 0,}, {ease:Bounce.easeIn,});

  goodbye.to($compassObj, 1, {width: '0px', height: '0px',}, {ease:Bounce.easeIn,});

  goodbye.call(function() {
    Dialog.read(dialog4, function() {
      blackout.play();
    });
  });

  blackout.pause();

  blackout.set($blackout, {display: 'block', opacity: 0,});

  blackout.to($blackout, 3, {opacity: 1,}, {ease:Bounce.easeIn,});

  blackout.call(function() {
    $blackout.hide();
    Router.go('/');
  });

});

Template.bedside.events({
  //
});
