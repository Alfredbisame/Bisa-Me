"use client";

import React from "react";
import CategoryAdsCard from "../components/SellButton/CategoryAdsCard";
import { categories, Category } from "../components/SellButton/constant";
import { useRouter } from "next/navigation";
import { BottomNavigation } from "../components/BottomNavigation";

const PostsPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="px-5 md:px-[10%] lg:px-[15%] xl:px-[20%]">
        <div className="mb-6">
          <div className="bg-orange-500 rounded-lg my-5 p-2 flex items-center justify-between">
            <h2 className="md:text-xl font-semibold text-white">Posts</h2>
            <p className="text-sm md:text-base text-white text-center">
              Select where to post
            </p>
          </div>
        </div>

        {/* Options */}
        <div className=" grid grid-cols-2 gap-5">
          {categories.map((category: Category, index: number) => (
            <CategoryAdsCard
              icon={category.icon}
              categoryName={category.categoryName}
              categoryDescription={category.categoryDescription}
              buttonAction={() =>
                router.push(
                  `/sell/allcategory?group=${encodeURIComponent(
                    category.catRouteName
                  )}`
                )
              }
              key={index}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Choose the category that best fits your post
          </p>
        </div>
      </main>
      <BottomNavigation activeTab="post" />
    </div>
  );
};

export default PostsPage;
