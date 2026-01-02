import React from "react";

interface SavedProductsHeaderProps {
  productsCount?: number;
  header: string;
  description: string;
}

const ProductsHeader: React.FC<SavedProductsHeaderProps> = ({
  productsCount,
  header,
  description
}) => {
  const isSingle = productsCount === 1;

  return (
    <header className="mb-5 md:mb-5">
      {/* Title Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900 relative w-fit">
          {header}
          {/* Accent underline */}
          <span className="absolute left-0 -bottom-1 w-10 h-1 rounded-full bg-orange-500/70"></span>
        </h1>

        {/* Count badge */}
        {productsCount && (
          <span
            className="
          px-3 py-1.5 text-sm font-medium 
          rounded-full bg-orange-50 text-orange-700 
          border border-orange-200 shadow-sm
        "
          >
            {productsCount} {isSingle ? "item" : "items"}
          </span>
        )}
      </div>

      {/* Subtitle */}
      <p className="mt-3 text-gray-600 text-sm sm:text-base">
        {description}
      </p>
    </header>
  );
};

export default ProductsHeader;
