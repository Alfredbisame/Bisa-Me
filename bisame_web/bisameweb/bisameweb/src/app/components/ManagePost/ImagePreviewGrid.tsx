import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { getImageUrl } from '../ProductDetails/utils/imageUtils';
import Image from 'next/image';

interface ImagePreviewGridProps {
  images: string[];
  onRemove: (index: number) => void;
}

const ImagePreviewGrid: React.FC<ImagePreviewGridProps> = ({ images, onRemove }) => {
  if (!images.length) return null;
  return (
    <div className="mb-4">
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, idx) => (
          <div key={idx} className="relative group rounded overflow-hidden shadow border border-gray-200">
            <div className="w-full h-20 relative">
              <Image
                src={getImageUrl(img)}
                alt={`Product image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <button
              type="button"
              className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-red-500 hover:text-white hover:bg-red-500 shadow transition-colors z-10"
              onClick={() => onRemove(idx)}
              aria-label="Remove image"
            >
              <FaTimesCircle size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewGrid;