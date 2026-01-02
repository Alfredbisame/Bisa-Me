import React from "react";
import { IoIosCheckmarkCircleOutline, IoMdClose } from "react-icons/io";
import { MdOutlineInsertChart } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import Button from "../ui/Button";
import SummaryListCard from "./SummaryListCard";

interface SummaryModalProps {
  selectedProduct: Array<{ id: string; itemName: string }>;
  promotionSelected: string[];
  extractNoPromoProduct: string[];
  onNext: () => void;
  onClose: () => void;
}

const SummaryModal: React.FC<SummaryModalProps> = ({
  selectedProduct,
  promotionSelected,
  extractNoPromoProduct,
  onNext,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b">
          <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 shadow-md">
            <IoIosCheckmarkCircleOutline size={22} className="text-white" />
          </span>

          <div className="flex-1">
            <h2 className="font-semibold text-gray-800 text-base">
              Promotion Summary
            </h2>
            <p className="text-xs text-gray-400">
              Review your selected promotions
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Stats */}
        <div className="px-5 pt-4">
          <div className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 p-3 text-blue-600 shadow-sm">
            <MdOutlineInsertChart size={18} />
            <span className="text-sm font-medium flex items-center">
              {selectedProduct.length} Listings
              <BsDot size={20} />
              {promotionSelected.length} Promoted
            </span>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
          {promotionSelected.map((item, index) => (
            <SummaryListCard
              key={index}
              product={item}
              promo="Promotion selected"
            />
          ))}

          {extractNoPromoProduct.map((item, index) => (
            <SummaryListCard
              key={index}
              product={item}
              promo="No promotion selected"
              styles="bg-gray-100 text-gray-500 border-gray-300"
            />
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-gray-50 rounded-b-2xl">
          <div className="flex gap-3">
            <Button
              label="Cancel"
              styles="flex-1 border border-orange-500 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition text-xs md:text-sm p-2"
              action={onClose}
            />

            <Button
              label="Next"
              styles="flex-1 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-xs md:text-sm p-2"
              action={onNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
