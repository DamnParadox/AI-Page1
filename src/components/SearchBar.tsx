import React from 'react'
import { Image, Edit2 } from 'lucide-react'

const SearchBar: React.FC = () => {
  return (
    <div className="relative">
      <textarea
        placeholder="请描述您生成的视频内容"
        className="w-full h-[130px] bg-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
      />
      <button className="absolute left-2 bottom-[10px] bg-gray-700 text-white rounded-md p-2 hover:bg-gray-600 transition-colors duration-200">
        <Edit2 size={20} />
      </button>
      <button className="absolute right-2 bottom-[10px] bg-white text-gray-800 rounded-md px-3 py-2 flex items-center space-x-1 hover:bg-gray-200 transition-colors duration-200">
        <Image size={20} />
        <span>生成</span>
      </button>
    </div>
  )
}

export default SearchBar