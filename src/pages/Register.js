// src/pages/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth, app } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';

const db = getFirestore(app);

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        name: displayName,
      });

      alert('✅ تم إنشاء الحساب بنجاح!');
      navigate('/dashboard');
    } catch (error) {
      alert('❌ فشل إنشاء الحساب: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>تسجيل مستخدم جديد</h2>
        <input
          type="text"
          placeholder="الاسم الكامل"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.button}>تسجيل</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', backgroundColor: '#f7f7f7',
  },
  card: {
    padding: '30px', borderRadius: '12px', backgroundColor: '#fff',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)', width: '320px', textAlign: 'center'
  },
  title: { marginBottom: '20px', color: '#333' },
  input: {
    width: '100%', padding: '10px', marginBottom: '15px',
    border: '1px solid #ccc', borderRadius: '6px'
  },
  button: {
    width: '100%', padding: '10px', backgroundColor: '#4CAF50',
    color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
  }
};
