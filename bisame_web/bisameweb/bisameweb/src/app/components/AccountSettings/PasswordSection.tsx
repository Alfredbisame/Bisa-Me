"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { usePasswordChange } from "./usePasswordChange";
import toast from "react-hot-toast";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordSectionProps {
  onPasswordChange?: (data: PasswordFormData) => void;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({
  onPasswordChange,
}) => {
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { changePassword, loading, error } = usePasswordChange();

  const handleInputChange = (field: keyof PasswordFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await changePassword(
      formData.currentPassword,
      formData.newPassword,
      formData.confirmPassword
    );

    if (success) {
      // Show success toast
      toast.success(
        "Password changed successfully! Please login with your new password."
      );

      // Clear form on success
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Call the optional callback if provided
      if (onPasswordChange) {
        onPasswordChange(formData);
      }
    } else {
      // Show error toast
      toast.error(
        error?.message || "Failed to change password. Please try again."
      );
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        {/* Change Password Header */}

        <div className="border-b border-gray-200 py-3">
          <h2 className="text-base font-bold uppercase text-gray-700">
             Change Password
          </h2>
        </div>

        {/* Change Password Content */}
        <div className="px-6 py-6 space-y-6">
          <div>
            <label
              className="block text-xs mb-1 text-gray-900"
              htmlFor="current-password"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                id="current-password"
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                tabIndex={-1}
                type="button"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPasswords.current ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              className="block text-xs mb-1 text-gray-900"
              htmlFor="new-password"
            >
              New Password
            </label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                id="new-password"
                placeholder="8+ characters"
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                tabIndex={-1}
                type="button"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPasswords.new ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              className="block text-xs mb-1 text-gray-900"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                id="confirm-password"
                placeholder="8+ characters"
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                tabIndex={-1}
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPasswords.confirm ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            className={`text-white text-xs font-bold uppercase px-6 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordSection;
