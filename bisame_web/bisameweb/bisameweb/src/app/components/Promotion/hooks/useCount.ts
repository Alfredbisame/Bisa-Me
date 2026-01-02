import { usePromoContext } from "../context/PromotionContext";

const useCount = () => {
  const {
    countListing,
    handleIncrementSelectedCount,
    handleDecrementSelectedCount,
    handleResetSelectedCount,
  } = usePromoContext();

  const handleSelectionCount = (type: "increment" | "decrement" | "reset") => {
    if (type === "increment") handleIncrementSelectedCount();
    if (type === "decrement") handleDecrementSelectedCount();
    if (type === "reset") handleResetSelectedCount();
  };

  return { handleSelectionCount, countListing };
};

export default useCount;
