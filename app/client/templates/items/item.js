/* ---------------------------------------------------- +/

## Item ##

Code related to the item template

/+ ---------------------------------------------------- */

Template.item.helpers({

  myHelper: function () {
    //
  },

});

Template.item.onCreated(function () {
  var _this = this;

});

Template.item.onRendered(function () {
  var _this = this;

});

Template.item.events({

  'click .delete': function(e, instance){
    e.preventDefault();

    var _this = this;

    Meteor.call('removeItem', _this, function(error, result){
      console.log('Item deleted.');
      Router.go('/items');
    });
  },

});
