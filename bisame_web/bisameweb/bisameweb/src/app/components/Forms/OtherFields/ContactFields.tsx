import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "./ContactFields.module.css";

interface ContactFieldsProps {
  phone: string | undefined;
  attribute?: string;
  name: string;
  onPhoneChange: (value: string | undefined) => void;
  onNameChange: (value: string) => void;
}

const ContactFields: React.FC<ContactFieldsProps> = ({
  phone,
  attribute,
  // name,
  onPhoneChange,
  // onNameChange,
}) => {
  // Format the phone number properly
  const getFormattedPhone = (): string | undefined => {
    // If phone exists and is not empty, use it
    if (phone && phone.trim() !== "") {
      return phone;
    }

    // If attribute exists, format it
    if (attribute && attribute.trim() !== "") {
      // Remove any non-digit characters
      const digitsOnly = attribute.replace(/\D/g, "");

      // If it doesn't start with +, add it
      if (!attribute.startsWith("+")) {
        return `+${digitsOnly}`;
      }

      return attribute;
    }

    // Return undefined if neither exists
    return undefined;
  };

  const phoneValue = getFormattedPhone();

  return (
    <div className="space-y-1 md:space-y-2">
      <h2 className="text-gray-500 text-sm lg:text-base">
        Contact Information
      </h2>
      <div className="space-y-2 w-full max-w-sm">
        <div className={styles.phoneInput}>
          <PhoneInput
            international
            defaultCountry="GH"
            value={phoneValue}
            onChange={onPhoneChange}
            placeholder="Enter your phone number"
            aria-label="Your phone number"
            className="p-1 text-sm lg:text-base"
          />
        </div>
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-blue-600 text-sm font-semibold mb-1 flex items-center"
          >
            <UserIcon className="w-4 h-4 mr-2" />
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full border border-blue-300 rounded-lg px-4 py-3 text-blue-700 text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 bg-blue-50/30 hover:bg-blue-100/50"
            aria-label="Name"
          />
        </div>
      </div> */}
    </div>
  );
};

export default ContactFields;
