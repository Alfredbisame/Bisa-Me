import React from "react";

interface PromotionHeaderProps {
  promoHeader: string;
  optionalHeader?: string;
}

const PromotionHeader: React.FC<PromotionHeaderProps> = ({
  promoHeader,
  optionalHeader,
}) => {
  return (
    <div className="promo-header bg-blue-900/95 flex justify-between px-5 py-3">
      <h2 className="font-semibold text-white">
        {promoHeader}
      </h2>
      <h2 className="md:text-sm xl:text-base font-semibold text-xs text-white">
        {optionalHeader}
      </h2>
    </div>
  );
};

export default PromotionHeader;
