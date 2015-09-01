word = function (list) {
  console.log(list.length);
  var word = list[Math.floor(Math.random()*list.length)];

  return word;
}