"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { FaWhatsapp, FaPaperPlane, FaUser, FaTag, FaComment } from 'react-icons/fa';

interface FormData {
  name: string;
  subject: string;
  message: string;
}

interface SupportFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

const SupportForm: React.FC<SupportFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    subject: '',
    message: ''
  });
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ name: '', subject: '', message: '' });
  };

  const isFormValid = formData.name && formData.subject && formData.message;

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 border border-orange-100">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-green-500 rounded-full p-3 shadow-lg">
          <FaWhatsapp className="text-2xl text-white" />
        </div>
        <h2 className="text-2xl font-bold ml-4 text-gray-800">
          Send via WhatsApp
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaUser className="text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200"
          />
        </div>

        {/* Subject Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaTag className="text-gray-400" />
          </div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            required
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200"
          />
        </div>

        {/* Message Field */}
        <div className="relative">
          <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
            <FaComment className="text-gray-400 mt-1" />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your message..."
            required
            rows={5}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 
                     flex items-center justify-center space-x-3 shadow-lg
                     ${isFormValid && !isSubmitting
                       ? 'bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 hover:shadow-xl'
                       : 'bg-gray-400 cursor-not-allowed'
                     }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <FaPaperPlane className="text-lg" />
              <span>Send to WhatsApp</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>You&apos;ll be redirected to WhatsApp to complete your message</p>
      </div>
    </div>
  );
};

export default SupportForm;
