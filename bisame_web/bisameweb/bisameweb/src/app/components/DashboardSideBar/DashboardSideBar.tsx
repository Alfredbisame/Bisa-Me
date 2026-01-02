"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiShoppingCart, GiTakeMyMoney } from "react-icons/gi";
import { TfiDashboard } from "react-icons/tfi";
import { BsShieldCheck } from "react-icons/bs";
import { CiSaveDown1 } from "react-icons/ci";
import { MdDiscount, MdOutlineRateReview } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BiPurchaseTag } from "react-icons/bi";
import { SlUserFollowing } from "react-icons/sl";
import { TbSettingsSpark } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import DashboardNavList from "./DashboardNavList";
import { useLogout } from "./useLogout";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isLogout?: boolean;
}

const STORAGE_KEY = "dashboardActiveTab";

const DashboardSideBar = () => {
  const pathname = usePathname();
  const handleLogout = useLogout();

  // Load persisted tab once (client-only), fall back to current pathname
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window === "undefined") return pathname;
    return localStorage.getItem(STORAGE_KEY) || pathname;
  });

  // Always keep activeTab in sync with actual route (refresh, back/forward, direct URL)
  useEffect(() => {
    setActiveTab(pathname);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, pathname);
    }
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      icon: <GiShoppingCart />,
      label: "Manage Post",
      href: "/dashboard/manage-post",
    },
    {
      icon: <IoChatbubblesOutline />,
      label: "Messages",
      href: "/dashboard/chat-messages",
    },
    {
      icon: <GiTakeMyMoney />,
      label: "Make Money",
      href: "/dashboard/make-money",
    },
    {
      icon: <BsShieldCheck />,
      label: "Trade Assurance",
      href: "/dashboard/trade-assurance",
    },
    { icon: <CiSaveDown1 />, label: "Saved", href: "/dashboard/saved" },
    { icon: <MdDiscount />, label: "Promotion", href: "/dashboard/promotion" },
    {
      icon: <BiPurchaseTag />,
      label: "Purchases",
      href: "/dashboard/purchases",
    },
    {
      icon: <MdOutlineRateReview />,
      label: "Review",
      href: "/dashboard/reviews",
    },
    {
      icon: <SlUserFollowing />,
      label: "Followers",
      href: "/dashboard/followers",
    },
    {
      icon: <TbSettingsSpark />,
      label: "Setting",
      href: "/dashboard/settings",
    },
    { icon: <IoIosLogOut />, label: "Log-out", href: "#", isLogout: true },
  ];

  const handleTabClick = (href: string, isLogout?: boolean) => {
    if (isLogout) {
      handleLogout();
      return;
    } 

    setActiveTab(href);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, href);
    }
  };

  return (
    <div className="bg-blue-900/95 w-15 md:min-w-52 md:max-w-52 lg:w-52 h-full md:h-1/2 sticky top-0 md:top-5 hidden md:block my-5 ">
      <Link href="/dashboard" onClick={() => handleTabClick("/dashboard")}>
        <div
          className={`py-3 md:px-4 rounded-t-sm flex items-center justify-center md:justify-start cursor-pointer ${
            activeTab === "/dashboard"
              ? "bg-orange-500 text-white border-l-4 border-blue-600"
              : "text-white"
          }`}
        >
          <TfiDashboard className="md:mr-2" />
          <span className="hidden md:block">Dashboard</span>
        </div>
      </Link>

      <DashboardNavList
        navItems={navItems}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />
    </div>
  );
};

export default DashboardSideBar;
