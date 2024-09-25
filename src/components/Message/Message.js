import React, { useState } from 'react';

function formatDate(isoString) {
  const date = new Date(isoString);
  return `${date.getDate()}/${date.getMonth() + 1} kl ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}

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

  const formattedDate = formatDate(createdAt); 

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
          <div className="message-info">
            <span className="message-id">ID: {id}</span>
            <small> Created: {formattedDate}</small> 
          </div>
          <button onClick={handleEditToggle}>Redigera</button>
          <button onClick={() => onDelete(id)}>Ta bort</button>
        </>
      )}
    </div>
  );
}

export default Message;