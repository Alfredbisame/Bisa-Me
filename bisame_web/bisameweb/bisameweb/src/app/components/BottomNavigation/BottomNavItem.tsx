"use client"
import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

interface BottomNavItemProps {
  icon: IconType;
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({
  icon: Icon,
  label,
  isActive = false,
  onClick,
  href,
  className = "",
}) => {
  const baseClasses =
    "flex items-center gap-2 sm:gap-3 text-white font-semibold text-base sm:text-lg focus:outline-none transition-all duration-200";

  const activeClasses = isActive
    ? "bg-[#145FF7] rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-[0_0_15px_#3a1cae] scale-105"
    : "hover:scale-110";

  const combinedClasses = `${baseClasses} ${activeClasses} ${className}`;

  const pathname = usePathname()

  const content = (
    <>
      <Icon
        className={isActive ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}
      />
      {isActive && label && (
        <span className="text-sm sm:text-base -z-50">{label}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      type="button"
      aria-label={label || "Navigation item"}
      aria-current={isActive ? "page" : undefined}
    >
      {content}
    </button>
  );
};

export default BottomNavItem;
