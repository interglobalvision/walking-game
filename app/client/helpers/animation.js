cssFilterTween = function (tl, filter, start, end) {
  var units = ['px','deg','%'],
  tlp = (tl.progress()*100) >> 0;

  switch (filter) {
    case "blur":
      //filter = "blur";
      if (start < end){
        var inc = start + Math.abs(start - end)/100 * tlp; 

      } else {
        var inc = start - Math.abs(start - end)/100 * tlp; 

      }
      TweenMax.set(tl.target,{'-webkit-filter':'blur('+ inc + units[0]+')', 'filter':'blur('+ inc + units[0]+')'});
      break;

    case "hue-rotate":
      //filter = "hue-rotate"
      var tlp = (tl.progress()*100) >> 0;

      if (start < end){
        var inc = start + Math.abs(start - end)/100 * tlp; 

      } else {
        var inc = start - Math.abs(start - end)/100 * tlp; 

      }
      TweenMax.set(tl.target,{'-webkit-filter':'hue-rotate('+ inc + units[1]+')', 'filter':'hue-rotate('+ inc +units[1]+')'});
      break;

    default:
      //everything else is %
      var tlp = (tl.progress()*100) >> 0;

      if (start < end){
      var inc = start + Math.abs(start - end)/100 * tlp; 

      } else {
      var inc = start - Math.abs(start - end)/100 * tlp; 

      }
      TweenMax.set(tl.target,{'-webkit-filter':filter +'('+ inc + units[2]+')', 'filter':filter +'('+ inc +units[2]+')'});
    }
}

showText = function (dialogArray, index, i, interval) {

  var target = '.text-box-dialog',
    parent = '.text-box',
    dialog = dialogArray[index],
    readout,
    newIndex;

  readout = setTimeout(function() {

    if (i < dialog.length) {

      $(parent).show()
      $(target).append(dialog[i++]);
      showText(dialogArray, index, i, interval);

    } else {

      clearTimeout(readout);
      $(parent).append('<a class="text-box-next">&rarr;</a>');

      $('.text-box-next').on('click', function() {  
        index++;

        $('.text-box-next').remove();
        $(parent).hide();
        $(target).html('');
        
        if (index < dialogArray.length) {
          i = 0;

          showText(dialogArray, index, i, interval);
        } else {
          // trigger 'next' event
        }
      });

    }

  }, interval);

}


