WalkingError = {
  unsupportedCompensation: 1000,

  // most basic not sure if useful
  throw: function(log, message) {
    console.log(log);
    alert(message);
  },

  // most likely usecase
  unsupported: function(tech) {
    var _this = this;

    if (!tech) {
      tech = 'the required technology';
    }

    console.log(tech + ' is unsupported on this device');

    alert('Sorry ' + Game.getUsername() + ', but your device does not support ' + tech + '!! But I will give you a consolation prize... Here\'s ' + _this.unsupportedCompensation + ' points. Now get outta here!');

    Game.gameComplete(_this.unsupportedCompensation);
  },

  // perhaps this is only likely to happen if a user says no to GPS
  unsupportedGPS: function() {

    console.log('Fuck. No GPS');
    alert('Sorry ' + Game.getUsername() + ', but your device does not support GPS or you have denied the app access to your location. You can\'t go walking if I don\'t know where you are. Open the Walking Game settings on your device and allow location access!!');

  },
};