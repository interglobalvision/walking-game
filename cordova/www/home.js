Home = {
  $playGame: null,
  $compass: null,
  $compassContainer: null, 
  init: function() {
    var _this = this;

    _this.$playGame = $("#play-game");
    _this.$compassContainer = $("#stage");
    _this.$compass = $("#compass");

    // Bind buttons
    _this.$playGame.click( function() {

      // Hide button
      $(this).fadeOut();

      // Show compass
      _this.$compassContainer.fadeIn();

      Compass.init();
    });

    $('#play-next').click(function() {
      Game.nextMinigame();
    });
  },
}

document.addEventListener('deviceready', function() {
  Home.init();
}, false);

// Share event listeners
$('.share-fb').click(function(e){
  e.preventDefault();

  var score = Game.getPoints();

  window.plugins.socialsharing.shareViaFacebook('WOOAAAAHH! U HAVE AN AWESOME SCORe 0F' + score + ' POIIINTSSS BRAAAHHH', 'http://puu.sh/mTFtM/242a0fa967.png', 'http://interglobal.vision/', function() {
    console.log('share ok');
  }, function(errormsg){
    alert(errormsg)})
});
