'use client';

import React from 'react';
import TermsSection from './TermsSection';

const ContactSection: React.FC = () => {
  return (
    <TermsSection id="contact" title="Contact" icon="📞" colorScheme="orange">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Have questions about these terms or need assistance? We&apos;re here to help! 
          Contact us through any of the channels below for prompt support.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/80 rounded-2xl p-6 border border-orange-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Email Support</h4>
            <p className="text-gray-600 text-sm mb-3">Get detailed assistance via email</p>
            <div className="space-y-1">
              <p className="text-orange-600 font-semibold">support@bisame.com</p>
              <p className="text-gray-500 text-xs">Response within 24 hours</p>
            </div>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-blue-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Phone Support</h4>
            <p className="text-gray-600 text-sm mb-3">Speak directly with our team</p>
            <div className="space-y-1">
              <p className="text-blue-600 font-semibold">+233 59 467 3304</p>
              <p className="text-gray-500 text-xs">Mon-Fri: 8AM-6PM GMT</p>
            </div>
          </div>
          
          <div className="bg-white/80 rounded-2xl p-6 border border-green-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Live Chat</h4>
            <p className="text-gray-600 text-sm mb-3">Instant support via chat</p>
            <div className="space-y-1">
              <p className="text-green-600 font-semibold">Available 24/7</p>
              <p className="text-gray-500 text-xs">Click chat icon on website</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🏢 Office Address</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Head Office</h4>
              <div className="text-gray-700 space-y-1">
                <p>Bisame Digital Limited</p>
                <p>Achimota ABC</p>
                <p>Mile 7, Accra</p>
                <p>Ghana, West Africa</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
              <div className="text-gray-700 space-y-1 text-sm">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
                <p className="text-orange-600 font-medium">Emergency support available 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-3">🚀 Quick Response Tips</h4>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• Include your account email or phone number</li>
            <li>• Provide specific details about your issue</li>
            <li>• Attach relevant screenshots if applicable</li>
            <li>• Reference any previous support ticket numbers</li>
          </ul>
        </div>
      </div>
    </TermsSection>
  );
};

export default ContactSection;
