import { IoStar } from "react-icons/io5";
import { BsTagFill } from "react-icons/bs";
import { MdTrendingUp } from "react-icons/md";

// Promo list is simply an array of strings
export type PromoListProps = string[];

// Product promo interface
export interface ProductPromoListProps {
  id: string;
  itemName: string;
  imageUrl: string;
  price: number;
  location: string;
}

// Strictly typed array (no `any`)
export const ProductPromoList: ProductPromoListProps[] = [
  {
    id: "1",
    itemName: "Oraimo Headset",
    imageUrl: "/f1.png",
    price: 200,
    location: "Greater Accra, Tema",
  },
  {
    id: "2",
    itemName: "J3 Headset",
    imageUrl: "/f2.png",
    price: 300,
    location: "Greater Accra, Tema",
  },
  {
    id: "3",
    itemName: "Keyboard and Mouse",
    imageUrl: "/f3.png",
    price: 250,
    location: "Greater Accra, Tema",
  },
  {
    id: "4",
    itemName: "Printer",
    imageUrl: "/f4.png",
    price: 2500,
    location: "Greater Accra, Tema",
  },
  {
    id: "5",
    itemName: "Webcam",
    imageUrl: "/f7.png",
    price: 3000,
    location: "Greater Accra, Tema",
  },
];

// Type for promo options
export interface PromoType {
  key: string;
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const promoTypes: PromoType[] = [
  {
    key: "featuredposts",
    label: "Featured Posts",
    detail: "Your listing appears at the top of the app",
    icon: IoStar,
  },
  {
    key: "topmarketplacedeals",
    label: "Top Marketplace Deals",
    detail: "Featured in the special deals section",
    icon: BsTagFill,
  },
  {
    key: "trending",
    label: "Trending",
    detail: "Listed in the popular trending section",
    icon: MdTrendingUp,
  },
];

export const promoServicesTypes: PromoType[] = [
  {
    key: "featuredposts",
    label: "Featured Posts",
    detail: "Your listing appears at the top of the app",
    icon: IoStar,
  },
  {
    key: "explorelocalservices",
    label: "Explore Local Services",
    detail: "Make use of local services",
    icon: BsTagFill,
  },
  {
    key: "trending",
    label: "Trending",
    detail: "Listed in the popular trending section",
    icon: MdTrendingUp,
  },
];
