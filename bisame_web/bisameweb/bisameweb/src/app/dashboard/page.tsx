import DashboardSideBar from "../components/DashboardSideBar/DashboardSideBar";
import DashboardContent from "../components/Dashboard/DashboardContent";
import BrowsingHistory from "../components/BrowsingHistory/BrowsingHistory";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { BottomNavigation } from "../components/BottomNavigation";
import MobileDashboardOptions from "../components/Dashboard/MobileDashboardOptions";

const DashboardPage = () => {
  return (
    <>
      <div>
        <div className="flex flex-row md:gap-8 p-3 sm:px-5 md:px-8 lg:px-16 xl:px-24 2xl:px-56 gap-2 relative ">
          <DashboardSideBar />
          <div className="md:w-full md:my-5">
            <DashboardHeader />
            <DashboardContent />
            <BrowsingHistory />
            <MobileDashboardOptions />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default DashboardPage;
