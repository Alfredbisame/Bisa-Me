"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import MessageBoxModal from "../MessageBox/MessageBoxModal";

interface ProductActionButtonsProps {
  onChatClick?: () => void;
  onCallClick?: () => void;
  onTradeAssuranceClick?: () => void;
  phoneNumber?: string;
  className?: string;
  productTitle?: string;
  sellerId?: string;
  sellerName?: string;
  authenticated?: boolean;
  listingId?: string;
  currentUserId?: string;
}

const ProductActionButtons: FC<ProductActionButtonsProps> = ({
  onChatClick,
  onCallClick,
  onTradeAssuranceClick,
  phoneNumber,
  className = "",
  productTitle,
  sellerId,
  sellerName,
  authenticated,
  listingId,
  currentUserId,
}) => {
  const router = useRouter();

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);

  const handleChatClick = () => {
    if (onChatClick) {
      onChatClick();
    }
    setIsMessageBoxOpen(true);

    console.log("Opening chat for:", { productTitle, sellerId, sellerName });
  };

  const handleSendMessage = async (message: string) => {
    console.log("Sending message:", message);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Message sent successfully!");
  };

  const handleCallClick = () => {
    if (onCallClick) return onCallClick();

    if (!phoneNumber) {
      return console.log("No phone number available");
    }

    setShowPhoneNumber((prev) => !prev);
  };

  const handleTradeAssuranceClick = () => {
    onTradeAssuranceClick?.();
    router.push("/product_detail_trade_assurance");
  };

  return (
    <>
      <div className={`flex my-5 gap-2 sm:gap-4 ${className}`}>
        {/* CHAT BUTTON */}
        <button
          onClick={handleChatClick}
          className="
            flex-1 px-4 py-2 rounded-lg
            bg-orange-500 text-white font-medium
            text-sm sm:text-base
            hover:bg-orange-600 active:scale-[0.98]
            transition-all duration-200
            shadow-sm
          "
        >
          Chat
        </button>

        {/* CALL BUTTON */}
        <button
          onClick={handleCallClick}
          disabled={!phoneNumber}
          className={`
            flex-1 px-4 py-2 rounded-lg font-medium
            text-sm sm:text-base relative overflow-hidden
            border-2 border-orange-500 text-orange-500
            transition-all duration-300
            ${
              !phoneNumber
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-orange-50 active:scale-[0.98]"
            }
          `}
        >
          <div className="relative w-full h-full">
            {/* Default text */}

            {/* Phone Number */}
            {showPhoneNumber ? (
              <a
                href={`tel: +${phoneNumber}`}
                className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-500
                text-xs md:text-base
                ${
                  showPhoneNumber
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }
              `}
              >
                +{phoneNumber}
              </a>
            ) : (
              <span
                className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-500 
                ${
                  showPhoneNumber
                    ? "opacity-0 -translate-y-2"
                    : "opacity-100 translate-y-0"
                }
              `}
              >
                Call Now
              </span>
            )}
          </div>
        </button>

        {/* TRADE ASSURANCE */}
        <button
          disabled
          onClick={handleTradeAssuranceClick}
          className="
            flex-1 px-3 py-2 rounded-lg
            bg-blue-800 text-white font-medium
            hover:bg-blue-900 active:scale-[0.98]
            transition-all duration-200
            text-center min-h-[44px] shadow-sm
          "
        >
          <span
            className="
              text-xs sm:text-sm lg:text-base
              leading-tight line-clamp-2
            "
          >
            Bisame Trade Assurance
          </span>
        </button>
      </div>

      {/* MESSAGE MODAL */}
      {authenticated && (
        <MessageBoxModal
          isOpen={isMessageBoxOpen}
          onClose={() => setIsMessageBoxOpen(false)}
          onSendMessage={handleSendMessage}
          recipientName={sellerName || "Seller"}
          productTitle={productTitle || "Product"}
          recipientId={sellerId}
          listingId={listingId}
          currentUserId={currentUserId}
        />
      )}
    </>
  );
};

export default ProductActionButtons;
