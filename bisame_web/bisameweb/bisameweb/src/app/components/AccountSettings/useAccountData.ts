import useSWR from 'swr';
import { AccountData } from './types';
import { authHttpClient, buildAuthUrl, AUTH_ENDPOINTS } from '@/lib';

const fetcher = async (url: string): Promise<AccountData> => {
  const response = await authHttpClient.get<AccountData>(url);
  return response;
};

export function useAccountData() {
  const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.profile);
  
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<AccountData, Error>(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onErrorRetry: (_err, _key, _config, revalidate, { retryCount }) => {
        if (retryCount < 3) {
          setTimeout(() => revalidate({ retryCount }), 1000);
        }
      },
    }
  );
  
  return {
    data,
    loading: isLoading,
    error,
    mutate,
  };
} 