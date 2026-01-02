'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import ImageModal from './ImageModal';
import ImageThumbnails from './ImageThumbnails';
import { getImageUrl } from '@/app/components/ProductDetails/utils/imageUtils';

interface StoreImageGalleryProps {
  images: string[];
}

const StoreImageGallery = ({ images }: StoreImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-lg font-medium">No images uploaded yet</p>
        <p className="text-sm">Upload some images to showcase your store</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const getProcessedImageUrl = (imageUrl: string, width = 800, height = 600) => {
    return getImageUrl(imageUrl, width, height);
  };

  const getCurrentImageUrl = () => {
    const currentImage = images[currentImageIndex];
    return getProcessedImageUrl(currentImage);
  };

  const isImageError = (index: number) => {
    return imageErrors.has(index);
  };

  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="relative group">
        <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-md">
          {!isImageError(currentImageIndex) ? (
            <Image
              src={getCurrentImageUrl()}
              alt={`Store image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => handleImageError(currentImageIndex)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center text-gray-500">
                <ImageIcon className="w-16 h-16 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Image failed to load</p>
              </div>
            </div>
          )}
          
          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}
            
            {/* Expand Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <Expand className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <ImageThumbnails
          images={images}
          currentIndex={currentImageIndex}
          onImageSelect={setCurrentImageIndex}
          onImageError={handleImageError}
          isImageError={isImageError}
        />
      )}

      {/* Full Screen Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        onImageError={handleImageError}
        isImageError={isImageError}
      />
    </div>
  );
};

export default StoreImageGallery;
