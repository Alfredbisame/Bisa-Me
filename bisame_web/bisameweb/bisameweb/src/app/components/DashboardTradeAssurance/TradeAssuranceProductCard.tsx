"use client";
import { FaMapMarkerAlt, FaShieldAlt, FaStar } from "react-icons/fa";
import AssurancePaymentButton from "./AssurancePaymentButton";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  image: string;
  imageAlt: string;
  isPaymentEnabled?: boolean;
  rating?: number;
  verified?: boolean;
}

interface TradeAssuranceProductCardProps {
  product: Product;
  onPaymentClick?: (productId: string) => void;
}

const TradeAssuranceProductCard = ({
  product,
  onPaymentClick,
}: TradeAssuranceProductCardProps) => {
  return (
    <div className="group relative bg-gradient-to-br from-white via-gray-50 to-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-gray-100/50 backdrop-blur-sm overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

      {/* Verification badge */}
      {product.verified && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
          <FaShieldAlt className="text-xs" />
          <span>Verified</span>
        </div>
      )}

      <div className="relative z-10 flex p-6 space-x-4">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="128px"
            className="rounded-xl object-cover shadow-lg ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
          />

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex flex-col justify-between flex-1 min-h-[128px]">
          <div>
            <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
              {product.description.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index < product.description.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 text-sm">
                {product.price}
              </p>
              {product.rating && (
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-gray-600 text-sm font-medium">
                    {product.rating}
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-500 text-sm flex items-center group-hover:text-gray-600 transition-colors duration-300">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              {product.location}
            </p>
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-x-0 bottom-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl"></div>

      <AssurancePaymentButton
        productId={product.id}
        isPaymentEnabled={product.isPaymentEnabled}
        onPaymentClick={onPaymentClick}
      />
    </div>
  );
};

export default TradeAssuranceProductCard;
