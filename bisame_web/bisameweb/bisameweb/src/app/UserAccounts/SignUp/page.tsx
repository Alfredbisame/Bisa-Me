import AuthHeader from "@/app/components/Authenticate/AuthHeader";
import SignUpForm from "@/app/components/Authenticate/SignUpForm";
import React from "react";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center md:py-10 bg-gray-100">
      <div className="bg-white md:shadow-md rounded-lg p-6 w-full max-w-lg">
        <AuthHeader defaultTab="signup" />
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignupPage;
