"use client";
import { useState } from 'react';
import { FaRocket, FaShieldAlt } from 'react-icons/fa';
import ImageUpload from './ImageUpload';
import TradeAssuranceFormFields from './TradeAssuranceFormFields';

const DetailTradeAssuranceForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    sellerName: '',
    phoneNumber: '',
    location: '',
    price: '',
    description: '',
    productSource: '',    
    productCategory: '',  
    serviceFee: ''         
  });

  const [images, setImages] = useState<File[]>([]);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Images:', images);
    // Handle form submission
  };
  
  // const handleGoBack = () => {
  //   // Handle navigation back
  //   console.log('Going back...');
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9fe] via-[#faf9fe] to-[#f9d7ca]/20 font-mono">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-[#e75a00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#f9d7ca]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center p-4 md:p-8">
        {/* Header */}
        <header className="w-full max-w-6xl flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center space-x-4">
            {/* <button 
              onClick={handleGoBack}
              aria-label="Go back" 
              className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm border border-[#4a5a7a]/20 hover:border-[#e75a00] hover:bg-[#e75a00]/10 transition-all duration-300 transform hover:scale-105"
            >
              <FaArrowLeft className="text-[#4a5a7a] group-hover:text-[#e75a00] text-lg transition-colors duration-300" />
            </button> */}
            <div>
              <h1 className="text-[#4a5a7a] text-xl md:text-2xl font-bold flex items-center space-x-2">
                <FaShieldAlt className="text-[#e75a00]" />
                <span>Trade Assurance Form</span>
              </h1>
              <p className="text-[#5f6d7e] text-sm mt-1 hidden md:block">
                Secure your trade with our protection program
              </p>
            </div>
          </div>
          
          {/* Desktop decoration */}
          <div className="hidden lg:flex items-center space-x-2 text-[#e75a00]">
            <FaRocket className="text-2xl" />
            <span className="text-sm font-semibold">Powered by Bisame</span>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="w-full max-w-7xl p-6">
          <div className="bg-white/60 backdrop-blur-lg rounded-lg border border-white/20 shadow-2xl shadow-[#e75a00]/5 p-6 md:p-8 lg:p-12">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-[#e75a00] to-[#f9d7ca] rounded-full" />
              <h2 className="text-[#4a5a7a] font-bold text-xl md:text-2xl">Seller&apos;s Details</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <h3 className="text-[#4a5a7a] font-semibold text-lg flex items-center space-x-2">
                  <span>Product Images</span>
                  <span className="text-[#e75a00] text-sm">*</span>
                </h3>
                <ImageUpload onImagesChange={setImages} />
              </div>
              
              {/* Form Fields Component */}
              <TradeAssuranceFormFields 
                formData={formData}
                onInputChange={handleInputChange}
              />
              
              {/* Submit Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  className="group relative overflow-hidden px-8 py-3 rounded-xl bg-gradient-to-r from-[#e75a00] to-[#f6865a] text-white font-medium shadow-lg hover:shadow-[#e75a00]/20 transform transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">Submit for Verification</span>
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-y-full transition-transform duration-500" />
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailTradeAssuranceForm;
