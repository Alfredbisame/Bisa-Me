'use client';

import React, { useRef, useEffect, useState } from 'react';
import { CategoryCardProps, CardPosition } from './types';
import Modal from './Modal';
import Image from 'next/image';
import styles from './styles.module.css';

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isActive,
  onToggle,
  onSubcategoryClick,
  onChildCategoryClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardPosition, setCardPosition] = useState<CardPosition | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setCardPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onToggle(category.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle(category.id);
    }
  };
  
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to a placeholder image if the main image fails to load
    event.currentTarget.src = '/placeholder-category.jpg';
  };

  const handleClose = () => {
    onToggle(category.id);
  };

  return (
    <>
      <section
        ref={cardRef}
        className={`${styles.categoryCard} group bg-white rounded-2xl p-6 flex flex-col items-center shadow-lg cursor-pointer relative transition-all duration-300 ease-in-out border-4 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${isActive ? 'active' : ''}`}
        style={{ borderColor: category.borderColor }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-controls={`${category.id}-modal`}
        aria-expanded={isActive}
        aria-label={`${category.name} category with subcategories`}
      >
        {/* Category Image */}
        <div 
          className="relative w-40 h-40 rounded-full overflow-hidden border-4 shadow-lg mb-5"
          style={{ borderColor: category.textColor }}
        >
          <Image
            src={category.imageUrl}
            alt={`${category.name} category illustration`}
            className="w-full h-full object-cover"
            onError={handleImageError}
            width={160}
            height={160}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 to-transparent opacity-0 transition-opacity duration-300 ease-in-out rounded-full group-hover:opacity-100" />
        </div>

        {/* Category Title */}
        <h2 
          className="mt-5 text-2xl font-semibold tracking-wide select-none flex items-center gap-2 font-orbitron"
          style={{ color: category.textColor }}
        >
          {category.name}
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isActive ? 'rotate-180' : ''}`}
            style={{ color: category.textColor }}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            viewBox="0 0 24 24" 
            aria-hidden="true" 
            focusable="false"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </h2>

        {/* Category Description */}
        <p className="mt-2 text-center max-w-xs leading-relaxed select-none">
          {category.description}
        </p>
      </section>

      {/* Modal */}
      <Modal
        category={category}
        isActive={isActive}
        onSubcategoryClick={onSubcategoryClick}
        onChildCategoryClick={onChildCategoryClick}
        onClose={handleClose}
        cardPosition={cardPosition}
      />
    </>
  );
};

export default CategoryCard; 