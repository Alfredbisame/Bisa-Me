"use client";

import { FC, useState, useRef, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaPlus,
  FaMinus,
  FaUndo,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface FullscreenModalProps {
  isOpen: boolean;
  imageUrl: string;
  imageAlt: string;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}

const FullscreenModal: FC<FullscreenModalProps> = ({
  isOpen,
  imageUrl,
  imageAlt,
  onClose,
  onPrevImage,
  onNextImage,
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const minScale = 1;
  const maxScale = 4;
  const zoomStep = 0.3;

  // Reset zoom when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [imageUrl]);

  // Reset zoom when modal closes
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + zoomStep, maxScale));
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale - zoomStep, minScale);
    setScale(newScale);
    if (newScale === minScale) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
    const newScale = Math.min(Math.max(scale + delta, minScale), maxScale);
    setScale(newScale);
    if (newScale === minScale) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale === 1) {
      // Single click to zoom in
      handleZoomIn();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Zoom controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-50">
        <button
          onClick={handleZoomIn}
          disabled={scale >= maxScale}
          className="p-3 bg-black/60 hover:bg-black/80 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Zoom in"
        >
          <FaPlus size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          disabled={scale <= minScale}
          className="p-3 bg-black/60 hover:bg-black/80 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Zoom out"
        >
          <FaMinus size={20} />
        </button>
        <button
          onClick={handleResetZoom}
          disabled={scale === 1}
          className="p-3 bg-black/60 hover:bg-black/80 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Reset zoom"
        >
          <FaUndo size={20} />
        </button>
        <div className="text-white text-center bg-black/60 rounded-full px-3 py-2 text-sm">
          {Math.round(scale * 100)}%
        </div>
      </div>

      {/* Fullscreen image container with nav arrows */}
      <div
        className="relative flex items-center justify-center w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev arrow */}
        <button
          onClick={onPrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors z-50"
          aria-label="Previous image"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* The zoomed image itself */}
        <div
          ref={imageRef}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          }}
        >
          <motion.img
            src={imageUrl}
            alt={imageAlt}
            initial={{ scale: 0.9 }}
            animate={{
              scale: scale,
              x: position.x,
              y: position.y,
            }}
            transition={{ duration: 0.2 }}
            className="max-w-full max-h-full object-contain rounded select-none"
            onClick={handleImageClick}
            draggable={false}
            style={{
              transformOrigin: "center center",
            }}
          />
        </div>

        {/* Next arrow */}
        <button
          onClick={onNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors z-50"
          aria-label="Next image"
        >
          <FaArrowRight size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export default FullscreenModal;
