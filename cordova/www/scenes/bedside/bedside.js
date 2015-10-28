var Bedside = {
  scene: new TimelineLite(),
  $blackout: $('#blackout'),
  $form: $('#user-setup-form'),
  dialog: [
      "Thank goodness you're finally up. We are really running late!",
      "I'm your coach and you have to do what I say!",
      "And I say........",
      "It's time to go!! Now what was your name again?",
  ],

  init: function() {
    var _this = this;

    //Fade from black
    _this.scene.set(_this.$blackout, {display: 'block', opacity: 1,});
    _this.scene.to(_this.$blackout, 3, {opacity: 0,}, {ease:Bounce.easeIn,});
    _this.scene.set(_this.$blackout, {display: 'none',});

    _this.scene.call(function() {
      Utilities.Dialog.read(_this.dialog, function() {
        $('#user-setup').show();
      });
    });

    _this.bindings();

  },

  bindings: function() {
    var _this = this;

    _this.$form.on({
      'submit': function(e) {
        e.preventDefault();

        console.log('Username', e.target[0].value);

        if (e.target[0].value === '' || e.target[0].value === null || e.target[0].value === undefined) {

          alert('Enter a username please. You\'re not called nothing');

        } else {

          Game.createUser(e.target[0].value, function() {
            Router.go('/');
          });

        }

      },
    });

  },
};

$(document).ready(function() {
  Bedside.init();
});
