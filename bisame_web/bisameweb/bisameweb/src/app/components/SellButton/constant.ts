import {
  BookOpen,
  Briefcase,
  HeartPulse,
  ShoppingBag,
  UserCheck,
  Users,
  Utensils,
} from "lucide-react";
import { IconType } from "react-icons";

export interface Category {
  icon: IconType;
  categoryName: string;
  categoryDescription: string;
  catRouteName: string;
}

export const categories: Category[] = [
  {
    catRouteName: "services",
    categoryName: "Services",
    categoryDescription: "Post your business or service you render.",
    icon: Briefcase,
  },
  {
    catRouteName: "products",
    categoryName: "Buy & Sell",
    categoryDescription: "Buy, sell, or trade products and items easily.",
    icon: ShoppingBag,
  },
  {
    catRouteName: "books",
    categoryName: "Books",
    categoryDescription: "Find, sell, or exchange books and study materials.",
    icon: BookOpen,
  },
  {
    catRouteName: "jobs",
    categoryName: "Jobs",
    categoryDescription: "Post job openings or browse available positions.",
    icon: UserCheck,
  },
  {
    catRouteName: "foods",
    categoryName: "Foods",
    categoryDescription: "Discover food vendors or promote your restaurant.",
    icon: Utensils,
  },
  {
    catRouteName: "jobseek",
    categoryName: "Job Seekers",
    categoryDescription: "Create your profile and connect with employers.",
    icon: Users,
  },
  {
    catRouteName: "health",
    categoryName: "Health",
    categoryDescription: "Access healthcare services and wellness resources.",
    icon: HeartPulse,
  },
];

export const subCategories: Category[] = [
  {
    catRouteName: "services",
    categoryName: "Services",
    categoryDescription:
      "View all service listings or showcase the professional services you offer.",
    icon: Briefcase,
  },
  {
    catRouteName: "products",
    categoryName: "Buy & Sell",
    categoryDescription:
      "Explore products available for sale or list your own items for buyers to discover.",
    icon: ShoppingBag,
  },
  {
    catRouteName: "books",
    categoryName: "Books",
    categoryDescription:
      "Browse books for sale, exchange study materials, or post your own listings.",
    icon: BookOpen,
  },
  {
    catRouteName: "jobs",
    categoryName: "Jobs",
    categoryDescription:
      "View available job openings or post new opportunities for others to find.",
    icon: UserCheck,
  },
  {
    catRouteName: "foods",
    categoryName: "Foods",
    categoryDescription:
      "Find restaurants, food vendors, or showcase your culinary business.",
    icon: Utensils,
  },
  {
    catRouteName: "jobseek",
    categoryName: "Job Seekers",
    categoryDescription:
      "Browse job seeker profiles or create your own to connect with employers.",
    icon: Users,
  },
  {
    catRouteName: "health",
    categoryName: "Health",
    categoryDescription:
      "View healthcare listings, wellness services, or promote your health business.",
    icon: HeartPulse,
  },
];
