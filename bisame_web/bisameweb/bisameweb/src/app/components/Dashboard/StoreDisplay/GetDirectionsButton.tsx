import { Navigation } from 'lucide-react';

interface GetDirectionsButtonProps {
  location: string;
}

const GetDirectionsButton = ({ location }: GetDirectionsButtonProps) => {
  const handleGetDirections = () => {
    // Create a Google Maps URL with the location
    const encodedLocation = encodeURIComponent(location);
    
    // Try to open Google Maps with directions
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    
    // Open in new tab
    window.open(mapsUrl, '_blank');
  };

  return (
    <button 
      onClick={handleGetDirections}
      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
    >
      <Navigation className="w-5 h-5" />
      Get Directions
    </button>
  );
};

export default GetDirectionsButton; 