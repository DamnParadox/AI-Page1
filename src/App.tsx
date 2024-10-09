import React, { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ImageGrid from './components/ImageGrid'

function App() {
  const [activeTab, setActiveTab] = useState<'featured' | 'my'>('featured');
  const [myImagesCount, setMyImagesCount] = useState(0);  // 新增状态，用于保存 myImages 的长度

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar />
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
              我的 ({myImagesCount})  {/* 动态展示 myImages 的长度 */}
            </li>
          </ul>
        </nav>
        <ImageGrid activeTab={activeTab} onMyImagesCountChange={setMyImagesCount} /> {/* 传递回调函数 */}
      </main>
    </div>
  );
}

export default App;
