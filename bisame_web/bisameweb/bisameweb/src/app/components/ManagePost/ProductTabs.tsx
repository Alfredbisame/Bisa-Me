"use client";
import { useState } from "react";
import { NewTab, TabType } from "./types";
import ActiveProducts from "./ActiveProducts";
import ReviewProducts from "./ReviewProducts";
import DeclinedProducts from "./DeclinedProducts";
import ClosedProducts from "./ClosedProducts";
import UpdateProducts from "./UpdateProducts";
import PostContextProvider from "./context/PostContext";
import { TimerIcon, UserRoundCheckIcon, XCircle } from "lucide-react";
import { MdUpdate, MdWrongLocation } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import ProductsHeader from "../SavedProducts/SavedProductsHeader";
import Link from "next/link";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("ACTIVE");

  const tabs: TabType[] = ["ACTIVE", "REVIEW", "DECLINED", "UPDATE", "CLOSED"];

  const newTabs: NewTab[] = [
    {
      status: "ACTIVE",
      icon: <UserRoundCheckIcon size={15} />,
    },
    {
      status: "REVIEW",
      icon: <TimerIcon size={15} />,
    },
    {
      status: "UPDATE",
      icon: <MdUpdate size={15} />,
    },
    {
      status: "DECLINED",
      icon: <XCircle size={15} />,
    },
    {
      status: "CLOSED",
      icon: <IoClose size={15} />,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "ACTIVE":
        return <ActiveProducts />;
      case "REVIEW":
        return <ReviewProducts />;
      case "DECLINED":
        return <DeclinedProducts />;
      case "UPDATE":
        return <UpdateProducts />;
      case "CLOSED":
        return <ClosedProducts />;
      default:
        return <ActiveProducts />;
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="my-3 md:my-0">
          <ProductsHeader
            header="Manage Posts"
            description="These are your posts. You can revisit or manage
        them anytime."
          />
          <ul className="flex gap-1 md:gap-5">
            {newTabs.map((tab) => (
              <li key={tab.status} className="text-xs">
                <button
                  onClick={() => setActiveTab(tab.status)}
                  className={`border p-2 rounded-lg text-xs flex flex-col gap-1 items-center justify-center ${
                    activeTab === tab.status
                      ? "text-green-500 border-green-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.icon}
                  {tab.status}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Render the appropriate tab content */}
        <PostContextProvider>{renderTabContent()}</PostContextProvider>

        {/* Suggestion to make a promotion */}
        <div className="my-5">
          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Looking forward to boost your post visibility. Why not try promotion to gain visibility on Bisame. {" "}
            <Link href={`/dashboard/promotion`} className="underline text-orange-500">Click here to promote your product</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
