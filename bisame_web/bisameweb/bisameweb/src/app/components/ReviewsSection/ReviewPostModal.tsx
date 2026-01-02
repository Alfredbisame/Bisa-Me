import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { getImageUrl } from '@/app/components/ProductDetails/utils/imageUtils';

interface ReviewPostModalProps {
  open: boolean;
  onClose: () => void;
  image?: string;
  title: string;
  description?: string;
  price?: number | string;
  postdate?: string;
}

const ReviewPostModal: React.FC<ReviewPostModalProps> = ({
  open,
  onClose,
  image = '/f4.png',
  title,
  description,
  price,
  postdate
}) => {
  const [imgSrc, setImgSrc] = useState<string>(getImageUrl(image, 400, 400));

  useEffect(() => {
    setImgSrc(getImageUrl(image, 400, 400));
  }, [image]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 relative animate-scaleIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 text-xl focus:outline-none z-20"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <div className="border p-2 rounded-lg">
          <div className="relative">
            <div className="aspect-square w-full p-2 relative overflow-hidden mb-2 rounded-md">
              <Image
                src={imgSrc}
                alt={title}
                fill
                className="object-cover"
                sizes="400px"
                onError={() => setImgSrc('/f4.png')}
                priority
              />
            </div>
          </div>
          <h2 className="text-sm font-semibold mb-1">{title}</h2>
          {description && (
            <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
              {description}
            </p>
          )}
          {price && (
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-orange-500 font-bold">
                {typeof price === 'number' ? `₵${price.toLocaleString()}` : `₵${price}`}
              </span>
            </div>
          )}
          {postdate && (
            <div className="text-xs text-gray-400 mt-1">{postdate}</div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default ReviewPostModal;