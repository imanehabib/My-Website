// src/firebase/firebase-config.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyBa-4act5rOQ-QDmWVYkhkoeDLa5olxv7w",
  authDomain: "my-website-fa5ec.firebaseapp.com",
  projectId:"my-website-fa5ec",
  storageBucket:  "my-website-fa5ec.firebasestorage.app",
  messagingSenderId: "997060555921",
  appId: "1:997060555921:web:7bf5dae5e71523a36cfb30",
  measurementId: "G-4HDM6SJKF0"
};

// تهيئة التطبيق مرة واحدة فقط
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// تهيئة Auth و Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
