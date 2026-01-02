"use client";
import React from "react";
import { motion } from "framer-motion";
import PromoDate from "./PromoDate";

interface PromotionCardProps {
  promoName: string;
  promoStatus: "Active" | "Inactive" | "Expired";
  promoSummary: string;
  price: number;
  primaryColor: "blue" | "green" | "purple" | "orange";
}

const colorMap = {
  blue: {
    badge: "bg-blue-100 text-blue-600 border-blue-200",
    accent: "text-blue-600",
  },
  green: {
    badge: "bg-green-100 text-green-600 border-green-200",
    accent: "text-green-600",
  },
  purple: {
    badge: "bg-purple-100 text-purple-600 border-purple-200",
    accent: "text-purple-600",
  },
  orange: {
    badge: "bg-orange-100 text-orange-600 border-orange-200",
    accent: "text-orange-600",
  },
};

const statusStyles = {
  Active: "bg-green-100 text-green-600",
  Inactive: "bg-gray-100 text-gray-500",
  Expired: "bg-red-100 text-red-600",
};

const statusDot = {
  Active: "bg-green-500",
  Inactive: "bg-gray-400",
  Expired: "bg-red-500",
};

const NewPromoCard: React.FC<PromotionCardProps> = ({
  price,
  promoStatus,
  promoName,
  promoSummary,
  primaryColor,
}) => {
  const colors = colorMap[primaryColor];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md space-y-4 cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between gap-3">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-lg border ${colors.badge}`}
        >
          {promoName}
        </span>

        <p className="text-xs text-gray-500 line-clamp-2 max-w-[60%]">
          {promoSummary}
        </p>
      </div>

      {/* Status + Price */}
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[promoStatus]}`}
        >
          <span className={`w-2 h-2 rounded-full ${statusDot[promoStatus]}`} />
          {promoStatus}
        </div>

        <p className={`text-lg font-semibold ${colors.accent}`}>
          GHS {price.toLocaleString()}
        </p>
      </div>

      {/* Date Section */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
        <PromoDate date="25-05-2025" dateStatus="Start" />
        <span className="text-gray-300 font-semibold">→</span>
        <PromoDate date="31-12-2025" dateStatus="End" />
      </div>
    </motion.div>
  );
};

export default NewPromoCard;
