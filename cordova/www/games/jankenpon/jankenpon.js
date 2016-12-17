var Jankenpon = {
  introDialog: [
    "\u30ef\u30a6!! IT'S TIME.....to play.....",
    "JAN--KEN--PON!!!!",
    "What?! Of course I know Japanese, " + Game.getUsername() + "-chan!",
    "Jan-ken-pon is Japanese rock-paper-scissors!! First to 3 wins! Lets gooooooo...!!",
  ],
  tieDialog: [
    "Ugh, same. ook ok",
  ],
  oneWinDialog: [
    "Woah u good at this...",
  ],
  oneFailDialog: [
    "Pshh my win suckaAaaa",
  ],
  finalWinDialog: [
    "NO NO NOooooo " + Game.getUsername() + "!! You win it all!",
    "Let's go for a walk",
  ],
  finalFailDialog: [
    "I win!! HAHAHAAHAHA.... Now time for walking practice " + Game.getUsername() + "!!!",
  ],
  $blackout: $('#blackout'),
  $element: $('.jankenpon-element'),
  $userChoice: $('#user-choice'),
  $masterChoice: $('#master-choice'),
  userChoice: null,
  masterChoice: null,
  $result: $('.jankenpon-result'),
  rock: $('img.jankenpon-rock').attr('src'),
  paper: $('img.jankenpon-paper').attr('src'),
  scissors: $('img.jankenpon-scissors').attr('src'),
  elements: [ 'rock', 'paper', 'scissors',],
  wins: 0,
  losses: 0,
  minWins: 3,
  userFeelTimeout: undefined,
  color: {
    tie: 'rgb(177, 225, 255)',
    win: 'rgb(184, 255, 190)',
    lose: 'rgb(255, 188, 170)',
  },

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

        _this.userFeelTimeout = setTimeout(function() {
          _this.playElement(userChoice);
        }, 250);

      },
    });

  },

  playElement: function(userChoice) {
    var _this = this;
    var masterChoice = _this.getMasterChoice();

    clearTimeout(_this.userFeelTimeout);

    _this.userChoice = userChoice;
    _this.masterChoice = masterChoice;

    Utilities.Misc.vibrate(500);

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

  showResult: function(color) {
    var _this = this;
    var userChoice = _this.userChoice;
    var masterChoice = _this.masterChoice;

    _this.$userChoice.children( '[data-choice=' + userChoice + ']' ).css('display', 'block');
    _this.$masterChoice.children( '[data-choice=' + masterChoice + ']' ).css('display', 'block');
    _this.$result.css({
      'display': 'block',
      'background-color': color,
    });

  },

  hideResult: function() {
    var _this = this;

    _this.$userChoice.children( 'img' ).css('display', 'none');
    _this.$masterChoice.children( 'img' ).css('display', 'none');
    _this.$result.css('display', 'none');

  },

  startGame: function() {
    var _this = this;

    _this.bind();
  },

  tie: function() {
    var _this = this;

    _this.showResult(_this.color.tie);

    Utilities.Dialog.read(_this.tieDialog, function() {
      _this.hideResult();
    });

  },

  win: function() {
    var _this = this;

    _this.wins += 1;

    _this.showResult(_this.color.win);

    if ( _this.wins === _this.minWins ) {
      Utilities.Dialog.read(_this.finalWinDialog, function() {

        _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
          var score = _this.wins + Game.getStepsPot() - _this.losses;
          Game.gameComplete(score);
        });

      });
    } else {
      Utilities.Dialog.read(_this.oneWinDialog, function() {
        _this.hideResult();
      });
    }

  },

  fail: function() {
    var _this = this;

    _this.losses += 1;

    _this.showResult(_this.color.lose);

    if( _this.losses === _this.minWins ) {

      Utilities.Dialog.read(_this.finalFailDialog, function() {

        _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    } else {

      Utilities.Dialog.read(_this.oneFailDialog, function() {
        _this.hideResult();
      });

    }

  },

};

document.addEventListener('deviceready', function() {
  Jankenpon.init();
}, false);
