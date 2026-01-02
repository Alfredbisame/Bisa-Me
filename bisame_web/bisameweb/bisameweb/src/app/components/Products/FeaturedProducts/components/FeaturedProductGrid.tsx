import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Product } from "../types";
import FeaturedProductCard from "./FeaturedProductCard";
import { useRef, useState, useEffect } from "react";

interface FeaturedProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const FeaturedProductGrid = ({
  products,
  onProductClick,
}: FeaturedProductGridProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollRef.current) {
        setMaxScroll(
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        );
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, [products]);

  const handleScroll = (scrollAmount: number) => {
    if (scrollRef.current) {
      const newScrollPosition = scrollPosition + scrollAmount;
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const showLeftArrow = scrollPosition > 10;
  const showRightArrow = scrollPosition < maxScroll - 10;

  return (
    <div className="relative w-full">
      {/* Left Arrow - Mobile only */}
      {showLeftArrow && (
        <div className="absolute -left-2 sm:-left-3 md:-left-4 inset-y-0 h-full flex justify-center items-center z-[99] md:hidden">
          <MdKeyboardArrowLeft
            size={24}
            className="sm:size-8 bg-[#00000022] rounded-full cursor-pointer text-white hover:bg-[#00000044] transition-colors"
            onClick={() => handleScroll(-200)}
          />
        </div>
      )}

      {/* Right Arrow - Mobile only */}
      {showRightArrow && (
        <div className="absolute -right-2 sm:-right-3 md:-right-4 inset-y-0 h-full flex justify-center items-center z-[99] md:hidden">
          <MdKeyboardArrowRight
            size={24}
            className="sm:size-8 bg-[#00000022] rounded-full cursor-pointer text-white hover:bg-[#00000044] transition-colors"
            onClick={() => handleScroll(500)}
          />
        </div>
      )}

      {/* Scrollable Container - Flex on mobile, Grid on desktop */}
      <div
        ref={scrollRef}
        onScroll={handleScrollEvent}
        className="flex md:grid gap-3 sm:gap-4 md:gap-4 lg:gap-5 overflow-x-scroll md:overflow-x-visible overflow-y-hidden scroll-smooth scrollbar-hide p-1 sm:p-2 md:p-0 md:grid-cols-4"
      >
        {products.slice(0, 4).map((product: Product, index: number) => (
          <div
            key={index}
            className="w-[140px] sm:w-[160px] md:w-full flex-shrink-0 md:flex-shrink"
          >
            <FeaturedProductCard
              product={product}
              index={index}
              onClick={onProductClick}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default FeaturedProductGrid;
