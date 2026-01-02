import { Upload } from 'lucide-react';
import ImagePreview from './ImagePreview';

interface ImageUploadSectionProps {
  selectedImages: File[];
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

const ImageUploadSection = ({ 
  selectedImages, 
  onImageUpload, 
  onRemoveImage 
}: ImageUploadSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Upload Store Images</p>
              <p className="text-sm text-gray-500">Drag and drop or click to select images</p>
            </div>
          </div>
        </label>
      </div>

      {/* Selected Images */}
      {selectedImages.length > 0 && (
        <ImagePreview 
          images={selectedImages} 
          onRemoveImage={onRemoveImage} 
        />
      )}
    </div>
  );
};

export default ImageUploadSection;
