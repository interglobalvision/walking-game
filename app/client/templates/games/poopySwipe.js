Template.poopySwipe.helpers({

  myHelper: function () {
    //
  }, 
  poopStack: function() {
    var poops = _.map(_.range(1,16), function(num) {
      return {
        type: 'poop',
        number: num
      }
    }); 
    var pups = _.map(_.range(1,16), function(num) {
      return {
        type: 'pup',
        number: num
      }
    }); 
    var stack = _.shuffle(poops.concat(pups));
    return stack;
  },

});

Template.poopySwipe.onCreated(function () {
  var _this = this;

});

Template.poopySwipe.onRendered(function () {
  var _this = this;

  $('#swipeStack').jTinder();

});

Template.poopySwipe.onDestroyed(function () {
});

Template.poopySwipe.events({
  'click #tap-button' : function (event, template) {
  },
});
