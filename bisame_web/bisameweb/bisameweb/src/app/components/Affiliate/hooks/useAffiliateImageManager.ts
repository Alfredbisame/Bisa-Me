import { useState } from 'react';

const useAffiliateImageManager = () => {
  const [imgSrcMap, setImgSrcMap] = useState<Record<string, string>>({});

  const handleImageError = (affiliateName: string) => {
    setImgSrcMap((prev) => ({ ...prev, [affiliateName]: '/f4.png' }));
  };

  return {
    imgSrcMap,
    handleImageError
  };
};

export default useAffiliateImageManager; 