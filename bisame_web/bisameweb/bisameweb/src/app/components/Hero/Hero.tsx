import MainBanner from "./MainBanner";
import SideBanner from "./SideBanner";

const Hero = () => {
  return (
    <div className="bg-white w-full">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 py-4">
        <div className="grid items-stretch gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 md:grid-cols-3 md:min-h-[350px] lg:min-h-[450px]">
          <div className="col-span-1 md:col-span-2 w-full md:h-full">
            <MainBanner />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full md:h-full">
            <div className="h-26 sm:h-32 md:h-48 lg:h-auto md:flex-1">
              <SideBanner title="Bisame Tv" isDark={true} type="tv" />
            </div>
            <div className="h-26 sm:h-32 md:h-48 lg:h-auto md:flex-1">
              <SideBanner title="Bisame Trade Assurance" type="shop" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
