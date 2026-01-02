"use client";
import { BottomNavigation } from "@/app/components/BottomNavigation";
import { useBuySellData } from "@/app/components/BuySellMenu/useBuySellData";
import { Category } from "@/app/components/ServicesMenu/ServicesDropDown";
import useActiveCategory from "@/app/components/SubCategory/hooks/useActiveCategory";
import {
  CategoryType,
  getFormattedCategory,
} from "@/app/components/SubCategory/lib";
import SubCategoryCards from "@/app/components/SubCategory/SubCategoryCards";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  //
  const params = useParams();
  const category = params.category as CategoryType;
  const formattedCategory = getFormattedCategory(category);
  console.log(formattedCategory);

  const categoryTitle =
    getFormattedCategory(category) == "Buy and Sell"
      ? "products"
      : getFormattedCategory(category);

  const { categoriesData, processedCategories, error, isLoading } =
    useBuySellData(formattedCategory as string);

  console.log(categoriesData);

  // Logic to handle active category
  const { activeCategory, handleCategoryChange } =
    useActiveCategory(processedCategories);

  console.log(activeCategory);

  console.log(activeCategory);

  const handleSelectCategory = (categoryName: string) => {
    handleCategoryChange(categoryName);
  };

  if (isLoading) {
    return (
      <div className="h-72 w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" color="gray" />
      </div>
    );
  }

  if (error) {
    return <>Error occurred</>;
  }

  return (
    <div className="px-3 py-3 md:px-[3%] lg:px-[6%] xl:px-[7%] 2xl:px-[12%] space-y-2 flex flex-col min-h-[80%]">
      <div className="bg-orange-500 flex justify-between items-center px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-md">
        <h1 className="text-white text-xs sm:text-sm md:text-base xl:text-lg font-semibold tracking-wide">
          Choose your <span className="lowercase">{categoryTitle}</span>
        </h1>
        <span className="text-white text-xs md:text-sm italic opacity-90">
          Explore and discover the best!
        </span>
      </div>

      <div className="h-full flex gap-3 ">
        <div className="bg-white w-1/3 md:w-1/4 bg-opacity-90 space-y-1.5 rounded-lg p-2 shadow-md flex flex-col">
          {processedCategories.map(({ name, id }) => (
            <div
              key={id}
              className={`group cursor-pointer transition-colors duration-200 hover:bg-gray-50`}
              onClick={() => handleSelectCategory(name)}
            >
              <span
                className={`block text-xs md:text-sm font-semibold text-gray-800 truncate px-2 py-2 rounded-md transition-colors duration-200 group-hover:text-orange-600 ${
                  activeCategory == name ? "bg-gray-100" : ""
                }`}
                title={name}
              >
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-grow grid grid-cols-2 md:grid-cols-6 grid-rows-5 gap-3">
          {activeCategory && (
            <SubCategoryCards
              categoryName={activeCategory}
              categoryData={categoriesData?.find(
                (cat: Category) => cat.category === activeCategory
              )}
              category={formattedCategory as string}
            />
          )}
        </div>
      </div>
      <BottomNavigation activeTab="categories" />
    </div>
  );
};

export default CategoryPage;
