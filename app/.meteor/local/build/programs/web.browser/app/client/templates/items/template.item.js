(function(){
Template.__checkName("item");
Template["item"] = new Template("Template.item", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, "\n    ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "items");
    }
  }, HTML.Raw('<span class="genericon genericon-previous"></span>'), " Back"), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("item"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      "class": "item"
    }, "\n        ", HTML.H3(Blaze.View("lookup:title", function() {
      return Spacebars.mustache(view.lookup("title"));
    })), "\n        ", HTML.P(Blaze.View("lookup:body", function() {
      return Spacebars.mustache(view.lookup("body"));
    })), "\n        ", HTML.H5(HTML.A({
      href: "#",
      "class": "delete"
    }, HTML.SPAN({
      "class": "genericon genericon-trash"
    }))), "\n      "), "\n    " ];
  }), "\n  ");
}));

})();
