"use client";
import CategorySectionMobile from "./CategorySectionMobile";
import { getImageUrl } from "../ProductDetails/utils/imageUtils";
import CategorySectionDesktop from "./CategorySectionDesktop";
import CategorySectionSkeleton from "./CategorySectionSkeleton";
import CategorySectionError from "./CategorySectionError";
import { useCategorySectionLogic } from "./useCategorySectionLogic";

const CategorySection = () => {
  const {
    loading,
    error,
    isMobile,
    uniqueCategories,
    scrollContainerRef,
    isLeftDisabled,
    isRightDisabled,
    scroll,
  } = useCategorySectionLogic();

  return (
    <div className="w-full bg-white mx-auto px-4 sm:px-6 lg:px-56 py-8">
      <h2 className="hidden md:block text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Shop By Categories
      </h2>
      {loading ? (
        <CategorySectionSkeleton />
      ) : error ? (
        <CategorySectionError error={error} />
      ) : !uniqueCategories.length ? (
        <div className="text-center py-8">No categories found.</div>
      ) : isMobile ? (
        <CategorySectionMobile
          categories={uniqueCategories.map(({ id, category, web_link }) => ({
            id,
            name: category,
            imageUrl: getImageUrl(web_link),
            alt: category,
          }))}
        />
      ) : (
        <CategorySectionDesktop
          categories={uniqueCategories}
          scrollContainerRef={scrollContainerRef}
          isLeftDisabled={isLeftDisabled}
          isRightDisabled={isRightDisabled}
          scroll={scroll}
        />
      )}
    </div>
  );
};

export default CategorySection;