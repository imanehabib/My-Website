// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

export default function Dashboard() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      alert('تم تسجيل الخروج');
      window.location.href = '/login';
    });
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>مرحبًا، {user ? user.displayName || user.email : 'مستخدم'} 👋</h2>
      <button onClick={handleLogout} style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}>
        تسجيل الخروج
      </button>
    </div>
  );
}
