import React, { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaTrash, FaHeart } from "react-icons/fa";
import { getImageUrl } from "../ProductDetails/utils/imageUtils";
import { useDeleteSaveData } from "./useDeleteSaveData";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Link from "next/link";
import { SavedProduct } from "./useSavedData";

// interface Product {
//   id: string;
//   favoriteId: string;
//   pageid?: string;
//   name: string;
//   image: string;
//   price: number;
//   rating: number;
//   reviews: number;
//   location: string;
//   description: string;
//   badge?: {
//     text: string;
//     color: string;
//   };
//   category?: string;
//   subCategory?: string;
//   userInfo?: {
//     name: string;
//     profilePicture: string;
//   };
//   images?: Array<{
//     imageUrl: string;
//     id: string;
//   }>;
//   createdAt?: string;
//   updatedAt?: string;
// }

interface SavedProductCardProps {
  product: SavedProduct;
  onProductClick: (productId: string, e: React.MouseEvent) => void;
}

const SavedProductCard: React.FC<SavedProductCardProps> = ({
  product,
  onProductClick,
}) => {
  // Use state to track image source for this specific product
  const [imgSrc, setImgSrc] = useState(getImageUrl(product.image));
  const {
    deleteSave,
    loading,
    // error: deleteError,
    reset,
  } = useDeleteSaveData();
  const [deleted, setDeleted] = useState(false);

  const handleImageError = () => {
    setImgSrc("/f4.png");
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your saved products?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0634ba",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      reset();
      const res = await deleteSave({ listingId: product.favoriteId as string });
      if (res.code == 200) {
        toast.success(res.message || "Saved item deleted successfully.");
        setDeleted(true);
      } else {
        toast.error(res?.message || "Failed to delete saved item.");
      }
    }
  };

  if (deleted) return null;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm \
        transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
      onClick={(e) => onProductClick(product.id, e)}
    >
      {/* Image Container */}
      <Link
        href={`/ProductDetails?id=${encodeURIComponent(
          product.favoriteId as string
        )}`}
        className="relative group"
      >
        <Image
          src={imgSrc}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        {/* Saved Heart Icon */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <FaHeart className="text-red-500 w-4 h-4" />
        </div>
      </Link>
      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <Link
          href={`/ProductDetails?id=${encodeURIComponent(
            product.favoriteId as string
          )}`}
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          {/* Description */}
          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {product.description}
          </p>
          {/* Location */}
          <div className="flex items-center text-gray-500 text-xs mb-3">
            <FaMapMarkerAlt className="mr-1 text-orange-500" size={10} />
            {product.location}
          </div>
          {/* Category */}
          {(product.category || product.subCategory) && (
            <div className="text-xs text-gray-500 mb-2">
              {product.category}{" "}
              {product.subCategory ? `> ${product.subCategory}` : ""}
            </div>
          )}
        </Link>

        {/* Price and Delete Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-orange-500 font-bold text-lg">
              {product.price == 0
                ? "Contact for Price"
                : `GH₵ ${product.price.toLocaleString()}`}
            </div>
          </div>
          {/* Delete Button */}
          <button
            className="delete-button group relative p-2 rounded-full transition-all duration-200 \
            hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            onClick={async (e) => {
              e.stopPropagation();
              await handleDelete();
            }}
            disabled={loading}
            title="Remove from saved"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
            ) : (
              <FaTrash className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
            )}
            {/* Tooltip */}
            <div
              className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded \
            opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10"
            >
              Remove from saved
              <div
                className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 \
              border-transparent border-t-gray-900"
              ></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedProductCard;
