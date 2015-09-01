(function(){
Template.__checkName("signup");
Template["signup"] = new Template("Template.signup", (function() {
  var view = this;
  return HTML.Raw('<div class="container">\n    <form>\n      <div class="control-group">\n        <label>Username</label>\n        <div class="controls"><input id="username" name="username" type="text" value=""></div>\n      </div>\n      <div class="control-group">\n        <label>Email</label>\n        <div class="controls"><input id="email" name="email" type="text" value=""></div>\n      </div>\n      <div class="control-group">\n        <label>Password</label>\n        <div class="controls"><input id="password" name="password" type="password" value=""></div>\n      </div>\n      <div class="form-actions">\n        <input type="submit" class="button" value="Sign Up">\n      </div>\n    </form>\n  </div>');
}));

})();
