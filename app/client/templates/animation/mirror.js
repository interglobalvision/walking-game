Template.mirror.onRendered(function () {
  var _this = this,
    $stage = _this.$('#stage'),
    $video = _this.$('#mirror-video'),
    $videoView = _this.$('#mirror-video-viewport'),
    video = document.getElementById("mirror-video"),
    canvas = document.getElementById("mirror-canvas"),
    ctx = canvas.getContext("2d"),
    videoHeight = parseInt($video.attr('height')),
    videoWidth = parseInt($video.attr('width')),
    scaleHorz = $stage.width() / videoWidth,
    scaleVert = $stage.height() / videoHeight,
    scale = scaleHorz > scaleVert ? scaleHorz : scaleVert;

    $videoView.width($stage.width()).height($stage.height());

    $video.width(scale * videoWidth).height(scale * videoHeight);

    $videoView.scrollLeft(($video.width() - $stage.width()) / 2)
      .scrollTop(($video.height() - $stage.height()) / 2);


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
             ctx.drawImage(video, 0, 0, 640, 480);
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