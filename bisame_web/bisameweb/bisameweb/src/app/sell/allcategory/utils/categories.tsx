import React from "react";
import { ServiceCategorySelector } from "@/app/components/PostAd/ServiceCategorySelector/ServiceCategorySelector";
import type { ServiceSelection } from "@/app/components/PostAd/ServiceCategorySelector/useServiceSelector";

export type Group =
  | "services"
  | "products"
  | "books"
  | "jobs"
  | "foods"
  | "jobseek"
  | "health";

export interface HandleGroupInputProps {
  onServiceSelect: (selection: ServiceSelection) => void;
  selectedService?: ServiceSelection | null;
  className?: string;
  placeholder?: string;
}

export const handleGroupInput = (
  group: Group,
  props: HandleGroupInputProps
) => {
  switch (group) {
    case "services":
      return <ServiceCategorySelector {...props} group="Services" />;

    case "products":
      return (
        <ServiceCategorySelector
          placeholder="Select a product..."
          group="Buy and Sell"
          {...props}
        />
      );

    case "books":
      return (
        <ServiceCategorySelector
          group="Books"
          placeholder="Select a book you would like to post..."
          {...props}
        />
      );

    case "jobs":
      return (
        <ServiceCategorySelector
          group="Jobs"
          placeholder="Select a job you want to post..."
          {...props}
        />
      );

    case "foods":
      return (
        <ServiceCategorySelector
          group="Foods"
          placeholder="Select food you want to post..."
          {...props}
        />
      );

    case "jobseek":
      return (
        <ServiceCategorySelector
          group="Job Seekers"
          placeholder="Select a job you are looking for..."
          {...props}
        />
      );

    case "health":
      return (
        <ServiceCategorySelector
          group="Health"
          placeholder="Select a health category you want to post..."
          {...props}
        />
      );

    default:
      return null;
  }
};
