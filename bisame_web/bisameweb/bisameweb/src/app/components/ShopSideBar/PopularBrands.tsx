import { useState } from 'react';

interface Brand {
  id: string;
  name: string;
  defaultChecked: boolean;
}

const BRANDS: Brand[] = [
  { id: 'apple', name: 'Apple', defaultChecked: true },
  { id: 'google', name: 'Google', defaultChecked: true },
  { id: 'microsoft', name: 'Microsoft', defaultChecked: true },
  { id: 'samsung', name: 'Samsung', defaultChecked: false },
  { id: 'dell', name: 'Dell', defaultChecked: false },
  { id: 'hp', name: 'HP', defaultChecked: true },
  { id: 'symphony', name: 'Symphony', defaultChecked: false },
  { id: 'xiaomi', name: 'Xiaomi', defaultChecked: false },
  { id: 'sony', name: 'Sony', defaultChecked: false },
  { id: 'panasonic', name: 'Panasonic', defaultChecked: false },
  { id: 'lg', name: 'LG', defaultChecked: true },
  { id: 'intel', name: 'Intel', defaultChecked: false },
  { id: 'oneplus', name: 'One Plus', defaultChecked: false },
];

const PopularBrands: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(
    new Set(BRANDS.filter(brand => brand.defaultChecked).map(brand => brand.id))
  );

  const handleBrandToggle = (brandId: string) => {
    const newSelectedBrands = new Set(selectedBrands);
    if (newSelectedBrands.has(brandId)) {
      newSelectedBrands.delete(brandId);
    } else {
      newSelectedBrands.add(brandId);
    }
    setSelectedBrands(newSelectedBrands);
  };

  return (
    <div className="bg-white p-4">
      <h2 className="md:text-xl font-bold mb-6 text-gray-800">POPULAR BRANDS</h2>
      <div className="grid grid-cols-2 gap-2 text-sm md:text-base">
        {BRANDS.map((brand) => (
          <label
            key={brand.id}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedBrands.has(brand.id)}
              onChange={() => handleBrandToggle(brand.id)}
              className="form-checkbox text-orange-500 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
            />
            <span className="text-gray-700 group-hover:text-orange-500 transition-colors">
              {brand.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PopularBrands;
