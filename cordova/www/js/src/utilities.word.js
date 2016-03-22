Utilities.Word = {
  adjs: [],
  nouns: [],

  init: function(adjsList, nounList) {
    var _this = this;

    _this.adjs = adjsList;
    _this.nouns = nounList;

  },

  /**
   * Returns a word from the lists
   * @param {string} kind Defines what kind of word return (adj|noun)
   * @param {bool} indefinite Defines if it should append an indefinite article
   */
  getWord: function(kind, indefinite, capitalize) {
    var _this = this;

    var list = kind ==  'adj' ? _this.adjs : _this.nouns;
    var word = list[Math.floor(Math.random() * list.length)];

    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (indefinite) {
      if (_this.isVowel(word[0])) {
        word = 'an ' + word;
      } else {
        word = 'a ' + word;
      }
    }

    return word;
  },

  getAdj: function(indefinite, capitalize) {
    var _this = this;

    return _this.getWord('adj', indefinite, capitalize);
  },

  getNoun: function(indefinite, capitalize) {
    var _this = this;

    return _this.getWord('noun', indefinite, capitalize);
  },

  isVowel: function(character) {
    return /[aeiouAEIOU]/.test(character);
  }
}

Utilities.Word.init(Adjs, Nouns);
