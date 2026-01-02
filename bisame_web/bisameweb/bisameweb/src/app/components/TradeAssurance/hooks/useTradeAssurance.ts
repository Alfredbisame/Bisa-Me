import useSWR from 'swr';

// Define types for the response data
export interface PackageItem {
  name: string;
  fees: string;
}

export interface SocialMediaItem {
  name: string;
}

export interface TradeAssuranceData {
  package: PackageItem[];
  socialmedia: SocialMediaItem[];
}

// Fetcher function for SWR
const fetcher = async (url: string): Promise<TradeAssuranceData> => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  return response.json();
};

export const useTradeAssurance = () => {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/tradeassurance',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 3600000, // 1 hour
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  const retry = () => {
    mutate();
  };

  return {
    data,
    packages: data?.package || [],
    socialMedia: data?.socialmedia || [],
    isLoading,
    error,
    retry,
  };
};
