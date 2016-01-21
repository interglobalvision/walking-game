var Reset = {
  init: function() {

    $('#blackout').css('opacity', 0);

    $('#reset-yes').on({
      'click': function() {
        var date = new Date();
        var hours = date.getHours();

        console.log('You just got a bunch of gems :). This many: ', hours);

        Game.setNewGems(parseInt(hours));
        Game.resetPoints();
        Game.gameComplete();

      },
    });

    $('#reset-no').on({
      'click': function() {

        console.log('ok fine');

        Game.gameComplete();

      },
    });

  },

};

document.addEventListener('deviceready', function() {
  Reset.init();
}, false);
