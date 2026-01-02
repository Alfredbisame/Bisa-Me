import Image from 'next/image';
import { getImageUrl } from '@/app/components/ProductDetails/utils/imageUtils';
import { Image as ImageIcon } from 'lucide-react';

interface ImageThumbnailsProps {
  images: string[];
  currentIndex: number;
  onImageSelect: (index: number) => void;
  onImageError?: (index: number) => void;
  isImageError?: (index: number) => boolean;
}

const ImageThumbnails = ({ 
  images, 
  currentIndex, 
  onImageSelect, 
  onImageError,
  isImageError 
}: ImageThumbnailsProps) => {
  const handleImageError = (index: number) => {
    onImageError?.(index);
  };

  const getProcessedImageUrl = (imageUrl: string) => {
    return getImageUrl(imageUrl, 80, 80); // Thumbnail size
  };

  return (
    <div className="flex space-x-3 overflow-x-auto pb-2">
      {images.map((image, index) => {
        const hasError = isImageError?.(index) || false;
        
        return (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              index === currentIndex
                ? 'border-blue-500 shadow-lg scale-105'
                : 'border-gray-200 hover:border-gray-300 hover:scale-102'
            }`}
          >
            {!hasError ? (
              <Image
                src={getProcessedImageUrl(image)}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ImageThumbnails;
