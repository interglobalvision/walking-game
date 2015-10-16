cssFilterTween = function (tl, filter, start, end) {
  var inc,
    units = ['px','deg','%',],
    tlp = (tl.progress() * 100) >> 0;

  switch (filter) {
    case "blur":
      //filter = "blur";
      if (start < end){
        inc = start + Math.abs(start - end) / 100 * tlp;

      } else {
        inc = start - Math.abs(start - end) / 100 * tlp;

      }

      TweenMax.set(tl.target,{'-webkit-filter':'blur(' + inc + units[0] + ')', 'filter':'blur(' + inc + units[0] + ')',});
      break;

    case "hue-rotate":
      //filter = "hue-rotate"
      tlp = (tl.progress() * 100) >> 0;

      if (start < end){
        inc = start + Math.abs(start - end) / 100 * tlp;

      } else {
        inc = start - Math.abs(start - end) / 100 * tlp;

      }

      TweenMax.set(tl.target,{'-webkit-filter':'hue-rotate(' + inc + units[1] + ')', 'filter':'hue-rotate(' + inc + units[1] + ')',});
      break;

    default:
      //everything else is %
      tlp = (tl.progress() * 100) >> 0;

      if (start < end){
      inc = start + Math.abs(start - end) / 100 * tlp;

      } else {
      inc = start - Math.abs(start - end) / 100 * tlp;

      }

      TweenMax.set(tl.target,{'-webkit-filter':filter + '(' + inc + units[2] + ')', 'filter':filter + '(' + inc + units[2] + ')',});
  }
};

Dialog = {
  $target: $('.text-box-dialog'),
  $parent: $('#dialog'),
  interval: 66,

  arrayIndex: 0,

  lineIndex: 0,
  lineTimer: 0,

  read: function(dialogArray, callback) {

    var _this = this;

    _this.$parent = $('#dialog');
    _this.$target = $('.text-box-dialog');

    _this.dialogArray = dialogArray;
    _this.arrayIndex = 0;
    _this.callback = callback;

    _this.$parent.show();

    _this.$parent.on({
      click: function() {
        if (_this.lineTimer > 0) {
          _this.skipLine();
        } else {
          if (_this.arrayIndex === (_this.dialogArray.length - 1)) {
            _this.finish();
          } else {
            _this.arrayIndex++;
            _this.readLine();
          }
        }
      },
    });

    _this.readLine();

  },

  readLine: function() {
    var _this = this;
    var dialogLine = _this.dialogArray[_this.arrayIndex];

    _this.lineIndex = 0;
    _this.$target.html('');
    _this.lineTimer = Meteor.setInterval(function() {

      if (_this.lineIndex < dialogLine.length) {

        _this.$target.append(dialogLine[_this.lineIndex]);
        _this.lineIndex++;

      } else {

        _this.clearLineInterval();
        _this.$target.append('<a class="text-box-next">&rarr;</a>');

      }

    }, _this.interval);
  },

  clearLineInterval: function() {
    var _this = this;

    Meteor.clearInterval(_this.lineTimer);
    _this.lineTimer = 0;
  },

  skipLine: function() {
    var _this = this;

    _this.clearLineInterval();
    _this.$target.html(_this.dialogArray[_this.arrayIndex]);
    _this.$target.append('<a class="text-box-next">&rarr;</a>');

  },

  finish: function() {
    var _this = this;

    _this.$parent.hide();
    _this.$target.html('');

    _this.callback();
  },

};