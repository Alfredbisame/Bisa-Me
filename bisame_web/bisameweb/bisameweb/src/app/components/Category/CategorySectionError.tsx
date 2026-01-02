import React from "react";

interface CategorySectionErrorProps {
  error: string;
}

const CategorySectionError: React.FC<CategorySectionErrorProps> = ({ error }) => (
  <div className="text-center text-red-500 py-8">{error}</div>
);

export default CategorySectionError; 