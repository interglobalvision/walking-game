(function(){
Template.__checkName("header");
Template["header"] = new Template("Template.header", (function() {
  var view = this;
  return HTML.HEADER({
    id: "header",
    "class": "container"
  }, "\n    ", HTML.DIV({
    "class": "row"
  }, "\n      ", HTML.Raw('<div class="col col4">\n        <h1>interglobal.vision</h1>\n      </div>'), "\n      ", HTML.DIV({
    "class": "col col4"
  }, "\n        ", HTML.UL("\n          ", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "homepage");
    }
  }, HTML.Raw('<span class="genericon genericon-home"></span>'))), "\n          ", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "content");
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "menu-contentpage");
  }))), "\n          ", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "items");
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "menu-items");
  }))), "\n          ", HTML.Raw('<li><a href="/404">404 Link</a></li>'), "\n          ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isLoggedIn"));
  }, function() {
    return [ "\n            ", HTML.LI(HTML.A({
      href: "/",
      "class": "log-out"
    }, "Log Out")), "\n          " ];
  }, function() {
    return [ "\n            ", HTML.LI(HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "signup");
      }
    }, "Sign Up")), "\n            ", HTML.LI(HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "login");
      }
    }, "Log In")), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), HTML.Raw('\n<!--\n    <div class="messages">\n      {{#each messages}}\n        <p class="message message-{{type}}">{{message}}</p>\n      {{/each}}\n    </div>\n-->\n    <hr>\n  '));
}));

})();
