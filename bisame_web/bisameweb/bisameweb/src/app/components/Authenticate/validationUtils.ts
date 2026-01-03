/**
 * Validation utilities for form validation
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string | undefined;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

/**
 * Validates the sign-up form data
 * @param formData - The form data to validate
 * @returns Validation result with errors
 */
export const validateSignUpForm = (formData: FormData): ValidationResult => {
  const errors: string[] = [];

  // Required field validation
  if (!formData.firstName?.trim()) {
    errors.push("First name is required");
  }

  if (!formData.lastName?.trim()) {
    errors.push("Last name is required");
  }

  if (!formData.phoneNumber?.trim()) {
    errors.push("Phone number is required");
  }

  if (!formData.password) {
    errors.push("Password is required");
  }

  if (!formData.confirmPassword) {
    errors.push("Please confirm your password");
  }

  // Password validation
  if (formData.password && formData.confirmPassword) {
    if (formData.password !== formData.confirmPassword) {
      errors.push("Passwords do not match");
    }

    if (formData.password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    // Check for password strength - require at least 3 out of 4 criteria
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumbers = /\d/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

    const strengthScore = [
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    ].filter(Boolean).length;

    if (strengthScore < 3) {
      errors.push(
        "Password must contain at least 3 of: uppercase, lowercase, number, or special character"
      );
    }
  }

  // Email validation (optional field)
  if (formData.email && !isValidEmail(formData.email)) {
    errors.push("Please enter a valid email address");
  }

  // Phone number validation
  if (formData.phoneNumber && !isValidPhoneNumber(formData.phoneNumber)) {
    errors.push("Please enter a valid phone number");
  }

  // Checks for not a Ghanaian contact

  if (!formData.phoneNumber.startsWith("+233")) {
    errors.push("Login for your country isn't supported. Try using social authentication like Google or Apple");
  }

  // Terms acceptance validation
  if (!formData.termsAccepted) {
    errors.push("Please accept the terms and conditions");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates email format
 * @param email - Email to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format (basic validation)
 * @param phone - Phone number to validate
 * @returns True if phone number is valid
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, "");

  // Check if it has between 10-15 digits (international standard)
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Object with strength details
 */
export const validatePasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let strength: "weak" | "medium" | "strong" = "weak";
  if (score >= 4) strength = "strong";
  else if (score >= 3) strength = "medium";

  return {
    checks,
    score,
    strength,
    isValid: score >= 4,
  };
};
