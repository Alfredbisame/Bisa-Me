"use client";

import { FC } from "react";
import { Product } from "./ProductDetail";
import { FaStar } from "react-icons/fa";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const reviewsCount =
    typeof product.reviews === "number"
      ? product.reviews
      : Array.isArray(product.reviews)
      ? product.reviews.length
      : 0;

  const formattedPrice =
    !product.price || product.price === 0
      ? "Contact for Price"
      : `GH₵ ${product.price.toLocaleString()}`;

  return (
    <div className="space-y-3 md:space-y-10">
      {/* Rating + Feedback */}
      <div className="flex items-center gap-3">
        {product.rating ? (
          <div className="flex items-center gap-1 text-sm font-medium">
            <FaStar className="text-orange-500 text-sm" />
            <span className="text-gray-900">{product.rating}</span>
          </div>
        ) : (
          <span className="text-gray-500 text-sm">No rating</span>
        )}

        <span className="text-gray-400 text-sm">
          {reviewsCount ? `${reviewsCount} reviews` : "No user feedback"}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-lg md:text-3xl font-semibold tracking-tight text-gray-900 leading-snug">
        {product.title.charAt(0).toUpperCase() + product.title.slice(1)}
      </h1>

      {/* Product Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-8 text-sm">
        {[
          { label: "Brand: ", value: product.brand || "Not specified" },
          {
            label: "Availability: ",
            value: product.availability || "Available",
            valueClass: "text-green-600 font-medium",
          },
          { label: "Category: ", value: product.category || "Not specified" },
          { label: "Location: ", value: product.location || "Not specified" },
        ].map((item, i) => (
          <div key={i} className="space-y-0.5">
            <span className="text-gray-500">{item.label}</span>
            <span className={item.valueClass || "text-gray-900 font-medium"}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-baseline gap-2">
          <span className="text-xl md:text-3xl font-semibold text-orange-500">
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
