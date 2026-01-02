import { MapPin, Navigation, Phone } from 'lucide-react';
import AddressInfoItem from './AddressInfoItem';
import GetDirectionsButton from './GetDirectionsButton';
import CallStoreButton from './CallStoreButton';

interface Address {
  storeName: string;
  location: string;
  closeLandmark: string;
  phoneNumber: string;
}

interface StoreAddressCardProps {
  address: Address;
}

const StoreAddressCard = ({ address }: StoreAddressCardProps) => {
  const hasData = address.storeName || address.location || address.closeLandmark || address.phoneNumber;

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MapPin className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-lg font-medium">No address information available</p>
        <p className="text-sm">Add your store details to display them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Store Name Header */}
      {address.storeName && (
        <div className="text-center pb-6 border-b border-gray-100">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{address.storeName}</h3>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"></div>
        </div>
      )}

      {/* Address Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {address.location && (
          <AddressInfoItem
            icon={<MapPin className="w-6 h-6 text-blue-500" />}
            label="Location"
            value={address.location}
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
          />
        )}

        {address.phoneNumber && (
          <AddressInfoItem
            icon={<Phone className="w-6 h-6 text-orange-500" />}
            label="Phone Number"
            value={address.phoneNumber}
            bgColor="bg-orange-50"
            borderColor="border-orange-200"
          />
        )}

        {address.closeLandmark && (
          <div className="md:col-span-2">
            <AddressInfoItem
              icon={<Navigation className="w-6 h-6 text-green-500" />}
              label="Nearby Landmark"
              value={address.closeLandmark}
              bgColor="bg-green-50"
              borderColor="border-green-200"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
        {address.location && address.storeName && (
          <GetDirectionsButton 
            location={address.location}
          />
        )}
        {address.phoneNumber && (
          <CallStoreButton 
            phoneNumber={address.phoneNumber}
          />
        )}
      </div>
    </div>
  );
};

export default StoreAddressCard;
