import React, { Suspense } from "react";
import ServiceFormContainer from "./components/ServiceFormContainer";
import Loader from "@/app/components/Loader/Loader";

const AllCategory = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="post-category-page">
        <ServiceFormContainer />
      </div>
    </Suspense>
  );
};

export default AllCategory;
