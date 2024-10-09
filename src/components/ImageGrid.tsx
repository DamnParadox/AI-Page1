import React, { useState, useEffect } from 'react';

interface ImageGridProps {
  activeTab: 'featured' | 'my';
  onMyImagesCountChange: (count: number) => void;  // 新增回调函数
}

const ImageGrid: React.FC<ImageGridProps> = ({ activeTab, onMyImagesCountChange }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [featuredImages, setFeaturedImages] = useState<any[]>([]);
  const [myImages, setMyImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      let url = '';
      let headers = {};

      url = '/proxy/v2/api/multimodal/video/my/cursor?type=next&currentID=0&limit=12&scene=list&device_platform=web&app_id=3001&version_code=22201&uuid=eb389e4e-5305-4d98-9e97-fc8c1a978266&device_id=299362015985942537&os_name=Windows&browser_name=chrome&device_memory=8&cpu_core_num=32&browser_language=zh-CN&browser_platform=Win32&screen_width=2560&screen_height=1440&unix=1728231307000';
      headers = {
        'Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzE2ODczMDcsInVzZXIiOnsiaWQiOiIyOTkzNjIwMTYyMDQwNTQ1MjkiLCJuYW1lIjoi5bCP6J665bi9NDUyOSIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnlpbmdzaGktYWkuY29tL3Byb2QvdXNlcl9hdmF0YXIvMTcwNjI2NzU5ODg3NTg5OTk1My0xNzMxOTQ1NzA2Njg5NjU4OTZvdmVyc2l6ZS5wbmciLCJkZXZpY2VJRCI6IjI5OTM2MjAxNTk4NTk0MjUzNyIsImlzQW5vbnltb3VzIjp0cnVlfX0.CwdI2QTjAax-Dwz4oQTLTH_hUErBOw2_1WVS6EJ2MZA',
        'Yy': 'd8dea9ba1bd22dcdd215903a5c74a541',
      };

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: headers
        });
        const data = await response.json();

        if (data.data && data.data.videos) {
          setMyImages(data.data.videos);
          onMyImagesCountChange(data.data.videos.length);  // 更新 myImages 长度
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    fetchImages();
  }, [activeTab, onMyImagesCountChange]);

  const images = activeTab === 'featured' ? featuredImages : myImages;

  return (
    <div className="image-grid">
      {images.length === 0 ? (
        <p>暂无数据</p>
      ) : (
        images.map((image, index) => (
          <div
            key={image.id}
            className="image-item"
            onMouseEnter={() => (index !== 0 || activeTab !== 'featured') && setHoveredId(image.id)}
            onMouseLeave={() => (index !== 0 || activeTab !== 'featured') && setHoveredId(null)}
          >
            <video src={image.videoURL} controls width="100%" />
            {image.title && (
              <div className="image-info">
                <h3>{image.title}</h3>
                <p>{image.subtitle}</p>
                <a href={image.link} target="_blank" rel="noopener noreferrer">GO</a>
              </div>
            )}
            {hoveredId === image.id && (index !== 0 || activeTab !== 'featured') && (
              <div className="image-hover-prompt">
                <p>{image.prompt}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ImageGrid;
