"use client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { useForgetPassword } from "./useForgetPassword";
import CustomizePrompt from "../ui/CustomizePrompt";
import { HiOutlineLightBulb } from "react-icons/hi";

const ForgetPassword: React.FC = () => {
  const { phoneNumber, setPhoneNumber, handleSubmit, isMutating } =
    useForgetPassword();

  return (
    <div className="bg-gray-100 flex items-center justify-center md:py-10">
      <div className="bg-white p-8 rounded-lg md:shadow-md w-full max-w-sm">
        {/* Header */}
        <div className="flex flex-col items-center">
          <h2 className="sm:text-xl md:text-2xl font-semibold text-center mb-2 text-orange-400">
            Forget Password?
          </h2>
          <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
          <CustomizePrompt
            icon={<HiOutlineLightBulb color="orange" />}
            backgroundColor="orange"
            textColor="blue"
            message="No worries! We'll send you a secure code to reset your password. Just enter your phone number below!"
          />
          <p className="text-center mb-6 text-xs text-gray-400 font-semibold">
            This help us verify it&apos;s really you!
          </p>
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm text-blue-600 font-semibold"
            htmlFor="phone-number"
          >
            Phone number
          </label>
          <PhoneInput
            international
            defaultCountry="GH" // Default country set to Ghana
            value={phoneNumber}
            onChange={setPhoneNumber}
            className="border rounded-lg overflow-hidden w-full h-10 text-sm text-blue-600 font-semibold px-3"
            placeholder="Enter phone number"
          />
        </div>

        {/* Send Code Button */}
        <button
          onClick={handleSubmit}
          disabled={isMutating || !phoneNumber}
          className="w-full bg-orange-400 text-white py-2 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors disabled:bg-orange-300 text-sm"
        >
          {isMutating ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <span>Send Code</span>
              <FaArrowRight size={10} className="ml-2" />
            </>
          )}
        </button>

        {/* Account Options */}
        <div className="text-center text-sm mt-4">
          <p className="text-gray-600">
            Remember Password?{" "}
            <Link
              href="/UserAccounts/SignIn"
              className="text-orange-500 font-semibold "
            >
              Login
            </Link>
          </p>
          {/* <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/UserAccounts/SignIn"
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </p> */}
        </div>

        {/* Customer Service Link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          You may contact{" "}
          <Link href="#" className="text-orange-500 hover:underline">
            Customer Service
          </Link>{" "}
          for help restoring access to your account.
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
