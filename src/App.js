import React from 'react';
import './App.css';
import MessageBoard from './components/MessageBoard/MessageBoard';
import MessageForm from './components/MessageForm/MessageForm';

function App() {
  const handleMessageSubmit = message => {
    fetch('https://vl6ibqcmg8.execute-api.eu-central-1.amazonaws.com/dev/messages', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(message)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Board</h1>
      </header>
      <main>
        <MessageForm onMessageSubmit={handleMessageSubmit} />
        <MessageBoard />
      </main>
    </div>
  );
}

export default App;