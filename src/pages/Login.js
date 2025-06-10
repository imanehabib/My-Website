// src/pages/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth, provider } from '../firebase/firebase-config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('✅ تم تسجيل الدخول بنجاح!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      alert('✅ تم تسجيل الدخول باستخدام Google!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError('حدث خطأ أثناء تسجيل الدخول باستخدام Google.');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>تسجيل الدخول</h2>
        {error && <p style={styles.error}>{error}</p>}

        <button
          onClick={handleGoogleLogin}
          style={styles.googleButton}
          disabled={loading}
        >
          الدخول باستخدام Google
        </button>

        <p style={{ margin: '10px 0', color: '#888' }}>أو باستخدام البريد الإلكتروني</p>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          disabled={loading}
        />

        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...styles.input, paddingRight: '40px' }}
            disabled={loading}
          />
          <span
            onClick={toggleShowPassword}
            style={styles.eyeIcon}
            aria-label={showPassword ? 'اخفاء كلمة المرور' : 'اظهار كلمة المرور'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') toggleShowPassword(); }}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button
          onClick={handleLogin}
          style={styles.button}
          disabled={loading}
        >
          دخول
        </button>

        <p style={styles.linkText}>
          ليس لديك حساب؟ <Link to="/register">إنشاء حساب</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  card: {
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    width: '320px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2196f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  googleButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#db4437',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '14px',
  },
  linkText: {
    marginTop: '15px',
    fontSize: '14px',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '18px',
  },
};
