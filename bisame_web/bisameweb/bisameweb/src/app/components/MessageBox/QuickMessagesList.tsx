'use client';

import React, { useState, useRef, useEffect } from 'react';
import QuickMessageButton from './QuickMessageButton';

interface QuickMessagesListProps {
  onMessageSelect: (message: string) => void;
  selectedMessage?: string;
}

const QUICK_MESSAGES = [
  "Make an offer",
  "Is this available?",
  "What's your best price?",
  "Can I see more photos?",
  "What's the condition?",
  "Is delivery available?",
  "Can we negotiate?",
  "Where is the location?",
  "Is this still for sale?",
  "Can I inspect it first?",
  "What payment methods do you accept?",
  "How old is this item?",
  "Any warranty included?",
  "Can you hold it for me?",
  "Is the price negotiable?"
];

const QuickMessagesList: React.FC<QuickMessagesListProps> = ({ 
  onMessageSelect, 
  selectedMessage 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const timer = setTimeout(() => setShowScrollHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleMessageSelect = (message: string) => {
    onMessageSelect(message);
    setShowScrollHint(false);
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="px-6 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-gray-700">Quick messages</h4>
          {showScrollHint && (
            <span className="text-xs text-blue-500 animate-pulse flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Scroll for more
            </span>
          )}
        </div>
      </div>
      
      {/* Scrollable Container */}
      <div className="relative px-6 py-4">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center group"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center group"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Messages Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {QUICK_MESSAGES.map((message, index) => (
            <QuickMessageButton
              key={index}
              message={message}
              onClick={handleMessageSelect}
              variant={index < 5 ? 'primary' : 'secondary'}
              isActive={selectedMessage === message}
            />
          ))}
        </div>
        
        {/* Gradient Overlays for Visual Scroll Indication */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-5" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-5" />
        )}
      </div>
    </div>
  );
};

export default QuickMessagesList;
