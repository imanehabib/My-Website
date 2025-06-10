import React, { useEffect, useState } from 'react';
import { database, ref, push, onValue } from '../firebase'; // Realtime Database
import { auth } from '../firebase';
import './CommentSection.css'; // للتنسيق إن وجد

function CommentSection({ gameId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // 🔁 تحميل التعليقات من Realtime Database
  useEffect(() => {
    const commentsRef = ref(database, 'comments/' + gameId);
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedComments = data ? Object.values(data) : [];
      setComments(loadedComments);
    });
  }, [gameId]);

  // ✍️ عند إرسال تعليق
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("يجب تسجيل الدخول لكتابة تعليق.");
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      user: user.displayName || user.email || 'مستخدم مجهول',
      date: new Date().toLocaleString(),
    };

    const commentsRef = ref(database, 'comments/' + gameId);
    await push(commentsRef, commentData);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h3>💬 التعليقات</h3>

      {auth.currentUser ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="اكتب تعليقك هنا..."
            required
          />
          <button type="submit">إرسال</button>
        </form>
      ) : (
        <p>يرجى تسجيل الدخول لكتابة تعليق.</p>
      )}

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((c, i) => (
            <div key={i} className="comment">
              <p><strong>{c.user}</strong>:</p>
              <p>{c.text}</p>
              <small>{c.date}</small>
            </div>
          ))
        ) : (
          <p>لا توجد تعليقات بعد.</p>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
