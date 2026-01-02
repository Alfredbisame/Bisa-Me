import { useEffect, useState } from "react";
import { ProcessedCategory } from "../../BuySellMenu/useBuySellData";

const useActiveCategory = (processedCategories: ProcessedCategory[]) => {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const handleCategoryChange = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  useEffect(() => {
    if (!activeCategory && processedCategories?.length > 0) {
      setActiveCategory(processedCategories[0].name);
    }
  }, [processedCategories, activeCategory]);

  return { activeCategory, handleCategoryChange };
};

export default useActiveCategory;
