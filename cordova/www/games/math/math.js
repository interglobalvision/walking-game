var Maths = {
  $blackout: $('#blackout'),
  $button: $('.calculator-button'),
  $readout: $('#calculator-readout'),
  $clear: $('#calculator-clear'),
  $equals: $('#calculator-equals'),
  buttonVal: null,
  targetNumber: 0,
  input: null,
  introDialog: [
      "Time to do some badgyal maths. Here is the challenge yeah " + Game.getUsername() + "?",
      "I'm going to show you a number and you have to write the most complicated equation you can to equal that number",
      "For example if I tell you 5 you can write 1+1+1+(2*1)",
  ],
  winDialog: [
      "Nice 1 you know how to do maths",
      "Maybe you think you are pretty hot with your complicated math skills.",
      "This should knock you down a peg or 2. I'm going to take away 1 point for every smartass character in your maths! HAHAHAHAHA......",
  ],
  tryAgainDialog: [
    "What a shame...try again eh!",
  ],
  looseDialog: [
    "U really suck at this simple boring task...",
  ],

  generateNumber: function() {
    var _this = this;

    _this.targetNumber = Math.floor((Math.random() * 100) + 1);

    _this.introDialog.push("Now remember " + Game.getUsername() + ", your target number is... " + _this.targetNumber);
    _this.tryAgainDialog.push("And don't forget your target number is... " + _this.targetNumber);
  },

  init: function() {
    var _this = this;

    _this.generateNumber();

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    Utilities.Dialog.read(_this.introDialog, function() {

      _this.$button.on({
        click: function(e) {
          e.preventDefault();

          _this.buttonVal = e.target.value;

          if (_this.buttonVal === 'clear') {
            _this.$readout.html('0');
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

            if ( _this.$readout.html().length < 12 ) {

              if ( _this.$readout.html() === '0' ) {
                _this.$readout.html(_this.buttonVal);
              } else {
                _this.$readout.html(_this.$readout.html() + _this.buttonVal);
              }

            } else {

              console.log('Too much numbbas, dickhead');

            }

          }
        },
      });

    });

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

        _this.$readout.html('0');

      });

    }, function() {

      Utilities.Dialog.read(_this.looseDialog, function() {

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    });

  },
};

document.addEventListener('deviceready', function() {
  Maths.init();
}, false);
