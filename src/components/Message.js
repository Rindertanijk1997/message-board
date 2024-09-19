import React, { useState } from 'react';

const EditText = ({ newText, setNewText }) => (
  <input
    type="text"
    value={newText}
    onChange={(e) => setNewText(e.target.value)}
  />
);

const MessageControls = ({ isEditing, setIsEditing, handleUpdate, deleteMessage, messageId }) => (
  isEditing ? (
    <>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </>
  ) : (
    <>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => deleteMessage(messageId)}>Delete</button>
    </>
  )
);

const Message = ({ message, updateMessage, deleteMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(message.text);

  const handleUpdate = () => {
    updateMessage(message.id, { ...message, text: newText });
    setIsEditing(false);
  };

  return (
    <div>
      <p>{message.username}: {isEditing ? <EditText newText={newText} setNewText={setNewText} /> : message.text}</p>
      <p>{new Date(message.createdAt).toLocaleString()}</p>
      <MessageControls isEditing={isEditing} setIsEditing={setIsEditing} handleUpdate={handleUpdate} deleteMessage={deleteMessage} messageId={message.id} />
    </div>
  );
};

export default Message;
