import { Phone } from 'lucide-react';

const CallStoreButton = ({ phoneNumber }: { phoneNumber: string }) => {
  const handleCallStore = () => {
    // Clean the phone number (remove spaces, dashes, etc.)
    const cleanPhoneNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
    
    // Create tel: URL for phone calling
    const telUrl = `tel:${cleanPhoneNumber}`;
    
    // Try to initiate the call
    window.location.href = telUrl;
  };

  const isPhoneNumberValid = (phone: string) => {
    // Basic validation for phone number
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return cleanPhone.length >= 10 && /^[\+]?[\d\s\-\(\)]+$/.test(phone);
  };

  if (!isPhoneNumberValid(phoneNumber)) {
    return (
      <button 
        disabled
        className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed opacity-60 flex items-center justify-center gap-2"
      >
        <Phone className="w-5 h-5" />
        Invalid Phone Number
      </button>
    );
  }

  return (
    <button 
      onClick={handleCallStore}
      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
    >
      <Phone className="w-5 h-5" />
      Call Store
    </button>
  );
};

export default CallStoreButton; 