Menu = {
	$menuBubble: $('#map-menu-bubble'),
	$menuButton: $('#map-menu-button'),
	menuState: 0, //0 is closed, 1 is open

	toggleMenu: function() {
		//functionality to open and close menu
		var _this = this;

		_this.$menuBubble.toggle("fast");
	},

	init: function() {
		var _this = this;

		_this.$menuButton.on('click', function() {
			_this.toggleMenu();
		}); 
	}

};
