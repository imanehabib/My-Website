import React from 'react';
import './VideoGallery.css';

function VideoGallery() {
  const videos = [
    {
      title: 'Cyberpunk 2077 Trailer',
      url: 'https://www.youtube.com/embed/qIcTM8WXFjk',
    },
    {
      title: 'Red Dead Redemption 2',
      url: 'https://www.youtube.com/embed/eaW0tYpxyp0',
    },
    {
      title: 'Dota 2 - The International',
      url: 'https://www.youtube.com/embed/-cSFPIwMEq4',
    },
  ];

  return (
    <div className="video-gallery">
      <h1>🎥 معرض الفيديوهات</h1>
      <div className="videos-grid">
        {videos.map((video, index) => (
          <div className="video-card" key={index}>
            <iframe
              src={video.url}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoGallery;

