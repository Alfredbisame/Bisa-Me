import AddressInput from './AddressInput';

interface Address {
  storeName: string;
  location: string;
  closeLandmark: string;
  phoneNumber: string;
}

interface AddressFormProps {
  address: Address;
  onAddressChange: (field: string, value: string) => void;
}

const AddressForm = ({ address, onAddressChange }: AddressFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddressInput
          label="Store Name"
          value={address.storeName}
          onChange={(value) => onAddressChange('storeName', value)}
          placeholder="Enter store name"
        />
        <AddressInput
          label="Phone Number"
          value={address.phoneNumber}
          onChange={(value) => onAddressChange('phoneNumber', value)}
          placeholder="Enter phone number"
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <AddressInput
          label="Location"
          value={address.location}
          onChange={(value) => onAddressChange('location', value)}
          placeholder="Enter store location/address"
        />
        <AddressInput
          label="Close Landmark"
          value={address.closeLandmark}
          onChange={(value) => onAddressChange('closeLandmark', value)}
          placeholder="Enter nearby landmark"
        />
      </div>
    </div>
  );
};

export default AddressForm;
