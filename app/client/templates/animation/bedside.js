Template.bedside.onRendered(function () {

  var scene = new TimelineLite(),
    $blackout = $('.blackout'),
    dialog = [
      "Thank goodness you're finally up.  We are really running late!",
      "Now what was your name again?",
    ];

//Fade from black

  scene.set($blackout, {display: 'block', opacity: 1});

  scene.to($blackout, 3, {opacity: 0}, {ease:Bounce.easeIn});

  scene.set($blackout, {display: 'none'});

  scene.call( readDialog, [dialog, 0, 0, function() {
    $('#signup-form').show();
  },]);

});