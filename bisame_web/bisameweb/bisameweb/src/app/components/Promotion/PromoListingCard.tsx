"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import { usePromoContext } from "./context/PromotionContext";

export interface PromoListingProps {
  itemName: string;
  productBrand?: string;
  price: number;
  location: string;
  imageUrl: string;
  tag?: "B&S" | "SRV";
  id: string;
  description?: string;
}

export interface PromoListingMainProps extends PromoListingProps {
  countSelected: number;
  handleSelectionCount: (type: "increment" | "decrement") => void;
  disabled?: boolean;
}

const PromoListingCard: React.FC<PromoListingMainProps> = ({
  itemName,
  location,
  price,
  id,
  imageUrl,
  description,
  countSelected,
  handleSelectionCount,
  disabled = false,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const {
    handleSelectedProduct,
    selectedProduct,
    selectedPromotion,
    handleRemoveSelectedProduct,
  } = usePromoContext();

  const numberOfAdsAllowed = selectedPromotion?.adsNumber as number;

  const isCheckboxDisabled =
    disabled || (!isSelected && countSelected >= numberOfAdsAllowed);

  useEffect(() => {
    const alreadySelected = selectedProduct?.some((p) => p.id === id);
    setIsSelected(alreadySelected);
  }, [selectedProduct, id]);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked && !isSelected && countSelected < numberOfAdsAllowed) {
      handleSelectedProduct({ id, imageUrl, itemName, location, price });
      handleSelectionCount("increment");
      setIsSelected(true);
    } else if (!checked && isSelected) {
      handleRemoveSelectedProduct({ id, imageUrl, itemName, location, price });
      handleSelectionCount("decrement");
      setIsSelected(false);
    }
  };

  return (
    <div className="relative group">
      <label htmlFor={`check-${id}`} className="block h-full">
        <div
          className={`flex flex-col h-full rounded-2xl border transition-all duration-200
        shadow-sm hover:shadow-lg
        ${
          isSelected
            ? "border-orange-500 ring-1 ring-orange-200"
            : "border-gray-200"
        }
      `}
        >
          {/* Image */}
          <div className="relative w-full overflow-hidden rounded-t-2xl">
            <Image
              src={imageUrl}
              alt={itemName}
              width={300}
              height={300}
              priority
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Checkbox */}
            <input
              type="checkbox"
              id={`check-${id}`}
              checked={isSelected}
              disabled={isCheckboxDisabled}
              onChange={handleCheck}
              className="accent-orange-500 absolute top-3 right-3 h-5 w-5 cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm"
            />
          </div>

          {/* Details */}
          <div
            className={`flex flex-col md:gap-2 p-2 md:p-4 flex-1 rounded-b-2xl
          ${isSelected ? "bg-orange-50" : "bg-white"}
        `}
          >
            {/* Title */}
            <h2 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-1">
              {itemName}
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm line-clamp-2">{description}</p>

            {/* Footer */}
            {/* <div className="mt-auto flex items-center justify-between"> */}
              <span className="text-orange-500 text-base font-bold">
                {
                  price == 0 ? "Contact for price" : `GH₵ ${price.toLocaleString()}`
                }
                
              </span>

              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <MdLocationPin className="text-blue-500" />
                <span className="line-clamp-1">{location}</span>
              </span>
            {/* </div> */}
          </div>
        </div>
      </label>
    </div>
  );
};

export default PromoListingCard;
