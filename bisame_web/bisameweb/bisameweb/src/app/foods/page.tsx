import { Suspense } from "react";
import Foods from "../components/Forms/Foods/Foods";
import Loader from "../components/Loader/Loader";

const FoodsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Foods />
    </Suspense>
  );
};

export default FoodsPage;
