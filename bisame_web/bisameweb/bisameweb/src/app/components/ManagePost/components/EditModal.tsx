"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import useFetchFormOptions from "../../Forms/Books/hooks/useFetchFormOptions";
import { FormOptions } from "../../Forms/Books/interfaces";
import useFetchProductById from "../hooks/use-fetch-product-by-id";
import useInitializeForm from "../../Forms/Foods/hooks/useInitializeForm";
import { LuLoaderCircle } from "react-icons/lu";
import Button from "./Button";
import { EditModalProps } from "../interfaces";
import FormTextField from "./FormTextField";
import EditImage from "./EditImage";
import axios from "axios";
import { useProfileData } from "../../Dashboard/useProfileData";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 10;

type UnifiedImage = {
  id: string;
  file?: File;
  preview?: string;
  imageUrl?: string;
  isMain?: boolean;
  isExisting?: boolean;
};

type FlatFormValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | number[]
  | boolean[];

type FlatForm = Record<string, FlatFormValue>;

type ProductImagesType =
  | string
  | { id?: string; imageUrl?: string }
  | Array<string | { id?: string; imageUrl?: string }>;

type ProductLike = {
  images?: ProductImagesType;
};

type AttributeValue = string | string[];

interface ProductEditData {
  categoryGroup?: string;
  category?: string;
  subCategory?: string;
  title?: string;
  location?: string;
  attributes?: Record<string, AttributeValue>;
  description?: string;
  price?: string;
  negotiable?: string;
  contactNumber?: string;
  [key: string]:
    | string
    | AttributeValue
    | Record<string, AttributeValue>
    | undefined;
}

const EditModal: React.FC<EditModalProps> = ({ id, product, onCancel }) => {
  const [images, setImages] = useState<UnifiedImage[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const imageRef = useRef<HTMLInputElement | null>(null);

  const { newProductData, isLoadingProduct } =
    useFetchProductById<ProductEditData>(id);

  const { data, isLoading, refresh } = useFetchFormOptions(
    newProductData?.categoryGroup as string,
    newProductData?.category,
    newProductData?.subCategory
  );
  
  // Transform data to match InitializeFormProps
  const formOptions: { data: { name: string }[] } | undefined = 
    data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)
      ? { data: data.data as { name: string }[] }
      : undefined;

  const { formData, setFormData } = useInitializeForm(formOptions);

  const { fullName } = useProfileData();

  const refreshedOnce = useRef(false);

  useEffect(() => {
    if (newProductData && !refreshedOnce.current) {
      refreshedOnce.current = true;
      refresh();
    }
  }, [newProductData, refresh]);

  useEffect(() => {
    if (!product) return;

    const typedProduct = product as ProductLike;

    const srcList: (string | { id?: string; imageUrl?: string })[] = [];

    if (Array.isArray(typedProduct.images)) {
      srcList.push(...typedProduct.images);
    } else if (typedProduct.images) {
      srcList.push(typedProduct.images);
    }

    const mapped: UnifiedImage[] = srcList.map(
      (img: string | { id?: string; imageUrl?: string }, idx: number) => {
        const url = typeof img === "string" ? img : img.imageUrl ?? "";
        const imgId =
          typeof img === "object" && img.id ? img.id : `existing-${idx}`;
        return {
          id: imgId,
          imageUrl: url,
          isExisting: true,
          isMain: idx === 0,
        };
      }
    );

    setImages(mapped);
  }, [product]);

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  const syncFormImages = useCallback(() => {
    const serverUrls = images
      .filter((i) => i.imageUrl)
      .map((i) => i.imageUrl as string);

    const base = (formData as FlatForm | null) ?? null;
    const next: FlatForm = {
      ...(base ?? {}),
      images: serverUrls,
    };

    setFormData(next as typeof formData);
  }, [images, formData, setFormData]);

  useEffect(() => {
    syncFormImages();
  }, [images, syncFormImages]);

  const uploadFilesToServer = async (
    files: File[]
  ): Promise<string[] | null> => {
    setIsUploading(true);
    setUploadError("");
    try {
      const form = new FormData();
      for (const file of files) {
        form.append("file", file);
      }

      const response = await axios.post(
        `/api/UploadImage?name=${encodeURIComponent(fullName || "user")}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
          },
        }
      );

      const raw = (response.data?.data ?? null) as string | string[] | null;

      if (!raw) return null;

      const returned: string[] = Array.isArray(raw) ? raw : [raw];

      return returned;
    } catch (err: unknown) {
      console.error(err);
      setUploadError("Failed to upload images. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (files?: FileList | null): Promise<void> => {
    if (!files || files.length === 0 || isUploading) return;

    const fileArray = Array.from(files);

    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach((file) => {
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        errors.push(`${file.name}: Only JPG and PNG allowed`);
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        errors.push(
          `${file.name}: File too large (max ${
            MAX_IMAGE_SIZE / (1024 * 1024)
          }MB)`
        );
        return;
      }
      validFiles.push(file);
    });

    if (errors.length > 0) {
      setUploadError(errors.join("; "));
      setTimeout(() => setUploadError(""), 5000);
    }

    if (validFiles.length === 0) return;

    const remainingSlots = MAX_IMAGES - images.length;
    const toAdd = validFiles.slice(0, remainingSlots);
    if (validFiles.length > remainingSlots) {
      setUploadError(`You can only upload ${remainingSlots} more image(s).`);
      setTimeout(() => setUploadError(""), 5000);
    }

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

    const uploadedUrls = await uploadFilesToServer(toAdd);
    if (uploadedUrls && uploadedUrls.length > 0) {
      let urlIndex = 0;
      const postUpload: UnifiedImage[] = updated.map((img) => {
        if (!img.isExisting && img.file && urlIndex < uploadedUrls.length) {
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

    if (imageRef.current) imageRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const removeImage = (index: number): void => {
    const removed = images[index];
    if (removed?.preview) URL.revokeObjectURL(removed.preview);

    const updated = images
      .filter((_, i) => i !== index)
      .map((img, idx) => ({
        ...img,
        isMain: idx === 0,
      }));
    setImages(updated);
  };

  const setMainImage = (imageId: string): void => {
    const updated = images.map((img) => ({
      ...img,
      isMain: img.id === imageId,
    }));
    setImages(updated);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ): void => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    if (e.dataTransfer.setDragImage) {
      const el = e.currentTarget as HTMLElement;
      e.dataTransfer.setDragImage(el, 50, 50);
    }
  };

  const handleDragEnd = (): void => setDraggedIndex(null);

  const handleDragOverReorder = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ): void => {
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
  };

  const onPickImage = (): void => {
    imageRef.current?.click();
  };

  if (isLoading || isLoadingProduct) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
          <LuLoaderCircle className="animate-spin mx-auto mb-4" size={40} />
          <p className="text-gray-700">Loading product...</p>
          <div className="mt-4">
            <Button variant="muted" onClick={onCancel}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh] relative">
        <button
          type="button"
          aria-label="Close"
          onClick={onCancel}
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500"
        >
          ×
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Edit Product
        </h3>

        <div className="space-y-4">
          <EditImage
            images={images}
            imageRef={imageRef}
            onImageFiles={handleFileSelect}
            onPickImage={onPickImage}
            onRemove={removeImage}
            onSetMain={setMainImage}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOverReorder}
            onDrop={handleDrop}
            onDragOverZone={handleDragOver}
            onDragLeaveZone={handleDragLeave}
            isDragOver={isDragOver}
            isUploading={isUploading}
            uploadError={uploadError}
            maxImages={MAX_IMAGES}
            maxFileSizeMB={MAX_IMAGE_SIZE / (1024 * 1024)}
          />

          <FormTextField
            data={data && data.data && Array.isArray(data.data) 
              ? { data: data.data as FormOptions[] } 
              : null}
            formData={formData}
            onInputChange={(field, value) => {
              const base = (formData as FlatForm | null) ?? null;
              const next: FlatForm = {
                ...(base ?? {}),
                [field]: value as FlatFormValue,
              };
              setFormData(next as typeof formData);
            }}
            newProductData={newProductData ?? null}
          />

          <div className="flex justify-end mt-6">
            <Button variant="muted" onClick={onCancel}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
