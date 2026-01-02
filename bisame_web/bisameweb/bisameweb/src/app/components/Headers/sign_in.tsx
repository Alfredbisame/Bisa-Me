"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaEye, FaEyeSlash, FaArrowRight, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignInForm } from "../Authenticate/useSignInForm";
import SocialAuth from "../ui/SocialAuth";

interface SignInProps {
  onLoginSuccess?: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onLoginSuccess }) => {
  const router = useRouter();

  const {
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    showPassword,
    handleSubmit,
    togglePasswordVisibility,
    isMutating,
  } = useSignInForm(onLoginSuccess);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-center text-xl font-semibold mb-6">
          <span className="text-blue-600 font-semibold">Sign In </span> To Your
          Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone number
            </label>
            <PhoneInput
              international
              defaultCountry="GH"
              value={phoneNumber}
              onChange={setPhoneNumber}
              className="border rounded px-3 py-2 w-full focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500"
              disabled={isMutating}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500 transition-colors">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                placeholder="Password"
                disabled={isMutating}
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-2"
                disabled={isMutating}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right text-gray-500 mb-4">
            <Link
              href="/UserAccounts/forget_password"
              className="text-blue-500 text-sm ml-2"
            >
              Forget Password
            </Link>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isMutating}
            >
              {isMutating ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Or continue with section */}
          <div className="flex items-center gap-2 my-5">
            <span className="left w-1/3 h-[0.5px] bg-gray-300"></span>
            <span className="text-[10px] flex-grow text-gray-500">
              Or continue with
            </span>
            <span className="right w-1/3 h-[0.5px] bg-gray-300"></span>
          </div>

          {/* Social Auth - Google and Facebook  */}

          <SocialAuth />

          <div className="my-5 flex items-center justify-center gap-1">
            <div className="text-center text-gray-500 text-sm">
              Don&apos;t have account?
            </div>

            <div>
              <button
                type="button"
                onClick={() => router.push("/UserAccounts/SignUp")}
                disabled={isMutating}
                className="text-xs font-semibold text-orange-500"
              >
               Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

// "use client";

// import { useState } from 'react';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';
// import { FaEye, FaArrowRight, FaSpinner } from 'react-icons/fa';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const SignIn = () => {
//   const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Form validation
//     if (!phoneNumber) {
//       toast.error("Please enter your phone number");
//       return;
//     }

//     if (!password) {
//       toast.error("Please enter your password");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Format the phone number (the API will handle additional formatting)
//       const formattedPhone = phoneNumber.replace(/\s+/g, "").replace(/[+()-]/g, "");

//       // Call the login API route
//       const response = await axios.post('/api/auth/login', {
//         phone: formattedPhone,
//         password: password
//       });

//       // Handle successful login
//       if (response.data.success) {
//         // Show success message
//         toast.success("Login successful!");

//         // Store token if provided
//         if (response.data.token) {
//           localStorage.setItem('authToken', response.data.token);
//         }

//         // Store user ID if provided
//         if (response.data.userid) {
//           localStorage.setItem('userId', response.data.userid);
//         }

//         // Redirect to home page
//          window.location.href = '/';
//         // router.push('/');
//       } else {
//         // This shouldn't happen with the current API implementation
//         // but handling it just in case
//         setError(response.data.message || "Login failed. Please try again.");
//         toast.error(response.data.message || "Login failed. Please try again.");
//       }
//     } catch (error: unknown) {
//       console.error("Login error:", error);

//       // Handle different types of errors
//       if (error && typeof error === 'object' && 'response' in error) {
//         // The server responded with an error status
//         const axiosError = error as { response: { data?: { message?: string } } };
//         const errorMessage = axiosError.response.data?.message || "Login failed. Please check your credentials.";
//         setError(errorMessage);
//         toast.error(errorMessage);
//       } else if (error && typeof error === 'object' && 'request' in error) {
//         // The request was made but no response was received
//         setError("Unable to connect to the server. Please check your internet connection.");
//         toast.error("Unable to connect to the server. Please check your internet connection.");
//       } else {
//         // Something happened in setting up the request
//         setError("An error occurred. Please try again later.");
//         toast.error("An error occurred. Please try again later.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
//         <h2 className="text-center text-xl font-semibold mb-6">
//         <span className="text-blue-600 font-semibold">Sign In </span> To Your Account
//         </h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Phone number
//             </label>
//             <PhoneInput
//               international
//               defaultCountry="GH"
//               value={phoneNumber}
//               onChange={setPhoneNumber}
//               className="border rounded px-3 py-2 w-full focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500"
//               disabled={isLoading}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <div className="flex items-center border rounded px-3 py-2 focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500 transition-colors">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
//                 placeholder="Password"
//                 disabled={isLoading}
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="ml-2"
//                 disabled={isLoading}
//               >
//                 <FaEye className="text-gray-500" />
//               </button>
//             </div>
//           </div>

//           <div className="text-right text-gray-500 mb-4">
//             <Link href="/UserAccounts/forget_password" className="text-blue-500 text-sm ml-2">
//               Forget Password
//             </Link>
//           </div>

//           <div className="mb-4">
//             <button
//               type="submit"
//               className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <FaSpinner className="animate-spin mr-2" />
//                   LOGGING IN...
//                 </>
//               ) : (
//                 <>
//                   LOGIN
//                   <FaArrowRight className="ml-2" />
//                 </>
//               )}
//             </button>
//           </div>

//           <div className="text-center text-gray-500 mb-4">
//             Don&apos;t have account
//           </div>

//           <div>
//             <button
//               type="button"
//               onClick={() => router.push('/UserAccounts/SignIn')}
//               className="w-full border border-orange-500 text-orange-500 py-2 rounded-lg font-semibold hover:bg-orange-50"
//               disabled={isLoading}
//             >
//               CREATE ACCOUNT
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
