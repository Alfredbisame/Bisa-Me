// Fetcher function for SWR
export const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};

// Function to add width and height to image URL in the format /500/500
export const getImageUrl = (imageLink: string, width = 500, height = 500) => {
  if (!imageLink) return '/placeholder.jpg';
  
  // Replace image. with images. as in the original code
  let url = imageLink.replaceAll("image.", "images.");
  
  // Add dimensions in the path format /width/height
  // First check if it already has dimensions
  if (!url.match(/\/\d+\/\d+$/)) {
    // Remove any trailing slash if present
    url = url.replace(/\/$/, '');
    // Append the dimensions
    url = `${url}/${width}/${height}`;
  }
  
  return url;
};

export const formatElapsedTime = (dateString: string) => {
  if (!dateString) return 'Unknown date';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Handle negative differences (future dates)
  if (diffInSeconds < 0) return 'In the future';
  
  // Convert to different time units
  const seconds = diffInSeconds;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Average days per month
  const years = Math.floor(days / 365.25); // Account for leap years
  
  const parts: string[] = [];
  
  if (years > 0) {
    const remainingMonths = Math.floor((days - (years * 365.25)) / 30.44);
    const remainingDays = Math.floor(days - (years * 365.25) - (remainingMonths * 30.44));
    
    parts.push(`${years} year${years > 1 ? 's' : ''}`);
    
    if (remainingMonths > 0) {
      parts.push(`${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`);
    }
    
    if (remainingDays > 0 && parts.length < 2) {
      parts.push(`${remainingDays} day${remainingDays > 1 ? 's' : ''}`);
    }
  } else if (months > 0) {
    const remainingDays = Math.floor(days - (months * 30.44));
    
    parts.push(`${months} month${months > 1 ? 's' : ''}`);
    
    if (remainingDays > 0) {
      parts.push(`${remainingDays} day${remainingDays > 1 ? 's' : ''}`);
    }
  } else if (days > 0) {
    const remainingHours = hours - (days * 24);
    
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
    
    if (remainingHours > 0 && days < 7) {
      parts.push(`${remainingHours} hour${remainingHours > 1 ? 's' : ''}`);
    }
  } else if (hours > 0) {
    const remainingMinutes = minutes - (hours * 60);
    
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    
    if (remainingMinutes > 0 && hours < 24) {
      parts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`);
    }
  } else if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  } else {
    parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
  }
  
  // Join parts with appropriate conjunctions
  if (parts.length === 1) {
    return `${parts[0]} ago`;
  } else if (parts.length === 2) {
    return `${parts[0]} ${parts[1]} ago`;
  } else {
    // This shouldn't happen with current logic, but just in case
    return `${parts.slice(0, 2).join(' ')} ago`;
  }
};



// export const formatElapsedTime = (dateString: string) => {
//   if (!dateString) return 'Unknown date';
  
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
//   if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
//   if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
//   if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
//   if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
//   if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
//   return `${Math.floor(diffInSeconds / 31536000)} years ago`;
// };
