"use client";

import React from "react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import useSocialAuth from "@/app/UserAccounts/SignIn/hook/useSocialAuth";
import { BsApple } from "react-icons/bs";
import useAppleAuth from "@/app/UserAccounts/SignIn/hook/useAppleSignIn";

const SocialAuth: React.FC = () => {
  // const router: AppRouterInstance = useRouter();
  const { signIn } = useSocialAuth();
  const { signIn: signInWithApple, loading } = useAppleAuth({
    preferRedirect: false,
  });

  return (
    <div className="flex items-center justify-center gap-5">
      <Button
        type="button"
        label="Google"
        icon={<FcGoogle size={15} color="blue" />}
        action={() => signIn()}
        styles={`flex items-center gap-1 md:gap-2 border px-4 py-2 rounded-lg text-xs text-blue-500 font-semibold`}
      />
      <Button
        type="button"
        label="Apple"
        action={() => signInWithApple()}
        icon={<BsApple size={15} color="grey" />}
        styles={`flex items-center gap-1 md:gap-2 border px-4 py-2 rounded-lg text-xs text-blue-500 font-semibold hover:bg-gray-100`}
      />
      <Button
        type="button"
        label="Facebook"
        icon={<ImFacebook2 size={15} color="blue" />}
        styles={`flex items-center gap-1 md:gap-2 border px-4 py-2 rounded-lg text-xs text-blue-500 font-semibold hover:bg-gray-100`}
      />
    </div>
  );
};

export default SocialAuth;
