import React from 'react';
import './App.css';
import MessageBoard from './components/MessageBoard/MessageBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo lista från sambo</h1>
      </header>
      <main>
        <MessageBoard />
      </main>
    </div>
  );
}

export default App;