Utilities.Number = {
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  roundFloat: function(number) {
    // this is how to round to 3 decimal places in js lmao
    number = (number + 0.00001) * 1000;
    number = Math.floor(number);
    number = number / 1000;

    return number;
  },
};