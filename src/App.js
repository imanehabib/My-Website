import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Videos from './pages/Videos';
import Favorites from './pages/Favorites';
import Contact from './pages/Contact';
import GameView from './pages/GameView';
import Games from './pages/Games'; 
import TicTacToeGame from './games/TicTacToeGame';




function App() {
  const [darkMode, setDarkMode] = useState(true); // مفعّل افتراضيًا

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/game/:id" element={<GameView darkMode={darkMode} />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/tictactoe" element={<TicTacToeGame />} />
        


      </Routes>
    </div>
  );
}

export default App;
