var Photocolor = {
  goldenRatio: 0.618033988749895,
  photoColor: undefined,
  tryAgainDialog: [
    "What a shame. try again eh!",
  ],
  loseDialog: [
    "U really suck at this simple boring task",
  ],

  init: function() {
    var _this = this;

    $('#blackout').css('opacity', 0);

    _this.setTargetColor();
    _this.bindEvents();

  },

  setTargetColor: function() {
    var _this = this;
    var rand = Math.random();

    rand += _this.goldenRatio;
    rand %= 1;

    var randomHslColor = [rand, 0.7, 0.5,];

    _this.photoColor = Utilities.Color.hslToRgb(randomHslColor[0], randomHslColor[1], randomHslColor[2]);

    $('#brush-color').css('fill', 'rgb(' + _this.photoColor[0] + ', ' + _this.photoColor[1] + ', ' + _this.photoColor[2] + ')');

    $('#target-color').css('background-color', 'rgb(' + _this.photoColor[0] + ', ' + _this.photoColor[1] + ', ' + _this.photoColor[2] + ')');

    $("#brush").attr("class", "brush-swipe");
  },

  bindEvents: function() {
    var _this = this;

    $('#take-photo').on({
      'click': function() {

        navigator.camera.getPicture(function(data) {
          _this.previewPhoto(data);
          _this.analyzeResult(data);
        },

        function(error) {
          console.log(error);
          alert('error with camera :/');
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
    var photoHolder = $('#output-img')[0];

    photoHolder.src = '';
  },

  previewPhoto: function(data) {
    var photoHolder = $('#output-img')[0];

    photoHolder.src = data;
  },

  analyzeResult: function(data) {
    var _this = this;

    var photo = new Image();
    var targetColor = _this.photoColor;
    var arrayMatch;
    var colorThief = new ColorThief();
    var paletteArray = [];

    photo.src = data;

    // is this async? this needs to block no?
    photo.onload = function() {
      paletteArray = colorThief.getPalette(photo, 2);
    };

    var result = false;

    for (var i = 0; i < paletteArray.length; i++) {
      if (Utilities.Color.isNeighborColor(targetColor, paletteArray[i], 88) ) {
        result = true;
        arrayMatch = i;
        break;
      }
    }

    if (result) {

      var psuedoCloseness = [
        targetColor[0] - paletteArray[arrayMatch][0],
        targetColor[1] - paletteArray[arrayMatch][1],
        targetColor[2] - paletteArray[arrayMatch][2],
      ];
      var points = parseInt(psuedoCloseness[0] + psuedoCloseness[1] + psuedoCloseness[2]);

      _this.win(points);

    } else {

      _this.fail();

    }

  },

  win: function(points) {

    Game.gameComplete(points);

  },

  fail: function() {
    var _this = this;

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {

        _this.resetPhoto();
        _this.setTargetColor();

      });

    }, function() {

      Utilities.Dialog.read(_this.loseDialog, function() {

        Router.go('/');

      });

    });

  },

};

Photocolor.init();