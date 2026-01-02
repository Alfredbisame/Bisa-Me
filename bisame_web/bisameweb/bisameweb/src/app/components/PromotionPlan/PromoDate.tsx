import React from "react";

interface PromoDateProps {
  date: string;
  dateStatus: "Start" | "End";
}
const PromoDate: React.FC<PromoDateProps> = ({ date, dateStatus }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-400 text-xs md:text-sm">{dateStatus}</span>
      <span className="text-gray-400 text-xs md:text-sm">{date}</span>
    </div>
  );
};

export default PromoDate;
