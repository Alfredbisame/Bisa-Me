"use client";
import React, { useState } from "react";
import PromotionTab from "./PromotionTab";
import PromotionDetails from "./PromotionDetails";
import PromoListingPage from "./PromoListingPage";
import { usePromoContext } from "./context/PromotionContext";
import ProductsHeader from "../SavedProducts/SavedProductsHeader";

export type TabType = "Buy and Sell" | "Services";

const Promotion = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Buy and Sell");
  const tabs: TabType[] = ["Buy and Sell", "Services"];

  const { promoNav } = usePromoContext();

  const handleChangeTab = (data: TabType) => {
    setActiveTab(data);
  };

  return (
    <div className="p-3 md:p-0">
      {/* Promo header */}
      <ProductsHeader
        header="Promotion"
        description="Looking forward to boast your post visibility? You can promote your post
         anytime when needed."
      />

      {/* Tab section of promotion page */}
      <PromotionTab
        tabs={tabs}
        changeTabs={handleChangeTab}
        activeTab={activeTab}
        promoNav={promoNav}
      />
      <div className="promotion-card">
        {promoNav === "main" ? (
          <PromotionDetails activeTab={activeTab} />
        ) : (
          <PromoListingPage />
        )}
      </div>
    </div>
  );
};

export default Promotion;
