import React,{Fragment} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm.jsx';
import { ChatForm } from './ChatBox.jsx';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();

  return(
    <div>
      <h1>Welcome to Carstore</h1>
      {user ? (
        <Fragment>
            <button className="button user" onClick={logout}>
              {user.username || user.profile.name} 🚪
            </button>
            <ChatForm user={user}/>
        </Fragment>
        ) : (
          <LoginForm />
        )}
    </div>
  );

};
