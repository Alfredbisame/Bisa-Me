import { useEffect, useState } from "react";

const usePromoDiscount = (price: number, discount: number) => {
  const [newPrice, setNewPrice] = useState<number | null>(null);

  useEffect(() => {
    const amountAfterDiscount = price * (1 - discount / 100);
    setNewPrice(amountAfterDiscount);
  }, [price, discount]);

  return {
    newPrice,
  };
};

export default usePromoDiscount;
