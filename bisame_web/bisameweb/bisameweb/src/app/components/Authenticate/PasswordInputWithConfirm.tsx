import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputWithConfirmProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onToggleShowPassword: () => void;
  onToggleShowConfirmPassword: () => void;
  disabled?: boolean;
}

const PasswordInputWithConfirm: React.FC<PasswordInputWithConfirmProps> = ({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  showPassword,
  showConfirmPassword,
  onToggleShowPassword,
  onToggleShowConfirmPassword,
  disabled = false,
}) => (
  <>
    <div className="mb-4">
      <label
        className="block text-blue-600  text-sm font-semibold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <div className="flex items-center border rounded px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={onPasswordChange}
          className="appearance-none bg-transparent text-sm border-none w-full leading-tight focus:outline-none"
          placeholder="8+ characters"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={onToggleShowPassword}
          className="ml-2 text-gray-500 hover:text-orange-500"
          disabled={disabled}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>

    <div className="mb-4">
      <label
        className="block text-blue-600  text-sm font-semibold mb-2"
        htmlFor="confirm-password"
      >
        Confirm Password
      </label>
      <div className="flex items-center border rounded px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirm-password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          className="appearance-none bg-transparent text-sm border-none w-full text-gray-700 leading-tight focus:outline-none"
          placeholder="Re-enter your password"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={onToggleShowConfirmPassword}
          className="ml-2 text-gray-500 hover:text-orange-500"
          disabled={disabled}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  </>
);

export default PasswordInputWithConfirm;
