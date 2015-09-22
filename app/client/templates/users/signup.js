Template.signup.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();

    var user = {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
    };

    if(!user.username || !user.email || !user.password){
      console.log('empty fields');
    }else{
      Accounts.createUser(user, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result + ' , ' + Meteor.userId());
          //Router.go('/mirror');
        }
      });
    }

  },
};