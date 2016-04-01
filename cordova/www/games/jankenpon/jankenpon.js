var Jankenpon = {
  introDialog: [
    "Time...",
    "...to play...",
    "JAN-KEN-PON!",
  ],
  tryAgainDialog: [
    "What a shame. try again eh!",
  ],
  loseDialog: [
    "U really suck at this simple boring task",
  ],
  $blackout: $('#blackout'),
  $element: $('.element'), 
  $userChoice: $('#user-choice'),
  $masterChoice: $('#master-choice'),
  elements: [ 'rock', 'paper', 'scissors' ],
  wins: 0,
  minWins: 3,

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    Utilities.Dialog.read(_this.introDialog, function() {
      _this.startGame();
    });

  },

  bind: function() {
    var _this = this;

   _this.$element.on({
      click: function(event) {

        var userChoice = event.currentTarget.dataset.element; 

        _this.playElement(userChoice);
        
      },
    });

  },

  playElement: function(userChoice) {
    var _this = this;

    // Generate masters choice
    var masterChoice = _this.getMasterChoice();

    // Print in screen
    _this.$userChoice.html(userChoice);
    _this.$masterChoice.html(masterChoice);

    // Compare with users choice
    if( userChoice === masterChoice ) {

      _this.tie();

    } else if( userChoice === 'rock') {

      if( masterChoice == 'paper' ) { 
        _this.fail(); // Paper covers rock
      } else {
        _this.win(); // Rock breaks scissors
      }

    } else if ( userChoice === 'paper' ) {

      if( masterChoice == 'scissors' ) { 
        _this.fail(); // Scissors cut paper
      } else {
        _this.win(); // Paper covers rock
      }

    } else if ( userChoice === 'scissors' ) {

      if( masterChoice == 'rock' ) { 
        _this.fail(); // Rock breaks scissors
      } else {
        _this.win(); // Scissors cut paper
      }

    }
  },

  getMasterChoice: function() {
    var _this = this;

    return _this.elements[ Utilities.Number.getRandomInt(0,2) ];
  },

  startGame: function() {
    var _this = this;

    _this.bind();

  },

  tie: function() {
    var _this = this;

    console.log('tie');

    Utilities.Dialog.read([
      "Ugh, same. ook ok",
      "Again",
    ], function() {

    });

  },

  win: function() {
    var _this = this;

    console.log('win');

    _this.wins += 1;
    _this.loses == 0;

    if( _this.wins === _this.minWins ) {
      Utilities.Dialog.read([
        "Woah u good at this...",
        "Let's go for a walk",
      ], function() {

        Game.gameComplete(_this.points);

      });
    } else {
      Utilities.Dialog.read([
        "Yes yes YESSSS!",
        "You won! Let's play again",
      ], function() {

      });
    }

  },

  fail: function() {
    var _this = this;

    console.log('fail');

    _this.wins == 0;

    Utilities.Dialog.read([
      "Psh, sucka",
      "Lets play again",
    ], function() {

    });


    /*
    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.startGame();

      });

    }, function() {

      Utilities.Dialog.read(_this.loseDialog, function() {

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });
    });
    */

  },

};

document.addEventListener('deviceready', function() {
  Jankenpon.init();
}, false);
