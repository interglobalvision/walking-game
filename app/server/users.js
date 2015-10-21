Accounts.onCreateUser(function(options, user) {

  user.profile = {
    progress: 0,
    score: {
      gems: 1,
      points: 0,
    },
  };

  return user;
});