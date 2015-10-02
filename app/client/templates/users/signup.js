Template.signup.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();

    var user = {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
      },
      scene = new TimelineLite(),
      $blackout = $('.blackout');

    if(!user.username || !user.email || !user.password){
      console.log('empty fields');
    }else{
      Accounts.createUser(user, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(Meteor.userId());
          scene.set($blackout, {display: 'block',});
          scene.to($blackout, 3, {opacity: 1,}, {ease:Bounce.easeIn,});
          scene.call(Router.go, ['/mirror',]);
        }
      });
    }

  },
};