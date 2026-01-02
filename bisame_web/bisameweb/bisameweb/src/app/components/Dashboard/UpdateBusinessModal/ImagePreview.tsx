import { X } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
  images: File[];
  onRemoveImage: (index: number) => void;
}

const ImagePreview = ({ images, onRemoveImage }: ImagePreviewProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((file, index) => (
        <div key={index} className="relative group">
          <Image
            src={URL.createObjectURL(file)}
            alt={`Upload ${index + 1}`}
            width={96}
            height={96}
            className="w-full h-24 object-cover rounded-lg"
          />
          <button
            onClick={() => onRemoveImage(index)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
