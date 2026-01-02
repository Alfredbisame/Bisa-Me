"use client";

import { FiPackage } from "react-icons/fi";

const EmptyState: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto p-2 sm:px-6 md:px-52 lg:px-52">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Related Products</h2>
      <div className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <FiPackage className="text-gray-400 text-6xl" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              No related products found
            </h3>
            <p className="text-gray-600 text-sm">
              We couldn&apos;t find any products similar to this one at the moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
