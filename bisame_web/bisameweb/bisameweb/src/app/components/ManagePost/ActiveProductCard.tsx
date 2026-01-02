import Image from "next/image";
import React from "react";
import { FaEdit, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Product } from "./types";

interface ActiveProductCardProps {
  activeProducts: Product[];
  statusLoading: boolean;
  onDeletePost: (productId: string) => void;
  onEdit: (productId: string) => void;
  onClose: (productId: string) => void;
  onImageError: (productId: string) => void;
  onProductDetail: (productId: string) => void;
}

const ActiveProductCard = ({
  activeProducts,
  statusLoading,
  onImageError,
  onEdit,
  onClose,
  onDeletePost,
  onProductDetail,
}: ActiveProductCardProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6 ">
      {activeProducts.map((product) => {
        const imgSrc = product.images[0].imageUrl;
        return (
          <div
            key={product.id}
            className="shadow-md p-3 relative transition-all duration-300 hover:bg-gray-50 hover:shadow-md hover:scale-105 cursor-pointer h-auto flex flex-col rounded-md"
          >
            {/* Status badge */}
            <div className="absolute top-6 right-4 z-10">
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                Active
              </span>
            </div>

            <Image
              src={imgSrc}
              alt={product.name}
              width={150}
              height={150}
              className="w-full h-40 object-cover mt-2 rounded-md transition-transform duration-300 transform"
              onClick={() => onProductDetail(product.id)}
              onError={() => onImageError(product.id)}
            />
            <div className="mt-4">
              <h2
                className="text-sm text-gray-700 font-semibold mt-2"
                onClick={() => onProductDetail(product.id)}
              >
                {product.name}
              </h2>
              <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
                {product.description}
              </p>
              <p className="text-gray-500 text-xs mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-1 text-orange-500" size={12} />
                {product.location}
              </p>
              <p className="text-orange-500 font-semibold mt-2">
                {product.price == 0
                  ? "Contact for price"
                  : `GH₵ ${product.price.toLocaleString() as string}`}
              </p>
              {/* Edit and Close buttons */}
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => onEdit(product.id)}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors duration-200"
                >
                  <FaEdit className="mr-1" size={12} />
                  Edit
                </button>
                <button
                  onClick={() => onClose(product.id)}
                  className="flex items-center text-red-600 hover:text-red-800 text-xs font-medium transition-colors duration-200"
                  disabled={statusLoading}
                >
                  <FaTimes className="mr-1" size={12} />
                  {statusLoading ? "Closing..." : "Close"}
                </button>

                <button
                  onClick={() => onDeletePost(product.id)}
                  className="flex items-center text-red-600 hover:text-red-800 text-xs font-semibold transition-colors duration-200"
                >
                  {/* <FaTimes className="mr-1" size={12} /> */}
                  <MdOutlineDelete className="mr-1" size={12} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveProductCard;
