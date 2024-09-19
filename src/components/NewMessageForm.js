import React, { useState } from 'react';

const NewMessageForm = ({ addMessage }) => {
  const [formData, setFormData] = useState({ username: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { ...formData, createdAt: new Date().toISOString() };
    addMessage(newMessage);
    setFormData({ username: '', text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="text"
        placeholder="Message"
        value={formData.text}
        onChange={handleChange}
        required
      />
      <button type="submit">Post Message</button>
    </form>
  );
};

export default NewMessageForm;