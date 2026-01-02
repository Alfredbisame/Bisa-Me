interface FormSummaryProps {
  selectedCategory: string;
  selectedLocation: string;
  imagesCount: number;
}

const FormSummary = ({ selectedCategory, selectedLocation, imagesCount }: FormSummaryProps) => {
  if (!selectedCategory && !selectedLocation && imagesCount === 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Summary</h3>
      <div className="space-y-2 text-sm">
        {selectedCategory && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium text-blue-600">{selectedCategory}</span>
          </div>
        )}
        {selectedLocation && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium text-orange-600">{selectedLocation}</span>
          </div>
        )}
        {imagesCount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Photos:</span>
            <span className="font-medium text-green-600">
              {imagesCount} image{imagesCount !== 1 ? 's' : ''} uploaded
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSummary;
