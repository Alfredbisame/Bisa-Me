export interface PricingOption {
  label: string; // e.g. "month"
  value: number; // e.g. 1
  discountedPrice: number;
  price: number;
}

export interface SectionItem {
  sectionTitle?: string;
  itemIds?: string[];
}

export interface PromoBenefit {
  id?: string;
  title?: string;
  description?: string;
}

export interface PromoFeature {
  id?: string;
  label?: string;
  value?: string | number | boolean;
}

export interface PromotionDuration {
  id?: string;
  label?: string;
  durationInDays?: number;
  price?: number;
}

export interface PromotionPlanSnapshot {
  title: string;
  description: string;
  category: string;

  promotionPlanGroup: "Buy and Sell" | "Services" | string;

  status: "Active" | "Inactive" | string;

  discount: number;
  discountLabel: string;
  discountEndDate: string;

  numberOfAdsAllowed: number;
  position: number;
  searchRank: number;

  akodeaPromoBadge: boolean;
  akwaabaPromoBadge: boolean;
  ohenePromoBadge: boolean;
  sikaPromoBadge: boolean;

  benefits: PromoBenefit[];
  features: PromoFeature[];
  promotionDurationList: PromotionDuration[];
}

export interface UserPromotion {
  _id: string;
  id: string;

  userId: string;
  promotionPlanId: string;

  pricingOption: PricingOption;

  promotedItems: string[];
  sectionItems: SectionItem[];

  promotionPlanSnapshot: PromotionPlanSnapshot;

  startDate: string;
  endDate: string;

  status: "Active" | "Inactive" | string;

  createdAt: string;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;

  __v: number;
}

export interface PaginatedUserPromotions {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  results: UserPromotion[];
}

export interface UserPromotionsResponse {
  code: number;
  message: string;
  data: PaginatedUserPromotions;
}

export enum TransactionStatus {
  Pending = "Pending",
  Successful = "Successful",
  Failed = "Failed",
  Cancelled = "Cancelled",
  Processing = "Processing",
}
