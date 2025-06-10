import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // مسار ملف firebase.js
import { collection, getDocs } from 'firebase/firestore';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videoList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVideos(videoList);
        setLoading(false);
      } catch (error) {
        console.error('خطأ في جلب الفيديوهات:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📺 فيديوهات الألعاب</h1>

      {loading ? (
        <p className="text-center">جاري تحميل الفيديوهات...</p>
      ) : videos.length === 0 ? (
        <p className="text-center">لا توجد فيديوهات متاحة حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{video.title}</h2>
                <p className="text-gray-600 text-sm mt-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideosPage;
