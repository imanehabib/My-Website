import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import {
  doc, getDoc, updateDoc, collection, addDoc,
  onSnapshot, increment, deleteDoc, query, orderBy
} from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';

const games = { /* بيانات الألعاب مثل سابقًا */ };

function GameView() {
  const { id } = useParams();
  const game = games[id];
  const user = auth.currentUser;
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // زيادة المشاهدات
    const viewRef = doc(db, 'games', id);
    updateDoc(viewRef, { views: increment(1) }).catch(() => {
      // إذا مستند جديد
      setDoc(viewRef, { views: 1 }, { merge: true });
    });
    // مراقبة البيانات
    const unsub = onSnapshot(viewRef, snap => {
      const data = snap.data() || {};
      setViews(data.views || 0);
      setLikes(data.likes || 0);
    });

    // مراقبة هل المستخدم أعجب
    if (user) {
      const likeUserRef = doc(db, 'games', id, 'likesUsers', user.uid);
      const unsubLike = onSnapshot(likeUserRef, snap =>
        setUserLiked(snap.exists())
      );
      return () => { unsub(); unsubLike(); };
    }
    return unsub;
  }, [id, user]);

  useEffect(() => {
    // مراقبة التقييمات لحساب المتوسط
    const ratingsCol = collection(db, 'games', id, 'ratings');
    const unsubRate = onSnapshot(ratingsCol, snap => {
      const all = snap.docs.map(d => d.data().value);
      const avg = all.length ? all.reduce((a, b) => a + b, 0) / all.length : 0;
      setAvgRating(avg);
      if (user) {
        const userRatingRef = doc(db, 'games', id, 'ratings', user.uid);
        getDoc(userRatingRef).then(snap => {
          if (snap.exists()) setUserRating(snap.data().value);
        });
      }
    });
    // مراقبة التعليقات
    const commentsQuery = query(
      collection(db, 'games', id, 'comments'),
      orderBy('timestamp', 'desc')
    );
    const unsubCom = onSnapshot(commentsQuery, snap => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubRate(); unsubCom(); };
  }, [id, user]);

  const handleLike = async () => {
    if (!user) return alert('يجب تسجيل الدخول');
    if (userLiked) return alert('لقد أعجبت مسبقاً');
    const batch = [
      updateDoc(doc(db, 'games', id), { likes: increment(1) }),
      setDoc(doc(db, 'games', id, 'likesUsers', user.uid), { liked: true })
    ];
    await Promise.all(batch);
  };

  const handleRating = async (value) => {
    if (!user) return alert('سجّل الدخول لتقييم اللعبة');
    if (userRating) return alert('تم التقييم مسبقاً');
    await setDoc(doc(db, 'games', id, 'ratings', user.uid), { value });
    alert(`شكراً لتقييمك: ${value} نجوم`);
  };

  const handleCommentSubmit = async () => {
    if (!user) return alert('سجّل الدخول لإضافة تعليق');
    if (!comment.trim()) return;
    await addDoc(collection(db, 'games', id, 'comments'), {
      text: comment, username: user.displayName || user.email,
      userId: user.uid, timestamp: Date.now()
    });
    setComment('');
  };

  const handleDelete = async (cid, uid) => {
    if (user.uid !== uid) return;
    await deleteDoc(doc(db, 'games', id, 'comments', cid));
  };

  if (!game) return <p>❌ اللعبة غير موجودة</p>;

  return (
    <div className="game-view">
      <h1>{game.title}</h1>
      <img src={game.image} alt={game.title} />
      <p>{game.description}</p>
      <p>👁 {views} | ❤️ {likes} | ⭐ متوسط: {avgRating.toFixed(1)}</p>
      <button onClick={handleLike} disabled={!user || userLiked}>👍 أعجبني</button>
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} size={24} color={i < (userRating ?? avgRating) ? '#ffc107' : '#e4e5e9'}
            onClick={() => handleRating(i + 1)} style={{cursor: userRating ? 'default':'pointer'}} />
        ))}
      </div>
      <div className="comments">
        <textarea value={comment} onChange={e => setComment(e.target.value)} />
        <button onClick={handleCommentSubmit}>إرسال</button>
        {comments.map(c => (
          <div key={c.id}>
            <strong>{c.username}</strong>: {c.text}
            {user.uid === c.userId && <button onClick={() => handleDelete(c.id, c.userId)}>🗑 حذف</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameView;
