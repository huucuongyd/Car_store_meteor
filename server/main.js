import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';



Meteor.startup(async () => {
  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      username: 'admin',
      password: 'password',
    });
  }

});
