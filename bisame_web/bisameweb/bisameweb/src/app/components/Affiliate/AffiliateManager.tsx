"use client";
import { useState } from "react";
import AffiliateTab from "./AffiliateTab";
import RevenueTab from "./RevenueTab";
import InviteFriendTab from "./InviteFriendTab";

type TabType = "AFFILIATE" | "REVENUE" | "INVITE";

const AffiliateManager = () => {
  const [activeTab, setActiveTab] = useState<TabType>("AFFILIATE");

  const renderTabContent = () => {
    switch (activeTab) {
      case "AFFILIATE":
        return <AffiliateTab />;
      case "REVENUE":
        return <RevenueTab />;
      case "INVITE":
        return <InviteFriendTab />;
      default:
        return <AffiliateTab />;
    }
  };

  return (
    <div>
      <div className="max-w-7xl min-h-80 mx-auto shadow-sm border border-gray-50 rounded-xl">
        <div className="flex border-b border-gray-50">
          {(["AFFILIATE", "REVENUE", "INVITE"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pt-4 pb-2 px-4 text-xs text-center text-gray-700 ${
                activeTab === tab ? "border-b-2 border-orange-500" : ""
              }`}
            >
              {tab === "INVITE" ? "INVITE A FRIEND" : tab}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AffiliateManager;
