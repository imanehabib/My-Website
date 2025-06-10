import React, { useState } from 'react';

function Videos() {
  const allVideos = [
    { title: 'عرض لعبة Cyberpunk 2077', url: 'https://www.youtube.com/embed/qIcTM8WXFjk', category: 'أكشن' },
    { title: 'عرض Red Dead Redemption 2', url: 'https://www.youtube.com/embed/gmA6MrX81z4', category: 'مغامرات' },
    { title: 'مقدمة Dota 2', url: 'https://www.youtube.com/embed/-cSFPIwMEq4', category: 'استراتيجي' },
    { title: 'لعبة God of War', url: 'https://www.youtube.com/embed/EE-4GvjKcfs', category: 'أكشن' },
    { title: 'The Witcher 3', url: 'https://www.youtube.com/embed/ndl1W4ltcmg', category: 'مغامرات' },
    { title: 'GTA V', url: 'https://www.youtube.com/embed/QkkoHAzjnUs', category: 'أكشن' },
    { title: 'Horizon Forbidden West', url: 'https://www.youtube.com/embed/Lq594XmpPBg', category: 'مغامرات' },
    { title: 'Elden Ring', url: 'https://www.youtube.com/embed/E3Huy2cdih0', category: 'أكشن' },
    { title: 'Final Fantasy XVI', url: 'https://www.youtube.com/embed/aBr2kKAHN6M', category: 'خيال' },
    { title: 'Battlefield 2042', url: 'https://www.youtube.com/embed/ASzOzrB-a9E', category: 'تصويب' },
    { title: 'Death Stranding', url: 'https://www.youtube.com/embed/tCI396HyhbQ', category: 'غامض' },
    { title: 'Watch Dogs: Legion', url: 'https://www.youtube.com/embed/3orYqGDSDUk', category: 'أكشن' },
    { title: 'Hitman 3', url: 'https://www.youtube.com/embed/qtRKdVHc-cE', category: 'تسلل' },
    { title: 'FIFA 23', url: 'https://www.youtube.com/embed/o3V-GvvzjE4', category: 'رياضة' },
    { title: 'Forza Horizon 5', url: 'https://www.youtube.com/embed/FYH9n37B7Yw', category: 'سباق' },
    { title: 'Need for Speed Heat', url: 'https://www.youtube.com/embed/9ewiJJe_nYI', category: 'سباق' },
    { title: 'The Last of Us Part I', url: 'https://www.youtube.com/embed/W2Wnvvj33Wo', category: 'دراما' },
    { title: 'Ghost of Tsushima', url: 'https://www.youtube.com/embed/Zbq7BnsQhrw', category: 'ساموراي' },
    { title: 'Valorant', url: 'https://www.youtube.com/embed/e_E9W2vsRbQ', category: 'تصويب' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', ...new Set(allVideos.map((v) => v.category))];

  const filteredVideos = allVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'الكل' || video.category === selectedCategory)
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1300px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🎬 فيديوهات الألعاب</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="🔍 ابحث عن لعبة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '250px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              📂 {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredVideos.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: 'gray' }}>❌ لا توجد فيديوهات مطابقة للبحث أو التصنيف.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredVideos.map((video, index) => (
            <div key={index} style={{
              background: '#f9f9f9',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={video.url}
                  title={video.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div style={{ padding: '10px', textAlign: 'center' }}>
                <p style={{ fontWeight: 'bold' }}>{video.title}</p>
                <p style={{ fontSize: '12px', color: '#777' }}>📂 {video.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Videos;
