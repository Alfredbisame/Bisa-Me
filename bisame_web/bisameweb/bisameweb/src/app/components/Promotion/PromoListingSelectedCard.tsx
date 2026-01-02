"use client";
import Image from "next/image";
import React, { useState } from "react";

import PromoSelectType from "./PromoSelectType";
import { usePromoContext } from "./context/PromotionContext";
import { promoServicesTypes, promoTypes } from "./constants";

interface PromoListingProps {
  itemName: string;
  imageUrl: string;
  id: string;
}

const PromoListingSelectedCard: React.FC<PromoListingProps> = ({
  itemName,
  imageUrl,
  id,
}) => {
  const {
    benefitQuantity,
    selectedPromotion,
    handleIncrementCount,
    handleDecrementCount,
    handleAddPromotion,
    handleRemovePromotion,
    handleSectionItems,
    handleRemoveSectionItem,
  } = usePromoContext();

  const newPromoTypes =
    selectedPromotion?.categoryGroup === "Buy and Sell"
      ? promoTypes
      : promoServicesTypes;

  const [selected, setSelected] = useState<Record<string, boolean>>({
    featuredposts: false,
    topmarketplacedeals: false,
    trending: false,
    explorelocalservices: false,
  });

  const handleToggle = (key: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [key]: checked }));

    const sectionMap: Record<string, string> = {
      featuredposts: "Featured Posts",
      topmarketplacedeals: "Top Marketplace Deals",
      trending: "Trending",
      explorelocalservices: "Explore Local Services",
    };

    const sectionTitle = sectionMap[key];

    if (checked) {
      handleIncrementCount(key);
      handleAddPromotion(itemName);
      handleSectionItems(sectionTitle, id);
    } else {
      handleDecrementCount(key);
      handleRemovePromotion(itemName);
      handleRemoveSectionItem(sectionTitle, id);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b bg-gray-50 rounded-t-2xl">
        <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-xl border">
          <Image
            src={imageUrl}
            alt={itemName}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2">
            {itemName}
          </h2>
          <span className="text-xs text-gray-400">
            Select promotion placements
          </span>
        </div>
      </div>

      {/* Promotion Types */}

      {newPromoTypes.map((type) => (
        <div
          key={type.key}
          className={`rounded-xl border transition-all
          ${
            selected[type.key]
              ? "border-orange-300 bg-orange-50"
              : "border-gray-200 bg-white"
          }
          ${
            !selected[type.key] && (benefitQuantity?.[type.key] || 0) <= 0
              ? "hidden"
              : ""
          }
        `}
        >
          <div>
            <PromoSelectType
              labelName={`${itemName}-${type.key}`}
              icon={type.icon}
              promoTypeHeader={type.label}
              promoTypeDetail={type.detail}
              isChecked={selected[type.key]}
              onChange={(checked) => handleToggle(type.key, checked)}
              name={type.key}
              value={id}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoListingSelectedCard;
