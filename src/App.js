import React from 'react';
import './App.css';
import MessageBoard from './components/MessageBoard';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Board</h1>
      </header>
      <main>
        <MessageBoard />
      </main>
    </div>
  );
};

export default App;

