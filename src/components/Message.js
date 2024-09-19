import React, { useState } from 'react';

const Message = ({ message, updateMessage, deleteMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(message.text);

  const handleUpdate = () => {
    updateMessage(message.id, { ...message, text: newText });
    setIsEditing(false);
  };

  return (
    <div>
      <p>{message.username}: {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        message.text
      )}</p>
      <p>{new Date(message.createdAt).toLocaleString()}</p>
      {isEditing ? (
        <>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteMessage(message.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Message;
