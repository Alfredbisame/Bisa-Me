'use client';

import React from 'react';
import TermsSection from './TermsSection';

const EligibilitySection: React.FC = () => {
  return (
    <TermsSection id="eligibility" title="Eligibility" icon="🎯" colorScheme="blue">
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          To use Bisame&apos;s services, you must meet certain eligibility requirements. These requirements help us 
          maintain a safe and legal marketplace for all users.
        </p>

        <div className="bg-white/80 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Basic Requirements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Age Requirement</h4>
                  <p className="text-gray-600 text-sm">You must be at least 18 years old to create an account</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Legal Capacity</h4>
                  <p className="text-gray-600 text-sm">You must have the legal capacity to enter into contracts</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Identity Verification</h4>
                  <p className="text-gray-600 text-sm">Valid identification may be required for certain services</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Accurate Information</h4>
                  <p className="text-gray-600 text-sm">All provided information must be truthful and current</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Compliance</h4>
                  <p className="text-gray-600 text-sm">You must comply with all applicable laws and regulations</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Good Standing</h4>
                  <p className="text-gray-600 text-sm">No previous account suspensions or bans for violations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h4 className="font-bold text-green-800 mb-3 flex items-center">
              <span className="mr-2">🏠</span>
              Residential Users
            </h4>
            <ul className="text-green-700 space-y-2 text-sm">
              <li>• Must be 18+ years old</li>
              <li>• Valid Ghana phone number required</li>
              <li>• Proof of address may be requested</li>
              <li>• Personal identification for verification</li>
              <li>• Agree to community guidelines</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <h4 className="font-bold text-orange-800 mb-3 flex items-center">
              <span className="mr-2">🏢</span>
              Business Users
            </h4>
            <ul className="text-orange-700 space-y-2 text-sm">
              <li>• Valid business registration required</li>
              <li>• Tax identification number</li>
              <li>• Authorized representative verification</li>
              <li>• Business license (where applicable)</li>
              <li>• Compliance with commercial regulations</li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h4 className="font-bold text-red-800 mb-3 flex items-center">
            <span className="mr-2">🚫</span>
            Prohibited Users
          </h4>
          <p className="text-red-700 mb-3">
            The following individuals or entities are not eligible to use Bisame:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-red-700 space-y-2 text-sm">
              <li>• Persons under 18 years of age</li>
              <li>• Previously banned users</li>
              <li>• Individuals with criminal convictions for fraud</li>
              <li>• Entities on sanctions lists</li>
            </ul>
            <ul className="text-red-700 space-y-2 text-sm">
              <li>• Users providing false information</li>
              <li>• Competitors attempting to disrupt service</li>
              <li>• Automated bots or scripts</li>
              <li>• Users from restricted jurisdictions</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
            <span className="mr-2">🔍</span>
            Verification Process
          </h4>
          <p className="text-yellow-700 mb-3">
            We may require additional verification for certain activities:
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-yellow-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-800">Phone Verification:</span>
                <span className="text-yellow-700 text-sm ml-2">Required for all accounts via SMS</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-800">Email Verification:</span>
                <span className="text-yellow-700 text-sm ml-2">Confirmation link sent to registered email</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-800">Identity Verification:</span>
                <span className="text-yellow-700 text-sm ml-2">Government-issued ID for high-value transactions</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-800">Address Verification:</span>
                <span className="text-yellow-700 text-sm ml-2">Utility bill or bank statement for business accounts</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center">
            <span className="mr-2">⚖️</span>
            Ongoing Eligibility
          </h4>
          <p className="text-blue-700 mb-3">
            Your eligibility to use Bisame is ongoing and may be reviewed at any time. We reserve the right to:
          </p>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• Request additional verification documents</li>
            <li>• Suspend accounts pending verification</li>
            <li>• Terminate accounts that no longer meet eligibility requirements</li>
            <li>• Update eligibility criteria with reasonable notice</li>
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h4 className="font-bold text-gray-800 mb-2 flex items-center">
            <span className="mr-2">📞</span>
            Questions About Eligibility?
          </h4>
          <p className="text-gray-700 text-sm">
            If you have questions about whether you meet our eligibility requirements, please contact our 
            support team at <span className="font-semibold text-blue-600">support@bisame.com</span> before 
            creating an account.
          </p>
        </div>
      </div>
    </TermsSection>
  );
};

export default EligibilitySection;
