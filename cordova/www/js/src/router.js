Router = {
  init: function() {
    var _this = this;

    var regex =  /(.+?(?:www))/;
    _this.basePath = regex.exec(window.location.href);
  },
  go: function(url) {
    var _this = this;

    window.location = _this.basePath[0] + url + 'index.html';
  },
}
Router.init();
