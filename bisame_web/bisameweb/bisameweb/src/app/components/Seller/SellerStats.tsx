"use client";
import React from "react";
import { FaAd, FaCheckCircle, FaArrowUp, FaArrowDown } from "react-icons/fa";

interface SellerStatsProps {
  totalAds: number;
  activeAds: number;
  memberSince?: string;
  location?: string;
  className?: string;
  phoneNumber?: string;
  showTrends?: boolean;
  trends?: {
    totalAds?: number;
    activeAds?: number;
  };
}

const SellerStats: React.FC<SellerStatsProps> = ({
  totalAds,
  activeAds,
  memberSince,
  location,
  className = "",
  showTrends = false,
  trends,
}) => {
  const formatNumber = (num: number): string => {
    if (num < 1000) return num.toString();
    if (num < 1_000_000) return `${(num / 1000).toFixed(1)}K`;
    return `${(num / 1_000_000).toFixed(1)}M`;
  };

  const formatTrend = (trend: number | undefined): string => {
    if (trend === undefined) return "";
    const sign = trend >= 0 ? "+" : "";
    return `${sign}${trend}%`;
  };

  const getTrendColor = (trend: number | undefined): string => {
    if (trend === undefined) return "text-gray-500";
    if (trend > 0) return "text-emerald-600";
    if (trend < 0) return "text-red-600";
    return "text-gray-500";
  };

  const getTrendBadgeColor = (trend: number | undefined): string => {
    if (trend === undefined) return "bg-gray-50 text-gray-500";
    if (trend > 0) return "bg-emerald-50 text-emerald-700";
    if (trend < 0) return "bg-red-50 text-red-700";
    return "bg-gray-50 text-gray-500";
  };

  const getTrendIcon = (trend: number | undefined) => {
    if (trend === undefined || trend === 0) return null;
    return trend > 0 ? FaArrowUp : FaArrowDown;
  };

  const safeTotal = Math.max(totalAds, 1);
  const activeRatio = Math.min((activeAds / safeTotal) * 100, 100);

  const stats = [
    {
      id: "totalAds",
      icon: FaAd,
      value: totalAds,
      label: "Total Ads",
      subtitle: "All-time listings",
      accent: "bg-orange-500",
      accentSoft: "bg-orange-50",
      trend: trends?.totalAds,
      showBar: false,
    },
    {
      id: "activeAds",
      icon: FaCheckCircle,
      value: activeAds,
      label: "Active Ads",
      subtitle: "Currently live",
      accent: "bg-emerald-500",
      accentSoft: "bg-emerald-50",
      trend: trends?.activeAds,
      showBar: true,
    },
  ];

  return (
    <section
      className={`w-full space-y-6 ${className}`}
      aria-label="Seller statistics"
    >
      {/* Top stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          const TrendIcon = getTrendIcon(stat.trend);
          // const isActiveCard = stat.id === "activeAds";

          return (
            <article
              key={stat.id}
              className="
                group relative overflow-hidden
                rounded-2xl border border-gray-100
                bg-white/80 backdrop-blur-sm
                shadow-sm hover:shadow-md
                transition-all duration-300
                focus-within:ring-2 focus-within:ring-orange-200
              "
              aria-label={stat.label}
            >
              {/* subtle gradient accent strip */}
              <div
                className={`
                  absolute inset-x-0 top-0 h-1
                  ${stat.accentSoft}
                `}
              />

              <div className="relative flex items-stretch gap-4 px-5 py-4 sm:px-6 sm:py-5">
                {/* Icon + label column */}
                <div className="flex flex-col items-start gap-3 w-24 shrink-0">
                  <div
                    className={`
                      w-11 h-11 sm:w-12 sm:h-12 rounded-2xl 
                      flex items-center justify-center
                      ${stat.accentSoft}
                      border border-white
                      shadow-sm
                      group-hover:scale-105 group-hover:shadow-md
                      transition-all duration-300
                    `}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                      {stat.label}
                    </p>
                    <p className="text-[11px] text-gray-400">{stat.subtitle}</p>
                  </div>
                </div>

                {/* Value + progress */}
                <div className="flex-1 flex flex-col justify-between gap-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                      {formatNumber(stat.value)}
                    </p>

                    {showTrends && (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[11px] text-gray-400 uppercase tracking-[0.14em]">
                          30d trend
                        </span>

                        {stat.trend !== undefined ? (
                          <div
                            className={`
                              inline-flex items-center gap-1 px-2 py-1 rounded-full
                              text-xs font-medium border border-gray-100
                              ${getTrendBadgeColor(stat.trend)}
                            `}
                          >
                            {TrendIcon && (
                              <TrendIcon
                                className={`w-3 h-3 ${getTrendColor(
                                  stat.trend
                                )}`}
                              />
                            )}
                            <span>{formatTrend(stat.trend)}</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-gray-400">
                            No data
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Progress bar only for active ads */}
                  {stat.showBar && (
                    <div className="mt-1">
                      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${stat.accent}`}
                          style={{ width: `${activeRatio}%` }}
                        />
                      </div>
                      <div className="mt-1 text-[11px] text-gray-500">
                        {safeTotal === 0
                          ? "No ads posted yet"
                          : `${activeRatio.toFixed(
                              0
                            )}% of all ads are currently active`}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Additional Seller Info */}
      {(memberSince || location) && (
        <div
          className="
            mt-1 
            p-5 sm:p-6 
            rounded-2xl 
            border 
            bg-white/60 
            backdrop-blur-xl 
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            transition-all duration-300
            relative
          "
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none
              bg-gradient-to-br from-orange-200/25 via-transparent to-orange-100/20
            "
          />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">
            {memberSince && (
              <div className="flex items-start gap-3">
                <div
                  className="
                    w-9 h-9 sm:w-10 sm:h-10 rounded-xl 
                    bg-gradient-to-br from-orange-500 to-orange-600
                    flex items-center justify-center 
                    shadow-md shadow-orange-500/30
                  "
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10m2 9H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Member Since
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900">
                    {memberSince}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Verified long-term seller
                  </p>
                </div>
              </div>
            )}

            {location && (
              <div className="flex items-start gap-3">
                <div
                  className="
                    w-9 h-9 sm:w-10 sm:h-10 rounded-xl 
                    bg-gradient-to-br from-blue-500 to-blue-600
                    flex items-center justify-center 
                    shadow-md shadow-blue-500/30
                  "
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0c-4 0-7 2.686-7 6v1h14v-1c0-3.314-3-6-7-6z"
                    />
                  </svg>
                </div>

                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Location
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900">
                    {location}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Buyers nearby can reach you faster
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SellerStats;
