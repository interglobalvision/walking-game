var FavFood = {
  $blackout: $('#blackout'),

  introDialog: [
    "How well do you really know your coach " + Game.getUsername() + "?",
    "Now me you will tell, my prefered food is which?!?!",
  ],
  winDialog: [
    "I'm glad friends we are. And friends together we walk walk walk...",
  ],
  tryAgainDialog: [
    "I can give you another go, but this is not right",
  ],
  loseDialog: [
    "Hmmmm I'm quite upset " + Game.getUsername(),
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    Utilities.Dialog.read(_this.introDialog, function() {
      _this.startGame();
    });

  },

  bind: function() {
    var _this = this;

    $('.option').on('click.options', function() {
      console.log(this);

      var answer = $(this).data('number');

      if (answer === _this.answer) {
        _this.win();
      } else {
        _this.fail();
      }
    });

  },

  unbind: function() {
    var _this = this;

    $('.option').on('click.options');
  },

  generateAnswers: function() {
    var _this = this;

    for (var i = 0; i < 3; i++) {
      var option = '<h2 class="option" data-number="' + i + '">' + Utilities.Word.getNoun(false, true) + '</h2>';

      $('#stage').append(option);
    }

    _this.answer = Utilities.Number.getRandomInt(0, 2);

  },

  startGame: function() {
    var _this = this;

    _this.generateAnswers();
    _this.bind();
  },

  win: function() {
    var _this = this;
    var score = Game.getStepsPot();

    Utilities.Dialog.read(_this.winDialog, function() {

      Game.gameComplete(score);

    });

  },

  fail: function() {
    var _this = this;

    $('.option').remove();

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


  },

};

document.addEventListener('deviceready', function() {
  FavFood.init();
}, false);
