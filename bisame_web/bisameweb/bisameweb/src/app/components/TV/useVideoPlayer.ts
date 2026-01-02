import { useRef, useEffect, useState, useCallback } from "react";
import Hls from "hls.js";

interface UseVideoPlayerReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isLive: boolean;
  viewCount: number;
  isLoading: boolean;
  error: string | null;
  isPiPActive: boolean;
  togglePiP: () => void;
  retry: () => void;
}

export const useVideoPlayer = (src: string): UseVideoPlayerReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [viewCount, setViewCount] = useState<number>(
    Math.floor(Math.random() * 1000) + 500
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPiPActive, setIsPiPActive] = useState<boolean>(false);

  const initializeHLS = useCallback(() => {
    if (!videoRef.current) return null;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        xhrSetup: (xhr) => {
          xhr.withCredentials = false;
        },
      });

      hls.loadSource(src);
      hls.attachMedia(videoRef.current!);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS manifest parsed successfully");
        setIsLoading(false);
        setIsLive(true);
        setError(null);
        setViewCount(Math.floor(Math.random() * 1000) + 500);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error Details:", {
          type: data.type,
          details: data.details,
          fatal: data.fatal,
          url: data.url,
        });

        let errorMessage = "Failed to load video stream";

        const errorDetails = String(data.details);
        if (errorDetails.includes("NETWORK")) {
          errorMessage =
            "Network error - stream may be unavailable or blocked by CORS";
        } else if (errorDetails.includes("MEDIA")) {
          errorMessage = "Media playback error";
        } else if (errorDetails.includes("MUX")) {
          errorMessage = "Stream format error";
        }

        setError(errorMessage);
        setIsLoading(false);

        if (!data.fatal) {
          console.log("Attempting to recover from non-fatal error...");
          hls?.startLoad();
        }
      });

      hls.on(Hls.Events.MANIFEST_LOADING, () => {
        console.log("Loading HLS manifest...");
      });

      hls.on(Hls.Events.MANIFEST_LOADED, () => {
        console.log("HLS manifest loaded");
      });
    } else if (videoRef.current!.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("Using native HLS support");
      videoRef.current!.src = src;
      videoRef.current!.addEventListener("loadedmetadata", () => {
        setIsLoading(false);
        setIsLive(true);
        setError(null);
        setViewCount(Math.floor(Math.random() * 1000) + 500);
      });

      videoRef.current!.addEventListener("error", (e) => {
        console.error("Native HLS error:", e);
        setError("Failed to load stream with native HLS support");
        setIsLoading(false);
      });
    } else {
      setError("HLS is not supported in this browser");
      setIsLoading(false);
    }

    return hls;
  }, [src]);

  const testUrl = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch(`/api/live-streaming?url=${src}`, {
        method: "HEAD",
        mode: "cors",
      });
      console.log(response);
      console.log("URL test response:", response.status, response.statusText);
      if (!response.ok) {
        setError(
          `Stream URL returned ${response.status}: ${response.statusText}`
        );
        setIsLoading(false);
        return false;
      }
      return true;
    } catch (err) {
      console.error("URL test failed:", err);
      setError(
        "Cannot access stream URL - may be blocked by CORS or network restrictions"
      );
      setIsLoading(false);
      return false;
    }
  }, [src]);

  const togglePiP = async () => {
    if (!videoRef.current) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiPActive(false);
      } else if (document.pictureInPictureEnabled) {
        // Check if video is ready for PiP
        if (videoRef.current.readyState >= 1) {
          await videoRef.current.requestPictureInPicture();
          setIsPiPActive(true);
        } else {
          console.log("Video not ready for Picture-in-Picture yet");
        }
      }
    } catch (error) {
      console.error("Picture-in-Picture error:", error);
    }
  };

  const retry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  useEffect(() => {
    let hls: Hls | null = null;

    const initialize = async () => {
      const urlTestPassed = await testUrl();

      if (urlTestPassed) {
        hls = initializeHLS();
      }
    };

    initialize();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [initializeHLS, testUrl]);

  // Update view count periodically for live streams
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 10) - 5);
    }, 30000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Handle PiP state changes
  useEffect(() => {
    const handlePiPChange = () => {
      setIsPiPActive(!!document.pictureInPictureElement);
    };

    document.addEventListener("enterpictureinpicture", handlePiPChange);
    document.addEventListener("leavepictureinpicture", handlePiPChange);

    return () => {
      document.removeEventListener("enterpictureinpicture", handlePiPChange);
      document.removeEventListener("leavepictureinpicture", handlePiPChange);
    };
  }, []);

  return {
    videoRef,
    isLive,
    viewCount,
    isLoading,
    error,
    isPiPActive,
    togglePiP,
    retry,
  };
};