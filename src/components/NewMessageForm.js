import React, { useState } from 'react';

const NewMessageForm = ({ addMessage }) => {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { username, text, createdAt: new Date().toISOString() };
    addMessage(newMessage);
    setUsername('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Post Message</button>
    </form>
  );
};

export default NewMessageForm;
