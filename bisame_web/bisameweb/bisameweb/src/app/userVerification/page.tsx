"use client";
import { Suspense } from "react";
import VerificationForm from "../components/Authenticate/VerificationForm";
import Loader from "../components/Loader/Loader";

const UserVerificationPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <VerificationForm />
    </Suspense>
  );
};

export default UserVerificationPage;
