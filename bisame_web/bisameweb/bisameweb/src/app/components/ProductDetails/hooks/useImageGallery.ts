"use client";

import { useState, useEffect } from 'react';
import { Product } from '../ProductDetail';
import { getImageUrl } from '../utils/imageUtils';

export const useImageGallery = (product: Product) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Prevent scrolling when image is fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (product?.images?.length) {
      setCurrentImageIndex(product.images.length - 1);
    }
  };

  const handleNextImage = () => {
    if (product?.images?.length && currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleOpenFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  // Get current main image with dimensions using imageUtils
  const mainImageUrl = product.images[currentImageIndex]?.imageUrl 
    ? getImageUrl(product.images[currentImageIndex].imageUrl, 800, 800) 
    : '/f4.png';
  
  // Get visible thumbnails (up to 6) using imageUtils
  const visibleThumbnails = product.images?.length > 0
    ? product.images.slice(0, 6)
    : [{ imageUrl: mainImageUrl, id: 'default' }];

  return {
    currentImageIndex,
    thumbnailStartIndex: 0,
    isFullscreen,
    mainImageUrl,
    visibleThumbnails,
    handlePrevImage,
    handleNextImage,
    handleImageSelect,
    handleOpenFullscreen,
    handleCloseFullscreen
  };
};