interface FormProgressIndicatorProps {
  selectedCategory: string;
  selectedLocation: string;
  imagesCount: number;
  getProgressPercentage: () => number;
}

const FormProgressIndicator = ({ 
  selectedCategory, 
  selectedLocation, 
  imagesCount, 
  getProgressPercentage 
}: FormProgressIndicatorProps) => {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
        <span>Progress</span>
        <span>{getProgressPercentage()}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span className={selectedCategory ? 'text-blue-500' : ''}>Category</span>
        <span className={selectedLocation ? 'text-orange-500' : ''}>Location</span>
        <span className={imagesCount > 0 ? 'text-green-500' : ''}>Photos</span>
      </div>
    </div>
  );
};

export default FormProgressIndicator;
