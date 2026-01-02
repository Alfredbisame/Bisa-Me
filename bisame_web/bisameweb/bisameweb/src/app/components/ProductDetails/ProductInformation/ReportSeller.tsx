import React, { useState } from 'react';
import { FaFlag } from 'react-icons/fa';
import ReportSellerModal from './ReportSellerModal';
import { useReport } from '../hooks/useReport';
import toast from 'react-hot-toast';

interface ReportSellerProps {
  listingId?: string;
  onReport?: () => void;
  className?: string;
}

const ReportSeller: React.FC<ReportSellerProps> = ({ 
  listingId,
  onReport, 
  className = '' 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reportSeller, loading: isLoading } = useReport();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (reason: string, details: string) => {
    // Combine reason and details for the message
    const message = `${reason}: ${details}`;
    
    if (!listingId) {
      toast.error('Listing ID is missing.');
      return;
    }
    
    const result = await reportSeller(listingId, message);
    if (result && !result.error) {
      toast.success('Report submitted successfully!');
    } else {
      toast.error(result?.error || 'Failed to submit report.');
    }
    if (onReport) {
      onReport();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        disabled={isLoading}
        className={`
          w-full text-gray-600 hover:text-red-600 font-medium py-2 px-4 
          border border-orange-300 hover:border-red-400 rounded-lg 
          transition-colors duration-200 text-sm flex items-center justify-center
          ${isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
      >
        <FaFlag className="mr-2" />
        <span>Report Seller</span>
      </button>
      <ReportSellerModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ReportSeller;