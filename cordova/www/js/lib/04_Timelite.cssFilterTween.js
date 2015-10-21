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
