import React from "react";

interface PriceTypeProps {
  handleInputChange: (field: string, value: string) => void;
}

const PriceType: React.FC<PriceTypeProps> = ({ handleInputChange }) => {
  return (
    <div className="md:space-y-2">
      <label className="text-gray-500 text-xs md:text-sm lg:text-base">
        Price Type
      </label>
      <div className="space-x-5 text-xs md:text-sm lg:text-base">
        <label className="specify-price space-x-1">
          <input
            type="radio"
            id="specify-price"
            name="priceType"
            value="specify price"
            onChange={(event) =>
              handleInputChange("priceType", event.target.value)
            }
            className="border "
          />
          <span>Specify price</span>
        </label>
        <label className="specify-price space-x-1">
          <input
            type="radio"
            id="specify-price"
            name="priceType"
            value="contact for price"
            onChange={(event) =>
              handleInputChange("priceType", event.target.value)
            }
            className="border"
          />
          <span>Contact for price</span>
        </label>
      </div>
    </div>
  );
};

export default PriceType;
