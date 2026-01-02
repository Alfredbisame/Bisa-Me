import Image from "next/image";
import React from "react";
import Label from "./Label";
import Button from "./Button";
import { GripVertical, X } from "lucide-react";

export type UnifiedImage = {
  id: string;
  file?: File;
  preview?: string;
  imageUrl?: string;
  isMain?: boolean;
  isExisting?: boolean;
};

interface EditImageProps {
  images: UnifiedImage[];
  imageRef: React.RefObject<HTMLInputElement | null>;
  onImageFiles: (files?: FileList | null) => void | Promise<void>;
  onPickImage: () => void;
  onRemove: (index: number) => void;
  onSetMain: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOverZone: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeaveZone: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragOver: boolean;
  isUploading: boolean;
  uploadError?: string;
  maxImages?: number;
  maxFileSizeMB?: number;
}

const EditImage: React.FC<EditImageProps> = ({
  images,
  imageRef,
  onRemove,
  onPickImage,
  onImageFiles,
  onSetMain,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDragOverZone,
  onDragLeaveZone,
  isDragOver,
  isUploading,
  uploadError,
  maxImages = 10,
  maxFileSizeMB = 5,
}) => {
  return (
    <div className="space-y-5">
      <Label>
        Images ({images.length}/{maxImages})
      </Label>

      {/* Upload Zone */}
      {images.length < maxImages && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOverZone}
          onDragLeave={onDragLeaveZone}
          onClick={() => !isUploading && onPickImage()}
          className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 ${
            isUploading
              ? "border-gray-300 bg-gray-50 cursor-not-allowed"
              : isDragOver
              ? "border-blue-500 bg-blue-50 cursor-pointer"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
          }`}
        >
          {isUploading ? (
            <>
              <div className="animate-pulse text-sm">Uploading images...</div>
              <div className="text-xs text-gray-500">Please wait</div>
            </>
          ) : (
            <>
              <div className="text-sm font-medium text-gray-700">
                Click to upload or drag and drop
              </div>
              <div className="text-xs text-gray-500">
                Upload up to {maxImages - images.length} more image
                {maxImages - images.length === 1 ? "" : "s"}
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden input */}
      <input
        ref={imageRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        multiple
        className="hidden"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onImageFiles(e.target.files)
        }
        disabled={isUploading}
      />

      {/* Error */}
      {uploadError && <div className="text-xs text-red-600">{uploadError}</div>}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {images.map((img, idx) => {
            const src = img.preview || img.imageUrl || "";

            return (
              <div
                key={img.id}
                draggable={!isUploading}
                onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                  !isUploading && onDragStart(e, idx)
                }
                onDragEnd={onDragEnd}
                onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                  !isUploading && onDragOver(e, idx)
                }
                className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  isUploading ? "cursor-not-allowed" : "cursor-move"
                } ${
                  img.isMain
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Main Badge */}
                {img.isMain && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10 shadow-sm">
                    Main
                  </div>
                )}

                {/* Drag Handle */}
                {!isUploading && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <GripVertical className="w-5 h-5 text-white bg-black bg-opacity-60 rounded p-0.5" />
                  </div>
                )}

                {/* Remove */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(idx);
                  }}
                  disabled={isUploading}
                  className="absolute top-2 right-8 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-full p-1.5 z-10 shadow-sm"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Image Display */}
                <div className="aspect-square relative">
                  {src ? (
                    <Image
                      src={src}
                      alt={`image-${idx}`}
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  ) : (
                    <div className="w-full h-24 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                      No preview
                    </div>
                  )}
                </div>

                {/* Set as Main button */}
                {!img.isMain && !isUploading && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSetMain(img.id);
                    }}
                    className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 hover:bg-opacity-80 text-white text-xs py-1.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Set as Main
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex gap-2 items-center">
        <Button
          type="button"
          variant="muted"
          onClick={onPickImage}
          disabled={isUploading}
        >
          Add Images
        </Button>
        <div className="text-sm text-gray-500">
          Max {maxFileSizeMB}MB per image
        </div>
      </div>
    </div>
  );
};

export default EditImage;
