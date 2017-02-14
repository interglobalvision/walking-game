var FavFood = {
  $blackout: $('#blackout'),

  introDialog: [
    "How well do you really know your coach " + Game.getUsername() + "?",
    "Now me you will tell, my prefered food is which?!?!",
  ],
  winDialog: [
    "You guessed my favorite, " + Utilities.Word.getNoun() + "! I'm glad " + Utilities.Word.getAdj(false, false) + " friends we are. And friends together we walk walk walk...",
  ],
  tryAgainDialog: [
    "Ooo I'm getting hungry... but this is not my favorite! Try again...",
  ],
  loseDialog: [
    "Humph! I guess I'll go without eating then, " + Game.getUsername(),
    "We'll just walk instead...!",
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

    $('#favfood-coach').toggleClass('coach-move');

    $('.option').on('click.options', function() {
      console.log(this);

      $('#favfood-options').toggleClass('show-options');

      $('#favfood-coach').toggleClass('coach-move');

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

    $('.option').remove();

    for (var i = 0; i < 3; i++) {
      var option = '<h2 class="option" data-number="' + i + '">' + Utilities.Word.getNoun(false, true) + '</h2>';

      $('#favfood-options').append(option);
    }

    $('#favfood-options').toggleClass('show-options');

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

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.startGame();

      });

    }, function() {

      Utilities.Dialog.read(_this.loseDialog, function() {

        _this.$blackout.animate({'opacity': 1,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    });


  },

};

document.addEventListener('deviceready', function() {
  FavFood.init();
}, false);
