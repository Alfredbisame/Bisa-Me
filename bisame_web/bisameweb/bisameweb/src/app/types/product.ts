export interface ProductImage {
  image_link: string;
}

export interface Product {
  promoted?: boolean | null;
  _id: {
    $oid: string;
  };
  pageid: string;
  title: string;
  image: ProductImage[];
  price: string;
  location: string;
  description: string;
  category: string;
  subcategory: string;
  userid: string;
} 