import {
  FaDollarSign,
  FaUsers,
  FaChartLine,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaUserPlus,
  FaMoneyBillWave,
} from "react-icons/fa";
import StatCard from "./StatCard";
import { useDashboardData } from "./useDashboardData";

const DashboardStats = () => {
  const { data, loading, error } = useDashboardData();
  const dashboardData = data;

  // Fallbacks for all stats using the new API structure
  const lifetimeTotal = dashboardData?.lifetime?.total ?? 0;
  const lifetimeAffiliates = dashboardData?.lifetime?.affiliate ?? 0;
  const lifetimeEarnings = dashboardData?.lifetime?.earnings ?? 0;
  const todayAffiliates = dashboardData?.affiliates?.today ?? 0;
  const todayEarnings = dashboardData?.earnings?.today ?? 0;
  const weekAffiliates = dashboardData?.affiliates?.week ?? 0;
  const weekEarnings = dashboardData?.earnings?.week ?? 0;
  const monthAffiliates = dashboardData?.affiliates?.month ?? 0;
  const monthEarnings = dashboardData?.earnings?.month ?? 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Loading skeleton for cards
  const loadingCard = (
    <div className="animate-pulse bg-gray-100 p-4 rounded-lg min-h-[140px]" />
  );

  // Error fallback
  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Failed to load dashboard stats.
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {/* First Row - Main Stats */}
      {/* <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-2 flex items-center">
        <FaUserPlus className="mr-2 text-blue-500" />
        Key Metrics
      </h3> */}
      <div className="grid grid-cols-3 gap-4">
        {loading ? (
          loadingCard
        ) : (
          <StatCard
            icon={<FaDollarSign className="text-blue-600 text-xl" />}
            count={formatCurrency(lifetimeTotal)}
            label="Total Balance"
            bgColor="bg-[#ECFEFF]"
            // borderColor="border-blue-200"
            // hoverColor="hover:shadow-green-200/50"
          />
        )}
        {loading ? (
          loadingCard
        ) : (
          <StatCard
            icon={<FaUsers className="text-blue-500 text-xl" />}
            count={formatNumber(lifetimeAffiliates)}
            label="Lifetime Affiliates"
            bgColor="bg-[#FFF7ED]"
            // borderColor="border-blue-200"
          />
        )}
        {loading ? (
          loadingCard
        ) : (
          <StatCard
            icon={<FaChartLine className="text-purple-600 text-xl" />}
            count={formatCurrency(lifetimeEarnings)}
            label="Lifetime Earnings"
            bgColor="bg-[#EFF6FF]"
            // borderColor="border-purple-200"
            // hoverColor="hover:shadow-purple-200/50"
          />
        )}
      </div>

      {/* Second Row - Affiliates */}
      <div>
        <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-2 flex items-center">
          <FaUserPlus className="mr-2 text-blue-500" />
          Affiliate Performance
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            loadingCard
          ) : (
            <StatCard
              icon={<FaCalendarDay className="text-blue-500 text-xl" />}
              count={formatNumber(todayAffiliates)}
              label="Today's Affiliates"
              bgColor="bg-[#ECFEFF]"
              // borderColor="border-blue-300"
              // hoverColor="hover:shadow-blue-200/50"
            />
          )}
          {loading ? (
            loadingCard
          ) : (
            <StatCard
              icon={<FaCalendarWeek className="text-blue-500 text-xl" />}
              count={formatNumber(weekAffiliates)}
              label="This Week's Affiliates"
              bgColor="bg-[#F5F3FF]"
              // borderColor="border-blue-300"
              // hoverColor="hover:shadow-blue-200/50"
            />
          )}
          {loading ? (
            loadingCard
          ) : (
            <StatCard
              icon={<FaCalendarAlt className="text-blue-500 text-xl" />}
              count={formatNumber(monthAffiliates)}
              label="Month's Affiliates"
              bgColor="bg-[#F3E8FF]"
              // borderColor="border-blue-300"
              // hoverColor="hover:shadow-blue-200/50"
            />
          )}
        </div>
      </div>

      {/* Third Row - Earnings */}
      <div>
        <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-2 flex items-center">
          <FaMoneyBillWave className="mr-2 text-orange-500" />
          Earnings Performance
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            loadingCard
          ) : (
            <StatCard
              icon={<FaCalendarDay className="text-orange-500 text-xl" />}
              count={formatCurrency(todayEarnings)}
              label="Today's Earnings"
              bgColor="bg-[#F4F7FB]"
              // borderColor="border-orange-300"
              // hoverColor="hover:shadow-orange-200/50"
            />
          )}
          {loading ? (
            loadingCard
          ) : (
            <StatCard
              icon={<FaCalendarWeek className="text-orange-500 text-xl" />}
              count={formatCurrency(weekEarnings)}
              label="Week's Earnings"
              bgColor="bg-[#FBFBFD]"
              // borderColor="border-orange-300"
              // hoverColor="hover:shadow-orange-200/50"
            />
          )}
          {loading ? (
            loadingCard
          ) : (
            <StatCard
              icon={<FaCalendarAlt className="text-orange-500 text-xl" />}
              count={formatCurrency(monthEarnings)}
              label="Month's Earnings"
              bgColor="bg-[#F6F7FB]"
              // borderColor="border-orange-300"
              // hoverColor="hover:shadow-orange-200/50"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
