import React, { useState, useEffect, useRef } from 'react';
import { Messages } from '../api/Messages';
import Game from './Story';



export const ChatForm = ({ user }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messChange, setMessChange] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const chatboxRef = useRef(null);

  useEffect(() => {
    const handleMessagesChange = () => {
      const messages = Messages.find().fetch();
      setMessChange(messages);
      scrollToBottom();
    };

    const subscription = Meteor.subscribe('messages');
    const computation = Tracker.autorun(() => {
      Messages.find().fetch();
      handleMessagesChange();
    });

    return () => {
      subscription.stop();
      computation.stop();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messChange]);

  useEffect(() => {
    const userOnlineSubscription = Meteor.subscribe('user_online');

    const userStatusTracker = Tracker.autorun(() => {
      if (userOnlineSubscription.ready()) {
        const usersOnline = Meteor.users.find({ 'status.online': true }).fetch();
        setOnlineUsers(usersOnline);
      }
    });

    return () => {
      userOnlineSubscription.stop();
      userStatusTracker.stop();
    };
  }, []);

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendClick = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      Meteor.call('sendMessage', newMessage, user);
      setNewMessage('');
    }
  };

  const scrollToBottom = () => {

    if (chatboxRef.current) {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  return (
    <div className="chatbox" >
      <div className="chatbox-header">
        <div className='select-users'>
        <select name="userOnline" id="userOnline">
          {onlineUsers.length === 1 ? (
            <option> No User Online</option>
            ) : (
              onlineUsers.map(u => {
                if (u.username !== user.username) {
                  return <option value={u.username} key={u._id}>{u.username}</option>;
                }
              })
            )}
        </select>
        </div>
        <div className='title'>Chat Box</div>
      </div>
      <div className="chatbox-messages" ref={chatboxRef}>
        {messChange.map((message) =>{
          if(message.u.username == user.username){

            return (
              <div key={message._id} className="message">
                <div className="sender-right">{message.u.username}</div>
                <div className="text-right">{message.text}</div>
              </div>
            )
          }else{
            return (
              <div key={message._id} className="message">
                <div className="sender">{message.u.username}</div>
                <div className="text">{message.text}</div>
              </div>
            )
          }

        })}    
      </div>
      <form className="chatbox-input" onSubmit={handleSendClick}>
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>  
    </div>
  );
};
