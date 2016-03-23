var Farewell = {
  $blackout: $('#blackout'),
  $coach: $('#coach-container'),
  $livingroom: $('.livingroom'),
  $compass: $('.livingroom-compass'),
  $compassObj: $('#livingroom-compass-obj'),
  dialog: [
    "It's time to hit the road...",
    "Along the way you must complete minigame challenges!",
    "That is the only way to become the best. Now say goodbye to your auntie...",
  ],
  dialog2: [
    "Oh my " + Utilities.Word.getAdj(false, false) + " " + Utilities.Word.getNoun(false, false) + " i'm soo " + Utilities.Word.getAdj(false, false) + " to see you go... but you must go with your coach and train...",
    "...train train train to be the BEST at walking in the world!",
    "But look ~ I have something special for you...",
  ],
  dialog3: [
    "This is your compass...",
    "It will tell you which way to walk to reach your next minigame challenge!",
  ],
  dialog4: [
    "Now go with your coach...and good luck!",
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 2000, 'linear', function() { //Fade from black

      _this.partOne();

    });
  },

  partOne: function() {
    var _this = this;

    Utilities.Dialog.read(_this.dialog, function() {

      $('#livingroom-container').css({transform: 'translateX(99%)',}); 

      _this.partTwo();

    });
  },

  partTwo: function() {
    var _this = this;

    Utilities.Dialog.read(_this.dialog2, function() {

      _this.$compass.animate({'opacity': 1,}); //show compass container

      _this.$compassObj.animate({ //show compass
        'width': '200px',  
        'height': '200px', 
        'margin-left': '-100px', 
        'margin-top': '-100px',
      }, function() {

        _this.partThree();

      });
    }); 
  },

  partThree: function() {
    var _this = this;

    Utilities.Dialog.read(_this.dialog3, function() {
      
      _this.$compass.animate({'opacity': 0,}); //hide compass container

      _this.$compassObj.animate({ //hide compass
        'width': '0px', 
        'height': '0px', 
        'margin-left': '0px', 
        'margin-top': '0px',
      }, function() {

        _this.partFour();

      });
    });
  },

  partFour: function() {
    var _this = this;

    Utilities.Dialog.read(_this.dialog4, function() {
                    
      _this.$blackout.animate({'opacity': 1,}, function() {

        Router.go('/pages/compass/');

      });
    });
  },
};

document.addEventListener('deviceready', function() {
  Farewell.init();
}, false);
