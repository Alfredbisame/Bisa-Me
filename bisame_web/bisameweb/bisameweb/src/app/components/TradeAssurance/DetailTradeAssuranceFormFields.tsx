import { useEffect, useCallback } from 'react';
import { useTradeAssurance } from '@/app/components/TradeAssurance/hooks/useTradeAssurance';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import DetailFormInput from './DetailFormInput';

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

interface ProductData {
  productTitle?: string;
  sellerId?: string;
  sellerName?: string;
  phoneNumber?: string;
  location?: string;
  price?: string;
  description?: string;
  category?: string;
}

interface TradeAssuranceFormFieldsProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  productData?: ProductData;
}

const DetailTradeAssuranceFormFields = ({
  formData,
  onInputChange,
  productData
}: TradeAssuranceFormFieldsProps) => {
  const { packages, socialMedia, isLoading, error } = useTradeAssurance();

  const getProductSources = () => {
    const defaultOption = { value: '', label: 'Select where you saw the product' };
    interface SocialMediaPlatform {
      name: string;
    }

    interface SocialMediaSourceOption {
      value: string;
      label: string;
    }

    const socialMediaSources: SocialMediaSourceOption[] = socialMedia.map((platform: SocialMediaPlatform) => ({
      value: platform.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      label: platform.name
    }));

    return [defaultOption, ...socialMediaSources];
  };

  const getProductCategories = () => {
    const defaultOption = { value: '', label: 'Select product category' };

    interface ApiCategory {
      value: string;
      label: string;
      fees: string;
    }

    const apiCategories: ApiCategory[] = packages.map((pkg: { name: string; fees: string }) => ({
      value: pkg.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      label: pkg.name,
      fees: pkg.fees
    }));

    return [defaultOption, ...apiCategories];
  };

  // ✅ Memoize mapCategoryToSelectValue using useCallback
  const mapCategoryToSelectValue = useCallback((category?: string): { value: string; fees: string } => {
    if (!category) return { value: '', fees: '' };

    const categoryLower = category.toLowerCase();

    const matchedPackage = packages.find(pkg => {
      const pkgNameLower = pkg.name.toLowerCase();
      return (
        pkgNameLower.includes(categoryLower) ||
        categoryLower.includes(pkgNameLower) ||
        (categoryLower.includes('phone') && pkgNameLower.includes('phone')) ||
        (categoryLower.includes('mobile') && pkgNameLower.includes('mobile')) ||
        (categoryLower.includes('tablet') && pkgNameLower.includes('tablet')) ||
        (categoryLower.includes('electronic') && pkgNameLower.includes('electronic')) ||
        (categoryLower.includes('vehicle') && pkgNameLower.includes('vehicle')) ||
        (categoryLower.includes('car') && pkgNameLower.includes('vehicle')) ||
        (categoryLower.includes('property') && pkgNameLower.includes('propert')) ||
        (categoryLower.includes('house') && pkgNameLower.includes('house')) ||
        (categoryLower.includes('furniture') && pkgNameLower.includes('furniture')) ||
        (categoryLower.includes('appliance') && pkgNameLower.includes('appliance')) ||
        (categoryLower.includes('health') && pkgNameLower.includes('health')) ||
        (categoryLower.includes('beauty') && pkgNameLower.includes('beauty')) ||
        (categoryLower.includes('fashion') && pkgNameLower.includes('fashion')) ||
        (categoryLower.includes('clothing') && pkgNameLower.includes('fashion'))
      );
    });

    if (matchedPackage) {
      return {
        value: matchedPackage.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        fees: matchedPackage.fees
      };
    }

    return { value: '', fees: '' };
  }, [packages]); // ✅ Depend on packages

  const formatPrice = (price?: string): string => {
    if (!price) return '';
    return price.replace(/[^\d.]/g, '');
  };

  const getServiceFeeForCategory = (categoryValue: string): string => {
    if (!categoryValue) return '';

    const matchedPackage = packages.find(
      (pkg: { name: string; fees: string }) =>
        pkg.name.toLowerCase().replace(/[^a-z0-9]/g, '_') === categoryValue
    );

    return matchedPackage ? matchedPackage.fees : '';
  };

  const handleCategoryChange = (categoryValue: string) => {
    onInputChange('productCategory', categoryValue);
    const serviceFee = getServiceFeeForCategory(categoryValue);
    if (serviceFee) {
      onInputChange('serviceFee', serviceFee);
    }
  };
  

  useEffect(() => {
    if (productData && packages.length > 0) {
      if (!formData.productName && productData.productTitle) {
        onInputChange('productName', productData.productTitle);
      }

      if (!formData.sellerName && productData.sellerName) {
        onInputChange('sellerName', productData.sellerName);
      }

      if (!formData.phoneNumber && productData.phoneNumber) {
        onInputChange('phoneNumber', productData.phoneNumber);
      }

      if (!formData.location && productData.location) {
        onInputChange('location', productData.location);
      }

      if (!formData.price && productData.price) {
        onInputChange('price', formatPrice(productData.price));
      }

      if (!formData.description && productData.description) {
        onInputChange('description', productData.description);
      }

      if (!formData.productCategory && productData.category) {
        const { value: mappedCategory, fees } = mapCategoryToSelectValue(productData.category);
        if (mappedCategory) {
          onInputChange('productCategory', mappedCategory);
          if (fees && !formData.serviceFee) {
            onInputChange('serviceFee', fees);
          }
        }
      }
    }
  }, [
    productData,
    formData,
    onInputChange,
    packages,
    mapCategoryToSelectValue,
  ]);

  const handleNumberInput = (field: string, value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const parts = numericValue.split('.');
    const formattedValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericValue;
    onInputChange(field, formattedValue);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading form data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-4 text-red-500">
          <p className="font-semibold">Failed to load form configuration</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  const productSources = getProductSources();
  const productCategories = getProductCategories();
  

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

      {/* Where did you see the product - Using API social media data */}
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

      {/* Product Category and Service Fee - Using API package data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <select
          value={formData.productCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors bg-white text-gray-700"
          required
        >
          {productCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
               
        <DetailFormInput
          placeholder="Service Fee (₵)"
          value={formData.serviceFee}
          onChange={(value) => handleNumberInput('serviceFee', value)}
          required
          disabled={!!formData.productCategory} // Disable if category is selected (auto-filled)
        />
      </div>
    </>
  );
};

export default DetailTradeAssuranceFormFields;
