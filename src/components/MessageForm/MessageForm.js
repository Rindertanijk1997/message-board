import React, { useState } from 'react';

function MessageForm({ onMessageSubmit }) {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onMessageSubmit({ username, text });
    setUsername('');  // Återställer formuläret efter inskick
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Användarnamn"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Skriv ditt meddelande här..."
        required
      />
      <button type="submit">Skicka meddelande</button>
    </form>
  );
}

export default MessageForm;