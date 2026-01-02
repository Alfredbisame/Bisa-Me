"use client";
import React, { useEffect } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { ObjectProps } from "./interfaces";

interface promoDurationProps {
  label: string;
  value: number;
  price: number;
  discountedPrice: number;
}

interface PromoDurationDropdownProps {
  promoDuration: promoDurationProps[] | [];
  activeDuration: string;
  isOpenDropdown: boolean;
  handleChangeDuration: (duration: string) => void;
  handleOpenDropdown: () => void;
  handlePriceChange?: (price: number) => void;
  handleDiscountedPrice: (discountedPrice: number) => void;
  handleSelectPromotion: (data: ObjectProps) => void;
}

const PromoDurationDropdown: React.FC<PromoDurationDropdownProps> = ({
  activeDuration,
  promoDuration,
  isOpenDropdown,
  handleChangeDuration,
  handleOpenDropdown,
  handleDiscountedPrice,
  handleSelectPromotion,
}) => {
  // Automatically set the initial values of values and label
  useEffect(() => {
    handleSelectPromotion({
      value: promoDuration[0].value,
      label: promoDuration[0].label,
    });
  }, [handleSelectPromotion, promoDuration]);
  return (
    <>
      {isOpenDropdown && promoDuration?.length > 0 && (
        <div className="bg-gray-100 w-full absolute -top-3 border flex flex-col divide-y divide-gray-200 text-xs md:text-sm text-blue-400 rounded-lg py-1">
          {promoDuration?.map(
            ({ discountedPrice, label, value }, index: number) => (
              <span
                key={index}
                className={`p-2 flex items-center gap-2 hover:bg-gray-200 ${
                  activeDuration == `${value} ${label}` ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  handleChangeDuration(`${value} ${label}`);
                  handleSelectPromotion({ value, label });
                  handleOpenDropdown();
                  handleDiscountedPrice(discountedPrice);
                  // handlePriceChange(price);
                }}
              >
                <MdOutlineCalendarMonth />
                <span className="text-gray-500">
                  {value} {label}
                </span>
              </span>
            )
          )}
        </div>
      )}
    </>
  );
};

export default PromoDurationDropdown;
