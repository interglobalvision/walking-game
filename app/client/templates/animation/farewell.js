Template.farewell.onRendered(function () {
  var _this = this,
    coach = new TimelineLite(),
    aunt = new TimelineLite(),
    compass = new TimelineLite(),
    $blackout = $('.blackout'),
    $coach = _this.$('.coach-container'),
    $livingroom = _this.$('.livingroom'),
    $compass = _this.$('.livingroom-compass'),
    $compassObj = _this.$('.livingroom-compass-obj'),
    moveCoachRight = new TweenMax.to($coach, 2, {left: '100%',}),
    moveRoomRight = new TweenMax.to($livingroom, 2, {left: '0%',}),
    dialog = [
      "It's time to go...",
      "But first your auntie has something for you...",
    ],
    dialog2 = [
      "Oh deary i'm soo " + word(adj) + " to see you go... but you must go with your coach and train...",
      "...train train train to be the BEST at walking in the world!",
      "But look ~ I have something special for you...",
    ],
    dialog3 = [
      "This is your compass...",
    ];

//Fade from black

  coach.set($blackout, {display: 'block', opacity: 1,});

  coach.to($blackout, 3, {opacity: 0,}, {ease:Bounce.easeIn,});

  coach.set($blackout, {display: 'none',});

  coach.call( readDialog, [dialog, 0, 0, function() {
    aunt.play();
  },]);

  aunt.pause();

//Move scene right

  aunt.add([moveRoomRight, moveCoachRight,]);

  aunt.call( readDialog, [dialog2, 0, 0, function() {
    compass.play();
  },]);

  compass.pause();

  compass.set($compass, {display: 'block', opacity: 0,});

  compass.to($compass, 2, {opacity: 1,}, {ease:Bounce.easeIn,});

  compass.to($compassObj, 1, {width: '200px', height: '200px',}, {ease:Bounce.easeIn,});

  compass.call( readDialog, [dialog3, 0, 0, function() {
    console.log('end');
  },]);
 
});

Template.bedside.events({
  //
});
