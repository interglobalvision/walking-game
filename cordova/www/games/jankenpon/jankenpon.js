var Jankenpon = {
  introDialog: [
    "\u30ef\u30a6!! IT'S TIME.....to play.....",
    "JAN--KEN--PON!!!!", 
    "What?! Of course I know Japanese, " + Game.getUsername() + "-san!",
    "Jan-ken-pon is Japanese rock-paper-scissors!! First to 3 wins! Lets gooooooo...!!",
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
  oneFailDialog: [
    "Pshh my win suckaAaaa",
    "Lets play again hmmm?!",
  ],
  finalFailDialog: [
    "I win!! HAHAHAAHAHA.... Now time for walking practice!!!",
  ],
  $blackout: $('#blackout'),
  $element: $('.jankenpon-element'), 
  $userChoice: $('#user-choice'),
  $masterChoice: $('#master-choice'),
  $result: $('.jankenpon-result'),
  rock: $('img.jankenpon-rock').attr('src'),
  paper: $('img.jankenpon-paper').attr('src'),
  scissors: $('img.jankenpon-scissors').attr('src'),
  elements: [ 'rock', 'paper', 'scissors',],
  wins: 0,
  losses: 0,
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
    _this.$userChoice.children( '[data-choice=' + userChoice + ']' ).css('display', 'block');
    _this.$masterChoice.children( '[data-choice=' + masterChoice + ']' ).css('display', 'block');
    _this.$result.animate({'opacity': 1,}, 500, 'linear');

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

  hideResult: function() {
    var _this = this;

    _this.$result.animate({'opacity': 0,}, 500, 'linear', function() {
      _this.$userChoice.children( 'img' ).css('display', 'none');
      _this.$masterChoice.children( 'img' ).css('display', 'none');
    });
    
  },

  startGame: function() {
    var _this = this;

    _this.bind();
  },

  logScore: function() {
    var _this = this;

    console.log('coach: ' + _this.losses + ', player:' + _this.wins);
  },

  tie: function() {
    var _this = this;

    Utilities.Dialog.read(_this.tieDialog, function() {
      _this.hideResult();
    });

    _this.logScore();

  },

  win: function() {
    var _this = this;

    _this.wins += 1;

    if( _this.wins === _this.minWins ) {
      Utilities.Dialog.read(_this.finalWinDialog, function() {

        Game.gameComplete(_this.points);

      });
    } else {
      Utilities.Dialog.read(_this.oneWinDialog, function() {
        _this.hideResult();
      });
    }

    _this.logScore();

  },

  fail: function() {
    var _this = this;

    _this.losses += 1;

    if( _this.losses === _this.minWins ) {

      Utilities.Dialog.read(_this.finalFailDialog, function() {

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    } else {

      Utilities.Dialog.read(_this.oneFailDialog, function() {
        _this.hideResult();
      });

    }

    _this.logScore();

  },

};

document.addEventListener('deviceready', function() {
  Jankenpon.init();
}, false);
