// src/pages/GamesPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function GamesPage() {
  const navigate = useNavigate();

  const games = [
    {
      title: '🐍 لعبة Snake',
      image: '/assets/snake.png',
      link: '/games#snake',
    },
    {
      title: '🧱 لعبة Breakout',
      image: '/assets/breakout.png',
      link: '/games#breakout',
    },
    {
      title: '🧠 لعبة Memory',
      image: '/assets/memory.png',
      link: '/games#memory',
    },
    {
      title: '⭕❌ لعبة Tic Tac Toe',
      image: '/assets/tictactoe.png',
      link: '/games/tictactoe',
    },
  ];

  return (
    <div style={{ padding: '2rem', textAlign: 'center', background: '#111', color: '#fff' }}>
      <h2>🕹️ اختر لعبتك</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1.5rem',
        marginTop: '2rem',
      }}>
        {games.map((game, index) => (
          <div key={index} style={{ width: 220, background: '#222', border: '1px solid #444', borderRadius: 8, padding: '1rem' }}>
            <img src={game.image} alt={game.title} style={{ width: '100%', borderRadius: 8 }} />
            <h4 style={{ marginTop: '1rem' }}>{game.title}</h4>
            <button
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#0af',
                color: '#fff',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
              }}
              onClick={() => navigate(game.link)}
            >
              🎮 ابدأ اللعبة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
