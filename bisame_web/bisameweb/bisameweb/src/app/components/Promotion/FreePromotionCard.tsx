"use client";
import React from "react";
import { GoCheck } from "react-icons/go";
import { motion } from "framer-motion";

import { IoMdClose } from "react-icons/io";

interface featuresProps {
  title: string;
  included: boolean;
}
interface promoDurationProps {
  label: string;
  value: number;
  price: number;
  discountedPrice: number;
}
interface PromotionCardProps {
  promoName: string;
  features: featuresProps[];
  price: number;
  discount: number;
  primaryColor: string;
  secondaryColor: string;
  promoDuration: promoDurationProps[] | [];
}

const FreePromotionCard: React.FC<PromotionCardProps> = ({
  features,
  promoName,

  primaryColor,
  secondaryColor,
}) => {
  return (
    <motion.div
      className={`rounded-2xl bg-${primaryColor}-50 border border-${primaryColor}-100 p-4 space-y-4 cursor-pointer my-auto `}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`type font-semibold border border-${primaryColor}-400 bg-${primaryColor}-100 px-2 md:px-4 text-${primaryColor}-500 rounded-full text-xs tracking-tighter py-1 `}
        >
          {promoName}
        </span>

        <span
          className={`type font-semibold text-${primaryColor}-500 rounded-full tracking-tighter `}
        >
          GHS 0.00
        </span>
      </div>

      <ul className="space-y-2">
        <div
          className={`border border-${primaryColor}-100 p-2 space-y-2 bg-white rounded-xl`}
        >
          {features.slice(0, 4).map(({ included, title }, index: number) => (
            <li
              key={`${index}-${title}`}
              className="text-sm text-gray-500 flex items-center gap-2"
            >
              <span
                className={`border rounded-full p-[2px] border-${secondaryColor}-600 bg-${secondaryColor}-100 ${
                  !included && "bg-gray-50 border-red-500"
                }`}
              >
                {included ? (
                  <GoCheck size={10} color={secondaryColor} />
                ) : (
                  <IoMdClose size={10} color={`red`} />
                )}
              </span>
              {title}
            </li>
          ))}
        </div>
      </ul>
    </motion.div>
  );
};

export default FreePromotionCard;
