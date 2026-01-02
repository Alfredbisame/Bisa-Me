"use client";
import { forwardRef } from 'react';

interface DetailFormInputProps {
  type?: 'text' | 'tel' | 'email' | 'number';
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const DetailFormInput = forwardRef<HTMLInputElement, DetailFormInputProps>(
  ({ type = 'text', placeholder, value, onChange, className = '', required = false, disabled = false }, ref) => {
    return (
      <div className="relative group">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
          className={`
            w-full border-2 border-[#4a5a7a] rounded-xl px-4 py-4 
            text-[#4a5a7a] text-base font-medium placeholder-[#4a5a7a]/70
            bg-white/80 backdrop-blur-sm
            focus:outline-none focus:border-[#e75a00] focus:ring-2 focus:ring-[#e75a00]/20
            transition-all duration-300 ease-in-out
            hover:border-[#e75a00]/50 hover:shadow-lg hover:shadow-[#e75a00]/10
            group-hover:transform group-hover:scale-[1.02]
            ${className}
          `}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#e75a00]/5 to-[#f9d7ca]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    );
  }
);

DetailFormInput.displayName = 'DetailFormInput';

export default DetailFormInput;
