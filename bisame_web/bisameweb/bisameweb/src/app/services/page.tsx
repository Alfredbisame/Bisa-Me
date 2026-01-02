import React, { Suspense } from "react";
import Service from "../components/Forms/Services/UnifiedService/Service";
import Loader from "../components/Loader/Loader";

const ServicePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Service />
    </Suspense>
  );
};

export default ServicePage;
