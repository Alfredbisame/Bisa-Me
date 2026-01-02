"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Message } from "./types";
import { useProductData } from "../components/ProductDetails/hooks/useProductData";
import Link from "next/link";

interface ChatHeaderProps {
  selectedMessage: Message;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedMessage }) => {
  const [showNumber, setShowNumber] = useState<string | null>(null);
  const { product, isLoading } = useProductData(
    selectedMessage.listingId as string
  );

  // Hard reset showNumber whenever listingId changes
  useEffect(() => {
    setShowNumber(null);
  }, [selectedMessage.listingId]);

  const handleShowNumber = (phoneNumber: string) => {
    setShowNumber(phoneNumber);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-between bg-white px-3 md:px-6 py-3 border-b border-gray-200 shadow-sm min-h-[80px]">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border h-14 w-14 bg-gray-200 animate-pulse border-gray-200"></div>

          <div className="min-w-0 space-y-2 flex-1">
            <p className="h-4 w-40 bg-gray-200 animate-pulse rounded"></p>
            <p className="h-4 w-24 bg-gray-200 animate-pulse rounded"></p>
          </div>
        </div>
        <button className="h-9 w-32 bg-gray-200 animate-pulse rounded-lg"></button>
      </div>
    );
  }

  if (product) {
    return (
      <div className="flex items-center justify-between bg-gradient-to-r from-white to-gray-50 px-3 md:px-6 py-3 border-b border-gray-200 shadow-sm min-h-[80px]">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <Image
              alt="Product image"
              width={56}
              height={56}
              className="object-cover rounded-lg border border-gray-200 shadow-sm"
              src={selectedMessage.imageUrl as string | ""}
              unoptimized
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="min-w-0 flex-1">
            <Link href={`/ProductDetails?id=${product.id}`} className="text-xs md:text-sm font-semibold text-gray-900 break-words line-clamp-2">
              {product.title}
            </Link>
            <p className="text-orange-600 font-bold text-sm mt-0.5">
              GH₵ {product.price}
            </p>
          </div>
        </div>
        <button
          className="bg-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 flex-shrink-0 ml-3"
          onClick={() =>
            handleShowNumber(selectedMessage.phoneNumber as string)
          }
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {showNumber ? (
            <a href={`tel:${showNumber}`}>{showNumber}</a>
          ) : (
            <span>Show contact</span>
          )}
        </button>
      </div>
    );
  }
};

export default ChatHeader;
