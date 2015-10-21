var Reset = {
  init: function() {

    $('#reset-yes').on({
      'click': function() {
        var date = new Date();
        var hours = date.getHours();

        Game.setNewGems(parseInt(hours));

        console.log('You just got a bunch of gems :). This many: ', theHours);

        Game.resetProgress();

        Router.go('/');
      },
    });

    $('#reset-no').on({
      'click': function() {

        console.log('ok fine');
        Game.gameComplete();

      },
    })

  },
}

Reset.init();