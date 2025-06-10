// src/pages/Games.js
import React from 'react';
import SnakeGame from '../games/SnakeGame';
import BreakoutGame from '../games/BreakoutGame';
import MemoryGame from '../games/MemoryGame';
import TicTacToeGame from '../games/TicTacToeGame'; 

const Games = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center', background: '#111', color: '#fff' }}>
      <h2>🎮 ألعاب بدون إنترنت</h2>

      <section style={{ marginBottom: '50px' }}>
        <h3>🐍 Snake</h3>
        <SnakeGame />
      </section>

      <section style={{ marginBottom: '50px' }}>
        <h3>🧱 Breakout</h3>
        <BreakoutGame />
      </section>

      <section>
        <h3>🧠 Memory</h3>
        <MemoryGame />
      </section>
      
      <section>
        <h3>❌⭕ Tic Tac Toe</h3>
        <TicTacToeGame />
      </section>
    </div>
    
  );
  
};

export default Games;
