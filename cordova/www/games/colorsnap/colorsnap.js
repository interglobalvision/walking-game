var Colorsnap = {
  goldenRatio: 0.618033988749895,
  targetColor: undefined,
  $blackout: $('#blackout'),
  $takePhoto: $('#take-photo'),
  $photoHolder: $('#output-img'),
  introDialog: [
    "It's time to play COLORSNAP!",
    "Allow me to paint your target color...",
  ],
  showColorDialog: [
    "That's your target color!",
    "You need to find that exact color and snap a pic of it!",
    "Tap this camera when you're ready!",
  ],
  tryAgainDialog: [
    "What a shame. try again eh!",
  ],
  winDialog: [
    "U did it ::::::)",
  ],
  loseDialog: [
    "U really suck at this simple boring task",
  ],

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear');

    if (!navigator.camera) {
      WalkingError.unsupported('camera');
    }

    Utilities.Dialog.read(_this.introDialog, function() {
      _this.setTargetColor();
    });

    _this.bindEvents();
  },

  setTargetColor: function() {
    var _this = this;
    var rand = Math.random();

    rand += _this.goldenRatio;
    rand %= 1;

    var randomHslColor = [rand, 0.7, 0.5,];

    _this.targetColor = Utilities.Color.hslToRgb(randomHslColor[0], randomHslColor[1], randomHslColor[2]);

    $('#brush-color, #target-color').css('fill', 'rgb(' + _this.targetColor[0] + ', ' + _this.targetColor[1] + ', ' + _this.targetColor[2] + ')');

    $('.colorsnap-background').css('background-color', 'rgb(' + _this.targetColor[0] + ', ' + _this.targetColor[1] + ', ' + _this.targetColor[2] + ')');

    $('#brush').attr('class', 'brush-swipe');

    Utilities.Misc.vibrate();

    $('#splat').attr('class', 'show-splat');

    Utilities.Dialog.read(_this.showColorDialog, function() {
      _this.$takePhoto.addClass('show-camera');
    });

  },

  bindEvents: function() {
    var _this = this;

    _this.$takePhoto.on({
      'click': function() {

        _this.$takePhoto.removeClass('show-camera');

        navigator.camera.getPicture(function(data) {
          _this.previewPhoto(data);
          _this.analyzeResult(data);
        },

        function(error) {
          WalkingError.throw(error, 'Something went wrong taking the photo. Did you cancel the camera?');
          _this.fail();
        },

        {
          targetWidth: 480,
          targetHeight: 640,
          quality: 80,
        });

      },
    });

  },

  resetPhoto: function() {
    var _this = this;

    _this.$photoHolder.animate({'opacity': 0,}, 500, 'linear', function() {
      _this.$photoHolder.attr('src', '');
    });

    $('#brush, #splat').attr('class', '');
  },

  previewPhoto: function(data) {
    var _this = this;

    _this.$photoHolder.attr('src', data).animate({'opacity': 1,}, 500, 'linear');
  },

  analyzeResult: function(data) {
    var _this = this;
    var photo = new Image();
    var result = false;

    photo.src = data;

    // is this async? this needs to block no?
    photo.onload = function() {
      var targetColor = _this.targetColor;
      var arrayMatch;
      var colorThief = new ColorThief();
      var paletteArray = colorThief.getPalette(photo, 2);

      for (var i = 0; i < paletteArray.length; i++) {
        if (Utilities.Color.isNeighborColor(targetColor, paletteArray[i], 88) ) {
          result = true;
          arrayMatch = i;
          break;
        }
      }

      if (result) {

        _this.win();

      } else {

        _this.fail();

      }

    };

  },

  win: function() {
    var _this = this;

    Utilities.Misc.vibrate();

    Utilities.Dialog.read(_this.winDialog, function() {

      var score = Game.getStepsPot();
      Game.gameComplete(score);

    });

  },

  fail: function() {
    var _this = this;

    Utilities.Misc.vibrate();

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.resetPhoto();
        _this.setTargetColor();

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
  Colorsnap.init();
}, false);
