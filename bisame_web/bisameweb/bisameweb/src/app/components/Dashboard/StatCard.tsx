import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  count: string | number;
  label: string;
  bgColor: string;
  borderColor?: string;
  hoverColor?: string;
}

const StatCard = ({
  icon,
  count,
  label,
  bgColor,
  hoverColor = "hover:shadow-gray-200/50",
}: StatCardProps) => {
  return (
    <div
      className={`
      ${bgColor} p-4 rounded-3xl shadow-sm
      transition-all duration-300 ease-in-out
      hover:shadow-lg ${hoverColor} hover:scale-[1.02]
      cursor-pointer group
      md:min-h-[140px]
    `}
    >
      <div className="flex items-center justify-between h-full">
        {/* Right side - Count and Label */}
        <div className="flex flex-col items- flex-1 ml-2 sm:ml-4">
          <div
            className="text-xs sm:text-sm font-medium text-gray-500 
                         group-hover:text-gray-700 transition-colors"
          >
            {label}
          </div>
          <div
            className="sm:text-xl lg:text-2xl font-semibold text-[#29428A] mb-1 
                         group-hover:text-gray-900 transition-colors"
          >
            {(count as string).replace("S", "₵")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
