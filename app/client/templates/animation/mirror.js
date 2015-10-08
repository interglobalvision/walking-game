Template.mirror.onRendered(function () {
  var scene = new TimelineLite(),
    $blackout = $('.blackout'),
    video = document.getElementById("mirror-video"),
    dialog = [
      "Goodness! Look at how " + word(adj) + " you look!",
      "Let's remember this " + word(adj) + " face...",
    ];

  scene.set($blackout, {display: 'block', opacity: 1,});
  scene.to($blackout, 3, {opacity: 0,}, {ease: Bounce.easeIn,});
  scene.set($blackout, {display: 'none',});

  // Cross browser getUserMedia
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

  if (navigator.getUserMedia) {
    // Request the camera.
    navigator.getUserMedia({
      video: true,
    }, function(stream) {
      // Success Callback
      video.src = window.URL.createObjectURL(stream);
      video.onloadedmetadata = function(e) {

        video.play();

        // Get Scales
        var scaleWidth = window.innerWidth / video.videoWidth;
        var scaleHeight = window.innerHeight / video.videoHeight;
        var scale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight;

        // Apply scale to video
        video.style.transform = "scale(" + scale + ")";

        // Launch dialog
        readDialog(dialog, 0, 0, function() {
          $('#mirror-save').show();
        });
      };
    }, function(err) {
      // Error Callback
      console.log('Error: ' + err);
    });

  } else {
    alert('Sorry, no');
  }

});

Template.mirror.events = {
  'click #save-mirror-image': function(event){
    event.preventDefault();

    $('#mirror-save').hide();

    var canvas = document.getElementById("mirror-canvas"),
      ctx = canvas.getContext("2d"),
      video = document.getElementById("mirror-video"),
      still = document.getElementById("mirror-still"),
      videoHeight = canvas.height = video.videoHeight,
      videoWidth = canvas.width = video.videoWidth,
      username = Meteor.users.findOne(Meteor.userId()).username,
      dialog = [
        "Alright then " + username + ", lets go say farewell to your " + word(adj) + " auntie...",
      ];

    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    var imageData = canvas.toDataURL();

    still.style.backgroundImage = 'url(' + imageData + ')';

    var userId = Meteor.userId();

    Meteor.call('saveMirrorImage', userId, imageData, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        $(video).fadeOut();
        $(still).fadeIn();
        readDialog(dialog, 0, 0, function() {
          Router.go('/farewell');
        });
      }
    });
  },
};
