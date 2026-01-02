"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { authHttpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from "@/lib";

type ObjectProps = Record<string, string | string[] | (string | string[])[]>;

interface HandleSubmitProps {
  formData: ObjectProps;
  FormData: ObjectProps;
  clearFormData: () => void;
}

const useHandleSubmit = ({
  clearFormData,
  FormData,
  formData,
}: HandleSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const apiUrl = buildListingsUrl(LISTINGS_ENDPOINTS.list);

  const fetcher = useCallback(
    async (formData: ObjectProps) => {
      const newFormData = { ...FormData, ...formData };
      console.log(newFormData);
      try {
        const response = await authHttpClient.post<{ message?: string }>(apiUrl, newFormData);
        
        const message = typeof response.message === 'string' 
          ? response.message 
          : "Listing created successfully";
        toast.success(message);
        localStorage.removeItem("baseFormData");
        clearFormData();
        router.push("/dashboard/manage-post");
      } catch (error: any) {
        console.error(error);
        const errorMessage = error?.message || "Error occurred while creating listing";
        toast.error(typeof errorMessage === 'string' ? errorMessage : "Error occurred while creating listing");
      } finally {
        setIsSubmitting(false);
      }
    },
    [FormData, clearFormData, router, apiUrl]
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fetching...");
    setIsSubmitting(true);
    // console.log(formData);
    console.log(FormData);
    fetcher(formData);
  };

  return { isSubmitting, handleSubmit };
};

export default useHandleSubmit;