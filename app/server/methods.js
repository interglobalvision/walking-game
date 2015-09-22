Meteor.methods({
  saveMirrorImage: function(userId, imageData) {
    check(userId, String);

    Meteor.users.update(userId, {$set:{'profile.image':imageData,},});

    return imageData;
  },
});