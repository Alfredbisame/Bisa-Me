import "react-phone-number-input/style.css";
import SignInForm from "@/app/components/Authenticate/SignInForm";
import AuthHeader from "@/app/components/Authenticate/AuthHeader";
import { BottomNavigation } from "@/app/components/BottomNavigation";

const SignInSignUp: React.FC = () => {
  return (
    <div className="flex flex-col my-5 md:my-0 items-center justify-center md:py-10 bg-gray-100">
      <div className="bg-white md:shadow-md rounded-lg p-6 w-full max-w-lg">
        {/* Tabs */}
        <AuthHeader defaultTab="signin" />
        {/* SignIn */}
        <SignInForm />
      </div>
      <div className="mt-3 w-full">
        <BottomNavigation activeTab="my-bisame" />
      </div>
    </div>
  );
};

// Sign In Form Component
// const SignInForm: React.FC = () => {
//   const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!phoneNumber || !password) {
//       alert("Please fill in all fields");
//       return;
//     }
//     console.log("Phone Number:", phoneNumber);
//     console.log("Password:", password);
//     // Perform further actions like API calls here
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Phone Number Input */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Phone number
//         </label>
//         <PhoneInput
//           international
//           defaultCountry="GH" // Default country set to Ghana
//           value={phoneNumber}
//           onChange={setPhoneNumber}
//           className="border rounded px-3 py-2 w-full"
//           placeholder="Enter phone number"
//         />
//       </div>

//       {/* Password Input */}
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <label className="block text-gray-700 text-sm font-bold">
//             Password
//           </label>
//           <Link href="/UserAccounts/forget_password" className="text-sm text-blue-500 hover:underline">
//             Forget Password?
//           </Link>
//         </div>
//         <div className="flex items-center border rounded px-3 py-2">
//           <input
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
//             placeholder="Password"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="ml-2"
//           >
//             <FaEye className="text-gray-500" />
//           </button>
//         </div>
//       </div>

//       {/* Sign In Button */}
//       <div className="flex items-center justify-center">
//         <button
//           type="submit"
//           className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none flex items-center"
//         >
//           SIGN IN
//           <FaArrowRight className="ml-2" />
//         </button>
//       </div>
//     </form>
//   );
// };

// Sign Up Form Component
// const SignUpForm: React.FC = () => {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [referralCode, setReferralCode] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [termsAccepted, setTermsAccepted] = useState(false);

//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
//       if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword) {
//         alert("Please fill in all required fields");
//         return;
//       }
//       if (password !== confirmPassword) {
//         alert("Passwords do not match");
//         return;
//       }
//       if (!termsAccepted) {
//         alert("Please accept the terms and conditions");
//         return;
//       }
//       console.log("First Name:", firstName);
//       console.log("Last Name:", lastName);
//       console.log("Phone Number:", phoneNumber);
//       console.log("Email:", email);
//       console.log("Password:", password);
//       console.log("Referral Code:", referralCode);
//       // Perform further actions like API calls here
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         {/* First Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
//             First name
//           </label>
//           <input
//             type="text"
//             id="first-name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter your first name"
//           />
//         </div>

//         {/* Last Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
//             Last name
//           </label>
//           <input
//             type="text"
//             id="last-name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter your last name"
//           />
//         </div>

//         {/* Phone Number */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone-number">
//             Phone number
//           </label>
//           <PhoneInput
//             international
//             defaultCountry="GH" // Default country set to Ghana
//             value={phoneNumber}
//             onChange={setPhoneNumber}
//             className="border rounded px-3 py-2 w-full"
//             placeholder="Enter phone number"
//           />
//         </div>

//         {/* Email Address */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter your email"
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4 relative">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//             Password
//           </label>
//           <input
//             type={showPassword ? "text" : "password"}
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="8+ characters"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-10 text-gray-500 cursor-pointer"
//           >
//             <FaEye />
//           </button>
//         </div>

//         {/* Confirm Password */}
//         <div className="mb-4 relative">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
//             Confirm Password
//           </label>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             id="confirm-password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Re-enter your password"
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute right-3 top-10 text-gray-500 cursor-pointer"
//           >
//             <FaEye />
//           </button>
//         </div>

//         {/* Referral Code */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="referral-code">
//             Referral code (optional)
//           </label>
//           <input
//             type="text"
//             id="referral-code"
//             value={referralCode}
//             onChange={(e) => setReferralCode(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="eg. 270653"
//           />
//         </div>

//         {/* Terms and Conditions */}
//         <div className="mb-4 flex items-center">
//           <input
//             type="checkbox"
//             id="terms"
//             checked={termsAccepted}
//             onChange={(e) => setTermsAccepted(e.target.checked)}
//             className="mr-2 leading-tight"
//           />
//           <label className="text-sm text-gray-700" htmlFor="terms">
//             I have read & agree to the{" "}
//             <a href="#" className="text-blue-500 hover:underline">
//               Terms of Use
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-blue-500 hover:underline">
//               Privacy Policy
//             </a>
//             .
//           </label>
//         </div>

//         {/* Sign Up Button */}
//         <div className="flex items-center justify-center">
//           <button
//             type="submit"
//             className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             SIGN UP
//           </button>
//         </div>
//       </form>
//     );
//   };

export default SignInSignUp;
