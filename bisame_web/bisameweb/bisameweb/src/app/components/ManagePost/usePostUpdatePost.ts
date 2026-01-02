import { useState } from 'react';
import { mutate } from 'swr';

export interface UpdatePostRequest {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  subCategory: string;
  childCategory: string | null;
  contactNumber: string;
  images: Array<{ imageUrl: string; id: string }>;
  isPromoted: boolean;
  negotiable: boolean;
  attributes: {
    [key: string]: unknown;
  };
}

export interface UpdatePostResponse {
  success: boolean;
  message: string;
  [key: string]: unknown;
}

export function usePostUpdatePost(mutateKey: string = '/api/Dashboard/MyPost') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UpdatePostResponse | null>(null);

  const updatePost = async (body: UpdatePostRequest) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Use the main API endpoint for updating posts
      const response = await fetch('/api/Dashboard/MyPost', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to update post');
        setResult(data);
      } else {
        setResult(data);
        // Invalidate/revalidate the SWR cache for the post list
        mutate(mutateKey);
        //Invalidate specific status data
        mutate((key: string) => typeof key === 'string' && key.startsWith('/api/Dashboard/MyPost?status='));
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return { updatePost, loading, error, result };
}