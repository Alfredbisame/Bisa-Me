import { useState, ChangeEvent } from 'react';

interface PriceOption {
  id: string;
  label: string;
  min: number;
  max: number;
}

const PRICE_RANGES: PriceOption[] = [
  { id: 'all', label: 'All Price', min: 0, max: 10000 },
  { id: 'under20', label: 'Under $20', min: 0, max: 20 },
  { id: '25to100', label: '$25 to $100', min: 25, max: 100 },
  { id: '100to300', label: '$100 to $300', min: 100, max: 300 },
  { id: '300to500', label: '$300 to $500', min: 300, max: 500 },
  { id: '500to1000', label: '$500 to $1,000', min: 500, max: 1000 },
  { id: '1000to10000', label: '$1,000 to $10,000', min: 1000, max: 10000 },
];

const PriceRange: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('all');
  const [sliderValue, setSliderValue] = useState<number>(500);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxPrice(value);
  };

  const handlePriceRangeSelect = (rangeId: string) => {
    setSelectedRange(rangeId);
    const selectedOption = PRICE_RANGES.find(range => range.id === rangeId);
    if (selectedOption) {
      setMinPrice(selectedOption.min.toString());
      setMaxPrice(selectedOption.max.toString());
    }
  };

  return (
    <div className="flex flex-start items-center">
      <div className="bg-white p-4">
        <h2 className="md:text-lg font-bold mb-3 text-gray-800 lg:mt-24">PRICE RANGE</h2>
        
        <div className="flex items-center mb-6">
          <input
            type="range"
            min="0"
            max="1000"
            value={sliderValue}
            onChange={handleRangeChange}
            className="w-full h-2 bg-gray-200 appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #f97316 0%, #f97316 ${sliderValue/10}%, #e5e7eb ${sliderValue/10}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        <div className="flex justify-between mb-6 text-sm md:text-base">
          <input
            type="text"
            placeholder="Min price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="border border-gray-300 rounded-lg p-2 w-[45%] text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Max price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="border border-gray-300 rounded-lg p-2 w-[45%] text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-1 md:space-y-2 text-sm md:text-base">
          {PRICE_RANGES.map((range) => (
            <label key={range.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="price"
                value={range.id}
                checked={selectedRange === range.id}
                onChange={() => handlePriceRangeSelect(range.id)}
                className="form-radio text-orange-500 focus:ring-orange-500"
              />
              <span className="ml-3 text-gray-700 hover:text-orange-500 transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
