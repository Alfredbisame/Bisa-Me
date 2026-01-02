import { Suspense } from "react";
import Products from "../components/Forms/Products/Products";
import Loader from "../components/Loader/Loader";

const ProductsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Products />
    </Suspense>
  );
};

export default ProductsPage;
