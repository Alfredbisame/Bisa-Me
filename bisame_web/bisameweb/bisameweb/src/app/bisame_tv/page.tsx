"use client";

import dynamic from "next/dynamic";

// Dynamically import VideoPlayer to avoid SSR issues with HLS.js
const VideoPlayer = dynamic(() => import("@/app/components/TV/VideoPlayer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-8 bg-gray-900">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading video player...</p>
      </div>
    </div>
  ),
});

export default function Page() {
  const hlsUrl = process.env.NEXT_PUBLIC_TV_LIVE_STREAM || "";

  return (
    <main
      className="flex-grow
    "
    >
      <VideoPlayer
        src={hlsUrl}
        title="Bisame Live TV"
        showLiveIndicator={true}
        showViewCount={true}
      />
    </main>
  );
}
