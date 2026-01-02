'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiMapPin } from 'react-icons/fi';
import LocationContainer from './LocationContainer';

interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

interface DropdownButtonProps {
  defaultValue?: string;
  placeholder?: string;
  onSelect?: (option: DropdownOption) => void;
  className?: string;
  disabled?: boolean;
  compact?: boolean;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  defaultValue = 'All Ghana',
  placeholder = 'Select location',
  onSelect,
  className = '',
  disabled = false,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>({
    id: 'all-ghana',
    label: defaultValue,
    value: 'all-ghana'
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleLocationSelect = (locationName: string, locationHref: string) => {
    // This is called when a final location (city) is selected
    const newOption: DropdownOption = {
      id: locationHref,
      label: locationName,
      value: locationHref
    };
    
    setSelectedOption(newOption);
    setIsOpen(false);
    onSelect?.(newOption);
    
    console.log('Final location selected:', locationName, locationHref);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Main Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          flex items-center justify-center gap-2 h-full
          ${compact
            ? 'rounded-none border-0 bg-transparent px-3 py-3 min-w-[130px]'
            : 'rounded-lg border border-orange-500 bg-white px-4 py-2.5 min-w-[140px]'
          }
          text-[#7D8B9B] text-sm font-medium leading-5
          transition-all duration-200 ease-in-out
          hover:bg-orange-50 hover:text-orange-700
          ${!compact && 'hover:border-orange-600'}
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
          active:bg-orange-100 active:scale-95
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isOpen ? 'bg-orange-50 text-orange-700' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <FiMapPin className="text-sm flex-shrink-0" />
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        <FiChevronDown
          className={`text-sm flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {/* Location Container Dropdown */}
      {isOpen && (
        <div
          className={`
            absolute top-full -left-[100px] md:-left-24 lg:-left-10 xl:left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50
            w-[800px] max-w-[90vw] max-h-[600px] overflow-hidden
            animate-dropdown-bounce
          `}
        >
          <LocationContainer
            onLocationSelect={handleLocationSelect}
            isDropdownMode={true}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownButton;



// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { FiChevronDown, FiMapPin } from 'react-icons/fi';
// import LocationBrowser from './LocationBrowser';

// interface DropdownOption {
//   id: string;
//   label: string;
//   value: string;
// }

// interface DropdownButtonProps {
//   defaultValue?: string;
//   placeholder?: string;
//   onSelect?: (option: DropdownOption) => void;
//   className?: string;
//   disabled?: boolean;
//   compact?: boolean;
// }

// const DropdownButton: React.FC<DropdownButtonProps> = ({
//   defaultValue = 'All Ghana',
//   placeholder = 'Select location',
//   onSelect,
//   className = '',
//   disabled = false,
//   compact = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<DropdownOption | null>({
//     id: 'all-ghana',
//     label: defaultValue,
//     value: 'all-ghana'
//   });
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleToggle = () => {
//     if (!disabled) {
//       setIsOpen(!isOpen);
//     }
//   };

//   const handleLocationSelect = (locationName: string, locationHref: string) => {
//     const newOption: DropdownOption = {
//       id: locationHref,
//       label: locationName,
//       value: locationHref
//     };
    
//     setSelectedOption(newOption);
//     setIsOpen(false);
//     onSelect?.(newOption);
//   };

//   return (
//     <div className={`relative inline-block ${className}`} ref={dropdownRef}>
//       {/* Main Button */}
//       <button
//         type="button"
//         onClick={handleToggle}
//         disabled={disabled}
//         className={`
//           flex items-center justify-center gap-2 h-full
//           ${compact 
//             ? 'rounded-none border-0 bg-transparent px-3 py-3 min-w-[130px]' 
//             : 'rounded-lg border border-orange-500 bg-white px-4 py-2.5 min-w-[140px]'
//           }
//           text-[#7D8B9B] text-sm font-medium leading-5
//           transition-all duration-200 ease-in-out
//           hover:bg-orange-50 hover:text-orange-700
//           ${!compact && 'hover:border-orange-600'}
//           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
//           active:bg-orange-100 active:scale-95
//           ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
//           ${isOpen ? 'bg-orange-50 text-orange-700' : ''}
//         `}
//         aria-haspopup="listbox"
//         aria-expanded={isOpen}
//       >
//        <FiMapPin className="text-sm flex-shrink-0" />
//         <span className="truncate">{selectedOption?.label || placeholder}</span>
//         <FiChevronDown 
//           className={`text-sm flex-shrink-0 transition-transform duration-300 ${
//             isOpen ? 'rotate-180' : ''
//           }`} 
//         />
//       </button>

//       {/* Location Browser Dropdown */}
//       {isOpen && (
//         <div 
//           className={`
//             absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50
//             w-[800px] max-w-[90vw] max-h-[600px] overflow-hidden
//             animate-dropdown-bounce
//           `}
//         >
//           <LocationBrowser 
//             onLocationSelect={handleLocationSelect}
//             onRegionSelect={(region) => {}}
//             onResetToAll={() => {}}
//             isDropdownMode={true}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownButton;