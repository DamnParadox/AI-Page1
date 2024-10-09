import React, { useState } from 'react'

const featuredImages = [
  {
    id: 1,
    src: 'https://img0.baidu.com/it/u=1058961982,3919091402&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1728579600&t=dd2c721af9af4dc8550c4da67cab544c',
    title: '不可能的地球',
    subtitle: '视频征集大赛',
    prompt: '一个充满奇幻元素的地球景观，飞翔的岛屿和不可思议的生物',
    link: 'https://hailuoai.com/video'
  },
  { 
    id: 2, 
    src: 'https://img0.baidu.com/it/u=1058961982,3919091402&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1728579600&t=dd2c721af9af4dc8550c4da67cab544c',
    prompt: '熊熊燃烧的火焰，象征着力量和激情'
  },
  { 
    id: 3, 
    src: 'https://img0.baidu.com/it/u=1058961982,3919091402&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1728579600&t=dd2c721af9af4dc8550c4da67cab544c',
    prompt: '未来科技城市，高楼大厦间穿梭着飞行器'
  },
  { 
    id: 4, 
    src: 'https://img0.baidu.com/it/u=1058961982,3919091402&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1728579600&t=dd2c721af9af4dc8550c4da67cab544c',
    prompt: '史诗级战斗场景，两军对垒'
  },
  { 
    id: 5, 
    src: 'https://img0.baidu.com/it/u=1058961982,3919091402&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1728579600&t=dd2c721af9af4dc8550c4da67cab544c',
    prompt: '繁华都市的夜景，霓虹灯闪烁'
  },
  { 
    id: 6, 
    src: 'https://img0.baidu.com/it/u=1058961982,3919091402&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1728579600&t=dd2c721af9af4dc8550c4da67cab544c',
    prompt: '沉浸式游戏体验，玩家正在虚拟世界中探索'
  },
  { 
    id: 7, 
    src: 'https://img0.baidu.com/it/u=1058961982,3919091402&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1728579600&t=dd2c721af9af4dc8550c4da67cab544c',
    prompt: '豪华庄园，展现富丽堂皇的内部装潢'
  },
]

const myImages = [
  { 
    id: 1, 
    src: 'https://img0.baidu.com/it/u=1058961982,3919091402&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1728579600&t=dd2c721af9af4dc8550c4da67cab544c',
    prompt: '我的个人创作，展现独特的艺术风格'
  },
]

interface ImageGridProps {
  activeTab: 'featured' | 'my'
}

const ImageGrid: React.FC<ImageGridProps> = ({ activeTab }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const images = activeTab === 'featured' ? featuredImages : myImages;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div 
          key={image.id} 
          className={`relative overflow-hidden rounded-lg ${index !== 0 || activeTab !== 'featured' ? 'group' : ''}`}
          onMouseEnter={() => (index !== 0 || activeTab !== 'featured') && setHoveredId(image.id)}
          onMouseLeave={() => (index !== 0 || activeTab !== 'featured') && setHoveredId(null)}
        >
          <img src={image.src} alt="" className="w-full h-48 object-cover" />
          {image.title && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-lg font-bold">{image.title}</h3>
              <p className="text-sm">{image.subtitle}</p>
              <a 
                href={image.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-2 bg-white text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors duration-200 inline-block"
              >
                GO
              </a>
            </div>
          )}
          {hoveredId === image.id && (index !== 0 || activeTab !== 'featured') && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-white text-center">{image.prompt}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageGrid