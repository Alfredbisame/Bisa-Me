import { TfiDashboard } from "react-icons/tfi";
import { DashboardOptions } from "./types";
import { FaBookmark, FaBullhorn, FaClipboardList, FaMoneyBillWave, FaShieldAlt, FaShoppingBag, FaStar, FaUsers } from "react-icons/fa";

export const dashboardOptions: DashboardOptions[] = [
  {
    id: 1,
    option: "Dashboard",
    description: "View Dashboard",
    href: "/dashboard",
    icon: <TfiDashboard className="md:mr-2 text-lg" />,
  },
  {
    id: 2,
    option: "Manage Post",
    description: "My Post",
    href: "/dashboard/manage-post",
    icon: <FaClipboardList className="md:mr-2 text-lg" />,
  },
  {
    id: 3,
    option: "Make Money",
    description: "Revenue, Withdrawal, Affiliates",
    href: "/dashboard/make-money",
    icon: <FaMoneyBillWave className="md:mr-2 text-lg" />,
  },
  {
    id: 4,
    option: "Trade Assurance",
    description: "Order arrives just right. Coming soon",
    href: "/dashboard/trade-assurance",
    icon: <FaShieldAlt className="md:mr-2 text-lg" />,
  },
  {
    id: 5,
    option: "Saved",
    description: "Favorite posts or products",
    href: "/dashboard/saved",
    icon: <FaBookmark className="md:mr-2 text-lg" />,
  },
  {
    id: 6,
    option: "Promotion",
    description: "Promote your post",
    href: "/dashboard/promotion",
    icon: <FaBullhorn className="md:mr-2 text-lg" />,
  },
  {
    id: 7,
    option: "Promotional Purchases",
    description: "Your package purchase history",
    href: "/dashboard/purchases",
    icon: <FaShoppingBag className="md:mr-2 text-lg" />,
  },
  {
    id: 8,
    option: "Review",
    description: "Reviews from client",
    href: "/dashboard/reviews",
    icon: <FaStar className="md:mr-2 text-lg" />,
  },
  {
    id: 9,
    option: "Followers",
    description: "Your followers",
    href: "/dashboard/followers",
    icon: <FaUsers className="md:mr-2 text-lg" />,
  },
];
