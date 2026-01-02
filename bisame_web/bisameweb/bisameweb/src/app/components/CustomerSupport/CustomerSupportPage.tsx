"use client";
import { useState } from 'react';
import SupportForm from '@/app/components/CustomerSupport/SupportForm';
import { submitToWhatsApp } from '@/app/utils/whatsappUtils';

interface FormData {
  name: string;
  subject: string;
  message: string;
}

const CustomerSupportPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await submitToWhatsApp(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-orange-100/50">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Customer Support
          </h1>
          <p className="text-lg text-gray-600">
            Send us a message and we&apos;ll get back to you on WhatsApp
          </p>
        </div>
        
        <SupportForm 
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CustomerSupportPage;
