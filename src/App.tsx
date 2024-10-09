import React, { useState, useRef, useEffect } from 'react';    
import Header from './components/Header';    
import SearchBar from './components/SearchBar';    
import ImageGrid from './components/ImageGrid';    
    
interface ProcessItem {    
  id: string;    
  percent: number;
  desc: string;
  videos: any[]; // 新增 videos 字段
}    
    
function App() {    
  const [activeTab, setActiveTab] = useState<'featured' | 'my'>('featured');    
  const [myImagesCount, setMyImagesCount] = useState(0);    
  const [myProcess, setMyProcess] = useState<ProcessItem[]>([]);    
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const imageGridRef = useRef(null);

  const addOrUpdateProcess = (newItem: ProcessItem) => {    
    setMyProcess([newItem]); // 直接替换整个 myProcess 数组
  };    
    
  const removeProcess = () => {    
    setMyProcess([]); // 清空 myProcess 数组
  };    
    
  const refreshMyImages = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (    
    <div className="min-h-screen bg-gray-900 text-white">    
      <Header />    
      <main className="container mx-auto px-4 py-8">    
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
        <ImageGrid    
          ref={imageGridRef}    
          activeTab={activeTab}    
          myProcess={myProcess}    
          onMyImagesCountChange={setMyImagesCount}    
          refreshTrigger={refreshTrigger}
          onAddOrUpdateProcess={addOrUpdateProcess}
        />    
      </main>    
    </div>    
  );    
}    
    
export default App;    
