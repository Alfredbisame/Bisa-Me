import React from "react";
import PhoneInput from "react-phone-number-input";

interface PhoneNumberInputProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange, disabled }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-2 text-blue-600">Phone number</label>
    <PhoneInput
      international
      defaultCountry="GH"
      value={value}
      onChange={onChange}
      className="rounded-lg px-3 py-2 text-sm font-semibold border focus:outline-none  w-full outline-none text-blue-600"
      placeholder="Enter phone number"
      disabled={disabled}
    />
  </div>
);

export default PhoneNumberInput; 