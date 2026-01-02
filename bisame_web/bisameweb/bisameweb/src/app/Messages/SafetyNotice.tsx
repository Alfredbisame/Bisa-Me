import React from "react";

interface SafetyNoticeProps {
  type: "warning" | "info";
  message: string;
  icon?: string;
}

const SafetyNotice: React.FC<SafetyNoticeProps> = ({ type, message, icon }) => {
  const getIcon = () => {
    if (icon) return icon;

    if (type === "warning") {
      return (
        <svg
          className="w-4 h-4 text-orange-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return "💚";
  };

  return (
    <div className="flex justify-center">
      <div
        className={`
        max-w-sm mx-auto border rounded-full flex items-center justify-center text-xs px-3 py-1.5 shadow-sm
        ${
          type === "warning"
            ? "border-orange-200 bg-orange-50 text-orange-700"
            : "border-blue-200 bg-blue-50 text-blue-700"
        }
      `}
      >
        <span className="mr-1.5 flex-shrink-0">{getIcon()}</span>
        <span className="text-center">{message}</span>
      </div>
    </div>
  );
};

export default SafetyNotice;
