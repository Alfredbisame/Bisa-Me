import React from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  disabled?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, showPassword, onToggleShowPassword, disabled }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <label className="block text-sm font-semibold text-blue-600">Password</label>
      <Link href="/UserAccounts/forget_password" className="text-sm text-blue-500 hover:underline">
        Forget Password?
      </Link>
    </div>
    <div className="flex items-center border rounded-lg px-3 py-2 text-blue-600 text-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
        placeholder="Password"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={onToggleShowPassword}
        className="ml-2 text-gray-500 hover:text-orange-500"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>
);

export default PasswordInput; 