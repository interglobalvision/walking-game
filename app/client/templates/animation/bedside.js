Template.bedside.onRendered(function () {
  var _this = this,
    scene = new TimelineLite(),
    $blackout = $('.blackout'),
    dialog = [
      "Thank goodness you're finally up.  We are really running late!",
      "Now what was your name again?",
    ];

//Fade from black

  scene.set($blackout, {display: 'block', opacity: 1,});

  scene.to($blackout, 3, {opacity: 0,}, {ease:Bounce.easeIn,});

  scene.set($blackout, {display: 'none',});

  scene.call( readDialog, [dialog, 0, 0, function() {
    $('#signup-form').show();
  },]);
 
});

Template.bedside.events({
  'submit #signup-form': function(e) {
    e.preventDefault();

    var formdata = $(e.target).serializeArray(),
      data = {};

    $(formdata).each(function(index, obj){
        data[obj.name] = obj.value;
    });

    Meteor.call('checkExistingUser', data, function(error, result) {
      if (error) {
        console.log(error.reason);
      } else {

        if (result === true) {

          Meteor.loginWithPassword({email: data.email,}, data.password, function(error) {
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
