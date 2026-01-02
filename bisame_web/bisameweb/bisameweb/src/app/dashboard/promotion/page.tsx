import PromotionContext from "@/app/components/Promotion/context/PromotionContext";
import Promotion from "@/app/components/Promotion/Promotion";
import React from "react";

const PromotionPage = () => {
  return (
    <PromotionContext>
      <Promotion />
    </PromotionContext>
  );
};

export default PromotionPage;
