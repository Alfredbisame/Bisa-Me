'use client';

import React, { useEffect, useRef } from 'react';
import { ModalProps, Subcategory, ChildCategory } from './types';

const Modal: React.FC<ModalProps> = ({
  category,
  isActive,
  onSubcategoryClick,
  onChildCategoryClick,
  onClose,
  cardPosition
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isActive) {
        onClose();
      }
    };

    if (isActive) {
      document.addEventListener('keydown', handleEscape);
      // Focus the modal for accessibility
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isActive, onClose]);

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    if (onSubcategoryClick) {
      onSubcategoryClick(subcategory);
    }
  };

  const handleChildCategoryClick = (childCategory: ChildCategory) => {
    if (onChildCategoryClick) {
      onChildCategoryClick(childCategory);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (!isActive || !cardPosition) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{
        top: cardPosition.top,
        left: cardPosition.left,
        width: cardPosition.width,
        height: cardPosition.height,
      }}
      onClick={onClose}
      role="presentation"
      aria-hidden={!isActive}
    >
      <div
        ref={modalRef}
        className={`absolute w-80 bg-blue-800 rounded-xl shadow-2xl p-5 text-white flex flex-col gap-5 text-sm border-2 border-orange-500 ${isActive ? 'animate-modalSlideIn' : 'animate-modalSlideOut'}`}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${category.id}`}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
          aria-label="Close modal"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-2">
          <h3 
            id={`modal-title-${category.id}`}
            className="font-semibold text-lg select-none border-b pb-2"
            style={{ borderColor: category.textColor }}
          >
            {category.name} Options
          </h3>
        </div>

        {/* Combined Categories List */}
        <div>
          <ul 
            className="max-h-45 overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#f97316 transparent'
            }}
            tabIndex={0}
            aria-label={`List of ${category.name.toLowerCase()} options`}
          >
            {/* Subcategories */}
            {category.subcategories.map((subcategory) => (
              <li
                key={subcategory.id}
                className="py-1.5 px-2.5 rounded-md cursor-pointer transition-colors duration-200 select-none mb-1 hover:bg-orange-500 hover:text-blue-900 focus:bg-orange-500 focus:text-blue-900 focus:outline-none last:mb-0"
                tabIndex={0}
                onClick={() => handleSubcategoryClick(subcategory)}
                onKeyDown={(e) => handleKeyDown(e, () => handleSubcategoryClick(subcategory))}
                role="button"
                aria-label={`${subcategory.name} - ${subcategory.description || ''}`}
              >
                {subcategory.name}
              </li>
            ))}
            
            {/* Child Categories */}
            {category.childCategories && category.childCategories.map((childCategory) => (
              <li
                key={childCategory.id}
                className="py-1.5 px-2.5 rounded-md cursor-pointer transition-colors duration-200 select-none mb-1 hover:bg-orange-500 hover:text-blue-900 focus:bg-orange-500 focus:text-blue-900 focus:outline-none last:mb-0"
                tabIndex={0}
                onClick={() => handleChildCategoryClick(childCategory)}
                onKeyDown={(e) => handleKeyDown(e, () => handleChildCategoryClick(childCategory))}
                role="button"
                aria-label={`${childCategory.name} - ${childCategory.description || ''}`}
              >
                {childCategory.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal; 