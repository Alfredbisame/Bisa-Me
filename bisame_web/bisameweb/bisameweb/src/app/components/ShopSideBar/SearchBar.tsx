import { useState, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className="flex items-center flext-start">
      <div className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for anything..."
            className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-1 focus:ring-orange-500 
                     focus:border-orange-500 transition-all duration-200
                     placeholder-gray-400 text-gray-700"
          />
          <button 
            className="absolute inset-y-0 right-0 flex items-center pr-4
                       text-gray-500 hover:text-orange-500 transition-colors"
            onClick={() => onSearch?.(searchTerm)}
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
