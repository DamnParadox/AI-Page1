import React, { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ImageGrid from './components/ImageGrid'

function App() {
  const [activeTab, setActiveTab] = useState<'featured' | 'my'>('featured')

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
              我的 (1)
            </li>
          </ul>
        </nav>
        <ImageGrid activeTab={activeTab} />
      </main>
    </div>
  )
}

export default App