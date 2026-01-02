import { useState, useEffect, useCallback } from "react";

export interface UnifiedImage {
  id: string;
  file?: File;
  preview?: string;
  imageUrl?: string;
  isMain?: boolean;
  isExisting?: boolean;
}

interface UseImageManagerProps {
  initialImages?:
    | string[]
    | Array<string | { image_link?: string; imageUrl?: string }>;
  maxImages?: number;
  maxFileSizeMB?: number;
  onUpload?: (files: File[]) => Promise<string[] | null>;
}

export const useImageManager = ({
  initialImages = [],
  maxImages = 10,
  maxFileSizeMB = 5,
  onUpload,
}: UseImageManagerProps) => {
  const [images, setImages] = useState<UnifiedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const maxFileSize = maxFileSizeMB * 1024 * 1024;

  // Initialize images from product data
  useEffect(() => {
    if (!initialImages || initialImages.length === 0) return;

    const mapped: UnifiedImage[] = initialImages.map((img, idx) => {
      const url =
        typeof img === "string" ? img : img.image_link || img.imageUrl || "";
      const imgId =
        typeof img === "object" && "id" in img
          ? String(img.id)
          : `existing-${idx}`;

      return {
        id: imgId,
        imageUrl: url,
        isExisting: true,
        isMain: idx === 0,
      };
    });

    setImages(mapped);
  }, [initialImages]);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  const handleFileSelect = useCallback(
    async (files?: FileList | null): Promise<void> => {
      if (!files || files.length === 0 || isUploading) return;

      const fileArray = Array.from(files);
      const validFiles: File[] = [];
      const errors: string[] = [];

      // Validate files
      fileArray.forEach((file) => {
        if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
          errors.push(`${file.name}: Only JPG and PNG allowed`);
          return;
        }
        if (file.size > maxFileSize) {
          errors.push(`${file.name}: File too large (max ${maxFileSizeMB}MB)`);
          return;
        }
        validFiles.push(file);
      });

      if (errors.length > 0) {
        setUploadError(errors.join("; "));
        setTimeout(() => setUploadError(""), 5000);
      }

      if (validFiles.length === 0) return;

      const remainingSlots = maxImages - images.length;
      const toAdd = validFiles.slice(0, remainingSlots);

      if (validFiles.length > remainingSlots) {
        setUploadError(`You can only upload ${remainingSlots} more image(s).`);
        setTimeout(() => setUploadError(""), 5000);
      }

      // Create temporary preview images
      const tempEntries: UnifiedImage[] = toAdd.map((file) => ({
        id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
        isMain: images.length === 0,
        isExisting: false,
      }));

      const updated: UnifiedImage[] = [...images, ...tempEntries].map(
        (img, idx) => ({
          ...img,
          isMain: idx === 0,
        })
      );

      setImages(updated);

      // Upload to server if upload function is provided
      if (onUpload) {
        setIsUploading(true);
        try {
          const uploadedUrls = await onUpload(toAdd);

          if (uploadedUrls && uploadedUrls.length > 0) {
            let urlIndex = 0;
            const postUpload: UnifiedImage[] = updated.map((img) => {
              if (
                !img.isExisting &&
                img.file &&
                urlIndex < uploadedUrls.length
              ) {
                const url = uploadedUrls[urlIndex++];
                return {
                  ...img,
                  imageUrl: url,
                  isExisting: true,
                };
              }
              return img;
            });

            setImages(postUpload);
          }
        } catch (err) {
          setUploadError("Upload failed. Please try again.");
          setTimeout(() => setUploadError(""), 5000);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [images, isUploading, maxImages, maxFileSize, maxFileSizeMB, onUpload]
  );

  const removeImage = useCallback(
    (index: number): void => {
      const removed = images[index];
      if (removed?.preview) URL.revokeObjectURL(removed.preview);

      const updated = images
        .filter((_, i) => i !== index)
        .map((img, idx) => ({
          ...img,
          isMain: idx === 0,
        }));

      setImages(updated);
    },
    [images]
  );

  const setMainImage = useCallback(
    (imageId: string): void => {
      const updated = images.map((img) => ({
        ...img,
        isMain: img.id === imageId,
      }));
      setImages(updated);
    },
    [images]
  );

  // Drag and drop handlers
  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number): void => {
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleDragEnd = useCallback((): void => {
    setDraggedIndex(null);
  }, []);

  const handleDragOverReorder = useCallback(
    (e: React.DragEvent, index: number): void => {
      e.preventDefault();
      e.stopPropagation();

      if (draggedIndex === null || draggedIndex === index) return;

      const newImgs = [...images];
      const [dragged] = newImgs.splice(draggedIndex, 1);
      newImgs.splice(index, 0, dragged);

      const normalized = newImgs.map((img, idx) => ({
        ...img,
        isMain: idx === 0,
      }));

      setImages(normalized);
      setDraggedIndex(index);
    },
    [draggedIndex, images]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  // Get all image URLs for submission
  const getImageUrls = useCallback((): string[] => {
    return images
      .filter((img) => img.imageUrl)
      .map((img) => img.imageUrl as string);
  }, [images]);

  // Get new images (not yet uploaded)
  const getNewImages = useCallback((): File[] => {
    return images
      .filter((img) => img.file && !img.isExisting)
      .map((img) => img.file as File);
  }, [images]);

  return {
    images,
    setImages,
    isUploading,
    uploadError,
    setUploadError,
    isDragOver,
    handleFileSelect,
    removeImage,
    setMainImage,
    handleDragStart,
    handleDragEnd,
    handleDragOverReorder,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    getImageUrls,
    getNewImages,
  };
};
