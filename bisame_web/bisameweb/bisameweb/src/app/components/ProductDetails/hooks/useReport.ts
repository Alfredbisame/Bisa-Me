import useSWRMutation from 'swr/mutation';
import { authHttpClient, buildListingsUrl, MISC_ENDPOINTS } from '@/lib';

interface ReportResponse {
  success?: boolean;
  error?: string;
  [key: string]: unknown;
}

interface ReportPayload {
  listingId: string;
  message: string;
}

async function sendReport(
  url: string,
  { arg }: { arg: ReportPayload }
): Promise<ReportResponse> {
  const response = await authHttpClient.post<ReportResponse>(url, {
    listingId: arg.listingId,
    message: arg.message,
  });
  return response;
}

export function useReport() {
  const apiUrl = buildListingsUrl(MISC_ENDPOINTS.complains);
  const { trigger, isMutating: loading, data, error } = useSWRMutation(
    apiUrl,
    sendReport
  );

  const reportSeller = async (listingId: string, message: string) => {
    return await trigger({ listingId, message });
  };

  return {
    reportSeller,
    loading,
    error: error ? (error as Error).message : undefined,
    data,
  };
}