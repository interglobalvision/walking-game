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

    _this.photoColor = hslToRgb(randomHslColor[0], randomHslColor[1], randomHslColor[2]);
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
      if (isNeighborColor(targetColor, paletteArray[i], 88) ) {
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

// these functions need to go somewhere better
function isNeighborColor(color1, color2, tolerance) {
  if (tolerance == undefined) {
    tolerance = 32;
  }

  return Math.abs(color1[0] - color2[0]) <= tolerance
  && Math.abs(color1[1] - color2[1]) <= tolerance
  && Math.abs(color1[2] - color2[2]) <= tolerance;
}

function hslToRgb(h, s, l){
  var r, g, b;

  if (s == 0) {
      r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t){
      if (t < 0) {
        t += 1;
      }

      if (t > 1) {
        t -= 1;
      }

      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }

      if (t < 1 / 2) {
        return q;
      }

      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }

      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255),];
}
