/**
 * Utility function to generate image URLs
 * @param imagePath - The base image path or URL
 * @returns Formatted image URL or fallback
 */
export const getImageUrl = (imagePath?: string): string => {
  // Return placeholder if no image path provided
  if (!imagePath) {
    return '/f4.png';
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a relative path starting with '/', return as is
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // Handle different image domains based on your next.config.ts
  const imageDomains = [
    'image.bisame.com',
    'images.bisame.com', 
    'storage.googleapis.com',
    'bisame.com'
  ];

  // Check if the image path contains any of the configured domains
  const hasConfiguredDomain = imageDomains.some(domain => imagePath.includes(domain));
  
  if (hasConfiguredDomain) {
    return `https://${imagePath}`;
  }

  // Default to your primary image domain
  return `https://image.bisame.com/${imagePath}`;
};

/**
 * Format price with proper currency formatting
 * @param price - Price string
 * @returns Formatted price string
 */
export const formatPrice = (price: string): string => {
  if (!price || price === 'N/A') {
    return '';
  }

  // Extract numeric value and format with commas
  const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
  if (isNaN(numericPrice)) {
    return '';
  }

  return `₵${numericPrice.toLocaleString()}`;
};

/**
 * Format elapsed time from a date string
 * @param dateString - ISO date string
 * @returns Formatted time string
 */
export const formatElapsedTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  } catch (error) {
    console.error('Error formatting elapsed time:', error);
    return 'Recently';
  }
};

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text || text.length <= maxLength) {
    return text || '';
  }
  return text.substring(0, maxLength).trim() + '...';
};