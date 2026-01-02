export interface Subcategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface ChildCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  borderColor: string;
  textColor: string;
  subcategories: Subcategory[];
  childCategories?: ChildCategory[];
}

export interface CardPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface CategoryCardProps {
  category: CategoryData;
  isActive: boolean;
  onToggle: (categoryId: string) => void;
  onSubcategoryClick?: (subcategory: Subcategory) => void;
  onChildCategoryClick?: (childCategory: ChildCategory) => void;
}

export interface DropdownProps {
  category: CategoryData;
  isActive: boolean;
  onSubcategoryClick?: (subcategory: Subcategory) => void;
  onChildCategoryClick?: (childCategory: ChildCategory) => void;
}

export interface ModalProps {
  category: CategoryData;
  isActive: boolean;
  onSubcategoryClick?: (subcategory: Subcategory) => void;
  onChildCategoryClick?: (childCategory: ChildCategory) => void;
  onClose: () => void;
  cardPosition: CardPosition | null;
}

export interface OverlayProps {
  isActive: boolean;
  onClose: () => void;
  cardPosition: CardPosition | null;
}

export interface CategoryPageProps {
  onCategorySelect?: (category: CategoryData) => void;
  onSubcategorySelect?: (subcategory: Subcategory) => void;
  onChildCategorySelect?: (childCategory: ChildCategory) => void;
  categories?: CategoryData[];
} 