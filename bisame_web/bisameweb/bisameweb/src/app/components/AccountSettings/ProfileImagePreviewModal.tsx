import React from 'react';
import Image from 'next/image';

interface ProfileImagePreviewModalProps {
  isOpen: boolean;
  imageUrl: string;
  onUpload: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ProfileImagePreviewModal: React.FC<ProfileImagePreviewModalProps> = ({
  isOpen,
  imageUrl,
  onUpload,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transform transition-all duration-300 scale-95 opacity-0 animate-bounceIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-xs w-full mx-4 p-6 relative animate-scaleIn flex flex-col items-center">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 text-xl focus:outline-none z-20"
          onClick={onCancel}
          aria-label="Close"
        >
          &times;
        </button>
        <Image
          src={imageUrl}
          alt="Profile Preview"
          width={50}
          height={50}
          className="rounded-full mb-4 border-4 border-blue-100 shadow"
        />
        <div className="flex gap-4 mt-4 w-full">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onUpload}
            className={`flex-1 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-colors flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="loader mr-2 w-4 h-4 border-2 border-white border-t-blue-500 rounded-full animate-spin"></span>
            ) : null}
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImagePreviewModal;