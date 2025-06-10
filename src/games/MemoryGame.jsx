import React from 'react';

const MemoryGame = () => {
  const reloadGame = () => {
    const iframe = document.getElementById('memory-frame');
    iframe.src = iframe.src;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>🧠 لعبة الذاكرة</h2>
      <iframe
        id="memory-frame"
        src="/memory.html"
        width="400"
        height="500"
        title="Memory Game"
        style={{ border: '2px solid #ccc', borderRadius: '10px' }}
      ></iframe>
      <br />
      <button onClick={reloadGame} className="btn mt-3">🔁 إعادة اللعبة</button>
    </div>
  );
};

export default MemoryGame;
