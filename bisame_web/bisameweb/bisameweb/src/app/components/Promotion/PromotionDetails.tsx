import React from "react";
import { TabType } from "./Promotion";
import PromoBuySell from "./PromoBuySell";
import PromoServices from "./PromoServices";

interface PromotionDetailsProps {
  activeTab: TabType;
}

const PromotionDetails: React.FC<PromotionDetailsProps> = ({ activeTab }) => {
  return (
    <div className="m-5">
      {activeTab == "Buy and Sell" ? (
        <PromoBuySell group="Buy and Sell" />
      ) : (
        <PromoServices group="Services" />
      )}
    </div>
  );
};

export default PromotionDetails;
