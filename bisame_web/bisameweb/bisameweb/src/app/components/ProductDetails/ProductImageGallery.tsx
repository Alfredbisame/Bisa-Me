"use client";

import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Product } from './ProductDetail';
import MainImageDisplay from './MainImageDisplay';
import ThumbnailNavigation from './ThumbnailNavigation';
import FullscreenModal from './FullscreenModal';
import { useImageGallery } from './hooks/useImageGallery';

interface ProductImageGalleryProps {
  product: Product;
}

const   ProductImageGallery: FC<ProductImageGalleryProps> = ({ product }) => {
  const {
    currentImageIndex,
    thumbnailStartIndex,
    isFullscreen,
    mainImageUrl,
    visibleThumbnails,
    handlePrevImage,
    handleNextImage,
    handleImageSelect,
    handleOpenFullscreen,
    handleCloseFullscreen
  } = useImageGallery(product);

  return (
    <div className="flex-1 flex flex-col items-center w-full md:w-1/3">
      <MainImageDisplay
        imageUrl={mainImageUrl}
        imageAlt={product.title}
        onImageClick={handleOpenFullscreen}
      />
                
      <AnimatePresence>
        <FullscreenModal
          isOpen={isFullscreen}
          imageUrl={mainImageUrl}
          imageAlt="Zoomed Product"
          onClose={handleCloseFullscreen}
          onPrevImage={handlePrevImage}
          onNextImage={handleNextImage}
        />
      </AnimatePresence>
      
      <ThumbnailNavigation
        thumbnails={visibleThumbnails}
        currentImageIndex={currentImageIndex}
        thumbnailStartIndex={thumbnailStartIndex}
        onImageSelect={handleImageSelect}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        totalImages={product.images?.length || 0}
      />
    </div>
  );
};

export default ProductImageGallery;