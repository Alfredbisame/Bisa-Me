"use client";
import { forwardRef, useState } from 'react';

interface DetailFormTextareaProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  rows?: number;
  className?: string;
  required?: boolean;
}

const DetailFormTextarea = forwardRef<HTMLTextAreaElement, DetailFormTextareaProps>(
  ({ placeholder, value = '', onChange, maxLength = 500, rows = 4, className = '', required = false }, ref) => {
    const [charCount, setCharCount] = useState(value.length);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (newValue.length <= maxLength) {
        setCharCount(newValue.length);
        onChange?.(newValue);
      }
    };
    
    return (
      <div className="relative group">
        <textarea
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full border-2 border-[#4a5a7a] rounded-xl px-4 py-4 
            text-[#4a5a7a] text-base font-medium placeholder-[#4a5a7a]/70
            bg-white/80 backdrop-blur-sm resize-none
            focus:outline-none focus:border-[#e75a00] focus:ring-2 focus:ring-[#e75a00]/20
            transition-all duration-300 ease-in-out
            hover:border-[#e75a00]/50 hover:shadow-lg hover:shadow-[#e75a00]/10
            group-hover:transform group-hover:scale-[1.02]
            ${className}
          `}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#e75a00]/5 to-[#f9d7ca]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Character counter */}
        <div className="absolute bottom-2 right-3 text-xs text-[#5f6d7e] bg-white/90 px-2 py-1 rounded-md">
          {charCount}/{maxLength}
        </div>
      </div>
    );
  }
);

DetailFormTextarea.displayName = 'DetailFormTextarea';

export default DetailFormTextarea;
