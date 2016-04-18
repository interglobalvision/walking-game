var Bedside = {
  $blackout: $('#blackout'),
  $form: $('#user-setup-form'),
  dialog: [
      "Thank goodness you're finally up. We are really running late!",
      "I'm your coach and you have to do what I say!",
      "And I say........",
      "It's time to go!! Now what was your name again?",
  ],
  isAndroid: function() {
    return navigator.userAgent.match(/Android/i) == "Android" ? true : false;
  },

  init: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 0,}, 2000, 'linear', function() { //fade from black

      _this.partOne();
      
    });

  },

  partOne: function() {
    var _this = this;

    Utilities.Dialog.read(_this.dialog, function() { //read dialog

      $('#user-setup').show(); //show username form

      _this.bindings(); //bind username form action

    });
  },

  partTwo: function() {
    var _this = this;

    _this.$blackout.animate({'opacity': 1,}, 2000, 'linear', function() { //fade to black

      Router.go('/scenes/farewell/'); //go to farewell scene 

    });
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

          Game.createUser(e.target[0].value, function() { //create user

            $('#user-setup').hide();

            _this.partTwo();

          });

        }

      },
    });

    if( _this.isAndroid() ) {
      // Bind for keyboard showin
      window.addEventListener('native.keyboardshow', function(event) {
        $('#user-setup').css('bottom', (event.keyboardHeight + 15) + 'px');
      });

      window.addEventListener('native.keyboardhide', function(event) {
        $('#user-setup').css('bottom', '2%');
      });
    }


  },
};

document.addEventListener('deviceready', function() {
  Bedside.init();
}, false);
