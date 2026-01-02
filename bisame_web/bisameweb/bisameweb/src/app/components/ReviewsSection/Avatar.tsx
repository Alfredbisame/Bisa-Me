import React, { useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/app/components/ProductDetails/utils/imageUtils';

interface AvatarProps {
  name: string;
  avatar: string;
}

function isExternalUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname !== window.location.hostname && !url.startsWith('/');
  } catch {
    return false;
  }
}

// This Avatar component is used for both customer and seller avatars in the review chat UI.
const Avatar: React.FC<AvatarProps> = ({ name, avatar }) => {
  const fallback = '/Avatar1.png';
  const formattedAvatar = avatar && avatar.trim() !== '' ? getImageUrl(avatar, 48, 48) : fallback;
  const [imgSrc, setImgSrc] = useState(formattedAvatar);

  // If the src is external (like ui-avatars.com), use <img>. Otherwise, use next/image.
  const isExternal = typeof window !== 'undefined' && isExternalUrl(imgSrc);

  return (
    <div className="relative">
      <Image
        src={imgSrc}
        alt={`${name}'s avatar`}
        width={48}
        height={48}
        className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-gray-100"
        onError={() => setImgSrc(fallback)}
        unoptimized={isExternal}
      />
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Avatar; 


// import React, { useState } from 'react';
// import Image from 'next/image';
// import { getImageUrl } from '@/app/components/ProductDetails/utils/imageUtils';

// interface AvatarProps {
//   name: string;
//   avatar: string;
// }

// function isExternalUrl(url: string) {
//   try {
//     const { hostname } = new URL(url);
//     return hostname !== window.location.hostname && !url.startsWith('/');
//   } catch {
//     return false;
//   }
// }

// const Avatar: React.FC<AvatarProps> = ({ name, avatar }) => {
//   const fallback = '/Avatar1.png';
//   const formattedAvatar = avatar && avatar.trim() !== '' ? getImageUrl(avatar, 48, 48) : fallback;
//   const [imgSrc, setImgSrc] = useState(formattedAvatar);
  
//   // If the src is external (like ui-avatars.com), use <img>. Otherwise, use next/image.
//   const isExternal = typeof window !== 'undefined' && isExternalUrl(imgSrc);
  
//   return (
//     <div className="relative">
//       {isExternal ? (
//         <img
//           src={imgSrc}
//           alt={`${name}'s avatar`}
//           width={48}
//           height={48}
//           className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
//           onError={() => setImgSrc(fallback)}
//         />
//       ) : (
//         <Image
//           src={imgSrc}
//           alt={`${name}'s avatar`}
//           width={48}
//           height={48}
//           className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
//           onError={() => setImgSrc(fallback)}
//         />
//       )}
//       <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
//         <div className="w-3 h-3 bg-green-400 rounded-full"></div>
//       </div>
//     </div>
//   );
// };

// export default Avatar; 