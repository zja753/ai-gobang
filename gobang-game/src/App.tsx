import React from 'react';
import './App.css';
import GameRender from './game';

function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <GameRender />

    </div>
  );
}

export default App;
