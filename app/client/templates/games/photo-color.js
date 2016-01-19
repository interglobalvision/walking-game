Template.photocolor.onCreated(function () {
// http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
  var _this = this;
  var goldenRatio = 0.618033988749895;
  var rand = Math.random();

  rand += goldenRatio;
  rand %= 1;

  var randomHslColor = [rand, 0.7, 0.5,];
  var randomRgbColor = hslToRgb(randomHslColor[0], randomHslColor[1], randomHslColor[2]);

  Session.set('photoColor', randomRgbColor);
});

Template.photocolor.onRendered(function () {
  var _this = this;
  var randomRgbColor = Session.get('photoColor');

  _this.$('#target-color').css('background-color', 'rgb(' + randomRgbColor[0] + ', ' + randomRgbColor[1] + ', ' + randomRgbColor[2] + ')');
});

Template.photocolor.onDestroyed(function () {
  Session.set('photoColor', undefined);
  delete Session.keys.tapCount;
});

Template.photocolor.events({
  'click #take-photo' : function (event, template) {

    MeteorCamera.getPicture({
      width: 640,
      height: 480,
      quality: 80,
    }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var photo = template.$('#output-img')[0];
        var targetColor = Session.get('photoColor');
        var arrayMatch;
        var colorThief = new ColorThief.colorRob();

        photo.src = data;

        paletteArray = colorThief.getPalette(photo, 2);
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

          var points = parseFloat(psuedoCloseness[0] + psuedoCloseness[1] + psuedoCloseness[2]);

          Score.setNewPoints(points);

          Game.gameComplete();

        } else {

          console.log('You loose!');
          // try again or route to map?
          Router.go('map');

        }
      }
    });

  },
});

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