import { FC } from 'react';
import { FaXTwitter, FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa6';
import Link from 'next/link';

// interface TopNavProps {
//   //Component props will be defined here
// }

const TopNav: FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-2 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 text-white text-sm bg-blue-900 border-gray-500 border-b-[0.5px]">
      <div className="text-base text-center sm:text-left mb-2 sm:mb-0">Welcome to Bisame online store.</div>
      
      <div className="flex items-center space-x-2">
        <span className="text-base hidden sm:inline">Follow us:</span>
        <div className="flex space-x-3 sm:space-x-2">
          <Link 
            href="https://x.com/bisametv?t=IwAKJLbSBCksfrFNf5NUDA&s=09" 
            className="text-white hover:text-orange-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter size={15} />
          </Link>
          
          <Link 
            href="https://www.facebook.com/share/162xz47fnL/" 
            className="text-white hover:text-orange-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF size={15} />
          </Link>

          {/* <Link 
            href="https://pinterest.com" 
            className="text-white hover:text-orange-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPinterest size={15} />
          </Link>
           */}
          <Link 
            href="https://www.tiktok.com/@bisame.app?_t=ZM-8vOAuQ4ZNjD&_r=1" 
            className="text-white hover:text-orange-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok size={15} />
          </Link>

          <Link 
            href="https://youtube.com/@bisametv?si=_2cpvT8CcM_dyF95" 
            className="text-white hover:text-orange-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={15} />
          </Link>
           
          <Link 
            href="https://www.instagram.com/bisame_app?igsh=bzVib2IyMzIxZnhu" 
            className="text-white hover:text-orange-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNav;


// import { FC } from 'react';
// import {  FaXTwitter, FaFacebookF, FaPinterest, FaGoogle, FaYoutube, FaInstagram } from 'react-icons/fa6';
// import Link from 'next/link'; 

// // interface TopNavProps {
// //   //Component props will be defined here
// // }

// const TopNav: FC = () => {
//   return (
//     <div className="flex justify-between items-center py-2 px-56 text-white text-sm bg-blue-900 border-gray-500 border-b-[0.5px]">
//       <div className="text-base">Welcome to Bisame online store.</div>
//       <div className="flex items-center space-x-2">
//     <span className="text-base">Follow us:</span>
//           <Link href="https://twitter.com" className="text-white hover:text-orange-500 transition-colors"
//           target="_blank"
//           rel="noopener noreferrer"
//           >
//           <FaXTwitter size={15} />
//       </Link>
      
//       <Link href="https://facebook.com" className="text-white hover:text-orange-500 transition-colors"
//       target="_blank"
//       rel="noopener noreferrer"
//       >
//           <FaFacebookF size={15} />
//       </Link>

//       <Link href="https://pinterest.com" className="text-white hover:text-orange-500 transition-colors"
//       target="_blank"
//       rel="noopener noreferrer"
//       >
//           <FaPinterest size={15} />
//       </Link>

//       <Link href="https://google.com" className="text-white hover:text-orange-500 transition-colors"
//       target="_blank"
//       rel="noopener noreferrer"
//       >
//           <FaGoogle size={15} />
//       </Link>

//       <Link href="https://youtube.com" className="text-white hover:text-orange-500 transition-colors"
//       target="_blank"
//       rel="noopener noreferrer"
//       >
//           <FaYoutube size={15} />
//       </Link>

//       <Link href="https://instagram.com" className="text-white hover:text-orange-500 transition-colors"
//       target="_blank"
//       rel="noopener noreferrer"
//       >
//           <FaInstagram size={15} />
//       </Link>

// </div>
//     </div>
//   );
// };

// export default TopNav;