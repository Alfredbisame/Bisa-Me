"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buildListingsUrl, LISTINGS_ENDPOINTS, authHttpClient } from "@/lib";
import toast from "react-hot-toast";
import { useFormContext } from "@/app/components/Forms/Foods/context/FormContext";

interface BaseData {
  service: any;
  location: any;
  images: string[];
}

export const mapGroupKeyToCategoryGroup = (groupKey: string) => {
  const key = (groupKey || "").toString().toLowerCase();
  if (key.includes("service")) return "Services";
  if (key.includes("food")) return "Food";
  if (key.includes("jobseek")) return "Job Seekers";
  if (key.includes("job")) return "Jobs";
  if (key.includes("book")) return "Books";
  if (key.includes("health")) return "Health";
  if (key.includes("product") || key.includes("sell")) return "Buy and Sell";
  return "";
};

export const useUnifiedPostForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupParam = searchParams.get("group") || "";

  const [step, setStep] = useState<"select" | "category">("select");
  const [baseData, setBaseData] = useState<BaseData | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const { FormData, handleFormData, handleSetCategoryActive, clearFormData } =
    useFormContext();

    console.log(FormData)
    console.log(FormData)
    console.log(FormData)
    console.log(FormData)
    console.log(FormData)
    console.log(FormData)
    console.log(FormData)
    console.log(FormData)
    console.log(FormData)
    console.log(FormData)

  const handleInitialSubmit = useCallback(
    (data: BaseData) => {
      setBaseData(data);

      const myGroup = mapGroupKeyToCategoryGroup(
        data.service?.group || groupParam || ""
      );

      if (!myGroup) {
        toast.error("categoryGroup should not be empty or invalid");
        return;
      }

      const initial = {
        category: data.service.category,
        subCategory: data.service.subcategory,
        city: data.location.city,
        region: data.location.region,
        categoryGroup: myGroup,
      };

      console.log(initial)
      console.log(initial)
      console.log(initial)

      setFormData((p) => ({ ...p, ...initial }));
      handleFormData(initial);
      handleSetCategoryActive(true);
      setStep("category");
    },
    [handleFormData, handleSetCategoryActive, groupParam]
  );

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCheckboxInputChange = (field: string, value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBackToSelect = useCallback(() => {
    handleSetCategoryActive(false);
    setStep("select");
  }, [handleSetCategoryActive]);

  const resetToSelect = useCallback(() => {
    setBaseData(null);
    setFormData({});
    // Clear shared context form data instead of merging an empty object
    clearFormData();
    handleSetCategoryActive(false);
    setStep("select");
  }, [clearFormData, handleSetCategoryActive]);

  const submitListing = useCallback(async () => {
    if (!baseData) return;

    console.log(FormData);
    console.log(FormData);
    console.log(FormData);

    const payload: Record<string, any> = {
      ...(FormData || {}),
      ...formData,
      // images: baseData.images,
    };

    console.log(payload);
    console.log(payload);

    if (!payload.categoryGroup) {
      const myGroup = mapGroupKeyToCategoryGroup(
        (baseData?.service?.group || groupParam || "").toString()
      );
      if (myGroup) payload.categoryGroup = myGroup;
    }

    if (!payload.title) return toast.error("Title is required");
    if (!payload.images || payload.images.length < 1)
      return toast.error("Please upload at least one image");
    if (!payload.categoryGroup)
      return toast.error("categoryGroup should not be empty or invalid");

    try {
      const apiUrl = buildListingsUrl(LISTINGS_ENDPOINTS.list);
      const response = await authHttpClient.post(apiUrl, payload as any);
      const message =
        (response as any)?.message || "Listing created successfully";
      toast.success(message);
      router.push("/dashboard/manage-post");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to create listing");
    }
  }, [FormData, formData, baseData, groupParam, router]);

  const currentGroup = useMemo(
    () => (groupParam || baseData?.service?.group || "").toLowerCase(),
    [groupParam, baseData]
  );

  const enabledForGroup = useCallback(
    (g: string) => step === "category" && currentGroup === g,
    [step, currentGroup]
  );

  return {
    step,
    setStep,
    baseData,
    formData,
    handleInitialSubmit,
    handleInputChange,
    handleBackToSelect,
    handleCheckboxInputChange,
    resetToSelect,
    submitListing,
    currentGroup,
    enabledForGroup,
  };
};

export default useUnifiedPostForm;
