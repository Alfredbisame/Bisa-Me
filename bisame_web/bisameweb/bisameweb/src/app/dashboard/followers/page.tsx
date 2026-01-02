import { BottomNavigation } from "@/app/components/BottomNavigation";
import MobileDashboardOptions from "@/app/components/Dashboard/MobileDashboardOptions";
import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";
import FollowersFollowing from "@/app/components/FollowersFollowing/FollowersFollowing";

const FollowingPage = () => {
  return (
    <>
      <div className="flex flex-row md:gap-8 p-3 sm:px-5 md:px-8 lg:px-16 xl:px-24 2xl:px-56 gap-2 relative ">
        <DashboardSideBar />
        <div className="md:w-full md:my-5">
          <FollowersFollowing />
          <MobileDashboardOptions />
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default FollowingPage;
