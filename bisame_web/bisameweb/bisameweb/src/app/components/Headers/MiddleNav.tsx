"use client";
import Image from "next/image";
import { FaHeart, FaRegUser, FaUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import SearchBar from "../SearchBar/SearchBar";
import SignIn from "./sign_in";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PostAdModal from "../SellButton/PostAdModal";
import DropdownButton from "../Location/DropdownButton";
import { useAuth } from "../../hooks/useAuth";

const MiddleNav: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showPostAdModal, setShowPostAdModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const pathName = usePathname();

  // Handle outside click for sign-in modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSignIn(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserIconClick = () => {
    console.log('[MiddleNav] User icon clicked. isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

    if (isAuthenticated) {
      console.log('[MiddleNav] Redirecting to dashboard');
      router.push("/dashboard");
    } else {
      console.log('[MiddleNav] Showing sign-in modal');
      setShowSignIn(!showSignIn);
    }
  };

  const handleSellClick = () => {
    if (isAuthenticated) {
      setShowPostAdModal(true);
    } else {
      setShowSignIn(!showSignIn);
    }
  };

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard/saved");
    } else {
      setShowSignIn(!showSignIn);
    }
  };

  // Function handles all category ads

  const handleCategoryAds = (category: string) => {
    switch (category) {
      case "services":
        router.push(`/sell/allcategory?group=services`);
        setShowPostAdModal(false);
        break;
      case "products":
        router.push(`/sell/allcategory?group=products`);
        setShowPostAdModal(false);
        break;
      case "books":
        router.push(`/sell/allcategory?group=books`);
        setShowPostAdModal(false);
        break;
      case "jobs":
        router.push(`/sell/allcategory?group=jobs`);
        setShowPostAdModal(false);
        break;
      case "foods":
        router.push(`/sell/allcategory?group=foods`);
        setShowPostAdModal(false);
        break;
      case "jobseek":
        router.push(`/sell/allcategory?group=jobseek`);
        setShowPostAdModal(false);
        break;
      case "health":
        router.push(`/sell/allcategory?group=health`);
        setShowPostAdModal(false);
        break;
      default:
        break;
    }
  };

  const handleSelectServices = () => {
    setShowPostAdModal(false);
    router.push("/sell/services");
  };

  const handleSelectBuySell = () => {
    setShowPostAdModal(false);
    router.push("/sell/products");
  };

  const handleLoginSuccess = () => {
    setShowSignIn(false);
  };

  return (
    <div className="relative">
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56 py-4 bg-blue-900">
        <div className="flex items-center border border-purple-800">
          <Link href="/" className="w-20">
            <Image
              src="/whitelogo1.png"
              alt="Logo"
              layout="responsive"
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>

        {/* Search Section with Location Dropdown */}
        <div className="flex-1 max-w-2xl mx-2 md:mx-8">
          <div className="flex items-center justify-between">
            {/* Location Dropdown - Left side */}
            <div className="flex-shrink-0 space-x-4 px-2">
              <DropdownButton className="h-full" />
            </div>

            {/* Search Bar - Right side */}
            <div className="flex-1 min-w-0">
              <SearchBar className="h-full" />
            </div>
          </div>
        </div>

        <div className="md:flex items-center md:space-x-4">
          {/* Sell Button with Tooltip */}
          <div className="relative group hidden md:block">
            <button
              onClick={handleSellClick}
              className="bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              SELL
            </button>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Start Selling
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>

          {/* Wishlist Icon with Tooltip */}
          <div className="relative group">
            {pathName == "/dashboard/saved" ? (
              <FaHeart size={20} color="red" />
            ) : (
              <CiHeart
                onClick={handleWishlistClick}
                className="text-white text-2xl cursor-pointer hover:text-orange-500 transition-colors"
              />
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Wishlist
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>

          {/* User Icon with Tooltip */}
          <div className="relative group hidden md:block">
            {isAuthenticated ? (
              <FaUser
                onClick={handleUserIconClick}
                className="text-orange-500 text-2xl cursor-pointer hover:text-orange-600 transition-colors"
              />
            ) : (
              <FaRegUser
                onClick={handleUserIconClick}
                className="text-white text-2xl cursor-pointer hover:text-orange-500 transition-colors"
              />
            )}
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {isAuthenticated ? "My Bisame" : "Sign In"}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sign-in Modal */}
      <div
        ref={dropdownRef}
        className={`absolute right-4 md:right-8 lg:right-16 xl:right-24 2xl:right-56 top-full z-50 mt-2 transition-all duration-300 transform
          ${showSignIn
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }`}
      >
        <SignIn onLoginSuccess={handleLoginSuccess} />
      </div>

      {/* Post Ad Modal */}
      <PostAdModal
        isOpen={showPostAdModal}
        onClose={() => setShowPostAdModal(false)}
        onSelectServices={handleSelectServices}
        onSelectBuySell={handleSelectBuySell}
        onSelectCategory={handleCategoryAds}
      />
    </div>
  );
};

export default MiddleNav;
