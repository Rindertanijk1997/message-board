import React, { useState } from 'react';

function MessageForm({ onMessageSubmit, onClose }) { // Lägg till onClose som prop
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onMessageSubmit({ username, text });
    setUsername('');
    setText('');
  };

  return (
    <div className="message-form">
      <button className="close-button" onClick={onClose}>X</button> {/* Stängningsknapp */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Användarnamn"
          required
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Skriv ditt meddelande här..."
          required
        />
        <button type="submit">Skicka meddelande</button>
      </form>
    </div>
  );
}

export default MessageForm;

