"use client";
import React from "react";
import PromotionCard from "./PromotionCard";
import useFetchPromotion from "./hooks/useFetchPromotion";
import { PromotionPlanData } from "./interfaces";
import { Loader2 } from "lucide-react";

interface ColorSelectorProps {
  primaryColor: string;
  secondaryColor: string;
}

export interface PromoGroupProps {
  group: "Buy and Sell" | "Services";
}

const PromoBuySell = ({ group }: PromoGroupProps) => {
  const { data, isLoading } = useFetchPromotion(group);
  const filteredData: PromotionPlanData[] = data?.data as PromotionPlanData[];

  console.log(data);

  const ColorSelector = (category: string): ColorSelectorProps => {
    switch (category) {
      case "Ohene Promo":
        return {
          primaryColor: "orange",
          secondaryColor: "blue",
        };
      // case "ƆkƆdeƐ Promo":
      //   return { primaryColor: "darkblue", secondaryColor: "darkblue" };
      default:
        return { primaryColor: "blue", secondaryColor: "green" };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-60 flex justify-center items-center">
        <Loader2 size={25} className="animate-spin text-gray-500" />
      </div>
    );
  }

  console.log(filteredData);

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {filteredData &&
        filteredData.map((promoPlan: PromotionPlanData) => (
          <PromotionCard
            promoId={promoPlan.id}
            price={100}
            discount={100}
            features={promoPlan.features}
            promoCategory={promoPlan.category}
            promoName={promoPlan.title}
            promoSummary={promoPlan.description}
            primaryColor={ColorSelector(promoPlan.title).primaryColor}
            secondaryColor={ColorSelector(promoPlan.title).secondaryColor}
            promoDuration={promoPlan.promotionDurationList}
            discountLabel={promoPlan.discountLabel}
            key={promoPlan._id}
            categoryGroup="Buy and Sell"
            benefit={promoPlan.benefits}
            adsNumber={promoPlan.numberOfAdsAllowed}
          />
        ))}
    </div>
  );
};

export default PromoBuySell;
