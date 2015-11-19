var Maths = {
  scene: new TimelineLite(),
  $blackout: $('#blackout'),
  $button: $('.calculator-button'),
  $readout: $('#calculator-readout'),
  $clear: $('#calculator-clear'),
  $equals: $('#calculator-equals'),
  buttonVal: null,
  targetNumber: null,
  $targetNumber: $('#target-number'),
  $targetHolder: $('#math-target'),
  input: null,
  introDialog: [
      "Lets not just exercise those leg muscles, lets get it on with the brain muscle too.",
      "Time to do some MATTHHHH!!...",
      "I'm going to show you a number and you have to write the most complicated equation you can to equal that number",
      "For example if I tell you 5 you can write 1+1+1+(2*1)",
      "Plus is +, minus is -, muliply is *, divide is /, and you can use (brackets) to wrap things",
  ],
  winDialog: [
      "Nice 1 you know how to do maths",
      "Maybe you think you are pretty hot with your complicated math skills.",
      "This should knock you down a peg or 2. I'm going to take away 1 point for every smartass character in your maths.",
      "Remember K.I.S.S.",
      "and maybe remember D.A.R.E. too..?",
  ],
  tryAgainDialog: [
    "What a shame. try again eh!",
  ],
  looseDialog: [
    "U really suck at this simple boring task",
  ],

  init: function() {
    var _this = this;

    $('#blackout').css('opacity', 0);

    _this.generateNumber();

    //Fade from black
    _this.scene.set(_this.$blackout, {opacity: 0,});

    Utilities.Dialog.read(_this.introDialog, function() {

      _this.$targetHolder.css('opacity', 1);

    });

    _this.$button.on({
      click: function(e) {
        e.preventDefault();

        _this.buttonVal = e.target.value;

        if (_this.buttonVal === 'clear') {
          _this.$readout.html('');
        } else if (_this.buttonVal === 'submit') {
          _this.input = _this.$readout.html().replace(/\xF7/g, '/').replace(/x/g, '*');

          if (!_this.input) {

            Utilities.Dialog.read([
              "You need to do something first doh",
            ]);

          } else {

            _this.checkResult();

          }

        } else {
          _this.$readout.html(_this.$readout.html() + _this.buttonVal);
        }
      },
    });

  },

  generateNumber: function() {
    var _this = this;

    _this.targetNumber = Math.floor((Math.random() * 100) + 1);
    _this.$targetNumber.html(_this.targetNumber);
  },

  checkResult: function() {
    var _this = this;
    var result;

    try {
      result = eval(_this.input);
    }
    catch(err) {
      console.log(err);
    }

    console.log(result);

    if (result === _this.targetNumber) {
      _this.win();
    } else {
      _this.fail();
    }

  },

  generatePoints: function() {
    var _this = this;

    return 0 - _this.input.length;
  },

  win: function() {
    var _this = this;
    var points = _this.generatePoints();

    Utilities.Dialog.read(_this.winDialog, function() {

      Game.gameComplete(points);

    });

  },

  fail: function() {
    var _this = this;

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.$readout.html('');

      });

    }, function() {

      Utilities.Dialog.read(_this.looseDialog, function() {

        Router.go('/');

      });

    });

  },
};

Maths.init();