import React, { useState } from 'react';

function Message({ id, username, text, createdAt, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) setEditedText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="message">
      <h4>{username}</h4>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <textarea value={editedText} onChange={e => setEditedText(e.target.value)} />
          <button type="submit">Spara</button>
          <button type="button" onClick={handleEditToggle}>Avbryt</button>
        </form>
      ) : (
        <>
          <p>{text}</p>
          <small>{createdAt}</small>
          <button onClick={handleEditToggle}>Redigera</button>
          <button onClick={() => onDelete(id)}>Ta bort</button>
        </>
      )}
    </div>
  );
}

export default Message;