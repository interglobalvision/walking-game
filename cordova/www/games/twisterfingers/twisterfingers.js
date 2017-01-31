/*
number between 1-4 generated
target lights up
user holds on target
target changes color and loop repeats

if user ends the hold the game fails, if user cancels a hold the game fails, if user moves tap outside of target the game fails
*/

var TwisterFingers = {
  $blackout: $('#blackout'),

  touchesToWin: 4,

  introDialog: [
    "Okely " + Game.getUsername() + ", lets twist",
    "Press and hold with a finger for each target as they light up. Don't let go!",
  ],
  winDialog: [
    "Big winner, " + Utilities.Word.getNoun() + ". Big winner...",
  ],
  tryAgainDialog: [
    "What a-shambles you are, " + Utilities.Word.getNoun() + "! Give it another shot.",
  ],
  loseDialog: [
    "..." + Game.getUsername() + "...well guess WHAT?",
    "NOW WE GOTTA WALK IT OUT!!",
  ],

  init: function() {
    var _this = this;

    _this.targets = [];

    for (var i = 0; i < 6; i++) {
      var id = '#twister-target-' + (i + 1);
      var coordinates = _this.getTargetCenter($(id));

      _this.targets[i] = {
        index: i,
        id: id,
        $element: $(id),
        x: coordinates.x,
        y: coordinates.y,
      };
    };

    _this.targetRadius = (_this.targets[0].$element.innerWidth() / 2);

    _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
      var time = 0;

      $('.twister-target').each(function() {
        var $target = $(this);

        setTimeout( function(){
          $target.animate({'border-width': '5vw'}, 100, function() {
            $target.animate({'border-width': '3vw'}, 50);
          });
        }, time);

        time += 150;

      });

      Utilities.Dialog.read(_this.introDialog, function() {
        _this.startGame();
      });

    });

  },

  startGame: function() {
    var _this = this;

    _this.targets = Utilities.Misc.shuffleArray(_this.targets);

    _this.progress = 0;

    _this.touches = [];

    $('.twister-target').removeClass('show');

    _this.newTarget();

    _this.bind();
  },

  newTarget: function() {
    var _this = this;

    _this.target = _this.targets[_this.progress];
    _this.target.$element.addClass('touchme show');
  },

  getTargetCenter: function($target) {
    var _this = this;
    var data = {};
    var offset = $target.offset();
    var size = $target.innerWidth();

    data.x = offset.left + (size / 2);
    data.y = offset.top + (size / 2);

    return data;
  },

  bind: function() {
    var _this = this;

    $(document).on('touchstart.touchstart', _this.onTouchStart.bind(_this));
    $(document).on('touchmove.touchmove', _this.onTouchMove.bind(_this));
    $(document).on('touchend.touchend', _this.onTouchEnd.bind(_this));
    $(document).on('touchcancel.touchcancel', _this.onTouchCancel.bind(_this));

  },

  unbind: function() {
    var _this = this;

    $(document).off('touchstart.touchstart');
    $(document).off('touchmove.touchmove');
    $(document).off('touchend.touchend');
    $(document).off('touchcancel.touchcancel');

  },

  isInsideRadius: function(x1, y1, x2, y2) {
    var _this = this;

    var distance = Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) );

    if (distance <= _this.targetRadius) {
      return true;
    } else {
      return false;
    }

  },

  onTouchStart: function(event) {
    var _this = this;
    var touch = event.originalEvent.touches[event.originalEvent.touches.length - 1];

    if (_this.isInsideRadius(_this.target.x, _this.target.y, touch.pageX, touch.pageY)) {
    // if yes save touch id to target then generate new target
      _this.progress++;

      _this.touches[touch.identifier] = _this.target;

      _this.target.$element.removeClass('touchme').addClass('touched');;

      if (_this.progress === _this.touchesToWin) {
        _this.win();
      } else {
        _this.newTarget();
      }

    } else {
      _this.fail();
    }

  },

  onTouchMove: function(event) {
    var _this = this;

    // check for touch id in array of saved touches. then check that new position is not outside target associated with that id if it is then fail game
    // (possibly add a warning state for near edge of target?)

    $(event.originalEvent.changedTouches).each(function(index, item) {
      var touchTarget = _this.touches[item.identifier];

      if (!_this.isInsideRadius(touchTarget.x, touchTarget.y, item.pageX, item.pageY)) {
        _this.fail();
      }

    });

  },

  onTouchEnd: function(event) {
    var _this = this;

    if (event.target.classList[0] === 'twister-target') {
      _this.fail();
    }

  },

  onTouchCancel: function(event) {
    var _this = this;

    _this.fail();
  },

  stopGame: function() {
    var _this = this;

    _this.unbind();

    $('.twister-target').removeClass('touchme touched').addClass('show');
  },

  win: function() {
    var _this = this;

    _this.stopGame();

    Utilities.Misc.vibrate();

    var score = Game.getStepsPot();

    Utilities.Dialog.read([
      "Muy dexterous eh!",
      "You won " + Utilities.Number.roundFloat(score) + " points!!!",
    ], function() {

      Game.gameComplete(score);

    });
  },

  fail: function() {
    var _this = this;

    _this.stopGame();

    Utilities.Misc.vibrate();

    Game.gameFail(function() {

      Utilities.Dialog.read(_this.tryAgainDialog, function() {
        _this.startGame();
      });

    }, function() {

      Utilities.Dialog.read(_this.loseDialog, function() {

        _this.$blackout.animate({'opacity': 0,}, 1000, 'linear', function() {
          Router.go('/pages/compass/');
        });

      });

    });
  }

};

document.addEventListener('deviceready', function() {
  TwisterFingers.init();
}, false);
