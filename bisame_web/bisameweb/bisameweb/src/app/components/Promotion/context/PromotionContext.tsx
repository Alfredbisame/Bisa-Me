"use client";
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ProductPromoListProps, PromoListProps } from "../constants";
import { BenefitProps } from "../PromotionCard";
import toast from "react-hot-toast";
import {
  BenefitItem,
  ObjectProps,
  PromoContextProps,
  PromoNav,
  PromotionChildrenProps,
  PromotionPlanData,
  SelectedItems,
} from "../interfaces";
import { isBenefitArray } from "../utils";

const PromoContext = createContext<PromoContextProps | null>(null);

const PromotionContext: React.FC<PromotionChildrenProps> = ({ children }) => {
  const [promoNav, setPromoNav] = useState<PromoNav>("main");
  const [selectedPromotion, setSelectedPromotion] = useState<ObjectProps>({});
  const [selectedProduct, setSelectedProduct] = useState<
    ProductPromoListProps[]
  >([]);
  const [countListing, setCountListing] = useState(0);
  const [benefit, setBenefit] = useState<BenefitProps[]>();
  const [, setReachMaxLimit] = useState(false);
  const [sectionItems, setSectionItems] = useState<SelectedItems[]>([]);
  const [benefitQuantity, setBenefitQuantity] =
    useState<Record<string, number>>();
  const [selectedCount, setSelectedCount] = useState(0);
  const [promotionSelected, setPromotionSelected] = useState<PromoListProps>(
    []
  );
  const [promoPlan, setPromoPlan] = useState<PromotionPlanData>();

  console.log(promotionSelected);

  // Memoize all handler functions
  const handlePromoNavChange = useCallback((nav: PromoNav) => {
    setPromoNav(nav);
  }, []);

  const handleSelectPromotion = useCallback((data: ObjectProps) => {
    setSelectedPromotion((prevSelected) => ({ ...prevSelected, ...data }));
  }, []);

  const handleSectionItems = useCallback(
    (sectionTitle: string, value: string) => {
      setSectionItems((prev) => {
        const existing = prev.find(
          (item) => item.sectionTitle === sectionTitle
        );

        if (!existing) {
          return [
            ...prev,
            {
              sectionTitle,
              selectedItems: [value],
            },
          ];
        }

        return prev.map((item) =>
          item.sectionTitle === sectionTitle
            ? {
                ...item,
                selectedItems: item.selectedItems.includes(value)
                  ? item.selectedItems
                  : [...item.selectedItems, value],
              }
            : item
        );
      });
    },
    []
  );

  const handleRemoveSectionItem = useCallback(
    (sectionTitle: string, value: string) => {
      setSectionItems((prev) =>
        prev
          .map((item) =>
            item.sectionTitle === sectionTitle
              ? {
                  ...item,
                  selectedItems: item.selectedItems.filter((x) => x !== value),
                }
              : item
          )
          .filter((item) => item.selectedItems.length > 0)
      );
    },
    []
  );

  const handlePromoPlan = useCallback((data: PromotionPlanData) => {
    setPromoPlan(data);
  }, []);

  const handleAddPromotion = useCallback((data: string) => {
    setPromotionSelected((prevPromo) => [
      ...(prevPromo as PromoListProps),
      data,
    ]);
  }, []);

  const handleRemovePromotion = useCallback((data: string) => {
    setPromotionSelected((prevPromo) => {
      const filterPromo = prevPromo?.filter((promoName) => promoName !== data);
      return filterPromo;
    });
  }, []);

  const handleBenefitChange = useCallback((data: BenefitProps[]) => {
    setBenefit(data);
  }, []);

  const handleIncrementCount = useCallback((key: string) => {
    setBenefitQuantity((prev) => {
      if (!prev) return prev;
      if (prev[key] > 0) return { ...prev, [key]: prev[key] - 1 };
      return prev;
    });
  }, []);

  const handleDecrementCount = useCallback((key: string) => {
    setBenefitQuantity((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: (prev[key] || 0) + 1 };
    });
  }, []);

  const handleIncrementSelectedCount = useCallback(() => {
    setSelectedCount((prev) => prev + 1);
  }, []);

  const handleDecrementSelectedCount = useCallback(() => {
    setSelectedCount((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleResetSelectedCount = useCallback(() => {
    setSelectedCount(0);
  }, []);

  const handleSelectedProduct = useCallback((data: ProductPromoListProps) => {
    setSelectedProduct((prev) => [...prev, data]);
  }, []);

  const handleRemoveSelectedProduct = useCallback(
    (data: ProductPromoListProps) => {
      setSelectedProduct((prev) => prev.filter((item) => item.id !== data.id));
    },
    []
  );

  const handleResetSelection = useCallback(() => {
    setSelectedProduct([]);
    setCountListing(0);
    setSelectedCount(0);
  }, []);

  // Effect to update benefit quantities
  useEffect(() => {
    const benefit = selectedPromotion?.benefit;

    if (!isBenefitArray(benefit)) return;

    const quantities: Record<string, number> = benefit.reduce(
      (acc: Record<string, number>, b: BenefitItem) => {
        const key = b.sectionTitle.replaceAll(" ", "").toLowerCase();
        acc[key] = b.numberOfItemsAllowed;
        return acc;
      },
      {}
    );

    setBenefitQuantity(quantities);
  }, [selectedPromotion?.benefit]);

  // Effect to show max limit toast
  useEffect(() => {
    if (selectedCount === selectedPromotion?.adsNumber && selectedCount > 0) {
      toast.success("You have reached your maximum limit");
      setReachMaxLimit(true);
    }
  }, [selectedCount, selectedPromotion?.adsNumber]);

  // Memoize context value to prevent unnecessary rerenders
  const contextValue = useMemo(
    () => ({
      promoNav,
      selectedProduct,
      countListing,
      benefit,
      benefitQuantity,
      selectedCount,
      promotionSelected,
      promoPlan,
      selectedPromotion,
      sectionItems,
      handleSelectPromotion,
      handlePromoNavChange,
      handleRemoveSelectedProduct,
      handleBenefitChange,
      handleSelectedProduct,
      handleResetSelection,
      handleDecrementCount,
      handleIncrementCount,
      handleIncrementSelectedCount,
      handleDecrementSelectedCount,
      handleResetSelectedCount,
      handleAddPromotion,
      handleRemovePromotion,
      handlePromoPlan,
      handleSectionItems,
      handleRemoveSectionItem,
    }),
    [
      promoNav,
      selectedProduct,
      countListing,
      benefit,
      benefitQuantity,
      selectedCount,
      promotionSelected,
      promoPlan,
      selectedPromotion,
      sectionItems,
      handleSelectPromotion,
      handlePromoNavChange,
      handleRemoveSelectedProduct,
      handleBenefitChange,
      handleSelectedProduct,
      handleResetSelection,
      handleDecrementCount,
      handleIncrementCount,
      handleIncrementSelectedCount,
      handleDecrementSelectedCount,
      handleResetSelectedCount,
      handleAddPromotion,
      handleRemovePromotion,
      handlePromoPlan,
      handleSectionItems,
      handleRemoveSectionItem,
    ]
  );

  return (
    <PromoContext.Provider value={contextValue}>
      {children}
    </PromoContext.Provider>
  );
};

export const usePromoContext = () => {
  const context = React.useContext(PromoContext);
  if (!context)
    throw new Error("usePromoContext must be used within PromotionContext");
  return context;
};

export default PromotionContext;
