'use client';

import { useState } from 'react';
import ModalBackdrop from './ModalBackdrop';
import ModalHeader from './ModalHeader';
import TabNavigation from './TabNavigation';
import ImageUploadSection from './ImageUploadSection';
import AddressForm from './AddressForm';
import ModalFooter from './ModalFooter';

interface UpdateBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateBusinessModal = ({ isOpen, onClose }: UpdateBusinessModalProps) => {
  const [activeTab, setActiveTab] = useState<'images' | 'address'>('images');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [address, setAddress] = useState({
    storeName: '',
    location: '',
    closeLandmark: '',
    phoneNumber: ''
  });

  if (!isOpen) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Images:', selectedImages);
    console.log('Address:', address);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <ModalBackdrop onClose={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden duration-300 transform animate-bounceIn">
        <ModalHeader onClose={onClose} />
        
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'images' ? (
            <ImageUploadSection
              selectedImages={selectedImages}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
            />
          ) : (
            <AddressForm
              address={address}
              onAddressChange={handleAddressChange}
            />
          )}
        </div>

        <ModalFooter 
          onClose={onClose} 
          onSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
};

export default UpdateBusinessModal;
