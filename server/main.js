import { Meteor } from 'meteor/meteor';
import { Messages } from "../imports/api/Messages";
Meteor.startup(() => {

  Meteor.methods({
    sendMessage(message, user) {
      Messages.insert({
        text: message,
        u: {
          userId : user._id,
          username : user.username
        },
        createdAt: new Date(),
      });

    }
  });

}); 
Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.publish('user_online', function () {
  return Meteor.users.find({ 'status.online': true });
});