"use client";

import { useRef, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { useVerificationForm } from "./useVerificationForm";
import { useResendOTP } from "./useResendOtp";
import CustomizePrompt from "../ui/CustomizePrompt";
import useCountDown from "@/app/hooks/useCountDown";
import { getFormatTime, getExpiryTimestamp } from "@/app/utils/verify";

const VerificationForm: React.FC = () => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [verifyTimestamp, setVerifyTimestamp] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isClient, setIsClient] = useState(false);

  const {
    verificationCode,
    handleCodeChange,
    handleSubmit,
    isVerifying,
    isSubmitting,
  } = useVerificationForm();

  const { handleResendOTP, isResending } = useResendOTP();

  // Load data from localStorage only on client-side after mount
  useEffect(() => {
    setIsClient(true);

    try {
      const raw = localStorage.getItem("verifyTime");
      if (raw) {
        const parsed = Number(JSON.parse(raw));
        setVerifyTimestamp(Number.isFinite(parsed) ? parsed : 0);
      }
    } catch (err) {
      console.error("Failed to read verifyTime from localStorage", err);
    }

    try {
      const storedPhone = localStorage.getItem("phoneNumber");
      if (storedPhone) {
        setPhoneNumber(storedPhone);
      }
    } catch (error) {
      console.error("Failed to read phone number from localStorage", error);
    }
  }, []);

  // Calculate time difference
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = Math.max(0, verifyTimestamp - currentTime);

  const { timeLeft } = useCountDown(timeDifference);

  const handleChange = (index: number, value: string) => {
    handleCodeChange(index, value);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle resend OTP with timestamp update
  const handleResendClick = async () => {
    await handleResendOTP();

    // Set new expiry timestamp (60 seconds from now)
    const newExpiryTime = getExpiryTimestamp(60);
    setVerifyTimestamp(newExpiryTime);

    try {
      localStorage.setItem("verifyTime", JSON.stringify(newExpiryTime));
    } catch (error) {
      console.error("Failed to save verifyTime to localStorage", error);
    }
  };

  // Show loading state or default message during SSR/initial render
  const displayMessage =
    isClient && phoneNumber
      ? `Enter the 6-digit code sent to your phone number +${phoneNumber}`
      : "Enter the 6-digit code sent to your phone number";

  return (
    <div className="flex items-center justify-center md:py-12 md:px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full py-6 bg-white px-8 rounded-md border border-gray-100 md:shadow-lg">
        <Toaster position="top-right" />

        <div className="flex flex-col items-center ">
          <h2 className="sm:text-xl md:text-2xl font-semibold text-center mb-2 text-orange-400">
            Verify Phone Number
          </h2>

          <div className="h-1 w-20 bg-orange-500 rounded-full mb-"></div>

          <CustomizePrompt
            textColor="gray"
            backgroundColor="orange"
            message={displayMessage}
          />

          <p className="text-center mb-6 text-xs text-gray-400 font-semibold">
            Verify your identity that it&apos;s indeed you
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
                type="number"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 md:w-12 md:h-12 text-center text-2xl font-bold border-2 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-400 outline-none transition-all p-2"
                disabled={isSubmitting || isResending}
              />
            ))}
          </div>

          <div className="text-center text-sm">
            <span>
              Didn&apos;t receive a code?{" "}
              {timeLeft === 0 ? (
                <button
                  type="button"
                  onClick={handleResendClick}
                  disabled={isResending}
                  className="text-sm text-red-300 hover:text-red-500 disabled:text-red-300 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <>
                      <FaSpinner
                        size={15}
                        className="animate-spin inline mr-2"
                      />
                      Resending...
                    </>
                  ) : (
                    <span className="text-red-500 font-semibold">Resend</span>
                  )}
                </button>
              ) : (
                <>
                  Resend in{" "}
                  <span className="text-red-500 text-sm font-semibold">
                    {getFormatTime(timeLeft)}
                  </span>
                </>
              )}
            </span>
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              isResending ||
              verificationCode.some((digit) => !digit)
            }
            className="group relative w-full flex justify-center p-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed "
          >
            {isVerifying ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              "Verify Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
