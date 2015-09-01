(function(){
Template.__checkName("login");
Template["login"] = new Template("Template.login", (function() {
  var view = this;
  return HTML.Raw('<div class="container">\n    <form>\n      <div class="control-group">\n        <label>Username</label>\n        <div class="controls"><input id="username" type="text" value=""></div>\n      </div>\n      <div class="control-group">\n        <label>Password</label>\n        <div class="controls"><input id="password" type="password" value=""></div>\n      </div>\n      <div class="form-actions">\n        <a href="/forgot">Forgot password?</a>\n        <input type="submit" class="button" value="Log In">\n      </div>\n    </form>\n  </div>');
}));

})();
