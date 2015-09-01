(function(){
Template.__checkName("items");
Template["items"] = new Template("Template.items", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, HTML.Raw("\n    <h3>Items: </h3>\n    "), HTML.UL("\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("items"));
  }, function() {
    return [ "\n        ", HTML.LI(HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "item");
      }
    }, Blaze.View("lookup:title", function() {
      return Spacebars.mustache(view.lookup("title"));
    }))), "\n      " ];
  }), "\n    "), "\n  ");
}));

})();
