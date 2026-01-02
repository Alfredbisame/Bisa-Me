import React from "react";

interface SummaryListCardProps {
  product: string;
  promo: string;
  styles?: string;
}

const SummaryListCard: React.FC<SummaryListCardProps> = ({
  product,
  promo,
  styles = "bg-orange-500",
}) => {
  return (
    <div className="card border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-5 cursor-pointer ">
      <div className={`w-2 h-2  rounded-full ${styles}`}></div>
      <div className="">
        <h2 className="text-sm text-gray-500">{product}</h2>
        <p className="text-xs md:text-sm font-normal text-gray-400">{promo}</p>
      </div>
    </div>
  );
};

export default SummaryListCard;
