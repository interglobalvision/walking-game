Template.farewell.onRendered(function () {
  var _this = this,
    scene = new TimelineLite(),
    $blackout = $('.blackout'),
    dialog = [
      "It's time to go...",
      "But first your auntie has something for you...",
    ];

//Fade from black

  scene.set($blackout, {display: 'block', opacity: 1,});

  scene.to($blackout, 3, {opacity: 0,}, {ease:Bounce.easeIn,});

  scene.set($blackout, {display: 'none',});

  scene.call( readDialog, [dialog, 0, 0, function() {
    console.log('/');
  },]);
 
});

Template.bedside.events({
  //
});
