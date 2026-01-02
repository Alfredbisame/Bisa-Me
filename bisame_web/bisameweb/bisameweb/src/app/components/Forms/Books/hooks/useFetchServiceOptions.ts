import useSWR from "swr";
import { AllCategoriesProps } from "../Books";
import { useEffect } from "react";
import { httpClient, buildListingsUrl, FORM_ENDPOINTS } from "@/lib";

interface ServicesOption {
  group: string;
  options: string[];
}

interface DataServicesProps {
  data: ServicesOption[];
}

const useFetchServiceOptions = (category: AllCategoriesProps) => {
  const buildUrl = () => {
    const baseUrl = buildListingsUrl(FORM_ENDPOINTS.serviceOptions);
    const params = new URLSearchParams();
    if (category.category) params.append('category', category.category);
    if (category.subCategory) params.append('subCategory', category.subCategory);
    return `${baseUrl}?${params.toString()}`;
  };

  const fetcher = async (url: string): Promise<string[]> => {
    try {
      const response = await httpClient.get<DataServicesProps>(url);
      const Data: DataServicesProps = response;
      const DataArray: string[] = [];

      for (const data of Data.data) {
        DataArray.push(data.group);
      }

      return DataArray;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const apiUrl = buildUrl();
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  useEffect(() => {
    if (category.category && category.subCategory) {
      mutate(undefined, { revalidate: true });
    }
  }, [category.category, category.subCategory, mutate]);

  return { data, error, isLoading };
};

export default useFetchServiceOptions;
