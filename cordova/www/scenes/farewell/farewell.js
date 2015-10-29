var Farewell = {
  init: function() {  
    var _this = this;

    var coach = new TimelineLite(),
      aunt = new TimelineLite(),
      compass = new TimelineLite(),
      goodbye = new TimelineLite(),
      blackout = new TimelineLite(),
      $blackout = $('#blackout'),
      $coach = $('#coach-container'),
      $livingroom = $('.livingroom'),
      $compass = $('.livingroom-compass'),
      $compassObj = $('#livingroom-compass-obj'),
      dialog = [
        "It's time to hit the road...",
        "Along the way you must complete minigame challenges!",
        "That is the only way to become the best. Now say goodbye to your auntie...",
      ],
      dialog2 = [
        "Oh my " + Utilities.Word.getAdj() + " " + Utilities.Word.getNoun() + " i'm soo " + Utilities.Word.getAdj() + " to see you go... but you must go with your coach and train...",
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

    coach.set($blackout, {opacity: 0,});

    coach.call(function() {
      Utilities.Dialog.read(dialog, function() {
        aunt.play();
      });
    });

    aunt.pause();

  //Move scene right

    aunt.set($coach, {left: '100%',});

    aunt.set($livingroom, {left: '0%',});

    aunt.call(function() {
      Utilities.Dialog.read(dialog2, function() {
        compass.play();
      });
    });

    compass.pause();

    compass.set($compass, {opacity: 1,});

    compass.set($compassObj, {width: '200px', height: '200px', 'margin-left': '-100px', 'margin-top': '-100px',});

    compass.call(function() {
      Utilities.Dialog.read(dialog3, function() {
        goodbye.play();
      });
    });

    goodbye.pause();

    goodbye.set($compass, {opacity: 0,});

    goodbye.set($compassObj, {width: '0px', height: '0px', 'margin-left': '0px', 'margin-top': '0px',});

    goodbye.call(function() {
      Utilities.Dialog.read(dialog4, function() {
        blackout.play();
      });
    });

    blackout.pause();

    blackout.set($blackout, {opacity: 1,});

    blackout.call(function() {
      Router.go('/');
    });

  },
};

$(document).ready(function() {
  Farewell.init();
});

