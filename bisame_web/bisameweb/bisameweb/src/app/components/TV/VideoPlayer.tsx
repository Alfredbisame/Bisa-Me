"use client";

import React from "react";
import { useVideoPlayer } from "./useVideoPlayer";
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";
import LiveIndicator from "./LiveIndicator";
import StreamInfo from "./StreamInfo";
import VideoControls from "./VideoControls";
// import { BottomNavigation } from "../BottomNavigation";

export interface VideoPlayerProps {
  src: string;
  title?: string;
  showLiveIndicator?: boolean;
  showViewCount?: boolean;
  channelName?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title = "Live TV",
  showLiveIndicator = true,
  showViewCount = true,
  channelName = "Bisame TV",
}) => {
  const {
    videoRef,
    isLive,
    viewCount,
    isLoading,
    error,
    isPiPActive,
    togglePiP,
    retry,
  } = useVideoPlayer(src);

  const isPiPSupported =
    typeof document !== "undefined" && document.pictureInPictureEnabled;

  return (
    <>
      <section className="min-h-[80vh] md:h-auto flex flex-col items-start justify-start py-8 bg-gray-900">
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative">
            {/* Header with title and live indicator */}
            <div className="flex items-center justify-between mb-4 px-4">
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {showLiveIndicator && (
                <LiveIndicator
                  isLive={isLive}
                  viewCount={viewCount}
                  showViewCount={showViewCount}
                />
              )}
            </div>

            {/* Video Container */}
            <div className="relative w-full bg-black rounded-lg overflow-hidden">
              {isLoading && <LoadingSpinner />}
              {error && <ErrorDisplay error={error} onRetry={retry} />}

              <video
                ref={videoRef}
                controls
                className="w-full h-auto rounded-lg"
                style={{ aspectRatio: "16/9" }}
                playsInline
                autoPlay={true}
                muted={false}
              />

              {/* Custom Video Controls */}
              <VideoControls
                videoRef={videoRef}
                isPiPActive={isPiPActive}
                togglePiP={togglePiP}
                isPiPSupported={isPiPSupported}
              />
            </div>

            {/* Stream Info */}
            <StreamInfo
              isLive={isLive}
              viewCount={viewCount}
              channelName={channelName}
            />
          </div>
        </div>
      </section>
      {/* <BottomNavigation /> */}
    </>
  );
};

export default VideoPlayer;
