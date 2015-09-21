Template.bedside.onRendered(function () {
  var _this = this;

  var dialog = [
      "Thank goodness you're finally up.  We are really running late!",
      "Now what was your name again?",
      ];

  readDialog(dialog, 0, 0, function() {
    _this.$('#signup-form').show();
  });

});

Template.bedside.events({
  'submit #signup-form': function(e) {
    e.preventDefault();

    var formdata = $(e.target).serializeArray();
    var data = {};
    $(formdata).each(function(index, obj){
        data[obj.name] = obj.value;
    });

    console.log(data);

    Meteor.call('checkExistingUser', data, function(error, result) {
      if (error) {
        console.log(error.reason);
      } else {

        if (result === true) {

          Meteor.loginWithPassword({email: data.email}, data.password, function(error) {
            if (error) {
              console.log(error);
            } else {

              Router.go('/mirror');

            }
          });

        } else {

          Accounts.createUser({
            username: data.username,
            email: data.email,
            password: data.password,
          }, function(error) {

            if (error) {
              console.log(error);
            } else {

              Router.go('/mirror');

            }

          });

        }

      }

    });
  },
});