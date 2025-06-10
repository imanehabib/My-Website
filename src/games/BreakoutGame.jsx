import React from 'react';

const BreakoutGame = () => {
  const reloadGame = () => {
    const iframe = document.getElementById('breakout-frame');
    iframe.src = iframe.src;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>🧱 لعبة كسر الطوب</h2>
      <iframe
        id="breakout-frame"
        src="/breakout.html"
        width="400"
        height="400"
        title="Breakout Game"
        style={{ border: '2px solid #ccc', borderRadius: '10px' }}
      ></iframe>
      <br />
      <button onClick={reloadGame} className="btn mt-3">🔁 إعادة اللعبة</button>
    </div>
  );
};

export default BreakoutGame;
