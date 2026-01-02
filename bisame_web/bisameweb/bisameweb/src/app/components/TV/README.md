# TV Video Player Components

A modular, developer-friendly video player system for live streaming with HLS support and Picture-in-Picture functionality.

## 🏗️ Architecture

The video player has been refactored into smaller, focused components following the Single Responsibility Principle:

```
TV/
├── VideoPlayer.tsx          # Main orchestrator component
├── useVideoPlayer.ts        # Custom hook for video logic
├── LoadingSpinner.tsx       # Loading state component
├── ErrorDisplay.tsx         # Error handling component
├── LiveIndicator.tsx        # Live stream indicator
├── StreamInfo.tsx          # Stream information display
├── VideoControls.tsx       # Custom video controls (PiP)
└── README.md              # This documentation
```

## 🚀 Features

- **HLS Streaming Support**: Compatible with HLS.js and native browser HLS
- **Picture-in-Picture Mode**: Modern PiP functionality with browser detection
- **Live Stream Indicators**: Real-time live status and viewer count
- **Error Handling**: Comprehensive error management with retry functionality
- **Modular Design**: Easy to maintain and extend
- **TypeScript Support**: Full type safety
- **Responsive Design**: Mobile-friendly interface

## 📦 Components

### VideoPlayer.tsx
Main component that orchestrates all sub-components.

**Props:**
```typescript
interface VideoPlayerProps {
  src: string;                    // HLS stream URL
  title?: string;                 // Stream title (default: "Live TV")
  showLiveIndicator?: boolean;    // Show live indicator (default: true)
  showViewCount?: boolean;        // Show viewer count (default: true)
  channelName?: string;           // Channel name (default: "Bisame TV")
}
```

**Usage:**
```tsx
<VideoPlayer 
  src="https://example.com/stream.m3u8"
  title="My Live Stream"
  channelName="My Channel"
  showViewCount={true}
/>
```

### useVideoPlayer.ts
Custom hook that manages all video player logic and state.

**Returns:**
```typescript
{
  videoRef: React.RefObject<HTMLVideoElement>;
  isLive: boolean;
  viewCount: number;
  isLoading: boolean;
  error: string | null;
  isPiPActive: boolean;
  togglePiP: () => void;
  retry: () => void;
}
```

### LoadingSpinner.tsx
Displays loading state with customizable message.

**Props:**
```typescript
interface LoadingSpinnerProps {
  message?: string;  // Loading message (default: "Loading live stream...")
}
```

### ErrorDisplay.tsx
Handles error states with retry functionality.

**Props:**
```typescript
interface ErrorDisplayProps {
  error: string;     // Error message
  onRetry: () => void; // Retry callback
}
```

### LiveIndicator.tsx
Shows live status and viewer count.

**Props:**
```typescript
interface LiveIndicatorProps {
  isLive: boolean;
  viewCount?: number;
  showViewCount?: boolean;
}
```

### StreamInfo.tsx
Displays stream information below the video.

**Props:**
```typescript
interface StreamInfoProps {
  isLive: boolean;
  viewCount: number;
  channelName?: string;
}
```

### VideoControls.tsx
Custom video controls with PiP functionality.

**Props:**
```typescript
interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPiPActive: boolean;
  togglePiP: () => void;
  isPiPSupported: boolean;
}
```

## 🎯 Picture-in-Picture Mode

The video player includes built-in Picture-in-Picture support:

- **Automatic Detection**: Checks browser compatibility
- **Toggle Button**: Floating control button in bottom-right corner
- **State Management**: Tracks PiP state changes
- **Visual Feedback**: Button changes appearance when PiP is active

### PiP Browser Support
- ✅ Chrome 70+
- ✅ Firefox 69+
- ✅ Safari 13.1+
- ❌ Internet Explorer (not supported)

## 🔧 Error Handling

The player handles various error scenarios:

1. **Network Errors**: CORS issues, connection problems
2. **Media Errors**: Stream format issues, codec problems
3. **HLS Errors**: Manifest parsing, segment loading
4. **Browser Compatibility**: HLS support detection

Error messages are user-friendly and include retry functionality.

## 🎨 Styling

All components use Tailwind CSS classes for consistent styling:

- **Dark Theme**: Gray-900 background with white text
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and loading animations
- **Accessibility**: Proper contrast ratios and focus states

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install hls.js
   ```

2. **Import Components:**
   ```tsx
   import VideoPlayer from './components/TV/VideoPlayer';
   ```

3. **Use in Your App:**
   ```tsx
   <VideoPlayer 
     src="your-hls-stream-url.m3u8"
     title="Live Stream Title"
   />
   ```

## 🔍 Development

### Adding New Features
1. Create a new component in the `TV/` directory
2. Follow the existing naming conventions
3. Add TypeScript interfaces for props
4. Update this README with new component documentation

### Testing
- Test with different HLS stream sources
- Verify PiP functionality across browsers
- Check error handling with invalid URLs
- Test responsive design on mobile devices

### Performance Considerations
- HLS.js is loaded only when needed
- Components are lazy-loaded where appropriate
- View count updates are throttled (30-second intervals)
- Memory cleanup on component unmount

## 🐛 Troubleshooting

### Common Issues

1. **Stream Not Loading**
   - Check CORS headers on your stream server
   - Verify HLS stream format is valid
   - Check browser console for detailed errors

2. **PiP Not Working**
   - Ensure browser supports Picture-in-Picture API
   - Check if video element is properly loaded
   - Verify HTTPS is used (required for PiP)

3. **HLS Playback Issues**
   - Test with different HLS.js versions
   - Check stream manifest format
   - Verify network connectivity

### Debug Mode
Enable console logging by checking browser developer tools for detailed error information and HLS.js events.

## 📄 License

This component system is part of the Bisame Web application.
