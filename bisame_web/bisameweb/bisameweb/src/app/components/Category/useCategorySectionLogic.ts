import { useRef, useState, useEffect } from "react";
import { useCategory } from "./useCategory";

interface Category {
  id: string;
  category: string;
  web_link: string;
}

export function useCategorySectionLogic() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch categories from API
  const { data: categories, loading, error } = useCategory();

  // Remove duplicates by id
  // Group by parent category
  const parentCategory = ""; // You may want to get this from API if available
  const uniqueCategories: Category[] = categories
    ? Array.from(new Map(categories.map((c) => [c.id, c])).values())
    : [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkIfMobile();
      window.addEventListener("resize", checkIfMobile);
      return () => window.removeEventListener("resize", checkIfMobile);
    }
  }, []);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsLeftDisabled(scrollLeft <= 0);
      setIsRightDisabled(Math.ceil(scrollLeft + clientWidth + 1) >= scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", checkScrollButtons);
    return () => {
      scrollContainer?.removeEventListener("scroll", checkScrollButtons);
    };
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return {
    loading,
    error,
    isMobile,
    uniqueCategories,
    parentCategory,
    scrollContainerRef,
    isLeftDisabled,
    isRightDisabled,
    scroll,
  };
} 