Template.reset.events({
  'click #reset-yes' : function (event, template) {

    var theHours = moment().format('HH');
    theHours = parseInt(theHours);
    Score.setNewGems(theHours);

    console.log('You just got a bunch of gems :). This many: ', theHours);

    // logic to reset progress [once we have progress state saved]

    Router.go('map');

  },

  'click #reset-no' : function (event, template) {

    console.log('ok fine');

    Router.go('map');

  },

});