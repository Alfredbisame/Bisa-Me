"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface InitializeFormProps {
  data: { name: string }[];
}

const useInitializeForm = (data: InitializeFormProps | undefined) => {
  const [initialFormData, setInitialFormData] = useState<
    Record<string, string | string[] | (string | string[])[]>
  >({});
  const [formData, setFormData] = useState<
    Record<string, string | string[] | (string | string[])[]>
  >({});
  const SearchParams = useSearchParams();
  const group = SearchParams.get("group") as string;

  const priceOption = useMemo(() => {
    const option: Record<string, string | string[] | (string | string[])[]> =
      group == "jobs" || group == "jobseek"
        ? {}
        : {
            title: "",
            price: "",
            negotiable: "",
          };
    return option;
  }, [group]);

  useEffect(() => {
    if (data?.data) {
      const mapped = data?.data.reduce(
        (acc: Record<string, string>, { name }: { name: string }) => {
          acc[name] = "";
          return acc;
        },
        {}
      );

      setInitialFormData({
        ...mapped,
        ...priceOption,
        description: "",
        contactNumber: "",
      });

      setFormData({
        ...mapped,
        ...priceOption,
        description: "",
        contactNumber: "",
      });
    }
  }, [data, priceOption]);

  return { initialFormData, formData, setFormData };
};
export default useInitializeForm;
