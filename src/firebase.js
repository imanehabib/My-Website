import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, push, onValue, remove ,increment,update } from 'firebase/database';
import { getFirestore } from "firebase/firestore";

import { getAuth } from 'firebase/auth'; // ✅ تأكد من إضافة هذا

const firebaseConfig = {
 apiKey: "AIzaSyBa-4act5rOQ-QDmWVYkhkoeDLa5olxv7w",
  authDomain: "my-website-fa5ec.firebaseapp.com",
  projectId: "my-website-fa5ec",
  storageBucket: "my-website-fa5ec.firebasestorage.app",
  messagingSenderId: "997060555921",
  appId: "1:997060555921:web:7bf5dae5e71523a36cfb30",
  measurementId: "G-4HDM6SJKF0"
};

// ✅ تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// ✅ تهيئة قاعدة البيانات والمصادقة
const database = getDatabase(app);
const auth = getAuth(app);

// ✅ التصدير
// ✅ تصدير شامل
export {
  auth,
  database,
  ref,
  set,
  get,
  child,
  push,
  onValue,
  remove,
  increment,
  update,
  db };// ✅ أضف هذا السطر هنا لتصدير Firestore 
export const db = getFirestore(app); 