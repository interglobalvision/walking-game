Meteor.methods({
  checkExistingUser: function(data) {
    check(data, {'username': String, 'email': String, password: String,});

    var existingUser = Accounts.findUserByEmail(data.email);

    if (existingUser) {

      return true;

    } else {

      return false;

    }

  },

});
