"use client";
import React, { useMemo, useCallback } from "react";
import PromoListingCard from "./PromoListingCard";
import Button from "../ui/Button";
import { IoMdArrowRoundBack, IoMdEye } from "react-icons/io";
import { ProductPromoListProps } from "./constants";
import { ProfileListings } from "./hooks/useFetchListings";
import { CountType } from "./PromoListingPage";
import { usePromoContext } from "./context/PromotionContext";

interface ProductSelectionGridProps {
  handleChangeSelection: () => void;
  handleSelectionCount: (type: CountType) => void;
  countSelected: number;
  selectedProduct: ProductPromoListProps[];
  data: ProfileListings[] | undefined;
  numberOfAdsAllowed: number;
}

const ProductSelectionGrid: React.FC<ProductSelectionGridProps> = ({
  handleChangeSelection,
  countSelected,
  handleSelectionCount,
  selectedProduct,
  data,
  numberOfAdsAllowed,
}) => {
  const { handlePromoNavChange } = usePromoContext();

  // Memoize remaining ads calculation
  const remainingAds = useMemo(
    () => Math.max(numberOfAdsAllowed - countSelected, 0),
    [numberOfAdsAllowed, countSelected]
  );

  const remainingLabel = remainingAds === 1 ? "listing" : "listings";

  console.log(countSelected);

  // Memoize promo cards to prevent recreation on every render
  const promoCards = useMemo(() => {
    if (!data)
      return (
        <div>
          {" "}
          <div>You haven&apos;t created any post yet</div>
        </div>
      );

    return data.map(({ images, title, location, price, description, id }) => {
      const isDisabled = countSelected >= numberOfAdsAllowed;

      return (
        <PromoListingCard
          key={id}
          id={id}
          itemName={title}
          imageUrl={images[0].imageUrl}
          location={location}
          description={description}
          price={price}
          countSelected={countSelected}
          handleSelectionCount={handleSelectionCount}
          disabled={isDisabled}
        />
      );
    });
  }, [data, countSelected, handleSelectionCount, numberOfAdsAllowed]);

  // Memoize button label
  const viewButtonLabel = useMemo(() => {
    if (countSelected > 0) {
      return `View (${countSelected}/${numberOfAdsAllowed}) Selections`;
    }
    return "View Selections";
  }, [countSelected, numberOfAdsAllowed]);

  const handleBackToPromoPlans = useCallback(() => {
    handlePromoNavChange("main");
  }, [handlePromoNavChange]);

  return (
    <>
      <div className="flex justify-between items-center px-3">
        <button
          onClick={handleBackToPromoPlans}
          className="flex items-center  py-5 cursor-pointer text-orange-500 hover:text-orange-700 transition-colors gap-1"
        >
          <IoMdArrowRoundBack />
          Promo Plans
        </button>

        <div className="flex items-center gap-2">
          <span className="text-red-500 font-semibold text-sm">
            {remainingAds} {remainingLabel} remaining
          </span>
          {remainingAds === 0 && (
            <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded-full">
              Max reached
            </span>
          )}
        </div>
      </div>
      {}

      <div className="listing-grid p-2 md:p-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {promoCards}
      </div>
      

      <div className="px-2 md:px-5 flex justify-end sticky bottom-4">
        <Button
          label={viewButtonLabel}
          styles="bg-orange-500 text-sm md:text-base tracking-tighter hover:bg-orange-600 transition duration-300 text-white py-2 px-5 rounded-lg flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          icon={<IoMdEye />}
          action={handleChangeSelection}
          isDisabled={selectedProduct.length === 0}
        />
      </div>
    </>
  );
};

export default React.memo(ProductSelectionGrid);
