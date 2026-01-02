"use client";
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';

interface FormData {
  productName: string;
  sellerName: string;
  phoneNumber: string;
  location: string;
  price: string;
  description: string;
  productSource: string;
  productCategory: string;
  serviceFee: string;
}

interface TradeAssuranceFormFieldsProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
}

const TradeAssuranceFormFields = ({ formData, onInputChange }: TradeAssuranceFormFieldsProps) => {
  const productSources = [
    { value: '', label: 'Select where you saw the product' },
    { value: 'online_marketplace', label: 'Online Marketplace' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'physical_store', label: 'Physical Store' },
    { value: 'friend_referral', label: 'Friend Referral' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' }
  ];
  
  const productCategories = [
    { value: '', label: 'Select product category' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion & Clothing' },
    { value: 'home_garden', label: 'Home & Garden' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'sports', label: 'Sports & Recreation' },
    { value: 'books', label: 'Books & Media' },
    { value: 'health_beauty', label: 'Health & Beauty' },
    { value: 'toys_games', label: 'Toys & Games' },
    { value: 'other', label: 'Other' }
  ];
  
  const handleNumberInput = (field: string, value: string) => {
    // Only allow numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    // Prevent multiple decimal points
    const parts = numericValue.split('.');
    const formattedValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericValue;
    onInputChange(field, formattedValue);
  };

  return (
    <>
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormInput
            placeholder="Product Name"
            value={formData.productName}
            onChange={(value) => onInputChange('productName', value)}
            required
          />
        </div>
      </div>
        
      {/* Seller Name and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          placeholder="Seller Name"
          value={formData.sellerName}
          onChange={(value) => onInputChange('sellerName', value)}
          required
        />
        <FormInput
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(value) => handleNumberInput('phoneNumber', value)}
          required
        />
      </div>

      {/* Location and Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          placeholder="Location"
          value={formData.location}
          onChange={(value) => onInputChange('location', value)}
          required
        />
        <FormInput
          placeholder="Price"
          value={formData.price}
          onChange={(value) => handleNumberInput('price', value)}
          required
        />
      </div>
      
      {/* Description */}
      <div className="md:col-span-2">
        <FormTextarea
          placeholder="Product Description"
          value={formData.description}
          onChange={(value) => onInputChange('description', value)}
          required
        />
      </div>
      
      {/* Where did you see the product */}
      <div className="md:col-span-2">
        <select
          value={formData.productSource}
          onChange={(e) => onInputChange('productSource', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors bg-white text-gray-700"
          required
        >
          {productSources.map((source) => (
            <option key={source.value} value={source.value}>
              {source.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Product Category and Service Fee */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <select
          value={formData.productCategory}
          onChange={(e) => onInputChange('productCategory', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors bg-white text-gray-700"
          required
        >
          {productCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        
        <FormInput
          placeholder="Service Fee"
          value={formData.serviceFee}
          onChange={(value) => handleNumberInput('serviceFee', value)}
          required
        />
      </div>
    </>
  );
};

export default TradeAssuranceFormFields;
