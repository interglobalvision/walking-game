Meteor.methods({
  checkExistingUser: function(data) {
    check(data, {'username': String, 'email': String, password: String, });

    var existingUser = Accounts.findUserByEmail(data.email); //Meteor.users.findOne({ emails: { $elemMatch: { address: data.email } } });

    if (existingUser) {

      return true;

    } else {

      return false;

    }

  },

});
