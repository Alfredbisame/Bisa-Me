import Hero from "./components/Hero/Hero";
// import CategorySection from "./components/Category/CategorySection";
import TrendingProducts from "./components/Products/TrendingProducts/TrendingProducts";
import FeaturedProducts from "./components/Products/FeaturedProducts";
import TopMarketplaceDeals from "./components/Products/TopMarketplaceDeals/MarketProducts";
import { BottomNavigation } from "./components/BottomNavigation";
import LocalServices from "./components/Products/ExploreLocalServices/LocalServices";
import LatestListings from "./components/Products/LatestListings/LatestListings";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <TopMarketplaceDeals />
      <LocalServices />
      <LatestListings />
      <TrendingProducts />
      {/* <CategorySection /> */}
      <BottomNavigation activeTab="home" /> 
    </>
  );
}
