import React from 'react';

const SnakeGame = () => {
  const reloadGame = () => {
    const iframe = document.getElementById('snake-frame');
    iframe.src = iframe.src;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>🐍 لعبة الثعبان</h2>
      <iframe
        id="snake-frame"
        src="/snake.html"
        width="400"
        height="400"
        title="Snake Game"
        style={{ border: '2px solid #ccc', borderRadius: '10px' }}
      ></iframe>
      <br />
      <button onClick={reloadGame} className="btn mt-3">🔁 إعادة اللعبة</button>
    </div>
  );
};

export default SnakeGame;
