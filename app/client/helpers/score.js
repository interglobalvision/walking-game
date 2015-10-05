Score = {
  setNewPoints: function(points) {
    var currentScore = Meteor.user().profile.score;

    if (points > 0) {
      var modifier = (Math.log(currentScore.gems) + 1);
      var modifiedPoints = Math.round((points * modifier));

      return Meteor.users.update( Meteor.userId(), {$set: {'profile.score.points': (currentScore.points + modifiedPoints),},});
    } else {
      return Meteor.users.update( Meteor.userId(), {$set: {'profile.score.points': (currentScore.points + points),},});
    }
  },
};