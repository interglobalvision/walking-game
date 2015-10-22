var Photocolor = {
  goldenRatio: 0.618033988749895,
  photoColor: undefined,
  init: function() {
    var _this = this;

    _this.setTargetColor();
    _this.bindEvents();

    $('#target-color').css('background-color', 'rgb(' + _this.photoColor[0] + ', ' + _this.photoColor[1] + ', ' + _this.photoColor[2] + ')');

  },

  setTargetColor: function() {
    var _this = this;
    var rand = Math.random();

    rand += _this.goldenRatio;
    rand %= 1;

    var randomHslColor = [rand, 0.7, 0.5,];

    _this.photoColor = Utilities.Color.hslToRgb(randomHslColor[0], randomHslColor[1], randomHslColor[2]);
  },

  bindEvents: function() {
    var _this = this;

    $('#take-photo').on({
      'click': function() {

        navigator.camera.getPicture(function(data) {
          _this.analyzeResult(data);
        },

        function(error) {
          console.log(error);
        },

        {
          targetWidth: 480,
          targetHeight: 640,
          quality: 80,
        });

      },
    });

  },

  analyzeResult: function(data) {
    var _this = this;

    var photo = new Image();
    var photoHolder = $('#output-img')[0];
    var targetColor = _this.photoColor;
    var arrayMatch;
    var colorThief = new ColorThief();
    var paletteArray = [];

    photoHolder.src = photo.src = data;

    photo.onload = function() {
      paletteArray = colorThief.getPalette(photo, 2);
    };

    console.log(paletteArray);

    var result = false;

    for (var i = 0; i < paletteArray.length; i++) {
      if (Utilities.Color.isNeighborColor(targetColor, paletteArray[i], 88) ) {
        result = true;
        arrayMatch = i;
        break;
      }
    }

    console.log(result);

    if (result) {

      var psuedoCloseness = [
        targetColor[0] - paletteArray[arrayMatch][0],
        targetColor[1] - paletteArray[arrayMatch][1],
        targetColor[2] - paletteArray[arrayMatch][2],
      ];

      console.log(psuedoCloseness);

      var points = parseInt(psuedoCloseness[0] + psuedoCloseness[1] + psuedoCloseness[2]);

      Game.setNewPoints(points);
      Game.gameComplete();

    } else {

      console.log('You loose!');
      // try again or route to map?
      Router.go('/');

    }

  },
};

Photocolor.init();