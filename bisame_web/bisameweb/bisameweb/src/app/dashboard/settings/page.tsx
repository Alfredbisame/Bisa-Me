import AccountSettings from "@/app/components/AccountSettings/AccountSettings";
import { BottomNavigation } from "@/app/components/BottomNavigation";
import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";

const SettingsPage = () => {
  return (
    <>
      <div className="flex flex-row md:gap-8 p-3 sm:px-5 md:px-8 lg:px-16 xl:px-24 2xl:px-56 gap-2 relative ">
        <DashboardSideBar />
        <div className="md:w-full md:my-5">
          <AccountSettings />
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default SettingsPage;
