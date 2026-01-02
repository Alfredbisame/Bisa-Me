import React from "react";
import { IoMdClose } from "react-icons/io";
import { FiRefreshCw } from "react-icons/fi";

interface PaymentInitiatedModalProps {
  isCheckingStatus: boolean;
  onCheckStatus: () => void;
  onClose: () => void;
}

const PaymentInitiatedModal: React.FC<PaymentInitiatedModalProps> = ({
  isCheckingStatus,
  onCheckStatus,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200">
        {/* Success Toast */}
        {/* {showSuccessToast && (
          <SuccessToast
            title="Success"
            message="Transaction initialized successfully, Please complete the payment."
            onClose={() => setShowSuccessToast(false)}
          />
        )} */}

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

        {/* Initiated Content */}
        <div className="p-8">
          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            {/* Clock Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-blue-600 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle
                      cx="20"
                      cy="20"
                      r="18"
                      stroke="#2563EB"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 8V20L28 24"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-xl text-gray-800 mb-3">
              Payment Initiated
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Please approve the payment on your phone and check the status
              below.
            </p>
          </div>

          {/* Check Status Button */}
          <button
            onClick={onCheckStatus}
            disabled={isCheckingStatus}
            className="w-full mt-6 bg-blue-600 text-white py-3.5 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FiRefreshCw
              size={18}
              className={isCheckingStatus ? "animate-spin" : ""}
            />
            {isCheckingStatus ? "Checking..." : "Check Payment Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInitiatedModal;
