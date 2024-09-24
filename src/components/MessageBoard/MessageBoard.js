import React, { useEffect, useState } from 'react';
import Message from '../Message/Message';
import MessageForm from '../MessageForm/MessageForm'; // Importera det fungerande formuläret

function MessageBoard() {
  const [messages, setMessages] = useState([]);

  // Hämta alla meddelanden vid sidladdning
  useEffect(() => {
    fetch('https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  // Lägg till ett nytt meddelande och uppdatera listan
  const handleAddMessage = async (newMessage) => {
    const response = await fetch('https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage)
    });
    if (response.ok) {
      const addedMessage = await response.json(); // Hämta det nya meddelandet från svaret
      setMessages(prevMessages => [...prevMessages, { ...newMessage, id: addedMessage.id }]); // Lägg till det nya meddelandet direkt i listan
    } else {
      console.error('Failed to add message');
    }
  };

  // Uppdatera ett befintligt meddelande
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

  // Ta bort ett meddelande
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
      <MessageForm onMessageSubmit={handleAddMessage} />

      {/* Lista alla meddelanden */}
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

