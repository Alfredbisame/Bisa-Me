import { useState } from 'react';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

interface StatusChangeResult {
  success: boolean;
  message?: string;
  error?: unknown;
}

async function postStatusChange(url: string, { arg }: { arg: { pageid: string; status: string } }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: arg.pageid,
      status: arg.status,
    }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update status');
  }
  return data;
}

export function useMyPostDataStatus() {
  const [result, setResult] = useState<StatusChangeResult | null>(null);
  const {
    trigger,
    isMutating: loading,
    error,
  } = useSWRMutation('/api/Dashboard/MyPost', postStatusChange, {
    onSuccess: (data) => {
      setResult({ success: true, message: data.message });
      // Invalidate all MyPost data
      mutate('/api/Dashboard/MyPost');
      // Invalidate specific status data
      mutate((key: string) => typeof key === 'string' && key.startsWith('/api/Dashboard/MyPost?status='));
    },
    onError: (err: Error) => {
      setResult({ success: false, message: err.message, error: err });
    },
  });

  const changeStatus = async (pageid: string, status: string) => {
    setResult(null);
    try {
      await trigger({ pageid, status });
    } catch (error) {
      console.error('Error changing status:', error);
      // error is handled in onError
    }
  };

  return { changeStatus, loading, error: error ? error.message : null, result };
}