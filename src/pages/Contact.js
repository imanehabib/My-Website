// src/pages/Contact.js
import React, { useState } from 'react';
import './Contact.css';
import { database, ref, push } from '../firebase'; // ✅ استيراد firebase


function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    try {
      await push(ref(database, 'messages'), {
        name,
        email,
        message,
        timestamp: Date.now(),
      });
      alert('✅ تم إرسال رسالتك بنجاح!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('حدث خطأ أثناء إرسال الرسالة:', error);
      alert('❌ حدث خطأ، يرجى المحاولة لاحقًا');
    }
  };

  return (
    <div className="contact-container">


      <h2>📩 اتصل بنا</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>الاسم:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اكتب اسمك"
            required
          />
        </div>
        <div>
          <label>البريد الإلكتروني:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
        </div>
        <div>
          <label>رسالتك:</label><br />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا"
            rows={5}
            required
          ></textarea>
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>إرسال</button>
      </form>
    </div>
  );
  
}

export default Contact;
