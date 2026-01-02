"use client";
import { useState, useRef } from 'react';
import { FaPlus, FaImage, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload?: (img: string) => void;
  maxImages?: number;
  minImages?: number;
}

const ImageUpload = ({ onImageUpload, minImages = 3 }: ImageUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (onImageUpload) {
          onImageUpload(result);
        }
        setPreviews(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        {/* Upload button */}
        <button
          type="button"
          onClick={triggerFileInput}
          className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-[#f9d7ca] to-[#f9d7ca]/80 hover:from-[#e75a00]/20 hover:to-[#f9d7ca] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#e75a00]/20"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e75a00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <FaPlus className="text-[#e75a00] text-3xl md:text-4xl group-hover:rotate-90 transition-transform duration-300 relative z-10" />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-[#5f6d7e] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add Image
          </div>
        </button>

        {/* Image previews */}
        {previews.map((preview, index) => (
          <div key={index} className="relative group w-24 h-24 md:w-32 md:h-32">
            <Image
              src={preview}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover rounded-2xl shadow-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
            >
              <FaTrash className="text-xs" />
            </button>
            <div className="absolute inset-0 rounded-2xl bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Upload instructions */}
      <div className="flex items-center space-x-3 text-[#5f6d7e]">
        <FaImage className="text-[#e75a00] text-lg" />
        <div>
          <p className="text-sm md:text-base font-medium">
            Upload a minimum of {minImages} images
          </p>
          <p className="text-xs text-[#5f6d7e]/70">
            JPG, PNG, or WebP. Max 5MB each.
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;