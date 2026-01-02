"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const popularTags = [
  "Game", "iPhone", "TV", "Asus Laptops", "Macbook", "SSD",
  "Graphics Card", "Power Bank", "Smart TV", "Speaker", "Tablet",
  "Microwave", "Samsung"
];

// Quick links with their respective routes
const quickLinks = [
  { name: "Wishlist", href: "/dashboard/saved" },
  { name: "Customer Support", href: "/customer-support" },
  { name: "About Us", href: "/About_us" },
  { name: "Privacy Policy", href: "/privacy_policy" },
  { name: "Terms of Use", href: "/terms_of_use" },
];

const Footer = () => {
  return (
    <footer className="py-6 sm:py-8 md:py-10 bg-black text-gray-300 hidden md:block" role="contentinfo">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <section aria-label="Company Information" className="mb-6 sm:mb-0">
            <Link href="/">
            <Image
              src="/whitelogo1.png"
              alt="Bisame logo"
              width={100}
              height={50}
              className="mb-4"
            />
            </Link>
            <address className="not-italic">
              <h2 className="text-base font-normal">Customer Supports:</h2>
              <p className="font-bold">
                <a href="tel:+233256074790" className="hover:underline">
                  +233 256 074 790
                </a>
              </p>
              <p>
                Koree Mari Link
                <br />
                Achimota, Greater Accra
              </p>
              <a href="mailto:bisamecustomercare@gmail.com" className="hover:underline">
                bisamecustomercare@gmail.com
              </a>
            </address>
          </section>

          {/* Navigation Section */}
          <nav aria-label="Quick Links" className="mb-6 sm:mb-0">
            <h2 className="font-bold mb-4">QUICK LINKS</h2>
            <ul role="menu" className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name} role="menuitem">
                  <Link href={link.href} className="hover:underline hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* App Download Section */}
          <section aria-label="Mobile Applications" className="mb-6 sm:mb-0">
            <h2 className="font-bold mb-4">DOWNLOAD APP</h2>
            <div className="mb-4">
              <Link
                href="https://play.google.com/store/apps/details?id=com.bisame.bisame"
                className="block bg-gray-800 p-3 sm:p-4 md:p-6 rounded mb-2"
                aria-label="Download from Google Play"
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
              >
                <div className="flex items-center">
                  <FaGooglePlay className="mr-3 md:mr-4" size={30} aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm">Get it now</span>
                    <strong className="text-sm sm:text-base">Google Play</strong>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <Link
                href="https://apps.apple.com/us/app/bisame/id6459306016"
                className="block bg-gray-800 p-3 sm:p-4 md:p-6 rounded"
                aria-label="Download from App Store"
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
              >
                <div className="flex items-center">
                  <FaApple className="mr-3 md:mr-4" size={35} aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm">Get it now</span>
                    <strong className="text-sm sm:text-base">App Store</strong>
                  </div>
                </div>
              </Link>
            </div>
          </section>
          
          {/* Tags Section */}
          <section aria-label="Popular Tags" className="mb-6 sm:mb-0">
            <h2 className="font-bold mb-4">POPULAR TAG</h2>
            <div className="flex flex-wrap" role="list">
              {popularTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-800 text-gray-300 px-2 py-1 m-1 rounded cursor-pointer text-xs sm:text-sm"
                  role="listitem"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Copyright Section */}
      <section className="text-center mt-8 border-t border-gray-700 pt-4 px-4">
        <small>Bisame online store © {new Date().getFullYear()}.</small>
      </section>
    </footer>
  );
};

export default Footer;



