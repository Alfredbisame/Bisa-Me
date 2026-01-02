export interface CategoryData {
  id: string;
  category: string;
  isPromotion: boolean;
  group: string;
  subCategories: {
    id: string;
    category: string;
    imageUrl: string;
    webImageUrl: string;
    childCategories: string[];
  }[];
}

export interface CategoryDataType {
  data: CategoryData[];
}

export interface ChildCategory {
  childcategory: string;
}

export interface Subcategory {
  subcategory: string;
  childtotal: number;
  childcategory: ChildCategory[];
}

export interface ServiceData {
  category: string;
  subtotal: number;
  sub: Subcategory[];
}
