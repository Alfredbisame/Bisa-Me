"use client";
import PhoneNumberInput from "./PhoneNumberInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import { useSignInForm } from "./useSignInForm";
import SocialAuth from "../ui/SocialAuth";

const SignInForm: React.FC = () => {
  const {
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    showPassword,
    handleSubmit,
    togglePasswordVisibility,
    isMutating,
  } = useSignInForm();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-5 mb-8">
        <div className="relative">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Welcome Back!
          </h2>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
        </div>
        <p className="text-gray-600 text-sm font-medium">
          Ready to continue your journey on{" "}
          <span className="text-blue-600 font-semibold">Bisame</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PhoneNumberInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          disabled={isMutating}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          onToggleShowPassword={togglePasswordVisibility}
          disabled={isMutating}
        />
        <SubmitButton
          isLoading={isMutating}
          text="Login"
          loadingText="Logging in..."
        />
      </form>

      {/* Or continue with section */}
      <div className="flex items-center gap-2 ">
        <span className="left w-1/3 h-[0.5px] bg-gray-300"></span>
        <span className="text-xs flex-grow text-gray-500">
          Or continue with
        </span>
        <span className="right w-1/3 h-[0.5px] bg-gray-300"></span>
      </div>

      {/* Social Auth - Google and Facebook  */}
 
        <SocialAuth />
   
    </div>
  );
};

export default SignInForm;
