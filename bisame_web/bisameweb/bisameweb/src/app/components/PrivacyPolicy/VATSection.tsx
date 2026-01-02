"use client";
import React from 'react';
import { FaReceipt, FaCalculator, FaFileAlt, FaClock } from 'react-icons/fa';

const VATSection = () => {
  const vatRates = [
    { category: "Electronics & Technology", rate: "12.5%", description: "Computers, phones, accessories" },
    { category: "Fashion & Clothing", rate: "15%", description: "Apparel, shoes, accessories" },
    { category: "Home & Garden", rate: "12.5%", description: "Furniture, appliances, decor" },
    { category: "Health & Beauty", rate: "0%", description: "Essential medicines, basic healthcare" },
    { category: "Books & Education", rate: "0%", description: "Educational materials, textbooks" },
    { category: "Food & Beverages", rate: "0%", description: "Basic food items, non-alcoholic drinks" }
  ];

  return (
    <section id="vat" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
          <FaReceipt className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">VAT (Value Added Tax)</h2>
      </div>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          Bisame complies with Ghana&apos;s VAT regulations. All applicable taxes are clearly displayed 
          during checkout, and VAT-registered sellers must include VAT in their pricing. Below are 
          the current VAT rates for different product categories.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {vatRates.map((rate, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 text-sm">{rate.category}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                rate.rate === "0%" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                {rate.rate}
              </span>
            </div>
            <p className="text-gray-600 text-xs">{rate.description}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <FaCalculator className="w-6 h-6 text-orange-600 mr-3" />
            <h3 className="font-semibold text-orange-900">VAT Calculation</h3>
          </div>
          <p className="text-orange-800 text-sm mb-4">
            VAT is calculated automatically based on product category and seller registration status.
          </p>
          <div className="bg-white border border-orange-200 rounded-lg p-4">
            <div className="text-sm text-orange-800">
              <div className="flex justify-between mb-2">
                <span>Product Price:</span>
                <span>GHS 100.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>VAT (12.5%):</span>
                <span>GHS 12.50</span>
              </div>
              <div className="border-t border-orange-200 pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>GHS 112.50</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <FaFileAlt className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="font-semibold text-blue-900">VAT Registration</h3>
          </div>
          <p className="text-blue-800 text-sm mb-4">
            Sellers with annual turnover exceeding GHS 200,000 must register for VAT.
          </p>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Automatic VAT calculation</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Monthly VAT reporting</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Compliance monitoring</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <FaClock className="w-6 h-6 text-gray-600 mr-3" />
          <h3 className="font-semibold text-gray-900">VAT Remittance Schedule</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-2">15th</div>
            <div className="text-sm text-gray-700">Monthly VAT filing deadline</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-orange-600 mb-2">21st</div>
            <div className="text-sm text-gray-700">VAT payment deadline</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-sm text-gray-700">Online VAT support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VATSection;
