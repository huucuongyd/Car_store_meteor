import React, { useState } from 'react';

export const ChatForm = ({user}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendClick = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        Chatbox
      </div>
      <div className="chatbox-messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="sender">{user.username}</div>
            <div className="text">{message}</div>
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
}

