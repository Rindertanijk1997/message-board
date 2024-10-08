import React, { useEffect, useState } from 'react';
import Message from '../Message/Message';
import MessageForm from '../MessageForm/MessageForm';

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); 

  useEffect(() => {
    fetch('https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleAddMessage = async (newMessage) => {
    const response = await fetch('https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage)
    });
    if (response.ok) {
      const addedMessage = await response.json();
      console.log(addedMessage); 
      const createdAt = new Date().toISOString(); 
      setMessages(prevMessages => [...prevMessages, {
        ...newMessage, 
        id: addedMessage.id,
        createdAt: createdAt 
      }]);
      setIsFormVisible(false); 
    } else {
      console.error('Failed to add message');
    }
  };

  const handleUpdateMessage = (id, newText) => {
    fetch(`https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    })
    .then(() => {
      setMessages(prevMessages => prevMessages.map(msg => 
        msg.id === id ? { ...msg, text: newText } : msg
      ));
    });
  };

  const handleDeleteMessage = (id) => {
    fetch(`https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
      }
    });
  };

  return (
    <div>
      <button onClick={() => setIsFormVisible(true)}>Skriv nytt meddelande</button>
  
      {/* Visa formuläret endast om isFormVisible är true */}
      {isFormVisible && (
        <MessageForm onMessageSubmit={handleAddMessage} onClose={() => setIsFormVisible(false)} />
      )}
  
      {messages.length === 0 ? (
        <p>Du har inga meddelanden att visa.</p>
      ) : (
        messages.map(message => (
          <Message
            key={message.id}
            id={message.id}
            username={message.username}
            text={message.text}
            createdAt={message.createdAt}
            onUpdate={handleUpdateMessage}
            onDelete={handleDeleteMessage}
          />
        )) 
      )}
    </div>
  );

}

export default MessageBoard;