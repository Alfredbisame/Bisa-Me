import MobileDashboardOptions from "@/app/components/Dashboard/MobileDashboardOptions";
import AffiliateManager from "../../components/Affiliate/AffiliateManager";
import DashboardSideBar from "../../components/DashboardSideBar/DashboardSideBar";

const AffiliatePage = () => {
  return (
    <>
      <div className="flex flex-row md:gap-8 px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-56 gap-2 relative ">
        <DashboardSideBar />
        <div className="flex-1 md:w-full my-2 mr-2 md:my-5 md:mr-0">
          <AffiliateManager />
          <MobileDashboardOptions />
        </div>
      </div>
    </>
  );
};

export default AffiliatePage;
