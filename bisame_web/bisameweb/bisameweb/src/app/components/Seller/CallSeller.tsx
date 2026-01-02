import React, { useState, useEffect } from "react";
import { FaPhone, FaWhatsapp, FaSpinner } from "react-icons/fa";
import { useSellerData } from "../ProductDetails/hooks/useSellerData";

interface CallSellerProps {
  phoneNumber?: string;
  sellerName?: string;
  onCall?: () => void;
  className?: string;
  isOnline?: boolean;
  lastSeen?: string;
  sellerId?: string;
}

const CallSeller: React.FC<CallSellerProps> = ({
  phoneNumber: propPhoneNumber,
  sellerName: propSellerName,
  // onCall,
  className = "",
  sellerId: propSellerId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<"call" | "whatsapp" | null>(null);
  const [currentSellerId, setCurrentSellerId] = useState<string | null>(null);

  /* ---------------------------------
     Retrieve Seller ID
  ----------------------------------- */
  useEffect(() => {
    const sellerId = propSellerId || localStorage.getItem("currentSellerId");
    setCurrentSellerId(sellerId);
  }, [propSellerId]);

  /* ---------------------------------
     Fetch Seller Data
  ----------------------------------- */
  const { sellerStats, isLoading: isSellerDataLoading } = useSellerData(
    currentSellerId || undefined
  );

  const phoneNumber = propPhoneNumber || sellerStats?.upgrade;
  const sellerName = propSellerName || sellerStats?.name || "Seller";
  const isDisabled = !phoneNumber || isSellerDataLoading;

  /* ---------------------------------
     Actions (Call + WhatsApp)
  ----------------------------------- */

  // const handleCall = async () => {
  //   if (isLoading) return;

  //   setIsLoading(true);
  //   setLoadingAction("call");

  //   try {
  //     if (onCall) {
  //       await onCall();
  //     } else if (phoneNumber) {
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //       window.location.href = `tel:${phoneNumber}`;
  //     }
  //   } finally {
  //     setIsLoading(false);
  //     setLoadingAction(null);
  //   }
  // };

  const handleWhatsApp = async () => {
    if (isLoading || !phoneNumber) return;

    setIsLoading(true);
    setLoadingAction("whatsapp");

    try {
      const message = `Hi ${sellerName}, I'm interested in your products on Bisame.`;
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

      await new Promise((resolve) => setTimeout(resolve, 300));
      window.open(url, "_blank");
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  };

  /* ---------------------------------
     Loading Placeholder
  ----------------------------------- */
  if (isSellerDataLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center justify-center px-6 py-4 bg-gray-200 rounded-lg animate-pulse"
            >
              <FaSpinner className="w-5 h-5 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-500">Loading...</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------------------------
     Main UI
  ----------------------------------- */
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* CALL BUTTON */}
        <a
          href={`tel:+${phoneNumber}`}
          // disabled={isDisabled || isLoading}
          className={`
            group relative overflow-hidden flex items-center justify-center px-6 py-4
            bg-gradient-to-r from-blue-600 to-blue-700
            hover:from-blue-700 hover:to-blue-800
            text-white font-semibold rounded-lg
            transition-all duration-300
            transform hover:scale-[1.02] hover:shadow-xl
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            ${loadingAction === "call" ? "animate-pulse" : ""}
          `}
        >
          <div className="relative z-10 flex items-center space-x-3">
            {loadingAction === "call" ? (
              <FaSpinner className="w-5 h-5 animate-spin" />
            ) : (
              <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition">
                <FaPhone className="w-4 h-4" />
              </div>
            )}
            <span>{loadingAction === "call" ? "Connecting..." : "Call Now"}</span>
          </div>
        </a>

        {/* WHATSAPP BUTTON */}
        <button
          onClick={handleWhatsApp}
          disabled={isDisabled || isLoading}
          className={`
            group relative overflow-hidden flex items-center justify-center px-6 py-4
            bg-gradient-to-r from-green-500 to-green-600
            hover:from-green-600 hover:to-green-700
            text-white font-semibold rounded-lg
            transition-all duration-300
            transform hover:scale-[1.02] hover:shadow-xl
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            ${loadingAction === "whatsapp" ? "animate-pulse" : ""}
          `}
        >
          <div className="relative z-10 flex items-center space-x-3">
            {loadingAction === "whatsapp" ? (
              <FaSpinner className="w-5 h-5 animate-spin" />
            ) : (
              <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition">
                <FaWhatsapp className="w-4 h-4" />
              </div>
            )}
            <span>{loadingAction === "whatsapp" ? "Opening..." : "WhatsApp"}</span>
          </div>
        </button>

      </div>
    </div>
  );
};

export default CallSeller;
