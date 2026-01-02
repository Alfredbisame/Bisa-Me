import React, { useState, useEffect, useRef } from "react";
import { Product } from "./types";
import toast from "react-hot-toast";
import { UpdateProductProps } from "./interfaces";
import { useImageManager } from "./hooks/use-image-handler";
import { useProductForm } from "./hooks/use-product-form";
import { useImageUpload } from "./hooks/use-image-upload";
import { LuLoaderCircle } from "react-icons/lu";
import EditImage from "./components/EditImage";
import { useProductData } from "../ProductDetails/hooks/useProductData";

interface ProductEditData {
  categoryGroup?: string;
  category?: string;
  subCategory?: string;
  childCategory?: string | null;
  title?: string;
  name?: string;
  location?: string;
  attributes?: Record<string, any>;
  description?: string;
  price?: string | number;
  negotiable?: boolean | string;
  contactNumber?: string;
  images?: any;
  [key: string]: any;
}

interface EditProductModalProps {
  id: string; // Product ID for fetching
  isOpen: boolean; // Control modal visibility
  product?: Product | null; // Optional: Fallback product data
  postUpdateInfo?: any; // Optional: Additional update info
  loading?: boolean; // Optional: External loading state
  error?: unknown; // Optional: External error state
  onUpdate: (reqBody: UpdateProductProps) => void;
  onCancel: () => void;
  userName?: string;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  id,
  isOpen,
  product,
  postUpdateInfo,
  loading: externalLoading,
  error: externalError,
  onUpdate,
  onCancel,
  userName = "user",
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);

  // Fetch product data by ID (can be skipped if product prop is provided)
  const {
    product: newProductData,
    isLoading: isLoadingProduct,
    hasError,
    error: errorProduct,
  } = useProductData(id);


  // Use external loading/error if provided, otherwise use fetch hook states
  const isLoading = externalLoading ?? isLoadingProduct;
  const loadError = externalError ?? errorProduct;

  // Prioritize postUpdateInfo, then newProductData, then product prop
  const productData = newProductData || product;

  // Initialize form data from fetched product
  const { formData, handleChange, updateField } = useProductForm({
    productData: productData,
  });

  // Initialize image upload
  const { uploadImages } = useImageUpload({ userName });

  // Initialize image manager with upload handler
  const {
    images,
    isUploading,
    uploadError,
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
  } = useImageManager({
    initialImages: productData?.images
      ? Array.isArray(productData.images)
        ? productData.images
        : [productData.images]
      : [],
    maxImages: 10,
    maxFileSizeMB: 5,
    onUpload: uploadImages,
  });

  // Handle success response
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const imageUrls = getImageUrls();

      const reqBody: UpdateProductProps = {
        id,
        title: formData.title || formData.name,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        category: formData.category || "",
        subCategory: formData.subCategory || "",
        childCategory: formData.childCategory || null,
        // categoryGroup: formData.categoryGroup || "",
        contactNumber: formData.contactNumber || "",
        images: imageUrls.map((url, index) => ({
          imageUrl: url,
          id: `image-${index}`,
        })),
        isPromoted: false,
        negotiable:
          typeof formData.negotiable === "boolean"
            ? formData.negotiable
            : formData.negotiable === "true",
        attributes: formData.attributes || {},
      };

      await onUpdate(reqBody);

      setShowSuccess(true);
      toast.success("Product updated successfully!");

      setTimeout(() => {
        setShowSuccess(false);
        onCancel();
      }, 1200);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if not open
  if (!isOpen) return null;

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 flex flex-col items-center">
          <LuLoaderCircle className="w-12 h-12 text-orange-400 animate-spin mb-4" />
          <p className="text-gray-500 text-sm">Loading product data...</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!productData || !formData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 flex flex-col items-center">
          <p className="text-red-600 font-semibold mb-2">
            {loadError ? "Failed to load product" : "Product not found"}
          </p>
          <p className="text-gray-500 text-sm max-w-xs text-center">
            {loadError
              ? String(loadError)
              : "Unable to load product data. Please try again."}
          </p>
          <button
            onClick={onCancel}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const onPickImage = (): void => {
    imageRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 p-6 relative overflow-y-auto max-h-[90vh]"
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 text-2xl focus:outline-none z-20"
          onClick={onCancel}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Edit Product
        </h2>

        <div className="space-y-6">
          {/* Image Management Section using EditImage component */}
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
            maxImages={10}
            maxFileSizeMB={5}
          />
          <div>
            <label className="block text-sm font-semibold mb-1">
              Product Name
            </label>
            <input
              name="title"
              value={formData.title || formData.name || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Price</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            disabled={isSubmitting || isUploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting || isUploading ? (
              <span className="flex items-center">
                <LuLoaderCircle className="w-4 h-4 animate-spin mr-2" />
                {isUploading ? "Uploading..." : "Updating..."}
              </span>
            ) : showSuccess ? (
              <span className="flex items-center">
                <span className="mr-2">✅</span> Success!
              </span>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(EditProductModal);
