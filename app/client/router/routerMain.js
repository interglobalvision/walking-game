/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Filters

var filters = {

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      this.redirect('wakeup');
    } else {
      this.next();
    }
  },

};

Router.onBeforeAction(filters.isLoggedIn, {except: ['login','wakeup','mirror',],});

// Routes

Router.map(function() {

  // Pages

  this.route('homepage', {
    path: '/',
  });

  this.route('map');
  this.route('compass');

  // Users

  this.route('login');

  this.route('signup');

  this.route('forgot');

});
