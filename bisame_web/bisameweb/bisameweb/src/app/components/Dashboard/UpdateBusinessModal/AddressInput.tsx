interface AddressInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const AddressInput = ({ label, value, onChange, placeholder }: AddressInputProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
};

export default AddressInput;
