"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { GoInfo } from "react-icons/go";
import { IoHeadsetOutline } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";
// import ServicesDropDown from "../ServicesMenu/ServicesDropDown";
// import BuySellDropDown from "../BuySellMenu/BuySellDropDown";
import ChatNotification from "./ChatNotification/ChatNotification";
import SignIn from "./sign_in";
import CategoriesDropdown from "../Category/CategoriesDropdown";

interface BottomNavProps {
  onUnauthorizedChatClick?: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({}) => {
  const [showCategories, setShowCategories] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  // const [mounted, setMounted] = useState(false); // unused variable
  const router = useRouter();

  //Show  categories state

  // Create refs for the dropdown containers
  const signInDropdownRef = useRef<HTMLDivElement>(null);
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   setMounted(true);
  // }, []); // unused effect

  const handleCategoriesClick = () => {
    setShowCategories((prev) => !prev);
  };

  const handleNeedHelpClick = () => {
    router.push("/help-center");
  };

  const handleNeedSupportClick = () => {
    router.push("/customer-support");
  };

  // Handle unauthorized chat click - this will be called when user is not logged in
  const handleUnauthorizedChatClick = () => {
    setShowSignIn(!showSignIn);
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside SignIn dropdown
      if (
        showSignIn &&
        signInDropdownRef.current &&
        !signInDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSignIn(false);
      }

      // Checks for categories
      if (
        showCategories &&
        categoriesButtonRef.current &&
        categoriesDropdownRef.current &&
        !categoriesButtonRef.current.contains(event.target as Node) &&
        !categoriesDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategories(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategories, showSignIn]);

  return (
    // Hide the entire component on mobile screens, show on md and above
    <div className="hidden md:block relative">
      <div className="flex items-center justify-between p-4 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 border-b">
        <div className="flex space-x-4">
          <button
            ref={categoriesButtonRef}
            className={`
              flex items-center space-x-1 p-2 rounded cursor-pointer
              transition-all duration-300 ease-in-out
              ${
                showCategories
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 hover:bg-orange-500 hover:text-white"
              }
            `}
            onClick={handleCategoriesClick}
          >
            <span>Categories</span>
            <IoChevronDownSharp
              size={14}
              className={`
                transform transition-all duration-300
                ${showCategories ? "rotate-180" : ""}
              `}
            />
          </button>

          <button
            className="flex items-center space-x-1 p-2 rounded cursor-pointer hover:bg-blue-50/30 hover:text-blue-600 transition-all duration-300 ease-in-out"
            onClick={handleNeedSupportClick}
          >
            <IoHeadsetOutline size={16} />
            <span>Customer Support</span>
          </button>

          <button
            className="flex items-center space-x-1 p-2 rounded cursor-pointer hover:bg-blue-50/30 hover:text-blue-600 transition-all duration-300 ease-in-out"
            onClick={handleNeedHelpClick}
          >
            <GoInfo size={16} />
            <span>Need Help</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
            <MdOutlinePhoneInTalk size={16} />
            <span>+233 256 074 790</span>
          </div>

          {/* Chat Notification with unauthorized click handler */}
          <ChatNotification
            variant="header"
            onUnauthorizedClick={handleUnauthorizedChatClick}
          />
        </div>
      </div>

      {/* Categories Dropdown */}
      <div
        ref={categoriesDropdownRef}
        className={`
          absolute md:left-6 lg:left-16  xl:left-24 2xl:left-56
          z-50
          transform transition-all duration-300 origin-top
          ${showCategories ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}
          `}
      >
        <CategoriesDropdown />
      </div>

      {/* Sign-in Modal */}
      <div
        ref={signInDropdownRef}
        className={`absolute right-4 md:right-8 lg:right-16 xl:right-24 2xl:right-56 top-full z-50 mt-2 transition-all duration-300 transform
          ${
            showSignIn
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }`}
      >
        <SignIn />
      </div>
    </div>
  );
};

export default BottomNav;

// "use client";
// import { useState, useEffect, useRef } from "react";
// import { MdOutlinePhoneInTalk } from "react-icons/md";
// import { GoInfo } from "react-icons/go";
// import { IoHeadsetOutline } from "react-icons/io5";
// import { IoChevronDownSharp } from "react-icons/io5";
// import ServicesDropDown from "../ServicesMenu/ServicesDropDown";
// import BuySellDropDown from "../BuySellMenu/BuySellDropDown";

// const BottomNav = () => {
//   const [showServices, setShowServices] = useState(false);
//   const [showBuySell, setShowBuySell] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   // Create refs for the dropdown containers
//   const servicesButtonRef = useRef<HTMLButtonElement>(null);
//   const servicesDropdownRef = useRef<HTMLDivElement>(null);
//   const buySellButtonRef = useRef<HTMLButtonElement>(null);
//   const buySellDropdownRef = useRef<HTMLDivElement>(null);

//   const handleServicesClick = () => {
//     setShowServices(!showServices);
//     setShowBuySell(false);
//   };

//   const handleBuySellClick = () => {
//     setShowBuySell(!showBuySell);
//     setShowServices(false);
//   };

//   // Handle clicks outside the dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       // Check if click is outside Services dropdown
//       if (showServices &&
//           servicesButtonRef.current &&
//           servicesDropdownRef.current &&
//           !servicesButtonRef.current.contains(event.target as Node) &&
//           !servicesDropdownRef.current.contains(event.target as Node)) {
//         setShowServices(false);
//       }

//       // Check if click is outside Buy/Sell dropdown
//       if (showBuySell &&
//           buySellButtonRef.current &&
//           buySellDropdownRef.current &&
//           !buySellButtonRef.current.contains(event.target as Node) &&
//           !buySellDropdownRef.current.contains(event.target as Node)) {
//         setShowBuySell(false);
//       }
//     };

//     // Add event listener
//     document.addEventListener('mousedown', handleClickOutside);

//     // Clean up
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showServices, showBuySell]);

//   return (
//     <div className="relative">
//       <div className="flex flex-wrap items-center justify-between p-4 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 border-b">
//         {/* Mobile menu button - only visible on small screens */}
//         <button
//           className="md:hidden flex items-center p-2 rounded bg-gray-100 hover:bg-orange-500 hover:text-white"
//           onClick={() => setShowMobileMenu(!showMobileMenu)}
//         >
//           <span>Menu</span>
//           <IoChevronDownSharp
//             size={14}
//             className={`ml-1 transform transition-all duration-300 ${showMobileMenu ? 'rotate-180' : ''}`}
//           />
//         </button>

//         {/* Desktop navigation */}
//         <div className={`${showMobileMenu ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 md:space-x-4 space-y-2 md:space-y-0`}>
//           <button
//             ref={servicesButtonRef}
//             className={`
//               flex items-center space-x-1 p-2 rounded cursor-pointer
//               transition-all duration-300 ease-in-out
//               ${showServices
//                 ? 'bg-orange-500 text-white'
//                 : 'bg-gray-100 hover:bg-orange-500 hover:text-white'
//               }
//             `}
//             onClick={handleServicesClick}
//           >
//             <span>Services</span>
//             <IoChevronDownSharp
//               size={14}
//               className={`
//                 transform transition-all duration-300
//                 ${showServices ? 'rotate-180' : ''}
//               `}
//             />
//           </button>

//           <button
//             ref={buySellButtonRef}
//             className={`
//               flex items-center space-x-1 p-2 rounded cursor-pointer
//               transition-all duration-300 ease-in-out
//               ${showBuySell
//                 ? 'bg-orange-500 text-white'
//                 : 'bg-gray-100 hover:bg-orange-500 hover:text-white'
//               }
//             `}
//             onClick={handleBuySellClick}
//           >
//             <span>Buy / Sell</span>
//             <IoChevronDownSharp
//               size={14}
//               className={`
//                 transform transition-all duration-300
//                 ${showBuySell ? 'rotate-180' : ''}
//               `}
//             />
//           </button>

//           <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
//             <IoHeadsetOutline size={16} />
//             <span>Customer Support</span>
//           </div>

//           <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
//             <GoInfo size={16} />
//             <span>Need Help</span>
//           </div>
//         </div>

//         <div className={`${showMobileMenu ? 'flex' : 'hidden'} md:flex items-center space-x-4 w-full md:w-auto mt-4 md:mt-0 justify-end`}>
//           <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
//             <MdOutlinePhoneInTalk size={16} />
//             <span>+233 59 467 3304</span>
//           </div>
//         </div>
//       </div>

//       {/* Services Dropdown */}
//       <div
//         ref={servicesDropdownRef}
//         className={`
//           absolute left-4 md:left-8 lg:left-16 xl:left-24 2xl:left-32 top-full z-50
//           transform transition-all duration-300 origin-top
//           ${showServices
//             ? 'scale-y-100 opacity-100'
//             : 'scale-y-0 opacity-0'
//           }
//         `}
//       >
//         <ServicesDropDown />
//       </div>

//       {/* Buy/Sell Dropdown */}
//       <div
//         ref={buySellDropdownRef}
//         className={`
//           absolute left-4 md:left-24 lg:left-32 xl:left-40 2xl:left-56 top-full z-50
//           transform transition-all duration-300 origin-top
//           ${showBuySell
//             ? 'scale-y-100 opacity-100'
//             : 'scale-y-0 opacity-0'
//           }
//         `}
//       >
//         <BuySellDropDown />
//       </div>
//     </div>
//   );
// };

// export default BottomNav;
