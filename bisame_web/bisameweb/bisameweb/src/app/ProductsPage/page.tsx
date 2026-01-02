import React, { Suspense } from "react";
import ProductsPage from "../components/ProductPage/ProductPage";
import Loader from "../components/Loader/Loader";

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ProductsPage />
    </Suspense>
  );
};

export default Page;
