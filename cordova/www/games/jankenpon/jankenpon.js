var Jankenpon = {
  introDialog: [
    "\u30ef\u30a6!! IT'S TIME.....to play.....",
    "JAN--KEN--PON!!!!", 
    "What?! Of course I know Japanese, " + Game.getUsername() + "-san!",
    "Jan-ken-pon is Japanese rock-paper-scissors!! You know what to do... Lets gooooooo...!!",
  ],
  tieDialog: [
    "Ugh, same. ook ok",
    "Again",
  ],
  oneWinDialog: [
    "NO NO NOooooo!",
    "You won! Let's play again",
  ],
  finalWinDialog: [
    "Woah u good at this...",
    "Let's go for a walk",
  ],
  failDialog: [
    "Psh, suckaAaaa",
    "Lets play again hmmm?!",
  ],
  $blackout: $('#blackout'),
  $element: $('.element'), 
  $userChoice: $('#user-choice'),
  $masterChoice: $('#master-choice'),
  elements: [ 'rock', 'paper', 'scissors',],
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

      if( masterChoice === 'paper' ) {
        _this.fail(); // paper covers rock
      } else {
        _this.win(); // rock breaks scissors
      }

    } else if ( userChoice === 'paper' ) {

      if( masterChoice === 'scissors' ) {
        _this.fail(); // scissors cut paper
      } else {
        _this.win(); // paper covers rock
      }

    } else if ( userChoice === 'scissors' ) {

      if( masterChoice === 'rock' ) { 
        _this.fail(); // rock breaks scissors
      } else {
        _this.win(); // scissors cut paper
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

    Utilities.Dialog.read(_this.tieDialog, function() {

    });

  },

  win: function() {
    var _this = this;

    _this.wins += 1;
    _this.loses = 0;

    if( _this.wins === _this.minWins ) {
      Utilities.Dialog.read(_this.finalWinDialog, function() {

        Game.gameComplete(_this.points);

      });
    } else {
      Utilities.Dialog.read(_this.oneWinDialog, function() {

      });
    }

  },

  fail: function() {
    var _this = this;

    _this.wins = 0;

    Utilities.Dialog.read(_this.failDialog, function() {

      _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
        Router.go('/pages/compass/');
      });

    });

  },

};

document.addEventListener('deviceready', function() {
  Jankenpon.init();
}, false);
