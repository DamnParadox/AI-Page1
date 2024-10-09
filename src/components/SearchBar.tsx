import React, { useState, useEffect, useRef } from 'react';    
import { Image, Edit2 } from 'lucide-react';    
    
interface SearchBarProps {    
  onAddOrUpdateProcess: (item: { id: string; percent: number; desc: string }) => void; // 更新类型    
  onRemoveProcess: (id: string) => void;    
  onRefreshMyImages: () => void;    
}    
    
const SearchBar: React.FC<SearchBarProps> = ({ onAddOrUpdateProcess, onRemoveProcess, onRefreshMyImages }) => {    
  const [desc, setDesc] = useState('');    
  const [generatedId, setGeneratedId] = useState<string | null>(null);    
  const [isGenerating, setIsGenerating] = useState(false);
    
  const handleGenerate = async () => {    
    setIsGenerating(true);
    const url = 'https://api.1mountain.site/api/proxy/api/multimodal/generate/video?device_platform=web&app_id=3001&version_code=22201&uuid=eb389e4e-5305-4d98-9e97-fc8c1a978266&device_id=299362015985942537&os_name=Windows&browser_name=chrome&device_memory=8&cpu_core_num=32&browser_language=zh-CN&browser_platform=Win32&screen_width=2560&screen_height=1440&unix=1728232094000';    
    
    const headers = {    
      'Content-Type': 'application/json',    
      'Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzE2ODczMDcsInVzZXIiOnsiaWQiOiIyOTkzNjIwMTYyMDQwNTQ1MjkiLCJuYW1lIjoi5bCP6J665bi9NDUyOSIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnlpbmdzaGktYWkuY29tL3Byb2QvdXNlcl9hdmF0YXIvMTcwNjI2NzU5ODg3NTg5OTk1My0xNzMxOTQ1NzA2Njg5NjU4OTZvdmVyc2l6ZS5wbmciLCJkZXZpY2VJRCI6IjI5OTM2MjAxNTk4NTk0MjUzNyIsImlzQW5vbnltb3VzIjp0cnVlfX0.CwdI2QTjAax-Dwz4oQTLTH_hUErBOw2_1WVS6EJ2MZA',    
      'Yy': 'd8dea9ba1bd22dcdd215903a5c74a541',    
    };    
    
    const body = { desc };    
    
    try {    
      const response = await fetch(url, {    
        method: 'POST',    
        headers: headers,    
        body: JSON.stringify(body),    
      });    
    
      const dataRes = await response.json();    
      const data = dataRes.data
    
      console.log('Response Data:', data);    
      if (data && data.id) {    
        setGeneratedId(data.id);    
        onAddOrUpdateProcess({ id: data.id, percent: 0, desc, videos: [] });
        onRefreshMyImages();    
      }    
    } catch (error) {    
      console.error('请求失败:', error);    
    } finally {    
      setIsGenerating(false);    
    }    
  };    
    
  useEffect(() => {    
    if (!generatedId) return;
    
    const pollStatus = async () => {    
      const url = `https://api.1mountain.site/api/proxy/api/multimodal/video/processing?idList=${generatedId}&device_platform=web&app_id=3001&version_code=22201&uuid=eb389e4e-5305-4d98-9e97-fc8c1a978266&device_id=299362015985942537&os_name=Windows&browser_name=chrome&device_memory=8&cpu_core_num=32&browser_language=zh-CN&browser_platform=Win32&screen_width=2560&screen_height=1440&unix=1728230686000`;    
    
      const headers = {    
        'Content-Type': 'application/json',    
        'Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzE2ODczMDcsInVzZXIiOnsiaWQiOiIyOTkzNjIwMTYyMDQwNTQ1MjkiLCJuYW1lIjoi5bCP6J665bi9NDUyOSIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnlpbmdzaGktYWkuY29tL3Byb2QvdXNlcl9hdmF0YXIvMTcwNjI2NzU5ODg3NTg5OTk1My0xNzMxOTQ1NzA2Njg5NjU4OTZvdmVyc2l6ZS5wbmciLCJkZXZpY2VJRCI6IjI5OTM2MjAxNTk4NTk0MjUzNyIsImlzQW5vbnltb3VzIjp0cnVlfX0.CwdI2QTjAax-Dwz4oQTLTH_hUErBOw2_1WVS6EJ2MZA',    
        'Yy': 'd8dea9ba1bd22dcdd215903a5c74a541',    
      };    
    
      try {    
        const response = await fetch(url, {    
          method: 'GET',    
          headers: headers,    
        });    
        const dataRes = await response.json();    
    
        console.log('Processing Data:', dataRes.data);   
        const data = dataRes.data[0];

        if (data && data.percent !== undefined) {    
          onAddOrUpdateProcess({ id: generatedId, percent: data.percent, desc: desc, videos: data.videos || [] });
        }    

        if (!data || data.percent === 100) {    
          setGeneratedId(null);
          onRemoveProcess();
          onRefreshMyImages();
        }    
      } catch (error) {    
        console.error('获取任务状态失败:', error);    
      }    
    };    
    
    const intervalId = setInterval(pollStatus, 3000);    
    
    return () => clearInterval(intervalId);
  }, [generatedId, onAddOrUpdateProcess, onRemoveProcess, onRefreshMyImages, desc]);    
    
  return (    
    <div className="relative">    
      <textarea    
        value={desc}    
        onChange={(e) => setDesc(e.target.value)}    
        placeholder="请描述您生成的视频内容"    
        className="w-full h-[130px] bg-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"    
      />    
      <button className="absolute left-2 bottom-[10px] bg-gray-700 text-white rounded-md p-2 hover:bg-gray-600 transition-colors duration-200">    
        <Edit2 size={20} />    
      </button>    
      <button    
        onClick={handleGenerate}    
        disabled={isGenerating}    
        className={`absolute right-2 bottom-[10px] rounded-md px-3 py-2 flex items-center space-x-1 transition-colors duration-200 ${
          isGenerating ? 'bg-gray-500 cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-200'
        }`}    
      >    
        <Image size={20} />    
        <span>{isGenerating ? '生成中' : '生成'}</span>    
      </button>    
    </div>    
  );    
};    
    
export default SearchBar;    
