"use client";
import { useEffect } from 'react';
import useRecentViews from './useRecentViews';

interface RecordRecentViewProps {
  userId?: string;
  listingId: string;
}

/**
 * Component that records a recent view when mounted
 */
const RecordRecentView = ({ userId, listingId }: RecordRecentViewProps) => {
  const { recordRecentView } = useRecentViews({ userId });

  useEffect(() => {
    if (userId && listingId) {
      // Record the recent view when this component is mounted
      recordRecentView(listingId);
    }
  }, [userId, listingId, recordRecentView]);

  return null; 
};

export default RecordRecentView;