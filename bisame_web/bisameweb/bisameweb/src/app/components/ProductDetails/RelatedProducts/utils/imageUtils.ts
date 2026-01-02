export const getImageUrl = (imageLink: string): string => {
  if (!imageLink) return '/s21.png';

  let url = imageLink.replace("image.", "images.");

  if (!url.match(/\/\d+\/\d+$/)) {
    url = url.replace(/\/$/, '');
    url = `${url}/500/500`;
  }

  return url;
};
