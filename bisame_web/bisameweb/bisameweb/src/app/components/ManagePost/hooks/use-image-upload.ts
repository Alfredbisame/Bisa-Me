import { useState, useCallback } from "react";
import axios from "axios";

interface UseImageUploadProps {
  userName?: string;
  apiEndpoint?: string;
}

export const useImageUpload = ({
  userName = "user",
  apiEndpoint = "/api/UploadImage",
}: UseImageUploadProps = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const uploadImages = useCallback(
    async (files: File[]): Promise<string[] | null> => {
      if (files.length === 0) return null;

      setIsUploading(true);
      setUploadError("");
      setUploadProgress(0);

      try {
        const formData = new FormData();

        files.forEach((file) => {
          formData.append("file", file);
        });

        const response = await axios.post(
          `${apiEndpoint}?name=${encodeURIComponent(userName)}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "*/*",
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
              }
            },
          }
        );

        const rawData = response.data?.data ?? null;

        if (!rawData) {
          throw new Error("No data returned from upload");
        }

        // Handle both single string and array responses
        const imageUrls: string[] = Array.isArray(rawData)
          ? rawData
          : [rawData];

        setUploadProgress(100);
        return imageUrls;
      } catch (error) {
        console.error("Image upload error:", error);
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : "Failed to upload images";

        setUploadError(errorMessage);
        return null;
      } finally {
        setIsUploading(false);
        setTimeout(() => setUploadProgress(0), 1000);
      }
    },
    [apiEndpoint, userName]
  );

  const resetUploadState = useCallback(() => {
    setUploadError("");
    setUploadProgress(0);
  }, []);

  return {
    uploadImages,
    isUploading,
    uploadError,
    uploadProgress,
    resetUploadState,
  };
};
