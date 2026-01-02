"use client";
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaTiktok, FaXTwitter } from 'react-icons/fa6';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: FaPhone,
      title: "Phone Support",
      primary: "+233 59 309 8902",
      secondary: "Available 24/7",
      color: "blue"
    },
    {
      icon: FaEnvelope,
      title: "Email Support",
      primary: "privacy@bisame.com",
      secondary: "Response within 24 hours",
      color: "orange"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Physical Address",
      primary: "Koree Mari Link",
      secondary: "Achimota, Greater Accra",
      color: "green"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      primary: "+233 59 309 8902",
      secondary: "Quick responses",
      color: "green"
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, name: "Facebook", url: "https://www.facebook.com/share/162xz47fnL/", color: "blue" },
    { icon: FaXTwitter, name: "Twitter", url: "https://x.com/bisametv?t=IwAKJLbSBCksfrFNf5NUDA&s=09", color: "blue" },
    { icon: FaInstagram, name: "Instagram", url: "https://www.instagram.com/bisame_app?igsh=bzVib2IyMzIxZnhu", color: "pink" },
    { icon: FaTiktok, name: "TikTok", url: "https://www.tiktok.com/@bisame.app?_t=ZM-8vOAuQ4ZNjD&_r=1", color: "green" }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600 bg-blue-50 border-blue-200 text-blue-700",
      orange: "from-orange-500 to-orange-600 bg-orange-50 border-orange-200 text-orange-700",
      green: "from-green-500 to-green-600 bg-green-50 border-green-200 text-green-700",
      pink: "from-pink-500 to-pink-600 bg-pink-50 border-pink-200 text-pink-700"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section id="contact" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-4">
          <FaPhone className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          Have questions about our Privacy Policy or need assistance with your data privacy rights? 
          Our dedicated privacy team is here to help. Contact us through any of the following methods:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {contactMethods.map((method, index) => {
          const IconComponent = method.icon;
          const colorClasses = getColorClasses(method.color);
          
          return (
            <div key={index} className={`p-6 rounded-xl border ${colorClasses.split(' ').slice(2).join(' ')}`}>
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses.split(' ').slice(0, 2).join(' ')} flex-shrink-0`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="font-medium text-gray-800 mb-1">{method.primary}</p>
                  <p className={`text-sm ${colorClasses.split(' ').slice(-1)}`}>{method.secondary}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <FaClock className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="font-semibold text-blue-900">Business Hours</h3>
          </div>
          <div className="space-y-3 text-blue-800">
            <div className="flex justify-between">
              <span>Monday - Friday:</span>
              <span className="font-medium">8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday:</span>
              <span className="font-medium">9:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday:</span>
              <span className="font-medium">Closed</span>
            </div>
            <div className="border-t border-blue-200 pt-3 mt-3">
              <div className="flex justify-between">
                <span>Emergency Support:</span>
                <span className="font-medium">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
          <h3 className="font-semibold text-orange-900 mb-4">Follow Us</h3>
          <p className="text-orange-800 text-sm mb-4">
            Stay updated with our latest privacy policies and security updates.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              const colorClasses = getColorClasses(social.color);
              
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center p-3 bg-white border rounded-lg hover:shadow-md transition-all duration-200 ${colorClasses.split(' ').slice(-1)}`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Privacy-Related Inquiries</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-blue-600 mb-2">Data Requests</div>
            <div className="text-sm text-gray-700">Access, update, or delete your personal data</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-orange-600 mb-2">Policy Questions</div>
            <div className="text-sm text-gray-700">Clarifications about our privacy practices</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-green-600 mb-2">Security Concerns</div>
            <div className="text-sm text-gray-700">Report security issues or breaches</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
