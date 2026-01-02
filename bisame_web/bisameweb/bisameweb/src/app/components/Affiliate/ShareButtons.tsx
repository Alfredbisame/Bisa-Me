"use client";

import React, { useState } from 'react';

interface ShareButtonsProps {
  invitationCode: string;
  shareText: string;
  shareUrl: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  invitationCode, 
  shareText, 
  shareUrl 
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleCopy = async () => {
    try {
      // Check if Clipboard API is supported
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(invitationCode);
        setCopySuccess(true);
        
        // Reset success state after 2 seconds
        setTimeout(() => setCopySuccess(false), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = invitationCode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        } finally {
          textArea.remove();
        }
      }
    } catch (err) {
      console.error('Failed to copy invitation code:', err);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share({
          title: 'Join me on Bisame!',
          text: shareText,
          url: shareUrl,
        });
      } else {
        // Fallback: Copy share text to clipboard
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          alert('Share link copied to clipboard!');
        } else {
          // Ultimate fallback
          const textArea = document.createElement('textarea');
          textArea.value = `${shareText}\n${shareUrl}`;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            document.execCommand('copy');
            alert('Share link copied to clipboard!');
          } catch (err) {
            console.error('Fallback share failed:', err);
            alert('Sharing not supported. Please copy the invitation code manually.');
          } finally {
            textArea.remove();
          }
        }
      }
    } catch (err) {
      // User cancelled the share or an error occurred
      if (typeof err === 'object' && err !== null && 'name' in err && (err as { name: string }).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex space-x-4">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
          copySuccess
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'text-gray-800 hover:bg-gray-100 border border-gray-300'
        }`}
        disabled={copySuccess}
      >
        {copySuccess ? (
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Copied!</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy</span>
          </div>
        )}
      </button>
      
      {/* Share Button */}
      <button
        onClick={handleShare}
        disabled={isSharing}
        className="px-4 py-2 rounded-md font-medium text-gray-800 hover:bg-gray-100 border border-gray-300 transition-all duration-200 disabled:opacity-50"
      >
        {isSharing ? (
          <div className="flex items-center space-x-1">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            <span>Sharing...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
