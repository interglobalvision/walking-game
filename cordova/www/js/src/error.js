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
    alert('Sorry your device does not support ' + tech + ' :( But you have unclaimed misssold PPI. Collect ' + _this.unsupportedCompensation + ' points and pass go.');
    Game.gameComplete(_this.unsupportedCompensation);
  },

  // perhaps this is only likely to happen if a user says no to GPS
  unsupportedGPS: function() {

    console.log('Fuck. No GPS');
    alert('Sorry but your device does not support the required GPS or you have denied the app access to your location. You can\'t go walking if the Coach doesn\'t know where you are');

  },
}