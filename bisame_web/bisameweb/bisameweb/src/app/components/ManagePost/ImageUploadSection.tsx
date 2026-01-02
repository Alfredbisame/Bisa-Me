import React from 'react';
import ImageUpload from '../TradeAssurance/ImageUpload';

interface ImageUploadSectionProps {
  onImageUpload: (img: string) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ onImageUpload }) => {
  // For now, just a stub. You may want to handle file to base64 conversion here if needed.
  // The ImageUpload component should call onImagesChange with File[]
  const handleImagesChange = (files: File[]) => {
    if (files && files.length > 0) {
      // Convert the first file to base64 (or handle upload logic)
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          onImageUpload(e.target.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return <ImageUpload onImagesChange={handleImagesChange} maxImages={1} minImages={0} />;
};

export default ImageUploadSection; 