Template.reset.events({
  'click #reset-yes' : function (event, template) {
    var theHours = moment().format('HH');

    theHours = parseInt(theHours);
    Score.setNewGems(theHours);

    console.log('You just got a bunch of gems :). This many: ', theHours);

    Game.resetProgress();

    Router.go('map');

  },

  'click #reset-no' : function (event, template) {

    console.log('ok fine');
    Game.gameComplete();

  },

});