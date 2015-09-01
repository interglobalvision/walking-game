(function(){isVowel = function (x) {  return /[aeiouAEIOU]/.test(x); }

word = function (list, a) {
  var word = list[Math.floor(Math.random()*list.length)];

  if (a) {
    var first = word.charAt(0);

    if (isVowel(first)) {
      word = 'an ' + word;
    } else {
      word = 'a ' + word;
    }

  }

    return word;
}


})();
