import React from 'react';
import ContactSeller from './ContactSeller';
import ReportSeller from './ReportSeller';

interface SellerActionsProps {
  onReport?: () => void;
  className?: string;
  customMessage?: string;
  showSellerInfo?: boolean;
  listingId?: string;
  product?: {
    userInfo?: {
      name?: string;
    };
    contactNumber?: string;
    title?: string;
  } | null; // Add product prop
}

const SellerActions: React.FC<SellerActionsProps> = ({
  onReport,
  className = '',
  customMessage,
  listingId,
  product // Destructure product
}) => {
  return (
    <div className={`mt-4 space-y-2 ${className}`}>
      <ContactSeller
        customMessage={customMessage}
        className="mb-2"
        product={product || null} // Pass product to ContactSeller
      />
      <ReportSeller
        onReport={onReport}
        listingId={listingId}
      />
    </div>
  );
};

export default SellerActions;