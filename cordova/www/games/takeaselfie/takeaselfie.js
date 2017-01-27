var Colorsnap = {
  goldenRatio: 0.618033988749895,
  targetColor: undefined,
  $blackout: $('#blackout'),
  $takeSelfie: $('#take-selfie'),
  $photoHolder: $('#output-selfie'),
  introDialog: [
    "It's time to play TAKE A SELFIE!",
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
      _this.bindEvents();
    });

  },

  bindEvents: function() {
    var _this = this;

    _this.$takeSelfie.on({
      'click': function() {

        _this.$takeSelfie.removeClass('show-camera');

        navigator.camera.getPicture(function(data) {
          _this.previewPhoto(data);
        },

        function(error) {
          WalkingError.throw(error, 'Something went wrong taking the photo. Did you cancel the camera?');
          _this.fail();
        },

        {
          targetWidth: 1932,
          targetHeight: 2576,
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI
        });

      },
    });

    // detect if tracker fails to find a face
    document.addEventListener("clmtrackrNotFound", function(event) {
      _this.ctracker.stop();
      _this.fail();
      alert("The tracking had problems with finding a face in this image. Try selecting the face in the image manually.")
    }, false);

    // detect if tracker loses tracking of face
    document.addEventListener("clmtrackrLost", function(event) {
      _this.ctracker.stop();
      alert("The tracking had problems converging on a face in this image. Try selecting the face in the image manually.")
    }, false);

    // detect if tracker has converged
    document.addEventListener("clmtrackrConverged", function(event) {
      _this.ctracker.stop();
      _this.win();
      /*
      document.getElementById('convergence').innerHTML = "CONVERGED";
      document.getElementById('convergence').style.backgroundColor = "#00FF00";
      // stop drawloop
      cancelRequestAnimFrame(drawRequest);
      */
    }, false);
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

    _this.$photoHolder.on('load', function(e) {
      _this.analyzeResult();
    }).attr('src', data).animate({'opacity': 1,}, 500, 'linear');
  },

  analyzeResult: function() {
    var _this = this;

    _this.$photoHolder.faceDetection({
      complete: function (faces) {
        console.log(faces);
      },
      error: function(code, message) {
        console.log(code, message);
      },
    });

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
