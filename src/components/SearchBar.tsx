import React, { useState } from 'react';
import { Image, Edit2, Loader } from 'lucide-react';

interface SearchBarProps {
  onGenerateComplete: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onGenerateComplete }) => {
  const [desc, setDesc] = useState(''); // 用于保存文本域输入内容
  const [isGenerating, setIsGenerating] = useState(false);

  // 处理发送POST请求
  const handleGenerate = async () => {
    if (!desc.trim()) return;

    setIsGenerating(true);
    const url = 'https://api.1mountain.site/api/proxy/api/multimodal/generate/video?device_platform=web&app_id=3001&version_code=22201&uuid=eb389e4e-5305-4d98-9e97-fc8c1a978266&device_id=299362015985942537&os_name=Windows&browser_name=chrome&device_memory=8&cpu_core_num=32&browser_language=zh-CN&browser_platform=Win32&screen_width=2560&screen_height=1440&unix=1728232094000';
    
    const headers = {
      'Content-Type': 'application/json',
      'Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzE2ODczMDcsInVzZXIiOnsiaWQiOiIyOTkzNjIwMTYyMDQwNTQ1MjkiLCJuYW1lIjoi5bCP6J665bi9NDUyOSIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnlpbmdzaGktYWkuY29tL3Byb2QvdXNlcl9hdmF0YXIvMTcwNjI2NzU5ODg3NTg5OTk1My0xNzMxOTQ1NzA2Njg5NjU4OTZvdmVyc2l6ZS5wbmciLCJkZXZpY2VJRCI6IjI5OTM2MjAxNTk4NTk0MjUzNyIsImlzQW5vbnltb3VzIjp0cnVlfX0.CwdI2QTjAax-Dwz4oQTLTH_hUErBOw2_1WVS6EJ2MZA',
      'Yy': 'd8dea9ba1bd22dcdd215903a5c74a541',
    };

    const body = { desc }; // 将文本域的内容作为请求的body

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body) // 将请求体转换为JSON格式
      });

      const data = await response.json();
      onGenerateComplete(); // 生成完成后调用回调函数
      
    } catch (error) {
      console.error('请求失败:', error);
    } finally {
      setIsGenerating(false);
      setDesc('');
    }
  };

  return (
    <div className="relative">
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)} // 更新文本域输入
        placeholder="请描述您生成的视频内容"
        className="w-full h-[130px] bg-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
        disabled={isGenerating}
      />
      <button className="absolute left-2 bottom-[10px] bg-gray-700 text-white rounded-md p-2 hover:bg-gray-600 transition-colors duration-200">
        <Edit2 size={20} />
      </button>
      <button
        onClick={handleGenerate} // 点击按钮时发送请求
        disabled={isGenerating || !desc.trim()}
        className={`absolute right-2 bottom-[10px] rounded-md px-3 py-2 flex items-center space-x-1 transition-colors duration-200 ${
          isGenerating || !desc.trim()
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-800 hover:bg-gray-200'
        }`}
      >
        {isGenerating ? (
          <>
            <Loader size={20} className="animate-spin" />
            <span>生成中</span>
          </>
        ) : (
          <>
            <Image size={20} />
            <span>生成</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
