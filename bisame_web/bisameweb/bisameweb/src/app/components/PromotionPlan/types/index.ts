export interface PricingOption {
  label: string;
  value: number;
  discountedPrice: number;
  price: number;
}

export interface PromotionPlanSnapshot {
  title: string;
  description: string;
  numberOfAdsAllowed: number;
  features: any[]; // Replace `any` with a specific type if known
  benefits: any[]; // Replace `any` with a specific type if known
}

export interface SectionItem {
  // Define properties if you know them
  [key: string]: any;
}

export interface Promotion {
  _id: string;
  id: string;
  userId: string;
  promotionPlanId: string;

  pricingOption: PricingOption;
  promotionPlanSnapshot: PromotionPlanSnapshot;

  promotedItems: string[];
  sectionItems: SectionItem[];

  status: "Active" | "Inactive" | "Expired";

  startDate: string; // ISO date string
  endDate: string; // ISO date string
  createdAt: string; // ISO date string

  createdBy: string | null;
  updatedBy: string | null;
  updatedAt: string | null;

  __v: number;
}
