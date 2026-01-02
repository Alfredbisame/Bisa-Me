interface ModalFooterProps {
  onClose: () => void;
  onSubmit: () => void;
}

const ModalFooter = ({ onClose, onSubmit }: ModalFooterProps) => {
  return (
    <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-100 bg-gray-50">
      <button
        onClick={onClose}
        className="px-6 py-3 text-gray-600 font-semibold hover:text-gray-800 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ModalFooter;
