import React from "react";

interface ScrollButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${
      disabled
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-orange-500 hover:bg-orange-600"
    } text-white rounded-full p-1.5 sm:p-2 z-10 flex items-center justify-center`}
    aria-label={`Scroll ${direction}`}
  >
    {children}
  </button>
);

export default ScrollButton; 