import React, { useCallback, useState } from 'react'
import Image from 'next/image'

export default function ZommImage({ src, alt}: { src: string; alt: string }) {
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomVisible, setIsZoomVisible] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageSize({
        width: event.currentTarget.naturalWidth,
        height: event.currentTarget.naturalHeight,
      });
    }, []);
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }, []);
  return (
    <div 
      className="relative aspect-square rounded-md overflow-hidden bg-gray-50 cursor-zoom-in"
      onMouseEnter={() => setIsZoomVisible(true)}
      onMouseLeave={() => setIsZoomVisible(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      {isZoomVisible && (
        <div className="absolute top-0 left-full ml-4 w-[300px] h-[300px] overflow-hidden border border-gray-300 bg-white shadow-lg">
          <Image
            src={src}
            alt={alt}
            width={imageSize.width}
            height={imageSize.height}
            className="object-cover"
            style={{
              transform: `translate(-${zoomPosition.x}%, -${zoomPosition.y}%) scale(2)`,
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
            onLoad={handleImageLoad}
          />
        </div>
      )}
    </div>
  )
}
