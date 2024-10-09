import React, { useState, useRef } from 'react';    
import Header from './components/Header';    
import SearchBar from './components/SearchBar';    
import ImageGrid from './components/ImageGrid';    
    
interface ProcessItem {    
  id: string;    
  percent: number;    
}    
    
function App() {    
  const [activeTab, setActiveTab] = useState<'featured' | 'my'>('featured');    
  const [myImagesCount, setMyImagesCount] = useState(0); // 保存 myImages 的长度    
  const [myProcess, setMyProcess] = useState<ProcessItem[]>([]); // 保存任务状态    
  const imageGridRef = useRef(null);

  // 添加或更新任务状态    
  const addOrUpdateProcess = (newItem: ProcessItem) => {    
    setMyProcess((prev) => {    
      const existing = prev.find(item => item.id === newItem.id);    
      if (existing) {    
        return prev.map(item => item.id === newItem.id ? newItem : item);    
      }    
      return [...prev, newItem];    
    });    
  };    
    
  // 移除完成的任务    
  const removeProcess = (id: string) => {    
    setMyProcess((prev) => prev.filter(item => item.id !== id));    
  };    
    
  const refreshMyImages = () => {
    if (imageGridRef.current) {
      imageGridRef.current.refreshMyImages();
    }
  };

  return (    
    <div className="min-h-screen bg-gray-900 text-white">    
      <Header />    
      <main className="container mx-auto px-4 py-8">    
        {/* 传递添加和移除任务的回调函数 */}    
        <SearchBar onAddOrUpdateProcess={addOrUpdateProcess} onRemoveProcess={removeProcess} onRefreshMyImages={refreshMyImages} />    
        <nav className="mt-6 mb-8">    
          <ul className="flex space-x-4">    
            <li    
              className={`cursor-pointer ${    
                activeTab === 'featured'    
                  ? 'font-semibold border-b-2 border-white pb-1'    
                  : 'text-gray-400 hover:text-gray-200'    
              }`}    
              onClick={() => setActiveTab('featured')}    
            >    
              精选    
            </li>    
            <li    
              className={`cursor-pointer ${    
                activeTab === 'my'    
                  ? 'font-semibold border-b-2 border-white pb-1'    
                  : 'text-gray-400 hover:text-gray-200'    
              }`}    
              onClick={() => setActiveTab('my')}    
            >    
              我的 ({myImagesCount})    
            </li>    
          </ul>    
        </nav>    
        {/* 传递 myProcess */}    
        <ImageGrid    
          ref={imageGridRef}    
          activeTab={activeTab}    
          myProcess={myProcess}    
          onMyImagesCountChange={setMyImagesCount}    
        />    
      </main>    
    </div>    
  );    
}    
    
export default App;    
