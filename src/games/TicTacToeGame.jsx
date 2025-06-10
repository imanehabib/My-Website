// src/games/TicTacToeGame.jsx
import React, { useState } from 'react';
import './GameStyle.css';

const TicTacToeGame = () => {
  const [cells, setCells] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [status, setStatus] = useState('دور اللاعب: X');
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (cells[index] || gameOver) return;

    const newCells = [...cells];
    newCells[index] = turn;
    setCells(newCells);

    if (checkWinner(newCells)) {
      setStatus(`🏆 الفائز: ${turn}`);
      setGameOver(true);
    } else if (newCells.every(cell => cell !== '')) {
      setStatus('🤝 تعادل!');
      setGameOver(true);
    } else {
      const nextTurn = turn === 'X' ? 'O' : 'X';
      setTurn(nextTurn);
      setStatus(`دور اللاعب: ${nextTurn}`);
    }
  };

  const checkWinner = (cells) => {
    const winCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return winCombos.some(([a, b, c]) =>
      cells[a] && cells[a] === cells[b] && cells[a] === cells[c]
    );
  };

  const resetGame = () => {
    setCells(Array(9).fill(''));
    setTurn('X');
    setStatus('دور اللاعب: X');
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h2>🎮 لعبة تيك تاك تو</h2>
      <h3>{status}</h3>
      <div className="tictactoe-board">
        {cells.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-btn">🔁 إعادة اللعبة</button>
    </div>
  );
};

export default TicTacToeGame;
