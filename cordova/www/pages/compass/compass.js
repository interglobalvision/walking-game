Home = {
  init: function() {
    var _this = this;

    $("#end-compass").click( function(event) {
      event.preventDefault();

      Compass.stop();
    });

    // Check if fresh game
    if( !Game.getUsername() ) {
      Router.go('/scenes/wakeup/');
    } else { 
      Compass.init();
    }

  },
}

document.addEventListener('deviceready', function() {
  Home.init();

  // Share event listeners
  $('#share-fb').click(function(e){
    e.preventDefault();

    var score = Game.getPoints();

    //window.plugins.socialsharing.shareViaFacebook('Some msg', 'some image url or local', 'some external url, dont we need a site for the game?',…
    window.plugins.socialsharing.shareViaFacebook('WOOAAAAHH! U HAVE AN AWESOME SCORe 0F' + score + ' POIIINTSSS BRAAAHHH', 'http://puu.sh/mTFtM/242a0fa967.png', 'http://interglobal.vision/', function() {
      console.log('share ok');
    }, function(errormsg){
      alert(errormsg)})
  });

}, false);
