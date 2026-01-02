import React from "react";

interface PriceTypeProps {
  handlePriceType: (data: string) => void;
}

const PriceType: React.FC<PriceTypeProps> = ({ handlePriceType }) => {
  return (
    <div className="space-y-2">
      <label className="text-blue-700 font-semibold">Price Type</label>
      <div className="space-x-5">
        <label className="specify-price space-x-1">
          <input
            type="radio"
            id="specify-price"
            name="priceType"
            value="specify-price"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handlePriceType(event.target.value)
            }
            className="border"
          />
          <span>Specify price</span>
        </label>
        <label className="specify-price space-x-1">
          <input
            type="radio"
            id="specify-price"
            name="priceType"
            value="contact-for-price"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handlePriceType(event.target.value)
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
