import React, { useState, useEffect } from 'react';
import { Messages } from '../api/Messages';

export const ChatForm = ({ user }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messChange, setMessChange] = useState([]);

  useEffect(() => {
    const handleMessagesChange = () => {
      const messages = Messages.find().fetch();
      setMessChange(messages);
    };

    const subscription = Meteor.subscribe('messages');
    const observer = Messages.find().observeChanges({
      added: handleMessagesChange,
      changed: handleMessagesChange,
      removed: handleMessagesChange,
    });

    return () => {
      subscription.stop();
      observer.stop();
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

  return (
    <div className="chatbox">
      <div className="chatbox-header">Chatbox</div>
      <div className="chatbox-messages">
        {messChange.map((message) => (
          <div key={message._id} className="message">
            <div className="sender">{message.u.username}</div>
            <div className="text">{message.text}</div>
          </div>
        ))}
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
