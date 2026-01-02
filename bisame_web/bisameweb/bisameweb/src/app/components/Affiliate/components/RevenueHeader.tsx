import { FaChartLine } from "react-icons/fa";

interface RevenueHeaderProps {
  totalRevenue: number;
  filteredCount: number;
}

const RevenueHeader = ({ totalRevenue, filteredCount }: RevenueHeaderProps) => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Title + Context */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 border border-orange-100">
            <FaChartLine className="h-5 w-5 text-orange-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              Affiliate Revenue
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              Overview of earnings generated through affiliate activity
            </p>
          </div>
        </div>

        {/* Right: Meta / KPI */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium text-gray-900">{filteredCount}</span>
          <span>of</span>
          <span className="font-medium text-gray-900">{totalRevenue}</span>
          <span className="hidden sm:inline">records</span>
        </div>
      </div>
    </header>
  );
};

export default RevenueHeader;
