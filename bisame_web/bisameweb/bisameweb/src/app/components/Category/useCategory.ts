import useSWR from 'swr';

export interface SubCategory {
  id: string;
  category: string;
  image_link: string;
  web_link: string;
}

export interface CategoryApiResponse {
  id: string;
  category: string;
  sub: SubCategory[];
}

interface UseCategoryResult {
  data: SubCategory[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch categories');
  }
  const result: CategoryApiResponse = await res.json();
  return result.sub;
};

export function useCategory(): UseCategoryResult {
  const { data, error, isLoading, mutate } = useSWR<SubCategory[]>(
    '/api/RandomCategory',
    fetcher,
    {
      dedupingInterval: 86400000, 
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
    }
  );

  return {
    data: data ?? null,
    loading: isLoading,
    error: error ? error.message : null,
    refetch: () => { mutate(); },
  };
} 