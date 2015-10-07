Template.supertap.onCreated(function () {
//   var _this = this;

  Session.set('tapCount', 0);
});

/*
Template.supertap.onRendered(function () {
  var _this = this;

});
*/

Template.supertap.onDestroyed(function () {
  // Delete session vars
  Session.set('tapCount', undefined);
  Session.set('lastTap', undefined);
  Session.set('endTime', undefined);
  delete Session.keys.tapCount;
  delete Session.keys.lastTap;
  delete Session.keys.endTime;

});

Template.supertap.events({
  'click #tap-button' : function (event, template) {

    var date = new Date();
    var tapTime = date.getTime();
    var $tap = template.$('#tap-button');
    var $countdown = template.$('#tap-countdown');
    var endTime = Session.get('endTime');

    // Check if it's the first tap
    if (Session.equals('tapCount', 0)) {
      Session.set('endTime', date.getTime() + 30000);
      $tap.html('Tap me MORE');
    }

    // Check if tapping is too slow
    if (date - Session.get('lastTap') > 300) {
      // You lose
      $tap.fadeOut();

      // TODO:
      //  - show couch dialogs
      Router.go('/map');

    } else if (tapTime >= endTime) {
      // You win
      $tap.fadeOut();

      // Adds points
      Score.setNewPoints(Session.get('tapCount'));

      // TODO:
      //  - show couch dialogs
      Router.go('/map');
    }

    var count = Session.get('tapCount') + 1;

    Session.set('tapCount', count);
    Session.set('lastTap', date);
    //console.log(count);

    var countdownTime = Math.round( (endTime - tapTime) / 1000 );

    console.log(countdownTime);

    if (!isNaN(countdownTime) ) {
      $countdown.html( countdownTime );
    }
  },
});
