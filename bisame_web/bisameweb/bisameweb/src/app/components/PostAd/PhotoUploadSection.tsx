"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, Info, X, Upload, GripVertical, Loader2 } from "lucide-react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { useFormContext } from "../Forms/Foods/context/FormContext";
import { useProfileData } from "../Dashboard/useProfileData";
import { buildProfileUrl, FILE_ENDPOINTS, httpClient } from "@/lib";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  isMain?: boolean;
}

interface PhotoUploadSectionProps {
  onImagesChange?: (hasImages: boolean, images?: UploadedImage[]) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
}

const PhotoUploadSection = ({
  onImagesChange,
  maxImages = 10,
  maxFileSize = 5,
}: PhotoUploadSectionProps) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { error } = useFormContext();

  const { FormData: imageData, handleFormData } = useFormContext();
  const { fullName } = useProfileData();

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  // Notify parent component about images change
  const notifyImagesChange = useCallback(
    (updatedImages: UploadedImage[]) => {
      onImagesChange?.(updatedImages.length > 0, updatedImages);
    },
    [onImagesChange]
  );

  const uploadImageToServer = async (files: File[]): Promise<boolean> => {
    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();

      for (const file of files) {
        formData.append("file", file);
      }

      const apiUrl = buildProfileUrl(FILE_ENDPOINTS.upload);

      const response: AxiosResponse = await httpClient.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
      });

  

      let uploadedImageUrls: string[] = [];

      // Normalize existing images from context
      const existingImages = imageData?.images;
      const existingArray: string[] = Array.isArray(existingImages)
        ? (existingImages as string[])
        : [];

      if (Array.isArray(response.data)) {
        uploadedImageUrls = [...existingArray, ...response.data];
      } else {
        uploadedImageUrls = [...existingArray, response.data];
      }

      console.log({ images: uploadedImageUrls });

      // Update context with uploaded image URLs
      handleFormData({ images: uploadedImageUrls });

      return true;
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload images. Please try again.");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      // Check file type
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        errors.push(`${file.name}: Only JPG and PNG files are allowed`);
        return;
      }

      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        errors.push(
          `${file.name}: File size must be less than ${maxFileSize}MB`
        );
        return;
      }

      validFiles.push(file);
    });

    // Show errors if any
    if (errors.length > 0) {
      setUploadError(errors.join("\n"));
      setTimeout(() => setUploadError(""), 5000);
    }

    if (validFiles.length === 0) return;

    // Check total images limit
    const remainingSlots = maxImages - images.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (validFiles.length > remainingSlots) {
      setUploadError(
        `You can only upload ${remainingSlots} more image(s). Maximum ${maxImages} images allowed.`
      );
      setTimeout(() => setUploadError(""), 5000);
    }

    // Create image objects for preview
    const newImages: UploadedImage[] = filesToAdd.map((file, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      isMain: images.length === 0 && index === 0, // First image is main
    }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    notifyImagesChange(updatedImages);

    // Upload to server
    await uploadImageToServer(filesToAdd);
  };

  // Handle drag and drop for file upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  // Remove image
  const removeImage = (id: string, index: number) => {
    const updatedImages = images.filter((img) => img.id !== id);

    // Normalize existing images from context before filter
    const existingImages = imageData?.images;
    let updatedImageUrls: string[] = [];

    if (Array.isArray(existingImages)) {
      updatedImageUrls = (existingImages as string[]).filter(
        (_img: string, idx: number) => idx !== index
      );
    }

    console.log({ images: updatedImageUrls });
    console.log({ images: updatedImageUrls });
    console.log({ images: updatedImageUrls });
    console.log({ images: updatedImageUrls });

    handleFormData({ images: updatedImageUrls });

    // If removed image was main and there are still images, make first image main
    if (updatedImages.length > 0 && images[index]?.isMain) {
      updatedImages[0].isMain = true;
    }

    setImages(updatedImages);
    notifyImagesChange(updatedImages);

    // Cleanup object URL
    const removedImage = images.find((img) => img.id === id);
    if (removedImage) {
      URL.revokeObjectURL(removedImage.preview);
    }
  };

  // Set main image
  const setMainImage = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isMain: img.id === id,
    }));
    setImages(updatedImages);
    notifyImagesChange(updatedImages);
  };

  // Drag and drop reordering
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Add a semi-transparent image to the drag ghost
    if (e.dataTransfer.setDragImage) {
      const img = e.currentTarget as HTMLElement;
      e.dataTransfer.setDragImage(img, 50, 50);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOverReorder = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];

    // Remove dragged item
    newImages.splice(draggedIndex, 1);

    // Insert at new position
    newImages.splice(index, 0, draggedImage);

    // Update main image status - first image is always main
    newImages.forEach((img, idx) => {
      img.isMain = idx === 0;
    });

    setImages(newImages);
    setDraggedIndex(index);
    notifyImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <Camera className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>Add Photos</span>
            <span className="text-xs font-normal text-gray-500">
              ({images.length}/{maxImages})
            </span>
          </label>
          {(error?.images || uploadError) && (
            <p className="text-xs text-red-600">
              {error?.images || uploadError}
            </p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-700 leading-relaxed">
              <p className="font-medium mb-1">Photo Tips:</p>
              <ul className="space-y-0.5">
                <li>• First picture will be your main display image</li>
                <li>• Drag and drop to reorder photos</li>
                <li>• Click the Set as Main button to change the main image</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="space-y-3">
        {images.length < maxImages && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200 ${
              isUploading
                ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                : isDragOver
                ? "border-blue-500 bg-blue-50 cursor-pointer"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
            }`}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-blue-500 animate-spin" />
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Uploading images...
                </p>
                <p className="text-gray-500 text-xs">Please wait</p>
              </>
            ) : (
              <>
                <Upload
                  className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 ${
                    isDragOver ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <p className="text-gray-600 text-sm font-medium mb-1">
                  {isDragOver
                    ? "Drop images here"
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-gray-500 text-xs">
                  Upload up to {maxImages - images.length} more image(s)
                </p>
              </>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                draggable={!isUploading}
                onDragStart={(e) => !isUploading && handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) =>
                  !isUploading && handleDragOverReorder(e, index)
                }
                className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  isUploading ? "cursor-not-allowed" : "cursor-move"
                } ${
                  image.isMain
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                } ${draggedIndex === index ? "opacity-50 scale-95" : ""}`}
              >
                {image.isMain && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10 shadow-sm">
                    Main
                  </div>
                )}

                {!isUploading && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <GripVertical className="w-5 h-5 text-white bg-black bg-opacity-60 rounded p-0.5" />
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id, index);
                  }}
                  disabled={isUploading}
                  className="absolute top-2 right-8 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-full p-1.5 z-10 shadow-sm"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>

                <div className="aspect-square relative">
                  <Image
                    src={image.preview}
                    alt={`Upload preview ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>

                {!image.isMain && !isUploading && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMainImage(image.id);
                    }}
                    className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 hover:bg-opacity-80 text-white text-xs py-1.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Set as Main
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>JPG</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>PNG</span>
          </div>
          <span className="text-gray-400">•</span>
          <span>Max {maxFileSize}MB per image</span>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadSection;
