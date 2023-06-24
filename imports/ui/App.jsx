import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { LoginForm } from './LoginForm.jsx';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  console.log(user)

  return(
    <div>
      <h1>Welcome to Carstore</h1>
      <LoginForm/>
    </div>
  );

};
