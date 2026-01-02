import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import { AllCategoriesProps } from "../Service";
import { useEffect } from "react";
import { API_ENDPOINTS, buildProfileUrl, httpClient } from "@/lib";

interface ServicesOption {
  group: string;
  options: string[];
}

interface DataServicesProps {
  data: ServicesOption[];
}

const useFetchServiceOptions = (category: AllCategoriesProps) => {
  const fetcher = async (url: string) => {
    try {
      const apiUrl =
        buildProfileUrl(API_ENDPOINTS.forms.serviceOptions) +
        `?category=${encodeURIComponent(
          category.category
        )}&subCategory=${encodeURIComponent(category.subCategory)}`;
      console.log(apiUrl);
      const response: AxiosResponse = await httpClient.get(apiUrl);

      console.log(response.data);
      const Data: DataServicesProps = response;

      const DataArray: string[] = [];

      for (const data of Data.data) {
        DataArray.push(data.group);
      }

      console.log(DataArray);
      console.log(Data.data);
      console.log(DataArray);
      return DataArray;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, isLoading, mutate } = useSWR("/api/services", fetcher);

  useEffect(() => {
    if (category.category && category.subCategory) {
      mutate(undefined, { revalidate: true });
    }
  }, [category.category, category.subCategory, mutate]);

  return { data, error, isLoading };
};

export default useFetchServiceOptions;
