type ObjectProps = Record<string, string | string[]>;

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ServiceSelection } from "@/app/components/PostAd/ServiceCategorySelector/useServiceSelector";
import { UploadedImage } from "@/app/components/PostAd/PostServiceFormComponents/usePostAdForm";
import { SweetAlert } from "@/app/components/Forms/Alert/SweetAlert";
import { logger } from "@/app/utils/logger";
import toast from "react-hot-toast";
import { LocationProps } from "@/app/components/PostAd/PostServiceFormComponents/FormContext";

/**
 * Service form event handlers
 * Contains all the business logic for handling form events
 */

export interface ServiceFormData {
  service: ServiceSelection;
  location: LocationProps;
  images: UploadedImage[];
}

/**
 * Handles form clearing with user confirmation using SweetAlert
 */
export const handleFormClear = async (): Promise<boolean> => {
  logger.info("Service form clear requested");
  const confirmed = await SweetAlert.confirmClearForm();
  if (confirmed) {
    logger.info("Service form cleared successfully");
    return true;
  }
  logger.debug("Service form clear cancelled by user");
  return false;
};

/**
 * Handles service selection
 */
export const handleServiceSelection = (service: ServiceSelection): void => {
  logger.info("Service selected", {
    category: service.category,
    subcategory: service.subcategory,
  });
  console.log(service);
  // Additional service selection logic can be added here
};

/**
 * Handles location selection
 */
export const handleLocationSelection = (city: string, region: string): void => {
  console.log("Selected location:", JSON.stringify({ city, region }));
  // Additional location selection logic can be added here
};

/**
 * Handles back navigation
 */
export const handleBackNavigation = (router: AppRouterInstance): void => {
  console.log("Navigating back");
  router.back();
};

/**
 * Handles form submission and navigation
 */
export const handleFormSubmission = async (
  data: ServiceFormData,
  router: AppRouterInstance,
  group: string,
  handleUpdateError: (errors: Record<string, string>) => void,
  handleFormData: (data: ObjectProps) => void
): Promise<void> => {
  try {
    if (
      data.service.category &&
      data.service.subcategory &&
      data.images &&
      data.location.city &&
      data.location.region
    ) {
      let myGroup;
      switch (group) {
        case "services":
          myGroup = "Services";
          break;
        case "foods":
          myGroup = "Food";
          break;
        case "jobs":
          myGroup = "Jobs";
          break;
        case "books":
          myGroup = "Books";
          break;
        case "health":
          myGroup = "Health";
          break;
        case "jobseek":
          myGroup = "Job Seekers";
          break;
        case "products":
          myGroup = "Buy and Sell";
          break;
        default:
          break;
      }

      console.log(myGroup);

      // Update form input
      handleFormData({
        category: data.service.category,
        subCategory: data.service.subcategory,
        city: data.location.city,
        region: data.location.region,
        categoryGroup: myGroup as string,
      });

      // Run checks for missing parameter
      if (!data.service.category && !data.service.subcategory) return;

      // Run checks for errors
      if (
        !data.service.category ||
        !data.service.subcategory ||
        !data.images ||
        !data.location.region ||
        data.location.city
      ) {
        const err: {
          category?: string;
          images?: string;
          location?: string;
        } = {
          category: "",
          images: "",
          location: "",
        };

        // Check service fields
        if (!data.service?.category) err["category"] = "Missing category";

        // Check images
        if (!data.images || data.images.length < 3)
          err.images = "Minimum image upload should be at least 3 photos";

        // Check location fields
        if (!data.location?.region) err.location = "Missing location";

        // Remove empty objects
        if (!err.category) delete err.category;
        if (!err.location) delete err.location;
        if (!err.images) delete err.images;

        // If there are any errors, handle them
        if (Object.keys(err).length > 0) {
          console.log("Validation errors:", err);
          handleUpdateError(err);
          return;
        }
      }

      // Redirect to corresponding route based on group
      switch (group) {
        case "services":
          router.push(
            `/services?group=${encodeURIComponent(
              group
            )}&category=${encodeURIComponent(
              data.service.category
            )}&subCategory=${encodeURIComponent(data.service.subcategory)}`
          );
          break;
        case "products":
          console.log(group);
          group = "Buy and Sell";
          router.push(
            `/products?group=${encodeURIComponent(
              group
            )}&category=${encodeURIComponent(
              data.service.category
            )}&subCategory=${encodeURIComponent(data.service.subcategory)}`
          );
          break;
        case "health":
          router.push(
            `/health?group=${encodeURIComponent(
              group
            )}&category=${encodeURIComponent(
              data.service.category
            )}&subCategory=${encodeURIComponent(data.service.subcategory)}`
          );
          break;
        case "books":
          router.push(
            `/books?group=${encodeURIComponent(
              group
            )}&category=${encodeURIComponent(
              data.service.category
            )}&subCategory=${encodeURIComponent(data.service.subcategory)}`
          );
          break;
        case "foods":
          router.push(
            `/foods?group=${encodeURIComponent(
              group
            )}&category=${encodeURIComponent(
              data.service.category
            )}&subCategory=${encodeURIComponent(data.service.subcategory)}`
          );
          break;
        case "jobs":
          router.push(
            `/jobs?group=${encodeURIComponent(
              group
            )}&category=${encodeURIComponent(
              data.service.category
            )}&subCategory=${encodeURIComponent(data.service.subcategory)}`
          );
          break;
        case "jobseek":
          router.push(
            `/jobseeker?group=${encodeURIComponent(
              group
            )}&category=${encodeURIComponent(
              data.service.category
            )}&subCategory=${encodeURIComponent(data.service.subcategory)}`
          );
          break;

        default:
          toast.error("Group not configured");
          break;
      }
    } else {
      console.warn("No service selected for navigation");
    }
  } catch (error) {
    console.error("Error during service form submission:", error);
    // Handle error appropriately (show toast, etc.)
  }
};
