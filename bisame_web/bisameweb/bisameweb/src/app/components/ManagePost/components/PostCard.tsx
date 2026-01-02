import Image from "next/image";
import React from "react";
import EditCloseButton from "./EditCloseButton";
import { FaMapMarkerAlt } from "react-icons/fa";
import EditModal from "./EditModal";
import { Product } from "../types";

interface PostCardProps {
  product: Product;
  imgSrc: string;
  isOpen: boolean;
  editProductId: string | null;
  onEdit: (productId: string) => void;
  onImageError: (productId: string) => void;
  onClose: (productId: string) => void;
  onCancel: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  product,
  imgSrc,
  isOpen,
  editProductId,
  onEdit,
  onClose,
  onImageError,
  onCancel,
}) => {
  const priceNumber =
    typeof product.price === "number" ? product.price : Number(product.price);

  const displayPrice =
    !product.price || priceNumber === 0 || Number.isNaN(priceNumber)
      ? "Contact for price"
      : `GH₵ ${priceNumber.toLocaleString()}`;

  return (
    <>
      <div className="shadow-md p-3 relative transition-all duration-300 hover:bg-gray-50 hover:shadow-md hover:scale-105 cursor-pointer h-auto flex flex-col rounded-md">
        <div className="absolute top-6 right-4 z-10">
          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            Review
          </span>
        </div>

        <Image
          src={imgSrc}
          alt={product.name}
          width={150}
          height={150}
          className="w-full h-40 object-cover mt-2 rounded-md transition-transform duration-300 transform"
          onError={() => onImageError(product.id)}
        />

        <div className="mt-4">
          <h2 className="text-sm text-gray-700 font-semibold mt-2 line-clamp-1">
            {product.name}
          </h2>

          <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
            {product.description}
          </p>

          <p className="text-gray-500 text-xs mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-1 text-orange-500" size={12} />
            {product.location}
          </p>

          <p className="text-orange-500 font-semibold mt-2">{displayPrice}</p>

          <EditCloseButton id={product.id} onEdit={onEdit} onClose={onClose} />
        </div>
      </div>

      {isOpen && editProductId === product.id && (
        <EditModal id={product.id} product={product} onCancel={onCancel} />
      )}
    </>
  );
};

export default PostCard;
