(function(){
Template.__checkName("forgot");
Template["forgot"] = new Template("Template.forgot", (function() {
  var view = this;
  return HTML.Raw('<div class="container">\n    <form>\n      <h2>Forgot Password?</h2>\n      <div class="control-group">\n        <label>Your Email</label>\n        <div class="controls"><input id="email" name="email" type="text" value=""></div>\n      </div>\n      <div class="form-actions">\n        <input type="submit" class="button" value="Reset Password">\n      </div>\n    </form>\n  </div>');
}));

})();
