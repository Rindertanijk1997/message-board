import React, { useEffect, useState } from 'react';
import Message from '../Message/Message';

function MessageBoard() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleUpdateMessage = (id, newText) => {
    fetch(`https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newText })
    })
    .then(response => response.json())
    .then(data => {
      setMessages(messages.map(msg => msg.id === id ? { ...msg, text: newText } : msg));
    })
    .catch(error => console.error('Failed to update message:', error));
  };

  const handleDeleteMessage = (id) => {
    fetch(`https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setMessages(messages.filter(msg => msg.id !== id));
      } else {
        throw new Error('Failed to delete the message');
      }
    })
    .catch(error => console.error('Error deleting message:', error));
  };

  return (
    <div>
      {messages.map(message => (
        <Message
          key={message.id}
          id={message.id}
          username={message.username}
          text={message.text}
          createdAt={message.createdAt}
          onUpdate={handleUpdateMessage}
          onDelete={handleDeleteMessage}
        />
      ))}
    </div>
  );
}

export default MessageBoard;

