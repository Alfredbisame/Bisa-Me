import { useMemo } from 'react';

export function useMemberSince(datetime?: string) {
  return useMemo(() => {
    if (!datetime) return '';
    const date = new Date(datetime);
    if (isNaN(date.getTime())) return '';
    return date.getFullYear().toString();
  }, [datetime]);
} 