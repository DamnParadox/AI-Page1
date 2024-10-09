import React from 'react'
import { Aperture, MessageSquare } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Aperture size={24} className="text-pink-500" />
          <h1 className="text-xl font-bold">海螺AI 创意视频平台</h1>
        </div>
        <div className="flex space-x-4">
          <button className="bg-gray-700 px-3 py-1 rounded-md flex items-center space-x-1 hover:bg-gray-600 transition-colors duration-200">
            <MessageSquare size={16} />
            <span>Discord</span>
          </button>
          <button className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition-colors duration-200">创作者讨论</button>
        </div>
      </div>
    </header>
  )
}

export default Header