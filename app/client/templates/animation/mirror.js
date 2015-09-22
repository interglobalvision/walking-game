var canvas, ctx, video, videoHeight, videoWidth;

Template.mirror.onRendered(function () {
  var _this = this,
    $stage = _this.$('#stage'),
    $video = _this.$('#mirror-video'),
    $videoView = _this.$('#mirror-video-viewport');

    video = document.getElementById("mirror-video");
    videoHeight = parseInt($video.attr('height'));
    videoWidth = parseInt($video.attr('width'));
    
  var scaleHorz = $stage.width() / videoWidth,
    scaleVert = $stage.height() / videoHeight,
    scale = scaleHorz > scaleVert ? scaleHorz : scaleVert,
    dialog = [
      "Goodness! Look at how "+word(adj)+" you look!",
      "Let's remember this "+word(adj)+" face...",
      ];

  $videoView.width($stage.width()).height($stage.height());

  $video.width(scale * videoWidth).height(scale * videoHeight);

  $videoView.scrollLeft(($video.width() - $stage.width()) / 2)
    .scrollTop(($video.height() - $stage.height()) / 2);

  videoWidth = $video.width();
  videoHeight = $video.height();

  canvas = document.getElementById("mirror-canvas");
  ctx = canvas.getContext("2d");

  navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia || 
                            navigator.msGetUserMedia);

  if (navigator.getUserMedia) {
    // Request the camera.
    navigator.getUserMedia(
      // Constraints
      {
        video: true
      },
      // Success Callback
      function(stream) {

        video.src = window.URL.createObjectURL(stream);
        video.onloadedmetadata = function(e) {
          video.play();
          
          readDialog(dialog, 0, 0, function() {
            $('#mirror-save').show();
          });
        };
      },
      // Error Callback
      function(err) {
        // Log the error to the console.
        console.log('Error: ' + err);
      }
    );

  } else {
    alert('Sorry, no');
  }

});

Template.mirror.events = {
  'click #save-mirror-image': function(event){
    event.preventDefault();

    ctx.drawImage(video, 0, 0, 640, 320);

    var userId = Meteor.userId(),
      imageData = canvas.toDataURL();

    console.log(imageData);

    Meteor.call('saveMirrorImage', userId, imageData, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  },
};