import React from "react";
import { IoMdClose } from "react-icons/io";
import { PaymentStep } from "./ListingSummary";
// import SuccessToast from "./SuccessToast";

interface PaymentFormModalProps {
  selectedProvider: string;
  setSelectedProvider: (selectedProvider: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  isLoadingInitialize: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({
  selectedProvider,
  setSelectedProvider,
  phoneNumber,
  setPhoneNumber,
  onProceed,
  isLoadingInitialize,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-bold text-xl text-gray-800">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-5 space-y-5">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Mobile Money Provider
            </label>
            <div className="relative">
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select provider</option>
                <option value="MTN">MTN</option>
                <option value="VODAFONE">VODAFONE</option>
                <option value="AIRTELTIGO">AIRTELTIGO</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Mobile Money Number
            </label>
            <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white">
              <div className="flex items-center gap-2">
                <span className="text-xl">🇬🇭</span>
                <span className="text-blue-600 font-medium text-sm">+233</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="flex-1 outline-none text-sm text-gray-600"
              />
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={onProceed}
            disabled={
              !selectedProvider ||
              !phoneNumber ||
              phoneNumber.length < 9 ||
              isLoadingInitialize
            }
            className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isLoadingInitialize ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFormModal;
