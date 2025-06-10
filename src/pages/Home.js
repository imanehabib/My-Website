import React from 'react';
import { Link } from 'react-router-dom';
import { database, ref, set, get } from '../firebase'; // ✅ أزلنا child لأنه غير مستخدم
import './Home.css';




function Home() {
  const addToFavorites = async (gameId) => {
    const userId = 'user123'; // ❗️ يجب لاحقًا ربط هذا بـ Firebase Authentication
    const favoritesRef = ref(database, 'favorites/' + userId);

    // احصل على المفضلات الحالية من قاعدة البيانات
    const snapshot = await get(favoritesRef);
    let favorites = snapshot.exists() ? snapshot.val() : [];

    // إذا لم تكن اللعبة موجودة بالفعل في المفضلات، أضفها
    if (!favorites.includes(gameId)) {
      favorites.push(gameId);

      // حفظ المفضلات الجديدة في Firebase
      set(favoritesRef, favorites).then(() => {
        alert('✅ تمت إضافة اللعبة إلى المفضلة!');
      }).catch((error) => {
        alert('❌ حدث خطأ أثناء حفظ اللعبة في المفضلة: ' + error.message);
      });
    } else {
      alert('⚠️ هذه اللعبة موجودة بالفعل في المفضلة.');
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>🎮 GameVerse</h1>
        <p>مرحبًا بك في عالم الترفيه، حيث تبدأ المغامرة وتنطلق الأسطورة!</p>
        <Link to="Games" className="btn">ابدأ الآن</Link>
      </section>

      {/* Featured Games */}
      <section className="featured-games">
        <h2>🕹️ ألعابنا المميزة</h2>
        <div className="games-grid">
          <div className="game-card">
            <Link to="/games/cyberpunk">
              <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg" alt="Cyberpunk" />
              <h3>Cyberpunk 2077</h3>
            </Link>
            <button onClick={() => addToFavorites('cyberpunk')} className="fav-btn">💖</button>
          </div>

          <div className="game-card">
            <Link to="/games/rdr2">
              <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg" alt="Red Dead Redemption 2" />
              <h3>Red Dead Redemption 2</h3>
            </Link>
            <button onClick={() => addToFavorites('rdr2')} className="fav-btn">💖</button>
          </div>

          <div className="game-card">
            <Link to="/games/dota2">
              <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg" alt="Dota 2" />
              <h3>Dota 2</h3>
            </Link>
            <button onClick={() => addToFavorites('dota2')} className="fav-btn">💖</button>
          </div>
          

        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>انضم إلى آلاف اللاعبين!</h2>
        <p>سجل الآن وابدأ رحلتك في عالم الألعاب.</p>
        <Link to="/login" className="btn">تسجيل الدخول</Link>
      </section>
    </div>
    
  );
}

export default Home;
