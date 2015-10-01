Template.supertap.helpers({

  myHelper: function () {
    //
  }

});

Template.supertap.onCreated(function () {
  var _this = this;
  
  Session.set('tapCount', 0);
});

Template.supertap.onRendered(function () {
  var _this = this;

});

Template.supertap.onDestroyed(function () {
  // Delete session vars
  Session.set('tapCount', undefined)
  Session.set('lastTap', undefined)
  Session.set('endTime', undefined)
  delete Session.keys.tapCount;
  delete Session.keys.lastTap;
  delete Session.keys.endTime;

});

Template.supertap.events({
  'click #tap' : function (event, template) {

    var date = new Date();
    var $tap = template.$('#tap');

    // Check if it's the first tap
    if ( Session.equals('tapCount', 0) ) {
      Session.set('endTime', date.getTime() + 30000 );
      $tap.html('Tap me MORE');
    }

    // Check if tapping is too slow
    if ( date - Session.get('lastTap') > 300 ) {
      // You lose
      $tap.fadeOut();

      // TODO: 
      //  - show couch dialogs
      //  - send back to map ?

    } else if ( date.getTime() >= Session.get('endTime') ) {
      // You win
      $tap.fadeOut();

      // TODO: 
      //  - show couch dialogs
      //  - send back to map ?
    }

    var count = Session.get('tapCount') + 1;
    Session.set('tapCount', count);
    Session.set('lastTap', date);
    console.log(count);

  }
});
