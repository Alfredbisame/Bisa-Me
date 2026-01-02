import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { getImageUrl } from '@/app/components/ProductDetails/utils/imageUtils';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onImageError?: (index: number) => void;
  isImageError?: (index: number) => boolean;
}

const ImageModal = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onIndexChange,
  onImageError,
  isImageError 
}: ImageModalProps) => {
  if (!isOpen) return null;

  const nextImage = () => {
    onIndexChange((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  const handleImageError = (index: number) => {
    onImageError?.(index);
  };

  const getProcessedImageUrl = (imageUrl: string) => {
    return getImageUrl(imageUrl, 1200, 800); // Modal size
  };

  const hasError = isImageError?.(currentIndex) || false;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </>
      )}

      {/* Image */}
      <div className="max-w-4xl max-h-[90vh] mx-4">
        {!hasError ? (
          <Image
            src={getProcessedImageUrl(images[currentIndex])}
            alt={`Store image ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain"
            onError={() => handleImageError(currentIndex)}
          />
        ) : (
          <div className="max-w-full max-h-full flex items-center justify-center">
            <div className="text-center text-white">
              <ImageIcon className="w-24 h-24 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Image failed to load</p>
              <p className="text-sm text-gray-400">Please try again later</p>
            </div>
          </div>
        )}
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageModal;
