import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ReportSellerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
}

const REASONS = [
  { id: 'unsatisfactory', label: 'Unsatisfactory service', icon: '⚠️' },
  { id: 'fraudulent', label: 'Fraudulent/Illegal', icon: '🚫' },
  { id: 'prepayment', label: 'Ask to make prepayment', icon: '💳' },
  { id: 'other', label: 'Other', icon: '📝' },
];

const ReportSellerModal: React.FC<ReportSellerModalProps> = ({ open, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;
    setIsSubmitting(true);
    try {
      await onSubmit(selectedReason, details);
      setSelectedReason('');
      setDetails('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof window === 'undefined' || !document.body) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 animate-bounceIn">
      <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 relative animate-scaleIn border border-gray-200/80 backdrop-blur-sm">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-100/30 via-transparent to-orange-100/30 animate-pulse pointer-events-none"></div>
        
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 shadow-lg shadow-orange-500/25">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Report User
          </h2>
          <p className="text-gray-600 text-sm">Help us maintain a safe marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10">
          {/* Reason selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-4 text-sm">
              Why are you reporting this user?
            </label>
            <div className="space-y-3">
              {REASONS.map((reason) => (
                <label
                  key={reason.id}
                  className={`group flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                    selectedReason === reason.label
                      ? 'border-orange-400 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg shadow-orange-200/50'
                      : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="text-2xl filter drop-shadow-sm">{reason.icon}</div>
                    <div className="flex-1">
                      <span className={`text-sm font-medium transition-colors ${
                        selectedReason === reason.label ? 'text-orange-700' : 'text-gray-700 group-hover:text-orange-600'
                      }`}>
                        {reason.label}
                      </span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedReason === reason.label
                        ? 'border-orange-500 bg-orange-500 shadow-md'
                        : 'border-gray-300 group-hover:border-orange-400'
                    }`}>
                      {selectedReason === reason.label && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="report-reason"
                    value={reason.label}
                    checked={selectedReason === reason.label}
                    onChange={() => setSelectedReason(reason.label)}
                    className="sr-only"
                    required
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Details textarea */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-3 text-sm">
              Additional details (optional)
            </label>
            <div className="relative">
              <textarea
                className="w-full min-h-[100px] rounded-xl border border-gray-200 bg-white p-4 text-gray-800 placeholder-gray-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 resize-none shadow-sm hover:shadow-md"
                placeholder="Provide any additional information that might help us understand the issue..."
                value={details}
                onChange={e => setDetails(e.target.value)}
                disabled={isSubmitting}
                maxLength={500}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-md">
                {details.length}/500
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden shadow-lg ${
                isSubmitting || !selectedReason
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-sm'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-orange-200/50 hover:shadow-orange-300/60 hover:scale-[1.02]'
              }`}
              disabled={isSubmitting || !selectedReason}
            >
              {isSubmitting && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <span className={isSubmitting ? 'opacity-0' : 'opacity-100'}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </span>
            </button>
          </div>
        </form>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60 pointer-events-none"></div>
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-200/40 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-red-200/40 rounded-full blur-xl pointer-events-none"></div>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        {/* Close button - moved to end for stacking, with high z-index and debug border */}
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-orange-500 text-2xl focus:outline-none transition-all duration-300 hover:rotate-90 z-[999] hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center border-2 border-red-500"
          onClick={onClose}
          aria-label="Close"
          disabled={isSubmitting}
          style={{ zIndex: 999 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ReportSellerModal;
