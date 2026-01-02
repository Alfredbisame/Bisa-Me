"use client";
import PromotionHeader from "@/app/components/PromotionPlan/PromotionHeader";
import React, { useEffect, useState } from "react";
import ProductSelectionGrid from "@/app/components/Promotion/ProductSelectionGrid";
import ProductSelection from "@/app/components/Promotion/ProductSelection";
import { usePromoContext } from "@/app/components/Promotion/context/PromotionContext";
import useCount from "@/app/components/Promotion/hooks/useCount";
import useHandleModal from "@/app/components/Promotion/hooks/useHandleModal";
import useFetchListings, {
  categoryGroupType,
} from "@/app/components/Promotion/hooks/useFetchListings";
import { Loader2Icon } from "lucide-react";
import Button from "@/app/components/ui/Button";
import useFetchPromotion from "@/app/components/Promotion/hooks/useFetchPromotion";
import { PromotionPlanData } from "@/app/components/Promotion/interfaces";

export type CountType = "increment" | "decrement" | "reset";

const PromoListingPage = () => {
  const {
    selectedPromotion,
    selectedProduct,
    handleResetSelection,
    handlePromoPlan,
    selectedCount,
  } = usePromoContext();

  const category = selectedPromotion?.promoName as string;
  const group = selectedPromotion?.categoryGroup;
  const promoId = selectedPromotion?.promoId;
  const numberOfAdsAllowed = selectedPromotion?.adsNumber;

  const { data: promoData } = useFetchPromotion(group as string);

  const [viewSelection, setViewSelection] = useState<boolean>(false);

  const filterPromoPlan =
    promoData && promoData?.data?.find((data) => data.id == promoId);

  console.log(filterPromoPlan);

  useEffect(() => {
    handlePromoPlan(filterPromoPlan as PromotionPlanData);
  }, [filterPromoPlan, handlePromoPlan]);

  const { handleSelectionCount } = useCount();
  const { isModalOpen, handleChangeModalStatus } = useHandleModal();

  const handleChangeSelection = () => {
    setViewSelection((prev) => !prev);
  };

  const { data, isLoading, error, mutate } = useFetchListings(
    group as categoryGroupType
  );

  return (
    <div className="shadow-md h-full md:min-h-screen">
      <PromotionHeader
        promoHeader={`Select a listings for your ${category?.toLowerCase()} offer`}
      />
      {viewSelection ? (
        <ProductSelection
          selectedProduct={selectedProduct}
          isModalOpen={isModalOpen}
          handleResetSelection={handleResetSelection}
          handleChangeSelection={handleChangeSelection}
          handleSelectionCount={handleSelectionCount}
          handleChangeModalStatus={handleChangeModalStatus}
        />
      ) : (
        <div className="w-full">
          {error && (
            <div className="text-center my-10 space-y-4">
              <p className="text-red-500 font-semibold">
                Error occurred fetching data
              </p>
              <Button
                label="Retry"
                action={() => mutate()}
                styles="bg-red-600 text-white hover:bg-opacity-95 px-6 py-2 rounded-lg"
              />
            </div>
          )}
          {isLoading && (
            <div className="w-full flex items-center justify-center my-20">
              <Loader2Icon className="animate-spin" color="gray" />
            </div>
          )}
         
          {data && (
            <ProductSelectionGrid
              handleChangeSelection={handleChangeSelection}
              selectedProduct={selectedProduct}
              countSelected={selectedCount}
              handleSelectionCount={handleSelectionCount}
              numberOfAdsAllowed={numberOfAdsAllowed as number}
              data={data}
            />
          )}
          
        </div>
      )}
    </div>
  );
};

export default PromoListingPage;
