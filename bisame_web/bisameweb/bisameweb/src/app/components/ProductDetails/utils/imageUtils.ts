// Define a type for the image link that can be either a string or a nested object structure
export type ImageLink = string | { 
  imageUrl: string | { 
    imageUrl: string 
  } 
};

// Function to add width and height to image URL in the format /500/500
export const getImageUrl = (imageLink: ImageLink, width = 500, height = 500): string => {
  // Handle case where imageLink is null, undefined, or falsy
  if (!imageLink) return '/f4.png';
  
  // Handle case where imageLink is an object with nested imageUrl property (new Cloudinary format)
  let url: string;
  if (typeof imageLink === 'object' && imageLink.imageUrl) {
    // If it's the new Cloudinary format with nested imageUrl
    if (typeof imageLink.imageUrl === 'string') {
      url = imageLink.imageUrl;
    } else if (typeof imageLink.imageUrl === 'object' && imageLink.imageUrl.imageUrl) {
      // Handle deeply nested imageUrl
      url = imageLink.imageUrl.imageUrl;
    } else {
      return '/f4.png';
    }
  } else {
    // Convert to string if it isn't already (legacy format)
    url = String(imageLink);
  }
  
  // If the URL is empty after conversion, return fallback
  if (!url.trim()) return '/f4.png';
  
  // Check if it's a Cloudinary URL (already properly formatted with dimensions)
  if (url.includes('cloudinary.com')) {
    // Cloudinary URLs are already properly formatted, return as is
    return url;
  }
  
  // For legacy URLs, apply transformations
  // Replace image. with images.
  url = url.replace(/image\./g, "images.");
  
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