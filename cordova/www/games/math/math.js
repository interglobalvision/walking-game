var Maths = {
  scene: new TimelineLite(),
  $blackout: $('#blackout'),
  $button: $('.calculator-button'),
  $readout: $('#calculator-readout'),
  $clear: $('#calculator-clear'),
  $equals: $('#calculator-equals'),
  targetNumber: null,
  $targetNumber: $('#target-number'),
  input: null,
  $mathForm: $('#math-form'),
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

  init: function() {
    var _this = this;

    _this.generateNumber();

    //Fade from black
    _this.scene.set(_this.$blackout, {opacity: 0,});

    Utilities.Dialog.read(_this.introDialog, function() {

      _this.$mathForm.fadeIn();

    });

    _this.$button.on({
      click: function(e) {
        e.preventDefault();

        _this.input = $(this).html();

        console.log(_this.input);

        _this.$readout.append(_this.input);
      },
    });

    _this.$mathForm.on({
      submit: function(e) {
        e.preventDefault();

        _this.input = e.target[0].value;

        if (!_this.input) {
          console.log('no imput');
        }

        _this.checkResult();
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

    try {
      var result = eval(_this.input);
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

      Game.setNewPoints(points);
      Game.gameComplete();

    });

  },

  fail: function() {

    console.log('fail handling');

  },
};

Maths.init();