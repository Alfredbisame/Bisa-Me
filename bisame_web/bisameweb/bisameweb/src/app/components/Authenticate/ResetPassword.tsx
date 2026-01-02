"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowRight, FaSpinner } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import CustomizePrompt from "../ui/CustomizePrompt";
import { CiLock } from "react-icons/ci";
import { useResetPassword } from "./useResetPassword";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { triggerResetPassword, isResetting } = useResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      toast.error("Password must contain uppercase, lowercase, and numbers");
      return;
    }

    try {
      await triggerResetPassword({ password });
    } catch (error) {
      console.error("Reset password error:", error);
      // Error is already handled by the hook
    }
  };

  return (
    <div className="flex items-center justify-center md:py-10 bg-gray-100">
      <Toaster position="top-right" />

      <div className="bg-white p-8 rounded-md md:shadow-md w-full max-w-sm">
        {/* Header */}
        <div className="flex flex-col items-center">
          <h2 className="sm:text-xl md:text-2xl font-semibold text-center mb-2 text-orange-400">
            Reset Password
          </h2>
          <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
          <CustomizePrompt
            icon={<CiLock color="orange" />}
            backgroundColor="orange"
            textColor="blue"
            message="Create a strong, unique password to secure your account. Make it memorable but hard to guess!"
          />
          <p className="text-center mb-6 text-xs text-gray-400 font-semibold">
            Your security is our top priority!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input */}
          <div>
            <label
              className="block text-blue-500 text-sm mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8+ characters (include A-Z, a-z, 0-9)"
                disabled={isResetting}
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isResetting}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {password && password.length > 0 && (
              <div className="mt-1 text-xs">
                {password.length < 8 && (
                  <p className="text-red-500">• At least 8 characters</p>
                )}
                {!/[A-Z]/.test(password) && (
                  <p className="text-red-500">• One uppercase letter</p>
                )}
                {!/[a-z]/.test(password) && (
                  <p className="text-red-500">• One lowercase letter</p>
                )}
                {!/[0-9]/.test(password) && (
                  <p className="text-red-500">• One number</p>
                )}
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              className="block text-blue-500 text-sm mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                disabled={isResetting}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isResetting}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {confirmPassword && confirmPassword !== password && (
              <p className="mt-1 text-xs text-red-500">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={
              isResetting ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword
            }
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors"
          >
            {isResetting ? (
              <>
                <FaSpinner size={15} className="animate-spin mr-2" />
                Resetting Password...
              </>
            ) : (
              <span className="flex items-center text-sm">
                Reset Password <FaArrowRight size={10} className="ml-2" />
              </span>
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Remember your password?{" "}
            <a
              href="/UserAccounts/SignIn"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
