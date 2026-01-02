import React from "react";

interface PricingSectionProps {
  price: string | undefined;
  attribute?: string;
  handlePriceChange: (field: string, value: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  price,
  attribute,
  handlePriceChange,
}) => {
  return (
    <div className="space-y-1 md:space-y-2">
      <h2 className="text-gray-500 text-xs md:text-sm lg:text-base">Pricing</h2>
      <div className="flex items-center border border-blue-300 rounded-lg p-2 text-blue-700 text-base font-medium bg-blue-50/30 focus-within:ring-1 focus-within:ring-blue-400 transition-all duration-200">
        <span className="mr-3 font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded text-xs md:text-sm lg:text-base">
          GH₵
        </span>

        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={price ?? attribute ?? ""}
          onChange={(e) => handlePriceChange(e.target.name, e.target.value)}
          className="w-full bg-transparent placeholder-blue-400 focus:outline-none text-blue-700 font-light text-xs md:text-sm lg:text-base"
          aria-label="Price"
        />
      </div>
    </div>
  );
};

export default PricingSection;
