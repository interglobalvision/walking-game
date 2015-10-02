Template.login.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();

    var username = $('#username').val(),
    password = $('#password').val();

    Meteor.loginWithPassword(username, password, function(error){
      if(error) {
        console.log(error);
      } else {
        Router.go('/');
      }
    });
  },
};