import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ServiceSelection } from "@/app/components/PostAd/ServiceCategorySelector/useServiceSelector";
import {
  handleFormClear,
  handleServiceSelection,
  handleLocationSelection,
  handleBackNavigation,
  handleFormSubmission,
  ServiceFormData,
} from "../handlers/serviceHandlers";
import { useFormContext } from "@/app/components/Forms/Foods/context/FormContext";

/**
 * Custom hook for managing service form logic
 * Encapsulates all form-related state and handlers
 */
export const useServiceForm = () => {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const group = SearchParams.get("group") as string;
  const { handleUpdateError, handleFormData } = useFormContext();

  const onClear = useCallback(async () => {
    return await handleFormClear();
  }, []);

  const onServiceSelect = useCallback((service: ServiceSelection) => {
    handleServiceSelection(service);
  }, []);

  const onLocationSelect = useCallback((city: string, region: string) => {
    handleLocationSelection(city, region);
  }, []);

  const onBack = useCallback(() => {
    handleBackNavigation(router);
  }, [router]);

  const onSubmit = useCallback(
    async (data: ServiceFormData) => {
      await handleFormSubmission(
        data,
        router,
        group,
        handleUpdateError,
        handleFormData
      );
    },
    [router, group, handleUpdateError, handleFormData]
  );

  return {
    onClear,
    onServiceSelect,
    onLocationSelect,
    onBack,
    onSubmit,
  };
};
