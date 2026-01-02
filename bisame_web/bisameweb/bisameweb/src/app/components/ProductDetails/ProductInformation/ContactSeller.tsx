import React, { useState } from 'react';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';
// import { useSearchParams } from 'next/navigation'; // unused variable

interface ContactSellerProps {
  product: {
    userInfo?: {
      name?: string;
    };
    contactNumber?: string;
    title?: string;
  } | null; // Use the product prop directly
  className?: string;
  customMessage?: string;
}

const ContactSeller: React.FC<ContactSellerProps> = ({ 
  product,
  className = '',
  customMessage
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const openWhatsApp = (phoneNumber: string, message: string) => {
    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    // Format phone number for WhatsApp
    let formattedPhone = cleanPhone;
    
    // Handle different phone number formats
    if (formattedPhone.startsWith('+233')) {
      // Already has country code
      formattedPhone = formattedPhone;
    } else if (formattedPhone.startsWith('0')) {
      // Ghana number starting with 0, replace with 233
      formattedPhone = '+233' + formattedPhone.substring(1);
    } else if (formattedPhone.length === 9) {
      // 9-digit number without leading 0, add 233
      formattedPhone = '+233' + formattedPhone;
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank');
  };

  const handleContact = async () => {
    if (isLoading || !product) return;
    
    setIsLoading(true);
    try {
      const sellerName = product.userInfo?.name || 'Seller';
      const sellerPhone = product.contactNumber;
      const productTitle = product.title || 'product';
      
      if (sellerPhone) {
        // Create a personalized message
        const message = customMessage || 
          `Hi ${sellerName}, I'm interested in your "${productTitle}" listed on Bisame. Can you provide more details?`;
        
        openWhatsApp(sellerPhone, message);
      } else {
        console.warn('No phone number found for seller');
        alert('Unable to contact seller. Phone number not available.');
      }
    } catch (error) {
      console.error('Error contacting seller:', error);
      alert('An error occurred while trying to contact the seller.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while product data is being fetched
  if (!product) {
    return (
      <button
        disabled
        className={`
          w-full text-gray-400 font-medium py-2 px-4 
          border border-gray-200 rounded-lg 
          text-sm flex items-center justify-center
          opacity-75 cursor-not-allowed
          ${className}
        `}
      >
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
        <span>Loading...</span>
      </button>
    );
  }

  // Show error state if product data couldn't be loaded
  if (!product) {
    return (
      <button
        disabled
        className={`
          w-full text-red-500 font-medium py-2 px-4 
          border border-red-200 rounded-lg 
          text-sm flex items-center justify-center
          opacity-75 cursor-not-allowed
          ${className}
        `}
      >
        <FaEnvelope className="mr-2" />
        <span>Contact Unavailable</span>
      </button>
    );
  }
  
  const hasPhone = product.contactNumber && product.contactNumber.trim() !== '';
  
  return (
    <button
      onClick={handleContact}
      disabled={isLoading || !hasPhone}
      className={`
        w-full font-medium py-2 px-4 
        border rounded-lg 
        transition-colors duration-200 text-sm flex items-center justify-center
        ${hasPhone 
          ? `text-green-600 hover:text-green-700 border-green-200 hover:border-green-300 
             ${isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:bg-green-50'}`
          : 'text-gray-400 border-gray-200 opacity-75 cursor-not-allowed'
        }
        ${className}
      `}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2" />
      ) : hasPhone ? (
        <FaWhatsapp className="mr-2" />
      ) : (
        <FaEnvelope className="mr-2" />
      )}
      <span>
        {isLoading 
          ? 'Opening WhatsApp...' 
          : hasPhone 
            ? 'Contact via WhatsApp' 
            : 'No Contact Info'
        }
      </span>
    </button>
  );
};

export default ContactSeller;