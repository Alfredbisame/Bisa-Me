/**
 * Utility functions for string generation and manipulation
 */

/**
 * Generates a cryptographically secure random string
 * @param length - The length of the string to generate
 * @param options - Configuration options for character sets
 * @returns A secure random string
 */
export const generateSecureRandomString = (
  length: number = 32,
  options: {
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeNumbers?: boolean;
    includeSpecialChars?: boolean;
  } = {
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
  }
): string => {
  const {
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSpecialChars = true,
  } = options;

  // Character sets
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  // Build character pool based on options
  let allCharacters = '';
  if (includeUppercase) allCharacters += upperChars;
  if (includeLowercase) allCharacters += lowerChars;
  if (includeNumbers) allCharacters += numbers;
  if (includeSpecialChars) allCharacters += specialChars;

  if (allCharacters === '') {
    throw new Error('At least one character set must be included');
  }

  // Get secure random value
  const getSecureRandom = (): number => {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomBuffer = new Uint32Array(1);
      window.crypto.getRandomValues(randomBuffer);
      return randomBuffer[0] / (0xffffffff + 1);
    }
    return Math.random(); // Fallback
  };

  // Generate random character from a specific set
  const getRandomChar = (charSet: string): string => {
    return charSet.charAt(Math.floor(getSecureRandom() * charSet.length));
  };

  let result = '';

  // Ensure at least one character from each enabled set
  if (includeUppercase) result += getRandomChar(upperChars);
  if (includeLowercase) result += getRandomChar(lowerChars);
  if (includeNumbers) result += getRandomChar(numbers);
  if (includeSpecialChars) result += getRandomChar(specialChars);

  // Fill the rest with random characters from all sets
  const remainingLength = length - result.length;
  for (let i = 0; i < remainingLength; i++) {
    result += getRandomChar(allCharacters);
  }

  // Shuffle the result using Fisher-Yates algorithm
  return shuffleString(result, getSecureRandom);
};

/**
 * Shuffles a string using the Fisher-Yates algorithm
 * @param str - The string to shuffle
 * @param randomFn - Function to generate random numbers
 * @returns The shuffled string
 */
const shuffleString = (str: string, randomFn: () => number): string => {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
};

/**
 * Generates a URL-safe random string (no special characters)
 * @param length - The length of the string to generate
 * @returns A URL-safe random string
 */
export const generateUrlSafeRandomString = (length: number = 32): string => {
  return generateSecureRandomString(length, {
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: false,
  });
};

/**
 * Generates a simple random string for non-security critical use cases
 * @param length - The length of the string to generate
 * @returns A simple random string
 */
export const generateSimpleRandomString = (length: number = 16): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}; 