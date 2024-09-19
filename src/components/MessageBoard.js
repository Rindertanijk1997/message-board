import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import NewMessageForm from './NewMessageForm';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch messages from the API
    axios.get('https://your-api-url/messages')
      .then(response => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      });
  }, []);

  const addMessage = (message) => {
    axios.post('https://your-api-url/messages', message)
      .then(response => {
        setMessages([...messages, response.data]);
      })
      .catch(error => {
        console.error('Error posting message:', error);
      });
  };

  const updateMessage = (id, updatedMessage) => {
    axios.put(`https://your-api-url/messages/${id}`, updatedMessage)
      .then(response => {
        setMessages(messages.map(msg => msg.id === id ? response.data : msg));
      })
      .catch(error => {
        console.error('Error updating message:', error);
      });
  };

  const deleteMessage = (id) => {
    axios.delete(`https://your-api-url/messages/${id}`)
      .then(() => {
        setMessages(messages.filter(msg => msg.id !== id));
      })
      .catch(error => {
        console.error('Error deleting message:', error);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <NewMessageForm addMessage={addMessage} />
      <div>
        {messages.map(message => (
          <Message
            key={message.id}
            message={message}
            updateMessage={updateMessage}
            deleteMessage={deleteMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageBoard;
