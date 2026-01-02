import { RecentViewListing } from "../BrowsingHistory/types";

// Export the RecentViewListing type as HistoryRootProps for backward compatibility
export type HistoryRootProps = RecentViewListing;

export interface Image {
  id: string;
  imageUrl: string | { imageUrl: string } | { imageUrl: { imageUrl: string } };
}
