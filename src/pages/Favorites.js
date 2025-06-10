import React, { useEffect, useState } from 'react';
import { ref, get } from '../firebase';
import { auth } from '../firebase';
import './Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setFavorites([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;

      try {
        const favRef = ref(`favorites/${userId}`);
        const snapshot = await get(favRef);

        if (snapshot.exists()) {
          setFavorites(snapshot.val());
        } else {
          setFavorites([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('خطأ في جلب المفضلات:', error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const gameData = {
    cyberpunk: {
      title: 'Cyberpunk 2077',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    },
    rdr2: {
      title: 'Red Dead Redemption 2',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    },
    dota2: {
      title: 'Dota 2',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg',
    },
  };

  if (!userId) {
    return (
      <div className="favorites-page">
        <h1>💖 مفضلتي</h1>
        <p>يرجى تسجيل الدخول لعرض المفضلات.</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h1>💖 مفضلتي</h1>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : favorites.length === 0 ? (
        <p>لم تقم بإضافة أي ألعاب إلى المفضلة بعد.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((id) => (
            <div className="fav-card" key={id}>
              <img src={gameData[id]?.image} alt={gameData[id]?.title} />
              <h3>{gameData[id]?.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
