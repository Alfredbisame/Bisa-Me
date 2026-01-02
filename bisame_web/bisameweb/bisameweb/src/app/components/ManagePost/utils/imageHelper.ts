// Helper to get the first image URL from various image types
export function getFirstImageUrl(image: string | { imageUrl: string }[] | { image_link: string }[] | string[]): string {
  if (typeof image === 'string') return image;
  if (Array.isArray(image) && image.length > 0) {
    if (typeof image[0] === 'string') return image[0] as string;
    if (typeof image[0] === 'object') {
      if ('imageUrl' in image[0]) return (image[0] as { imageUrl: string }).imageUrl;
      if ('image_link' in image[0]) return (image[0] as { image_link: string }).image_link;
    }
  }
  return '/f4.png';
}