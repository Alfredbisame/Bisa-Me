"use client";
import PromotionHeader from "./PromotionHeader";
import NewPromoCard from "./NewPromoCard";
import useProfilePromotion from "./hooks/use-profile-promotion";
import LoadingPage from "../ManagePost/components/LoadingPage";
import { BsCashCoin } from "react-icons/bs";
import ProductsHeader from "../SavedProducts/SavedProductsHeader";

const PromotionPlan = () => {
  const { data, isLoading, error } = useProfilePromotion();
  console.log(data);

  if (isLoading) {
    return (
      <>
        <ProductsHeader
          header="Promotional Purchases"
          description="Want view all purchased promotions."
        />
        <LoadingPage />
      </>
    );
  }

  return (
    <div>
      {/* Header component of promotion section */}
      <ProductsHeader
        header="Promotional Purchases"
        description="Want view all purchased promotions? Check all your promotions here"
      />
      <div className="promotion-card p-3 md:p-5 grid md:grid-cols-2 gap-5">
        {data &&
          data
            .filter(({ pricingOption }) => pricingOption?.price !== undefined)
            .map(({ pricingOption, status, promotionPlanSnapshot, id }) => (
              <NewPromoCard
                key={id}
                price={pricingOption.price}
                promoStatus={status}
                promoName={promotionPlanSnapshot?.title || ""}
                promoSummary={promotionPlanSnapshot?.description || ""}
                primaryColor="blue"
              />
            ))}
      </div>
      {data?.length === 0 && (
        <div className="w-full h-[60vh] md:h-60 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <BsCashCoin size={30} color="orange" />
            <span>No promotion purchases made yet</span>
            <span className="text-gray-500 text-sm">
              User promotions will be displayed here!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionPlan;
