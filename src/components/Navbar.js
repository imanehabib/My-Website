import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar" style={{ top: showNavbar ? '0' : '-100px', position: 'sticky', zIndex: 999 }}>
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="GameVerse Logo"
          className="logo-img"
        />
        <h1 className="logo-text">GameVerse</h1>
      </div>
      <ul className="nav-links">
        {!user && (
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              دخول
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/videos" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            فيديوهات
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            المفضلة
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            اتصل بنا
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            حول
          </NavLink>
        </li>
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
            الرئيسية
          </NavLink>
        </li>
      </ul>

      {user && (
        <div className="navbar-user">
          <span className="user-name">{user.displayName || user.email}</span>
          <button className="logout-button" onClick={handleLogout}>
            تسجيل الخروج
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
