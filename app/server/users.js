Accounts.onCreateUser(function(options, user) {

  user.profile = {
    score: {
      gems: 1,
      points: 0,
    },
  };

  return user;
});