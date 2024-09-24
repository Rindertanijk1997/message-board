import React, { useEffect, useState } from 'react';
import Message from '../Message/Message';
import MessageForm from '../MessageForm/MessageForm';

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false); // Hantera synlighet av formuläret

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
      const addedMessage = await response.json();
      setMessages(prevMessages => [...prevMessages, { ...newMessage, id: addedMessage.id }]);
    } else {
      console.error('Failed to add message');
    }
  };

  // Stäng formuläret
  const handleCloseForm = () => {
    setFormVisible(false); // Sätter formuläret till osynligt
  };

  return (
    <div>
      {/* Knapp för att visa formuläret */}
      <button onClick={() => setFormVisible(true)}>Skriv nytt meddelande</button>

      {/* Visa formuläret om det är synligt */}
      {isFormVisible && (
        <MessageForm onMessageSubmit={handleAddMessage} onClose={handleCloseForm} />
      )}

      {messages.length === 0 ? (
        <p>Du har inga meddelanden att visa</p>
      ) : (
        messages.map(message => (
          <Message
            key={message.id}
            id={message.id}
            username={message.username}
            text={message.text}
            createdAt={message.createdAt}
            onUpdate={() => {}}
            onDelete={() => {}}
          />
        ))
      )}
    </div>
  );
}

export default MessageBoard;
