import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ProductPromoListProps } from "./constants";
import PromoListingSelectedCard from "./PromoListingSelectedCard";
import Button from "../ui/Button";
import ListingSummary from "./ListingSummary";
import { CountType } from "./PromoListingPage";

interface ProductSelectionProps {
  handleChangeSelection: () => void;
  handleResetSelection: () => void;
  handleSelectionCount: (type: CountType) => void;
  selectedProduct: ProductPromoListProps[];
  isModalOpen: boolean;
  handleChangeModalStatus: () => void;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({
  handleResetSelection,
  handleChangeSelection,
  selectedProduct,
  handleSelectionCount,
  handleChangeModalStatus,
  isModalOpen,
}) => {
  return (
    <div className="p-5">
      <div className="flex text-sm justify-between">
        <span
          className="flex items-center cursor-pointer text-orange-500 hover:text-orange-700"
          onClick={() => {
            handleChangeSelection();
            handleSelectionCount("reset");
            handleResetSelection();
          }}
        >
          <IoMdArrowRoundBack />
          Back
        </span>
        <span>{selectedProduct.length} listings picked</span>
      </div>

      <div className="listing-grid p-2 lg:p-0 xl:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {selectedProduct.length > 0 &&
          selectedProduct.map(({ id, imageUrl, itemName }) => (
            <PromoListingSelectedCard
              id={id}
              itemName={itemName}
              imageUrl={imageUrl}
              key={id}
            />
          ))}
      </div>
      <div className=" px-2 md:px-5 flex justify-end">
        <Button
          label="Proceed to checkout"
          styles="bg-orange-500 text-sm md:text-base tracking-tighter hover:bg-orange-600 transition duration-300 text-white py-1 px-5 rounded-lg flex items-center justify-center gap-2"
          isDisabled={selectedProduct.length === 0}
          action={handleChangeModalStatus}
        />
      </div>

      {isModalOpen && (
        <ListingSummary handleChangeModalStatus={handleChangeModalStatus} />
      )}
    </div>
  );
};

export default ProductSelection;
