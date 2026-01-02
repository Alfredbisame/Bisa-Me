import { ProductPromoListProps, PromoListProps } from "../constants";
import { BenefitProps } from "../PromotionCard";

export interface PromotionPlanData {
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: unknown;
  createdBy: unknown;
  category: string;
  title: string;
  features: Feature[];
  searchRank: number;
  discount: number;
  discountEndDate: unknown;
  sikaPromoBadge: boolean;
  akwaabaPromoBadge: boolean;
  description: string;
  status: string;
  promotionPlanGroup: string;
  benefits: Benefit[];
  excludedBenefits: ExcludedBenefit[];
  numberOfAdsAllowed: number;
  ohenePromoBadge: boolean;
  akodeaPromoBadge: boolean;
  promotionDurationList: PromotionDurationList[];
  discountLabel: string;
  position: number;
  __v: number;
}

export interface NewPromotionPlanData {
  data: PromotionPlanData[];
}

export interface Feature {
  title: string;
  included: boolean;
}

export interface Benefit {
  sectionTitle: string;
  numberOfItemsAllowed: number;
}

export interface ExcludedBenefit {
  sectionTitle: string;
  numberOfItemsAllowed: number;
}

export interface SectionItem {
  sectionTitle: string;
  selectedItems: string[];
}

export interface PromotionDurationList {
  label: string;
  value: number;
  price: number;
  discountedPrice: number;
}

export interface PromoPlanRoot {
  pricingOption: PricingOption;
  promotionPlanId: string;
  sectionItems: SectionItem[];
  otherPromotedItems: string[];
}

export interface PricingOption {
  label: string;
  value: number;
  price: number;
  discountedPrice: number;
}

export type PromoNav = "main" | "listing";
export interface PromotionChildrenProps {
  children: React.ReactNode;
}

export type ObjectProps = Record<
  string,
  string | string[] | BenefitProps[] | number
>;

export interface SelectedItems {
  sectionTitle: string;
  selectedItems: string[];
}

export interface PromotionProps {
  featuredpost: string;
  trending: string;
  topmarketplacedeals: string;
}

export type BenefitItem = {
  sectionTitle: string;
  numberOfItemsAllowed: number;
};

export interface PromoContextProps {
  selectedPromotion: ObjectProps;
  selectedProduct: ProductPromoListProps[];
  countListing: number;
  benefit?: BenefitProps[];
  benefitQuantity?: Record<string, number>;
  selectedCount: number;
  promotionSelected: PromoListProps;
  promoPlan: PromotionPlanData | undefined;
  promoNav: PromoNav;
  sectionItems: SelectedItems[] | [];
  handleSelectPromotion: (data: ObjectProps) => void;
  handleResetSelection: () => void;
  handleIncrementCount: (key: string) => void;
  handleDecrementCount: (key: string) => void;
  handleSelectedProduct: (data: ProductPromoListProps) => void;
  handleRemoveSelectedProduct: (data: ProductPromoListProps) => void;
  handleBenefitChange: (data: BenefitProps[]) => void;
  handleIncrementSelectedCount: () => void;
  handleDecrementSelectedCount: () => void;
  handleResetSelectedCount: () => void;
  handleAddPromotion: (data: string) => void;
  handleRemovePromotion: (data: string) => void;
  handlePromoPlan: (data: PromotionPlanData) => void;
  handlePromoNavChange: (nav: PromoNav) => void;
  handleSectionItems: (sectionTitle: string, value: string) => void;
  handleRemoveSectionItem: (sectionTitle: string, value: string) => void;
}


export enum PaymentMethod {
  CreditCard = "Credit Card",
  MobileMoney = "Mobile Money",
  Cash = "Cash",
  BankTransfer = "Bank Transfer",
  Cheque = "Cheque",
}


