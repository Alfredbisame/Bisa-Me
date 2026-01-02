// import useSWR from "swr";
// import { httpClient, buildListingsUrl, FOLLOW_ENDPOINTS, replacePathParams } from "@/lib";

// interface FollowSummaryResponse<T = unknown> {
//   data: T;
//   message?: string;
//   success?: boolean;
// }

// const useFollowSummary = <T = unknown>(userId: string) => {
//   const endpoint = replacePathParams(FOLLOW_ENDPOINTS.summary, { userId });
//   const apiUrl = userId ? buildListingsUrl(endpoint) : null;

//   const jsonFetcher = async (
//     url: string
//   ): Promise<FollowSummaryResponse<T>> => {
//     const response = await httpClient.get<FollowSummaryResponse<T>>(url);
//     return response;
//   };

//   const { data, isLoading } = useSWR<FollowSummaryResponse<T>>(
//     apiUrl,
//     jsonFetcher
//   );

//   return {
//     newFollowData: data?.data,
//     isLoadingFollow: isLoading,
//   };
// };

// export default useFollowSummary;
