import Image from "next/image";
import React from "react";
import { IoIosAdd } from "react-icons/io";

export interface Image {
  id: string;
  imageUrl: string;
}

interface ImagePreviewProps {
  images: Image[];
  onImagePick: () => void;
  onRemove?: (index: number) => void; // Added onRemove prop
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  onImagePick,
  onRemove,
}) => {
  return (
    <>
      <p className="text-sm font-semibold text-blue-700">Image Preview</p>
      <div className="grid grid-cols-5 gap-2">
        {images.map(({ id, imageUrl }, index) => (
          <div key={id} className="relative group">
            <Image
              src={imageUrl}
              width={100}
              height={100}
              alt="my-image-preview"
              priority
              className="rounded border border-gray-200"
            />
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 bg-white bg-opacity-90 hover:bg-opacity-100 px-2 py-1 text-xs rounded shadow text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div
          className="border border-dashed border-green-500 cursor-pointer flex items-center justify-center h-[100px]"
          onClick={onImagePick}
          title="Add new image"
        >
          <IoIosAdd size={30} color="green" />
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
