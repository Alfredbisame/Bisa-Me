"use client";

import Link from "next/link";
import { dashboardOptions } from "./constants";

const MobileDashboardOptions = () => {
  return (
    <nav className="md:hidden grid gap-4">
      {dashboardOptions.map(({ id, option, description, href, icon }) => (
        <Link
          key={id}
          href={href}
          className="group relative flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md border border-orange-100 transition-all duration-300 active:scale-[0.97] hover:shadow-lg"
        >
          {/* Orange glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/10 via-orange-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Icon container */}
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-lg">
            {icon}
          </div>

          {/* Text content */}
          <div className="relative z-10 flex flex-col">
            <span className="text-sm font-bold text-gray-900">{option}</span>
            <span className="text-xs text-gray-600 leading-snug">
              {description}
            </span>
          </div>

          {/* Arrow hint */}
          <span className="ml-auto text-orange-400 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileDashboardOptions;
