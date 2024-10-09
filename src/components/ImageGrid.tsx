import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ImageGridProps {
  activeTab: 'featured' | 'my';
  onMyImagesCountChange: (count: number) => void;
}

interface MyProcess {
  id: string;
  videos: any[];
}

const ImageGrid = forwardRef<{ fetchMyImages: () => void }, ImageGridProps>(({ activeTab, onMyImagesCountChange }, ref) => {
  const [featuredImages, setFeaturedImages] = useState<any[]>([]);
  const [myImages, setMyImages] = useState<any[]>([]);
  const [myProcess, setMyProcess] = useState<MyProcess>({ id: '', videos: [] });

  const fetchMyImages = async () => {
    const url = 'https://api.1mountain.site/api/proxy/v2/api/multimodal/video/my/cursor?type=next&currentID=0&limit=12&scene=list&device_platform=web&app_id=3001&version_code=22201&uuid=eb389e4e-5305-4d98-9e97-fc8c1a978266&device_id=299362015985942537&os_name=Windows&browser_name=chrome&device_memory=8&cpu_core_num=32&browser_language=zh-CN&browser_platform=Win32&screen_width=2560&screen_height=1440&unix=1728231307000';
    const headers = {
      'Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzE2ODczMDcsInVzZXIiOnsiaWQiOiIyOTkzNjIwMTYyMDQwNTQ1MjkiLCJuYW1lIjoi5bCP6J665bi9NDUyOSIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnlpbmdzaGktYWkuY29tL3Byb2QvdXNlcl9hdmF0YXIvMTcwNjI2NzU5ODg3NTg5OTk1My0xNzMxOTQ1NzA2Njg5NjU4OTZvdmVyc2l6ZS5wbmciLCJkZXZpY2VJRCI6IjI5OTM2MjAxNTk4NTk0MjUzNyIsImlzQW5vbnltb3VzIjp0cnVlfX0.CwdI2QTjAax-Dwz4oQTLTH_hUErBOw2_1WVS6EJ2MZA',
      'Yy': 'd8dea9ba1bd22dcdd215903a5c74a541',
    };

    try {
      const response = await fetch(url, { method: 'GET', headers: headers });
      const data = await response.json();

      if (data.data && data.data.videos) {
        await setMyImages(data.data.videos.filter((video: { status: number; }) => video.status != 1));
        await onMyImagesCountChange(data.data.videos.length);

        // 筛选状态为1的数据id
        const processingIds = data.data.videos
          .filter((video: any) => video.status === 1)
          .map((video: any) => video.id)
          .join(',');

        console.log("id为：", processingIds);

        // 如果有正在处理的视频，开始轮询
        if (processingIds) {
          pollProcessingVideos(processingIds);
        } else{
          setMyProcess(prev => ({ ...prev, id: '' }));
        }
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  };

  const pollProcessingVideos = useCallback(async (id: any) => {
    const processingIds = id;
    console.log("MyProcess为：", myProcess.id);
    if(!processingIds) return;

    const pollUrl = 'https://api.1mountain.site/api/proxy/api/multimodal/video/processing?idList='+ processingIds +'&device_platform=web&app_id=3001&version_code=22201&uuid=eb389e4e-5305-4d98-9e97-fc8c1a978266&device_id=299362015985942537&os_name=Windows&browser_name=chrome&device_memory=8&cpu_core_num=32&browser_language=zh-CN&browser_platform=Win32&screen_width=2560&screen_height=1440&unix=1728230686000'; // 请替换为实际的API地址
    const pollHeaders = {
      'Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzE2ODczMDcsInVzZXIiOnsiaWQiOiIyOTkzNjIwMTYyMDQwNTQ1MjkiLCJuYW1lIjoi5bCP6J665bi9NDUyOSIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnlpbmdzaGktYWkuY29tL3Byb2QvdXNlcl9hdmF0YXIvMTcwNjI2NzU5ODg3NTg5OTk1My0xNzMxOTQ1NzA2Njg5NjU4OTZvdmVyc2l6ZS5wbmciLCJkZXZpY2VJRCI6IjI5OTM2MjAxNTk4NTk0MjUzNyIsImlzQW5vbnltb3VzIjp0cnVlfX0.CwdI2QTjAax-Dwz4oQTLTH_hUErBOw2_1WVS6EJ2MZA',
      'Yy': 'd8dea9ba1bd22dcdd215903a5c74a541',
    };

    const pollInterval = setInterval(async () => {
      try {
        
        console.log("发出请求：", processingIds);
        const response = await fetch(pollUrl, { method: 'GET', headers: pollHeaders });
        const dataRes = await response.json();
        const data = dataRes.data

        if (data.processing && data.videos.length>0) {
          await setMyProcess(prev => ({ ...prev, videos: data.videos }));
        } else {
          console.log("停止获取状态")
          await setMyProcess(prev => ({ ...prev, videos: [] }));
          // 如果返回数据为空，结束轮询
          clearInterval(pollInterval);
          // 重新获取我的图片列表
          fetchMyImages();
        }
      } catch (error) {
        console.error('轮询失败:', error);
        clearInterval(pollInterval);
      }
    }, 3000);

    // 清理函数
    return () => clearInterval(pollInterval);
  }, []);

  const renderProcessingVideos = () => {
    return myProcess.videos.map((video) => (
      <div key={video.id} className="bg-gray-800 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-center mb-4">
          <div style={{ width: '100px', height: '100px' }}>
            <CircularProgressbar
              value={video.percent || 0}
              text={`${video.percent || 0}%`}
              styles={buildStyles({
                textColor: '#fff',
                pathColor: '#10B981',
                trailColor: '#374151',
              })}
            />
          </div>
        </div>
        <p className="text-sm text-center">
          {video.percent === 0 ? video.message : video.desc}
        </p>
      </div>
    ));
  };

  useImperativeHandle(ref, () => ({
    fetchMyImages
  }));

  useEffect(() => {
    fetchMyImages();
  }, [activeTab, onMyImagesCountChange]);

  const images = activeTab === 'featured' ? featuredImages : myImages;

  return (
    <div className="image-grid">
      {activeTab === 'my' && myProcess.videos.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">正在处理的视频</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {renderProcessingVideos()}
          </div>
        </div>
      )}
      {images.length === 0 ? (
        <p className="text-gray-400 text-center py-8">暂无数据</p>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">已生成的视频</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="image-item bg-gray-700 rounded-lg overflow-hidden shadow-md">
                <video src={image.videoURL} controls width="100%" className="w-full" />
                <div className="image-info p-3">
                  <p className="text-sm text-gray-300">{image.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ImageGrid;