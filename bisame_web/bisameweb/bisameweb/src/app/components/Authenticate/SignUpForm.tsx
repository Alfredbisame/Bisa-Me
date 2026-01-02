"use client";
import { Toaster } from "react-hot-toast";
import PhoneNumberInput from "./PhoneNumberInput";
import TextInput from "./TextInput";
import PasswordInputWithConfirm from "./PasswordInputWithConfirm";
import DropdownSelect from "./DropdownSelect";
import TermsCheckbox from "./TermsCheckbox";
import SignUpButton from "./SignUpButton";
// import VerificationModal from "./VerificationModal";
import { useSignUpForm } from "./useSignUpForm";
import { HEAR_ABOUT_US_OPTIONS } from "./constants";
import ContinueWith from "../ui/ContinueWith";
import SocialAuth from "../ui/SocialAuth";

// SignUpForm Component
const SignUpForm: React.FC = () => {
  const {
    // State
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    referralCode,
    setReferralCode,
    showPassword,
    showConfirmPassword,
    termsAccepted,
    hearAboutUs,
    setHearAboutUs,

    // Actions
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    toggleTerms,

    // SWR state
    isMutating,
    error,
  } = useSignUpForm();

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto md:p-4">
        {/* Welcome Section */}
        <div className="text-center space-y-3 mb-8">
          <div className="relative">
            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Let&apos;s Get Started!
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-sm font-medium pt-4">
            Join <span className="text-blue-600 font-semibold">50K+</span> users
            on <span className="text-blue-600 font-semibold">Bisame</span>
          </p>
        </div>

        {/* First Name */}
        <TextInput
          id="first-name"
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          required={true}
          disabled={isMutating}
        />

        {/* Last Name */}
        <TextInput
          id="last-name"
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
          required={true}
          disabled={isMutating}
        />

        {/* Phone Number */}
        <PhoneNumberInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          disabled={isMutating}
        />

        {/* Email Address */}
        <TextInput
          id="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          optional={true}
          disabled={isMutating}
        />

        {/* Password and Confirm Password */}
        <PasswordInputWithConfirm
          password={password}
          confirmPassword={confirmPassword}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          onToggleShowPassword={togglePasswordVisibility}
          onToggleShowConfirmPassword={toggleConfirmPasswordVisibility}
          disabled={isMutating}
        />

        {/* How did you hear about us dropdown */}
        <DropdownSelect
          id="hear-about-us"
          label="How did you hear about us?"
          value={hearAboutUs}
          onChange={(e) => setHearAboutUs(e.target.value)}
          options={HEAR_ABOUT_US_OPTIONS}
          placeholder="Select an option"
          required={true}
          disabled={isMutating}
        />

        {/* Referral Code */}
        <TextInput
          id="referral-code"
          label="Referral code"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="eg. 270653"
          optional={true}
          disabled={isMutating}
        />

        {/* Terms and Conditions */}
        <TermsCheckbox
          checked={termsAccepted}
          onChange={toggleTerms}
          disabled={isMutating}
        />

        {/* Sign Up Button */}
        <SignUpButton isLoading={isMutating} />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-4">
            {error.message || "An error occurred."}
          </p>
        )}
      </form>

      {/* Or continue with section */}
      <ContinueWith style="my-5" />

      {/* Social Auth - Google and Facebook  */}
      <SocialAuth />
    </>
  );
};

export default SignUpForm;

// "use client";
// import { useState } from "react";
// import PhoneInput from "react-phone-number-input";
// import { FaEye, FaSpinner } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa";
// import axios from "axios";
// import useSWRMutation from "swr/mutation";
// import VerificationModal from "./VerificationModal";
// import { toast, Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// interface ApiError {
//   response?: {
//     data: {
//       message?: string;
//     };
//   };
// }
// // Define the type for the response body
// interface RegisterRequestBody {
//   first: string;
//   last: string;
//   phone: string;
//   email: string;
//   password: string;
//   refecode: string;
//   countryname: string;
//   countryiso2: string;
//   countrycode: string;
//   choose: string;
//   type: string;
// }

// // Dropdown options
// const HEAR_ABOUT_US_OPTIONS = [
//   { value: "Facebook", label: "Facebook" },
//   { value: "Instagram", label: "Instagram" },
//   { value: "Twitter", label: "Twitter/X" },
//   { value: "LinkedIn", label: "LinkedIn" },
//   { value: "TikTok", label: "TikTok" },
//   { value: "WhatsApp", label: "WhatsApp" },
//   { value: "YouTube", label: "YouTube" },
//   { value: "Snapchat", label: "Snapchat" },
//   { value: "Pinterest", label: "Pinterest" },
//   { value: "Friend", label: "Friend" },
//   { value: "Search", label: "Search Engine" },
//   { value: "Other", label: "Other" },
// ];

// // Axios instance
// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_SIGNUP_API_ENDPOINT,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`,
//   },
// });

// // SignUpForm Component
// const SignUpForm: React.FC = () => {
//   const router = useRouter();
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [referralCode, setReferralCode] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
//   const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
//   const [hearAboutUs, setHearAboutUs] = useState<string>("");
//   const [showVerificationModal, setShowVerificationModal] = useState(false);
//   const [verificationData, setVerificationData] = useState<RegisterRequestBody | null>(null);

//   // SWR Mutation for Form Submission
//   const { trigger, isMutating, error } = useSWRMutation(
//     "register/",
//     async (_, { arg }: { arg: RegisterRequestBody }) => {
//       try {
//         const response = await apiClient.post("register/", arg);
//         return response.data;
//       } catch (error: unknown) {
//         const apiError = error as ApiError;
//         if (apiError.response) {
//           throw new Error(apiError.response.data.message || "Registration failed");
//         }
//         throw new Error("An unexpected error occurred");
//       }
//     },
//     {
//       onSuccess: (data) => {
//         console.log("Registration successful:", data);
//         toast.success("Registration successful!");

//          // Store userId in localStorage
//         localStorage.setItem('userId', data.userid);

//          // Generate a random string for URL obfuscation
//          const generateRandomString = (length: number): string => {
//           // Specify  the characters to be used for the random string
//           const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//           const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
//           const numbers = '0123456789';
//           const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

//           // Combine all character sets
//           const allCharacters = upperChars + lowerChars + numbers + specialChars;

//           // Use crypto API for more secure random generation if available
//           const getSecureRandom = () => {
//             if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
//               const randomBuffer = new Uint32Array(1);
//               window.crypto.getRandomValues(randomBuffer);
//               return randomBuffer[0] / (0xffffffff + 1);
//             }
//             return Math.random(); // Fallback to Math.random if crypto API is not available
//           };

//           let result = '';

//           // Ensure at least one character from each character set for complexity
//           result += upperChars.charAt(Math.floor(getSecureRandom() * upperChars.length));
//           result += lowerChars.charAt(Math.floor(getSecureRandom() * lowerChars.length));
//           result += numbers.charAt(Math.floor(getSecureRandom() * numbers.length));
//           result += specialChars.charAt(Math.floor(getSecureRandom() * specialChars.length));

//           // Fill the rest of the string with random characters
//           for (let i = 4; i < length; i++) {
//             const randomIndex = Math.floor(getSecureRandom() * allCharacters.length);
//             result += allCharacters.charAt(randomIndex);
//           }

//           // Shuffle the result to avoid predictable patterns (Fisher-Yates shuffle)
//           const shuffleString = (str: string): string => {
//             const array = str.split('');
//             for (let i = array.length - 1; i > 0; i--) {
//               const j = Math.floor(getSecureRandom() * (i + 1));
//               [array[i], array[j]] = [array[j], array[i]]; // Swap elements
//             }
//             return array.join('');
//           };

//           return shuffleString(result);
//         };

//         // Generate a random string (e.g., 16 characters)
//         const randomString = generateRandomString(32);
//         // Reset form fields
//         setFirstName("");
//         setLastName("");
//         setPhoneNumber(undefined);
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");
//         setReferralCode("");
//         setHearAboutUs("");
//         setTermsAccepted(false);

//       // Navigate after successful registration with the random string appended
//       // This will show a unique URL in the address bar but still navigate to the correct page
//       router.push(`/userVerification?token=${randomString}`);
//       },
//       onError: (err: Error) => {
//         console.error("Registration failed:", err.message);
//         toast.error(`Registration failed: ${err.message}`);
//       },
//     }
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!firstName || !lastName || !phoneNumber || !password || !confirmPassword) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     if (!termsAccepted) {
//       toast.error("Please accept the terms and conditions");
//       return;
//     }

//     const requestBody: RegisterRequestBody = {
//       first: firstName,
//       last: lastName,
//       phone: phoneNumber,
//       email: email || "",
//       password: password,
//       refecode: referralCode,
//       countryname: "Ghana",
//       countryiso2: "GH",
//       countrycode: "+233",
//       choose: hearAboutUs,
//       type: "",
//     };

//     setVerificationData(requestBody);
//     setShowVerificationModal(true);
//   };

//   const handleVerificationMethod = (method: 'whatsapp' | 'sms') => {
//     if (verificationData) {
//       const finalRequestBody = {
//         ...verificationData,
//         type: method
//       };

//       trigger(finalRequestBody)
//         .catch(() => {}) // Suppress unhandled promise warning
//         .finally(() => {}); // Optional: Add loading state if needed

//       setShowVerificationModal(false); // Close immediately
//     }
//   };

//   return (
//     <>
//     <Toaster position="top-right" />
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
//       {/* First Name */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
//           First name
//         </label>
//         <input
//           type="text"
//           id="first-name"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="Enter your first name"
//         />
//       </div>

//       {/* Last Name */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
//           Last name
//         </label>
//         <input
//           type="text"
//           id="last-name"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="Enter your last name"
//         />
//       </div>

//       {/* Phone Number */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone-number">
//           Phone number
//         </label>
//         <PhoneInput
//           international
//           defaultCountry="GH"
//           value={phoneNumber}
//           onChange={setPhoneNumber}
//           className="border rounded px-3 py-2 w-full"
//           placeholder="Enter phone number"
//         />
//       </div>

//       {/* Email Address */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//           Email Address (optional)
//         </label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="Enter your email"
//         />
//       </div>

//       {/* Password */}
//       <div className="mb-4 relative">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//           Password
//         </label>
//         <input
//           type={showPassword ? "text" : "password"}
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="8+ characters"
//         />
//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute right-3 top-10 text-gray-500 cursor-pointer"
//         >
//           <FaEye />
//         </button>
//       </div>

//       {/* Confirm Password */}
//       <div className="mb-4 relative">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
//           Confirm Password
//         </label>
//         <input
//           type={showConfirmPassword ? "text" : "password"}
//           id="confirm-password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="Re-enter your password"
//         />
//         <button
//           type="button"
//           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           className="absolute right-3 top-10 text-gray-500 cursor-pointer"
//         >
//           <FaEye />
//         </button>
//       </div>

//       {/* How did you hear about us dropdown */}
//       <div className="mb-4 relative">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hear-about-us">
//           How did you hear about us?
//         </label>
//         <div className="relative">
//           <select
//             id="hear-about-us"
//             value={hearAboutUs}
//             onChange={(e) => setHearAboutUs(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
//             required
//           >
//             <option value="">Select an option</option>
//             {HEAR_ABOUT_US_OPTIONS.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
//             <FaChevronDown className="text-gray-500 transition-transform duration-200 transform group-hover:rotate-180" />
//           </div>
//         </div>
//       </div>

//       {/* Referral Code */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="referral-code">
//           Referral code (optional)
//         </label>
//         <input
//           type="text"
//           id="referral-code"
//           value={referralCode}
//           onChange={(e) => setReferralCode(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           placeholder="eg. 270653"
//         />
//       </div>

//       {/* Terms and Conditions */}
//       <div className="mb-4 flex items-center">
//         <input
//           type="checkbox"
//           id="terms"
//           checked={termsAccepted}
//           onChange={(e) => setTermsAccepted(e.target.checked)}
//           className="mr-2 leading-tight"
//         />
//         <label className="text-sm text-gray-700" htmlFor="terms">
//           I have read & agree to the{" "}
//           <a href="#" className="text-blue-500 hover:underline">
//             Terms of Use
//           </a>{" "}
//           and{" "}
//           <a href="#" className="text-blue-500 hover:underline">
//             Privacy Policy
//           </a>
//           .
//         </label>
//       </div>

//       {/* Sign Up Button */}
//       <div className="flex items-center justify-center">
//               <button
//           type="submit"
//           disabled={isMutating}
//           className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2"
//         >
//           {isMutating ? (
//             <>
//               <FaSpinner className="animate-spin" />
//               <span>SIGNING UP...</span>
//             </>
//           ) : (
//             "SIGN UP"
//           )}
//         </button>

//       </div>

//       {/* Error Message */}
//       {error && (
//         <p className="text-red-500 text-sm mt-4">{error.message || "An error occurred."}</p>
//       )}

//        <VerificationModal
//         isOpen={showVerificationModal}
//         onClose={() => setShowVerificationModal(false)}
//         onSelect={handleVerificationMethod}
//       />

//       {error && (
//         <p className="text-red-500 text-sm mt-4">{error.message || "An error occurred."}</p>
//       )}
//     </form>
//     </>
//   );
// };

// export default SignUpForm;
