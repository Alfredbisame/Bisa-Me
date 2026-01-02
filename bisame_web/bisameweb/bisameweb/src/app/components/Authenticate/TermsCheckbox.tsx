import React from "react";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange, disabled = false }) => (
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      id="terms"
      checked={checked}
      onChange={onChange}
      className="mr-2 leading-tight"
      disabled={disabled}
    />
    <label className="text-sm text-gray-700" htmlFor="terms">
      I have read & agree to the{" "}
      <a href="/terms_of_use" className="text-blue-500 hover:underline">
        Terms of Use
      </a>{" "}
      and{" "}
      <a href="/privacy_policy" className="text-blue-500 hover:underline">
        Privacy Policy
      </a>
      .
    </label>
  </div>
);

export default TermsCheckbox; 