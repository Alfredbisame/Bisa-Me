import React, { useState, useEffect } from "react";
import { Product } from "./types";
import { usePostUpdatePost } from "./usePostUpdatePost";
import ImagePreviewGrid from "./ImagePreviewGrid";
import ImageUploadSection from "./ImageUploadSection";
import LoadingSpinner from "../Forms/OtherFields/LoadingSpinner";
import toast from "react-hot-toast";
import type { PostUpdateInfo } from "./usePostUpdateFetch";
import type { UpdatePostResponse } from "./usePostUpdatePost";

interface EditProductFormProps {
  product: Product;
  postUpdateInfo?: PostUpdateInfo;
  onUpdate: (reqBody: UpdatePostResponse) => void;
  onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  postUpdateInfo,
  onUpdate,
  onCancel,
}) => {
  const [form, setForm] = useState<Product>(product);
  const [images, setImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState<string | null>(null);
  const {
    updatePost,
    loading: updateLoading,
    error: updateError,
    result,
  } = usePostUpdatePost();

  useEffect(() => {
    setForm(product);
    if (product && Array.isArray(product.image)) {
      setImages(
        product.image.map((img) =>
          typeof img === "string" ? img : (img as { image_link?: string }).image_link || ""
        )
      );
    } else if (product && typeof product.image === "string") {
      setImages([product.image]);
    } else {
      setImages([]);
    }
    setNewImage(null);
  }, [product]);

  useEffect(() => {
    if (result && result.success && form) {
      toast.success(result.message || "Product updated successfully!");
      onUpdate(result);
      onCancel(); // Close modal immediately on success
    } else if (result && result.success === false) {
      toast.error(result.message || "Failed to update product.");
    }
  }, [result, form, onUpdate, onCancel]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (img: string) => {
    setNewImage(img);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const id = (postUpdateInfo?._id as unknown as { $oid?: string })?.$oid || postUpdateInfo?.id || form?.id || '';
    // const status = "reviewing"; // unused variable
    const existingImages = Array.isArray(postUpdateInfo?.images)
      ? postUpdateInfo.images
          .map((img) => (img as { imageUrl?: string })?.imageUrl || "")
          .filter(Boolean)
      : images;
    const reqBody: {
      id: string;
      title: string;
      description: string;
      price: number;
      location: string;
      category: string;
      subCategory: string;
      childCategory: string | null;
      contactNumber: string;
      images: Array<{ imageUrl: string; id: string }>;
      isPromoted: boolean;
      negotiable: boolean;
      attributes: {
        [key: string]: unknown;
      };
    } = {
      id,
      title: form.name,
      description: form.description,
      price: Number(form.price),
      location: form.location,
      category: (form as unknown as { category?: string }).category || "",
      subCategory: (form as unknown as { subCategory?: string }).subCategory || "",
      childCategory: (form as unknown as { childCategory?: string | null }).childCategory || null,
      contactNumber: (form as unknown as { contactNumber?: string }).contactNumber || "",
      images: existingImages.map((url, index) => ({ imageUrl: url, id: `existing-${index}` })),
      isPromoted: false,
      negotiable: true,
      attributes: {},
    };
    if (newImage) {
      (reqBody as unknown as { uploadimage?: { image: string | null } }).uploadimage = { image: newImage };
    }
    updatePost(reqBody);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 relative animate-scaleIn"
    >
      <button
        type="button"
        className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 text-xl focus:outline-none z-20"
        onClick={onCancel}
        aria-label="Close"
      >
        &times;
      </button>
      <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Edit Product
      </h2>
      <ImagePreviewGrid images={images} onRemove={handleRemoveImage} />
      <ImageUploadSection onImageUpload={handleImageUpload} />
      {updateError && (
        <div className="text-red-500 text-xs mb-2 text-center">
          {updateError}
        </div>
      )}
      <div className="mb-3">
        <label className="block text-xs font-semibold mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
          rows={3}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold mb-1">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs font-semibold mb-1">Price</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          disabled={updateLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-colors flex items-center justify-center"
          disabled={updateLoading}
        >
          {updateLoading ? (
            <span className="flex items-center">
              <LoadingSpinner size="sm" color="orange" />
              <span className="ml-2">Updating...</span>
            </span>
          ) : (
            "Post Update"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
