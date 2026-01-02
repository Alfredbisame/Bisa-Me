"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GoCheck } from "react-icons/go";
import { motion } from "framer-motion";
import {
  MdOutlineCalendarMonth,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import PromoDurationDropdown from "./PromoDurationDropdown";
import usePromoCard from "./hooks/usePromoCard";
import usePromoDiscount from "./hooks/usePromoDiscount";
import { IoMdClose } from "react-icons/io";
import { usePromoContext } from "./context/PromotionContext";

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

export interface BenefitProps {
  sectionTitle: string;
  numberOfItemsAllowed: number;
}
interface PromotionCardProps {
  promoId: string;
  promoName: string;
  promoCategory: string;
  promoSummary: string;
  features: featuresProps[];
  price: number;
  discount: number;
  discountLabel: string;
  primaryColor: string;
  secondaryColor: string;
  categoryGroup: "Buy and Sell" | "Services";
  promoDuration: promoDurationProps[] | [];
  // handleBenefitChange: (data: BenefitProps[]) => void;
  // handleAllowedAdsChange: (data: number) => void;
  benefit: BenefitProps[];
  adsNumber: number;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  price,
  discount,
  features,
  promoCategory,
  promoName,
  promoSummary,
  promoDuration,
  primaryColor,
  secondaryColor,
  discountLabel,
  categoryGroup,
  benefit,
  adsNumber,
  promoId,
}) => {
  // const [price, setPrice] = useState<number>(price);

  console.log(price);
  const { newPrice } = usePromoDiscount(price, discount);
  const initialPrice =
    promoDuration?.[1]?.price ?? promoDuration?.[0]?.price ?? 0;
  const computeDiscounted = (p: number, d: number) =>
    Number((p - (p * d) / 100).toFixed(2));

  const [discountedPrice, setDiscountedPrice] = useState<number>(
    () => newPrice ?? computeDiscounted(initialPrice, discount)
  );

  const promoDetails = {
    categoryGroup,
    benefit,
    adsNumber,
    promoId,
    promoName,
    discount,
    price,
  };

  // const handlePriceChange = (price: number) => {
  //   setPrice(price);
  // };

  const handleDiscountedPrice = (discountedPrice: number) => {
    setDiscountedPrice(discountedPrice);
  };
  const {
    activeDuration,
    isOpenDropdown,
    isOpenFullList,
    handleChangeDuration,
    handleOpenDropdown,
    handleOpenFullList,
  } = usePromoCard();

  const { handlePromoNavChange, handleSelectPromotion } = usePromoContext();

  console.log(promoName);

  const getPromoIconPath = (name: string) => {
    if (!name) return "";
    const n = name.toLowerCase();
    if (n.includes("ohene")) return "/promo/ohene.png";
    if (n.includes("akwaaba")) return "/promo/akwaaba.png";
    if (n.includes("sika")) return "/promo/sika.png";
    if (n.includes("akode") || n.includes("ɔkɔde") || n.includes("akodea"))
      return "/promo/eagle.png";
    return "";
  };

  return (
    <motion.div
      className={`relative rounded-2xl bg-${primaryColor}-50 border border-${primaryColor}-100 p-4 space-y-4 cursor-pointer my-auto `}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={`flex items-center justify-between flex-row-reverse`}>
        {promoName !== "Free" ? (
          <span
            className={`type font-semibold border border-${secondaryColor}-400 bg-${secondaryColor}-100 px-2 md:px-4 text-${secondaryColor}-500 rounded-full text-xs tracking-tighter py-1 `}
          >
            {promoCategory}
          </span>
        ) : (
          <span className="text-sm font-semibold text-blue-400">GHS 0.00</span>
        )}

        <span
          className={`type flex items-center gap-2 font-semibold text-sm border border-${primaryColor}-200 px-2 md:py-1 md:px-4 bg-${primaryColor}-500 rounded-full text-white `}
        >
           {/* Promo icon (top-right) */}
            {promoName !== "Free" && getPromoIconPath(promoName) && (
              // <div className="absolute right-3 top-3 z-10">
                <Image
                  src={getPromoIconPath(promoName)}
                  alt={promoName}
                  width={25}
                  height={25}
                  priority={false}
                />
              // </div>
            )}
          {promoName}
        </span>
      </div>
      {promoName !== "Free" && (
        <div
          className={`border border-${primaryColor}-200 bg-${primaryColor}-100 p-2 text-center font-semibold text-${primaryColor}-400 rounded-xl `}
        >
          {promoSummary}
        </div>
      )}

      <ul className="space-y-2">
        {promoName !== "Free" &&
          features.slice(0, 4).map(({ included, title }, index: number) => (
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
        {promoName !== "Free" && features.length > 4 && (
          <button
            className={`border text-sm py-1  px-3 rounded-full flex items-center gap-1 text-${primaryColor}-500 bg-${primaryColor}-100 border-${primaryColor}-400`}
            onClick={handleOpenFullList}
          >
            {isOpenFullList ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
            Full list
          </button>
        )}
        {(promoName === "Free" || isOpenFullList) && (
          <div
            className={`border border-${primaryColor}-300 p-2 space-y-2 bg-white rounded-xl`}
          >
            {promoName !== "Free"
              ? features
                  .slice(4, features.length)
                  .map(({ included, title }, index: number) => (
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
                  ))
              : features
                  .slice(0, features.length)
                  .map(({ included, title }, index: number) => (
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
        )}
      </ul>
      {promoName !== "Free" && (
        <>
          <div className="bg-white p-2">
            <div className="flex justify-between">
              <span className="bg-gradient-to-r my-auto from-orange-100 to-orange-400 rounded-full px-2 py-1 text-xs text-white font-semibold">
                {discountLabel}
              </span>
              <div className="text-sm flex flex-col">
                <span className="text-xs line-through text-gray-400 decoration-black">
                  GHS {price}
                </span>
                <span className={`text-${primaryColor}-500 font-semibold`}>
                  GHS {discountedPrice}
                </span>
              </div>
            </div>
            <div className="duration my-5 flex justify-end">
              <div className="relative">
                <button
                  className="border border-blue-300 text-blue-400 hover:bg-blue-50 font-medium rounded-lg text-sm p-2 flex items-center gap-2 my-auto"
                  type="button"
                  onClick={handleOpenDropdown}
                >
                  <MdOutlineCalendarMonth />
                  <span className="text-gray-500">{activeDuration}</span>
                  <MdOutlineKeyboardArrowDown />
                </button>
                {/* Duration dropdown menu */}
                <PromoDurationDropdown
                  handleSelectPromotion={handleSelectPromotion}
                  isOpenDropdown={isOpenDropdown}
                  activeDuration={activeDuration}
                  handleOpenDropdown={handleOpenDropdown}
                  handleChangeDuration={handleChangeDuration}
                  promoDuration={promoDuration}
                  // handlePriceChange={handlePriceChange}
                  handleDiscountedPrice={handleDiscountedPrice}
                />
              </div>
            </div>
          </div>

          {/* href={`/dashboard/promotion/promodetails/?category=${promoName}&group=${encodeURIComponent(
              categoryGroup
            )}&id=${encodeURIComponent(promoId)}`}
            onClick={() => {
              handleBenefitChange(benefit);
              handleAllowedAdsChange(adsNumber);
              localStorage.setItem("adsNumber", JSON.stringify(adsNumber));
            }}
          > */}
          <button
            className={`border w-full h-full py-1 rounded-lg text-${primaryColor}-500 border-${primaryColor}-500 my-2`}
            onClick={() => {
              handlePromoNavChange("listing");
              handleSelectPromotion(promoDetails);
            }}
          >
            TRY {promoName.toUpperCase()} FREE
          </button>
        </>
      )}
    </motion.div>
  );
};

export default PromotionCard;
