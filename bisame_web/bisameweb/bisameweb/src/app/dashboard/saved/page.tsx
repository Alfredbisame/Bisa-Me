import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";
import SavedProducts from "./../../components/SavedProducts/SavedProducts";
import { BottomNavigation } from "@/app/components/BottomNavigation";
import MobileDashboardOptions from "@/app/components/Dashboard/MobileDashboardOptions";

const SavedProductsPage = () => {
  return (
    <>
      <div className="flex flex-row md:gap-8 p-3 sm:px-5 md:px-8 lg:px-16 xl:px-24 2xl:px-56 gap-2 relative ">
        <DashboardSideBar />
        <div className="md:w-full md:my-5">
          <SavedProducts />
          <MobileDashboardOptions />
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default SavedProductsPage;
