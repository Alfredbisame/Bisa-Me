import type { TabType } from "./types";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  hasNoPrice?: boolean;
}

const TabNavigation = ({
  activeTab,
  onTabChange,
  hasNoPrice,
}: TabNavigationProps) => {
  const tabs: TabType[] = ["DESCRIPTION", "ADDITIONAL INFORMATION", "REVIEW"];

  return (
    <div className="border-b border-gray-200">
      <ul className="flex space-x-8 items-center justify-center">
        {hasNoPrice
          ? tabs.map((tab) => {
              const middleIndex = Math.floor(tabs.length / 2);
              tabs.splice(middleIndex, 1);
              console.log(tabs);

              return (
                <li
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`pb-3 text-xs px-1 cursor-pointer transition-all duration-300 md:text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-orange-500 text-orange-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </li>
              );
            })
          : tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`pb-3 text-xs px-1 cursor-pointer transition-all duration-300 md:text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
                }`}
              >
                {tab}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TabNavigation;
