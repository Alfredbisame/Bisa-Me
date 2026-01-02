
export interface CategoryData {
  category: string;
  total: number;
  sub: Subcategory[];
}

export interface Subcategory {
  id: string;
  category: string;
  image_link: string;
  web_link?: string;
}


export interface CategoryItem {
  name: string;
  type: 'main' | 'sub';
  icon: string;
  parent?: string;
  id?: string;
}

