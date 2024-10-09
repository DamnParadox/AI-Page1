import React, { forwardRef } from 'react';    
    
interface ImageGridProps {    
  activeTab: 'featured' | 'my';    
  myProcess: { id: string; percent: number }[];    
  onMyImagesCountChange: (count: number) => void;    
}    
    
const ImageGrid: React.FC<ImageGridProps> = ({ activeTab, myProcess, onMyImagesCountChange }) => {    
  const [featuredImages, setFeaturedImages] = React.useState<any[]>([]);    
  const [myImages, setMyImages] = React.useState<any[]>([]);    
    
  React.useEffect(() => {    
    const fetchImages = async () => {    
      let url = '';    
      let headers = {};    
    
      url = 'https://api.1mountain.site/api/proxy/v2/api/multimodal/video/my/cursor?type=next&currentID=0&limit=12&scene=list&device_platform=web&app_id=3001&version_code=22201&uuid=eb389e4e-5305-4d98-9e97-fc8c1a978266&device_id=299362015985942537&os_name=Windows&browser_name=chrome&device_memory=8&cpu_core_num=32&browser_language=zh-CN&browser_platform=Win32&screen_width=2560&screen_height=1440&unix=1728231307000';    
      headers = {    
        'Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzE2ODczMDcsInVzZXIiOnsiaWQiOiIyOTkzNjIwMTYyMDQwNTQ1MjkiLCJuYW1lIjoi5bCP6J665bi9NDUyOSIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnlpbmdzaGktYWkuY29tL3Byb2QvdXNlcl9hdmF0YXIvMTcwNjI2NzU5ODg3NTg5OTk1My0xNzMxOTQ1NzA2Njg5NjU4OTZvdmVyc2l6ZS5wbmciLCJkZXZpY2VJRCI6IjI5OTM2MjAxNTk4NTk0MjUzNyIsImlzQW5vbnltb3VzIjp0cnVlfX0.CwdI2QTjAax-Dwz4oQTLTH_hUErBOw2_1WVS6EJ2MZA',    
        'Yy': 'd8dea9ba1bd22dcdd215903a5c74a541',    
      };    
    
      try {    
        const response = await fetch(url, {    
          method: 'GET',    
          headers: headers,    
        });    
        const data = await response.json();    
       
        if (data.data && data.data.videos) {    
          setMyImages(data.data.videos);    
          onMyImagesCountChange(data.data.videos.length); // 更新 myImages 长度    
        }    
      } catch (error) {    
        console.error('获取数据失败:', error);    
      }    
    };    
    
    fetchImages();    
  }, [activeTab, onMyImagesCountChange]);    
    
  const images = activeTab === 'featured' ? featuredImages : myImages;    
    
  return (    
    <div className="image-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">    
      {/* 渲染 myProcess */}    
      {activeTab === 'my' && (    
        <>    
          {myProcess.map((process) => (    
            <div key={process.id} className="relative bg-gray-800 rounded-md p-4 flex flex-col items-center justify-center">    
              {/* 圆形进度条 */}    
              <svg className="w-24 h-24 transform -rotate-90">    
                <circle    
                  className="text-gray-700"    
                  strokeWidth="4"    
                  fill="transparent"    
                  r="40"    
                  cx="50%"    
                  cy="50%"    
                />    
                <circle    
                  className="text-pink-500"    
                  strokeWidth="4"    
                  fill="transparent"    
                  r="40"    
                  cx="50%"    
                  cy="50%"    
                  strokeDasharray={251.2} // 2 * Math.PI * 40    
                  strokeDashoffset={251.2 - (process.percent / 100) * 251.2}    
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}    
                />    
                <text    
                  x="50%"    
                  y="50%"    
                  textAnchor="middle"    
                  dy=".3em"    
                  className="text-white font-semibold"    
                  transform="rotate(90, 80, 80)"    
                >    
                  {process.percent}%    
                </text>    
              </svg>    
              <p className="mt-2 text-center">任务 ID: {process.id}</p>    
            </div>    
          ))}    
        </>    
      )}    
    
      {images.length === 0 ? (    
        <p className="col-span-full text-center text-gray-400">暂无数据</p>    
      ) : (    
        images.map((image: any) => (    
          <div key={image.id} className="image-item bg-gray-800 rounded-md overflow-hidden">    
            <video src={image.videoURL} controls className="w-full h-auto" />    
            {image.title && (    
              <div className="image-info p-4">    
                <h3 className="text-lg font-semibold">{image.title}</h3>    
                <p className="text-gray-400">{image.subtitle}</p>    
                <a href={image.link} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">    
                  GO    
                </a>    
              </div>    
            )}    
          </div>    
        ))    
      )}    
    </div>    
  );    
};    
    
export default React.forwardRef(ImageGrid);
