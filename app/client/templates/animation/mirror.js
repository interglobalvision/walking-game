Template.mirror.onRendered(function () {
  var _this = this;

  var video = document.getElementById("mirror-video");
  var dialog = [
    "Goodness! Look at how "+word(adj)+" you look!",
    "Let's remember this "+word(adj)+" face...",
  ];

  // Cross browser getUserMedia
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia); 

  if (navigator.getUserMedia) {
    // Request the camera.
    navigator.getUserMedia({
      video: true
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
        video.style.transform = "scale(" + scale + ")"

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

    var canvas = document.getElementById("mirror-canvas");
    var ctx = canvas.getContext("2d");
    var video = document.getElementById("mirror-video");
    var still = document.getElementById("mirror-still");
    var videoHeight = canvas.height = video.videoHeight;
    var videoWidth = canvas.width = video.videoWidth;

    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    var imageData = canvas.toDataURL();
    still.style.backgroundImage = 'url(' + imageData + ')';

    console.log(imageData);

    var userId = Meteor.userId();

    Meteor.call('saveMirrorImage', userId, imageData, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        $(video).fadeOut();
        $(still).fadeIn();
      }
    });
  },
};
