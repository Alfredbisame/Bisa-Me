import React from "react";

export type TabType = "ACTIVE" | "REVIEW" | "DECLINED" | "UPDATE" | "CLOSED";

export interface NewTab {
  status: TabType;
  icon: React.ReactNode;
}

// src/app/components/ManagePost/types.ts

export interface Product {
  id: string;
  _id?: string;

  name: string;
  title?: string;

  description: string;
  location: string;
  price: number | string;

  status: "Active" | "Closed" | "Reviewing" | string;

  image?: string | string[] | { image_link?: string }[];
  images: { imageUrl: string; id?: string }[];

  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
}

export interface MyPostResponse {
  code: number;
  data: {
    page: number;
    pageSize: number;
    results: Product[];
    totalCount: number;
    totalPages: number;
  };
  message: string;
}

// API Response Types
export interface ListingImage {
  imageUrl: string;
  id: string;
}

export interface UserInfo {
  name: string;
  profilePicture: string;
}

export interface ListingAttributes {
  [key: string]: unknown;
}

export interface ListingItem {
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
  createdBy: string | null;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  childCategory: string | null;
  price: number;
  contactNumber: string;
  totalViews: number;
  location: string;
  userId: string;
  isPromoted: boolean;
  images: ListingImage[];
  userInfo: UserInfo;
  status: string;
  message: string;
  negotiable: boolean;
  attributes: ListingAttributes;
  __v: number;
}

export interface ListingsResponse {
  code: number;
  data: {
    page: number;
    pageSize: number;
    results: ListingItem[];
    totalCount: number;
    totalPages: number;
  };
  message: string;
}
